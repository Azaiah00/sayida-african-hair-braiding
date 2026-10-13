# Sayida African Hair Braiding — website concept

A finished spec website for **Sayida African Hair Braiding** (North Greensboro, NC), built by Couture House Co.
Static HTML/CSS/vanilla JS. No build step, no frameworks, no external requests (fonts are self-hosted).

- Live preview: https://sayida-african-hair-braiding.netlify.app/
- Proposed domain: **sayidabraiding.com** (not registered yet; see LAUNCH-NOTES.md)
- Booking: every "Book" button goes to the studio's Square booking page.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: hero with live open-now badge, week-hours chart, "Choose your style" picker, work gallery, "In her words", reviews, consult call-out, quick facts, FAQ |
| `services.html` | Full Square menu (17 services, 29 options) with prices and chair times, picker, how booking works |
| `visit.html` | Address, directions, hours table (today highlighted), "Before you come", Netlify question form |
| `404.html` | Branded not-found page (root-absolute paths) |

## Concept: "Woven"
- Palette: kente gold `#E2A529`, forest green `#1F5A3B`, ember red `#B23A2A`, indigo ink `#15162B`, cream `#FBF4E6`, sand `#EBDCC2`.
- Type: Bricolage Grotesque (display) + Work Sans (body), self-hosted from Fontsource (OFL).
- Original kente-inspired woven bands (`assets/img/weave-a.svg`, `weave-b.svg`) — drawn for this site, not copied from any cloth.
- Motion: three strands braid into one plait under the H1 as you scroll (true over/under ordering); woven bands slide in opposite directions; week-hour bars weave in; photo swatches weave in from alternating sides; open-now dot pulses. Everything is gated behind `.js` and switched off for `prefers-reduced-motion`.
- Open-now badge is computed in America/New_York from the Square hours, wherever the visitor is.

## Preview locally
```
cd sayida-african-hair-braiding
python3 -m http.server 8080
# open http://localhost:8080/
```
Pages also open by double-clicking `index.html` (relative paths), but fonts load more reliably over a server.

## Deploy (Netlify)
1. Push this folder to a GitHub repo (no build command; publish directory is the repo root).
2. New site from Git on Netlify, site name `sayida-african-hair-braiding`.
3. `netlify.toml` sets security headers (strict CSP), long-cache for `/assets/*`, hides README/LAUNCH-NOTES/QA-REPORT, pretty URLs and the 404.
4. Forms: the "question" form on visit.html is detected automatically; set a notification email in Netlify > Forms.
5. When a custom domain is connected, replace the netlify.app URL everywhere (canonical, og:url, og:image, JSON-LD, sitemap.xml, robots.txt, llms.txt).

## Editing notes
- The CSS is linked as `assets/css/site.css?v=20261012a`. Bump the `?v=` on every page after any CSS change (Netlify caches assets for a year).
- Picker data lives in a JSON block inside each page (`<script type="application/json" data-menu>`); prices also appear in the services tables, the JSON-LD and llms.txt. Change them together.
- A new share image needs a new filename (e.g. `share-2.jpg`) and updated og:image/twitter:image tags.
