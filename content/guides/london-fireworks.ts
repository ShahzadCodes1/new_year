import picture from '@/assets/ways/fireworks.jpg';
import { site } from '@/lib/site';
import type { EventGuide } from './types';

/** SAMPLE CONTENT: see types.ts. Areas, prices and times here are stand-ins. */
export const londonFireworks: EventGuide = {
  path: '/london/fireworks/',
  title: 'London’s New Year’s Eve fireworks',
  metaTitle: `London New Year’s Eve fireworks ${site.season.eve}: tickets, viewing areas and free spots`,
  description: 'The London fireworks at midnight: what the display is, where to watch it from, how tickets work and how to get home.',
  standfirst: 'Worth seeing once from the river, with a ticket. After that, the hills give you more of it for nothing.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
    { label: 'London', href: '/london/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'When', value: 'Midnight, 31 December' },
    { label: 'Where', value: 'The river at the London Eye' },
    { label: 'Tickets', value: 'Needed for the riverside' },
    { label: 'Lasts', value: 'About 12 minutes' },
  ],
  what: {
    body: [
      'The display is fired from barges on the river and from the wheel itself, to a soundtrack played through speakers in the viewing areas. It begins on the first stroke of midnight.',
      'It is designed to be seen from the embankment opposite. From anywhere else you are watching the same fireworks from the side or from a distance, which is a different and quieter experience.',
    ],
    facts: [
      { label: 'Starts', value: 'Midnight' },
      { label: 'Ends', value: 'About 12.12am' },
      { label: 'Viewing areas', value: 'Six, each with its own entrance' },
      { label: 'Capacity', value: 'About 100,000' },
    ],
  },
  watch: {
    lede: 'Two with a ticket, two without.',
    picks: [
      { kind: 'Ticketed', name: 'The embankment, facing the wheel', text: 'The view the display is designed for, with the sound. Standing only, and full by ten.', price: 'From £35', note: 'Opens 8pm' },
      { kind: 'Ticketed', name: 'The bridge', text: 'Side-on to the wheel with the river below. A little more room to move.', price: 'From £20', note: 'Opens 8pm' },
      { kind: 'Free', name: 'The northern hill', text: 'The whole skyline from a distance. No sound, but space to sit and a clear horizon.', price: 'Free', note: 'Arrive by 10pm' },
      { kind: 'Free', name: 'The park on the south-east hill', text: 'Further still, quieter, and the easiest to leave afterwards.', price: 'Free', note: 'Arrive by 10.30pm' },
    ],
  },
  tickets: {
    body: [
      'Tickets are released in batches in the autumn and sell out within hours. Each is for one named viewing area and one entrance, and cannot be moved to another on the night.',
      'Buy only from the official sale. A ticket bought elsewhere may be refused at the gate, and there is no way to check it beforehand.',
    ],
    facts: [
      { label: 'On sale', value: 'In batches from October' },
      { label: 'Price', value: '£20 to £50' },
      { label: 'Limit', value: 'Four per booking' },
      { label: 'Under 14s', value: 'Must be with an adult' },
    ],
  },
  logistics: {
    body: [
      'Go to the entrance named on your ticket: the areas are fenced off from one another. Bring nothing you would mind carrying for five hours, and no glass.',
      'Afterwards the crowd leaves in stages, area by area. It takes about an hour to clear. Walking away from the river to a station further out is nearly always quicker.',
    ],
    facts: [
      { label: 'Bag size', value: 'Small bags only' },
      { label: 'Food and drink', value: 'Stalls inside each area' },
      { label: 'Toilets', value: 'Inside each area' },
      { label: 'Time to clear', value: 'About an hour' },
    ],
  },
  faq: [
    { q: 'Are tickets refundable?', a: 'Only if the display is cancelled. A wet night is not a cancelled one.' },
    { q: 'Can I bring a pushchair?', a: 'It is allowed in some areas, but the crush near midnight makes it a poor idea. A carrier is easier.' },
    { q: 'Is there an accessible viewing area?', a: 'Yes, booked separately, with step-free access and seating for one companion.' },
  ],
};
