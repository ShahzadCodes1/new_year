import picture from '@/assets/source/london-emrich-pexels-230794.jpg';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import parties from '@/assets/ways/parties.jpg';
import quiet from '@/assets/ways/quiet.jpg';
import { site } from '@/lib/site';
import type { CityGuide } from './types';

/** SAMPLE CONTENT: see types.ts. Venue names, prices and times here are stand-ins. */
export const london: CityGuide = {
  path: '/london/',
  title: 'New Year’s Eve in London',
  metaTitle: `New Year’s Eve in London ${site.season.eve}: where to be at midnight`,
  description: 'Where to be at midnight in London: the fireworks, the parties, the dinners, where to stay and how to get home.',
  standfirst: 'The biggest display in the country, and the hardest to get close to. Book early or watch from further out: both make a good night.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'At midnight', value: 'Fireworks at the London Eye' },
    { label: 'Riverside areas', value: 'Ticketed' },
    { label: 'Best for', value: 'First-timers and groups' },
    { label: 'Budget', value: '££ to ££££' },
  ],
  moment: {
    body: [
      'At midnight the bells ring out over the river and the display begins from barges moored beside the London Eye. It lasts about twelve minutes and is set to music, which you hear properly only inside the viewing areas.',
      'The riverside between the bridges is closed to anyone without a ticket from early evening. Outside it the view narrows quickly: tall buildings and bends in the river hide most of the display from street level.',
      'If you have no ticket, choose height over closeness. The hills to the north and south-east give a full view of the skyline, with room to stand and no barriers.',
    ],
    facts: [
      { label: 'Display begins', value: 'Midnight' },
      { label: 'Lasts', value: 'About 12 minutes' },
      { label: 'Viewing areas open', value: '8pm' },
      { label: 'Last entry', value: '10.30pm' },
      { label: 'Tickets', value: 'From £20' },
    ],
  },
  ways: {
    lede: 'Five kinds of night. Pick the one that sounds like yours.',
    picks: [
      { kind: 'Fireworks', name: 'The riverside display', text: 'Ticketed viewing areas along the embankment, and the free hills further out.', price: 'From £20', note: 'Free from the hills', href: '/london/fireworks/', image: fireworks },
      { kind: 'Parties', name: 'The Lantern Rooms', text: 'Three floors, two dance floors and a roof terrace opened for the countdown.', price: 'From £45', note: 'Shoreditch', image: parties },
      { kind: 'Dinners and cruises', name: 'A midnight dinner cruise', text: 'Four courses on the river, moored in sight of the display when the bells go.', price: 'From £260', note: 'Boards at 7pm', image: dinners },
      { kind: 'Family', name: 'The early countdown', text: 'A daytime programme with its own countdown at 6pm, so small children see one too.', price: 'Free', note: 'South Bank', image: family },
      { kind: 'A quiet one', name: 'The Old Wharf Inn', text: 'A fire, a short menu and a room that keeps the television off until five to twelve.', price: 'Tables from £60', note: 'Rotherhithe', image: quiet },
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
    { q: 'Can I watch the fireworks without a ticket?', a: 'Not from the riverside. From the hills further out you can, for free, and you will see the whole skyline rather than part of the display.' },
    { q: 'What time should I arrive?', a: 'With a ticket, soon after the viewing areas open. Without one, be on your hill by ten: the good spots go early.' },
    { q: 'Is it suitable for children?', a: 'The riverside is crowded and loud and the wait is long. The early countdown or a hill with space to sit suits children better.' },
    { q: 'What if it rains?', a: 'The display goes ahead in rain. Bring a waterproof rather than an umbrella, which nobody behind you will thank you for.' },
  ],
};
