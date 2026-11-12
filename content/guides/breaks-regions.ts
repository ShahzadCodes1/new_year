import lead from '@/assets/breaks/breaks.jpg';
import couples from '@/assets/breaks/couples.jpg';
import peakPicture from '@/assets/breaks/peak-district.jpg';
import scotlandPicture from '@/assets/breaks/scotland.jpg';
import spa from '@/assets/breaks/spa.jpg';
import { site } from '@/lib/site';
import type { BreaksGuide } from './types';

const trail = [
  { label: 'Home', href: '/' },
  { label: 'New Year breaks', href: '/breaks/' },
];

/** SAMPLE CONTENT: see types.ts. Places to stay, prices and booking patterns here are stand-ins. */
export const scotlandBreaks: BreaksGuide = {
  path: '/breaks/scotland/',
  title: 'New Year breaks in Scotland',
  metaTitle: `New Year breaks in Scotland ${site.season.eve}: Hogmanay, the Highlands and when to book`,
  description: 'New Year breaks in Scotland: Hogmanay in the cities, lodges in the Highlands and inns on the islands, with what each costs and when to book.',
  standfirst: 'Nobody does New Year better, and everybody knows it. Go for the party or go for the silence afterwards: trying for both in three days is how people come home tired.',
  crumbs: trail,
  checked: '2026-11-11',
  sample: true,
  image: scotlandPicture,
  keyFacts: [
    { label: 'Bank holidays', value: '1 and 4 January' },
    { label: 'Usual stay', value: 'Three or four nights' },
    { label: 'Book by', value: 'The end of August' },
    { label: 'From', value: '£190 a night' },
  ],
  picks: {
    lede: 'Five ways to spend it, from the busiest street in the country to a road with nothing on it.',
    picks: [
      { kind: 'City', name: 'Edinburgh for Hogmanay', text: 'The torchlight procession, the street party and the castle fireworks, with a room you can walk back to.', price: 'From £390 a night', note: 'Three-night minimum', href: '/hogmanay/edinburgh/', image: lead },
      { kind: 'Lodge', name: 'A Highland lodge', text: 'A house for eight with a fire in every room, a ceilidh in the village hall and a long walk on the first.', price: 'From £260 a night', note: 'Sleeps eight', image: couples },
      { kind: 'Hotel', name: 'A lochside hotel with a spa', text: 'A gala dinner, a piper at midnight and an outdoor pool with steam coming off it in the morning.', price: 'From £310 a night', note: 'Dinner included', image: spa },
      { kind: 'Inn', name: 'An island inn', text: 'Six rooms, one bar and a ferry timetable that decides when you leave.', price: 'From £170 a night', note: 'Check the sailings' },
      { kind: 'Cottage', name: 'A cottage in the Borders', text: 'Two hours from most of the north of England, with a wood burner and nobody for a mile.', price: 'From £160 a night', note: 'Sleeps four' },
    ],
  },
  choose: [
    { heading: 'Party or peace', text: 'The cities are for the night itself. The Highlands and islands are for the days after it. Choose one and do it properly.' },
    { heading: 'Mind the distances', text: 'A lodge that looks close to Inverness on a map can be two hours from it in January. Check the drive in daylight hours, of which there are seven.' },
    { heading: 'Use the extra day', text: 'Scotland has a second bank holiday after New Year’s Day. Travelling home on it is quieter and often cheaper.' },
  ],
  booking: {
    body: [
      'Edinburgh for Hogmanay is the hardest booking in Britain: rooms inside the street party’s boundary are gone by the end of the summer. Further out, or a train ride away, there is room into November.',
      'Lodges and cottages are let by the week over New Year, usually from the 28th or 29th. A three-night stay is possible only in what is left by December.',
    ],
    facts: [
      { label: 'City hotels', value: 'Three-night minimum' },
      { label: 'Lodges and cottages', value: 'Let by the week' },
      { label: 'Ferries', value: 'Reduced on 1 and 2 January' },
      { label: 'Trains north', value: 'No service on 1 January' },
    ],
  },
  faq: [
    { q: 'Do I need a ticket for Hogmanay in Edinburgh?', a: 'For the street party, yes. Some hotels inside its boundary include a pass with the room.' },
    { q: 'Will there be snow?', a: 'Possibly on the hills, rarely in the towns. Expect rain and wind, and be pleased by anything else.' },
    { q: 'Can I get around without a car?', a: 'In the cities, easily. In the Highlands and on the islands a car is close to essential, and public transport stops on New Year’s Day.' },
  ],
};

