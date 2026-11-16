import birminghamPicture from '@/assets/source/birmingham-night-higgsfield.jpg';
import glasgowPicture from '@/assets/source/glasgow-night-higgsfield.jpg';
import liverpoolPicture from '@/assets/source/liverpool-night-higgsfield.jpg';
import newcastlePicture from '@/assets/source/newcastle-night-higgsfield.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import parties from '@/assets/ways/parties.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { site } from '@/lib/site';
import type { CityGuide } from './types';

const home = [
  { label: 'Home', href: '/' },
  { label: 'Cities', href: '/cities/' },
];
const checked = '2026-11-11';

/** SAMPLE CONTENT: see types.ts. Venue names, prices and times in all four guides are stand-ins. */
export const birmingham: CityGuide = {
  path: '/birmingham/',
  place: 'Birmingham',
  occasion: 'New Year’s Eve',
  imageAlt: 'Brick canalside buildings in Birmingham lit up at night, reflected in the water below modern towers',
  title: 'New Year’s Eve in Birmingham',
  metaTitle: `New Year’s Eve in Birmingham ${site.season.eve}: events and parties`,
  description: 'New Year’s Eve in Birmingham: Broad Street, the canals and Digbeth, ticketed parties and dinners, where to stay and getting home.',
  standfirst: 'There is no single centrepiece, which leaves the whole city to choose from. Pick a quarter and stay in it: they are further apart than they look.',
  crumbs: home,
  checked,
  sample: true,
  image: birminghamPicture,
  keyFacts: [
    { label: 'At midnight', value: 'In the bars, by the canal' },
    { label: 'Fireworks', value: 'No city display' },
    { label: 'Best for', value: 'Groups, food, live music' },
    { label: 'Budget', value: '£ to £££' },
  ],
  moment: {
    body: [
      'Birmingham sees the year in by quarter. Broad Street is the loud one, the canal basin the one with tables, and Digbeth the one with a band on.',
      'There is no central countdown and no city display. The canalside comes closest to a shared moment: people step out onto the towpath at midnight with a glass.',
    ],
    facts: [
      { label: 'Loudest', value: 'Broad Street' },
      { label: 'For dinner', value: 'The canal basin' },
      { label: 'For music', value: 'Digbeth' },
      { label: 'Bars close', value: 'Between 2am and 4am' },
    ],
  },
  ways: {
    lede: 'Five kinds of night. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The towpath at midnight', text: 'No display, but a few hundred people, a string of lights and whatever the bars send up.', price: 'Free', note: 'Canal basin', image: fireworks },
      { kind: 'Parties', name: 'The Custard Works', text: 'A warehouse with two rooms, a courtyard with heaters and a band until one.', price: 'From £30', note: 'Digbeth', image: parties },
      { kind: 'Dinners and cruises', name: 'A canalside tasting menu', text: 'Seven courses beside the water, timed to finish with ten minutes to spare.', price: 'From £120', note: 'Canal basin', image: dinners },
      { kind: 'Family', name: 'The winter gardens', text: 'An illuminated trail with a countdown for children at half past five.', price: 'From £14', note: 'Edgbaston', image: family },
      { kind: 'A quiet one', name: 'The Old Crown Snug', text: 'A timbered room, a fire and a landlord who rings a bell at midnight.', price: 'No booking', note: 'Digbeth', image: quiet },
    ],
  },
  stay: {
    lede: 'Stay in the quarter you are going out in. A taxi across the centre after midnight is a long wait.',
    picks: [
      { kind: 'Hotel', name: 'The Wharf House', text: 'Rooms over the water, two minutes from the basin’s restaurants.', price: 'From £170 a night', note: 'Canal basin' },
      { kind: 'Hotel', name: 'Colmore Rooms', text: 'Quiet, central and a short walk from the station.', price: 'From £130 a night', note: 'Colmore Row' },
      { kind: 'Apartments', name: 'The Jewellers’ Lofts', text: 'Flats for four in an old workshop, with a kitchen for the morning after.', price: 'From £160 a night', note: 'Jewellery Quarter' },
    ],
  },
  logistics: {
    body: [
      'The quarters are a fifteen to twenty-minute walk apart. Decide before you go out; moving between them at eleven means missing midnight in a queue.',
      'Trains stop before midnight. Trams run later, and night buses cover the main roads out.',
    ],
    facts: [
      { label: 'Trams after midnight', value: 'Until about 1am' },
      { label: 'Trains', value: 'Last services before midnight' },
      { label: 'Night buses', value: 'Main routes, hourly' },
      { label: 'Taxis', value: 'Book before you go out' },
    ],
  },
  faq: [
    { q: 'Are there fireworks in Birmingham on New Year’s Eve?', a: 'There is no city display. Some venues let off their own at midnight, briefly.' },
    { q: 'Which area should I choose?', a: 'Broad Street for a big night, the canal basin for dinner, Digbeth for music. Choose one.' },
    { q: 'Do I need to book?', a: 'For anywhere with a table or a ticket, yes, a few weeks ahead. Pubs without either fill by nine.' },
  ],
};

