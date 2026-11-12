// Measures the prototype in a headless browser on the real GPU.
//   node scripts/bench.mjs [baseUrl] [--frames]   (--frames measures frame cost only)
// Frame cost is measured against any server. Loading figures are only meaningful against the
// production build (npm run build && npm run start).
import { launch } from './cdp.mjs';

const base = process.argv.slice(2).find((a) => a.startsWith('http')) ?? 'http://localhost:3000/';
const b = await launch();

const frames = [
  // [label, query, viewport]
  ['desktop 1920x1080, high tier, bloom', 'tier=high&show=1&bloom=1&dpr=1', { width: 1920, height: 1080 }],
  ['laptop 1440x900, medium tier, bloom', 'tier=medium&show=1&bloom=1&dpr=1', { width: 1440, height: 900 }],
  ['phone 390x844 at 3x (drawn at 1.5x), low tier', 'tier=low&show=1', { width: 390, height: 844, dsf: 3 }],
];

const loads = [
  // [label, viewport, throttle]
  ['desktop, unthrottled', { width: 1440, height: 900 }, null],
  ['phone, 9 Mbps / 165 ms latency / 4x CPU slowdown', { width: 390, height: 844, dsf: 3 }, { down: 1_125_000, up: 187_500, latency: 165, cpu: 4 }],
];

try {
  const gpu = await b.evaluate(`(() => { const g = document.createElement('canvas').getContext('webgl2'); const e = g && g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unknown'; })()`);
  console.log(`GPU: ${gpu}\n\nFrame cost with the show running (rendered back to back, waiting for the GPU):`);
  for (const [label, query, viewport] of frames) {
    if (!(await b.open(`${base}?${query}&hud=0`, viewport))) {
      console.log(`  ${label}: scene did not start`);
      continue;
    }
    await b.sleep(4000);
    const ms = await b.evaluate('Math.min(window.__bench(40), window.__bench(40))');
    const s = JSON.parse(await b.evaluate('JSON.stringify(window.__stage)'));
    console.log(`  ${label}: ${ms} ms (${Math.round(1000 / ms)} fps)  buffer ${s.size}  points ${s.points}  draws ${s.calls}`);
  }

  if (process.argv.includes('--frames')) throw 'frames-only';
  console.log('\nLoading (cache disabled):');
  await b.send('Network.setCacheDisabled', { cacheDisabled: true });
  for (const [label, viewport, t] of loads) {
    await b.send('Network.emulateNetworkConditions', t
      ? { offline: false, latency: t.latency, downloadThroughput: t.down, uploadThroughput: t.up }
      : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    await b.send('Emulation.setCPUThrottlingRate', { rate: t?.cpu ?? 1 });
    // Three loads, each from a blank page with nothing else running, reported as the median.
    const runs = [];
    for (let i = 0; i < 3; i++) {
      await b.send('Page.navigate', { url: 'about:blank' });
      await b.sleep(1500);
      const ok = await b.open(`${base}?hud=0`, viewport, 'typeof window.__ready === "number"');
      await b.sleep(1500);
      const m = JSON.parse(await b.evaluate(`(async () => {
        const lcp = await new Promise((r) => { new PerformanceObserver((l) => r(l.getEntries().at(-1).startTime)).observe({ type: 'largest-contentful-paint', buffered: true }); setTimeout(() => r(-1), 3000); });
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? -1;
        const res = performance.getEntriesByType('resource');
        const kb = (f) => Math.round(res.filter(f).reduce((a, e) => a + (e.encodedBodySize || 0), 0) / 1024);
        return JSON.stringify({
          fcp: Math.round(fcp), lcp: Math.round(lcp), ready: window.__ready ?? -1,
          js: kb((e) => /\\.js(\\?|$)/.test(e.name)), img: kb((e) => /\\.(avif|webp|png|jpe?g)(\\?|$)/.test(e.name)), font: kb((e) => /\\.woff2?(\\?|$)/.test(e.name)),
          total: kb(() => true), requests: res.length,
        });
      })()`));
      runs.push({ ...m, ok });
    }
    const med = (k) => runs.map((r) => r[k]).sort((x, y) => x - y)[1];
    const m = runs[0];
    console.log(`  ${label}
    first paint ${med('fcp')} ms, largest paint ${med('lcp')} ms, 3D scene ready ${med('ready')} ms  (ready, all runs: ${runs.map((r) => r.ready).join(', ')})
    fetched: ${m.total} KB in ${m.requests} requests (scripts ${m.js}, images ${m.img}, fonts ${m.font})`);
  }
} catch (e) {
  if (e !== 'frames-only') throw e;
} finally {
  await b.close();
}
