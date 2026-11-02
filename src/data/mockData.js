/* ============================================================
   ANN SETU — PROTOTYPE SAMPLE DATA
   ------------------------------------------------------------------
   ⚠ All records below are FICTIONAL demo data for prototype
   purposes only. Organisation names, phone numbers, licences and
   addresses are illustrative. Nothing here is verified data.
   ============================================================ */

export const PROTO = {
  label: "Prototype data",
  note: "Fictional records for demonstration only — not verified data.",
};

/* ---------------- People & organisations ------------------ */
export const currentUser = {
  id: "usr-204",
  name: "Rawat Mishthan Bhandar",
  shortName: "Rawat",
  role: "donor",
  subRole: "Restaurant · Verified donor",
  phone: "+91 98290 11234",
  email: "kitchen@rawatmishthan.example",
  city: "Jaipur, Rajasthan",
  avatar: "RM",
  verified: true,
  memberSince: "Feb 2025",
  rating: 4.8,
};

export const roleProfiles = {
  donor: { name: "Rawat Mishthan Bhandar", shortName: "Rawat", initials: "RM", subRole: "Restaurant · Donor", verified: true },
  ngo: { name: "Annapurna Seva Sansthan", shortName: "Annapurna", initials: "AS", subRole: "NGO · 80G registered", verified: true },
  volunteer: { name: "Kabir Sharma", shortName: "Kabir", initials: "KS", subRole: "Volunteer · Two-wheeler", verified: true },
  admin: { name: "Meera Iyer", shortName: "Meera", initials: "MI", subRole: "Platform Administrator", verified: true },
  superadmin: { name: "Arjun Nair", shortName: "Arjun", initials: "AN", subRole: "Super Administrator", verified: true },
};

export const ngos = [
  { id: "ngo-11", name: "Annapurna Seva Sansthan", area: "Bani Park", reg: "RJ/2016/0142871",  contact: "+91 98290 44551", reach: 420, verified: "verified", since: "2016", focus: "Community kitchens", distance: 1.2, rating: 4.7 },
  { id: "ngo-12", name: "Feeding Jaipur Foundation", area: "Malviya Nagar", reg: "RJ/2019/0220114", contact: "+91 94140 22319", reach: 260, verified: "verified", since: "2019", focus: "Shelter meals", distance: 4.8, rating: 4.5 },
  { id: "ngo-13", name: "Robin Hood Army — Jaipur", area: "C-Scheme", reg: "DL/2014/0077230", contact: "+91 98290 77610", reach: 180, verified: "verified", since: "2014", focus: "Street distribution", distance: 2.6, rating: 4.9 },
  { id: "ngo-14", name: "Pratham Shiksha Trust", area: "Jawahar Nagar", reg: "RJ/2021/0331920", contact: "+91 90010 88342", reach: 140, verified: "pending", since: "2021", focus: "Child nutrition", distance: 3.4, rating: 4.2 },
  { id: "ngo-15", name: "Seva Bharati Ashram", area: "Amer Road", reg: "RJ/2012/0090118", contact: "+91 94140 66200", reach: 95, verified: "verified", since: "2012", focus: "Old-age homes", distance: 7.9, rating: 4.4 },
];

export const volunteers = [
  { id: "vol-31", name: "Kabir Sharma", initials: "KS", phone: "+91 90240 11001", vehicle: "Two-wheeler", area: "Bani Park", rating: 4.9, runs: 62, verified: "verified", available: true },
  { id: "vol-32", name: "Priya Menon", initials: "PM", phone: "+91 90240 11002", vehicle: "Two-wheeler", area: "Vaishali Nagar", rating: 4.8, runs: 47, verified: "verified", available: true },
  { id: "vol-33", name: "Danish Qureshi", initials: "DQ", phone: "+91 90240 11003", vehicle: "Four-wheeler (bolero)", area: "Malviya Nagar", rating: 4.6, runs: 31, verified: "verified", available: false },
  { id: "vol-34", name: "Sunita Rathore", initials: "SR", phone: "+91 90240 11004", vehicle: "Two-wheeler", area: "C-Scheme", rating: 4.7, runs: 28, verified: "verified", available: true },
  { id: "vol-35", name: "Vikram Singh", initials: "VS", phone: "+91 90240 11005", vehicle: "Cycling", area: "Jawahar Nagar", rating: 4.4, runs: 12, verified: "pending", available: true },
];

