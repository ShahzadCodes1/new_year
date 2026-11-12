// Follows every internal link on the running site, starting from the home page, and reports any that does
// not lead to a page or points at a section that is not there.
//   node scripts/links.mjs [baseUrl]
const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
// The style guide is linked from nowhere, so it is named here.
const queue = ['/', '/styleguide/'];
const pages = new Map();
const broken = [];
let links = 0;

const load = async (path) => {
  if (!pages.has(path)) {
    const res = await fetch(base + path, { redirect: 'manual' });
    pages.set(path, { status: res.status, html: res.ok ? await res.text() : '' });
    if (res.ok) queue.push(path);
  }
  return pages.get(path);
};

for (const first of [...queue]) await load(first);
const crawled = new Set();
while (queue.length) {
  const page = queue.shift();
  if (crawled.has(page)) continue;
  crawled.add(page);
  const { html } = pages.get(page);
  const hrefs = new Set([...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&')));
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    links++;
    const [path, hash] = href.split('#');
    const target = await load(path || page);
    if (target.status !== 200) broken.push(`${page} -> ${href} (${target.status})`);
    else if (hash && !target.html.includes(`id="${hash}"`)) broken.push(`${page} -> ${href} (no section with that id)`);
  }
}

console.log(`${links} internal links on ${crawled.size} pages`);
console.log(broken.length ? ['broken:', ...broken.map((b) => `  ${b}`)].join('\n') : 'every internal link leads to a page, and every section it points at exists');
process.exitCode = broken.length ? 1 : 0;
