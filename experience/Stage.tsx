'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import { progress } from './progress';
import { pickTier, qualityFor, type Quality } from './quality';
import { watchAny } from '@/lib/watch';
import { scrollState } from './scroll';
import { createWorld, type World } from './world';

// Reaching this line means the 3D chunk has downloaded and been parsed.
progress.set(0.35);

const query = new URLSearchParams(location.search);
// The frame-rate readout is a development aid: `?hud=1` shows it.
const showHud = query.get('hud') === '1';

interface Perf {
  fps: number;
  avg: number;
  p95: number;
  worst: number;
}

/** Exposed for measurement from the console and from automated checks. */
declare global {
  interface Window {
    __stage?: { perf: Perf; tier: string; dpr: number; bloom: boolean; points: number; calls: number; size: string; plateKB: number; loadMs: number };
    /** Renders n frames back to back and waits for the GPU: true cost per frame, independent of display timing. */
    __bench?: (n?: number) => number;
    /** Milliseconds from navigation start to the first scene being built. */
    __ready?: number;
  }
}

function Scene({
  q,
  bloom,
  dpr,
  onSlow,
  onReady,
  onStats,
}: {
  q: Quality;
  bloom: boolean;
  dpr: number;
  onSlow: () => void;
  onReady: () => void;
  /** Receives the development readout, about once a second. */
  onStats: (text: string) => void;
}) {
  const { gl, scene, camera } = useThree();
  const advance = useThree((s) => s.advance);
  useEffect(() => {
    window.__bench = (n = 40) => {
      const g = gl.getContext();
      const px = new Uint8Array(4);
      g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, px);
      const t0 = performance.now();
      for (let i = 0; i < n; i++) advance(performance.now());
      g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, px);
      return +((performance.now() - t0) / n).toFixed(2);
    };
    return () => {
      delete window.__bench;
    };
  }, [gl, advance]);
  // The world being drawn. It is cleared the moment it is disposed: the page is kept, hidden, when the visitor
  // moves to another page, and on the way back a frame can be asked for before the new world is built.
  const current = useRef<World | null>(null);
  useEffect(() => {
    let live = true;
    let made: World | null = null;
    createWorld(gl, scene, camera as THREE.PerspectiveCamera, q).then((w) => {
      made = w;
      if (live) {
        current.current = w;
        window.__ready = Math.round(performance.now());
        progress.set(0.95);
        onReady();
      }
      else w.dispose();
    });
    return () => {
      live = false;
      current.current = null;
      made?.dispose();
    };
  }, [gl, scene, camera, q, onReady]);

  const settled = useRef(0);
  const samples = useRef<number[]>([]);
  const windowStart = useRef(0);
  const slowWindows = useRef(0);
  const warm = useRef(0);

  useFrame(({ gl: renderer }, dt) => {
    const calls = renderer.info.render.calls;
    renderer.info.reset();
    const world = current.current;
    if (!world) return;
    // Shaders compile on the first frames. The opening screen lifts only once they have been drawn.
    if (settled.current < 4 && ++settled.current === 4) progress.done();

    const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
    world.update(dt, scrollState.s, buffer.x, buffer.y);

    samples.current.push(dt * 1000);
    const now = performance.now();
    if (windowStart.current === 0) windowStart.current = now;
    if (now - windowStart.current >= 1000) {
      const s = samples.current.slice().sort((a, b) => a - b);
      const avg = s.reduce((a, b) => a + b, 0) / s.length;
      const perf: Perf = {
        fps: Math.round(1000 / avg),
        avg: +avg.toFixed(1),
        p95: +s[Math.floor(s.length * 0.95)].toFixed(1),
        worst: +s[s.length - 1].toFixed(1),
      };
      window.__stage = {
        perf,
        tier: q.tier,
        dpr,
        bloom,
        points: world.stats.points,
        calls,
        size: `${buffer.x}x${buffer.y}`,
        plateKB: Math.round(world.stats.plateBytes / 1024),
        loadMs: world.stats.loadMs,
      };
      onStats(
        `tier ${q.tier}  dpr ${dpr}  ${buffer.x}x${buffer.y}\n` +
          `${perf.fps} fps  avg ${perf.avg} ms  p95 ${perf.p95}  worst ${perf.worst}\n` +
          `points ${world.stats.points.toLocaleString()}  draws ${calls}  bloom ${bloom ? 'on' : 'off'}\n` +
          `story ${scrollState.s.toFixed(2)}  city ${world.stats.city.toFixed(2)}  light ${world.stats.energy.toFixed(2)}`,
      );
      // Ignore the first windows (shader compilation), then step quality down if frames stay long.
      warm.current++;
      if (warm.current > 2) {
        // Two slow seconds in a row: quick enough that nobody sits through stutter, slow enough that a
        // momentary hiccup elsewhere on the machine does not cost the scene its quality.
        slowWindows.current = avg > 21 ? slowWindows.current + 1 : 0;
        if (slowWindows.current >= 2) {
          slowWindows.current = 0;
          onSlow();
        }
      }
      samples.current = [];
      windowStart.current = now;
    }
  });

  return null;
}

export default function Stage() {
  const q = useMemo(() => qualityFor(pickTier()), []);
  // ?dpr= and ?bloom= pin those settings and switch the automatic step-down off, for measurement.
  const pinned = query.has('dpr') || query.has('bloom');
  const [dpr, setDpr] = useState(() => Number(query.get('dpr')) || Math.min(window.devicePixelRatio || 1, q.maxDpr));
  const [bloom, setBloom] = useState(query.has('bloom') ? query.get('bloom') === '1' : q.bloom);
  const hud = useRef<HTMLPreElement>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onStats = useCallback((text: string) => {
    if (hud.current) hud.current.textContent = text;
  }, []);

  // Nothing is drawn while every chapter that shows the scene is off screen: the sections between and after
  // them are plain pages, and should scroll as cheaply as plain pages do.
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => watchAny('.chapter', setOnScreen) ?? undefined, []);

  const onSlow = () => {
    if (pinned) return;
    if (dpr > 1) setDpr((d) => Math.max(1, +(d - 0.25).toFixed(2)));
    else if (bloom) setBloom(false);
  };

  return (
    <>
      <div className={ready ? 'stage is-ready' : 'stage'}>
        <Canvas
          dpr={dpr}
          frameloop={onScreen ? 'always' : 'never'}
          // With bloom, tone mapping happens once at the end of the effect chain instead of per material.
          flat={bloom}
          onCreated={({ gl }) => {
            gl.info.autoReset = false;
          }}
          gl={{ antialias: false, alpha: false, stencil: true, depth: false, powerPreference: 'high-performance' }}
          camera={{ fov: 38, near: 1, far: 30000, position: [0, 10, 0] }}
        >
          <Scene q={q} bloom={bloom} dpr={dpr} onSlow={onSlow} onReady={onReady} onStats={onStats} />
          {bloom && (
            <EffectComposer multisampling={0} stencilBuffer frameBufferType={THREE.HalfFloatType}>
              {/* Half resolution: glow is soft by nature, and this pass is the largest single cost in the frame. */}
              <Bloom mipmapBlur resolutionScale={0.5} intensity={0.55} luminanceThreshold={0.8} luminanceSmoothing={0.2} radius={0.62} />
              <Vignette offset={0.3} darkness={0.42} />
              <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            </EffectComposer>
          )}
        </Canvas>
      </div>
      {showHud && <pre className="hud" ref={hud} aria-hidden="true" />}
    </>
  );
}
