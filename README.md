# A.M Resin Adventure

A single-page storefront for a handmade resin studio in Navsari, Gujarat.
No framework, no build step, no dependencies — three files, optimised product
photos, and a security-header config.

```
index.html                     page structure and copy
styles.css                     design tokens + layout
app.js                         products, filtering, quick view, WhatsApp handoff
assets/img/*.webp              optimised product photos (transparent background)
assets/img/og-cover.jpg        1200×630 social share image
assets/img/logo.webp           brand logo, 640×640 (footer)
assets/img/logo-384.webp       brand logo, 384×384 (header)
assets/fav/*                     favicons: .ico, 256, 512 and apple-touch-icon
_headers                       security headers for Cloudflare Pages / Netlify
resin/                         original source images (not served)
```

## Run it

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 4173
```

## Make it yours

| What | Where |
| --- | --- |
| WhatsApp number, call number, email, address, hours | `CONFIG` at the top of `app.js` |
| Products, descriptions, badges, photos, specs | `PRODUCTS` array in `app.js` |
| Categories / filter chips | `CATEGORIES` in `app.js` (and the chips in `index.html`) |
| Headline, services, reviews, FAQs | `index.html` |

`CONFIG.whatsappNumber` must be digits only, with country code:
`918160776905`. Call buttons are wired from `CONFIG.callLink`.

### Prices

No prices are stored on the site. Every card and quick view shows
**Contact for price** (`CONFIG.priceLabel`), and each WhatsApp message asks for
a quote. To show a price on a product, add a `price` field to that product and
render it in `buildCard()` / `openQuick()` — nothing else depends on price, and
the sort menu has no price ordering by design.

### Product photos

`resin/` holds the originals. They were trimmed, padded and exported to WebP:

```bash
magick resin/Coaster.png -trim +repage -bordercolor none -border 14 \
  -resize "x920>" -quality 82 assets/img/coaster-set.webp
```

The originals are transparent PNGs, which is why the cards use a warm cream
panel and `object-fit: contain` rather than a crop. Keep the `width`/`height`
attributes in `app.js` in sync with the exported files to avoid layout shift.

### Logo and icons

The master artwork is a 1141×1174 transparent PNG of the logo. Everything else
is generated from it: trim to the artwork, add 6% padding, then centre on a
square canvas so nothing clips at rounded corners.

```bash
magick <master.png> -trim +repage -bordercolor none -border 67 \
  -background none -gravity center -extent 1249x1249 /tmp/logo_master.png

# page marks — transparent, padded
magick /tmp/logo_master.png -resize 384x384 -quality 90 \
  -define webp:alpha-quality=100 assets/img/logo-384.webp
magick /tmp/logo_master.png -resize 640x640 -quality 90 \
  -define webp:alpha-quality=100 assets/img/logo.webp

# icons — opaque cream so the dark brown script stays readable on dark tab bars
magick /tmp/logo_master.png -background "#fffdf9" -alpha remove -alpha off \
  -resize 512x512 assets/fav/favicon-512.png
magick /tmp/logo_master.png -background "#fffdf9" -alpha remove -alpha off \
  -resize 256x256 assets/fav/favicon-256.png
magick /tmp/logo_master.png -background "#fffdf9" -alpha remove -alpha off \
  -resize 180x180 assets/fav/apple-touch-icon.png
magick assets/fav/favicon-512.png -define icon:auto-resize=48,32,16 \
  assets/fav/favicon.ico
