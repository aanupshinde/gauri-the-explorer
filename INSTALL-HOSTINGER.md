# gauritheexplorer.com — Hostinger वर नवीन साइट कशी चढवायची

लागणाऱ्या files: **5 zip files** (`gauritheexplorer-part1-of-5.zip` ते `gauritheexplorer-part5-of-5.zip`)
- पाचही zip **एकाच फोल्डरमध्ये** upload करून Extract करायच्या. क्रम महत्त्वाचा नाही.
- Computer वर unzip करायची गरज नाही. त्या जशाच्या तशा Hostinger वर upload करा.
- `source-code.zip` आणि `source-photos-*.zip` फक्त backup साठी आहेत. त्या Hostinger वर टाकायच्या नाहीत.

---

## पायरी 0 — आधी backup (5 मिनिटं, हे वगळू नका)
1. hPanel → **Websites → gauritheexplorer.com → Manage**
2. **Files → Backups** → आजचा full backup (**Files** + **Database**) download करा.
3. WordPress admin → **Tools → Export → All content** → download.

काही चुकलं तरी याने 10 मिनिटांत जुनी साइट परत आणता येते.

## पायरी 1 — Contact form चा email टाका
zip मधल्या `contact.php` फाइलमधली ओळ अशी आहे:
```
$TO = 'CHANGE-ME@example.com';
```
Upload केल्यावर (पायरी 3 नंतर) File Manager मध्ये `contact.php` उघडून **Edit** करा. तिथे तुमचा email टाका आणि **Save** करा.

## पायरी 2 — आधी test पत्त्यावर बघा (सुचवलेलं)
1. hPanel → **Domains → Subdomains** → `new` नावाचा subdomain बनवा. पत्ता होईल `new.gauritheexplorer.com`.
2. **Security → SSL** → त्या subdomain साठी SSL चालू करा.
3. **File Manager** → `public_html/new/` फोल्डर उघडा → **Upload** → पाचही zip निवडा.
4. प्रत्येक zip वर right-click → **Extract** → "." (त्याच फोल्डरमध्ये). "Replace / Overwrite" विचारलं तर **हो** म्हणा. पाचही झाल्यावर zip files delete करा.
5. Browser मध्ये `https://new.gauritheexplorer.com` उघडून सगळी पानं बघा.
   - प्रत्येक पानाचा canonical पत्ता मुख्य domain चाच आहे, त्यामुळे test पत्त्याने Google ranking ला धोका नाही.
   - Test पत्त्यावर नकाशा, फोटो आणि लेख सगळं दिसलं पाहिजे.

## पायरी 3 — Live करणं
1. hPanel → **File Manager** → `public_html` उघडा.
2. `old-wordpress` नावाचा नवीन फोल्डर बनवा.
3. `public_html` मधल्या **सगळ्या** files आणि folders निवडा, पण खालचे दोन **सोडून**:
   - ❌ `wp-content` फोल्डर (यातला `uploads` लागतो)
   - ❌ `old-wordpress` फोल्डर स्वतः
   मग **Move** करून त्या सगळ्या `old-wordpress` मध्ये हलवा.
4. `wp-content` फोल्डर उघडा. `uploads` **सोडून** बाकी सगळं (plugins, themes वगैरे) `old-wordpress` मध्ये हलवा.
   > ⚠️ **`public_html/wp-content/uploads/` delete करू नका.** Google Images मधले जुने फोटो, Pinterest pins आणि 3 Web Stories त्यावरच चालतात.
5. `public_html` मध्ये पाचही zip upload करा → प्रत्येकावर **Extract** → मग zip files delete करा.
6. पायरी 1 प्रमाणे `contact.php` मध्ये तुमचा email टाका.
7. hPanel → **Advanced → Cache Manager** (LiteSpeed) → **Purge All**.

## पायरी 4 — तपासणी (10 मिनिटं)
Browser मध्ये हे उघडून बघा:
- `https://gauritheexplorer.com/` → नवीन होम पेज
- `https://gauritheexplorer.com/varanasi-your-ultimate-spiritual-journey/` → लेख (जुनाच पत्ता)
- `https://gauritheexplorer.com/category/wildlife/` → category
- `https://gauritheexplorer.com/contact-us-2/` → आपोआप `/contact/` वर जायला हवं
- `https://www.gauritheexplorer.com/` → `https://gauritheexplorer.com/` वर जायला हवं
- Contact form मधून स्वतःला एक test संदेश पाठवा.

## पायरी 5 — Google ला कळवा
1. **Google Search Console** → **Sitemaps** → जुना `sitemap_index.xml` काढून टाका → `sitemap-index.xml` submit करा.
2. 2–3 आठवडे **Pages → Not found (404)** बघत राहा. काही दिसलं तर मला पाठवा, मी redirect जोडतो.
3. Google Analytics (GA4), Google Ads tag आणि Pinterest verification आधीसारखेच चालू आहेत. काही करायची गरज नाही.

## काही चुकलं तर — जुनी साइट परत आणणं
`public_html` मधल्या नवीन files `new-site` फोल्डरमध्ये हलवा. मग `old-wordpress` मधलं सगळं परत `public_html` मध्ये आणा, आणि **Cache Manager → Purge All** करा.

## आता काय बंद होईल
- **WordPress admin (`/wp-admin`)**: नवीन लेख लिहायची पद्धत ठरवायची आहे. Online editor किंवा WordPress theme, हा निर्णय अजून बाकी आहे.
- **OneSignal push notifications** आणि **Expedia sidebar widget**: हवे असतील तर परत जोडता येतात.
- **Comments**: जुन्या लेखांवर comments नव्हत्या, त्यामुळे काही गमावलं जात नाही.
