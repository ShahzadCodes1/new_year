'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { MIDNIGHT_AT } from './boot';
import { scrollState } from './scroll';

/**
 * A line of type that scrolling brings up to full strength, a word at a time, between two points on the page.
 * It also marks its chapter as struck at `strikeAt` (by default, the moment the show begins), which is what
 * brings the answering line in.
 * The words are ordinary text in the heading: only their brightness changes.
 */
export function ScrollLine({ text, from, to, strikeAt = MIDNIGHT_AT }: { text: string; from: number; to: number; strikeAt?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const node = el.current;
    const chapter = node?.closest('.chapter');
    if (!node || !chapter) return;
    const spans = Array.from(node.children);
    let lit = -1;
    let struck: boolean | null = null;
    // Touches the page only when something actually changes, never every frame.
    const tick = () => {
      const p = scrollState.s;
      const k = Math.round(Math.min(1, Math.max(0, (p - from) / (to - from))) * spans.length);
      if (k !== lit) {
        lit = k;
        spans.forEach((s, i) => s.classList.toggle('is-lit', i < k));
      }
      const now = p >= strikeAt;
      if (now !== struck) {
        struck = now;
        chapter.classList.toggle('is-struck', now);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [from, to, strikeAt]);

  return (
    <span ref={el} className="scroll-line">
      {words.map((word, i) => (
        <span key={i}>{i < words.length - 1 ? `${word} ` : word}</span>
      ))}
    </span>
  );
}
