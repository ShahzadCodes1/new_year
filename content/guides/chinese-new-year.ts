import picture from '@/assets/celebrations/lunar-new-year.jpg';
import type { CelebrationGuide } from './types';

/**
 * SAMPLE CONTENT: see types.ts. The date of the next New Year and of the Lantern Festival are verified (see
 * content/celebrations.ts for the source). Everything about particular UK cities here is a stand-in.
 */
export const chineseNewYear: CelebrationGuide = {
  path: '/chinese-new-year/',
  title: 'Chinese New Year in the UK',
  metaTitle: 'Chinese New Year 2027 in the UK: the date, what happens and where to go',
  description: 'Chinese New Year in the UK: when it falls, how it is marked, where the biggest celebrations are and what the traditions mean.',
  standfirst: 'The largest New Year in the world lasts fifteen days. In Britain the public part is one loud, crowded, generous weekend.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Celebrations', href: '/celebrations/' },
  ],
  checked: '2026-11-11',
  sample: true,
  image: picture,
  keyFacts: [
    { label: 'Next', value: 'Saturday 6 February 2027' },
    { label: 'Year of the', value: 'Goat' },
    { label: 'Lasts', value: 'Fifteen days' },
    { label: 'Ends with', value: 'The Lantern Festival, 20 February' },
  ],
  what: {
    body: [
      'Chinese New Year, also called Lunar New Year or the Spring Festival, begins on the second new moon after the winter solstice. That puts it between late January and late February, on a different date each year.',
      'It is a family festival before it is a public one. The most important meal of the year is eaten on the eve; the days that follow are for visiting relatives, in a set order.',
      'It is also kept, under other names and with other customs, in Vietnam, Korea and across South-East Asia.',
    ],
    facts: [
      { label: 'New Year’s Eve', value: 'Friday 5 February 2027' },
      { label: 'New Year’s Day', value: 'Saturday 6 February 2027' },
      { label: 'Lantern Festival', value: 'Saturday 20 February 2027' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four things you will see, wherever you go.',
    picks: [
      { name: 'Lion and dragon dances', text: 'Teams of dancers under one costume, moving from door to door to drums and cymbals to bring a business luck.' },
      { name: 'The reunion dinner', text: 'The meal on New Year’s Eve, with dishes chosen because their names sound like good fortune.' },
      { name: 'Red envelopes', text: 'Money in red paper, given by the married to children and the unmarried. The colour matters more than the sum.' },
      { name: 'Lanterns', text: 'Hung throughout, and carried on the fifteenth night, when the festival ends under the first full moon.' },
    ],
  },
  where: {
    lede: 'The public celebrations fall on the nearest weekend, not always on the day itself.',
    picks: [
      { kind: 'The largest', name: 'London', text: 'A parade through the West End, stages in the square and Chinatown packed from mid-morning.', note: 'Free' },
      { kind: 'Three days', name: 'Manchester', text: 'A dragon parade from the town hall into Chinatown, with a market and fireworks to close.', note: 'Free' },
      { kind: 'The oldest Chinatown', name: 'Liverpool', text: 'Lanterns and projections around the arch, and a street programme on the Sunday.', note: 'Free' },
      { kind: 'The quarter', name: 'Birmingham', text: 'Stages and food stalls through the Chinese Quarter, with the lion dance at noon.', note: 'Free' },
    ],
  },
  traditions: [
    { heading: 'Clean before, not after', text: 'The house is swept before the New Year arrives. Sweeping on the first day would sweep the luck out with the dust.' },
    { heading: 'Red on the door', text: 'Couplets on red paper are pasted either side of the door, with a wish for the year in each line.' },
    { heading: 'An animal for each year', text: 'Twelve animals take turns. The year that begins in February 2027 belongs to the Goat.' },
  ],
  faq: [
    { q: 'Is it Chinese New Year or Lunar New Year?', a: 'Both are used. Lunar New Year is the wider term, since the same New Year is kept in several countries; Chinese New Year is the commoner one in Britain.' },
    { q: 'Why does the date change every year?', a: 'It follows the moon. The New Year begins on a new moon, so it moves by ten or eleven days against the ordinary calendar, and jumps back when an extra month is added.' },
    { q: 'Is it a bank holiday in the UK?', a: 'No. Shops, banks and schools keep their usual hours.' },
  ],
};
