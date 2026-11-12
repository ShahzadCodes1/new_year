import * as THREE from 'three';
import { Director, MAX_LIGHTS, MAX_SHELLS, MAX_SMOKE } from './director';
import { CITIES_AT, MIDNIGHT_AT, STATIONS } from './boot';
import { progress } from './progress';
import { pointCount, type Quality } from './quality';
import { pointerState } from './scroll';

const DEG = Math.PI / 180;

const NOISE = /* glsl */ `
float hash21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash21(i), hash21(i+vec2(1.,0.)), f.x), mix(hash21(i+vec2(0.,1.)), hash21(i+vec2(1.,1.)), f.x), f.y);
}
float fbm(vec2 p){ float a = .5, s = 0.; for(int i=0;i<3;i++){ s += a*vnoise(p); p = p*2.03+17.; a *= .5; } return s; }
`;

/** Screen-space dissolve shared by every layer, so the two scenes are exact complements. */
const REVEAL = /* glsl */ `
uniform float uMix, uFlash; uniform vec2 uRes;
// A ring of light opens from a point in the sky, like a burst seen from inside it, and the next city is
// what it opens onto. This is how far inside the ring a pixel is; the edge wavers a little.
float ring(){
  vec2 at = (gl_FragCoord.xy - .5*uRes) / uRes.y - vec2(.06, .17);
  return pow(uMix, 1.35) * 1.6 - length(at) + (fbm(at*4. + uMix) - .45) * .07;
}
vec2 reveal(){
  // Outside the transition nothing is computed: one scene is simply hidden.
  if (uMix <= .001) return vec2(0.);
  if (uMix >= .999) return vec2(1., 0.);
  float e = ring();
  float vis = smoothstep(-.012, .012, e);
  // The edge glows white while the ring is small.
  float rim = exp(-pow(e/.02, 2.)) * (1. - .7*uMix) * 1.15;
  return vec2(vis, rim);
}
`;

/**
 * While two cities overlap, each is on screen in only part of the frame, but a graphics card still runs a
 * layer's whole shader for every pixel it covers. These two passes mark in the stencil buffer where each city
 * can show (with a margin past the soft edge), so the card rejects the rest before doing any work.
 */
const MASK_VERT = /* glsl */ `
void main(){ gl_Position = vec4(position.xy, 0., 1.); }
`;
const MASK_FRAG = /* glsl */ `
uniform float uSide;
${NOISE}
${REVEAL}
void main(){
  if (mix(-ring(), ring(), uSide) < -.03) discard;
  gl_FragColor = vec4(0.);
}
`;
/** Stencil bits: where the arriving city can show, and where the one being left can. */
const ARRIVING_BIT = 1;
const LEAVING_BIT = 2;

const PROJECT_VERT = /* glsl */ `
uniform mat4 uProjVP;
varying vec3 vWorld; varying vec4 vProj;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vWorld = w.xyz;
  vProj = uProjVP * w;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const LAYER_FRAG = /* glsl */ `
