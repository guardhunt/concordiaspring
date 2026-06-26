# ConcordiaSpring

Website for **ConcordiaSpring** — a yoga and somatics school in Asheville, NC. Static-first marketing site for classes, workshops, class packages, and contact. Built on [AstroDeck](https://github.com/holger1411/astrodeck) as the foundation.

## Overview

ConcordiaSpring offers drop-in yoga, somatic workshops, and multi-class packages. The site is fully static: content lives in markdown collections, forms post to third-party APIs (Web3Forms, Brevo), and class booking uses a Cal.com embed. There is no custom backend or database.

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, philosophy, featured offering, CTA |
| Offerings | `/offerings` | Class & workshop grid |
| Offering detail | `/offerings/[slug]` | Description + Cal.com booking |
| Packages | `/packages` | Package tiers + purchase form |
| About | `/about` | School philosophy & teacher bio |
| FAQ | `/faq` | Common questions |
| Contact | `/contact` | Contact form + newsletter opt-in |

## Tech stack

- **Astro 6** — static site generation, islands for Cal.com embed
- **Tailwind CSS v4** — OKLCH design tokens in `src/styles/globals.css`
- **Content collections** — offerings and packages in `src/content/`
- **Integrations** — Web3Forms, Brevo, Cal.com; booking webhook via Netlify Function

## Local development

```bash
npm install
cp .env.example .env   # fill in your keys
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build    # production build → dist/
npm run preview  # serve the built site locally
npm run check:kpis  # convention checks (colors, SEO, imports)
```

## Environment variables

See `.env.example`. At minimum for local dev:

- `WEB3FORMS_ACCESS_KEY` — contact & package forms
- `PUBLIC_CAL_USERNAME` — Cal.com embed
- `VENMO_USERNAME` — payment instructions on packages

Optional: `PUBLIC_BREVO_API_KEY`, `PUBLIC_BREVO_INTERESTED_LIST_ID` for newsletter signup. Server-side Brevo vars (`BREVO_TEMPLATE_ID`, etc.) are for the booking webhook only.

## Deploy

Target: **Cloudflare Pages** (see `.cloudflare/deploy.md`).

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20+ |

Set build-time env vars in the Cloudflare dashboard. Confirm `site` in `astro.config.mjs` matches your live domain.

## Project docs

| File | Purpose |
|------|---------|
| `PROJECT.md` | Brand, content schema, integrations — **read first for AI or human edits** |
| `TODOS.md` | Pre-launch checklist |
| `AGENTS.md` | AstroDeck coding conventions |
| `cursor-prompts/` | Step-by-step setup prompts used to build the site |

## License

MIT — inherited from the AstroDeck starter. ConcordiaSpring site content and branding are project-specific.
