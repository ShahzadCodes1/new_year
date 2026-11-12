/**
 * The short answers on the home page. Each one is stated outright, then leads to the page that has the
 * detail and its sources.
 *
 * Two kinds of answer live here, and they are kept apart on purpose:
 * - A FACT WITH A DATE (`dated`) is checked against an official source, recorded with that source and the
 *   day it was checked, and replaced by the next one once `until` has passed. Never add one without a source.
 * - A CHARACTERISATION (`answer` + `detail`) says how things generally go and names no hour, price or
 *   operator. Anything specific belongs on the linked page, with its source.
 */
export interface DatedAnswer {
  /** The last day this answer is still the current one (ISO date). */
  until: string;
  answer: string;
  detail: string;
  source: string;
  checked: string;
}

export interface Greeting {
  language: string;
  /** BCP 47 language tag, so the phrase is pronounced and hyphenated as its own language. */
  lang: string;
  phrase: string;
}

export interface Practical {
  slug: string;
  question: string;
  /** The answer in a word or two, then the sentence that qualifies it. */
  answer?: string;
  detail?: string;
  dated?: DatedAnswer[];
  greetings?: Greeting[];
  /** Left out by the page until the address exists. */
  link?: { label: string; href: string };
}

export const practical: Practical[] = [
  {
    slug: 'bank-holiday',
    question: 'Is New Year’s Day a bank holiday?',
    dated: [
      {
        until: '2027-01-04',
        answer: 'Yes.',
        detail:
          'Friday 1 January 2027 is a bank holiday across the UK. Scotland has Monday 4 January as well, because 2 January falls on a Saturday. New Year’s Eve is not a bank holiday anywhere.',
        source: 'https://www.gov.uk/bank-holidays',
        checked: '2026-11-11',
      },
      {
        until: '2028-01-04',
        answer: 'Yes.',
        detail:
          'New Year’s Day 2028 falls on a Saturday, so the bank holiday moves to Monday 3 January across the UK. Scotland has Tuesday 4 January as well. New Year’s Eve is not a bank holiday anywhere.',
        source: 'https://www.gov.uk/bank-holidays',
        checked: '2026-11-11',
      },
    ],
    link: { label: 'All the bank holiday dates', href: '/bank-holidays/' },
  },
  {
    slug: 'whats-open',
    question: 'What is open on New Year’s Day?',
    answer: 'Less than usual.',
    detail: 'Most large supermarkets open for shorter hours, some chains stay shut all day, and it varies branch by branch.',
    link: { label: 'Opening times, shop by shop', href: '/whats-open/' },
  },
  {
    slug: 'getting-home',
    question: 'How do I get home after midnight?',
    answer: 'Decide before you go out.',
    detail:
      'Many train services finish earlier than usual on New Year’s Eve, night buses and trams differ from city to city, and taxis are scarce and cost more after midnight.',
    link: { label: 'Getting home, city by city', href: '/transport/' },
  },
  {
    slug: 'say-it',
    question: 'How do you say Happy New Year?',
    greetings: [
      { language: 'Welsh', lang: 'cy', phrase: 'Blwyddyn Newydd Dda' },
      { language: 'Scottish Gaelic', lang: 'gd', phrase: 'Bliadhna Mhath Ùr' },
      { language: 'Irish', lang: 'ga', phrase: 'Athbhliain faoi mhaise duit' },
    ],
    link: { label: 'Say it in other languages', href: '/say-it/' },
  },
];
