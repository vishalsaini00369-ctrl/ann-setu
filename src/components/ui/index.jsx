import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import Icon from "../Icon.jsx";
import { useApp } from "../../data/store.jsx";

/* ============================================================
   ANN SETU — UI PRIMITIVES
   Every screen is composed only from these components.
   ============================================================ */

/* ---------------- Button ---------------------------------- */
export function Button({
  variant = "quiet", size = "md", icon, iconRight, children, block, loading,
  className = "", as: As = "button", ...rest
}) {
  const cls = [
    "btn",
    `btn--${variant}`,
    size !== "md" ? `btn--${size}` : "",
    block ? "btn--block" : "",
    !children && icon ? "btn--icon" : "",
    loading ? "is-disabled" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <As className={cls} {...rest} aria-busy={loading || undefined}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {!loading && icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children && <span className="btn__label">{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </As>
  );
}

/* ---------------- Form field shell ------------------------ */
export function Field({ label, htmlFor, required, optional, hint, error, children, className = "" }) {
  const invalid = Boolean(error);
  return (
    <div className={`field ${invalid ? "is-invalid" : ""} ${className}`}>
      {label && (
        <label className="field__label" htmlFor={htmlFor}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
          {optional && <span className="opt">(optional)</span>}
        </label>
      )}
      {children}
      {hint && !invalid && <div className="field__hint">{hint}</div>}
      {invalid && (
        <div className="field__error" role="alert">
          <Icon name="alertCircle" size={13} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export function Input({ error, className = "", ...rest }) {
  return <input className={`input ${className}`} aria-invalid={error ? "true" : undefined} {...rest} />;
}
export function Textarea(props) {
  return <textarea className="textarea" {...props} />;
}
export function Select({ options = [], placeholder, ...rest }) {
  return (
    <select className="select" {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}
export function SearchInput({ value, onChange, placeholder = "Search…", ...rest }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon"><Icon name="search" size={16} /></span>
      <input
        className="input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        {...rest}
      />
    </div>
  );
}
export function CheckRow({ checked, onChange, title, desc, id }) {
  return (
    <label className={`check ${checked ? "is-checked" : ""}`} htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="check__text">
        <span className="check__title">{title}</span>
        {desc && <span className="check__desc">{desc}</span>}
      </span>
    </label>
  );
}
export function SegmentedControl({ options, value, onChange, ariaLabel }) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          className={`segmented__item ${value === o.value ? "is-active" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Badges ---------------------------------- */
export function Badge({ tone = "neutral", children, dot, lg, className = "" }) {
  return (
    <span className={`badge badge--${tone} ${lg ? "badge--lg" : ""} ${className}`}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}

const STATUS_TONE = {
  Draft: "neutral", "Awaiting NGO": "info", Accepted: "success", "Volunteer assigned": "info",
  "Picked up": "warning", Delivered: "success", Distributed: "success", Expired: "danger",
  Cancelled: "neutral", "Not accepted": "danger", Verified: "success", Pending: "warning",
  Flagged: "danger", Rejected: "danger", Active: "success", Suspended: "danger", Invited: "info",
  Open: "warning", Investigating: "info", Resolved: "success", Closed: "neutral",
  High: "danger", Medium: "warning", Low: "neutral", Review: "info",
};

export function StatusBadge({ status, dot = true, lg }) {
  const label = typeof status === "string" ? status : status?.label;
  const tone = STATUS_TONE[label] || "neutral";
  return <Badge tone={tone} dot={dot} lg={lg}>{label}</Badge>;
}

export function VerifiedMark({ status }) {
  if (status === "verified") return <span className="vmark"><Icon name="checkCircle" size={13} /> Verified</span>;
  if (status === "pending") return <span className="vmark vmark--pending"><Icon name="clock" size={13} /> Pending</span>;
  if (status === "rejected") return <span className="vmark" style={{ color: "var(--danger)" }}><Icon name="xCircle" size={13} /> Rejected</span>;
  return <span className="vmark vmark--pending"><Icon name="alert" size={13} /> Review</span>;
}

/* ---------------- Card / Stat ----------------------------- */
export function Card({ children, className = "", interactive, raised, flat, ...rest }) {
  return (
    <div
      className={`card ${interactive ? "card--interactive" : ""} ${raised ? "card--raised" : ""} ${flat ? "card--flat" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
export function CardHead({ title, desc, action, id }) {
  return (
    <div className="card__header">
      <div style={{ minWidth: 0 }}>
        <h3 className="card__title" id={id}>{title}</h3>
        {desc && <p className="card__desc">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
export function CardBody({ children, tight, className = "", style }) {
  return <div className={`card__body ${tight ? "card__body--tight" : ""} ${className}`} style={style}>{children}</div>;
}
export function CardFoot({ children }) {
  return <div className="card__footer">{children}</div>;
}

export function Stat({ label, value, unit, icon, foot, trend }) {
  return (
    <div className="stat">
      <div className="stat__top">
        <span className="stat__label">{label}</span>
        {icon && <span className="stat__icon"><Icon name={icon} size={16} /></span>}
      </div>
      <div className="stat__value">
        {value}
        {unit && <small>{unit}</small>}
      </div>
      <div className="stat__foot">
        {trend && (
          <span className={`trend trend--${trend.dir}`}>
            <Icon name={trend.dir === "down" ? "trendDown" : "trendUp"} size={13} />
            {trend.value}
          </span>
        )}
        {foot && <span>{foot}</span>}
      </div>
    </div>
  );
}

export function SectionHead({ title, action, id }) {
  return (
    <div className="section-head">
      <h2 className="section-head__title" id={id}>{title}</h2>
      {action}
    </div>
  );
}

/* ---------------- Tabs ------------------------------------ */
export function Tabs({ items, value, onChange, ariaLabel = "Views" }) {
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          aria-selected={value === it.value}
          className={`tabs__item ${value === it.value ? "is-active" : ""}`}
          onClick={() => onChange(it.value)}
        >
          {it.label}
          {it.count != null && <span className="tabs__count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Table ----------------------------------- */
export function Table({ columns, rows, empty, rowKey, selectable, onRowClick, compact, adaptive = true, id }) {
  const [selected, setSelected] = useState([]);
  const allChecked = rows.length > 0 && selected.length === rows.length;

  if (!rows.length && empty) return empty;

  return (
    <div className="table-wrap">
      <table className={`table ${adaptive ? "table-adaptive" : ""} ${compact ? "table--compact" : ""}`} id={id}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: 44 }}>
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allChecked}
                  onChange={(e) => setSelected(e.target.checked ? rows.map((r) => r[rowKey]) : [])}
                  style={{ accentColor: "var(--green-600)", width: 16, height: 16 }}
                />
              </th>
            )}
            {columns.map((c) => (
              <th key={c.key} className={c.align === "right" ? "is-right" : ""} scope="col">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              className={selected.includes(row[rowKey]) ? "is-selected" : ""}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={onRowClick ? { cursor: "pointer" } : undefined}
            >
              {selectable && (
                <td data-label="Select" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row[rowKey]}`}
                    checked={selected.includes(row[rowKey])}
                    onChange={(e) =>
                      setSelected((s) => (e.target.checked ? [...s, row[rowKey]] : s.filter((x) => x !== row[rowKey])))
                    }
                    style={{ accentColor: "var(--green-600)", width: 16, height: 16 }}
                  />
                </td>
              )}
              {columns.map((c) => (
                <td
                  key={c.key}
                  data-label={c.header}
                  className={`${c.align === "right" ? "is-right" : ""} ${c.span2 ? "span-2" : ""}`}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Modal ----------------------------------- */
export function Modal({ open, onClose, title, desc, children, footer, size, labelledBy = "modal-title" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      const el = ref.current?.querySelector("input, button, select, textarea, [tabindex]");
      el?.focus();
    }, 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal ${size === "lg" ? "modal--lg" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={ref}
      >
        <div className="modal__header">
          <div>
            <h2 className="modal__title" id={labelledBy}>{title}</h2>
            {desc && <p className="modal__desc">{desc}</p>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------------- States ---------------------------------- */
export function EmptyState({ icon = "inbox", title, desc, action }) {
  return (
    <div className="empty">
      <div className="empty__art"><Icon name={icon} size={24} /></div>
      <div>
        <div className="empty__title">{title}</div>
        {desc && <p className="empty__desc mt1">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
export function Skeleton({ h = 12, w = "100%", r = 6, className = "" }) {
  return <div className={`skeleton ${className}`} style={{ height: h, width: w, borderRadius: r }} />;
}
export function LoadingCard() {
  return (
    <Card>
      <CardBody>
        <Skeleton h={18} w="38%" />
        <div style={{ height: 10 }} />
        <Skeleton h={12} w="92%" />
        <Skeleton h={12} w="86%" />
        <Skeleton h={12} w="64%" />
      </CardBody>
    </Card>
  );
}
export function Alert({ tone = "info", title, children, icon }) {
  const ico = icon || (tone === "danger" ? "alertCircle" : tone === "warning" ? "alert" : tone === "success" ? "checkCircle" : "info");
  return (
    <div className={`alert alert--${tone}`} role={tone === "danger" ? "alert" : "status"}>
      <span className="alert__icon"><Icon name={ico} size={16} /></span>
      <div>
        {title && <div className="alert__title">{title}</div>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
export function Avatar({ initials, size = "md", neutral, name }) {
  return (
    <span
      className={`avatar ${size !== "md" ? `avatar--${size}` : ""} ${neutral ? "avatar--neutral" : ""}`}
      aria-hidden={name ? undefined : "true"}
      title={name}
    >
      {initials}
    </span>
  );
}
export function Progress({ value, tone, lg }) {
  return (
    <div className={`progress ${lg ? "progress--lg" : ""}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={`progress__bar ${tone ? `progress__bar--${tone}` : ""}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li className="timeline__item" key={i}>
          <span className={`timeline__dot ${it.state === "done" ? "is-done" : it.state === "current" ? "is-current" : ""}`}>
            <Icon name={it.icon || (it.state === "done" ? "check" : "clock")} size={13} />
          </span>
          <div>
            <div className="timeline__title">{it.title}</div>
            <div className="timeline__meta">{it.meta}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Chips({ items, value, onChange, multi }) {
  return (
    <div className="row wrap g2">
      {items.map((it) => {
        const active = multi ? value.includes(it.value) : value === it.value;
        return (
          <button
            key={it.value}
            className={`chip ${active ? "is-active" : ""}`}
            onClick={() => {
              if (!multi) return onChange(it.value);
              onChange(active ? value.filter((v) => v !== it.value) : [...value, it.value]);
            }}
            aria-pressed={active}
          >
            {it.label}
            {it.count != null && <span style={{ opacity: 0.65 }}>{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Toasts ---------------------------------- */
export function Toasts() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="toast-stack" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((t) => (
        <div className={`toast ${t.tone === "error" ? "toast--error" : ""}`} key={t.id}>
          <span className="toast__icon">
            <Icon name={t.tone === "error" ? "alertCircle" : "checkCircle"} size={17} />
          </span>
          <div style={{ minWidth: 0 }}>
            <div className="toast__title">{t.title}</div>
            {t.body && <div className="toast__body">{t.body}</div>}
          </div>
          <button className="toast__close" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- KV list --------------------------------- */
export function KV({ rows }) {
  return (
    <div className="kv">
      {rows.map(([k, v], i) => (
        <div className="kv__row" key={i}>
          <span className="kv__k">{k}</span>
          <span className="kv__v">{v}</span>
        </div>
      ))}
    </div>
  );
}