```

The logo contains its own script wordmark, so at 36–44 px in the header it reads
as an emblem rather than text — the live `<span class="logo-text">` beside it is
what stays legible (and the `img` is `alt=""`, so screen readers hear the name
once). In the footer it is shown large enough to read on its own, stacked above
the text wordmark. Swap the master file and re-run the commands above to rebrand.

`favicon.ico` is the small legacy fallback (16/32/48 px). The 256 and 512 px
PNGs are declared with `sizes` and are what modern browsers and OS shortcuts
use; a 256 px frame is deliberately not packed into the `.ico`, which would
store it uncompressed and cost ~285 KB for a tab icon.

The icons live in `assets/fav/`, so there is no `/favicon.ico` at the site root.
Every browser that reads `<link rel="icon">` (all current ones) is fine; a
request for `/favicon.ico` simply 404s.

## Sections

Hero → trust strip → shop (filter, search, sort, empty state) → **services** →
custom quote form → how it works → reviews → FAQ → CTA → footer with address,
map link, email and payment methods.

## Accessibility & UX

- Skip link, landmarks, one `<h1>`, `aria-pressed` filter chips, `aria-expanded`
  mobile menu, `role="status"` result count.
- Quick view is a native `<dialog>`: focus moves in, Escape and backdrop close
  it, focus returns to the trigger. Scroll locking is CSS
  (`body:has(dialog[open])`), so it cannot get stuck.
- Similar pieces are offered inside the quick view and swap without reopening.
- The quick view is a stacked photo-and-copy sheet on phones and a two-column
  layout (photo left, details right) from 760px up, so its text always fits
  without scrolling on desktop.
- Inline form validation with messages, `aria-invalid` and focus to the first
  problem field. Real photos carry descriptive `alt` text.
- Visible focus rings, 44px targets, `prefers-reduced-motion` support, and a
  mobile action dock for WhatsApp/Call.

## Security review

| Finding | Risk | Fix |
| --- | --- | --- |
| Product/modal markup previously built with `innerHTML` | DOM XSS if data ever comes from an API or CMS | All nodes built with `document.createElement` and `textContent`; strings cannot become markup |
| Inline `onclick` handlers | Required `script-src 'unsafe-inline'` | Replaced with delegated `addEventListener`; no inline handlers remain |
| `target="_blank"` without `rel` | Reverse tabnabbing | Every external link has `rel="noopener noreferrer"` (verified: 8/8, no exceptions) |
| Quote form opened a tab with `window.open` | Popup blockers could silently drop the request; a live `window.opener` handle reached back into the shop | Replaced with a click on a throwaway `<a target="_blank" rel="noopener noreferrer">`, so there is never a popup block or an opener reference |
| No Content-Security-Policy | Any future injection runs unchecked | `_headers` ships a strict CSP with no `unsafe-inline` (page has no inline scripts/styles); `img-src 'self'` covers only local photos |
| No framing / sniffing / referrer protection | Clickjacking, MIME confusion, referrer leakage | `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, `strict-origin-when-cross-origin`, HSTS, Permissions-Policy |
| Unbounded form input flowed into a URL | Oversized payloads, confusing chats | `maxlength` plus JS clamps (1600 chars message, 500 details), tabs collapsed, control characters stripped, newlines kept only for readability, everything `encodeURIComponent`-encoded |
| Phone / tel: taken on trust | `javascript:` URI injection through config | WhatsApp number reduced to digits; `tel:` validated against `/^tel:[+0-9()\-\s]{3,25}$/` with numeric fallback |
| Third-party font requests | Font provider sees visitor IPs | Only Google Fonts, origin-limited preconnect. Self-host to remove it |

Optional extra hardening, safe to add because the site has no `innerHTML`
anywhere: append `require-trusted-types-for 'script'; trusted-types 'none'` to
the CSP line in `_headers`. That makes any future DOM-sink write fail loudly
instead of quietly running.

Not applicable by design: no server, database, login, cart, payment form or
cookie — so no session handling, CSRF surface, stored personal data, or PCI
scope. Order details travel only through the visitor's own WhatsApp. The
business address and email are intentionally public contact details.

### Before going live

1. Serve over HTTPS (the HSTS header assumes it).
2. Confirm the host sends the headers in `_headers`:
   `curl -sI https://your-domain/`.
3. Make `og:image` absolute (`https://your-domain/assets/img/og-cover.jpg`) —
   most social scrapers ignore relative URLs.
4. Self-host Fraunces + Inter if you want zero third-party requests.

## Known limitations

- Prices are quoted in chat only, by request — there is no price list on site.
- Reviews are the studio's own copy; add real buyer quotes when available.
- The stained-glass phone cover uses the studio's artwork reference; confirm it
  matches a shipped design.
- No online payment or checkout — intentional.
