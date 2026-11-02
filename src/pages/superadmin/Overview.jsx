import React from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, Alert, Table, SectionHead, Progress } from "../../components/ui/index.jsx";
import { AreaChart, BarChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { monthlySeries, categorySplit, areaPerformance, auditLogs, admins, funnel } from "../../data/mockData.js";

export default function SuperAdminOverview() {
  useDocumentTitle("Platform overview");

  return (
    <>
      <PageHead
        eyebrow={<>Super admin · <span className="deva">मुख्य प्रशासक</span></>}
        title="Platform overview"
        sub="Network health across 11 cities — growth, partner capacity, safety posture and system state."
        actions={<>
          <Button variant="quiet" icon="database" as={Link} to="/superadmin/audit">Audit logs</Button>
          <Button variant="primary" icon="settings" as={Link} to="/superadmin/config">System configuration</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Registered users" value="8,420" icon="users" trend={{ dir: "up", value: "+312" }} foot="this month" />
        <Stat label="Verified donors" value="612" icon="store" trend={{ dir: "up", value: "+18" }} foot="2 awaiting review" />
        <Stat label="NGO partners" value="148" icon="handHeart" trend={{ dir: "up", value: "+4" }} foot="across 11 cities" />
        <Stat label="Meals rescued (lifetime)" value="2.4" unit="lakh" icon="bowl" foot="since launch" />
      </div>

      <div className="split split--main">
        <div className="stack g5">
          <Card>
            <CardHead title="Network growth" desc="Meals rescued per month, all cities" action={<Badge tone="success" dot>Healthy</Badge>} />
            <CardBody>
              <AreaChart data={monthlySeries} valueKey="meals" height={220} ariaLabel="Platform meals rescued per month" />
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="City split" desc="Meals by city" />
              <CardBody>
                <HBars data={[
                  { label: "Jaipur", value: 22600 },
                  { label: "Udaipur", value: 9800 },
                  { label: "Jodhpur", value: 7400 },
                  { label: "Kota", value: 4100 },
                  { label: "Ajmer", value: 3200 },
                ]} suffix=" meals" />
              </CardBody>
            </Card>
            <Card>
              <CardHead title="Partner mix" desc="By category" />
              <CardBody><Donut data={categorySplit} size={130} centerValue="8,420" centerLabel="users" /></CardBody>
            </Card>
          </div>

          <Card>
            <CardHead title="Recent administrative activity" desc="Latest audit entries" action={<Button variant="ghost" size="sm" as={Link} to="/superadmin/audit" iconRight="arrowRight">All logs</Button>} />
            <Table
              rows={auditLogs.slice(0, 4)}
              rowKey="id"
              compact
              columns={[
                { key: "time", header: "Time", render: (r) => <span className="mono text-sm muted">{r.time}</span> },
                { key: "actor", header: "Actor", render: (r) => <div><div className="table__primary">{r.actor}</div><div className="table__sub">{r.role}</div></div> },
                { key: "action", header: "Action" },
                { key: "target", header: "Target", render: (r) => <span className="text-md muted">{r.target}</span> },
              ]}
            />
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="System health" desc="Last 30 days" />
            <CardBody>
              <div className="row g3 mb4">
                <span className="stat__icon" style={{ width: 40, height: 40, background: "var(--green-600)", color: "#fff" }}><Icon name="server" size={18} /></span>
                <div>
                  <div style={{ fontSize: "var(--fs-24)", fontWeight: 600, color: "var(--ink-900)" }}>99.97%</div>
                  <div className="text-xs muted">uptime · no incidents</div>
                </div>
              </div>
              <div className="stack g3">
                {[["API latency (p95)", "184 ms", 78], ["Database load", "42%", 42], ["Notification delivery", "99.4%", 99], ["Storage used", "61%", 61]].map(([l, v, p]) => (
                  <div key={l}>
                    <div className="row between text-sm mb1"><span className="muted">{l}</span><span className="fw-semi ink tabular">{v}</span></div>
                    <Progress value={p} tone={p > 90 ? "warning" : undefined} />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Administrators" desc={`${admins.length} accounts`} action={<Button variant="ghost" size="sm" as={Link} to="/superadmin/admins" iconRight="arrowRight">Manage</Button>} />
            <CardBody tight style={{ paddingBottom: 0 }}>
              {admins.map((a) => (
                <div className="list__row" key={a.id} style={{ padding: "11px 16px" }}>
                  <span className="avatar avatar--sm">{a.name.split(" ").map((w) => w[0]).join("")}</span>
                  <div className="list__main">
                    <div className="list__title">{a.name}</div>
                    <div className="list__meta">{a.role} · {a.scope}</div>
                  </div>
                  <Badge tone={a.status === "active" ? "success" : "info"} dot>{a.status}</Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Alert tone="warning" title="2 verifications breaching SLA">
            Handi Restaurant and Pratham Shiksha Trust have been waiting more than 48 hours. SLA target is
            72 hours.
            <div className="mt2"><Button variant="secondary" size="sm" as={Link} to="/admin/donors">Open queue</Button></div>
          </Alert>

          <Card>
            <CardHead title="Rescue funnel" desc="All cities, this month" />
            <CardBody><HBars data={funnel} showPct /></CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
