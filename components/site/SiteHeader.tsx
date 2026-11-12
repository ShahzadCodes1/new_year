'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { site, type NavItem } from '@/lib/site';
import { watchAny } from '@/lib/watch';
import { Logo } from './Logo';

const bare = (path: string) => path.replace(/\/+$/, '');

/**
 * The site header: logo and primary navigation.
 * Over the scene it has no ground of its own. Over an ordinary section, where text scrolls beneath it, it takes
 * a navy one. Below 768px the links move into a full-screen menu.
 * A line along its lower edge runs while the next page is on its way.
 * `inline` renders it in the flow of the page (used by the style guide to show it with every link).
 */
export function SiteHeader({ items, inline = false }: { items: NavItem[]; inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  // The scene is on the home page only, so every other page starts with the header on its ground.
  const pathname = usePathname();
  const [overScene, setOverScene] = useState(pathname === '/');
  // The page a move started from. The line runs until the address is no longer that page.
  const [leaving, setLeaving] = useState<string | null>(null);
  const busy = leaving !== null && leaving === pathname;

  useEffect(() => {
    if (inline) return;
    let timer = 0;
    const begin = () => {
      setLeaving(pathname);
      window.clearTimeout(timer);
      // Whatever becomes of the move, the line does not run for ever.
      timer = window.setTimeout(() => setLeaving(null), 12000);
    };
    // Heard on the way down, before the link itself handles the click.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const to = new URL(link.href);
      if (to.origin === location.origin && bare(to.pathname) !== bare(location.pathname)) begin();
    };
    // Back and Forward: by now the address bar already shows where the visitor is going.
    const onPop = () => {
      if (bare(location.pathname) === bare(pathname)) setLeaving(null);
      else begin();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPop);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPop);
    };
  }, [inline, pathname]);

  useEffect(() => {
    if (inline) return;
    // Watch the bottom edge of the screen: once no chapter of the scene reaches it, an ordinary section is
    // rising, and the type that was pinned in place starts to scroll up under the header. A chapter that ends
    // in daylight keeps the header on its ground throughout, where pale type would be lost against the sky.
    return watchAny('.chapter:not([data-daylight])', setOverScene, '-99% 0px 0px 0px') ?? undefined;
  }, [inline]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    // The page behind a full-screen menu must not scroll.
    document.documentElement.classList.add('menu-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`site-header ${inline ? 'relative' : 'fixed inset-x-0 top-0'} z-30 border-b px-gutter pt-[env(safe-area-inset-top)] text-blush transition-[background-color,border-color] duration-300 ease-soft ${
        inline || overScene ? 'border-transparent' : 'border-snow/10 bg-navy'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6 md:h-20">
        <Link href="/" aria-label={`${site.shortName}, ${site.name} home`} className="relative z-40 inline-flex min-h-11 items-center font-display text-[1.375rem] font-semibold leading-none [text-shadow:0_1px_2px_rgb(8_13_25/0.65),0_0_18px_rgb(8_13_25/0.6)] md:text-[1.5rem]">
          <Logo />
        </Link>

        {items.length > 0 && (
          <>
            <nav aria-label={inline ? 'Primary, specimen' : 'Primary'} className="hidden md:block">
              <ul className="flex items-center gap-8">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative inline-flex min-h-11 items-center text-nav font-medium after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
              className="relative z-40 inline-flex min-h-11 items-center px-1 text-nav font-semibold md:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>

            <nav
              id={menuId}
              aria-label={inline ? 'Primary, specimen' : 'Primary'}
              hidden={!open}
              className="fixed inset-0 z-30 flex flex-col justify-center bg-navy px-gutter pb-[env(safe-area-inset-bottom)] md:hidden [&[hidden]]:hidden"
            >
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex min-h-14 items-center font-display text-card font-semibold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
      {!inline && <span className="nav-progress" data-on={busy ? '' : undefined} aria-hidden="true" />}
    </header>
  );
}
