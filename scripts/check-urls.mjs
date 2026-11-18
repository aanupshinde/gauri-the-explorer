// Checks that every OLD-site URL still works on the new site (200 or 301, never 404).
// Usage: node scripts/check-urls.mjs old-urls.txt https://new.gauritheexplorer.com
import { readFileSync } from 'node:fs';
const [file, base] = process.argv.slice(2);
if (!file || !base) { console.log('Usage: node scripts/check-urls.mjs old-urls.txt <site-base-url>'); process.exit(1); }
const urls = readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
let bad = 0;
for (const u of urls) {
  const path = u.replace(/^https?:\/\/[^/]+/, '');
  const r = await fetch(new URL(path, base), { redirect: 'manual' }).catch(() => ({ status: 0 }));
  const ok = r.status === 200 || r.status === 301 || r.status === 308;
  if (!ok) bad++;
  console.log(`${ok ? 'OK ' : 'BAD'} ${r.status} ${path}${r.headers?.get?.('location') ? ' -> ' + r.headers.get('location') : ''}`);
}
console.log(`\n${urls.length - bad}/${urls.length} old URLs OK`);
process.exit(bad ? 1 : 0);
