# ANN SETU · अन्न सेतु
### Connecting Surplus Food to Those Who Need It

A complete, clickable design prototype of a food-rescue and distribution platform — five role
workspaces, 45 screens, one design system.

![status](https://img.shields.io/badge/prototype-interactive-0E7A54) ![a11y](https://img.shields.io/badge/WCAG-2.2%20AA-0E7A54)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Open the app, then use the **role switcher** in the top bar (Donor · NGO · Volunteer · Admin ·
Super Admin) to move between the five experiences. Sign-in demo OTP: **123456**.
Pickup OTP is shown on the screen; delivery code is **4321**.

## What's inside

| Area | Screens |
|---|---|
| **Public** | Landing page, Sign in, 3-step Register |
| **Donor** | Dashboard, 6-step Create donation, Active, History, Detail, Impact, Profile |
| **NGO** | Dashboard, Nearby (map/list), Detail, Accepted, Requirements, Volunteers, Distributions, Impact |
| **Volunteer** | Dashboard, Pickups, Detail, Navigation, OTP Verify, Delivery Confirm, History, Profile |
| **Admin** | Overview, Donor/NGO/Volunteer verification, Monitoring, Complaints, Incidents, Analytics, Reports |
| **Super Admin** | Overview, Users, Admins, Configuration, Audit logs, Analytics |
| **Docs** | Living design system · Developer handoff |

## Design system

- Tokens: `src/styles/tokens.css` — colour, type, spacing, radius, elevation, motion, breakpoints
- Components: `src/styles/components.css` + `src/components/ui/index.jsx`
- Living documentation: `/#/design-system`
- Specification: `docs/02-design-system.md`

## Documentation pack (`docs/`)

1. `01-product-brief.md` — product understanding, principles, personas, success metrics
2. `02-design-system.md` — colour, type, spacing, components, writing style
3. `03-user-journeys.md` — navigation model and five end-to-end journeys
4. `04-screen-specifications.md` — every screen's intent, components, responsive behaviour
5. `05-developer-handoff.md` — code structure, state machine, API, a11y, definition of done

## Verification

- `npm run build` — production bundle compiles clean (52 KB CSS, 512 KB JS before gzip).
- `qa-ssr.mjs` — server-renders **all 45 routes** and fails on any runtime error: **45/45 pass, 0 React warnings**.
- `ann-setu-prototype.html` — a single self-contained build (no network requests, classic script) for
  offline review or embedding. Rebuild with `node build-standalone.mjs`.
- CSS audit: every `var(--token)` used is defined; braces balanced; no hard-coded colours in page files.

## Notes

All organisations, people, licence numbers and metrics are **fictional sample data** for
demonstration. Nothing in this prototype is a live service, and no data is persisted — a refresh
resets the demo.
