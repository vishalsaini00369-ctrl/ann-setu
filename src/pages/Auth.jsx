import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo, { LogoMark } from "../components/Logo.jsx";
import Icon from "../components/Icon.jsx";
import { Button, Field, Input, Select, Alert, Badge, CheckRow } from "../components/ui/index.jsx";
import { roles } from "../nav.js";
import { useApp, useDocumentTitle } from "../data/store.jsx";

/* ============================================================
   AUTH — sign in & registration for all five roles
   ============================================================ */

function AuthAside() {
  return (
    <aside className="auth__aside">
      <div className="row g3">
        <LogoMark size={38} tone="light" />
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.1 }}>ANN SETU</div>
          <div className="deva" style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>अन्न सेतु</div>
        </div>
      </div>
      <div>
        <h2 style={{ color: "#fff", fontSize: "var(--fs-30)", lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          Every meal you save is a meal someone eats.
        </h2>
        <p style={{ color: "rgba(255,255,255,.72)", marginTop: 16, maxWidth: "42ch", lineHeight: 1.6 }}>
          One account. One network of kitchens, NGOs and volunteers working to make sure no good
          food goes to waste.
        </p>
        <div className="stack g3" style={{ marginTop: 32 }}>
          {[
            ["2,40,180", "meals rescued"],
            ["148", "NGO partners"],
            ["11", "cities live"],
          ].map(([v, l]) => (
            <div className="row g4" key={l}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", minWidth: 110, fontVariantNumeric: "tabular-nums" }}>{v}</span>
              <span style={{ color: "rgba(255,255,255,.66)", fontSize: 13 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="row g2" style={{ color: "rgba(255,255,255,.55)", fontSize: 12 }}>
        <Icon name="shield" size={14} /> FSSAI-aligned food safety checks on every donation
      </div>
    </aside>
  );
}

export function Login() {
  const nav = useNavigate();
  const { setRole, toast } = useApp();
  useDocumentTitle("Sign in");

  const [role, setRoleLocal] = useState("donor");
  const [phone, setPhone] = useState("98290 11234");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const doSignIn = () => {
    if (!otpSent) {
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setOtpSent(true);
        toast("OTP sent", "Demo OTP is 123456 — no real SMS is sent.", "success");
      }, 700);
      return;
    }
    if (otp.replace(/\s/g, "") !== "123456") {
      setError("That code does not match. For this prototype use 123456.");
      return;
    }
    setError("");
    setBusy(true);
    setTimeout(() => {
      setRole(role);
      nav(`/${role}`);
    }, 500);
  };

  const entry = roles.find((r) => r.value === role);

  return (
    <div className="auth">
      <AuthAside />
      <div className="auth__main">
        <div className="auth__card">
          <Link to="/" className="row g2 text-md green fw-semi mb5" style={{ textDecoration: "none" }}>
            <Icon name="arrowLeft" size={15} /> Back to website
          </Link>
          <h1 style={{ fontSize: "var(--fs-30)", letterSpacing: "-0.03em" }}>Sign in to ANN SETU</h1>
          <p className="muted mt2 mb5 text-base">Choose how you use the platform. We'll take you to the right workspace.</p>

          <div className="field mb4">
            <span className="field__label">I am signing in as</span>
            <div className="auth__role-grid">
              {roles.map((r) => (
                <button
                  key={r.value}
                  className={`role-pick ${role === r.value ? "is-active" : ""}`}
                  onClick={() => setRoleLocal(r.value)}
                  aria-pressed={role === r.value}
                >
                  <span className="role-pick__title"><Icon name={r.icon} size={15} /> {r.label}</span>
                  <span className="role-pick__desc">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="stack g4">
            <Field label="Mobile number" htmlFor="phone" required hint="Registered mobile number of your organisation or personal account.">
              <div className="input-group">
                <span style={{ position: "absolute", left: 12, fontSize: 13, color: "var(--ink-500)", fontWeight: 600 }}>+91</span>
                <input
                  id="phone"
                  className="input"
                  style={{ paddingLeft: 46 }}
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </Field>

            {otpSent && (
              <Field label="One-time password" htmlFor="otp" required error={error} hint="Demo code: 123456">
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  placeholder="6-digit code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                />
              </Field>
            )}

            {!otpSent && (
              <CheckRow
                id="remember"
                checked
                onChange={() => {}}
                title="Keep me signed in on this device"
                desc="Not recommended on shared kitchen or office devices."
              />
            )}

            <Button variant="primary" block size="lg" onClick={doSignIn} loading={busy}>
              {otpSent ? `Sign in to ${entry.label} workspace` : "Send OTP"}
            </Button>

            <div className="demo-note">
              <Icon name="info" size={15} style={{ flex: "none", marginTop: 1 }} />
              <div>
                <strong>Prototype:</strong> any number works. Use OTP <span className="mono fw-semi">123456</span>.
                No messages are actually sent.
              </div>
            </div>

            <p className="text-md muted" style={{ textAlign: "center" }}>
              New to ANN SETU? <Link to="/register" className="fw-semi">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const nav = useNavigate();
  const { setRole, toast } = useApp();
  useDocumentTitle("Create an account");

  const [role, setRoleLocal] = useState("donor");
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ org: "", contact: "", phone: "", email: "", city: "Jaipur", area: "", fssai: "", capacity: "", vehicle: "", consent: false });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target?.target?.checked ?? e.target?.checked ?? e.target?.value ?? e }));

  const validate = () => {
    const err = {};
    if (role !== "volunteer" && !f.org.trim()) err.org = role === "ngo" ? "Enter your registered NGO name." : "Enter your restaurant or kitchen name.";
    if (!f.contact.trim()) err.contact = "Enter the name of the person we should contact.";
    if (!/^[0-9 ()+-]{10,}$/.test(f.phone)) err.phone = "Enter a valid 10-digit mobile number.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email address.";
    if (role === "donor" && !f.fssai.trim()) err.fssai = "FSSAI licence number is required for food donors.";
    if (role === "volunteer" && !f.vehicle) err.vehicle = "Select how you will carry food.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const finish = () => {
    if (!validate()) return;
    if (!f.consent) { setErrors({ consent: "Please accept the food-safety undertaking to continue." }); return; }
    setRole(role);
    toast("Account created", "Verification usually takes 1–2 working days. This is a prototype.", "success");
    nav(`/${role}`);
  };

  const docLabel = role === "ngo" ? "NGO name" : role === "volunteer" ? "Full name" : "Restaurant / kitchen name";

  return (
    <div className="auth">
      <AuthAside />
      <div className="auth__main">
        <div className="auth__card auth__card--wide">
          <Link to="/" className="row g2 text-md green fw-semi mb5" style={{ textDecoration: "none" }}>
            <Icon name="arrowLeft" size={15} /> Back to website
          </Link>
          <h1 style={{ fontSize: "var(--fs-30)", letterSpacing: "-0.03em" }}>Create your ANN SETU account</h1>
          <p className="muted mt2 text-base">Takes about 2 minutes. You can explore the full demo immediately.</p>

          <div className="steps mt5 mb5">
            {["Who you are", "Your details", "Verification"].map((label, i) => {
              const n = i + 1;
              return (
                <React.Fragment key={label}>
                  <div className={`steps__item ${step === n ? "is-active" : ""} ${step > n ? "is-done" : ""}`}>
                    <span className="steps__num">{step > n ? <Icon name="check" size={13} /> : n}</span>
                    <span className="steps__label">{label}</span>
                  </div>
                  {i < 2 && <span className="steps__bar" />}
                </React.Fragment>
              );
            })}
          </div>

          {step === 1 && (
            <div className="stack g4">
              <div className="field">
                <span className="field__label">I want to join as</span>
                <div className="auth__role-grid">
                  {roles.filter((r) => r.value !== "admin" && r.value !== "superadmin").map((r) => (
                    <button
                      key={r.value}
                      className={`role-pick ${role === r.value ? "is-active" : ""}`}
                      onClick={() => setRoleLocal(r.value)}
                      aria-pressed={role === r.value}
                    >
                      <span className="role-pick__title"><Icon name={r.icon} size={15} /> {r.label}</span>
                      <span className="role-pick__desc">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Alert tone="info" title="Administrator accounts">
                Admin and Super Admin accounts are provisioned by the platform team only — they cannot
                be self-registered. For the demo, you can still explore those workspaces from the sign-in page.
              </Alert>
              <Button variant="primary" block size="lg" onClick={() => setStep(2)} iconRight="arrowRight">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="stack g4">
              <Field label={docLabel} htmlFor="org" required error={errors.org}>
                <Input id="org" value={f.org} onChange={set("org")} placeholder={role === "ngo" ? "e.g. Annapurna Seva Sansthan" : role === "volunteer" ? "e.g. Kabir Sharma" : "e.g. Rawat Mishthan Bhandar"} />
              </Field>
              <div className="grid grid--2">
                <Field label="Contact person" htmlFor="contact" required error={errors.contact}>
                  <Input id="contact" value={f.contact} onChange={set("contact")} placeholder="Full name" />
                </Field>
                <Field label="Mobile number" htmlFor="rphone" required error={errors.phone}>
                  <Input id="rphone" value={f.phone} onChange={set("phone")} placeholder="98290 00000" inputMode="numeric" />
                </Field>
              </div>
              <div className="grid grid--2">
                <Field label="Email" htmlFor="email" optional error={errors.email} hint="Used for monthly impact reports.">
                  <Input id="email" type="email" value={f.email} onChange={set("email")} placeholder="name@example.com" />
                </Field>
                <Field label="City" htmlFor="city" required>
                  <Select id="city" value={f.city} onChange={set("city")} options={["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"]} />
                </Field>
              </div>
              {role === "donor" && (
                <Field label="FSSAI licence number" htmlFor="fssai" required error={errors.fssai} hint="14-digit licence printed on your registration certificate. Verified by our team before your first listing.">
                  <Input id="fssai" value={f.fssai} onChange={set("fssai")} placeholder="12719010000000" inputMode="numeric" />
                </Field>
              )}
              {role === "ngo" && (
                <Field label="Registration / Darpan ID" htmlFor="ngoreg" hint="Society registration number or NITI Darpan ID.">
                  <Input id="ngoreg" value={f.capacity} onChange={set("capacity")} placeholder="RJ/2021/0000000" />
                </Field>
              )}
              {role === "volunteer" && (
                <Field label="How will you carry food?" htmlFor="vehicle" required error={errors.vehicle}>
                  <Select id="vehicle" value={f.vehicle} onChange={set("vehicle")} placeholder="Select a mode"
                    options={["Two-wheeler", "Four-wheeler", "Cycling", "On foot / nearby only"]} />
                </Field>
              )}
              <div className="row g2">
                <Button variant="quiet" onClick={() => setStep(1)} icon="arrowLeft">Back</Button>
                <Button variant="primary" className="grow" onClick={() => { if (validate()) setStep(3); }} iconRight="arrowRight">Continue</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="stack g4">
              <h3 style={{ fontSize: "var(--fs-18)" }}>Verification & undertaking</h3>
              <p className="text-md muted">
                Before your account can publish or accept donations, our team verifies your documents.
                This usually takes 1–2 working days. You'll get a notification the moment you're approved.
              </p>
              <div className="stack g2">
                {(role === "donor"
                  ? ["FSSAI licence (image or PDF)", "Kitchen / premises photo", "Owner or manager ID"]
                  : role === "ngo"
                  ? ["Registration certificate", "80G / 12A certificate (if applicable)", "Authorised signatory ID"]
                  : ["Government photo ID", "Selfie for verification", "Driving licence (if using a vehicle)"]
                ).map((d, i) => (
                  <div key={d} className="check">
                    <span className="stat__icon" style={{ width: 30, height: 30 }}><Icon name="file" size={15} /></span>
                    <span className="check__text grow">
                      <span className="check__title">{d}</span>
                      <span className="check__desc">PDF, JPG or PNG · up to 5 MB</span>
                    </span>
                    <Badge tone={i === 0 ? "success" : "neutral"}>{i === 0 ? "Uploaded" : "Upload"}</Badge>
                  </div>
                ))}
              </div>
              <CheckRow
                id="consent"
                checked={f.consent}
                onChange={(v) => { setF((p) => ({ ...p, consent: v })); setErrors({}); }}
                title="I accept the food-safety undertaking"
                desc="I confirm that any food I donate, accept or transport will be safe for human consumption when it changes hands, and that I will follow the platform's safety checklist."
              />
              {errors.consent && <div className="field__error" role="alert"><Icon name="alertCircle" size={13} /> {errors.consent}</div>}
              <div className="row g2">
                <Button variant="quiet" onClick={() => setStep(2)} icon="arrowLeft">Back</Button>
                <Button variant="primary" className="grow" onClick={finish} icon="checkCircle">Create account</Button>
              </div>
            </div>
          )}

          <p className="text-md muted mt5" style={{ textAlign: "center" }}>
            Already registered? <Link to="/login" className="fw-semi">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
