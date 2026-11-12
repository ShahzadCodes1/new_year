# Phase 1 — shot list, references and Higgsfield credits

Prepared 10 November 2026 for approval. Nothing has been downloaded, purchased, uploaded or generated.

## What I need you to approve

1. The two photographs to download (London and Edinburgh), or your alternatives.
2. Uploading those photographs to Higgsfield for clean-up and extension.
3. A Higgsfield credit ceiling for Phase 1. I propose **90 credits** of your 469, with the optional sequence test adding up to 60 more.

## How the photographs will be used

Your condition was that the real landmarks and their proportions are preserved. The rule I will work to:

- **The photograph stays the photograph.** Every landmark pixel in the final plate comes from the licensed image.
- **AI output is used only inside masked regions**: new sky above the frame, new water below it, areas hidden behind a cut-out layer, and removed boats or light trails. I composite those regions back over the original locally, so an edit model can never redraw Big Ben or the Eye.
- **Depth and layer masks are made locally**, in code. No credits.
- A licence record (page URL, photographer, licence text, date retrieved) is saved in `docs/` for every image used.

## Shot list

| Shot | Purpose | Source | Processing | Credits |
|---|---|---|---|---|
| **S1. London, midnight plate** | The main scene: Eye, Westminster Bridge, Elizabeth Tower, river foreground | Real photograph (candidates below) | Remove boats and light trails; extend sky up and water down; fill behind three cut-out layers; one "lit by fireworks" relight test | 30–55 |
| **S2. Edinburgh, second scene** | Target of the transition | Real photograph (candidates below) | Clean-up; extend sky; fill behind two layers | 10–20 |
| **S3. Phone framing** | Portrait composition | A portrait crop of S1 (a dedicated portrait photograph only if the crop is weak) | None, or as S1 for a dedicated image | 0–15 |
| **S4. Night-to-dawn sequence test** (optional) | Proves the pre-rendered travel technique early | Two generated stills plus one image-to-video move | 4K stills, 8 s clip with fixed start and end frames | 40–60 |

S4 is optional because the prototype's transition into Edinburgh is real-time and needs no video. Running S4 now would de-risk chapter 5 of the homepage earlier; skipping it saves the credits until that chapter.

## Photograph candidates

The research agent viewed these at preview size (about 640 px). Full-size checks for noise, sharpness and stray boats happen after download and before any processing. Please open the links and judge the composition yourself.

### S1 London

