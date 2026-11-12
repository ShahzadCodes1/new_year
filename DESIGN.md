# Design system

The rules every page of newyear.guide is built from. Tokens live in `app/globals.css`; the live reference is `/styleguide/`.

## Direction

Cinematic Midnight: real photographs of real places at night, an editorial voice, and one spectacle (Midnight) that everything else stays quiet around. Not a travel directory, not a template.

## Palette

| Token | Hex | Role |
|---|---|---|
| `navy` | #080D19 | The night ground |
| `blue` | #111C30 | Raised dark ground |
| `blush` | #F3ECEA | Warm Blush White. Headings and text on dark |
| `snow` | #F4F6FA | Soft White. The light ground; filled actions and the current tab on dark |
| `red` | #C94B43 | The accent on dark: the marker beside the row in hand and the focus outline. Graphics only (4.2:1 on navy). Never on links: an underline is the colour of its words |
| `silver` | #73859B | Secondary text on navy (5.1:1) |
| `slate` | #4F5D70 | Secondary text on soft white, where silver is too faint |

Rules: red marks things and never carries words on dark (4.2:1 on navy is short of the 4.5 small text needs). Silver is not text on soft white. On the raised cards of a deep-blue section silver alone is short (4.1:1), so secondary text there is silver mixed with a fifth of soft white (5.5:1); this is `--muted` on the deep tone, not a new colour to pick. A filled action on dark is soft white with navy text. Words on dark are warm blush white, never soft white: the client chose the two apart, soft white for surfaces and blush for type.

Champagne Gold (#D8AD65) and Warm Ivory (#F5F1E8) were removed from the palette on 11 November 2026 at the client's request. Do not reintroduce them, as tokens or as literal values. The one exception is the fireworks themselves, which keep their natural gold bursts at the client's request: they are the colour of real shells, not of the interface. The ring of light between cities glows white and the closing embers are red.

## Tones

A section declares its ground with `data-tone`; text, rules and actions follow from CSS variables (`--bg`, `--fg`, `--muted`, `--accent`, `--rule`, `--cta-*`).

| Tone | Ground | Accent | Use |
|---|---|---|---|
| `night` | navy | red | Default; scenes sit on it |
| `deep` | blue | red | Calm editorial sections between scenes |
| `light` | soft white | navy | Reading sections |

Not every section is dark. The page changes brightness on purpose.

## Type

Cormorant Garamond (display, weights 500 and 600) and Manrope (everything functional), self-hosted through `next/font`.

| Utility | Size | Use |
|---|---|---|
| `text-hero` | 46–112px | The page headline |
| `text-section` | 38–72px | Section headings |
| `text-card` | 28–38px | Card and block headings |
| `text-sub` | 18–24px | Subheadings, standfirsts |
| `text-body` | 16–18px | Body |
| `text-nav` | 14px | Navigation, buttons |
| `text-label` | 12px | Labels, metadata |

Rules:
- Headings are Cormorant 600. Over a photograph they also take a soft navy text shadow; the lighter 500 is for numerals and the wordmark at small sizes.
- Sentence case everywhere. No tracked all-caps labels, no eyebrow above every heading.
- Numbers that change (the countdown) use tabular numerals.
- Measure: body copy stays under about 70 characters (`max-w-prose`).

## Layout

- Gutter `px-gutter` (20–80px), section rhythm `py-section` (72–160px), content width `max-w-page` (1280px).
- Left and right content edges are equal. One idea per screen in the cinematic chapters.
- Breakpoints follow Tailwind's: 768px and 1024px matter most. Checked at 320, 390, 768, 1024, 1440 and 1920.

## Components

| Component | File | Notes |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | Primary and secondary. Link when it navigates, button when it acts. 44px minimum height. Label is a verb and an object |
| `TextLink` | `components/ui/TextLink.tsx` | Always underlined, so colour is never the only cue |
| `Section` | `components/ui/Section.tsx` | Tone, gutter and content width in one place |
| `Logo` | `components/site/Logo.tsx` | A placeholder until the real brand arrives: a ring with the point where the year begins again, and the initials NYG beside it. Sized by the font size around it, coloured by the text colour |
| `SiteHeader` | `components/site/SiteHeader.tsx` | Floats over the scene. Links appear as pages are built. Full-screen menu under 768px. A line along its lower edge runs while the next page is on its way |
| `SiteFooter` | `components/site/SiteFooter.tsx` | Affiliate disclosure joins it with the first affiliate link |
| `Experience` | `experience/Experience.tsx` | The cinematic layer: scenery, opening screen, scroll, still fallback. The opening screen is the logo on a horizon line that fills as the scene loads; the screen then parts along the line onto the scene. It shows on a direct visit to the home page, not when arriving from another page |

One radius (`rounded-ui`, 2px). One easing (`ease-soft`). One button pair.

## Motion

- Scroll drives the camera and the transitions; time drives what is alive (fireworks, water).
- Native scrolling. Nothing captures the wheel. Wheel smoothing on fine pointers only.
- One entrance per page (the opening lines as the loading screen lifts). Cards and body copy do not animate in.
- Reduced motion, or no WebGL: each chapter shows a finished still and nothing is pinned.
- Only `transform` and `opacity` animate. Never `transition: all`.

## Accessibility floor

- Text contrast 4.5:1 (3:1 for display type). Visible focus ring in the tone's accent.
- Touch targets 44px. A skip link is the first focusable element.
- One `h1` per page; headings never skip a level.
- The canvas is scenery: hidden from assistive technology, and nothing a reader needs lives inside it.

## Imagery

- Landmarks are real. A city plate is either a licensed photograph or that photograph relit to night in Higgsfield with the photograph as its reference, checked against it building by building. No landmark is drawn from a text description.
- Every asset is recorded in `docs/asset-licences.md`.
- A generated image is never presented as a specific real hotel, venue or event.
