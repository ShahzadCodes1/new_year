"""Builds the web plates from the source images in assets/source/.

For each scene it writes, into public/plates/<name>/:
  plate-large.avif / plate-small.avif the plate itself (landmarks untouched)
  sky.avif                            the sky with the skyline filled in behind it
  plate-dawn-*.avif, sky-dawn.avif    the same two for the morning version, where a scene has one
  mask.png                            red: sky mask, feathered. green: a wider copy that gates the lighting
  depth.png                           how far each part of the plate stands, relative to its column's base
  plate.json                          camera fit and depth data used by the engine

Run from the project folder:  python scripts/build-plates.py [debugDir] [scene ...]
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "public" / "plates"
MASK_W = 2048
DEPTH_W = 512
# The depth file stores distance relative to the column's base, between 1/DEPTH_RANGE and DEPTH_RANGE times it.
DEPTH_RANGE = 4.0
# How strongly the depth pass's greys separate near from far: white is e^DEPTH_GAIN times nearer than black.
DEPTH_GAIN = 1.8

# `src` is the plate; `depth` is its depth pass (white near, black far, sky black). Night plates and depth
# passes were made in Higgsfield from the licensed photographs: see docs/asset-licences.md.
SCENES = {
    "london": {
        "src": "london-emrich-pexels-230794.jpg",
        "depth": "london-depth-higgsfield.png",
        # The file has a three-pixel light line along its top edge.
        "trim_top": 6,
        # Camera fit, estimated from known sizes: the Eye is 135 m tall and about 330 m away,
        # Westminster Bridge is about 600 m away, the camera is on the footbridge about 12 m up.
        # This view is travelled through on a long crane move, so its depth is read gently and smoothly: the
        # wheel stands a little forward of the far bank, without its thin rim being bent by the pass's edges.
        "depth_gain": 0.5, "depth_blur": 5.0,
        "vfov": 34.6,
        "horizon": 0.736,  # horizon row, as a fraction of height from the top
        "camH": 12.0,
        # Where the far bank meets the water: (u, v from top). Depth of the bank follows from it.
        "waterline": [[0.0, 0.83], [0.12, 0.83], [0.30, 0.815], [0.40, 0.80], [0.43, 0.772], [0.78, 0.768], [0.80, 0.78], [1.0, 0.785]],
        "sky": {"max_luma": 96, "max_grad": 4.0, "below": 0.775},
        # Inside the wheel, anything dark is sky seen between the spokes: (centre u, centre v, radius u, radius v, max luma).
        "see_through": [[0.215, 0.444, 0.066, 0.282, 60]],
        # Fireworks: where in the frame (u range), how far away, and the burst heights in metres.
        "show": {"u": [0.30, 0.92], "dist": 430, "height": [110, 235]},
    },
    # The cities below are seen straight through their own camera. Each is treated as the same moderately wide
    # view; where there is water, the horizon is set just above the far bank, which puts that bank a few
    # hundred metres away. Their sky comes from the depth pass, refined along the skyline by brightness.
    "manchester": {
        "src": "manchester-night-higgsfield.jpg", "depth": "manchester-depth-higgsfield.png",
        "vfov": 39.0, "horizon": 0.5, "camH": 12.0, "waterline": None, "sheet": 620, "large": 3072,
        # This depth pass came back as a shaded model rather than flat tones, so it is smoothed harder.
        "depth_blur": 3.0,
        "show": {"u": [0.1, 0.9], "dist": 520, "height": [225, 300]},
    },
    "birmingham": {
        "src": "birmingham-night-higgsfield.jpg", "depth": "birmingham-depth-higgsfield.png",
        "vfov": 39.0, "horizon": 0.83, "camH": 12.0, "waterline": [[0.0, 0.86], [1.0, 0.86]], "large": 3072,
        "show": {"u": [0.25, 0.95], "dist": 520, "height": [150, 235]},
    },
    "liverpool": {
        # Two generated depth passes of this view were unusable, so this one is drawn by hand: flat tones for
        # the warehouses, the museum and the waterfront buildings, under the generated pass's sky outline.
        "src": "liverpool-night-higgsfield.jpg", "depth": "liverpool-depth-drawn.png",
        "vfov": 39.0, "horizon": 0.78, "camH": 12.0, "waterline": [[0.0, 0.81], [1.0, 0.81]], "large": 3072,
        "depth_blur": 2.5,
        # Lit haze stands in the narrow gap between the museum and the clock-tower building. The sky layer keeps
        # the real sky almost up to the buildings there, instead of a wide filled margin that would read as a hole.
        "sky_margin": 6,
        "show": {"u": [0.14, 0.6], "dist": 520, "height": [130, 215]},
    },
    "newcastle": {
        "src": "newcastle-night-higgsfield.jpg", "depth": "newcastle-depth-higgsfield.png",
        "vfov": 39.0, "horizon": 0.56, "camH": 12.0, "waterline": [[0.0, 0.59], [1.0, 0.59]], "large": 3072,
        "show": {"u": [0.15, 0.85], "dist": 520, "height": [125, 205]},
    },
    "glasgow": {
        "src": "glasgow-night-higgsfield.jpg", "depth": "glasgow-depth-higgsfield.png",
        "vfov": 39.0, "horizon": 0.77, "camH": 12.0, "waterline": [[0.0, 0.80], [1.0, 0.80]], "large": 3072,
        "show": {"u": [0.1, 0.9], "dist": 520, "height": [130, 215]},
    },
    "edinburgh": {
        "src": "edinburgh-night-higgsfield.jpg", "depth": "edinburgh-depth-higgsfield.png",
        # A long-lens view, deliberately treated as a wider one so it fills the frame with margin.
        "vfov": 39.0, "horizon": 0.70, "camH": 12.0, "waterline": None, "sheet": 620, "large": 3072,
        "show": {"u": [0.18, 0.62], "dist": 520, "height": [150, 290]},
    },
    # Not a city and not a real place: an invented valley, made as a matched pair so the scene can turn from
    # night to first light. `dawn` is the same view in the morning. The last fireworks are far off, over the hills.
    "countryside": {
        "src": "countryside-night-higgsfield.jpg", "dawn": "countryside-dawn-higgsfield.jpg", "depth": "countryside-depth-higgsfield.png",
        "vfov": 39.0, "horizon": 0.42, "camH": 12.0, "waterline": None, "sheet": 900, "large": 3072,
        # The bare tree is as dark as the night sky behind it, so its branches are found on the dawn plate, where
        # they stand out against the light; and its depth pass is clean enough to keep its finest lines.
        "sky_fine": True,
        "show": {"u": [0.25, 0.9], "dist": 1500, "height": [150, 290]},
    },
}


def luma(a):
    return a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722


def load_depth(cfg, size):
    """The depth pass as 0..1 (1 nearest), at the given (width, height)."""
    d = Image.open(SRC / cfg["depth"]).convert("L").resize(size, Image.LANCZOS)
    return np.asarray(d, dtype=np.float32) / 255.0


def sky_from_photo(img, cfg, see_through):
    """Sky = the dark, even region connected to the top edge. Used where the photograph is the plate."""
    a = np.asarray(img, dtype=np.float32)
    L = ndimage.gaussian_filter(luma(a), 1.2)
    grad = np.hypot(ndimage.sobel(L, 0), ndimage.sobel(L, 1)) / 8.0
    h, w = L.shape
    rows = np.arange(h)[:, None] / h
    cand = (grad < cfg["max_grad"]) & (rows < cfg["below"]) & (L < cfg["max_luma"])
    cand = ndimage.binary_opening(cand, iterations=1)
    labels, _ = ndimage.label(cand)
    top = np.unique(labels[0])
    sky = np.isin(labels, top[top > 0])
    sky = ndimage.binary_closing(sky, iterations=3)
    sky = ndimage.binary_fill_holes(sky)
    # Pull the edge one pixel into the sky so no bright rim of sky clings to the skyline.
    sky = ndimage.binary_erosion(sky, iterations=1, border_value=1)
    cols = np.arange(w)[None, :] / w
    for cu, cv, ru, rv, max_l in see_through:
        inside = ((cols - cu) / ru) ** 2 + ((rows - cv) / rv) ** 2 < 1
        sky |= inside & (L < max_l)
    return sky


def sky_from_depth(img, depth, horizon, fine=False, bright=False):
    """Sky = what the depth pass leaves black. The pass is only roughly aligned with the plate, so within a
    few pixels of its skyline the plate's own brightness decides. `bright` says the plate is a daylight one,
    where things stand out dark against the sky rather than light against it."""
    a = np.asarray(img, dtype=np.float32)
    L = ndimage.gaussian_filter(luma(a), 1.0)
    # Hairlines and specks in the pass are not sky, unless the pass is known to be clean (`fine`).
    far = (depth if fine else ndimage.median_filter(depth, size=9)) < 0.045
    sure_sky = ndimage.binary_erosion(far, iterations=7, border_value=1)
    sure_solid = ndimage.binary_erosion(~far, iterations=7, border_value=1)
    band = ~sure_sky & ~sure_solid
    if bright:
        # Compared with the sky right beside it, since a dawn sky runs from pale at the horizon to dusky above.
        weight = ndimage.gaussian_filter(sure_sky.astype(np.float32), 24)
        beside = ndimage.gaussian_filter(L * sure_sky, 24) / np.maximum(weight, 1e-3)
        sky = sure_sky | (band & (weight > 0.02) & (L > beside - 28))
    else:
        # How bright the sky is, so a lit haze near the horizon still counts as sky.
        level = np.percentile(L[sure_sky], 90) if sure_sky.any() else 30.0
        sky = sure_sky | (band & (L < level + 10))
    sky = ndimage.binary_opening(sky, iterations=1)
    # The pass sometimes leaves an unlit wall or a dark roof black too. Real sky either reaches the top of the
    # frame or is framed by a structure above the horizon (the inside of an arch); nothing else is kept.
    labels, n = ndimage.label(sky)
    top = set(np.unique(labels[0]).tolist())
    lowest = ndimage.maximum(np.arange(sky.shape[0])[:, None] * np.ones_like(labels), labels, range(1, n + 1))
    area = ndimage.sum(sky, labels, range(1, n + 1))
    keep = [i + 1 for i in range(n) if (i + 1) in top or (lowest[i] < horizon * sky.shape[0] and area[i] > sky.size * 0.0006)]
    sky = np.isin(labels, keep)
    return ndimage.binary_erosion(sky, iterations=1, border_value=1)


def fill_behind_skyline(img, sky):
    """Continue the sky down behind the buildings, so parallax never reveals a hole."""
    a = np.asarray(img, dtype=np.float32)
    h, w = sky.shape
    rows = np.where(sky, np.arange(h)[:, None], -1)
    last = np.maximum.accumulate(rows, axis=0)
    last = np.where(last < 0, 0, last)
    filled = a[last, np.arange(w)[None, :]]
    # Where a row has sky on both sides of a gap (the wheel, a tower), bridge the gap sideways:
    # the sky brightens toward the horizon, so colour from the same height is the right colour.
    cols = np.arange(w)
    for y in range(h):
        m = sky[y]
        if m.sum() < 8:
            continue
        xs = cols[m]
        span = (cols >= xs[0]) & (cols <= xs[-1])
        for c in range(3):
            filled[y, span, c] = np.interp(cols[span], xs, a[y, m, c])
    soft = np.stack([ndimage.gaussian_filter(filled[..., c], 10) for c in range(3)], -1)
    m = ndimage.gaussian_filter(sky.astype(np.float32), 2.0)[..., None]
    return Image.fromarray(np.clip(a * m + soft * (1 - m), 0, 255).astype(np.uint8))


def relief(cfg, sky, edge):
    """Distance of every part of the plate, as a multiple of the distance at the foot of its column.

    The foot is the waterline where there is water (its true distance follows from the camera), and the plate's
    typical depth where there is none. `edge` is the row of that foot for each of 65 columns across the frame.
    """
    w = DEPTH_W
    h = round(w * sky.shape[0] / sky.shape[1])
    # A generated depth pass can carry specks and hairlines that are not real steps in distance.
    g = ndimage.median_filter(load_depth(cfg, (w, h)), size=cfg.get("depth_despeckle", 5))
    s = np.asarray(Image.fromarray(sky).resize((w, h), Image.NEAREST))
    rows = np.arange(h)[:, None] / h
    cols = np.arange(w)
    # The pass is only roughly aligned, so here and there it calls part of a building sky. Those places, and
    # the sky itself, take the depth of the nearest part of a building the pass and the plate agree on. That
    # keeps a thin rim or a skyline at one distance instead of rippling between near and far.
    agreed = ~s & (g > 0.045)
    nearest = ndimage.distance_transform_edt(~agreed, return_distances=False, return_indices=True)
    g = g[nearest[0], nearest[1]]
    if cfg["waterline"]:
        foot = np.interp(cols / (w - 1), np.linspace(0, 1, len(edge)), edge)
        # The grey of whatever stands at the waterline, taken a little above it, and steadied along the bank so
        # one boat or pier does not pull its whole column forward.
        at = np.clip((foot * h).astype(int) - max(2, h // 60), 0, h - 1)
        if len(cfg["waterline"]) > 2:
            # A bank that comes toward the camera: follow it along the frame.
            base = ndimage.median_filter(g[at, cols], size=w // 6, mode="nearest")
            base = ndimage.gaussian_filter1d(base, w / 40, mode="nearest")[None, :]
        else:
            # A straight far bank is one distance: take its tone, ignoring whatever is moored in front of it.
            base = np.full((1, w), np.percentile(g[at, cols], 30))
    else:
        # An elevated view has no ground plane to measure from. The nearest rooftops run along the bottom
        # edge, so nothing down there may read as distant.
        low = np.clip((rows - 0.75) / 0.2, 0, 1)
        g = np.maximum(g, low * np.percentile(g[~s], 80))
        base = np.full((1, w), np.median(g[~s]))
    ratio = np.exp(-cfg.get("depth_gain", DEPTH_GAIN) * (g - base))
    # Near things grow by a few pixels, so their own edges are safely on them and the step falls just outside.
    ratio = ndimage.minimum_filter(ratio, size=7)
    ratio = ndimage.gaussian_filter(ratio, cfg.get("depth_blur", 1.4))
    if cfg["waterline"]:
        # Right at the waterline the sheet has to meet the water, wherever the depth pass puts it.
        near_foot = np.clip((foot[None, :] - rows) / 0.02, 0, 1)
        ratio = 1 + (ratio - 1) * near_foot
    ratio = np.clip(ratio, 1 / DEPTH_RANGE, DEPTH_RANGE)
    q = 0.5 + np.log(ratio) / (2 * np.log(DEPTH_RANGE))
    return Image.fromarray(np.round(q * 255).astype(np.uint8))


def build(name, cfg, debug):
    src = Image.open(SRC / cfg["src"]).convert("RGB")
    if cfg.get("trim_top"):
        src = src.crop((0, cfg["trim_top"], src.width, src.height))
    out = OUT / name
    out.mkdir(parents=True, exist_ok=True)
    aspect = src.width / src.height

    for old in out.iterdir():
        old.unlink()
    dawn = Image.open(SRC / cfg["dawn"]).convert("RGB").resize(src.size, Image.LANCZOS) if cfg.get("dawn") else None
    for label, w in (("large", cfg.get("large", 4096)), ("small", 2560)):
        for stem, picture in (("plate", src), ("plate-dawn", dawn)):
            if picture:
                picture.resize((w, round(w / aspect)), Image.LANCZOS).save(out / f"{stem}-{label}.avif", quality=cfg.get("quality", 68), speed=3)

    small = src.resize((MASK_W, round(MASK_W / aspect)), Image.LANCZOS)
    dawn_small = dawn.resize(small.size, Image.LANCZOS) if dawn else None
    if "sky" in cfg:
        sky = sky_from_photo(small, cfg["sky"], cfg.get("see_through", []))
    else:
        # One cut-out serves both versions of a plate. It is found on the dawn one where there is one.
        sky = sky_from_depth(dawn_small or small, load_depth(cfg, small.size), cfg["horizon"], cfg.get("sky_fine", False), dawn is not None)
    # The cut-out keeps a soft margin of sky around the buildings, so the glow that surrounds lit
    # structures travels with them. The sky plate underneath is filled clean out to a wider margin.
    feather = ndimage.gaussian_filter(ndimage.binary_erosion(sky, iterations=5, border_value=1).astype(np.float32), 4.0)
    # Green carries a wider, softer copy: light from the fireworks fades out toward the skyline edge,
    # so sky pixels caught in the feather are never lit as if they were stone.
    wide = ndimage.gaussian_filter(ndimage.binary_dilation(sky, iterations=3).astype(np.float32), 5.0)
    rgb = np.stack([feather, wide, np.zeros_like(feather)], -1)
    Image.fromarray((rgb * 255).astype(np.uint8)).save(out / "mask.png", optimize=True)
    behind = ndimage.binary_erosion(sky, iterations=cfg.get("sky_margin", 26), border_value=1)
    fill_behind_skyline(small, behind).save(out / "sky.avif", quality=62, speed=3)
    if dawn_small:
        fill_behind_skyline(dawn_small, behind).save(out / "sky-dawn.avif", quality=62, speed=3)

    f = 0.5 / np.tan(np.radians(cfg["vfov"]) / 2)  # focal length in units of image height
    pitch = float(np.degrees(np.arctan((cfg["horizon"] - 0.5) / f)))
    meta = {
        "aspect": round(aspect, 5),
        "vfov": cfg["vfov"],
        "pitch": round(pitch, 3),
        "camH": cfg["camH"],
        "show": cfg["show"],
        "source": cfg["src"],
        "depthRange": DEPTH_RANGE,
        "dawn": dawn is not None,
    }
    us = np.linspace(0, 1, 65)
    if cfg["waterline"]:
        # Distance to the bank in each column, from how far below the horizon its waterline sits.
        pts = np.array(cfg["waterline"])
        vs = np.interp(us, pts[:, 0], pts[:, 1])
        vs = ndimage.gaussian_filter1d(vs, 1.2, mode="nearest")
        dist = cfg["camH"] / ((vs - cfg["horizon"]) / f)
        meta["bank"] = [round(float(d), 1) for d in np.clip(dist, 150, 1200)]
        meta["water"] = True
    else:
        vs = np.ones_like(us)
        meta["bank"] = [cfg["sheet"]] * 65
        meta["water"] = False
    # The row where the upright part of the plate ends: the waterline, or the bottom of the frame.
    meta["edge"] = [round(float(v), 4) for v in vs]
    relief(cfg, sky, vs).save(out / "depth.png", optimize=True)
    (out / "plate.json").write_text(json.dumps(meta, indent=1))

    if debug:
        a = np.asarray(small).astype(np.float32) * 2.2
        edge = ndimage.binary_dilation(sky, iterations=2) ^ sky
        a[edge] = (0, 255, 0)
        a[sky] = a[sky] * 0.6 + np.array([90, 0, 60])
        h = a.shape[0]
        for i, v in enumerate(np.interp(np.linspace(0, 1, MASK_W), us, vs)):
            a[min(h - 1, int(v * h)) - 1 : min(h - 1, int(v * h)) + 1, i] = (255, 220, 0)
        pic = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).resize((1000, round(1000 / aspect)))
        dep = Image.open(out / "depth.png").convert("RGB").resize(pic.size)
        both = Image.new("RGB", (2000, pic.height))
        both.paste(pic, (0, 0))
        both.paste(dep, (1000, 0))
        both.save(Path(debug) / f"{name}-mask.jpg", quality=80)

    sizes = {p.name: round(p.stat().st_size / 1024) for p in sorted(out.iterdir())}
    print(name, f"sky {sky.mean() * 100:.0f}% of frame", sizes)


if __name__ == "__main__":
    # python scripts/build-plates.py [debugDir] [scene ...]   builds every scene, or only the ones named
    debug = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] not in SCENES else None
    only = [a for a in sys.argv[1:] if a in SCENES]
    for name, cfg in SCENES.items():
        if not only or name in only:
            build(name, cfg, debug)
