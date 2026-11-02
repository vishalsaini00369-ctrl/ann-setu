import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, Badge, StatusBadge, Tabs, EmptyState, SearchInput, Modal, Field, Select, Alert,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { volunteerTasks } from "../../data/mockData.js";

export default function VolunteerPickups() {
  useDocumentTitle("Assigned pickups");
  const { toast } = useApp();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [refuse, setRefuse] = useState(null);

  const rows = volunteerTasks
    .filter((t) => (tab === "all" ? true : tab === "transit" ? t.status === "picked_up" : t.status !== "picked_up"))
    .filter((t) => `${t.title} ${t.donor} ${t.dropNgo}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead
        eyebrow="Volunteer workspace"
        title="Assigned pickups"
        sub="Accept a run, follow the route, and confirm both handovers with an OTP. Each task shows exactly what to collect and where to take it."
        actions={<Button variant="quiet" icon="refresh" onClick={() => toast("Refreshed", "Assignments are up to date.", "success")}>Refresh</Button>}
      />

      <div className="row g3 wrap mb4">
        <div className="grow" style={{ minWidth: 200 }}><SearchInput value={q} onChange={setQ} placeholder="Search donor, food or NGO…" /></div>
        <Tabs value={tab} onChange={setTab} items={[
          { value: "all", label: "All", count: volunteerTasks.length },
          { value: "todo", label: "To collect", count: volunteerTasks.filter((t) => t.status !== "picked_up").length },
          { value: "transit", label: "In transit", count: volunteerTasks.filter((t) => t.status === "picked_up").length },
        ]} />
      </div>

      {rows.length ? (
        <div className="stack g3">
          {rows.map((t) => (
            <Card key={t.id}>
              <CardBody>
                <div className="row g4 items-start wrap">
                  <span className="stat__icon" style={{ width: 44, height: 44, flex: "none", background: t.status === "picked_up" ? "var(--warning-bg)" : "var(--green-50)", color: t.status === "picked_up" ? "var(--warning)" : "var(--green-700)" }}>
                    <Icon name={t.status === "picked_up" ? "truck" : "package"} size={20} />
                  </span>
                  <div className="grow" style={{ minWidth: 220 }}>
                    <div className="row g2 wrap mb2">
                      <span className="text-lg fw-semi ink">{t.title}</span>
                      <StatusBadge status={t.status === "picked_up" ? "Picked up" : t.status === "assigned" ? "Volunteer assigned" : "Accepted"} />
                      <Badge tone="neutral">{t.id}</Badge>
                    </div>
                    <div className="stack g2">
                      <div className="row g2 text-md"><Icon name="store" size={14} className="muted" /> <span className="muted">Collect from</span> <b className="ink">{t.donor}</b> <span className="muted">· {t.area} · by {t.pickupBy}</span></div>
                      <div className="row g2 text-md"><Icon name="handHeart" size={14} className="muted" /> <span className="muted">Deliver to</span> <b className="ink">{t.dropNgo}</b> <span className="muted">· {t.dropArea} · {t.servings} servings</span></div>
                    </div>
                  </div>
                  <div className="stack g2" style={{ minWidth: 170 }}>
                    <Button variant="primary" size="sm" as={Link} to={`/volunteer/pickups/${t.id}`} icon="arrowRight">
                      {t.status === "picked_up" ? "Continue delivery" : "Open task"}
                    </Button>
                    <Button variant="ghost" size="sm" icon="alert" onClick={() => setRefuse(t)}>Report a problem</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState icon="truck" title="Nothing assigned right now"
            desc="Go online to receive pickup requests from NGOs near you. You will get a notification the moment a run matches your area."
            action={<Button variant="primary" size="sm" as={Link} to="/volunteer">Back to dashboard</Button>} />
        </Card>
      )}

      <Modal
        open={Boolean(refuse)}
        onClose={() => setRefuse(null)}
        title="Report a problem with this pickup"
        desc="The NGO and platform team will be notified immediately."
        footer={
          <>
            <Button variant="quiet" onClick={() => setRefuse(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { setRefuse(null); toast("Problem reported", "Trust & safety team notified. You are not required to complete this run.", "error"); }}>
              Submit report
            </Button>
          </>
        }
      >
        <div className="stack g4">
          <Field label="What went wrong?" htmlFor="rt" required>
            <Select id="rt" placeholder="Select a reason"
              options={["Food not ready at pickup time", "Packaging damaged or leaking", "Quantity much less than declared", "Food smells or looks unsafe", "Nobody available at the donor", "Cannot reach the NGO", "Vehicle breakdown"]} />
          </Field>
          <Field label="Add details" htmlFor="rd" optional>
            <textarea id="rd" className="textarea" placeholder="Anything the safety team should know." />
          </Field>
          <Alert tone="danger" title="Never deliver food you believe is unsafe">
            Refusing a pickup is always the right call if safety is in doubt. You will not be penalised.
          </Alert>
        </div>
      </Modal>
    </>
  );
}
