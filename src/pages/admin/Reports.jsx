import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import { Button, Card, CardBody, CardHead, Badge, Table, Field, Select, Alert, CheckRow, Stat } from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";

const reportTypes = [
  { id: "monthly", title: "Monthly impact report", desc: "Meals rescued, beneficiaries, CO₂e avoided and partner performance.", icon: "barChart", freq: "Monthly · 1st" },
  { id: "safety", title: "Food safety register", desc: "All incidents, declarations and temperature logs for the period.", icon: "shield", freq: "On demand" },
  { id: "donor", title: "Donor compliance report", desc: "Per-donor volumes with FSSAI validity — for municipal submission.", icon: "store", freq: "Quarterly" },
  { id: "ngo", title: "NGO distribution audit", desc: "Distribution records with photo proof and verification status.", icon: "handHeart", freq: "Quarterly" },
  { id: "volunteer", title: "Volunteer activity report", desc: "Runs completed, on-time rate and distance covered.", icon: "truck", freq: "Monthly" },
  { id: "csr", title: "CSR / 80G package", desc: "Donor-wise certificates with verified distribution evidence.", icon: "file", freq: "On demand" },
];

export default function AdminReports() {
  useDocumentTitle("Reports");
  const { toast } = useApp();
  const [from, setFrom] = useState("2026-10-01");
  const [to, setTo] = useState("2026-10-30");
  const [fmt, setFmt] = useState("pdf");

  return (
    <>
      <PageHead
        eyebrow="Admin console"
        title="Reports"
        sub="Generate, schedule and download the reporting packs required by donors, NGOs and district authorities."
        actions={<Button variant="primary" icon="download" onClick={() => toast("Report generating", "You will be notified when it is ready. Prototype only.", "success")}>Generate report</Button>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Reports generated" value={42} icon="file" foot="this month" />
        <Stat label="Scheduled" value={6} icon="calendar" foot="automatic delivery" />
        <Stat label="Recipients" value={18} icon="mail" foot="institutions & partners" />
        <Stat label="Last export" value="2h" unit="ago" icon="download" foot="monthly impact" />
      </div>

      <Card className="mb5">
        <CardHead title="Build a report" desc="Choose a period and format" />
        <CardBody>
          <div className="grid grid--4">
            <Field label="From" htmlFor="rf"><input id="rf" type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} /></Field>
            <Field label="To" htmlFor="rt"><input id="rt" type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} /></Field>
            <Field label="Format" htmlFor="rfm"><Select id="rfm" value={fmt} onChange={(e) => setFmt(e.target.value)} options={[{ value: "pdf", label: "PDF (presentation)" }, { value: "xlsx", label: "Excel (raw data)" }, { value: "csv", label: "CSV" }]} /></Field>
            <Field label="Scope" htmlFor="rs"><Select id="rs" options={["All areas", "Bani Park", "Malviya Nagar", "C-Scheme", "Vaishali Nagar"]} /></Field>
          </div>
          <div className="row g3 mt4 wrap">
            <CheckRow id="v1" checked onChange={() => {}} title="Include beneficiary breakdown" />
            <CheckRow id="v2" checked onChange={() => {}} title="Include CO₂e calculation" />
            <CheckRow id="v3" checked={false} onChange={() => {}} title="Include personally identifiable data" />
          </div>
        </CardBody>
      </Card>

      <div className="grid grid--3">
        {reportTypes.map((r) => (
          <Card key={r.id}>
            <CardBody>
              <div className="row between mb3">
                <span className="stat__icon" style={{ width: 38, height: 38 }}><Icon name={r.icon} size={18} /></span>
                <Badge tone="neutral">{r.freq}</Badge>
              </div>
              <div className="text-base fw-semi ink">{r.title}</div>
              <p className="text-md muted mt1" style={{ lineHeight: 1.5 }}>{r.desc}</p>
              <div className="row g2 mt4">
                <Button variant="secondary" size="sm" icon="download" onClick={() => toast("Preparing download", `${r.title} · ${fmt.toUpperCase()}`, "success")}>Download</Button>
                <Button variant="ghost" size="sm" icon="calendar" onClick={() => toast("Schedule set", "You will receive this report automatically.", "success")}>Schedule</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt5">
        <CardHead title="Recent exports" desc="Audit-logged for compliance" />
        <Table
          rows={[
            { id: "RPT-118", name: "Monthly impact report", period: "Sep 2026", by: "Meera Iyer", at: "2026-10-01 09:12", fmt: "PDF", size: "1.8 MB" },
            { id: "RPT-117", name: "Food safety register", period: "Q3 2026", by: "Meera Iyer", at: "2026-09-30 18:04", fmt: "XLSX", size: "640 KB" },
            { id: "RPT-116", name: "CSR / 80G package", period: "Sep 2026", by: "Arjun Nair", at: "2026-09-28 11:20", fmt: "PDF", size: "3.2 MB" },
          ]}
          rowKey="id"
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
            { key: "name", header: "Report", render: (r) => <span className="table__primary">{r.name}</span> },
            { key: "period", header: "Period" },
            { key: "by", header: "Generated by" },
            { key: "at", header: "When" },
            { key: "fmt", header: "Format" },
            { key: "size", header: "Size", align: "right" },
            { key: "a", header: "", align: "right", render: () => <Button variant="ghost" size="sm" icon="download" aria-label="Download" /> },
          ]}
        />
      </Card>
    </>
  );
}
