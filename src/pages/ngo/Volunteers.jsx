import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, Avatar, SearchInput, Table, Alert, Tabs, KV, Modal,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { volunteers as seed, volunteerTasks } from "../../data/mockData.js";

/* ============================================================
   VOLUNTEER COORDINATION — the NGO's view of the volunteer pool
   ============================================================ */
export default function NgoVolunteers() {
  useDocumentTitle("Volunteer coordination");
  const { toast } = useApp();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("pool");
  const [detail, setDetail] = useState(null);

  const pool = seed.filter((v) => `${v.name} ${v.area} ${v.vehicle}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="NGO operations"
        title="Volunteer coordination"
        sub="Assign pickups, see who is free right now, and track handovers. Volunteers are notified instantly."
        actions={<Button variant="quiet" icon="refresh" onClick={() => toast("Pool refreshed", "5 volunteers in your area.", "success")}>Refresh</Button>}
      />

      <div className="grid grid--4 mb5">
        {[
          { l: "Volunteers nearby", v: 12, s: "within 6 km", i: "users" },
          { l: "Available now", v: 5, s: "can start a run", i: "checkCircle" },
          { l: "On a run", v: 4, s: "1 arriving soon", i: "truck" },
          { l: "Avg. pickup time", v: "22 min", s: "donor → NGO", i: "clock" },
        ].map((s) => (
          <Card key={s.l}>
            <CardBody tight>
              <div className="row between">
                <span className="stat__label">{s.l}</span>
                <span className="stat__icon"><Icon name={s.i} size={15} /></span>
              </div>
              <div style={{ fontSize: "var(--fs-24)", fontWeight: 600, color: "var(--ink-900)", marginTop: 4 }}>{s.v}</div>
              <div className="text-xs muted">{s.s}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onChange={setTab} items={[{ value: "pool", label: "Volunteer pool" }, { value: "runs", label: "Today's runs" }]} />

      {tab === "pool" && (
        <Card className="mt4">
          <CardHead title="Volunteers in your area" desc="Sorted by availability and rating"
            action={<div style={{ width: 240 }}><SearchInput value={q} onChange={setQ} placeholder="Search volunteers…" /></div>} />
          <Table
            rows={pool}
            rowKey="id"
            columns={[
              {
                key: "name", header: "Volunteer", render: (v) => (
                  <div className="row g3">
                    <Avatar initials={v.initials} size="sm" />
                    <div>
                      <div className="table__primary">{v.name}</div>
                      <div className="table__sub">{v.phone}</div>
                    </div>
                  </div>
                ),
              },
              { key: "area", header: "Area" },
              { key: "vehicle", header: "Vehicle" },
              { key: "runs", header: "Runs", align: "right" },
              { key: "rating", header: "Rating", align: "right", render: (v) => <span className="tabular">{v.rating} ★</span> },
              { key: "available", header: "Status", render: (v) => <Badge tone={v.available ? "success" : "neutral"} dot>{v.available ? "Available" : "On a run"}</Badge> },
              {
                key: "actions", header: "", align: "right", render: (v) => (
                  <div className="table__actions">
                    <Button variant="ghost" size="sm" icon="eye" onClick={() => setDetail(v)} aria-label={`View ${v.name}`} />
                    <Button variant="secondary" size="sm" disabled={!v.available} onClick={() => toast("Assignment sent", `${v.name} has been notified.`, "success")}>Assign</Button>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      )}

      {tab === "runs" && (
        <div className="stack g3 mt4">
          {volunteerTasks.map((t) => (
            <Card key={t.id}>
              <CardBody>
                <div className="row g4 items-start wrap">
                  <span className="stat__icon" style={{ width: 38, height: 38, flex: "none" }}><Icon name="truck" size={17} /></span>
                  <div className="grow" style={{ minWidth: 200 }}>
                    <div className="text-base fw-semi ink">{t.title}</div>
                    <div className="text-md muted">{t.donor} → {t.dropNgo} · {t.distanceKm} km</div>
                  </div>
                  <Badge tone={t.status === "picked_up" ? "warning" : t.status === "assigned" ? "info" : "neutral"}>
                    {t.status === "picked_up" ? "In transit" : t.status === "assigned" ? "Assigned" : "Needs volunteer"}
                  </Badge>
                  <Button variant="quiet" size="sm" icon="phone" onClick={() => toast("Calling volunteer", "Prototype only.", "success")}>Call</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.name || ""}
        desc={detail ? `${detail.area} · ${detail.vehicle}` : ""}
        footer={<Button variant="primary" onClick={() => { toast("Assignment sent", `${detail.name} notified.`, "success"); setDetail(null); }}>Assign to this week's pickups</Button>}
      >
        {detail && (
          <div className="stack g4">
            <div className="row g3">
              <Avatar initials={detail.initials} size="lg" />
              <div>
                <div className="text-lg fw-semi ink">{detail.name}</div>
                <div className="text-md muted">{detail.phone}</div>
              </div>
              <Badge tone={detail.available ? "success" : "neutral"} style={{ marginLeft: "auto" }}>{detail.available ? "Available" : "On a run"}</Badge>
            </div>
            <KV rows={[["Completed runs", detail.runs], ["Rating", `${detail.rating} ★`], ["Preferred area", detail.area], ["Vehicle", detail.vehicle], ["Verification", "Verified volunteer"]]} />
            <Alert tone="info" title="Volunteers see your NGO name and drop address only">
              Their personal number is visible to you because you assigned them. Please use it only for
              pickup coordination.
            </Alert>
          </div>
        )}
      </Modal>
    </>
  );
}
