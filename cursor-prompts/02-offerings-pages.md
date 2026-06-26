# Cursor Prompt 2 — Offerings Pages

## What to do
Build the offerings index and dynamic detail pages.
Read PROJECT.md sections 3, 4, 5 before starting.

## Task A: src/pages/offerings/index.astro

Query all entries from the `offerings` content collection where `active: true`.
Sort by `featured: true` first, then alphabetically.

Page structure:
- Hero area: heading "Offerings", short intro paragraph about the school's approach
- Responsive grid (2 cols on tablet, 3 on desktop, 1 on mobile)
- Render one `OfferingCard` per offering, passing all required props
- Use `OfferingGrid` wrapper component if it exists; create it if not

## Task B: src/pages/offerings/[slug].astro

Use `getStaticPaths()` to generate one page per offering entry.
Use `getEntry()` or `render()` to get the full content.

Page structure:
- Back link: "← All Offerings" → /offerings
- Offering header: title, type badge, teacher, schedule, duration, cost
- Body content: rendered markdown from the content file
- Booking section heading: "Reserve your spot"
- `ClassEmbed` component passing `eventSlug={entry.data.calcom_event_slug}`
- Payment note below embed: "A $X payment is due at time of booking.
  You will receive a confirmation email with Venmo and Zelle payment details."

Use `OfferingLayout` as the wrapper layout (create it if it doesn't exist,
extending BaseLayout with appropriate structured data for events).

## Task C: Finish OfferingCard.astro styling
Style `src/components/OfferingCard.astro` fully with Tailwind:
- Warm neutral card background (neutral-50 or neutral-100)
- Terracotta accent on the type badge (primary-200 background, primary-700 text)
- Subtle border (neutral-200)
- Hover: gentle lift (translate-y-[-2px] transition)
- Featured badge: small pill, accent-500 background

## Task D: Install Cal.com embed
```
npm install @calcom/embed-react
```
Create `src/components/CalEmbed.tsx` as a React component:
```tsx
import Cal from "@calcom/embed-react";
export default function CalEmbed({ calLink }: { calLink: string }) {
  return <Cal calLink={calLink} style={{ width: "100%", minHeight: "600px" }} />;
}
```
Update `src/components/ClassEmbed.astro` to import and use CalEmbed.tsx
with `client:load`.
