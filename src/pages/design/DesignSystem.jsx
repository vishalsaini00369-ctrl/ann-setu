import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Field, Input, Select, Textarea, CheckRow, SegmentedControl,
  Badge, StatusBadge, Card as C, Stat, EmptyState, Skeleton, Alert, Avatar, Progress, Tabs, Modal, KV,
} from "../../components/ui/index.jsx";
import { BarChart, AreaChart, Donut, Sparkline, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import Logo, { LogoMark } from "../../components/Logo.jsx";
import { categorySplit, weeklySeries } from "../../data/mockData.js";

/* ============================================================
   DESIGN SYSTEM — living documentation.
   Every sample below is the real component, not a copy.
   ============================================================ */

const COLORS = [
  ["green-600", "#0E7A54", "Primary action, focus, active nav"],
  ["green-700", "#0A6244", "Hover, links, emphasis text"],
  ["green-800", "#084D36", "Dark surfaces, CTA band"],
  ["green-50", "#EAF7F0", "Selected rows, gentle fills"],
  ["ink-900", "#0D1A15", "Headings, primary text"],
  ["ink-500", "#5A6B64", "Secondary text, metadata"],
  ["canvas", "#FAFBF9", "App background"],
  ["line", "#E3E8E5", "Borders, dividers"],
  ["warning", "#9A5B00", "Expiry, attention"],
  ["danger", "#B42318", "Errors, safety"],
  ["info", "#1B4FD8", "Neutral system messages"],
];

const TYPE = [
  ["Display / hero", "var(--fs-60)", 700, "48–60px, −0.035em"],
  ["Page title", "var(--fs-24)", 600, "24px, −0.02em"],
  ["Section title", "var(--fs-18)", 600, "18px"],
  ["Card title", "var(--fs-16)", 600, "16px"],
  ["Body", "var(--fs-14)", 400, "14px, 1.55 line-height"],
  ["Small / metadata", "var(--fs-12)", 500, "12px"],
  ["Micro / table head", "var(--fs-11)", 700, "11px, 0.06em, uppercase"],
];

const SPACES = [["4", "s-1"], ["8", "s-2"], ["12", "s-3"], ["16", "s-4"], ["20", "s-5"], ["24", "s-6"], ["32", "s-7"], ["40", "s-8"], ["48", "s-9"], ["64", "s-10"], ["96", "s-12"]];

export default function DesignSystem() {
  useDocumentTitle("Design system");
  const [tab, setTab] = useState("foundations");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <>
      <PageHead
        eyebrow={<>Design system v1.0 · <span className="deva">डिज़ाइन प्रणाली</span></>}
        title="ANN SETU design system"
        sub="One set of tokens, one set of components, five products. Every screen in this prototype is built from the components documented here — nothing is bespoke."
        actions={<Button variant="quiet" icon="download">Download tokens (JSON)</Button>}
      />

      <Tabs
        value={tab}
        onChange={setTab}
        ariaLabel="Design system sections"
        items={[
          { value: "foundations", label: "Foundations" },
          { value: "components", label: "Components" },
          { value: "data", label: "Data display" },
          { value: "states", label: "States" },
          { value: "a11y", label: "Accessibility" },
          { value: "responsive", label: "Responsive" },
        ]}
      />

      {/* ---------------- FOUNDATIONS ---------------- */}
      {tab === "foundations" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Logo & identity" desc="Mark, wordmark and clear space" />
            <CardBody>
              <div className="grid grid--3">
                <div className="card card--flat" style={{ padding: 20, textAlign: "center", background: "var(--white)" }}>
                  <LogoMark size={56} />
                  <div className="text-xs muted mt3">Primary mark · 56px</div>
                </div>
                <div className="card card--flat" style={{ padding: 20, background: "var(--canvas)" }}>
                  <Logo size={40} />
                  <div className="text-xs muted mt3">Full lockup (Latin + Devanagari)</div>
                </div>
                <div className="card card--flat" style={{ padding: 20, background: "var(--green-800)" }}>
                  <Logo size={40} tone="inverse" />
                  <div className="text-xs" style={{ color: "rgba(255,255,255,.6)" }}>On dark surfaces</div>
                </div>
              </div>
              <div className="grid grid--2 mt5">
                <div>
                  <div className="ds-label">Meaning</div>
                  <p className="text-md muted" style={{ lineHeight: 1.6 }}>
                    The arch is a bridge (<span className="deva">सेतु</span>) spanning two piers: surplus on one side,
                    need on the other. The grain rising from the centre is the food that crosses. It reads cleanly
                    at 16px, in one colour, and never relies on gradients.
                  </p>
                </div>
                <div>
                  <div className="ds-label">Usage rules</div>
                  <ul className="stack g2 text-md muted">
                    <li>• Minimum size 20px; below that use the mark only.</li>
                    <li>• Clear space = height of the arch.</li>
                    <li>• Never place on busy photography or re-colour the piers.</li>
                    <li>• Devanagari lockup is always below the Latin wordmark.</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Colour palette" desc="Restrained: one green family, one neutral family, four semantic tones" />
            <CardBody>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
                {COLORS.map(([name, hex, use]) => (
                  <div className="ds-swatch" key={name}>
                    <div className="ds-swatch__color" style={{ background: hex }} />
                    <div className="ds-swatch__meta">
                      <div className="ds-swatch__name">{name}</div>
                      <div className="ds-swatch__hex">{hex}</div>
                      <div className="text-xs muted" style={{ marginTop: 2 }}>{use}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="alert alert--info mt5">
                <span className="alert__icon"><Icon name="info" size={16} /></span>
                <div>
                  <div className="alert__title">Semantic pairing rule</div>
                  Every status colour always ships with a background tint and a text tone that meets 4.5:1.
                  Colour is never the only signal — badges also carry a dot and a label.
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Type scale" desc="One family, seven sizes, three weights" />
              <CardBody>
                <div className="stack g4">
                  {TYPE.map(([name, size, weight, note]) => (
                    <div key={name} className="row between g3" style={{ alignItems: "baseline", paddingBottom: 10, borderBottom: "1px dashed var(--line)" }}>
                      <div style={{ fontSize: size, fontWeight: weight, letterSpacing: weight > 500 ? "-0.02em" : 0, color: "var(--ink-900)" }}>
                        {name.split(" ")[0]}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="text-sm fw-semi ink">{name}</div>
                        <div className="text-xs muted">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt5">
                  <div className="ds-label">Devanagari pairing</div>
                  <p className="deva" style={{ fontSize: 18, color: "var(--ink-900)", lineHeight: 1.6 }}>
                    अन्न सेतु — अतिरिक्त भोजन को ज़रूरतमंदों तक पहुँचाना।
                  </p>
                  <p className="text-sm muted mt2">
                    Font stack: Noto Sans Devanagari → Nirmala UI → Mangal → system. Never apply letter-spacing
                    to Devanagari text.
                  </p>
                </div>
              </CardBody>
            </Card>

            <div className="stack g5">
              <Card>
                <CardHead title="Spacing scale" desc="4px base, 11 steps" />
                <CardBody>
                  <div className="stack g2">
                    {SPACES.map(([px, token]) => (
                      <div key={token} className="row g3">
                        <span className="mono text-sm muted" style={{ width: 78 }}>{token}</span>
                        <div style={{ height: 8, width: `${px}px`, background: "var(--green-600)", borderRadius: 2 }} />
                        <span className="text-xs muted">{px}px</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHead title="Radius & elevation" />
                <CardBody>
                  <div className="row g3 wrap mb4">
                    {[["xs", 6], ["sm", 8], ["md", 10], ["lg", 14], ["xl", 20]].map(([n, r]) => (
                      <div key={n} style={{ textAlign: "center" }}>
                        <div style={{ width: 52, height: 52, background: "var(--green-50)", border: "1px solid var(--green-200)", borderRadius: r }} />
                        <div className="text-xs muted mt1">{n} · {r}px</div>
                      </div>
                    ))}
                  </div>
                  <div className="row g3 wrap">
                    {["xs", "sm", "md", "lg", "xl"].map((s) => (
                      <div key={s} style={{ textAlign: "center" }}>
                        <div style={{ width: 52, height: 40, background: "var(--white)", borderRadius: 8, boxShadow: `var(--sh-${s})` }} />
                        <div className="text-xs muted mt1">sh-{s}</div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <Card>
            <CardHead title="Grid" desc="12 columns · 1280px content max · 20–24px gutters" />
            <CardBody>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ height: 44, background: "var(--green-50)", border: "1px dashed var(--green-200)", borderRadius: 4, display: "grid", placeItems: "center" }}>
                    <span className="text-xs muted">{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid--2 mt5">
                <KV rows={[["Content max width", "1280 px"], ["Sidebar", "264 px (76 px collapsed)"], ["Top bar", "64 px"], ["Gutter (desktop / mobile)", "20 px / 16 px"], ["Card grid", "4 → 2 → 1 columns"]]} />
                <KV rows={[["Breakpoint: compact", "< 680 px"], ["Breakpoint: tablet", "681–1024 px"], ["Breakpoint: desktop", "1025–1600 px"], ["Breakpoint: wide", "> 1600 px"], ["Tap target minimum", "44 × 44 px"]]} />
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ---------------- COMPONENTS ---------------- */}
      {tab === "components" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Buttons" desc="One primary action per view. Everything else is quiet." />
            <CardBody>
              <div className="ds-label">Variants</div>
              <div className="ds-row mb5">
                <Button variant="primary" icon="plus">Primary</Button>
                <Button variant="secondary" icon="check">Secondary</Button>
                <Button variant="quiet">Quiet</Button>
                <Button variant="ghost" icon="edit">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="danger-ghost" icon="slash">Danger quiet</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
              </div>
              <div className="ds-label">Sizes & shape</div>
              <div className="ds-row mb5">
                <Button variant="primary" size="sm">Small · 32</Button>
                <Button variant="primary">Default · 40</Button>
                <Button variant="primary" size="lg" icon="arrowRight">Large · 48</Button>
                <Button variant="quiet" icon="bell" aria-label="Notifications" />
                <Button variant="quiet" size="sm" icon="eye" aria-label="View" />
                <Button variant="primary" block style={{ maxWidth: 260 }}>Block</Button>
              </div>
              <div className="ds-label">Usage</div>
              <p className="text-md muted" style={{ lineHeight: 1.6 }}>
                Minimum height 32px for pointer devices and 40px for touch. Icons are 15–17px and always paired with
                a label except in toolbars, where an <span className="mono text-sm">aria-label</span> is mandatory.
              </p>
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Form controls" desc="Labels are always visible — never placeholder-only" />
              <CardBody>
                <div className="stack g4">
                  <Field label="Food name" htmlFor="ds1" required hint="Helpful guidance sits under the field.">
                    <Input id="ds1" placeholder="e.g. Veg thali" />
                  </Field>
                  <Field label="Category" htmlFor="ds2" required>
                    <Select id="ds2" options={["Cooked meal", "Bakery", "Packaged"]} />
                  </Field>
                  <Field label="Notes" htmlFor="ds3" optional>
                    <Textarea id="ds3" placeholder="Optional details" />
                  </Field>
                  <Field label="Email" htmlFor="ds4" error="Enter a valid email address.">
                    <Input id="ds4" defaultValue="not-an-email" />
                  </Field>
                  <CheckRow id="ds5" checked onChange={() => {}} title="Checkbox row" desc="44px tap target, full-row hit area." />
                  <div>
                    <div className="ds-label">Segmented control</div>
                    <SegmentedControl ariaLabel="Example" value="a" onChange={() => {}} options={[{ value: "a", label: "Vegetarian" }, { value: "b", label: "Contains egg" }, { value: "c", label: "Non-veg" }]} />
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="stack g5">
              <Card>
                <CardHead title="Status & badges" desc="Label + dot + tone" />
                <CardBody>
                  <div className="ds-row mb4">
                    <Badge tone="success" dot>Delivered</Badge>
                    <Badge tone="warning" dot>Expiring</Badge>
                    <Badge tone="danger" dot>Expired</Badge>
                    <Badge tone="info" dot>Awaiting NGO</Badge>
                    <Badge tone="neutral" dot>Draft</Badge>
                    <Badge tone="green">Verified</Badge>
                  </div>
                  <div className="ds-row">
                    <StatusBadge status="Accepted" />
                    <StatusBadge status="Picked up" />
                    <StatusBadge status="High" />
                    <StatusBadge status="Investigating" />
                  </div>
                  <div className="divider" style={{ margin: "18px 0" }} />
                  <div className="ds-label">Avatars & progress</div>
                  <div className="ds-row mb4">
                    <Avatar initials="RM" />
                    <Avatar initials="KS" size="sm" />
                    <Avatar initials="AS" size="lg" />
                    <Avatar initials="MI" size="xl" />
                    <div className="avatar-stack">
                      <Avatar initials="A" size="sm" /><Avatar initials="B" size="sm" /><Avatar initials="C" size="sm" />
                    </div>
                  </div>
                  <div className="stack g2">
                    <Progress value={72} />
                    <Progress value={38} tone="warning" />
                    <Progress value={94} tone="danger" />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHead title="Stat card" desc="Label, number, delta, context — never a bare number" />
                <CardBody>
                  <div className="grid grid--2">
                    <Stat label="Meals donated" value="4,820" icon="bowl" trend={{ dir: "up", value: "12%" }} foot="vs last period" />
                    <Stat label="Pending pickups" value={1} icon="truck" foot="volunteer en route" />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <Card>
            <CardHead title="Dialogs & overlays" desc="Escape closes, focus is trapped, mobile becomes a bottom sheet" />
            <CardBody>
              <div className="ds-row">
                <Button variant="primary" onClick={() => setModal(true)}>Open modal</Button>
                <span className="text-md muted">Try it: press Tab to cycle, Escape to close.</span>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ---------------- DATA ---------------- */}
      {tab === "data" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Charts" desc="Only used where they change a decision. Every chart has a text alternative." />
            <CardBody>
              <div className="grid grid--2">
                <div>
                  <div className="ds-label">Bar — daily volume</div>
                  <BarChart data={weeklySeries} valueKey="meals" height={170} ariaLabel="Sample bar chart" />
                </div>
                <div>
                  <div className="ds-label">Area — trend</div>
                  <AreaChart data={weeklySeries} valueKey="meals" height={170} ariaLabel="Sample area chart" />
                </div>
                <div>
                  <div className="ds-label">Donut — composition</div>
                  <Donut data={categorySplit} size={130} centerValue="1,840" centerLabel="total" />
                </div>
                <div>
                  <div className="ds-label">Ranked bars + sparkline</div>
                  <HBars data={[{ label: "Bani Park", value: 6820 }, { label: "Malviya Nagar", value: 5410 }, { label: "C-Scheme", value: 4180 }]} />
                  <div className="mt4"><Sparkline values={[4, 7, 5, 9, 6, 11]} width={120} height={30} /></div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Tables" desc="Sticky header, hover row, adaptive stacking below 860px" />
            <CardBody tight style={{ paddingBottom: 0 }}>
              <div className="table-wrap">
                <table className="table table-adaptive">
                  <thead>
                    <tr><th>Donation</th><th>NGO</th><th className="is-right">Servings</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {[["Veg thali", "Annapurna", 120, "Accepted"], ["Bakery", "Robin Hood Army", 60, "Picked up"], ["Mithai boxes", "—", 150, "Awaiting NGO"]].map((r) => (
                      <tr key={r[0]}>
                        <td data-label="Donation"><span className="table__primary">{r[0]}</span></td>
                        <td data-label="NGO">{r[1]}</td>
                        <td data-label="Servings" className="is-right"><span className="tabular">{r[2]}</span></td>
                        <td data-label="Status"><StatusBadge status={r[3]} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ---------------- STATES ---------------- */}
      {tab === "states" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Empty states" desc="Explain why it is empty and what to do next — always with an action" />
            <CardBody>
              <div className="grid grid--2">
                <div className="card card--flat" style={{ background: "var(--canvas)" }}>
                  <EmptyState icon="activity" title="No active donations" desc="When you publish surplus food it appears here until it is collected." action={<Button variant="primary" size="sm" icon="plus">Create a donation</Button>} />
                </div>
                <div className="card card--flat" style={{ background: "var(--canvas)" }}>
                  <EmptyState icon="search" title="No results match your filters" desc="Try widening the radius or clearing the category filter." action={<Button variant="quiet" size="sm">Clear filters</Button>} />
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Loading states" desc="Skeletons mirror the final layout — never a full-page spinner" />
              <CardBody>
                <div className="stack g3 mb5">
                  <Skeleton h={18} w="40%" />
                  <Skeleton h={12} />
                  <Skeleton h={12} w="88%" />
                  <Skeleton h={12} w="62%" />
                </div>
                <Button variant="quiet" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }} loading={loading}>
                  {loading ? "Loading…" : "Simulate loading"}
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHead title="Validation & errors" desc="Say what went wrong and how to fix it, in plain language" />
              <CardBody>
                <div className="stack g4">
                  <Field label="Servings" htmlFor="dse" required error="Minimum 20 servings per donation — combine smaller lots.">
                    <Input id="dse" defaultValue="8" aria-invalid="true" />
                  </Field>
                  <Alert tone="danger" title="Pickup window is outside the safe window">
                    Food cannot be collected after 18:00 because it was declared safe only until 18:00. Adjust the
                    pickup window or the safe-consumption time.
                  </Alert>
                  <Alert tone="warning" title="This action needs confirmation">
                    Suspending a donor removes all their active listings.
                  </Alert>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHead title="Feedback & messaging" desc="Toasts confirm an action; alerts explain a condition" />
            <CardBody>
              <div className="grid grid--2">
                <div className="toast" style={{ position: "static", animation: "none" }}>
                  <span className="toast__icon"><Icon name="checkCircle" size={17} /></span>
                  <div><div className="toast__title">Donation published</div><div className="toast__body">120 servings are now visible to verified NGOs.</div></div>
                </div>
                <div className="toast toast--error" style={{ position: "static", animation: "none" }}>
                  <span className="toast__icon"><Icon name="alertCircle" size={17} /></span>
                  <div><div className="toast__title">Pickup failed</div><div className="toast__body">The donor was not available. Task returned to the NGO.</div></div>
                </div>
                <Alert tone="success" title="Verified">All documents matched the registry.</Alert>
                <Alert tone="info" title="FYI">Figures reconcile monthly and may lag by up to 48 hours.</Alert>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ---------------- A11Y ---------------- */}
      {tab === "a11y" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Accessibility commitments" desc="WCAG 2.2 AA, verified per component" />
            <CardBody>
              <div className="grid grid--2">
                <div className="stack g3">
                  {[
                    ["Contrast", "All text ≥ 4.5:1; large text and UI borders ≥ 3:1. Muted text never drops below 4.6:1 on canvas."],
                    ["Keyboard", "Every action reachable by Tab; visible 2px focus ring; skip-link on every page; Escape closes overlays."],
                    ["Labels", "Inputs use real <label> elements. Icon-only buttons carry aria-label. Required fields marked in text, not colour alone."],
                    ["Targets", "Minimum 44×44px for touch; table row actions are 32px with 8px spacing."],
                    ["Motion", "prefers-reduced-motion collapses all transitions to 1ms."],
                    ["Errors", "Each error is announced via role=\"alert\", names the field, and says how to fix it."],
                  ].map(([t, d]) => (
                    <div key={t} className="row g3 items-start">
                      <span className="stat__icon" style={{ width: 28, height: 28, flex: "none" }}><Icon name="check" size={14} /></span>
                      <div>
                        <div className="text-md fw-semi ink">{t}</div>
                        <div className="text-sm muted" style={{ lineHeight: 1.55 }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="ds-label">Contrast check (sample pairs)</div>
                  <div className="stack g2">
                    {[
                      ["#0D1A15 on #FFFFFF", "16.1:1", true],
                      ["#5A6B64 on #FAFBF9", "5.6:1", true],
                      ["#0E7A54 on #FFFFFF", "4.9:1", true],
                      ["#9A5B00 on #FDF3E2", "5.2:1", true],
                      ["#7D8C86 on #FFFFFF", "3.3:1", false],
                    ].map(([pair, ratio, pass]) => (
                      <div key={pair} className="row between" style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}>
                        <span className="mono text-sm">{pair}</span>
                        <span className={`badge badge--${pass ? "success" : "danger"}`}>{ratio} {pass ? "AA" : "Decorative only"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert--warning mt4">
                    <span className="alert__icon"><Icon name="alert" size={16} /></span>
                    <div>
                      <div className="alert__title">Placeholder text is not a label</div>
                      ink-400 (#7D8C86) is used for placeholders only — never as the sole instruction for a field.
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ---------------- RESPONSIVE ---------------- */}
      {tab === "responsive" && (
        <div className="stack g5 mt4">
          <Card>
            <CardHead title="Breakpoints & behaviour" desc="Layouts are re-composed, not scaled down" />
            <CardBody>
              <div className="table-wrap">
                <table className="table table-adaptive">
                  <thead><tr><th>Range</th><th>Navigation</th><th>Grid</th><th>Tables</th></tr></thead>
                  <tbody>
                    {[
                      ["320–480 · small phone", "Bottom tab bar (4–5), drawer for full nav", "1 column", "Stacked cards"],
                      ["481–680 · large phone", "Bottom tab bar + drawer", "1 column", "Stacked cards"],
                      ["681–1024 · tablet", "Drawer + bottom bar on portrait; rail on landscape", "2 columns", "Stacked or scrollable"],
                      ["1025–1600 · desktop", "Persistent sidebar (collapsible)", "3–4 columns", "Full table with sticky head"],
                      ["1600+ · wide / 4K", "Sidebar + wider gutters", "4 columns, max 1280 content", "Full table"],
                    ].map((r) => (
                      <tr key={r[0]}>
                        <td data-label="Range"><span className="table__primary">{r[0]}</span></td>
                        <td data-label="Navigation">{r[1]}</td>
                        <td data-label="Grid">{r[2]}</td>
                        <td data-label="Tables">{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="alert alert--info mt5">
                <span className="alert__icon"><Icon name="info" size={16} /></span>
                <div>
                  <div className="alert__title">Mobile-specific decisions, not shrunk desktop</div>
                  Donors get a thumb-reachable primary action, volunteers get a bottom-anchored route card, and
                  admin tables become labelled card stacks with the action inline.
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid--3">
            {[["Phone", 1180], ["Tablet", 780], ["Desktop", 460]].map(([label, w]) => (
              <Card key={label}>
                <CardBody>
                  <div className="ds-label">{label} preview</div>
                  <div style={{ border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden", background: "var(--canvas)", height: 220, maxWidth: w === 1180 ? "100%" : w === 780 ? "100%" : "100%", display: "flex" }}>
                    <div style={{ width: w === 1180 ? 54 : w === 780 ? 0 : 0, background: "var(--white)", borderRight: "1px solid var(--line)" }} />
                    <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div className="skeleton" style={{ height: 10, width: "40%" }} />
                      <div style={{ display: "grid", gridTemplateColumns: w === 1180 ? "1fr 1fr" : "1fr", gap: 6 }}>
                        <div className="skeleton" style={{ height: 46 }} />
                        <div className="skeleton" style={{ height: 46 }} />
                      </div>
                      <div className="skeleton" style={{ height: 62 }} />
                      {w === 1180 && <div className="skeleton" style={{ height: 24, marginTop: "auto" }} />}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Example dialog"
        desc="Nothing critical lives only inside a dialog."
        footer={
          <>
            <Button variant="quiet" onClick={() => setModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setModal(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-md muted" style={{ lineHeight: 1.6 }}>
          Focus moves to the first interactive element, Tab cycles inside the dialog, Escape closes it and
          background scroll is locked. On screens under 560px it becomes a bottom sheet with full-width actions.
        </p>
      </Modal>
    </>
  );
}
