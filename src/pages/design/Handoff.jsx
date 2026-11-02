import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Badge, Table, Tabs, Alert, KV, Badge as B } from "../../components/ui/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";

/* ============================================================
   DEVELOPER HANDOFF
   Everything an engineering team needs to build the real thing.
   ============================================================ */

const routes = [
  ["/", "Landing", "Public", "Marketing page, no auth"],
  ["/login · /register", "Auth", "Public", "OTP sign-in, 3-step registration"],
  ["/donor", "Donor dashboard", "Donor", "Live donation, stats, activity"],
  ["/donor/new", "Create donation", "Donor", "6-step form, client validation"],
  ["/donor/active · /donor/history", "Donation lists", "Donor", "Cards + adaptive table"],
  ["/donor/donations/:id", "Donation detail", "Donor", "Timeline, safety log, OTP"],
  ["/donor/impact", "Impact reports", "Donor", "Verified metrics, exports"],
  ["/donor/profile", "Profile & settings", "Donor", "Org, notifications, security"],
  ["/ngo", "NGO dashboard", "NGO", "Live supply board, requirements"],
  ["/ngo/nearby", "Nearby donations", "NGO", "Map/list, radius filter, accept"],
  ["/ngo/accepted", "Accepted donations", "NGO", "Commitments + assign volunteer"],
  ["/ngo/requirements", "Food requirements", "NGO", "Demand posting"],
  ["/ngo/volunteers", "Volunteer coordination", "NGO", "Pool, runs, assignment"],
  ["/ngo/distributions", "Distribution records", "NGO", "Proof of service, impact source"],
  ["/ngo/impact", "Impact reports", "NGO", "Beneficiary reporting"],
  ["/volunteer", "Volunteer dashboard", "Volunteer", "Next run, availability, impact"],
  ["/volunteer/pickups", "Assigned pickups", "Volunteer", "Task list + report problem"],
  ["/volunteer/pickups/:id", "Pickup details", "Volunteer", "Route, safety checklist"],
  ["/volunteer/navigate/:id", "Navigation", "Volunteer", "Two-leg routing"],
  ["/volunteer/verify/:id", "Verify pickup", "Volunteer", "OTP / QR handover"],
  ["/volunteer/confirm/:id", "Confirm delivery", "Volunteer", "Second OTP + photo proof"],
  ["/volunteer/history", "Assignment history", "Volunteer", "Completed runs"],
  ["/admin", "Platform overview", "Admin", "Ops KPIs, queues, incidents"],
  ["/admin/donors · /admin/ngos · /admin/volunteers", "Verification", "Admin", "Shared queue component"],
  ["/admin/donations", "Donation monitoring", "Admin", "Live monitor + intervene"],
  ["/admin/complaints · /admin/incidents", "Trust & safety", "Admin", "SLA-tracked registers"],
  ["/admin/analytics · /admin/reports", "Insights", "Admin", "Charts + export packs"],
  ["/superadmin", "Platform overview", "Super Admin", "Network health"],
  ["/superadmin/users · /admins", "Administration", "Super Admin", "Accounts + RBAC matrix"],
  ["/superadmin/config", "System configuration", "Super Admin", "Safety rules, audited"],
  ["/superadmin/audit", "Audit logs", "Super Admin", "Immutable register"],
  ["/design-system · /handoff", "Documentation", "All", "Living design docs"],
];

const components = [
  ["Button", "ui/index.jsx", "3 sizes × 7 variants, loading, icon, block"],
  ["Field / Input / Select / Textarea", "ui/index.jsx", "Label, hint, error, required, optional"],
  ["CheckRow", "ui/index.jsx", "Full-row 44px hit area, checked state"],
  ["SegmentedControl", "ui/index.jsx", "2–4 mutually exclusive options"],
  ["Badge / StatusBadge / VerifiedMark", "ui/index.jsx", "One tone map for the whole product"],
  ["Card / CardHead / CardBody / CardFoot", "ui/index.jsx", "Flat, raised, interactive"],
  ["Stat", "ui/index.jsx", "Label + value + delta + context"],
  ["Table", "ui/index.jsx", "Sticky head, adaptive stacking, selection"],
  ["Tabs / Chips", "ui/index.jsx", "In-page views and filters"],
  ["Modal", "ui/index.jsx", "Focus trap, Esc, bottom-sheet on mobile"],
  ["Toasts", "ui/index.jsx", "aria-live, auto-dismiss 4.6s"],
  ["EmptyState / Skeleton / Alert", "ui/index.jsx", "The three states every screen needs"],
  ["Avatar / Progress / Timeline / KV", "ui/index.jsx", "Identity, progress, audit, key-value"],
  ["BarChart / AreaChart / Donut / HBars / Sparkline", "charts/index.jsx", "Hand-built SVG, sr-only data table"],
  ["AppShell / Sidebar / BottomNav / PageHead", "layout/AppShell.jsx", "Responsive chrome for all roles"],
  ["DonationCard", "DonationCard.jsx", "Shared across donor, NGO and admin"],
  ["Logo / LogoMark", "Logo.jsx", "Scales 16 → 96px, one-colour safe"],
];

