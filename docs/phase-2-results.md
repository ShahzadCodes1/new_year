# Phase 2 foundation: results

10 November 2026. Captures are in `docs/phase-2/`.

## What was built

- The Next.js 16 application at the project root: App Router, TypeScript, Tailwind CSS 4, every route prerendered and enforced static.
- Design tokens (palette, fluid type scale, spacing, three tones), fonts self-hosted through `next/font`, and base styles. Recorded in `DESIGN.md`; live reference at `/styleguide/`.
- Core components: button, text link, section, header with a full-screen mobile menu, footer, skip link.
- The scene engine moved from the prototype into `experience/`, behind one `Experience` component. The home page text is server-rendered HTML; the 3D layer is a separate client-only chunk.
- SEO base: metadata and Open Graph defaults, canonical URLs, trailing-slash URLs, `robots.txt` and `sitemap.xml`. The site is set to noindex until launch (`lib/site.ts`).
- The prototype folder is gone; nothing is duplicated.

## Checks

| Check | Result |
|---|---|
| Production build | Passes; 5 routes, all static |
| TypeScript, ESLint | Clean |
| Sideways overflow at 320, 390, 768, 1024, 1440, 1920 | None, on both pages |
| One `h1` per page | Yes |
| Touch targets under 44px | None |
| Console errors | None |
| Mobile menu | Opens, locks the page, closes on Escape, returns focus |
| Frame cost, mains power, Radeon Vega 8 | 1080p 59 fps, 1440x900 105 fps, phone-size frame 339 fps |

## Loading

Three fixes were made after the move to Next.js slowed the start of the scene: the 3D code and the opening photograph now begin downloading with the page instead of after hydration, and a WebGL capability check that was holding up page parsing was replaced with a cheap test plus a fallback to stills if the 3D layer fails to start.

Loading times could not be measured reliably at the end of this phase: the machine was at 100% CPU with under 300 MB of free memory, and identical runs ranged from 3 to 25 seconds. The best clean runs were:

| Profile | First image | 3D scene ready |
|---|---|---|
| Desktop, unthrottled | about 1.0 s | about 3.1 s |
| Phone emulation (9 Mbps, 4x CPU slowdown) | about 1.6 s | about 5.9 s |

Page weight to first scene: about 2.0 MB on desktop (scripts 459 KB, images 1.45 MB), 1.3 MB on the phone profile. These need re-measuring on an idle machine and on real phones.

## Open

- Scripts are heavier than on the prototype (459 KB against 384 KB) because of the framework runtime.
- No real phone has been tested on this build.
- Not under version control yet: no git repository has been created.
- Carried from Phase 1: the dissolve between scenes, the burst glow, the boats in the London river.
