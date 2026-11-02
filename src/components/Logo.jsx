import React from "react";

/* ============================================================
   ANN SETU — BRAND MARK
   Concept: a bridge (सेतु) arc spanning two piers — the connection
   between surplus and need — with a grain rising from the centre
   where food meets community. Geometric, single-weight, legible
   down to 16px.
   ============================================================ */

const TONES = {
  solid: { bg: "var(--green-600)", fg: "#FFFFFF", accent: "#86E0B0" },
  light: { bg: "transparent", fg: "#FFFFFF", accent: "#86E0B0" },
  outline: { bg: "transparent", fg: "var(--green-700)", accent: "var(--green-400)" },
  bare: { bg: "var(--white)", fg: "var(--green-700)", accent: "var(--green-400)" },
};

export function LogoMark({ size = 36, tone = "solid", className = "" }) {
  const t = TONES[tone] || TONES.solid;
  return (
    <svg
      width={size} height={size} viewBox="0 0 40 40"
      className={className} role="img" aria-label="ANN SETU"
      style={{ flex: "none" }}
    >
      <rect width="40" height="40" rx="11" fill={t.bg} />
      <path
        d="M20 8.6c2.5 1.5 3.7 3.3 3.7 5.2 0 2-1.6 3.4-3.7 3.4s-3.7-1.4-3.7-3.4c0-1.9 1.2-3.7 3.7-5.2Z"
        fill={t.accent}
      />
      <path
        d="M9 27.4c0-6.1 4.9-11 11-11s11 4.9 11 11"
        stroke={t.fg} strokeWidth="2.6" fill="none" strokeLinecap="round"
      />
      <circle cx="9" cy="29.6" r="2.3" fill={t.fg} />
      <circle cx="31" cy="29.6" r="2.3" fill={t.fg} />
    </svg>
  );
}

export default function Logo({ size = 36, compact = false, tone = "solid", showDeva = true }) {
  const light = tone === "light" || tone === "inverse";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <LogoMark size={size} tone={tone} />
      {!compact && (
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span
            style={{
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05,
              color: light ? "#fff" : "var(--ink-900)",
            }}
          >
            ANN SETU
          </span>
          {showDeva && (
            <span
              className="deva"
              style={{
                fontSize: 11, lineHeight: 1.3, fontWeight: 600,
                color: light ? "rgba(255,255,255,.72)" : "var(--green-700)",
              }}
            >
              अन्न सेतु
            </span>
          )}
        </span>
      )}
    </span>
  );
}
