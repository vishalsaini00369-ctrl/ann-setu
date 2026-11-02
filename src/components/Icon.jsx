/* ANN SETU — Icon set
   A single 24px stroke grid, 1.75 stroke width, round caps.
   Inlined as paths so the prototype has zero network dependencies. */

const P = {
  // navigation / structure
  dashboard: "M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z",
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5",
  bowl: "M4 11h16a8 8 0 0 1-16 0ZM8 11c0-1.5 1-2.5 1-4M12 11c0-1.5 1-2.5 1-4M16 11c0-1.5 1-2.5 1-4",
  leaf: "M4 20c0-8 5-14 16-15 1 11-5 16-13 16H4Zm0 0 8-8",
  heart: "M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7.5 4.1 4.1 0 0 1 19 10.6c0 5-7 9.4-7 9.4Z",
  handHeart: "M11 14.5 8.8 12.3a2 2 0 0 1 2.8-2.8l1.4 1.4 1.4-1.4a2 2 0 0 1 2.8 2.8L14 14.5M3 12v7h3M21 19v-7h-3",
  box: "M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Zm0 0 9 4.5 9-4.5M12 20v-7.5",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3.5 2",
  calendar: "M4 8h16M8 3v4m8-4v4M5 21h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1Z",
  users: "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 9v-1.5a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  user: "M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  userCheck: "M16 21v-2a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5 5 2 2 4-4",
  building: "M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M14 9h4a2 2 0 0 1 2 2v10M3 21h18M8 7h2M8 11h2M8 15h2",
  store: "M4 9v11h16V9M2 9l2-5h16l2 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0ZM9 20v-6h6v6",
  truck: "M1 4h13v12H1zM14 9h4l4 4v3h-8M4.5 20a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm13 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  navigation: "M3 11l18-8-8 18-2-8-8-2Z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5.5-5.5 2 2-5.5 5.5-2Z",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z",
  checklist: "M9 5h11M9 12h11M9 19h11M4 5l1.5 1.5L8 4M4 12l1.5 1.5L8 11M4 19l1.5 1.5L8 18",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-2.5-10 2 2 4-4",
  shieldAlert: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm0-11v4m0 3h.01",
  clip: "M9 3h6v3H9zM6 6h12v15H6zM9.5 11h5M9.5 15h5",
  alert: "M12 3 2.5 20h19L12 3Zm0 6v5m0 3h.01",
  alertCircle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5m0 3h.01",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13h.01M11 12h1v5h1",
  checkCircle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9.5 2.5 2.5L16 8.5",
  check: "M4 12.5 9 17.5 20 6.5",
  x: "M6 6l12 12M18 6 6 18",
  xCircle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 9l6 6m0-6-6 6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-5.2-5.2",
  filter: "M3 5h18l-7 8v6l-4 2v-8L3 5Z",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  chevronLeft: "M15 6l-6 6 6 6",
  arrowRight: "M4 12h15m-6-7 7 7-7 7",
  arrowLeft: "M20 12H5m6-7-7 7 7 7",
  arrowUp: "M12 20V5m-7 7 7-7 7 7",
  arrowDown: "M12 4v15m7-7-7 7-7-7",
  trendUp: "M3 17l6-6 4 4 8-8M16 7h5v5",
  trendDown: "M3 7l6 6 4-4 8 8M16 17h5v-5",
  more: "M12 6.5h.01M12 12h.01M12 17.5h.01",
  moreV: "M6.5 12h.01M12 12h.01M17.5 12h.01",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5c0-.5 0-1-.1-1.4l2-1.5-2-3.4-2.3 1a7.6 7.6 0 0 0-2.4-1.4L14.8 2H9.2l-.4 2.5c-.9.3-1.7.8-2.4 1.4l-2.3-1-2 3.4 2 1.5a8 8 0 0 0 0 2.8l-2 1.5 2 3.4 2.3-1c.7.6 1.5 1.1 2.4 1.4l.4 2.5h5.6l.4-2.5c.9-.3 1.7-.8 2.4-1.4l2.3 1 2-3.4-2-1.5c.1-.5.1-.9.1-1.4Z",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0",
  logout: "M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4m7 5 4 4-4 4m4-4H9",
  menu: "M3 6h18M3 12h18M3 18h18",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z",
  image: "M4 4h16v16H4zM4 16l4.5-4.5 3.5 3.5 3-3L20 16M15.5 8.5h.01",
  camera: "M4 8h3l1.5-2h7L17 8h3v12H4V8Zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  file: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M8.5 13h7M8.5 17h4",
  download: "M12 4v11m-4-4 4 4 4-4M4 20h16",
  upload: "M12 16V5m-4 4 4-4 4 4M4 20h16",
  print: "M6 9V3h12v6M6 18H4v-6h16v6h-2M6 14h12v7H6z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  phone: "M15.5 21A15.5 15.5 0 0 1 3 8.5 2.5 2.5 0 0 1 5.5 6h2a1 1 0 0 1 1 .8l.8 3a1 1 0 0 1-.3.9L7.5 12c1 2.2 2.8 4 5 5l1.3-1.5a1 1 0 0 1 .9-.3l3 .8a1 1 0 0 1 .8 1v2a2.5 2.5 0 0 1-2.5 2.5Z",
  message: "M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  edit: "M4 20h4L20 8l-4-4L4 16v4Zm10-14 4 4",
  trash: "M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10.5 11v5.5m3-5.5v5.5",
  copy: "M8 8V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3M4 9h11v11H4z",
  refresh: "M20 11a8 8 0 1 0-2 6M20 5v6h-6",
  link: "M10 13a4 4 0 0 0 6 .5l2.5-2.5A4 4 0 1 0 13 5.5L11.5 7M14 11a4 4 0 0 0-6-.5L5.5 13A4 4 0 1 0 11 18.5L12.5 17",
  scale: "M12 3v18M7 21h10M5 8h14M5 8 2 15h6L5 8Zm14 0-3 7h6l-3-7Z",
  thermometer: "M14 14V5a2 2 0 1 0-4 0v9a4 4 0 1 0 4 0Z",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5 8 8M16 16l2.5 2.5M18.5 5.5 16 8M8 16l-2.5 2.5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18",
  award: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3 .8L7 22l5-2.5L17 22l-2-6.2",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  barChart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  pieChart: "M12 3v9h9A9 9 0 0 0 12 3Zm0 18a9 9 0 0 0 9-9h-9V3a9 9 0 0 0 0 18Z",
  lineChart: "M3 3v18h18M6.5 15 10 10.5l3 3L20 6",
  layers: "M12 3 3 8l9 5 9-5-9-5Zm0 10L3 18l9 5 9-5-9-5Z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  key: "M15 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-3.2 5.4L3 21H2v-3l1.5-1.5L5 18l1.5-1.5L5 15l1.6-1.6",
  history: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 8v4.5l3 2",
  activity: "M3 12h4l3-8 4 16 3-8h4",
  package: "M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 5v15M3 7l9 5 9-5",
  utensils: "M6 3v8a2 2 0 0 0 4 0V3M8 11v10M16 3c-1.5 1.5-2 3-2 5s.5 3 2 3v10",
  salad: "M4 13h16a8 8 0 0 1-16 0Zm4-2c0-3 2-5 4-5s4 2 4 5",
  rice: "M5 12h14a7 7 0 0 1-14 0Zm2-5c1-2 3-3 5-3s4 1 5 3",
  wifiOff: "M3 3l18 18M12 18h.01M8 14a6 6 0 0 1 8 0M5 10.5a11 11 0 0 1 5-2.4M14 8.1a11 11 0 0 1 5 2.4",
  lock: "M6 11h12v10H6zM9 11V7a3 3 0 0 1 6 0v4",
  unlock: "M6 11h12v10H6zM9 11V7a3 3 0 0 1 6 0",
  slash: "M4 4l16 16",
  pause: "M8 4v16M16 4v16",
  play: "M6 3l15 9-15 9V3Z",
  flag: "M5 21V4h9l.7 2H21l-2 5 2 5h-7.3l-.7-2H5",
  inbox: "M3 12h5l2 3h4l2-3h5M3 12 5.5 5h13L21 12v7H3v-7Z",
  gavel: "M14 4l6 6M10 8l6 6M4 20h8M8 4l6 6-4 4-6-6 4-4Zm6 10 4-4 3 3-4 4-3-3Z",
  server: "M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01",
  database: "M12 8c4.4 0 8-1.1 8-2.5S16.4 3 12 3 4 4.1 4 5.5 7.6 8 12 8Zm8-2.5v13c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-13",
  cpu: "M6 6h12v12H6zM10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  wand: "M15 4l1.5 3L20 8.5 16.5 10 15 13l-1.5-3L10 8.5 13.5 7 15 4ZM4 20l7-7",
};

export default function Icon({ name, size = 18, className = "", strokeWidth = 1.75, ...rest }) {
  const d = P[name] || P.info;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}

export const iconNames = Object.keys(P);