| | Image | Licence | Size | Notes |
|---|---|---|---|---|
| **Recommended** | [Bill Emrich, Pexels 230794](https://www.pexels.com/photo/lighted-ferrys-wheel-near-body-of-water-during-nighttime-230794/) | Pexels licence: free, commercial use and modification allowed, no attribution required | 5760×3840 | True night, clean dark sky. Eye at left, Westminster Bridge centre, Elizabeth Tower and Parliament at right, river across the lower third, 20 s exposure so the water is smooth |
| Alternative | [Jordi Vich Navarro, Unsplash](https://unsplash.com/photos/a-ferris-wheel-lit-up-in-the-night-sky-L93jpKTYWqA) | Unsplash licence: free, commercial use and modification allowed, no attribution required | 6204×4136 | Largest area of calm water, highest resolution. Flat grey overcast sky would need darkening; landmarks sit smaller |
| Alternative | [Phil Dolby, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A_Vintage_Vantage_(30953918460).jpg) | CC BY 2.0: needs a visible credit, licence link and "modified" note on the site | 5456×3324 | Good composition; a boat light trail to remove |
| Paid, warranted | [fotoVoyager, iStock](https://www.istockphoto.com/photo/london-landmarks-illuminated-night-london-eye-big-ben-thames-panorama-gm470476654-62898702) | iStock standard royalty-free | 10000×2256 | Not viewed. 3 credits (price shown in AED, about US$33; GBP unconfirmed). Only 2,256 px tall, which is weak for a full-screen plate |

Two strong Commons images were rejected because they are CC BY-SA: a modified composite would itself have to be released under the same licence.

### S2 Edinburgh

| | Image | Licence | Size | Notes |
|---|---|---|---|---|
| **Recommended** | [Rob Wingate, Unsplash](https://unsplash.com/photos/edinburgh-castle-and-city-skyline-at-dusk-nWkt_TNAhG4) | Unsplash licence | 5184×3456 | Dusk from Calton Hill: Balmoral clock tower, Scott Monument, castle on the skyline, open sky. This is the classic vantage for the Hogmanay fireworks. The castle is small |
| Alternative | [Jonathan Rathgeb, Unsplash](https://unsplash.com/photos/castle-illuminated-at-night-above-old-stone-buildings-0hdlflzxTyY) | Unsplash licence | 5873×3915 | Night from the Vennel: floodlit castle above old stone buildings. Castle is prominent but there is little open sky for fireworks |
| Alternative | [Jacob Fryer, Unsplash](https://unsplash.com/photos/a-castle-lit-up-in-the-dark-at-night-OfH_gPT2aCQ) | Unsplash licence | 6000×4000 | Floodlit castle against pure black; no city context |

None is the floodlit castle on its rock seen from Princes Street Gardens at night. If you want that view, it will need a paid image that someone browses for directly; the paid libraries block automated search.

### S3 Phone

A portrait crop of the London plate keeps one scene on every device and costs nothing. A 6,000 px-wide photograph gives a crop of roughly 1,900×4,100 px, enough for any phone. Fallback if the crop is weak: [Mark mc neill, Unsplash](https://unsplash.com/photos/a-bridge-over-a-body-of-water-with-a-clock-tower-in-the-background-7OS1sOTaT9g), 5000×7892, Westminster Bridge and Elizabeth Tower with the river filling the lower half.

## Licensing: how clear is it?

| Question | Answer |
|---|---|
| May these be used commercially, modified, without credit? | Pexels and Unsplash: yes, on all three, in their published licences |
| Do the free licences come with any warranty or property release? | No. Pexels states that buildings may carry additional rights and that checking is the user's responsibility |
| Is the London Eye a problem? | Stock libraries treat images where the Eye is the **main subject** as editorial only, and accept skyline views where it is one element. All three London candidates are wide skyline views. Do not make the Eye the branded subject of the site |
| UK law on photographing buildings | Section 62 of the Copyright, Designs and Patents Act 1988 permits photographs of buildings in public places. It covers copyright, not trade marks |
| Is AI processing allowed? | Unsplash and Pexels prohibit using images in machine-learning datasets and scraping for training. I found no clause against editing a licensed photo with an AI tool. Uploading to Higgsfield is editing, not training, but I am flagging it for your decision |

**My reading:** the free licences are clear enough for the prototype and usable for launch. If you want a warranted licence with indemnity for the production site, buy a royalty-free image at that point; the layer pipeline is the same. I cannot make purchases, so that step would be yours.

Unconfirmed: GBP prices for iStock, Adobe Stock and Shutterstock; Adobe's and Shutterstock's restriction lists (both blocked automated reading).

## Higgsfield costs

Measured with Higgsfield's cost preview, which submits nothing.

| Operation | Model | Credits each |
|---|---|---|
| Image edit or fill, up to about 6K | Seedream 4.5 (high) | 1 |
| Cinematic still, 4K | Cinema Studio Image 2.5 | 4 |
| Precise edit, 4K high quality | GPT Image 2 | 11 |
| Image-to-video with start and end frames, 2K, 6 s / 8 s | MiniMax H3 | 12 / 16 |
| Image-to-video, 1080p, 5 s / 8 s | FLUX 3 Video | 40 / 64 |
| Image-to-video, 1080p, 8 s | Seedance 2.5 | 128 |
| Outpaint, upscale | — | Not quotable until an image is uploaded; I will report it before running |

### Estimate

| Shot | Assumption | Credits |
|---|---|---|
| S1 | About 20 Seedream edits including retries, 2 GPT Image 2 edits, outpaint | 30–55 |
| S2 | About 10 Seedream edits, outpaint | 10–20 |
| S3 | Crop only | 0 |
| **Core total** | | **40–75** |
| S4 (optional) | 5 stills at 4 credits, 2–3 MiniMax H3 clips at 16 | 40–60 |

Proposed ceiling: **90 credits** for S1–S3. I will stop and ask before exceeding it, and report the running total after each batch.

## Downloads this requires

| File | Source | Size |
|---|---|---|
| London photograph, original JPEG, 5760×3840 | pexels.com | Estimated 5–12 MB; exact size confirmed before saving |
| Edinburgh photograph, original JPEG, 5184×3456 | unsplash.com | Estimated 4–10 MB |

Saved to `prototype/assets/source/`, kept out of any public folder.
