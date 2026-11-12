// Photographs the prototype in a headless browser.
//   node scripts/shots.mjs <outDir> [baseUrl]   review captures at fixed scroll stops, plus the still-mode page
//   node scripts/shots.mjs --stills [baseUrl]   regenerates public/stills/ from the engine itself
//   node scripts/shots.mjs --audit <outDir> [baseUrl]   every page at every width: overflow, console errors, captures
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './cdp.mjs';

const stills = process.argv[2] === '--stills';
const audit = process.argv[2] === '--audit';
const out = stills ? join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'stills') : audit ? process.argv[3] : process.argv[2];
if (!out) throw new Error('Usage: node scripts/shots.mjs <outDir> | --stills | --audit <outDir> [baseUrl]');
const base = process.argv.slice(2).find((a) => a.startsWith('http')) ?? 'http://localhost:3000/';
// The home page, the style guide, and every reading page.
const PAGES = ['', 'styleguide/', 'cities/', 'celebrations/', 'practical/', 'whats-open/', 'transport/', 'say-it/', 'london/', 'london/fireworks/', 'manchester/', 'manchester/fireworks/', 'birmingham/', 'liverpool/', 'newcastle/', 'glasgow/', 'hogmanay/edinburgh/', 'breaks/', 'breaks/scotland/', 'breaks/peak-district/', 'breaks/spa/', 'breaks/couples/', 'breaks/cruises/', 'chinese-new-year/', 'hogmanay/', 'nowruz/', 'songkran/', 'islamic-new-year/', 'rosh-hashanah/', 'diwali/', 'bank-holidays/', 'about/', 'contact/', 'privacy/', 'disclosure/'];
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];
mkdirSync(out, { recursive: true });

const b = await launch();
const scrollTo = (p) => b.evaluate(`window.scrollTo(0, ${p} * (document.documentElement.scrollHeight - innerHeight))`);
// Scrolls to a point inside a chapter: 0 is where it takes the screen, 1 is where it lets go.
const scrollInto = (selector, f) =>
  b.evaluate(`(() => { const el = document.querySelector('${selector}'); const top = el.getBoundingClientRect().top + scrollY; window.scrollTo(0, top + ${f} * Math.max(0, el.offsetHeight - innerHeight)); })()`);