export const donors = [
  { id: "don-1", org: "Rawat Mishthan Bhandar", type: "Restaurant", area: "Bani Park", fssai: "12719010002345", verified: "verified", donations: 68, servings: 4820, joined: "Feb 2025" },
  { id: "don-2", org: "Suvarna Mahal — Rambagh Palace", type: "Hotel", area: "Bhawani Singh Rd", fssai: "12719010009812", verified: "verified", donations: 54, servings: 7300, joined: "Nov 2024" },
  { id: "don-3", org: "Spice Court", type: "Restaurant", area: "Civil Lines", fssai: "12719010031190", verified: "verified", donations: 39, servings: 2110, joined: "Mar 2025" },
  { id: "don-4", org: "Handi Restaurant", type: "Restaurant", area: "MI Road", fssai: "12719010044021", verified: "pending", donations: 0, servings: 0, joined: "Oct 2026" },
  { id: "don-5", org: "Tapri Central", type: "Café", area: "C-Scheme", fssai: "12719010055218", verified: "pending", donations: 0, servings: 0, joined: "Oct 2026" },
  { id: "don-6", org: "Hotel Pearl Palace", type: "Hotel", area: "Hathroi Fort", fssai: "12719010066710", verified: "rejected", donations: 0, servings: 0, joined: "Sep 2026" },
  { id: "don-7", org: "Laxmi Mishthan Bhandar", type: "Sweet shop", area: "Johari Bazaar", fssai: "12719010071345", verified: "verified", donations: 22, servings: 1540, joined: "Jun 2025" },
];

/* ---------------- Donations ------------------------------- */
export const statusMeta = {
  draft:       { label: "Draft",            tone: "neutral", icon: "edit" },
  published:   { label: "Awaiting NGO",     tone: "info",    icon: "inbox" },
  accepted:    { label: "Accepted",         tone: "success", icon: "checkCircle" },
  assigned:    { label: "Volunteer assigned", tone: "info",  icon: "users" },
  picked_up:   { label: "Picked up",        tone: "warning", icon: "truck" },
  delivered:   { label: "Delivered",        tone: "success", icon: "check" },
  distributed: { label: "Distributed",      tone: "success", icon: "bowl" },
  expired:     { label: "Expired",          tone: "danger",  icon: "clock" },
  cancelled:   { label: "Cancelled",        tone: "neutral", icon: "xCircle" },
  rejected:    { label: "Not accepted",     tone: "danger",  icon: "xCircle" },
};

