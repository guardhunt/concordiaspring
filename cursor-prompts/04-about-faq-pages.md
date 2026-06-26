# Cursor Prompt 4 — About & FAQ Pages

## What to do
Build the About and FAQ static pages.
Read PROJECT.md section 2 (voice/aesthetic) before writing any copy.

## Task A: src/pages/about.astro

Use `PageLayout` as wrapper.

Page structure:
- Hero area: "About ConcordiaSpring" heading + short atmospheric intro
- **The School** section: 2–3 paragraphs about the school's philosophy.
  Voice: grounded, honest, non-grandiose. Somatic focus.
  Placeholder text is fine — use [PLACEHOLDER] comments.
- **The Teacher** section: teacher bio placeholder with photo slot (img with TODO comment).
  Christopher's background: somatic coach, yoga teacher, writer,
  former freediving instructor, Berea College CS grad.
- **The Space** section: brief note about where classes are held (placeholder).
- CTA strip: "Come to a class" button → /offerings

## Task B: src/pages/faq.astro

Use `PageLayout` as wrapper.
Use AstroDeck's FAQ/Accordion section component if available,
otherwise build a simple accessible disclosure accordion with Tailwind.

FAQ items (hardcoded, not from content collection):
1. **Do I need experience to join?** — No. All offerings are designed to meet you where you are.
2. **What should I bring?** — A yoga mat if you have one. Comfortable clothes. An open mind.
3. **How do packages work?** — You purchase a package, we confirm receipt of payment,
   and you use your classes over time. No app, no portal — just show up.
4. **What is somatic practice?** — A brief, plain-language explanation. [PLACEHOLDER]
5. **Can I get a refund?** — Placeholder refund/cancellation policy.
6. **How do I book a class?** — Visit the offering page and use the booking form.
   You'll get a confirmation email with payment details.

Accordion should be accessible (aria-expanded, aria-controls).
Animate open/close with CSS transition (max-height or details/summary).
