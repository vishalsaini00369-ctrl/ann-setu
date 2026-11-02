import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import Logo, { LogoMark } from "../Logo.jsx";
import { Badge, Toasts, Avatar } from "../ui/index.jsx";
import { navConfig, bottomTabs, roles } from "../../nav.js";
import { useApp } from "../../data/store.jsx";
import { roleProfiles } from "../../data/mockData.js";

/* ============================================================
   APP SHELL — responsive chrome for every authenticated screen
   Desktop: sticky sidebar + sticky topbar
   Tablet/mobile: drawer + bottom tab bar
   ============================================================ */

export function RoleSwitcher({ compact }) {
  const { role, setRole } = useApp();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const active = roles.find((r) => r.value === role);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className="btn btn--quiet btn--sm"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{ gap: 6 }}
      >
        <Icon name={active.icon} size={14} />
        {!compact && <span className="role-switcher__label">{active.label}</span>}
        <Icon name="chevronDown" size={13} />
      </button>
      {open && (
        <div className="popover" role="menu" style={{ width: 268 }}>
          <div className="popover__head">
            <span className="text-sm fw-semi ink">Switch experience</span>
            <Badge tone="warning">Prototype</Badge>
          </div>
          <div style={{ padding: 6 }}>
            {roles.map((r) => (
              <button
                key={r.value}
                role="menuitem"
                className={`nav-item ${r.value === role ? "is-active" : ""}`}
                style={{ width: "100%" }}
                onClick={() => {
                  setRole(r.value);
                  nav(r.entry);
                  setOpen(false);
                }}
              >
                <span className="nav-item__icon"><Icon name={r.icon} size={16} /></span>
                <span className="nav-item__label">
                  <span style={{ display: "block", lineHeight: 1.25 }}>{r.label}</span>
                  <span className="text-xs muted" style={{ fontWeight: 400 }}>{r.desc}</span>
                </span>
              </button>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", padding: 10 }}>
            <Link to="/" className="btn btn--ghost btn--sm" style={{ width: "100%" }} onClick={() => setOpen(false)}>
              <Icon name="globe" size={14} /> Back to website
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsMenu() {
  const { notifications, readAll, toast } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unread = notifications.filter((n) => n.unread).length;
  useEffect(() => {
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button className="icon-btn" onClick={() => setOpen((o) => !o)} aria-label={`Notifications, ${unread} unread`} aria-expanded={open}>
        <Icon name="bell" size={19} />
        {unread > 0 && <span className="icon-btn__dot" />}
      </button>
      {open && (
        <div className="popover" role="dialog" aria-label="Notifications">
          <div className="popover__head">
            <span className="text-sm fw-semi ink">Notifications · {unread} new</span>
            <button className="text-sm green fw-semi" onClick={() => { readAll(); toast("All notifications marked as read"); }}>
              Mark all read
            </button>
          </div>
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {notifications.map((n) => (
              <div className="popover__item" key={n.id}>
                <span className="stat__icon" style={{ width: 28, height: 28, background: n.tone === "warning" ? "var(--warning-bg)" : n.tone === "danger" ? "var(--danger-bg)" : "var(--green-50)", color: n.tone === "warning" ? "var(--warning)" : n.tone === "danger" ? "var(--danger)" : "var(--green-700)" }}>
                  <Icon name={n.icon} size={14} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="text-md fw-semi ink">{n.title}</div>
                  <div className="text-sm muted" style={{ lineHeight: 1.45 }}>{n.body}</div>
                  <div className="text-xs faint mt1">{n.time}</div>
                </div>
                {n.unread && <span style={{ width: 7, height: 7, borderRadius: 9, background: "var(--green-600)", flex: "none", marginTop: 6 }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UserMenu() {
  const { role, toast } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const p = roleProfiles[role];
  useEffect(() => {
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button className="row g2" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" style={{ padding: 3, borderRadius: 10 }}>
        <Avatar initials={p.initials} size="sm" />
        <span className="desktop-only stack" style={{ textAlign: "left" }}>
          <span className="text-md fw-semi ink truncate" style={{ maxWidth: 140 }}>{p.shortName}</span>
          <span className="text-xs muted truncate" style={{ maxWidth: 140 }}>{p.subRole}</span>
        </span>
        <Icon name="chevronDown" size={13} />
      </button>
      {open && (
        <div className="popover" role="menu" style={{ width: 232 }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div className="text-md fw-semi ink">{p.name}</div>
            <div className="text-xs muted">{p.subRole}</div>
          </div>
          <div style={{ padding: 6 }}>
            {[
              { label: "Profile & settings", icon: "settings" },
              { label: "Help centre", icon: "info" },
              { label: "Download the app", icon: "phone" },
            ].map((i) => (
              <button key={i.label} className="nav-item" style={{ width: "100%" }} onClick={() => { toast(i.label, "Prototype only — this screen is not wired.", "success"); setOpen(false); }}>
                <span className="nav-item__icon"><Icon name={i.icon} size={16} /></span>
                <span className="nav-item__label">{i.label}</span>
              </button>
            ))}
            <div className="divider" style={{ margin: "6px 0" }} />
            <Link to="/login" className="nav-item danger" style={{ width: "100%" }} onClick={() => setOpen(false)}>
              <span className="nav-item__icon" style={{ color: "var(--danger)" }}><Icon name="logout" size={16} /></span>
              <span className="nav-item__label" style={{ color: "var(--danger)" }}>Sign out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const { role } = useApp();
  const groups = navConfig[role];
  const p = roleProfiles[role];
  const location = useLocation();

  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar__brand">
          <Link to="/" aria-label="ANN SETU home" style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <LogoMark size={32} />
            <span className="sidebar__brand-text">
              <span className="sidebar__wordmark">ANN SETU<span className="deva">अन्न सेतु</span></span>
            </span>
          </Link>
          <button className="icon-btn mobile-only" onClick={onClose} aria-label="Close navigation" style={{ marginLeft: "auto" }}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="sidebar__scroll">
          {groups.map((g) => (
            <div className="sidebar__section" key={g.label}>
              <div className="sidebar__section-label">{g.label}</div>
              <nav>
                {g.items.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.to === `/${role}`}
                    className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}
                    onClick={onClose}
                    title={it.label}
                  >
                    <span className="nav-item__icon"><Icon name={it.icon} size={17} /></span>
                    <span className="nav-item__label">{it.label}</span>
                    {it.count != null && <span className="nav-item__count nav-item__count--quiet">{it.count}</span>}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}

          <div className="sidebar__section">
            <div className="sidebar__section-label">Design</div>
            <NavLink to="/design-system" className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`} onClick={onClose}>
              <span className="nav-item__icon"><Icon name="layers" size={17} /></span>
              <span className="nav-item__label">Design system</span>
            </NavLink>
            <NavLink to="/handoff" className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`} onClick={onClose}>
              <span className="nav-item__icon"><Icon name="file" size={17} /></span>
              <span className="nav-item__label">Dev handoff</span>
            </NavLink>
          </div>
        </div>

        <div className="sidebar__footer">
          <button className="sidebar__user" onClick={onToggleCollapse} title="Collapse sidebar" aria-label="Collapse sidebar">
            <Avatar initials={p.initials} />
            <span className="sidebar__user-meta">
              <span className="sidebar__user-name">{p.shortName}</span>
              <span className="sidebar__user-role">{p.subRole}</span>
            </span>
            <Icon name="chevronLeft" size={15} className="desktop-only" />
          </button>
        </div>
      </aside>
    </>
  );
}

function BottomNav() {
  const { role } = useApp();
  const tabs = bottomTabs[role] || [];
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.to === `/${role}`}
          className={({ isActive }) => `bottom-nav__item ${isActive ? "is-active" : ""}`}
        >
          <Icon name={t.icon} size={20} />
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell({ children, breadcrumb }) {
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role, setRole } = useApp();

  useEffect(() => setDrawer(false), [location.pathname]);

  /* Deep links keep the active role in sync with the URL prefix */
  useEffect(() => {
    const seg = location.pathname.split("/")[1];
    if (["donor", "ngo", "volunteer", "admin", "superadmin"].includes(seg) && seg !== role) {
      setRole(seg);
    }
  }, [location.pathname, role, setRole]);

  return (
    <div className={`shell ${collapsed ? "is-collapsed" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Sidebar open={drawer} onClose={() => setDrawer(false)} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />

      <div className="main">
        <div className="proto-bar">
          <span className="proto-bar__tag">Prototype</span>
          <span><strong>Fictional sample data.</strong> Changes are not saved — refresh resets the demo.</span>
          <span style={{ marginLeft: "auto" }} className="desktop-only">Role: <strong style={{ textTransform: "capitalize" }}>{role}</strong></span>
        </div>

        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setDrawer(true)} aria-label="Open navigation">
            <Icon name="menu" size={20} />
          </button>
          <div className="topbar__search desktop-only">
            <div className="search-bar">
              <span className="search-bar__icon"><Icon name="search" size={16} /></span>
              <input className="input" placeholder="Search donations, NGOs, volunteers, IDs…" aria-label="Search platform" />
            </div>
          </div>
          <div className="topbar__actions">
            <RoleSwitcher compact={false} />
            <span className="topbar__divider desktop-only" />
            <button className="icon-btn mobile-only" aria-label="Search"><Icon name="search" size={19} /></button>
            <NotificationsMenu />
            <UserMenu />
          </div>
        </header>

        <main id="main-content" className="page" tabIndex={-1}>
          {breadcrumb}
          {children}
        </main>
      </div>

      <BottomNav />
      <Toasts />
    </div>
  );
}

/* --------- Page header used by every screen ---------------- */
export function PageHead({ eyebrow, title, sub, actions, badge }) {
  return (
    <div className="page-head">
      <div style={{ minWidth: 0 }}>
        {eyebrow && <div className="page-head__eyebrow">{eyebrow}</div>}
        <h1 className="page-head__title" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {title}
          {badge}
        </h1>
        {sub && <p className="page-head__sub">{sub}</p>}
      </div>
      {actions && <div className="page-head__actions">{actions}</div>}
    </div>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="breadcrumb__sep" aria-hidden="true">/</span>}
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page" className="ink fw-med">{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
