import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageHead, Breadcrumbs } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardHead, CardBody, Field, Input, Select, Textarea, CheckRow,
  Alert, Badge, Chips, SegmentedControl, KV, Progress,
} from "../../components/ui/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";

/* ============================================================
   CREATE DONATION — 6-step form
   1 Food  2 Quantity  3 Preparation  4 Safety  5 Pickup  6 Review
   Food-safety information is visually dominant by design.
   ============================================================ */

const STEPS = [
  { n: 1, label: "Food", title: "What are you donating?", sub: "Tell NGOs exactly what the food is, so they can match it to the people they serve." },
  { n: 2, label: "Quantity", title: "How much food is there?", sub: "Accurate numbers help NGOs plan distribution and arrange the right vehicle." },
  { n: 3, label: "Preparation", title: "When was it prepared?", sub: "Preparation and safe-consumption times decide whether the food can be rescued at all." },
  { n: 4, label: "Safety", title: "Storage and safety", sub: "This section is checked by our team. Incomplete declarations cannot be published." },
  { n: 5, label: "Pickup", title: "Pickup location & availability", sub: "Give the volunteer everything they need to collect without calling you." },
  { n: 6, label: "Review", title: "Review and publish", sub: "Check the details. You can edit any section before publishing." },
];

const CATEGORIES = ["Cooked meal", "Bakery", "Packaged", "Sweets", "Fruit & veg", "Dry ration", "Beverages"];
const ALLERGENS = ["Milk", "Gluten", "Tree nuts", "Peanuts", "Soy", "Egg", "Mustard", "Sesame"];

const initial = {
  title: "", category: "", diet: "veg", description: "",
  servings: "", weight: "", containers: "", portion: "Regular (300–350 g)",
  preparedDate: "2026-10-30", preparedTime: "10:30", consumeBy: "2026-10-30T18:00", reheated: "no",
  storage: "", tempChecked: false, packaged: true, handlerCertified: true, allergens: [], photo: false, declaration: false,
  address: "Near Collectorate Circle, Bani Park", area: "Bani Park", landmark: "Opposite Bani Park police station",
  windowStart: "2026-10-30T13:00", windowEnd: "2026-10-30T15:30",
  contact: "Kitchen desk", phone: "+91 98290 11234", instructions: "Enter from the service lane; ask for the cold room.",
};

