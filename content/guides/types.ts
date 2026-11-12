import type { StaticImageData } from 'next/image';

/**
 * The shapes the reading pages are built from. A page is data: a template lays it out.
 *
 * SAMPLE CONTENT. Every page in this folder carries `sample: true`. Its names, prices, times and places are
 * realistic stand-ins written to exercise the templates, not facts: none has been checked, and several are
 * invented. They are replaced when the content is managed from the backend. Until then the site stays
 * unindexed (`site.live` in lib/site.ts). The dates on the home page are a different matter: those are
 * verified, and say so in their own files.
 */
export interface Crumb {
  label: string;
  href?: string;
}

export interface Fact {
  label: string;
  value: string;
}

/** Something recommended: an experience, a place to stay, a spot to stand, a kind of break. */
export interface Pick {
  /** What sort of thing it is, in a word or two. */
  kind?: string;
  name: string;
  text: string;
  /** The line at the foot of the card: usually a price, sometimes a place. */
  price?: string;
  note?: string;
  href?: string;
  image?: StaticImageData;
  /** The language of `name`, when it is not English (a BCP 47 tag), so it is read aloud as itself. */
  lang?: string;
}

export interface Question {
  q: string;
  a: string;
}

export interface PageBase {
  /** Where the page lives, with slashes: '/london/'. */
  path: string;
  /** The page's heading. */
  title: string;
  /** For the browser tab and search results. */
  metaTitle: string;
  description: string;
  /** The verdict or standfirst: one or two sentences under the heading. */
  standfirst: string;
  /** The trail from the home page down to this page's parent. */
  crumbs: Crumb[];
  /** The day the page was last checked, as YYYY-MM-DD. */
  checked: string;
  sample: true;
  image?: StaticImageData;
  /** A handful of facts shown on the card in front of the picture. */
  keyFacts?: Fact[];
}

export interface Passage {
  body: string[];
  facts?: Fact[];
}

/** A headed set of cards: one block of a hub, or an extra block of an answer page. */
export interface Group {
  /** The block's id on the page, for links to it. */
  id: string;
  title: string;
  lede?: string;
  picks: Pick[];
}

export interface Picks {
  lede?: string;
  picks: Pick[];
}

/** The city guide: the plan's seven blocks, in its order. */
export interface CityGuide extends PageBase {
  moment: Passage;
  ways: Picks;
  stay: Picks;
  logistics: Passage;
  faq: Question[];
}

/** An event or experience: fireworks, a street party. */
export interface EventGuide extends PageBase {
  what: Passage;
  watch: Picks;
  tickets: Passage;
  logistics: Passage;
  faq: Question[];
}

/** A breaks roundup: the hub, a region, a kind of break. */
export interface BreaksGuide extends PageBase {
  picks: Picks;
  choose: { heading: string; text: string }[];
  booking: Passage;
  faq: Question[];
}

/** A celebration: Lunar New Year, Hogmanay, Nowruz. */
export interface CelebrationGuide extends PageBase {
  what: Passage;
  marked: Picks;
  where: Picks;
  traditions: { heading: string; text: string }[];
  faq: Question[];
}

/** A practical answer: the answer first, then the detail and where it comes from. */
export interface AnswerPage extends PageBase {
  answer: string;
  detail: Passage;
  /** Further blocks of cards: place by place, city by city. */
  groups?: Group[];
  /** Where the facts come from. Left out only where the page states no fact that needs one. */
  source?: { label: string; href: string };
  related: { label: string; text: string; href: string }[];
}

/** A hub: the pages below it, in headed sets of cards. */
export interface HubPage extends PageBase {
  groups: Group[];
}

/** A site page: about, contact, privacy, disclosure. */
export interface ProsePage extends PageBase {
  sections: { heading: string; body: string[] }[];
}
