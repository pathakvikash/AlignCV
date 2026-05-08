# UI Context

## Product Aesthetic

The application should feel:

- modern
- minimal
- technical
- intelligent
- professional
- trustworthy
- ATS-focused
- clean and structured

The UI should resemble a modern AI SaaS dashboard without excessive gradients, glassmorphism, or flashy visual effects.

Design priorities:

1. readability
2. information hierarchy
3. diff visibility
4. clean spacing
5. semantic color usage
6. recruiter-style professionalism

The interface must work equally well in:

- dark mode
- light mode

---

# Design Token Philosophy

The design system uses semantic tokens instead of raw colors.

Example:

```text
bg-surface
text-primary
border-muted
```

Instead of:

```text
bg-zinc-900
text-gray-400
```

This improves:

- maintainability
- dark/light theming
- consistency
- future scalability

This semantic-token approach is widely recommended for scalable Tailwind and SaaS design systems. :contentReference[oaicite:0]{index=0}

---

# Color System

## Brand Personality

The brand identity should communicate:

- AI intelligence
- precision
- reliability
- engineering quality
- recruiter professionalism

The UI should avoid:

- overly playful palettes
- neon cyberpunk styling
- excessive gradients
- generic “AI purple glow” aesthetics

---

# Core Semantic Color Tokens

| Token            | Light Mode         | Dark Mode        | Usage                       |
| ---------------- | ------------------ | ---------------- | --------------------------- |
| background       | #F8FAFC            | #0F172A          | Main application background |
| surface          | #FFFFFF            | #111827          | Cards and panels            |
| surface-elevated | #F1F5F9            | #1E293B          | Elevated containers         |
| surface-hover    | #E2E8F0            | #334155          | Hover states                |
| border           | #CBD5E1            | #334155          | Default borders             |
| border-muted     | #E2E8F0            | #1E293B          | Subtle separators           |
| text-primary     | #0F172A            | #F8FAFC          | Primary text                |
| text-secondary   | #475569            | #CBD5E1          | Secondary text              |
| text-muted       | #64748B            | #94A3B8          | Muted text                  |
| text-disabled    | #94A3B8            | #64748B          | Disabled text               |
| primary          | #2563EB            | #3B82F6          | Primary brand actions       |
| primary-hover    | #1D4ED8            | #2563EB          | Primary hover               |
| primary-soft     | #DBEAFE            | #1E3A8A          | Subtle highlights           |
| accent           | #06B6D4            | #22D3EE          | AI/accent highlights        |
| accent-soft      | #CFFAFE            | #164E63          | Secondary accents           |
| success          | #16A34A            | #22C55E          | Positive status             |
| warning          | #D97706            | #F59E0B          | Warning status              |
| destructive      | #DC2626            | #EF4444          | Error/destructive           |
| info             | #0284C7            | #38BDF8          | Informational status        |
| ring             | #60A5FA            | #60A5FA          | Focus rings                 |
| overlay          | rgba(15,23,42,0.5) | rgba(2,6,23,0.7) | Modal overlays              |

---

# AI-Specific Accent Tokens

These tokens are reserved for AI-generated or semantic-analysis UI.

| Token           | Light Mode | Dark Mode | Usage                          |
| --------------- | ---------- | --------- | ------------------------------ |
| ai-highlight    | #7C3AED    | #8B5CF6   | AI-generated sections          |
| ai-soft         | #EDE9FE    | #2E1065   | AI highlight backgrounds       |
| semantic-match  | #0891B2    | #06B6D4   | Semantic similarity indicators |
| rewrite-change  | #2563EB    | #60A5FA   | Rewrite diff highlights        |
| missing-skill   | #D97706    | #F59E0B   | Missing skills indicators      |
| validation-safe | #16A34A    | #22C55E   | Passed validation              |
| validation-risk | #DC2626    | #EF4444   | Validation warnings            |

---

# Typography System

## Typography Goals

Typography should feel:

- modern
- highly readable
- technical but approachable
- clean under dense information layouts

Avoid:

- decorative fonts
- futuristic fonts
- condensed typography
- heavy serif usage

---

# Font Stack

