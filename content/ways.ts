import type { StaticImageData } from 'next/image';
import dinners from '@/assets/ways/dinners.jpg';
import family from '@/assets/ways/family.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import parties from '@/assets/ways/parties.jpg';
import quiet from '@/assets/ways/quiet.jpg';

/**
 * The ways to spend the night, as the home page offers them: by the kind of night, before the city.
 * Each one leads to the "ways to spend the night" block of a city guide.
 *
 * The lines describe a kind of night. They make no claim about any particular event or venue, and the
 * photographs illustrate the mood only: none of them shows a real, named place.
 */
export interface Way {
  slug: string;
  name: string;
  /** One opinionated line. */
  line: string;
  /** What the guides cover under this heading. */
  detail: string;
  image: StaticImageData;
  links: { city: string; href: string }[];
}

/** The guides this chapter routes to, and where each keeps a given way to spend the night. */
const guides = [
  { city: 'London', path: '/london/' },
  { city: 'Manchester', path: '/manchester/' },
  { city: 'Edinburgh', path: '/hogmanay/edinburgh/' },
];
const links = guides.map(({ city, path }) => ({ city, href: `${path}#ways` }));

export const ways: Way[] = [
  {
    slug: 'fireworks',
    name: 'Fireworks',
    line: 'Out in the cold with thousands of others, looking up.',
    detail: 'Free displays and ticketed ones, and where to stand for each.',
    image: fireworks,
    links,
  },
  {
    slug: 'parties',
    name: 'Parties',
    line: 'A ticket, a dance floor and a countdown nobody can hear.',
    detail: 'Club nights, ballroom parties and the big ticketed events.',
    image: parties,
    links,
  },
  {
    slug: 'dinners',
    name: 'Dinners and cruises',
    line: 'A table at midnight, or a deck on the river.',
    detail: 'Set menus, river cruises and rooms with a view of the display.',
    image: dinners,
    links,
  },
  {
    slug: 'family',
    name: 'Family',
    line: 'Midnight comes early when you are seven.',
    detail: 'Early countdowns, daytime events and displays that finish before bedtime.',
    image: family,
    links,
  },
  {
    slug: 'quiet',
    name: 'A quiet one',
    line: 'The bells, a drink and nobody shouting.',
    detail: 'Country pubs, small restaurants and nights in done properly.',
    image: quiet,
    links,
  },
];
