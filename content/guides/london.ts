import picture from '@/assets/source/london-emrich-pexels-230794.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import parties from '@/assets/ways/parties.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { events } from '@/content/events';
import { site } from '@/lib/site';
import type { CityGuide } from './types';

const inLondon = events.filter((event) => event.city === 'London');
/** One kind of London event, summed up from the verified events: how many, and the price range they publish. */
const kind = (category: string) => {
  const list = inLondon.filter((event) => event.category === category);
  const prices = list.flatMap((event) => [event.priceFrom, event.priceTo]).filter((n): n is number => n !== null);
  const range = prices.length ? `£${Math.min(...prices).toLocaleString('en-GB', { maximumFractionDigits: 0 })} to £${Math.max(...prices).toLocaleString('en-GB', { maximumFractionDigits: 0 })}` : 'Prices vary';
  return { count: list.length, range };
};
const cruises = kind('cruise');
const rooftops = kind('rooftop');
const dinners_ = kind('dinner');
const parties_ = kind('party');

/**
 * MIXED CONTENT. The midnight section and the ways to spend the night are verified: the fireworks facts come
 * from the Mayor of London's event page (see london-fireworks.ts) and the event counts and prices from the
 * events directory, both checked in November 2026. The places to stay and the getting-home section are still
 * SAMPLE CONTENT (see types.ts): their names, prices and times are stand-ins.
 */
