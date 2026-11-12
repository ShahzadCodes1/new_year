import * as THREE from 'three';

export const MAX_SHELLS = 24;
export const MAX_LIGHTS = 4;
export const MAX_SMOKE = 16;

/** Shell types, matched by number in the vertex shader. */
const PEONY = 0;
const WILLOW = 1;
const RING = 2;
const CHRYSANTHEMUM = 3;
const PALM = 4;

interface Palette {
  a: [number, number, number];
  b: [number, number, number];
  weight: number;
}

// Gold leads, as it does in a real display. Red and blue are the exceptions. These are the colours of
// shells, not of the page: gold is no longer in the site's palette, and the client asked for it to stay here.
const PALETTE: Palette[] = [
  { a: [1.0, 0.72, 0.32], b: [0.9, 0.35, 0.1], weight: 0.4 },
  { a: [1.0, 0.92, 0.74], b: [1.0, 0.62, 0.3], weight: 0.22 },
  { a: [1.0, 0.25, 0.18], b: [0.55, 0.06, 0.04], weight: 0.18 },
  { a: [0.84, 0.9, 1.0], b: [0.5, 0.6, 0.85], weight: 0.12 },
  { a: [0.35, 0.6, 1.0], b: [0.15, 0.25, 0.7], weight: 0.08 },
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface SpawnFrame {
  /** Horizontal extent in world metres that is on screen at the launch distance. */
  xMin: number;
  xMax: number;
  /** World Z of the launch line. */
  z: number;
  /** Ground level shells rise from, and the range of burst heights. */
  base: number;
  yMin: number;
  yMax: number;
}

/**
 * Schedules the show. All per-particle motion happens on the GPU; this only
 * decides when and where a shell bursts and reports the brightest bursts as lights.
 */
export class Director {
  readonly origin: THREE.Vector4[] = [];
  readonly colA: THREE.Vector4[] = [];
  readonly colB: THREE.Vector4[] = [];
  readonly par: THREE.Vector4[] = [];
  readonly launch: THREE.Vector4[] = [];
  readonly lightPos: THREE.Vector3[] = [];
  readonly lightCol: THREE.Vector3[] = [];
  /** Unit direction from the camera to each light, so the shaders need not normalise per pixel. */
  readonly lightDir: THREE.Vector3[] = [];

  /** Where each recent burst left its smoke: position, and the time it burst. */
  readonly smoke: THREE.Vector4[] = [];
  private smokeCursor = 0;
  /** Ground level each shell was launched from. */
  readonly base = new Float32Array(MAX_SHELLS);
  private readonly life = new Float32Array(MAX_SHELLS);
  private readonly power = new Float32Array(MAX_SHELLS);
  private cursor = 0;
  private next = 0;
  private salvo = 0;
  private readonly rnd = mulberry32(2027);
  private readonly ranked: { i: number; v: number }[] = [];

  constructor(private readonly count: number) {
    for (let i = 0; i < MAX_SHELLS; i++) {
      this.origin.push(new THREE.Vector4(0, 0, 0, -1000));
      this.colA.push(new THREE.Vector4(1, 1, 1, 0));
      this.colB.push(new THREE.Vector4(1, 1, 1, 60));
      this.par.push(new THREE.Vector4(2, 1.6, 0.4, 3));
      this.launch.push(new THREE.Vector4(0, 0, 1, 0));
      this.ranked.push({ i, v: 0 });
    }
    for (let i = 0; i < MAX_SMOKE; i++) this.smoke.push(new THREE.Vector4(0, 0, 0, -1000));
    for (let i = 0; i < MAX_LIGHTS; i++) {
      this.lightPos.push(new THREE.Vector3());
      this.lightCol.push(new THREE.Vector3());
      this.lightDir.push(new THREE.Vector3(0, 0, -1));
    }
  }

  private pickPalette(): Palette {
    let r = this.rnd();
    for (const p of PALETTE) {
      if ((r -= p.weight) <= 0) return p;
    }
    return PALETTE[0];
  }

  /** A slot is reusable only once its previous shell has burnt out, so no burst is ever cut short. */
  private freeSlot(time: number): number {
    for (let k = 0; k < this.count; k++) {
      const i = (this.cursor + k) % this.count;
      if (time > this.origin[i].w + this.life[i] * 1.25) {
        this.cursor = (i + 1) % this.count;
        return i;
      }
    }
    return -1;
  }

  private spawn(time: number, frame: SpawnFrame, delay: number, quick = false) {
    const i = this.freeSlot(time);
    if (i < 0) return;
    const r = this.rnd;

    const roll = r();
    const type = roll < 0.34 ? PEONY : roll < 0.58 ? CHRYSANTHEMUM : roll < 0.76 ? WILLOW : roll < 0.9 ? PALM : RING;
    const pal = type === WILLOW ? PALETTE[r() < 0.7 ? 0 : 1] : this.pickPalette();

    const x = THREE.MathUtils.lerp(frame.xMin, frame.xMax, 0.08 + 0.84 * r());
    const y = THREE.MathUtils.lerp(frame.yMin, frame.yMax, r());
    const z = frame.z + (r() - 0.5) * 50;
    // A quick shell is already at height: it bursts almost at once, for the stroke of midnight.
    const rise = quick ? 0.1 + 0.12 * r() : 1.5 + 0.7 * r();
    const burst = time + delay + rise;

    let speed = 62;
    let drag = 1.6;
    let gravity = 0.4;
    let life = 2.1;
    let size = 3.0;
    if (type === PEONY) {
      speed = 55 + 28 * r();
      life = 1.8 + 0.6 * r();
      size = 3.2;
    } else if (type === WILLOW) {
      speed = 46 + 16 * r();
      drag = 1.15;
      gravity = 0.95;
      life = 3.6 + 0.9 * r();
      size = 2.5;
    } else if (type === RING) {
      speed = 58 + 12 * r();
      life = 1.7;
      size = 3.4;
    } else if (type === CHRYSANTHEMUM) {
      speed = 60 + 26 * r();
      drag = 1.5;
      life = 2.4 + 0.6 * r();
    } else {
      speed = 66 + 12 * r();
      drag = 1.3;
      gravity = 0.7;
      life = 2.6;
      size = 3.6;
    }

    this.origin[i].set(x, y, z, burst);
    this.colA[i].set(pal.a[0], pal.a[1], pal.a[2], type);
    this.colB[i].set(pal.b[0], pal.b[1], pal.b[2], speed);
    this.par[i].set(life, drag, gravity, size);
    this.launch[i].set(x + (r() - 0.5) * 30, z, rise, r());
    this.base[i] = frame.base;
    this.smoke[this.smokeCursor].set(x, y, z, burst);
    this.smokeCursor = (this.smokeCursor + 1) % MAX_SMOKE;
    this.life[i] = life;
    this.power[i] = 0.75 + 0.5 * r() + (type === WILLOW ? -0.15 : 0);
  }

  /** The stroke of midnight: several shells burst together, at once. */
  strike(time: number, frame: SpawnFrame, shells: number) {
    for (let k = 0; k < shells; k++) this.spawn(time, frame, k * 0.09, true);
    this.next = time + 0.9;
  }

  /** `intensity` is 0 (quiet) to 1 (finale). Above 1 forces salvos. */
  update(time: number, intensity: number, frame: SpawnFrame, eye: THREE.Vector3) {
    if (intensity > 0.02 && time >= this.next) {
      const gap = THREE.MathUtils.lerp(1.5, 0.2, Math.min(intensity, 1));
      this.spawn(time, frame, 0);
      if (intensity > 0.65 && this.rnd() < 0.3) this.salvo = 2 + Math.floor(this.rnd() * 3);
      this.next = time + gap * (0.45 + this.rnd());
    }
    if (this.salvo > 0) {
      this.spawn(time, frame, 0.1 * this.salvo);
      this.salvo--;
    }

    // Rank bursts by current brightness and hand the top few to the shaders as lights.
    for (let i = 0; i < MAX_SHELLS; i++) {
      const t0 = time - this.origin[i].w;
      let v = 0;
      if (t0 >= 0 && t0 < this.life[i]) {
        const life = this.life[i];
        const sustain = 1 - THREE.MathUtils.smoothstep(t0, 0.35 * life, life);
        // The light grows with the burst instead of arriving before any star is visible.
        v = this.power[i] * (1.7 * Math.exp(-t0 * 5) + 0.75 * sustain) * THREE.MathUtils.smoothstep(t0, 0, 0.07);
      }
      this.ranked[i].i = i;
      this.ranked[i].v = v;
    }
    this.ranked.sort((a, b) => b.v - a.v);
    for (let l = 0; l < MAX_LIGHTS; l++) {
      const { i, v } = this.ranked[l];
      const o = this.origin[i];
      const c = this.colA[i];
      this.lightPos[l].set(o.x, o.y - 8, o.z);
      this.lightCol[l].set(c.x * v, c.y * v, c.z * v);
      this.lightDir[l].copy(this.lightPos[l]).sub(eye).normalize();
    }
  }

  /** Total light currently in the air, for exposure and diagnostics. */
  energy(): number {
    let e = 0;
    for (let l = 0; l < MAX_LIGHTS; l++) e += this.ranked[l].v;
    return e;
  }
}