export const donations = [
  {
    id: "AS-2026-1042", title: "Veg thali — dal, sabzi, rice, roti", category: "Cooked meal",
    donor: "Rawat Mishthan Bhandar", donorType: "Restaurant", donorId: "don-1",
    ngo: "Annapurna Seva Sansthan", ngoId: "ngo-11", volunteer: null, volunteerId: null,
    servings: 120, quantity: "18 kg", status: "published",
    window: { start: "2026-10-30T13:00", end: "2026-10-30T15:30" },
    prepared: "2026-10-30T10:30", expires: "2026-10-30T18:00",
    storage: "Hot holding at 63°C", allergens: ["Milk"], veg: true,
    pickup: { area: "Bani Park", address: "Near Collectorate Circle, Bani Park, Jaipur 302016", lat: 26.9301, lng: 75.7902, contact: "Kitchen desk", phone: "+91 98290 11234" },
    notes: "Packed in 4 insulated carriers. Please bring 2 large crates if possible.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T09:52", distance: 1.2, urgency: "critical",
  },
  {
    id: "AS-2026-1041", title: "Assorted bakery — breads & buns", category: "Bakery",
    donor: "Tapri Central", donorType: "Café", donorId: "don-5",
    ngo: "Robin Hood Army — Jaipur", ngoId: "ngo-13", volunteer: "Kabir Sharma", volunteerId: "vol-31",
    servings: 60, quantity: "7 kg", status: "assigned",
    window: { start: "2026-10-30T16:00", end: "2026-10-30T18:00" },
    prepared: "2026-10-30T08:00", expires: "2026-10-31T12:00",
    storage: "Ambient, sealed", allergens: ["Gluten"], veg: true,
    pickup: { area: "C-Scheme", address: "Ashok Marg, C-Scheme, Jaipur 302001", lat: 26.9071, lng: 75.8064, contact: "Store manager", phone: "+91 98290 55120" },
    notes: "Surplus from morning bake. Sealed in paper bags.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T09:10", distance: 2.6, urgency: "soon",
  },
  {
    id: "AS-2026-1040", title: "Paneer curry + jeera rice", category: "Cooked meal",
    donor: "Suvarna Mahal — Rambagh Palace", donorType: "Hotel", donorId: "don-2",
    ngo: "Feeding Jaipur Foundation", ngoId: "ngo-12", volunteer: "Danish Qureshi", volunteerId: "vol-33",
    servings: 200, quantity: "34 kg", status: "picked_up",
    window: { start: "2026-10-30T11:30", end: "2026-10-30T13:30" },
    prepared: "2026-10-30T09:00", expires: "2026-10-30T17:00",
    storage: "Hot holding, 65°C at pickup", allergens: ["Milk", "Tree nuts"], veg: true,
    pickup: { area: "Bhawani Singh Rd", address: "Rambagh Palace Gate 2, Jaipur 302005", lat: 26.8985, lng: 75.8080, contact: "Banquet sous chef", phone: "+91 94140 77120" },
    notes: "Banquet surplus. Cold chain maintained since 09:00.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T08:40", distance: 3.1, urgency: "soon",
  },
  {
    id: "AS-2026-1039", title: "Dal baati churma", category: "Cooked meal",
    donor: "Spice Court", donorType: "Restaurant", donorId: "don-3",
    ngo: "Annapurna Seva Sansthan", ngoId: "ngo-11", volunteer: "Priya Menon", volunteerId: "vol-32",
    servings: 90, quantity: "22 kg", status: "delivered",
    window: { start: "2026-10-30T12:00", end: "2026-10-30T14:00" },
    prepared: "2026-10-30T10:00", expires: "2026-10-30T16:00",
    storage: "Ambient, covered", allergens: ["Gluten", "Ghee"], veg: true,
    pickup: { area: "Civil Lines", address: "Sardar Patel Marg, Civil Lines, Jaipur 302006", lat: 26.9135, lng: 75.7845, contact: "Front desk", phone: "+91 98290 33445" },
    notes: "Delivered at 12:55, 90 servings confirmed by NGO.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T07:55", distance: 2.0, urgency: "ok",
  },
  {
    id: "AS-2026-1038", title: "Fresh fruit boxes", category: "Packaged",
    donor: "Hotel Pearl Palace", donorType: "Hotel", donorId: "don-6",
    ngo: "Seva Bharati Ashram", ngoId: "ngo-15", volunteer: "Sunita Rathore", volunteerId: "vol-34",
    servings: 45, quantity: "9 kg", status: "distributed",
    window: { start: "2026-10-29T17:00", end: "2026-10-29T19:00" },
    prepared: "2026-10-29T14:00", expires: "2026-10-30T12:00",
    storage: "Chilled 4°C", allergens: [], veg: true,
    pickup: { area: "Hathroi Fort", address: "Hathroi Fort, Ajmer Road, Jaipur 302006", lat: 26.9180, lng: 75.7990, contact: "Reception", phone: "+91 94140 22100" },
    notes: "Distributed to 45 residents at the ashram.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-29T13:20", distance: 5.4, urgency: "ok",
  },
  {
    id: "AS-2026-1037", title: "Mithai boxes — festival surplus", category: "Sweets",
    donor: "Laxmi Mishthan Bhandar", donorType: "Sweet shop", donorId: "don-7",
    ngo: "Robin Hood Army — Jaipur", ngoId: "ngo-13", volunteer: null, volunteerId: null,
    servings: 150, quantity: "14 kg", status: "accepted",
    window: { start: "2026-10-30T18:00", end: "2026-10-30T20:00" },
    prepared: "2026-10-30T11:00", expires: "2026-11-01T20:00",
    storage: "Ambient, sealed boxes", allergens: ["Milk", "Tree nuts"], veg: true,
    pickup: { area: "Johari Bazaar", address: "Johari Bazaar Rd, Jaipur 302003", lat: 26.9200, lng: 75.8260, contact: "Counter 3", phone: "+91 98290 66778" },
    notes: "Diwali surplus. Accepting volunteer assignment.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T09:30", distance: 3.8, urgency: "soon",
  },
  {
    id: "AS-2026-1033", title: "Roti & seasonal sabzi — evening surplus", category: "Cooked meal",
    donor: "Rawat Mishthan Bhandar", donorType: "Restaurant", donorId: "don-1",
    ngo: "Annapurna Seva Sansthan", ngoId: "ngo-11", volunteer: "Kabir Sharma", volunteerId: "vol-31",
    servings: 75, quantity: "13 kg", status: "assigned",
    window: { start: "2026-10-30T19:00", end: "2026-10-30T21:00" },
    prepared: "2026-10-30T17:30", expires: "2026-10-30T23:30",
    storage: "Hot holding at 63°C", allergens: ["Gluten"], veg: true,
    pickup: { area: "Bani Park", address: "Near Collectorate Circle, Bani Park, Jaipur 302016", lat: 26.9301, lng: 75.7902, contact: "Kitchen desk", phone: "+91 98290 11234" },
    notes: "Evening surplus. Volunteer Kabir Sharma is collecting at 19:15.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-30T11:20", distance: 1.2, urgency: "ok",
  },
  {
    id: "AS-2026-1036", title: "Chole bhature", category: "Cooked meal",
    donor: "Rawat Mishthan Bhandar", donorType: "Restaurant", donorId: "don-1",
    ngo: "Feeding Jaipur Foundation", ngoId: "ngo-12", volunteer: "Priya Menon", volunteerId: "vol-32",
    servings: 110, quantity: "19 kg", status: "distributed",
    window: { start: "2026-10-28T09:00", end: "2026-10-28T11:00" },
    prepared: "2026-10-28T07:00", expires: "2026-10-28T13:00",
    storage: "Hot holding at 63°C", allergens: ["Gluten"], veg: true,
    pickup: { area: "Bani Park", address: "Near Collectorate Circle, Bani Park, Jaipur 302016", lat: 26.9301, lng: 75.7902, contact: "Kitchen desk", phone: "+91 98290 11234" },
    notes: "110 servings distributed at Malviya Nagar shelter.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-28T06:30", distance: 4.8, urgency: "ok",
  },
  {
    id: "AS-2026-1035", title: "Sandwiches & cold coffee", category: "Cooked meal",
    donor: "Tapri Central", donorType: "Café", donorId: "don-5",
    ngo: null, ngoId: null, volunteer: null, volunteerId: null,
    servings: 40, quantity: "5 kg", status: "expired",
    window: { start: "2026-10-27T16:00", end: "2026-10-27T18:00" },
    prepared: "2026-10-27T12:00", expires: "2026-10-27T20:00",
    storage: "Chilled 4°C", allergens: ["Gluten", "Milk"], veg: true,
    pickup: { area: "C-Scheme", address: "Ashok Marg, C-Scheme, Jaipur 302001", lat: 26.9071, lng: 75.8064, contact: "Store manager", phone: "+91 98290 55120" },
    notes: "Window closed before an NGO accepted. Marked expired by system.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-27T11:00", distance: 2.6, urgency: "ok",
  },
  {
    id: "AS-2026-1034", title: "Roti & seasonal sabzi", category: "Cooked meal",
    donor: "Rawat Mishthan Bhandar", donorType: "Restaurant", donorId: "don-1",
    ngo: "Annapurna Seva Sansthan", ngoId: "ngo-11", volunteer: "Kabir Sharma", volunteerId: "vol-31",
    servings: 140, quantity: "21 kg", status: "distributed",
    window: { start: "2026-10-26T13:00", end: "2026-10-26T15:00" },
    prepared: "2026-10-26T10:00", expires: "2026-10-26T18:00",
    storage: "Hot holding at 63°C", allergens: ["Gluten"], veg: true,
    pickup: { area: "Bani Park", address: "Near Collectorate Circle, Bani Park, Jaipur 302016", lat: 26.9301, lng: 75.7902, contact: "Kitchen desk", phone: "+91 98290 11234" },
    notes: "Served at Bani Park community kitchen.",
    safety: { tempOk: true, packaged: true, handlerCertified: true },
    createdAt: "2026-10-26T09:15", distance: 1.2, urgency: "ok",
  },
];