const donationStatuses = [
  ["draft", "Draft", "Donor", "Donor is still editing. Not visible to anyone."],
  ["published", "Awaiting NGO", "Donor", "Visible to verified NGOs within radius. Timer running."],
  ["accepted", "Accepted", "NGO", "An NGO has committed. Removed from other lists."],
  ["assigned", "Volunteer assigned", "NGO", "A volunteer holds the task; pickup OTP issued."],
  ["picked_up", "Picked up", "Volunteer", "First OTP verified. Food is in transit."],
  ["delivered", "Delivered", "Volunteer", "Second OTP + photo. NGO has custody."],
  ["distributed", "Distributed", "NGO", "Distribution record filed. Counts toward impact."],
  ["expired", "Expired", "System", "Safe window closed before collection. Auto-set."],
  ["cancelled", "Cancelled", "Donor/Admin", "Withdrawn with a reason."],
  ["rejected", "Not accepted", "NGO", "Declined with a reason; donor notified."],
];

const api = [
  ["POST", "/v1/auth/otp:request", "Send OTP to a registered number"],
  ["POST", "/v1/auth/otp:verify", "Exchange OTP for a session token + role claims"],
  ["GET", "/v1/donations?status=&lat=&lng=&radius=", "Live donation feed (NGO, radius-scoped)"],
  ["POST", "/v1/donations", "Create a donation (safety declaration required)"],
  ["POST", "/v1/donations/:id/accept", "NGO accepts; server-side race check"],
  ["POST", "/v1/donations/:id/assign", "Assign volunteer, mint pickup OTP"],
  ["POST", "/v1/donations/:id/pickup", "Verify pickup OTP → status picked_up"],
  ["POST", "/v1/donations/:id/deliver", "Verify delivery OTP + proof → delivered"],
  ["POST", "/v1/distributions", "NGO files distribution record"],
  ["GET", "/v1/impact?scope=&period=", "Verified impact aggregates"],
  ["POST", "/v1/verifications/:id/decision", "Admin approve/reject with note"],
  ["GET", "/v1/audit?actor=&from=&to=", "Super Admin audit register"],
];

