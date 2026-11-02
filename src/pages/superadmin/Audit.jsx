import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, Table, SearchInput, Chips, Modal, KV, Alert, Stat, SegmentedControl,
} from "../../components/ui/index.jsx";
import { useDocumentTitle } from "../../data/store.jsx";
import { auditLogs } from "../../data/mockData.js";

export default function SuperAdminAudit() {
  useDocumentTitle("Audit logs");
  const [q, setQ] = useState("");
  const [actor, setActor] = useState("all");
  const [open, setOpen] = useState(null);

  const rows = auditLogs
    .filter((l) => (actor === "all" ? true : actor === "system" ? l.role === "Automation" : l.role !== "Automation"))
    .filter((l) => `${l.actor} ${l.action} ${l.target}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Super admin"
        title="Audit logs"
        sub="Every privileged action on the platform — who did what, to which record, from where. Immutable and retained for seven years."
        actions={<>
          <Button variant="quiet" icon="download">Export logs</Button>
          <Button variant="quiet" icon="filter">Advanced filter</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Entries today" value={38} icon="database" foot="across 4 actors" />
        <Stat label="Privileged actions" value={184} icon="key" foot="last 30 days" />
        <Stat label="Automated events" value={912} icon="cpu" foot="expiry & reminders" />
        <Stat label="Retention" value="7" unit="years" icon="lock" foot="immutable storage" />
      </div>

      <Alert tone="info" title="Logs cannot be edited or deleted">
        Records are append-only. Exporting a log set creates its own audit entry, so the register is
        self-documenting.
      </Alert>

      <Card className="mt5">
        <CardHead title="Audit register" desc={`${rows.length} entries`}
          action={<div className="row g2"><div style={{ width: 240 }}><SearchInput value={q} onChange={setQ} placeholder="Search actor, action, target…" /></div></div>} />
        <div style={{ padding: "0 20px" }}>
          <Chips value={actor} onChange={setActor} items={[
            { value: "all", label: "All actors" }, { value: "human", label: "Administrators" }, { value: "system", label: "Automation" },
          ]} />
        </div>
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          columns={[
            { key: "time", header: "Timestamp", render: (r) => <span className="mono text-sm">{r.time}</span> },
            {
              key: "actor", header: "Actor", render: (r) => (
                <div><div className="table__primary">{r.actor}</div><div className="table__sub">{r.role}</div></div>
              ),
            },
            { key: "action", header: "Action", render: (r) => <span className="text-md">{r.action}</span> },
            { key: "target", header: "Target", render: (r) => <span className="text-md muted">{r.target}</span> },
            { key: "ip", header: "Source", render: (r) => <span className="mono text-sm muted">{r.ip}</span> },
            { key: "a", header: "", align: "right", render: (r) => <Button variant="ghost" size="sm" icon="eye" aria-label="Inspect" onClick={() => setOpen(r)} /> },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        title="Audit entry"
        desc={open?.id || ""}
        footer={<Button variant="primary" onClick={() => setOpen(null)}>Close</Button>}
      >
        {open && (
          <div className="stack g5">
            <KV rows={[["Timestamp", open.time], ["Actor", `${open.actor} · ${open.role}`], ["Action", open.action], ["Target", open.target], ["Source IP", open.ip], ["Entry ID", open.id]]} />
            <div>
              <div className="ds-label">Payload</div>
              <pre className="mono text-sm" style={{ background: "var(--canvas)", padding: 12, borderRadius: 8, overflowX: "auto", margin: 0, lineHeight: 1.6 }}>
{JSON.stringify({ previous: "6", next: "5", scope: "platform", reason: "safety review" }, null, 2)}
              </pre>
            </div>
            <Alert tone="info" title="Verification">
              Each entry includes a hash chain linking it to the previous record, so tampering is detectable.
            </Alert>
          </div>
        )}
      </Modal>
    </>
  );
}
