import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, StatusBadge, VerifiedMark, SearchInput, Tabs,
  Table, Modal, Alert, KV, Avatar, Field, Textarea, EmptyState, Stat,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { verifications } from "../../data/mockData.js";

/* ============================================================
   VERIFICATION QUEUES — donors / NGOs / volunteers
   One screen component, three data sources.
   ============================================================ */
export default function Verification({ kind = "donors" }) {
  const { toast } = useApp();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("pending");
  const [review, setReview] = useState(null);
  const [decision, setDecision] = useState(null);
  const [note, setNote] = useState("");

  const meta = {
    donors: {
      title: "Donor verification",
      eyebrow: "Verification · FSSAI & premises",
      sub: "Food donors cannot publish a listing until their FSSAI licence and premises are verified.",
      rows: verifications.donors,
      nameKey: "org",
      columns: [
        { key: "org", header: "Organisation", render: (r) => <div><div className="table__primary">{r.org}</div><div className="table__sub">{r.type} · {r.area}</div></div> },
        { key: "fssai", header: "FSSAI licence", render: (r) => <span className="mono text-sm">{r.fssai}</span> },
        { key: "docs", header: "Documents", align: "right", render: (r) => <Badge tone={r.docs >= 3 ? "success" : "warning"}>{r.docs} files</Badge> },
        { key: "submitted", header: "Submitted" },
      ],
      checks: ["FSSAI licence is valid and unexpired", "Licence name matches the business name", "Premises photo is of a working kitchen", "Owner ID matches the licence holder"],
    },
    ngos: {
      title: "NGO verification",
      eyebrow: "Verification · registration & 80G",
      sub: "NGOs must prove legal registration before accepting food. Verify the registration number against the state registry.",
      rows: verifications.ngos,
      nameKey: "org",
      columns: [
        { key: "org", header: "Organisation", render: (r) => <div><div className="table__primary">{r.org}</div><div className="table__sub">{r.area}</div></div> },
        { key: "reg", header: "Registration", render: (r) => <span className="mono text-sm">{r.reg}</span> },
        { key: "reach", header: "Daily reach", align: "right", render: (r) => <span className="tabular">{r.reach}</span> },
        { key: "submitted", header: "Submitted" },
      ],
      checks: ["Registration certificate is current", "Registration number found in state registry", "Signatory ID matches the certificate", "Kitchen / serving premises verified"],
    },
    volunteers: {
      title: "Volunteer verification",
      eyebrow: "Verification · identity & transport",
      sub: "Volunteers handle food directly. Identity verification protects donors, NGOs and the volunteer.",
      rows: verifications.volunteers,
      nameKey: "name",
      columns: [
        { key: "name", header: "Volunteer", render: (r) => <div className="row g3"><Avatar initials={r.name.split(" ").map((w) => w[0]).join("")} size="sm" /><div><div className="table__primary">{r.name}</div><div className="table__sub">{r.area}</div></div></div> },
        { key: "documents", header: "Documents" },
        { key: "runs", header: "Runs", align: "right" },
        { key: "submitted", header: "Submitted" },
      ],
      checks: ["Government photo ID is legible and unexpired", "Selfie matches the ID photo", "Driving licence valid (if using a vehicle)", "No prior safety flags on the phone number"],
    },
  }[kind];

  const rows = meta.rows.filter((r) => `${r.org || r.name} ${r.area}`.toLowerCase().includes(q.toLowerCase()));

  const decide = (action) => {
    toast(
      action === "approve" ? "Verification approved" : "Verification rejected",
      `${review[meta.nameKey]} — the applicant has been notified. Action logged to the audit trail.`,
      action === "approve" ? "success" : "error"
    );
    setDecision(null);
    setReview(null);
    setNote("");
  };

  return (
    <>
      <PageHead
        eyebrow={meta.eyebrow}
        title={meta.title}
        sub={meta.sub}
        actions={<Button variant="quiet" icon="history">Verification history</Button>}
      />

      <div className="grid grid--4 mb5">
        <Stat label="Awaiting review" value={meta.rows.filter((r) => r.status !== "review").length} icon="clock" foot="oldest 3 days" />
        <Stat label="In review" value={meta.rows.filter((r) => r.status === "review").length} icon="eye" foot="assigned to you" />
        <Stat label="Approved this month" value={kind === "donors" ? 12 : kind === "ngos" ? 4 : 26} icon="checkCircle" trend={{ dir: "up", value: "+3" }} foot="vs September" />
        <Stat label="Rejected this month" value={kind === "donors" ? 2 : 1} icon="xCircle" foot="mostly expired licences" />
      </div>

      <Card>
        <CardHead
          title="Queue"
          desc={`${rows.length} applications`}
          action={
            <div className="row g2">
              <div style={{ width: 220 }}><SearchInput value={q} onChange={setQ} placeholder="Search applicant…" /></div>
              <Button variant="quiet" size="sm" icon="filter">Filters</Button>
            </div>
          }
        />
        <Table
          rows={rows}
          rowKey="id"
          empty={<EmptyState icon="checkCircle" title="Queue is clear" desc="All applications for this category have been reviewed." />}
          columns={[
            ...meta.columns,
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "flagged" ? "Flagged" : "Pending"} /> },
            {
              key: "actions", header: "", align: "right", render: (r) => (
                <div className="table__actions">
                  <Button variant="quiet" size="sm" onClick={() => { setReview(r); setDecision(null); }}>Review</Button>
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        open={Boolean(review)}
        onClose={() => setReview(null)}
        size="lg"
        title={review ? review[meta.nameKey] : ""}
        desc={review ? `Submitted ${review.submitted} · ${review.area}` : ""}
        footer={
          <>
            <Button variant="quiet" onClick={() => setReview(null)}>Close</Button>
            <Button variant="danger-ghost" onClick={() => setDecision("reject")} icon="x">Reject</Button>
            <Button variant="primary" onClick={() => setDecision("approve")} icon="checkCircle">Approve</Button>
          </>
        }
      >
        {review && (
          <div className="stack g5">
            <div className="row g3 wrap">
              <VerifiedMark status="pending" />
              <Badge tone="neutral">{kind === "donors" ? review.type : kind === "ngos" ? "NGO" : "Volunteer"}</Badge>
              <Badge tone="neutral">Applied {review.submitted}</Badge>
            </div>

            <div>
              <div className="ds-label">Submitted details</div>
              <KV
                rows={
                  kind === "donors"
                    ? [["Organisation", review.org], ["Type", review.type], ["Area", review.area], ["FSSAI licence", review.fssai], ["Documents", `${review.docs} files uploaded`]]
                    : kind === "ngos"
                    ? [["Organisation", review.org], ["Area", review.area], ["Registration no.", review.reg], ["Daily reach", `${review.reach} people`], ["Documents", "3 files uploaded"]]
                    : [["Name", review.name], ["Area", review.area], ["Documents", review.documents], ["Runs completed", review.runs], ["Phone verified", "Yes · OTP"]]
                }
              />
            </div>

            <div>
              <div className="ds-label">Document preview</div>
              <div className="grid grid--2">
                {[0, 1].map((i) => (
                  <div key={i} className="card card--flat" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center", background: "var(--canvas)" }}>
                    <span className="stat__icon" style={{ width: 34, height: 34 }}><Icon name="file" size={16} /></span>
                    <div className="grow" style={{ minWidth: 0 }}>
                      <div className="text-md fw-semi ink truncate">{kind === "volunteers" ? (i === 0 ? "aadhaar.jpg" : "selfie.jpg") : i === 0 ? "licence.pdf" : "premises.jpg"}</div>
                      <div className="text-xs muted">Uploaded {review.submitted} · 1.2 MB</div>
                    </div>
                    <Button variant="ghost" size="sm" icon="eye" aria-label="Preview document" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="ds-label">Verification checklist</div>
              <div className="stack g2">
                {meta.checks.map((c, i) => (
                  <label key={c} className={`check ${i < 3 ? "is-checked" : ""}`}>
                    <input type="checkbox" defaultChecked={i < 3} style={{ width: 17, height: 17, accentColor: "var(--green-600)" }} />
                    <span className="check__text"><span className="check__title">{c}</span></span>
                  </label>
                ))}
              </div>
            </div>

            {decision && (
              <div className="stack g3">
                <Alert tone={decision === "approve" ? "success" : "danger"} title={decision === "approve" ? "Approve this applicant?" : "Reject this applicant?"}>
                  {decision === "approve"
                    ? "They will be able to publish or accept donations immediately. This action is recorded in the audit log."
                    : "The applicant will be told why and can resubmit. Rejections are reviewed by a second administrator."}
                </Alert>
                <Field label={decision === "approve" ? "Internal note" : "Reason (sent to the applicant)"} htmlFor="vn" required={decision === "reject"}>
                  <Textarea id="vn" value={note} onChange={(e) => setNote(e.target.value)} placeholder={decision === "approve" ? "Optional note for the file." : "e.g. FSSAI licence expired on 31 Mar 2026 — please upload a current licence."} />
                </Field>
                <div className="row g2">
                  <Button variant="quiet" onClick={() => setDecision(null)}>Back</Button>
                  <Button variant={decision === "approve" ? "primary" : "danger"} onClick={() => decide(decision)}>
                    {decision === "approve" ? "Confirm approval" : "Confirm rejection"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
