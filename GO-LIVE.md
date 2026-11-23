# Go live: gauritheexplorer.com (Hostinger)

Instructions for whoever does the switch, a person or a Claude session driving the owner's browser.
Do **one step at a time**. Wait until every upload, extract and move has finished before starting the next.
Never delete anything except the temporary folders named below. The old WordPress is **moved**, not deleted.

Site to deploy: the `deploy` branch of https://github.com/aanupshinde/gauri-the-explorer
Zip: https://github.com/aanupshinde/gauri-the-explorer/archive/refs/heads/deploy.zip
(It extracts to a folder `gauri-the-explorer-deploy/` with 36 top-level items; `_astro/` holds 411 files.)

## Step 0: Backup
hPanel → Websites → **gauritheexplorer.com** (not the `*.hostingersite.com` temporary site) → Manage →
Files → Backups → download **Files** and **Database** backups to the computer.

## Step 1: Download the new site
Download the zip above to the computer.

## Step 2: Put the old WordPress aside
hPanel → gauritheexplorer.com → File Manager. Turn on **Show hidden files**.

1. Go one level **above** `public_html`. Create folder `old-wordpress` there (outside `public_html`).
2. In `public_html`, **keep** these and move everything else to `old-wordpress`:
   - `wp-content/` (folder stays; see 3)
   - `.well-known/`, `cgi-bin/` (if present)
   - any `google*.html` verification file, `ads.txt` (if present)
   Move: `wp-admin/`, `wp-includes/`, every `wp-*.php`, `index.php`, `xmlrpc.php`, `.htaccess`,
   `license.txt`, `readme.html`, `robots.txt`, and any other WordPress file.
3. In `public_html/wp-content/`, **keep `uploads/`**. Move everything else (`plugins`, `themes`,
   `languages`, `upgrade`, `cache`, `litespeed`, `index.php` …) to `old-wordpress`.
   `wp-content/uploads/` must stay: old image URLs, Pinterest pins and the 3 Web Stories use it.

Result: `public_html` contains only `wp-content/uploads/` (+ `.well-known`, verification files).

## Step 3: Install the new site
1. In `public_html` create folder `newsite`. Upload the zip into it. **Extract** and wait until done.
2. Open `newsite/gauri-the-explorer-deploy/`. Check: 36 items, `_astro` has 411 files. If fewer, wait and refresh.
3. Select all → **Move** → `public_html`. Delete the empty `newsite` folder.
4. In `public_html` create file `contact-email.txt` containing only the address that should receive contact-form messages.
5. hPanel → Advanced → Cache Manager → **Purge All**.

Hostinger may refuse to extract a zip over folders that already exist (HTTP 409). That's why everything
is extracted into an empty folder first and then moved.

## Step 4: Check
Open https://gauritheexplorer.com/ and https://gauritheexplorer.com/varanasi-your-ultimate-spiritual-journey/
Then tell the Claude session in the claude.ai app "live झालं". It will check all 461 files, the 34 old URLs and every redirect.

## Roll back (if anything goes wrong)
1. Move the new files out of `public_html` into a folder `newsite-backup` (leave `wp-content/uploads` alone).
2. Move everything from `old-wordpress` back into `public_html` (and its `wp-content` folders back into `public_html/wp-content`).
3. Cache Manager → Purge All. The database was never touched, so the old site comes back as it was.
