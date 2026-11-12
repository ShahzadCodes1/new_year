import type { AnswerPage, ProsePage } from './types';

/**
 * The bank holiday dates below are verified against GOV.UK (checked 11 November 2026) and are not sample
 * content. The related links are stand-ins like the rest: see types.ts.
 */
export const bankHolidays: AnswerPage = {
  path: '/bank-holidays/',
  title: 'Is New Year’s Day a bank holiday?',
  metaTitle: 'Is New Year’s Day 2027 a bank holiday? Christmas and New Year dates',
  description: 'The Christmas and New Year bank holidays for England, Wales, Scotland and Northern Ireland, with the days that move and why.',
  standfirst: 'Yes, everywhere in the UK. Scotland has a second day as well, and New Year’s Eve is not one.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Practical', href: '/practical/' },
  ],
  checked: '2026-11-11',
  sample: true,
  answer: 'Yes. Friday 1 January 2027 is a bank holiday across the UK, and Scotland has Monday 4 January as well.',
  detail: {
    body: [
      'New Year’s Day is a bank holiday in England, Wales, Scotland and Northern Ireland. When it falls on a weekend the holiday moves to the next weekday; in 2027 it falls on a Friday, so nothing moves.',
      'Scotland also has 2 January. In 2027 that is a Saturday, so the holiday is taken on Monday 4 January instead.',
      'New Year’s Eve is an ordinary working day in every part of the UK, though many shops, banks and offices close early.',
    ],
    facts: [
      { label: 'Christmas Day', value: 'Friday 25 December 2026' },
      { label: 'Boxing Day (moved)', value: 'Monday 28 December 2026' },
      { label: 'New Year’s Day', value: 'Friday 1 January 2027' },
      { label: '2 January (Scotland, moved)', value: 'Monday 4 January 2027' },
    ],
  },
  source: { label: 'UK bank holidays, GOV.UK', href: 'https://www.gov.uk/bank-holidays' },
  related: [
    { label: 'What is open on New Year’s Day?', text: 'Shops, pharmacies, banks and pubs on the first.', href: '/whats-open/' },
    { label: 'New Year breaks', text: 'Four days off in a row, in Scotland. What to do with them.', href: '/breaks/' },
    { label: 'New Year’s Eve in London', text: 'Where to be at midnight, and how to get home.', href: '/london/' },
  ],
};

/** SAMPLE CONTENT: see types.ts. The publisher's details are to come. */
export const about: ProsePage = {
  path: '/about/',
  title: 'About newyear.guide',
  metaTitle: 'About newyear.guide',
  description: 'What newyear.guide is, how its guides are written and checked, and how to tell us when something is wrong.',
  standfirst: 'One guide to every New Year: the night itself, the days around it, and the New Years that fall on other dates.',
  crumbs: [{ label: 'Home', href: '/' }],
  checked: '2026-11-11',
  sample: true,
  sections: [
    {
      heading: 'What this is',
      body: [
        'newyear.guide is an independent guide to New Year in the UK: where to be at midnight in each city, where to go for a few days around it, and what is open, running and closed while you are there.',
        'It also covers the New Years that are not on 31 December. Lunar New Year, Nowruz, Rosh Hashanah, Diwali and others are kept by millions of people in Britain, and each has its own page.',
      ],
    },
    {
      heading: 'How the guides are written',
      body: [
        'Every guide is written from scratch and gives a view: what is worth the money, what is not, and who each option suits. Nothing is copied from a press release.',
        'Dates, times and prices are taken from the organiser or an official source and carry the day they were last checked. When a fact cannot be confirmed, the guide says so instead of guessing.',
      ],
    },
    {
      heading: 'How it pays for itself',
      body: [
        'Some links to hotels, tickets and experiences earn the site a commission if you book through them, at no cost to you. Those links are marked, and a commission never decides what is recommended.',
      ],
    },
    {
      heading: 'When something is wrong',
      body: ['Programmes change and so do prices. If you find a mistake, tell us and it will be corrected, with the date of the correction shown on the page.'],
    },
  ],
};

