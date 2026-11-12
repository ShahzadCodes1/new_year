# Product context

## What it is

newyear.guide: "The guide to every New Year on Earth." An independent editorial site covering New Year's Eve in UK cities, New Year breaks, fireworks and events, and the other New Years across the calendar (Lunar New Year, Hogmanay, Nowruz, Rosh Hashanah, Diwali, Songkran). UK first, built to expand internationally: `content/world.ts` is the map of places, cities carry their country, and `/world/` shows midnight crossing the globe. English only.

The full plan is `references/newyear-guide-one-page-summary.pdf`.

## Who it is for

People in the UK deciding where to be at midnight, where to go for a New Year break, or what is open and running around the holiday. They arrive from search, mostly in December, mostly on a phone.

## What it must do

1. Rank: a topical-authority play on "new year". Every content page is static, fast HTML with real text.
2. Earn: hotel and break affiliates first, then experiences and tickets. Experiences sit above hotels on every guide. Disclosure on every page that carries affiliate links.
3. Impress: the home page is a cinematic, scroll-driven journey through a single night. It is the brand.

## Priorities, in order

1. Visual quality and realism
2. Cinematic storytelling and smooth transitions
3. User experience and responsiveness
4. Performance on desktop and mobile
5. SEO-friendly content and architecture
6. Clean, maintainable, deployment-ready code

## Surfaces

| Surface | Mode | Standard |
|---|---|---|
| Home page | An experience | Full commitment: photographic scenes, one spectacle |
| Guides, breaks, practical pages, articles | Reading | Precision and restraint. No 3D. Fast |

## Voice

Plain, specific, opinionated. Verdicts, not listings: where to stand, whether it is worth it. No invented facts, reviews or figures. Every dated fact carries its source and the date it was checked.

## Fixed decisions

- URL scheme from the plan: no year in any URL, 31 December is the default namespace, other celebrations take a prefix (`/manchester/`, `/breaks/scotland/`, `/hogmanay/edinburgh/`, `/chinese-new-year/liverpool/`).
- The seven-block city template: verdict, midnight moment, ways to spend the night, where to stay, logistics, FAQ, last updated.
- Palette and typefaces as in `DESIGN.md`.
- Frontend only: no backend, CMS, database or authentication. Content is read through one module so a source can be swapped in later.
- No working newsletter signup until a provider is chosen; never a form that pretends to work.

## How the work is run

In approved phases, one homepage section at a time, with nothing deployed until approved. See `docs/` for the phase reports.
