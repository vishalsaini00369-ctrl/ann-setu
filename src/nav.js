/* ============================================================
   ANN SETU — NAVIGATION MODEL
   One config drives the desktop sidebar, the mobile drawer and
   the mobile bottom tab bar for every role. Single source of
   truth for information architecture.
   ============================================================ */

export const roles = [
  { value: "donor", label: "Donor", deva: "दाता", desc: "Restaurants, hotels, kitchens", icon: "store", entry: "/donor" },
  { value: "ngo", label: "NGO", deva: "संस्था", desc: "Shelters & community kitchens", icon: "handHeart", entry: "/ngo" },
  { value: "volunteer", label: "Volunteer", deva: "स्वयंसेवक", desc: "Pickup & delivery partners", icon: "truck", entry: "/volunteer" },
  { value: "admin", label: "Admin", deva: "प्रशासक", desc: "Platform operations team", icon: "shield", entry: "/admin" },
  { value: "superadmin", label: "Super Admin", deva: "मुख्य प्रशासक", desc: "Full platform control", icon: "key", entry: "/superadmin" },
];

export const navConfig = {
  donor: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", icon: "dashboard", to: "/donor" },
        { label: "Create donation", icon: "plus", to: "/donor/new" },
        { label: "Active donations", icon: "activity", to: "/donor/active", count: 3 },
      ],
    },
    {
      label: "Records",
      items: [
        { label: "Donation history", icon: "history", to: "/donor/history" },
        { label: "Impact reports", icon: "barChart", to: "/donor/impact" },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Profile & settings", icon: "settings", to: "/donor/profile" },
      ],
    },
  ],
  ngo: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", icon: "dashboard", to: "/ngo" },
        { label: "Nearby donations", icon: "mapPin", to: "/ngo/nearby", count: 7 },
        { label: "Accepted", icon: "checkCircle", to: "/ngo/accepted" },
      ],
    },
    {
      label: "Operations",
      items: [
        { label: "Food requirements", icon: "clip", to: "/ngo/requirements" },
        { label: "Volunteer coordination", icon: "users", to: "/ngo/volunteers" },
        { label: "Distribution records", icon: "bowl", to: "/ngo/distributions" },
      ],
    },
    {
      label: "Insights",
      items: [
        { label: "Impact reports", icon: "barChart", to: "/ngo/impact" },
      ],
    },
  ],
  volunteer: [
    {
      label: "Today",
      items: [
        { label: "Dashboard", icon: "dashboard", to: "/volunteer" },
        { label: "Assigned pickups", icon: "truck", to: "/volunteer/pickups", count: 3 },
      ],
    },
    {
      label: "Records",
      items: [
        { label: "Assignment history", icon: "history", to: "/volunteer/history" },
      ],
    },
    {
      label: "Account",
      items: [{ label: "Profile & settings", icon: "settings", to: "/volunteer/profile" }],
    },
  ],
  admin: [
    {
      label: "Overview",
      items: [
        { label: "Platform overview", icon: "dashboard", to: "/admin" },
        { label: "Live donations", icon: "activity", to: "/admin/donations" },
      ],
    },
    {
      label: "Verification",
      items: [
        { label: "Donor verification", icon: "store", to: "/admin/donors", count: 3 },
        { label: "NGO verification", icon: "handHeart", to: "/admin/ngos", count: 2 },
        { label: "Volunteer verification", icon: "userCheck", to: "/admin/volunteers", count: 2 },
      ],
    },
    {
      label: "Trust & safety",
      items: [
        { label: "Complaints", icon: "message", to: "/admin/complaints", count: 2 },
        { label: "Safety incidents", icon: "shieldAlert", to: "/admin/incidents", count: 1 },
      ],
    },
    {
      label: "Insights",
      items: [
        { label: "Analytics", icon: "lineChart", to: "/admin/analytics" },
        { label: "Reports", icon: "file", to: "/admin/reports" },
      ],
    },
  ],
  superadmin: [
    {
      label: "Overview",
      items: [
        { label: "Platform overview", icon: "dashboard", to: "/superadmin" },
        { label: "Platform analytics", icon: "lineChart", to: "/superadmin/analytics" },
      ],
    },
    {
      label: "Administration",
      items: [
        { label: "User management", icon: "users", to: "/superadmin/users" },
        { label: "Admin management", icon: "shield", to: "/superadmin/admins" },
        { label: "System configuration", icon: "settings", to: "/superadmin/config" },
      ],
    },
    {
      label: "Governance",
      items: [
        { label: "Audit logs", icon: "database", to: "/superadmin/audit" },
        { label: "Operations", icon: "server", to: "/admin" },
      ],
    },
  ],
};

/* The four destinations shown in the mobile bottom bar per role. */
export const bottomTabs = {
  donor: [
    { label: "Home", icon: "dashboard", to: "/donor" },
    { label: "Donate", icon: "plus", to: "/donor/new" },
    { label: "Active", icon: "activity", to: "/donor/active" },
    { label: "Impact", icon: "barChart", to: "/donor/impact" },
    { label: "Profile", icon: "user", to: "/donor/profile" },
  ],
  ngo: [
    { label: "Home", icon: "dashboard", to: "/ngo" },
    { label: "Nearby", icon: "mapPin", to: "/ngo/nearby" },
    { label: "Accepted", icon: "checkCircle", to: "/ngo/accepted" },
    { label: "Distribute", icon: "bowl", to: "/ngo/distributions" },
    { label: "Profile", icon: "user", to: "/ngo/requirements" },
  ],
  volunteer: [
    { label: "Home", icon: "dashboard", to: "/volunteer" },
    { label: "Pickups", icon: "truck", to: "/volunteer/pickups" },
    { label: "History", icon: "history", to: "/volunteer/history" },
    { label: "Profile", icon: "user", to: "/volunteer/profile" },
  ],
  admin: [
    { label: "Overview", icon: "dashboard", to: "/admin" },
    { label: "Verify", icon: "userCheck", to: "/admin/donors" },
    { label: "Trust", icon: "shieldAlert", to: "/admin/complaints" },
    { label: "Analytics", icon: "lineChart", to: "/admin/analytics" },
  ],
  superadmin: [
    { label: "Overview", icon: "dashboard", to: "/superadmin" },
    { label: "Users", icon: "users", to: "/superadmin/users" },
    { label: "Config", icon: "settings", to: "/superadmin/config" },
    { label: "Audit", icon: "database", to: "/superadmin/audit" },
  ],
};
