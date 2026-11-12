import Link from 'next/link';
import type { NavItem } from '@/lib/site';
import { site } from '@/lib/site';
import { Logo } from './Logo';

/** The site footer. Links appear as their pages are built; the disclosure line joins them with the first affiliate link. */
export function SiteFooter({ items }: { items: NavItem[] }) {
  return (
    <footer data-tone="night" className="relative z-1 border-t border-(--rule) px-gutter py-12 pb-[calc(3rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[1.5rem] leading-none">
            <Logo />
          </p>
          <p className="mt-3 max-w-[36ch] text-nav text-(--muted)">{site.tagline}. Independent and written from scratch.</p>
        </div>
        {items.length > 0 && (
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-nav underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}
