export type Tier = 'high' | 'medium' | 'low';

export interface Quality {
  tier: Tier;
  /** Upper bound for the canvas pixel ratio. The frame monitor may lower it. */
  maxDpr: number;
  shells: number;
  stars: number;
  trail: number;
  comet: number;
  bloom: boolean;
  /** Resolution of the fireworks reflection buffer, relative to the canvas. */
  reflectionScale: number;
  mist: boolean;
}

const TIERS: Record<Tier, Omit<Quality, 'tier'>> = {
  high: { maxDpr: 2, shells: 24, stars: 300, trail: 10, comet: 24, bloom: true, reflectionScale: 0.5, mist: true },
  medium: { maxDpr: 1.25, shells: 18, stars: 200, trail: 8, comet: 16, bloom: true, reflectionScale: 0.4, mist: true },
  low: { maxDpr: 1.5, shells: 12, stars: 130, trail: 6, comet: 12, bloom: false, reflectionScale: 0.33, mist: true },
};

export function pickTier(): Tier {
  const forced = new URLSearchParams(location.search).get('tier') as Tier | null;
  if (forced && forced in TIERS) return forced;

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const short = Math.min(window.innerWidth, window.innerHeight);
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  if (coarse && short < 820) return memory <= 4 || cores <= 4 ? 'low' : 'low';
  if (coarse) return 'medium';
  if (memory <= 4 || cores <= 4) return 'medium';
  return 'high';
}

export function qualityFor(tier: Tier): Quality {
  return { tier, ...TIERS[tier] };
}

export function pointCount(q: Quality): number {
  return q.shells * (q.stars * q.trail + q.comet);
}
