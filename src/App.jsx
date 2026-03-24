import { useState, useEffect, useRef, useCallback } from "react";

// ─── QANTAS-INSPIRED DESIGN TOKENS ──────────────────────────────
const T = {
  bg: "#F7F7F7",
  surface: "#FFFFFF",
  surfaceAlt: "#F2F2F2",
  card: "#FFFFFF",
  border: "#E5E5E5",
  text: "#1F1F1F",
  textSecondary: "#555555",
  textMuted: "#8E8E93",
  textDim: "#AEAEB2",
  accent: "#E1081F",
  accentDark: "#C10000",
  accentDigital: "#DD0000",
  accentSoft: "rgba(225,8,31,0.08)",
  green: "#34C759",
  greenSoft: "rgba(52,199,89,0.1)",
  blue: "#007AFF",
  blueSoft: "rgba(0,122,255,0.1)",
  orange: "#E86831",
  orangeSoft: "rgba(232,104,49,0.1)",
  wattle: "#FF9D2D",
  teal: "#5AC8FA",
  tealSoft: "rgba(90,200,250,0.1)",
  purple: "#AF52DE",
  purpleSoft: "rgba(175,82,222,0.1)",
  red: "#FF3B30",
  redSoft: "rgba(255,59,48,0.08)",
  shadow: "0 2px 8px rgba(0,0,0,0.08)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.1)",
  shadowLg: "0 8px 24px rgba(0,0,0,0.12)",
  radius: "12px",
  radiusSm: "8px",
  radiusCard: "16px",
  radiusXl: "24px",
};

