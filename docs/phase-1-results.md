# Phase 1 prototype: results

Updated 10 November 2026. Captures are in `docs/phase-1/`. The prototype has since been folded into the site (see `phase-2-results.md`); run it with `npm run dev`.

## What exists

- Two real photographs (see `asset-licences.md`), each projected from its original camera position onto a sky, a curved city sheet at the true distance of the far bank, and a water plane. No AI model has altered either photograph; Higgsfield credits spent: 0.
- GPU fireworks in one draw call, launched behind the skyline. Bursts light the buildings, the air and the river, and are reflected in the water as vertical streaks.
- A scroll-driven crane move, then a flash-led dissolve into Edinburgh, which is graded from dusk down to night.
- Portrait framing for phones, three quality tiers, and automatic step-down when frames run long.
- An opening screen (a ring that closes as the scene really loads) holds until the first frames are drawn, then lifts as the opening lines arrive. It never waits longer than 9 seconds, and still mode skips it.
- Headings use the heavier cut with a soft navy edge. On wide screens the opening headline sits in the clear night sky beside the wheel.
- A still image sits under the opening screen and the 3D layer fades in over it. With reduced motion or no WebGL 2, each chapter shows a finished still taken from the engine itself, and nothing is pinned.

## Measurements

GPU: integrated AMD Radeon Vega 8 (a low-end laptop chip). Production build, fireworks running.

| View | On mains | On battery, machine busy |
|---|---|---|
| 1920×1080, high tier, bloom | 17.4 ms (58 fps) | 41.2 ms (24 fps) |
| 1440×900, medium tier, bloom | 10.4 ms (96 fps) | 23.8 ms (42 fps) |
| Phone-size buffer 585×1266, low tier | 3.4 ms (292 fps) | 10.7 ms (93 fps) |

Loading, production build served locally, cache disabled:

| Profile | First and largest paint | 3D scene ready | Fetched |
|---|---|---|---|
| Desktop, unthrottled | 0.3–0.5 s | 1.1–1.7 s | 1.9 MB (scripts 384 KB, images 1.45 MB) |
| Phone emulation: 9 Mbps, 165 ms latency, 4× CPU slowdown | 0.9–1.2 s | 5.1–6.5 s | 1.8 MB |

Scripts: 120 KB gzip for the page, 276 KB gzip for the 3D layer (loaded separately).

## Not done or not verified

- No real phone has been tested. The phone figures are a desktop GPU drawing a phone-sized frame.
- The dissolve between scenes is still milky. It is the weakest part of the sequence.
- The glow in the air at the moment a shell bursts is too large and brownish.
- A boat's light trail and moored boats remain in the London river.
- The fireworks reflection only includes bursts that are on screen.
- Scripts are heavier than the 250 KB target for the 3D layer.
- The opening screen was added after the loading figures above were taken; they have not been re-measured with it.
