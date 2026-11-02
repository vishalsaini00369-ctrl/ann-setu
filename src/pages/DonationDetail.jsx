import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Breadcrumbs, PageHead } from "../components/layout/AppShell.jsx";
import Icon from "../components/Icon.jsx";
import {
  Button, Card, CardHead, CardBody, Badge, StatusBadge, Timeline, KV, Modal,
  Alert, Avatar, Field, Select, Input, EmptyState, Progress,
} from "../components/ui/index.jsx";
import { useApp, useDocumentTitle, formatDateTime } from "../data/store.jsx";
import { require_status } from "../components/DonationCard.jsx";
import { volunteers as allVolunteers } from "../data/mockData.js";

/* ============================================================
   DONATION DETAIL — one screen, three role perspectives
   Donor  : see status, NGO acceptance, pickup, safety log
   NGO    : accept / decline, assign a volunteer
   Admin  : monitor, flag, intervene
   ============================================================ */

export default function DonationDetail() {
  const { id } = useParams();
  const location = useLocation();
  const urlRole = location.pathname.split("/")[1];
  const { role: sessionRole, donations, acceptDonation, rejectDonation, assignVolunteer, updateStatus, toast } = useApp();
  const nav = useNavigate();
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [chosenVol, setChosenVol] = useState("");

  const role = ["donor", "ngo", "volunteer", "admin", "superadmin"].includes(urlRole) ? urlRole : sessionRole;
  const d = donations.find((x) => x.id === id);
  useDocumentTitle(d ? d.title : "Donation");

  if (!d) {
    return (
      <Card>
        <EmptyState
          icon="search"
          title="Donation not found"
          desc="This record may have expired or the link is incorrect. Return to your dashboard to see live donations."
          action={<Button variant="primary" size="sm" as={Link} to={`/${role}`}>Back to dashboard</Button>}
        />
      </Card>
    );
  }

  const isNgo = role === "ngo";
  const isDonor = role === "donor";
  const canAccept = isNgo && d.status === "published";
  const canAssign = isNgo && d.status === "accepted" && !d.volunteer;

  const timeline = [
    { title: "Donation created", meta: `${formatDateTime(d.createdAt)} · ${d.donor}`, state: "done", icon: "check" },
    { title: "Published to nearby NGOs", meta: "Visible within 6 km radius", state: "done", icon: "inbox" },
    d.ngo
      ? { title: `Accepted by ${d.ngo}`, meta: "NGO confirmed it can collect and distribute", state: "done", icon: "check" }
      : { title: "Awaiting NGO acceptance", meta: "4 verified NGOs notified", state: "current", icon: "clock" },
    d.volunteer
      ? { title: `Volunteer assigned · ${d.volunteer}`, meta: "Pickup OTP shared with volunteer", state: "done", icon: "users" }
      : { title: "Volunteer assignment", meta: d.ngo ? "Waiting for NGO to assign" : "Happens after acceptance", state: "pending", icon: "users" },
    d.status === "picked_up" || d.status === "delivered" || d.status === "distributed"
      ? { title: "Picked up from donor", meta: "OTP verified at handover", state: "done", icon: "truck" }
      : { title: "Pickup", meta: `Window ${d.window.start.slice(11)}–${d.window.end.slice(11)}`, state: "pending", icon: "truck" },
    d.status === "distributed"
      ? { title: "Distributed to beneficiaries", meta: "Distribution record filed by NGO", state: "done", icon: "bowl" }
      : { title: "Delivery & distribution", meta: "Confirmed with OTP + photo", state: "pending", icon: "bowl" },
  ];

  const doAccept = () => {
    acceptDonation(d.id, "Annapurna Seva Sansthan", "ngo-11");
    setAcceptOpen(false);
    toast("Donation accepted", `${d.servings} servings reserved for Annapurna Seva Sansthan.`, "success");
  };

  const doAssign = () => {
    const v = allVolunteers.find((x) => x.id === chosenVol);
    if (!v) return;
    assignVolunteer(d.id, v.name, v.id);
    setAssignOpen(false);
    toast("Volunteer assigned", `${v.name} has been notified and can start the pickup.`, "success");
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isNgo ? "NGO" : isDonor ? "Donor" : "Admin", to: isNgo ? "/ngo" : isDonor ? "/donor" : "/admin" },
          { label: isNgo ? "Nearby donations" : "Donations", to: isNgo ? "/ngo/nearby" : isDonor ? "/donor/active" : "/admin/donations" },
          { label: d.id },
        ]}
      />
      <PageHead
        eyebrow={`${d.id} · ${d.category}`}
        title={d.title}
        badge={<StatusBadge status={require_status(d.status)} lg />}
        sub={`${d.servings} servings · ${d.quantity} · pickup in ${d.pickup.area}`}
        actions={
          isDonor ? (
            <>
              <Button variant="quiet" icon="message" onClick={() => toast("Message sent", "Prototype only.", "success")}>Message NGO</Button>
              <Button variant="quiet" icon="edit" onClick={() => toast("Editing", "Prototype: edit reopens the 6-step form.", "success")}>Edit</Button>
            </>
          ) : canAccept ? (
            <>
              <Button variant="danger-ghost" icon="x" onClick={() => { rejectDonation(d.id); toast("Donation declined", "The donor has been notified with your reason.", "success"); nav("/ngo/nearby"); }}>Decline</Button>
              <Button variant="primary" icon="checkCircle" onClick={() => setAcceptOpen(true)}>Accept donation</Button>
            </>
          ) : canAssign ? (
            <Button variant="primary" icon="users" onClick={() => setAssignOpen(true)}>Assign volunteer</Button>
          ) : (
            <Badge tone="neutral" lg>Monitoring</Badge>
          )
        }
      />

      {canAccept && (
        <Alert tone="warning" title="Accept only what you can distribute today">
          Food must be collected within the pickup window and consumed before {formatDateTime(d.expires)}.
          Accepting without a volunteer available risks the food expiring in your custody.
        </Alert>
      )}

      <div className="grid grid--sidebar mt5">
        <div className="stack g5">
          {/* Summary */}
          <Card>
            <CardHead title="Donation summary" desc="What was declared by the donor" />
            <CardBody>
              <div className="grid grid--3 mb5">
                <div>
                  <div className="fact__k">Servings</div>
                  <div style={{ fontSize: "var(--fs-24)", fontWeight: 600, color: "var(--ink-900)" }}>{d.servings}</div>
                </div>
                <div>
                  <div className="fact__k">Weight</div>
                  <div style={{ fontSize: "var(--fs-24)", fontWeight: 600, color: "var(--ink-900)" }}>{d.quantity}</div>
                </div>
                <div>
                  <div className="fact__k">Food type</div>
                  <div className="text-lg fw-semi ink">{d.veg ? "Vegetarian" : "Non-vegetarian"}</div>
                </div>
              </div>
              <KV
                rows={[
                  ["Category", d.category],
                  ["Donor", `${d.donor} · ${d.donorType}`],
                  ["Prepared", formatDateTime(d.prepared)],
                  ["Safe to consume until", formatDateTime(d.expires)],
                  ["Pickup window", `${formatDateTime(d.window.start)} → ${d.window.end.slice(11)}`],
                  ["Allergens", d.allergens.length ? d.allergens.join(", ") : "None declared"],
                  ["Donor notes", d.notes],
                ]}
              />
            </CardBody>
          </Card>

          {/* Safety */}
          <Card style={{ borderColor: "var(--success-line)" }}>
            <CardHead
              title="Food safety declaration"
              desc="Logged by the donor at the time of listing — immutable"
              action={<Badge tone="success" dot>Complete</Badge>}
            />
            <CardBody>
              <div className="grid grid--2">
                <KV rows={[["Storage", d.storage], ["Handler certified", "Yes"], ["Temperature checked", "Yes · 65°C"]]} />
                <KV rows={[["Packaging", "Sealed containers"], ["Reheated", "No — cooked once"], ["Declaration", "Signed · 09:52"]]} />
              </div>
              <div className="alert alert--info mt4">
                <span className="alert__icon"><Icon name="shield" size={16} /></span>
                <div>
                  <div className="alert__title">Safety declaration is tamper-evident</div>
                  Any change to these fields by the donor creates a new audit entry and re-triggers verification.
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Location */}
          <Card>
            <CardHead title="Pickup location" desc={d.pickup.area} />
            <CardBody>
              <div className="map-card mb4" style={{ minHeight: 200 }} aria-label="Illustrative map">
                <div className="map-card__road" style={{ left: 0, right: 0, top: "54%", height: 10 }} />
                <div className="map-card__road" style={{ top: 0, bottom: 0, left: "46%", width: 8 }} />
                <div className="map-card__pin" style={{ left: "46%", top: "54%" }}>
                  <span className="map-card__pin-bubble">{d.donor.split(" ")[0]}</span>
                  <span className="map-card__pin-dot" />
                </div>
                <div className="map-card__pin map-card__pin--ngo" style={{ left: "76%", top: "32%" }}>
                  <span className="map-card__pin-bubble">Recipient NGO</span>
                  <span className="map-card__pin-dot" />
                </div>
                <div className="map-card__badge">Illustrative map · not live navigation</div>
              </div>
              <KV
                rows={[
                  ["Address", d.pickup.address],
                  ["Contact at pickup", `${d.pickup.contact} · ${d.pickup.phone}`],
                  ["Access notes", d.notes],
                ]}
              />
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="stack g5">
          <Card>
            <CardHead title="Progress" desc="Live status trail" />
            <CardBody>
              <Timeline items={timeline} />
            </CardBody>
          </Card>

          <Card>
            <CardHead title="People" />
            <CardBody>
              <div className="stack g4">
                <div className="row g3">
                  <Avatar initials={d.donor.split(" ").map((w) => w[0]).slice(0, 2).join("")} />
                  <div className="grow">
                    <div className="text-md fw-semi ink">{d.donor}</div>
                    <div className="text-xs muted">Donor · verified</div>
                  </div>
                  <Icon name="checkCircle" size={15} style={{ color: "var(--green-600)" }} />
                </div>
                <div className="row g3">
                  <Avatar initials={d.ngo ? d.ngo.split(" ").map((w) => w[0]).slice(0, 2).join("") : "?"} neutral={!d.ngo} />
                  <div className="grow">
                    <div className="text-md fw-semi ink">{d.ngo || "Awaiting acceptance"}</div>
                    <div className="text-xs muted">{d.ngo ? "NGO · verified" : "4 NGOs notified"}</div>
                  </div>
                  {d.ngo && <Icon name="checkCircle" size={15} style={{ color: "var(--green-600)" }} />}
                </div>
                <div className="row g3">
                  <Avatar initials={d.volunteer ? d.volunteer.split(" ").map((w) => w[0]).join("") : "?"} neutral={!d.volunteer} />
                  <div className="grow">
                    <div className="text-md fw-semi ink">{d.volunteer || "No volunteer yet"}</div>
                    <div className="text-xs muted">{d.volunteer ? "Volunteer · 4.9 rating" : "Assigned after acceptance"}</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {isDonor && (
            <Card style={{ background: "var(--canvas)" }}>
              <CardBody>
                <div className="ds-label">Pickup verification</div>
                <div className="row between mb3">
                  <span className="text-md ink fw-med">Handover OTP</span>
                  <span className="mono fw-semi ink" style={{ fontSize: 18, letterSpacing: 3 }}>— — — —</span>
                </div>
                <p className="text-xs muted" style={{ lineHeight: 1.5 }}>
                  The OTP appears here once a volunteer is assigned. Never share the code before you
                  have physically handed over the food.
                </p>
              </CardBody>
            </Card>
          )}

          {isNgo && d.status !== "published" && (
            <Card>
              <CardBody>
                <div className="ds-label">Distribution record</div>
                <p className="text-md muted mb3">Log how many servings were served and where, after delivery.</p>
                <Button variant="secondary" block size="sm" icon="clip" as={Link} to="/ngo/distributions">Open distribution records</Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* ---------- Accept modal ---------- */}
      <Modal
        open={acceptOpen}
        onClose={() => setAcceptOpen(false)}
        title="Accept this donation?"
        desc={`${d.id} · ${d.servings} servings · ${d.quantity}`}
        footer={
          <>
            <Button variant="quiet" onClick={() => setAcceptOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={doAccept} icon="checkCircle">Confirm acceptance</Button>
          </>
        }
      >
        <div className="stack g4">
          <Alert tone="warning" title="You are committing to collect and distribute">
            Acceptance is a commitment. Repeated non-collection affects your reliability score and may
            pause your account.
          </Alert>
          <div className="check is-checked">
            <span className="stat__icon" style={{ width: 32, height: 32 }}><Icon name="truck" size={16} /></span>
            <span className="check__text">
              <span className="check__title">Transport arranged</span>
              <span className="check__desc">Annapurna van #2 · available from 13:00</span>
            </span>
          </div>
          <Field label="Distribution point" htmlFor="dp" hint="Where will these meals be served?">
            <Select id="dp" options={["Bani Park community kitchen", "Civil Lines night shelter", "Onward to partner shelter"]} />
          </Field>
          <Field label="Expected beneficiaries" htmlFor="ben" optional>
            <Input id="ben" placeholder="e.g. 120 daily-wage workers" />
          </Field>
        </div>
      </Modal>

      {/* ---------- Assign modal ---------- */}
      <Modal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        title="Assign a volunteer"
        desc="Suggested by proximity, availability and vehicle capacity."
        footer={
          <>
            <Button variant="quiet" onClick={() => setAssignOpen(false)}>Cancel</Button>
            <Button variant="primary" disabled={!chosenVol} onClick={doAssign} icon="users">Assign & notify</Button>
          </>
        }
      >
        <div className="stack g2">
          {allVolunteers.filter((v) => v.verified === "verified").map((v) => (
            <label key={v.id} className={`check ${chosenVol === v.id ? "is-checked" : ""}`} style={{ alignItems: "center" }}>
              <input type="radio" name="vol" checked={chosenVol === v.id} onChange={() => setChosenVol(v.id)} style={{ width: 17, height: 17, accentColor: "var(--green-600)" }} />
              <Avatar initials={v.initials} size="sm" />
              <span className="check__text grow">
                <span className="check__title">{v.name} · {v.vehicle}</span>
                <span className="check__desc">{v.area} · {v.runs} runs · ★ {v.rating} · {v.available ? "Available now" : "On another run"}</span>
              </span>
              {v.available ? <Badge tone="success">Free</Badge> : <Badge tone="neutral">Busy</Badge>}
            </label>
          ))}
        </div>
      </Modal>
    </>
  );
}
