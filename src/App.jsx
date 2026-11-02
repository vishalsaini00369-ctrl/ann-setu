import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import { Login, Register } from "./pages/Auth.jsx";
import AppShell from "./components/layout/AppShell.jsx";

import DonorDashboard from "./pages/donor/Dashboard.jsx";
import CreateDonation from "./pages/donor/CreateDonation.jsx";
import { ActiveDonations, DonationHistory } from "./pages/donor/Donations.jsx";
import DonorImpact from "./pages/donor/Impact.jsx";

import NgoDashboard from "./pages/ngo/Dashboard.jsx";
import NgoNearby from "./pages/ngo/Nearby.jsx";
import NgoAccepted from "./pages/ngo/Accepted.jsx";
import NgoRequirements from "./pages/ngo/Requirements.jsx";
import NgoVolunteers from "./pages/ngo/Volunteers.jsx";
import NgoDistributions from "./pages/ngo/Distributions.jsx";
import NgoImpact from "./pages/ngo/Impact.jsx";

import VolunteerDashboard from "./pages/volunteer/Dashboard.jsx";
import VolunteerPickups from "./pages/volunteer/Pickups.jsx";
import { PickupDetail, Navigate as NavigatePage, VerifyPickup, ConfirmDelivery } from "./pages/volunteer/PickupFlow.jsx";
import VolunteerHistory from "./pages/volunteer/History.jsx";

import AdminOverview from "./pages/admin/Overview.jsx";
import Verification from "./pages/admin/Verification.jsx";
import AdminDonations from "./pages/admin/Monitoring.jsx";
import { AdminComplaints, AdminIncidents } from "./pages/admin/TrustSafety.jsx";
import AdminAnalytics from "./pages/admin/Analytics.jsx";
import AdminReports from "./pages/admin/Reports.jsx";

import SuperAdminOverview from "./pages/superadmin/Overview.jsx";
import SuperAdminUsers from "./pages/superadmin/Users.jsx";
import SuperAdminAdmins from "./pages/superadmin/Admins.jsx";
import SuperAdminConfig from "./pages/superadmin/Config.jsx";
import SuperAdminAudit from "./pages/superadmin/Audit.jsx";
import SuperAdminAnalytics from "./pages/superadmin/Analytics.jsx";

import DonationDetail from "./pages/DonationDetail.jsx";
import Profile from "./pages/Profile.jsx";
import DesignSystem from "./pages/design/DesignSystem.jsx";
import Handoff from "./pages/design/Handoff.jsx";

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const shell = (el) => <AppShell>{el}</AppShell>;

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Donor */}
        <Route path="/donor" element={shell(<DonorDashboard />)} />
        <Route path="/donor/new" element={shell(<CreateDonation />)} />
        <Route path="/donor/active" element={shell(<ActiveDonations />)} />
        <Route path="/donor/history" element={shell(<DonationHistory />)} />
        <Route path="/donor/donations/:id" element={shell(<DonationDetail />)} />
        <Route path="/donor/impact" element={shell(<DonorImpact />)} />
        <Route path="/donor/profile" element={shell(<Profile />)} />

        {/* NGO */}
        <Route path="/ngo" element={shell(<NgoDashboard />)} />
        <Route path="/ngo/nearby" element={shell(<NgoNearby />)} />
        <Route path="/ngo/donations/:id" element={shell(<DonationDetail />)} />
        <Route path="/ngo/accepted" element={shell(<NgoAccepted />)} />
        <Route path="/ngo/requirements" element={shell(<NgoRequirements />)} />
        <Route path="/ngo/volunteers" element={shell(<NgoVolunteers />)} />
        <Route path="/ngo/distributions" element={shell(<NgoDistributions />)} />
        <Route path="/ngo/impact" element={shell(<NgoImpact />)} />
        <Route path="/ngo/profile" element={shell(<Profile />)} />

        {/* Volunteer */}
        <Route path="/volunteer" element={shell(<VolunteerDashboard />)} />
        <Route path="/volunteer/pickups" element={shell(<VolunteerPickups />)} />
        <Route path="/volunteer/pickups/:id" element={shell(<PickupDetail />)} />
        <Route path="/volunteer/navigate/:id" element={shell(<NavigatePage />)} />
        <Route path="/volunteer/verify/:id" element={shell(<VerifyPickup />)} />
        <Route path="/volunteer/confirm/:id" element={shell(<ConfirmDelivery />)} />
        <Route path="/volunteer/history" element={shell(<VolunteerHistory />)} />
        <Route path="/volunteer/profile" element={shell(<Profile />)} />

        {/* Admin */}
        <Route path="/admin" element={shell(<AdminOverview />)} />
        <Route path="/admin/donors" element={shell(<Verification kind="donors" />)} />
        <Route path="/admin/ngos" element={shell(<Verification kind="ngos" />)} />
        <Route path="/admin/volunteers" element={shell(<Verification kind="volunteers" />)} />
        <Route path="/admin/donations" element={shell(<AdminDonations />)} />
        <Route path="/admin/complaints" element={shell(<AdminComplaints />)} />
        <Route path="/admin/incidents" element={shell(<AdminIncidents />)} />
        <Route path="/admin/analytics" element={shell(<AdminAnalytics />)} />
        <Route path="/admin/reports" element={shell(<AdminReports />)} />

        {/* Super Admin */}
        <Route path="/superadmin" element={shell(<SuperAdminOverview />)} />
        <Route path="/superadmin/users" element={shell(<SuperAdminUsers />)} />
        <Route path="/superadmin/admins" element={shell(<SuperAdminAdmins />)} />
        <Route path="/superadmin/config" element={shell(<SuperAdminConfig />)} />
        <Route path="/superadmin/audit" element={shell(<SuperAdminAudit />)} />
        <Route path="/superadmin/analytics" element={shell(<SuperAdminAnalytics />)} />

        {/* Documentation */}
        <Route path="/design-system" element={shell(<DesignSystem />)} />
        <Route path="/handoff" element={shell(<Handoff />)} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
