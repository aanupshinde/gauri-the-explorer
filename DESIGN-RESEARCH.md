# Design research & direction

## What the world's best travel sites do (and what we borrowed)

| Site | What stands out | Used in Gauri's site |
|---|---|---|
| National Geographic | Photography first; high-impact visuals with uncluttered type; a custom geometric sans (Geograph) | Full-bleed photo heroes, minimal chrome, photos never cropped by text boxes |
| Lonely Planet | Design system with tokens (Pangea typeface); destination-first navigation | Design tokens in `global.css`; Destinations as a top-level section with map |
| Condé Nast Traveler | Minimalist, photography drives browsing; editorial serif + clean sans | Serif display (Fraunces) + clean sans (DM Sans) pairing |
| AFAR | Award-winning photo essays; long-form magazine layouts | Story template: big hero, drop cap, wide/full-bleed figures, photo grids, pull quotes |
| Nomadic Matt / Earth Trekkers / Expert Vagabond | Practical "at a glance" boxes, tips, related posts, strong SEO | FactBox, Gauri's Tip notes, related stories, schema.org markup |
| Atlas Obscura | Curiosity and wonder; map of places | Interactive destination map with pins |

Common 2026 patterns: mobile-first, very fast pages, big imagery, simple navigation, clear calls to action.

## Gauri's direction: "Sunrise Journal"
A premium travel magazine — but written by a young explorer. Polished enough for press, warm and playful enough to feel like *her*.

- **Colours:** Ink navy `#1B2238`, Paper cream `#FBF6EE`, Marigold `#F2A43A`, Terracotta `#D65A3C`, Teal `#1F6F6B`. Warm, sunrise-like, works with almost any photo. Automatic dark mode.
- **Fonts (self-hosted, free):** *Fraunces* (soft, characterful serif headlines), *DM Sans* (easy-reading body), *Caveat* (Gauri's handwriting for notes, "that's me!", tips).
- **Signature touches:** polaroid-style portrait, taped "Gauri's tip" notes, highlighter underline in hero, compass logo.

## Plugins → what replaced them
WordPress travel sites typically use 8–15 plugins. This site needs none — each feature is built in, so nothing to update or break:

| Typical plugin | Here |
|---|---|
| Yoast / Rank Math (SEO) | Built-in meta tags, Open Graph, schema.org, canonical URLs, sitemap, RSS |
| Interactive Geo Maps / WP Google Maps | Leaflet map (free, no API key) |
| Envira / NextGEN / 10Web Gallery | Custom masonry gallery + lightbox (swipe & keyboard) |
| Smush / ShortPixel (image optimisation) | Automatic AVIF/WebP in many sizes at build time |
| WP Rocket / LiteSpeed Cache | Static HTML + long cache headers in `.htaccess` |
| Contact Form 7 / WPForms | `contact.php` on Hostinger with spam honeypot |
| Redirection | `redirects.txt` → 301 rules |
| Social share buttons | Lightweight share links (WhatsApp, Facebook, Pinterest) |

## Sources
- https://www.nationalgeographic.com/pages/article/national-geographic-redesigned-web-site
- https://klim.co.nz/blog/geograph-design-information/
- https://fontwerk.com/en/text/lonely-planet-pangea
- https://www.npmjs.com/package/@lonelyplanet/design-tokens
- https://www.designrush.com/best-designs/websites/conde-nast-traveller
- https://www.afar.com/about
- https://bucketlistly.blog//posts/best-travel-blogs-design
- https://seahawkmedia.com/design/travel-website-design-trends/
- https://www.goatsontheroad.com/10-best-free-wordpress-plugins-every-travel-blog/

Note: the reference sites themselves couldn't be opened from this environment yet (network blocked). This research is from published write-ups; a live teardown follows once access is allowed.
