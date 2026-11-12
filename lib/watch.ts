/**
 * Reports whether any element matching `selector` is on screen, and again whenever that changes.
 * `rootMargin` narrows what counts as the screen (see IntersectionObserver). Returns a function that stops
 * watching, or null when nothing matches.
 */
export function watchAny(selector: string, onChange: (anyOnScreen: boolean) => void, rootMargin = '0px'): (() => void) | null {
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return null;
  const onScreen = new Set<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      onChange(onScreen.size > 0);
    },
    { rootMargin },
  );
  targets.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
