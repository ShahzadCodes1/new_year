import couplesPicture from '@/assets/breaks/couples.jpg';
import cruisesPicture from '@/assets/breaks/cruises.jpg';
import peakDistrict from '@/assets/breaks/peak-district.jpg';
import scotland from '@/assets/breaks/scotland.jpg';
import spaPicture from '@/assets/breaks/spa.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { site } from '@/lib/site';
import type { BreaksGuide } from './types';

const trail = [
  { label: 'Home', href: '/' },
  { label: 'New Year breaks', href: '/breaks/' },
];
const checked = '2026-11-11';

/** SAMPLE CONTENT: see types.ts. Places to stay, prices and booking patterns in all three guides are stand-ins. */
export const spaBreaks: BreaksGuide = {
  path: '/breaks/spa/',
  subject: 'New Year’s Eve spa breaks',
  imageAlt: 'Steam rising from an outdoor spa pool in a frosted garden at sunrise',
  title: 'New Year spa breaks',
  metaTitle: `New Year’s Eve spa breaks UK ${site.season.eve}: what is included`,
  description: 'New Year’s Eve spa breaks in the UK: country houses, lochside hotels and city spas, what a package includes, what it costs and when to book.',
  standfirst: 'Hot water, cold air and nothing booked but dinner. The good ones are quiet on the first morning; the others have a queue for the pool.',
  crumbs: trail,
  checked,
  sample: true,
  image: spaPicture,
  keyFacts: [
    { label: 'Best for', value: 'Couples and friends' },
    { label: 'Usual stay', value: 'Two nights' },
    { label: 'Book by', value: 'The middle of October' },
    { label: 'From', value: '£240 a night' },
  ],
  picks: {
    lede: 'Five kinds of spa break, from a pool in the hills to a day pass in town.',
    picks: [
      { kind: 'Country house', name: 'A country house with a spa', text: 'A gala dinner, a late checkout and an outdoor pool with steam coming off it on the first.', price: 'From £290 a night', note: 'Dinner included', href: '/breaks/peak-district/', image: peakDistrict },
      { kind: 'Hotel', name: 'A lochside hotel', text: 'A piper at midnight, a sauna on the shore and a loch to jump into if you mean it.', price: 'From £310 a night', note: 'Three-night minimum', href: '/breaks/scotland/', image: scotland },
      { kind: 'Retreat', name: 'An adults-only retreat', text: 'No gala, no band and no children. Supper at eight, a glass at midnight and silence by half past.', price: 'From £340 a night', note: 'Adults only', image: quiet },
      { kind: 'City', name: 'A city hotel with a pool', text: 'The night out in town, then a pool and a steam room downstairs in the morning.', price: 'From £240 a night', note: 'One night is possible' },
      { kind: 'Day spa', name: 'A day pass on the first', text: 'No room needed. Four hours of heat and a lunch, for the day after a night at home.', price: 'From £85 a person', note: 'Book the time slot' },
    ],
  },
  choose: [
    { heading: 'Ask how many are staying', text: 'A spa built for forty guests is not restful with two hundred in the hotel. Ask how many rooms there are and whether day visitors are let in over New Year.' },
    { heading: 'Book the treatment with the room', text: 'Treatment rooms fill before bedrooms do. A package that includes one is often the only way to get a time on the 31st or the 1st.' },
    { heading: 'Check the hours', text: 'Many spas close early on New Year’s Eve and open late the next day. Find out before you plan a morning round the pool.' },
  ],
  booking: {
    body: [
      'Most spa hotels sell New Year as a two-night package: dinner on both nights, a gala on the 31st and use of the spa. The price is for the stay, and the nights cannot be bought apart.',
      'Treatments are released with the rooms, in early autumn. By December what is left is the early morning and the late evening.',
    ],
    facts: [
      { label: 'Usual package', value: 'Two nights, dinner included' },
      { label: 'Treatments', value: 'Book with the room' },
      { label: 'Spa hours on the 31st', value: 'Often close by 5pm' },
      { label: 'Children', value: 'Rarely allowed in the spa' },
    ],
  },
  faq: [
    { q: 'Is the spa open on New Year’s Day?', a: 'Usually, but often from late morning. Treatments on the day cost more and go first.' },
    { q: 'Do I have to go to the gala dinner?', a: 'At most hotels it is part of the package and priced in. A few offer room service instead; ask.' },
    { q: 'Can I book one night?', a: 'Rarely at a country hotel. City hotels with a spa are more likely to take a single night on the 31st.' },
  ],
};

