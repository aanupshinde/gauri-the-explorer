// One-time import of gauritheexplorer.com (WordPress) into this Astro site.
// Usage: node scripts/import-wordpress.mjs <export-dir>
// <export-dir> holds: posts-embed.json, pages-full.json, media-all.json, media/ (originals), pagehtml/<slug>.html
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const SRC = process.argv[2];
if (!SRC) throw new Error('Pass the export directory');
const ROOT = new URL('../', import.meta.url).pathname;
const ASSETS = join(ROOT, 'src/assets/wp');
const STORIES = join(ROOT, 'src/content/stories');
const PAGES = join(ROOT, 'src/content/pages');
for (const d of [ASSETS, STORIES, PAGES]) mkdirSync(d, { recursive: true });

const SITE = 'https://gauritheexplorer.com';
const mediaFiles = new Set(readdirSync(join(SRC, 'media')));
const media = JSON.parse(readFileSync(join(SRC, 'media-all.json'), 'utf8'));
const altByFile = Object.fromEntries(media.map((m) => [basename(m.url), m.alt]));

const decode = (s = '') =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&raquo;/g, '»').replace(/&nbsp;/g, ' ');
const yaml = (s) => JSON.stringify(decode(s).trim());

// Map any WordPress image URL (incl. resized -800x600 variants) to a local original we downloaded.
function localImage(url) {
  if (!url || !url.includes('/wp-content/uploads/')) return null;
  const file = basename(url.split('?')[0]);
  const ext = file.match(/\.[^.]+$/)?.[0] ?? '';
  const stem = file.slice(0, -ext.length).replace(/-\d+x\d+$/, '');
  const candidates = [file, stem + ext, stem + '-scaled' + ext, stem.replace(/-scaled$/, '') + '-scaled' + ext];
  const hit = candidates.find((c) => mediaFiles.has(c));
  if (!hit || /\.mp4$/i.test(hit)) return null;
  if (!existsSync(join(ASSETS, hit))) copyFileSync(join(SRC, 'media', hit), join(ASSETS, hit));
  return hit;
}

function makeTurndown(relPrefix) {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
  td.use(gfm);
  td.remove(['script', 'style', 'noscript', 'form', 'button']);
  const has = (n, re) => re.test(n.getAttribute?.('class') || '') || re.test(n.getAttribute?.('id') || '');
  td.remove((n) => has(n, /ez-toc|rank-math|seo-score|sharedaddy|jp-relatedposts|wp-block-buttons|eg-widget/));
  td.keep(['iframe']);
  td.addRule('figure', {
    filter: 'figure',
    replacement: (_c, node) => {
      const img = node.querySelector('img');
      const cap = node.querySelector('figcaption')?.textContent?.trim();
      if (!img) return '\n\n' + td.turndown(node.innerHTML) + '\n\n';
      return '\n\n' + imgMd(img) + (cap ? `\n\n*${cap.replace(/\*/g, '')}*` : '') + '\n\n';
    },
  });
  td.addRule('img', { filter: 'img', replacement: (_c, node) => imgMd(node) });
  td.addRule('links', {
    filter: (n) => n.nodeName === 'A' && n.getAttribute('href'),
    replacement: (content, node) => {
      let href = node.getAttribute('href').replace(SITE, '') || '/';
      if (!content.trim()) return '';
      if (/\.(jpe?g|png|webp)$/i.test(href)) return content; // image lightbox links → just the image
      return `[${content}](${href})`;
    },
  });
  function imgMd(node) {
    const src = node.getAttribute('data-src') || node.getAttribute('data-lazy-src') || node.getAttribute('src') || '';
    const alt = (node.getAttribute('alt') || '').replace(/[\[\]]/g, '');
    const local = localImage(src);
    return local ? `![${alt}](${relPrefix}${local})` : src.startsWith('data:') ? '' : `![${alt}](${src})`;
  }
  return td;
}

const metaFrom = (html, re) => decode(html.match(re)?.[1] ?? '');

// ---- Destinations each post belongs to (by slug) ----
const destOf = {
  'varanasi-your-ultimate-spiritual-journey': 'varanasi',
  'keoladeo-national-park-46-7-birdwatchers': 'keoladeo',
  '2-ethereal-days-of-haridwar-to-rishikesh': 'haridwar-rishikesh',
  'amazing-nashik-vineyard-resorts-in-2024': 'nashik',
  'chittorgarh-redefining-heritage-in-the-21st-century': 'chittorgarh',
  'glacier-national-park-natures-majestic-wonderland-travel': 'glacier',
  'satpura-tiger-reserve-travel': 'satpura',
  'vijaydurg-a-victorious-sea-fort': 'vijaydurg',
  '1300-year-old-daitya-sudan-mandir-lonar': 'lonar',
};
// Posts that feature Gauri's own trip photos — shown as "featured" on the homepage.
const featured = new Set(['varanasi-your-ultimate-spiritual-journey', 'keoladeo-national-park-46-7-birdwatchers', '2-ethereal-days-of-haridwar-to-rishikesh']);

