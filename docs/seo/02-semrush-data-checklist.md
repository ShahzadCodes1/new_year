# newyear.guide: the one data checklist

Collect everything below in one go and put the files in one folder (for example `docs/seo/data/`),
named with the item code (`K1-new-years-eve.csv`, `B2-visitlondon.csv` …). Essential items come first;
optional ones only if you have time or the plan allows.

**General settings for every Semrush report**
- **Database:** United Kingdom (`google.co.uk`), unless an item says otherwise.
- **Device:** Desktop is Semrush's default; switch to **Mobile** wherever a switch is offered (most of
  our audience searches on a phone).
- **Date:** the current month (latest data). Do not pick an earlier month: November is when New Year
  searches start rising.
- **Export:** CSV, "All" rows your plan allows. Screenshots only where stated.
- **Menu paths** are from the 2025–26 interface (left menu: SEO → section → tool). If a name has
  moved, type the tool name into Semrush's search bar.
- **Your plan:** tell me if you are on Pro, Guru or Business (question Q1). Topic Research, SEO Content
  Template limits and historical data depend on it; each item notes an alternative.

**Not needed from you** (I already have it or can get it myself): page titles, headings, internal
links, schema, image tags, word counts, robots and sitemap (all read from the code and live site);
PageSpeed Insights and Lighthouse (I can run them on the live Vercel address).

---

## Essential

### Q. Three quick answers (no tools)

Answered already (16 November): the site stays on Vercel and unindexed until launch approval, with
no domain, DNS or indexing changes; and the approved home heading is "Your guide to New Year's Eve
across the UK", UK first with international content as secondary.

| # | Question | Why it matters |
|---|---|---|
| Q1 | Which Semrush plan do you have: Pro, Guru or Business? | Decides which optional tools exist. |
| Q2 | The approved heading is live but not in GitHub. Will you push that change, or shall I make the same one-line change in the repository? | A deployment from GitHub would otherwise undo it. |
| Q3 | Will the 34 sample pages get real content, who will write it, and by when? | Decides whether I optimise copy or only structure. The site stays unindexed either way. |
| Q4 | Do you have real contact addresses, social profiles, a final brand name/logo, joined affiliate programmes, or existing contacts (venues, tourist boards, press)? | Needed for outreach, `Organization` schema and the contact page. |

### K1. Keyword Magic Tool: one export per seed (11 seeds)

- **Pillar:** 1 Keyword research (also feeds 3 Content).
- **Where:** SEO → Keyword Research → **Keyword Magic Tool**. Enter the seed, database UK.
- **Settings:** Match type **Broad match**, "All keywords" tab (not Questions only). Sort by Volume,
  high to low. Keep Semrush's default columns.
- **Seeds and filters:**

  | File | Seed | Filter before exporting |
  |---|---|---|
  | K1-new-years-eve | `new years eve` | Volume ≥ 20 |
  | K1-new-year | `new year` | Volume ≥ 20; **Exclude keywords:** quotes, wishes, messages, images, gif, png, svg, clipart, card, cards, captions, resolution, resolutions, chinese, lunar |
  | K1-nye | `nye` | **Include keywords (any):** london, manchester, edinburgh, glasgow, birmingham, liverpool, newcastle, leeds, bristol, cardiff, belfast, party, parties, events, tickets, fireworks, dinner, cruise, rooftop, uk |
  | K1-hogmanay | `hogmanay` | none |
  | K1-chinese-new-year | `chinese new year` | Volume ≥ 20 |
  | K1-lunar-new-year | `lunar new year` | none |
  | K1-nowruz | `nowruz` | none |
  | K1-songkran | `songkran` | none |
  | K1-diwali | `diwali` | Volume ≥ 20 |
  | K1-rosh-hashanah | `rosh hashanah` | none |
  | K1-islamic-new-year | `islamic new year` | none |

- **Export:** CSV with Keyword, Intent, Volume, **Trend** (the 12 monthly values: this is the
  seasonality data), Keyword Difficulty, CPC, Competitive Density, SERP Features, Number of Results.
- **Why and how I use it:** UK demand, difficulty and intent for every phrase. I choose each page's
  primary and secondary targets from it, spot long-tail phrases and question searches, check
  seasonality from Trend, and decide whether new pages (UK fireworks, more cities, events by city)
  have real demand.
