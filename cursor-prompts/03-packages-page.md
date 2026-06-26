# Cursor Prompt 3 — Packages Page

## What to do
Build the packages page at `src/pages/packages.astro`.
Read PROJECT.md sections 3, 4, 5, 6 before starting.

## Page structure

### Section 1: Intro
- Heading: "Class Packages"
- 2–3 sentence description: packages as a way to commit to a practice,
  save a little, and settle in. Warm, not salesy.

### Section 2: Package cards grid
Query all entries from the `packages` content collection.
Sort by `class_count` ascending.
Render one `PackageCard` per entry.
Layout: 3-column on desktop, 1-column on mobile, centered.
The `highlight: true` package should be visually elevated:
- Slightly larger
- Warm border (primary-400)
- "Most Popular" badge

### Section 3: PackagePurchaseForm
Render the `PackagePurchaseForm` component with id="purchase-form".
This is the anchor target from the PackageCard CTA buttons.

### Section 4: Payment instructions
Below the form, show clear payment instructions:
- **Venmo:** @YOUR_VENMO_USERNAME — include the class/package name in the note
- **Zelle:** YOUR_PHONE_OR_EMAIL
- Note: "Packages are activated once payment is received.
  We'll be in touch within 24 hours to confirm."
Use env var placeholders with TODO comments for real values.

## Task B: Finish PackagePurchaseForm.astro
Implement the full form:
- Fields: Full Name (text), Email (email), Phone (tel),
  Package (select — populated from the packages content collection or hardcoded options),
  Preferred Payment (radio: Venmo / Zelle), Additional Notes (textarea)
- Hidden fields: access_key (WEB3FORMS_ACCESS_KEY), subject
- JS fetch submit (no page reload)
- Success state: hide form, show payment instructions + "We'll confirm within 24 hours"
- Error state: show friendly error message
- Style with Tailwind + brand palette

## Task C: Style PackageCard.astro fully
- Clean card with generous padding
- Price prominent (text-3xl, Cormorant Garamond)
- Per-class price smaller, muted
- Validity note in small, neutral text
- CTA button: full-width, primary-500 background, white text, rounded