const posts = JSON.parse(readFileSync(join(SRC, 'posts-embed.json'), 'utf8'));
const tdStory = makeTurndown('../../assets/wp/');
const report = [];
for (const p of posts) {
  const html = existsSync(join(SRC, 'pagehtml', p.slug + '.html')) ? readFileSync(join(SRC, 'pagehtml', p.slug + '.html'), 'utf8') : '';
  const seoTitle = metaFrom(html, /<title>([^<]*)<\/title>/).replace(/\s*»\s*Gauri The Explorer\s*$/i, '');
  const seoDesc = metaFrom(html, /<meta name="description" content="([^"]*)"/);
  const fm = p._embedded?.['wp:featuredmedia']?.[0];
  const cover = localImage(fm?.source_url);
  const terms = (p._embedded?.['wp:term'] ?? []).flat();
  const cats = terms.filter((t) => t.taxonomy === 'category').map((t) => decode(t.name));
  const excerptHtml = p.excerpt?.rendered?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() ?? '';
  const excerpt = seoDesc || decode(excerptHtml).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, '').slice(0, 220);
  let body = tdStory.turndown(p.content.rendered).replace(/\n{3,}/g, '\n\n').trim();
  const fmLines = [
    '---',
    `title: ${yaml(p.title.rendered)}`,
    `excerpt: ${yaml(excerpt)}`,
    `date: ${p.date.slice(0, 10)}`,
    `updated: ${p.modified.slice(0, 10)}`,
    cover ? `cover: "../../assets/wp/${cover}"` : null,
    `coverAlt: ${yaml(fm?.alt_text || p.title.rendered)}`,
    `categories: [${cats.map((c) => JSON.stringify(c)).join(', ')}]`,
    destOf[p.slug] ? `destination: ${destOf[p.slug]}` : null,
    `permalink: "/${p.slug}/"`,
    seoTitle ? `seoTitle: ${yaml(seoTitle)}` : null,
    seoDesc ? `seoDescription: ${yaml(seoDesc)}` : null,
    `featured: ${featured.has(p.slug)}`,
    '---',
  ].filter(Boolean);
  writeFileSync(join(STORIES, p.slug + '.md'), fmLines.join('\n') + '\n\n' + body + '\n');
  report.push(`${p.slug}: cover=${cover ? 'local' : 'MISSING'} words=${body.split(/\s+/).length} remoteImgs=${(body.match(/\]\(https?:/g) || []).length}`);
}

// ---- Static pages that keep their old URL ----
const pages = JSON.parse(readFileSync(join(SRC, 'pages-full.json'), 'utf8'));
const tdPage = makeTurndown('../../assets/wp/');
const keepPages = ['privacy-policy', 'terms-and-conditions', 'disclaimer', 'affiliate-discloser-disclaimer', 'about-us'];
for (const p of pages.filter((x) => keepPages.includes(x.slug))) {
  const body = tdPage.turndown(p.content.rendered).replace(/\n{3,}/g, '\n\n').trim();
  writeFileSync(join(PAGES, p.slug + '.md'), ['---', `title: ${yaml(p.title.rendered)}`, `permalink: "/${p.slug}/"`, `updated: ${p.modified.slice(0, 10)}`, '---', '', body, ''].join('\n'));
  report.push(`page ${p.slug}: words=${body.split(/\s+/).length}`);
}

// ---- Gallery: Gauri's own camera photos only (no stock, banners, duplicates or dark night shots) ----
const placeOf = (f) =>
  /^DSC_1[789]|^DSC_19/.test(f) ? 'Varanasi'
  : /^(850_|DSC_44|DSC_4476|DSC_451|WS6_|IMG2024021715)/.test(f) ? 'Keoladeo'
  : /^DSC_45[18]|^DSC_46/.test(f) ? 'Haridwar & Rishikesh'
  : /^(DSC_2436|Daityasudan|gauri-the-explorer-rama)/.test(f) ? 'Lonar'
  : /^(vijaydurg|Vijaydurg_Fort_20)/i.test(f) ? 'Vijaydurg' : 'More';
const galleryPick = [
  // 850_* and WS6_* are credited to Archit Agrawal in the Keoladeo post — not Gauri's, so not in the gallery.
  'DSC_4440-scaled.jpg', 'DSC_4430-scaled.jpg',
  'DSC_44391-scaled.jpg', 'DSC_4409-scaled.jpg', 'DSC_4410-scaled.jpg', 'DSC_4413-1-scaled.jpg', 'DSC_4424-scaled.jpg', 'DSC_4476-scaled.jpg', 'DSC_4511-scaled.jpg', 'DSC_4514-scaled.jpg',
  'DSC_1777-scaled.jpg', 'DSC_1815-1-scaled.jpg', 'DSC_1928-scaled.jpg', 'DSC_1941-scaled.jpg', 'DSC_19691-scaled.jpg', 'DSC_19771-scaled.jpg', 'DSC_19781-scaled.jpg',
  'DSC_4519-scaled.jpg', 'DSC_4587-scaled.jpg', 'DSC_4660-1-scaled.jpg',
  'DSC_2436-scaled.webp', 'gauri-the-explorer-rama-temple-lonar.jpg',
  'Vijaydurg_Fort_20-1-scaled.webp', 'vijaydurg-gomay-darwaja.webp', 'vijaydurg-tripal-tatabandi.webp', 'vijaydurg-female-bath-spot.webp',
];
const gallery = [];
for (const f of galleryPick) {
  if (!mediaFiles.has(f)) { report.push(`gallery missing ${f}`); continue; }
  if (!existsSync(join(ASSETS, f))) copyFileSync(join(SRC, 'media', f), join(ASSETS, f));
  const place = placeOf(f);
  gallery.push({ file: f, place, alt: altByFile[f] || `${place}, photographed by Gauri` });
}
// Portrait + extra photos used on Home / About
for (const f of ['IMG_20240129_125223_564.webp', 'DSC_1777-scaled.jpg', 'DSC_1941-scaled.jpg']) if (!existsSync(join(ASSETS, f))) copyFileSync(join(SRC, 'media', f), join(ASSETS, f));
writeFileSync(join(ROOT, 'src/data/gallery.json'), JSON.stringify(gallery, null, 1));

console.log(report.join('\n'));
console.log(`gallery: ${gallery.length} photos; assets copied: ${readdirSync(ASSETS).length}`);
