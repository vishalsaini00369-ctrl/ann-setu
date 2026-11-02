import React from "react";
import { Link } from "react-router-dom";
import Logo, { LogoMark } from "../components/Logo.jsx";
import Icon from "../components/Icon.jsx";
import { Button, Badge, Card } from "../components/ui/index.jsx";
import { useDocumentTitle } from "../data/store.jsx";

/* ============================================================
   ANN SETU — PUBLIC LANDING PAGE
   Plain-language explanation of the product for ordinary users:
   what it does, why food waste matters, how to join.
   ============================================================ */

const facts = [
  { value: "1.05 lakh", unit: "tonnes", label: "food wasted in India every day", sub: "≈ 68 million tonnes a year" },
  { value: "19 crore", unit: "people", label: "go to bed hungry", sub: "despite enough food being produced" },
  { value: "8–10%", unit: "", label: "of global emissions come from wasted food", sub: "more than all of aviation" },
  { value: "3 hours", unit: "", label: "is all it takes to match surplus to need", sub: "median match time on ANN SETU" },
];

const steps = [
  { t: "A kitchen lists surplus", d: "A restaurant, hotel or caterer adds food that is safe but unsold — with quantity, prep time and a pickup window." },
  { t: "A nearby NGO accepts", d: "Verified NGOs see live donations within their radius and accept the ones that match what their kitchen can serve." },
  { t: "A volunteer carries it", d: "A nearby volunteer is assigned. Both pickup and delivery are confirmed with an OTP so nothing goes missing." },
  { t: "A meal reaches a plate", d: "The NGO records how many people were served. Donors see the impact, with photos and numbers." },
];

const audiences = [
  {
    icon: "store",
    title: "Restaurants, hotels & kitchens",
    deva: "दाता",
    points: ["List surplus in under 2 minutes", "Automatic food-safety checklist", "Tax-ready donation records", "Pickup handled for you"],
    cta: "Register as a donor",
    to: "/register",
  },
  {
    icon: "handHeart",
    title: "NGOs & community kitchens",
    deva: "संस्था",
    points: ["See verified surplus nearby", "Accept or decline without calls", "Post what you actually need", "Coordinate volunteers in one place"],
    cta: "Join as an NGO",
    to: "/register",
  },
  {
    icon: "truck",
    title: "Volunteers",
    deva: "स्वयंसेवक",
    points: ["Pick up on your route and time", "Turn-by-turn to both stops", "OTP-verified handover", "Track your own impact"],
    cta: "Volunteer with us",
    to: "/register",
  },
];

const safety = [
  { icon: "shield", t: "FSSAI check at onboarding", d: "Donors verify their licence before any listing goes live." },
  { icon: "thermometer", t: "Holding-time limits built in", d: "Listings auto-expire after the safe window. No exceptions, no overrides." },
  { icon: "clip", t: "Mandatory safety checklist", d: "Temperature, packaging and handling must be declared on every donation." },
  { icon: "qr", t: "Two-point OTP handover", d: "Pickup and delivery are each confirmed by code — never by assumption." },
];