| Usage                    | Font                  |
| ------------------------ | --------------------- |
| Primary UI Font          | Inter                 |
| Code / JSON / Diff Views | JetBrains Mono        |
| Fallback Sans            | system-ui, sans-serif |
| Fallback Mono            | monospace             |

---

# Typography Scale

| Token     | Size | Weight | Usage             |
| --------- | ---- | ------ | ----------------- |
| text-xs   | 12px | 400    | Metadata          |
| text-sm   | 14px | 400    | Secondary UI text |
| text-base | 16px | 400    | Default body text |
| text-lg   | 18px | 500    | Section intros    |
| text-xl   | 20px | 600    | Card titles       |
| text-2xl  | 24px | 700    | Page titles       |
| text-3xl  | 30px | 700    | Hero titles       |

---

# Line Heights

| Token           | Value |
| --------------- | ----- |
| leading-tight   | 1.2   |
| leading-normal  | 1.5   |
| leading-relaxed | 1.7   |

---

# Font Weight Rules

| Weight | Usage                         |
| ------ | ----------------------------- |
| 400    | Body text                     |
| 500    | Labels and secondary emphasis |
| 600    | Section titles                |
| 700    | Main headings                 |

Avoid excessive font-weight variation.

---

# Border Radius Scale

The UI should use moderate rounded corners.

Avoid:

- overly sharp corners
- overly pill-shaped components

---

# Radius Tokens

| Token      | Value | Usage        |
| ---------- | ----- | ------------ |
| radius-xs  | 4px   | Small badges |
| radius-sm  | 6px   | Inputs       |
| radius-md  | 8px   | Buttons      |
| radius-lg  | 12px  | Cards        |
| radius-xl  | 16px  | Large panels |
| radius-2xl | 20px  | Modals       |

---

# Shadow System

Shadows should be subtle and professional.

Avoid:

- large blurry shadows
- floating/glassmorphism aesthetics

---

# Shadow Tokens

| Token     | Value                        |
| --------- | ---------------------------- |
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05)   |
| shadow-md | 0 4px 6px rgba(0,0,0,0.08)   |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.10) |

---

# Spacing System

Use an 8px spacing system.

| Token    | Value |
| -------- | ----- |
| space-1  | 4px   |
| space-2  | 8px   |
| space-3  | 12px  |
| space-4  | 16px  |
| space-5  | 20px  |
| space-6  | 24px  |
| space-8  | 32px  |
| space-10 | 40px  |
| space-12 | 48px  |

---

# Layout Style

## Main Layout

The application should use a dashboard-style layout.

Primary layout structure:

```text
------------------------------------------------
| Header                                         |
------------------------------------------------
| Upload Resume | Paste JD                      |
------------------------------------------------
| ATS Analysis Sidebar                          |
------------------------------------------------
| Resume Diff Viewer                            |
| Original        | Tailored                    |
------------------------------------------------
| Suggestions Panel                             |
------------------------------------------------
| Export Actions                                |
------------------------------------------------
```

---

# Component Style Rules

## Buttons

- medium radius
- subtle shadows
- clean typography
- no excessive gradients

---

## Cards

- layered surfaces
- soft borders
- moderate padding
- subtle elevation

---

## Inputs

- high readability
- strong focus states
- semantic validation colors

---

## Diff Viewer

The rewrite comparison UI is a core product feature.

Requirements:

- strong readability
- syntax-style highlighting
- semantic change emphasis
- side-by-side comparison support

---

# Accessibility Rules

The UI must:

- maintain WCAG AA contrast
- support keyboard navigation
- provide visible focus states
- avoid low-contrast muted text

Accessibility and semantic token systems are strongly recommended for scalable SaaS interfaces and Tailwind-based design systems. :contentReference[oaicite:1]{index=1}

---

# Design Constraints

Do not:

- use random Tailwind colors directly
- hardcode component colors
- mix semantic and raw color usage
- use inconsistent spacing
- introduce decorative gradients unnecessarily

All UI must consume semantic tokens.

---

# Future UI Expansion

Future UI additions may include:

- analytics dashboards
- resume scoring visualizations
- semantic match heatmaps
- recruiter feedback panels
- AI observability dashboards
- prompt tracing UI

The current token system should support future expansion without redesign.
