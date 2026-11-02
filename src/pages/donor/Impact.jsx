import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, Table, SegmentedControl, Progress, Alert, KV } from "../../components/ui/index.jsx";
import { AreaChart, BarChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { monthlySeries, categorySplit, weeklySeries, areaPerformance } from "../../data/mockData.js";

export default function DonorImpact() {
  useDocumentTitle("Impact reports");
  const [range, setRange] = useState("6m");
  const [tab, setTab] = useState("overview");

  return (
    <>
      <PageHead
        eyebrow="Donor workspace"
        title="Impact reports"
        sub="Verified numbers from NGO distribution records — the figures we would publish in a CSR or annual report."
        actions={
          <>
            <SegmentedControl ariaLabel="Period" value={range} onChange={setRange}
              options={[{ value: "1m", label: "This month" }, { value: "6m", label: "6 months" }, { value: "1y", label: "1 year" }]} />
            <Button variant="primary" icon="download">Download report (PDF)</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Meals donated" value="4,820" icon="bowl" trend={{ dir: "up", value: "12%" }} foot="vs last period" />
        <Stat label="People reached" value="3,140" icon="users" trend={{ dir: "up", value: "9%" }} foot="unique beneficiaries" />
        <Stat label="Food rescued" value="742" unit="kg" icon="package" trend={{ dir: "up", value: "6%" }} foot="diverted from waste" />
        <Stat label="CO₂e avoided" value="12.4" unit="t" icon="leaf" foot="≈ 560 trees / year" />
      </div>

      {tab === "overview" && (
        <div className="grid grid--sidebar">
          <div className="stack g5">
            <Card>
              <CardHead
                title="Meals donated over time"
                desc="Verified servings, by month"
                action={<Badge tone="success" dot>Verified</Badge>}
              />
              <CardBody>
                <AreaChart data={monthlySeries} valueKey="meals" height={220} ariaLabel="Meals donated by month, May to October 2026" />
                <div className="chart-legend">
                  <span className="chart-legend__item"><span className="chart-legend__swatch" style={{ background: "var(--chart-1)" }} /> Meals served</span>
                </div>
              </CardBody>
            </Card>

            <div className="grid grid--2">
              <Card>
                <CardHead title="Carbon avoided" desc="Tonnes CO₂e per month" />
                <CardBody>
                  <BarChart data={monthlySeries} valueKey="co2" height={170} color="var(--chart-2)" unit="t" ariaLabel="Carbon dioxide equivalent avoided per month" />
                </CardBody>
              </Card>
              <Card>
                <CardHead title="What you donated" desc="Share of servings by category" />
                <CardBody>
                  <Donut data={categorySplit} centerValue="4,820" centerLabel="servings" />
                </CardBody>
              </Card>
            </div>

            <Card>
              <CardHead title="Monthly statement" desc="Ready for your accountant — October 2026" action={<Button variant="quiet" size="sm" icon="download">CSV</Button>} />
              <Table
                rows={monthlySeries.slice(-4).map((m, i) => ({
                  month: m.label, meals: m.meals, kg: Math.round(m.meals * 0.32), co2: m.co2,
                  donations: [24, 28, 31, 36][i], ngos: [3, 3, 4, 4][i],
                }))}
                rowKey="month"
                compact
                columns={[
                  { key: "month", header: "Month", render: (r) => <span className="table__primary">{r.month} 2026</span> },
                  { key: "donations", header: "Donations", align: "right" },
                  { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular">{r.meals.toLocaleString("en-IN")}</span> },
                  { key: "kg", header: "Food (kg)", align: "right", render: (r) => <span className="tabular">{r.kg}</span> },
                  { key: "co2", header: "CO₂e (t)", align: "right", render: (r) => <span className="tabular">{r.co2}</span> },
                  { key: "ngos", header: "NGOs served", align: "right" },
                ]}
              />
            </Card>
          </div>

          <div className="stack g5">
            <Card style={{ background: "var(--green-600)", borderColor: "var(--green-600)", color: "#fff" }}>
              <CardBody>
                <Icon name="award" size={22} style={{ color: "#86E0B0" }} />
                <div style={{ color: "#fff", fontSize: "var(--fs-20)", fontWeight: 600, marginTop: 12, lineHeight: 1.25 }}>
                  Rescue Partner — Gold
                </div>
                <p style={{ color: "rgba(255,255,255,.78)", fontSize: 13, marginTop: 6, lineHeight: 1.55 }}>
                  You have donated more than 4,500 meals with a 94% collection rate.
                  Thank you for keeping food out of the bin.
                </p>
                <div className="mt4">
                  <div className="row between text-xs" style={{ color: "rgba(255,255,255,.75)", marginBottom: 6 }}>
                    <span>Next tier: Platinum at 8,000</span><span>4,820 / 8,000</span>
                  </div>
                  <div className="progress" style={{ background: "rgba(255,255,255,.2)" }}>
                    <div className="progress__bar" style={{ width: "60%", background: "#86E0B0" }} />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHead title="Where your food went" desc="Distribution points this quarter" />
              <CardBody>
                <HBars
                  data={[
                    { label: "Bani Park community kitchen", value: 1820 },
                    { label: "Civil Lines night shelter", value: 1240 },
                    { label: "Malviya Nagar shelter", value: 980 },
                    { label: "Seva Bharati Ashram", value: 540 },
                    { label: "Street distribution", value: 240 },
                  ]}
                  suffix=" meals"
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="row g2 mb3">
                  <Icon name="info" size={16} style={{ color: "var(--info)" }} />
                  <span className="text-base fw-semi ink">How these numbers are calculated</span>
                </div>
                <p className="text-md muted" style={{ lineHeight: 1.6 }}>
                  Meals are counted from NGO distribution records, not from what the donor listed.
                  CO₂e uses 2.5 kg CO₂e per kg of food diverted from landfill (indicative factor).
                  Figures reconcile monthly and may lag by up to 48 hours.
                </p>
              </CardBody>
            </Card>

            <Alert tone="info" title="Prototype data">
              Every figure on this screen is fictional sample data for demonstration purposes.
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}
