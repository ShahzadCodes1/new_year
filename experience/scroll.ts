import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * Where the story is. `s` is measured in chapters, not pixels: the hero scrolling away takes it from 0 to 1,
 * the show from 1 to 2, and each city after that adds 1. Adding chapters further down the page never moves
 * the earlier ones. `s` follows the scrollbar with a little inertia, so the camera reads as a crane.
 */
export const scrollState = { s: 0, target: 0 };

/** Where a mouse pointer is, from -1 to 1 on each axis. Stays at rest on touch devices. */
export const pointerState = { x: 0, y: 0 };

let activeLenis: Lenis | null = null;

/** Holds the page still while the opening screen is up. */
export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (locked) activeLenis?.stop();
  else activeLenis?.start();
}

/** Scrolls the page to a position, smoothly where the visitor has not asked for less motion. */
export function scrollToY(y: number) {
  if (activeLenis) activeLenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScroll(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const reduce = reducedMotion();
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // Wheel smoothing on desktop only. Touch keeps native scrolling.
  let lenis: Lenis | null = null;
  let raf: ((time: number) => void) | null = null;
  if (finePointer && !reduce) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
    activeLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    raf = (time: number) => lenis!.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerState.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (finePointer && !reduce) window.addEventListener('pointermove', onPointer, { passive: true });

  // Each chapter that drives the scene says how much of the story it covers (data-span). A chapter marked
  // data-leave counts as it scrolls away; the others count while they are held on screen. A plain section
  // marked data-cover hides the scene completely while it fills the screen: the story moves on behind it, so
  // the scene is already somewhere else when it next appears.
  const chapters = Array.from(root.querySelectorAll<HTMLElement>('[data-span]'));
  const spans = chapters.map((el) => Number(el.dataset.span));
  const done = chapters.map(() => 0);
  const covers = chapters.map((el) => el.dataset.cover !== undefined);
  const before = chapters.map(() => 0);
  const triggers = chapters.map((el, i) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: el.dataset.leave !== undefined ? 'bottom top' : 'bottom bottom',
      onUpdate: (self) => (done[i] = self.progress),
      onRefresh: (self) => (done[i] = self.progress),
    }),
  );

  scrollState.s = scrollState.target = 0;
  const follow = (_time: number, deltaMs: number) => {
    let target = 0;
    // Behind a covering section there is nobody to ease the scene for: it simply has to be there.
    let unseen = false;
    for (let i = 0; i < spans.length; i++) {
      target += spans[i] * done[i];
      if (covers[i] && done[i] !== before[i]) unseen = true;
      before[i] = done[i];
    }
    scrollState.target = target;
    const k = unseen ? 1 : 1 - Math.exp((-deltaMs / 1000) * 4.5);
    scrollState.s += (target - scrollState.s) * k;
    if (Math.abs(target - scrollState.s) < 0.0004) scrollState.s = target;
  };
  gsap.ticker.add(follow);

  return () => {
    gsap.ticker.remove(follow);
    triggers.forEach((t) => t.kill());
    if (raf) gsap.ticker.remove(raf);
    lenis?.destroy();
    activeLenis = null;
    window.removeEventListener('pointermove', onPointer);
    pointerState.x = pointerState.y = 0;
  };
}
