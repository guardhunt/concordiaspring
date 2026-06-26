# ConcordiaSpring — Project Context for AI Agents

> This file takes highest priority over AGENTS.md for all AI coding agents.
> Read this FIRST before making any code changes, generating pages, or adding components.

---

## 1. What This Project Is

**ConcordiaSpring** (also branded **ConcordiaFlow**) is the website for a yoga and
somatics school based in Asheville, NC. It offers:

- Drop-in yoga classes (initially one class type, expanding over time)
- Somatic workshops and immersive group experiences ("The Body Speaks")
- Class packages (multi-class bundles, sold offline via Venmo/Zelle)
- One-on-one somatic coaching (future)

The site is static-first, hosted on Cloudflare Pages or Netlify free tier.
All dynamic behavior is handled by lightweight third-party APIs.
There is NO backend server, NO database, NO server-side rendering.

---

## 2. Brand & Aesthetic

**Voice:** Warm, embodied, philosophical. Poetic without being obscure.
Not clinical, not corporate, not "wellness industry generic."
Language draws from somatic experience, nature, and relational presence.

**Visual aesthetic:**
- Warm earth tones: terracotta, clay, warm taupe, muted sage green
- Soft, not stark. Low contrast where possible. Feels like handmade paper.
- Typography: Cormorant Garamond (headings) + DM Sans (body)
- Generous whitespace. Breathes.
- Nature-rooted imagery. No stock-photo yoga poses.
- Dark mode optional but secondary — light mode is primary.

**Color palette (Tailwind v4 OKLCH tokens — set in src/styles/globals.css):**
```css
@theme {
  /* Primary — warm terracotta */
  --color-primary-50:  oklch(0.97 0.01 45);
  --color-primary-100: oklch(0.93 0.03 45);
  --color-primary-200: oklch(0.87 0.06 45);
  --color-primary-300: oklch(0.78 0.09 45);
  --color-primary-400: oklch(0.68 0.12 45);
  --color-primary-500: oklch(0.58 0.14 45);
  --color-primary-600: oklch(0.50 0.13 45);
  --color-primary-700: oklch(0.42 0.11 45);
  --color-primary-800: oklch(0.33 0.08 45);
  --color-primary-900: oklch(0.24 0.05 45);
  --color-primary-950: oklch(0.16 0.03 45);

  /* Accent — muted sage green */
  --color-accent-50:  oklch(0.97 0.02 150);
  --color-accent-500: oklch(0.55 0.10 150);
  --color-accent-700: oklch(0.40 0.08 150);

  /* Neutral — warm taupe */
  --color-neutral-50:  oklch(0.97 0.01 80);
  --color-neutral-100: oklch(0.93 0.02 80);
  --color-neutral-200: oklch(0.87 0.03 80);
  --color-neutral-500: oklch(0.55 0.04 80);
  --color-neutral-700: oklch(0.38 0.03 80);
  --color-neutral-900: oklch(0.20 0.02 80);

  /* Semantic */
  --color-background: oklch(0.98 0.01 80);
  --color-foreground: oklch(0.20 0.02 80);
}
```

**Typography scale (Minor Third, 1.2 ratio, base 16px):**
```css
/* Add to @layer base in globals.css */
--text-xs:   0.833rem;
--text-sm:   1rem;
--text-base: 1rem;
--text-lg:   1.2rem;
--text-xl:   1.44rem;
--text-2xl:  1.728rem;
--text-3xl:  2.074rem;
--text-4xl:  2.488rem;
--text-5xl:  2.986rem;
```

---

## 3. Site Map & Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/index.astro` | Landing — hero, value prop, featured offering, testimonial, CTA |
| `/about` | `pages/about.astro` | School philosophy, teacher bio, origin story |
| `/offerings` | `pages/offerings/index.astro` | Grid of all classes & workshops |
| `/offerings/[slug]` | `pages/offerings/[slug].astro` | Individual offering detail + Cal.com embed |
| `/packages` | `pages/packages.astro` | Package descriptions + purchase intent form |
| `/contact` | `pages/contact.astro` | Contact form + email list signup |
| `/faq` | `pages/faq.astro` | FAQ accordion |

---

## 4. Content Collections (src/content/)

### offerings/
Each file = one class or workshop. Frontmatter schema defined in `src/content/config.ts`.

Required frontmatter fields:
```yaml
---
title: "Sunday Morning Yoga"
type: class          # class | workshop | series
teacher: "Christopher"
cost: 18             # number, USD, no $ sign
duration: "75 minutes"
schedule: "Sundays 9:00–10:15am"
calcom_event_slug: "sunday-yoga"   # matches Cal.com event type slug
description: "A grounded opening..."
featured: false
active: true
---
Body text (markdown) — longer description, what to expect, what to bring.
```

