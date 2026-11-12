'use client';

import { useEffect, useRef } from 'react';

/**
 * The fireworks on the opening screen. Shells rise from the horizon line, burst above the logo and fall
 * away, with a faint reflection below the line.
 *
 * It is a small 2D canvas, not the 3D scene: the scene is still downloading and compiling while this plays,
 * so this must cost almost nothing. A few hundred short strokes a frame at most, drawn only while the opening
 * screen is up. Visitors who ask for less motion never see the opening screen at all, so there is nothing to
 * hold still for them; the check below is a second line of defence.
 */
type Rgb = [number, number, number];

// Gold first, as in the scene's own show: warm gold, pale gold and amber, then a little red and silver-blue.
const COLOURS: { rgb: Rgb; weight: number }[] = [
  { rgb: [255, 190, 96], weight: 0.4 },
  { rgb: [255, 228, 180], weight: 0.24 },
  { rgb: [255, 150, 84], weight: 0.14 },
  { rgb: [232, 98, 86], weight: 0.12 },
  { rgb: [186, 206, 238], weight: 0.1 },
];

const pickColour = (): Rgb => {
  let r = Math.random();
  for (const c of COLOURS) {
    if ((r -= c.weight) <= 0) return c.rgb;
  }
  return COLOURS[0].rgb;
};

interface Shell {
  x: number;
  from: number;
  to: number;
  age: number;
  rise: number;
  colour: Rgb;
}

interface Spark {
  x: number;
  y: number;
  /** The far end of the spark's tail, which follows it a moment behind. */
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  width: number;
  phase: number;
  colour: Rgb;
}

interface Flash {
  x: number;
  y: number;
  age: number;
  radius: number;
  colour: Rgb;
}

const MAX_SPARKS = 420;

