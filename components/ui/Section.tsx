import type { ReactNode } from 'react';

export type Tone = 'night' | 'deep' | 'light';

/**
 * An editorial section: a ground (tone), the page gutter and the content width.
 * `id` and `labelledBy` make it a named landmark when it opens with a heading.
 */
export function Section({
  tone = 'night',
  id,
  labelledBy,
  className = '',
  children,
}: {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-tone={tone} className={`px-gutter py-section ${className}`}>
      <div className="mx-auto w-full max-w-page">{children}</div>
    </section>
  );
}
