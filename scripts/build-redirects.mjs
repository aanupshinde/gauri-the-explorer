// Turns redirects.txt into 301 rules inside dist/.htaccess after each build.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const ht = new URL('dist/.htaccess', root);
if (!existsSync(ht)) process.exit(0);
const lines = readFileSync(new URL('redirects.txt', root), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rules = lines.map((l) => {
  const [from, to] = l.split(/\s+/);
  const path = from.replace(/^\//, '').replace(/\/$/, '');
  return `RewriteRule ^${esc(path)}/?$ ${to} [L,R=301]`;
});
const block = rules.length ? `<IfModule mod_rewrite.c>\nRewriteEngine On\n${rules.join('\n')}\n</IfModule>` : '';
const src = readFileSync(ht, 'utf8').replace(/# BEGIN REDIRECTS[\s\S]*# END REDIRECTS/, `# BEGIN REDIRECTS\n${block}\n# END REDIRECTS`);
writeFileSync(ht, src);
console.log(`redirects: ${rules.length} rule(s) written to dist/.htaccess`);
