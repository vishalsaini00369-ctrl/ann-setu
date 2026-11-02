import React from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, StatusBadge, SectionHead, Alert, Avatar, Progress } from "../../components/ui/index.jsx";
import { BarChart, Donut } from "../../components/charts/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { weeklySeries, categorySplit, requirements, volunteers } from "../../data/mockData.js";

export default function NgoDashboard() {
  useDocumentTitle("NGO dashboard");
  const { donations } = useApp();

  const nearby = donations.filter((d) => d.status === "published");
  const accepted = donations.filter((d) => ["accepted", "assigned", "picked_up"].includes(d.status));

  return (
    <>
      <PageHead
        eyebrow={<>NGO workspace · <span className="deva">संस्था</span></>}
        title="Annapurna Seva Sansthan"
        sub="7 donations are live within 6 km. Two of your accepted donations are awaiting pickup."
        actions={
          <>
            <Button variant="quiet" icon="clip" as={Link} to="/ngo/requirements">Post requirement</Button>
            <Button variant="primary" icon="mapPin" as={Link} to="/ngo/nearby">Find donations</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Live nearby" value={7} icon="mapPin" foot="within 6 km" trend={{ dir: "up", value: "+2" }} />
        <Stat label="Accepted" value={accepted.length || 2} icon="checkCircle" foot="2 awaiting pickup" />
        <Stat label="Distributed this month" value="4,180" unit="meals" icon="bowl" trend={{ dir: "up", value: "8%" }} foot="vs September" />
        <Stat label="Served today" value={268} unit="people" icon="users" foot="3 distribution points" />
      </div>

      {nearby.length > 0 && (
        <Alert tone="info" title={`${nearby.length} new donation${nearby.length > 1 ? "s" : ""} need an NGO`}>
          The closest is {nearby[0].title} from {nearby[0].donor} — {nearby[0].servings} servings,
          pickup by {nearby[0].window.end.slice(11)}.
          <div className="mt2">
            <Button variant="secondary" size="sm" as={Link} to="/ngo/nearby" iconRight="arrowRight">Review now</Button>
          </div>
        </Alert>
      )}

      <div className="split split--main-sm">
        <div>
          <SectionHead title="Needs your decision" action={<Link to="/ngo/nearby" className="section-head__link">See all nearby</Link>} />
          <div className="stack g3 mb5">
            {nearby.slice(0, 2).map((d) => (
              <Card key={d.id} interactive>
                <CardBody tight>
                  <div className="row g4 items-start wrap">
                    <span className="stat__icon" style={{ width: 40, height: 40, flex: "none" }}><Icon name="bowl" size={18} /></span>
                    <div className="grow" style={{ minWidth: 180 }}>
                      <div className="row g2 wrap">
                        <span className="text-base fw-semi ink">{d.title}</span>
                        <StatusBadge status="Awaiting NGO" />
                      </div>
                      <div className="text-md muted mt1">{d.donor} · {d.pickup.area} · {d.distance} km away</div>
                      <div className="row g4 mt2 text-sm muted wrap">
                        <span className="row g1"><Icon name="bowl" size={13} /> {d.servings} servings</span>
                        <span className="row g1"><Icon name="package" size={13} /> {d.quantity}</span>
                        <span className="row g1"><Icon name="clock" size={13} /> by {d.window.end.slice(11)}</span>
                      </div>
                    </div>
                    <div className="row g2">
                      <Button variant="quiet" size="sm" as={Link} to={`/ngo/donations/${d.id}`}>Review</Button>
                      <Button variant="primary" size="sm" as={Link} to={`/ngo/donations/${d.id}`} iconRight="check">Accept</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <SectionHead title="In progress" action={<Link to="/ngo/accepted" className="section-head__link">All accepted</Link>} />
          <Card>
            <div className="list">
              {accepted.slice(0, 3).map((d) => (
                <div className="list__row" key={d.id}>
                  <span className="stat__icon" style={{ width: 32, height: 32 }}><Icon name={d.status === "picked_up" ? "truck" : "checkCircle"} size={15} /></span>
                  <div className="list__main">
                    <div className="list__title">{d.title}</div>
                    <div className="list__meta">
                      {d.donor} · {d.servings} servings · {d.volunteer ? `Volunteer: ${d.volunteer}` : "No volunteer assigned"}
                    </div>
                  </div>
                  <StatusBadge status={d.status === "picked_up" ? "Picked up" : d.volunteer ? "Volunteer assigned" : "Accepted"} />
                  <Link to={`/ngo/donations/${d.id}`} className="btn btn--ghost btn--sm" style={{ padding: "0 8px" }} aria-label="Open">
                    <Icon name="chevronRight" size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          <SectionHead title="Meals distributed" action={<span className="text-sm muted">Last 7 days</span>} />
          <Card>
            <CardBody>
              <BarChart data={weeklySeries} valueKey="meals" height={170} ariaLabel="Meals distributed per day over the last seven days" />
            </CardBody>
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Your requirements" desc="What you still need this week" action={<Link to="/ngo/requirements" className="section-head__link">Manage</Link>} />
            <CardBody tight style={{ paddingBottom: 0 }}>
              {requirements.slice(0, 3).map((r) => (
                <div key={r.id} style={{ padding: "12px 8px", borderBottom: "1px solid var(--line)" }}>
                  <div className="row between mb2">
                    <span className="text-md fw-semi ink">{r.item}</span>
                    <Badge tone={r.urgency === "high" ? "danger" : "warning"}>{r.urgency === "high" ? "Urgent" : "Medium"}</Badge>
                  </div>
                  <div className="row between text-xs muted mb2">
                    <span>{r.matched} of {r.needed} {r.unit} matched</span>
                    <span>{Math.round((r.matched / r.needed) * 100)}%</span>
                  </div>
                  <Progress value={(r.matched / r.needed) * 100} tone={r.matched / r.needed < 0.4 ? "warning" : undefined} />
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Volunteers on duty" action={<Link to="/ngo/volunteers" className="section-head__link">Coordinate</Link>} />
            <CardBody>
              <div className="stack g3">
                {volunteers.slice(0, 3).map((v) => (
                  <div className="row g3" key={v.id}>
                    <Avatar initials={v.initials} size="sm" />
                    <div className="grow">
                      <div className="text-md fw-semi ink">{v.name}</div>
                      <div className="text-xs muted">{v.area} · {v.vehicle}</div>
                    </div>
                    <Badge tone={v.available ? "success" : "neutral"} dot>{v.available ? "Free" : "Busy"}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="quiet" block size="sm" className="mt4" icon="users" as={Link} to="/ngo/volunteers">Assign a volunteer</Button>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="What you collected" desc="This month by category" />
            <CardBody>
              <Donut data={categorySplit.slice(0, 4)} size={130} centerValue="4,180" centerLabel="meals" />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
