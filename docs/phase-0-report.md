# newyear.guide — Phase 0 report: inspection and R&D

Prepared 9 November 2026. No application code has been written and nothing has been initialised, generated or deployed. This report ends with the decisions I need from you before Phase 1.

## Contents

1. What I inspected
2. Reference analysis (PDF and video)
3. The central problem: photorealism in a browser
4. Creative direction
5. Proposed homepage
6. How the installed skills shape the work
7. Recommended stack and architecture
8. Animation strategy
9. Asset strategy
10. Performance strategy
11. SEO strategy
12. Risks and solutions
13. Roadmap
14. Decisions I need from you

---

## 1. What I inspected

| Item | Finding |
|---|---|
| Project folder | `D:\year_guide` contains only `references/` (plural, not `reference`). No app, no git repository yet. |
| Planning PDF | `references/newyear-guide-one-page-summary.pdf`, one page, dated 25 October 2026. Read in full. |
| Reference video | `references/WhatsApp Video 2026-11-09 at 11.20.54 PM.mp4`, 14.3 s, 480×854 portrait, a phone filming a laptop. Extracted 43 timestamped frames and read every one. |
| Skills | Read the `SKILL.md` of all six, plus the references that apply to planning. Ran UI/UX Pro Max's design-system search and fetched Vercel's live Web Interface Guidelines. |
| Vercel plugin | Loaded its platform knowledge update. Its MCP server is not authorised yet (needed only at deployment). |
| Higgsfield | Connected. Team plan, 469 credits. Reviewed the image, video and 3D models available. Nothing generated. |
| Local toolchain | Node 24.17, npm 11.13, git 2.53, Python 3.14, bun. Not installed: Vercel CLI, GitHub CLI, Blender, ffmpeg (I used a bundled copy for frame extraction). |
| Technical research | Current versions and techniques verified against official docs and npm on 9 November 2026 (section 7). |

One thing I could not do: locate the live site shown in the video. The branding reads "COF>CTOR" (an automotive-aftermarket supply-chain company), but searches and likely domains turned up nothing, and the address bar is unreadable in the footage. My analysis is therefore from the frames alone. If you have the URL, send it and I will inspect how its scenes are delivered.

---

## 2. Reference analysis

### 2.1 The PDF: what is fixed

These are treated as decisions, not suggestions.

- **Positioning:** "The guide to every New Year on Earth." A topical-authority play on New Year as a subject, UK first.
- **URL scheme:** no year in any URL; 31 December is the default namespace; other celebrations take a prefix. `/manchester/`, `/manchester/fireworks/`, `/breaks/scotland/`, `/hogmanay/edinburgh/`, `/chinese-new-year/liverpool/`, `/outfits/dresses/`, `/say-it/welsh/`, `/whats-open/aldi/`.
- **City template, seven blocks, same everywhere:** verdict → midnight moment → ways to spend the night by vibe (the revenue block) → where to stay → logistics → FAQ → last updated.
- **Experiences sit above hotels** on every guide. Affiliate disclosure on every page.
- **Commercial priority:** breaks and hotels are the best gap ("New Year's Eve breaks" 3,600 searches at KD 15, no roundup exists; "New year in Peak District" 2,400 at KD 8). City event pages rank easily but monetise weakly. Lunar New Year is the largest head term (246k).
- **Never cut:** breaks, city guides, Chinese New Year city pages.
- **One brand, one site, English only, global URL scheme from day one.**
- **Timing:** the plan wants a minimal site live now (5–6 guides plus about, contact, privacy, disclosure) because affiliate approval needs something to look at and December is the rehearsal season.

Two things in the PDF I want to flag rather than silently follow:

