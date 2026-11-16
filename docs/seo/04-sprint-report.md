# SEO sprint report: analysis and changes

17 November 2026. Data: the Semrush exports in `seo/` (K1 keywords, K2 SERPs, K3 Keyword Gap, B2 and B3
backlinks). Every figure below is Semrush's; nothing has been measured on the live site, because it is
unindexed by decision. Domain, DNS and indexing were not touched; the approved home heading is unchanged.

## What the data says

**Demand (K1, UK volumes per month, KD = Semrush keyword difficulty)**

| Cluster | Biggest searches | Reading |
|---|---|---|
| London events | events in london new year 2,400 · new year's eve events in london 1,600 · london party nye 1,000 · tickets for london new year 1,000 · london nye tickets 720 | The largest UK cluster, KD 25–36. Searchers want listings with prices, not a guide. |
| London fireworks | london fireworks 5,400 · london new year fireworks tickets 1,000 · london nye fireworks tickets 1,000 · how much do the london new year's eve fireworks cost 390 | Ticket and price questions dominate. |
| London general | new years eve london 1,300 · new year's eve london 880 · nye london 880 | KD around 30. |
| Hogmanay | hogmanay 14,800 · hogmanay edinburgh 3,600 · hogmanay meaning 1,600 · edinburgh hogmanay 1,600 · what is hogmanay 880 | Meaning questions plus Edinburgh's event. |
| Breaks | new years eve breaks 3,600 · new years eve hotel packages 1,000 · new year's eve breaks for couples 880 · uk breaks for new years eve 720 | The lowest difficulty on the list (KD 9–19). |
| Bank holidays | is boxing day a bank holiday 8,100 · is christmas eve a bank holiday 6,600 · is new year's eve a bank holiday 6,600 · bank holidays uk 2027 8,100 | Big, direct questions. |
| World | first country to celebrate new year 720 (+590, 590, 210) · last country to celebrate new year 720 (+480, 260) | A clear question cluster for `/world/`. |
| Celebrations | when is diwali 18,100 · diwali 2026 33,100 · when is chinese new year 18,100 · chinese new year 2027 8,100 · rosh hashanah 2026 5,400 · nowruz 5,400 · songkran 2026 3,600 | "When is…" and year searches lead; KD is higher (39–75) than the UK New Year's Eve terms. |

**Search intent (K2 top 10s)**
- "new years eve london": the Mayor's page first, then Visit London, Covent Garden and several pages with
  Authority Score 0–15 (walks.com, nye.london). Weak pages rank, so a strong page can compete.
- "new years eve events london" and "new years eve manchester": listings win (Skiddle, Eventbrite,
  DesignMyNight). The page that wins lists real events with prices.
- "london new years eve fireworks": the official page dominates; guides with AS 3–10 also rank.
- "edinburgh hogmanay": the organiser and Wikipedia; hard to beat.
- "new year breaks uk": hotel and holiday-park product pages; no editorial guide in the top 10.
- "is new years day a bank holiday": GOV.UK first, then calendar sites with AS 1–15.

**Limits of the data**
- K1 has no Trend column, so seasonality could not be read from it.
- The `new years eve` export contains no rows for Manchester, Birmingham or other cities, so city demand
  outside London rests on the SERP data, not on volumes.
- K3 and B2 were run on root domains, so most rows are unrelated to New Year (Wimbledon, Amazon Prime).
  K3 was filtered to New Year terms; B2's top referrers are largely spam domains and were not used.
- B1: no data for newyear.guide (it shows a GoDaddy holding page).

## What changed

**Titles and descriptions (all 38 pages).** Every title now fits a search result whole (at most 60
characters; before, 29 ran past 70) and leads with the phrase the data supports: "New Year's Eve events in
London 2026: parties and tickets", "When is Diwali 2027? Date and where to celebrate in the UK", "First and
last countries to celebrate New Year". Descriptions are 70–160 characters, unique, and answer the search.
The site name is no longer appended to titles (it pushed them past the cut-off). The home page has its own
UK-first title and description.

