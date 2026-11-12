import { breaksHub } from './breaks-hub';
import { couplesBreaks, cruiseBreaks, spaBreaks } from './breaks-kinds';
import { peakDistrictBreaks, scotlandBreaks } from './breaks-regions';
import { chineseNewYear } from './chinese-new-year';
import { edinburgh } from './edinburgh';
import { eventsPage } from './events-page';
import { celebrationsHub, citiesHub, practicalHub, worldHub } from './hubs';
import { london } from './london';
import { londonFireworks } from './london-fireworks';
import { manchester, manchesterFireworks } from './manchester';
import { diwali, hogmanay, islamicNewYear, nowruz, roshHashanah, songkran } from './more-celebrations';
import { birmingham, glasgow, liverpool, newcastle } from './more-cities';
import { sayIt, transport, whatsOpen } from './practical-pages';
import { about, bankHolidays, contact, disclosure, privacy } from './site-pages';
import type { BreaksGuide, CelebrationGuide, CityGuide, EventGuide, PageBase } from './types';

/** City guides, by the city's place in the address: /london/. */
export const cityGuides: Record<string, CityGuide> = { london, manchester, birmingham, liverpool, newcastle, glasgow };

/** Fireworks pages, by city: /london/fireworks/. */
export const fireworksGuides: Record<string, EventGuide> = { london: londonFireworks, manchester: manchesterFireworks };

/** Hogmanay guides, by city: /hogmanay/edinburgh/. */
export const hogmanayGuides: Record<string, CityGuide> = { edinburgh };

/** Breaks guides below the hub, by the last part of the address: /breaks/scotland/. */
export const breakGuides: Record<string, BreaksGuide> = { scotland: scotlandBreaks, 'peak-district': peakDistrictBreaks, spa: spaBreaks, couples: couplesBreaks, cruises: cruiseBreaks };

/** Celebrations, by address: /nowruz/. Each has its own folder under app/, since /hogmanay/ has pages below it. */
export const celebrationGuides = {
  hogmanay,
  'chinese-new-year': chineseNewYear,
  nowruz,
  songkran,
  'islamic-new-year': islamicNewYear,
  'rosh-hashanah': roshHashanah,
  diwali,
} satisfies Record<string, CelebrationGuide>;

/** Every reading page there is. The list of addresses that exist is taken from here. */
export const pages: PageBase[] = [
  ...Object.values(cityGuides),
  ...Object.values(fireworksGuides),
  ...Object.values(hogmanayGuides),
  breaksHub,
  ...Object.values(breakGuides),
  ...Object.values(celebrationGuides),
  citiesHub,
  celebrationsHub,
  practicalHub,
  worldHub,
  eventsPage,
  bankHolidays,
  whatsOpen,
  transport,
  sayIt,
  about,
  contact,
  privacy,
  disclosure,
];
