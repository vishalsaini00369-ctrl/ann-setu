import React, { useState } from "react";
import Icon from "../components/Icon.jsx";
import { PageHead } from "../components/layout/AppShell.jsx";
import {
  Button, Card, CardBody, CardHead, Field, Input, Select, Badge, CheckRow, Avatar,
  Alert, Tabs, KV, Progress, VerifiedMark, Modal,
} from "../components/ui/index.jsx";
import { useApp, useDocumentTitle } from "../data/store.jsx";
import { roleProfiles } from "../data/mockData.js";

/* ============================================================
   PROFILE & SETTINGS — shared across donor / NGO / volunteer
   ============================================================ */
export default function Profile() {
  const { role, toast } = useApp();
  const p = roleProfiles[role] || roleProfiles.donor;
  useDocumentTitle("Profile & settings");
  const [tab, setTab] = useState("organisation");
  const [notif, setNotif] = useState({ push: true, sms: true, email: true, weekly: true, marketing: false });
  const [del, setDel] = useState(false);

  return (
    <>
      <PageHead
        eyebrow="Account"
        title="Profile & settings"
        sub="Your organisation details, verification documents, notifications and security."
        actions={<Button variant="quiet" icon="download" onClick={() => toast("Data export requested", "A link would be emailed in production.", "success")}>Export my data</Button>}
      />

      <div className="grid grid--sidebar">
        <div className="stack g5">
          <Card>
            <CardBody>
              <div className="row g4 wrap">
                <Avatar initials={p.initials} size="xl" />
                <div className="grow">
                  <h2 style={{ fontSize: "var(--fs-20)" }}>{p.name}</h2>
                  <div className="row g3 mt1 wrap">
                    <VerifiedMark status="verified" />
                    <span className="text-md muted">{p.subRole}</span>
                  </div>
                </div>
                <div className="row g2">
                  <Button variant="quiet" size="sm" icon="camera">Change photo</Button>
                </div>
              </div>
            </CardBody>
          </Card>

          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: "organisation", label: "Organisation" },
              { value: "notifications", label: "Notifications" },
              { value: "verification", label: "Verification" },
              { value: "security", label: "Security" },
            ]}
          />

          {tab === "organisation" && (
            <Card>
              <CardHead title="Organisation details" desc="Visible to matched NGOs and volunteers only." />
              <CardBody>
                <div className="stack g4">
                  <div className="grid grid--2">
                    <Field label="Display name" htmlFor="dn" required>
                      <Input id="dn" defaultValue={p.name} />
                    </Field>
                    <Field label="Contact person" htmlFor="cp" required>
                      <Input id="cp" defaultValue="Rakesh Sharma" />
                    </Field>
                  </div>
                  <div className="grid grid--2">
                    <Field label="Mobile number" htmlFor="mn" required hint="Changing this requires OTP re-verification.">
                      <Input id="mn" defaultValue="+91 98290 11234" />
                    </Field>
                    <Field label="Email" htmlFor="em">
                      <Input id="em" type="email" defaultValue="kitchen@rawatmishthan.example" />
                    </Field>
                  </div>
                  <Field label="Registered address" htmlFor="addr">
                    <Input id="addr" defaultValue="Near Collectorate Circle, Bani Park, Jaipur 302016" />
                  </Field>
                  <div className="grid grid--2">
                    <Field label="City" htmlFor="ct">
                      <Select id="ct" defaultValue="Jaipur" options={["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"]} />
                    </Field>
                    <Field label="Operating area" htmlFor="ar" hint="Used to match you with nearby NGOs.">
                      <Select id="ar" defaultValue="Bani Park" options={["Bani Park", "C-Scheme", "Civil Lines", "Malviya Nagar", "Vaishali Nagar"]} />
                    </Field>
                  </div>
                  <Field label="About your kitchen" htmlFor="about" optional hint="Shown to NGOs to build trust.">
                    <textarea id="about" className="textarea" defaultValue="Family-run sweet shop and restaurant since 1965. Surplus thalis and mithai available most evenings after 9 pm." />
                  </Field>
                  <div className="row g2">
                    <Button variant="primary" onClick={() => toast("Profile saved", "Changes are held in this demo session only.", "success")}>Save changes</Button>
                    <Button variant="quiet" onClick={() => toast("Reverted", "Form restored to saved values.", "success")}>Discard</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <CardHead title="Notifications" desc="Choose how ANN SETU reaches you. Safety alerts cannot be turned off." />
              <CardBody>
                <div className="stack g2">
                  <CheckRow id="n1" checked={notif.push} onChange={(v) => setNotif((s) => ({ ...s, push: v }))}
                    title="Push notifications" desc="NGO acceptance, volunteer assignment, pickup confirmation." />
                  <CheckRow id="n2" checked={notif.sms} onChange={(v) => setNotif((s) => ({ ...s, sms: v }))}
                    title="SMS alerts" desc="For urgent updates when the app is closed." />
                  <CheckRow id="n3" checked={notif.email} onChange={(v) => setNotif((s) => ({ ...s, email: v }))}
                    title="Email" desc="Receipts, monthly statements and verification outcomes." />
                  <CheckRow id="n4" checked={notif.weekly} onChange={(v) => setNotif((s) => ({ ...s, weekly: v }))}
                    title="Weekly impact summary" desc="Every Monday at 9 am." />
                  <CheckRow id="n5" checked={notif.marketing} onChange={(v) => setNotif((s) => ({ ...s, marketing: v }))}
                    title="Product news and campaigns" desc="Occasional updates about new features." />
                </div>
                <Alert tone="warning" title="Safety alerts are always on">
                  Expiry warnings, pickup confirmations and incident notices are always delivered, even if
                  all other notifications are off.
                </Alert>
              </CardBody>
            </Card>
          )}

          {tab === "verification" && (
            <div className="stack g5">
              <Card>
                <CardHead title="Verification status" desc="Required before you can publish donations" action={<Badge tone="success" dot>Verified</Badge>} />
                <CardBody>
                  <div className="row between mb2">
                    <span className="text-md muted">Profile completeness</span>
                    <span className="text-md fw-semi ink">100%</span>
                  </div>
                  <Progress value={100} />
                  <div className="divider" style={{ margin: "20px 0" }} />
                  <div className="stack g2">
                    {[
                      ["FSSAI licence", "12719010002345", "verified", "Valid until 31 Mar 2028"],
                      ["Owner ID (Aadhaar, masked)", "XXXX XXXX 4412", "verified", "Verified 12 Feb 2025"],
                      ["Premises photo", "kitchen-01.jpg", "verified", "Verified 12 Feb 2025"],
                      ["Bank account (for TDS receipts)", "HDFC ••4412", "verified", "Penny-drop complete"],
                    ].map(([t, v, st, note]) => (
                      <div key={t} className="row g3 between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                        <div className="row g3" style={{ minWidth: 0 }}>
                          <span className="stat__icon" style={{ width: 30, height: 30 }}><Icon name="file" size={14} /></span>
                          <div style={{ minWidth: 0 }}>
                            <div className="text-md fw-semi ink">{t}</div>
                            <div className="text-xs muted">{v} · {note}</div>
                          </div>
                        </div>
                        <VerifiedMark status={st} />
                      </div>
                    ))}
                  </div>
                  <div className="row g2 mt4">
                    <Button variant="quiet" size="sm" icon="upload">Upload new document</Button>
                    <Button variant="ghost" size="sm" icon="refresh">Request re-verification</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {tab === "security" && (
            <div className="stack g5">
              <Card>
                <CardHead title="Security" desc="Keep your account and donation data safe." />
                <CardBody>
                  <div className="stack g2">
                    <CheckRow id="s1" checked onChange={() => {}} title="Two-factor authentication" desc="Enabled via SMS to +91 98290 1••••" />
                    <CheckRow id="s2" checked onChange={() => {}} title="Require OTP for pickup handover" desc="Recommended for every donation." />
                    <CheckRow id="s3" checked={false} onChange={() => {}} title="Sign out of all other devices" desc="Useful if a staff phone was shared or lost." />
                  </div>
                  <div className="divider" style={{ margin: "20px 0" }} />
                  <div className="grid grid--2">
                    <Field label="Current password" htmlFor="cur"><Input id="cur" type="password" defaultValue="········" /></Field>
                    <Field label="New password" htmlFor="new" hint="At least 10 characters."><Input id="new" type="password" placeholder="Enter a new password" /></Field>
                  </div>
                  <Button variant="primary" className="mt4" onClick={() => toast("Password updated", "Prototype only.", "success")}>Update password</Button>
                </CardBody>
              </Card>
              <Card style={{ borderColor: "var(--danger-line)" }}>
                <CardHead title="Deactivate account" desc="Stops all listings and removes you from matching." />
                <CardBody>
                  <p className="text-md muted mb4">
                    Historical donation records are retained for food-safety auditing for 24 months, as
                    required by platform policy.
                  </p>
                  <Button variant="danger-ghost" onClick={() => setDel(true)} icon="alert">Deactivate my account</Button>
                </CardBody>
              </Card>
            </div>
          )}
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Account" />
            <CardBody>
              <KV rows={[["Role", role.charAt(0).toUpperCase() + role.slice(1)], ["Member since", "Feb 2025"], ["Donations", "68"], ["Reliability score", "98 / 100"], ["Avg. NGO response", "11 min"]]} />
            </CardBody>
          </Card>
          <Card style={{ background: "var(--canvas)" }}>
            <CardBody>
              <div className="ds-label">Need help?</div>
              <div className="stack g3">
                <a className="row g2 text-md ink" href="#main-content"><Icon name="mail" size={15} /> support@annsetu.example</a>
                <a className="row g2 text-md ink" href="#main-content"><Icon name="phone" size={15} /> 1800 000 000</a>
                <a className="row g2 text-md ink" href="#main-content"><Icon name="file" size={15} /> Food safety policy</a>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        open={del}
        onClose={() => setDel(false)}
        title="Deactivate your account?"
        desc="This cannot be undone from the app."
        footer={
          <>
            <Button variant="quiet" onClick={() => setDel(false)}>Keep my account</Button>
            <Button variant="danger" onClick={() => { setDel(false); toast("Deactivation requested", "Prototype only — nothing was changed.", "error"); }}>Deactivate</Button>
          </>
        }
      >
        <Alert tone="danger" title="Active donations must be resolved first">
          You have 3 active donations. Complete or cancel them before deactivating, so food already
          promised to an NGO is not left uncollected.
        </Alert>
      </Modal>
    </>
  );
}
