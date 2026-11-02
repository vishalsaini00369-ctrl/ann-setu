import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Table, SearchInput, Tabs,
  Modal, Alert, KV, Field, Textarea, EmptyState, Stat, SegmentedControl, Progress,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { complaints, incidents, auditLogs } from "../../data/mockData.js";

/* ============ COMPLAINTS ================================== */
export function AdminComplaints() {
  useDocumentTitle("Complaints");
  const { toast } = useApp();
  const [tab, setTab] = useState("open");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const rows = complaints
    .filter((c) => (tab === "open" ? c.status !== "resolved" : c.status === "resolved"))
    .filter((c) => `${c.id} ${c.raisedBy} ${c.against} ${c.subject}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Trust & safety"
        title="Complaints"
        sub="Disputes raised by donors, NGOs and volunteers. Anything with a safety implication must be resolved within 24 hours."
        actions={<Button variant="quiet" icon="download">Export</Button>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Open" value={complaints.filter((c) => c.status !== "resolved").length} icon="message" foot="1 breaching SLA" />
        <Stat label="Avg. resolution" value="11" unit="hrs" icon="clock" trend={{ dir: "down", value: "-2" }} foot="vs last month" />
        <Stat label="Resolved this month" value={28} icon="checkCircle" foot="92% within SLA" />
        <Stat label="Escalated" value={1} icon="flag" foot="awaiting super admin" />
      </div>

      <Card>
        <CardHead
          title="Complaint register"
          action={<div className="row g2"><div style={{ width: 220 }}><SearchInput value={q} onChange={setQ} placeholder="Search complaints…" /></div><Button variant="quiet" size="sm" icon="filter">Filters</Button></div>}
        />
        <div style={{ padding: "0 20px" }}>
          <Tabs value={tab} onChange={setTab} items={[{ value: "open", label: "Open", count: complaints.filter((c) => c.status !== "resolved").length }, { value: "resolved", label: "Resolved" }]} />
        </div>
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          empty={<EmptyState icon="checkCircle" title="No complaints here" desc="All complaints in this view have been resolved." />}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
            { key: "subject", header: "Complaint", render: (r) => <div><div className="table__primary">{r.subject}</div><div className="table__sub">{r.raisedBy} ({r.role}) → {r.against}</div></div> },
            { key: "opened", header: "Opened", render: (r) => <span className="text-md">{r.opened}</span> },
            { key: "severity", header: "Severity", render: (r) => <StatusBadge status={r.severity === "high" ? "High" : r.severity === "medium" ? "Medium" : "Low"} /> },
            { key: "sla", header: "SLA", render: (r) => <span className={r.sla === "closed" ? "faint" : r.sla.includes("h") ? "danger fw-semi text-md" : "text-md"}>{r.sla}</span> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "investigating" ? "Investigating" : r.status === "open" ? "Open" : "Resolved"} /> },
            { key: "actions", header: "", align: "right", render: (r) => <Button variant="ghost" size="sm" icon="chevronRight" aria-label="Open" onClick={() => setOpen(r)} /> },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        size="lg"
        title={open?.subject || ""}
        desc={open ? `${open.id} · raised by ${open.raisedBy} (${open.role})` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>Close</Button>
            <Button variant="quiet" icon="message" onClick={() => toast("Message sent", "Both parties notified.", "success")}>Ask for details</Button>
            <Button variant="primary" icon="checkCircle" onClick={() => { toast("Complaint resolved", "Resolution recorded in the audit log.", "success"); setOpen(null); }}>Resolve</Button>
          </>
        }
      >
        {open && (
          <div className="stack g5">
            <div className="row g3 wrap">
              <StatusBadge status={open.severity === "high" ? "High" : open.severity === "medium" ? "Medium" : "Low"} lg />
              <Badge tone="neutral" lg>{open.status}</Badge>
              <Badge tone={open.sla.includes("h") ? "danger" : "neutral"} lg>SLA {open.sla}</Badge>
            </div>
            <KV rows={[["Raised by", `${open.raisedBy} · ${open.role}`], ["Against", open.against], ["Opened", open.opened], ["Category", "Service quality"], ["Related donation", "AS-2026-1040"]]} />
            <div>
              <div className="ds-label">Statement</div>
              <p className="text-md" style={{ lineHeight: 1.6, color: "var(--ink-700)" }}>
                “Our volunteer reached the venue at the agreed time but the food was not ready for another
                40 minutes. By the time we served it, we were outside the safe window for the last 30
                servings. We had to discard part of the lot.”
              </p>
            </div>
            <Field label="Resolution note" htmlFor="cn" hint="Shared with both parties.">
              <Textarea id="cn" placeholder="What was agreed and what will change?" />
            </Field>
            <Alert tone="warning" title="Recurrence">
              This is the second late-pickup complaint against this donor in 30 days. A third triggers an
              automatic review of their account.
            </Alert>
          </div>
        )}
      </Modal>
    </>
  );
}

/* ============ INCIDENTS =================================== */
export function AdminIncidents() {
  useDocumentTitle("Food safety incidents");
  const { toast } = useApp();
  const [open, setOpen] = useState(null);
  const [view, setView] = useState("all");

  const rows = incidents.filter((i) => (view === "all" ? true : i.status !== "closed"));

  return (
    <>
      <PageHead
        eyebrow="Trust & safety"
        title="Food safety incidents"
        sub="Any report of unsafe food, temperature breach or allergen mismatch. These records are retained for audit and reported to the donor's file."
        actions={<Button variant="primary" icon="plus" onClick={() => toast("Incident report opened", "Prototype only.", "success")}>Report an incident</Button>}
      />

      <Alert tone="danger" title="1 high-severity incident open">
        AS-2026-1021 · allergen mismatch reported by Feeding Jaipur Foundation. A label audit is in progress
        and the donor has been notified. Response due within 4 hours.
      </Alert>

      <div className="grid grid--4 mb5 mt5">
        <Stat label="Open incidents" value={incidents.filter((i) => i.status !== "closed").length} icon="shieldAlert" foot="1 high severity" />
        <Stat label="Closed this month" value={11} icon="checkCircle" foot="avg 8 hours to close" />
        <Stat label="Donors counselled" value={6} icon="message" foot="safety education sent" />
        <Stat label="Repeat offenders" value={1} icon="alert" foot="3+ incidents in 90 days" />
      </div>

      <Card>
        <CardHead title="Incident register" desc={`${rows.length} records`}
          action={<SegmentedControl ariaLabel="Filter" value={view} onChange={setView} options={[{ value: "all", label: "All" }, { value: "open", label: "Open" }]} />} />
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
            { key: "type", header: "Incident", render: (r) => <div><div className="table__primary">{r.type}</div><div className="table__sub">{r.area}</div></div> },
            { key: "donation", header: "Donation", render: (r) => <span className="mono text-sm">{r.donation}</span> },
            { key: "reported", header: "Reported" },
            { key: "severity", header: "Severity", render: (r) => <StatusBadge status={r.severity === "high" ? "High" : r.severity === "medium" ? "Medium" : "Low"} /> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "closed" ? "Closed" : "Review"} /> },
            { key: "action", header: "Action taken", render: (r) => <span className="text-md muted">{r.action}</span> },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        title={open?.type || ""}
        desc={open ? `${open.id} · ${open.donation}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>Close</Button>
            <Button variant="primary" icon="checkCircle" onClick={() => { toast("Incident closed", "Record retained for audit.", "success"); setOpen(null); }}>Close incident</Button>
          </>
        }
      >
        {open && (
          <div className="stack g5">
            <KV rows={[["Severity", open.severity], ["Area", open.area], ["Reported", open.reported], ["Status", open.status], ["Action taken", open.action]]} />
            <Field label="Investigation notes" htmlFor="in" optional>
              <Textarea id="in" placeholder="What was checked, who was spoken to, what was decided." />
            </Field>
            <Alert tone="info" title="Food safety policy">
              Any incident involving illness triggers an immediate 30-day suspension of the donor's listing
              rights, pending a hygiene inspection.
            </Alert>
          </div>
        )}
      </Modal>
    </>
  );
}
