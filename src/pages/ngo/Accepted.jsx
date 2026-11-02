import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, Tabs, EmptyState, Avatar,
  Modal, Field, Select, Table, Alert,
} from "../../components/ui/index.jsx";
import { useApp, useDocumentTitle } from "../../data/store.jsx";
import { volunteers as allVolunteers } from "../../data/mockData.js";

/* ============================================================
   ACCEPTED DONATIONS — the NGO's active commitments
   ============================================================ */
export default function NgoAccepted() {
  useDocumentTitle("Accepted donations");
  const { donations, assignVolunteer, updateStatus, toast } = useApp();
  const [tab, setTab] = useState("active");
  const [assignTo, setAssignTo] = useState(null);
  const [vol, setVol] = useState("");

  const all = donations.filter((d) => ["accepted", "assigned", "picked_up", "delivered", "distributed"].includes(d.status));
  const active = all.filter((d) => ["accepted", "assigned", "picked_up"].includes(d.status));
  const done = all.filter((d) => ["delivered", "distributed"].includes(d.status));
  const unassigned = active.filter((d) => !d.volunteer);

  const doAssign = () => {
    const v = allVolunteers.find((x) => x.id === vol);
    if (!v) return;
    assignVolunteer(assignTo.id, v.name, v.id);
    toast("Volunteer assigned", `${v.name} will collect from ${assignTo.donor}.`, "success");
    setAssignTo(null);
    setVol("");
  };

  return (
    <>
      <PageHead
        eyebrow="NGO workspace"
        title="Accepted donations"
        sub="Food you have committed to collect. Assign a volunteer early — collection failures are the main reason food expires."
        actions={<Button variant="quiet" icon="plus" as={Link} to="/ngo/nearby">Accept more</Button>}
      />

      {unassigned.length > 0 && (
        <Alert tone="warning" title={`${unassigned.length} accepted donation${unassigned.length > 1 ? "s" : ""} without a volunteer`}>
          Without a volunteer, your own vehicle must collect the food. Assign someone now to avoid expiry.
        </Alert>
      )}

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "active", label: "Active", count: active.length },
          { value: "done", label: "Completed", count: done.length },
        ]}
      />

      <div className="mt4">
        {tab === "active" && (
          active.length ? (
            <div className="stack g3">
              {active.map((d) => (
                <Card key={d.id}>
                  <CardBody>
                    <div className="row g4 items-start wrap">
                      <span className="stat__icon" style={{ width: 42, height: 42, flex: "none" }}>
                        <Icon name={d.status === "picked_up" ? "truck" : "checkCircle"} size={18} />
                      </span>
                      <div className="grow" style={{ minWidth: 200 }}>
                        <div className="row g2 wrap mb1">
                          <Link to={`/ngo/donations/${d.id}`} className="text-base fw-semi ink" style={{ textDecoration: "none" }}>{d.title}</Link>
                          <StatusBadge status={d.status === "picked_up" ? "Picked up" : d.volunteer ? "Volunteer assigned" : "Accepted"} />
                        </div>
                        <div className="text-md muted">{d.donor} · {d.pickup.area} · {d.servings} servings · {d.quantity}</div>
                        <div className="row g3 mt2 text-sm muted wrap">
                          <span className="row g1"><Icon name="clock" size={13} /> Pickup {d.window.start.slice(11)}–{d.window.end.slice(11)}</span>
                          <span className="row g1"><Icon name="shield" size={13} /> Safe until {d.expires.slice(11)}</span>
                          <span className="row g1"><Icon name="user" size={13} /> {d.volunteer || "No volunteer"}</span>
                        </div>
                      </div>
                      <div className="row g2">
                        {!d.volunteer && (
                          <Button variant="primary" size="sm" icon="users" onClick={() => { setAssignTo(d); setVol(""); }}>Assign volunteer</Button>
                        )}
                        {d.status === "picked_up" && (
                          <Button variant="primary" size="sm" icon="bowl" onClick={() => { updateStatus({ id: d.id, status: "distributed" }); toast("Distribution recorded", "Thank you — the donor can now see this impact.", "success"); }}>
                            Mark distributed
                          </Button>
                        )}
                        <Button variant="quiet" size="sm" as={Link} to={`/ngo/donations/${d.id}`}>Details</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <EmptyState icon="checkCircle" title="No active commitments"
                desc="Accept a nearby donation and it will appear here with its pickup countdown."
                action={<Button variant="primary" size="sm" as={Link} to="/ngo/nearby" icon="mapPin">Browse nearby donations</Button>} />
            </Card>
          )
        )}

        {tab === "done" && (
          <Card>
            <CardHead title="Completed donations" desc="Delivery and distribution confirmed" />
            <Table
              rows={done}
              rowKey="id"
              columns={[
                { key: "id", header: "ID", render: (r) => <span className="mono text-sm muted">{r.id}</span> },
                { key: "title", header: "Food", render: (r) => <div><div className="table__primary">{r.title}</div><div className="table__sub">{r.donor}</div></div> },
                { key: "servings", header: "Servings", align: "right", render: (r) => <span className="tabular fw-semi">{r.servings}</span> },
                { key: "volunteer", header: "Volunteer", render: (r) => r.volunteer || "—" },
                { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "distributed" ? "Distributed" : "Delivered"} /> },
                { key: "actions", header: "", align: "right", render: (r) => <Button variant="ghost" size="sm" icon="eye" as={Link} to={`/ngo/donations/${r.id}`} aria-label="View" /> },
              ]}
            />
          </Card>
        )}
      </div>

      <Modal
        open={Boolean(assignTo)}
        onClose={() => setAssignTo(null)}
        title="Assign a volunteer"
        desc={assignTo ? `${assignTo.id} · pickup from ${assignTo.pickup.area}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setAssignTo(null)}>Cancel</Button>
            <Button variant="primary" disabled={!vol} onClick={doAssign} icon="users">Assign & notify</Button>
          </>
        }
      >
        <div className="stack g2">
          {allVolunteers.filter((v) => v.verified === "verified").map((v) => (
            <label key={v.id} className={`check ${vol === v.id ? "is-checked" : ""}`} style={{ alignItems: "center" }}>
              <input type="radio" name="vol2" checked={vol === v.id} onChange={() => setVol(v.id)} style={{ width: 17, height: 17, accentColor: "var(--green-600)" }} />
              <Avatar initials={v.initials} size="sm" />
              <span className="check__text grow">
                <span className="check__title">{v.name} · {v.vehicle}</span>
                <span className="check__desc">{v.area} · {v.runs} runs · ★ {v.rating}</span>
              </span>
              {v.available ? <Badge tone="success">Free</Badge> : <Badge tone="neutral">Busy</Badge>}
            </label>
          ))}
        </div>
      </Modal>
    </>
  );
}