/* Donations belonging to the signed-in donor (Restaurant) */
export const myDonationIds = ["AS-2026-1042", "AS-2026-1033", "AS-2026-1036", "AS-2026-1034"];

/* ---------------- Activity, notifications ----------------- */
export const activities = [
  { id: "a1", icon: "checkCircle", tone: "success", title: "Annapurna Seva Sansthan accepted AS-2026-1042", meta: "120 servings · 8 minutes ago" },
  { id: "a2", icon: "truck", tone: "warning", title: "Danish Qureshi picked up AS-2026-1040", meta: "34 kg · 26 minutes ago" },
  { id: "a3", icon: "userCheck", tone: "info", title: "Priya Menon assigned to AS-2026-1039", meta: "Volunteer confirmed · 1 hour ago" },
  { id: "a4", icon: "bowl", tone: "success", title: "90 servings distributed from AS-2026-1039", meta: "Civil Lines shelter · 2 hours ago" },
  { id: "a5", icon: "shieldAlert", tone: "danger", title: "Temperature log missing for AS-2026-1035", meta: "Auto-expired · yesterday" },
  { id: "a6", icon: "userCheck", tone: "info", title: "Handi Restaurant submitted FSSAI for verification", meta: "Donor onboarding · yesterday" },
];

export const notifications = [
  { id: "n1", title: "Donation accepted", body: "Annapurna Seva Sansthan accepted AS-2026-1042 (120 servings).", time: "8 min ago", unread: true, icon: "checkCircle", tone: "success" },
  { id: "n2", title: "Pickup in progress", body: "Volunteer Danish Qureshi is en route to Rambagh Palace.", time: "26 min ago", unread: true, icon: "truck", tone: "warning" },
  { id: "n3", title: "Verification approved", body: "Your FSSAI licence was verified by the platform team.", time: "2 days ago", unread: false, icon: "shield", tone: "success" },
  { id: "n4", title: "Weekly impact ready", body: "Your October impact report is ready to download.", time: "3 days ago", unread: false, icon: "barChart", tone: "info" },
];

