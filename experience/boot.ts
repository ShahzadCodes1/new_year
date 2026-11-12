/**
 * Inlined by the root layout so it runs before first paint, once per full page load. It decides between the
 * live scene and the stills (reduced motion, a browser without WebGL 2, or `?mode=still`) and, on the home
 * page, raises the opening screen, so nothing flashes while the page hydrates. It only asks whether WebGL 2
 * exists: creating a context here would hold up the page. If the 3D layer later fails to start, the
 * Experience falls back to the stills itself. `?loader=0` skips the opening screen; `?capture=1` is used when
 * photographing stills.
 *
 * A reload of the home page opens at the top, not part-way through the story: the browser is told not to
 * put the scroll position back, and a `#section` left in the address by a tab is dropped. The Experience
 * hands scroll memory back to the browser at the visitor's first scroll, so Back keeps working as usual.
 *
 * The page is served as the still version (`is-still` on <html>) and this script takes that away when the
 * scene can run. So a visitor whose browser runs no scripts, or whose scripts fail to arrive, gets the complete
 * still page and not the scene's layout with no scene in it.
 *
 * It lives in the layout, not the home page, because React never runs a script it creates in the browser:
 * arriving at the home page from another page of the site would skip it. From the layout it has already
 * chosen scene or stills by then, and the home page opens without the opening screen.
 */
export const BOOT = `(function(){var d=document.documentElement,q=new URLSearchParams(location.search);d.dataset.boot='1';var s=q.get('mode')==='still'||matchMedia('(prefers-reduced-motion: reduce)').matches;if(!s)s=!window.WebGL2RenderingContext;if(q.has('capture'))d.classList.add('capture');if(!s){d.classList.remove('is-still');if(location.pathname==='/'&&!q.has('capture')&&q.get('loader')!=='0')d.classList.add('is-loading','is-locked')}var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];if(location.pathname==='/'&&n&&n.type==='reload'){history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);scrollTo(0,0)}})()`;

/**
 * The same choice between scene and stills, for a document the boot script never ran in. The missing-page
 * screen is assembled in the browser, so an inline script in it is never executed; a visitor who goes from
 * there to the home page would otherwise be left with the still version. No opening screen is raised: by now
 * the page is already on screen.
 */
export function chooseModeLate() {
  const d = document.documentElement;
  if (d.dataset.boot) return;
  d.dataset.boot = '1';
  const still =
    new URLSearchParams(location.search).get('mode') === 'still' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('WebGL2RenderingContext' in window);
  if (!still) d.classList.remove('is-still');
}

/** The cities the scene visits, in order. Each has a plate folder in public/plates/ and an entry in content/cities.ts. */
export const STATIONS = ['london', 'manchester', 'birmingham', 'liverpool', 'newcastle', 'glasgow', 'edinburgh'] as const;

/** The scene the page opens on. The engine builds it first and the page preloads its files. */
export const FIRST_SCENE = STATIONS[0];

// Positions in the story, in chapters (see scrollState.s): 0 to 1 is the hero scrolling away, 1 to 2 the show.
/** Where the show begins: the first shells burst and the answering line arrives. */
export const MIDNIGHT_AT = 1.25;
/** Where the cities chapter begins. Each city after the first adds 1. */
export const CITIES_AT = 2;
/** Where the morning chapter begins: one step past the last city, taken while a plain section covers the scene. */
export const DAWN_AT = CITIES_AT + STATIONS.length;

const calm = '(prefers-reduced-motion: no-preference)';
// Mirrors the engine's tier choice: touch devices with a short side under 820px take the small plate.
const SMALL = `(pointer: coarse) and (max-width: 819px) and ${calm}, (pointer: coarse) and (max-height: 819px) and ${calm}`;
const LARGE = `(pointer: fine) and ${calm}, (pointer: coarse) and (min-width: 820px) and (min-height: 820px) and ${calm}`;

/** Files the opening scene needs, with the media condition under which each one will actually be used. */
export const PRELOADS: { href: string; media: string }[] = [
  { href: `/plates/${FIRST_SCENE}/plate.json`, media: calm },
  { href: `/plates/${FIRST_SCENE}/plate-small.avif`, media: SMALL },
  { href: `/plates/${FIRST_SCENE}/plate-large.avif`, media: LARGE },
  { href: `/plates/${FIRST_SCENE}/sky.avif`, media: calm },
  { href: `/plates/${FIRST_SCENE}/mask.png`, media: calm },
];