export const liverpool: CityGuide = {
  path: '/liverpool/',
  place: 'Liverpool',
  occasion: 'New Year’s Eve',
  imageAlt: 'Liverpool’s waterfront at night, with the Royal Liver Building and the Museum of Liverpool across the dock',
  title: 'New Year’s Eve in Liverpool',
  metaTitle: `New Year’s Eve in Liverpool ${site.season.eve}: events and parties`,
  description: 'New Year’s Eve in Liverpool: midnight on the waterfront, ticketed parties and concerts, where to stay and how to get home.',
  standfirst: 'A waterfront made for midnight, and a city that needs no excuse. Start at the docks, end wherever the music is.',
  crumbs: home,
  checked,
  sample: true,
  image: liverpoolPicture,
  keyFacts: [
    { label: 'At midnight', value: 'On the waterfront' },
    { label: 'Fireworks', value: 'From the river' },
    { label: 'Best for', value: 'Music and a late finish' },
    { label: 'Budget', value: '£ to £££' },
  ],
  moment: {
    body: [
      'At midnight the ships on the river sound their horns and a display goes up over the water in front of the waterfront’s three great buildings.',
      'The crowd gathers along the river wall from about eleven. It is open, free and windy; the docks behind give shelter and a bar until the last few minutes.',
    ],
    facts: [
      { label: 'Display begins', value: 'Midnight' },
      { label: 'Lasts', value: 'About 10 minutes' },
      { label: 'Best seen from', value: 'The river wall' },
      { label: 'Tickets', value: 'None needed' },
    ],
  },
  ways: {
    lede: 'Five kinds of night. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The river wall', text: 'The display over the water, the horns, and the whole waterfront lit behind you.', price: 'Free', note: 'Pier Head', image: fireworks },
      { kind: 'Parties', name: 'The Cotton Cellars', text: 'Brick vaults under the docks, three bands and a countdown from the stage.', price: 'From £35', note: 'The docks', image: parties },
      { kind: 'Dinners and cruises', name: 'A river cruise at midnight', text: 'Out on the water for the display, with supper and a band below deck.', price: 'From £85', note: 'Sails at 10pm', image: dinners },
      { kind: 'Family', name: 'The dockside lanterns', text: 'A lantern parade round the dock at five, with fireworks to end it at six.', price: 'Free', note: 'The docks', image: family },
      { kind: 'A quiet one', name: 'The Philosopher’s Rest', text: 'A panelled pub up the hill, with a fire and a view of the river from the back room.', price: 'No booking', note: 'Georgian Quarter', image: quiet },
    ],
  },
  stay: {
    lede: 'Anywhere between the river and the top of the hill is a walk from everything.',
    picks: [
      { kind: 'Hotel', name: 'The Dock Warehouse', text: 'Vaulted rooms in a converted warehouse, on the water and five minutes from the river wall.', price: 'From £200 a night', note: 'The docks' },
      { kind: 'Hotel', name: 'Castle Street Rooms', text: 'A former bank, with large rooms and a bar that stays open for residents.', price: 'From £150 a night', note: 'Business district' },
      { kind: 'Apartments', name: 'The Ropewalks Lofts', text: 'In the middle of the bars, for people who do not plan to sleep early.', price: 'From £140 a night', note: 'Ropewalks' },
    ],
  },
  logistics: {
    body: [
      'The waterfront road closes for the evening. Walk down from the centre: it is ten minutes, downhill, and the way back is the only hard part.',
      'Local trains run late on the night. Taxis are easiest from the top of the hill, away from the river.',
    ],
    facts: [
      { label: 'Road closures', value: 'Waterfront, from 9pm' },
      { label: 'Local trains', value: 'Until about 1.30am' },
      { label: 'Night buses', value: 'From the centre' },
      { label: 'Ferries', value: 'No late crossings' },
    ],
  },
  faq: [
    { q: 'Is the waterfront display free?', a: 'Yes. No ticket is needed for the river wall.' },
    { q: 'Where should I stand?', a: 'Along the river wall in front of the three large buildings. Arrive by eleven for a place at the front.' },
    { q: 'Is it suitable for children?', a: 'The early lantern parade is made for them. Midnight on the river wall is cold, late and crowded.' },
  ],
};

