# ANN SETU — Product Brief
**अन्न सेतु · Connecting Surplus Food to Those Who Need It**

---

## 1. What this product is

ANN SETU is a **food-rescue and distribution logistics platform**. It is not a food-ordering app,
a restaurant marketplace, or a generic admin dashboard.

It coordinates five parties around one event — a surplus food donation:

| Party | What they do | What they need from the product |
|---|---|---|
| **Donor** (restaurant, hotel, caterer, kitchen) | Has safe surplus food | A two-minute way to list it, and proof it was used well |
| **NGO** (shelter, community kitchen, trust) | Can serve it to people who need it | A live, trustworthy supply board and coordination tools |
| **Volunteer** | Moves food between the two | Unambiguous routing and OTP-verified handovers |
| **Admin** | Keeps the network safe and legal | Verification queues, monitoring, incident and complaint registers |
| **Super Admin** | Owns the platform | Configuration, role management and an immutable audit trail |

## 2. The problem it solves

Good food is thrown away every day for two reasons only:

1. **Nobody knew it was available**, and
2. **Nobody could arrange a pickup in time.**

Everything in this design exists to remove those two frictions without ever compromising food safety.
If forced to choose between rescuing food and protecting a recipient's health, the product always
chooses safety — and says so in the interface.

## 3. Product principles

1. **Safety before rescue.** Every donation carries a declaration; every listing auto-expires.
2. **Plain language.** A 55-year-old kitchen manager in Jaipur must understand every screen without training.
3. **One primary action per screen.** Donors donate, NGOs accept, volunteers deliver.
4. **Numbers that mean something.** No vanity charts; every metric has a source and a definition.
5. **Honesty about data.** Prototype/fictional data is labelled everywhere it appears.
6. **Dignity.** Beneficiaries are never photographed as spectacle; the tone is operational, not charity-porn.
7. **Trust is visible.** Verified badges, audit trails and immutability are surfaced, not buried.

## 4. Personas

| Persona | Context | Device | Key frustration today |
|---|---|---|---|
| **Rakesh, 52** — owner, family restaurant | Lists surplus after 9 pm, one-handed, tired | Android phone | "I don't know who to call, and I won't chase people." |
| **Sister Anita, 41** — NGO coordinator | Manages 3 serving points, 2 vans | Phone + ancient desktop | "Food arrives after we've closed, or it's not what we can serve." |
| **Kabir, 24** — volunteer rider | Between shifts, uses a bike | Phone, one hand, outdoors | "I get sent to the wrong gate and lose 30 minutes." |
| **Meera, 33** — platform admin | Handles verification + incidents | Windows laptop | "I need to see what's failing before a complaint arrives." |

## 5. Success metrics (what the design is optimising)

- **Rescue rate** — published → distributed (target ≥ 75%)
- **Time to NGO acceptance** — median (target ≤ 15 min)
- **Collection within safe window** — target 98%
- **Food-safety incidents per 1,000 donations** — target 0
- **Donor 30-day retention** — target 70%

## 6. Scope of this prototype

45 screens across five role workspaces plus a landing page and two documentation screens.
Everything is clickable and stateful within a session; nothing is persisted and no external service is
called. See `05-developer-handoff.md` for the real-vs-simulated map.
