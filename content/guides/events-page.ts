import picture from '@/assets/ways/parties.jpg';
import { citiesWithPages, eventCategories, eventCities, events } from '@/content/events';
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
  metaTitle: `New Year’s Eve events UK ${site.season.eve}: tickets in 11 cities`,
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

/** A city's own events page: the directory for one city. */
export interface CityEventsPage extends PageBase {
  place: string;
  related: { label: string; href: string }[];
}

const london = events.filter((event) => event.city === 'London');
const londonKinds = (kind: string) => london.filter((event) => event.category === kind).length;

/** By the address part before /events/: 'london'. Written for the cities in `citiesWithPages`. */
const written: Record<string, CityEventsPage> = {
  london: {
    path: '/london/events/',
    place: 'London',
    title: 'New Year’s Eve events in London',
    metaTitle: `New Year’s Eve events in London ${site.season.eve}: parties and tickets`,
    description: `${london.length} ticketed New Year’s Eve events in London: the fireworks, Thames cruises, rooftop parties, dinners, club nights and concerts, each checked at its source.`,
    standfirst: `${london.length} ticketed events in London for 31 December: ${londonKinds('party')} parties, ${londonKinds('cruise')} Thames cruises, ${londonKinds('rooftop')} rooftops, ${londonKinds('dinner')} dinners, concerts, comedy and the official fireworks. Each was checked on the organiser’s or the seller’s own page.`,
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Cities', href: '/cities/' },
      { label: 'London', href: '/london/' },
    ],
    checked: london.map((event) => event.checked).sort().at(-1)!,
    sample: false,
    image: picture,
    keyFacts: [
      { label: 'Events listed', value: String(london.length) },
      { label: 'Cheapest ticket', value: `£${Math.min(...london.filter((e) => e.priceFrom !== null).map((e) => e.priceFrom!))}` },
      { label: 'Thames cruises', value: String(londonKinds('cruise')) },
      { label: 'Rooftops', value: String(londonKinds('rooftop')) },
    ],
    related: [
      { label: 'New Year’s Eve in London: the guide', href: '/london/' },
      { label: 'London’s New Year’s Eve fireworks: tickets and viewing areas', href: '/london/fireworks/' },
      { label: 'Getting home after midnight', href: '/transport/' },
      { label: 'New Year’s Eve events in other UK cities', href: '/events/' },
    ],
  },
};

export const cityEventsPages: Record<string, CityEventsPage> = Object.fromEntries(
  citiesWithPages.map((city) => {
    const key = city.toLowerCase();
    if (!written[key]) throw new Error(`No events page written for ${city}: add one to content/guides/events-page.ts`);
    return [key, written[key]];
  }),
);
