import picture from '@/assets/source/manchester-night-higgsfield.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import parties from '@/assets/ways/parties.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { site } from '@/lib/site';
import type { CityGuide, EventGuide } from './types';

/** SAMPLE CONTENT: see types.ts. Venue names, prices and times here are stand-ins. */
export const manchester: CityGuide = {
  path: '/manchester/',
  place: 'Manchester',
  occasion: 'New Year’s Eve',
  imageAlt: 'Manchester city centre at night from above, with a curved station roof lit blue and towers behind',
  title: 'New Year’s Eve in Manchester',
  metaTitle: `New Year’s Eve in Manchester ${site.season.eve}: events and parties`,
  description: 'New Year’s Eve in Manchester: where midnight happens, ticketed parties and club nights, where to stay and how to get home by tram.',
  standfirst: 'A night out first and a countdown second. The city is at its best indoors, loud, and moving between three places before midnight.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'At midnight', value: 'In the bars and clubs' },
    { label: 'Fireworks', value: 'From the rooftops, briefly' },
    { label: 'Best for', value: 'Groups and a late night' },
    { label: 'Budget', value: '£ to £££' },
  ],
  moment: {
    body: [
      'Manchester does not gather in one place at midnight. The countdown happens in a few hundred rooms at once, and the best of them are within fifteen minutes’ walk of each other.',
      'A short display goes up from the rooftops in the centre on the stroke of twelve. It is worth stepping outside for, and not worth planning the night around.',
      'Decide where you want to be at five to midnight and book that. Everything before it can be left to the evening.',
    ],
    facts: [
      { label: 'Display begins', value: 'Midnight' },
      { label: 'Lasts', value: 'About 6 minutes' },
      { label: 'Best seen from', value: 'The squares in the centre' },
      { label: 'Bars close', value: 'Between 2am and 4am' },
      { label: 'Club tickets', value: 'From £25' },
    ],
  },
  ways: {
    lede: 'Five kinds of night. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The rooftop display', text: 'Six minutes at midnight, seen from the squares or from a bar with a terrace.', price: 'Free', note: 'City centre', href: '/manchester/fireworks/', image: fireworks },
      { kind: 'Parties', name: 'The Engine Room', text: 'A former mill with three rooms of music and a countdown on the main floor.', price: 'From £35', note: 'Ancoats', image: parties },
      { kind: 'Dinners and cruises', name: 'A table for the last sitting', text: 'Five courses from nine, finished in time to be standing with a glass at midnight.', price: 'From £95', note: 'Spinningfields', image: dinners },
      { kind: 'Family', name: 'The early evening lights', text: 'A lantern trail through the gardens with its own countdown at half past five.', price: 'From £12', note: 'South of the centre', image: family },
      { kind: 'A quiet one', name: 'The Weavers’ Arms', text: 'A back room, a coal fire and last orders at half past twelve.', price: 'No booking', note: 'Northern Quarter', image: quiet },
    ],
  },
  stay: {
    lede: 'Stay in the centre. A room you can walk back to is worth more than a better room you cannot.',
    picks: [
      { kind: 'Hotel', name: 'The Cotton Exchange', text: 'Large rooms in a converted warehouse, five minutes from most of the bars.', price: 'From £210 a night', note: 'Northern Quarter' },
      { kind: 'Hotel', name: 'Deansgate Rooms', text: 'Small, quiet rooms above the busiest street in the city, with a midday checkout.', price: 'From £140 a night', note: 'Deansgate' },
      { kind: 'Apartments', name: 'Canal Wharf', text: 'Two-bedroom flats by the water for a group who would rather start the night at home.', price: 'From £190 a night', note: 'Castlefield' },
    ],
  },
  logistics: {
    body: [
      'The centre is compact and the night is best done on foot. Trams run late but fill up after midnight; the stops at the edge of the centre are easier than the ones in the middle of it.',
      'Book a taxi home before you go out, or expect to wait. Between half past twelve and two is the worst of it.',
    ],
    facts: [
      { label: 'Trams after midnight', value: 'Running until about 1am' },
      { label: 'Trains', value: 'Last services before midnight' },
      { label: 'Night buses', value: 'On the main routes only' },
      { label: 'Taxis', value: 'Long waits until 2am' },
      { label: 'Road closures', value: 'Around the squares from 10pm' },
    ],
  },
  faq: [
    { q: 'Is there a big fireworks display in Manchester?', a: 'A short one, from the rooftops at midnight. It is free and needs no ticket, but it is a few minutes long, not a show.' },
    { q: 'Do I need to book bars in advance?', a: 'For anywhere you want to be at midnight, yes. Most bars sell tickets for the evening and stop letting people in by ten.' },
    { q: 'Which area is best for a first visit?', a: 'The Northern Quarter for bars, Deansgate for clubs. They are ten minutes apart on foot.' },
    { q: 'Is the centre safe late at night?', a: 'It is busy and well lit, and heavily policed on the night. Keep to the main streets and arrange your way home beforehand.' },
  ],
};

