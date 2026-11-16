import picture from '@/assets/breaks/breaks.jpg';
import couples from '@/assets/breaks/couples.jpg';
import cruises from '@/assets/breaks/cruises.jpg';
import peakDistrict from '@/assets/breaks/peak-district.jpg';
import scotland from '@/assets/breaks/scotland.jpg';
import spa from '@/assets/breaks/spa.jpg';
import { site } from '@/lib/site';
import type { BreaksGuide } from './types';

/** SAMPLE CONTENT: see types.ts. Prices and booking patterns here are stand-ins. */
export const breaksHub: BreaksGuide = {
  path: '/breaks/',
  subject: 'New Year’s Eve breaks',
  imageAlt: 'Two people walking up a frosted lane towards a stone farmhouse at sunrise',
  title: 'New Year breaks',
  metaTitle: `New Year’s Eve breaks UK ${site.season.eve}: where to go, when to book`,
  description: 'New Year’s Eve breaks in the UK: Scotland, the Peak District, spa hotels, breaks for couples and cruises, with what each costs and when to book.',
  standfirst: 'The night is a few hours. A break makes it three days, and the best ones are quiet by the second morning.',
  crumbs: [{ label: 'Home', href: '/' }],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'Usual stay', value: 'Two or three nights' },
    { label: 'Book by', value: 'The end of October' },
    { label: 'From', value: '£160 a night' },
    { label: 'Dearest night', value: '31 December' },
  ],
  picks: {
    lede: 'Five ways to do it, from a glen to a deck at sea.',
    picks: [
      { kind: 'Region', name: 'Scotland', text: 'Hogmanay in the cities, then the glens once it is over.', price: 'From £190 a night', note: 'Three nights is usual', href: '/breaks/scotland/', image: scotland },
      { kind: 'Region', name: 'Peak District', text: 'Stone villages, cold walks and a fire at the end of them.', price: 'From £160 a night', note: 'Two hours from most of England', href: '/breaks/peak-district/', image: peakDistrict },
      { kind: 'Kind of break', name: 'Spa', text: 'Hot water, cold air and nothing booked but dinner.', price: 'From £240 a night', note: 'Dinner often included', href: '/breaks/spa/', image: spa },
      { kind: 'Kind of break', name: 'Couples', text: 'Two days with nobody else’s plans in them.', price: 'From £180 a night', note: 'Cottages and small inns', href: '/breaks/couples/', image: couples },
      { kind: 'Kind of break', name: 'Cruises', text: 'Midnight at sea, and the washing-up is somebody else’s.', price: 'From £620 a person', note: 'Four to fourteen nights', href: '/breaks/cruises/', image: cruises },
    ],
  },
  choose: [
    { heading: 'Decide how you want midnight', text: 'A party in the bar, a gala dinner or your own fireside. The answer rules out half the options at once.' },
    { heading: 'Count the nights, not the night', text: 'Most places ask for two or three nights and price the stay as one. Compare totals, not the rate for the 31st.' },
    { heading: 'Check what the first is like', text: 'Many kitchens close on New Year’s Day. A place that serves a late breakfast and a proper dinner is worth more than a view.' },
  ],
  booking: {
    body: [
      'New Year is the one week when small places fill first. Cottages and inns with a dozen rooms are often gone by September; large hotels release packages later and discount what is left in December.',
      'Read the cancellation terms before the price. Many New Year packages are paid in full in advance and cannot be moved.',
    ],
    facts: [
      { label: 'Minimum stay', value: 'Usually two or three nights' },
      { label: 'Deposit', value: 'Often the full amount' },
      { label: 'Free cancellation', value: 'Rare after November' },
      { label: 'Dinner on the 31st', value: 'Often compulsory, and extra' },
    ],
  },
  faq: [
    { q: 'When should I book a New Year break?', a: 'For a cottage or a small inn, by the end of September. For a large hotel, October is early enough.' },
    { q: 'Is it cheaper to arrive on the 30th or to leave on the 2nd?', a: 'Leaving on the 2nd is usually cheaper: the 30th is priced as part of the peak, the 1st often is not.' },
    { q: 'Are New Year breaks suitable for children?', a: 'Many are, but check: gala dinners often start late and some hotels take adults only over New Year.' },
  ],
};
