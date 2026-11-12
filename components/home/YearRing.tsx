'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { TextLink } from '@/components/ui/TextLink';
import type { Celebration } from '@/content/celebrations';
import { scrollToY } from '@/experience/scroll';
import { current, useToday } from '@/lib/today';
import './year-ring.css';

/** Degrees between neighbouring pictures on the ring. Five are in view at once; the rest are round the back. */
const STEP = 32;

/** Where picture `i` sits when the ring has turned to `turn`: steps left (negative) or right of the front. */
const offset = (i: number, turn: number, n: number) => ((((i - turn + n / 2) % n) + n) % n) - n / 2;

/** A picture's place on the ring `d` steps from the front, and how far into the dark it has gone there. */
const placed = (d: number) => ({
  transform: `rotateY(${(d * STEP).toFixed(2)}deg) translateZ(var(--radius))`,
  visibility: Math.abs(d * STEP) > 88 ? ('hidden' as const) : ('visible' as const),
  dim: Math.min(1, Math.abs(d) / 2.2).toFixed(3),
});

/**
 * Chapter 6: the year as a ring of celebrations. Scrolling turns the ring one celebration at a time and the
 * tabs jump to one. Every celebration is in the page as ordinary text; only which one is at the front changes.
 * Without motion (reduced motion, or no scene) the ring is laid out flat as a list: see the stylesheet.
 * `children` is the chapter's heading.
 */
export function YearRing({ celebrations, children }: { celebrations: Celebration[]; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const n = celebrations.length;
  const today = useToday();

  useEffect(() => {
    const section = root.current;
    if (!section || document.documentElement.classList.contains('is-still')) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>('.wheel__card'));
    const captions = Array.from(section.querySelectorAll<HTMLElement>('.celebration'));
    const tabs = Array.from(section.querySelectorAll<HTMLAnchorElement>('.tabbar a'));
    const travel = () => section.offsetHeight - window.innerHeight;

    let frame = 0;
    let active = -1;
    const place = () => {
      frame = 0;
      const room = travel();
      const progress = room > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / room)) : 0;
      const turn = progress * (n - 1);
      cards.forEach((card, i) => {
        const at = placed(offset(i, turn, n));
        card.style.transform = at.transform;
        card.style.visibility = at.visibility;
        card.style.setProperty('--dim', at.dim);
      });
      const front = Math.round(turn);
      if (front === active) return;
      active = front;
      captions.forEach((el, i) => el.classList.toggle('is-active', i === front));
      tabs.forEach((el, i) => (i === front ? el.setAttribute('aria-current', 'true') : el.removeAttribute('aria-current')));
      // On a narrow screen the bar scrolls sideways: keep the current tab in view, without moving the page.
      const bar = tabs[front].closest<HTMLElement>('.tabbar');
      if (bar && bar.scrollWidth > bar.clientWidth) {
        bar.scrollTo({ left: tabs[front].offsetLeft - (bar.clientWidth - tabs[front].offsetWidth) / 2, behavior: 'smooth' });
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.tabbar a');
      if (!link) return;
      e.preventDefault();
      const top = section.getBoundingClientRect().top + window.scrollY;
      scrollToY(top + (tabs.indexOf(link) / (n - 1)) * travel());
    };

    place();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    section.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      section.removeEventListener('click', onClick);
    };
  }, [n]);

  return (
    <section
      ref={root}
      id="celebrations"
      data-tone="night"
      className="year"
      style={{ '--count': n } as CSSProperties}
      aria-labelledby="year-title"
    >
      <div className="year__hold">
        <div className="year__head">{children}</div>

        {/* The ring is scenery: every celebration is named in the captions below it. */}
        <div className="wheel" aria-hidden="true">
          <div className="wheel__turn">
            {celebrations.map((c, i) => {
              const at = placed(offset(i, 0, n));
              return (
                <div key={c.slug} className="wheel__card" style={{ transform: at.transform, visibility: at.visibility, '--dim': at.dim } as CSSProperties}>
                  <Image src={c.image} alt="" sizes="(min-width: 900px) 22vw, 50vw" placeholder="blur" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="year__captions">
          {celebrations.map((c, i) => {
            const next = current(c.dates, today);
            return (
              <article key={c.slug} id={`celebrations-${c.slug}`} className={i === 0 ? 'celebration is-active' : 'celebration'}>
                <Image className="celebration__picture" src={c.image} alt="" sizes="(min-width: 700px) 320px, 100vw" />
                <div>
                  <h3 className="text-card">{c.name}</h3>
                  {(c.annual || next) && (
                    <p className="celebration__when">
                      {c.annual ?? next!.when}
                      {next?.note && <span> {next.note}</span>}
                    </p>
                  )}
                  <p className="celebration__line">{c.line}</p>
                  {c.href && (
                    <p className="celebration__link">
                      <TextLink href={c.href}>More on {c.name}</TextLink>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <nav aria-label="Celebrations">
          <ul className="tabbar">
            {celebrations.map((c, i) => (
              <li key={c.slug}>
                <a href={`#celebrations-${c.slug}`} aria-current={i === 0 ? 'true' : undefined}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
