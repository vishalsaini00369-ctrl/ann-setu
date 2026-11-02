# ANN SETU — Developer Handoff

---

## 1. Running the prototype

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

Stack: **React 18 + Vite 5 + React Router 6**, plain CSS with custom properties.
No UI framework, no chart library, no webfont request — the whole product is self-contained.

> Demo credentials: any mobile number; OTP **123456**. Pickup OTP is shown on screen
> (e.g. `4821`); delivery code is **4321**. State is in-memory: refresh resets the demo.

## 2. Project structure

```
ann-setu/
├── index.html
├── docs/                       ← this handoff pack
└── src/
    ├── main.jsx                ← HashRouter + AppProvider + CSS imports
    ├── App.jsx                 ← every route in one table
    ├── nav.js                  ← navigation model (sidebar / drawer / bottom tabs per role)
    ├── data/
    │   ├── mockData.js         ← fictional sample data (single source)
    │   └── store.jsx           ← context + reducer + formatters
    ├── styles/
    │   ├── tokens.css          ← design tokens + reset  (never hard-code past this)
    │   ├── components.css      ← component library
    │   └── layout.css          ← shell, landing, auth, page composition
    ├── components/
    │   ├── Icon.jsx            ← 90-path inline icon set
    │   ├── Logo.jsx            ← brand mark + lockup (4 tones)
    │   ├── DonationCard.jsx    ← shared across donor / NGO / admin
    │   ├── ui/index.jsx        ← every primitive
    │   ├── charts/index.jsx    ← SVG charts with sr-only data tables
    │   └── layout/AppShell.jsx ← sidebar, topbar, drawer, bottom nav, PageHead
    └── pages/
        ├── Landing.jsx · Auth.jsx · DonationDetail.jsx · Profile.jsx
        ├── donor/ ngo/ volunteer/ admin/ superadmin/
        └── design/ DesignSystem.jsx · Handoff.jsx
```

## 3. State model (prototype)

`AppProvider` holds: `role`, `donations`, `tasks`, `history`, `notifications`, `ngos`, `toasts`,
`acceptedIds`, `draft`, `lastCreatedId`.

Actions: `SET_ROLE`, `CREATE_DONATION`, `SAVE_DRAFT`, `ACCEPT_DONATION`, `REJECT_DONATION`,
`ASSIGN_VOLUNTEER`, `UPDATE_STATUS`, `TOAST`, `DISMISS_TOAST`, `READ_ALL`.

Helpers exported: `useApp()`, `formatDate/Time/DateTime`, `relative()`, `useDocumentTitle()`.

In production replace `src/data/store.jsx` with TanStack Query (or similar) over the REST surface
below; the component API does not need to change.

## 4. Donation state machine

```
draft ──publish──► published ──accept──► accepted ──assign──► assigned
                      │                     │                   │
                      │ no NGO in window    │ decline           │ verify pickup OTP
                      ▼                     ▼                   ▼
                   expired              rejected            picked_up
                                                                │
                                                     verify delivery OTP + photo
                                                                ▼
                                                           delivered
                                                                │ NGO files record
                                                                ▼
                                                          distributed
```

Every transition is **server-authoritative** in production. The client may only *request* a transition;
the server re-checks: role permission, current state, safe window, OTP validity, idempotency key.

## 5. Proposed API surface

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/v1/auth/otp:request` | Send OTP |
| POST | `/v1/auth/otp:verify` | Session + role claims |
| GET | `/v1/donations?status=&lat=&lng=&radius=` | Radius-scoped feed |
| POST | `/v1/donations` | Create (declaration required) |
| POST | `/v1/donations/:id/accept` | NGO commit (race-safe) |
| POST | `/v1/donations/:id/assign` | Assign volunteer, mint pickup OTP |
| POST | `/v1/donations/:id/pickup` | Verify pickup OTP |
| POST | `/v1/donations/:id/deliver` | Verify delivery OTP + proof |
| POST | `/v1/distributions` | File distribution record |
| GET | `/v1/impact?scope=&period=` | Verified aggregates |
| POST | `/v1/verifications/:id/decision` | Admin approve/reject |
| GET | `/v1/audit?actor=&from=&to=` | Immutable register |

## 6. Non-negotiable product rules

1. **Every donation expires automatically** at its declared safe time. No override, ever.
2. **The safety declaration is mandatory and tamper-evident.** Editing it re-triggers verification.
3. **Two-point OTP handover.** A volunteer cannot confirm their own handover.
4. **Acceptance is a commitment.** Non-collection reduces the reliability score; three in 30 days pauses the account.
5. **Distribution records are the only source of impact numbers.**
6. **Verification precedes capability.** Unverified donors cannot publish; NGOs cannot accept; volunteers cannot be assigned.
7. **Every privileged action is audited** into an append-only, hash-chained log.

## 7. Real vs simulated

| Real in this prototype | Simulated |
|---|---|
| Navigation across all 45 screens | People, organisations, licence numbers (all fictional) |
| 6-step donation creation + validation | OTP delivery (code shown on screen) |
| NGO accept / decline with reasons | Maps and routing (static illustration, no GPS) |
| Volunteer assignment + OTP verification | File uploads (filenames mocked) |
| Delivery confirmation + photo requirement | Authentication (no session; role switching is instant) |
| Status transitions reflected across every view | Persistence (refresh resets) |
| Filtering, searching, tabs, modals, toasts | PDF/CSV export (triggers toast or print dialog) |
| Responsive layout at every breakpoint | Notifications (rendered, not pushed) |

## 8. Accessibility implementation

- Semantic landmarks: `header`, `nav[aria-label]`, `main#main-content`, `footer`; skip-link on every page.
- Modals: `role="dialog"`, `aria-modal`, labelled by their title, Escape closes, background scroll locked,
  first control focused, overlay click closes.
- Tables: `<th scope="col">`, sticky header, and an `sr-only` data table beside every chart.
- Form errors: `role="alert"`, `aria-invalid`, and text that names the fix.
- `:focus-visible` ring is never removed (2px `--green-600`, 2px offset).
- `prefers-reduced-motion` collapses all transitions.
- Icon-only buttons always carry `aria-label`.

## 9. Definition of done (per screen)

- [ ] Renders at 320 / 480 / 768 / 1024 / 1440 / 2560 px with no horizontal overflow
- [ ] Keyboard-only path completes the primary task
- [ ] Empty, loading and error states all designed
- [ ] Copy reviewed in plain English; no jargon, no blame
- [ ] Prototype/fictional data labelled where it appears
- [ ] Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI borders
- [ ] Touch targets ≥ 44px; focus ring visible on every control
- [ ] No hard-coded colour, spacing or font size outside `tokens.css`

## 10. Test evidence in this repo

`qa-ssr.mjs` server-renders **all 45 routes** and fails the build on any runtime error.
Run it with:

```bash
npx esbuild qa-ssr.mjs --bundle --platform=node --format=esm --outfile=qa-ssr.build.mjs \
  --loader:.css=empty --jsx=automatic --external:react --external:react-dom \
  --external:react-router-dom && node qa-ssr.build.mjs
```

Result: **45/45 routes render, 0 React warnings.**
