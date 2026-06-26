# Cursor Prompt 1 — Landing Page (index.astro)

## What to do
Build the landing page at `src/pages/index.astro`.
Read PROJECT.md fully before starting.

## Page structure (in order, top to bottom)

### Section 1: Hero
Use AstroDeck's existing Hero section component.
Customize with:
- Headline: "Where the body comes home."
- Subheadline: "Yoga and somatic practice in Asheville, NC.
  Classes, workshops, and experiences for those ready to return to themselves."
- Primary CTA button: "See Offerings" → /offerings
- Secondary CTA button: "Get in Touch" → /contact
- No hero image — use a warm gradient background using primary/neutral palette tokens
- Large, generous typography (h1 at --text-5xl, Cormorant Garamond)

### Section 2: Brief philosophy / value proposition
Three-column icon/text grid. Use AstroDeck's Features section component if it fits,
or build a simple responsive grid. Content:
- **Presence over performance** — "This is not a fitness class. It is a practice of coming back."
- **Rooted in sensation** — "We work with what the body actually holds, not what we think it should do."
- **Small and relational** — "Classes are intentionally small. You will be known here."

### Section 3: Featured offering
Query `src/content/offerings` for entries where `featured: true`.
Display the first result using the `OfferingCard` component.
Heading: "Currently Offering"

### Section 4: Single testimonial / pull quote
Hardcode one placeholder testimonial for now (TODO comment for real quote):
> "Something shifted in my body that I had been trying to think my way through for years."
> — Student, Sunday Morning Yoga

Centered, large italic text. Warm background tint.

### Section 5: CTA strip
Simple full-width CTA section. Use AstroDeck's CTA component.
- Heading: "Ready to begin?"
- Button: "View all offerings" → /offerings

## Notes
- Use `PageLayout` as the wrapper layout
- Pass `title="ConcordiaSpring — Yoga & Somatics, Asheville NC"` to the layout
- Pass a short `description` for SEO meta
- All content in the page file itself — no content collection needed for landing page copy