/** SAMPLE CONTENT: see types.ts. */
export const peakDistrictBreaks: BreaksGuide = {
  path: '/breaks/peak-district/',
  title: 'New Year in the Peak District',
  metaTitle: `New Year in the Peak District ${site.season.eve}: cottages, inns and walks`,
  description: 'New Year in the Peak District: stone villages, inns with fires and walks for New Year’s Day, with what a stay costs and when to book.',
  standfirst: 'Two hours from half of England and nothing like any of it. The best New Year here is a pub at midnight and a hill by ten the next morning.',
  crumbs: trail,
  checked: '2026-11-11',
  sample: true,
  image: peakPicture,
  keyFacts: [
    { label: 'Best for', value: 'Walkers, couples, dogs' },
    { label: 'Usual stay', value: 'Two or three nights' },
    { label: 'Book by', value: 'The end of September' },
    { label: 'From', value: '£160 a night' },
  ],
  picks: {
    lede: 'Five ways to stay, all within a short walk of a fire.',
    picks: [
      { kind: 'Inn', name: 'A village inn with rooms', text: 'Midnight in the bar with the people who live there, and breakfast until eleven.', price: 'From £160 a night', note: 'Dogs welcome', image: lead },
      { kind: 'Cottage', name: 'A cottage for two', text: 'A stone cottage at the end of a lane, a wood burner and a doorstep that faces the sunrise.', price: 'From £180 a night', note: 'Three-night minimum', image: couples },
      { kind: 'Hotel', name: 'A country house with a spa', text: 'A gala dinner, a late checkout and an outdoor hot pool for the morning after.', price: 'From £290 a night', note: 'Dinner included', image: spa },
      { kind: 'House', name: 'A farmhouse for a group', text: 'Sleeps twelve around one long table. Bring your own midnight.', price: 'From £95 a person', note: 'Let by the week' },
      { kind: 'Bunkhouse', name: 'A bunkhouse on the edge', text: 'Plain, warm and at the foot of the best walk in the park.', price: 'From £35 a person', note: 'Shared kitchen' },
    ],
  },
  choose: [
    { heading: 'Pick your valley', text: 'The north is higher, wilder and colder. The south is gentler, with more villages and more pubs. They are an hour apart.' },
    { heading: 'Stay where you can walk', text: 'Roads over the tops close in snow and car parks fill by ten on New Year’s Day. A place with a walk from the door avoids both.' },
    { heading: 'Ask about the first', text: 'Many village pubs do not serve food on New Year’s Day. Find out before you arrive, and bring something for the evening.' },
  ],
  booking: {
    body: [
      'Cottages for two go first, often a year ahead to the same people. Inns release New Year rooms in the early autumn, usually as a two-night package with dinner on the 31st.',
      'Large houses are booked by groups in the spring. What is left by November tends to be the expensive end and the bunkhouses.',
    ],
    facts: [
      { label: 'Cottages', value: 'Three-night minimum' },
      { label: 'Inns', value: 'Two nights, dinner included' },
      { label: 'Large houses', value: 'Let by the week' },
      { label: 'Dogs', value: 'Welcome in most' },
    ],
  },
  faq: [
    { q: 'Is the Peak District busy at New Year?', a: 'The villages are, on the afternoon of the first. The hills are quiet before ten and after three.' },
    { q: 'Do I need a car?', a: 'It helps. A few villages are on a railway line; the rest have a bus that does not run on New Year’s Day.' },
    { q: 'What should I pack?', a: 'Waterproofs, boots and a torch. It is dark by four and the best pub is always a walk away.' },
  ],
};