export default function CreateDonation() {
  useDocumentTitle("Create donation");
  const nav = useNavigate();
  const { createDonation, toast } = useApp();

  const [step, setStep] = useState(1);
  const [f, setF] = useState(initial);
  const [errors, setErrors] = useState({});
  const [publishing, setPublishing] = useState(false);

  const set = (k) => (e) => {
    const v = e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value ?? e;
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!f.title.trim() || f.title.trim().length < 4) e.title = "Give the food a clear name (at least 4 characters).";
      if (!f.category) e.category = "Select the closest category.";
    }
    if (s === 2) {
      if (!f.servings) e.servings = "Enter how many people this can serve.";
      else if (Number(f.servings) < 20) e.servings = "Minimum 20 servings per donation — combine smaller lots.";
      if (!f.weight) e.weight = "Enter an approximate weight in kg.";
    }
    if (s === 3) {
      if (!f.preparedDate || !f.preparedTime) e.preparedTime = "Enter when the food was prepared.";
      if (!f.consumeBy) e.consumeBy = "Set the time after which the food must not be eaten.";
      else {
        const prep = new Date(`${f.preparedDate}T${f.preparedTime}`);
        const by = new Date(f.consumeBy);
        if (by <= prep) e.consumeBy = "Safe-consumption time must be after the preparation time.";
        else if ((by - prep) / 3600000 > 6) e.consumeBy = "Cooked food cannot be declared safe for more than 6 hours after preparation.";
      }
    }
    if (s === 4) {
      if (!f.storage) e.storage = "Select how the food has been stored.";
      if (!f.tempChecked) e.tempChecked = "Confirm the holding temperature was checked.";
      if (!f.declaration) e.declaration = "The safety declaration must be accepted before publishing.";
      if (!f.packaged) e.packaged = "Food must be packaged in clean, sealed containers to be donated.";
    }
    if (s === 5) {
      if (!f.address.trim()) e.address = "Enter the full pickup address.";
      if (!f.area) e.area = "Select the area so nearby NGOs and volunteers can find you.";
      if (!f.phone.trim()) e.phone = "A reachable phone number is required for the volunteer.";
      if (new Date(f.windowEnd) <= new Date(f.windowStart)) e.windowEnd = "Pickup window must end after it starts.";
      if (new Date(f.windowEnd) > new Date(f.consumeBy)) e.windowEnd = "Pickup must close before the food becomes unsafe.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => Math.min(6, s + 1)); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      const id = "AS-2026-1043";
      createDonation({
        id,
        title: f.title,
        category: f.category,
        donor: "Rawat Mishthan Bhandar", donorType: "Restaurant", donorId: "don-1",
        ngo: null, ngoId: null, volunteer: null, volunteerId: null,
        servings: Number(f.servings), quantity: `${f.weight} kg`, status: "published",
        window: { start: f.windowStart, end: f.windowEnd },
        prepared: `${f.preparedDate}T${f.preparedTime}`, expires: f.consumeBy,
        storage: f.storage, allergens: f.allergens, veg: f.diet === "veg",
        pickup: { area: f.area, address: f.address, lat: 26.93, lng: 75.79, contact: f.contact, phone: f.phone },
        notes: f.instructions,
        safety: { tempOk: f.tempChecked, packaged: f.packaged, handlerCertified: f.handlerCertified },
        createdAt: "2026-10-30T12:40", distance: 1.2,
        urgency: "critical",
      });
      setPublishing(false);
      toast("Donation published", `${f.servings} servings are now visible to verified NGOs within 6 km.`, "success");
      nav(`/donor/donations/${id}`);
    }, 900);
  };

  const meta = STEPS[step - 1];
  const completeness = useMemo(() => {
    const req = [f.title, f.category, f.servings, f.weight, f.consumeBy, f.storage, f.address, f.declaration];
    return Math.round((req.filter(Boolean).length / req.length) * 100);
  }, [f]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Donor", to: "/donor" }, { label: "Create donation" }]} />
      <PageHead
        eyebrow="New donation"
        title="Create a donation"
        sub="Six short steps. Most kitchens finish in under two minutes."
        actions={<Button variant="quiet" icon="x" as={Link} to="/donor">Cancel</Button>}
      />

      <div className="steps mb6">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className={`steps__item ${step === s.n ? "is-active" : ""} ${step > s.n ? "is-done" : ""}`}>
              <span className="steps__num">{step > s.n ? <Icon name="check" size={13} /> : s.n}</span>
              <span className="steps__label">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="steps__bar" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid--sidebar">
        <Card>
          <CardHead title={meta.title} desc={meta.sub} action={<Badge tone="neutral">Step {step} of 6</Badge>} />
          <CardBody>
            {/* ---------- STEP 1 ---------- */}
            {step === 1 && (
              <div className="stack g5">
                <Field label="What food are you donating?" htmlFor="title" required error={errors.title}
                  hint="Be specific — “Veg thali: dal, sabzi, rice, 4 roti” works better than “lunch”.">
                  <Input id="title" value={f.title} onChange={set("title")} placeholder="e.g. Veg thali — dal, sabzi, rice, roti" maxLength={70} />
                </Field>

                <Field label="Category" required error={errors.category}>
                  <Chips items={CATEGORIES.map((c) => ({ label: c, value: c }))} value={f.category} onChange={(v) => { setF((p) => ({ ...p, category: v })); setErrors((p) => ({ ...p, category: undefined })); }} />
                </Field>

                <Field label="Food type" hint="NGOs use this to match religious and dietary requirements.">
                  <SegmentedControl
                    ariaLabel="Food type"
                    value={f.diet}
                    onChange={(v) => setF((p) => ({ ...p, diet: v }))}
                    options={[{ value: "veg", label: "Vegetarian" }, { value: "egg", label: "Contains egg" }, { value: "nonveg", label: "Non-vegetarian" }]}
                  />
                </Field>

                <Field label="Anything else the NGO should know?" htmlFor="desc" optional hint="Spice level, packaging, whether it can be reheated — keep it factual.">
                  <Textarea id="desc" value={f.description} onChange={set("description")} placeholder="e.g. Medium spice, no onion in the dal, packed in 4 insulated carriers." maxLength={240} />
                </Field>
              </div>
            )}

            {/* ---------- STEP 2 ---------- */}
            {step === 2 && (
              <div className="stack g5">
                <div className="grid grid--2">
                  <Field label="Servings" htmlFor="servings" required error={errors.servings} hint="One serving = one full plate. Minimum 20.">
                    <div className="row g2">
                      <div className="stepper-num">
                        <button type="button" onClick={() => setF((p) => ({ ...p, servings: String(Math.max(0, Number(p.servings || 0) - 10)) }))} aria-label="Decrease servings">−</button>
                        <input id="servings" inputMode="numeric" value={f.servings} onChange={set("servings")} placeholder="0" aria-describedby="servings-hint" />
                        <button type="button" onClick={() => setF((p) => ({ ...p, servings: String(Number(p.servings || 0) + 10) }))} aria-label="Increase servings">+</button>
                      </div>
                    </div>
                  </Field>
                  <Field label="Approx. weight" htmlFor="weight" required error={errors.weight} hint="Rough is fine — we show this to the volunteer so they pick the right vehicle.">
                    <div className="input-group">
                      <input id="weight" className="input" inputMode="decimal" value={f.weight} onChange={set("weight")} placeholder="18" />
                      <span className="input-group__suffix" style={{ right: 12, color: "var(--ink-400)" }}>kg</span>
                    </div>
                  </Field>
                </div>

                <div className="grid grid--2">
                  <Field label="Number of containers" htmlFor="containers" optional hint="Helps the volunteer bring enough crates.">
                    <Input id="containers" inputMode="numeric" value={f.containers} onChange={set("containers")} placeholder="4" />
                  </Field>
                  <Field label="Portion size" htmlFor="portion">
                    <Select id="portion" value={f.portion} onChange={set("portion")}
                      options={["Small (200–250 g)", "Regular (300–350 g)", "Large (400–450 g)", "Family pack"]} />
                  </Field>
                </div>

                <Alert tone="info" title="Why we ask for servings and weight">
                  NGOs match servings against the number of people they expect to serve, and volunteers
                  choose a vehicle based on weight. Accurate numbers mean less food is turned away.
                </Alert>
              </div>
            )}

            {/* ---------- STEP 3 ---------- */}
            {step === 3 && (
              <div className="stack g5">
                <div className="grid grid--2">
                  <Field label="Prepared on" htmlFor="pdate" required error={errors.preparedTime}>
                    <Input id="pdate" type="date" value={f.preparedDate} onChange={set("preparedDate")} />
                  </Field>
                  <Field label="Prepared at" htmlFor="ptime" required>
                    <Input id="ptime" type="time" value={f.preparedTime} onChange={set("preparedTime")} />
                  </Field>
                </div>

                <Field label="Safe to consume until" htmlFor="consumeBy" required error={errors.consumeBy}
                  hint="Cooked food cannot be declared safe for more than 6 hours after preparation. The listing closes automatically at this time.">
                  <Input id="consumeBy" type="datetime-local" value={f.consumeBy} onChange={set("consumeBy")} />
                </Field>

                <div className="safety">
                  <span className="safety__icon"><Icon name="clock" size={19} /></span>
                  <div>
                    <div className="safety__title">Time is the safety limit</div>
                    <p className="text-md muted mt2" style={{ lineHeight: 1.55 }}>
                      Food held in the danger zone (5°C–63°C) for more than two hours should not be
                      donated. If the food has already been out of temperature control, mark it as
                      unsuitable and discard it instead.
                    </p>
                    <div className="row g2 mt3">
                      <Badge tone="success" dot>Auto-expiry at {f.consumeBy.slice(11, 16)}</Badge>
                      <Badge tone="neutral">Max hold: 6 hours</Badge>
                    </div>
                  </div>
                </div>

                <Field label="Has the food been reheated after preparation?" htmlFor="reheated">
                  <Select id="reheated" value={f.reheated} onChange={set("reheated")}
                    options={[{ value: "no", label: "No — cooked once" }, { value: "once", label: "Yes, reheated once" }, { value: "na", label: "Not applicable (bakery / packaged)" }]} />
                </Field>
              </div>
            )}

            {/* ---------- STEP 4 ---------- */}
            {step === 4 && (
              <div className="stack g5">
                <Alert tone="warning" title="This section is audited">
                  Food-safety declarations are logged with your account and reviewed by platform
                  administrators. False declarations can lead to suspension.
                </Alert>

                <Field label="How has the food been stored?" required error={errors.storage}>
                  <div className="stack g2">
                    {[
                      { v: "Hot holding at 63°C or above", d: "Cooked food kept in a hot case, bain-marie or insulated carrier above 63°C.", i: "thermometer" },
                      { v: "Chilled at 4°C or below", d: "Refrigerated since preparation, kept in cold storage or insulated boxes with ice packs.", i: "package" },
                      { v: "Ambient, sealed (bakery / packaged)", d: "Shelf-stable items sealed at source, away from heat and moisture.", i: "box" },
                    ].map((o) => (
                      <label key={o.v} className={`check ${f.storage === o.v ? "is-checked" : ""}`} style={{ alignItems: "center" }}>
                        <input type="radio" name="storage" checked={f.storage === o.v} onChange={() => { setF((p) => ({ ...p, storage: o.v })); setErrors((p) => ({ ...p, storage: undefined })); }} style={{ width: 18, height: 18, accentColor: "var(--green-600)" }} />
                        <span className="stat__icon" style={{ width: 32, height: 32 }}><Icon name={o.i} size={16} /></span>
                        <span className="check__text">
                          <span className="check__title">{o.v}</span>
                          <span className="check__desc">{o.d}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.storage && <div className="field__error"><Icon name="alertCircle" size={13} /> {errors.storage}</div>}
                </Field>

                <div className="stack g2">
                  <CheckRow id="temp" checked={f.tempChecked} onChange={(v) => { setF((p) => ({ ...p, tempChecked: v })); setErrors((p) => ({ ...p, tempChecked: undefined })); }}
                    title="I checked the holding temperature" desc="Thermometer reading taken at the time of listing." />
                  {errors.tempChecked && <div className="field__error"><Icon name="alertCircle" size={13} /> {errors.tempChecked}</div>}
                  <CheckRow id="pk" checked={f.packaged} onChange={(v) => { setF((p) => ({ ...p, packaged: v })); setErrors((p) => ({ ...p, packaged: undefined })); }}
                    title="Food is in clean, sealed containers" desc="No open vessels, no re-used plastic bags." />
                  {errors.packaged && <div className="field__error"><Icon name="alertCircle" size={13} /> {errors.packaged}</div>}
                  <CheckRow id="hc" checked={f.handlerCertified} onChange={(v) => setF((p) => ({ ...p, handlerCertified: v }))}
                    title="Prepared by a trained food handler" desc="At least one FoSTaC-certified handler was on duty." />
                </div>

                <Field label="Declare allergens" optional hint="Required for pre-packaged and bakery items. Select all that apply.">
                  <Chips multi items={ALLERGENS.map((a) => ({ label: a, value: a }))} value={f.allergens}
                    onChange={(v) => setF((p) => ({ ...p, allergens: v }))} />
                </Field>

                <Field label="Photo of the food" optional hint="Photos reduce rejections and help NGOs plan portions.">
                  <button type="button" className="check" style={{ width: "100%" }} onClick={() => setF((p) => ({ ...p, photo: true }))}>
                    <span className="stat__icon" style={{ width: 34, height: 34 }}><Icon name={f.photo ? "checkCircle" : "camera"} size={16} /></span>
                    <span className="check__text" style={{ textAlign: "left" }}>
                      <span className="check__title">{f.photo ? "photo-thali-3010.jpg attached" : "Add a photo"}</span>
                      <span className="check__desc">{f.photo ? "1 image · 1.2 MB" : "JPG or PNG up to 5 MB"}</span>
                    </span>
                    <Badge tone={f.photo ? "success" : "neutral"}>{f.photo ? "Attached" : "Browse"}</Badge>
                  </button>
                </Field>

                <div className={`check ${f.declaration ? "is-checked" : ""}`} style={{ borderColor: errors.declaration ? "var(--danger)" : undefined }}>
                  <input id="decl" type="checkbox" checked={f.declaration} onChange={(e) => { setF((p) => ({ ...p, declaration: e.target.checked })); setErrors((p) => ({ ...p, declaration: undefined })); }} style={{ width: 18, height: 18, accentColor: "var(--green-600)" }} />
                  <span className="check__text">
                    <span className="check__title">Food-safety declaration <span className="req">*</span></span>
                    <span className="check__desc">
                      I confirm this food is safe for human consumption, has been stored as declared,
                      and has not been served to guests before. I understand this declaration is logged.
                    </span>
                  </span>
                </div>
                {errors.declaration && <div className="field__error"><Icon name="alertCircle" size={13} /> {errors.declaration}</div>}
              </div>
            )}

            {/* ---------- STEP 5 ---------- */}
            {step === 5 && (
              <div className="stack g5">
                <Field label="Pickup address" htmlFor="address" required error={errors.address}>
                  <Textarea id="address" value={f.address} onChange={set("address")} placeholder="Street, landmark, city, PIN" style={{ minHeight: 72 }} />
                </Field>
                <div className="grid grid--2">
                  <Field label="Area" htmlFor="area" required error={errors.area} hint="Used to match NGOs and volunteers nearby.">
                    <Select id="area" value={f.area} onChange={set("area")}
                      options={["Bani Park", "C-Scheme", "Civil Lines", "Malviya Nagar", "Vaishali Nagar", "Johari Bazaar", "MI Road"]} />
                  </Field>
                  <Field label="Landmark" htmlFor="landmark" optional>
                    <Input id="landmark" value={f.landmark} onChange={set("landmark")} placeholder="Near a well-known place" />
                  </Field>
                </div>

                <div className="grid grid--2">
                  <Field label="Pickup window opens" htmlFor="ws" required>
                    <Input id="ws" type="datetime-local" value={f.windowStart} onChange={set("windowStart")} />
                  </Field>
                  <Field label="Pickup window closes" htmlFor="we" required error={errors.windowEnd}>
                    <Input id="we" type="datetime-local" value={f.windowEnd} onChange={set("windowEnd")} />
                  </Field>
                </div>

                <div className="grid grid--2">
                  <Field label="Contact person at pickup" htmlFor="contact" required>
                    <Input id="contact" value={f.contact} onChange={set("contact")} />
                  </Field>
                  <Field label="Contact number" htmlFor="pphone" required error={errors.phone} hint="Shared only with the assigned volunteer.">
                    <Input id="pphone" value={f.phone} onChange={set("phone")} inputMode="tel" />
                  </Field>
                </div>

                <Field label="Access instructions" htmlFor="instructions" optional hint="Gate number, parking, whom to ask for, where the food is kept.">
                  <Textarea id="instructions" value={f.instructions} onChange={set("instructions")} style={{ minHeight: 72 }}
                    placeholder="e.g. Use the service lane entrance. Ask for the kitchen supervisor. Food is in the cold room on the left." />
                </Field>

                <div className="map-card" style={{ minHeight: 180 }} aria-label="Illustrative map of the pickup location">
                  <div className="map-card__road" style={{ left: 0, right: 0, top: "48%", height: 10 }} />
                  <div className="map-card__road" style={{ top: 0, bottom: 0, left: "38%", width: 8 }} />
                  <div className="map-card__pin" style={{ left: "38%", top: "48%" }}>
                    <span className="map-card__pin-bubble">Your kitchen</span>
                    <span className="map-card__pin-dot" />
                  </div>
                  <div className="map-card__pin map-card__pin--ngo" style={{ left: "72%", top: "30%" }}>
                    <span className="map-card__pin-bubble">Annapurna · 1.2 km</span>
                    <span className="map-card__pin-dot" />
                  </div>
                  <div className="map-card__badge"><Icon name="mapPin" size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> Illustrative map · Bani Park</div>
                </div>
              </div>
            )}

            {/* ---------- STEP 6 ---------- */}
            {step === 6 && (
              <div className="stack g5">
                <div className="alert alert--success">
                  <span className="alert__icon"><Icon name="checkCircle" size={16} /></span>
                  <div>
                    <div className="alert__title">Ready to publish</div>
                    Publishing makes this visible to verified NGOs within 6 km of {f.area || "your area"}.
                  </div>
                </div>

                <div className="review-grid">
                  <div className="review-block">
                    <div className="review-block__head">
                      <span className="review-block__title">Food</span>
                      <button className="text-sm green fw-semi" onClick={() => setStep(1)}>Edit</button>
                    </div>
                    <div className="text-base fw-semi ink">{f.title || "—"}</div>
                    <div className="text-md muted">{f.category || "—"} · {f.diet === "veg" ? "Vegetarian" : f.diet === "egg" ? "Contains egg" : "Non-vegetarian"}</div>
                  </div>

                  <div className="review-block">
                    <div className="review-block__head">
                      <span className="review-block__title">Quantity</span>
                      <button className="text-sm green fw-semi" onClick={() => setStep(2)}>Edit</button>
                    </div>
                    <div className="text-base fw-semi ink">{f.servings || 0} servings · {f.weight || 0} kg</div>
                    <div className="text-md muted">{f.containers || "—"} containers · {f.portion}</div>
                  </div>

                  <div className="review-block">
                    <div className="review-block__head">
                      <span className="review-block__title">Preparation</span>
                      <button className="text-sm green fw-semi" onClick={() => setStep(3)}>Edit</button>
                    </div>
                    <div className="text-base fw-semi ink">Prepared {f.preparedDate} · {f.preparedTime}</div>
                    <div className="text-md muted">Safe until {f.consumeBy.replace("T", " · ")}</div>
                  </div>

                  <div className="review-block">
                    <div className="review-block__head">
                      <span className="review-block__title">Safety</span>
                      <button className="text-sm green fw-semi" onClick={() => setStep(4)}>Edit</button>
                    </div>
                    <div className="text-base fw-semi ink">{f.storage || "—"}</div>
                    <div className="text-md muted">
                      {f.allergens.length ? `Allergens: ${f.allergens.join(", ")}` : "No allergens declared"} · {f.declaration ? "Declaration signed" : "Declaration missing"}
                    </div>
                  </div>

                  <div className="review-block" style={{ gridColumn: "1 / -1" }}>
                    <div className="review-block__head">
                      <span className="review-block__title">Pickup</span>
                      <button className="text-sm green fw-semi" onClick={() => setStep(5)}>Edit</button>
                    </div>
                    <div className="text-base fw-semi ink">{f.address || "—"}, {f.area}</div>
                    <div className="text-md muted">
                      Window {f.windowStart.replace("T", " · ")} → {f.windowEnd.slice(11)} · Contact {f.contact}, {f.phone}
                    </div>
                  </div>
                </div>

                <div className="alert alert--info">
                  <span className="alert__icon"><Icon name="info" size={16} /></span>
                  <div>
                    <div className="alert__title">Prototype note</div>
                    Publishing here adds a fictional record to this demo session only. Nothing is sent to real NGOs.
                  </div>
                </div>
              </div>
            )}

            {/* ---------- NAV ---------- */}
            <div className="row between g3 mt6" style={{ borderTop: "1px solid var(--line)", paddingTop: "var(--s-5)" }}>
              <Button variant="quiet" onClick={back} icon="arrowLeft" disabled={step === 1}>Back</Button>
              <div className="row g2">
                <Button variant="ghost" onClick={() => toast("Draft saved", "This prototype does not persist drafts across refreshes.", "success")}>Save draft</Button>
                {step < 6 ? (
                  <Button variant="primary" onClick={next} iconRight="arrowRight">Continue</Button>
                ) : (
                  <Button variant="primary" onClick={publish} loading={publishing} icon="checkCircle">Publish donation</Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* ---------- SIDE HELP ---------- */}
        <div className="stack g4">
          <Card>
            <CardBody>
              <div className="ds-label">Completion</div>
              <div className="row between mb2">
                <span className="text-md fw-semi ink">{completeness}% complete</span>
                <span className="text-xs muted">8 required fields</span>
              </div>
              <Progress value={completeness} />
              <div className="text-xs muted mt3">You can publish once all required fields are filled and the safety declaration is signed.</div>
            </CardBody>
          </Card>

          <Card style={{ borderColor: "var(--green-100)" }}>
            <CardBody>
              <div className="row g2 mb3">
                <span className="stat__icon" style={{ background: "var(--green-600)", color: "#fff" }}><Icon name="shield" size={16} /></span>
                <span className="text-base fw-semi ink">Food safety quick guide</span>
              </div>
              <div className="stack g3">
                {[
                  ["Keep hot food above 63°C", "or chilled below 4°C. Between those temperatures, bacteria multiply fastest."],
                  ["Two-hour rule", "Food left in the danger zone for over two hours should not be donated."],
                  ["Seal everything", "Open vessels spill and contaminate. Use lidded containers or sealed bags."],
                  ["Declare allergens", "Milk, gluten and nuts are the most common causes of reactions."],
                ].map(([t, d]) => (
                  <div key={t} className="row g2 items-start">
                    <Icon name="check" size={14} style={{ color: "var(--green-600)", flex: "none", marginTop: 3 }} />
                    <div>
                      <div className="text-md fw-semi ink">{t}</div>
                      <div className="text-xs muted" style={{ lineHeight: 1.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card style={{ background: "var(--canvas)" }}>
            <CardBody>
              <div className="ds-label">Who will see this</div>
              <div className="stack g3">
                <div className="row g3">
                  <span className="avatar avatar--sm">AS</span>
                  <div className="grow">
                    <div className="text-md fw-semi ink">4 verified NGOs</div>
                    <div className="text-xs muted">within 6 km of Bani Park</div>
                  </div>
                </div>
                <div className="row g3">
                  <span className="avatar avatar--sm avatar--neutral">12</span>
                  <div className="grow">
                    <div className="text-md fw-semi ink">12 volunteers on duty</div>
                    <div className="text-xs muted">matched after an NGO accepts</div>
                  </div>
                </div>
              </div>
              <div className="divider" style={{ margin: "14px 0" }} />
              <div className="text-xs muted">Your phone number is shared only with the assigned volunteer, never publicly.</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
