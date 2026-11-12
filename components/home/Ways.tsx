'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { TextLink } from '@/components/ui/TextLink';
import type { Way } from '@/content/ways';
import './ways.css';

/**
 * Chapter 4: the ways to spend the night. On a wide screen the list sits beside one photograph, which follows
 * the row being pointed at or tabbed through. On a narrow screen every row carries its own small photograph,
 * so nothing depends on hovering. `children` is the chapter's heading, which sits above the list.
 */
export function Ways({ ways, children }: { ways: Way[]; children: ReactNode }) {
  const [active, setActive] = useState(0);

  return (
    <div className="ways">
      <div>
        {children}
        <ul className="ways__list">
          {ways.map((way, i) => (
            <li
              key={way.slug}
              id={`ways-${way.slug}`}
              className="way"
              data-active={i === active}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {/* Decorative: the row's own words say what it is. */}
              <Image className="way__thumb" src={way.image} alt="" sizes="88px" />
              <div>
                <h3 className="text-card">{way.name}</h3>
                <p className="way__line">{way.line}</p>
                <p className="way__detail">{way.detail}</p>
              </div>
              {way.links.length > 0 && (
                <p className="way__links">
                  <span>In</span>
                  {way.links.map((link) => (
                    <TextLink key={link.href} href={link.href} aria-label={`${way.name} in ${link.city}`}>
                      {link.city}
                    </TextLink>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="ways__frame" aria-hidden="true">
        {ways.map((way, i) => (
          <Image key={way.slug} src={way.image} alt="" sizes="(min-width: 900px) 40vw, 1px" placeholder="blur" data-active={i === active} />
        ))}
      </div>
    </div>
  );
}
