import React, { useState } from "react";
import { PageHead } from "../../components/layout/AppShell.jsx";
import Icon from "../../components/Icon.jsx";
import {
  Button, Card, CardBody, CardHead, Badge, Field, Input, Select, Modal, Progress,
  Table, Alert, Chips, Textarea,
} from "../../components/ui/index.jsx";
import { useDocumentTitle, useApp } from "../../data/store.jsx";
import { requirements as seed } from "../../data/mockData.js";

/* ============================================================
   FOOD REQUIREMENTS — what the NGO actually needs
   Lets donors see demand, not just supply.
   ============================================================ */
export default function NgoRequirements() {
  useDocumentTitle("Food requirements");
  const { toast } = useApp();
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ item: "", needed: "", unit: "servings", window: "", urgency: "medium", notes: "" });
  const [err, setErr] = useState({});

  const save = () => {
    const e = {};
    if (!f.item.trim()) e.item = "Describe what you need.";
    if (!f.needed) e.needed = "Enter a quantity.";
    setErr(e);
    if (Object.keys(e).length) return;
    setRows((r) => [{ id: `req-${r.length + 1}`, ngo: "Annapurna Seva Sansthan", item: f.item, needed: Number(f.needed), unit: f.unit, window: f.window || "Flexible", urgency: f.urgency, matched: 0, area: "Bani Park" }, ...r]);
    setOpen(false);
    setF({ item: "", needed: "", unit: "servings", window: "", urgency: "medium", notes: "" });
    toast("Requirement posted", "Donors in your area can now see what you need.", "success");
  };

  return (
    <>
      <PageHead
        eyebrow="NGO operations"
        title="Food requirements"
        sub="Post what your kitchen needs. Donors see live demand alongside their own surplus — it is the fastest way to get the right food."
        actions={<Button variant="primary" icon="plus" onClick={() => setOpen(true)}>Post a requirement</Button>}
      />

      <Alert tone="info" title="How requirements work">
        Requirements appear on donor dashboards as “needed nearby”. They do not reserve food — an NGO
        still has to accept each donation — but they dramatically improve match quality.
      </Alert>

      <div className="grid grid--3 mt5">
        {rows.map((r) => {
          const pct = Math.round((r.matched / r.needed) * 100);
          return (
            <Card key={r.id}>
              <CardBody>
                <div className="row between mb2">
                  <Badge tone={r.urgency === "high" ? "danger" : r.urgency === "medium" ? "warning" : "neutral"}>
                    {r.urgency === "high" ? "Urgent" : r.urgency === "medium" ? "Medium" : "Low priority"}
                  </Badge>
                  <span className="text-xs muted">{r.area}</span>
                </div>
                <div className="text-base fw-semi ink">{r.item}</div>
                <div className="text-md muted mt1">{r.window}</div>
                <div className="mt4">
                  <div className="row between text-sm mb2">
                    <span className="muted">{r.matched} / {r.needed} {r.unit}</span>
                    <span className="fw-semi ink">{pct}%</span>
                  </div>
                  <Progress value={pct} tone={pct < 40 ? "warning" : undefined} />
                </div>
                <div className="row g2 mt4">
                  <Button variant="quiet" size="sm" icon="edit" onClick={() => toast("Edit requirement", "Prototype only.", "success")}>Edit</Button>
                  <Button variant="ghost" size="sm" icon="trash" onClick={() => { setRows((x) => x.filter((y) => y.id !== r.id)); toast("Requirement closed", "It is no longer visible to donors.", "success"); }}>Close</Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card className="mt5">
        <CardHead title="Match history" desc="How requirements turned into donations" />
        <Table
          rows={[
            { id: "m1", item: "Cooked meals (veg)", posted: "2026-10-28", matched: 6, meals: 640, avgTime: "14 min" },
            { id: "m2", item: "Bread / bakery", posted: "2026-10-26", matched: 3, meals: 180, avgTime: "22 min" },
            { id: "m3", item: "Milk & curd", posted: "2026-10-24", matched: 1, meals: 40, avgTime: "41 min" },
          ]}
          rowKey="id"
          columns={[
            { key: "item", header: "Requirement", render: (r) => <span className="table__primary">{r.item}</span> },
            { key: "posted", header: "Posted" },
            { key: "matched", header: "Donations matched", align: "right" },
            { key: "meals", header: "Meals received", align: "right", render: (r) => <span className="tabular">{r.meals}</span> },
            { key: "avgTime", header: "Avg. match time", align: "right" },
          ]}
        />
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Post a food requirement"
        desc="Visible to verified donors within 6 km."
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} icon="checkCircle">Post requirement</Button>
          </>
        }
      >
        <div className="stack g4">
          <Field label="What do you need?" htmlFor="ri" required error={err.item}>
            <Input id="ri" value={f.item} onChange={(e) => setF((p) => ({ ...p, item: e.target.value }))} placeholder="e.g. Cooked vegetarian meals" />
          </Field>
          <div className="grid grid--2">
            <Field label="Quantity needed" htmlFor="rq" required error={err.needed}>
              <Input id="rq" inputMode="numeric" value={f.needed} onChange={(e) => setF((p) => ({ ...p, needed: e.target.value }))} placeholder="300" />
            </Field>
            <Field label="Unit" htmlFor="ru">
              <Select id="ru" value={f.unit} onChange={(e) => setF((p) => ({ ...p, unit: e.target.value }))} options={["servings", "kg", "litres", "packs"]} />
            </Field>
          </div>
          <Field label="When do you need it?" htmlFor="rw" hint="e.g. Daily, 12:00–15:00">
            <Input id="rw" value={f.window} onChange={(e) => setF((p) => ({ ...p, window: e.target.value }))} placeholder="Daily, 12:00–15:00" />
          </Field>
          <Field label="Priority" htmlFor="rp">
            <Chips value={f.urgency} onChange={(v) => setF((p) => ({ ...p, urgency: v }))} items={[
              { value: "high", label: "Urgent" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" },
            ]} />
          </Field>
          <Field label="Additional notes" htmlFor="rn" optional>
            <Textarea id="rn" value={f.notes} onChange={(e) => setF((p) => ({ ...p, notes: e.target.value }))} placeholder="Dietary constraints, packaging needs, serving logistics…" />
          </Field>
        </div>
      </Modal>
    </>
  );
}
