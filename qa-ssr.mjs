/* Server-render every route to catch runtime errors without a browser. */
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "./src/data/store.jsx";
import App from "./src/App.jsx";

const routes = [
  "/", "/login", "/register",
  "/donor", "/donor/new", "/donor/active", "/donor/history", "/donor/donations/AS-2026-1042", "/donor/donations/AS-2026-1039", "/donor/impact", "/donor/profile",
  "/ngo", "/ngo/nearby", "/ngo/donations/AS-2026-1042", "/ngo/accepted", "/ngo/requirements", "/ngo/volunteers", "/ngo/distributions", "/ngo/impact",
  "/volunteer", "/volunteer/pickups", "/volunteer/pickups/AS-2026-1040", "/volunteer/navigate/AS-2026-1040", "/volunteer/verify/AS-2026-1040", "/volunteer/confirm/AS-2026-1040", "/volunteer/history", "/volunteer/profile",
  "/admin", "/admin/donors", "/admin/ngos", "/admin/volunteers", "/admin/donations", "/admin/complaints", "/admin/incidents", "/admin/analytics", "/admin/reports",
  "/superadmin", "/superadmin/users", "/superadmin/admins", "/superadmin/config", "/superadmin/audit", "/superadmin/analytics",
  "/design-system", "/handoff",
  "/donor/donations/NOPE"
];

let fails = 0;
for (const r of routes) {
  try {
    const html = renderToString(
      React.createElement(MemoryRouter, { initialEntries: [r] },
        React.createElement(AppProvider, null, React.createElement(App)))
    );
    if (!html || html.length < 500) throw new Error("suspiciously small output: " + (html || "").length);
    console.log(`✓ ${r}  (${html.length} chars)`);
  } catch (e) {
    fails++;
    console.log(`✗ ${r}\n    ${e.message.split("\n")[0]}`);
  }
}
console.log(fails ? `\n${fails} FAILURES` : "\nALL ROUTES RENDER");
process.exit(fails ? 1 : 0);
