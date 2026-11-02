import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, SearchInput, Chips, Table,
  EmptyState, Modal, Alert, KV, Field, Select, Timeline, Stat,
} from "../../components/ui/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { require_status } from "../../components/DonationCard.jsx";

/* ============================================================
   DONATION MONITORING — every donation on the platform
   ============================================================ */
export default function AdminDonations() {
  useDocumentTitle("Donation monitoring");
  const { donations, toast } = useApp();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(null);

  const rows = donations
    .filter((d) => (status === "all" ? true : status === "live" ? ["published", "accepted", "assigned", "picked_up"].includes(d.status) : status === "problem" ? ["expired", "rejected", "cancelled"].includes(d.status) : d.status === status))
    .filter((d) => `${d.id} ${d.title} ${d.donor} ${d.ngo || ""}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Admin console"
        title="Donation monitoring"
        sub="Every donation in the city, live. Intervene when food is at risk — expired listings, late pickups and safety flags surface first."
        actions={<>
          <Button variant="quiet" icon="download">Export</Button>
          <Button variant="quiet" icon="refresh" onClick={() => toast("Refreshed", "Live feed is up to date.", "success")}>Refresh</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Live now" value={donations.filter((d) => ["published", "accepted", "assigned", "picked_up"].includes(d.status)).length} icon="activity" />
        <Stat label="At risk (expiring < 2h)" value={2} icon="clock" foot="published, unaccepted" />
        <Stat label="Meals in motion" value="520" icon="truck" foot="14 active runs" />
        <Stat label="Failed today" value={1} icon="xCircle" foot="expired before acceptance" />
      </div>

      <Card>
        <CardBody tight>
          <div className="row g3 wrap">
            <div className="grow" style={{ minWidth: 220 }}><SearchInput value={q} onChange={setQ} placeholder="Search ID, food, donor or NGO…" /></div>
            <Chips value={status} onChange={setStatus} items={[
              { value: "all", label: "All", count: donations.length },
              { value: "live", label: "Live" },
              { value: "published", label: "Awaiting NGO" },
              { value: "picked_up", label: "In transit" },
              { value: "problem", label: "Problem" },
            ]} />
          </div>
        </CardBody>
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          empty={<EmptyState icon="search" title="No donations match" desc="Try clearing the filters." />}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
            { key: "title", header: "Donation", render: (r) => <div><div className="table__primary">{r.title}</div><div className="table__sub">{r.category} · {r.pickup.area}</div></div> },
            { key: "donor", header: "Donor", render: (r) => <span className="text-md">{r.donor}</span> },
            { key: "ngo", header: "NGO", render: (r) => r.ngo || <span className="faint">Awaiting</span> },
            { key: "servings", header: "Servings", align: "right", render: (r) => <span className="tabular fw-semi">{r.servings}</span> },
            { key: "expires", header: "Safe until", render: (r) => <span className="text-md">{r.expires.slice(11)}</span> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={require_status(r.status)} /> },
            { key: "actions", header: "", align: "right", render: (r) => <Button variant="ghost" size="sm" icon="eye" aria-label="Inspect" onClick={() => setOpen(r)} /> },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        size="lg"
        title={open?.title || ""}
        desc={open ? `${open.id} · ${open.donor}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>Close</Button>
            <Button variant="quiet" icon="flag" onClick={() => toast("Flagged for review", "Added to the trust & safety worklist.", "success")}>Flag</Button>
            <Button variant="danger-ghost" icon="slash" onClick={() => toast("Donation suspended", "Donor and NGO notified. This is logged in the audit trail.", "error")}>Suspend</Button>
          </>
        }
      >
        {open && (
          <div className="stack g5">
            <div className="row g3 wrap">
              <StatusBadge status={require_status(open.status)} lg />
              <Badge tone="neutral" lg>{open.servings} servings</Badge>
              <Badge tone={open.urgency === "critical" ? "danger" : "neutral"} lg>Expires {open.expires.slice(11)}</Badge>
            </div>
            <KV rows={[
              ["Donor", `${open.donor} · verified`],
              ["NGO", open.ngo || "Not accepted"],
              ["Volunteer", open.volunteer || "Not assigned"],
              ["Prepared", open.prepared.replace("T", " · ")],
              ["Storage declared", open.storage],
              ["Allergens", open.allergens.join(", ") || "None"],
              ["Pickup window", `${open.window.start.slice(11)} – ${open.window.end.slice(11)}`],
            ]} />
            <div>
              <div className="ds-label">Audit trail</div>
              <Timeline items={[
                { title: "Created by donor", meta: `${open.createdAt.replace("T", " · ")}`, state: "done", icon: "check" },
                { title: "Published to nearby NGOs", meta: "4 NGOs notified", state: "done", icon: "inbox" },
                open.ngo ? { title: `Accepted by ${open.ngo}`, meta: "Within 9 minutes", state: "done", icon: "check" } : { title: "No NGO acceptance", meta: "2 hours since publication", state: "current", icon: "clock" },
                open.volunteer ? { title: `Volunteer assigned · ${open.volunteer}`, meta: "Pickup OTP issued", state: "done", icon: "users" } : { title: "No volunteer", meta: "—", state: "pending", icon: "users" },
              ]} />
            </div>
            <Alert tone="warning" title="Intervention guidance">
              Only suspend a donation if there is a credible safety concern. For slow NGO response, prefer
              widening the radius or notifying more NGOs — suspension loses the food entirely.
            </Alert>
          </div>
        )}
      </Modal>
    </>
  );
}