/* ---------------- NGO-side data ---------------------------- */
export const requirements = [
  { id: "req-1", ngo: "Annapurna Seva Sansthan", item: "Cooked meals (veg)", needed: 300, unit: "servings", window: "Daily, 12:00–15:00", urgency: "high", matched: 180, area: "Bani Park" },
  { id: "req-2", ngo: "Annapurna Seva Sansthan", item: "Bread / bakery", needed: 120, unit: "servings", window: "Weekdays, 08:00", urgency: "medium", matched: 60, area: "Bani Park" },
  { id: "req-3", ngo: "Feeding Jaipur Foundation", item: "Packaged dry ration", needed: 500, unit: "kg", window: "Month-end", urgency: "medium", matched: 210, area: "Malviya Nagar" },
  { id: "req-4", ngo: "Pratham Shiksha Trust", item: "Milk & curd", needed: 80, unit: "litres", window: "Daily, 07:00", urgency: "high", matched: 25, area: "Jawahar Nagar" },
];

export const distributions = [
  { id: "dist-1", donationId: "AS-2026-1039", date: "2026-10-30", meals: 90, location: "Civil Lines night shelter", beneficiaries: "Adults, 60", volunteer: "Priya Menon", status: "verified" },
  { id: "dist-2", donationId: "AS-2026-1038", date: "2026-10-29", meals: 45, location: "Seva Bharati Ashram", beneficiaries: "Elderly, 38", volunteer: "Sunita Rathore", status: "verified" },
  { id: "dist-3", donationId: "AS-2026-1036", date: "2026-10-28", meals: 110, location: "Malviya Nagar shelter", beneficiaries: "Mixed, 96", volunteer: "Priya Menon", status: "verified" },
  { id: "dist-4", donationId: "AS-2026-1034", date: "2026-10-26", meals: 140, location: "Bani Park community kitchen", beneficiaries: "Mixed, 120", volunteer: "Kabir Sharma", status: "pending-review" },
];

