# Cursor Prompt 6 — SEO, Sitemap & Deploy Config

## What to do
Finalize SEO, add structured data, configure for Cloudflare Pages deploy.
Read PROJECT.md section 10 (deploy target) before starting.

## Task A: astro.config.mjs
Ensure the following integrations are configured:
```js
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";  // needed for Cal.com embed

export default defineConfig({
  site: "https://concordiaspring.com",  // TODO: update with real domain
  integrations: [
    sitemap(),
    react(),
    // tailwindcss() if not already present
  ],
});
```
Install any missing integrations: `npm install @astrojs/sitemap @astrojs/react`

## Task B: BaseLayout.astro SEO meta
Ensure BaseLayout accepts and renders these props:
- `title` (string, required)
- `description` (string, optional, defaults to site description)
- `ogImage` (string, optional, defaults to /og-default.png)
- `canonicalURL` (string, optional, auto-generated from Astro.url)

Render in <head>:
- `<title>` tag
- `<meta name="description">`
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Twitter card: twitter:card, twitter:title, twitter:description, twitter:image
- `<link rel="canonical">`
- `<link rel="sitemap">`

## Task C: Structured data for offerings
In `src/pages/offerings/[slug].astro`, add a JSON-LD script tag for
Event structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "[offering title]",
  "description": "[offering description]",
  "organizer": { "@type": "Organization", "name": "ConcordiaSpring" },
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled"
}
```

## Task D: public/ files
Create or ensure these exist in `public/`:
- `robots.txt`: allow all, reference /sitemap-index.xml
- `og-default.png`: placeholder 1200x630 with TODO comment
  (Note: create a solid terracotta rectangle as placeholder using canvas or just a TODO)
- `favicon.svg`: simple placeholder SVG (leaf or circle in primary-500 color)

## Task E: Cloudflare Pages config
Create `_headers` file in `public/`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Create `.cloudflare/` directory with a note file explaining:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables to set in Cloudflare dashboard (list from .env.example)

## Task F: Final build check
Run `npm run build` and fix any TypeScript or import errors.
Run `npm run preview` to verify the built site loads correctly.
Document any remaining TODOs in a `TODOS.md` file at project root.