const fam = `'Qantas Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const fontMono = `'SF Mono', 'Menlo', monospace`;

// ─── ICONS ───────────────────────────────────────────────────────
const Icons = {
  Home: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Timeline: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Ticket: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M2 9a3 3 0 013-3h14a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3 3H5a3 3 0 01-3-3V9z"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 013-3h14a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3 3H5a3 3 0 01-3-3V9z"/><path d="M13 6v12"/></svg>,
  Map: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Alert: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="17" r="1" fill="#fff"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Wrap: ({filled}) => filled ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  Plane: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
  Chevron: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  CheckBig: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Luggage: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/><line x1="6" y1="12" x2="18" y2="12"/></svg>,
  Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Leaf: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>,
  Coffee: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>,
  Wifi: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Zap: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Globe: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Droplet: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  Help: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

// ─── CSS ─────────────────────────────────────────────────────────
const animCSS = `
@font-face {
  font-family: 'Qantas Sans';
  src: url('https://www.qantas.com/fonts/QantasSans-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'Qantas Sans';
  src: url('https://www.qantas.com/fonts/QantasSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Qantas Sans';
  src: url('https://www.qantas.com/fonts/QantasSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Qantas Sans';
  src: url('https://www.qantas.com/fonts/QantasSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes progressFill { from { width: 0%; } }
@keyframes countUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
@keyframes planeFloat { 0%, 100% { transform: translateX(-4px); } 50% { transform: translateX(4px); } }
@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes checkPop { 0% { transform: scale(0); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes dotTravel { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
@keyframes typing { 0%, 80% { opacity: 0.3; } 40% { opacity: 1; } }
.s1 { animation: fadeIn 0.3s ease-out both 0.05s; }
.s2 { animation: fadeIn 0.3s ease-out both 0.1s; }
.s3 { animation: fadeIn 0.3s ease-out both 0.15s; }
.s4 { animation: fadeIn 0.3s ease-out both 0.2s; }
.s5 { animation: fadeIn 0.3s ease-out both 0.25s; }
.s6 { animation: fadeIn 0.3s ease-out both 0.3s; }
.s7 { animation: fadeIn 0.3s ease-out both 0.35s; }
::-webkit-scrollbar { width: 0; height: 0; }
`;

// ─── SHARED ──────────────────────────────────────────────────────
const Card = ({ children, style, onClick, className }) => (
  <div onClick={onClick} className={className} style={{
    background: T.card, borderRadius: T.radiusCard,
    boxShadow: T.shadow, cursor: onClick ? "pointer" : "default",
    transition: "all 0.25s ease-out", ...style,
  }}>{children}</div>
);

const Pill = ({ children, color = T.accent, style }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "4px 10px", borderRadius: 20,
    background: color === T.green ? T.greenSoft : color === T.accent ? T.accentSoft : color === T.blue ? T.blueSoft : color === T.orange ? T.orangeSoft : color === T.red ? T.redSoft : `${color}15`,
    color, fontSize: 12, fontWeight: 600, ...style,
  }}>{children}</span>
);

const SectionTitle = ({ children, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "0 2px" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: fam }}>{children}</h2>
    {action && <span onClick={onAction} style={{ fontSize: 14, color: T.accent, fontWeight: 600, cursor: "pointer" }}>{action}</span>}
  </div>
);

const ProgressRing = ({ progress, size = 48, stroke = 4, color = T.accent }) => {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, offset = c - (progress / 100) * c;
  return <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }}/>
  </svg>;
};

// ─── HOME ────────────────────────────────────────────────────────
const HomeScreen = ({ setScreen }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const [dismissed, setDismissed] = useState([]);

  return (
  <div style={{ padding: "0 20px 24px" }}>
    {/* Header */}
    <div className="s1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px 8px 12px", borderRadius: 24, border: `1px solid ${T.border}`, background: T.card }}>
        <Icons.Help />
        <span style={{ fontSize: 14, fontWeight: 500, color: T.textSecondary }}>Help</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: T.textMuted, position: "relative" }}>
          <Icons.Bell />
          <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: T.accent, border: "2px solid #fff" }} />
        </span>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.accent }}>AJ</span>
        </div>
      </div>
    </div>

    <h1 className="s1" style={{ fontSize: 32, fontWeight: 700, color: T.text, fontFamily: fam }}>{greeting}, Alex</h1>

    {/* Frequent Flyer CTA — matches Qantas style */}
    <Card className="s2" style={{ marginTop: 20, padding: "28px 24px", textAlign: "center" }}>
      <svg width="36" height="26" viewBox="0 0 40 28" fill={T.accent} style={{ marginBottom: 14 }}><path d="M20 0c-3 0-5.5 4-7 8l-1.5 4c-1.2 2.5-3 4.5-6 5.5-2 .8-4 .5-5-.5 2.5 3.5 5.5 4.5 8.5 3 2.5-1 4-3 5.5-5.5l1-2.5c1-2.5 2.5-5 4.5-5s3.5 2.5 4.5 5l1 2.5c1.5 2.5 3 4.5 5.5 5.5 3 1.5 6 .5 8.5-3-1 1-3 1.3-5 .5-3-1-4.8-3-6-5.5L26.5 8C25 4 22.5 0 20 0z"/></svg>
      <p style={{ fontSize: 17, fontWeight: 700, color: T.text }}>Your next flight awaits</p>
      <p style={{ fontSize: 13, color: T.textMuted, marginTop: 6, lineHeight: 1.5, maxWidth: 280, margin: "6px auto 0" }}>
        Manage your booked flights, check in, and access your boarding pass.
      </p>
      <p style={{ fontSize: 15, fontWeight: 600, color: T.accent, marginTop: 16, cursor: "pointer" }}>Add trip</p>
    </Card>

    {/* Next Flight */}
    <Card className="s3" style={{ marginTop: 14, padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "20px 20px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Pill color={T.green}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.green, display: "inline-block" }}/> Upcoming</Pill>
          <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 500 }}>In 3 days</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 34, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", fontFamily: fam }}>ADL</p>
            <p style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Adelaide</p>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "100%", height: 1, background: "#D1D1D6" }}/>
            <div style={{ position: "absolute", left: 0, width: 7, height: 7, borderRadius: 4, background: "#D1D1D6" }}/>
            <div style={{ position: "absolute", color: T.accent, animation: "planeFloat 3s ease-in-out infinite" }}><Icons.Plane /></div>
            <div style={{ position: "absolute", right: 0, width: 7, height: 7, borderRadius: 4, background: "#D1D1D6" }}/>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 34, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", fontFamily: fam }}>NRT</p>
            <p style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>Tokyo</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 22 }}>
          {[{ l: "Depart", v: "26 Mar · 06:15" }, { l: "Flight", v: "QF 71" }, { l: "Duration", v: "10h 25m" }].map((d, i) => (
            <div key={i}>
              <p style={{ fontSize: 11, color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d.l}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 4 }}>{d.v}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: T.blue, flexShrink: 0 }}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
          <span style={{ fontSize: 13, color: T.textSecondary }}>Tokyo · 14°C, partly cloudy</span>
        </div>
      </div>
      <div onClick={() => setScreen("timeline")} style={{
        padding: "14px 20px", borderTop: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        cursor: "pointer", background: "#FAFAFA",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.accent }}>View trip timeline</span>
        <span style={{ color: T.accent }}><Icons.Chevron /></span>
      </div>
    </Card>

    {/* Trip Readiness */}
    <div className="s4" style={{ marginTop: 28 }}>
      <SectionTitle>Trip readiness</SectionTitle>
      <Card style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, color: T.textMuted }}>3 of 4 complete</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.accent }}>72%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "#E5E5EA", overflow: "hidden" }}>
          <div style={{ width: "72%", height: "100%", borderRadius: 3, background: T.accent, animation: "progressFill 1.2s ease both" }}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
          {[
            { icon: <Icons.Check />, label: "Check-in", status: "Complete", done: true },
            { icon: <Icons.Luggage />, label: "Baggage", status: "Added", done: true },
            { icon: <Icons.Shield />, label: "Documents", status: "Review needed", done: false, urgent: true },
            { icon: <Icons.Droplet />, label: "Wellness", status: "Set up", done: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              borderRadius: T.radiusSm, background: item.urgent ? T.orangeSoft : T.surfaceAlt,
              cursor: "pointer",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 15, flexShrink: 0,
                background: item.done ? T.greenSoft : item.urgent ? T.orangeSoft : "#F0F0F2",
                border: item.done ? "none" : `1.5px solid ${item.urgent ? T.orange : "#D1D1D6"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.done ? T.green : item.urgent ? T.orange : T.textDim,
              }}>{item.done ? <Icons.Check /> : item.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{item.label}</p>
                <p style={{ fontSize: 11, color: item.done ? T.green : item.urgent ? T.orange : T.textMuted, fontWeight: 500 }}>{item.status}</p>
              </div>
              <span style={{ color: T.textDim }}><Icons.Chevron /></span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Smart Suggestions */}
    <div className="s5" style={{ marginTop: 28 }}>
      <SectionTitle>Smart suggestions</SectionTitle>
      {[
        { icon: <Icons.Globe />, text: "Pack light layers — Tokyo is 14°C this week", color: T.blue, bg: T.blueSoft },
        { icon: <Icons.Sparkle />, text: "¥1 AUD = ¥97.2 JPY — rates are favourable", color: T.green, bg: T.greenSoft },
        { icon: <Icons.Leaf />, text: "Your flight emits 1.2t CO₂ — offset for $18", color: "#34C759", bg: T.greenSoft },
      ].filter((_, i) => !dismissed.includes(i)).map((s, i) => (
        <Card key={i} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, flexShrink: 0, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ color: T.accent }}><Icons.Sparkle /></span>
              <span style={{ fontSize: 10, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: "0.04em" }}>AI Suggested</span>
            </div>
            <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.45 }}>{s.text}</p>
          </div>
          <span onClick={(e) => { e.stopPropagation(); setDismissed(prev => [...prev, i]); }} style={{ color: T.textDim, cursor: "pointer", padding: 8, fontSize: 16, lineHeight: 1 }}>✕</span>
        </Card>
      ))}
    </div>

    {/* Book and Explore */}
    <div className="s6" style={{ marginTop: 28 }}>
      <SectionTitle>Book and explore</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { icon: <Icons.Ticket filled={false} />, label: "Boarding\nPass", screen: "boarding" },
          { icon: <Icons.Map filled={false} />, label: "Airport\nMap", screen: "map" },
          { icon: <Icons.Users />, label: "Travel\nGroup", screen: null },
          { icon: <Icons.Wrap filled={false} />, label: "Trip\nWrap", screen: "wrap" },
        ].map((a, i) => (
          <Card key={i} onClick={() => a.screen && setScreen(a.screen)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 10, padding: "20px 8px",
          }}>
            <div style={{ color: T.textSecondary }}>{a.icon}</div>
            <p style={{ fontSize: 11, color: T.textSecondary, textAlign: "center", lineHeight: 1.35, whiteSpace: "pre-line", fontWeight: 500 }}>{a.label}</p>
          </Card>
        ))}
      </div>
    </div>

    {/* Loyalty */}
    <Card className="s7" style={{ marginTop: 28, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: 11, color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Qantas Points</p>
          <Pill color={T.wattle} style={{ fontSize: 10, fontWeight: 700 }}>Gold</Pill>
        </div>
        <p style={{ fontSize: 24, fontWeight: 800, color: T.accent, marginTop: 4, fontFamily: fam }}>48,250</p>
        <p style={{ fontSize: 13, color: T.textMuted, marginTop: 3 }}>4,750 pts to Platinum</p>
      </div>
      <ProgressRing progress={68} />
    </Card>

    {/* Travel Update — matches Qantas info card */}
    <Card style={{ marginTop: 14, padding: "16px 20px", animation: "fadeIn 0.4s ease both 0.4s" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, flexShrink: 0, background: T.tealSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#32ADE6" }}>i</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Travel update</p>
          <p style={{ fontSize: 13, color: T.textMuted, marginTop: 3, lineHeight: 1.4 }}>Information for travel to Japan and East Asia</p>
          <p style={{ fontSize: 14, color: T.accent, fontWeight: 600, marginTop: 10, cursor: "pointer" }}>Read more</p>
        </div>
      </div>
    </Card>
  </div>
  );
};

// ─── TIMELINE ────────────────────────────────────────────────────
const TimelineScreen = ({ setScreen }) => {
  const [activeStep, setActiveStep] = useState(2);
  const steps = [
    { time: "T-72h", title: "Booking confirmed", desc: "QF 71 · ADL → NRT", status: "done" },
    { time: "T-24h", title: "Check-in open", desc: "Seat 14A · Window selected", status: "done" },
    { time: "T-3h", title: "Leave for airport", desc: "23 min drive · Light traffic", status: "active" },
    { time: "T-2h", title: "Arrive at ADL", desc: "Terminal 1 · Bag drop Zone C", status: "upcoming" },
    { time: "T-90m", title: "Security screening", desc: "Current wait: ~8 min", status: "upcoming" },
    { time: "T-60m", title: "Gate opens", desc: "Gate 14 · Level 1", status: "upcoming" },
    { time: "T-30m", title: "Boarding begins", desc: "Group 2 · Priority lane", status: "upcoming" },
    { time: "T-0", title: "Departure", desc: "06:15 ACST → 16:40 JST", status: "upcoming" },
    { time: "T+10h", title: "Arrival at NRT", desc: "Carousel 4 · Est. 8 min wait", status: "upcoming" },
  ];
  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div className="s1" style={{ padding: "6px 0 6px" }}>
        <p style={{ fontSize: 13, color: T.textMuted, fontWeight: 500 }}>ADL → NRT · QF 71</p>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: T.text, fontFamily: fam, marginTop: 4 }}>Trip Timeline</h1>
      </div>
      <Card className="s2" style={{ marginTop: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, background: T.green, animation: "pulse 2s infinite" }}/>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Flight on time</p>
          <p style={{ fontSize: 13, color: T.textMuted }}>Leave home in ~2 hours for optimal arrival</p>
        </div>
      </Card>
      <Card className="s3" style={{ marginTop: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: T.blueSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.blue, flexShrink: 0 }}><Icons.Droplet /></div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: T.blue }}>Wellness tip</p>
          <p style={{ fontSize: 12, color: T.textMuted, marginTop: 2, lineHeight: 1.45 }}>Hydrate well before your 10h flight. Tokyo is UTC+9 — start adjusting tonight.</p>
        </div>
      </Card>
      <div className="s4" style={{ marginTop: 24, position: "relative" }}>
        <div style={{ position: "absolute", left: 15, top: 12, bottom: 12, width: 2, background: "#E5E5EA", borderRadius: 1 }}/>
        <div style={{ position: "absolute", left: 15, top: 12, width: 2, height: `${((activeStep + 0.5) / steps.length) * 100}%`, background: T.accent, borderRadius: 1, transition: "height 0.6s ease" }}/>
        {steps.map((step, i) => {
          const isDone = step.status === "done", isActive = step.status === "active";
          return (
            <div key={i} onClick={() => setActiveStep(i)} style={{ display: "flex", gap: 14, padding: "8px 0", cursor: "pointer", animation: `slideIn 0.35s ease both ${0.04*i}s` }}>
              <div style={{
                width: 32, height: 32, borderRadius: 16, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone || isActive ? T.accent : "#FFFFFF",
                border: isDone || isActive ? "none" : "2px solid #D1D1D6",
                color: isDone || isActive ? "#fff" : T.textDim,
                boxShadow: isActive ? `0 0 0 4px ${T.accentSoft}` : "none",
                transition: "all 0.3s ease", zIndex: 1,
              }}>
                {isDone ? <Icons.Check /> : isActive ? <Icons.Zap /> : <span style={{ width: 8, height: 8, borderRadius: 4, background: "#D1D1D6" }}/>}
              </div>
              <Card style={{
                flex: 1, padding: "14px 16px",
                border: activeStep === i ? `1.5px solid ${isActive ? T.accent : isDone ? T.green : "#E5E5EA"}` : "none",
                boxShadow: activeStep === i ? T.shadowMd : T.shadow,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontFamily: fontMono, fontWeight: 500, color: isDone || isActive ? T.accent : T.textDim }}>{step.time}</span>
                  {isDone && <Pill color={T.green} style={{ fontSize: 10 }}>Done</Pill>}
                  {isActive && <Pill color={T.accent} style={{ fontSize: 10 }}>Now</Pill>}
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: T.text, marginTop: 6 }}>{step.title}</p>
                <p style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{step.desc}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── BOARDING PASS ───────────────────────────────────────────────
const BoardingScreen = () => {
  const [countdown, setCountdown] = useState({ h: 2, m: 47, s: 13 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalMin = countdown.h * 60 + countdown.m;
  const boardingState = totalMin < 10 ? "final" : totalMin < 30 ? "boarding" : "waiting";
  const stateLabel = boardingState === "final" ? "Final call" : boardingState === "boarding" ? "Now boarding · Group 2" : "Boarding begins in";
  const stateColor = boardingState === "final" ? T.orange : boardingState === "boarding" ? T.green : T.accent;

  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div className="s1" style={{ padding: "6px 0 20px" }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: T.text, fontFamily: fam }}>Boarding Pass</h1>
      </div>
      <Card className="s2" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
        {/* Class indicator strip */}
        <div style={{ height: 3, background: T.accent }}/>
        {/* Kangaroo watermark */}
        <svg width="120" height="80" viewBox="0 0 40 28" fill={T.accent} style={{ position: "absolute", right: 16, top: 40, opacity: 0.04 }}>
          <path d="M20 0c-3 0-5.5 4-7 8l-1.5 4c-1.2 2.5-3 4.5-6 5.5-2 .8-4 .5-5-.5 2.5 3.5 5.5 4.5 8.5 3 2.5-1 4-3 5.5-5.5l1-2.5c1-2.5 2.5-5 4.5-5s3.5 2.5 4.5 5l1 2.5c1.5 2.5 3 4.5 5.5 5.5 3 1.5 6 .5 8.5-3-1 1-3 1.3-5 .5-3-1-4.8-3-6-5.5L26.5 8C25 4 22.5 0 20 0z"/>
        </svg>
        <div style={{ padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Pill color={T.green}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.green, display: "inline-block" }}/> Ready to board</Pill>
            <p style={{ fontSize: 13, color: T.textMuted, fontWeight: 600, fontFamily: fontMono }}>QF 71</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26 }}>
            <div><p style={{ fontSize: 40, fontWeight: 800, color: T.text, fontFamily: fam, letterSpacing: "-0.03em" }}>ADL</p><p style={{ fontSize: 12, color: T.textMuted }}>Adelaide</p></div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ width: "100%", height: 1, background: "#D1D1D6" }}/>
              <div style={{ position: "absolute", background: T.accent, borderRadius: 20, padding: "5px 10px" }}><span style={{ color: "#fff" }}><Icons.Plane /></span></div>
            </div>
            <div style={{ textAlign: "right" }}><p style={{ fontSize: 40, fontWeight: 800, color: T.text, fontFamily: fam, letterSpacing: "-0.03em" }}>NRT</p><p style={{ fontSize: 12, color: T.textMuted }}>Tokyo Narita</p></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 28 }}>
            {[{ l: "Date", v: "26 Mar" }, { l: "Departs", v: "06:15" }, { l: "Terminal", v: "T1" }, { l: "Gate", v: "14" }, { l: "Seat", v: "14A" }, { l: "Group", v: "2" }].map((d, i) => (
              <div key={i}><p style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{d.l}</p><p style={{ fontSize: 20, fontWeight: 700, color: T.text, marginTop: 4, fontFamily: ["Gate","Seat","Group","Terminal"].includes(d.l) ? fontMono : fam }}>{d.v}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: T.textSecondary }}><Icons.Luggage /></span>
            <span style={{ fontSize: 12, color: T.textSecondary }}>1 × 23kg checked · 1 × 7kg cabin</span>
          </div>
        </div>
        {/* Tear line */}
        <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: T.bg, position: "absolute", left: -12 }}/>
          <div style={{ flex: 1, borderTop: "2px dashed #E5E5EA", margin: "0 20px" }}/>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: T.bg, position: "absolute", right: -12 }}/>
        </div>
        {/* Passenger + QR */}
        <div style={{ padding: "16px 24px 28px", textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Alex Johnson</p>
          <p style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>Economy Plus · QF Gold · FF 1234567</p>
          {/* QR code placeholder */}
          <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(11, 1fr)", gap: 2, padding: "20px 16px 0" }}>
            {Array.from({ length: 121 }, (_, i) => {
              const row = Math.floor(i / 11), col = i % 11;
              const isCorner = (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3);
              return <div key={i} style={{ width: 4, height: 4, background: T.text, opacity: isCorner ? 0.9 : Math.random() > 0.4 ? 0.7 : 0.15, borderRadius: 0.5 }}/>;
            })}
          </div>
          <p style={{ fontSize: 10, fontFamily: fontMono, color: T.textDim, marginTop: 12, letterSpacing: "0.1em" }}>ETKT 081 2345678901</p>
        </div>
      </Card>

      {/* Live countdown */}
      <Card className="s3" style={{ marginTop: 16, padding: 22, textAlign: "center" }}>
        <p style={{ fontSize: 11, color: stateColor, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stateLabel}</p>
        {boardingState === "waiting" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 14 }}>
            {[{ v: String(countdown.h).padStart(2, "0"), l: "hrs" }, { v: String(countdown.m).padStart(2, "0"), l: "min" }, { v: String(countdown.s).padStart(2, "0"), l: "sec" }].map((t, i) => (
              <div key={i}><p style={{ fontSize: 36, fontWeight: 800, color: stateColor, fontFamily: fontMono }}>{t.v}</p><p style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>{t.l}</p></div>
            ))}
          </div>
        )}
      </Card>

      {/* Seat amenities */}
      <div className="s4" style={{ marginTop: 20 }}>
        <SectionTitle>Seat amenities</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ icon: <Icons.Wifi />, l: "Wi-Fi" }, { icon: <Icons.Zap />, l: "Power" }, { icon: <Icons.Coffee />, l: "Meals" }, { icon: <Icons.Star />, l: "Extra leg" }].map((a, i) => (
            <Card key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px" }}>
              <span style={{ color: T.accent }}>{a.icon}</span>
              <p style={{ fontSize: 11, color: T.textMuted, fontWeight: 500 }}>{a.l}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Wallet buttons */}
      <div className="s5" style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button style={{ flex: 1, padding: "16px", height: 56, borderRadius: T.radius, border: "none", background: T.accent, color: "#fff", fontSize: 17, fontWeight: 500, fontFamily: fam, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Add to Wallet
        </button>
        <button style={{ padding: "16px 20px", height: 56, borderRadius: T.radius, border: `1.5px solid ${T.border}`, background: T.card, color: T.textSecondary, fontSize: 14, fontWeight: 500, fontFamily: fam, cursor: "pointer" }}>
          Share
        </button>
      </div>
    </div>
  );
};

// ─── MAP ─────────────────────────────────────────────────────────
const MapScreen = () => {
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState("All");
  const pois = [
    { id: 1, x: 82, y: 28, label: "Gate 14", desc: "Your gate · 6 min walk", color: T.accent, icon: <Icons.Plane />, walk: "6 min", category: "Gates" },
    { id: 2, x: 58, y: 24, label: "Qantas Lounge", desc: "Level 1 · Gold access", color: T.purple, icon: <Icons.Star />, walk: "4 min", category: "Lounges" },
    { id: 3, x: 42, y: 36, label: "Cafe & Bar", desc: "Coffee, snacks · Open", color: T.green, icon: <Icons.Coffee />, walk: "2 min", category: "Food" },
    { id: 4, x: 70, y: 48, label: "Charging Hub", desc: "USB-C + wireless", color: T.blue, icon: <Icons.Zap />, walk: "5 min", category: "Charging" },
    { id: 5, x: 14, y: 48, label: "Security", desc: "~8 min current wait", color: T.orange, icon: <Icons.Shield />, walk: "1 min", category: "Other" },
    { id: 6, x: 52, y: 62, label: "Duty Free", desc: "Open until 05:45", color: T.wattle, icon: <Icons.Globe />, walk: "3 min", category: "Other" },
  ];
  const filteredPois = filter === "All" ? pois : pois.filter(p => p.category === filter);
  const filterCounts = { "Gates": pois.filter(p => p.category === "Gates").length, "Food": pois.filter(p => p.category === "Food").length, "Lounges": pois.filter(p => p.category === "Lounges").length, "Charging": pois.filter(p => p.category === "Charging").length };

  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div className="s1" style={{ padding: "6px 0 4px" }}>
        <p style={{ fontSize: 13, color: T.textMuted, fontWeight: 500 }}>Adelaide Airport · Terminal 1</p>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: T.text, fontFamily: fam, marginTop: 4 }}>Airport Map</h1>
      </div>
      <div className="s2" style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
        {["All", "Gates", "Food", "Lounges", "Charging"].map((f, i) => (
          <span key={i} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: filter === f ? T.accent : T.card, color: filter === f ? "#fff" : T.textSecondary, boxShadow: filter === f ? "none" : T.shadow, whiteSpace: "nowrap", cursor: "pointer" }}>
            {f}{f !== "All" ? ` (${filterCounts[f]})` : ""}
          </span>
        ))}
      </div>
      <Card className="s3" style={{ marginTop: 16, padding: 0, height: 300, position: "relative", overflow: "hidden", background: "#F5F6F8" }}>
        {/* Grid background */}
        <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.04 }}>
          {Array.from({ length: 22 }, (_, i) => <line key={`h${i}`} x1="0" y1={i*14} x2="100%" y2={i*14} stroke="#000" strokeWidth="0.5"/>)}
          {Array.from({ length: 26 }, (_, i) => <line key={`v${i}`} x1={i*14} y1="0" x2={i*14} y2="100%" stroke="#000" strokeWidth="0.5"/>)}
        </svg>
        {/* Terminal floor plan */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute" }}>
          <rect x="10" y="20" width="80" height="55" rx="3" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.4"/>
          <rect x="10" y="42" width="80" height="12" fill="rgba(0,0,0,0.015)" stroke="rgba(0,0,0,0.05)" strokeWidth="0.3"/>
          {[15, 28, 41, 54, 67, 80].map((x, i) => (
            <rect key={`gt${i}`} x={x} y="20" width="8" height="8" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
          ))}
          {[15, 28, 41, 54, 67, 80].map((x, i) => (
            <rect key={`gb${i}`} x={x} y="67" width="8" height="8" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
          ))}
          <text x="20" y="18" fontSize="2.5" fill="rgba(0,0,0,0.25)" fontWeight="600">GATES 1-10</text>
          <text x="62" y="18" fontSize="2.5" fill="rgba(0,0,0,0.25)" fontWeight="600">GATES 11-20</text>
          <text x="42" y="40" fontSize="2.2" fill="rgba(0,0,0,0.2)" fontWeight="500">FOOD COURT</text>
          <text x="12" y="50" fontSize="2.2" fill="rgba(0,0,0,0.2)" fontWeight="500">SECURITY</text>
          <path id="routePath" d="M14 64 Q25 55 35 48 Q50 42 70 38 Q78 36 82 30" fill="none" stroke={T.accent} strokeWidth="0.8" opacity="0.3"/>
          <circle r="1.5" fill={T.accent} opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite" path="M14 64 Q25 55 35 48 Q50 42 70 38 Q78 36 82 30"/>
          </circle>
          <text x="48" y="44" fontSize="2.8" fill={T.accent} fontWeight="700" textAnchor="middle">6 min</text>
        </svg>
        {/* You are here */}
        <div style={{ position: "absolute", left: "11%", top: "61%", zIndex: 3 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: T.blue, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(0,122,255,0.4)", animation: "pulse 2s infinite" }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: "#fff" }}/>
          </div>
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(-30deg)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "12px solid rgba(0,122,255,0.25)" }}/>
        </div>
        <p style={{ position: "absolute", left: "4%", top: "73%", fontSize: 10, color: T.blue, fontWeight: 700 }}>You</p>
        {/* POI markers */}
        {filteredPois.map((p) => (
          <div key={p.id} onClick={() => setSel(p.id === sel ? null : p.id)} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: 2 }}>
            <div style={{ width: sel === p.id ? 34 : 24, height: sel === p.id ? 34 : 24, borderRadius: "50%", background: sel === p.id ? p.color : "#fff", border: `2.5px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease-out", boxShadow: sel === p.id ? `0 2px 10px ${p.color}44` : T.shadow }}>
              <span style={{ fontSize: sel === p.id ? 12 : 10, color: sel === p.id ? "#fff" : p.color }}>{p.icon}</span>
            </div>
            {sel === p.id && <div style={{ position: "absolute", top: "110%", left: "50%", transform: "translateX(-50%)", background: "#fff", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: "10px 14px", minWidth: 150, animation: "fadeIn 0.2s ease-out both", boxShadow: T.shadowMd, whiteSpace: "nowrap", zIndex: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.label}</p>
              <p style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{p.desc}</p>
              <div style={{ marginTop: 8, padding: "6px 12px", borderRadius: T.radiusSm, background: p.color, color: "#fff", fontSize: 11, fontWeight: 600, textAlign: "center", cursor: "pointer" }}>Navigate here</div>
            </div>}
          </div>
        ))}
      </Card>
      <Card className="s4" style={{ marginTop: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent }}><Icons.ArrowRight /></div>
        <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Navigate to Gate 14</p><p style={{ fontSize: 13, color: T.textMuted }}>6 min walk · 380m · Level 1</p></div>
        <div style={{ padding: "10px 20px", borderRadius: T.radiusSm, background: T.accent, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Go</div>
      </Card>
      <div className="s5" style={{ marginTop: 20 }}>
        <SectionTitle>Nearby</SectionTitle>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {pois.slice(2).map((p, idx) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: idx < pois.slice(2).length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: p.color, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{p.label}</p><p style={{ fontSize: 12, color: T.textMuted }}>{p.desc}</p></div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary }}>{p.walk}</p>
              </div>
              <span style={{ color: T.textDim }}><Icons.Chevron /></span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ─── DISRUPTION ──────────────────────────────────────────────────
const DisruptionScreen = ({ setScreen }) => {
  const [accepted, setAccepted] = useState(false);
  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div className="s1" style={{ padding: "6px 0 4px" }}>
        <p style={{ fontSize: 13, color: T.textSecondary, fontWeight: 500 }}>We're taking care of this</p>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: T.text, fontFamily: fam, marginTop: 4 }}>Flight Update</h1>
      </div>
      <Card className="s2" style={{ marginTop: 16, padding: "20px", border: `1.5px solid ${T.orange}30`, background: "linear-gradient(135deg, #FFFBF7, #FFFFFF)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: T.orange, animation: "pulse 2.5s infinite" }}/>
          <Pill color={T.orange}>Delay · 2h 15m</Pill>
        </div>
        <p style={{ fontSize: 17, fontWeight: 600, color: T.text }}>QF 71 is delayed due to weather</p>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>Original</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: T.textMuted, textDecoration: "line-through", marginTop: 4 }}>06:15 ACST</p>
          </div>
          <span style={{ color: T.textDim, fontSize: 18 }}>→</span>
          <div>
            <p style={{ fontSize: 12, color: T.orange, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Updated</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.text, marginTop: 4 }}>08:30 ACST</p>
          </div>
        </div>
        <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: T.radiusSm, background: T.greenSoft, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: T.green }}><Icons.Check /></span>
          <span style={{ fontSize: 13, color: T.green, fontWeight: 500 }}>Your gate is unchanged · Gate 14</span>
        </div>
      </Card>
      <div className="s3" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ color: T.accent }}><Icons.Sparkle /></span>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: fam }}>Smart alternatives</h2>
        </div>
        {!accepted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { flight: "QF 73", time: "09:45", arr: "20:10 JST", badge: "Recommended", reason: "Earliest arrival, similar seat", bc: T.green, price: "No extra cost", seat: "12C · Aisle" },
              { flight: "JL 772", time: "11:00", arr: "21:25 JST", badge: "Codeshare", reason: "Partner airline, window available", bc: T.blue, price: "+$0 (partner)", seat: "23A · Window" },
              { flight: "QF 79", time: "14:30", arr: "01:55+1 JST", badge: "Next day arr.", reason: "Latest option, premium seat", bc: T.textMuted, price: "No extra cost", seat: "8F · Window" },
            ].map((o, i) => (
              <Card key={i} onClick={() => i === 0 && setAccepted(true)} style={{ padding: 18, cursor: i === 0 ? "pointer" : "default", border: i === 0 ? `1.5px solid ${T.green}40` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: fontMono }}>{o.flight}</span>
                    <Pill color={o.bc} style={{ fontSize: 10 }}>{o.badge}</Pill>
                  </div>
                  <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>{o.price}</span>
                </div>
                {i === 0 && <p style={{ fontSize: 12, color: T.green, marginTop: 6 }}>{o.reason}</p>}
                <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
                  {[{ l: "Depart", v: o.time }, { l: "Arrive", v: o.arr }, { l: "Seat", v: o.seat }].map((d, j) => (
                    <div key={j}><p style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d.l}</p><p style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 4 }}>{d.v}</p></div>
                  ))}
                </div>
                {i === 0 && <div style={{ marginTop: 16, padding: "16px", height: 56, borderRadius: T.radius, background: T.accent, textAlign: "center", fontSize: 17, fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>Accept this flight</div>}
              </Card>
            ))}
            <Card style={{ padding: 16, textAlign: "center", cursor: "pointer", marginTop: 4 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.textSecondary }}>Keep current flight (08:30 departure)</p>
            </Card>
          </div>
        ) : (
          <Card style={{ padding: "32px 20px", border: `1.5px solid ${T.green}30` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, background: T.green, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", animation: "checkPop 0.5s ease both" }}><Icons.CheckBig /></div>
              <p style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: fam }}>Rebooked successfully</p>
              <p style={{ fontSize: 14, color: T.textMuted, marginTop: 8 }}>QF 73 · Departing 09:45 · Seat 12C</p>
              <p style={{ fontSize: 14, color: T.green, fontWeight: 600, marginTop: 6 }}>Boarding pass updated automatically</p>
            </div>
            <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: T.radiusSm, background: T.surfaceAlt }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 8 }}>What to do now</p>
              <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.5 }}>Your gate hasn't changed. Enjoy complimentary lounge access while you wait. Your checked baggage has been transferred automatically.</p>
            </div>
            <div onClick={() => setScreen("boarding")} style={{ marginTop: 16, padding: "16px", height: 56, borderRadius: T.radius, background: T.accent, textAlign: "center", fontSize: 17, fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              View updated boarding pass
            </div>
          </Card>
        )}
      </div>
      <div className="s4" style={{ marginTop: 24 }}>
        <SectionTitle>Your entitlements</SectionTitle>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {[
            { l: "Meal voucher", v: "$25 AUD", icon: <Icons.Coffee />, expiry: "Valid until boarding" },
            { l: "Lounge access", v: "Granted", icon: <Icons.Star />, expiry: "Gate 14 area" },
            { l: "Wi-Fi credit", v: "Complimentary", icon: <Icons.Wifi />, expiry: "On board QF 73" },
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent }}>{e.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{e.l}</span>
                <p style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{e.expiry}</p>
              </div>
              <div style={{ padding: "6px 14px", borderRadius: T.radiusSm, background: T.greenSoft, color: T.green, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Claim</div>
            </div>
          ))}
        </Card>
      </div>
      <Card className="s5" style={{ marginTop: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: T.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.purple }}><Icons.Sparkle /></div>
        <div><p style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Need help? Ask your AI assistant</p><p style={{ fontSize: 12, color: T.textMuted }}>"What are my rights?" · "Hotel options nearby"</p></div>
      </Card>
    </div>
  );
};

// ─── TRIP WRAP ───────────────────────────────────────────────────
const WrapScreen = () => {
  const monthData = [3,1,2,0,1,3,2,1,2,1,0,1]; const maxM = Math.max(...monthData);
  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div className="s1" style={{ padding: "6px 0 4px", textAlign: "center" }}>
        <Pill color={T.accent} style={{ marginBottom: 8 }}><Icons.Sparkle /> Year in Review</Pill>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: T.text, fontFamily: fam, marginTop: 10 }}>Your 2026 Trip Wrap</h1>
        <p style={{ fontSize: 14, color: T.textMuted, marginTop: 6 }}>Here's how you travelled this year</p>
      </div>
      <div className="s2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
        {[{ l: "Flights", v: "12", s: "this year" }, { l: "Distance", v: "47,800", s: "km traveled" }, { l: "Countries", v: "6", s: "visited" }, { l: "CO₂ Offset", v: "78%", s: "of emissions" }].map((st, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "22px 12px" }}>
            <p style={{ fontSize: 34, fontWeight: 800, color: T.accent, fontFamily: fontMono, animation: `countUp 0.6s ease both ${0.1*i}s` }}>{st.v}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 6 }}>{st.l}</p>
            <p style={{ fontSize: 11, color: T.textMuted }}>{st.s}</p>
          </Card>
        ))}
      </div>
      <Card className="s3" style={{ marginTop: 20, padding: 22 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 16 }}>Flights per month</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {monthData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", borderRadius: 4, height: maxM > 0 ? `${(v/maxM)*60}px` : 0, minHeight: v > 0 ? 8 : 2, background: v > 0 ? T.accent : "#E5E5EA", transformOrigin: "bottom", animation: `barGrow 0.6s ease both ${0.05*i}s` }}/>
              <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 500 }}>{"JFMAMJJASOND"[i]}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="s4" style={{ marginTop: 20 }}>
        <SectionTitle>Top routes</SectionTitle>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {[{ f: "ADL", t: "SYD", c: 4 }, { f: "ADL", t: "NRT", c: 3 }, { f: "SYD", t: "SIN", c: 2 }].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: T.accentSoft, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{i+1}</div>
              <p style={{ flex: 1, fontSize: 15, fontWeight: 600, color: T.text }}>{r.f} <span style={{ color: T.textDim }}>→</span> {r.t}</p>
              <Pill color={T.accent}>{r.c} flights</Pill>
            </div>
          ))}
        </Card>
      </div>
      <Card className="s5" style={{ marginTop: 20, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ color: T.green }}><Icons.Leaf /></span>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Sustainability impact</h3>
        </div>
        <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.5 }}>You offset <strong style={{ color: T.green }}>9.4 tonnes</strong> of CO₂ — equivalent to planting <strong style={{ color: T.green }}>47 trees</strong>.</p>
        <div style={{ marginTop: 14, height: 6, borderRadius: 3, background: "#E5E5EA", overflow: "hidden" }}>
          <div style={{ width: "78%", height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${T.green}, #5AC8FA)`, animation: "progressFill 1.5s ease both 0.3s" }}/>
        </div>
        <p style={{ fontSize: 12, color: T.textMuted, marginTop: 8 }}>78% of total emissions offset</p>
      </Card>
      <button className="s6" style={{ width: "100%", marginTop: 20, padding: "16px", borderRadius: T.radiusSm, border: "none", background: T.accent, color: "#fff", fontSize: 16, fontWeight: 600, fontFamily: fam, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        Share your Trip Wrap <Icons.ArrowRight />
      </button>
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const scrollRef = useRef(null);
  const handleScreen = useCallback((s) => { setScreen(s); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, []);
  const tabs = [
    { id: "home", label: "Home", Icon: Icons.Home },
    { id: "timeline", label: "Trips", Icon: Icons.Timeline },
    { id: "boarding", label: "Pass", Icon: Icons.Ticket },
    { id: "map", label: "Map", Icon: Icons.Map },
    { id: "disruption", label: "Alerts", Icon: Icons.Alert },
    { id: "wrap", label: "Wrap", Icon: Icons.Wrap },
  ];

  return (
    <div style={{ fontFamily: fam, background: "#DDDDE2", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px 0" }}>
      <style>{animCSS}</style>
      <div style={{ width: 393, height: 852, borderRadius: 48, background: T.bg, position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)" }}>
        {/* Status Bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "14px 30px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bg }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: T.text }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill={T.text}><rect x="0" y="4" width="3" height="8" rx="0.5" opacity="0.3"/><rect x="4.5" y="2" width="3" height="10" rx="0.5" opacity="0.5"/><rect x="9" y="0" width="3" height="12" rx="0.5" opacity="0.8"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 8.5a10 10 0 0114 0" stroke={T.text} strokeWidth="1.5" strokeLinecap="round"/><path d="M4 11a6 6 0 018 0" stroke={T.text} strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="12" r="1" fill={T.text}/></svg>
            <div style={{ width: 25, height: 12, borderRadius: 3, border: `1.2px solid ${T.text}77`, padding: 1.5, position: "relative" }}>
              <div style={{ width: "72%", height: "100%", borderRadius: 1.5, background: T.text }}/>
            </div>
          </div>
        </div>
        {/* Content */}
        <div ref={scrollRef} style={{ height: "calc(100% - 48px - 84px)", overflowY: "auto", scrollBehavior: "smooth" }}>
          <div key={screen} style={{ animation: "fadeIn 0.3s ease both", paddingBottom: 20 }}>
            {screen === "home" && <HomeScreen setScreen={handleScreen} />}
            {screen === "timeline" && <TimelineScreen setScreen={handleScreen} />}
            {screen === "boarding" && <BoardingScreen />}
            {screen === "map" && <MapScreen />}
            {screen === "disruption" && <DisruptionScreen setScreen={handleScreen} />}
            {screen === "wrap" && <WrapScreen />}
          </div>
        </div>
        {/* Tab Bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 84,
          padding: "6px 6px 26px", background: "#FFFFFF",
          borderTop: `0.5px solid rgba(0,0,0,0.12)`,
          display: "flex", justifyContent: "space-around", alignItems: "flex-start",
        }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = screen === id;
            return (
              <div key={id} onClick={() => handleScreen(id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                cursor: "pointer", padding: "6px 14px", borderRadius: 14, position: "relative",
              }}>
                {active && <div style={{ position: "absolute", inset: "2px 4px", background: T.accentSoft, borderRadius: 12 }}/>}
                <span style={{ color: active ? T.accent : T.textMuted, position: "relative", zIndex: 1 }}><Icon filled={active} /></span>
                <span style={{ fontSize: 10, fontWeight: active ? 600 : 500, color: active ? T.accent : T.textMuted, position: "relative", zIndex: 1 }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
