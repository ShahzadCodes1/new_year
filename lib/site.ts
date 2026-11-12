/** Site-wide facts. Pages, metadata, the sitemap and robots rules all read from here. */
export const site = {
  name: 'newyear.guide',
  /** The initials the placeholder logo shows. */
  shortName: 'NYG',
  /** The picture shown when any page is shared, until pages have sharing pictures of their own. */
  sharingImage: { url: '/og-default.jpg', width: 1200, height: 630, alt: 'The London Eye and Westminster at night, across the Thames' },
  url: 'https://newyear.guide',
  tagline: 'The guide to every New Year on Earth',
  description:
    'How the world celebrates New Year: independent guides to New Year’s Eve city by city, events, breaks and every New Year on the calendar. The UK first.',
  locale: 'en-GB',
  /** The New Year the site is written for. Page titles take their year from here, so the site rolls forward in one change. */
  season: { eve: 2026, newYear: 2027 },
  /** False until launch: search engines are told not to index and the sitemap stays empty. */
  live: false,
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** A link appears in the header and footer only once its page exists. */
  ready: boolean;
}

// The four hubs.
export const nav: NavItem[] = [
  { label: 'Cities', href: '/cities/', ready: true },
  { label: 'Events', href: '/events/', ready: true },
  { label: 'Breaks', href: '/breaks/', ready: true },
  { label: 'Celebrations', href: '/celebrations/', ready: true },
  { label: 'World', href: '/world/', ready: true },
  { label: 'Practical', href: '/practical/', ready: true },
];

// The site's own pages, listed in the footer as they are written.
export const sitePages: NavItem[] = [
  { label: 'About', href: '/about/', ready: true },
  { label: 'Contact', href: '/contact/', ready: true },
  { label: 'Privacy', href: '/privacy/', ready: true },
  { label: 'Affiliate disclosure', href: '/disclosure/', ready: true },
];

export const readyNav = nav.filter((item) => item.ready);
export const footerNav = [...readyNav, ...sitePages.filter((item) => item.ready)];
