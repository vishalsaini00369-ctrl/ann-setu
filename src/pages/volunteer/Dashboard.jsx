import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Stat, Badge, StatusBadge, SectionHead, Alert, Avatar, Progress, Timeline,
} from "../../components/ui/index.jsx";
import { BarChart, Sparkline } from "../../components/charts/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { volunteerTasks, volunteerHistory } from "../../data/mockData.js";

export default function VolunteerDashboard() {
  useDocumentTitle("Volunteer dashboard");
  const { toast } = useApp();
  const [online, setOnline] = useState(true);
  const next = volunteerTasks[1];

  return (
    <>
      <PageHead
        eyebrow={<>Volunteer workspace · <span className="deva">स्वयंसेवक</span></>}
        title="Namaste, Kabir"
        sub="You have 3 pickups assigned today. The next one is already collected and needs a delivery confirmation."
        actions={
          <>
            <button
              className={`btn ${online ? "btn--primary" : "btn--quiet"}`}
              onClick={() => { setOnline((o) => !o); toast(online ? "You are now offline" : "You are now online", online ? "You will not receive new assignments." : "Nearby NGOs can assign you pickups.", "success"); }}
              aria-pressed={online}
            >
              <span className="badge__dot" style={{ background: online ? "#fff" : "var(--ink-300)" }} />
              {online ? "Online — accepting runs" : "Offline"}
            </button>
            <Button variant="quiet" icon="history" as={Link} to="/volunteer/history">History</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Assigned today" value={3} icon="truck" foot="2 due before 18:00" />
        <Stat label="Delivered" value={62} icon="checkCircle" foot="lifetime" trend={{ dir: "up", value: "+4" }} />
        <Stat label="Distance covered" value="318" unit="km" icon="navigation" foot="this month" />
        <Stat label="Your rating" value="4.9" icon="star" foot="from 58 NGOs & donors" />
      </div>

      {next && (
        <Card style={{ borderColor: "var(--green-200)", background: "linear-gradient(180deg, var(--green-50), var(--white))" }} className="mb5">
          <CardBody>
            <div className="row between wrap g3 mb3">
              <div className="row g2">
                <Badge tone="warning" dot>In progress</Badge>
                <Badge tone="neutral">{next.id}</Badge>
              </div>
              <span className="text-sm muted">Pickup done at {next.pickupBy} · 34 kg in your vehicle</span>
            </div>
            <div className="split split--auto">
              <div>
                <h2 style={{ fontSize: "var(--fs-20)" }}>{next.title}</h2>
                <div className="stack g2 mt3">
                  <div className="row g2 text-md muted"><Icon name="store" size={15} /> Collected from <b className="ink">{next.donor}</b> · {next.area}</div>
                  <div className="row g2 text-md muted"><Icon name="handHeart" size={15} /> Deliver to <b className="ink">{next.dropNgo}</b> · {next.dropArea}</div>
                  <div className="row g2 text-md muted"><Icon name="clock" size={15} /> Must be served by 17:00 · {next.servings} servings</div>
                </div>
              </div>
              <div className="stack g2" style={{ minWidth: 200 }}>
                <Button variant="primary" as={Link} to={`/volunteer/navigate/${next.id}`} icon="navigation">Navigate to NGO</Button>
                <Button variant="quiet" as={Link} to={`/volunteer/confirm/${next.id}`} icon="checkCircle">Confirm delivery</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="split split--main-sm">
        <div>
          <SectionHead title="Today's pickups" action={<Link to="/volunteer/pickups" className="section-head__link">All assigned</Link>} />
          <div className="stack g3">
            {volunteerTasks.map((t) => (
              <Card key={t.id} interactive>
                <CardBody tight>
                  <div className="row g3 items-start wrap">
                    <span className="stat__icon" style={{ width: 36, height: 36, flex: "none" }}>
                      <Icon name={t.status === "picked_up" ? "truck" : "package"} size={16} />
                    </span>
                    <div className="grow" style={{ minWidth: 160 }}>
                      <div className="row g2 wrap mb1">
                        <span className="text-base fw-semi ink">{t.title}</span>
                        <StatusBadge status={t.status === "picked_up" ? "Picked up" : t.status === "assigned" ? "Volunteer assigned" : "Accepted"} />
                      </div>
                      <div className="text-md muted">{t.donor} → {t.dropNgo}</div>
                      <div className="row g3 mt2 text-sm muted wrap">
                        <span className="row g1"><Icon name="clock" size={13} /> by {t.pickupBy}</span>
                        <span className="row g1"><Icon name="navigation" size={13} /> {t.distanceKm} km</span>
                        <span className="row g1"><Icon name="bowl" size={13} /> {t.servings} servings</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" as={Link} to={`/volunteer/pickups/${t.id}`} iconRight="chevronRight">Open</Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <SectionHead title="Deliveries this week" action={<Sparkline values={[3, 5, 2, 6, 4, 7, 5]} />} />
          <Card>
            <CardBody>
              <BarChart data={[{ label: "Mon", meals: 3 }, { label: "Tue", meals: 5 }, { label: "Wed", meals: 2 }, { label: "Thu", meals: 6 }, { label: "Fri", meals: 4 }, { label: "Sat", meals: 7 }, { label: "Sun", meals: 5 }]} valueKey="meals" height={150} ariaLabel="Deliveries per day this week" />
            </CardBody>
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Your impact" desc="All time" />
            <CardBody>
              <div className="row g3 mb4">
                <div>
                  <div style={{ fontSize: "var(--fs-30)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--ink-900)" }}>4,860</div>
                  <div className="text-sm muted">meals delivered</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Icon name="award" size={26} style={{ color: "var(--green-600)" }} />
                </div>
              </div>
              <KV2 />
              <div className="mt4">
                <div className="row between text-xs mb2"><span className="muted">Next badge: Silver Hero at 6,000</span><span className="fw-semi ink">81%</span></div>
                <Progress value={81} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Recent" action={<Link to="/volunteer/history" className="section-head__link">All</Link>} />
            <div className="list">
              {volunteerHistory.slice(0, 3).map((h) => (
                <div className="list__row" key={h.id}>
                  <span className="stat__icon" style={{ width: 28, height: 28, flex: "none" }}><Icon name="check" size={13} /></span>
                  <div className="list__main">
                    <div className="list__title" style={{ fontWeight: 500 }}>{h.servings} meals · {h.ngo}</div>
                    <div className="list__meta">{h.date} · {h.km} km · {h.minutes} min</div>
                  </div>
                  <span className="text-sm muted">{h.rating} ★</span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ background: "var(--canvas)" }}>
            <CardBody>
              <div className="row g2 mb2"><Icon name="shield" size={16} style={{ color: "var(--green-600)" }} /><span className="text-base fw-semi ink">Safety reminder</span></div>
              <p className="text-md muted" style={{ lineHeight: 1.55 }}>
                Only accept food that is sealed and within its safe window. If the packaging is damaged or
                the food smells wrong, refuse the pickup and report it from the task screen.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

function KV2() {
  return (
    <div className="kv">
      <div className="kv__row"><span className="kv__k">Pickups completed</span><span className="kv__v">62</span></div>
      <div className="kv__row"><span className="kv__k">On-time rate</span><span className="kv__v">98%</span></div>
      <div className="kv__row"><span className="kv__k">Distance covered</span><span className="kv__v">318 km</span></div>
      <div className="kv__row"><span className="kv__k">NGOs served</span><span className="kv__v">9</span></div>
    </div>
  );
}