/* Volunteer tasks */
export const volunteerTasks = [
  { id: "AS-2026-1041", title: "Assorted bakery — breads & buns", donor: "Tapri Central", area: "C-Scheme", dropNgo: "Robin Hood Army — Jaipur", dropArea: "C-Scheme", pickupBy: "16:00", distanceKm: 3.4, servings: 60, status: "assigned", otp: "4821" },
  { id: "AS-2026-1040", title: "Paneer curry + jeera rice", donor: "Suvarna Mahal — Rambagh Palace", area: "Bhawani Singh Rd", dropNgo: "Feeding Jaipur Foundation", dropArea: "Malviya Nagar", pickupBy: "11:30", distanceKm: 6.8, servings: 200, status: "picked_up", otp: "9074" },
  { id: "AS-2026-1037", title: "Mithai boxes — festival surplus", donor: "Laxmi Mishthan Bhandar", area: "Johari Bazaar", dropNgo: "Robin Hood Army — Jaipur", dropArea: "C-Scheme", pickupBy: "18:00", distanceKm: 4.1, servings: 150, status: "accepted", otp: "3350" },
];

export const volunteerHistory = [
  { id: "AS-2026-1039", date: "2026-10-30", donor: "Spice Court", ngo: "Annapurna Seva Sansthan", servings: 90, km: 4.2, minutes: 38, rating: 5, status: "delivered" },
  { id: "AS-2026-1036", date: "2026-10-28", donor: "Rawat Mishthan Bhandar", ngo: "Feeding Jaipur Foundation", servings: 110, km: 5.6, minutes: 46, rating: 5, status: "delivered" },
  { id: "AS-2026-1034", date: "2026-10-26", donor: "Rawat Mishthan Bhandar", ngo: "Annapurna Seva Sansthan", servings: 140, km: 3.1, minutes: 31, rating: 4.9, status: "delivered" },
  { id: "AS-2026-1030", date: "2026-10-24", donor: "Hotel Pearl Palace", ngo: "Seva Bharati Ashram", servings: 45, km: 7.8, minutes: 52, rating: 4.8, status: "delivered" },
  { id: "AS-2026-1027", date: "2026-10-22", donor: "Spice Court", ngo: "Feeding Jaipur Foundation", servings: 80, km: 4.9, minutes: 40, rating: 5, status: "delivered" },
];

/* ---------------- Admin-side data -------------------------- */
export const verifications = {
  donors: [
    { id: "don-4", org: "Handi Restaurant", type: "Restaurant", area: "MI Road", fssai: "12719010044021", submitted: "2026-10-29", docs: 3, status: "pending" },
    { id: "don-5", org: "Tapri Central", type: "Café", area: "C-Scheme", fssai: "12719010055218", submitted: "2026-10-28", docs: 2, status: "pending" },
    { id: "don-6", org: "Hotel Pearl Palace", type: "Hotel", area: "Hathroi Fort", fssai: "12719010066710", submitted: "2026-09-18", docs: 1, status: "flagged" },
    { id: "don-9", org: "Sharma Bhojanalaya", type: "Dhaba", area: "Tonk Road", fssai: "12719010088910", submitted: "2026-10-27", docs: 2, status: "pending" },
  ],
  ngos: [
    { id: "ngo-14", org: "Pratham Shiksha Trust", area: "Jawahar Nagar", reg: "RJ/2021/0331920", submitted: "2026-10-26", reach: 140, status: "pending" },
    { id: "ngo-16", org: "Jeevan Jyoti Foundation", area: "Vaishali Nagar", reg: "RJ/2020/0288110", submitted: "2026-10-25", reach: 210, status: "pending" },
    { id: "ngo-17", org: "Muskaan Care Home", area: "Mansarovar", reg: "RJ/2018/0165012", submitted: "2026-10-20", reach: 80, status: "review" },
  ],
  volunteers: [
    { id: "vol-35", name: "Vikram Singh", area: "Jawahar Nagar", submitted: "2026-10-29", runs: 0, status: "pending", documents: "Aadhaar, selfie" },
    { id: "vol-36", name: "Aisha Khan", area: "Malviya Nagar", submitted: "2026-10-28", runs: 0, status: "pending", documents: "Aadhaar, DL" },
    { id: "vol-37", name: "Rohit Agarwal", area: "Bani Park", submitted: "2026-10-27", runs: 3, status: "review", documents: "Aadhaar" },
  ],
};

