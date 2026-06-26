# Cursor Prompt 0 — Design System & Global Styles

## What to do
Apply the ConcordiaSpring brand design system to the AstroDeck base.
Read PROJECT.md fully before starting. Read AGENTS.md for AstroDeck conventions.

## Tasks

### 1. Update src/styles/globals.css
Replace the default AstroDeck color tokens with the ConcordiaSpring palette
from the `@theme` block in PROJECT.md section 2. Keep all existing @layer
base/components/utilities structure — only swap the color variables.

Add the typography scale CSS custom properties from PROJECT.md section 2
to the @layer base block.

### 2. Install and configure Google Fonts
Install Fontsource packages:
```
npm install @fontsource/cormorant-garamond @fontsource/dm-sans
```
Import in globals.css:
```css
@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/400-italic.css";
@import "@fontsource/cormorant-garamond/600.css";
@import "@fontsource/dm-sans/400.css";
@import "@fontsource/dm-sans/500.css";
```
Set heading font to Cormorant Garamond and body font to DM Sans in the
@layer base `html` block.

### 3. Update system/globals/ design knowledge files
Update `system/globals/colors.md` to document the new ConcordiaSpring palette.
Update `system/globals/typography.md` to document the font pairing and scale.
Update `system/globals/brand.md` (create if missing) with the aesthetic notes
from PROJECT.md section 2.

### 4. Update the Nav component
Edit the existing Nav/Header component to use:
- Logo text: "ConcordiaSpring"
- Navigation links: Home, Offerings, Packages, About, Contact
- Brand colors from the new palette
- Clean, minimal style — no heavy shadows or borders

### 5. Update the Footer component
Edit the existing Footer to use:
- School name and tagline: "ConcordiaSpring · Yoga & Somatics · Asheville, NC"
- Links: Offerings, Packages, Contact
- Warm neutral background, not stark black

## Success criteria
- `npm run build` passes with no errors
- `npm run dev` shows the correct fonts and warm color palette
- No hardcoded hex colors anywhere — all colors via CSS variables
