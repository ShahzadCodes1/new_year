import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Section, type Tone } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import type { Fact, PageBase, Pick, Question } from '@/content/guides/types';
import { longDate } from '@/lib/dates';
import { site } from '@/lib/site';
import './guide.css';

export { longDate };

/**
 * A reading page: its opening, then whatever blocks the template gives it. Also says where the page sits in
 * the site, in a form search engines read (the breadcrumb trail is true of every page).
 */
export function Guide({ page, contents, children }: { page: PageBase; contents?: { id: string; label: string }[]; children: ReactNode }) {
  const trail = [...page.crumbs, { label: page.title, href: page.path }];
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
  };

  return (
    <article className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <header className="g-hero" data-tone="night">
        <div className={page.image ? 'g-hero__inner' : 'g-hero__inner g-hero__inner--plain'}>
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="g-crumbs">
                {page.crumbs.map((c) => (
                  <li key={c.label}>
                    <TextLink href={c.href!}>{c.label}</TextLink>
                  </li>
                ))}
                <li>
                  <span aria-current="page">{page.title}</span>
                </li>
              </ol>
            </nav>
            <h1>{page.title}</h1>
            <p className="g-hero__standfirst">{page.standfirst}</p>
            <p className="g-hero__meta">Last checked {longDate(page.checked)}</p>
          </div>
          {page.image && (
            <div className="g-hero__stage">
              <div className="g-hero__picture">
                {/* Decorative: the heading and standfirst say what the page is. */}
                <Image src={page.image} alt="" sizes="(min-width: 900px) 55vw, 100vw" placeholder="blur" priority />
              </div>
              {page.keyFacts && (
                <div className="g-hero__facts">
                  <Facts facts={page.keyFacts} />
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {contents && (
        <nav className="g-contents" data-tone="night" aria-label="On this page">
          <ul>
            {contents.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>{c.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {children}
    </article>
  );
}

/** One block of a page: a heading, perhaps a line under it, and its content, on a ground of its own. */
export function Block({ id, tone = 'night', title, lede, children }: { id: string; tone?: Tone; title: string; lede?: string; children: ReactNode }) {
  return (
    <Section tone={tone} id={id} labelledBy={`${id}-title`} className="g-block relative z-1">
      <div className="g-block__head">
        <h2 id={`${id}-title`}>{title}</h2>
        {lede && <p className="g-block__lede">{lede}</p>}
      </div>
      {children}
    </Section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="g-prose">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

export function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="g-facts">
      {facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Words on one side, a panel of facts on the other. */
export function Passage({ body, facts }: { body: string[]; facts?: Fact[] }) {
  if (!facts) return <Prose paragraphs={body} />;
  return (
    <div className="g-split">
      <Prose paragraphs={body} />
      <div className="g-panel">
        <Facts facts={facts} />
      </div>
    </div>
  );
}

/** Things recommended, as cards. A card with somewhere to go is a link from edge to edge. */
export function Cards({ picks }: { picks: Pick[] }) {
  return (
    <ul className="g-cards" data-count={picks.length}>
      {picks.map((pick) => (
        <li key={pick.name}>
          <article className="g-card">
            {pick.image && (
              <div className="g-card__picture">
                <Image src={pick.image} alt="" sizes="(min-width: 900px) 30vw, (min-width: 600px) 50vw, 100vw" placeholder="blur" />
              </div>
            )}
            <div className="g-card__words">
              {pick.kind && <p className="g-card__kind">{pick.kind}</p>}
              <h3 lang={pick.lang}>{pick.href ? <Link href={pick.href}>{pick.name}</Link> : pick.name}</h3>
              <p className="g-card__text">{pick.text}</p>
              {(pick.price || pick.note) && (
                <p className="g-card__foot">
                  {pick.price && <b>{pick.price}</b>}
                  {pick.note && <span>{pick.note}</span>}
                </p>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Short headed points, set as cards without pictures. */
export function Points({ points }: { points: { heading: string; text: string }[] }) {
  return <Cards picks={points.map((p) => ({ name: p.heading, text: p.text }))} />;
}

/** Questions that open to show their answers. They work without scripting. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="g-faq">
      {questions.map((item) => (
        <li key={item.q}>
          <details>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
