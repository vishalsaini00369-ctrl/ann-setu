import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Timeline, KV, Alert,
  EmptyState, Avatar, Field, Select, CheckRow,
} from "../../components/ui/index.jsx";
import { useApp, useDocumentTitle, formatDateTime } from "../../data/store.jsx";
import { volunteerTasks, donations as seedDonations } from "../../data/mockData.js";

const findTask = (id) => {
  const t = volunteerTasks.find((x) => x.id === id);
  if (t) return t;
  const d = seedDonations.find((x) => x.id === id);
  return d ? { ...d, dropNgo: d.ngo || "Annapurna Seva Sansthan", dropArea: "Bani Park", pickupBy: d.window.end.slice(11), distanceKm: d.distance, otp: "1234" } : null;
};

/* ================= 1. TASK DETAIL ========================== */
export function PickupDetail() {
  const { id } = useParams();
  const t = findTask(id);
  useDocumentTitle("Pickup details");
  if (!t) return <Card><EmptyState icon="search" title="Task not found" desc="This assignment may have been reassigned." action={<Button as={Link} to="/volunteer/pickups">Back to pickups</Button>} /></Card>;

  return (
    <>
      <Breadcrumbs items={[{ label: "Volunteer", to: "/volunteer" }, { label: "Assigned pickups", to: "/volunteer/pickups" }, { label: t.id }]} />
      <PageHead
        eyebrow={`${t.id} · ${t.servings} servings`}
        title={t.title}
        badge={<StatusBadge status={t.status === "picked_up" ? "Picked up" : "Volunteer assigned"} lg />}
        sub={`Collect from ${t.donor} by ${t.pickupBy} and deliver to ${t.dropNgo}.`}
      />

      <div className="grid grid--sidebar">
        <div className="stack g5">
          <Card>
            <CardHead title="Your route" desc={`${t.distanceKm} km · about 24 minutes riding`} />
            <CardBody>
              <div className="stack g4">
                <div className="row g3 items-start">
                  <span className="stat__icon" style={{ background: "var(--green-600)", color: "#fff", flex: "none" }}><Icon name="store" size={16} /></span>
                  <div className="grow">
                    <div className="fact__k">Step 1 · Collect</div>
                    <div className="text-base fw-semi ink">{t.donor}</div>
                    <div className="text-md muted">{t.area} · ask for the kitchen supervisor</div>
                    <div className="text-sm muted mt1">Pickup window closes {t.pickupBy}</div>
                  </div>
                </div>
                <div className="row g3 items-start">
                  <span className="stat__icon" style={{ background: "var(--info-bg)", color: "var(--info)", flex: "none" }}><Icon name="handHeart" size={16} /></span>
                  <div className="grow">
                    <div className="fact__k">Step 2 · Deliver</div>
                    <div className="text-base fw-semi ink">{t.dropNgo}</div>
                    <div className="text-md muted">{t.dropArea} · ask for the duty manager</div>
                    <div className="text-sm muted mt1">Food must be served by 17:00</div>
                  </div>
                </div>
              </div>
              <div className="map-card mt4" style={{ minHeight: 220 }} aria-label="Illustrative route map">
                <div className="map-card__road" style={{ left: 0, right: 0, top: "60%", height: 10 }} />
                <div className="map-card__road" style={{ top: 0, bottom: 0, left: "24%", width: 8 }} />
                <div className="map-card__road" style={{ top: 0, bottom: 0, left: "70%", width: 8 }} />
                <div className="map-card__pin" style={{ left: "24%", top: "60%" }}>
                  <span className="map-card__pin-bubble">Pickup</span><span className="map-card__pin-dot" />
                </div>
                <div className="map-card__pin map-card__pin--ngo" style={{ left: "70%", top: "60%" }}>
                  <span className="map-card__pin-bubble">Drop</span><span className="map-card__pin-dot" />
                </div>
                <div className="map-card__badge">Illustrative route · not live navigation</div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Food safety at handover" desc="Check these before you accept the food" />
            <CardBody>
              <div className="stack g2">
                {[
                  ["Containers are sealed and clean", "Refuse if leaking, open or dirty."],
                  ["Food is hot (steam visible) or properly chilled", "Ask the donor to confirm the holding temperature."],
                  ["Quantity matches what was declared", "Report a shortfall from the task screen."],
                  ["Labels show preparation time", "You should be able to see when it was cooked."],
                ].map(([t2, d]) => (
                  <div key={t2} className="row g2 items-start">
                    <Icon name="check" size={14} style={{ color: "var(--green-600)", flex: "none", marginTop: 3 }} />
                    <div>
                      <div className="text-md fw-semi ink">{t2}</div>
                      <div className="text-xs muted">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Alert tone="danger" title="You can refuse at any point">
                If anything looks or smells wrong, do not carry the food. Report it and the platform team
                will handle the rest.
              </Alert>
            </CardBody>
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Progress" />
            <CardBody>
              <Timeline items={[
                { title: "Assignment received", meta: "Today · 09:42", state: "done", icon: "check" },
                { title: "You accepted the run", meta: "Today · 09:45", state: "done", icon: "check" },
                t.status === "picked_up"
                  ? { title: "Food collected · OTP verified", meta: "Today · 11:34", state: "done", icon: "check" }
                  : { title: "Collect the food", meta: `Pickup OTP required · by ${t.pickupBy}`, state: "current", icon: "qr" },
                { title: "Deliver to NGO", meta: `${t.dropNgo} · ${t.dropArea}`, state: "pending", icon: "handHeart" },
                { title: "Delivery confirmed", meta: "NGO OTP + photo", state: "pending", icon: "check" },
              ]} />
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Contacts" />
            <CardBody>
              <div className="stack g3">
                <div className="row g3">
                  <Avatar initials="RM" size="sm" />
                  <div className="grow"><div className="text-md fw-semi ink">{t.donor}</div><div className="text-xs muted">Donor · +91 98290 1••••</div></div>
                  <Button variant="ghost" size="sm" icon="phone" aria-label="Call donor" />
                </div>
                <div className="row g3">
                  <Avatar initials="AS" size="sm" />
                  <div className="grow"><div className="text-md fw-semi ink">{t.dropNgo}</div><div className="text-xs muted">NGO · +91 98290 4••••</div></div>
                  <Button variant="ghost" size="sm" icon="phone" aria-label="Call NGO" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card style={{ background: "var(--canvas)" }}>
            <CardBody>
              <div className="ds-label">Pickup OTP</div>
              <div className="row between">
                <span className="text-md muted">Shared by donor at handover</span>
                <span className="mono fw-semi ink" style={{ fontSize: 20, letterSpacing: 4 }}>{t.status === "picked_up" ? "✓" : "• • • •"}</span>
              </div>
              <p className="text-xs muted mt2">Demo code for this prototype: <span className="mono fw-semi ink">{t.otp || "1234"}</span></p>
            </CardBody>
          </Card>

          <div className="stack g2">
            <Button variant="primary" block size="lg" as={Link} to={`/volunteer/navigate/${t.id}`} icon="navigation">Start navigation</Button>
            {t.status === "picked_up" ? (
              <Button variant="quiet" block as={Link} to={`/volunteer/confirm/${t.id}`} icon="checkCircle">Confirm delivery</Button>
            ) : (
              <Button variant="quiet" block as={Link} to={`/volunteer/verify/${t.id}`} icon="qr">Verify pickup OTP</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= 2. NAVIGATION ========================== */
export function Navigate() {
  const { id } = useParams();
  const t = findTask(id);
  const nav = useNavigate();
  const [leg, setLeg] = useState("pickup");
  useDocumentTitle("Navigation");
  if (!t) return null;

  const target = leg === "pickup" ? { name: t.donor, area: t.area, label: "Pickup" } : { name: t.dropNgo, area: t.dropArea, label: "Drop" };

  return (
    <>
      <Breadcrumbs items={[{ label: "Volunteer", to: "/volunteer" }, { label: "Pickups", to: "/volunteer/pickups" }, { label: t.id, to: `/volunteer/pickups/${t.id}` }, { label: "Navigation" }]} />
      <PageHead
        eyebrow={`${t.id} · ${t.distanceKm} km total`}
        title={`Navigate to ${target.label.toLowerCase()}`}
        sub={`${target.name} · ${target.area}`}
        actions={<Badge tone="info" lg>Illustrative map</Badge>}
      />

      <div className="split split--rail">
        <Card>
          <CardBody tight>
            <div className="map-card" style={{ minHeight: 420 }} aria-label="Illustrative map with route">
              <div className="map-card__road" style={{ left: 0, right: 0, top: "36%", height: 12 }} />
              <div className="map-card__road" style={{ left: 0, right: 0, top: "68%", height: 10 }} />
              <div className="map-card__road" style={{ top: 0, bottom: 0, left: "20%", width: 10 }} />
              <div className="map-card__road" style={{ top: 0, bottom: 0, left: "58%", width: 10 }} />
              <div className="map-card__road" style={{ top: 0, bottom: 0, left: "84%", width: 8 }} />
              <div className="map-card__pin map-card__pin--vol" style={{ left: "20%", top: "36%" }}>
                <span className="map-card__pin-bubble">You</span><span className="map-card__pin-dot" />
              </div>
              <div className="map-card__pin" style={{ left: leg === "pickup" ? "58%" : "84%", top: leg === "pickup" ? "36%" : "68%" }}>
                <span className="map-card__pin-bubble">{leg === "pickup" ? "Pickup" : "Drop"}</span>
                <span className="map-card__pin-dot" />
              </div>
              <div className="map-card__badge">Prototype map — no GPS or live routing</div>
            </div>
          </CardBody>
        </Card>

        <div className="stack g4">
          <Card>
            <CardBody>
              <div className="row between mb3">
                <Badge tone={leg === "pickup" ? "success" : "info"} dot>{leg === "pickup" ? "Leg 1" : "Leg 2"}</Badge>
                <span className="text-sm muted">{t.distanceKm} km · 24 min</span>
              </div>
              <div className="stack g3">
                {[
                  { icon: "arrowUp", text: "Head north on the service road", meta: "400 m" },
                  { icon: "arrowRight", text: "Turn right after the petrol pump", meta: "1.2 km" },
                  { icon: "arrowUp", text: "Continue past Collectorate Circle", meta: "600 m" },
                  { icon: "flag", text: `Arrive at ${target.name}`, meta: "On your left" },
                ].map((s) => (
                  <div className="row g3 items-start" key={s.text}>
                    <span className="stat__icon" style={{ width: 28, height: 28, flex: "none" }}><Icon name={s.icon} size={14} /></span>
                    <div className="grow">
                      <div className="text-md ink fw-med">{s.text}</div>
                      <div className="text-xs muted">{s.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider" style={{ margin: "16px 0" }} />
              {leg === "pickup" ? (
                <Button variant="primary" block size="lg" onClick={() => { setLeg("drop"); }} icon="flag">I've arrived at the donor</Button>
              ) : (
                <Button variant="primary" block size="lg" as={Link} to={`/volunteer/confirm/${t.id}`} icon="checkCircle">Arrived — confirm delivery</Button>
              )}
              <Button variant="quiet" block className="mt2" as={Link} to={`/volunteer/pickups/${t.id}`} icon="arrowLeft">Back to task</Button>
            </CardBody>
          </Card>

          <Alert tone="info" title="Ride safely">
            Do not use the phone while riding. Pull over before checking the OTP or updating the task.
          </Alert>
        </div>
      </div>
    </>
  );
}

/* ================= 3. OTP VERIFY =========================== */
export function VerifyPickup() {
  const { id } = useParams();
  const t = findTask(id);
  const nav = useNavigate();
  const { updateStatus, toast } = useApp();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [scan, setScan] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  useDocumentTitle("Verify pickup");
  if (!t) return null;

  const expected = (t.otp || "1234").replace(/\s/g, "");

  const onChange = (i, v) => {
    const clean = v.replace(/[^0-9]/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[i] = clean;
    setDigits(nextDigits);
    setError("");
    if (clean && i < 3) refs[i + 1].current?.focus();
  };

  const submit = () => {
    if (digits.join("") !== expected) {
      setError("That code does not match the donor's code. Ask them to read it again.");
      return;
    }
    updateStatus({ id: t.id, status: "picked_up" });
    toast("Pickup verified", `${t.servings} servings collected from ${t.donor}.`, "success");
    nav(`/volunteer/confirm/${t.id}`);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Volunteer", to: "/volunteer" }, { label: "Pickups", to: "/volunteer/pickups" }, { label: t.id, to: `/volunteer/pickups/${t.id}` }, { label: "Verify" }]} />
      <PageHead eyebrow="Step 1 of 2 · Pickup" title="Verify the handover" sub="Ask the donor for their 4-digit pickup code, or scan the QR code on the donation slip." />

      <div className="split split--rail">
        <Card>
          <CardBody>
            <div className="row g3 wrap mb5">
              <Button variant={!scan ? "secondary" : "quiet"} size="sm" icon="key" onClick={() => setScan(false)}>Enter OTP</Button>
              <Button variant={scan ? "secondary" : "quiet"} size="sm" icon="qr" onClick={() => setScan(true)}>Scan QR code</Button>
            </div>

            {!scan ? (
              <div className="stack g4" style={{ alignItems: "center" }}>
                <div className="text-center">
                  <div className="text-base fw-semi ink">Enter the donor's 4-digit code</div>
                  <div className="text-md muted mt1">{t.donor} · {t.area}</div>
                </div>
                <div className="otp-inputs">
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={refs[i]}
                      value={d}
                      onChange={(e) => onChange(i, e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Backspace" && !digits[i] && i > 0) refs[i - 1].current?.focus(); }}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`Digit ${i + 1} of pickup code`}
                      aria-invalid={Boolean(error)}
                    />
                  ))}
                </div>
                {error && <div className="field__error" role="alert"><Icon name="alertCircle" size={13} /> {error}</div>}
                <div className="demo-note" style={{ maxWidth: 380 }}>
                  <Icon name="info" size={15} style={{ flex: "none", marginTop: 1 }} />
                  <div><strong>Prototype:</strong> the demo pickup code is <span className="mono fw-semi">{expected}</span>.</div>
                </div>
                <Button variant="primary" size="lg" onClick={submit} disabled={digits.join("").length < 4} icon="checkCircle">Verify & collect</Button>
              </div>
            ) : (
              <div className="stack g4" style={{ alignItems: "center" }}>
                <div className="qr-box">
                  <svg viewBox="0 0 100 100" width="150" height="150" aria-label="Sample QR code">
                    <rect width="100" height="100" fill="#fff" />
                    {Array.from({ length: 14 }).map((_, r) =>
                      Array.from({ length: 14 }).map((__, c) =>
                        ((r * 7 + c * 3 + r * c) % 5 < 2) ? (
                          <rect key={`${r}-${c}`} x={c * 7 + 1} y={r * 7 + 1} width="7" height="7" fill="var(--ink-900)" />
                        ) : null
                      )
                    )}
                    <rect x="1" y="1" width="21" height="21" fill="none" stroke="var(--green-600)" strokeWidth="3" />
                  </svg>
                </div>
                <div className="text-md muted" style={{ textAlign: "center", maxWidth: "40ch" }}>
                  Point the camera at the QR code on the donor's donation slip. In this prototype, use the
                  simulated scan below.
                </div>
                <Button variant="primary" size="lg" onClick={() => { setScan(false); setDigits(expected.split("")); }} icon="camera">Simulate scan</Button>
              </div>
            )}
          </CardBody>
        </Card>

        <div className="stack g4">
          <Card>
            <CardHead title="What you are collecting" />
            <CardBody>
              <KV rows={[
                ["Food", t.title],
                ["Servings", `${t.servings}`],
                ["From", t.donor],
                ["Deliver to", t.dropNgo],
                ["Safe until", "Today · 17:00"],
              ]} />
            </CardBody>
          </Card>
          <Alert tone="warning" title="Check before you verify">
            Confirming the OTP tells the platform you have physically received the food. Only do this when
            the containers are in your hands.
          </Alert>
        </div>
      </div>
    </>
  );
}

/* ================= 4. DELIVERY CONFIRM ===================== */
export function ConfirmDelivery() {
  const { id } = useParams();
  const t = findTask(id);
  const nav = useNavigate();
  const { updateStatus, toast } = useApp();
  const [otp, setOtp] = useState("");
  const [photo, setPhoto] = useState(false);
  const [served, setServed] = useState(String(t?.servings || 60));
  const [err, setErr] = useState({});
  useDocumentTitle("Confirm delivery");
  if (!t) return null;

  const submit = () => {
    const e = {};
    if (otp.replace(/\s/g, "").length !== 4) e.otp = "Enter the 4-digit code from the NGO.";
    if (!photo) e.photo = "A photo of the handover is required.";
    setErr(e);
    if (Object.keys(e).length) return;
    updateStatus({ id: t.id, status: "delivered", donor: t.donor, ngo: t.dropNgo, servings: Number(served) });
    toast("Delivery confirmed", `${served} servings delivered to ${t.dropNgo}. Thank you!`, "success");
    nav("/volunteer/history");
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Volunteer", to: "/volunteer" }, { label: "Pickups", to: "/volunteer/pickups" }, { label: t.id, to: `/volunteer/pickups/${t.id}` }, { label: "Confirm" }]} />
      <PageHead eyebrow="Step 2 of 2 · Delivery" title="Confirm the delivery" sub={`Hand the food to ${t.dropNgo} and complete the record together.`} />

      <div className="split split--rail">
        <Card>
          <CardBody>
            <div className="stack g5">
              <div>
                <div className="row g2 mb2"><Icon name="checkCircle" size={17} style={{ color: "var(--green-600)" }} /><span className="text-base fw-semi ink">Pickup completed</span></div>
                <div className="text-md muted">Collected from {t.donor} · OTP verified · {t.servings} servings in your vehicle.</div>
              </div>

              <Field label="NGO delivery code" htmlFor="dotp" required error={err.otp} hint="Ask the NGO's duty manager for their 4-digit code. Prototype code: 4321.">
                <input
                  id="dotp"
                  className="input"
                  style={{ maxWidth: 200, letterSpacing: 6, fontSize: 18, fontWeight: 600 }}
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4)); setErr((p) => ({ ...p, otp: undefined })); }}
                  inputMode="numeric"
                  placeholder="0000"
                />
              </Field>

              <Field label="Meals handed over" htmlFor="served" hint="Confirm the actual number received by the NGO.">
                <input id="served" className="input" style={{ maxWidth: 160 }} inputMode="numeric" value={served} onChange={(e) => setServed(e.target.value)} />
              </Field>

              <Field label="Photo of the handover" required error={err.photo} hint="Required for proof of delivery. Show the containers at the NGO.">
                <button type="button" className="check" style={{ width: "100%" }} onClick={() => { setPhoto(true); setErr((p) => ({ ...p, photo: undefined })); }}>
                  <span className="stat__icon" style={{ width: 36, height: 36 }}><Icon name={photo ? "checkCircle" : "camera"} size={17} /></span>
                  <span className="check__text" style={{ textAlign: "left" }}>
                    <span className="check__title">{photo ? "handover-3010.jpg attached" : "Take or upload a photo"}</span>
                    <span className="check__desc">{photo ? "1 image · 980 KB · attached to record" : "JPG or PNG up to 5 MB"}</span>
                  </span>
                  <Badge tone={photo ? "success" : "neutral"}>{photo ? "Attached" : "Add"}</Badge>
                </button>
              </Field>

              <Field label="Any issue at delivery?" htmlFor="iss" optional>
                <Select id="iss" placeholder="No issues"
                  options={["Quantity shortfall", "NGO not ready to receive", "Packaging leaked in transit", "Arrived after safe window", "Other"]} />
              </Field>

              <div className="row between g3" style={{ borderTop: "1px solid var(--line)", paddingTop: "var(--s-5)" }}>
                <Button variant="quiet" as={Link} to={`/volunteer/pickups/${t.id}`} icon="arrowLeft">Back</Button>
                <Button variant="primary" size="lg" onClick={submit} icon="checkCircle">Complete delivery</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="stack g4">
          <Card>
            <CardHead title="Delivering to" />
            <CardBody>
              <div className="row g3 mb3">
                <Avatar initials="AS" />
                <div>
                  <div className="text-base fw-semi ink">{t.dropNgo}</div>
                  <div className="text-xs muted">Verified NGO · {t.dropArea}</div>
                </div>
              </div>
              <KV rows={[["Contact", "Duty manager"], ["Phone", "+91 98290 4••••"], ["Receiving hours", "Until 19:00"]]} />
            </CardBody>
          </Card>
          <Alert tone="info" title="Why the second OTP">
            Two verifications — one at pickup, one at delivery — mean food cannot disappear in transit without
            a record. This protects you as much as the donor.
          </Alert>
          <Card style={{ background: "var(--canvas)" }}>
            <CardBody>
              <div className="ds-label">After you confirm</div>
              <p className="text-md muted" style={{ lineHeight: 1.55 }}>
                The donor is notified instantly and sees this delivery in their impact report. The NGO then
                files a distribution record confirming how many people were served.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
