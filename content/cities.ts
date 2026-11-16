/**
 * The cities on the home page, in the order the scene visits them: south to north, ending on Hogmanay.
 * `slug` matches the scene's plate folder (public/plates/<slug>/) and the order must match STATIONS in
 * experience/boot.ts.
 *
 * These lines characterise how each city's night is known to go. They make no claim about this year's
 * programme: whether a display is running, when and where, belongs in the city's guide, with its source and
 * the date it was checked.
 */
export interface City {
  slug: string;
  name: string;
  /** The country, as hubs head it. Cities are grouped by this, so a second country's cities form their own group. */
  country: string;
  /** One opinionated line. */
  verdict: string;
  /** Where midnight happens, in a sentence. */
  moment: string;
  /** Which side of a wide screen the caption sits on: whichever keeps it off the city's subject. */
  side: 'start' | 'end';
  links: { label: string; href: string }[];
}

export const cities: City[] = [
  {
    slug: 'london',
    country: 'United Kingdom',
    side: 'end',
    name: 'London',
    verdict: 'The biggest display in the country, and the hardest to get close to.',
    moment: 'Fireworks over the Thames at the London Eye. The riverside viewing areas are ticketed.',
    links: [
      { label: 'Read the London guide', href: '/london/' },
      { label: 'Fireworks in London', href: '/london/fireworks/' },
      { label: 'New Year’s Eve events in London', href: '/london/events/' },
    ],
  },
  {
    slug: 'manchester',
    country: 'United Kingdom',
    side: 'end',
    name: 'Manchester',
    verdict: 'A night out first, a countdown second.',
    moment: 'Midnight belongs to the bars and clubs, from the Northern Quarter to Deansgate.',
    links: [
      { label: 'Read the Manchester guide', href: '/manchester/' },
      { label: 'Fireworks in Manchester', href: '/manchester/fireworks/' },
    ],
  },
  {
    slug: 'birmingham',
    country: 'United Kingdom',
    side: 'start',
    name: 'Birmingham',
    verdict: 'No single centrepiece, which leaves the whole city to choose from.',
    moment: 'Broad Street, the canals and Digbeth each see the year in their own way.',
    links: [{ label: 'Read the Birmingham guide', href: '/birmingham/' }],
  },
  {
    slug: 'liverpool',
    country: 'United Kingdom',
    side: 'start',
    name: 'Liverpool',
    verdict: 'A waterfront made for midnight, and a city that needs no excuse.',
    moment: 'The night gathers around the Pier Head and the docks.',
    links: [{ label: 'Read the Liverpool guide', href: '/liverpool/' }],
  },
  {
    slug: 'newcastle',
    country: 'United Kingdom',
    side: 'end',
    name: 'Newcastle',
    verdict: 'The Quayside is the place to be, with the bridges overhead.',
    moment: 'Midnight on the Tyne, between Newcastle and Gateshead.',
    links: [{ label: 'Read the Newcastle guide', href: '/newcastle/' }],
  },
  {
    slug: 'glasgow',
    country: 'United Kingdom',
    side: 'end',
    name: 'Glasgow',
    verdict: 'Hogmanay with less ceremony and more noise.',
    moment: 'Ceilidhs, pubs and parties: here the bells are mostly heard indoors.',
    links: [{ label: 'Read the Glasgow guide', href: '/glasgow/' }],
  },
  {
    slug: 'edinburgh',
    country: 'United Kingdom',
    side: 'start',
    name: 'Edinburgh',
    verdict: 'Hogmanay is a festival, not a single night.',
    moment: 'A street party on Princes Street, with fireworks from the castle at midnight.',
    links: [{ label: 'Read the Hogmanay guide', href: '/hogmanay/edinburgh/' }],
  },
];