export default function Landing() {
  useDocumentTitle("Connecting surplus food to those who need it");
  return (
    <div className="lp">
      <a className="skip-link" href="#lp-main">Skip to main content</a>

      {/* ---------- NAV ---------- */}
      <header className="lp__nav">
        <div className="lp__nav-inner">
          <Link to="/" aria-label="ANN SETU home"><Logo size={38} /></Link>
          <nav className="lp__links" aria-label="Sections">
            <a className="lp__link" href="#how">How it works</a>
            <a className="lp__link" href="#who">Who it's for</a>
            <a className="lp__link" href="#safety">Food safety</a>
            <a className="lp__link" href="#impact">Impact</a>
          </nav>
          <div className="lp__nav-actions">
            <Link to="/login" className="btn btn--ghost btn--sm">Sign in</Link>
            <Link to="/register" className="btn btn--primary btn--sm">Get started</Link>
          </div>
        </div>
      </header>

      <main id="lp-main">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="hero__inner">
            <div>
              <span className="lp__eyebrow">
                <Icon name="leaf" size={14} /> Food rescue · Jaipur & 11 cities
              </span>
              <h1 className="hero__title">
                Good food should reach a plate, <em>never a bin.</em>
              </h1>
              <p className="hero__sub">
                ANN SETU connects restaurants, hotels and kitchens that have safe surplus food
                with verified NGOs and volunteers who can get it to people who need it — usually
                within three hours.
              </p>
              <div className="hero__actions">
                <Link to="/register" className="btn btn--primary btn--lg">
                  <Icon name="store" size={17} /> Donate surplus food
                </Link>
                <Link to="/register" className="btn btn--quiet btn--lg" style={{ background: "var(--white)" }}>
                  <Icon name="handHeart" size={17} /> Join as an NGO
                </Link>
              </div>
              <div className="hero__trust">
                <div className="hero__trust-item">
                  <span className="hero__trust-num">2.4 lakh</span>
                  <span className="hero__trust-label">meals rescued</span>
                </div>
                <div className="hero__trust-item">
                  <span className="hero__trust-num">612</span>
                  <span className="hero__trust-label">verified donors</span>
                </div>
                <div className="hero__trust-item">
                  <span className="hero__trust-num">148</span>
                  <span className="hero__trust-label">NGO partners</span>
                </div>
                <div className="hero__trust-item">
                  <span className="hero__trust-num">1,930</span>
                  <span className="hero__trust-label">volunteers</span>
                </div>
              </div>
            </div>

            {/* product preview */}
            <div className="hero__art" aria-hidden="true">
              <div className="hero__panel">
                <div className="hero__panel-head">
                  <LogoMark size={22} />
                  <span className="text-md fw-semi ink">Today · Bani Park</span>
                  <Badge tone="success" dot style={{ marginLeft: "auto" }}>7 live</Badge>
                </div>
                <div className="hero__panel-body">
                  {[
                    { t: "Veg thali — dal, sabzi, rice", n: "Rawat Mishthan Bhandar", s: 120, u: "critical", time: "Pickup by 15:30" },
                    { t: "Assorted bakery & buns", n: "Tapri Central", s: 60, u: "soon", time: "Pickup by 18:00" },
                    { t: "Mithai boxes — surplus", n: "Laxmi Mishthan Bhandar", s: 150, u: "ok", time: "Pickup by 20:00" },
                  ].map((d) => (
                    <div key={d.t} className="row g3" style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 10, background: "var(--white)" }}>
                      <span className="stat__icon" style={{ width: 34, height: 34 }}><Icon name="bowl" size={17} /></span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="text-md fw-semi ink truncate">{d.t}</div>
                        <div className="text-xs muted truncate">{d.n} · {d.time}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="text-md fw-semi ink tabular">{d.s}</div>
                        <div className="text-xs muted">servings</div>
                      </div>
                    </div>
                  ))}
                  <div className="row between" style={{ marginTop: 2 }}>
                    <span className="text-xs muted">Verified NGOs see this in real time</span>
                    <span className="row g1 text-xs green fw-semi">Open <Icon name="arrowRight" size={12} /></span>
                  </div>
                </div>
              </div>
              <div className="hero__float">
                <span className="stat__icon" style={{ background: "var(--green-600)", color: "#fff" }}>
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <div className="text-md fw-semi ink">120 meals delivered</div>
                  <div className="text-xs muted">Annapurna kitchen · 18 min</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- THE PROBLEM ---------- */}
        <section className="lp__section lp__section--tint" id="impact">
          <div className="lp__wrap">
            <div className="lp__section-head">
              <span className="lp__eyebrow"><Icon name="alert" size={14} /> Why this matters</span>
              <h2 className="lp__h2">India wastes enough food to feed a country — while millions go hungry.</h2>
              <p className="lp__lead">
                Most surplus food that is thrown away is perfectly safe to eat. It is wasted because
                nobody knew it was available, or because no one could arrange a pickup in time.
                ANN SETU exists to remove exactly those two problems.
              </p>
            </div>
            <div className="fact-strip">
              {facts.map((f) => (
                <div className="fact-strip__cell" key={f.label}>
                  <div style={{ fontSize: "var(--fs-30)", fontWeight: 600, color: "var(--ink-900)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    {f.value} {f.unit && <span style={{ fontSize: "var(--fs-16)", color: "var(--ink-500)", fontWeight: 500 }}>{f.unit}</span>}
                  </div>
                  <div className="text-md ink mt2" style={{ fontWeight: 500 }}>{f.label}</div>
                  <div className="text-xs muted mt1">{f.sub}</div>
                </div>
              ))}
            </div>
            <p className="text-xs muted mt4">
              Figures are indicative industry estimates used for demonstration content. Prototype data.
            </p>
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="lp__section" id="how">
          <div className="lp__wrap">
            <div className="lp__section-head">
              <span className="lp__eyebrow"><Icon name="activity" size={14} /> How it works</span>
              <h2 className="lp__h2">Four steps. No phone calls, no paperwork, no guesswork.</h2>
            </div>
            <div className="grid grid--4">
              {steps.map((s, i) => (
                <div className="step-card" key={s.t}>
                  <span className="step-card__num">{i + 1}</span>
                  <div className="step-card__title">{s.t}</div>
                  <p className="step-card__desc">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- AUDIENCES ---------- */}
        <section className="lp__section lp__section--tint" id="who">
          <div className="lp__wrap">
            <div className="lp__section-head">
              <span className="lp__eyebrow"><Icon name="users" size={14} /> Who it's for</span>
              <h2 className="lp__h2">One platform, a purpose-built workspace for each side.</h2>
              <p className="lp__lead">
                Donors get a simple listing flow. NGOs get a live supply board. Volunteers get
                clear route-by-route instructions. Administrators get the tools to keep it safe.
              </p>
            </div>
            <div className="grid grid--3">
              {audiences.map((a) => (
                <Card key={a.title} className="feature">
                  <div className="row between">
                    <span className="feature__icon"><Icon name={a.icon} size={20} /></span>
                    <span className="deva text-sm green fw-semi">{a.deva}</span>
                  </div>
                  <div>
                    <div className="feature__title">{a.title}</div>
                    <ul className="stack g2 mt3">
                      {a.points.map((p) => (
                        <li key={p} className="row g2 text-md muted">
                          <Icon name="check" size={14} style={{ color: "var(--green-600)", flex: "none" }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={a.to} className="btn btn--secondary btn--sm" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                    {a.cta} <Icon name="arrowRight" size={14} />
                  </Link>
                </Card>
              ))}
            </div>
            <div className="grid grid--2 mt6">
              <Card className="feature">
                <div className="row between">
                  <span className="feature__icon"><Icon name="shield" size={20} /></span>
                  <span className="deva text-sm green fw-semi">प्रशासक</span>
                </div>
                <div>
                  <div className="feature__title">Administrators & institutions</div>
                  <p className="feature__desc">
                    District food-safety officers, CSR teams and municipal bodies get a verification
                    queue, incident register and exportable impact reports — so the programme can be
                    audited, funded and scaled.
                  </p>
                </div>
                <Link to="/login" className="btn btn--secondary btn--sm" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                  View admin console <Icon name="arrowRight" size={14} />
                </Link>
              </Card>
              <div className="quote">
                <Icon name="message" size={20} style={{ color: "var(--green-600)" }} />
                <p className="mt3" style={{ fontSize: "var(--fs-16)" }}>
                  “We used to throw away almost 20 kg of cooked food every evening. Now a volunteer
                  collects it at 9 pm and by 10 pm it is at the shelter. The app takes me less time
                  than the waste bin did.”
                </p>
                <div className="quote__by">
                  <span className="avatar">RM</span>
                  <div>
                    <div className="text-md fw-semi ink">Kitchen manager, Rawat Mishthan Bhandar</div>
                    <div className="text-xs muted">Donor since February 2025 · fictional testimonial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FOOD SAFETY ---------- */}
        <section className="lp__section" id="safety">
          <div className="lp__wrap">
            <div className="grid grid--2" style={{ alignItems: "center", gap: "var(--s-8)" }}>
              <div>
                <span className="lp__eyebrow"><Icon name="shield" size={14} /> Food safety first</span>
                <h2 className="lp__h2">We would rather waste food than risk a single illness.</h2>
                <p className="lp__lead">
                  Every listing carries a safety declaration. Every handover is verified twice.
                  When the safe window closes, the listing expires on its own — the platform will
                  not let goodwill become a health risk.
                </p>
                <div className="stack g3 mt6">
                  {safety.map((s) => (
                    <div className="row g3 items-start" key={s.t}>
                      <span className="stat__icon" style={{ width: 34, height: 34, background: "var(--green-50)" }}>
                        <Icon name={s.icon} size={16} />
                      </span>
                      <div>
                        <div className="text-base fw-semi ink">{s.t}</div>
                        <div className="text-md muted">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="card--raised" style={{ padding: "var(--s-5)" }}>
                <div className="row between mb4">
                  <span className="row g2 text-base fw-semi ink"><Icon name="clip" size={17} /> Safety checklist</span>
                  <Badge tone="success" dot>Declared</Badge>
                </div>
                <div className="stack g2">
                  {[
                    ["Held above 63°C or below 4°C", "Yes — hot holding"],
                    ["Prepared", "Today, 10:30"],
                    ["Safe to consume until", "Today, 18:00"],
                    ["Handler trained & certified", "Yes"],
                    ["Allergens declared", "Milk"],
                    ["Packaging", "Sealed insulated carriers"],
                  ].map(([k, v]) => (
                    <div className="kv__row" key={k} style={{ padding: "8px 0" }}>
                      <span className="kv__k">{k}</span>
                      <span className="kv__v">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="alert alert--warning mt4">
                  <span className="alert__icon"><Icon name="clock" size={16} /></span>
                  <div>
                    <div className="alert__title">Listing expires automatically</div>
                    If no NGO accepts by 18:00, the donation closes itself.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ---------- IMPACT / CTA ---------- */}
        <section className="lp__section lp__section--tint">
          <div className="lp__wrap">
            <div className="grid grid--3 mb6">
              {[
                { v: "2,40,180", l: "meals rescued", s: "since launch", i: "bowl" },
                { v: "348 tonnes", l: "CO₂e avoided", s: "≈ 14,000 trees for a year", i: "leaf" },
                { v: "14,620", l: "people reached", s: "across 11 cities", i: "users" },
              ].map((s) => (
                <Card key={s.l} className="card--flat" style={{ padding: "var(--s-5)" }}>
                  <span className="stat__icon"><Icon name={s.i} size={16} /></span>
                  <div style={{ fontSize: "var(--fs-30)", fontWeight: 600, letterSpacing: "-0.03em", marginTop: 10, color: "var(--ink-900)" }}>{s.v}</div>
                  <div className="text-base ink fw-med">{s.l}</div>
                  <div className="text-sm muted mt1">{s.s}</div>
                </Card>
              ))}
            </div>
            <div className="cta-band">
              <h2 className="cta-band__title">Your surplus is someone's dinner tonight.</h2>
              <p className="cta-band__sub">Join 612 kitchens, 148 NGOs and 1,930 volunteers already on ANN SETU.</p>
              <div className="row center g3 mt6 wrap">
                <Link to="/register" className="btn btn--lg" style={{ background: "#fff", color: "var(--green-800)", borderColor: "#fff" }}>
                  Create an account <Icon name="arrowRight" size={16} />
                </Link>
                <Link to="/login" className="btn btn--inverse btn--lg">Explore the demo</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="lp__footer">
        <div className="lp__footer-grid">
          <div>
            <Logo tone="inverse" size={36} />
            <p className="text-md mt3" style={{ maxWidth: "34ch", lineHeight: 1.6 }}>
              A food-rescue and distribution network built for India — connecting surplus food to
              the people who need it, safely and transparently.
            </p>
          </div>
          <div>
            <div className="lp__footer-title">Platform</div>
            <ul className="stack g2">
              <li><Link to="/login">Donor console</Link></li>
              <li><Link to="/login">NGO console</Link></li>
              <li><Link to="/login">Volunteer app</Link></li>
              <li><Link to="/login">Admin console</Link></li>
            </ul>
          </div>
          <div>
            <div className="lp__footer-title">Resources</div>
            <ul className="stack g2">
              <li><a href="#safety">Food safety policy</a></li>
              <li><a href="#how">How it works</a></li>
              <li><Link to="/design-system">Design system</Link></li>
              <li><Link to="/handoff">Developer handoff</Link></li>
            </ul>
          </div>
          <div>
            <div className="lp__footer-title">Contact</div>
            <ul className="stack g2">
              <li className="row g2"><Icon name="mail" size={14} /> hello@annsetu.example</li>
              <li className="row g2"><Icon name="phone" size={14} /> 1800 000 000 (toll free)</li>
              <li className="row g2"><Icon name="mapPin" size={14} /> Jaipur, Rajasthan</li>
            </ul>
          </div>
        </div>
        <div className="lp__footer-legal">
          <span>© 2026 ANN SETU · अन्न सेतु. Prototype for demonstration — not a live service.</span>
          <span className="row g4">
            <a href="#lp-main">Privacy</a>
            <a href="#lp-main">Terms</a>
            <a href="#safety">Safety</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
