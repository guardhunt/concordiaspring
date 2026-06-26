# Colors — Canonical Color Definition

> **Source:** `src/styles/globals.css` (`@theme` + `.dark`)
> **Format:** OKLCH — `oklch(lightness chroma hue)`
> **Configuration:** Only edit in `globals.css`, NEVER in `tailwind.config.mjs`

---

## Brand Palette

ConcordiaSpring uses warm earth tones — terracotta, clay, warm taupe, and muted sage green. Soft, low-contrast, handmade-paper feel. Light mode is primary; dark mode is optional and uses warm neutrals (not stark black).

---

## Scale Tokens (Light Mode)

### Primary — warm terracotta

| Token | Value |
|-------|-------|
| `--color-primary-50` | `oklch(0.97 0.01 45)` |
| `--color-primary-100` | `oklch(0.93 0.03 45)` |
| `--color-primary-200` | `oklch(0.87 0.06 45)` |
| `--color-primary-300` | `oklch(0.78 0.09 45)` |
| `--color-primary-400` | `oklch(0.68 0.12 45)` |
| `--color-primary-500` | `oklch(0.58 0.14 45)` |
| `--color-primary-600` | `oklch(0.50 0.13 45)` |
| `--color-primary-700` | `oklch(0.42 0.11 45)` |
| `--color-primary-800` | `oklch(0.33 0.08 45)` |
| `--color-primary-900` | `oklch(0.24 0.05 45)` |
| `--color-primary-950` | `oklch(0.16 0.03 45)` |

### Accent — muted sage green

| Token | Value |
|-------|-------|
| `--color-accent-50` | `oklch(0.97 0.02 150)` |
| `--color-accent-500` | `oklch(0.55 0.10 150)` |
| `--color-accent-700` | `oklch(0.40 0.08 150)` |

### Neutral — warm taupe

| Token | Value |
|-------|-------|
| `--color-neutral-50` | `oklch(0.97 0.01 80)` |
| `--color-neutral-100` | `oklch(0.93 0.02 80)` |
| `--color-neutral-200` | `oklch(0.87 0.03 80)` |
| `--color-neutral-500` | `oklch(0.55 0.04 80)` |
| `--color-neutral-700` | `oklch(0.38 0.03 80)` |
| `--color-neutral-900` | `oklch(0.20 0.02 80)` |

---

## Semantic Tokens (Light Mode)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `oklch(0.98 0.01 80)` | Page background |
| `--color-foreground` | `oklch(0.20 0.02 80)` | Default text |
| `--color-card` | `oklch(0.97 0.01 80)` | Card background |
| `--color-card-foreground` | `oklch(0.20 0.02 80)` | Card text |
| `--color-primary` | `oklch(0.50 0.13 45)` | Primary actions, CTAs |
| `--color-primary-foreground` | `oklch(0.97 0.01 45)` | Text on primary |
| `--color-secondary` | `oklch(0.93 0.02 80)` | Secondary surfaces |
| `--color-secondary-foreground` | `oklch(0.20 0.02 80)` | Text on secondary |
| `--color-muted` | `oklch(0.93 0.02 80)` | Muted surfaces |
| `--color-muted-foreground` | `oklch(0.55 0.04 80)` | Subtle text |
| `--color-accent` | `oklch(0.97 0.02 150)` | Accent surfaces |
| `--color-accent-foreground` | `oklch(0.40 0.08 150)` | Text on accent |
| `--color-destructive` | `oklch(0.55 0.18 29)` | Errors, delete actions |
| `--color-border` | `oklch(0.87 0.03 80)` | Borders, dividers |
| `--color-ring` | `oklch(0.58 0.14 45)` | Focus ring |

## Semantic Tokens (Dark Mode)

Dark mode uses warm taupe and terracotta — never pure black or white.

| Token | Value |
|-------|-------|
| `--color-background` | `oklch(0.20 0.02 80)` |
| `--color-foreground` | `oklch(0.97 0.01 80)` |
| `--color-primary` | `oklch(0.68 0.12 45)` |
| `--color-primary-foreground` | `oklch(0.16 0.03 45)` |
| `--color-muted` | `oklch(0.33 0.03 80)` |
| `--color-muted-foreground` | `oklch(0.70 0.03 80)` |
| `--color-border` | `oklch(0.38 0.03 80)` |

---

## Section Variants

| Class | Effect |
|-------|--------|
| `section-muted` | Muted background (`--color-muted`) |
| `section-inverted` | Warm terracotta-dark in light mode, warm taupe-light in dark mode |

---

## Color Semantics

| Purpose | Utility Class | Example |
|---------|--------------|---------|
| Page background | `bg-background` | Body, layouts |
| Default text | `text-foreground` | Paragraphs, headlines |
| Subtle text | `text-muted-foreground` | Descriptions, meta info |
| Primary button | `bg-primary text-primary-foreground` | CTAs, main actions |
| Secondary button | `bg-secondary text-secondary-foreground` | Secondary actions |
| Error state | `text-destructive` | Validation, warnings |
| Card background | `bg-card` | Cards, panels |
| Borders | `border-border` | Dividers, card borders |
| Focus ring | `ring-ring` | Focus indicators |

---

## Rules

1. **Only use CSS variables** — `bg-primary`, not `bg-orange-500`
2. **OKLCH only** — no HSL, no hex, no RGB
3. **No `dark:` prefix** — colors switch automatically via `.dark` class
4. **`--color-` prefix** — all tokens start with `--color-`
5. **No `tailwind.config.mjs`** — config lives in `src/styles/globals.css`
6. **No `@astrojs/tailwind`** — project uses `@tailwindcss/vite`
