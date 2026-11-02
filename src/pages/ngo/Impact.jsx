import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Badge, Table, SegmentedControl, Alert, KV } from "../../components/ui/index.jsx";
import { AreaChart, BarChart, Donut, HBars } from "../../components/charts/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { monthlySeries, weeklySeries, categorySplit } from "../../data/mockData.js";

export default function NgoImpact() {
  useDocumentTitle("Impact reports");
  const [range, setRange] = useState("6m");

  return (
    <>
      <PageHead
        eyebrow="NGO workspace"
        title="Impact reports"
        sub="Verified distribution numbers you can share with funders, CSR partners and district authorities."
        actions={
          <>
            <SegmentedControl ariaLabel="Period" value={range} onChange={setRange}
              options={[{ value: "1m", label: "This month" }, { value: "6m", label: "6 months" }, { value: "1y", label: "1 year" }]} />
            <Button variant="primary" icon="download">Download report</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        <Stat label="Meals received" value="4,180" icon="bowl" trend={{ dir: "up", value: "8%" }} foot="this month" />
        <Stat label="People served" value="2,940" icon="users" trend={{ dir: "up", value: "5%" }} foot="unique beneficiaries" />
        <Stat label="Partner donors" value={18} icon="store" foot="6 active weekly" />
        <Stat label="Food collected" value="1,340" unit="kg" icon="package" foot="diverted from waste" />
      </div>

      <div className="grid grid--sidebar">
        <div className="stack g5">
          <Card>
            <CardHead title="Meals received" desc="Verified distribution records, by month" action={<Badge tone="success" dot>Verified</Badge>} />
            <CardBody>
              <AreaChart data={monthlySeries} valueKey="meals" height={220} ariaLabel="Meals received per month" />
            </CardBody>
          </Card>

          <div className="grid grid--2">
            <Card>
              <CardHead title="Daily serving volume" desc="Last 7 days" />
              <CardBody><BarChart data={weeklySeries} valueKey="meals" height={170} ariaLabel="Daily meals served" /></CardBody>
            </Card>
            <Card>
              <CardHead title="Food mix" desc="By category" />
              <CardBody><Donut data={categorySplit} size={130} centerValue="4,180" centerLabel="meals" /></CardBody>
            </Card>
          </div>

          <Card>
            <CardHead title="Beneficiary groups" desc="Who was served this quarter" action={<Button variant="quiet" size="sm" icon="download">CSV</Button>} />
            <Table
              rows={[
                { group: "Daily-wage workers", meals: 1620, points: 3, share: "39%" },
                { group: "Children (school meals)", meals: 980, points: 2, share: "23%" },
                { group: "Elderly residents", meals: 720, points: 1, share: "17%" },
                { group: "Night-shelter residents", meals: 540, points: 2, share: "13%" },
                { group: "Street distribution", meals: 320, points: 4, share: "8%" },
              ]}
              rowKey="group"
              columns={[
                { key: "group", header: "Group", render: (r) => <span className="table__primary">{r.group}</span> },
                { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular">{r.meals.toLocaleString("en-IN")}</span> },
                { key: "points", header: "Distribution points", align: "right" },
                { key: "share", header: "Share", align: "right" },
              ]}
            />
          </Card>
        </div>

        <div className="stack g5">
          <Card>
            <CardHead title="Reliability" desc="Your score out of 100" />
            <CardBody>
              <div style={{ fontSize: "var(--fs-38)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--green-700)" }}>97</div>
              <KV rows={[["Accepted donations", "142"], ["Collected on time", "139"], ["Cancelled after accepting", "3"], ["Records filed within 24h", "96%"]]} />
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Top donors" desc="By meals received" />
            <CardBody>
              <HBars data={[
                { label: "Rawat Mishthan Bhandar", value: 1820 },
                { label: "Suvarna Mahal", value: 1240 },
                { label: "Spice Court", value: 720 },
                { label: "Laxmi Mishthan Bhandar", value: 400 },
              ]} suffix=" meals" />
            </CardBody>
          </Card>

          <Alert tone="info" title="Prototype data">
            All figures on this screen are fictional sample data used to demonstrate the reporting layout.
          </Alert>
        </div>
      </div>
    </>
  );
}
