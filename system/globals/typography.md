# Typography — Canonical Typography Definition

> **Source:** `src/styles/globals.css` (Fontsource imports + `@layer base`)

---

## Font Pairing

| Role | Family | Weights | Source |
|------|--------|---------|--------|
| Headings | Cormorant Garamond | 400, 400 italic, 600 | `@fontsource/cormorant-garamond` |
| Body | DM Sans | 400, 500 | `@fontsource/dm-sans` |

Headings use `font-family: var(--font-serif)` via `@layer base`. Body text inherits `var(--font-sans)` from `html`.

Both fonts use `font-display: swap` (via Fontsource defaults).

---

## Type Scale (Minor Third, 1.2 ratio, base 16px)

Defined as CSS custom properties on `html` in `@layer base`:

| Token | Size |
|-------|------|
| `--text-xs` | `0.833rem` |
| `--text-sm` | `1rem` |
| `--text-base` | `1rem` |
| `--text-lg` | `1.2rem` |
| `--text-xl` | `1.44rem` |
| `--text-2xl` | `1.728rem` |
| `--text-3xl` | `2.074rem` |
| `--text-4xl` | `2.488rem` |
| `--text-5xl` | `2.986rem` |

---

## Heading Scale

```
h1: text-4xl md:text-5xl font-semibold font-serif  → Hero headlines
h2: text-3xl md:text-4xl font-semibold font-serif   → Section headlines
h3: text-xl md:text-2xl font-semibold font-serif    → Sub-headlines, card titles
h4: text-lg font-medium font-serif                  → Feature titles
p:  text-base/text-lg text-muted-foreground         → Body text
```

### Font Weights

| Element | Weight | Utility |
|---------|--------|---------|
| h1, h2 | Semibold | `font-semibold` |
| h3, h4 | Semibold / Medium | `font-semibold` / `font-medium` |
| Body | Normal | `font-normal` (default) |

**Forbidden:** `font-extrabold`, `font-black` — too harsh for the warm, embodied brand voice.

---

## Body Text

- Default body: `text-base` (16px) or `text-lg` (18px)
- Color: `text-muted-foreground` for descriptions
- Color: `text-foreground` for primary body text
- Font: DM Sans (inherited from `html`)

---

## Responsive Typography

Always scale mobile-first — start small, go bigger:

```
text-3xl md:text-4xl     ← Correct (mobile-first)
text-5xl lg:text-3xl     ← Wrong (desktop-first)
```

Minimum text size on mobile: `text-sm` (14px) for body text.

---

## Heading Hierarchy

- Every page has exactly one `<h1>`
- `<h2>` for main sections (section titles)
- `<h3>` for subsections (card titles)
- Never skip levels (h1 → h3 without h2)
- Headings structure the page for screen readers and SEO