1. **A date to verify.** The roadmap lists "Lunar Feb 17" under February–August 2027. 17 February was Lunar New Year 2026. In 2027 it falls on Saturday 6 February ([publicholidays.com](https://publicholidays.com/lunar-new-year/), [Farmers' Almanac](https://www.farmersalmanac.com/when-chinese-new-year)). The six-weeks-ahead publishing date moves with it, to late December 2026.
2. **A deadline conflict.** "Live before December" and an award-level immersive homepage built section by section with approvals pull against each other. Section 13 proposes a way to have both.

### 2.2 The video: what makes it feel premium

Scene by scene:

| Time | What happens | The technique underneath |
|---|---|---|
| 0.0–0.7 s | Dark hero: glowing wordmark in a field of drifting red particles with soft bokeh | Persistent WebGL canvas behind the page; additive particles; depth of field |
| 0.7–1.5 s | A statement fades in over the scene, then a white editorial card slides over it | Real HTML text and cards layered above the canvas; the 3D never carries the copy |
| 1.5–4.0 s | A particle DNA helix; translucent red glass cards fly past one at a time in depth | Scroll-scrubbed camera along one axis; one idea on screen at a time |
| 4.0–5.0 s | Hard tonal change: dark red gives way to a bright isometric factory cut-away | A wipe between two worlds; the page deliberately changes brightness |
| 5.0–9.5 s | Factory → Warehouse → Port → Ship, driven by a pill tab bar with a progress line | Discrete "stations": the camera travels between framed compositions; tabs make the scene navigable |
| 9.5–14.3 s | Ship dissolves through cloud into a monochrome globe with route arcs and city labels; tabs rotate it | Cloud as a transition material; HTML labels pinned to 3D positions |

Constant furniture: a thin vertical progress rail on the right edge, and a small "next" chip bottom right.

The six lessons I take from it:

1. **One canvas, many scenes.** The 3D layer persists; the page scrolls over it.
2. **Scroll is the camera.** Movement is scrubbed, reversible and never takes the wheel away from the user.
3. **Stations, not a fly-through.** Each scene is a composed frame. Travel between frames is the transition.
4. **Tonal rhythm.** Dark, then light, then dark. This is the part most imitations miss, and it matches your instruction not to make every section equally dark.
5. **Text stays HTML.** Every word is a real element above the canvas.
6. **Navigation lives inside the scene.** Pill tabs and a progress rail tell you where you are.

### 2.3 An honest gap between the reference and your brief

The reference is **not photoreal**. Its 3D is stylised: particles, glass panels, clay-like miniature dioramas, a monochrome globe. That style is exactly what real-time WebGL is good at.

Your brief asks for the same choreography with **photorealistic** environments and accurate London landmarks. That is a harder problem than the reference solved, and it decides the whole technical approach. Section 3 deals with it directly.

---

## 3. The central problem: photorealism in a browser

A fully real-time, dynamically lit 3D London does not look photoreal on the web, and certainly not on a phone. Award-level sites that look real get there by one of three routes: baked lighting on real geometry, Gaussian splats, or pre-rendered footage. I assessed five options.

| Option | Realism | Mobile | Risk | Verdict |
|---|---|---|---|---|
| A. Real-time lit 3D city model | Low: reads as a game or a maquette | Heavy | Medium | Rejected as the main approach |
| B. Layered photoreal plates with depth ("2.5D matte painting") in WebGL | High, within small camera moves | Light | Low | **Core of the recommendation** |
| C. Pre-rendered camera moves played as scroll-scrubbed frame sequences | Highest | Moderate (download and memory) | Low to medium | **Used for the big travel moments** |
| D. Gaussian splat world (e.g. World Labs Marble + Spark) | Potentially high | 200–500K splats on phones | High: unproven for night cities with thin bright lights and water | Optional one-day spike, not the plan |
| E. Google Photorealistic 3D Tiles | Daytime photogrammetry, soft up close | Heavy streaming | Legal: no caching, mandatory Google branding, cannot be relit to night | Ruled out |

### Recommendation: a hybrid in one canvas

**Plates for realism, WebGL for life, sequences for travel.**

- **The city is a photograph.** A 4K photoreal plate of the Thames at night is cut into depth layers (sky, far skyline, landmarks, bridge, water, foreground) and mapped onto simple geometry. A small camera move then produces true parallax, because the layers really are at different distances.
- **Everything that moves is real-time.** Fireworks, sparks, embers, mist, bokeh and the water surface are GPU particles and shaders. They are sharp at any resolution, weigh almost nothing, respond to scroll and to the actual time, and never repeat.
- **The fireworks light the city.** Each burst tints the plate and the water in the shader, using the depth layers as a mask. This interaction is what stops the scene looking like particles pasted over a postcard.
- **Long journeys are pre-rendered.** Where the camera has to travel further than a plate allows (night to dawn, city to countryside), a short pre-rendered move is played as a scroll-scrubbed image sequence on a canvas, the most reliable method on iOS Safari.

Honest limits of this approach: a plate holds for a few degrees of orbit and a modest push-in. It cannot do a free fly-through between buildings. The design therefore uses composed stations with travel between them, which is also what the reference does.

---

## 4. Creative direction

**Concept: one night, then the whole year.**

The homepage is a single night told in order. It opens in London in the last minute of the year, strikes midnight, moves through the cities where people are celebrating, wakes up to New Year's Day in the countryside, and then widens to every other New Year on the calendar. Scroll is the clock.

This gives the story a reason to change tone:

| Chapter | Time in the story | Light | Palette lead |
|---|---|---|---|
| Hero | 23:59 | Still, cold, expectant | Midnight Navy, Warm Ivory type |
| Midnight | 00:00 | Fireworks, the brightest moment | Champagne Gold, a little Celebration Red |
| Cities | The night out | City glow | Deep Blue |
| Ways to spend it | — | Calm editorial | Deep Blue surface, ivory type |
| Breaks | The morning after | Dawn | Warm Ivory ground, navy type |
| Every New Year | The rest of the year | Lantern light | Navy, gold, red used sparingly |
| Practical | — | Daylight clarity | Warm Ivory |
| Close | — | Last embers | Navy |

### Design principles

- **Spend the boldness once.** Midnight is the single orchestrated spectacle. Everything else is quieter so it lands.
- **The photograph is the hero, not a mood.** Real places, correctly drawn.
- **Editorial, not directory.** Verdicts and opinions ("where to stand", "worth it or not"), written plainly. No grids of identical cards with star ratings.
- **Gold is a highlight, not a fill.** Rules, key numerals, one button style.
- **No template tells.** No tracked all-caps eyebrow above every heading, no 01/02/03 numbering on things that are not a sequence, no arrow glued to every link, no fade-up on every card.

### Colour: contrast measured

I computed WCAG contrast for the palette. These pairings set the rules.

| Text on background | Ratio | Use |
|---|---|---|
| Warm Ivory on Midnight Navy | 17.2 | Body and headings on dark |
| Midnight Navy on Warm Ivory | 17.2 | Body and headings on light |
| Champagne Gold on Midnight Navy | 9.3 | Accents, links, numerals on dark |
| Muted Silver Blue on Midnight Navy | 5.1 | Secondary text on navy |
| Muted Silver Blue on Deep Blue | 4.5 | Borderline: large or secondary text only |
| Celebration Red on Midnight Navy | 4.2 | Below 4.5: large text and graphics only, never small copy |
| Celebration Red on Warm Ivory | 4.1 | Same rule |
| Muted Silver Blue on Warm Ivory | 3.4 | Not for text |
| Champagne Gold on Warm Ivory | 1.9 | **Never as text.** On ivory, gold is decorative only |

### Typography

As specified: Cormorant Garamond for display, Manrope for everything functional, fluid sizing with `clamp()` to your desktop targets (hero 88–112px, section 56–72px, card 30–38px, subheads 20–24px, body 16–18px, nav 13–15px, labels 11–12px).

Three implementation notes:

- Cormorant Garamond is light and high-contrast. At 30–38px on a dark ground it needs weight 500–600 to stay legible; hairline weights are for the largest sizes only.
- Four font files in total (Cormorant 500 and 600 or the variable file, Manrope variable), self-hosted through `next/font` with no request to Google.
- Small labels stay in sentence case. The countdown uses tabular numerals so digits do not jitter.

---

## 5. Proposed homepage

### 5.1 Structure

Eight chapters. Four use the cinematic canvas; four are clean editorial layouts.

```
┌──────────────────────────────────────────────────────────────┐
│ 1  HERO · 23:59, London              [canvas: plate + mist]  │
│    H1 · live countdown · two actions                         │
├──────────────────────────────────────────────────────────────┤
│ 2  MIDNIGHT                      [canvas: fireworks, crane]  │
│    one statement, pinned ~2 screens                          │
├──────────────────────────────────────────────────────────────┤
│ 3  WHERE WILL YOU BE AT MIDNIGHT?   [canvas: city stations]  │
│    London · Edinburgh · Manchester · Newcastle · …  (tabs)   │
├──────────────────────────────────────────────────────────────┤
│ 4  WAYS TO SPEND THE NIGHT                      [editorial]  │
│    fireworks · parties · dinners and cruises · family · quiet│
├──────────────────────────────────────────────────────────────┤
│ 5  THE MORNING AFTER · NEW YEAR BREAKS  [sequence → ivory]   │
│    night turns to dawn, then an ivory editorial spread       │
├──────────────────────────────────────────────────────────────┤
│ 6  EVERY NEW YEAR ON EARTH        [canvas: the year wheel]   │
│    Lunar New Year · Hogmanay · Nowruz · Songkran · …  (tabs) │
├──────────────────────────────────────────────────────────────┤
│ 7  THE USEFUL BITS                              [editorial]  │
│    bank holidays · what's open · transport · greetings       │
├──────────────────────────────────────────────────────────────┤
│ 8  NEWSLETTER AND CLOSE · footer                [editorial]  │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Chapter by chapter

**1. Hero: 23:59, London.**
- *Purpose:* say what the site is in one screen and set the standard.
- *Visual:* a photoreal Thames skyline, still and cold, mist on the water, lit windows, no fireworks yet. Slow ambient drift.
- *Content:* the H1 carries the positioning. A live countdown to midnight on 31 December (UK time) sits beside it. Two actions: "Find your New Year's Eve" and "Browse New Year breaks".
- *Why:* the countdown is functional (it is one of the PDF's practical queries) and it sets up the next chapter. Two actions map to the two things the business needs: traffic (cities) and revenue (breaks).

**2. Midnight.**
- *Purpose:* the one moment people will remember and share.
- *Visual:* scrolling moves the clock to 00:00. Fireworks rise and burst in real time, light washes across the buildings and water, and the camera cranes up and back.
- *Content:* a single editorial statement, set large. Nothing else.
- *Why:* your first two priorities are realism and cinematic storytelling. This is where the budget of attention is spent.

**3. Where will you be at midnight?**
- *Purpose:* destination discovery for the seven launch cities; the main internal-link hub for city guides.
- *Visual:* city stations in the manner of the reference's Factory/Warehouse/Port/Ship. A pill tab bar moves the camera between photoreal city plates; fireworks continue over each.
- *Content:* per city, a one-line verdict, the midnight moment in a sentence, and links to the guide and its fireworks page (`/manchester/`, `/manchester/fireworks/`). The selected city is reflected in the URL so it can be shared.
- *Why:* city pages are the easiest rankings in the plan. They need strong links from the homepage.
- *Scope note:* I suggest three full plates at launch (London, Edinburgh, Manchester) with the other four cities as tabs sharing a lighter treatment, and adding plates over time.

**4. Ways to spend the night.**
- *Purpose:* the homepage version of the template's revenue block; routes people by what they want rather than where.
- *Visual:* no 3D. A calm editorial spread on Deep Blue with real photography.
- *Content:* five vibes (fireworks, parties, dinners and cruises, family, a quiet one), each linking to the matching block of the guides.
- *Why:* experiences are the primary earner on city guides. Placing this before hotels follows the PDF's rule.

**5. The morning after: New Year breaks.**
- *Purpose:* the strongest commercial section. Breaks are the best gap in the research.
- *Visual:* the second big transition. The night sky lightens to dawn over frosted countryside, a pre-rendered camera move scrubbed by scroll. The page then turns Warm Ivory, the tonal change the reference makes from dark to light.
- *Content:* an editorial spread: the breaks hub, Scotland, Peak District, spa, couples, cruises. Affiliate disclosure visible here once affiliate links exist.
- *Why:* the brightest, most readable part of the page is given to the content that earns the most.

**6. Every New Year on Earth.**
- *Purpose:* deliver the positioning and seed the cultural hubs.
- *Visual:* back to dark. The year as a slowly turning ring of lit vignettes (lanterns, a Hogmanay torchlight procession, a Nowruz table, Songkran water, Diwali lamps). Tabs turn the ring, like the reference's globe.
- *Content:* each celebration with its next date, one sentence and a link to its hub. Dates come from a data file, so they roll forward and are easy to verify.
- *Why:* Lunar New Year is the biggest head term in the research and the first hub due after December. This section makes "every New Year" literal.
- *Alternative considered:* a globe with a sweeping midnight line. Closer to the reference, but it suits time zones on 31 December rather than different calendars. I prefer the ring; tell me if you want the globe.

**7. The useful bits.**
- *Purpose:* answer practical questions fast; the snippet and display-ad cluster.
- *Visual:* no 3D. Ivory, tight typography, answers stated outright.
- *Content:* bank holiday dates, what's open, transport on the night, the countdown, and a teaser for greetings in other languages.

**8. Newsletter and close.**
- *Purpose:* email capture (the plan targets 1,000 subscribers by February) and full navigation.
- *Visual:* a last quiet frame, embers falling. Then the footer with every hub, about, contact, privacy and disclosure.

### 5.3 How people navigate

- A slim top bar: wordmark, Cities, Breaks, Celebrations, Practical. Transparent over the hero, solid once you scroll.
- A chapter rail on the right edge, as in the reference: shows position, jumps to any chapter, operable by keyboard.
- Tab bars inside chapters 3 and 6. They are real links, so they work without the 3D.
- Native scrolling throughout. Nothing captures the wheel or blocks the back button.
- Anyone who does not want the show loses nothing: every chapter is complete as ordinary HTML.

### 5.4 Desktop, tablet and mobile

| | Desktop (≥1280) | Tablet (768–1279) | Mobile (<768) |
|---|---|---|---|
| Canvas | Full quality: layered plates, full particles, bloom | Medium: fewer particles, lower pixel ratio | Light: portrait-cropped plates, about a third of the particles, no post-processing |
| Midnight | Pinned about two screens | Pinned about 1.5 screens | Pinned about one screen; the burst still happens |
| City and celebration tabs | Pill bar | Pill bar | Horizontally scrollable chips, 44px targets |
| Dawn transition | Image sequence, about 100 frames | About 80 frames | About 60 frames at 960px, or a two-frame dissolve on low-end phones |
| Chapter rail | Shown | Shown | Replaced by a thin progress line |
| Reduced motion, no WebGL, data saver | Still plates in their finished composition; no pinning | Same | Same |

Portrait phones get their own crops of each plate. A landscape skyline squeezed into a portrait screen is the most common way these sites fail on mobile.

---

## 6. How the installed skills shape the work

| Skill | What it contributes | Where it applies |
|---|---|---|
| **Frontend Design** | Two-pass method (plan, then check the plan against "what would anyone produce for this brief?"); the list of template tells to avoid; one orchestrated moment; copy as design | Already applied in sections 4 and 5. Governs every section build. |
| **Design Taste Frontend** | One section per screen; equal content edges; no captions under images; quiet hover behaviour; plain copy rules; a concrete performance budget; checks at 1440, 1024, 820, 768, 390 and 320 | Layout rhythm and QA on every section. See the conflict below. |
| **Impeccable** | Modes: the homepage is Persuade/Experience (full commitment), guide templates are Read (precision and restraint). Its `shape` step is what this report is; `critique`, `audit`, `adapt` and `polish` run per section | Review loop in Phases 3–5. `PRODUCT.md` and `DESIGN.md` are written in Phase 2. |
| **UI/UX Pro Max** | Its search confirmed a dark-and-gold premium palette and a Cormorant pairing for this category. Adopted its storytelling rules (complete DOM order, progress indicator, final state under reduced motion), three.js rules (pixel-ratio cap, scrubbed camera, start mobile particles near 3,000) and UX rules (44px targets, 4.5:1 contrast, no parallax on text) | Design system in Phase 2; targeted lookups per component. |
| **Web Design Guidelines** | Vercel's live rule set. Directly relevant: visible focus, image dimensions, `prefers-reduced-motion`, no `transition: all`, safe-area insets, `color-scheme: dark`, balanced heading wraps, tabular numerals, hydration-safe dates (the countdown), state in the URL (the city tabs) | Code review of every section and the final audit. |
| **Hyperframes** | It renders HTML to video files. It is not a runtime motion library, so it does not drive the live site | Not needed for Phases 1–3. Useful later for a still-loop fallback, social clips and the December press pitch. |
| **Vercel plugin** | Current platform facts: read the Next.js docs bundled in `node_modules`, Node 24 default, `vercel.ts` for configuration | Phase 2 setup and Phase 6 deployment. |

### Where a skill and your brief disagree

I am raising these openly rather than quietly picking one.

1. **Design Taste Frontend versus the brief.** Its house rules reserve dark heroes, shader effects and scroll-driven scenes for technology and gaming sites; for every other trade it prescribes flat grounds and photographs, and it deals palettes and heroes from its own kit rather than accepting given ones. Your brief specifies a dark cinematic palette, a persistent 3D canvas and scroll-driven camera work. Frontend Design and Impeccable both state that the brief wins. **My proposal: the brief wins.** I adopt this skill's craft rules and checks and do not use its dealt palette, dealt hero or its ban on scenes. Some of its automated gate checks will flag the cinematic sections by design; I will report those as expected rather than "fixing" them.
2. **UI/UX Pro Max suggested** a "Liquid Glass" style and a "feature-rich showcase" pattern. Both are generic matches for the search terms and wrong for this brief. Not adopted.
3. **Pinning.** UI/UX Pro Max advises pinning no more than one or two sections. The proposal pins three (Midnight, Cities, Every New Year). I keep the pins short, use native sticky positioning, and unpin entirely on reduced motion.

### Things these skills do that I want your consent for

- **Impeccable** downloads a self-contained binary the first time its launcher runs.
- **Design Taste Frontend** installs a hook that runs its checker script automatically when I finish a turn, once a build is armed.
- **Hyperframes** asks to send a usage beacon (telemetry) when it starts.

None has been run. I will use the first two from Phase 2 if you agree, and Hyperframes only if we decide to make video assets.

---

## 7. Recommended stack and architecture

### 7.1 Stack

Versions verified on 9 November 2026.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16.4** (App Router, Turbopack), **React 19.3**, **TypeScript** | Static generation for every content page, a first-class metadata, sitemap and Open Graph API, native Vercel deployment, and room to add data sources later without restructuring |
| Styling | **Tailwind CSS v4** with the palette and type scale as CSS custom properties | One token source shared by the DOM and the shaders |
| 3D | **three.js r187** (pinned) with **React Three Fiber 9.8**; a few **drei** helpers only | One persistent canvas whose scenes mount and unmount with the page; Suspense-based asset loading; `PerformanceMonitor` for quality tiers |
| Renderer | **WebGLRenderer**, not WebGPU | three.js still labels WebGPU experimental; it would force every shader and all post-processing to be rewritten, for no visible gain here |
| Scroll and motion | **GSAP 3.15 + ScrollTrigger** with `@gsap/react` | One timeline drives both the camera and the HTML. Free for commercial sites since 2025 |
| Smooth scroll | **Lenis 1.3**, desktop wheel only | Touch devices keep native scrolling. I will confirm in the prototype that it earns its place |
| Post-processing | pmndrs `postprocessing` bloom on the high tier only | Lower tiers bake the glow into the particle sprites |
| Content | Typed data files and MDX in the repository, read through one content module | Swapping in a CMS later changes that module, not the pages |

Deliberately left out: a UI component kit, a state library, a CMS, analytics, a database, authentication. None is needed for this scope.

**Alternative considered: Astro.** It would ship slightly less JavaScript on the content pages. I prefer Next.js because you listed it, the Vercel tooling is built around it, the homepage is a substantial React application, and future backend work (incremental regeneration, route handlers, an events database) is already in the framework.

**One caution:** `postprocessing` currently caps three.js below r188, so three is pinned and upgraded deliberately.

### 7.2 Architecture

```
app/
  layout.tsx                  fonts, metadata base, nav, footer
  page.tsx                    homepage: server-rendered chapters, all real text
  [city]/page.tsx             city guide (seven-block template)
  [city]/fireworks/page.tsx
  breaks/…  hogmanay/[city]/  chinese-new-year/[city]/
  whats-open/[chain]/  say-it/[language]/  outfits/[type]/
  about/  contact/  privacy/  disclosure/
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  ui/                         Button, Link, Card, Breadcrumbs, FAQ, Disclosure
  home/                       the eight chapters as HTML
  guide/                      the seven template blocks
experience/                   client-only, loaded after first paint
  Stage.tsx                   the one canvas
  scenes/  shaders/           plates, fireworks, water, atmosphere
  scroll/                     timelines mapping scroll to scene state
  quality/                    device tiers and fallbacks
content/                      cities, breaks, celebrations, practical
lib/
  content.ts                  the only place pages read content from
  seo.ts                      metadata and structured-data builders
  affiliates.ts               every outbound partner link in one registry
  dates.ts                    celebration dates and the countdown
docs/
```

Three rules hold the architecture together:

1. **The HTML is the document; the canvas is scenery.** The canvas is a fixed layer behind the page, hidden from assistive technology, and contains no information that is not also in the HTML.
2. **The canvas loads after the page is usable.** The first paint is server-rendered text over an optimised still of the hero. The 3D bundle arrives afterwards and fades in over the same image.
3. **Content pages carry no 3D at all.** Guides, breaks and practical pages are fast, static reading pages. three.js is never downloaded there.

---

## 8. Animation strategy

- **Scene state is a pure function of scroll position.** Scroll to any point, in either direction, and the scene is exactly the same. No one-shot triggers that can be missed or fire twice.
- **Two clocks only.** Scroll drives the camera, the transitions and the type. Time drives what is alive (fireworks, mist, water).
- **Scrubbing with a little inertia** (about one second) so camera moves read as a crane and not as a scrollbar.
- **Native scroll, native sticky.** Sections hold with `position: sticky`. Nothing intercepts the wheel.
- **Three kinds of transition:**
  1. *Within a plate:* a camera move through the depth layers.
  2. *Between plates:* a dissolve driven by light, for example a firework flash whites out the frame and resolves into the next city.
  3. *Long travel:* a pre-rendered sequence (night to dawn).
- **Type:** line-by-line reveals for the hero and the chapter statements only. Cards and body copy do not animate in.
- **Rendering only when needed.** The canvas stops drawing when nothing is moving, when its section is off screen and when the tab is hidden.
- **Reduced motion:** every chapter shows its finished composition as a still. No pinning, no scrubbing, no smooth scroll.

---

## 9. Asset strategy

Each asset gets the form that suits it.

| Asset | Form | Source | Notes |
|---|---|---|---|
| London midnight skyline | Layered 4K plate with a depth map | See the decision below | The most important asset in the project |
| Fireworks, sparks, embers | Procedural, real-time | Code | Never AI video: generated fireworks smear, loop visibly and cannot react to scroll or light the scene |
| Thames water | Shader | Code | A flipped, distorted reflection of the plate and the particles; avoids rendering the scene twice |
| Mist, haze, bokeh | Procedural | Code | |
| City stations | Lighter plates, two to three layers each | As London | Three at launch |
| Night-to-dawn countryside | Pre-rendered move, delivered as an image sequence | Higgsfield image-to-video with fixed start and end frames | Start and end frames are approved stills, so the motion cannot drift |
| The year wheel | Real-time geometry with photographic vignettes | Code plus stills | |
| Editorial photography | Photographs | Licensed or partner-supplied | See the trust rule below |
| Posters and Open Graph images | Stills exported from the scenes | Derived | Also the reduced-motion fallback |
| 3D models | Probably none | — | Higgsfield's image-to-3D tools make single objects, not environments |

### Higgsfield: what I would use

| Need | Model | Why |
|---|---|---|
| Hero and city plates | Cinema Studio Image 2.5 or Seedream 4.5 (both 4K, both accept reference images) | Highest resolution; reference-image input keeps real landmarks in proportion |
| Camera moves | FLUX 3 Video or MiniMax H3 | Both accept a start frame and an end frame |
| Composition control, if needed | 3D Jutsu (Higgsfield's cloud Blender) feeding Seedance 2.5 | A rough block-out fixes the camera path and proportions before generation |

I do not yet know the credit cost per generation. Before generating anything I will give you the shot list and the estimated cost, and wait for your approval of each batch.

### Decision: where the London plate comes from

Your brief asks for landmarks with accurate proportions and warns against distorted, generic AI scenes. Image models still get Big Ben's clock faces, Tower Bridge's geometry and the London Eye's spokes wrong often enough to matter.

| Route | Accuracy | Cost | My view |
|---|---|---|---|
| 1. Licensed real photograph as the base; AI used only to extend, clean and separate layers | Guaranteed | A stock licence, typically tens of pounds per image | **Recommended** |
| 2. Higgsfield generation steered by reference photographs, with a landmark accuracy review before anything ships | Usually good; needs several attempts | Credits | Acceptable fallback; fine for countryside and non-landmark scenes |
| 3. Text-only generation | Unreliable for landmarks | Credits | Not for London |

### A trust rule for editorial images

A generated image must never be presented as a specific real hotel, venue or event. For breaks and venues, use partner-supplied photography once affiliate programmes approve the site, or licensed stock. Until then, stand-in images are of the region (the Peak District at dawn), never of a named property.

### Delivery

Stills as AVIF with WebP fallback and responsive sizes. Plate layers as GPU-compressed textures where it helps memory. Image sequences in separate desktop and mobile sets, decoded a few frames ahead and never all at once. Large media goes to Vercel Blob rather than the deployment bundle, as Vercel's own guidance recommends.

---

## 10. Performance strategy

### Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint, mid-range phone on 4G | Under 2.5 s (the hero still and H1, not the canvas) |
| Layout shift | Under 0.1 |
| Interaction to Next Paint | Under 200 ms |
| Frame rate | 60 fps desktop; 60 fps target and 30 fps floor on phones |
| Hero still | Under 400 KB |
| Content pages | No three.js; about 150 KB of JavaScript or less |
| Homepage 3D bundle | Loaded after first paint, about 250 KB compressed |
| Homepage media | About 1.5 MB before any scrolling; under 10 MB desktop and 5 MB mobile across the full page, loaded as you approach each chapter |

### How

- **Quality tiers decided at runtime:** High, Medium, Light and Still. The tier is chosen from the device and then adjusted by measured frame time, not by guessing from the user agent.
- **Pixel ratio capped** at 2 on desktop and 1.5 on phones.
- **One WebGL context** for the whole page.
- **Particles are computed on the GPU** from fixed attributes and a time value; the CPU does no per-particle work. Fill rate from overlapping glow is the real limit on phones, so sprite size is capped.
- **Bloom on the high tier only.**
- **Lazy by chapter.** Each scene's assets load as the previous chapter is being read and are released after.
- **Draw only when something changed.**
- **iOS specifics:** frames decoded serially within a small window (Safari has a canvas memory ceiling and a known crash when decoding many images at once); viewport units that ignore the collapsing address bar; no smooth-scroll on touch.

### Testing

I can test every viewport from 320 to 1920px in the built-in browser and profile frame times there. I cannot hold a physical phone. For real scrolling feel on iOS and Android I will give you a private preview link from Phase 1 onward and a short checklist, and treat what you report as the deciding evidence.

---

## 11. SEO strategy

The PDF's structure is followed as written.

### Foundations

- Every content page is static HTML generated at build time. The homepage's text is server-rendered; the canvas adds nothing a crawler needs.
- One H1 per page; strict heading order; semantic landmarks; a skip link.
- Unique title and meta description per page from the content files; canonical URLs; trailing slashes to match the PDF's URLs; Open Graph images generated per page.
- `sitemap.xml` and `robots.txt` generated from the same content source, so they cannot drift.
- Breadcrumbs on every page below the homepage.
- **No year in URLs.** The year appears in titles and headings from a single setting, so the whole site rolls forward in one change each season.

### Templates

| Template | Used for | Structure |
|---|---|---|
| City guide | `/manchester/`, `/hogmanay/edinburgh/` | The seven blocks, in the PDF's order |
| Events and experiences | `/manchester/fireworks/` | Verdict, what and when, where to watch, tickets, logistics, FAQ |
| Breaks roundup | `/breaks/`, `/breaks/scotland/` | Verdict, picks by type, how to choose, booking notes, FAQ |
| Cultural celebration | `/chinese-new-year/`, `/chinese-new-year/liverpool/` | What it is and when, how it is marked, where in the UK, traditions, FAQ |
| Practical answer | `/whats-open/aldi/`, bank holidays, transport | The answer in the first sentence, then the detail and the source |
| Editorial article | Greetings, outfits, wishes, resolutions | Standfirst, body, related links |

### Structured data, only where true

| Type | Where | Condition |
|---|---|---|
| `Organization`, `WebSite` | Homepage | Always |
| `BreadcrumbList` | All inner pages | Always |
| `Article` with `dateModified` | Guides and articles | Matches the visible "last updated" |
| `FAQPage` | Pages with a visible FAQ | Questions and answers appear on the page word for word |
| `Event` | Event pages | Only for verified events with a confirmed date, place and organiser |
| `Review`, `AggregateRating` | Nowhere | The site has no genuine review data |

### Internal linking

Hub and spoke. The homepage links to every hub with ordinary crawlable links (the tabs in chapters 3 and 6 are links). Each guide links up to its hub, across to sibling cities and down to its fireworks and stay pages.

### Affiliate links and accuracy

- All partner links come from one registry and are marked `rel="sponsored nofollow"`.
- A short disclosure near the top of any page with affiliate links, a line in the footer, and a full `/disclosure/` page.
- Every dated fact (an event time, a road closure, an opening hour) is stored with its source and the date it was checked. Unverified facts are not published. The visible "last updated" comes from that record.

---

## 12. Risks and solutions

| # | Risk | Likelihood | Solution |
|---|---|---|---|
| 1 | Generated London looks wrong: distorted landmarks, generic skyline | High if text-only | Real photographic base (section 9); a named accuracy review before any plate ships |
| 2 | Plates feel flat, like a postcard with particles on top | Medium | True depth layers, light from the fireworks falling on the city, a moving water reflection. This is what the Phase 1 prototype exists to prove |
| 3 | Phones: memory limits, heat, dropped frames | Medium | Quality tiers, one context, capped pixel ratio, windowed frame decoding, a still fallback |
| 4 | Scroll feels wrong on touch (jitter, address-bar jumps) | Medium | Native scroll and sticky, stable viewport units, no touch smoothing, your real-device checks |
| 5 | The canvas hurts load speed or SEO | Low with this design | Still image first, canvas after; no content inside the canvas; no 3D on content pages |
| 6 | The cinematic homepage delays the launch the plan needs before December | High | The two-track plan in section 13 |
| 7 | Wrong event information | Medium | Source and check-date on every fact; nothing unverified is published |
| 8 | Visual consistency across separately generated shots | Medium | A fixed look reference, shared grade, approved start and end frames for every move |
| 9 | Higgsfield credits run out | Unknown until costed | Shot list and estimate approved before each batch |
| 10 | Skill rules conflict with the brief | Certain | Declared in section 6; the brief wins |
| 11 | Library ceiling: `postprocessing` caps three.js below r188 | Low | Pin versions; upgrade deliberately |
| 12 | Hosting plan | Certain | Vercel's Hobby plan is for non-commercial use. A site carrying affiliate links needs Pro |
| 13 | I cannot test on physical devices | Certain | Preview links and a checklist for your review |

---

## 13. Roadmap

Durations are working time on my side and assume prompt approvals; your review time is extra.

| Phase | What is delivered | Indicative effort | Gate |
|---|---|---|---|
| **0. Inspection and R&D** | This report | Done | Your approval |
| **1. Technical prototype** | One scene, running locally: the London plate with real depth, live fireworks that light the city and water, a scroll-driven crane move, and one transition to a second scene. Desktop and mobile tiers, with measured frame times and load figures | 2–3 days, plus asset sourcing | Your approval of the visual quality |
| **2. Foundation** | Project set up; design tokens, type and colour; core components; the canvas foundation and quality tiers; responsive scaffolding; `PRODUCT.md` and `DESIGN.md` | 2 days | Your approval |
| **3. Homepage** | Eight chapters, one at a time. Each: plan → build → check appearance, responsiveness, motion and performance → present | 1–2 days per cinematic chapter, about half a day per editorial chapter | Your approval after every chapter |
| **4. Remaining pages** | The six templates and the agreed launch pages | 3–5 days, depending on page count and who writes the copy | Your approval |
| **5. Quality assurance** | Full review from 320 to 1920px: links, motion, performance, accessibility, metadata, console, production build | 1–2 days | Your approval |
| **6. Deployment preparation** | Production build, GitHub repository, Vercel project, deployment only on your word, live verification | Half a day | Your explicit go-ahead |

Phase 1 exit criteria, so "approved" means something specific:

1. The skyline reads as a photograph and the landmarks are correct.
2. Fireworks visibly light the buildings and the water.
3. The scroll-driven move is smooth in both directions with no jumps.
4. It holds 60 fps on a desktop and stays usable on a mid-range phone.
5. With motion reduced or WebGL off, the still version looks finished.

### A scheduling option for you to decide

Followed strictly in order, the content pages arrive last, likely after the December peak the plan calls the rehearsal season. The plan also says affiliate programmes need a live site to approve.

**Option: two tracks.** After Phase 2, publish the fast static site first: the templates, the four site pages and the plan's prototype guides (breaks hub, Peak District, Scotland, Manchester, London), with a simple still-image homepage. Then build the cinematic homepage chapter by chapter and swap it in. This gets pages indexed and affiliate applications moving in November without lowering the homepage's ambition. It does mean an early, simpler homepage is briefly public, and it brings part of Phase 4 ahead of Phase 3.

This changes your phase order, so I will only do it if you choose it.

---

## 14. Decisions I need from you

1. **The realism approach.** Do you approve the hybrid in section 3 (photoreal plates with depth, real-time fireworks and atmosphere, pre-rendered sequences for travel)?
2. **The London plate.** Licensed real photograph as the base (my recommendation), or Higgsfield generation steered by reference photos?
3. **The homepage.** Do you approve the eight chapters in section 5? Anything to add, cut or reorder? Ring or globe for chapter 6?
4. **Schedule.** Strict phase order, or the two-track option that gets content pages live first?
5. **Skills.** Do you agree that the brief wins where Design Taste Frontend disagrees with it? May I run Impeccable's launcher (it downloads a binary) and the Design Taste checker hook from Phase 2?
6. **Launch pages.** Which pages are in Phase 4, and who writes them? I can draft from research, but every event fact needs a source and a check before it is published.
7. **Newsletter.** With no backend, the signup form needs an email provider's hosted endpoint. Which provider, or should the form wait?
8. **The reference site.** If you know its URL, send it.

Nothing further will be built until you reply.