export const couplesBreaks: BreaksGuide = {
  path: '/breaks/couples/',
  subject: 'New Year’s Eve breaks for couples',
  imageAlt: 'A couple wrapped in a blanket on a cottage doorstep, looking out over a frosted garden',
  title: 'New Year breaks for couples',
  metaTitle: `New Year’s Eve breaks for couples UK ${site.season.eve}`,
  description: 'New Year’s Eve breaks for couples in the UK: cottages for two, small inns and quiet hotels, with what midnight is like, what they cost and when to book.',
  standfirst: 'Two days with nobody else’s plans in them. The best places for two are small, and the small ones go first.',
  crumbs: trail,
  checked,
  sample: true,
  image: couplesPicture,
  keyFacts: [
    { label: 'Best for', value: 'A quiet midnight' },
    { label: 'Usual stay', value: 'Two or three nights' },
    { label: 'Book by', value: 'The end of September' },
    { label: 'From', value: '£180 a night' },
  ],
  picks: {
    lede: 'Five ways to spend it together, none of them at a table for ten.',
    picks: [
      { kind: 'Cottage', name: 'A cottage for two', text: 'A wood burner, a doorstep that faces the sunrise and nobody for a mile.', price: 'From £180 a night', note: 'Three-night minimum', href: '/breaks/peak-district/', image: peakDistrict },
      { kind: 'Inn', name: 'An inn with six rooms', text: 'Dinner at a table of your own, midnight in the bar and breakfast until eleven.', price: 'From £210 a night', note: 'Dinner included', image: dinners },
      { kind: 'Hotel', name: 'A hotel with hot water outdoors', text: 'A tub on the terrace, a robe and a bottle that somebody else has opened.', price: 'From £290 a night', note: 'Two nights', href: '/breaks/spa/', image: spaPicture },
      { kind: 'Cabin', name: 'A cabin in the woods', text: 'One room, one stove and a skylight over the bed. Bring your own supper.', price: 'From £170 a night', note: 'No signal' },
      { kind: 'City', name: 'A city for the fireworks', text: 'A room with a view of the display, for the couple who would rather be in the middle of it.', price: 'From £390 a night', note: 'Three-night minimum', href: '/hogmanay/edinburgh/' },
    ],
  },
  choose: [
    { heading: 'Decide who cooks', text: 'A cottage means a supermarket run on the 30th and washing-up at one. An inn means neither. Both are good; know which you have chosen.' },
    { heading: 'Ask about the tables', text: 'Some gala dinners seat couples together at long tables. If you want a table for two, ask for one in writing.' },
    { heading: 'Go for the second morning', text: 'The 1st is slow everywhere. A stay that runs to the 2nd gives you one quiet day that is properly yours.' },
  ],
  booking: {
    body: [
      'Cottages for two are the first thing to go, often to the same couple as last year. The good ones open their New Year dates in January and are full by the spring.',
      'Small inns release rooms in early autumn as a two-night stay with dinner on the 31st. Anything still free in December is either very dear or has a reason.',
    ],
    facts: [
      { label: 'Cottages', value: 'Three-night minimum' },
      { label: 'Inns', value: 'Two nights, dinner included' },
      { label: 'Deposit', value: 'Usually the full amount' },
      { label: 'Single-night stays', value: 'City hotels only' },
    ],
  },
  faq: [
    { q: 'Where is quiet at New Year?', a: 'Anywhere with fewer than ten rooms and no function room. Ask whether there is a party before you book, not after.' },
    { q: 'Is a cottage cheaper than a hotel?', a: 'Per night, usually. Once dinner, wine and a three-night minimum are counted, it is about the same.' },
    { q: 'Can we bring the dog?', a: 'To most cottages and many inns, for a small charge. Hotels with a spa are less likely to agree.' },
  ],
};

