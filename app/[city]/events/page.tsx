import { notFound } from 'next/navigation';
import { EventsDirectory } from '@/components/events/EventsDirectory';
import { Block, Guide } from '@/components/guide/blocks';
import { TextLink } from '@/components/ui/TextLink';
import { events, eventsStructuredData } from '@/content/events';
import { cityEventsPages } from '@/content/guides/events-page';
import { longDate } from '@/lib/dates';
import { pageMeta } from '@/lib/meta';

interface Props {
  params: Promise<{ city: string }>;
}

// See app/[city]/page.tsx: a page chosen by its address, with real 404s for any other.
export const instant = false;

/** One page per city with enough events for one: /london/events/. */
export const generateStaticParams = () => Object.keys(cityEventsPages).map((city) => ({ city }));

export async function generateMetadata({ params }: Props) {
  const page = cityEventsPages[(await params).city];
  return page ? pageMeta(page) : { title: 'Page not found' };
}

export default async function CityEventsPage({ params }: Props) {
  const page = cityEventsPages[(await params).city];
  if (!page) notFound();
  const here = events.filter((event) => event.city === page.place);
  const checked = here.map((event) => event.checked).sort().at(-1)!;
  return (
    <Guide page={page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsStructuredData(here, page.title)) }} />
      <noscript>
        <style>{'.e-filters,.e-count{display:none}'}</style>
      </noscript>
      <Block
        id="directory"
        title="Find an event"
        lede={`Every event here has paid tickets and was checked on the organiser’s or the seller’s own page. Prices and times are as published on ${longDate(checked)}; they change, and tickets sell out, so confirm on the seller’s page before you pay.`}
      >
        <EventsDirectory events={here} cities={[page.place]} />
      </Block>
      <Block id="more" tone="deep" title={`More for New Year’s Eve in ${page.place}`}>
        <ul className="g-sources">
          {page.related.map((link) => (
            <li key={link.href}>
              <TextLink href={link.href}>{link.label}</TextLink>
            </li>
          ))}
        </ul>
      </Block>
    </Guide>
  );
}