/** SAMPLE CONTENT: see types.ts. The address and response times are stand-ins until the publisher's details arrive. */
export const contact: ProsePage = {
  path: '/contact/',
  title: 'Contact',
  metaTitle: 'Contact newyear.guide',
  description: 'How to reach newyear.guide: corrections, suggestions, and questions from venues, organisers and the press.',
  standfirst: 'Corrections first, everything else after. If something on the site is wrong, that is the message we most want to get.',
  crumbs: [{ label: 'Home', href: '/' }],
  checked: '2026-11-11',
  sample: true,
  sections: [
    {
      heading: 'Corrections',
      body: [
        'Tell us the page, what is wrong and, if you can, where the right information is published. Write to corrections@newyear.guide.',
        'Corrections are checked against the organiser or an official source and made within two working days. The page shows the date it was last checked.',
      ],
    },
    {
      heading: 'Venues and organisers',
      body: [
        'If you run an event or a place to stay and your details have changed, write to listings@newyear.guide with a link to where the new details are published.',
        'Being listed is free and cannot be bought. We do not accept payment for inclusion or for a better place on a page.',
      ],
    },
    {
      heading: 'Everything else',
      body: ['For suggestions, questions from the press and anything not covered above, write to hello@newyear.guide. We read everything and answer what we can.'],
    },
  ],
};

/** SAMPLE CONTENT: see types.ts. A real policy must describe what the launched site actually collects. */
export const privacy: ProsePage = {
  path: '/privacy/',
  title: 'Privacy',
  metaTitle: 'Privacy at newyear.guide',
  description: 'What newyear.guide collects when you visit, why, how long it is kept, and how to ask for it to be removed.',
  standfirst: 'The short version: you can read every page without telling us who you are, and we keep as little as we can.',
  crumbs: [{ label: 'Home', href: '/' }],
  checked: '2026-11-11',
  sample: true,
  sections: [
    {
      heading: 'What is collected when you visit',
      body: [
        'Reading the site needs no account and no sign-in. We count visits to each page so we know which guides are used; the counts are not tied to you and do not follow you to other sites.',
        'Your browser sends some technical details with every request, such as its type and the size of your screen. They are used to send you a page that fits, and are not kept.',
      ],
    },
    {
      heading: 'Cookies',
      body: [
        'The site sets no advertising cookies. If you follow a link to a booking site, that site may set cookies of its own under its own policy.',
        'A small amount of information is stored in your browser to remember choices you make here, such as reduced motion. It never leaves your device.',
      ],
    },
    {
      heading: 'If you write to us',
      body: ['We keep your message and address for as long as it takes to deal with it, and for a year afterwards in case of a follow-up. We do not add you to any list.'],
    },
    {
      heading: 'Your rights',
      body: ['You can ask what we hold about you, ask for it to be corrected or deleted, and complain to the Information Commissioner’s Office if you are unhappy with the answer. Write to privacy@newyear.guide.'],
    },
  ],
};

/** SAMPLE CONTENT: see types.ts. The real page must name the affiliate programmes the launched site belongs to. */
export const disclosure: ProsePage = {
  path: '/disclosure/',
  title: 'Affiliate disclosure',
  metaTitle: 'Affiliate disclosure',
  description: 'How newyear.guide earns money from some of its links, which links those are, and what that does and does not change.',
  standfirst: 'Some links earn us a commission. None of them decides what we recommend.',
  crumbs: [{ label: 'Home', href: '/' }],
  checked: '2026-11-11',
  sample: true,
  sections: [
    {
      heading: 'How it works',
      body: [
        'Some links to hotels, tickets and experiences are affiliate links. If you book after following one, the company you book with pays us a small share of what you spend. You pay the same price either way.',
        'These links are how the site pays for itself. There is no charge to read it and no advertising between the paragraphs.',
      ],
    },
    {
      heading: 'What it does not change',
      body: [
        'A recommendation is made before anyone checks whether it can earn a commission. Places with no affiliate link are recommended alongside places with one, and nobody can pay to be included or to be placed higher.',
        'If we would not send a friend there, it is not on the page.',
      ],
    },
    {
      heading: 'How to tell',
      body: ['Pages that contain affiliate links say so near the top. Where a single link in a paragraph is an affiliate link, it is marked.'],
    },
  ],
};
