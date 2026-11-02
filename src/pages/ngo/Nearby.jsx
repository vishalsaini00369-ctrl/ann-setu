import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, SearchInput, Chips, SegmentedControl,
  EmptyState, Alert, Modal, Field, Select, Avatar, KV,
} from "../../components/ui/index.jsx";
import DonationCard from "../../components/DonationCard.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";

/* ============================================================
   NEARBY DONATIONS — the NGO's live supply board
   Map + list, filters, view toggle, accept flow
   ============================================================ */
export default function NgoNearby() {
  useDocumentTitle("Nearby donations");
  const { donations, acceptDonation, rejectDonation, toast } = useApp();
  const nav = useNavigate();

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [view, setView] = useState("list");
  const [radius, setRadius] = useState("6");
  const [target, setTarget] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [reason, setReason] = useState("");

  const live = donations.filter((d) => d.status === "published");
  const rows = useMemo(
    () =>
      live
        .filter((d) => (cat === "all" ? true : d.category === cat))
        .filter((d) => d.distance <= Number(radius))
        .filter((d) => `${d.title} ${d.donor} ${d.pickup.area}`.toLowerCase().includes(q.toLowerCase())),
    [live, cat, q, radius]
  );

  const doAccept = () => {
    acceptDonation(target.id, "Annapurna Seva Sansthan", "ngo-11");
    toast("Donation accepted", `${target.servings} servings reserved. Assign a volunteer to start the pickup.`, "success");
    setTarget(null);
    nav("/ngo/accepted");
  };

  const doDecline = () => {
    rejectDonation(declineTarget.id);
    toast("Donation declined", "The donor has been told. Declining does not affect your score.", "success");
    setDeclineTarget(null);
    setReason("");
  };

  return (
    <>
      <PageHead
        eyebrow="NGO workspace"
        title="Nearby donations"
        sub="Live surplus food from verified donors, inside your collection radius. First to accept gets it."
        actions={<Button variant="quiet" icon="refresh" onClick={() => toast("Refreshed", "Showing the latest live donations.", "success")}>Refresh</Button>}
      />

      <Card className="mb4">
        <CardBody tight>
          <div className="row g3 wrap">
            <div className="grow" style={{ minWidth: 220 }}>
              <SearchInput value={q} onChange={setQ} placeholder="Search food, donor or area…" />
            </div>
            <div className="row g2">
              <Select value={radius} onChange={(e) => setRadius(e.target.value)} aria-label="Radius"
                options={[{ value: "2", label: "Within 2 km" }, { value: "6", label: "Within 6 km" }, { value: "12", label: "Within 12 km" }, { value: "50", label: "All areas" }]} />
              <SegmentedControl ariaLabel="View" value={view} onChange={setView}
                options={[{ value: "list", label: "List" }, { value: "grid", label: "Cards" }, { value: "map", label: "Map" }]} />
            </div>
          </div>
          <div className="row g2 wrap mt3">
            <Chips value={cat} onChange={setCat} items={[
              { value: "all", label: "All categories", count: live.length },
              { value: "Cooked meal", label: "Cooked meals" },
              { value: "Bakery", label: "Bakery" },
              { value: "Sweets", label: "Sweets" },
              { value: "Packaged", label: "Packaged" },
            ]} />
          </div>
        </CardBody>
      </Card>

      <div className={`split ${view === "map" ? "" : "split--rail"}`}>
        <div>
          {view === "map" && (
            <Card className="mb4">
              <CardBody tight>
                <div className="map-card" style={{ minHeight: 340 }} aria-label="Illustrative map of nearby donations">
                  <div className="map-card__road" style={{ left: 0, right: 0, top: "44%", height: 12 }} />
                  <div className="map-card__road" style={{ left: 0, right: 0, top: "72%", height: 8 }} />
                  <div className="map-card__road" style={{ top: 0, bottom: 0, left: "30%", width: 9 }} />
                  <div className="map-card__road" style={{ top: 0, bottom: 0, left: "68%", width: 9 }} />
                  <div className="map-card__pin map-card__pin--ngo" style={{ left: "30%", top: "44%" }}>
                    <span className="map-card__pin-bubble">Your kitchen</span>
                    <span className="map-card__pin-dot" />
                  </div>
                  {rows.slice(0, 4).map((d, i) => (
                    <div className="map-card__pin" key={d.id} style={{ left: `${52 + i * 11}%`, top: `${28 + (i % 2) * 34}%` }}>
                      <span className="map-card__pin-bubble">{d.servings} · {d.distance} km</span>
                      <span className="map-card__pin-dot" />
                    </div>
                  ))}
                  <div className="map-card__badge">Illustrative map · {rows.length} donations in radius</div>
                </div>
              </CardBody>
            </Card>
          )}

          {rows.length ? (
            view === "grid" ? (
              <div className="grid grid--2">
                {rows.map((d) => (
                  <DonationCard key={d.id} d={d} ngoView to={`/ngo/donations/${d.id}`}
                    action={<Button variant="primary" size="sm" block icon="checkCircle" onClick={() => setTarget(d)}>Accept donation</Button>} />
                ))}
              </div>
            ) : (
              <div className="stack g3">
                {rows.map((d) => (
                  <Card key={d.id} interactive>
                    <CardBody>
                      <div className="row g4 items-start wrap">
                        <div className="donation-card__media" style={{ width: 64, height: 64, borderRadius: 12, flex: "none" }}>
                          <Icon name="bowl" size={24} strokeWidth={1.5} />
                        </div>
                        <div className="grow" style={{ minWidth: 200 }}>
                          <div className="row g2 wrap mb1">
                            <Link to={`/ngo/donations/${d.id}`} className="text-base fw-semi ink" style={{ textDecoration: "none" }}>{d.title}</Link>
                            {d.urgency === "critical" && <Badge tone="danger" dot>Expiring</Badge>}
                            {d.allergens.length > 0 && <Badge tone="warning">{d.allergens.join(", ")}</Badge>}
                          </div>
                          <div className="text-md muted">{d.donor} · {d.pickup.area} · {d.distance} km · prepared {d.prepared.slice(11)} today</div>
                          <div className="row g4 mt3 wrap text-sm muted">
                            <span className="row g1"><Icon name="bowl" size={13} /> <b className="ink">{d.servings}</b> servings</span>
                            <span className="row g1"><Icon name="package" size={13} /> {d.quantity}</span>
                            <span className="row g1"><Icon name="clock" size={13} /> Pickup by {d.window.end.slice(11)}</span>
                            <span className="row g1"><Icon name="shield" size={13} /> {d.storage}</span>
                          </div>
                        </div>
                        <div className="stack g2" style={{ minWidth: 132 }}>
                          <Button variant="primary" size="sm" icon="checkCircle" onClick={() => setTarget(d)}>Accept</Button>
                          <Button variant="quiet" size="sm" onClick={() => { setDeclineTarget(d); setReason(""); }}>Decline</Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <Card>
              <EmptyState icon="mapPin" title="No live donations in this radius"
                desc="Try widening the radius or clearing the category filter. New donations are published throughout the day."
                action={<Button variant="quiet" size="sm" onClick={() => { setRadius("50"); setCat("all"); setQ(""); }}>Widen to all areas</Button>} />
            </Card>
          )}
        </div>

        <div className="stack g4">
          <Card>
            <CardHead title="Before you accept" />
            <CardBody>
              <div className="stack g3">
                {[
                  ["Can you distribute today?", "Accepted food must be served before its safe-consumption time."],
                  ["Is transport free?", "If no volunteer is available, your own vehicle must collect it."],
                  ["Can your kitchen handle it?", "Consider storage, reheating and serving capacity."],
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
          <Alert tone="warning" title="Reliability score">
            Accepting and then not collecting reduces your score. Three such events in 30 days pauses
            your account for review.
          </Alert>
          <Card>
            <CardBody>
              <div className="ds-label">Your collection record</div>
              <KV rows={[["Donations accepted", "142"], ["Collected on time", "139"], ["Cancelled after accepting", "3"], ["Reliability score", "97 / 100"]]} />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Accept modal */}
      <Modal
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        title="Accept this donation?"
        desc={target ? `${target.id} · ${target.servings} servings · ${target.quantity}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setTarget(null)}>Cancel</Button>
            <Button variant="primary" onClick={doAccept} icon="checkCircle">Confirm acceptance</Button>
          </>
        }
      >
        {target && (
          <div className="stack g4">
            <KV rows={[
              ["Food", target.title],
              ["Donor", target.donor],
              ["Pickup from", `${target.pickup.address}`],
              ["Pickup window", `${target.window.start.slice(11)} – ${target.window.end.slice(11)}`],
              ["Must be served before", target.expires.replace("T", " · ")],
            ]} />
            <Alert tone="warning" title="You are committing to collect and distribute">
              This reservation removes the donation from other NGOs' lists immediately.
            </Alert>
            <Field label="Distribution point" htmlFor="dp2" hint="Where will these meals be served?">
              <Select id="dp2" options={["Bani Park community kitchen", "Civil Lines night shelter", "Onward to partner shelter"]} />
            </Field>
          </div>
        )}
      </Modal>

      {/* Decline modal */}
      <Modal
        open={Boolean(declineTarget)}
        onClose={() => setDeclineTarget(null)}
        title="Decline this donation?"
        desc="The donor and platform team will see your reason."
        footer={
          <>
            <Button variant="quiet" onClick={() => setDeclineTarget(null)}>Keep it</Button>
            <Button variant="danger" disabled={!reason} onClick={doDecline}>Decline donation</Button>
          </>
        }
      >
        <div className="stack g4">
          <Field label="Why are you declining?" htmlFor="reason" required>
            <Select id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Select a reason"
              options={["No volunteer or transport available", "Quantity too large for our kitchen", "Allergens unsuitable for our beneficiaries", "Pickup window clashes with serving time", "Distance too far for the window", "Other"]} />
          </Field>
          <Alert tone="info" title="Declining is fine">
            Declining is better than accepting food you cannot distribute. It has no effect on your
            reliability score.
          </Alert>
        </div>
      </Modal>
    </>
  );
}
