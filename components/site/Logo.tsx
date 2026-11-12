import { site } from '@/lib/site';

/**
 * The placeholder brand, until the real one arrives. The mark is a year: one turn round a ring, with the
 * point where it begins again. Beside it stand the site's initials.
 *
 * Both take their size from the font size around them and their colour from the text colour, so the same
 * logo serves the header, the footer and the opening screen.
 */
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {/* The ring stops short either side of the point, so the two read as separate at any size. */}
      <circle cx="16" cy="16" r="11.5" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" pathLength="100" strokeDasharray="84 16" strokeDashoffset="-95.5" />
      <circle cx="24.13" cy="7.87" r="3.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={className ? `logo ${className}` : 'logo'}>
      <Mark className="logo__mark" />
      <span className="logo__name">{site.shortName}</span>
      {/* Initials alone say little when read aloud: the full name follows for screen readers. */}
      <span className="sr-only">, {site.name}</span>
    </span>
  );
}
