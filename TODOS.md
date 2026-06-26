# ConcordiaSpring — Remaining TODOs

Last updated after Cursor Prompt 06 (SEO & deploy config).

## Before launch

### Domain & branding
- [ ] Confirm live domain in `astro.config.mjs` (`site: "https://concordiaspring.com"`)
- [ ] Update `public/robots.txt` sitemap URL if domain differs
- [ ] Replace `public/og-default.png` with a designed 1200×630 branded Open Graph image (current file is a solid terracotta placeholder)
- [ ] Add teacher photo on `/about` (`public/images/christopher.jpg` + uncomment `<img>` in `about.astro`)
- [ ] Replace Instagram placeholder on `/contact` with real URL
- [ ] Create `public/site.webmanifest` with ConcordiaSpring name and icons
- [ ] Update `package.json` `name` from `astrodeck` to `concordiaspring` if publishing the package

### Environment variables (Cloudflare Pages dashboard)
Set at build time unless noted:

| Variable | Required for |
|----------|----------------|
| `WEB3FORMS_ACCESS_KEY` | Contact & package forms |
| `PUBLIC_CAL_USERNAME` | Cal.com booking embeds |
| `PUBLIC_BREVO_API_KEY` | Newsletter opt-in (contacts-only scoped key) |
| `PUBLIC_BREVO_INTERESTED_LIST_ID` | Brevo "Interested" list |
| `VENMO_USERNAME` | Package payment instructions |
| `ZELLE_CONTACT` | Package payment instructions |

### Brevo & webhooks (server-side)
- [ ] Create Brevo booking confirmation email template with variables: `student_name`, `class_name`, `class_date`, `class_cost`, `venmo_link`
- [ ] Set `BREVO_TEMPLATE_ID` and `BREVO_STUDENTS_LIST_ID` for `netlify/functions/booking-confirmation.js`
- [ ] Point Cal.com webhook to booking confirmation endpoint
- [ ] **Security:** Move Brevo newsletter signup from browser (`PUBLIC_BREVO_API_KEY`) to a serverless function before production, or use a contacts-only API key

### Cloudflare vs Netlify functions
- [ ] `booking-confirmation.js` lives under `netlify/functions/` — migrate to a Cloudflare Worker if deploying only to Cloudflare Pages
- [ ] Verify Cal.com webhook signature header matches `CAL_WEBHOOK_SECRET` configuration

### Content
- [ ] Replace `[PLACEHOLDER]` copy on `/about` (origin story, studio address, certifications)
- [ ] Replace placeholder testimonial on homepage (`index.astro`)
- [ ] Replace placeholder FAQ answers (somatic practice, refund policy)
- [ ] Add more offerings in `src/content/offerings/`
- [ ] Remove or hide AstroDeck demo pages (`/docs`, `/sections`, `/changelog`, etc.) if not needed in production

### Optional cleanup
- [ ] Remove unused AstroDeck blog routes or add `src/content/blog/` posts
- [ ] Add `/faq` to header navigation if desired
- [ ] Run Lighthouse audit on production URL after deploy
- [ ] Configure custom email address for Web3Forms notifications

## Verified in Prompt 06

- [x] `astro.config.mjs` — `site`, `sitemap`, `react` integrations
- [x] `BaseLayout` — `title`, `description`, `ogImage`, `canonicalURL`
- [x] `SEO.astro` — Open Graph, Twitter, canonical, sitemap link
- [x] Event JSON-LD on offering detail pages
- [x] `public/robots.txt`, `favicon.svg`, `og-default.png`, `_headers`
- [x] `.cloudflare/deploy.md` deploy notes
- [x] `npm run build` passes
