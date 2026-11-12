import { EventsDirectory } from '@/components/events/EventsDirectory';
import { Block, Guide } from '@/components/guide/blocks';
import { eventCities, events } from '@/content/events';
import { eventsPage } from '@/content/guides/events-page';
import { longDate } from '@/lib/dates';
import { pageMeta } from '@/lib/meta';
import { site } from '@/lib/site';

export const metadata = pageMeta(eventsPage);

// What search engines are told about each event: only what its source confirmed.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: eventsPage.title,
  numberOfItems: events.length,
  itemListElement: events.map((event, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Event',
      name: event.name,
      description: event.description,
      startDate: event.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: event.venue, address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: 'GB' } },
      offers: {
        '@type': 'Offer',
        url: event.booking.url,
        priceCurrency: 'GBP',
        ...(event.priceFrom !== null ? { price: event.priceFrom } : {}),
        ...(event.availability ? { availability: event.availability === 'sold out' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' } : {}),
      },
    },
  })),
};

export default function EventsPage() {
  const checked = events.map((event) => event.checked).sort().at(-1)!;
  return (
    <Guide page={eventsPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* The filter needs scripts. Without them it is not offered, and every event is simply listed. */}
      <noscript>
        <style>{'.e-filters,.e-count{display:none}'}</style>
      </noscript>
      <Block id="directory" title="Find an event" lede={`Every event here has paid tickets and was checked on the organiser’s or the seller’s own page. Prices and times are as published on ${longDate(checked)}; they can change, and tickets sell out, so confirm on the seller’s page before you pay.`}>
        <EventsDirectory events={events} cities={eventCities} />
      </Block>
      <Block id="about-this-list" tone="deep" title="How this list is kept">
        <div className="g-prose">
          <p>
            Nothing here is invented or estimated. Each event’s price, times and age limit were read on its own page for 31 December {site.season.eve}, and each card links to
            that page and says when it was read. Where a page did not state something, the card says it is not confirmed.
          </p>
          <p>
            The list is not complete and is not a ranking. It grows as events are announced: London first, then the other large UK cities, then other countries. {site.name} takes no
            payment for a listing. If a detail is out of date, the organiser’s page is right and this one is wrong; please tell us through the contact page.
          </p>
        </div>
      </Block>
    </Guide>
  );
}