try {
  if (audit) {
    let problems = 0;
    for (const page of PAGES) {
      for (const width of WIDTHS) {
        const height = width < 768 ? 720 : width < 1200 ? 1024 : 900;
        // On a page with a scene, wait for it to be built and faded in before looking.
        // The address carries the width, so a page still on screen from the last round cannot answer for this one.
        const mine = `location.pathname === "/${page}" && location.search.includes("w=${width}") && innerWidth === ${width}`;
        await b.open(`${base}${page}?loader=0&w=${width}`, { width, height }, `${mine} && ${page === '' ? 'typeof window.__ready === "number"' : 'document.readyState === "complete"'}`);
        // Long enough for a page's arrival to finish. A box measured while it is still moving can come back a
        // hair under its true height, which is also why the 44px test allows half a pixel.
        await b.sleep(page === '' ? 1800 : 1000);
        const r = JSON.parse(await b.evaluate(`JSON.stringify({ over: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll('h1').length, small: [...document.querySelectorAll('a, button')].filter((el) => { const b = (el.closest('.g-card') ?? el).getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.height < 43.5 && !el.closest('p') && !el.classList.contains('sr-only'); }).length })`));
        const bad = r.over > 0 || r.h1 !== 1 || r.small > 0;
        if (bad) problems++;
        console.log(`${bad ? 'CHECK' : 'ok   '} /${page} at ${width}: sideways overflow ${Math.max(0, r.over)}px, h1 count ${r.h1}, targets under 44px ${r.small}`);
        await b.shot(join(out, `${page ? page.replace(/\W/g, '') : 'home'}-${width}.jpg`), { fullPage: page !== '', quality: 72 });
      }
    }
    const unique = [...new Set(b.errors)];
    console.log(unique.length ? ['console errors:', ...unique.map((e) => `  ${e}`)].join('\n') : 'console errors: none');
    console.log(problems ? `${problems} page/width combinations need a look` : 'all page/width combinations pass');
  } else if (stills) {
    // The stills are the engine's own frames, so the still mode and the opening poster match the live scene.
    const views = [
      ['desktop', { width: 1600, height: 900 }, 'tier=high&bloom=1'],
      ['phone', { width: 390, height: 844, dsf: 2 }, 'tier=medium&bloom=1'],
    ];
    const base2 = [['hero', '#top', 0, 1200], ['midnight', '#midnight', 0.6, 6500]];
    for (const [view, viewport, query] of views) {
      await b.open(`${base}?${query}&dpr=1&hud=0&capture=1`, viewport, 'typeof window.__ready === "number"');
      await b.sleep(2500);
      // One still per city on the page, each photographed at its own station.
      const slugs = JSON.parse(await b.evaluate(`JSON.stringify([...document.querySelectorAll('.city')].map((el) => el.id.replace('cities-', '')))`));
      const frames = [...base2, ...slugs.map((slug, i) => [`city-${slug}`, '#cities', slugs.length > 1 ? i / (slugs.length - 1) : 0, 7000]), ['dawn', '#morning', 0.95, 7000]];
      for (const [name, selector, f, wait] of frames) {
        await scrollInto(selector, f);
        await b.sleep(wait);
        const file = join(out, `${name}-${view}.jpg`);
        await b.shot(file, { quality: 80 });
        console.log(file);
      }
    }
  } else {
    const views = [
      ['desktop', { width: 1440, height: 900 }, 'tier=medium&bloom=1'],
      ['phone', { width: 390, height: 844, dsf: 2 }, 'tier=low&bloom=0'],
    ];
    for (const [view, viewport, query] of views) {
      await b.open(`${base}?${query}&dpr=1&hud=0`, viewport, 'typeof window.__ready === "number"');
      await b.sleep(2500);
      // The tour: every chapter at the points that matter. --stops=0.2,0.26 photographs page fractions instead.
      const custom = process.argv.find((a) => a.startsWith('--stops='));
      const n = Number(await b.evaluate(`document.querySelectorAll('.city').length`));
      const tour = [['hero', '#top', 0], ['line', '#midnight', 0.1], ['show', '#midnight', 0.6]];
      for (let i = 0; i < n; i++) tour.push([`city-${i + 1}`, '#cities', n > 1 ? i / (n - 1) : 0]);
      tour.push(['ways', '#ways', 0], ['valley-night', '#morning', 0.04], ['valley-turning', '#morning', 0.5], ['valley-dawn', '#morning', 0.95], ['breaks', '#breaks', 0], ['celebrations', '#celebrations', 0.34], ['practical', '#practical', 0], ['close', '#close', 0]);
      if (n > 1) tour.push(['between', '#cities', 0.5 / (n - 1)]);
      if (custom) {
        for (const p of custom.slice(8).split(',').map(Number)) {
          await scrollTo(p);
          await b.sleep(4200);
          await b.shot(join(out, `${view}-${String(Math.round(p * 100)).padStart(3, '0')}.jpg`));
        }
      } else {
        for (const [name, selector, f] of tour) {
          await scrollInto(selector, f);
          await b.sleep(name === 'hero' ? 1500 : 5500);
          await b.shot(join(out, `${view}-${name}.jpg`));
        }
      }
    }
    await b.open(`${base}?mode=still`, { width: 1440, height: 900 }, 'document.images.length > 0');
    // Walk down the page so every lazy still comes in.
    for (let i = 1; i <= 12; i++) {
      await scrollTo(i / 12);
      await b.sleep(500);
    }
    await scrollTo(0);
    await b.sleep(600);
    await b.shot(join(out, 'still-mode.jpg'), { fullPage: true });
    console.log(`captures written to ${out}`);
  }
} finally {
  await b.close();
}