### packages/
Each file = one package tier.

Required frontmatter fields:
```yaml
---
title: "5-Class Package"
class_count: 5
cost: 80
per_class_cost: 16
validity_days: 90
description: "Five classes to settle into a rhythm..."
highlight: false      # true = visually featured/recommended
---
```

---

## 5. Custom Components (src/components/)

Beyond AstroDeck's built-in sections, this project adds:

| Component | Purpose |
|---|---|
| `OfferingCard.astro` | Card for offerings grid — title, type badge, schedule, cost, CTA |
| `OfferingGrid.astro` | Responsive grid wrapper for OfferingCard |
| `ClassEmbed.astro` | Cal.com embed wrapper — accepts `eventSlug` prop |
| `PackageCard.astro` | Package tier display — cost, class count, per-class price, CTA |
| `PackagePurchaseForm.astro` | Purchase intent form — name, email, phone, package type, payment method |
| `ContactForm.astro` | Contact + newsletter signup (Web3Forms + Brevo) |

All components follow AstroDeck conventions:
- Props typed with TypeScript interfaces
- Tailwind utility classes only (no custom CSS unless unavoidable)
- Import path: `@/components/ComponentName.astro`

---

## 6. Third-Party Integrations

### Cal.com (class booking)
- Account at cal.com, one event type per offering
- Event slug matches `calcom_event_slug` in frontmatter
- Embed via `@calcom/embed-react` as an Astro island (client:load)
- After booking, Cal.com webhook fires to serverless function

### Serverless Webhook Function (booking confirmation)
- Location: `netlify/functions/booking-confirmation.js` OR `functions/booking-confirmation.js`
- Triggered by Cal.com webhook POST
- Payload includes: attendee name, email, event title, event start time
- Function actions:
  1. Build Venmo deep link: `https://venmo.com/?txn=pay&recipients=VENMO_USERNAME&amount=COST&note=EVENT_TITLE`
  2. Call Brevo transactional email API → send booking confirmation template
  3. Call Brevo contacts API → add attendee to "Students" list
- Environment variables needed: `BREVO_API_KEY`, `VENMO_USERNAME`, `CAL_WEBHOOK_SECRET`

### Web3Forms (contact form)
- POST to `https://api.web3forms.com/submit`
- Access key stored in env var `WEB3FORMS_ACCESS_KEY`
- No backend needed — form posts directly from browser

### Brevo (email + list management)
- Transactional email: booking confirmations with Venmo link
- Contact lists: "Students" (booked a class), "Interested" (contact form)
- Template variables: `{{student_name}}`, `{{class_name}}`, `{{class_date}}`, `{{class_cost}}`, `{{venmo_link}}`
- API key in env var `BREVO_API_KEY`

### Package Purchase Form
- Static form (no API needed for submission)
- Posts via Web3Forms to your email
- Fields: Full Name, Email, Phone, Package Type (select), Preferred Payment (Venmo/Zelle), Notes
- On submit: Web3Forms sends you notification email; user sees confirmation message with payment instructions

---

## 7. Layouts

Use AstroDeck's existing layouts:
- `BaseLayout` — all pages (handles head, nav, footer, dark mode)
- `PageLayout` — standard content pages (about, contact, faq, packages)
- `OfferingLayout` — extends BaseLayout, adds structured data for classes/events

---

## 8. Conventions

- **Import paths:** Always use `@/` prefix: `import X from "@/components/X.astro"`
- **No inline styles:** All styling via Tailwind classes
- **No class-based components:** Functional Astro components only
- **Content edits:** Add/edit markdown files in `src/content/`, never hardcode content in pages
- **New page checklist:** Add to sitemap in `astro.config.mjs`, add OG meta via BaseLayout props
- **Forms:** Never use HTML `<form>` action= directly for JS-handled forms; use `id` + JS fetch
- **Secrets:** Never hardcode API keys. Use `.env` locally, platform env vars in production.

---

## 9. Environment Variables

Create a `.env` file at project root (gitignored):
```
BREVO_API_KEY=your_key_here
WEB3FORMS_ACCESS_KEY=your_key_here
VENMO_USERNAME=your_venmo_username
CAL_WEBHOOK_SECRET=your_webhook_secret
PUBLIC_CAL_USERNAME=your_calcom_username
```

Variables prefixed `PUBLIC_` are safe to expose to the browser in Astro.

---

## 10. Deploy Target

**Cloudflare Pages** (preferred) or **Netlify** (fallback).
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+
- Serverless functions: Netlify Functions (`netlify/functions/`) OR Cloudflare Workers

---
*Last updated by setup script. Edit this file to update AI agent context.*
