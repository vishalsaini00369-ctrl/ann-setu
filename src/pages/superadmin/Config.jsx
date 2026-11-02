import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, Field, Input, Select, CheckRow,
  Alert, StatusBadge, KV, Tabs, Modal, Progress, Table,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { systemConfig } from "../../data/mockData.js";

export default function SuperAdminConfig() {
  useDocumentTitle("System configuration");
  const { toast } = useApp();
  const [tab, setTab] = useState("safety");
  const [confirm, setConfirm] = useState(null);
  const [values, setValues] = useState({
    max_hold_hours: "5 hours",
    min_servings: "20",
    volunteer_radius_km: "6 km",
    otp_required: true,
    auto_expire: true,
    photo_proof: true,
  });

  const changed = (k, v) => { setValues((p) => ({ ...p, [k]: v })); setConfirm({ key: k, value: v }); };

  return (
    <>
      <PageHead
        eyebrow="Super admin"
        title="System configuration"
        sub="Platform-wide operating rules. Changes apply immediately to every city and are recorded in the audit log."
        actions={<Button variant="quiet" icon="database">View audit trail</Button>}
      />

      <Alert tone="warning" title="These settings affect food safety">
        Lowering the safe-holding window is always safe. Extending it beyond 6 hours is blocked by policy and
        requires a written exception from the platform safety lead.
      </Alert>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "safety", label: "Food safety" },
          { value: "matching", label: "Matching & logistics" },
          { value: "notifications", label: "Notifications" },
          { value: "access", label: "Access & integrations" },
        ]}
      />

      <div className="grid grid--sidebar mt4">
        <div className="stack g5">
          {tab === "safety" && (
            <Card>
              <CardHead title="Safety rules" desc="Applied to every donation at the moment of publication" />
              <CardBody>
                <div className="stack g5">
                  <div className="grid grid--2">
                    <Field label="Maximum holding time (cooked food)" htmlFor="mh" hint="Donations auto-expire after this window.">
                      <Select id="mh" value={values.max_hold_hours} onChange={(e) => changed("max_hold_hours", e.target.value)}
                        options={["3 hours", "4 hours", "5 hours", "6 hours"]} />
                    </Field>
                    <Field label="Minimum servings per donation" htmlFor="ms" hint="Prevents uneconomical pickups.">
                      <Input id="ms" value={values.min_servings} onChange={(e) => changed("min_servings", e.target.value)} inputMode="numeric" />
                    </Field>
                  </div>
                  <div className="stack g2">
                    <CheckRow id="ae" checked={values.auto_expire} onChange={(v) => changed("auto_expire", v)}
                      title="Auto-expire unaccepted donations" desc="Safety-first default. Cannot be disabled for cooked food." />
                    <CheckRow id="or" checked={values.otp_required} onChange={(v) => changed("otp_required", v)}
                      title="Require OTP at pickup and delivery" desc="Two-point handover verification." />
                    <CheckRow id="pp" checked={values.photo_proof} onChange={(v) => changed("photo_proof", v)}
                      title="Require photo proof of delivery" desc="Volunteers must upload an image at the NGO." />
                  </div>
                  <div className="divider" />
                  <div>
                    <div className="ds-label">Enforced policy limits</div>
                    <KV rows={[["Hard cap on safe window", "6 hours"], ["Minimum temperature check", "Required"], ["Handler certification", "Required for donors"], ["Incident auto-suspension", "30 days"]]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === "matching" && (
            <Card>
              <CardHead title="Matching & logistics" desc="How donations are routed to NGOs and volunteers" />
              <CardBody>
                <div className="stack g5">
                  <div className="grid grid--2">
                    <Field label="Volunteer match radius" htmlFor="vr">
                      <Select id="vr" value={values.volunteer_radius_km} onChange={(e) => changed("volunteer_radius_km", e.target.value)}
                        options={["3 km", "6 km", "10 km", "15 km"]} />
                    </Field>
                    <Field label="NGO notification radius" htmlFor="nr">
                      <Select id="nr" options={["6 km", "10 km", "15 km", "City-wide"]} defaultValue="6 km" />
                    </Field>
                  </div>
                  <div className="grid grid--2">
                    <Field label="Acceptance priority" htmlFor="ap" hint="Who gets first chance at a new donation.">
                      <Select id="ap" options={["Nearest NGO first", "NGO with highest reliability", "Round-robin", "Broadcast to all"]} defaultValue="Nearest NGO first" />
                    </Field>
                    <Field label="Re-assignment after decline" htmlFor="ra">
                      <Select id="ra" options={["Immediately", "After 10 minutes", "After 30 minutes", "Manual"]} defaultValue="Immediately" />
                    </Field>
                  </div>
                  <Alert tone="info" title="Demo note">
                    Matching logic is illustrative in this prototype — no algorithm runs behind these controls.
                  </Alert>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <CardHead title="Notification policy" desc="Which messages are mandatory" />
              <CardBody>
                <div className="stack g2">
                  <CheckRow id="n1" checked onChange={() => {}} title="Expiry warnings (T-60 and T-15 minutes)" desc="Always on — safety critical." />
                  <CheckRow id="n2" checked onChange={() => {}} title="Pickup and delivery OTPs" desc="Always on — security critical." />
                  <CheckRow id="n3" checked onChange={() => {}} title="Incident alerts to administrators" desc="Always on." />
                  <CheckRow id="n4" checked onChange={() => {}} title="Daily digest for donors" desc="Sent at 20:00 local time." />
                  <CheckRow id="n5" checked={false} onChange={() => {}} title="Marketing campaigns" desc="Opt-in only, excluded from all critical paths." />
                </div>
                <div className="divider" style={{ margin: "20px 0" }} />
                <div className="grid grid--2">
                  <Field label="SMS provider" htmlFor="sp"><Input id="sp" defaultValue="Transactional SMS · DLTPL" disabled /></Field>
                  <Field label="Quiet hours" htmlFor="qh" hint="Critical alerts ignore quiet hours."><Select id="qh" defaultValue="22:00 – 07:00" options={["22:00 – 07:00", "23:00 – 06:00", "None"]} /></Field>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === "access" && (
            <div className="stack g5">
              <Card>
                <CardHead title="Data retention" desc="Required for food-safety auditing" />
                <CardBody>
                  <Table
                    rows={[
                      { t: "Donation & distribution records", p: "24 months", r: "Food safety audit" },
                      { t: "Verification documents", p: "Duration + 12 months", r: "Compliance" },
                      { t: "Audit logs", p: "7 years", r: "Governance" },
                      { t: "Personal contact data", p: "Deleted on account closure", r: "Privacy policy" },
                    ]}
                    rowKey="t"
                    compact
                    columns={[
                      { key: "t", header: "Data type", render: (r) => <span className="table__primary">{r.t}</span> },
                      { key: "p", header: "Retention" },
                      { key: "r", header: "Reason", render: (r) => <span className="muted">{r.r}</span> },
                    ]}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHead title="Integrations" desc="External systems" />
                <CardBody>
                  <div className="stack g3">
                    {[
                      ["FSSAI licence verification API", "Connected", "success"],
                      ["SMS / OTP gateway", "Connected", "success"],
                      ["NITI Darpan NGO registry", "Connected", "success"],
                      ["Municipal waste management portal", "Not configured", "neutral"],
                      ["Accounting / 80G export", "Sandbox", "warning"],
                    ].map(([n, s, tone]) => (
                      <div key={n} className="row between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                        <div className="row g3"><Icon name="cpu" size={16} className="muted" /><span className="text-md ink">{n}</span></div>
                        <Badge tone={tone} dot>{s}</Badge>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>

        <div className="stack g5">
          <Card>
            <CardBody>
              <div className="ds-label">Configuration status</div>
              <div className="row g3 mb4">
                <span className="stat__icon" style={{ width: 40, height: 40, background: "var(--green-600)", color: "#fff" }}><Icon name="shield" size={18} /></span>
                <div>
                  <div className="text-base fw-semi ink">Policy compliant</div>
                  <div className="text-xs muted">All safety limits within range</div>
                </div>
              </div>
              <KV rows={[["Last changed", "Today · 10:12"], ["Changed by", "Arjun Nair"], ["Changes this month", "4"], ["Pending approval", "None"]]} />
            </CardBody>
          </Card>
          <Alert tone="danger" title="Every change is audited">
            Configuration changes cannot be deleted. Each edit stores the previous value, the new value, the
            actor and the timestamp.
          </Alert>
          <Card>
            <CardHead title="Recent changes" />
            <CardBody tight style={{ paddingBottom: 0 }}>
              {[
                ["max_hold_hours", "6 h → 5 h", "Today 10:12"],
                ["volunteer_radius_km", "4 km → 6 km", "27 Oct 16:40"],
                ["photo_proof", "Optional → Required", "19 Oct 09:05"],
              ].map(([k, v, t]) => (
                <div key={k} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div className="mono text-sm green">{k}</div>
                  <div className="text-md ink">{v}</div>
                  <div className="text-xs muted">{t}</div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title="Apply this configuration change?"
        desc="It takes effect immediately for all users."
        footer={
          <>
            <Button variant="quiet" onClick={() => setConfirm(null)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setConfirm(null); toast("Configuration updated", "Change applied and logged to the audit trail.", "success"); }}>
              Apply change
            </Button>
          </>
        }
      >
        <div className="stack g4">
          <KV rows={[["Setting", confirm?.key || ""], ["New value", String(confirm?.value ?? "")], ["Applies to", "All cities"], ["Recorded by", "Arjun Nair · Super Admin"]]} />
          <Alert tone="warning" title="This affects live donations">
            Donations currently published keep their original expiry. New donations use the new rule.
          </Alert>
        </div>
      </Modal>
    </>
  );
}
