# LAUNCH NOTES — Sayida African Hair Braiding

Everything below must be confirmed with the owner before this goes live. Facts on the site come only from the research dossier
(Square booking page, Google, Birdeye, MapQuest, Fresha, Waze) and the owner's own Facebook/Instagram text.

## Domain & links
- Live preview domain: https://sayida-african-hair-braiding.netlify.app/ (used for canonical, og, JSON-LD, sitemap, robots, llms.txt).
- Proposed custom domain: **sayidabraiding.com** (check availability; register in the owner's name). Swap every absolute URL when it is connected.
- Booking URL used everywhere: https://book.squareup.com/appointments/ar1sv7kb7lxzov/location/L47ABMFSMWYT6/services

## Address and privacy
- 5716 River Glen Dr, Greensboro, NC 27455 is the published business address on Google and Square, but it is a **residential home**. The site presents it as "a private home studio in North Greensboro" and shows the address. **Ask the owner whether she prefers "address sent after booking"**; if so, remove the street line from the header/footer/visit page/JSON-LD/llms.txt and keep "North Greensboro, NC 27455".
- MapQuest lists a second address (1317 Lees Chapel Rd). Not used. Ask if it is an old location and clean up the listing.
- Geo coordinates (36.15708, -79.78688) come from the Birdeye map embed. Confirm.

## Hours
- Site uses the Square hours: Mon–Sat 6 AM–10 PM, Sun 2–10 PM ("by appointment"). The live open-now badge and week chart are computed from these.
- Conflicts to fix on directories: **Fresha says Sunday closed**; MapQuest says Sunday 2:30 PM; Birdeye says Thursday 10 AM. Confirm the real hours, then update all listings.
- Confirm that Sunday afternoon appointments really are offered (the site promotes "Sundays from 2 PM").

## Square menu anomalies (shown as listed; nothing fixed silently)
- **Boho Braids, Small** is listed at **30 min** on Square — clearly wrong. Site shows the price ($265) and "Confirmed at booking" for time.
- **Senegalese Twists**: Medium ($210) is cheaper than Small ($235). Shown exactly as Square lists them — confirm.
- **"Consulation"** is misspelled on Square (Micro Locs). Spelled "Consultation" on the site; fix it in Square.
- **Sister Locs** is listed at 30 min on Square; the site shows "Set at consultation" instead. Men's Styling (30 min) is shown as listed.
- Mini Twists carries Square's label "Call for more details" — shown on the site; confirm what it means.
- Square's menu data was truncated after the Boho category during research; confirm there is no further category or service missing.
- Square has no "from"/"starting at" prices, so prices are shown as exact. Every price block says "Prices from Square, Oct 12, 2026. Final price confirmed at booking."
- The picker adds the $30 "+ Knotless" add-on to boho/twist styles and adds 30 min (Square says the add-on is for "boho/twist/custom" styles). Confirm which styles it applies to.
- Square clean-up for the pitch: turn on service images, add a logo/cover, replace placeholder staff names ("Staff 2", "Staff Two", "Staff 3", "Staff 4").

## Policies
- **Payment**: one Google review says cash only, paid before the appointment. The site does NOT say cash only; it says "Ask about payment options when you book". Ask the owner for her policy (and suggest accepting cards/online payment to remove friction), then update the FAQ and "Before you come".
- **Hair included**: only one review mentions it. The site says "ask when you book". Confirm per style and publish a clear list.
- No deposit, cancellation, late or no-show policy is published on Square; none is stated on the site. Offer to add them.
- 48-hour minimum lead time (Square setting) is stated on the site. Confirm, and confirm that calling for sooner appointments is OK.
- Free 30-minute consultations "with Sayida" for locs, men's styling and custom styles are from Square. Confirm.

## Identity & wording
- Only "Sayida" is used. No surname, origin or credentials are stated.
- An Instagram flyer says "Call 3363373257 Sara" — **not used**. Ask who Sara is (staff member? owner?).
- "Years of experience", "Family owned and operated", "Professional braiders", "Quality work affordable prices", "All the latest braids in town" and the styles sentence are quoted verbatim from her Facebook page. No number of years is stated anywhere.
- The site says "call or text" (tel: and sms: links). Confirm the number accepts texts.
- No public business email was found (the Square data shows a personal-looking yahoo.fr address, not published). Ask for a business email for the form notifications and JSON-LD.

## Reviews & rating
- Google 4.6 from 240 reviews (verified Oct 12, 2026) is shown and marked up as aggregateRating on the home page only. Update the count before launch.
- Review snippets are short **paraphrases** of Google reviews (via Birdeye), attributed by first name only, and labelled "paraphrased". Not marked up as Review schema. Owner may prefer verbatim quotes with permission.

## Socials
- Two Facebook pages exist (IDs 100071119550419 and 100079856647551). The site links the first. Ask which one is active and merge/close the other.
- Instagram @sayidaafricanhairbraiding is linked. TikTok is linked from Google but the handle was not confirmed — not linked.

## Photos
- All 9 photos came from the studio's public Instagram. **They must be approved/licensed by the owner.** 7 crops are used (plus 3 small swatches from a collage):
  spring-twists-burgundy, braids-on-kente-cloth, faux-locs-copper, box-braids-gold-cuffs, box-braids-brown-red, box-braids-half-up,
  cornrows-red-green-gold, feed-in-ponytail-red, stitch-cornrows, senegalese-twists.
- Phone-number text overlays, "PhotoGrid" watermarks and purple collage frames were cropped out. Images are low resolution; ask for original high-res photos (and more of them — knotless, boho, micro locs especially) to replace these.
- Captions name the style seen in each photo (e.g. "faux locs", which is not on the Square menu). Confirm the names.
- Two portraits of a woman (one in African print, one in a yellow dress) were NOT used and must not be presented as the owner without permission.
- The kente-style bands are an original pattern drawn for this site.

## Forms
- The "Ask a question" form on visit.html is a Netlify Form (honeypot, client-side validation, accessible success state). It only works once deployed on Netlify; set the notification email in Netlify > Forms.

## Pitch points
- No website today (Google shows "Add website"); booking lives on a long Square URL with no photos.
- Live "Open now" badge sells the 6 AM–10 PM, 7-day availability; the style picker answers "how much and how long" before booking.
- One consistent name/address/phone/hours across the site, schema and llms.txt for local SEO ("African hair braiding Greensboro", "North Greensboro").
