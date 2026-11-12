import type { StaticImageData } from 'next/image';
import breaks from '@/assets/breaks/breaks.jpg';
import couples from '@/assets/breaks/couples.jpg';
import cruises from '@/assets/breaks/cruises.jpg';
import peakDistrict from '@/assets/breaks/peak-district.jpg';
import scotland from '@/assets/breaks/scotland.jpg';
import spa from '@/assets/breaks/spa.jpg';

/**
 * New Year breaks, as the home page offers them: the hub, then five ways in.
 *
 * The photographs illustrate a kind of break or a kind of landscape. None of them is a named hotel, ship or
 * spot, and none should ever be captioned as one: a real property is shown with its own photographs.
 */
export interface Break {
  slug: string;
  name: string;
  /** One opinionated line. */
  line: string;
  /** Left out by the page until the address exists. */
  href?: string;
  image: StaticImageData;
}

/** The hub: every break, in one place. */
export const breaksHub = { href: '/breaks/', image: breaks };

export const breakTypes: Break[] = [
  { slug: 'scotland', name: 'Scotland', line: 'Hogmanay, and the glens once it is over.', href: '/breaks/scotland/', image: scotland },
  { slug: 'peak-district', name: 'Peak District', line: 'Stone villages, cold walks and a fire at the end.', href: '/breaks/peak-district/', image: peakDistrict },
  { slug: 'spa', name: 'Spa', line: 'Hot water, cold air and nothing booked.', href: '/breaks/spa/', image: spa },
  { slug: 'couples', name: 'Couples', line: 'Two days with nobody else’s plans in them.', href: '/breaks/couples/', image: couples },
  { slug: 'cruises', name: 'Cruises', line: 'Midnight at sea, and the washing-up is somebody else’s.', href: '/breaks/cruises/', image: cruises },
];
