import React, { useState } from "react";

/* ============================================================
   ANN SETU — CHARTS
   Hand-built SVG. No chart library, no network. Accessible:
   every chart ships a <title>, a data table alternative
   (visually hidden) and readable axis labels.
   ============================================================ */

const srTable = (rows, cols) => (
  <table className="sr-only">
    <caption>Chart data</caption>
    <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}>{Object.values(r).map((v, j) => <td key={j}>{v}</td>)}</tr>
      ))}
    </tbody>
  </table>
);

/* ---------------- Bar chart --------------------------------
   Bars are HTML/CSS (crisp at any width, no distortion).
   Labels are HTML too, so text never stretches.
   ---------------------------------------------------------- */
export function BarChart({ data, height = 190, valueKey = "value", labelKey = "label", color = "var(--chart-1)", altColor, secondKey, unit = "", ariaLabel = "Bar chart" }) {
  const max = Math.max(...data.flatMap((d) => [d[valueKey], secondKey ? d[secondKey] : 0])) * 1.12 || 1;
  const [hover, setHover] = useState(null);
  return (
    <div className="bars-wrap">
      <div className="bars" style={{ height }} role="img" aria-label={ariaLabel}>
        <div className="bars__grid" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((f) => <span key={f} style={{ bottom: `${f * 100}%` }} />)}
        </div>
        {data.map((d, i) => {
          const v = d[valueKey];
          const v2 = secondKey ? d[secondKey] : null;
          return (
            <div
              className="bars__group"
              key={d[labelKey]}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              title={`${d[labelKey]}: ${v.toLocaleString("en-IN")}${unit ? " " + unit : ""}`}
            >
              <div className="bars__col">
                <div
                  className="bars__bar"
                  style={{
                    height: `${Math.max((v / max) * 100, 1.5)}%`,
                    background: color,
                    opacity: hover === null || hover === i ? 1 : 0.55,
                  }}
                />
                {v2 != null && (
                  <div
                    className="bars__bar"
                    style={{
                      height: `${Math.max((v2 / max) * 100, 1.5)}%`,
                      background: altColor || "var(--chart-3)",
                      opacity: hover === null || hover === i ? 1 : 0.55,
                    }}
                  />
                )}
              </div>
              <span className="bars__label">{d[labelKey]}</span>
            </div>
          );
        })}
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item">
          <span className="chart-legend__swatch" style={{ background: color }} />
          {valueKey === "meals" ? "Meals served" : valueKey === "co2" ? "CO\u2082e avoided" : "Donations"}
          {unit && ` (${unit})`}
        </span>
        {secondKey && (
          <span className="chart-legend__item">
            <span className="chart-legend__swatch" style={{ background: altColor || "var(--chart-3)" }} />
            {secondKey === "co2" ? "CO\u2082e avoided (t)" : "kg rescued"}
          </span>
        )}
      </div>
      {srTable(data, [labelKey, valueKey])}
    </div>
  );
}

/* ---------------- Area / line chart ------------------------
   The path stretches with the container (no text inside the
   SVG, so nothing distorts). Axis labels are HTML.
   ---------------------------------------------------------- */
export function AreaChart({ data, height = 200, valueKey = "meals", labelKey = "label", color = "var(--chart-1)", ariaLabel = "Trend chart" }) {
  const W = 100, H = 100;
  const padT = 6, padB = 4;
  const max = Math.max(...data.map((d) => d[valueKey])) * 1.12 || 1;
  const step = data.length > 1 ? W / (data.length - 1) : W;
  const y = (v) => padT + (H - padT - padB) * (1 - v / max);
  const pts = data.map((d, i) => [i * step, y(d[valueKey])]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const area = `${line} L${W},${H - padB} L0,${H - padB} Z`;
  const gid = `area-${String(valueKey).replace(/[^a-z0-9]/gi, "")}-${Math.round(max)}`;

  return (
    <div>
      <div className="areachart" style={{ height }} role="img" aria-label={ariaLabel}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.20" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gid})`} />
          <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="areachart__labels">
        {data.map((d) => <span key={d[labelKey]}>{d[labelKey]}</span>)}
      </div>
      {srTable(data, [labelKey, valueKey])}
    </div>
  );
}

/* ---------------- Donut ------------------------------------ */
export function Donut({ data, size = 150, thickness = 20, centerLabel, centerValue, ariaLabel = "Distribution" }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
        <svg width={size} height={size} role="img" aria-label={ariaLabel} style={{ transform: "rotate(-90deg)" }}>
          <title>{ariaLabel}</title>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--subtle-2)" strokeWidth={thickness} />
          {data.map((d) => {
            const len = (d.value / total) * c;
            const el = (
              <circle
                key={d.label}
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={d.color} strokeWidth={thickness}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="donut-center">
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>{centerValue}</div>
          <div style={{ fontSize: 11, color: "var(--ink-500)" }}>{centerLabel}</div>
        </div>
      </div>
      <div className="stack g2 grow">
        {data.map((d) => (
          <div className="row between text-md" key={d.label}>
            <span className="row g2" style={{ minWidth: 0 }}>
              <span className="chart-legend__swatch" style={{ background: d.color }} />
              <span className="muted truncate">{d.label}</span>
            </span>
            <span className="fw-semi tabular">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Horizontal bars (funnel / ranking) ------- */
export function HBars({ data, valueKey = "value", labelKey = "label", max, suffix = "", color = "var(--chart-1)", showPct }) {
  const top = max || Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="stack g3">
      {data.map((d) => (
        <div key={d[labelKey]}>
          <div className="row between text-md mb2">
            <span className="muted">{d[labelKey]}</span>
            <span className="fw-semi tabular">{d[valueKey].toLocaleString("en-IN")}{suffix}{showPct ? ` · ${Math.round((d[valueKey] / top) * 100)}%` : ""}</span>
          </div>
          <div className="progress" style={{ height: 8 }}>
            <div className="progress__bar" style={{ width: `${(d[valueKey] / top) * 100}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Sparkline -------------------------------- */
export function Sparkline({ values, color = "var(--chart-1)", width = 72, height = 26 }) {
  const max = Math.max(...values), min = Math.min(...values);
  const step = width / (values.length - 1 || 1);
  const pts = values.map((v, i) => `${i * step},${height - ((v - min) / (max - min || 1)) * (height - 4) - 2}`);
  return (
    <svg width={width} height={height} aria-hidden="true" style={{ overflow: "visible" }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
