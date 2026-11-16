import hogmanay from '@/assets/celebrations/hogmanay.jpg';
import picture from '@/assets/source/edinburgh-night-higgsfield.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { site } from '@/lib/site';
import type { CityGuide } from './types';

/** SAMPLE CONTENT: see types.ts. Venue names, prices and times here are stand-ins. */
export const edinburgh: CityGuide = {
  path: '/hogmanay/edinburgh/',
  place: 'Edinburgh',
  occasion: 'Hogmanay',
  imageAlt: 'Edinburgh’s Old Town at night: the castle on its rock, the Balmoral clock tower and the Scott Monument',
  title: 'Hogmanay in Edinburgh',
  metaTitle: `Edinburgh’s Hogmanay ${site.season.eve}: street party, tickets, events`,
  description: 'Edinburgh’s Hogmanay: the street party, the concert in the gardens and the castle fireworks, ticketed Hogmanay events, where to stay.',
  standfirst: 'Hogmanay is a festival, not a night. Come for three days, book in the summer, and bring more layers than you think you need.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Celebrations', href: '/celebrations/' },
    { label: 'Hogmanay', href: '/hogmanay/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'At midnight', value: 'Fireworks from the castle' },
    { label: 'Street party', value: 'Ticketed' },
    { label: 'Runs', value: '29 December to 1 January' },
    { label: 'Budget', value: '££ to ££££' },
  ],
  moment: {
    body: [
      'At midnight the fireworks go up from the castle rock, above a street party that fills the main street below it. The bells are followed by ten thousand people singing the same song, more or less together.',
      'The street party is ticketed and sells out. Outside it, the hill to the east gives the widest view of the castle and the display, and is free.',
      'The night before, a torchlight procession winds through the old town. Many people who have been to both prefer it.',
    ],
    facts: [
      { label: 'Torchlight procession', value: '29 December, from 7pm' },
      { label: 'Street party opens', value: '8pm, 31 December' },
      { label: 'Fireworks', value: 'Midnight, about 8 minutes' },
      { label: 'Street party tickets', value: 'From £30' },
      { label: 'The Loony Dook', value: '1 January, midday' },
    ],
  },
  ways: {
    lede: 'Five kinds of Hogmanay, from a torch in your hand to a chair by a fire.',
    picks: [
      { kind: 'Fireworks', name: 'The street party', text: 'Stages, bars and the castle display overhead, in the main street below the rock.', price: 'From £30', note: 'Sells out', image: fireworks },
      { kind: 'Parties', name: 'The torchlight procession', text: 'Carry a torch through the old town with several thousand others, the night before.', price: 'From £20', note: '29 December', image: hogmanay },
      { kind: 'Dinners and cruises', name: 'A ceilidh with supper', text: 'Three courses, a caller who explains every dance, and a piper at midnight.', price: 'From £110', note: 'New Town', image: dinners },
      { kind: 'Family', name: 'The afternoon street party', text: 'The same street, six hours earlier, with a countdown at six and home by seven.', price: 'From £10', note: 'Under 12s', image: family },
      { kind: 'A quiet one', name: 'The Sheep Heid Snug', text: 'A village pub inside the city, a fire in each room and no screen in any of them.', price: 'No booking', note: 'Duddingston', image: quiet },
    ],
  },
  stay: {
    lede: 'Rooms for Hogmanay are booked months ahead and priced as three nights. Decide early.',
    picks: [
      { kind: 'Hotel', name: 'The Castle View', text: 'Rooms facing the rock, inside the street party’s boundary. A pass comes with the room.', price: 'From £390 a night', note: 'New Town' },
      { kind: 'Guesthouse', name: 'Bruntsfield House', text: 'Six rooms, a proper breakfast and a twenty-minute walk across the park to the centre.', price: 'From £170 a night', note: 'Bruntsfield' },
      { kind: 'Apartments', name: 'The Shore Lofts', text: 'By the water in the old port, with a tram to the centre and room for a group.', price: 'From £220 a night', note: 'Leith' },
    ],
  },
  logistics: {
    body: [
      'The centre closes to traffic for the evening and the main station’s nearest exits shut early. Walk in, and allow longer than the map says: the crowds make every street slow.',
      'It is cold, often wet and frequently windy. The fireworks have been cancelled for weather before. Dress for standing still outdoors for four hours.',
    ],
    facts: [
      { label: 'Road closures', value: 'From 4pm' },
      { label: 'Trams', value: 'Running through the night' },
      { label: 'Night buses', value: 'Free after midnight' },
      { label: 'Trains', value: 'Extra late services, book ahead' },
      { label: 'Weather', value: 'Check on the day' },
    ],
  },
  faq: [
    { q: 'Can I see the fireworks without a street party ticket?', a: 'Yes, from the hill to the east of the centre, for free. You will see the castle and the display, and hear the crowd from a distance.' },
    { q: 'When should I book?', a: 'Rooms by the end of the summer; street party tickets as soon as they are released in the autumn.' },
    { q: 'What happens if the weather is bad?', a: 'Outdoor events can be cancelled at short notice in high wind. Tickets are refunded; rooms usually are not.' },
    { q: 'What is the Loony Dook?', a: 'A swim in the firth on New Year’s Day, in fancy dress. Watching it is free and considerably warmer.' },
  ],
};
