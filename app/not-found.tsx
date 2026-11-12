import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { readyNav } from '@/lib/site';
import '@/components/guide/guide.css';

export const metadata: Metadata = { title: 'Page not found' };

/** Any address that is not a page. It says so plainly and offers the ways back in. */
export default function NotFound() {
  return (
    <article className="guide">
      <header className="g-hero" data-tone="night">
        <div className="g-hero__inner g-hero__inner--plain">
          <div>
            <h1>This page is not here</h1>
            <p className="g-hero__standfirst">The address may be mistyped, or the page may have moved. Any of these will put you back on your way.</p>
            <ul className="mt-10 flex flex-wrap gap-3">
              <li>
                <Button href="/">Go to the home page</Button>
              </li>
              {readyNav.map((item) => (
                <li key={item.href}>
                  <Button href={item.href} variant="secondary">
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </article>
  );
}
