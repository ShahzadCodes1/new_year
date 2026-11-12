'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { TextLink } from '@/components/ui/TextLink';
import type { City } from '@/content/cities';
import { CITIES_AT } from './boot';
import { scrollState, scrollToY } from './scroll';
import { Still } from './Still';

/**
 * The city stations. Scrolling moves through them in order; the tabs jump to one. Every city is in the page
 * as ordinary HTML: only which one is showing changes. The address keeps the selected city, so it can be shared.
 */
export function Cities({ cities }: { cities: City[] }) {
  const root = useRef<HTMLDivElement>(null);
  const last = cities.length - 1;

  useEffect(() => {
    const node = root.current;
    const chapter = node?.closest<HTMLElement>('.chapter');
    if (!node || !chapter) return;
    const cards = Array.from(node.querySelectorAll<HTMLElement>('.city'));
    const tabs = Array.from(node.querySelectorAll<HTMLAnchorElement>('.tabbar a'));

    /** The scroll position at which a city is centred. */
    const positionOf = (i: number) => {
      const top = chapter.getBoundingClientRect().top + window.scrollY;
      return top + (last ? i / last : 0) * (chapter.offsetHeight - window.innerHeight);
    };

    let active = -1;
    const tick = () => {
      const c = Math.min(last, Math.max(0, scrollState.s - CITIES_AT));
      const now = Math.round(c);
      if (now === active) return;
      const first = active === -1;
      active = now;
      cards.forEach((el, i) => el.classList.toggle('is-active', i === now));
      tabs.forEach((el, i) => (i === now ? el.setAttribute('aria-current', 'true') : el.removeAttribute('aria-current')));
      // On a narrow screen the bar scrolls sideways: keep the current city in view, without moving the page.
      const bar = tabs[now].closest<HTMLElement>('.tabbar');
      if (bar && bar.scrollWidth > bar.clientWidth) {
        bar.scrollTo({ left: tabs[now].offsetLeft - (bar.clientWidth - tabs[now].offsetWidth) / 2, behavior: 'smooth' });
      }
      // Keep the address in step once the visitor is in this chapter, without adding history entries.
      if (!first && scrollState.s >= CITIES_AT - 0.2) history.replaceState(null, '', `#cities-${cities[now].slug}`);
    };
    gsap.ticker.add(tick);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.tabbar a');
      if (!link || document.documentElement.classList.contains('is-still')) return;
      e.preventDefault();
      scrollToY(positionOf(tabs.indexOf(link)));
    };
    node.addEventListener('click', onClick);

    // Arriving with a city in the address goes straight to it.
    const wanted = cities.findIndex((city) => location.hash === `#cities-${city.slug}`);
    if (wanted > 0 && !document.documentElement.classList.contains('is-still')) {
      requestAnimationFrame(() => window.scrollTo(0, positionOf(wanted)));
    }

    return () => {
      gsap.ticker.remove(tick);
      node.removeEventListener('click', onClick);
    };
  }, [cities, last]);

  return (
    <div ref={root} className="cities">
      <div className="cities__cards">
        {cities.map((city, i) => (
          <article key={city.slug} id={`cities-${city.slug}`} data-side={city.side} className={i === 0 ? 'city is-active' : 'city'}>
            <Still name={`city-${city.slug}`} />
            <div className="city__text">
              <h3 className="text-section">{city.name}</h3>
              <p className="city__verdict text-sub">{city.verdict}</p>
              <p className="city__moment">{city.moment}</p>
              <p className="city__links">
                {city.links.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
      <nav aria-label="Cities">
        <ul className="tabbar">
          {cities.map((city, i) => (
            <li key={city.slug}>
              <a href={`#cities-${city.slug}`} aria-current={i === 0 ? 'true' : undefined}>
                {city.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