export const complaints = [
  { id: "CMP-4412", raisedBy: "Feeding Jaipur Foundation", role: "NGO", against: "Suvarna Mahal", subject: "Pickup arrived 40 minutes late", severity: "medium", opened: "2026-10-30", status: "open", sla: "6h left" },
  { id: "CMP-4411", raisedBy: "Kabir Sharma", role: "Volunteer", against: "Hotel Pearl Palace", subject: "No staff present at gate for handover", severity: "low", opened: "2026-10-29", status: "investigating", sla: "1d left" },
  { id: "CMP-4409", raisedBy: "Rawat Mishthan Bhandar", role: "Donor", against: "Platform", subject: "Wrong serving count recorded", severity: "low", opened: "2026-10-28", status: "resolved", sla: "closed" },
  { id: "CMP-4407", raisedBy: "Annapurna Seva Sansthan", role: "NGO", against: "Spice Court", subject: "Food below stated temperature", severity: "high", opened: "2026-10-27", status: "investigating", sla: "3h left" },
];

export const incidents = [
  { id: "INC-208", donation: "AS-2026-1035", type: "Temperature breach", area: "C-Scheme", reported: "2026-10-27", severity: "high", status: "closed", action: "Lot discarded, donor counselled" },
  { id: "INC-207", donation: "AS-2026-1021", type: "Allergen mismatch", area: "Malviya Nagar", reported: "2026-10-24", severity: "medium", status: "review", action: "Label audit in progress" },
  { id: "INC-205", donation: "AS-2026-1018", type: "Late pickup (>60 min)", area: "MI Road", reported: "2026-10-21", severity: "low", status: "closed", action: "Volunteer reassigned" },
];

export const auditLogs = [
  { id: "log-9931", time: "2026-10-30 12:41", actor: "Meera Iyer", role: "Admin", action: "Approved donor verification", target: "Spice Court (don-3)", ip: "103.21.54.18" },
  { id: "log-9930", time: "2026-10-30 11:58", actor: "System", role: "Automation", action: "Auto-expired donation", target: "AS-2026-1035", ip: "internal" },
  { id: "log-9929", time: "2026-10-30 10:12", actor: "Arjun Nair", role: "Super Admin", action: "Changed food-safety config", target: "max_hold_hours: 6 → 5", ip: "103.21.54.02" },
  { id: "log-9928", time: "2026-10-30 09:33", actor: "Meera Iyer", role: "Admin", action: "Suspended volunteer", target: "vol-38 (policy violation)", ip: "103.21.54.18" },
  { id: "log-9927", time: "2026-10-29 18:20", actor: "Arjun Nair", role: "Super Admin", action: "Created admin account", target: "nikhil@annsetu.example", ip: "103.21.54.02" },
  { id: "log-9926", time: "2026-10-29 16:04", actor: "Meera Iyer", role: "Admin", action: "Resolved complaint", target: "CMP-4409", ip: "103.21.54.18" },
];

export const admins = [
  { id: "adm-1", name: "Meera Iyer", email: "meera@annsetu.example", scope: "Rajasthan", role: "Admin", status: "active", lastActive: "2 min ago" },
  { id: "adm-2", name: "Nikhil Rao", email: "nikhil@annsetu.example", scope: "Gujarat", role: "Admin", status: "active", lastActive: "1 hour ago" },
  { id: "adm-3", name: "Sana Sheikh", email: "sana@annsetu.example", scope: "Maharashtra", role: "Admin", status: "invited", lastActive: "—" },
  { id: "adm-4", name: "Arjun Nair", email: "arjun@annsetu.example", scope: "Platform", role: "Super Admin", status: "active", lastActive: "now" },
];

export const platformUsers = [
  { id: "u1", name: "Rawat Mishthan Bhandar", role: "Donor", area: "Jaipur", status: "active", joined: "Feb 2025", donations: 68 },
  { id: "u2", name: "Annapurna Seva Sansthan", role: "NGO", area: "Jaipur", status: "active", joined: "Jan 2025", donations: 0 },
  { id: "u3", name: "Kabir Sharma", role: "Volunteer", area: "Jaipur", status: "active", joined: "Mar 2025", donations: 0 },
  { id: "u4", name: "Tapri Central", role: "Donor", area: "Jaipur", status: "pending", joined: "Oct 2026", donations: 0 },
  { id: "u5", name: "Danish Qureshi", role: "Volunteer", area: "Jaipur", status: "suspended", joined: "Apr 2025", donations: 0 },
  { id: "u6", name: "Muskaan Care Home", role: "NGO", area: "Mansarovar", status: "review", joined: "Oct 2026", donations: 0 },
];

