import type { CSSProperties, ReactNode } from 'react';
import './close.css';

/** A repeatable sequence of numbers between 0 and 1, so the server and the browser draw the same embers. */
function sequence(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const next = sequence(20261231);
/** The embers: where each one falls, how large it is, how long it takes and when it starts. */
const embers = Array.from({ length: 22 }, () => ({
  left: `${(next() * 100).toFixed(1)}%`,
  size: `${(2 + next() * 3).toFixed(1)}px`,
  drift: `${(next() * 60 - 30).toFixed(0)}px`,
  duration: `${(9 + next() * 10).toFixed(1)}s`,
  delay: `${(-next() * 19).toFixed(1)}s`,
}));

/**
 * Chapter 8: the close. One last quiet frame, a few embers still coming down, the page's two main ways on,
 * and a plain note about the letter. `children` is the closing line and what follows it.
 */
export function Close({ children }: { children: ReactNode }) {
  return (
    <section id="close" data-tone="night" className="close" aria-labelledby="close-title">
      {/* Scenery only. */}
      <div className="close__embers" aria-hidden="true">
        {embers.map((e, i) => (
          <span key={i} style={{ left: e.left, '--size': e.size, '--drift': e.drift, animationDuration: e.duration, animationDelay: e.delay } as CSSProperties} />
        ))}
      </div>
      <div className="close__words">{children}</div>
    </section>
  );
}