export const london: CityGuide = {
  path: '/london/',
  place: 'London',
  occasion: 'New Year’s Eve',
  imageAlt: 'The London Eye lit purple beside the Thames at night, with the Houses of Parliament and Big Ben behind',
  title: 'New Year’s Eve in London',
  metaTitle: `New Year’s Eve in London ${site.season.eve}: events, fireworks, tips`,
  description: 'New Year’s Eve in London: where to be at midnight, the fireworks and how tickets work, ticketed parties and cruises, where to stay and getting home.',
  standfirst: 'The biggest display in the country is ticketed: £20 to £55 for a place on the river, sold only through Ticketmaster. Around it are dozens of ticketed parties, Thames cruises, rooftops and dinners, all listed with prices.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
  ],
  checked: '2026-11-17',
  sources: [
    { label: 'London New Year’s Eve 2026, Mayor of London (london.gov.uk)', href: 'https://www.london.gov.uk/events/london-new-years-eve-2026' },
    { label: 'Event prices and times: each event’s own page, linked from its card', href: '/london/events/' },
  ],
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'At midnight', value: 'Fireworks at the London Eye' },
    { label: 'Fireworks tickets', value: '£20 to £55' },
    { label: 'Ticketed events', value: `${inLondon.length} listed` },
    { label: 'Viewing areas open', value: '8pm to 10.30pm' },
  ],
  moment: {
    body: [
      'At midnight the Mayor of London’s fireworks are fired over the Thames at the London Eye. The event runs from 8pm to 12.30am, and its six riverside viewing areas, three on each bank, let people in from 8pm until 10.30pm.',
      'The riverside is ticketed. Without a ticket you will not be let into the viewing areas, and Westminster, Golden Jubilee, Lambeth, Blackfriars and Waterloo bridges are closed to crossing before and after. Tickets cost £20 to £55 and are sold only through Ticketmaster, with £20 off for anyone with a London postcode.',
      'If the river is not for you, most of the city’s New Year’s Eve is ticketed somewhere else: club nights, Thames cruises, rooftop parties and long dinners, listed below with what they cost.',
    ],
    facts: [
      { label: 'Display', value: 'Midnight, at the London Eye' },
      { label: 'Viewing areas open', value: '8pm (last entry 10.30pm)' },
      { label: 'Event ends', value: '12.30am' },
      { label: 'Tickets', value: '£20 to £55, Ticketmaster only' },
      { label: 'Road closures', value: '2pm to about 6am' },
    ],
  },
  ways: {
    lede: 'The kinds of night London does, with the number of ticketed events of each kind we have checked and the prices they publish.',
    picks: [
      { kind: 'Fireworks', name: 'The official fireworks', text: 'Six fenced viewing areas on both banks of the Thames, each with its own gates. The only way to see the display from the river.', price: '£20 to £55', note: 'Ticketmaster only', href: '/london/fireworks/', image: fireworks },
      { kind: 'Parties', name: 'Club nights and parties', text: `${parties_.count} ticketed parties, from masked balls and disco nights to drum and bass, most running until 3am or 4am.`, price: parties_.range, note: 'Listed with times', href: '/london/events/', image: parties },
      { kind: 'Dinners and cruises', name: 'Thames cruises and dinners', text: `${cruises.count} New Year’s Eve cruises on the Thames and ${dinners_.count} ticketed dinners, from a curry house to the Ritz.`, price: cruises.range, note: 'Cruises', href: '/london/events/', image: dinners },
      { kind: 'Rooftops', name: 'Rooftop parties', text: `${rooftops.count} ticketed rooftop events in the City and beyond, several with a view of the skyline at midnight.`, price: rooftops.range, note: 'Standing and tables', href: '/london/events/', image: family },
      { kind: 'Something different', name: 'Concerts, comedy and a museum', text: 'Candlelit concerts, comedy nights, a ceilidh and a party at the Natural History Museum, each with tickets on sale.', price: 'From £11', note: 'Listed with ages', href: '/london/events/', image: quiet },
    ],
  },
  stay: {
    lede: 'Stay within walking distance of where you will be at midnight. Nothing else matters as much.',
    picks: [
      { kind: 'Hotel', name: 'The Embankment House', text: 'River-facing rooms five minutes from the viewing areas. Two-night minimum over New Year.', price: 'From £320 a night', note: 'Westminster' },
      { kind: 'Hotel', name: 'Southwark Rooms', text: 'Plain, well-kept rooms a short walk from the South Bank, with a late breakfast on the first.', price: 'From £180 a night', note: 'Southwark' },
      { kind: 'Apartments', name: 'Greenwich Wharf', text: 'Kitchens, space for four and a view up the river from the hill behind.', price: 'From £210 a night', note: 'Greenwich' },
    ],
  },
  logistics: {
    body: [
      'Roads around the river close from mid-afternoon and stay closed until the small hours. Come in by train and walk the last stretch: the stations nearest the river shut early or become exit only.',
      'Leaving takes longer than arriving. Expect to queue for the nearest stations after the display, or walk twenty minutes to one further out and be on a train sooner.',
    ],
    facts: [
      { label: 'Road closures', value: 'From 2pm' },
      { label: 'Trains after midnight', value: 'Running all night on most lines' },
      { label: 'Stations that close early', value: 'Those nearest the river' },
      { label: 'Night buses', value: 'Diverted around the closures' },
      { label: 'Taxis', value: 'Scarce until about 2am' },
    ],
  },
  faq: [
    { q: 'Can I watch the London fireworks without a ticket?', a: 'Not from the riverside. The organiser says people without tickets will not be let into the viewing areas, and it does not publish places to watch from outside the event.' },
    { q: 'How much are tickets for the London fireworks?', a: '£20 to £55 plus a booking fee, sold only through Ticketmaster. A London postcode takes £20 off each ticket.' },
    { q: 'What time should I arrive?', a: 'The viewing areas open at 8pm and let people in until 10.30pm. The display is at midnight.' },
    { q: 'Is the riverside suitable for children?', a: 'The organiser says the event is not suitable for young children, everyone needs a ticket whatever their age, and under-16s must be with an adult. Several ticketed parties and cruises welcome families: their age rules are on each event.' },
    { q: 'What New Year’s Eve events are there in London?', a: 'We list every ticketed London event we have checked, from club nights and Thames cruises to rooftops, dinners, concerts and comedy, each with its price, times and age limit.' },
  ],
};
