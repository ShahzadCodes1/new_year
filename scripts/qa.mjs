// The checks that are not about layout: what search engines and assistive technology are given.
//   node scripts/qa.mjs [baseUrl] [--head] [--only=/london/,/breaks/]
//   --head skips the browser and checks the page heads only; --only limits the accessibility run to some pages.
//
// For every page reachable from the home page, plus the style guide:
//   head           title, description, canonical address, language, one h1, sharing tags, structured data
//   accessibility  axe-core's WCAG 2.2 A and AA rules and its best-practice rules, at phone and desktop width
// The home page is checked twice: with the scene, and as the still version (?mode=still).
// Run it against the production build (npm run build && npm run start).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './cdp.mjs';

const base = (process.argv.slice(2).find((a) => a.startsWith('http')) ?? 'http://localhost:3000').replace(/\/$/, '');
const headOnly = process.argv.includes('--head');
const SITE = 'https://newyear.guide';

// ---- find the pages
const html = new Map();
const queue = ['/', '/styleguide/'];
while (queue.length) {
  const path = queue.shift();
  if (html.has(path)) continue;
  const res = await fetch(base + path, { redirect: 'manual' });
  if (!res.ok) continue;
  const text = await res.text();
  html.set(path, text);
  for (const m of text.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)/g)) if (!html.has(m[1]) && !queue.includes(m[1])) queue.push(m[1]);
}
const pages = [...html.keys()].sort();
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');
console.log(`${pages.length} pages\n`);

// ---- heads
const pick = (text, re) => (text.match(re) ?? [])[1]?.replace(/&amp;/g, '&').replace(/&#x27;/g, '’').replace(/&quot;/g, '"');
const problems = [];
const notes = [];
const seen = { title: new Map(), description: new Map() };
for (const path of pages) {
  const text = html.get(path);
  const title = pick(text, /<title>([^<]*)<\/title>/);
  const description = pick(text, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(text, /<link rel="canonical" href="([^"]*)"/);
  const lang = pick(text, /<html[^>]*\blang="([^"]*)"/);
  const h1 = (text.match(/<h1[\s>]/g) ?? []).length;
  const flag = (what) => problems.push(`${path}: ${what}`);

  if (!title) flag('no title');
  if (!description) flag('no description');
  else if (description.length < 50 || description.length > 165) notes.push(`${path}: description is ${description.length} characters`);
  if (canonical !== SITE + path) flag(`canonical is ${canonical ?? 'missing'}, expected ${SITE + path}`);
  if (lang !== 'en-GB') flag(`language is ${lang ?? 'missing'}`);
  if (h1 !== 1) flag(`${h1} h1 headings`);
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:site_name']) if (!text.includes(`property="${tag}"`)) flag(`no ${tag}`);
  if (!text.includes('property="og:image"')) notes.push(`${path}: no sharing image (og:image)`);
  for (const m of text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      flag('structured data does not parse');
    }
  }
  for (const [kind, value] of [['title', title], ['description', description]]) {
    if (!value) continue;
    if (seen[kind].has(value)) flag(`same ${kind} as ${seen[kind].get(value)}`);
    else seen[kind].set(value, path);
  }
  if (title && title.length > 70) notes.push(`${path}: title is ${title.length} characters`);
}
console.log(problems.length ? ['HEAD: problems', ...problems.map((p) => `  ${p}`)].join('\n') : 'HEAD: every page has a title, a description, its own canonical address, a language, one h1 and sharing tags');
const grouped = new Map();
for (const n of notes) {
  const key = n.replace(/^[^:]+: /, '').replace(/\d+/g, 'N');
  grouped.set(key, (grouped.get(key) ?? 0) + 1);
}
if (grouped.size) console.log(['HEAD: notes', ...[...grouped].map(([k, n]) => `  ${n} pages: ${k}`)].join('\n'));
const robots = pick(html.get('/'), /<meta name="robots" content="([^"]*)"/);
console.log(`HEAD: robots on the home page: ${robots ?? 'none'}\n`);

if (headOnly) process.exit(problems.length ? 1 : 0);

// ---- accessibility
const axe = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');
const run = `axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }).then((r) => JSON.stringify(
  r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, count: v.nodes.length,
    nodes: [...new Map(v.nodes.map((n) => { const why = (n.any.concat(n.all, n.none).map((c) => c.message)[0] ?? '').replace(/, font size.*$/, ')').slice(0, 150); return [v.id === 'color-contrast' ? why : n.target.join(' '), why + ' e.g. ' + n.target.join(' ').split(' > ').slice(-2).join(' > ')]; })).values()] }))))`;

const views = [
  ['phone', { width: 390, height: 844 }],
  ['desktop', { width: 1440, height: 900 }],
];
// The home page in both of its forms; every other page as it is.
const targets = pages.filter((path) => !only || only.includes(path)).flatMap((path) => (path === '/' ? [['/', '?loader=0', 'scene'], ['/', '?mode=still', 'still']] : [[path, '', '']]));
const found = new Map();
const b = await launch();
try {
  for (const [path, query, form] of targets) {
    for (const [view, size] of views) {
      await b.open(`${base}${path}${query}`, size, form === 'scene' ? 'typeof window.__ready === "number"' : 'document.readyState === "complete"');
      // Let entrances finish: text that is still fading in would be measured as low contrast.
      await b.sleep(form === 'scene' ? 2500 : 1500);
      await b.evaluate(axe);
      for (const v of JSON.parse(await b.evaluate(run))) {
        const entry = found.get(v.id) ?? { impact: v.impact, help: v.help, where: [], nodes: new Set() };
        entry.where.push(`${path}${form ? ` (${form})` : ''} ${view} ×${v.count}`);
        v.nodes.forEach((n) => entry.nodes.add(n));
        found.set(v.id, entry);
      }
    }
  }
} finally {
  await b.close();
}

if (!found.size) console.log(`ACCESSIBILITY: no violations on ${targets.length} pages at ${views.length} widths`);
else {
  console.log(`ACCESSIBILITY: ${found.size} rules violated`);
  for (const [id, v] of found) {
    console.log(`\n  ${id} (${v.impact}): ${v.help}`);
    console.log(`    on ${v.where.length} page views: ${v.where.slice(0, 6).join('; ')}${v.where.length > 6 ? '; …' : ''}`);
    [...new Map([...v.nodes].map((n) => [n.replace(/ e\.g\. .*$/, ''), n])).values()].slice(0, 14).forEach((n) => console.log(`    ${n}`));
  }
}
const unique = [...new Set(b.errors)];
console.log(unique.length ? ['\nconsole errors:', ...unique.map((e) => `  ${e}`)].join('\n') : '\nconsole errors: none');
process.exitCode = problems.length || found.size ? 1 : 0;
