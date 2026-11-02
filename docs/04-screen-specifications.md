# ANN SETU — Screen Specifications

Screen-by-screen intent, primary action, key components and responsive behaviour.
Every screen is listed in `/#/handoff → Routes` with its role scope.

---

## Public

### 1. Landing `/#/`
**Intent:** explain the product to a normal person in 30 seconds and get them to register.
**Sections:** nav → hero (claim + CTAs + trust numbers + live-donation preview) → problem (4 facts) →
how it works (4 steps) → who it's for (3 role cards + institution card + quote) → food safety (pillars +
sample checklist) → impact (3 metrics) → CTA band → footer.
**Primary action:** "Donate surplus food". **Secondary:** "Join as an NGO".
**Responsive:** two-column hero ≥940px; single column below, preview card stacked; nav links hidden
<900px; "Sign in" hidden <430px.

### 2. Sign in `/#/login`
Role picker (5 options) → mobile number → OTP. Demo note states the OTP is 123456.
Split screen with a dark brand panel ≥900px.

### 3. Register `/#/register`
3 steps: role → organisation details (FSSAI for donors, registration for NGOs, vehicle for volunteers)
→ verification uploads + food-safety undertaking. Admin roles are explicitly not self-service.

---

## Donor

### 4. Dashboard `/#/donor`
**Question it answers:** "Is my food being collected, and what has it achieved?"
Stack: 4 stats → live donation card (with safety declaration rail) → active donation cards →
7-day meals chart → activity feed → CO₂e card.

### 5. Create donation `/#/donor/new`
**The most important form in the product.** Six steps, one question group per step, inline validation,
right rail with completion %, safety quick-guide and "who will see this".
Validation rules: title ≥4 chars, ≥20 servings, safe-until must be after preparation and ≤6h later,
storage required, temperature check + declaration mandatory, pickup must close before expiry.

### 6. Active donations `/#/donor/active`
Card grid with status chips + search. Empty state offers to create a donation.

### 7. Donation history `/#/donor/history`
4 summary stats → searchable adaptive table → row opens a detail modal with the full safety trail.
Exports are present but marked as prototype (CSV/print).

### 8. Donation detail `/#/donor/donations/:id` (also `/#/ngo/...`)
Role-aware: donor sees the OTP placeholder and safety log; NGO sees accept/assign; admin sees flag/
suspend. Layout: summary → safety declaration → location map → progress timeline → people rail.

### 9. Impact reports `/#/donor/impact`
Verified metrics only, with a definitions card explaining how each number is calculated.
Area chart, carbon bars, category donut, monthly statement table, tier progress, distribution ranking.

### 10. Profile & settings (all roles) `/#/donor/profile`
Organisation, notifications (safety alerts cannot be disabled), verification documents, security,
danger zone with an explicit warning about active donations.

---

## NGO

### 11. Dashboard `/#/ngo`
"Needs your decision" cards → in-progress list → distribution chart; rail: requirements progress,
volunteers on duty, category donut.

### 12. Nearby donations `/#/ngo/nearby`
List / cards / map views, radius + category filters, accept and decline (with reason). Rail carries
"before you accept" guidance and the reliability-score warning.

### 13. Accepted donations `/#/ngo/accepted`
Active vs completed. Banner when an accepted donation has no volunteer. Assign, mark distributed.

### 14. Food requirements `/#/ngo/requirements`
Cards with match progress, post-requirement modal, match history table.

### 15. Volunteer coordination `/#/ngo/volunteers`
Pool table (availability, rating, vehicle), runs tab, volunteer detail modal.

### 16. Distribution records `/#/ngo/distributions`
The source of all impact numbers. Stats → table → filing modal (donation, meals, location,
beneficiaries, photo). Rail explains why filing matters.

### 17. NGO impact `/#/ngo/impact`
Meals received, people served, partner donors, food collected; beneficiary-group table and reliability.

---

## Volunteer

### 18. Dashboard `/#/volunteer`
Online/offline toggle (44px+, pressed state), next-run card with two primary actions, today's tasks,
weekly deliveries chart, lifetime impact and safety reminder.

### 19–23. Task flow
`/pickups` list → `/pickups/:id` detail (route, checklist, contacts, progress) → `/navigate/:id`
(two legs) → `/verify/:id` (OTP with auto-advance or QR) → `/confirm/:id` (NGO code + photo + actual
count) → history.

### 24. Assignment history `/#/volunteer/history`
Stats, full run table (distance, time, rating), weekly bars, recognition card.

---

## Admin

### 25. Platform overview `/#/admin`
KPI row → "needs attention" alert → rescue funnel with an insight → daily rescue area chart →
live monitoring table → rail: verification queue, category donut, area performance.

### 26–28. Verification queues `/#/admin/donors|ngos|volunteers`
One component, three datasets. Stats → queue table → review modal (documents, 4-point checklist,
approve/reject with note, second-administrator review for rejections).

### 29. Donation monitoring `/#/admin/donations`
Every donation, filterable, with an inspection modal containing the audit trail and intervention
guidance ("suspending loses the food — prefer widening the radius").

### 30. Complaints `/#/admin/complaints`
SLA-visible register; detail modal shows the statement, resolution note and recurrence warning.

### 31. Food-safety incidents `/#/admin/incidents`
Severity, action taken, investigation notes, policy consequences.

### 32. Analytics `/#/admin/analytics`
Volume, funnel, loss reasons, area performance, data-quality bars, and a written insight with a
recommendation.

### 33. Reports `/#/admin/reports`
Report builder (date range, format, scope, inclusions), six report types, recent exports table.

---

## Super Admin

### 34. Platform overview `/#/superadmin`
Network growth, city split, system health (uptime, latency, DB load), administrator list, SLA alert.

### 35. User management `/#/superadmin/users`
All users with role/status filters; detail modal; suspension flow with an "active obligations" warning.

### 36. Admin management `/#/superadmin/admins`
Accounts table + explicit **role permission matrix** (what Admin can and cannot do vs Super Admin).

### 37. System configuration `/#/superadmin/config`
Four tabs: food safety (hold time, min servings, OTP, photo proof), matching, notifications, access &
retention. Every change is confirmed and audited; hard policy caps are displayed.

### 38. Audit logs `/#/superadmin/audit`
Append-only register with hash-chain explanation, actor filters and a payload viewer.

### 39–40. Platform analytics, Design system, Dev handoff
Cross-city analytics with unit economics; living component library; engineering documentation.

---

## Responsive contract (applies to every screen)

| Width | Navigation | Content |
|---|---|---|
| 320–480 | bottom tabs + drawer | 1 column, 16px padding, stacked tables, 44px targets |
| 481–680 | bottom tabs + drawer | 1 column, larger type doesn't shrink |
| 681–1024 | drawer (+ bottom bar) | 2 columns for card grids, tables stack |
| 1025–1600 | sticky sidebar, collapsible | 3–4 columns, full tables |
| 1600+ | sidebar + wider gutters | content capped at 1280px |

No horizontal scrolling is permitted at any width; wide tables scroll inside their own container.
