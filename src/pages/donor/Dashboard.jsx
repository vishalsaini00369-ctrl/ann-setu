import React from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardHead, CardBody, Stat, Badge, StatusBadge, SectionHead, Alert, EmptyState } from "../../components/ui/index.jsx";
import { BarChart } from "../../components/charts/index.jsx";
import DonationCard, { require_status } from "../../components/DonationCard.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { activities, weeklySeries } from "../../data/mockData.js";

export default function DonorDashboard() {
  useDocumentTitle("Donor dashboard");
  const { donations } = useApp();

  const mine = donations.filter((d) => d.donorId === "don-1");
  const active = mine.filter((d) => ["published", "accepted", "assigned", "picked_up"].includes(d.status));
  const live = donations.find((d) => d.id === "AS-2026-1042");

  return (
    <>
      <PageHead
        eyebrow={<>Donor workspace · <span className="deva">दाता</span></>}
        title="Good afternoon, Rawat Mishthan Bhandar"
        sub="You have one live donation awaiting an NGO and one volunteer pickup in progress."
        actions={
          <>
            <Button variant="quiet" icon="barChart" as={Link} to="/donor/impact">Impact report</Button>
            <Button variant="primary" icon="plus" as={Link} to="/donor/new">Create donation</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Available now" value={12} icon="mapPin" foot="within 6 km" trend={{ dir: "up", value: "+3" }} />
        <Stat label="Your active donations" value={active.length} icon="activity" foot={`${active.filter((d) => d.status === "published").length} awaiting an NGO`} />
        <Stat label="Pending pickups" value={active.filter((d) => ["accepted", "assigned"].includes(d.status)).length} icon="truck" foot="volunteer assigned" />
        <Stat label="Meals donated" value="4,820" icon="bowl" foot="since Feb 2025" trend={{ dir: "up", value: "12%" }} />
      </div>

      <div className="split">
        {/* Live donation highlight */}
        <Card>
          <CardHead
            title="Your live donation"
            desc="AS-2026-1042 · published 2 hours ago"
            action={<StatusBadge status="Awaiting NGO" />}
          />
          <CardBody>
            <div className="split split--main">
              <div>
                <h3 style={{ fontSize: "var(--fs-18)" }}>{live.title}</h3>
                <div className="row g4 mt3 wrap">
                  <span className="row g2 text-md muted"><Icon name="bowl" size={15} /> <b className="ink">{live.servings}</b> servings</span>
                  <span className="row g2 text-md muted"><Icon name="package" size={15} /> {live.quantity}</span>
                  <span className="row g2 text-md muted"><Icon name="clock" size={15} /> Pickup {live.window.start.slice(11)}–{live.window.end.slice(11)}</span>
                  <span className="row g2 text-md muted"><Icon name="mapPin" size={15} /> {live.pickup.area}</span>
                </div>
                <div className="alert alert--info mt4">
                  <span className="alert__icon"><Icon name="inbox" size={16} /></span>
                  <div>
                    <div className="alert__title">Seen by 4 verified NGOs nearby</div>
                    Annapurna Seva Sansthan usually responds in about 9 minutes.
                  </div>
                </div>
                <div className="row g2 mt4">
                  <Button variant="primary" size="sm" as={Link} to={`/donor/donations/${live.id}`} iconRight="arrowRight">View details</Button>
                  <Button variant="quiet" size="sm" icon="message" as={Link} to="/donor/active">See all active</Button>
                </div>
              </div>
              <div className="card card--flat" style={{ background: "var(--canvas)", padding: "var(--s-4)" }}>
                <div className="ds-label">Safety declaration</div>
                <div className="kv">
                  {[
                    ["Holding", live.storage],
                    ["Prepared", "Today · 10:30"],
                    ["Consume by", "Today · 18:00"],
                    ["Handler certified", "Yes"],
                    ["Allergens", live.allergens.join(", ") || "None"],
                  ].map(([k, v]) => (
                    <div className="kv__row" key={k}>
                      <span className="kv__k">{k}</span>
                      <span className="kv__v">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="row g2 mt3 text-xs muted">
                  <Icon name="shield" size={13} style={{ color: "var(--green-600)" }} />
                  Auto-expires at 18:00
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Two-up: active donations + activity */}
        <div className="split split--main-sm">
          <div>
            <SectionHead
              title="Active donations"
              action={<Link to="/donor/active" className="section-head__link">View all</Link>}
            />
            <div className="grid grid--2">
              {active.slice(0, 2).map((d) => (
                <DonationCard key={d.id} d={d} to={`/donor/donations/${d.id}`} />
              ))}
              {!active.length && (
                <Card style={{ gridColumn: "1 / -1" }}>
                  <EmptyState
                    icon="bowl"
                    title="No active donations right now"
                    desc="When you publish surplus food it appears here until it is picked up."
                    action={<Button variant="primary" size="sm" as={Link} to="/donor/new" icon="plus">Create a donation</Button>}
                  />
                </Card>
              )}
            </div>

            <SectionHead title="Last 7 days" action={<span className="text-sm muted">Meals donated</span>} />
            <Card>
              <CardBody>
                <BarChart data={weeklySeries} valueKey="meals" height={180} ariaLabel="Meals donated per day over the last seven days" />
              </CardBody>
            </Card>
          </div>

          <div>
            <SectionHead title="Recent activity" action={<Link to="/donor/history" className="section-head__link">History</Link>} />
            <Card>
              <div className="list">
                {activities.slice(0, 5).map((a) => (
                  <div className="list__row" key={a.id}>
                    <span
                      className="stat__icon"
                      style={{
                        width: 30, height: 30, flex: "none",
                        background: a.tone === "danger" ? "var(--danger-bg)" : a.tone === "warning" ? "var(--warning-bg)" : a.tone === "info" ? "var(--info-bg)" : "var(--success-bg)",
                        color: a.tone === "danger" ? "var(--danger)" : a.tone === "warning" ? "var(--warning)" : a.tone === "info" ? "var(--info)" : "var(--success)",
                      }}
                    >
                      <Icon name={a.icon} size={14} />
                    </span>
                    <div className="list__main">
                      <div className="list__title" style={{ fontWeight: 500 }}>{a.title}</div>
                      <div className="list__meta">{a.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ marginTop: "var(--s-5)", borderColor: "var(--green-100)", background: "var(--green-50)" }}>
              <CardBody tight>
                <div className="row g3 items-start">
                  <span className="stat__icon" style={{ background: "#fff", flex: "none" }}><Icon name="leaf" size={16} /></span>
                  <div>
                    <div className="text-base fw-semi ink">You've avoided 12.4 tonnes of CO₂e</div>
                    <p className="text-md muted mt1" style={{ lineHeight: 1.5 }}>
                      Equivalent to planting about 560 trees. Your October certificate is ready.
                    </p>
                    <Button variant="secondary" size="sm" className="mt3" as={Link} to="/donor/impact" iconRight="arrowRight">View impact</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
