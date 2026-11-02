import React, { createContext, useContext, useMemo, useReducer, useCallback, useEffect } from "react";
import {
  donations as seedDonations,
  volunteerTasks as seedTasks,
  notifications as seedNotifications,
  volunteerHistory as seedHistory,
  ngos as seedNgos,
} from "./mockData.js";

/* ============================================================
   ANN SETU — PROTOTYPE STATE STORE
   In-memory only. Demonstrates real state transitions so the
   prototype can be clicked through end-to-end. No backend.
   ============================================================ */

const AppCtx = createContext(null);

function initialRole() {
  if (typeof window === "undefined") return "donor";
  const seg = (window.location.hash || "").replace(/^#\/?/, "").split("/")[0];
  return ["donor", "ngo", "volunteer", "admin", "superadmin"].includes(seg) ? seg : "donor";
}

const initialState = {
  role: initialRole(),
  donations: seedDonations,
  tasks: seedTasks,
  history: seedHistory,
  notifications: seedNotifications,
  ngos: seedNgos,
  toasts: [],
  acceptedIds: [],
  draft: null,
  lastCreatedId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.role };

    case "CREATE_DONATION": {
      const d = action.donation;
      return { ...state, donations: [d, ...state.donations], lastCreatedId: d.id, draft: null };
    }

    case "SAVE_DRAFT":
      return { ...state, draft: action.draft };

    case "ACCEPT_DONATION":
      return {
        ...state,
        donations: state.donations.map((d) =>
          d.id === action.id
            ? { ...d, status: "accepted", ngo: action.ngo, ngoId: action.ngoId }
            : d
        ),
        acceptedIds: [...new Set([...state.acceptedIds, action.id])],
      };

    case "REJECT_DONATION":
      return {
        ...state,
        donations: state.donations.map((d) =>
          d.id === action.id ? { ...d, status: "rejected" } : d
        ),
      };

    case "ASSIGN_VOLUNTEER":
      return {
        ...state,
        donations: state.donations.map((d) =>
          d.id === action.id
            ? { ...d, status: d.status === "published" ? "accepted" : d.status, volunteer: action.volunteer, volunteerId: action.volunteerId }
            : d
        ),
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, volunteer: action.volunteer } : t
        ),
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        donations: state.donations.map((d) =>
          d.id === action.id ? { ...d, status: action.status } : d
        ),
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: action.status } : t
        ),
        history:
          action.status === "delivered"
            ? [
                {
                  id: action.id,
                  date: "2026-10-30",
                  donor: action.donor || "Rawat Mishthan Bhandar",
                  ngo: action.ngo || "Annapurna Seva Sansthan",
                  servings: action.servings || 60,
                  km: 3.4,
                  minutes: 36,
                  rating: 5,
                  status: "delivered",
                },
                ...state.history,
              ]
            : state.history,
      };

    case "TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };

    case "DISMISS_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };

    case "READ_ALL":
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, unread: false })) };

    default:
      return state;
  }
}

let toastSeq = 0;

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toast = useCallback((title, body = "", tone = "success") => {
    const id = ++toastSeq;
    dispatch({ type: "TOAST", toast: { id, title, body, tone } });
    setTimeout(() => dispatch({ type: "DISMISS_TOAST", id }), 4600);
  }, []);

  const api = useMemo(
    () => ({
      ...state,
      setRole: (role) => dispatch({ type: "SET_ROLE", role }),
      toast,
      dismissToast: (id) => dispatch({ type: "DISMISS_TOAST", id }),
      createDonation: (donation) => dispatch({ type: "CREATE_DONATION", donation }),
      saveDraft: (draft) => dispatch({ type: "SAVE_DRAFT", draft }),
      acceptDonation: (id, ngo, ngoId) => dispatch({ type: "ACCEPT_DONATION", id, ngo, ngoId }),
      rejectDonation: (id) => dispatch({ type: "REJECT_DONATION", id }),
      assignVolunteer: (id, volunteer, volunteerId) =>
        dispatch({ type: "ASSIGN_VOLUNTEER", id, volunteer, volunteerId }),
      updateStatus: (payload) => dispatch({ type: "UPDATE_STATUS", ...payload }),
      readAll: () => dispatch({ type: "READ_ALL" }),
      getDonation: (id) => state.donations.find((d) => d.id === id),
    }),
    [state, toast]
  );

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

/* Small helpers shared by pages ---------------------------- */
export function formatDate(iso, opts = {}) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", ...opts });
}

export function formatTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function formatDateTime(iso) {
  if (!iso) return "—";
  return `${formatDate(iso)} · ${formatTime(iso)}`;
}

export function relative(iso) {
  const d = new Date(iso);
  const diff = Math.round((d - new Date("2026-10-30T12:45")) / 60000);
  if (Number.isNaN(diff)) return iso;
  if (Math.abs(diff) < 60) return `${Math.abs(diff)} min ${diff < 0 ? "ago" : "from now"}`;
  const h = Math.round(diff / 60);
  if (Math.abs(h) < 24) return `${Math.abs(h)} hr ${h < 0 ? "ago" : "from now"}`;
  return `${Math.abs(Math.round(h / 24))} days ${diff < 0 ? "ago" : "from now"}`;
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} · ANN SETU`;
  }, [title]);
}

export function useScrollTop(dep) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [dep]);
}
