import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Table, SearchInput, Chips,
  Modal, KV, Alert, Field, Select, Textarea, Stat, Tabs, Avatar, EmptyState,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { platformUsers } from "../../data/mockData.js";

export default function SuperAdminUsers() {
  useDocumentTitle("User management");
  const { toast } = useApp();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [open, setOpen] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const rows = platformUsers
    .filter((u) => (role === "all" ? true : u.role.toLowerCase() === role))
    .filter((u) => `${u.name} ${u.area} ${u.role}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Super admin"
        title="User management"
        sub="Every account on the platform. Suspending an account removes its ability to donate, accept or deliver immediately."
        actions={<>
          <Button variant="quiet" icon="download">Export users</Button>
          <Button variant="primary" icon="plus" onClick={() => toast("Invite sent", "An invitation link would be emailed. Prototype only.", "success")}>Invite user</Button>
        </>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Total users" value="8,420" icon="users" trend={{ dir: "up", value: "+312" }} foot="this month" />
        <Stat label="Donors" value="612" icon="store" foot="40 pending verification" />
        <Stat label="Volunteers" value="1,930" icon="truck" foot="412 active this month" />
        <Stat label="Suspended" value="14" icon="slash" foot="0 in last 7 days" />
      </div>

      <Card>
        <CardHead title="All users" desc={`${rows.length} of ${platformUsers.length} shown`}
          action={<div style={{ width: 240 }}><SearchInput value={q} onChange={setQ} placeholder="Search name or area…" /></div>} />
        <div style={{ padding: "0 20px" }}>
          <Chips value={role} onChange={setRole} items={[
            { value: "all", label: "All roles" }, { value: "donor", label: "Donors" },
            { value: "ngo", label: "NGOs" }, { value: "volunteer", label: "Volunteers" },
          ]} />
        </div>
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          empty={<EmptyState icon="search" title="No users match" desc="Try a different search or role filter." />}
          columns={[
            {
              key: "name", header: "Name", render: (r) => (
                <div className="row g3">
                  <Avatar initials={r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")} size="sm" />
                  <div><div className="table__primary">{r.name}</div><div className="table__sub">{r.area}</div></div>
                </div>
              ),
            },
            { key: "role", header: "Role", render: (r) => <Badge tone={r.role === "Donor" ? "success" : r.role === "NGO" ? "info" : "neutral"}>{r.role}</Badge> },
            { key: "joined", header: "Joined" },
            { key: "donations", header: "Records", align: "right", render: (r) => <span className="tabular">{r.donations || "—"}</span> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "active" ? "Active" : r.status === "suspended" ? "Suspended" : r.status === "review" ? "Review" : "Pending"} /> },
            { key: "a", header: "", align: "right", render: (r) => <Button variant="ghost" size="sm" icon="more" aria-label="Actions" onClick={() => setOpen(r)} /> },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        title={open?.name || ""}
        desc={open ? `${open.role} · ${open.area} · joined ${open.joined}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>Close</Button>
            <Button variant="danger-ghost" icon="slash" onClick={() => { setConfirm(open); setOpen(null); }}>Suspend account</Button>
          </>
        }
      >
        {open && (
          <div className="stack g5">
            <KV rows={[
              ["Account ID", open.id],
              ["Role", open.role],
              ["Status", open.status],
              ["Records", open.donations || "—"],
              ["Phone", "+91 98290 1••••"],
              ["Last active", "2 hours ago"],
            ]} />
            <Field label="Internal note" htmlFor="un" optional>
              <Textarea id="un" placeholder="Visible to administrators only." />
            </Field>
            <Alert tone="info" title="Suspension vs deletion">
              Suspension is reversible and preserves records for auditing. Deletion is only possible after a
              24-month retention period, per platform policy.
            </Alert>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title="Suspend this account?"
        desc={confirm ? `${confirm.name} will lose access immediately.` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { setConfirm(null); toast("Account suspended", "Reason logged. The user has been notified.", "error"); }}>Suspend</Button>
          </>
        }
      >
        <div className="stack g4">
          <Field label="Reason" htmlFor="sr" required>
            <Select id="sr" placeholder="Select a reason"
              options={["Food safety violation", "Repeated non-collection", "Fraudulent donation record", "Abusive behaviour", "Duplicate account", "Other"]} />
          </Field>
          <Alert tone="warning" title="Active obligations">
            This user has 2 active donations. Suspending will require re-assignment to another partner so
            the food is not wasted.
          </Alert>
        </div>
      </Modal>
    </>
  );
}
