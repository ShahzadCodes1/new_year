# newyear.guide

The guide to every New Year on Earth. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, three.js with React Three Fiber, GSAP.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The design system is at `/styleguide/`.

| Command | What it does |
|---|---|
| `npm run build` then `npm run start` | Production build, served locally |
| `npm run lint`, `npm run typecheck` | Static checks |
| `npm run plates` | Rebuilds the scene plates from `assets/source/` (needs Python with Pillow, NumPy, SciPy) |
| `npm run stills` | Photographs the engine's stills into `public/stills/` (site must be running) |
| `npm run bench` | Frame cost and loading figures in a headless browser on the real GPU |
| `npm run links` | Follows every internal link on the running site and reports any that is broken |
| `npm run qa` | Page heads (title, description, canonical, sharing tags) and accessibility (axe-core, WCAG 2.2 A and AA) on every page |
| `node scripts/shots.mjs --audit <dir>` | Every page at 320–1920px: overflow, touch targets, console errors, captures |

## Layout

| Folder | Contents |
|---|---|
| `app/` | Routes, layout, global styles and tokens, robots and sitemap |
| `components/` | Reusable interface components |
| `experience/` | The cinematic layer: scene engine, opening screen, scroll, still fallback |
| `content/` | What the pages say. Home page content at the top level; the reading pages in `content/guides/` |
| `components/home/`, `components/guide/` | The home page's chapters; the reading pages' shared blocks and six templates |
| `lib/` | Site configuration |
| `public/plates/`, `public/stills/` | Scene imagery, built by the scripts |
| `assets/source/` | Licensed source photographs (see `docs/asset-licences.md`) |
| `scripts/` | Plate building, captures and benchmarks |
| `docs/` | Phase reports, licence record, security review |

`DESIGN.md` holds the design rules and `PRODUCT.md` the product context.

## Useful address options on the home page

`?hud=1` shows a frame-rate readout. `?mode=still` shows the still version. `?loader=0` skips the opening screen. `?tier=high|medium|low` forces a quality tier.

## Deploying

The site is a standard Next.js project and deploys to Vercel as it is: import the repository, keep the
Next.js preset, and deploy. There are no environment variables and no build settings to change.

- Every page is prerendered, so there is no server code to run beyond image resizing.
- `next.config.ts` sets the security headers and the caching of the scene's plates and stills.
- Node 20.9 or later (`engines` in `package.json`).
- Addresses in page heads use `site.url` in `lib/site.ts` (`https://newyear.guide`), on preview addresses too.
- Review captures (`docs/**/*.jpg|png`) and the client's brief (`references/`) are not in the repository.

## Before launch

`lib/site.ts` has `live: false`, which keeps the site out of search engines. Flip it at launch.

**Do not launch with sample content.** Every page in `content/guides/` is marked `sample: true`: its venues, prices, times and places are realistic stand-ins written to exercise the templates, and several are invented. They are to be replaced when content is managed from the backend. The exceptions are the dates on the home page (`content/celebrations.ts`, `content/practical.ts`) and the bank holiday page, which are verified and carry their sources.
