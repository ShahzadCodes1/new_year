import type { StaticImageData } from 'next/image';
import diwali from '@/assets/celebrations/diwali.jpg';
import hogmanay from '@/assets/celebrations/hogmanay.jpg';
import islamicNewYear from '@/assets/celebrations/islamic-new-year.jpg';
import lunarNewYear from '@/assets/celebrations/lunar-new-year.jpg';
import nowruz from '@/assets/celebrations/nowruz.jpg';
import roshHashanah from '@/assets/celebrations/rosh-hashanah.jpg';
import songkran from '@/assets/celebrations/songkran.jpg';

/**
 * The New Years the home page turns through, in the order they come round after 31 December.
 *
 * DATES. A celebration on the same days every year has `annual`. One that moves has `dates`: every
 * occurrence that has been checked, soonest first, each with where it was checked and when. The page shows
 * the first one that has not passed. To roll a celebration forward, add its next occurrence here with its
 * source; never guess one. When every listed occurrence has passed, the page shows no date at all rather
 * than a stale one.
 *
 * The photographs illustrate each celebration with its own objects and light. None shows a real event.
 */
export interface Occurrence {
  /** The last day this occurrence is still current (ISO date). After it, the next one is shown. */
  until: string;
  /** The date as the page words it. */
  when: string;
  /** A caveat a reader should see beside the date. */
  note?: string;
  /** Where the date was checked, and when. */
  source: string;
  checked: string;
}

export interface Celebration {
  slug: string;
  name: string;
  /** One sentence on what it is. */
  line: string;
  /** Its hub page. Left out by the page until the address exists. */
  href?: string;
  image: StaticImageData;
  /** The same days every year, as the page words them. */
  annual?: string;
  dates?: Occurrence[];
}

export const celebrations: Celebration[] = [
  {
    slug: 'hogmanay',
    name: 'Hogmanay',
    line: 'Scotland’s New Year: torchlight, street parties and the bells at midnight.',
    href: '/hogmanay/',
    image: hogmanay,
    annual: '31 December',
  },
  {
    slug: 'lunar-new-year',
    name: 'Lunar New Year',
    line: 'The largest New Year of all, kept for fifteen days and ended with lanterns.',
    href: '/chinese-new-year/',
    image: lunarNewYear,
    dates: [
      { until: '2027-02-06', when: 'Saturday 6 February 2027', source: 'https://publicholidays.com/lunar-new-year/', checked: '2026-11-11' },
      { until: '2028-01-26', when: 'Wednesday 26 January 2028', source: 'https://publicholidays.com/lunar-new-year/', checked: '2026-11-11' },
    ],
  },
  {
    slug: 'nowruz',
    name: 'Nowruz',
    line: 'The Persian New Year arrives with the spring equinox, at a table set with seven symbolic things.',
    href: '/nowruz/',
    image: nowruz,
    dates: [{ until: '2027-03-20', when: 'Saturday 20 March 2027', source: 'https://days.to/when-is/nowruz/2027', checked: '2026-11-11' }],
  },
  {
    slug: 'songkran',
    name: 'Songkran',
    line: 'Thailand’s traditional New Year: water poured over the hands of elders as a blessing, and thrown in the streets for joy.',
    href: '/songkran/',
    image: songkran,
    annual: '13 to 15 April',
  },
  {
    slug: 'islamic-new-year',
    name: 'Islamic New Year',
    line: 'The first day of Muharram: a quiet beginning, marked with reflection rather than fireworks.',
    href: '/islamic-new-year/',
    image: islamicNewYear,
    dates: [
      {
        until: '2027-06-07',
        when: 'Around Sunday 6 June 2027',
        note: 'The day depends on the new moon being sighted.',
        source: 'https://www.officeholidays.com/amp/holidays/islamic-new-year',
        checked: '2026-11-11',
      },
    ],
  },
  {
    slug: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    line: 'The Jewish New Year: apples dipped in honey for a sweet year, and the sound of the shofar.',
    href: '/rosh-hashanah/',
    image: roshHashanah,
    dates: [{ until: '2027-10-03', when: 'From sunset on Friday 1 October 2027', source: 'https://hebcal.com/h/rosh-hashana-2027', checked: '2026-11-11' }],
  },
  {
    slug: 'diwali',
    name: 'Diwali',
    line: 'The festival of lights. For many Gujarati and Jain families, the new year begins the morning after.',
    href: '/diwali/',
    image: diwali,
    dates: [
      {
        until: '2027-10-29',
        when: 'Friday 29 October 2027',
        note: 'Some UK calendars mark it a day earlier.',
        source: 'https://www.drikpanchang.com/hindu-festivals/diwali/diwali.html',
        checked: '2026-11-11',
      },
    ],
  },
];
