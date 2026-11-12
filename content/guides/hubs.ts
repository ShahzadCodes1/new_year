import dawn from '@/assets/source/countryside-dawn-higgsfield.jpg';
import fireworks from '@/assets/ways/fireworks.jpg';
import { celebrations } from '@/content/celebrations';
import { cities } from '@/content/cities';
import { midnightInUkTime, places, regions } from '@/content/world';
import { site } from '@/lib/site';
import { edinburgh } from './edinburgh';
import { london } from './london';
import { manchester } from './manchester';
import { birmingham, glasgow, liverpool, newcastle } from './more-cities';
import type { CityGuide, HubPage } from './types';

const home = [{ label: 'Home', href: '/' }];
const checked = '2026-11-11';

/**
 * The three hubs. Each lists the pages below it, and takes their names and lines from the same files the
 * home page reads (content/cities.ts, content/celebrations.ts), so a city or a celebration is described in
 * one place only.
 *
 * SAMPLE CONTENT: see types.ts. The lines written here are stand-ins like the rest.
 */
const cityGuide: Record<string, CityGuide> = { london, manchester, birmingham, liverpool, newcastle, glasgow, edinburgh };

export const citiesHub: HubPage = {
  path: '/cities/',
  title: 'New Year’s Eve, city by city',
  metaTitle: `New Year’s Eve ${site.season.eve}, city by city: where to be at midnight`,
  description: 'New Year’s Eve city by city, starting with the UK: London, Manchester, Birmingham, Liverpool, Newcastle, Glasgow and Edinburgh, and where midnight happens.',
  standfirst: 'Seven cities to begin with, all in the UK, and seven different nights. Decide what kind of midnight you want first, then pick the city that does it best.',
  crumbs: home,
  checked,
  sample: true,
  image: fireworks,
  keyFacts: [
    { label: 'Biggest display', value: 'London' },
    { label: 'Best night out', value: 'Manchester' },
    { label: 'On the water', value: 'Liverpool and Newcastle' },
    { label: 'Hogmanay', value: 'Edinburgh and Glasgow' },
  ],
  groups: [
    // One group for each country, in the order the countries first appear.
    ...[...new Set(cities.map((city) => city.country))].map((country, i) => ({
      id: i === 0 ? 'cities' : `cities-${country.toLowerCase().replace(/[^a-z]+/g, '-')}`,
      title: country,
      lede: country === 'United Kingdom' ? 'South to north, ending on Hogmanay.' : undefined,
      picks: cities
        .filter((city) => city.country === country)
        .map((city) => ({
          name: city.name,
          text: `${city.verdict} ${city.moment}`,
          href: cityGuide[city.slug].path,
          image: cityGuide[city.slug].image,
        })),
    })),
    {
      id: 'displays',
      title: 'The displays',
      lede: 'Three worth planning the night around.',
      picks: [
        { kind: 'London', name: 'Fireworks over the Thames', text: 'Where to stand, what a ticket gets you and how to see it without one.', href: '/london/fireworks/' },
        { kind: 'Manchester', name: 'Fireworks in the squares', text: 'A shorter display, a much easier crowd and a tram home.', href: '/manchester/fireworks/' },
        { kind: 'Edinburgh', name: 'Fireworks from the castle', text: 'The end of the street party, seen from the gardens or from a hill.', href: '/hogmanay/edinburgh/' },
      ],
    },
    {
      id: 'more',
      title: 'Before you choose',
      picks: [
        { name: 'Getting home after midnight', text: 'Last trains, trams and night buses, city by city.', href: '/transport/' },
        { name: 'Hogmanay', text: 'What makes New Year in Scotland a different thing.', href: '/hogmanay/' },
        { name: 'New Year breaks', text: 'If the answer is no city at all.', href: '/breaks/' },
        { name: 'New Year around the world', text: 'Where midnight falls, from the first place on Earth to the last.', href: '/world/' },
      ],
    },
  ],
};

/** When each celebration comes round, in words that stay true every year. */
const season: Record<string, string> = {
  hogmanay: '31 December',
  'lunar-new-year': 'January or February',
  nowruz: 'The spring equinox',
  songkran: '13 to 15 April',
  'islamic-new-year': 'Moves through the year',
  'rosh-hashanah': 'September or October',
  diwali: 'October or November',
};

