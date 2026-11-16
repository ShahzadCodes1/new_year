# newyear.guide: four-pillar SEO audit

Audited 16 November 2026, before any optimisation. Nothing in the site's code has been changed.

**How it was checked.** The repository (GitHub `main`, commit `00549c9`), the live Vercel deployment
(`new-year-ruby-one.vercel.app`, crawled page by page: 36 pages), and the `newyear.guide` domain itself.
Each finding below was observed, not assumed. Where something could not be checked, it says so.

---

## Decisions that frame the sprint (confirmed 16 November)

- **The site stays on Vercel and unindexed until the CTO approves launch.** No domain, DNS or indexing
  changes: `newyear.guide` keeps its GoDaddy "Launching Soon" page, and the site keeps `noindex` and
  its blocking `robots.txt`. Canonical, sitemap and sharing tags already point to
  `https://newyear.guide/...`, which is right for launch day and harmless while nothing is indexed.
  **Consequence for Semrush:** reports for `newyear.guide` describe the holding page, so our own
  ranking and backlink data will be near zero. Competitor and keyword data drive the sprint.
- **UK first.** The approved home heading is "Your guide to New Year's Eve across the UK"; international
  celebrations stay as secondary content. That heading is live on Vercel but **not yet in GitHub**
  (`main` still has "The guide to every New Year on Earth"). I compared every live page with the
  repository: this heading is the only difference, so the next deployment from GitHub would undo it
  unless the change is pushed or made in the repository too.
- **34 of the 36 pages are sample content** (flagged `sample: true` in the code): realistic but
  invented venues, prices and times. Optimising invented copy does not build lasting visibility, and
  publishing it would break the project's rule against unsupported claims. The verified exceptions
  are the events directory (`/events/`, 78 real events), the bank-holiday dates and each celebration's
  date.

---

## Pillar 1: Keyword research

**Done correctly**
- One page per search intent, in clusters with hubs: cities, fireworks, Hogmanay, events, breaks,
  celebrations, practical answers, world.
- Addresses carry no year (`/london/`, not `/london-2026/`), so pages keep their history year to year;
  the year sits in titles and changes in one setting (`site.season`).
- Titles lead with a topic phrase: "New Year's Eve in London 2026: where to be at midnight",
  "Edinburgh's Hogmanay 2026: …", "Is New Year's Day 2027 a bank holiday? …".

**Missing**
- No measured keyword data of any kind: no UK volumes, difficulty, intent, seasonality or SERP
  competitors. The keyword map in the earlier report is a proposal, not evidence.
- No record in the code of which phrase each page targets, so nothing keeps titles, headings and
  copy aligned with a target.

**Needs improvement**
- 29 of 36 titles run past 70 characters once " · newyear.guide" is added; Google truncates titles to
  the screen width. Examples: `/hogmanay/edinburgh/` (92), `/transport/` (96), `/diwali/` (98).
- Section headings are template labels with no search words: "The midnight moment", "Ways to spend
  the night", "Picks by type", "What it is, and when". The same h2s repeat on all five city guides.
- The approved UK heading is live but missing from the repository (see the decisions above).

**Pages with problems:** every page with a title over 70 characters (29), and the five city guides,
the two fireworks pages and seven celebration pages for generic h2s.

**Missed opportunities (to be confirmed by data, not assumed)**
- A UK-wide fireworks page: only London and Manchester have one.
- City pages where the events directory already has real events but no guide exists: Leeds,
  Bristol, Cardiff, Belfast.
- Events by city as their own pages (`new year's eve events manchester` and similar): today one
  filtered page (`/events/`) serves every city.

---

## Pillar 2: Backlinks and off-page SEO

**Done correctly**
- The site has genuine linkable assets: the events directory with sources and check dates, the
  `/world/` midnight timeline, the bank-holiday answer, the celebration date pages, and the
  `/say-it/` greetings page.
- The affiliate disclosure page and the "nobody can pay to be listed" policy are already written,
  which outreach to venues will need.

**Missing**
- No backlink strategy, outreach list or partner list anywhere in the project.
- No social profiles; the `Organization` structured data has no `sameAs` links.
- The contact addresses (`corrections@`, `listings@`, `hello@newyear.guide`) are placeholders in
  sample content; outreach needs real, monitored addresses.
