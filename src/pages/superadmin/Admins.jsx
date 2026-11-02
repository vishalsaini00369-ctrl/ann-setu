import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Table, Modal, Field, Input, Select,
  Alert, Avatar, KV, Stat, CheckRow, Tabs,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { admins as seed } from "../../data/mockData.js";

const SCOPES = ["All cities", "Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"];

export default function SuperAdminAdmins() {
  useDocumentTitle("Admin management");
  const { toast } = useApp();
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", email: "", role: "Admin", scope: "Jaipur", mfa: true });
  const [err, setErr] = useState({});

  const invite = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Enter the administrator's full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid work email address.";
    setErr(e);
    if (Object.keys(e).length) return;
    setRows((r) => [{ id: `adm-${r.length + 1}`, name: f.name, email: f.email, scope: f.scope, role: f.role, status: "invited", lastActive: "—" }, ...r]);
    setOpen(false);
    setF({ name: "", email: "", role: "Admin", scope: "Jaipur", mfa: true });
    toast("Invitation sent", `${f.email} can activate the account once they accept.`, "success");
  };

  return (
    <>
      <PageHead
        eyebrow="Super admin"
        title="Admin management"
        sub="Create administrators, scope them to a city and control privileged actions. Every change is logged."
        actions={<Button variant="primary" icon="plus" onClick={() => setOpen(true)}>Invite administrator</Button>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Administrators" value={rows.length} icon="shield" foot="3 active, 1 invited" />
        <Stat label="Cities covered" value={11} icon="globe" foot="Rajasthan + 3 states" />
        <Stat label="Privileged actions (30d)" value={184} icon="key" foot="all logged" />
        <Stat label="MFA adoption" value="100%" icon="lock" foot="enforced platform-wide" />
      </div>

      <Card>
        <CardHead title="Administrator accounts" desc="Role, scope and last activity" action={<Badge tone="neutral">Prototype data</Badge>} />
        <Table
          rows={rows}
          rowKey="id"
          columns={[
            {
              key: "name", header: "Administrator", render: (r) => (
                <div className="row g3">
                  <Avatar initials={r.name.split(" ").map((w) => w[0]).join("")} size="sm" />
                  <div><div className="table__primary">{r.name}</div><div className="table__sub">{r.email}</div></div>
                </div>
              ),
            },
            { key: "role", header: "Role", render: (r) => <Badge tone={r.role === "Super Admin" ? "green" : "info"}>{r.role}</Badge> },
            { key: "scope", header: "Scope" },
            { key: "lastActive", header: "Last active" },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "active" ? "Active" : "Invited"} /> },
            {
              key: "a", header: "", align: "right", render: (r) => (
                <div className="table__actions">
                  <Button variant="ghost" size="sm" icon="edit" aria-label="Edit" onClick={() => toast("Edit administrator", "Prototype only.", "success")} />
                  <Button variant="ghost" size="sm" icon="slash" aria-label="Suspend" onClick={() => toast("Access removed", `${r.name} can no longer sign in.`, "error")} />
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Card className="mt5">
        <CardHead title="Role permissions" desc="What each role can do" />
        <Table
          rows={[
            { cap: "Verify donors, NGOs, volunteers", admin: true, superadmin: true },
            { cap: "Monitor and suspend donations", admin: true, superadmin: true },
            { cap: "Resolve complaints & incidents", admin: true, superadmin: true },
            { cap: "Export reports", admin: true, superadmin: true },
            { cap: "Create / remove administrators", admin: false, superadmin: true },
            { cap: "Change food-safety configuration", admin: false, superadmin: true },
            { cap: "View audit logs", admin: false, superadmin: true },
            { cap: "Access platform-wide analytics", admin: false, superadmin: true },
          ]}
          rowKey="cap"
          columns={[
            { key: "cap", header: "Capability", render: (r) => <span className="table__primary">{r.cap}</span> },
            { key: "admin", header: "Admin", align: "right", render: (r) => <Icon name={r.admin ? "check" : "minus"} size={16} style={{ color: r.admin ? "var(--green-600)" : "var(--ink-300)", display: "inline" }} /> },
            { key: "superadmin", header: "Super Admin", align: "right", render: (r) => <Icon name={r.superadmin ? "check" : "minus"} size={16} style={{ color: r.superadmin ? "var(--green-600)" : "var(--ink-300)", display: "inline" }} /> },
          ]}
        />
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Invite an administrator"
        desc="They will receive an email invitation valid for 72 hours."
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={invite} icon="mail">Send invitation</Button>
          </>
        }
      >
        <div className="stack g4">
          <Field label="Full name" htmlFor="an" required error={err.name}>
            <Input id="an" value={f.name} onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Nikhil Rao" />
          </Field>
          <Field label="Work email" htmlFor="ae" required error={err.email}>
            <Input id="ae" type="email" value={f.email} onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))} placeholder="name@annsetu.example" />
          </Field>
          <div className="grid grid--2">
            <Field label="Role" htmlFor="ar">
              <Select id="ar" value={f.role} onChange={(e) => setF((p) => ({ ...p, role: e.target.value }))} options={["Admin", "Super Admin"]} />
            </Field>
            <Field label="Scope" htmlFor="as">
              <Select id="as" value={f.scope} onChange={(e) => setF((p) => ({ ...p, scope: e.target.value }))} options={SCOPES} />
            </Field>
          </div>
          <CheckRow id="mfa" checked={f.mfa} onChange={(v) => setF((p) => ({ ...p, mfa: v }))}
            title="Require MFA on first sign-in" desc="Mandatory for all administrator accounts." />
          <Alert tone="warning" title="Privileged access">
            Admins can verify partners and suspend donations. Super Admins can also change safety
            configuration and manage other administrators.
          </Alert>
        </div>
      </Modal>
    </>
  );
}
