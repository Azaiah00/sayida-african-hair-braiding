# QA report — Sayida African Hair Braiding (Oct 12, 2026)

Served locally with `python3 -m http.server` and tested with Playwright + Chromium. Scripts and screenshots live in the QA folder
(`/home/claude/salons/qa/sayida-african-hair-braiding/`: `qa.py`, `shots.py`, `test_open.py`, `test_picker.py`, `shots/`).

## Automated checks (all pages: index, services, visit, 404)
| Check | Result |
|---|---|
| Every local link / asset (href, src, srcset, CSS url()) resolves | PASS |
| Every JSON-LD block parses (HairSalon on all pages; WebSite + FAQPage + aggregateRating on home only; BreadcrumbList + FAQPage on subpages; hasOfferCatalog on services) | PASS |
| Exactly one H1 per page | PASS |
| Every img has alt + width + height | PASS |
| Titles <= 60 chars, descriptions <= 155 chars | PASS |
| Canonical / og:url / og:image use https://sayida-african-hair-braiding.netlify.app/ | PASS |
| `site.css?v=20261012a` on every page (incl. 404) | PASS |
| Stable-scrolling block is the last rule in site.css; no overflow-x: clip on html/body/main | PASS |
| No horizontal overflow at 360/390/414/768/1440, sampled while scrolling the full page | PASS |
| Sticky header stays at top while scrolling (all widths) | PASS |
| No console errors / failed requests | PASS |
| Self-hosted fonts load (Bricolage Grotesque, Work Sans) | PASS |
| No emoji in any text file (regex scan) | PASS |
| No lorem / TODO / coming soon | PASS |
| Mobile menu: aria-expanded toggles, Esc closes | PASS |
| Content visible without JS (no hidden reveal states) | PASS |
| prefers-reduced-motion: all content shown, motion off, plait drawn fully braided | PASS |

## Functional tests
- **Open-now badge** (browser set to Los Angeles time to prove the America/New_York conversion):
  Mon 5:30 AM "Closed now · opens today at 6 AM"; Mon 9 AM "Open now · until 10 PM"; Mon 9:30 PM "closes soon, at 10 PM";
  Sat 11 PM "opens tomorrow (Sunday) at 2 PM"; Sun 10 AM and 1:59 PM "opens today at 2 PM"; Sun 2:00 PM open; Sun 10:30 PM
  "opens tomorrow at 6 AM"; Sunday 3 PM in December (EST) open; Thu 10 PM EST closed. Today's row highlighted on the week chart and the hours table; now-marker placed correctly. PASS
- **Style picker**: every style x size x knotless add-on (39 combinations) checked against the Square data: price and chair time correct; consult styles show "Quote at your free consultation" and switch the CTA to "Book a free consultation"; Boho Braids Small shows "Confirmed at booking". Keyboard arrow navigation works. PASS
- **Form**: empty submit shows three inline errors and focuses the first field; mocked Netlify 200 shows the success state. PASS

## Visual review
Full-page screenshots of every page at 390, 768 and 1440 (scrolled through first so reveals settle) were opened and reviewed, plus
viewport shots of the hero plait at two scroll positions, picker states, menu, no-JS render and the share image at full size.
Fixed during review: picker grid overflow on phones, a `.facts` selector collision, gallery redesigned as a 4-column woven grid
(low-res photos no longer upscaled), caption alignment, footer button colour, menu tables aligned, services overflow at 360px,
share image headline/plait overlap, empty right side of subpage heroes (kente-framed photo pair added).

## Notes
- Full-page screenshots force a very tall viewport, so the hero plait appears fully braided in those; at a normal viewport it starts partly braided and plaits as you scroll (verified with viewport shots).
- The Netlify form and security headers only apply once deployed on Netlify.
