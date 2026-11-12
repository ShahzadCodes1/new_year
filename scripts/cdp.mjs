// A minimal headless-browser driver for the measurement scripts: real GPU, no extra dependencies.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch() {
  const exe = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ]
    .filter(Boolean)
    .find((p) => existsSync(p));
  if (!exe) throw new Error('No Chrome or Edge found. Set CHROME_PATH.');

  const profile = mkdtempSync(join(tmpdir(), 'nyg-cdp-'));
  const chrome = spawn(exe, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--hide-scrollbars',
    '--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=d3d11',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    'about:blank',
  ]);
  const port = await new Promise((resolve, reject) => {
    let buf = '';
    chrome.stderr.on('data', (d) => {
      buf += d;
      const m = buf.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
      if (m) resolve(Number(m[1]));
    });
    setTimeout(() => reject(new Error('browser did not start')), 30000);
  });
  const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0;
  const pending = new Map();
  /** Uncaught exceptions and console errors seen since the browser started. */
  const errors = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(`${m.params.entry.text} ${m.params.entry.url ?? ''}`);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      pending.set(++id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? 'evaluation failed');
    return r.result?.result?.value;
  };
  await send('Page.enable');
  await send('Network.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  return {
    send,
    evaluate,
    sleep,
    errors,
    /** Sets the viewport, loads the URL and waits until `ready` (a JS expression) is truthy. */
    async open(url, { width, height, dsf = 1 }, ready = '!!window.__stage') {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dsf, mobile: dsf > 1 });
      await send('Page.navigate', { url });
      for (let i = 0; i < 120; i++) {
        await sleep(250);
        // The previous document can still answer for a moment after navigation starts.
        if (await evaluate(`location.href !== 'about:blank' && performance.now() < 60000 && (${ready})`).catch(() => false)) return true;
      }
      return false;
    },
    async shot(file, { fullPage = false, quality = 82 } = {}) {
      const { writeFileSync } = await import('node:fs');
      // A capture can fail when the machine is short of memory. Try once more, then carry on without it.
      for (let attempt = 0; attempt < 2; attempt++) {
        const r = await send('Page.captureScreenshot', { format: 'jpeg', quality, captureBeyondViewport: fullPage });
        if (r.result?.data) return writeFileSync(file, Buffer.from(r.result.data, 'base64'));
        await sleep(1500);
      }
      console.warn(`no capture: ${file}`);
    },
    async close() {
      ws.close();
      chrome.kill();
      await sleep(500);
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {}
    },
  };
}
