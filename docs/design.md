# Design Conventions

Visual reference for Capytal's UI. Keeps design decisions consistent across phases.

---

## Typography

| Role                                               | Font       | Notes                                                     |
| -------------------------------------------------- | ---------- | --------------------------------------------------------- |
| General UI (labels, body, headings)                | Geist      | Via `next/font/google`, no external dependency            |
| Financial values (prices, percentages, quantities) | Geist Mono | Same family — harmonious pairing, digits align in columns |

---

## Color Palette

### Accent — Apple Green

Base: `#34C759` — `hsl(142, 55%, 49%)`

| Variant | Value                | Use case                                  |
| ------- | -------------------- | ----------------------------------------- |
| Full    | `hsl(142, 55%, 49%)` | Buttons, positive value text, key actions |
| Hover   | `hsl(142, 55%, 42%)` | Button hover states                       |
| Soft    | `hsl(142, 40%, 85%)` | Table row backgrounds, badges, tags       |
| Subtle  | `hsl(142, 25%, 92%)` | Section backgrounds, highlights           |

### Neutrals

| Role            | Value                | Notes                                          |
| --------------- | -------------------- | ---------------------------------------------- |
| Page background | `hsl(210, 20%, 98%)` | Off-white, not pure white                      |
| Card background | `hsl(0, 0%, 100%)`   | White cards on light background                |
| Border          | `hsl(210, 15%, 90%)` | Subtle, low contrast                           |
| Text primary    | `hsl(210, 15%, 15%)` | Near-black, easier on the eyes than pure black |
| Text secondary  | `hsl(210, 10%, 50%)` | Labels, captions, metadata                     |

### Semantic

| Role            | Value              | Notes                   |
| --------------- | ------------------ | ----------------------- |
| Positive / gain | `#34C759`          | Same as accent          |
| Negative / loss | `hsl(4, 75%, 55%)` | Muted red, not alarming |

---

## Components

| Property       | Value                                        |
| -------------- | -------------------------------------------- |
| Border radius  | `rounded-xl` (12px) — cards, inputs, buttons |
| Card shadow    | `shadow-sm` — subtle, not heavy              |
| Spacing rhythm | Tailwind's default 4px base scale            |

---

## Libraries

| Library   | Role                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| shadcn/ui | Component foundation — accessible, Tailwind-based, code is owned (copied into repo, not a black-box dependency) |
| Lucide    | Icon library — default icon set for shadcn/ui, consistent with Tailwind conventions                             |

---

## Inspiration

Visual reference: fintech dashboard — light background, card-based layout, soft greens and blues, generous whitespace.
