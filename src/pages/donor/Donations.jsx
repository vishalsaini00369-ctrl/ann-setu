import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, SearchInput, Chips,
  Tabs, Table, EmptyState, Alert, Modal, Avatar, KV, Progress, SegmentedControl,
} from "../../components/ui/index.jsx";
import DonationCard, { require_status } from "../../components/DonationCard.jsx";
import { useApp, useDocumentTitle, formatDate, formatDateTime } from "../../data/store.jsx";

const ACTIVE_STATUSES = ["published", "accepted", "assigned", "picked_up"];

/* ============================================================
   ACTIVE DONATIONS — card grid, mobile-first
   ============================================================ */
export function ActiveDonations() {
  useDocumentTitle("Active donations");
  const { donations, toast } = useApp();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const active = donations.filter((d) => ACTIVE_STATUSES.includes(d.status));
  const filtered = useMemo(
    () =>
      active
        .filter((d) => (status === "all" ? true : d.status === status))
        .filter((d) => `${d.title} ${d.id} ${d.ngo || ""} ${d.pickup.area}`.toLowerCase().includes(q.toLowerCase())),
    [active, q, status]
  );

  return (
    <>
      <PageHead
        eyebrow="Donor workspace"
        title="Active donations"
        sub="Everything currently live, accepted or in transit. Expired listings leave this list automatically."
        actions={<Button variant="primary" icon="plus" as={Link} to="/donor/new">Create donation</Button>}
      />

      <Card className="mb5">
        <CardBody tight>
          <div className="filter-bar" style={{ border: "none", padding: 6, background: "transparent" }}>
            <div className="grow" style={{ minWidth: 200 }}>
              <SearchInput value={q} onChange={setQ} placeholder="Search by food, NGO or ID…" />
            </div>
            <Chips
              value={status}
              onChange={setStatus}
              items={[
                { value: "all", label: "All", count: active.length },
                { value: "published", label: "Awaiting NGO", count: active.filter((d) => d.status === "published").length },
                { value: "accepted", label: "Accepted", count: active.filter((d) => d.status === "accepted").length },
                { value: "assigned", label: "Assigned", count: active.filter((d) => d.status === "assigned").length },
                { value: "picked_up", label: "Picked up", count: active.filter((d) => d.status === "picked_up").length },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {filtered.length ? (
        <div className="grid grid--3">
          {filtered.map((d) => (
            <DonationCard
              key={d.id}
              d={d}
              to={`/donor/donations/${d.id}`}
              action={
                <div className="row g2">
                  <Button variant="quiet" size="sm" as={Link} to={`/donor/donations/${d.id}`} iconRight="chevronRight">Details</Button>
                  <Button variant="ghost" size="sm" icon="message" aria-label="Contact NGO" onClick={() => toast("Message draft opened", "Prototype only.", "success")} />
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon="activity"
            title="No donations match this filter"
            desc="Try clearing the search or status filter. You can also create a new donation — most listings get an NGO response within 15 minutes."
            action={<Button variant="primary" size="sm" icon="plus" as={Link} to="/donor/new">Create donation</Button>}
          />
        </Card>
      )}
    </>
  );
}

/* ============================================================
   DONATION HISTORY — adaptive table + detail drawer
   ============================================================ */
export function DonationHistory() {
  useDocumentTitle("Donation history");
  const { donations } = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [range, setRange] = useState("30");
  const [open, setOpen] = useState(null);

  const rows = donations
    .filter((d) => !ACTIVE_STATUSES.includes(d.status))
    .filter((d) => `${d.title} ${d.id} ${d.ngo || ""}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Donor workspace"
        title="Donation history"
        sub="Completed, expired and cancelled donations. Every record is exportable for your CSR and tax reporting."
        actions={
          <>
            <Button variant="quiet" icon="download" onClick={() => window.print()}>Export CSV</Button>
            <Button variant="quiet" icon="print" onClick={() => window.print()}>Print</Button>
          </>
        }
      />

      <div className="grid grid--4 mb5">
        {[
          { l: "Total donations", v: 68, s: "since Feb 2025" },
          { l: "Meals donated", v: "4,820", s: "verified distributions" },
          { l: "Average NGO response", v: "11 min", s: "across all donations" },
          { l: "Rescue rate", v: "94%", s: "collected before expiry" },
        ].map((s) => (
          <Card key={s.l}>
            <CardBody tight>
              <div className="stat__label">{s.l}</div>
              <div style={{ fontSize: "var(--fs-24)", fontWeight: 600, color: "var(--ink-900)", marginTop: 4 }}>{s.v}</div>
              <div className="text-xs muted">{s.s}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead
          title="All donations"
          desc={`${rows.length} records · prototype data`}
          action={
            <div className="row g2">
              <SegmentedControl ariaLabel="Date range" value={range} onChange={setRange}
                options={[{ value: "7", label: "7 days" }, { value: "30", label: "30 days" }, { value: "all", label: "All time" }]} />
              <Button variant="quiet" size="sm" icon="filter" onClick={() => setQ("")}>Clear</Button>
            </div>
          }
        />
        <CardBody tight style={{ paddingBottom: 0 }}>
          <SearchInput value={q} onChange={setQ} placeholder="Search history…" />
        </CardBody>
        <Table
          rows={rows}
          rowKey="id"
          onRowClick={(r) => setOpen(r)}
          empty={<EmptyState icon="history" title="No records yet" desc="Completed donations will appear here." />}
          columns={[
            { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
            {
              key: "title", header: "Donation", render: (r) => (
                <div>
                  <div className="table__primary">{r.title}</div>
                  <div className="table__sub">{r.category} · {r.quantity}</div>
                </div>
              ),
            },
            { key: "ngo", header: "NGO", render: (r) => r.ngo || <span className="faint">—</span> },
            { key: "servings", header: "Servings", align: "right", render: (r) => <span className="tabular fw-semi">{r.servings}</span> },
            { key: "date", header: "Pickup date", render: (r) => <span className="text-md">{formatDate(r.window.start)}</span> },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={require_status(r.status)} /> },
            {
              key: "actions", header: "Actions", align: "right",
              render: (r) => (
                <div className="table__actions" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" icon="eye" aria-label={`View ${r.id}`} onClick={() => setOpen(r)} />
                  <Button variant="ghost" size="sm" icon="download" aria-label={`Download ${r.id}`} />
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        title={open?.title || ""}
        desc={open ? `${open.id} · ${open.category}` : ""}
        size="lg"
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>Close</Button>
            <Button variant="primary" as={Link} to={open ? `/donor/donations/${open.id}` : "/donor"} iconRight="arrowRight">Open full record</Button>
          </>
        }
      >
        {open && (
          <div className="stack g5">
            <div className="row g3 wrap">
              <StatusBadge status={require_status(open.status)} lg />
              <Badge tone="neutral" lg>{open.servings} servings</Badge>
              <Badge tone="neutral" lg>{open.quantity}</Badge>
            </div>
            <KV
              rows={[
                ["Received by", open.ngo || "No NGO accepted"],
                ["Volunteer", open.volunteer || "Not assigned"],
                ["Prepared", formatDateTime(open.prepared)],
                ["Pickup window", `${formatDateTime(open.window.start)} → ${open.window.end.slice(11)}`],
                ["Distribution confirmed", open.status === "distributed" ? "Yes · NGO record filed" : "No"],
                ["Allergens declared", open.allergens.join(", ") || "None"],
              ]}
            />
            {open.status === "expired" && (
              <Alert tone="danger" title="This donation expired before collection">
                No NGO accepted within the safe window, so the system closed the listing. Consider publishing
                earlier in the day or reducing the quantity.
              </Alert>
            )}
            <div>
              <div className="ds-label">Safety trail</div>
              <KV
                rows={[
                  ["Storage declared", open.storage],
                  ["Temperature checked", "Yes"],
                  ["Handler certified", "Yes"],
                  ["Declaration signed", "Yes · logged"],
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
