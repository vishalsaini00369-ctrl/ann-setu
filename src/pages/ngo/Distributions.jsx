import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Table, Modal, Field, Input,
  Select, Textarea, Alert, Stat, EmptyState,
} from "../../components/ui/index.jsx";
import { AreaChart } from "../../components/charts/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { distributions as seed, weeklySeries } from "../../data/mockData.js";

/* ============================================================
   DISTRIBUTION RECORDS — proof that food reached people
   This is the record that generates donor impact reports.
   ============================================================ */
export default function NgoDistributions() {
  useDocumentTitle("Distribution records");
  const { toast } = useApp();
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ donation: "", meals: "", location: "", beneficiaries: "", notes: "", photo: false });
  const [err, setErr] = useState({});

  const save = () => {
    const e = {};
    if (!f.donation) e.donation = "Select the donation this record belongs to.";
    if (!f.meals) e.meals = "Enter how many meals were served.";
    if (!f.location.trim()) e.location = "Where were the meals served?";
    setErr(e);
    if (Object.keys(e).length) return;
    setRows((r) => [{ id: `dist-${r.length + 1}`, donationId: f.donation, date: "2026-10-30", meals: Number(f.meals), location: f.location, beneficiaries: f.beneficiaries || "Mixed", volunteer: "Kabir Sharma", status: "pending-review" }, ...r]);
    setOpen(false);
    toast("Distribution recorded", "Pending administrator review. The donor has been notified.", "success");
  };

  return (
    <>
      <PageHead
        eyebrow="NGO operations"
        title="Distribution records"
        sub="Every record here becomes the verified impact figure a donor sees. Please file within 24 hours of serving."
        actions={<Button variant="primary" icon="plus" onClick={() => setOpen(true)}>Record a distribution</Button>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Meals served" value="4,180" icon="bowl" trend={{ dir: "up", value: "8%" }} foot="this month" />
        <Stat label="Distribution points" value={6} icon="mapPin" foot="3 active today" />
        <Stat label="Beneficiaries" value="2,940" icon="users" foot="unique this month" />
        <Stat label="Records pending review" value={rows.filter((r) => r.status === "pending-review").length} icon="clock" foot="filed in last 24h" />
      </div>

      <div className="grid grid--sidebar">
        <Card>
          <CardHead title="All records" desc={`${rows.length} filings · prototype data`} action={<Button variant="quiet" size="sm" icon="download">Export</Button>} />
          <Table
            rows={rows}
            rowKey="id"
            empty={<EmptyState icon="clip" title="No distribution records yet" desc="Record your first distribution to start building donor impact reports." />}
            columns={[
              { key: "date", header: "Date", render: (r) => <span className="text-md">{r.date}</span> },
              { key: "donationId", header: "Donation", render: (r) => <span className="mono text-sm muted">{r.donationId}</span> },
              { key: "location", header: "Distribution point", render: (r) => <span className="table__primary">{r.location}</span> },
              { key: "meals", header: "Meals", align: "right", render: (r) => <span className="tabular fw-semi">{r.meals}</span> },
              { key: "beneficiaries", header: "Beneficiaries" },
              { key: "volunteer", header: "Volunteer" },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "verified" ? "Verified" : "Review"} /> },
            ]}
          />
        </Card>

        <div className="stack g5">
          <Card>
            <CardHead title="Meals served" desc="Last 7 days" />
            <CardBody>
              <AreaChart data={weeklySeries} valueKey="meals" height={150} ariaLabel="Meals served per day" />
            </CardBody>
          </Card>
          <Alert tone="info" title="Why filing matters">
            Donors cannot claim CSR or tax benefits without a verified distribution record. Unfiled
            distributions also hide your real impact from funders.
          </Alert>
          <Card>
            <CardBody>
              <div className="ds-label">Record quality</div>
              <div className="kv">
                <div className="kv__row"><span className="kv__k">Filed within 24h</span><span className="kv__v">96%</span></div>
                <div className="kv__row"><span className="kv__k">Photo attached</span><span className="kv__v">88%</span></div>
                <div className="kv__row"><span className="kv__k">Admin verified</span><span className="kv__v">92%</span></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Record a distribution"
        desc="This becomes a verified impact record once reviewed."
        size="lg"
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} icon="checkCircle">Submit record</Button>
          </>
        }
      >
        <div className="stack g4">
          <div className="grid grid--2">
            <Field label="Donation" htmlFor="don" required error={err.donation}>
              <Select id="don" value={f.donation} onChange={(e) => setF((p) => ({ ...p, donation: e.target.value }))} placeholder="Select donation"
                options={["AS-2026-1039", "AS-2026-1038", "AS-2026-1036", "AS-2026-1034"]} />
            </Field>
            <Field label="Meals served" htmlFor="m" required error={err.meals}>
              <Input id="m" inputMode="numeric" value={f.meals} onChange={(e) => setF((p) => ({ ...p, meals: e.target.value }))} placeholder="90" />
            </Field>
          </div>
          <Field label="Distribution point" htmlFor="loc" required error={err.location}>
            <Input id="loc" value={f.location} onChange={(e) => setF((p) => ({ ...p, location: e.target.value }))} placeholder="e.g. Civil Lines night shelter" />
          </Field>
          <Field label="Beneficiaries" htmlFor="ben" optional hint="Group and approximate number, e.g. “Adults, 60”.">
            <Input id="ben" value={f.beneficiaries} onChange={(e) => setF((p) => ({ ...p, beneficiaries: e.target.value }))} placeholder="Adults, 60" />
          </Field>
          <Field label="Notes" htmlFor="nn" optional>
            <Textarea id="nn" value={f.notes} onChange={(e) => setF((p) => ({ ...p, notes: e.target.value }))} placeholder="Anything noteworthy — spoilage, shortfall, extra demand…" />
          </Field>
          <button type="button" className="check" onClick={() => setF((p) => ({ ...p, photo: true }))} style={{ width: "100%" }}>
            <span className="stat__icon" style={{ width: 32, height: 32 }}><Icon name={f.photo ? "checkCircle" : "camera"} size={16} /></span>
            <span className="check__text" style={{ textAlign: "left" }}>
              <span className="check__title">{f.photo ? "distribution-3010.jpg attached" : "Attach a photo of the distribution"}</span>
              <span className="check__desc">Helps verification and prevents disputes.</span>
            </span>
            <Badge tone={f.photo ? "success" : "neutral"}>{f.photo ? "Attached" : "Add"}</Badge>
          </button>
        </div>
      </Modal>
    </>
  );
}
