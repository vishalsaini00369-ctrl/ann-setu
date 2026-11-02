import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, SegmentedControl, Table, Alert, Progress } from "../../components/ui/index.jsx";
import { AreaChart, BarChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { monthlySeries, categorySplit, areaPerformance, funnel } from "../../data/mockData.js";

export default function SuperAdminAnalytics() {
  useDocumentTitle("Platform analytics");
  const [range, setRange] = useState("6m");

  return (
    <>
      <PageHead
        eyebrow="Super admin"
        title="Platform analytics"
        sub="Cross-city performance, unit economics and growth signals for funders and government partners."
        actions={<>
          <SegmentedControl ariaLabel="Period" value={range} onChange={setRange} options={[{ value: "3m", label: "3 months" }, { value: "6m", label: "6 months" }, { value: "1y", label: "1 year" }]} />
          <Button variant="quiet" icon="download">Export</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Meals rescued (6m)" value="1.02" unit="lakh" icon="bowl" trend={{ dir: "up", value: "38%" }} foot="vs previous period" />
        <Stat label="Active partners" value="760" icon="users" trend={{ dir: "up", value: "+84" }} foot="donors + NGOs" />
        <Stat label="Cost per meal rescued" value="₹1.90" icon="scale" trend={{ dir: "down", value: "-12%" }} foot="logistics + platform" />
        <Stat label="Partner retention" value="91" unit="%" icon="heart" trend={{ dir: "up", value: "2 pts" }} foot="12-month cohort" />
      </div>

      <div className="split split--main">
        <div className="stack g5">
          <Card>
            <CardHead title="Growth" desc="Meals rescued per month, all cities" action={<Badge tone="success" dot>On track</Badge>} />
            <CardBody><AreaChart data={monthlySeries} valueKey="meals" height={230} ariaLabel="Platform growth in meals rescued" /></CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Carbon avoided" desc="Tonnes CO₂e" />
              <CardBody><BarChart data={monthlySeries} valueKey="co2" height={180} color="var(--chart-2)" unit="t" ariaLabel="Carbon avoided per month" /></CardBody>
            </Card>
            <Card>
              <CardHead title="City contribution" desc="Share of meals" />
              <CardBody><Donut data={[
                { label: "Jaipur", value: 48, color: "var(--chart-1)" },
                { label: "Udaipur", value: 21, color: "var(--chart-2)" },
                { label: "Jodhpur", value: 16, color: "var(--chart-3)" },
                { label: "Kota", value: 9, color: "var(--chart-4)" },
                { label: "Ajmer", value: 6, color: "var(--chart-6)" },
              ]} size={140} centerValue="11" centerLabel="cities" /></CardBody>
            </Card>
          </div>

          <Card>
            <CardHead title="Area comparison" desc="All cities, Jaipur detail" action={<Button variant="quiet" size="sm" icon="download">CSV</Button>} />
            <Table
              rows={areaPerformance}
              rowKey="area"
              columns={[
                { key: "area", header: "Area", render: (r) => <span className="table__primary">{r.area}</span> },
                { key: "ngo", header: "NGOs", align: "right" },
                { key: "donations", header: "Donations", align: "right" },
                { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular">{r.meals.toLocaleString("en-IN")}</span> },
                { key: "avgPickup", header: "Avg pickup", align: "right", render: (r) => <span className={r.avgPickup > 30 ? "danger fw-semi" : "tabular"}>{r.avgPickup} min</span> },
              ]}
            />
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Rescue funnel" desc="All cities this month" />
            <CardBody><HBars data={funnel} showPct /></CardBody>
          </Card>

          <Card>
            <CardHead title="Unit economics" desc="Per meal rescued" />
            <CardBody>
              <div className="kv">
                {[["Volunteer reimbursement", "₹1.10"], ["Platform operations", "₹0.55"], ["Verification & audit", "₹0.15"], ["Support", "₹0.10"], ["Total", "₹1.90"]].map(([k, v], i) => (
                  <div className="kv__row" key={k} style={i === 4 ? { borderTop: "1px solid var(--line)", fontWeight: 600 } : undefined}>
                    <span className="kv__k">{k}</span><span className="kv__v">{v}</span>
                  </div>
                ))}
              </div>
              <Alert tone="info" title="Benchmark">
                A meal delivered through a food bank typically costs ₹4–₹6. Route density is the main driver
                of the difference.
              </Alert>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Growth signals" desc="Leading indicators" />
            <CardBody>
              <div className="stack g3">
                {[["Donor sign-ups", 78, "+18 this month"], ["NGO onboarding", 62, "+4 this month"], ["Volunteer activation", 91, "412 active"], ["Repeat donor rate", 87, "68% donate weekly"]].map(([l, v, s]) => (
                  <div key={l}>
                    <div className="row between text-sm mb1"><span className="muted">{l}</span><span className="fw-semi ink">{s}</span></div>
                    <Progress value={v} />
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
