import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { Badge, Card, StatusBadge } from "./ui/index.jsx";

/* Shared donation summary card — used by Donor, NGO and Admin lists */
export default function DonationCard({ d, to, action, ngoView }) {
  const urgencyMap = {
    critical: { label: "Expiring soon", cls: "critical", icon: "clock" },
    soon: { label: "Pickup today", cls: "soon", icon: "truck" },
    ok: { label: "Flexible window", cls: "ok", icon: "calendar" },
  };
  const u = urgencyMap[d.urgency] || urgencyMap.ok;

  return (
    <Card className="donation-card" interactive>
      <div className="donation-card__media">
        <Icon name="bowl" size={34} strokeWidth={1.4} />
        <div className="donation-card__badges">
          <StatusBadge status={require_status(d.status)} />
          <span className={`urgency urgency--${u.cls}`}><Icon name={u.icon} size={11} /> {u.label}</span>
        </div>
      </div>
      <div className="donation-card__body">
        <div>
          <Link to={to} className="donation-card__title" style={{ color: "inherit" }}>{d.title}</Link>
          <div className="donation-card__org">
            {ngoView ? `From ${d.donor}` : d.ngo ? `To ${d.ngo}` : "Awaiting an NGO"}
            {ngoView && ` · ${d.pickup.area}`}
          </div>
        </div>
        <div className="donation-card__facts">
          <div className="fact">
            <span className="fact__k">Servings</span>
            <span className="fact__v tabular">{d.servings}</span>
          </div>
          <div className="fact">
            <span className="fact__k">Quantity</span>
            <span className="fact__v">{d.quantity}</span>
          </div>
          <div className="fact">
            <span className="fact__k">Pickup by</span>
            <span className="fact__v">{d.window.end.slice(11)}</span>
          </div>
          <div className="fact">
            <span className="fact__k">Distance</span>
            <span className="fact__v">{d.distance} km</span>
          </div>
        </div>
        {action && <div className="mt3">{action}</div>}
      </div>
    </Card>
  );
}

/* Map internal status keys to the human labels StatusBadge expects */
export function require_status(key) {
  const map = {
    draft: "Draft", published: "Awaiting NGO", accepted: "Accepted", assigned: "Volunteer assigned",
    picked_up: "Picked up", delivered: "Delivered", distributed: "Distributed",
    expired: "Expired", cancelled: "Cancelled", rejected: "Not accepted",
  };
  return map[key] || "Draft";
}
