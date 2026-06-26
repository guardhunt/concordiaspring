# Cloudflare Pages — ConcordiaSpring

Deploy this Astro static site to Cloudflare Pages.

## Build settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | **22** (Astro 6 requires `>=22.12.0`; set via `.node-version` or `NODE_VERSION=22`) |

## Environment variables

Set these in the Cloudflare Pages dashboard (**Settings → Environment variables**).
Use production values for the Production environment; duplicate for Preview if needed.

From `.env.example`:

| Variable | Scope | Purpose |
|----------|-------|---------|
| `WEB3FORMS_ACCESS_KEY` | Build | Contact & package forms (baked into static HTML at build time) |
| `PUBLIC_CAL_USERNAME` | Build | Cal.com embed username |
| `PUBLIC_BREVO_API_KEY` | Build | Newsletter opt-in from contact form (browser; use contacts-only key) |
| `PUBLIC_BREVO_INTERESTED_LIST_ID` | Build | Brevo list ID for "Interested" contacts |
| `VENMO_USERNAME` | Build | Payment instructions on packages page |

**Netlify Functions only** (if using Netlify instead of Cloudflare for webhooks):

| Variable | Purpose |
|----------|---------|
| `BREVO_API_KEY` | Transactional email + Students list (server-side) |
| `BREVO_TEMPLATE_ID` | Booking confirmation email template |
| `BREVO_STUDENTS_LIST_ID` | Brevo list for booked students |
| `CAL_WEBHOOK_SECRET` | Cal.com webhook verification |

Cloudflare Pages does not run `netlify/functions/` by default. For Cal.com booking webhooks on Cloudflare, migrate `booking-confirmation.js` to a Cloudflare Worker or use Netlify for functions only.

## Custom domain

1. Add `concordiaspring.com` in Cloudflare Pages → Custom domains.
2. Confirm `site` in `astro.config.mjs` matches the live domain.
3. Update `public/robots.txt` sitemap URL if the domain changes.

## Post-deploy checks

- [ ] `https://concordiaspring.com/sitemap-index.xml` loads
- [ ] `https://concordiaspring.com/robots.txt` references correct sitemap
- [ ] Open Graph preview shows `/og-default.png` until a custom image is designed
- [ ] Contact form submits via Web3Forms
- [ ] Cal.com embed loads on offering detail pages