/* ---------------- Analytics series ------------------------- */
export const weeklySeries = [
  { label: "Mon", meals: 640, rescued: 82 },
  { label: "Tue", meals: 720, rescued: 96 },
  { label: "Wed", meals: 610, rescued: 74 },
  { label: "Thu", meals: 880, rescued: 118 },
  { label: "Fri", meals: 1040, rescued: 142 },
  { label: "Sat", meals: 1240, rescued: 168 },
  { label: "Sun", meals: 980, rescued: 126 },
];

export const monthlySeries = [
  { label: "May", meals: 12400, co2: 18.2 },
  { label: "Jun", meals: 14100, co2: 20.6 },
  { label: "Jul", meals: 15900, co2: 23.1 },
  { label: "Aug", meals: 17400, co2: 25.4 },
  { label: "Sep", meals: 19800, co2: 28.9 },
  { label: "Oct", meals: 22600, co2: 32.7 },
];

export const categorySplit = [
  { label: "Cooked meals", value: 52, color: "var(--chart-1)" },
  { label: "Bakery", value: 18, color: "var(--chart-2)" },
  { label: "Packaged", value: 14, color: "var(--chart-3)" },
  { label: "Sweets", value: 10, color: "var(--chart-4)" },
  { label: "Fruit & veg", value: 6, color: "var(--chart-6)" },
];

export const funnel = [
  { label: "Published", value: 1840, pct: 100 },
  { label: "Accepted by NGO", value: 1512, pct: 82 },
  { label: "Volunteer assigned", value: 1388, pct: 75 },
  { label: "Picked up", value: 1310, pct: 71 },
  { label: "Delivered", value: 1284, pct: 70 },
];

export const areaPerformance = [
  { area: "Bani Park", donations: 142, meals: 6820, ngo: 3, avgPickup: 18 },
  { area: "Malviya Nagar", donations: 118, meals: 5410, ngo: 4, avgPickup: 22 },
  { area: "C-Scheme", donations: 96, meals: 4180, ngo: 2, avgPickup: 16 },
  { area: "Vaishali Nagar", donations: 74, meals: 3120, ngo: 2, avgPickup: 27 },
  { area: "Amer Road", donations: 41, meals: 1640, ngo: 1, avgPickup: 34 },
];

/* Safety config for Super Admin */
export const systemConfig = [
  { key: "max_hold_hours", label: "Maximum holding time (cooked food)", value: "5 hours", type: "select", note: "Donations auto-expire after this window." },
  { key: "min_servings", label: "Minimum servings per donation", value: "20", type: "number", note: "Prevents very small, uneconomical pickups." },
  { key: "otp_required", label: "OTP required at pickup & delivery", value: "Enabled", type: "toggle", note: "Two-factor handover verification." },
  { key: "volunteer_radius_km", label: "Volunteer match radius", value: "6 km", type: "select", note: "Radius used for assignment suggestions." },
  { key: "auto_expire", label: "Auto-expire unaccepted donations", value: "Enabled", type: "toggle", note: "Safety-first default." },
  { key: "photo_proof", label: "Photo proof of delivery", value: "Required", type: "toggle", note: "Volunteer must upload on delivery." },
];

/* Session feed for the live "today" strip used across dashboards */
export const todayStats = {
  donor: {
    available: 12, active: 3, pendingPickup: 1, completed: 64, servings: 4820, co2: 12.4,
  },
  ngo: {
    nearby: 7, accepted: 2, awaitingPickup: 2, distributed: 38, servedToday: 268,
  },
  volunteer: {
    assigned: 3, dueToday: 2, delivered: 62, km: 318, rating: 4.9,
  },
  admin: {
    pendingDonors: 3, pendingNgos: 2, liveDonations: 41, incidents: 2, openComplaints: 2,
  },
  superadmin: {
    users: 8420, donors: 612, ngos: 148, volunteers: 1930, cities: 11, uptime: "99.97%",
  },
};
