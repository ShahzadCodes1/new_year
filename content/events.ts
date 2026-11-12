import data from './events/uk-new-years-eve.json';

/**
 * Ticketed New Year's Eve events. This is the one module the site reads events through, so the JSON file
 * beside it can be swapped for a backend without touching a page.
 *
 * THESE ARE NOT SAMPLE CONTENT. Every event in content/events/ was read on the organiser's or the ticket
 * seller's own page, and carries that page's address (`source`), where to book (`booking`), the words the
 * price or time was taken from (`evidence`) and the day it was checked (`checked`).
 *
 * RULES FOR ADDING OR UPDATING ONE
 * - Never write a price, a time, an age limit or a link that was not read on the event's own page for this
 *   year's date. A round-up article is a lead, not a source.
 * - A field the page does not state is `null`, and its name goes in `unconfirmed`. The page then says so.
 * - `availability` is set only when the page says so in words.
 * - Change `checked` to the day you looked. An event whose date is not confirmed stays out.
 */
export type EventCategory = 'fireworks' | 'cruise' | 'rooftop' | 'dinner' | 'party' | 'concert' | 'other';

export interface EventListing {
  id: string;
  /** The name as the organiser words it. */
  name: string;
  venue: string;
  city: string;
  country: string;
  area: string | null;
  category: EventCategory;
  description: string;
  /** The day of the event, as YYYY-MM-DD. */
  date: string;
  /** Times as published, in the site's style: "8pm", "12.30am", or a phrase where there are several. */
  starts: string | null;
  ends: string | null;
  /** Pounds. */
  priceFrom: number | null;
  priceTo: number | null;
  /** The price as the page words it. */
  priceText: string | null;
  ageLimit: string | null;
  availability: 'on sale' | 'sold out' | null;
  booking: { url: string; label: string };
  source: { url: string };
  /** The words on the source page that the price or time was taken from. */
  evidence: string | null;
  /** Names of fields the source page did not confirm. */
  unconfirmed: string[];
  notes: string | null;
  /** The day the source was read, as YYYY-MM-DD. */
  checked: string;
}

export const events = data as EventListing[];

/** Categories in the order the directory lists them, with the words it uses for each. */
export const eventCategories: { id: EventCategory; label: string; one: string }[] = [
  { id: 'fireworks', label: 'Fireworks', one: 'Fireworks' },
  { id: 'cruise', label: 'Cruises', one: 'Cruise' },
  { id: 'rooftop', label: 'Rooftops', one: 'Rooftop' },
  { id: 'dinner', label: 'Dinners', one: 'Dinner' },
  { id: 'party', label: 'Parties', one: 'Party' },
  { id: 'concert', label: 'Concerts and comedy', one: 'Concert or show' },
  { id: 'other', label: 'Something different', one: 'Something different' },
];

/** Cities in the order they appear in the data, which is the order the directory lists them. */
export const eventCities = [...new Set(events.map((event) => event.city))];

const pounds = (n: number) => `£${n.toLocaleString('en-GB', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** The price in a few words, saying only what the source confirmed. */
export function priceLabel(event: EventListing): string {
  const { priceFrom: from, priceTo: to } = event;
  if (from === null) return 'Price not confirmed';
  if (to !== null && to !== from) return `${pounds(from)} to ${pounds(to)}`;
  if (to === from && !event.unconfirmed.includes('priceTo')) return pounds(from);
  return `From ${pounds(from)}`;
}

/** When it runs, saying only what the source confirmed. */
export function timeLabel(event: EventListing): string {
  if (!event.starts) return 'Times not confirmed';
  if (!event.ends) return `From ${event.starts}`;
  // Where the page gives a window for the end (a boat coming back), it reads better as one.
  const window = event.ends.match(/^(\S+) to (\S+)$/);
  if (window) return `${event.starts}, ending between ${window[1]} and ${window[2]}`;
  // Several times in a phrase each: say them as the page does, one after the other.
  if (/[a-z]{3}/i.test(event.starts.replace(/[ap]m/g, '')) || /[a-z]{3}/i.test(event.ends.replace(/[ap]m/g, ''))) return `${event.starts}. Ends ${event.ends.charAt(0).toLowerCase()}${event.ends.slice(1)}`;
  return `${event.starts} to ${event.ends}`;
}

const FIELD_WORDS: Record<string, string> = {
  starts: 'start time',
  ends: 'end time',
  priceFrom: 'price',
  priceTo: 'top price',
  priceText: 'price',
  ageLimit: 'age limit',
  area: 'area',
  availability: 'availability',
};

/** The unconfirmed details a reader should know about, in plain words. Availability is left out: most pages never state it. */
export function unconfirmedWords(event: EventListing): string[] {
  return [...new Set(event.unconfirmed.filter((field) => field !== 'availability' && field !== 'area').map((field) => FIELD_WORDS[field] ?? field))];
}
