import picture from '@/assets/ways/parties.jpg';
import { eventCategories, eventCities, events } from '@/content/events';
import { site } from '@/lib/site';
import type { PageBase } from './types';

const inLondon = events.filter((event) => event.city === 'London').length;
const kinds = eventCategories.filter((category) => events.some((event) => event.category === category.id)).length;

/**
 * The events directory's own page. Unlike the guides around it, this is not sample content: see
 * content/events.ts for where each event's facts come from. The photograph is an illustration of a
 * New Year's Eve party, not a picture of any listed event.
 */
export const eventsPage: PageBase = {
  path: '/events/',
  title: 'New Year’s Eve events in the UK',
  metaTitle: `New Year’s Eve ${site.season.eve} events and tickets: London and the UK`,
  description: `Ticketed New Year’s Eve events in London and ${eventCities.length - 1} other UK cities: fireworks, cruises, rooftops, dinners, parties and concerts, each checked at its source.`,
  standfirst: `${events.length} ticketed events for 31 December, in London and ${eventCities.length - 1} other UK cities. Each was checked on the organiser’s or the seller’s own page, and each card says when.`,
  crumbs: [{ label: 'Home', href: '/' }],
  checked: events.map((event) => event.checked).sort().at(-1)!,
  sample: false,
  image: picture,
  keyFacts: [
    { label: 'Events listed', value: String(events.length) },
    { label: 'In London', value: String(inLondon) },
    { label: 'Cities', value: String(eventCities.length) },
    { label: 'Kinds of event', value: String(kinds) },
  ],
};
