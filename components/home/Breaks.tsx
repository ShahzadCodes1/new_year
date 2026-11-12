import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Break } from '@/content/breaks';
import type { StaticImageData } from 'next/image';
import './breaks.css';

/**
 * Chapter 5, the light spread: New Year breaks. The opening words sit beside one wide photograph; below them,
 * five ways in, each a photograph, a name and a line. On a narrow screen the five run sideways.
 * `children` is the chapter's heading, lede and action.
 */
/** One way in: a link once its page exists, the same picture and words without one until then. */
function Way({ href, children }: { href?: string; children: ReactNode }) {
  return href ? (
    <Link href={href} className="break">
      {children}
    </Link>
  ) : (
    <div className="break">{children}</div>
  );
}

export function Breaks({ lead, types, children }: { lead: StaticImageData; types: Break[]; children: ReactNode }) {
  return (
    <div className="breaks">
      <div className="breaks__lead">
        <div className="breaks__words">{children}</div>
        {/* Decorative: the words beside it say what the section is. */}
        <Image className="breaks__picture" src={lead} alt="" sizes="(min-width: 900px) 55vw, 100vw" placeholder="blur" />
      </div>
      <ul className="breaks__types">
        {types.map((type) => (
          <li key={type.slug}>
            <Way href={type.href}>
              <span className="break__frame">
                <Image src={type.image} alt="" sizes="(min-width: 900px) 18vw, 62vw" placeholder="blur" />
              </span>
              <span className="break__name">{type.name}</span>
              <span className="break__line">{type.line}</span>
            </Way>
          </li>
        ))}
      </ul>
    </div>
  );
}