export function LoaderFireworks({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  // Whether new shells may still be launched. The ones in the air finish their fall either way.
  const launching = useRef(active);
  useEffect(() => {
    launching.current = active;
  }, [active]);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let w = 0;
    let h = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
    };
    size();
    window.addEventListener('resize', size);

    const shells: Shell[] = [];
    const sparks: Spark[] = [];
    const flashes: Flash[] = [];
    let nextLaunch = 0.05;
    let clock = 0;
    let last = performance.now();
    let frame = 0;

    const launch = () => {
      const horizon = h * 0.5;
      // Either side of the logo, so a rising shell never crosses the name.
      const side = Math.random() < 0.5 ? 0.14 + Math.random() * 0.24 : 0.62 + Math.random() * 0.24;
      shells.push({ x: w * side, from: horizon, to: h * (0.13 + Math.random() * 0.2), age: 0, rise: 0.5 + Math.random() * 0.2, colour: pickColour() });
    };

    const burst = (shell: Shell) => {
      const radius = Math.max(70, Math.min(190, Math.min(w, h) * 0.22));
      const speed = radius * 3.2;
      const count = w < 600 ? 60 : 92;
      const add = (n: number, colour: Rgb, scale: number, life: number, width: number) => {
        for (let i = 0; i < n && sparks.length < MAX_SPARKS; i++) {
          // Points on a sphere seen from the side: even round the circle, denser toward the rim.
          const angle = Math.random() * Math.PI * 2;
          const reach = Math.sqrt(1 - Math.pow(Math.random(), 2)) * (0.86 + Math.random() * 0.14);
          const v = speed * scale * reach;
          sparks.push({
            x: shell.x,
            y: shell.to,
            tx: shell.x,
            ty: shell.to,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v,
            age: 0,
            life: life * (0.75 + Math.random() * 0.45),
            width: width * (0.7 + Math.random() * 0.6),
            phase: Math.random() * 6.28,
            colour,
          });
        }
      };
      add(count, shell.colour, 1, 1.45, 1.5);
      // Some shells carry a second, paler heart.
      if (Math.random() < 0.45) add(Math.round(count / 3), [255, 240, 214], 0.45, 1.1, 1.3);
      flashes.push({ x: shell.x, y: shell.to, age: 0, radius: radius * 0.9, colour: shell.colour });
    };

    const stroke = (x0: number, y0: number, x1: number, y1: number, c: Rgb, alpha: number, width: number) => {
      ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    };

    const tick = (now: number) => {
      // The scene is compiling its shaders while this plays, so frames can be far apart. The show keeps to real
      // time all the same: a long frame is taken in several short steps, which keeps every trail unbroken.
      const elapsed = Math.min(0.14, (now - last) / 1000);
      last = now;
      const steps = Math.max(1, Math.ceil(elapsed / 0.034));
      const dt = elapsed / steps;
      const horizon = h * 0.5;
      const mirror = (y: number) => horizon + (horizon - y) * 0.55;

      for (let step = 0; step < steps; step++) advance(dt);

      // Every frame is drawn afresh. A tail is a line from where the spark was a moment ago, not light left
      // behind on the canvas, so nothing lingers as haze.
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      draw(horizon, mirror);
      frame = requestAnimationFrame(tick);
    };

    const advance = (dt: number) => {
      clock += dt;
      if (launching.current && clock >= nextLaunch) {
        launch();
        if (Math.random() < 0.25) launch();
        nextLaunch = clock + 0.5 + Math.random() * 0.4;
      }

      for (let i = shells.length - 1; i >= 0; i--) {
        const s = shells[i];
        s.age += dt;
        if (s.age >= s.rise) {
          burst(s);
          shells.splice(i, 1);
        }
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        flashes[i].age += dt;
        if (flashes[i].age >= 0.3) flashes.splice(i, 1);
      }

      const gravity = Math.min(w, h) * 0.13;
      const drag = Math.exp(-2.6 * dt);
      const follow = 1 - Math.exp(-dt * 6.5);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.age += dt;
        if (p.age >= p.life) {
          sparks.splice(i, 1);
          continue;
        }
        p.vx *= drag;
        p.vy = p.vy * drag + gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.tx += (p.x - p.tx) * follow;
        p.ty += (p.y - p.ty) * follow;
      }
    };

    const draw = (horizon: number, mirror: (y: number) => number) => {
      for (const s of shells) {
        // A faint tail on the way up, thinning as the shell slows: the burst is the event, not the climb.
        const k = Math.min(1, s.age / s.rise);
        const at = (t: number) => s.from + (s.to - s.from) * (1 - Math.pow(1 - Math.max(0, t), 2.2));
        stroke(s.x, at(k - 0.12), s.x, at(k), [255, 214, 170], 0.5 * (1 - k * 0.6), 1.2);
      }

      for (const f of flashes) {
        const k = f.age / 0.3;
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        glow.addColorStop(0, `rgba(${f.colour[0]},${f.colour[1]},${f.colour[2]},${0.22 * (1 - k)})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(f.x - f.radius, f.y - f.radius, f.radius * 2, f.radius * 2);
      }

      for (const p of sparks) {
        const k = p.age / p.life;
        // Bright as it leaves, then its own colour as it cools; the last of it flickers before it goes out.
        let alpha = Math.pow(1 - k, 0.9);
        if (k > 0.6) alpha *= 0.55 + 0.45 * Math.sin(clock * 38 + p.phase);
        const heat = Math.max(0, 1 - k * 7);
        const c: Rgb = [p.colour[0] + (255 - p.colour[0]) * heat, p.colour[1] + (255 - p.colour[1]) * heat, p.colour[2] + (255 - p.colour[2]) * heat].map(Math.round) as Rgb;
        if (p.y < horizon) {
          // A soft halo under each stroke stands in for bloom.
          const mx = (p.tx + p.x) / 2;
          const my = (p.ty + p.y) / 2;
          stroke(p.tx, p.ty, p.x, p.y, c, alpha * 0.14, p.width * 3.4);
          // The tail thins and fades away from the head.
          stroke(p.tx, p.ty, mx, my, c, alpha * 0.32, p.width * 0.8);
          stroke(mx, my, p.x, p.y, c, alpha, p.width);
        }
        stroke(p.tx, mirror(p.ty), p.x, mirror(p.y), c, alpha * 0.15, p.width * 1.4);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', size);
    };
  }, []);

  return <canvas ref={canvas} className="loader__sky" aria-hidden="true" />;
}
