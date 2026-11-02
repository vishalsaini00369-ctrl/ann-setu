# ANN SETU — Design System Specification

Source of truth in code: `src/styles/tokens.css` (variables), `src/styles/components.css`
(primitives), `src/styles/layout.css` (shell + page composition).
Living documentation screen: **`/#/design-system`**.

---

## 1. Colour

**One green family** (trust + sustainability), **one neutral family** (slightly green-tinted so white
never looks blue), **four semantic tones**. No gradients in product surfaces.

| Token | Hex | Role |
|---|---|---|
| `--green-600` | `#0E7A54` | Primary action, focus ring, active nav |
| `--green-700` | `#0A6244` | Hover, links, emphasis text |
| `--green-800` | `#084D36` | Dark surfaces, CTA band, auth aside |
| `--green-50` | `#EAF7F0` | Selected rows, quiet fills |
| `--ink-900` | `#0D1A15` | Headings |
| `--ink-700` | `#24352E` | Body text |
| `--ink-500` | `#5A6B64` | Secondary text |
| `--canvas` | `#FAFBF9` | App background |
| `--line` | `#E3E8E5` | Borders, dividers |
| `--warning` | `#9A5B00` on `#FDF3E2` | Expiry, attention |
| `--danger` | `#B42318` on `#FDECEA` | Errors, safety |
| `--info` | `#1B4FD8` on `#EDF2FE` | Neutral system messages |

**Rule:** a status colour always ships as *tint background + text tone + dot + label*. Colour is never
the only signal.

## 2. Type

Family: `Inter → Segoe UI → system-ui` (no webfont request, so the prototype works offline).
Devanagari: `Noto Sans Devanagari → Nirmala UI → Mangal` on the `.deva` class only.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Display / hero | 48–60 px clamp | 700 | −0.035em tracking |
| Page title | 24 px | 600 | −0.02em |
| Section title | 18 px | 600 | |
| Card title | 16 px | 600 | |
| Body | 14 px | 400 | 1.55 line-height |
| Small / metadata | 12 px | 500 | |
| Micro / table head | 11 px | 700 | uppercase, 0.06em |

Never apply letter-spacing to Devanagari. Body copy max width 68ch.

## 3. Spacing, radius, elevation

- Spacing: 4px base — `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 20 · `--s-6` 24 · `--s-7` 32 · `--s-8` 40 · `--s-9` 48 · `--s-10` 64 · `--s-11` 80 · `--s-12` 96 · `--s-13` 128
- Radius: 6 / 8 / 10 / 14 / 20 / full. Cards 14, inputs 8, buttons 8, badges full.
- Elevation: five steps (`--sh-xs` → `--sh-xl`). Cards use `xs`; only dialogs and popovers go above `md`.
- Control heights: 32 (sm) / 40 (default) / 48 (lg). Touch target minimum 44.

## 4. Components (all in `src/components/ui/index.jsx`)

| Component | Variants | Notes |
|---|---|---|
| Button | primary, secondary, quiet, ghost, danger, danger-ghost, inverse · sm/md/lg · icon, block, loading | One primary per view |
| Field | label, required/optional, hint, error | Label always visible |
| Input / Textarea / Select | default, hover, focus, disabled, invalid | 1px border `--line-strong` |
| CheckRow | default, checked | Full-row 44px hit area |
| SegmentedControl | 2–4 options | For mutually exclusive views |
| Badge / StatusBadge | success, warning, danger, info, neutral, green | Single tone map for the product |
| Card | default, flat, raised, interactive | 14px radius, 1px border |
| Stat | label + value + unit + delta + context | Never a bare number |
| Table | default, compact, adaptive, selectable | Sticky head, stacks < 860px |
| Tabs / Chips | active, count | Filters live in Chips |
| Modal | md, lg | Focus trap, Esc, bottom sheet < 560px |
| Toasts | success, error | `aria-live="polite"`, 4.6s |
| EmptyState / Skeleton / Alert | — | Every screen designs all three |
| Timeline / KV / Progress / Avatar | — | Audit, detail, identity |
| Charts | Bar, Area, Donut, HBars, Sparkline | Hand-built SVG + sr-only data table |

## 5. Layout

- Content max 1280px, page padding 20px desktop / 16px mobile.
- Sidebar 264px (76px collapsed) ≥1025px; drawer + bottom tab bar below.
- 12-column grid, 20–24px gutters. Card grids: 4 → 3 → 2 → 1.
- Split layouts use `.split`, `.split--rail` (collapses at 1180), `.split--main` (at 1000),
  `.split--auto` (at 760) — never inline `grid-template-columns`.

## 6. Motion

120 / 180 / 280 ms, `cubic-bezier(0.22, 0.61, 0.36, 1)`. Only opacity and small transforms animate.
`prefers-reduced-motion` collapses everything to 1ms.

## 7. Writing style

- Sentence case for titles; Title Case only for proper nouns.
- Buttons are verbs: "Publish donation", "Accept donation", "Assign volunteer".
- Errors state the problem and the fix: *"Minimum 20 servings per donation — combine smaller lots."*
- Never blame the user. Never use "invalid" without saying what to enter.