export const newcastle: CityGuide = {
  path: '/newcastle/',
  place: 'Newcastle',
  occasion: 'New Year’s Eve',
  imageAlt: 'The River Tyne at night, with the Millennium Bridge arch lit white and the Tyne Bridge beyond',
  title: 'New Year’s Eve in Newcastle',
  metaTitle: `New Year’s Eve in Newcastle ${site.season.eve}: Quayside and parties`,
  description: 'New Year’s Eve in Newcastle: Howaymanay on the Quayside, ticketed parties, where to stay and how to get home on the Metro.',
  standfirst: 'The Quayside is the place to be, with the bridges overhead. Dress for the cold, though you will be the only one who does.',
  crumbs: home,
  checked,
  sample: true,
  image: newcastlePicture,
  keyFacts: [
    { label: 'At midnight', value: 'On the Quayside' },
    { label: 'Fireworks', value: 'From the bridges' },
    { label: 'Best for', value: 'A big night out' },
    { label: 'Budget', value: '£ to ££' },
  ],
  moment: {
    body: [
      'Midnight happens on the river, between the two banks. A display is fired from the bridges, and from the Quayside it fills the sky upstream and down.',
      'Both banks are open and free. The north bank is closer to the bars; the south bank has the better view of the bridges lit from below.',
    ],
    facts: [
      { label: 'Display begins', value: 'Midnight' },
      { label: 'Lasts', value: 'About 8 minutes' },
      { label: 'Best view', value: 'The south bank' },
      { label: 'Tickets', value: 'None needed' },
    ],
  },
  ways: {
    lede: 'Five kinds of night. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The Quayside', text: 'The display from the bridges, seen from either bank, with the river between.', price: 'Free', note: 'Both banks', image: fireworks },
      { kind: 'Parties', name: 'The Boiler Shop', text: 'A former engine works with a long bar, a stage and room for a thousand.', price: 'From £28', note: 'Behind the station', image: parties },
      { kind: 'Dinners and cruises', name: 'Dinner above the river', text: 'Five courses on the sixth floor, with the bridges below and the display at eye level.', price: 'From £105', note: 'South bank', image: dinners },
      { kind: 'Family', name: 'The early fireworks', text: 'A shorter display at six, from the same bridges, with the crowd a tenth of the size.', price: 'Free', note: 'Quayside', image: family },
      { kind: 'A quiet one', name: 'The Cluny Snug', text: 'A valley pub ten minutes upstream, with real ale and a folk session until midnight.', price: 'No booking', note: 'Ouseburn', image: quiet },
    ],
  },
  stay: {
    lede: 'The Quayside is at the bottom of a steep hill. Stay on it, or be ready for the climb.',
    picks: [
      { kind: 'Hotel', name: 'The Quayside Exchange', text: 'On the river, with rooms that face the bridges and a late breakfast.', price: 'From £190 a night', note: 'Quayside' },
      { kind: 'Hotel', name: 'Grey Street Rooms', text: 'A curved Georgian terrace, halfway up the hill and close to everything.', price: 'From £140 a night', note: 'Grainger Town' },
      { kind: 'Apartments', name: 'The Valley Lofts', text: 'Converted workshops in the creative quarter, a short walk along the river.', price: 'From £120 a night', note: 'Ouseburn' },
    ],
  },
  logistics: {
    body: [
      'The Quayside road and the lowest bridge close to traffic for the evening. The walk down from the centre takes ten minutes; allow twenty going back up.',
      'The Metro runs later than usual. Taxis queue at the top of the hill, not on the river.',
    ],
    facts: [
      { label: 'Road closures', value: 'Quayside, from 8pm' },
      { label: 'Metro', value: 'Until about 1am' },
      { label: 'Night buses', value: 'From the centre' },
      { label: 'Taxis', value: 'Ranks at the top of the hill' },
    ],
  },
  faq: [
    { q: 'Which bank is better?', a: 'The south bank for the view, the north bank for the bars. The footbridge between them closes at eleven.' },
    { q: 'How cold will it be?', a: 'Close to freezing, with wind off the river. A coat is not a local custom but it is a good idea.' },
    { q: 'Do I need a ticket?', a: 'Not for the Quayside. Bars and restaurants with a view sell the evening as a ticket.' },
  ],
};