- Until launch, links earned to `newyear.guide` land on the holding page; outreach should wait for
  launch approval, but the prospect list can be built now.

**Needs improvement / cannot assess yet**
- The domain's backlink profile is unknown. It has existed since at least 2025 and may carry links
  from a previous owner; Semrush Backlink Analytics will show this (checklist B1).

**Missed opportunities**
- 78 real events from named organisers and venues: each is a natural outreach contact ("you are
  listed, with a link to your booking page").
- Official and community sources the site already cites (Mayor of London, Edinburgh's Hogmanay
  organiser, Chinatown associations, temples and cultural centres) are relevant link sources.

---

## Pillar 3: Search intent and content

**Done correctly**
- Templates lead with the answer or verdict, then detail, then "Questions people ask".
- The events directory matches transactional intent: price, times, age limit, booking link and source
  on every card.
- Every page shows when it was last checked; every event shows its source.
- Little duplicated text: only two template sentences repeat across three or more pages
  ("Five kinds of night. Pick the one that sounds like yours." on five pages).

**Missing**
- Real content on 34 pages (see the top of this document).
- The city guides do not link to the events directory, and the directory does not link back to the
  city guides. `/events/` receives one in-content link (from `/world/`) plus the menu. This is the
  site's only page of real listings, and it is cut off from the pages most likely to rank for
  "new year's eve [city]".

**Needs improvement**
- Thin pages: practical hub (164 words), contact (153), disclosure (167), bank holidays (225),
  celebrations hub (258), about (271). The bank-holiday page is a quick answer and can stay short;
  the hubs need a few sentences of real guidance.
- City guides run 510 to 640 words with five invented picks. Whether that matches what ranks for
  "new year's eve london" (live results lean to long listings: DesignMyNight, Visit London, Time Out)
  needs the SERP data in the checklist.
- `/events/` is 9,700 words in one page; it serves "events" searches broadly but no single city's.

**International coverage (secondary):** seven celebration pages with verified dates and a UK angle,
plus `/world/` (20 places, midnight times computed). Structure is ready; demand is unmeasured.

---

## Pillar 4: Technical SEO

**Done correctly**
- Every route is prerendered static HTML (48 routes); text is readable without JavaScript.
- Each page: one `h1`, a unique title and description, a self-referencing canonical, `en-GB`
  language, Open Graph and large-image card tags with a default sharing picture.
- `robots.txt` and `sitemap.xml` are generated from one launch switch (`site.live`); the sitemap lists
  every built page once the switch is on; the style guide stays excluded.
- Structured data: `Organization` + `WebSite` (home), `BreadcrumbList` (every reading page),
  `ItemList` of 78 `Event` items with place and offer (`/events/`).
- Real 404 status for unknown addresses; HTTPS with HSTS (`max-age=63072000; preload`) on Vercel;
  security headers; images through Next.js image optimisation (AVIF/WebP, lazy below the fold).
- All pages pass at six widths from 320 to 1920px; automated WCAG 2.2 A/AA audit passes.

**Missing**
- Domain connection: deliberately on hold until launch approval.
- Google Search Console and analytics: none set up. Search Console needs the live domain, so it waits
  for launch; until then there is no data on impressions, indexing or real-visitor Core Web Vitals.
- Image descriptions: every photograph has empty `alt` (the home page alone has 41 images). Correct for
  decoration, but photographs of real places are missed in image search.

**Needs improvement**
- Event markup lacks Google's recommended fields: time of day in `startDate`, `endDate`, `image`,
  `organizer`. Addresses carry city and country only.
- No `dateModified` in markup, although each page shows its checked date.
- One sharing image for every page.
- Home page speed: last measured before the opening-screen cap (largest paint 4.7 s desktop, 9.7 s on
  an emulated phone). It needs re-measuring; I can run PageSpeed Insights myself.
- `sitemap.xml` has no `lastmod` (minor; `priority` and `changefreq` are ignored by Google anyway).

**International SEO:** English only, so no `hreflang` is needed. Not a priority until a second
language exists.

---

## What I can already do without Semrush data

Fix title lengths, heading wording, internal links between city guides and events, image
descriptions, event and page structured data, and re-measure performance. What needs your data:
which phrases to target, which new pages are worth building, competitor benchmarks and link
prospects. The checklist in `02-semrush-data-checklist.md` asks for exactly that, once.
