import { pages } from '@/content/guides';

/**
 * The addresses that have a page. For use on the server only: it reads every page's content, which a
 * browser has no need to download.
 */
export const builtPaths = ['/', ...pages.map((page) => page.path)];
const built = new Set(builtPaths);

/**
 * Whether a link has somewhere to go: a place on the same page, another site, or a page that exists.
 * The home page names pages that have not been written yet; it shows their links only once they have.
 */
export const isBuilt = (href: string) => href.startsWith('#') || /^https?:\/\//.test(href) || built.has(href.split('#')[0]);
