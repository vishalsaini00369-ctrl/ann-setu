import React from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Stat, Badge, StatusBadge, Alert, SectionHead, Table, Progress, Avatar,
} from "../../components/ui/index.jsx";
import { AreaChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { weeklySeries, categorySplit, areaPerformance, complaints, incidents, verifications, funnel } from "../../data/mockData.js";

export default function AdminOverview() {
  useDocumentTitle("Platform overview");
  const { donations } = useApp();
  const live = donations.filter((d) => ["published", "accepted", "assigned", "picked_up"].includes(d.status));
  const pendingVerify =
    verifications.donors.filter((r) => r.status === "pending").length +
    verifications.ngos.filter((r) => r.status === "pending").length +
    verifications.volunteers.filter((r) => r.status === "pending").length;

  return (
    <>
      <PageHead
        eyebrow={<>Admin console · <span className="deva">प्रशासक</span></>}
        title="Platform overview"
        sub="Everything live in Jaipur today — verification queues, donations in motion and anything that needs a decision."
        actions={
          <>
            <Button variant="quiet" icon="download" as={Link} to="/admin/reports">Export report</Button>
            <Button variant="primary" icon="userCheck" as={Link} to="/admin/donors">Verification queue ({pendingVerify})</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Live donations" value={live.length} icon="activity" foot="3 awaiting NGO" trend={{ dir: "up", value: "+6" }} />
        <Stat label="Meals today" value="1,240" icon="bowl" foot="across 11 areas" trend={{ dir: "up", value: "9%" }} />
        <Stat label="Pending verifications" value={pendingVerify} icon="userCheck" foot="oldest 3 days" />
        <Stat label="Open incidents" value={2} icon="shieldAlert" foot="1 high severity" trend={{ dir: "down", value: "-1" }} />
      </div>

      {(incidents[0] || complaints[0]) && (
        <Alert tone="warning" title="Needs attention">
          {incidents.filter((i) => i.status !== "closed").length} food-safety incident
          {incidents.filter((i) => i.status !== "closed").length !== 1 ? "s" : ""} under review ·{" "}
          {complaints.filter((c) => c.status !== "resolved").length} complaints open, one with a 3-hour SLA.
          <div className="row g2 mt2">
            <Button variant="secondary" size="sm" as={Link} to="/admin/incidents">Review incidents</Button>
            <Button variant="quiet" size="sm" as={Link} to="/admin/complaints">Open complaints</Button>
          </div>
        </Alert>
      )}

      <div className="split split--main">
        <div className="stack g5">
          <Card>
            <CardHead
              title="Rescue funnel this month"
              desc="Where donations drop out of the pipeline"
              action={<Badge tone="info">1,840 published</Badge>}
            />
            <CardBody>
              <HBars data={funnel} valueKey="value" labelKey="label" color="var(--chart-1)" showPct />
              <div className="alert alert--warning mt4">
                <span className="alert__icon"><Icon name="alert" size={16} /></span>
                <div>
                  <div className="alert__title">18% of donations are never accepted</div>
                  Mostly published after 19:00, when NGO kitchens have closed. Consider prompting donors to
                  list earlier.
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Meals rescued per day" desc="Platform-wide, last 7 days" action={<Badge tone="success" dot>Live</Badge>} />
            <CardBody>
              <AreaChart data={weeklySeries} valueKey="meals" height={200} ariaLabel="Meals rescued per day across the platform" />
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Donations in motion" desc="Live monitoring feed" action={<Button variant="ghost" size="sm" as={Link} to="/admin/donations" iconRight="arrowRight">Full monitor</Button>} />
            <Table
              rows={live.slice(0, 5)}
              rowKey="id"
              compact
              columns={[
                { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
                { key: "title", header: "Donation", render: (r) => <div><div className="table__primary">{r.title}</div><div className="table__sub">{r.donor}</div></div> },
                { key: "ngo", header: "NGO", render: (r) => r.ngo || <span className="faint">Awaiting</span> },
                { key: "servings", header: "Servings", align: "right", render: (r) => <span className="tabular">{r.servings}</span> },
                { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "published" ? "Awaiting NGO" : r.status === "picked_up" ? "Picked up" : r.volunteer ? "Volunteer assigned" : "Accepted"} /> },
              ]}
            />
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Verification queue" desc="Oldest first" action={<Badge tone="warning">{pendingVerify} waiting</Badge>} />
            <CardBody tight style={{ paddingBottom: 0 }}>
              {[
                { n: "Handi Restaurant", t: "Donor · FSSAI", d: "1 day", i: "store" },
                { n: "Pratham Shiksha Trust", t: "NGO · registration", d: "3 days", i: "handHeart" },
                { n: "Vikram Singh", t: "Volunteer · ID", d: "1 day", i: "user" },
                { n: "Tapri Central", t: "Donor · FSSAI", d: "2 days", i: "store" },
              ].map((q) => (
                <div className="list__row" key={q.n} style={{ padding: "12px 16px" }}>
                  <span className="stat__icon" style={{ width: 30, height: 30, flex: "none" }}><Icon name={q.i} size={14} /></span>
                  <div className="list__main">
                    <div className="list__title">{q.n}</div>
                    <div className="list__meta">{q.t} · waiting {q.d}</div>
                  </div>
                  <Button variant="quiet" size="sm" as={Link} to={q.i === "store" ? "/admin/donors" : q.i === "user" ? "/admin/volunteers" : "/admin/ngos"}>Review</Button>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Donations by category" desc="This month" />
            <CardBody><Donut data={categorySplit} size={130} centerValue="1,840" centerLabel="donations" /></CardBody>
          </Card>

          <Card>
            <CardHead title="Area performance" desc="Meals rescued" />
            <CardBody>
              <Table
                rows={areaPerformance}
                rowKey="area"
                compact
                columns={[
                  { key: "area", header: "Area", render: (r) => <span className="table__primary">{r.area}</span> },
                  { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular">{r.meals.toLocaleString("en-IN")}</span> },
                  { key: "avgPickup", header: "Avg pickup", align: "right", render: (r) => <span className="tabular">{r.avgPickup} min</span> },
                ]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