export const glasgow: CityGuide = {
  path: '/glasgow/',
  place: 'Glasgow',
  occasion: 'Hogmanay',
  imageAlt: 'The Clyde Arc bridge lit up over the River Clyde in Glasgow at night',
  title: 'Hogmanay in Glasgow',
  metaTitle: `Hogmanay in Glasgow ${site.season.eve}: ceilidhs, parties and events`,
  description: 'Hogmanay in Glasgow: ceilidhs, pubs and parties, ticketed Hogmanay events, where to stay and how to get home after the bells.',
  standfirst: 'Hogmanay with less ceremony and more noise. Here the bells are mostly heard indoors, and the best nights are the ones somebody invites you to.',
  crumbs: home,
  checked,
  sample: true,
  image: glasgowPicture,
  keyFacts: [
    { label: 'At the bells', value: 'Indoors, at a ceilidh or a pub' },
    { label: 'Fireworks', value: 'No city display' },
    { label: 'Best for', value: 'Music and company' },
    { label: 'Budget', value: '£ to ££' },
  ],
  moment: {
    body: [
      'Glasgow does not hold a street party. At midnight the city is in its pubs, its halls and its front rooms, and the bells come over a radio or from a piper in the corner.',
      'A ceilidh is the surest way to be in the right place. The dances are called, nobody minds a beginner, and at midnight everyone in the room knows the words.',
    ],
    facts: [
      { label: 'The bells', value: 'Midnight' },
      { label: 'Ceilidhs begin', value: 'From 8pm' },
      { label: 'Ceilidh tickets', value: 'From £25' },
      { label: 'Pubs close', value: 'About 1am' },
    ],
  },
  ways: {
    lede: 'Five kinds of Hogmanay. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The riverside at the bells', text: 'No display, but the bridges are lit and the ships on the river sound their horns.', price: 'Free', note: 'The river', image: fireworks },
      { kind: 'Parties', name: 'A ceilidh in the old hall', text: 'A band, a caller and three hundred people who learn each dance as it happens.', price: 'From £25', note: 'Merchant City', image: parties },
      { kind: 'Dinners and cruises', name: 'A Hogmanay supper', text: 'Four courses, a piper, a toast at the bells and steak pie at one in the morning.', price: 'From £90', note: 'West End', image: dinners },
      { kind: 'Family', name: 'The afternoon ceilidh', text: 'The same dances, at two in the afternoon, with squash and a countdown at four.', price: 'From £8', note: 'West End', image: family },
      { kind: 'A quiet one', name: 'The Ben Nevis Snug', text: 'A whisky bar with a fiddle in the corner and room for about thirty.', price: 'No booking', note: 'Finnieston', image: quiet },
    ],
  },
  stay: {
    lede: 'The centre and the West End are fifteen minutes apart by subway, which stops early. Stay where you will finish.',
    picks: [
      { kind: 'Hotel', name: 'The Merchant’s House', text: 'High ceilings and a late bar, in the middle of the old city.', price: 'From £160 a night', note: 'Merchant City' },
      { kind: 'Hotel', name: 'Kelvin Rooms', text: 'A terrace by the park, close to the West End’s pubs and restaurants.', price: 'From £140 a night', note: 'West End' },
      { kind: 'Apartments', name: 'The Clyde Lofts', text: 'By the river, between the two, with room for six.', price: 'From £150 a night', note: 'Finnieston' },
    ],
  },
  logistics: {
    body: [
      'The subway closes early on Hogmanay and does not run on New Year’s Day. Plan the way home before you go out.',
      'Scotland has two bank holidays after Hogmanay. Shops and many restaurants are closed on the first; bring breakfast.',
    ],
    facts: [
      { label: 'Subway', value: 'Closes early evening' },
      { label: 'Trains', value: 'Last services about 9pm' },
      { label: 'Night buses', value: 'A reduced service' },
      { label: '1 January', value: 'Almost everything closed' },
    ],
  },
  faq: [
    { q: 'Is there a street party in Glasgow?', a: 'No. For a street party, Edinburgh is fifty minutes away by train, and the last train back is early.' },
    { q: 'What is a ceilidh?', a: 'A night of called dances to a live band. You need no partner and no practice; you will be shown.' },
    { q: 'What is first-footing?', a: 'Visiting a neighbour just after the bells, traditionally with something to drink and something to eat. It is still done.' },
  ],
};
