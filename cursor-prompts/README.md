# ConcordiaSpring — Cursor Build Prompts

Run these prompts in order in Cursor Agent mode.
Each prompt is self-contained and references PROJECT.md for context.

## Order of execution

| File | What it builds |
|---|---|
| `00-design-system.md` | Brand colors, fonts, nav, footer |
| `01-landing-page.md` | Home page (hero, philosophy, featured offering, CTA) |
| `02-offerings-pages.md` | Offerings grid + individual class pages + Cal.com embed |
| `03-packages-page.md` | Package tiers + purchase intent form |
| `04-about-faq-pages.md` | About page + FAQ accordion |
| `05-contact-page.md` | Contact form + newsletter + booking webhook function |
| `06-seo-deploy.md` | SEO meta, sitemap, structured data, deploy config |

## How to use in Cursor

1. Open the project in Cursor
2. Open a prompt file (e.g. `cursor-prompts/00-design-system.md`)
3. Select all text, then open Cursor Agent (Cmd+I or Ctrl+I)
4. Paste the prompt and let the agent work
5. Review changes, run `npm run build` to verify, then move to the next prompt

## Before running any prompts

- Set up your `.env` file (copy from `.env.example`)
- Create your Cal.com account and note your username
- Create your Web3Forms account and get an access key
- Create your Brevo account, get an API key, create "Students" and "Interested" lists
- Note your Venmo username

## Customization

Edit the placeholder copy (marked with [PLACEHOLDER] or TODO comments) in each
generated file. The prompts use representative content — replace with your real
voice and details before launch.