export const celebrationsHub: HubPage = {
  path: '/celebrations/',
  title: 'New Year celebrations',
  metaTitle: 'New Year celebrations through the year, and how they are kept in the UK',
  description: 'Seven New Years kept in Britain: Hogmanay, Lunar New Year, Nowruz, Songkran, Islamic New Year, Rosh Hashanah and Diwali, with when each falls.',
  standfirst: 'The year has more than one beginning. Seven of them are kept in Britain, each with its own date, its own table and its own way of wishing you well.',
  crumbs: home,
  checked,
  sample: true,
  image: dawn,
  keyFacts: [
    { label: 'On this site', value: 'Seven New Years' },
    { label: 'The largest', value: 'Lunar New Year' },
    { label: 'By the moon', value: 'Four of them' },
    { label: 'By the sun', value: 'Nowruz and Songkran' },
  ],
  groups: [
    {
      id: 'year',
      title: 'Through the year',
      lede: 'In the order they come round after 31 December.',
      picks: celebrations.map((c) => ({ kind: season[c.slug], name: c.name, text: c.line, href: c.href, image: c.image })),
    },
    {
      id: 'greetings',
      title: 'Wish someone well',
      picks: [
        { name: 'How do you say Happy New Year?', text: 'Sixteen greetings, from Welsh to Gujarati, and when to use each.', href: '/say-it/' },
        { name: 'New Year’s Eve, city by city', text: 'The one on 31 December, in seven cities.', href: '/cities/' },
      ],
    },
  ],
};

export const practicalHub: HubPage = {
  path: '/practical/',
  title: 'The useful bits',
  metaTitle: `New Year ${site.season.newYear}: bank holidays, what is open and getting home`,
  description: 'Short answers for New Year in the UK: whether it is a bank holiday, what is open on New Year’s Day, getting home after midnight and how to say it.',
  standfirst: 'Short answers to the questions everybody asks in the last week of December, each with the detail behind it.',
  crumbs: home,
  checked,
  sample: true,
  groups: [
    {
      id: 'answers',
      title: 'The short answers',
      picks: [
        { kind: 'Yes', name: 'Is New Year’s Day a bank holiday?', text: 'Everywhere in the UK, and Scotland has a second day. The dates, and the days that move.', href: '/bank-holidays/' },
        { kind: 'Less than usual', name: 'What is open on New Year’s Day?', text: 'Supermarkets, pharmacies, banks, pubs and attractions, place by place.', href: '/whats-open/' },
        { kind: 'Decide before you go out', name: 'How do I get home after midnight?', text: 'Last trains, trams, night buses and taxis, city by city.', href: '/transport/' },
        { kind: 'Blwyddyn Newydd Dda', name: 'How do you say Happy New Year?', text: 'In Welsh, Gaelic and Irish, across Europe, and at other New Years.', href: '/say-it/' },
      ],
    },
    {
      id: 'plan',
      title: 'Planning the night',
      picks: [
        { name: 'New Year’s Eve, city by city', text: 'Seven cities, and where midnight happens in each.', href: '/cities/' },
        { name: 'New Year breaks', text: 'Scotland, the Peak District, spa stays, breaks for two and cruises.', href: '/breaks/' },
        { name: 'New Year celebrations', text: 'The New Years that fall on other dates.', href: '/celebrations/' },
      ],
    },
  ],
};

/**
 * The world: where midnight falls, region by region. Built from content/world.ts, which says what in it is
 * checked. A place is a link once its guide exists.
 */
export const worldHub: HubPage = {
  path: '/world/',
  title: 'New Year around the world',
  metaTitle: 'New Year around the world: from the first midnight to the last',
  description: 'How the world celebrates New Year, in the order midnight arrives: from Kiritimati in the Pacific to American Samoa twenty-five hours later.',
  standfirst: 'Midnight takes twenty-five hours to cross the inhabited world. It starts on a Pacific island at ten in the morning, UK time, and ends on another the next day.',
  crumbs: home,
  checked: '2026-11-12',
  sample: true,
  groups: [
    ...regions.map((region) => ({
      id: region.id,
      title: region.title,
      lede: region.lede,
      picks: places
        .filter((place) => place.region === region.id)
        .map((place) => ({ kind: midnightInUkTime(place.offset), name: place.name, text: place.line, note: place.country, href: place.href })),
    })),
    {
      id: 'uk',
      title: 'Start with the UK',
      lede: 'The first country with full guides. Others follow.',
      picks: [
        { name: 'New Year’s Eve, city by city', text: 'Seven cities, and where midnight happens in each.', href: '/cities/' },
        { name: 'New Year’s Eve events', text: 'Ticketed events in London and ten other cities, each checked at its source.', href: '/events/' },
        { name: 'New Year celebrations', text: 'The New Years that fall on other dates, and how each is kept.', href: '/celebrations/' },
        { name: 'New Year breaks', text: 'A few days around the night, in the UK and at sea.', href: '/breaks/' },
      ],
    },
  ],
};
