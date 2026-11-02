import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Stat, Table, StatusBadge, SegmentedControl, EmptyState, Badge } from "../../components/ui/index.jsx";
import { Sparkline, BarChart } from "../../components/charts/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";

export default function VolunteerHistory() {
  useDocumentTitle("Assignment history");
  const { history } = useApp();
  const [range, setRange] = useState("30");

  return (
    <>
      <PageHead
        eyebrow="Volunteer workspace"
        title="Assignment history"
        sub="Every run you completed, with distance, time and the NGO's rating."
        actions={<>
          <SegmentedControl ariaLabel="Period" value={range} onChange={setRange}
            options={[{ value: "7", label: "7 days" }, { value: "30", label: "30 days" }, { value: "all", label: "All time" }]} />
          <Button variant="quiet" icon="download">Export</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Completed runs" value={history.length} icon="checkCircle" foot="this month" />
        <Stat label="Meals delivered" value={history.reduce((s, h) => s + h.servings, 0).toLocaleString("en-IN")} icon="bowl" foot="across all runs" />
        <Stat label="Distance" value={history.reduce((s, h) => s + h.km, 0).toFixed(1)} unit="km" icon="navigation" foot="total travelled" />
        <Stat label="Avg. rating" value="4.9" icon="star" foot="from 58 ratings" />
      </div>

      <div className="grid grid--sidebar">
        <Card>
          <CardHead title="Runs" desc={`${history.length} records`} action={<Badge tone="neutral">Prototype data</Badge>} />
          <Table
            rows={history}
            rowKey="id"
            empty={<EmptyState icon="history" title="No completed runs yet" desc="Once you confirm a delivery it will appear here." />}
            columns={[
              { key: "date", header: "Date", render: (r) => <span className="text-md">{r.date}</span> },
              { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
              { key: "donor", header: "From → To", render: (r) => <div><div className="table__primary">{r.donor}</div><div className="table__sub">{r.ngo}</div></div> },
              { key: "servings", header: "Meals", align: "right", render: (r) => <span className="tabular fw-semi">{r.servings}</span> },
              { key: "km", header: "Distance", align: "right", render: (r) => <span className="tabular">{r.km} km</span> },
              { key: "minutes", header: "Time", align: "right", render: (r) => <span className="tabular">{r.minutes} min</span> },
              { key: "rating", header: "Rating", align: "right", render: (r) => <span className="tabular">{r.rating} ★</span> },
              { key: "status", header: "Status", render: () => <StatusBadge status="Delivered" /> },
            ]}
          />
        </Card>

        <div className="stack g5">
          <Card>
            <CardHead title="Runs per week" />
            <CardBody>
              <BarChart data={[{ label: "W1", meals: 4 }, { label: "W2", meals: 6 }, { label: "W3", meals: 5 }, { label: "W4", meals: 8 }]} valueKey="meals" height={140} ariaLabel="Runs per week" />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="ds-label">Recognition</div>
              <div className="row g3 mb3">
                <span className="stat__icon" style={{ width: 40, height: 40, background: "var(--green-600)", color: "#fff" }}><Icon name="award" size={18} /></span>
                <div>
                  <div className="text-base fw-semi ink">Silver Hero</div>
                  <div className="text-xs muted">62 lifetime pickups</div>
                </div>
              </div>
              <p className="text-md muted" style={{ lineHeight: 1.55 }}>
                Volunteers with 90%+ on-time delivery for three months receive priority route selection.
              </p>
              <div className="row g2 mt3"><Sparkline values={[3, 5, 4, 6, 5, 7, 8]} /></div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