**New page: `/london/events/`.** All 43 verified London events on one page, targeting the largest UK
cluster (London events, parties, NYE tickets), with Event structured data. Linked from the home page's
London card, the London guide, the cities hub and the national events page.

**London fireworks page rebuilt from verified facts.** It was sample content with wrong figures (it said
£20 to £50). It now gives the official prices (£55/£35 and £40/£20), the six viewing areas and their gates,
entry 8pm–10.30pm, Ticketmaster-only sales, the four-ticket limit, refunds and resale, road and bridge
closures and the accessible Orange area, all read on london.gov.uk on 17 November, with sources listed on
the page. Its questions answer the price and ticket searches directly.

**London guide.** The midnight section, key facts, questions and "ways to spend the night" now come from
verified sources (the fireworks facts and the event directory's real counts and price ranges) instead of
invented venues. The places to stay and getting-home section are still sample content.

**Every city guide shows its real events.** A "Ticketed events in [city]" block now lists the city's verified
events (all of them, or six for London with a link to the rest): Edinburgh 7, Glasgow 5, Manchester,
Birmingham and Liverpool 4, Newcastle 3. The events directory links back to each city guide.

**Headings.** Template headings now carry the page's subject: "Where to be at midnight in Glasgow",
"Ways to spend Hogmanay in Glasgow", "Tickets and prices for the London fireworks", "When is Diwali, and
what is it?", "Where to celebrate Diwali in the UK", "When to book New Year's Eve spa breaks". Before, every
city guide repeated the same five labels.

**Bank holidays.** Five new answered questions for the big searches: New Year's Eve, Christmas Eve, Boxing
Day, 2 January in Scotland, and how many days off there are; every answer follows the GOV.UK list.

**World page.** Retargeted at the first/last country questions, with a short answer up top and four
questions answered (Kiribati first at 10am UK time, American Samoa last at 11am on 1 January).

**Thin hubs.** The practical and celebrations hubs gained a short, factual introduction.

**Images.** The 14 hero photographs of real places now carry descriptions (London Eye and Westminster, the
Clyde Arc, Edinburgh's Old Town and so on); mood pictures stay decorative.

**Structured data.** Events now include a time of day and an end time where the organiser publishes one
plain time (31 of 43 London events), the area as street address, and an age range where the event is 18+
or 21+. London's event page has its own Event list.

## Checked

- Build, type-check and lint pass. 689 internal links on 38 pages, none broken.
- No duplicate titles or descriptions; every canonical is the page's own; all pages still `noindex, nofollow`.
- Accessibility (axe-core) passes on all changed pages after fixing one issue introduced in the sprint (the
  booking link's accessible name). The only remaining flag is the home page's deliberately dim scroll text.
- All 38 pages pass at six widths from 320 to 1920px.

## Still incomplete

- **Sample content.** Places to stay and getting-home sections of every city guide, the other city guides'
  picks, the breaks pages, the practical pages and most celebration text are still stand-ins.
- **Other cities' demand.** No volume data for Manchester, Birmingham and the rest (see limits above).
- **Backlinks.** Nothing can be built before launch. `03-link-prospects.md` lists 77 UK prospects from the
  Backlink Gap, grouped for outreach.
- **Event data ages.** Events were checked on 12 November (the fireworks on 17 November); prices and
  availability need re-checking weekly through December.

## Recommended next steps

1. Replace the sample "where to stay" and "getting home" sections, starting with London and Edinburgh.
2. Re-check every event before 1 December and add newly announced ones, London first.
3. Re-run K1 for `new years eve manchester`, `edinburgh` and the other cities, with the Trend column.
4. At launch: Search Console, Semrush Position Tracking for the titles above, a Site Audit, then outreach
   from the prospect list.
5. Consider an events page per city once a city has ten or more verified events (the code creates it
   automatically at that point).

## To verify by hand

- The London fireworks facts against london.gov.uk on the day you publish (a second ticket batch goes on sale
  on 20 November).
- The hero image descriptions, against the pictures.
- The new pages on a real phone, once deployed to the Vercel preview.