- **If unavailable:** none needed; this tool is on every plan.

### K2. Keyword Overview: SERP Analysis for 8 head terms

- **Pillar:** 1 Keyword research and 3 Search intent (also identifies competitors for 2).
- **Where:** SEO → Keyword Research → **Keyword Overview**. Enter one keyword, database UK. Scroll to
  **SERP Analysis** and click **Export**. Mobile if the switch is offered.
- **Keywords (one export each):**
  1. `new years eve london`
  2. `london new years eve fireworks`
  3. `new years eve events london`
  4. `edinburgh hogmanay`
  5. `new years eve manchester`
  6. `new year breaks uk`
  7. `is new years day a bank holiday`
  8. `chinese new year london`
- **Export:** CSV of the top-10 results: URL, position, Page Authority Score, referring domains,
  backlinks, search traffic, URL keywords. Plus **one screenshot** of the SERP features shown at the
  top of the SERP Analysis block for each keyword (8 screenshots, or one per keyword in a PDF).
- **Why and how I use it:** who actually ranks for each cluster in the UK, what kind of page wins
  (listing, guide, official page, news), how strong those pages are, and which SERP features to aim
  for. This decides the competitor set and the content format for each page type.
- **If unavailable:** none needed.

### K3. Keyword Gap: London New Year's Eve pages

- **Pillar:** 1 Keyword research (competitor gaps) and 3 Content gaps.
- **Where:** SEO → Competitive Research → **Keyword Gap**. Database UK, keyword type **Organic**.
- **Settings:** You: `newyear.guide` (Root domain). Competitors, changing the type dropdown beside each
  field as shown:
  - `visitlondon.com/things-to-do/whats-on/new-years-eve/` (Subfolder)
  - `designmynight.com/london/whats-on/new-years-eve/` (Subfolder)
  - `londonist.com/london/christmas-in-london/things-to-do-in-london-on-new-year-s-eve` (Exact URL)
  - `timeout.com/london/new-year` (Exact URL)

  These four appeared in UK results on 12 November. If your K2 export for `new years eve london` shows
  a stronger page that is not here, swap it in.
- **Export:** the full keyword table ("All keywords", not only Missing) as CSV, with each
  competitor's position, Volume, KD, Intent and CPC.
- **Why and how I use it:** our domain has no rankings, so the "gap" is every keyword these pages win.
  It shows which long-tail London searches each competitor page collects, how many keywords one good
  page ranks for, and what topics our London guide and events page lack.
- **If a subfolder or URL is rejected:** run **Organic Research** (SEO → Competitive Research →
  Organic Research) on each address in URL/Subfolder mode, Positions tab, and export it instead.

### K4. Domain Overview: newyear.guide baseline

- **Pillar:** 1 (organic rankings) and 2 (authority).
- **Where:** SEO → Competitive Research → **Domain Overview**: `newyear.guide`, database UK; then
  switch the database selector to **Worldwide**.
- **Export:** two screenshots (UK and Worldwide) showing Authority Score, organic keywords and traffic,
  referring domains and backlinks.
- **Why:** the starting point for the report, and a check for history from the domain's past. I
  expect near zero because the domain shows a GoDaddy holding page.

### B1. Backlink Analytics: our own domain

- **Pillar:** 2 Backlinks.
- **Where:** SEO → Link Building → **Backlink Analytics**: `newyear.guide`, Root domain.
- **Export:** a screenshot of the **Overview** (Authority Score, referring domains, backlinks,
  follow/nofollow split, new/lost chart for the last 12 months). If referring domains are more than 0,
  also export **Referring Domains** and **Backlinks** tabs (CSV, all).
- **Why:** to know whether the domain carries any links (good or harmful) before launch.

### B2. Backlink Analytics: who links to New Year's Eve pages (5 exports)

- **Pillar:** 2 Backlinks (link prospects) and 3 (what earns links).
- **Where:** SEO → Link Building → **Backlink Analytics**, choosing the **URL** or **Subfolder** type in
  the dropdown. Run for:
  1. `visitlondon.com/things-to-do/whats-on/new-years-eve/` (Subfolder)
  2. `londonist.com/london/christmas-in-london/things-to-do-in-london-on-new-year-s-eve` (URL)
  3. `timeout.com/london/new-year` (URL)
  4. `designmynight.com/london/whats-on/new-years-eve/` (Subfolder)
  5. `edwinterfest.com/hogmanay/` (Subfolder)
