# Gauri the Explorer — new website

Fast, photo-first travel site for **gauritheexplorer.com**. Built with Astro and hosted on your existing **Hostinger** plan.

## मराठीत थोडक्यात
- **फोटो बदलायचे:** `src/assets/photos/` मधला placeholder फोटो काढा. गौरीचा फोटो **त्याच नावाने** ठेवा (उदा. `hero-mountains.jpg`). बाकी सगळं आपोआप होतं.
- **नवीन लेख:** `src/content/stories/` मध्ये नवीन `.md` फाइल बनवा. सध्याची फाइल copy करून बदलणं सगळ्यात सोपं.
- **जुन्या links:** लेखात `permalink: "/जुनी-link/"` लिहा. Google ranking जाणार नाही.
- **साइट तयार करायची:** `npm run build` → `dist/` फोल्डर Hostinger च्या `public_html` मध्ये upload करा.

## Pages
| Page | Address |
|---|---|
| Home | `/` |
| Stories (with tag filter) | `/stories/` |
| Each story | `/stories/<name>/` or its old-site `permalink` |
| Destinations + interactive map | `/destinations/` |
| Each destination | `/destinations/<name>/` |
| Gallery (filter + lightbox) | `/gallery/` |
| About | `/about/` |
| Contact (form) | `/contact/` |
| RSS / sitemap | `/rss.xml`, `/sitemap-index.xml` |

## Everyday tasks
- **Site name, tagline, social links, email:** `src/data/site.ts`
- **Hide the "preview" banner:** `showSampleBanner: false` in `src/data/site.ts`
- **Gallery captions & places:** `src/data/gallery.ts`
- **Article extras (in `.mdx` stories):** `<Figure>`, `<PhotoGrid>`, `<Note>` (Gauri's tip), `<PullQuote>`, `<FactBox>`. See `a-morning-at-pangong-lake.mdx`.
- **Contact form email:** `public/contact.php` → `$TO`
- **Old URL redirects:** `redirects.txt`

## Commands
```bash
npm install        # once
npm run dev        # preview at http://localhost:4321
npm run build      # makes dist/ for upload
```

Every item marked `sample: true` is placeholder content to replace with Gauri's real stories and photos.
See `MIGRATION.md` for the SEO-safe go-live plan and `DESIGN-RESEARCH.md` for the design reasoning.
