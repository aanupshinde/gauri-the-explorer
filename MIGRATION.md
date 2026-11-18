# Moving gauritheexplorer.com to the new design — without losing Google ranking

Hosting stays on **Hostinger**. Domain stays the same. Every old link keeps working.

## Step 1 — Back up the old site (5 min)
Hostinger hPanel → **Files → Backups** → download a full backup (files + database).
If it's WordPress, also: WordPress admin → Tools → Export → All content.

## Step 2 — Collect every old URL (done: see `old-urls.txt`, 34 URLs from the Rank Math sitemap)
- `https://gauritheexplorer.com/sitemap.xml` (or `/sitemap_index.xml`, `/wp-sitemap.xml`)
- Google Search Console → Pages → export the indexed URLs
- Result: a list of every page, article, category and image address.

## Step 3 — Keep each old address
For every old article, the story file gets its exact old address:
```yaml
permalink: "/2021/05/my-ladakh-trip/"   # copied from the old site
```
The new site publishes that article at exactly the same URL → Google sees no change.

## Step 4 — Redirect anything that moves
Old pages that won't exist any more (category pages, tag pages, old gallery URLs) go in `redirects.txt`:
```
/category/travel/     /stories/
/portfolio/           /gallery/
```
`npm run build` turns these into permanent **301 redirects** in `.htaccess`, which pass the ranking on to the new page.

## Step 5 — Match www / https / trailing slash
`public/.htaccess` currently sends everyone to `https://gauritheexplorer.com` (no www).
If Google currently indexes the **www** version, flip that rule. The new site uses trailing slashes (`/about/`). If old URLs ended in `.html`, set `build.format: 'file'` in `astro.config.mjs`.

## Step 6 — Test before going live
1. Upload `dist/` to a Hostinger **subdomain** first (e.g. `new.gauritheexplorer.com`), add `<meta name="robots" content="noindex">` there.
2. Run the URL checker (`node scripts/check-urls.mjs old-urls.txt https://new.gauritheexplorer.com`) — every old URL must return 200 or 301, never 404.

## Step 7 — Go live
1. hPanel → File Manager → `public_html` → move the old WordPress files into `old-site-backup/`
   **but leave `public_html/wp-content/uploads/` exactly where it is.** Old photo URLs (Google Images,
   Pinterest pins, the 3 Web Stories) keep working from there.
2. Upload everything inside `dist/` into `public_html/`.
3. Edit `public_html/contact.php` → set your email address in `$TO`.
4. Visit the site, test the contact form, test 10 old links.

## Step 8 — Tell Google
Search Console → Sitemaps → submit `https://gauritheexplorer.com/sitemap-index.xml`.
Watch **Pages → Not found (404)** for 2–3 weeks; add any stragglers to `redirects.txt`.