- **Export:** **Referring Domains** tab, CSV, all rows: domain, Authority Score, backlinks, follow or
  nofollow, first seen, last seen.
- **Why and how I use it:** the sites that have already linked to a New Year guide are the warmest
  prospects (local media, tourism, event listings, universities). I will sort them into outreach
  groups by relevance and authority.

### B3. Backlink Gap: shared link sources

- **Pillar:** 2 Backlinks.
- **Where:** SEO → Competitive Research (or Link Building) → **Backlink Gap**. You: `newyear.guide`;
  competitors: `londonist.com`, `designmynight.com`, `visitlondon.com`, `edwinterfest.com` (root
  domains).
- **Settings:** Prospects view, **All** tab, then filter **Authority Score ≥ 20**.
- **Export:** CSV, all rows: referring domain, AS, and which competitors it links to.
- **Why:** domains that link to two or more of these sites are realistic targets for a UK New Year and
  events site; B2 is page-specific, this is site-wide.

---

## Optional

### O1. Topic Research (Guru and Business only)
- **Pillar:** 3 Content. **Where:** Content Marketing → **Topic Research**. Database UK.
- **Topics:** `new years eve london`, `hogmanay`, `new year breaks`. **Export:** the topic cards as
  XLSX, including Headlines and Questions.
- **Why:** subtopics and questions to fill gaps in existing pages. **Alternative on Pro:** none
  needed; I will use the question searches in K1 and read the top-ranking pages from K2 myself.

### O2. SEO Content Template (4 keywords)
- **Pillar:** 3 Content. **Where:** SEO → On Page & Tech SEO → **SEO Content Template**, UK, Mobile.
- **Keywords:** `new years eve london`, `london new years eve fireworks`, `edinburgh hogmanay`,
  `new year breaks uk`. **Export:** "Export to DOC" for each.
- **Why:** recommended length, readability and related terms from the top 10. **Alternative:** I can
  read the K2 top-10 pages directly.

### O3. Backlink Audit (only if B1 shows referring domains)
- **Pillar:** 2. **Where:** SEO → Link Building → **Backlink Audit**, project for `newyear.guide`.
  **Export:** Audit tab, CSV with Toxicity Score and toxic markers.
- **Why:** to decide whether anything inherited needs disavowing. Skip if B1 shows none.

### O4. Site Audit (at launch, not now)
- **Pillar:** 4 Technical. **Why not now:** the site blocks all crawlers by design and must stay that
  way. Semrush can crawl past `robots.txt` and `noindex` only after verifying ownership of the site,
  which on Vercel would need a verification file added to the code. I have already crawled every live
  page myself, so skip this.
- **When it is useful:** once launch is approved and the domain is connected, before indexing is
  switched on.
  **Settings then:** SEO → On Page & Tech SEO → **Site Audit**; project `newyear.guide`; crawl source
  **Website**; limit 100 pages; user agent **SiteAuditBot-Mobile**; under **Restrictions to bypass**
  tick "Disallow in robots.txt and robots meta tag" (verification required); JavaScript rendering on.
  **Export:** PDF of the Overview, CSV of Issues (errors, warnings, notices), and the Crawlability,
  Markup, HTTPS and Core Web Vitals thematic reports.

### O5. Position Tracking (set up at launch)
- **Pillar:** 1 and 3. **Where:** SEO → Keyword Research → **Position Tracking**, `newyear.guide`,
  location United Kingdom, device Mobile. Load the final target keywords after the sprint.
- **Why:** the only reliable way to measure results and cannibalisation later. Nothing to export now.

### O6. Google tools (at launch)
- **Search Console** (Domain property): Pages (indexing) and Performance (last 16 months) exports.
- **Analytics:** not needed for this sprint.
- **PageSpeed Insights:** not needed from you; I will run it.

---

## What happens next

When the files are in the folder, I will analyse them together, then send you a short plan for
approval: the keyword-to-page map backed by your data, the competitor comparison, the prioritised
fixes across all four pillars, any new pages the demand supports, and the outreach list. No code
changes until you approve that plan.
