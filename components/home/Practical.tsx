'use client';

import type { ReactNode } from 'react';
import { TextLink } from '@/components/ui/TextLink';
import type { Practical as Item } from '@/content/practical';
import { current, useToday } from '@/lib/today';
import './practical.css';

/**
 * Chapter 7: the useful bits. Short questions, each answered outright in its first words, with a link to the
 * page that has the detail. A dated answer gives way to the next one once its day has passed.
 * `children` is the chapter's heading.
 */
export function Practical({ items, children }: { items: Item[]; children: ReactNode }) {
  const today = useToday();

  return (
    <div className="practical">
      <div className="practical__head">{children}</div>
      <ul className="practical__list">
        {items.map((item) => {
          const dated = current(item.dated, today);
          const answer = dated?.answer ?? item.answer;
          const detail = dated?.detail ?? item.detail;
          return (
            <li key={item.slug} id={`practical-${item.slug}`} className="fact">
              <h3>{item.question}</h3>
              {answer && (
                <p>
                  <strong>{answer}</strong> {detail}
                </p>
              )}
              {item.greetings && (
                <ul className="fact__says">
                  {item.greetings.map((g) => (
                    <li key={g.lang}>
                      <span lang={g.lang}>{g.phrase}</span>
                      <small>{g.language}</small>
                    </li>
                  ))}
                </ul>
              )}
              {item.link && (
                <p className="fact__link">
                  <TextLink href={item.link.href}>{item.link.label}</TextLink>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
