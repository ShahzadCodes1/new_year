'use client';

import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Logo } from '@/components/site/Logo';
import { chooseModeLate } from './boot';
import { LoaderFireworks } from './LoaderFireworks';
import { progress } from './progress';
import { initScroll, lockScroll } from './scroll';
import { Still } from './Still';
import './experience.css';

// Before anything here reads which version of the page this is, make sure the choice has been made.
if (typeof window !== 'undefined') chooseModeLate();

// The 3D layer is its own chunk and never runs on the server: the page is readable before any of it arrives.
// The download starts the moment this script runs, rather than waiting for hydration to render the component.
const stageChunk =
  typeof window !== 'undefined' && !document.documentElement.classList.contains('is-still') ? import('./Stage') : null;
const Stage = dynamic(() => stageChunk ?? import('./Stage'), { ssr: false });

/** If the 3D layer cannot start (a blocked GPU, a lost context), the page carries on with its stills. */
class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    document.documentElement.classList.add('is-still');
    document.documentElement.classList.remove('is-loading');
    lockScroll(false);
    // Lets the opening screen finish instead of waiting for a scene that will never arrive.
    progress.done();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const noop = () => () => {};
const has = (name: string) => () => document.documentElement.classList.contains(name);

// How long the name takes to sink back into the line, and then how long the two halves take to part.
// The stylesheet uses the same two figures.
const SINK = 450;
const PART = 1100;

/**
 * The opening screen: the name on a horizon line that fills as the scene really loads, with fireworks rising
 * from the line. When the scene is ready the name sinks into the line and the screen parts along it, like a
 * letterbox opening, onto the scene. It never holds the page for long: if the scene is slow to arrive, the
 * screen opens onto the still picture underneath and the scene fades in over it.
 */
function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [p, setP] = useState(0.06);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let finished = false;
    const timers: number[] = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      setP(1);
      // Never a flicker: stay up long enough for the first shell to rise and burst, then open.
      const hold = Math.max(0, 1700 - (performance.now() - start)) + 300;
      timers.push(window.setTimeout(() => setLeaving(true), hold));
      // The page behind is released as the halves start to move, so its opening lines arrive through the gap.
      timers.push(window.setTimeout(onReveal, hold + SINK));
      timers.push(window.setTimeout(onDone, hold + SINK + PART));
    };
    const off = progress.subscribe((value, ready) => {
      setP((old) => Math.max(old, value));
      if (ready) finish();
    });
    // Nobody waits longer than this for the 3D layer. The still is already underneath, and it is the scene's
    // own first frame, so the screen opens onto it and the live scene fades in when it is ready.
    timers.push(window.setTimeout(finish, 3200));
    return () => {
      off();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [onReveal, onDone]);

  return (
    <div className={leaving ? 'loader is-leaving' : 'loader'} role="status">
      <span className="sr-only">Loading the opening scene</span>
      <div className="loader__half loader__half--top" aria-hidden="true">
        <Logo className="loader__logo" />
      </div>
      <div className="loader__half loader__half--bottom" aria-hidden="true">
        <p className="loader__note">Setting the scene</p>
      </div>
      <LoaderFireworks active={!leaving} />
      <div className="loader__line" aria-hidden="true">
        <span style={{ transform: `scaleX(${p})` }} />
      </div>
    </div>
  );
}

/**
 * The cinematic layer of a page: scenery fixed behind the document, the opening screen, and scroll.
 * Its children are the chapters, rendered on the server as ordinary HTML. Nothing a reader or a search
 * engine needs lives inside the canvas.
 */
export function Experience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  // Read from the classes the boot script set. On the server, and while hydrating, the answer is "not yet".
  const still = useSyncExternalStore(noop, has('is-still'), () => false);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [loaded, setLoaded] = useState(false);
  // True from the moment the opening screen starts to part until it has gone.
  const [opening, setOpening] = useState(false);
  const wantsLoader = useSyncExternalStore(noop, has('is-loading'), () => true);

  useEffect(() => {
    // For a reload the boot script switches the browser's memory of the scroll position off, so the page
    // opens at the top. It is handed back at the visitor's first scroll, touch or key press, so that Back
    // still returns them to where they were. Not sooner: handed back on a timer, the browser took it as
    // leave to put the old position back after all.
    if (history.scrollRestoration !== 'manual') return;
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const restore = () => {
      history.scrollRestoration = 'auto';
      events.forEach((name) => window.removeEventListener(name, restore));
    };
    events.forEach((name) => window.addEventListener(name, restore, { passive: true }));
    return () => events.forEach((name) => window.removeEventListener(name, restore));
  }, []);

  useEffect(() => {
    if (still) return;
    const stop = initScroll(root.current!);
    // The boot script holds the page while the opening screen is up; smooth scrolling has to honour that too.
    if (document.documentElement.classList.contains('is-loading')) lockScroll(true);
    return () => {
      // Leaving with the opening screen still up must not leave the next page held.
      lockScroll(false);
      stop();
    };
  }, [still]);

  const reveal = useCallback(() => {
    // The class that summoned the opening screen goes now, so the page behind can begin; the screen itself
    // stays until it has finished parting.
    setOpening(true);
    document.documentElement.classList.remove('is-loading');
    lockScroll(false);
  }, []);
  const finishLoading = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && (wantsLoader || opening) && !still && <Loader onReveal={reveal} onDone={finishLoading} />}
      <div className="backdrop" aria-hidden="true">
        <Still name="hero" eager />
        {hydrated && !still && (
          <StageBoundary>
            <Stage />
          </StageBoundary>
        )}
      </div>
      <div ref={root} className="experience">
        {children}
      </div>
    </>
  );
}
