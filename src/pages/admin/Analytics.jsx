import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, SegmentedControl, Table, Alert, Progress } from "../../components/ui/index.jsx";
import { AreaChart, BarChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { monthlySeries, weeklySeries, categorySplit, areaPerformance, funnel } from "../../data/mockData.js";

export default function AdminAnalytics() {
  useDocumentTitle("Analytics");
  const [range, setRange] = useState("6m");

  return (
    <>
      <PageHead
        eyebrow="Admin console"
        title="Analytics"
        sub="Where food is being rescued, where it is being lost, and which partners need support."
        actions={<>
          <SegmentedControl ariaLabel="Period" value={range} onChange={setRange} options={[{ value: "1m", label: "Month" }, { value: "6m", label: "6 months" }, { value: "1y", label: "Year" }]} />
          <Button variant="quiet" icon="download" as={undefined}>Export</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Meals rescued" value="22,600" icon="bowl" trend={{ dir: "up", value: "14%" }} foot="this month" />
        <Stat label="Food diverted" value="7.2" unit="tonnes" icon="package" trend={{ dir: "up", value: "11%" }} foot="vs September" />
        <Stat label="CO₂e avoided" value="32.7" unit="t" icon="leaf" foot="≈ 1,480 trees" />
        <Stat label="Rescue rate" value="70" unit="%" icon="target" trend={{ dir: "up", value: "3 pts" }} foot="published → distributed" />
      </div>

      <div className="split split--main">
        <div className="stack g5">
          <Card>
            <CardHead title="Meals rescued per month" desc="Platform-wide trend" action={<Badge tone="success" dot>Verified</Badge>} />
            <CardBody>
              <AreaChart data={monthlySeries} valueKey="meals" height={230} ariaLabel="Meals rescued per month" />
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Daily volume" desc="Last 7 days" />
              <CardBody><BarChart data={weeklySeries} valueKey="meals" height={180} ariaLabel="Daily meals rescued" /></CardBody>
            </Card>
            <Card>
              <CardHead title="Category mix" desc="Share of donations" />
              <CardBody><Donut data={categorySplit} size={140} centerValue="1,840" centerLabel="donations" /></CardBody>
            </Card>
          </div>

          <Card>
            <CardHead title="Area performance" desc="Volume, capacity and pickup speed" action={<Button variant="quiet" size="sm" icon="download">CSV</Button>} />
            <Table
              rows={areaPerformance}
              rowKey="area"
              columns={[
                { key: "area", header: "Area", render: (r) => <span className="table__primary">{r.area}</span> },
                { key: "donations", header: "Donations", align: "right" },
                { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular">{r.meals.toLocaleString("en-IN")}</span> },
                { key: "ngo", header: "NGOs", align: "right" },
                { key: "avgPickup", header: "Avg pickup", align: "right", render: (r) => <span className={r.avgPickup > 30 ? "danger fw-semi" : "tabular"}>{r.avgPickup} min</span> },
                { key: "status", header: "Status", render: (r) => <Badge tone={r.avgPickup > 30 ? "warning" : "success"} dot>{r.avgPickup > 30 ? "Slower" : "Healthy"}</Badge> },
              ]}
            />
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Rescue funnel" desc="This month" />
            <CardBody><HBars data={funnel} showPct /></CardBody>
          </Card>

          <Card>
            <CardHead title="Where donations are lost" desc="Top failure reasons" />
            <CardBody>
              <HBars data={[
                { label: "No NGO accepted in window", value: 328 },
                { label: "No volunteer available", value: 172 },
                { label: "Pickup missed by donor", value: 96 },
                { label: "Food declared unsafe", value: 42 },
                { label: "Cancelled by donor", value: 30 },
              ]} color="var(--chart-6)" suffix="" />
            </CardBody>
          </Card>

          <Alert tone="info" title="Insight">
            Amer Road has only 1 partner NGO and the slowest pickup time. Onboarding one more NGO in that
            area would likely recover ~400 meals a month.
          </Alert>

          <Card>
            <CardBody>
              <div className="ds-label">Data quality</div>
              <div className="stack g3">
                {[["Donations with safety declaration", 100], ["Distributions filed within 24h", 96], ["Verifications within 3 days", 88], ["Photo proof of delivery", 91]].map(([l, v]) => (
                  <div key={l}>
                    <div className="row between text-sm mb1"><span className="muted">{l}</span><span className="fw-semi ink">{v}%</span></div>
                    <Progress value={v} tone={v < 90 ? "warning" : undefined} />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