uniform sampler2D uMap; uniform sampler2D uMask;
uniform vec3 uLightPos[${MAX_LIGHTS}]; uniform vec3 uLightCol[${MAX_LIGHTS}]; uniform vec3 uLightDir[${MAX_LIGHTS}];
uniform float uResponse, uHaze, uSide, uOpaque, uExposure; uniform vec3 uGrade;
#ifdef DAWN
// The same view in the morning, and how far the night has turned into it.
uniform sampler2D uMapB; uniform float uDawn;
#endif
varying vec3 vWorld; varying vec4 vProj;
${NOISE}
${REVEAL}
void main(){
  vec2 uv = vProj.xy / vProj.w * .5 + .5;
  // The upright layer reaches a little past the plate's sides (its edge pixels repeat there), so a near
  // building at the edge of frame never slides off its own picture.
  if (uOpaque < .5 && (uv.x < -.04 || uv.x > 1.04 || uv.y < 0. || uv.y > 1.)) discard;
  vec2 cuv = clamp(uv, 0., 1.);
  // The sky layer is opaque; everything else is cut out along the skyline.
  vec2 mk = texture2D(uMask, cuv).rg;
  float cut = uOpaque > .5 ? 1. : 1. - mk.r;
  if (cut < .004) discard;
  vec3 base = texture2D(uMap, cuv).rgb;
  #ifdef DAWN
  base = mix(base, texture2D(uMapB, cuv).rgb, uDawn);
  #endif
  // Night grade: pull shadows and mid-tones down, leave lit windows and lamps as they are.
  base = mix(base * uGrade, base, smoothstep(.3, .75, dot(base, vec3(.2126, .7152, .0722))));
  // Fine grain keeps the extended sky from banding.
  base += (hash21(gl_FragCoord.xy) - .5) * .006 * uOpaque;
  float luma = dot(base, vec3(.2126, .7152, .0722));
  // A night photograph is underexposed, so surfaces answer light with a lifted estimate of their colour.
  // Lit windows and lamps are emitters and must not brighten.
  vec3 albedo = (sqrt(max(base, 0.)) * .5 + .012) * (1. - smoothstep(.3, .8, luma));
  vec3 col = base;
  if (uResponse > 0.) {
    vec3 surf = vec3(0.);
    for (int i = 0; i < ${MAX_LIGHTS}; i++){
      vec3 d = uLightPos[i] - vWorld;
      // A burst never lights a wall as if it were beside it, however near the relief brings the two.
      surf += uLightCol[i] / (1. + max(dot(d, d), 90000.) / 67600.);
    }
    col += albedo * surf * uResponse * (1. - smoothstep(.02, .5, mk.g));
  }
  if (uHaze > 0.) {
    // Light scattered by the air around each burst.
    vec3 V = normalize(vWorld - cameraPosition);
    vec3 air = vec3(0.);
    for (int i = 0; i < ${MAX_LIGHTS}; i++){
      float c = 1. - max(dot(V, uLightDir[i]), 0.);
      vec3 lc = mix(uLightCol[i], vec3(dot(uLightCol[i], vec3(.3333))), .45);
      air += lc * (exp(-c*420.) * .15 + exp(-c*60.) * .012);
    }
    col += air * uHaze * (uOpaque > .5 ? 1. : smoothstep(.25, .6, mk.g));
  }
  col *= uExposure;
  vec2 rv = reveal();
  float alpha = cut * mix(1. - rv.x, rv.x, uSide);
  col += vec3(.94, .96, 1.) * rv.y;
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const WATER_FRAG = /* glsl */ `
uniform sampler2D uMap; uniform sampler2D uFw;
uniform mat4 uViewProj;
uniform vec3 uLightPos[${MAX_LIGHTS}]; uniform vec3 uLightCol[${MAX_LIGHTS}];
uniform float uTime, uFwZ, uExposure, uSide;
varying vec3 vWorld; varying vec4 vProj;
${NOISE}
${REVEAL}
void main(){
  vec2 q = vWorld.xz; float t = uTime;
  vec2 g1 = vec2(vnoise(q*vec2(.09,.035) + vec2(t*.11, t*.05)), vnoise(q*vec2(.09,.035) + vec2(7.3 - t*.07, 3.1 + t*.09))) - .5;
  vec2 g2 = vec2(vnoise(q*vec2(.31,.12) + vec2(-t*.23, t*.17)), vnoise(q*vec2(.31,.12) + vec2(2.7 + t*.19, 9.4 - t*.13))) - .5;
  vec2 slope = g1*.9 + g2*.45;
  vec3 V = normalize(vWorld - cameraPosition);

  // The photographed water, nudged by the ripple field so it is never frozen.
  vec2 uv = vProj.xy / vProj.w * .5 + .5 + slope * vec2(.004, .010);
  float under = clamp(-uv.y * 4., 0., 1.);
  vec3 base = texture2D(uMap, clamp(uv, 0., 1.)).rgb * (1. - .6*under);

  // Fireworks in the river. Real water is rough: facets tilted toward the viewer throw a
  // high burst down into a long vertical streak, so the mirror is sampled over a range of tilts.
  vec3 refl = vec3(0.); float wsum = 0.;
  // Interleaved gradient noise: an even pattern, shifted every frame so it averages out instead of sparkling.
  float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy + fract(t*7.)*vec2(47., 17.), vec2(.06711056, .00583715))));
  for (int k = 0; k < TAPS; k++){
    float tilt = (float(k) + jitter) / float(TAPS) * .34;
    float w = exp(-pow(tilt/.17, 2.));
    vec3 N = normalize(vec3(slope.x*.22, 1., slope.y*.12 + tilt));
    vec3 R = reflect(V, N);
    float hit = step(R.z, -1e-4);
    float tt = (uFwZ - vWorld.z) / min(R.z, -1e-4);
    vec4 cp = uViewProj * vec4(vWorld + R*tt, 1.);
    vec2 s = cp.xy / cp.w * .5 + .5;
    float inside = hit * step(0., cp.w) * step(0., s.x) * step(s.x, 1.) * step(0., s.y) * step(s.y, 1.);
    refl += texture2D(uFw, clamp(s, 0., 1.)).rgb * inside * w;
    wsum += w;
  }
  refl /= wsum;
  float fres = .3 + .7*pow(1. - max(-V.y, 0.), 5.);

  vec3 glow = vec3(0.);
  for (int i = 0; i < ${MAX_LIGHTS}; i++){
    vec3 d = uLightPos[i] - vWorld;
    glow += uLightCol[i] / (1. + dot(d, d) / 90000.);
  }
  vec3 col = (base + refl*2.6*fres + base*glow*1.4 + glow*.01) * uExposure;
  vec2 rv = reveal();
  col += vec3(.94, .96, 1.) * rv.y;
  gl_FragColor = vec4(col, mix(1. - rv.x, rv.x, uSide));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const MIST_VERT = /* glsl */ `
varying vec3 vWorld; varying vec2 vUv;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vWorld = w.xyz; vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const MIST_FRAG = /* glsl */ `
uniform vec3 uLightPos[${MAX_LIGHTS}]; uniform vec3 uLightCol[${MAX_LIGHTS}];
uniform float uTime, uExposure, uSide;
varying vec3 vWorld; varying vec2 vUv;
${NOISE}
${REVEAL}
void main(){
  float n = fbm(vWorld.xy*vec2(.006, .02) + vec2(uTime*.012, -uTime*.004));
  float band = smoothstep(0., .12, vUv.y) * (1. - smoothstep(.25, 1., vUv.y));
  float a = smoothstep(.32, .78, n) * band * .42;
  vec3 lit = vec3(0.);
  for (int i = 0; i < ${MAX_LIGHTS}; i++){
    vec3 d = uLightPos[i] - vWorld;
    lit += uLightCol[i] / (1. + dot(d, d) / 40000.);
  }
  vec3 col = (vec3(.035, .045, .07) + lit*.16) * uExposure;
  vec2 rv = reveal();
  gl_FragColor = vec4(col, a * mix(1. - rv.x, rv.x, uSide));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const SMOKE_VERT = /* glsl */ `
uniform float uTime, uScale, uMaxPx;
uniform vec4 uSmoke[${MAX_SMOKE}];
varying float vAge; varying float vSeed; varying vec3 vWorld;
void main(){
  vec4 s = uSmoke[int(position.x + .5)];
  float age = uTime - s.w;
  vAge = age; vSeed = position.y;
  if (age < 0. || age > 10.) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; return; }
  // It drifts downwind and sinks a little as it cools.
  vec3 p = s.xyz + vec3(age * 2.4, -age * 1.6, 0.);
  vWorld = p;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = min((60. + age * 15.) * uScale / -mv.z, uMaxPx);
}
`;

const SMOKE_FRAG = /* glsl */ `
uniform vec3 uLightPos[${MAX_LIGHTS}]; uniform vec3 uLightCol[${MAX_LIGHTS}];
uniform float uExposure;
varying float vAge; varying float vSeed; varying vec3 vWorld;
${NOISE}
${REVEAL}
void main(){
  vec2 c = gl_PointCoord - .5;
  float d = length(c) * 2.;
  if (d > 1.) discard;
  vec2 q = c * 3.2 + vSeed * 17. + vec2(vAge * .04, 0.);
  float n = vnoise(q) * .65 + vnoise(q * 2.1 + 7.) * .35;
  float edge = smoothstep(1., 0., d);
  float shape = edge * edge * smoothstep(.1, .9, n + (1. - d) * .45);
  float life = smoothstep(0., .6, vAge) * (1. - smoothstep(4.5, 10., vAge));
  // Smoke is almost invisible at night until the next burst lights it from inside.
  vec3 lit = vec3(0.);
  for (int i = 0; i < ${MAX_LIGHTS}; i++){
    vec3 dl = uLightPos[i] - vWorld;
    lit += uLightCol[i] / (1. + dot(dl, dl) / 19600.);
  }
  vec3 col = (vec3(.016, .02, .03) + lit * .13) * uExposure;
  gl_FragColor = vec4(col, shape * life * .24);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const FW_VERT = /* glsl */ `
uniform float uTime, uScale, uMaxPx;
uniform vec4 uOrigin[${MAX_SHELLS}]; uniform vec4 uColA[${MAX_SHELLS}]; uniform vec4 uColB[${MAX_SHELLS}];
uniform vec4 uPar[${MAX_SHELLS}]; uniform vec4 uLaunch[${MAX_SHELLS}]; uniform float uBase[${MAX_SHELLS}];
attribute vec4 aMeta; attribute float aRnd;
varying vec3 vCol; varying float vAlpha;
const vec3 G = vec3(0., -9.8, 0.);
vec3 hash3(float n){ return fract(sin(vec3(n, n+17.13, n+41.7))*43758.5453)*2. - 1.; }
void main(){
  int i = int(aMeta.x + .5);
  vec4 o = uOrigin[i]; vec4 ca = uColA[i]; vec4 cb = uColB[i]; vec4 par = uPar[i]; vec4 la = uLaunch[i];
  float type = ca.w, speed = cb.w, life = par.x, k = par.y, size = par.w;
  float trail = aMeta.y, kind = aMeta.z, seed = aMeta.w;
  float t0 = uTime - o.w;
  vec3 p; vec3 col; float a; float s;
  if (kind < .5) {
    float lifeJ = life * (.75 + .5*aRnd);
    float span = (type > .5 && type < 1.5) || type > 3.5 ? .62 : (type > 2.5 ? .3 : .13);
    // Samples crowd toward the head, where the star moves fastest, so the trail reads as a line.
    float t = t0 - trail * sqrt(trail) * span * (.3 + .7*min(t0/.6, 1.));
    if (t0 < 0. || t < 0. || t > lifeJ) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; return; }
    vec3 dir = position; float v = speed * (.55 + .45*pow(aRnd, .35));
    if (type > 1.5 && type < 2.5) {
      vec3 f = normalize(vec3(position.x, 0., position.z) + 1e-4);
      float an = .9 + (la.w - .5)*1.6;
      dir = vec3(f.x, -f.z*sin(an), f.z*cos(an)); v = speed;
    } else if (type > 3.5) {
      vec3 arm = normalize(hash3(floor(seed*8.) + la.w*31.) + vec3(0., .45, 0.));
      dir = normalize(mix(arm, position, .1)); v = speed * (.35 + .65*aRnd);
    }
    vec3 g = G * par.z;
    p = o.xyz + g/k*t + (dir*v - g/k) * (1. - exp(-k*t)) / k;
    float lt = t / lifeJ; float head = 1. - trail;
    a = (1. - smoothstep(.55, 1., lt)) * mix(.2, 1., head*head) * smoothstep(0., .05, lt);
    float tw = step(.5, fract(sin(seed*91.7 + floor(uTime*24.)*12.9898)*43758.5453));
    a *= mix(1., tw, smoothstep(.5, .8, lt) * (type > 2.5 && type < 3.5 ? 1. : .4));
    col = mix(ca.rgb, cb.rgb, smoothstep(.15, .85, lt));
    col = mix(vec3(1.2, 1.12, 1.), col, smoothstep(0., .08, lt));
    s = size * mix(.45, 1., head) * (1. - .5*lt);
  } else {
    float rise = la.z;
    float t = (uTime - (o.w - rise)) - trail*.25;
    if (t < 0. || t > rise) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; return; }
    float u = t / rise; float ease = 1. - (1. - u)*(1. - u);
    p = mix(vec3(la.x, uBase[i], la.y), o.xyz, ease);
    p.x += sin(u*18. + seed*6.283) * 1.2 * (1. - u);
    a = (1. - trail) * .8 * (1. - u*.5); col = vec3(1., .78, .5); s = size * .55 * (1. - trail*.7);
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(s * uScale / -mv.z, 1.5, uMaxPx);
  vCol = col; vAlpha = a;
}
`;

const FW_FRAG = /* glsl */ `
uniform float uGain;
varying vec3 vCol; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  float core = smoothstep(1., 0., d);
  float glow = core*core*core + .3*core*core;
  gl_FragColor = vec4(vCol * glow * vAlpha * uGain, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

interface PlateMeta {
  aspect: number;
  vfov: number;
  pitch: number;
  camH: number;
  show: { u: [number, number]; dist: number; height: [number, number] };
  /** Distance to the far bank (or the city) for 65 columns across the frame. */
  bank: number[];
  water: boolean;
  /** The row (0 at the top) where the upright part of the plate ends, for the same 65 columns. */
  edge: number[];
  /** depth.png holds distance as a multiple of the column's base, from 1/depthRange to depthRange. */
  depthRange: number;
  /** Whether the plate also comes in a morning version (plate-dawn-*.avif, sky-dawn.avif). */
  dawn: boolean;
}

/** The depth pass: one byte per pixel, rows from the top. */
interface Depth {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

interface SceneDef {
  name: string;
  /** Tilt of the photograph's camera. `null` takes it from the plate's own fit. */
  pitch: number | null;
  mist: boolean;
  /** Where a phone turns to look, in degrees left of straight ahead. */
  portraitAim: number;
  /** Tone applied to shadows and mid-tones, to carry a dusk photograph into night. */
  grade: [number, number, number];
  /** Elevation, in degrees, of the top of the subject the opening frame should try to keep in view. */
  keepTop: number;
  /** How the view is held while this city is on screen: tilt and turn, in degrees. */
  viewPitch: number;
  viewYaw: number;
  /** How much the air around a burst glows, where it should differ from the usual: less when the show is far off. */
  air?: number;
}

// `pitch` places each photograph in the frame: lower values push it down and leave more extended sky above it.
// Where a city has water, `pitch` is null so the camera's own fit is used and the river lies flat.
const SETTINGS: Record<(typeof STATIONS)[number], Omit<SceneDef, 'name'>> = {
  london: { pitch: null, mist: true, portraitAim: 11, grade: [1, 1, 1], keepTop: 21.8, viewPitch: 9.2, viewYaw: 0.6 },
  manchester: { pitch: -4, mist: false, portraitAim: 0, grade: [1, 1, 1], keepTop: 0, viewPitch: 8, viewYaw: 0 },
  birmingham: { pitch: null, mist: false, portraitAim: 5, grade: [1, 1, 1], keepTop: 0, viewPitch: 11, viewYaw: 0 },
  liverpool: { pitch: null, mist: false, portraitAim: -5, grade: [1, 1, 1], keepTop: 0, viewPitch: 9, viewYaw: 0 },
  newcastle: { pitch: null, mist: false, portraitAim: -1, grade: [1, 1, 1], keepTop: 0, viewPitch: 5, viewYaw: 0 },
  glasgow: { pitch: null, mist: false, portraitAim: -2, grade: [1, 1, 1], keepTop: 0, viewPitch: 9, viewYaw: 0 },
  edinburgh: { pitch: 10, mist: false, portraitAim: 1, grade: [1, 1, 1], keepTop: 0, viewPitch: 10, viewYaw: 0 },
};
const SCENES: SceneDef[] = STATIONS.map((name) => ({ name, ...SETTINGS[name] }));
// After the last city the story leaves town for an invented valley, where the night turns to morning.
SCENES.push({ name: 'countryside', pitch: null, mist: false, portraitAim: -6, grade: [1, 1, 1], keepTop: 0, viewPitch: -3, viewYaw: 0, air: 0.3 });

// Where each photograph's camera stands in the world. The first scene is travelled through, so it has its own
// place. Every later city is projected from the spot where the view comes to rest, so each one is seen
// straight through its own camera.
const FIRST_POS: [number, number, number] = [0, 12, 0];
const CITY_POS: [number, number, number] = [1, 26, -44];
// The view, as offsets from the first camera: where the crane ends over the first city, and where it rests for the others.
const CRANE = { x: 3, y: 8, z: -26 };
// How far the view travels across a city while it is held, per station of scroll: sideways, and toward it.
const TRACK = { x: 22, z: -18 };
const REST = { x: CITY_POS[0] - FIRST_POS[0], y: CITY_POS[1] - FIRST_POS[1], z: CITY_POS[2] - FIRST_POS[2] };

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);
const lerp = THREE.MathUtils.lerp;

export interface WorldStats {
  points: number;
  energy: number;
  /** Bytes of plate imagery fetched, and how long loading and decoding took. */
  plateBytes: number;
  loadMs: number;
  /** Which city is on screen: 0 is the first, 0.5 is halfway to the second. */
  city: number;
}

export interface World {
  /** `story` is the position in chapters: see scrollState.s. */
  update(dt: number, story: number, widthPx: number, heightPx: number): void;
  stats: WorldStats;
  dispose(): void;
}

interface LoadedPlate {
  def: SceneDef;
  meta: PlateMeta;
  plate: THREE.Texture;
  sky: THREE.Texture;
  mask: THREE.Texture;
  depth: Depth;
  /** The morning version of the plate and its sky, where the scene has one. */
  dawn: { plate: THREE.Texture; sky: THREE.Texture } | null;
}

/** Fetches a file, reporting how much of it has arrived when the server says how large it is. */
async function fetchBlob(url: string, onProgress?: (fraction: number) => void): Promise<Blob> {
  const res = await fetch(url);
  const total = Number(res.headers.get('content-length'));
  if (!onProgress || !res.body || !total) return res.blob();
  const reader = res.body.getReader();
  const parts: BlobPart[] = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    got += value.length;
    onProgress(got / total);
  }
  return new Blob(parts, { type: res.headers.get('content-type') ?? '' });
}

async function loadPlate(
  def: SceneDef,
  size: 'large' | 'small',
  gl: THREE.WebGLRenderer,
  count: (bytes: number) => void,
  onProgress?: (fraction: number) => void,
): Promise<LoadedPlate> {
  const dir = `/plates/${def.name}/`;
  const meta: PlateMeta = await (await fetch(`${dir}plate.json`)).json();
  const image = async (file: string, colour: boolean, track = false) => {
    const blob = await fetchBlob(dir + file, track ? onProgress : undefined);
    count(blob.size);
    // Decoded off the main thread, and flipped for GL here so the upload needs no extra pass.
    const bitmap = await createImageBitmap(blob, { imageOrientation: 'flipY' });
    const t = new THREE.Texture(bitmap);
    t.flipY = false;
    t.colorSpace = colour ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
    t.needsUpdate = true;
    return t;
  };
  // The depth pass is read back as numbers: it shapes geometry, it is never drawn.
  const readDepth = async (): Promise<Depth> => {
    const blob = await fetchBlob(`${dir}depth.png`);
    count(blob.size);
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(bitmap, 0, 0);
    const rgba = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
    const data = new Uint8ClampedArray(bitmap.width * bitmap.height);
    for (let i = 0; i < data.length; i++) data[i] = rgba[i * 4];
    bitmap.close();
    return { width: canvas.width, height: canvas.height, data };
  };
  const [plate, sky, mask, depth, dawn] = await Promise.all([
    image(`plate-${size}.avif`, true, true),
    image('sky.avif', true),
    image('mask.png', false),
    readDepth(),
    meta.dawn
      ? Promise.all([image(`plate-dawn-${size}.avif`, true), image('sky-dawn.avif', true)]).then(([p, k]) => ({ plate: p, sky: k }))
      : null,
  ]);
  return { def, meta, plate, sky, mask, depth, dawn };
}

export async function createWorld(
  gl: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  q: Quality,
): Promise<World> {
  const params = new URLSearchParams(location.search);
  const forceShow = params.get('show');
  // ?off=water,mist,fw,layers,smoke,mask switches parts off, to see what each one costs.
  const off = new Set((params.get('off') ?? '').split(','));
  const disposables: { dispose(): void }[] = [];

  const t0 = performance.now();
  const size = q.tier === 'low' ? 'small' : 'large';
  const stats: WorldStats = { points: pointCount(q), energy: 0, plateBytes: 0, loadMs: 0, city: 0 };
  let disposed = false;

  const root = new THREE.Group();
  scene.add(root);

  const director = new Director(q.shells);
  const sharedBase = {
    uTime: { value: 0 },
    uMix: { value: 0 },
    uDawn: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uExposure: { value: 1 },
    uFlash: { value: 0 },
    uLightPos: { value: director.lightPos },
    uLightCol: { value: director.lightCol },
    uLightDir: { value: director.lightDir },
  };

  const halfFloat = gl.extensions.has('EXT_color_buffer_half_float') || gl.extensions.has('EXT_color_buffer_float');
  const fwTarget = new THREE.WebGLRenderTarget(4, 4, {
    type: halfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType,
    depthBuffer: false,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });
  disposables.push(fwTarget);
  const viewProj = new THREE.Matrix4();
  const plane = new THREE.PlaneGeometry(1, 1);
  disposables.push(plane);
  // Without bloom the air glow has nothing to soften it, so it is held back.
  const haze = q.bloom ? 1 : 0.22;

  interface Built {
    def: SceneDef;
    meta: PlateMeta;
    origin: THREE.Vector3;
    tanH: number;
    /** Everything this city draws. Hidden cities cost nothing. */
    group: THREE.Group;
    /** 0 while this is the city being left, 1 while it is the one arriving. */
    side: { value: number };
    /** Water level, or the ground the fireworks rise from. */
    ground: number;
    /** Textures, materials and geometry this city holds on the GPU. */
    owned: { dispose(): void }[];
    /** The materials of its layers, which are confined to their side of the ring while two cities overlap. */
    mats: THREE.ShaderMaterial[];
  }
  const built: (Built | undefined)[] = [];

  const buildPlate = ({ def, meta, plate, sky, mask, depth, dawn }: LoadedPlate, index: number) => {
    const owned: { dispose(): void }[] = [plate, sky, mask];
    if (dawn) owned.push(dawn.plate, dawn.sky);
    const mats: THREE.ShaderMaterial[] = [];
    /** A layer material: tested against the ring's mask, never writing to it. */
    const confined = (m: THREE.ShaderMaterial) => {
      m.stencilFunc = THREE.EqualStencilFunc;
      m.stencilWriteMask = 0;
      owned.push(m);
      mats.push(m);
      return m;
    };
    const origin = new THREE.Vector3(...(index === 0 ? FIRST_POS : CITY_POS));
    const pitch = (def.pitch ?? meta.pitch) * DEG;
    const tanV = Math.tan((meta.vfov * DEG) / 2);
    const tanH = tanV * meta.aspect;
    const group = new THREE.Group();
    group.visible = false;
    root.add(group);
    const side = { value: 0 };
    const ground = meta.water ? origin.y - meta.camH : origin.y - 86;
    // Neighbouring cities alternate, so the arriving one always draws just after the one it replaces.
    const parity = index % 2;
    built[index] = { def, meta, origin, tanH, group, side, ground, owned, mats };

    // The camera the photograph was taken with. Every surface is textured by projecting the
    // photograph from here, so the picture is exact at rest and parallax is real once the view moves.
    const projector = new THREE.PerspectiveCamera(meta.vfov, meta.aspect, 1, 30000);
    projector.rotation.order = 'YXZ';
    projector.position.copy(origin);
    projector.rotation.x = pitch;
    projector.updateMatrixWorld(true);
    const shared = {
      ...sharedBase,
      uProjVP: { value: new THREE.Matrix4().multiplyMatrices(projector.projectionMatrix, projector.matrixWorldInverse) },
    };

    const layer = (map: THREE.Texture, opaque: boolean, response: number, hazeAmount: number, morning?: THREE.Texture) => {
      const m = new THREE.ShaderMaterial({
        vertexShader: PROJECT_VERT,
        fragmentShader: LAYER_FRAG,
        defines: morning ? { DAWN: 1 } : {},
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          ...shared,
          uMap: { value: map },
          ...(morning ? { uMapB: { value: morning } } : {}),
          uMask: { value: mask },
          uResponse: { value: response },
          uHaze: { value: hazeAmount },
          uSide: side,
          uOpaque: { value: opaque ? 1 : 0 },
          uGrade: { value: new THREE.Vector3(...def.grade) },
        },
      });
      return confined(m);
    };

    if (!off.has('layers')) {
      // Sky: far away, oversized, and clamped at its edges so the view can tilt above the photograph.
      const air = haze * (def.air ?? 1);
      const skyMesh = new THREE.Mesh(plane, layer(sky, true, 0, air, dawn?.sky));
      const far = 9000;
      skyMesh.scale.set(far * tanH * 6, far * tanV * 6, 1);
      skyMesh.position.set(origin.x, origin.y + Math.sin(pitch) * far, origin.z - Math.cos(pitch) * far);
      skyMesh.rotation.x = pitch;
      skyMesh.renderOrder = parity;
      skyMesh.frustumCulled = false;
      group.add(skyMesh);

      // The city: a relief. Every part of the photograph stands on the ray it was photographed along, at its
      // own distance, so the near wheel, bridge or tower moves against what is behind it as the view travels.
      // Seen from the photograph's own camera the picture is unchanged, whatever the depths are.
      const cols = q.tier === 'low' ? 128 : 192;
      const rows = Math.round(cols * 0.6);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      /** The ray through a point of the plate (v from the top), and its length along the ground. */
      const ray = (u: number, v: number) => {
        const yc = (0.5 - v) * 2 * tanV;
        const x = (u - 0.5) * 2 * tanH;
        const y = yc * cp + sp;
        const z = yc * sp - cp;
        return { x, y, z, flat: Math.hypot(x, z) };
      };
      /** Distance at a point of the plate, as a multiple of the distance at the foot of its column. */
      const ratioAt = (u: number, v: number) => {
        const fx = THREE.MathUtils.clamp(u, 0, 1) * (depth.width - 1);
        const fy = THREE.MathUtils.clamp(v, 0, 1) * (depth.height - 1);
        const x0 = Math.floor(fx);
        const y0 = Math.floor(fy);
        const x1 = Math.min(depth.width - 1, x0 + 1);
        const y1 = Math.min(depth.height - 1, y0 + 1);
        const at = (x: number, y: number) => depth.data[y * depth.width + x];
        const top = lerp(at(x0, y0), at(x1, y0), fx - x0);
        const bottom = lerp(at(x0, y1), at(x1, y1), fx - x0);
        return Math.pow(meta.depthRange, (lerp(top, bottom, fy - y0) / 255) * 2 - 1);
      };
      const pos = new Float32Array((cols + 1) * (rows + 1) * 3);
      const index: number[] = [];
      for (let i = 0; i <= cols; i++) {
        const u = -0.04 + (1.08 * i) / cols;
        const k = THREE.MathUtils.clamp(u, 0, 1) * (meta.edge.length - 1);
        const k0 = Math.floor(k);
        const foot = lerp(meta.edge[k0], meta.edge[Math.min(meta.edge.length - 1, k0 + 1)], k - k0);
        // Where there is water the foot of the column is on it, which fixes how far away the column stands.
        const f = ray(u, foot);
        const base = meta.water && f.y < -1e-3 ? Math.min(2000, (meta.camH * f.flat) / -f.y) : meta.bank[Math.round(k)];
        for (let j = 0; j <= rows; j++) {
          const v = foot * (1 - j / rows);
          const r = ray(u, v);
          const along = (base * (j === 0 && meta.water ? 1 : ratioAt(u, v))) / r.flat;
          pos.set([origin.x + r.x * along, origin.y + r.y * along, origin.z + r.z * along], (i * (rows + 1) + j) * 3);
          if (i < cols && j < rows) {
            const a = i * (rows + 1) + j;
            const b = a + rows + 1;
            index.push(a, b, a + 1, a + 1, b, b + 1);
          }
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setIndex(index);
      owned.push(geo);
      const city = new THREE.Mesh(geo, layer(plate, false, 1, air, dawn?.plate));
      city.renderOrder = 40 + parity;
      city.frustumCulled = false;
      group.add(city);
    }

    if (meta.water && !off.has('water')) {
      const m = new THREE.ShaderMaterial({
        vertexShader: PROJECT_VERT,
        fragmentShader: WATER_FRAG,
        defines: { TAPS: q.tier === 'high' ? 8 : q.tier === 'medium' ? 6 : 4 },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          ...shared,
          uMap: { value: plate },
          uFw: { value: fwTarget.texture },
          uViewProj: { value: viewProj },
          uFwZ: { value: origin.z - meta.show.dist },
          uSide: side,
        },
      });
      confined(m);
      const water = new THREE.Mesh(plane, m);
      water.rotation.x = -Math.PI / 2;
      water.scale.set(2600, 1400, 1);
      water.position.set(origin.x, ground, origin.z - 640);
      water.renderOrder = 30 + parity;
      water.frustumCulled = false;
      group.add(water);
    }

    if (def.mist && q.mist && !off.has('mist')) {
      const m = new THREE.ShaderMaterial({
        vertexShader: MIST_VERT,
        fragmentShader: MIST_FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: { ...sharedBase, uSide: side },
      });
      confined(m);
      const mist = new THREE.Mesh(plane, m);
      mist.scale.set(1600, 120, 1);
      mist.position.set(origin.x, ground + 56, origin.z - meta.show.dist - 20);
      mist.renderOrder = 45;
      mist.frustumCulled = false;
      group.add(mist);
    }
  };

  const loading = new Set<number>();
  /** Fetches and builds a city the first time it is needed. */
  const ensure = (index: number, onProgress?: (fraction: number) => void): Promise<void> => {
    if (index < 0 || index >= SCENES.length || built[index] || loading.has(index)) return Promise.resolve();
    loading.add(index);
    return loadPlate(SCENES[index], size, gl, (b) => (stats.plateBytes += b), onProgress).then((loaded) => {
      if (disposed) {
        loaded.plate.dispose();
        loaded.sky.dispose();
        loaded.mask.dispose();
        loaded.dawn?.plate.dispose();
        loaded.dawn?.sky.dispose();
        return;
      }
      buildPlate(loaded, index);
      loading.delete(index);
    });
  };
  /** Gives a city's memory back. Seven cities of photographs are far too much to hold at once. */
  const release = (index: number) => {
    const city = built[index];
    if (!city) return;
    root.remove(city.group);
    for (const x of city.owned) x.dispose();
    built[index] = undefined;
  };
  // The photograph is most of the wait, so its bytes drive most of the opening screen's progress.
  await ensure(0, (f) => progress.set(0.4 + 0.5 * f));
  stats.loadMs = Math.round(performance.now() - t0);
  // The next city is fetched once the first is built, so it never delays the opening frame.
  void ensure(1);

  // Fireworks: one draw call. Every star's whole flight is computed in the vertex shader.
  const per = q.stars * q.trail + q.comet;
  const count = q.shells * per;
  const dir = new Float32Array(count * 3);
  const meta4 = new Float32Array(count * 4);
  const rnd = new Float32Array(count);
  let n = 0;
  const put = (x: number, y: number, z: number, shell: number, trail: number, kind: number, seed: number, r: number) => {
    dir.set([x, y, z], n * 3);
    meta4.set([shell, trail, kind, seed], n * 4);
    rnd[n] = r;
    n++;
  };
  for (let s = 0; s < q.shells; s++) {
    for (let j = 0; j < q.stars; j++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(1 - u * u);
      const seed = Math.random();
      const r = Math.random();
      for (let k = 0; k < q.trail; k++) put(rr * Math.cos(th), u, rr * Math.sin(th), s, k / (q.trail - 1), 0, seed, r);
    }
    for (let c = 0; c < q.comet; c++) put(0, 1, 0, s, c / (q.comet - 1), 1, Math.random(), Math.random());
  }
  const fwGeo = new THREE.BufferGeometry();
  fwGeo.setAttribute('position', new THREE.BufferAttribute(dir, 3));
  fwGeo.setAttribute('aMeta', new THREE.BufferAttribute(meta4, 4));
  fwGeo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));
  const fwMat = new THREE.ShaderMaterial({
    vertexShader: FW_VERT,
    fragmentShader: FW_FRAG,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime: sharedBase.uTime,
      uScale: { value: 1000 },
      uMaxPx: { value: 48 },
      // Without bloom the sprites carry their own glow, so they are drawn a little hotter.
      uGain: { value: q.bloom ? 1.5 : 0.6 },
      uOrigin: { value: director.origin },
      uColA: { value: director.colA },
      uColB: { value: director.colB },
      uPar: { value: director.par },
      uLaunch: { value: director.launch },
      uBase: { value: director.base },
    },
  });
  const fireworks = new THREE.Points(fwGeo, fwMat);
  fireworks.frustumCulled = false;
  // Drawn before the city sheets, so bursts rise from behind the skyline.
  fireworks.renderOrder = 20;
  fireworks.layers.enable(1);
  fireworks.visible = !off.has('fw');
  root.add(fireworks);
  disposables.push(fwGeo, fwMat);

  // Smoke: one soft sprite where each recent shell burst. It is paid for in filled pixels, so only the
  // high tier draws it.
  let smokeMat: THREE.ShaderMaterial | null = null;
  if (q.tier === 'high' && !off.has('smoke')) {
    const idx = new Float32Array(MAX_SMOKE * 3);
    for (let i = 0; i < MAX_SMOKE; i++) idx.set([i, Math.random(), 0], i * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(idx, 3));
    smokeMat = new THREE.ShaderMaterial({
      vertexShader: SMOKE_VERT,
      fragmentShader: SMOKE_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: { ...sharedBase, uScale: { value: 1000 }, uMaxPx: { value: 256 }, uSmoke: { value: director.smoke } },
    });
    const smoke = new THREE.Points(geo, smokeMat);
    smoke.frustumCulled = false;
    // Behind the stars and the skyline: it hangs in the air the next shells burst in front of.
    smoke.renderOrder = 19;
    root.add(smoke);
    disposables.push(geo, smokeMat);
  }

  // The ring's mask: one triangle over the whole frame, drawn twice before anything else.
  const maskGeo = new THREE.BufferGeometry();
  maskGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  disposables.push(maskGeo);
  const masks = [ARRIVING_BIT, LEAVING_BIT].map((bit, i) => {
    const m = new THREE.ShaderMaterial({
      vertexShader: MASK_VERT,
      fragmentShader: MASK_FRAG,
      colorWrite: false,
      depthTest: false,
      depthWrite: false,
      stencilWrite: true,
      stencilRef: bit,
      stencilWriteMask: bit,
      stencilFunc: THREE.AlwaysStencilFunc,
      stencilZPass: THREE.ReplaceStencilOp,
      uniforms: { ...sharedBase, uSide: { value: bit === ARRIVING_BIT ? 1 : 0 } },
    });
    disposables.push(m);
    const mesh = new THREE.Mesh(maskGeo, m);
    mesh.frustumCulled = false;
    mesh.renderOrder = -10 + i;
    mesh.visible = false;
    // The first pass starts from a clean mask, whatever the frame before left behind.
    if (i === 0) mesh.onBeforeRender = (renderer) => renderer.clear(false, false, true);
    root.add(mesh);
    return mesh;
  });

  camera.rotation.order = 'YXZ';
  camera.near = 1;
  camera.far = 30000;

  // The opening photograph sets the frame for the whole page, so its numbers are kept even after it is released.
  const opening = built[0]!;
  const frameOf = {
    tanH: opening.tanH,
    vfov: opening.meta.vfov,
    pitch: opening.def.pitch ?? opening.meta.pitch,
    keepTop: opening.def.keepTop,
    origin: opening.origin.clone(),
  };
  const lastCity = SCENES.length - 1;
  let time = 0;
  const lean = { x: 0, y: 0 };
  let wasStruck = false;
  let strikeTime = -100;
  let lastW = 0;
  let lastH = 0;
  /** The city last drawn as the one being left. It stays on screen if the next one is still loading. */
  let shown = 0;

  function update(dt: number, story: number, widthPx: number, heightPx: number) {
    time += Math.min(dt, 0.1);
    const aspect = widthPx / heightPx;
    const portrait = aspect < 0.8;

    // Which cities are on screen: the one being left, and the one arriving.
    const c = THREE.MathUtils.clamp(story - CITIES_AT, 0, lastCity);
    // Past the last scene the story still moves: there, it is the night turning to morning.
    const beyond = Math.max(0, story - CITIES_AT - lastCity);
    const from = Math.min(Math.floor(c), Math.max(0, lastCity - 1));
    const to = Math.min(from + 1, lastCity);
    // Fetch the cities around the visitor, and give back the ones left far behind or far ahead.
    void ensure(from);
    if (story > CITIES_AT - 1) void ensure(to);
    if (c > from + 0.3) void ensure(to + 1);
    if (built[from]) shown = from;
    for (let i = 0; i < built.length; i++) {
      if (built[i] && i !== shown && (i < from - 1 || i > to + 1)) release(i);
    }
    const A = built[shown]!;
    const B = shown === from && to !== from ? built[to] : undefined;
    // Each city holds, then gives way. Until the next one has arrived, the current one simply stays.
    const mix = B ? smooth(0.25, 0.75, c - from) : 0;
    stats.city = shown + mix;

    // Field of view: show the photograph's full width on a wide screen, and never more than it holds.
    const photoH = 2 * Math.atan(frameOf.tanH);
    const photoV = frameOf.vfov * DEG;
    let vfov = portrait ? 40 * DEG : 2 * Math.atan(Math.tan((photoH * 0.97) / 2) / aspect);
    if (!portrait) vfov = Math.min(vfov, photoV - 1.5 * DEG);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    // At rest the view sits on the bottom edge of the photograph, so as much river as possible is in frame.
    const lowest = frameOf.pitch - (photoV - vfov) / DEG / 2 + 0.3;
    // A wide screen is too shallow to hold both the river and the top of the subject, so the view tilts up
    // to meet it, but never gives up more than a little of the water.
    const restPitch = Math.max(lowest, Math.min(frameOf.keepTop - vfov / DEG / 2, lowest + 2.5));

    // One continuous move: the crane over the first city, then across to where the view rests for the others.
    const rise = smooth(0.3, 2, story);
    const cross = shown === 0 ? mix : 1;
    const px = lerp(CRANE.x * rise, REST.x, cross);
    const py = lerp(CRANE.y * rise, REST.y, cross);
    const pz = lerp(CRANE.z * rise, REST.z, cross);
    const next = B ? to : shown;
    const pitchA = shown === 0 ? lerp(restPitch, SCENES[0].viewPitch, rise) : SCENES[shown].viewPitch;
    const yawA = shown === 0 ? SCENES[0].viewYaw * rise : SCENES[shown].viewYaw;
    const viewPitch = lerp(pitchA, SCENES[next].viewPitch, mix);
    // A phone sees a narrow slice, so it turns to keep each city's subject in frame.
    const aim = portrait ? lerp(SCENES[shown].portraitAim, SCENES[next].portraitAim, mix) : 0;
    const turn = (lerp(yawA, SCENES[next].viewYaw, mix) + aim) * DEG;
    camera.fov = vfov / DEG;
    camera.aspect = aspect;
    // The frame is never frozen: a slow sway, and on a desktop the view leans a little toward the pointer,
    // which is what makes the layers read as depth. Both stay well inside the photograph's edges.
    const ease = Math.min(1, dt * 2.5);
    lean.x += (pointerState.x - lean.x) * ease;
    lean.y += (pointerState.y - lean.y) * ease;
    // While a city is held the view tracks slowly across it and pushes in a little, like a camera on a rail;
    // it slides back under cover of the ring as the next city opens. `travel` is 0 with a city centred.
    // Held to half a station either way: on a long jump the city on screen waits for the next one to load,
    // and must not be carried along by the scroll in the meantime.
    const travel = THREE.MathUtils.clamp(c - shown - mix * (next - shown) + beyond * 0.3, -0.5, 0.5);
    const driftX = Math.sin(time * 0.21) * 0.7 + Math.sin(time * 0.13 + 1.7) * 0.5 + lean.x * 2.2 + travel * TRACK.x;
    const driftY = Math.sin(time * 0.17 + 0.6) * 0.4 - lean.y * 1.0;
    // The view turns as it moves so the middle distance holds still: what is nearer slides one way and what
    // is farther the other, which is what reads as depth.
    const pivot = (B && mix >= 0.5 ? B : A).meta.show.dist;
    const yaw = turn + Math.atan(driftX / pivot);
    camera.position.set(frameOf.origin.x + px + driftX, frameOf.origin.y + py + driftY, frameOf.origin.z + pz + travel * TRACK.z);
    camera.rotation.set((viewPitch - lean.y * 0.08) * DEG, yaw, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    // Launch the show where the city on screen has its sky, limited to what this screen can see.
    const sc = B && mix >= 0.5 ? B : A;
    const azOf = (u: number) => Math.atan((u - 0.5) * 2 * sc.tanH);
    const lo = Math.max(azOf(sc.meta.show.u[0]), -yaw - hfov * 0.42);
    const hi = Math.min(azOf(sc.meta.show.u[1]), -yaw + hfov * 0.42);
    const d = sc.meta.show.dist;
    const frame = {
      xMin: sc.origin.x + Math.tan(Math.min(lo, hi)) * d,
      xMax: sc.origin.x + Math.tan(Math.max(lo, hi)) * d,
      z: sc.origin.z - d,
      base: sc.ground,
      yMin: sc.ground + sc.meta.show.height[0],
      yMax: sc.ground + sc.meta.show.height[1],
    };

    // Nothing is fired before the show begins. At that moment an opening salvo bursts at once.
    const struck = story >= MIDNIGHT_AT || forceShow !== null;
    if (struck && !wasStruck) {
      director.strike(time, frame, q.tier === 'high' ? 6 : 4);
      strikeTime = time;
    }
    wasStruck = struck;
    // The show peaks as the first chapter of it ends, then settles for the cities.
    const finale = smooth(1.7, 1.95, story) * (1 - smooth(2.1, 2.4, story));
    let intensity = struck ? 0.66 + finale * 0.45 : 0;
    if (forceShow !== null) intensity = Number(forceShow) || 1;
    // The last shells go up as the sky begins to lighten, and then it is over.
    intensity *= 1 - smooth(0.1, 0.6, beyond);
    director.update(time, intensity, frame, camera.position);
    stats.energy = director.energy();

    // While two cities overlap, each is confined to its side of the ring.
    const overlapping = mix > 0.001 && mix < 0.999;
    const confine = overlapping && !off.has('mask');
    for (const mask of masks) mask.visible = confine;
    for (const city of built) {
      if (!city) continue;
      const arriving = city === B;
      city.side.value = arriving ? 1 : 0;
      city.group.visible = arriving ? mix > 0.001 : city === A && mix < 0.999;
      for (const m of city.mats) {
        m.stencilWrite = confine;
        m.stencilRef = m.stencilFuncMask = arriving ? ARRIVING_BIT : LEAVING_BIT;
      }
    }

    sharedBase.uTime.value = time;
    sharedBase.uMix.value = mix;
    // The night holds for a moment after the scene returns, then lightens for the rest of the chapter.
    sharedBase.uDawn.value = smooth(0.2, 1.15, beyond);
    const flash = Math.sin(Math.PI * mix) ** 1.5;
    // The whole frame lifts for an instant when the show begins, and a little as one city opens onto the next.
    sharedBase.uExposure.value = 1 + 0.16 * flash + 0.3 * Math.exp(-(time - strikeTime) * 3.5);
    sharedBase.uFlash.value = flash;
    sharedBase.uRes.value.set(widthPx, heightPx);
    fwMat.uniforms.uScale.value = heightPx / (2 * Math.tan(vfov / 2));
    fwMat.uniforms.uMaxPx.value = Math.max(24, heightPx * 0.04);
    if (smokeMat) {
      smokeMat.uniforms.uScale.value = fwMat.uniforms.uScale.value;
      smokeMat.uniforms.uMaxPx.value = Math.min(512, heightPx * 0.45);
    }

    if (widthPx !== lastW || heightPx !== lastH) {
      lastW = widthPx;
      lastH = heightPx;
      fwTarget.setSize(Math.max(2, Math.round(widthPx * q.reflectionScale)), Math.max(2, Math.round(heightPx * q.reflectionScale)));
    }

    // Fireworks alone, into a small buffer the water samples for its reflection.
    const prev = gl.getRenderTarget();
    camera.layers.set(1);
    gl.setRenderTarget(fwTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(prev);
    camera.layers.set(0);
  }

  return {
    update,
    stats,
    dispose() {
      disposed = true;
      scene.remove(root);
      for (let i = 0; i < built.length; i++) release(i);
      for (const x of disposables) x.dispose();
    },
  };
}