/** SAMPLE CONTENT: see types.ts. */
export const manchesterFireworks: EventGuide = {
  path: '/manchester/fireworks/',
  subject: 'the Manchester fireworks',
  title: 'Manchester’s New Year’s Eve fireworks',
  metaTitle: `Manchester New Year’s Eve fireworks ${site.season.eve}: where to watch`,
  description: 'The Manchester New Year’s Eve fireworks: where the display is, where to watch it from and how to get home afterwards.',
  standfirst: 'Six minutes, free, and best treated as the moment you step outside. The square in front of the town hall has the clearest view.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
    { label: 'Manchester', href: '/manchester/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: family,
  keyFacts: [
    { label: 'When', value: 'Midnight, 31 December' },
    { label: 'Where', value: 'Rooftops in the city centre' },
    { label: 'Tickets', value: 'None needed' },
    { label: 'Lasts', value: 'About 6 minutes' },
  ],
  what: {
    body: [
      'The display is fired from the roofs of several buildings around the centre, so there is no single front to it. It begins as the clock strikes and is over before the cheering is.',
      'There is no music and no ticketed area. People come out of the bars to watch and go back in again.',
    ],
    facts: [
      { label: 'Starts', value: 'Midnight' },
      { label: 'Ends', value: 'About 12.06am' },
      { label: 'Fired from', value: 'Four rooftops' },
      { label: 'Viewing areas', value: 'Open squares, no barriers' },
    ],
  },
  watch: {
    lede: 'Three in the open, one with a drink in your hand.',
    picks: [
      { kind: 'Free', name: 'The town hall square', text: 'The widest sky in the centre and three of the four rooftops in view.', price: 'Free', note: 'Fills from 11pm' },
      { kind: 'Free', name: 'The gardens by the canal', text: 'Quieter, further back, with the display reflected in the water.', price: 'Free', note: 'Arrive by 11.30pm' },
      { kind: 'Free', name: 'The footbridge', text: 'Height without a ticket. Room for about two hundred and no more.', price: 'Free', note: 'Arrive by 11pm' },
      { kind: 'With a booking', name: 'A terrace bar', text: 'Several rooftop bars sell the midnight slot with a glass included.', price: 'From £40', note: 'Book ahead' },
    ],
  },
  tickets: {
    body: [
      'No ticket is needed for the display itself or for the squares. The only thing to book is a bar, if you want to watch from one.',
      'Stewards may close a square when it is full. If the one you chose is shut, the next is five minutes away.',
    ],
    facts: [
      { label: 'Display', value: 'Free' },
      { label: 'Squares', value: 'Free, may close when full' },
      { label: 'Terrace bars', value: '£40 to £80' },
      { label: 'Children', value: 'Welcome in the squares' },
    ],
  },
  logistics: {
    body: [
      'Roads around the squares close at ten. Arrive on foot or by tram, and leave by a stop one or two out from the centre.',
      'The crowd clears quickly because most of it goes back indoors. By quarter past twelve the squares are half empty.',
    ],
    facts: [
      { label: 'Road closures', value: 'From 10pm' },
      { label: 'Nearest trams', value: 'Exit only after 11pm' },
      { label: 'Toilets', value: 'Temporary, at each square' },
      { label: 'Time to clear', value: 'About 15 minutes' },
    ],
  },
  faq: [
    { q: 'Is the Manchester display worth travelling for?', a: 'Not by itself. It is a good moment in a night out, and the night out is the reason to come.' },
    { q: 'Can I bring children?', a: 'Yes. The squares are open and the display is short, though the crowd is mostly adults who have been out since eight.' },
    { q: 'What happens if it is windy?', a: 'A display fired from rooftops is the first thing to be cut back in high wind. Check on the day.' },
  ],
};