export default function Handoff() {
  useDocumentTitle("Developer handoff");
  const [tab, setTab] = useState("overview");

  return (
    <>
      <PageHead
        eyebrow="Documentation · v1.0"
        title="Developer handoff"
        sub="Routes, component inventory, data model, state machine and the rules that must not be broken when this is built for production."
        actions={<Button variant="quiet" icon="download">Download handoff pack</Button>}
      />

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "overview", label: "Overview" },
          { value: "routes", label: "Routes" },
          { value: "components", label: "Components" },
          { value: "data", label: "Data model" },
          { value: "api", label: "API surface" },
          { value: "rules", label: "Product rules" },
        ]}
      />

      {tab === "overview" && (
        <div className="stack g5 mt4">
          <div className="grid grid--3">
            {[
              { i: "layers", t: "Stack", d: "React 18 + Vite, React Router, plain CSS with custom properties. No UI framework — tokens are the only styling API." },
              { i: "grid", t: "Structure", d: "src/styles (tokens, components, layout) · src/components (ui, charts, layout) · src/pages/{role} · src/data (store, mock)." },
              { i: "users", t: "Five products", d: "Donor, NGO, Volunteer, Admin, Super Admin — one shell, five navigation models driven by src/nav.js." },
            ].map((c) => (
              <Card key={c.t}>
                <CardBody>
                  <span className="stat__icon"><Icon name={c.i} size={16} /></span>
                  <div className="text-base fw-semi ink mt3">{c.t}</div>
                  <p className="text-md muted mt2" style={{ lineHeight: 1.6 }}>{c.d}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card>
            <CardHead title="What is real vs simulated in this prototype" />
            <CardBody>
              <div className="grid grid--2">
                <div>
                  <div className="ds-label">Real (interactive)</div>
                  <ul className="stack g2 text-md muted">
                    {["Navigation across every screen and role", "6-step donation creation with validation", "NGO accept / decline with reasons", "Volunteer assignment + OTP verification", "Delivery confirmation + photo requirement", "Donation status transitions across all views", "Filtering, searching, sorting, tabs", "Responsive layout at every breakpoint", "Keyboard focus and screen-reader semantics"].map((x) => (
                      <li key={x} className="row g2"><Icon name="check" size={13} style={{ color: "var(--green-600)", flex: "none", marginTop: 3 }} />{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="ds-label">Simulated</div>
                  <ul className="stack g2 text-md muted">
                    {["All people, organisations and numbers (fictional)", "OTP delivery — the demo code is shown on screen", "Maps and routing — static illustration, no GPS", "File uploads — filenames are mocked", "Authentication — no session, role switching is instant", "Persistence — a refresh resets the demo", "PDF/CSV exports — trigger a toast or print dialog"].map((x) => (
                      <li key={x} className="row g2"><Icon name="minus" size={13} style={{ color: "var(--ink-300)", flex: "none", marginTop: 3 }} />{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Screen inventory" desc="34 screens + 2 documentation pages" />
            <CardBody>
              <KV rows={[
                ["Public", "Landing, Sign in, Register (3 steps)"],
                ["Donor", "Dashboard, Create (6 steps), Active, History, Detail, Impact, Profile"],
                ["NGO", "Dashboard, Nearby, Detail, Accepted, Requirements, Volunteers, Distributions, Impact"],
                ["Volunteer", "Dashboard, Pickups, Detail, Navigate, Verify, Confirm, History, Profile"],
                ["Admin", "Overview, Donor/NGO/Volunteer verification, Monitoring, Complaints, Incidents, Analytics, Reports"],
                ["Super Admin", "Overview, Users, Admins, Configuration, Audit, Analytics"],
                ["Documentation", "Design system, Developer handoff"],
              ]} />
            </CardBody>
          </Card>
        </div>
      )}

      {tab === "routes" && (
        <Card className="mt4">
          <CardHead title="Routing map" desc="Role-scoped prefixes; role guard belongs in a <RequireRole> wrapper in production" />
          <Table
            rows={routes.map((r, i) => ({ id: i, path: r[0], name: r[1], role: r[2], note: r[3] }))}
            rowKey="id"
            columns={[
              { key: "path", header: "Path", render: (r) => <span className="mono text-sm">{r.path}</span> },
              { key: "name", header: "Screen", render: (r) => <span className="table__primary">{r.name}</span> },
              { key: "role", header: "Role", render: (r) => <B tone={r.role === "Public" ? "neutral" : r.role === "Super Admin" ? "green" : "info"}>{r.role}</B> },
              { key: "note", header: "Notes", render: (r) => <span className="muted text-md">{r.note}</span> },
            ]}
          />
        </Card>
      )}

      {tab === "components" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Component inventory" desc="Everything screens are composed from" />
            <Table
              rows={components.map((c, i) => ({ id: i, name: c[0], file: c[1], note: c[2] }))}
              rowKey="id"
              columns={[
                { key: "name", header: "Component", render: (r) => <span className="table__primary">{r.name}</span> },
                { key: "file", header: "Location", render: (r) => <span className="mono text-sm muted">{r.file}</span> },
                { key: "note", header: "Variants / notes", render: (r) => <span className="muted text-md">{r.note}</span> },
              ]}
            />
          </Card>
          <Alert tone="info" title="Rule for new work">
            If a screen needs something that is not in this list, add it to the design system first — with
            tokens, states and an accessibility note — then use it. No one-off styles in page files.
          </Alert>
        </div>
      )}

      {tab === "data" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Donation state machine" desc="The most important model in the product — every transition is server-authoritative" />
            <Table
              rows={donationStatuses.map((s) => ({ id: s[0], label: s[1], actor: s[2], note: s[3] }))}
              rowKey="id"
              columns={[
                { key: "id", header: "Key", render: (r) => <span className="mono text-sm">{r.id}</span> },
                { key: "label", header: "Displayed as", render: (r) => <span className="table__primary">{r.label}</span> },
                { key: "actor", header: "Set by" },
                { key: "note", header: "Meaning", render: (r) => <span className="muted text-md">{r.note}</span> },
              ]}
            />
          </Card>

          <Card>
            <CardHead title="Core entities" desc="Minimum fields for v1" />
            <CardBody>
              <pre className="mono text-sm" style={{ background: "var(--canvas)", padding: 16, borderRadius: 10, overflowX: "auto", margin: 0, lineHeight: 1.7 }}>
{`Donation   id, donorId, ngoId?, volunteerId?, title, category, diet,
           servings, weightKg, preparedAt, safeUntil, storage, allergens[],
           pickupAddress, pickupWindow{start,end}, status, safetyDeclaration,
           createdAt, acceptedAt?, pickedUpAt?, deliveredAt?, distributedAt?

Verification  id, subjectType(donor|ngo|volunteer), subjectId, documents[],
             status, reviewerId?, decidedAt?, note

Distribution  id, donationId, ngoId, mealsServed, location, beneficiaries,
             volunteerId, photoProof, status, verifiedBy?, filedAt

Incident    id, donationId, type, severity, reportedBy, status, action, closedAt?
Complaint   id, raisedBy, against, subject, severity, slaDueAt, status
AuditLog    id, actorId, actorRole, action, target, payload, ip, prevHash, hash`}
              </pre>
            </CardBody>
          </Card>
        </div>
      )}

      {tab === "api" && (
        <Card className="mt4">
          <CardHead title="API surface (proposed)" desc="REST, JWT with role claims, idempotent transitions" />
          <Table
            rows={api.map((a, i) => ({ id: i, method: a[0], path: a[1], desc: a[2] }))}
            rowKey="id"
            columns={[
              { key: "method", header: "Method", render: (r) => <B tone={r.method === "GET" ? "info" : "success"}>{r.method}</B> },
              { key: "path", header: "Endpoint", render: (r) => <span className="mono text-sm">{r.path}</span> },
              { key: "desc", header: "Purpose", render: (r) => <span className="muted text-md">{r.desc}</span> },
            ]}
          />
        </Card>
      )}

      {tab === "rules" && (
        <div className="stack g5 mt4">
          <Alert tone="danger" title="Non-negotiable safety rules">
            These are product law, not preferences. If a build conflicts with them, the build is wrong.
          </Alert>
          <Card>
            <CardBody>
              <div className="stack g4">
                {[
                  ["Every donation expires automatically", "No override, no extension. When the safe window closes, the listing closes. A donation must never be collectable after its declared safe time."],
                  ["The safety declaration is mandatory and immutable", "Temperature checked, packaging sealed and handler certified must all be true before publication. Any post-publication edit re-triggers verification."],
                  ["Two-point OTP handover", "Pickup and delivery are each confirmed by a code held by the other party. A volunteer cannot confirm their own handover."],
                  ["Acceptance is a commitment, not a reservation", "Accepting removes the donation from other NGOs. Repeated non-collection must reduce reliability score and pause the account."],
                  ["Distribution records are the only impact source", "Donor impact numbers come from NGO distribution filings, never from what the donor listed."],
                  ["Verification precedes capability", "An unverified donor cannot publish; an unverified NGO cannot accept; an unverified volunteer cannot be assigned."],
                  ["Every privileged action is audited", "Verification decisions, suspensions, configuration changes and audit exports are appended to an immutable, hash-chained log."],
                ].map(([t, d], i) => (
                  <div key={t} className="row g3 items-start" style={{ paddingBottom: 16, borderBottom: i < 6 ? "1px solid var(--line)" : "none" }}>
                    <span className="badge badge--green" style={{ width: 26, height: 26, justifyContent: "center", padding: 0, flex: "none" }}>{i + 1}</span>
                    <div>
                      <div className="text-base fw-semi ink">{t}</div>
                      <div className="text-md muted mt1" style={{ lineHeight: 1.6 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Definition of done (per screen)" />
            <CardBody>
              <div className="grid grid--2">
                {[
                  "Renders at 320, 480, 768, 1024, 1440, 2560 px with no horizontal overflow",
                  "Keyboard-only path completes the primary task",
                  "Empty, loading and error states all designed",
                  "Copy reviewed in plain English; no jargon, no blame",
                  "All data marked as prototype/fictional where relevant",
                  "Contrast check passes AA for text and UI borders",
                  "Touch targets ≥ 44px; focus ring visible on every control",
                  "No hard-coded colour, spacing or font size outside tokens",
                ].map((x) => (
                  <div key={x} className="row g2" style={{ padding: "8px 0" }}>
                    <Icon name="checkCircle" size={15} style={{ color: "var(--green-600)", flex: "none", marginTop: 2 }} />
                    <span className="text-md muted">{x}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
