# ANN SETU — Navigation Flow & User Journeys

---

## 1. Navigation model (one shell, five products)

```
                              ┌──────────────────────────┐
                              │  LANDING  /              │
                              └────────────┬─────────────┘
                                           │
                        ┌──────────────────┴───────────────────┐
                        │                                      │
                   LOGIN /login                        REGISTER /register
                   (role picker → OTP)                  (role → details → verification)
                        │
      ┌──────────┬──────┴──────┬──────────────┬───────────────────┐
      ▼          ▼             ▼              ▼                   ▼
   /donor      /ngo       /volunteer       /admin           /superadmin
   ───────     ─────       ──────────      ─────────        ────────────
   Dashboard   Dashboard   Dashboard       Overview         Overview
   Create      Nearby      Pickups         Verification×3   Users
   Active      Accepted    Pickup detail   Monitoring       Admins
   History     Requirements Navigate       Complaints       Configuration
   Detail      Volunteers  Verify (OTP)    Incidents        Audit logs
   Impact      Distributions Confirm        Analytics       Analytics
   Profile     Impact       History        Reports
                           Profile
```

Sidebar (desktop) / drawer (mobile) / bottom tab bar (mobile) are all driven by one config:
`src/nav.js → navConfig` and `bottomTabs`.

---

## 2. Journey A — Donor lists surplus food (happy path)

```
Rakesh finishes service at 21:40
  │
  ├─ Opens app → Donor dashboard
  │    sees: live donation status, pending pickups, meals donated
  │
  ├─ Taps "Create donation" (primary, thumb-reachable)
  │    Step 1  Food: name, category, diet                 ← 9 s
  │    Step 2  Quantity: servings, weight, containers     ← 12 s
  │    Step 3  Preparation: prepared at, safe until       ← 14 s
  │    Step 4  Safety: storage, temp check, declaration   ← 22 s  (must be honest)
  │    Step 5  Pickup: address, window, contact           ← 16 s
  │    Step 6  Review → Publish
  │
  ├─ Toast: "Donation published · 120 servings visible to verified NGOs within 6 km"
  │
  ├─ Donation detail shows a live progress timeline
  │    "Awaiting NGO" → NGO accepts (avg 9 min) → volunteer assigned
  │
  ├─ Volunteer arrives; Rakesh reads the 4-digit pickup OTP → handover
  │
  └─ Next morning: impact report shows 120 meals served, 38 kg rescued, CO₂e avoided
```

**Failure branches designed for**
- No NGO accepts → automatic expiry at the declared safe time (never "accepting late offers")
- Donor wants to cancel → allowed until a volunteer is assigned; after that, requires NGO acknowledgement
- Declared quantity is wrong → volunteer can report a shortfall at pickup without blocking the run

---

## 3. Journey B — NGO accepts and receives food

```
Anita opens her dashboard at 12:10
  │
  ├─ Alert: "3 new donations need an NGO"
  ├─ Nearby donations: filter by radius (6 km) and category; map or list
  │
  ├─ Reviews AS-2026-1042
  │    • 120 servings, veg, halal-compatible
  │    • safe until 18:00, pickup 13:00–15:30
  │    • FSSAI-verified donor, 98/100 reliability
  │
  ├─ Accepts → modal commits her to collect + distribute
  │    reason codes exist for declining (never a dead end)
  │
  ├─ Assigns volunteer Kabir (suggested: nearby, available, matches weight)
  │
  ├─ Food arrives 14:10 → confirms delivery with the platform
  │
  └─ Files a distribution record: 120 meals, Civil Lines night shelter, photo proof
       └─ this single record generates the donor's impact report
```

**Design decisions that matter**
- Accepting is a **commitment**, not a reservation — the copy says so before the tap.
- Declining requires a reason (feeds matching quality), and never damages the reliability score.
- Accepting without a volunteer is surfaced as a warning, because it is the top cause of food loss.

---

## 4. Journey C — Volunteer moves the food

```
Kabir receives a push: "Pickup 3.4 km away, 60 servings, by 18:00"
  │
  ├─ Dashboard: online toggle, next run card, today's list
  ├─ Pickup detail: route, safety checklist, both phone numbers
  │
  ├─ Navigate: two legs (pickup → drop), turn list, "I've arrived"
  │
  ├─ At the donor: Verify pickup
  │    OTP (4 digits) or QR on the donation slip
  │    ↳ wrong code → inline error, no lockout, donor re-reads
  │    ↳ food looks unsafe → "Report a problem", run ends, no penalty
  │
  ├─ At the NGO: Confirm delivery
  │    NGO's 4-digit code + photo of handover + actual meals handed over
  │
  └─ History updated; rating from NGO; donor notified; impact recalculated
```

**Why two OTPs:** one at collection proves the volunteer has the food; one at delivery proves the NGO
has it. Neither party can complete the chain alone. This is the product's core integrity control.

---

## 5. Journey D — Admin verifies a donor

```
Meera opens the platform overview at 09:20
  │
  ├─ "7 pending verifications · oldest 3 days" (SLA breach surfaced, not hidden)
  ├─ Donor verification queue → Handi Restaurant
  │
  ├─ Review modal
  │    • FSSAI number + validity, name match
  │    • premises photo, owner ID
  │    • 4-point checklist (3 pass, 1 needs manual check)
  │
  ├─ Approve with internal note  →  donor can publish immediately
  │  Reject with reason          →  applicant notified, may resubmit
  │
  └─ Both actions append to the immutable audit log (actor, target, IP, timestamp)
```

---

## 6. Journey E — Food-safety incident

```
Complaint or automated temperature breach
  │
  ├─ Incident created (severity: high / medium / low)
  ├─ Donor notified; listing suspended if high severity
  ├─ NGO and volunteer statements collected
  ├─ Decision recorded: counsel, suspend (30 days), or clear
  └─ Closed incidents retained 24 months for audit; 7 years in the audit log
```

---

## 7. Screen-to-screen interaction map (key paths)

| From | Action | To |
|---|---|---|
| Landing | "Donate surplus food" | Register (donor) |
| Dashboard (any role) | Role switcher in top bar | Other role's entry screen |
| Donor · Active donations | Card or row | Donation detail |
| Donor · Donation detail | Edit | Create donation (prefilled) |
| NGO · Nearby | Accept | Accept modal → Accepted list |
| NGO · Accepted | Assign volunteer | Assign modal → status "Volunteer assigned" |
| Volunteer · Pickup detail | Start navigation | Navigate → Verify → Confirm → History |
| Admin · Overview | Verification queue item | Verification queue (filtered) |
| Admin · Monitoring | Row | Donation inspection modal (intervene) |
| Super Admin · Config | Change a value | Confirm modal → toast + audit entry |
| Any screen | Sidebar "Design system" | Living component library |
| Any screen | Sidebar "Dev handoff" | Route/component/data documentation |