export const cruiseBreaks: BreaksGuide = {
  path: '/breaks/cruises/',
  subject: 'New Year’s Eve cruises',
  imageAlt: 'The deck of a ship at sea at dawn, with loungers and a coastline in the distance',
  title: 'New Year cruises',
  metaTitle: `New Year’s Eve cruises ${site.season.eve} from the UK: where and when`,
  description: 'New Year’s Eve cruises from the UK: the Canary Islands, northern cities and rivers, with what is included, what it costs and when to book.',
  standfirst: 'Midnight at sea, and the washing-up is somebody else’s. Choose the ship for where it will be at twelve, not for where it starts.',
  crumbs: trail,
  checked,
  sample: true,
  image: cruisesPicture,
  keyFacts: [
    { label: 'Best for', value: 'Families and groups' },
    { label: 'Usual length', value: 'Four to fourteen nights' },
    { label: 'Book by', value: 'The spring' },
    { label: 'From', value: '£620 a person' },
  ],
  picks: {
    lede: 'Five kinds of sailing, from an evening on the river to a fortnight in the sun.',
    picks: [
      { kind: 'Ocean', name: 'The Canary Islands and Madeira', text: 'A fortnight from a southern port, timed to be at anchor under an island’s fireworks at midnight.', price: 'From £1,450 a person', note: 'Twelve to fourteen nights', image: fireworks },
      { kind: 'River', name: 'A river in central Europe', text: 'A small ship, a hundred and fifty guests and a capital city’s display from the top deck.', price: 'From £1,290 a person', note: 'Flights included', image: dinners },
      { kind: 'Ocean', name: 'Northern cities', text: 'Four or five nights across the North Sea, with a day in two old ports and the party on board.', price: 'From £620 a person', note: 'Four to five nights' },
      { kind: 'Small ship', name: 'The Scottish islands', text: 'Forty guests, a ceilidh in the saloon and a different anchorage each morning, weather allowing.', price: 'From £1,800 a person', note: 'Five nights' },
      { kind: 'One evening', name: 'A river cruise at midnight', text: 'No cabin and no luggage: supper, a band and the city’s fireworks from the water.', price: 'From £85 a person', note: 'Four hours', href: '/liverpool/' },
    ],
  },
  choose: [
    { heading: 'Ask where the ship is at midnight', text: 'Some sailings spend the night in port under a display; others are at sea with a band. The itinerary says which, if you read the 31st closely.' },
    { heading: 'Think about the crossing', text: 'A winter sailing south from Britain crosses open water for two days each way. A larger ship moves less, and a cabin in the middle moves least.' },
    { heading: 'Count what is included', text: 'The fare covers the cabin and most meals. Drinks, tips, excursions and the gala are often extra, and can add a third.' },
  ],
  booking: {
    body: [
      'New Year sailings go on sale up to two years ahead and the cheapest cabins are sold in the first few months. Prices rise from the spring and rarely come back down.',
      'The balance is usually due about three months before sailing, and cancelling after that costs most of the fare. Travel insurance that covers a cruise is worth reading properly.',
    ],
    facts: [
      { label: 'On sale', value: 'Up to two years ahead' },
      { label: 'Balance due', value: 'About 90 days before' },
      { label: 'Gala dinner', value: 'Included on most ships' },
      { label: 'Drinks', value: 'Often extra' },
    ],
  },
  faq: [
    { q: 'Are New Year cruises rough?', a: 'They can be for the first two days out of Britain. Ships are stabilised, but if you are a poor sailor, choose a river or fly to join the ship.' },
    { q: 'Is there a dress code on the 31st?', a: 'On most ocean ships the gala is formal: a dark suit or a long dress. River and small ships are more relaxed.' },
    { q: 'Are children welcome?', a: 'On the large ships, very: there are clubs and an early countdown. Small ships and river ships are mostly for adults.' },
  ],
};
