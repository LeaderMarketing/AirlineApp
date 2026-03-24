# Qantas Travel Companion — Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine 6 existing screens + add AI assistant overlay with strict Qantas brand alignment, emotional design, and portfolio-quality craft.

**Architecture:** Single-page React app using Vite. One JSX file refactored into modular components per screen. Inline styles using a centralized design tokens object aligned to Qantas brand guide. No routing library — keep the existing screen-state approach.

**Tech Stack:** React 18, Vite, no CSS framework (inline styles with design tokens)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx` (move from `travel-companion-app.jsx`)

**Step 1: Initialize Vite + React project**

Run:
```bash
cd C:/studies/qantas
npm create vite@latest . -- --template react
```

If prompted about existing files, allow overwrite of config files only. Keep existing files.

**Step 2: Move the app file into src**

```bash
cp travel-companion-app.jsx src/App.jsx
```

**Step 3: Install dependencies**

Run:
```bash
npm install
```

**Step 4: Clean up default Vite files**

Delete these generated files that we don't need:
- `src/App.css`
- `src/index.css`
- `src/assets/react.svg`
- `public/vite.svg`

Update `src/main.jsx` to:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Update `index.html` title to `Qantas Travel Companion`.

**Step 5: Verify dev server runs**

Run:
```bash
npm run dev
```

Expected: App renders in browser at localhost:5173 with current design visible.

**Step 6: Commit**

```bash
git init
git add package.json vite.config.js index.html src/main.jsx src/App.jsx docs/
git commit -m "chore: scaffold Vite + React project with existing app"
```

---

### Task 2: Brand Alignment — Design Tokens

**Files:**
- Modify: `src/App.jsx` — the `T` object (lines 4-33) and `fam`/`fontMono` variables (line 35-36)

**Step 1: Update design tokens**

Replace the `T` object and font variables with brand-guide-aligned values:

```jsx
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
```

**Step 2: Update the CSS block**

Replace the DM Sans Google Fonts import with Qantas Sans @font-face declarations:

```jsx
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
```

Note: Animation durations changed from 0.4s to 0.3s ease-out per brand guide (200-300ms).

**Step 3: Update shared components**

Update `Card` component shadow and radius:
```jsx
const Card = ({ children, style, onClick, className }) => (
  <div onClick={onClick} className={className} style={{
    background: T.card, borderRadius: T.radiusCard,
    boxShadow: T.shadow, cursor: onClick ? "pointer" : "default",
    transition: "all 0.25s ease-out", ...style,
  }}>{children}</div>
);
```

Update `Pill` to use brand-correct orangeSoft:
```jsx
const Pill = ({ children, color = T.accent, style }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "4px 10px", borderRadius: 20,
    background: color === T.green ? T.greenSoft : color === T.accent ? T.accentSoft : color === T.blue ? T.blueSoft : color === T.orange ? T.orangeSoft : color === T.red ? T.redSoft : `${color}15`,
    color, fontSize: 12, fontWeight: 600, ...style,
  }}>{children}</span>
);
```

Update button heights throughout — every `<button>` and CTA div should be 56px height with 12px border-radius and 17px Medium font.

**Step 4: Verify dev server still renders correctly**

Run: `npm run dev`
Expected: App renders with updated colors, fonts attempt to load (may fallback to system-ui which is fine for dev).

**Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "style: align design tokens to Qantas brand guide"
```

---

### Task 3: Home Screen Refinements

**Files:**
- Modify: `src/App.jsx` — `HomeScreen` component (lines ~122-289)

**Step 1: Update header with logged-in state and time-aware greeting**

Replace the header section with:
```jsx
const HomeScreen = ({ setScreen }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

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
```

**Step 2: Add weather to next flight card**

In the flight details row (the flex with Depart/Flight/Duration), add weather:
```jsx
<div style={{ display: "flex", gap: 24, marginTop: 22 }}>
  {[{ l: "Depart", v: "26 Mar · 06:15" }, { l: "Flight", v: "QF 71" }, { l: "Duration", v: "10h 25m" }].map((d, i) => (
    <div key={i}>
      <p style={{ fontSize: 11, color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d.l}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 4 }}>{d.v}</p>
    </div>
  ))}
</div>
<div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt }}>
  <span style={{ fontSize: 18 }}>partly_cloudy</span>
  <span style={{ fontSize: 13, color: T.textSecondary }}>Tokyo · 14°C, partly cloudy</span>
</div>
```

Note: Use a simple text/unicode weather indicator or a small SVG cloud icon instead of emoji. Create a small cloud SVG icon.

**Step 3: Make trip readiness items tappable**

Add chevrons and amber treatment for pending items:
```jsx
{[
  { icon: <Icons.Check />, label: "Check-in", status: "Complete", done: true },
  { icon: <Icons.Luggage />, label: "Baggage", status: "Added", done: true },
  { icon: <Icons.Shield />, label: "Documents", status: "Review needed", done: false, urgent: true },
  { icon: <Icons.Droplet />, label: "Wellness", status: "Set up", done: false },
].map((item, i) => (
  <div key={i} style={{
    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
    borderRadius: T.radiusSm, background: item.urgent ? T.orangeSoft : "#F8F8FA",
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
```

**Step 4: Update smart suggestions with AI badge and dismiss**

```jsx
const [dismissed, setDismissed] = useState([]);
// ... in render:
{[
  { icon: <Icons.Globe />, text: "Pack light layers — Tokyo is 14°C this week", color: T.blue, bg: T.blueSoft },
  { icon: <Icons.Sparkle />, text: "¥1 AUD = ¥97.2 JPY — rates are favourable", color: T.green, bg: T.greenSoft },
  { icon: <Icons.Leaf />, text: "Your flight emits 1.2t CO2 — offset for $18", color: "#34C759", bg: T.greenSoft },
].filter((_, i) => !dismissed.includes(i)).map((s, i) => (
  <Card key={i} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
    <div style={{ width: 38, height: 38, borderRadius: 19, flexShrink: 0, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: "0.04em" }}>AI Suggested</span>
      </div>
      <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.45 }}>{s.text}</p>
    </div>
    <span onClick={(e) => { e.stopPropagation(); setDismissed([...dismissed, i]); }} style={{ color: T.textDim, cursor: "pointer", padding: 8, fontSize: 16 }}>x</span>
  </Card>
))}
```

**Step 5: Update loyalty card with tier progress**

```jsx
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
```

**Step 6: Verify and commit**

Run: `npm run dev`
Expected: Home screen shows personalized greeting, weather, tappable readiness items, AI badges, and tier progress.

```bash
git add src/App.jsx
git commit -m "feat: refine home screen with personalization and brand alignment"
```

---

### Task 4: Airport Map Refinements

**Files:**
- Modify: `src/App.jsx` — `MapScreen` component (lines ~430-496)

**Step 1: Replace terminal SVG with recognizable floor plan**

Replace the abstract SVG paths inside the map Card with a rectangular terminal layout:

```jsx
<Card className="s3" style={{ marginTop: 16, padding: 0, height: 300, position: "relative", overflow: "hidden", background: "#F5F6F8" }}>
  {/* Grid background */}
  <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.04 }}>
    {Array.from({ length: 22 }, (_, i) => <line key={`h${i}`} x1="0" y1={i*14} x2="100%" y2={i*14} stroke="#000" strokeWidth="0.5"/>)}
    {Array.from({ length: 26 }, (_, i) => <line key={`v${i}`} x1={i*14} y1="0" x2={i*14} y2="100%" stroke="#000" strokeWidth="0.5"/>)}
  </svg>
  {/* Terminal floor plan */}
  <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute" }}>
    {/* Main concourse */}
    <rect x="10" y="20" width="80" height="55" rx="3" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.4"/>
    {/* Central corridor */}
    <rect x="10" y="42" width="80" height="12" fill="rgba(0,0,0,0.015)" stroke="rgba(0,0,0,0.05)" strokeWidth="0.3"/>
    {/* Gate alcoves - top */}
    {[15, 28, 41, 54, 67, 80].map((x, i) => (
      <rect key={`gt${i}`} x={x} y="20" width="8" height="8" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
    ))}
    {/* Gate alcoves - bottom */}
    {[15, 28, 41, 54, 67, 80].map((x, i) => (
      <rect key={`gb${i}`} x={x} y="67" width="8" height="8" fill="rgba(0,0,0,0.02)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
    ))}
    {/* Zone labels */}
    <text x="20" y="18" fontSize="2.5" fill="rgba(0,0,0,0.25)" fontWeight="600">GATES 1-10</text>
    <text x="62" y="18" fontSize="2.5" fill="rgba(0,0,0,0.25)" fontWeight="600">GATES 11-20</text>
    <text x="42" y="40" fontSize="2.2" fill="rgba(0,0,0,0.2)" fontWeight="500">FOOD COURT</text>
    <text x="12" y="50" fontSize="2.2" fill="rgba(0,0,0,0.2)" fontWeight="500">SECURITY</text>
    {/* Animated route path */}
    <path id="routePath" d="M14 64 Q25 55 35 48 Q50 42 70 38 Q78 36 82 30" fill="none" stroke={T.accent} strokeWidth="0.8" opacity="0.3"/>
    <circle r="1.5" fill={T.accent} opacity="0.8">
      <animateMotion dur="3s" repeatCount="indefinite" path="M14 64 Q25 55 35 48 Q50 42 70 38 Q78 36 82 30"/>
    </circle>
    {/* Walking time label */}
    <text x="48" y="44" fontSize="2.8" fill={T.accent} fontWeight="700" textAnchor="middle">6 min</text>
  </svg>
  {/* You are here */}
  <div style={{ position: "absolute", left: "11%", top: "61%", zIndex: 3 }}>
    <div style={{ width: 28, height: 28, borderRadius: 14, background: T.blue, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px rgba(0,122,255,0.4)`, animation: "pulse 2s infinite" }}>
      <div style={{ width: 6, height: 6, borderRadius: 3, background: "#fff" }}/>
    </div>
    {/* Direction cone */}
    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(-30deg)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: `12px solid rgba(0,122,255,0.25)` }}/>
  </div>
  <p style={{ position: "absolute", left: "4%", top: "73%", fontSize: 10, color: T.blue, fontWeight: 700 }}>You</p>
  {/* POI markers with category icons */}
  {pois.map((p) => (
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
```

**Step 2: Add category icons to POIs and update data**

Update the pois array to include icon components and walking times:
```jsx
const pois = [
  { id: 1, x: 82, y: 28, label: "Gate 14", desc: "Your gate · 6 min walk", color: T.accent, icon: <Icons.Plane />, walk: "6 min" },
  { id: 2, x: 58, y: 24, label: "Qantas Lounge", desc: "Level 1 · Gold access", color: T.purple, icon: <Icons.Star />, walk: "4 min" },
  { id: 3, x: 42, y: 36, label: "Cafe & Bar", desc: "Coffee, snacks · Open", color: T.green, icon: <Icons.Coffee />, walk: "2 min" },
  { id: 4, x: 70, y: 48, label: "Charging Hub", desc: "USB-C + wireless", color: T.blue, icon: <Icons.Zap />, walk: "5 min" },
  { id: 5, x: 14, y: 48, label: "Security", desc: "~8 min current wait", color: T.orange, icon: <Icons.Shield />, walk: "1 min" },
  { id: 6, x: 52, y: 62, label: "Duty Free", desc: "Open until 05:45", color: T.wattle, icon: <Icons.Globe />, walk: "3 min" },
];
```

**Step 3: Add filter functionality**

```jsx
const [filter, setFilter] = useState("All");
const filterMap = { "All": null, "Gates": ["Gate 14"], "Food": ["Cafe & Bar"], "Lounges": ["Qantas Lounge"], "Charging": ["Charging Hub"] };
const filteredPois = filter === "All" ? pois : pois.filter(p => filterMap[filter]?.includes(p.label));
const filterCounts = { "Gates": 1, "Food": 1, "Lounges": 1, "Charging": 1 };
```

Update filter chips to use `setFilter` and show counts:
```jsx
{["All", "Gates", "Food", "Lounges", "Charging"].map((f, i) => (
  <span key={i} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: filter === f ? T.accent : T.card, color: filter === f ? "#fff" : T.textSecondary, boxShadow: filter === f ? "none" : T.shadow, whiteSpace: "nowrap", cursor: "pointer" }}>
    {f}{f !== "All" && ` (${filterCounts[f]})`}
  </span>
))}
```

Use `filteredPois` instead of `pois` when rendering markers.

**Step 4: Add walking time and status to nearby list**

```jsx
{pois.slice(2).map((p, idx) => (
  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: idx < pois.slice(2).length - 1 ? `1px solid ${T.border}` : "none" }}>
    <div style={{ width: 10, height: 10, borderRadius: 5, background: p.color, flexShrink: 0 }}/>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{p.label}</p>
      <p style={{ fontSize: 12, color: T.textMuted }}>{p.desc}</p>
    </div>
    <div style={{ textAlign: "right" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary }}>{p.walk}</p>
    </div>
    <span style={{ color: T.textDim }}><Icons.Chevron /></span>
  </div>
))}
```

**Step 5: Verify and commit**

Run: `npm run dev`
Expected: Map shows terminal layout, animated route, category icons, working filters, walking times.

```bash
git add src/App.jsx
git commit -m "feat: refine airport map with terminal layout and wayfinding"
```

---

### Task 5: Disruption Flow Refinements

**Files:**
- Modify: `src/App.jsx` — `DisruptionScreen` component (lines ~498-570)

**Step 1: Add emotional design — warm background and calmer alerts**

Wrap the disruption screen in a warm-tinted container and use amber instead of red for delays:

```jsx
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
          <span style={{ color: T.textDim }}>→</span>
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
```

**Step 2: Improve smart alternatives with comparison and justification**

```jsx
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
{/* Keep current flight option */}
<Card style={{ padding: 16, textAlign: "center", cursor: "pointer", marginTop: 4 }}>
  <p style={{ fontSize: 15, fontWeight: 600, color: T.textSecondary }}>Keep current flight (08:30 departure)</p>
</Card>
```

**Step 3: Improve post-rebooking confirmation**

```jsx
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
```

**Step 4: Add claim buttons and expiry to entitlements**

```jsx
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
```

**Step 5: Verify and commit**

Run: `npm run dev`
Expected: Disruption screen uses warm tones, amber for delays, shows reassurance messaging, comparison justification, "Keep current" option, actionable entitlements.

```bash
git add src/App.jsx
git commit -m "feat: refine disruption flow with emotional design and actionable entitlements"
```

---

### Task 6: Boarding Pass Refinements

**Files:**
- Modify: `src/App.jsx` — `BoardingScreen` component (lines ~365-427)

**Step 1: Add watermark, QR code, and class strip**

Replace the barcode section and add watermark:

```jsx
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

  const boardingState = countdown.h === 0 && countdown.m < 30 ? (countdown.m < 10 ? "final" : "boarding") : "waiting";
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
          {/* ... existing flight route display ... */}
          {/* Add terminal, baggage, FF info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 28 }}>
            {[{ l: "Date", v: "26 Mar" }, { l: "Departs", v: "06:15" }, { l: "Terminal", v: "T1" }, { l: "Gate", v: "14" }, { l: "Seat", v: "14A" }, { l: "Group", v: "2" }].map((d, i) => (
              <div key={i}><p style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{d.l}</p><p style={{ fontSize: 20, fontWeight: 700, color: T.text, marginTop: 4, fontFamily: ["Gate","Seat","Group","Terminal"].includes(d.l) ? fontMono : fam }}>{d.v}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt, display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.Luggage />
            <span style={{ fontSize: 12, color: T.textSecondary }}>1 x 23kg checked · 1 x 7kg cabin</span>
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
              const isCorner = (i < 22 && (i % 11 < 3)) || (i < 22 && (i % 11 > 7)) || (i > 98 && (i % 11 < 3));
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

      {/* Seat amenities + seat preview */}
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
```

**Step 2: Verify and commit**

Run: `npm run dev`
Expected: Boarding pass has class strip, watermark, QR code, live countdown with state transitions, baggage info, FF details, split wallet/share buttons.

```bash
git add src/App.jsx
git commit -m "feat: refine boarding pass with live countdown, QR code, and brand details"
```

---

### Task 7: Trip Wrap Refinements

**Files:**
- Modify: `src/App.jsx` — `WrapScreen` component (lines ~573-630)

**Step 1: Add gradient header and enhanced stats**

```jsx
const WrapScreen = () => {
  const monthData = [3,1,2,0,1,3,2,1,2,1,0,1];
  const maxM = Math.max(...monthData);
  const [activeMonth, setActiveMonth] = useState(null);
  const monthRoutes = ["ADL-SYD x2, ADL-NRT","SYD-MEL","ADL-SIN, SIN-ADL","","SYD-BKK","ADL-NRT, NRT-ADL, ADL-SYD","SYD-SIN, SIN-SYD","ADL-SYD","ADL-NRT, NRT-KIX","SYD-MEL","","ADL-SYD"];

  return (
    <div style={{ padding: "0 20px 24px" }}>
      {/* Gradient header */}
      <div className="s1" style={{ margin: "0 -20px", padding: "24px 20px 32px", background: "linear-gradient(135deg, #E1081F, #E86831)", borderRadius: "0 0 24px 24px", textAlign: "center", marginBottom: 24 }}>
        <Pill color="#fff" style={{ background: "rgba(255,255,255,0.2)", marginBottom: 8 }}><Icons.Sparkle /> Year in Review</Pill>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", fontFamily: fam, marginTop: 10 }}>Your 2026 Trip Wrap</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>Here's how you travelled this year</p>
      </div>

      {/* Stats grid - enhanced */}
      <div className="s2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { l: "Flights", v: "12", s: "this year" },
          { l: "Distance", v: "47,800", s: "km traveled" },
          { l: "Countries", v: "6", s: "visited" },
          { l: "Hours in air", v: "127", s: "hours total" },
        ].map((st, i) => (
          <Card key={i} style={{ textAlign: "center", padding: "22px 12px" }}>
            <p style={{ fontSize: 34, fontWeight: 800, color: T.accent, fontFamily: fontMono, animation: `countUp 0.6s ease both ${0.15*i}s` }}>{st.v}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 6 }}>{st.l}</p>
            <p style={{ fontSize: 11, color: T.textMuted }}>{st.s}</p>
          </Card>
        ))}
      </div>

      {/* Milestone cards */}
      <div className="s3" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: <Icons.Plane />, label: "Longest flight", value: "ADL → LHR · 22h 15m" },
          { icon: <Icons.Star />, label: "Most visited", value: "Tokyo · 3 trips" },
          { icon: <Icons.Ticket filled={false} />, label: "Favourite seat", value: "Window · 83% of flights" },
        ].map((m, i) => (
          <Card key={i} style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent }}>{m.icon}</div>
            <div>
              <p style={{ fontSize: 12, color: T.textMuted, fontWeight: 500 }}>{m.label}</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.text, marginTop: 2 }}>{m.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Interactive bar chart */}
      <Card className="s4" style={{ marginTop: 20, padding: 22 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 16 }}>Flights per month</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, position: "relative" }}>
          {monthData.map((v, i) => (
            <div key={i} onClick={() => setActiveMonth(activeMonth === i ? null : i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: v > 0 ? "pointer" : "default" }}>
              <div style={{ width: "100%", borderRadius: 4, height: maxM > 0 ? `${(v/maxM)*60}px` : 0, minHeight: v > 0 ? 8 : 2, background: activeMonth === i ? T.accentDark : v > 0 ? T.accent : "#E5E5EA", transformOrigin: "bottom", animation: `barGrow 0.6s ease both ${0.05*i}s`, transition: "background 0.2s" }}/>
              <span style={{ fontSize: 9, color: activeMonth === i ? T.accent : T.textMuted, fontWeight: activeMonth === i ? 700 : 500 }}>{"JFMAMJJASOND"[i]}</span>
            </div>
          ))}
        </div>
        {activeMonth !== null && monthData[activeMonth] > 0 && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: T.radiusSm, background: T.surfaceAlt, animation: "fadeIn 0.2s ease-out both" }}>
            <p style={{ fontSize: 12, color: T.textSecondary }}>{monthRoutes[activeMonth]}</p>
          </div>
        )}
      </Card>

      {/* Route map visualization */}
      <Card className="s5" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px 8px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Your world</h3>
        </div>
        <svg viewBox="0 0 360 180" style={{ width: "100%", height: 160, padding: "0 16px 16px" }}>
          {/* Simplified world map dots */}
          {[[120,60],[140,55],[160,50],[180,45],[200,48],[220,55],[240,52],[260,58],[280,55],[300,60],[140,80],[160,78],[180,75],[200,72],[220,78],[240,85],[120,100],[140,95],[160,90],[180,88],[200,92],[240,100],[260,95],[280,105],[300,110],[100,120],[120,130],[140,125],[280,130],[300,125]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#E5E5EA"/>
          ))}
          {/* Route arcs */}
          {[
            { x1: 138, y1: 125, x2: 155, y2: 90, label: "ADL-SYD" },
            { x1: 138, y1: 125, x2: 240, y2: 52, label: "ADL-NRT" },
            { x1: 155, y1: 90, x2: 210, y2: 72, label: "SYD-SIN" },
            { x1: 155, y1: 90, x2: 225, y2: 60, label: "SYD-BKK" },
          ].map((r, i) => {
            const mx = (r.x1 + r.x2) / 2, my = Math.min(r.y1, r.y2) - 20;
            return <path key={i} d={`M${r.x1},${r.y1} Q${mx},${my} ${r.x2},${r.y2}`} fill="none" stroke={T.accent} strokeWidth="1" opacity="0.5" strokeDasharray="3 3" style={{ animation: `fadeIn 0.5s ease both ${0.2*i}s` }}/>;
          })}
          {/* City dots */}
          {[
            { x: 138, y: 125, label: "ADL" },
            { x: 155, y: 90, label: "SYD" },
            { x: 240, y: 52, label: "NRT" },
            { x: 210, y: 72, label: "SIN" },
            { x: 225, y: 60, label: "BKK" },
            { x: 245, y: 55, label: "KIX" },
          ].map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y} r="3" fill={T.accent} style={{ animation: `countUp 0.4s ease both ${0.1*i}s` }}/>
              <text x={c.x} y={c.y - 7} textAnchor="middle" fontSize="7" fill={T.textSecondary} fontWeight="600">{c.label}</text>
            </g>
          ))}
        </svg>
      </Card>

      {/* Top routes */}
      <div className="s6" style={{ marginTop: 20 }}>
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

      {/* Sustainability */}
      <Card className="s7" style={{ marginTop: 20, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ color: T.green }}><Icons.Leaf /></span>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Sustainability impact</h3>
        </div>
        <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.5 }}>You offset <strong style={{ color: T.green }}>9.4 tonnes</strong> of CO2 — equivalent to planting <strong style={{ color: T.green }}>47 trees</strong>.</p>
        <div style={{ display: "flex", gap: 3, marginTop: 14 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 8 ? `linear-gradient(90deg, ${T.green}, #5AC8FA)` : "#E5E5EA", animation: `barGrow 0.4s ease both ${0.05*i}s`, transformOrigin: "left" }}/>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <p style={{ fontSize: 12, color: T.textMuted }}>78% of total emissions offset</p>
          <p style={{ fontSize: 12, color: T.green, fontWeight: 600 }}>12% greener than 2025</p>
        </div>
      </Card>

      {/* Shareable card preview */}
      <div style={{ marginTop: 24 }}>
        <SectionTitle>Share your wrap</SectionTitle>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {/* Preview card */}
          <div style={{ padding: "24px 20px", background: "linear-gradient(135deg, #E1081F, #E86831)", color: "#fff", textAlign: "center" }}>
            <svg width="28" height="20" viewBox="0 0 40 28" fill="#fff" style={{ marginBottom: 8 }}><path d="M20 0c-3 0-5.5 4-7 8l-1.5 4c-1.2 2.5-3 4.5-6 5.5-2 .8-4 .5-5-.5 2.5 3.5 5.5 4.5 8.5 3 2.5-1 4-3 5.5-5.5l1-2.5c1-2.5 2.5-5 4.5-5s3.5 2.5 4.5 5l1 2.5c1.5 2.5 3 4.5 5.5 5.5 3 1.5 6 .5 8.5-3-1 1-3 1.3-5 .5-3-1-4.8-3-6-5.5L26.5 8C25 4 22.5 0 20 0z"/></svg>
            <p style={{ fontSize: 18, fontWeight: 800 }}>My 2026 Trip Wrap</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 14, fontSize: 13, fontWeight: 600 }}>
              <span>12 Flights</span><span>6 Countries</span><span>47,800 km</span>
            </div>
          </div>
          <div style={{ padding: 16, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 12 }}>Preview of your shareable card</p>
            <button style={{ width: "100%", padding: "16px", height: 56, borderRadius: T.radius, border: "none", background: T.accent, color: "#fff", fontSize: 17, fontWeight: 500, fontFamily: fam, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Share your Trip Wrap <Icons.ArrowRight />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
```

**Step 2: Verify and commit**

Run: `npm run dev`
Expected: Trip Wrap has gradient header, milestone cards, interactive chart, route map, segmented sustainability bar, shareable card preview.

```bash
git add src/App.jsx
git commit -m "feat: refine trip wrap with gradient header, route map, and shareable card"
```

---

### Task 8: AI Assistant Overlay

**Files:**
- Modify: `src/App.jsx` — add `AiAssistant` component and integrate into `App`

**Step 1: Create the AI Assistant component**

Add this component before the `App` export:

```jsx
const AiAssistant = ({ screen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const contextChips = {
    home: ["What should I pack?", "Is my flight on time?", "Upgrade options"],
    disruption: ["What are my rights?", "Find hotels nearby", "Will I miss my connection?"],
    map: ["Where's the nearest lounge?", "How long to my gate?", "Best coffee nearby"],
    boarding: ["Can I upgrade my seat?", "Meal options on my flight", "Wi-Fi info"],
    timeline: ["Am I on track?", "What's the weather?", "Currency exchange tips"],
    wrap: ["How do I offset more?", "Compare to last year", "Share options"],
  };

  const mockResponses = {
    "What should I pack?": "Tokyo will be 12-16°C this week. I'd recommend light layers — a jacket, a couple of long sleeves, and comfortable walking shoes. Rain is unlikely but a compact umbrella won't hurt!",
    "Is my flight on time?": "Yes! QF 71 is currently on schedule. Departure at 06:15 from Gate 14. I'd suggest arriving at ADL by 04:15 for a relaxed experience.",
    "What are my rights?": "Under Australian Consumer Law, for a 2h+ delay you're entitled to meal vouchers, rebooking at no cost, and lounge access if available. I've already applied your entitlements.",
    "Where's the nearest lounge?": "The Qantas Business Lounge is a 4-minute walk from your current location. Your Gold status grants you access. It closes 30 minutes before departure.",
    "Can I upgrade my seat?": "There are 3 Premium Economy seats available on QF 71. An upgrade would be 12,400 points or $280 AUD. Would you like me to check availability?",
  };

  const handleSend = (text) => {
    const msg = text || inputVal;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setInputVal("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = mockResponses[msg] || "I can help with that! For this prototype, I have pre-set responses for the suggested questions above. Try tapping one of those.";
      setMessages(prev => [...prev, { role: "assistant", text: response }]);
    }, 1200);
  };

  const chips = contextChips[screen] || contextChips.home;

  return (
    <div style={{ position: "absolute", bottom: 84, left: 0, right: 0, top: "40%", background: "#fff", borderRadius: "20px 20px 0 0", boxShadow: "0 -4px 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", animation: "fadeIn 0.25s ease-out both", zIndex: 20 }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: T.accent }}><Icons.Sparkle /></span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Ask Qantas</span>
        </div>
        <span onClick={onClose} style={{ fontSize: 20, color: T.textMuted, cursor: "pointer", padding: 4 }}>x</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 14, color: T.textMuted }}>How can I help with your trip?</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, animation: "fadeIn 0.2s ease-out both" }}>
            <div style={{
              maxWidth: "80%", padding: "12px 16px", borderRadius: 16,
              background: msg.role === "user" ? T.surfaceAlt : "#fff",
              borderLeft: msg.role === "assistant" ? `3px solid ${T.accent}` : "none",
              boxShadow: msg.role === "assistant" ? T.shadow : "none",
            }}>
              <p style={{ fontSize: 14, color: T.text, lineHeight: 1.5 }}>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", gap: 4, padding: "12px 16px", animation: "fadeIn 0.2s ease-out both" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: T.textDim, animation: `typing 1s ease-in-out ${0.2*i}s infinite` }}/>
            ))}
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {messages.length < 2 && (
        <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, overflowX: "auto" }}>
          {chips.map((chip, i) => (
            <span key={i} onClick={() => handleSend(chip)} style={{ padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: T.surfaceAlt, color: T.textSecondary, whiteSpace: "nowrap", cursor: "pointer", border: `1px solid ${T.border}` }}>{chip}</span>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 10 }}>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Ask anything..." style={{ flex: 1, height: 44, borderRadius: 22, border: `1px solid ${T.border}`, padding: "0 16px", fontSize: 14, fontFamily: fam, outline: "none" }}/>
        <div onClick={() => handleSend()} style={{ width: 44, height: 44, borderRadius: 22, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icons.ArrowRight />
        </div>
      </div>
    </div>
  );
};
```

**Step 2: Add FAB and integrate into App component**

In the `App` component, add state and the FAB:

```jsx
export default function App() {
  const [screen, setScreen] = useState("home");
  const [aiOpen, setAiOpen] = useState(false);
  const scrollRef = useRef(null);
  const handleScreen = useCallback((s) => { setScreen(s); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, []);
  // ... existing tabs ...

  return (
    <div style={{ fontFamily: fam, background: "#DDDDE2", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px 0" }}>
      <style>{animCSS}</style>
      <div style={{ width: 393, height: 852, borderRadius: 48, background: T.bg, position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)" }}>
        {/* ... status bar ... */}
        {/* ... content ... */}

        {/* AI Assistant */}
        {aiOpen && <AiAssistant screen={screen} onClose={() => setAiOpen(false)} />}

        {/* FAB */}
        {!aiOpen && (
          <div onClick={() => setAiOpen(true)} style={{
            position: "absolute", bottom: 96, right: 20,
            width: 52, height: 52, borderRadius: 26,
            background: T.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(225,8,31,0.35)",
            cursor: "pointer", zIndex: 15,
            animation: "fadeIn 0.3s ease-out both",
          }}>
            <Icons.Sparkle />
          </div>
        )}

        {/* Tab Bar */}
        {/* ... existing tab bar ... */}
      </div>
    </div>
  );
}
```

**Step 3: Make the send button arrow white**

The ArrowRight icon in the send button needs white color. Wrap it:
```jsx
<span style={{ color: "#fff" }}><Icons.ArrowRight /></span>
```

**Step 4: Verify and commit**

Run: `npm run dev`
Expected: Red FAB visible on all screens. Tapping opens half-sheet with context-aware chips. Tapping a chip sends message, shows typing dots, returns mocked response. Input field works for custom messages.

```bash
git add src/App.jsx
git commit -m "feat: add AI assistant overlay with context-aware suggestions"
```

---

### Task 9: Final Polish Pass

**Files:**
- Modify: `src/App.jsx`

**Step 1: Audit all button heights**

Search for all `<button>` and CTA `<div>` elements. Ensure:
- Height: 56px
- Border-radius: 12px (T.radius)
- Font: 17px, fontWeight 500
- Font family: fam (Qantas Sans)

**Step 2: Audit all touch targets**

Ensure all interactive elements (pills, chevrons, icons, filter chips) have minimum 48x48 tappable area (add padding if needed).

**Step 3: Audit spacing consistency**

Check all section gaps use the 4px grid: 8, 12, 16, 20, 24, 32, 48, 64. Fix any odd values (e.g., 14px → 12px or 16px, 22px → 24px, 18px → 16px or 20px).

**Step 4: Verify all screens render correctly**

Run: `npm run dev`
Navigate through all 6 screens + AI assistant. Check:
- Fonts rendering (fallback to system-ui is acceptable)
- Colors match brand guide
- Animations feel smooth (200-300ms)
- All interactive elements respond
- No console errors

**Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "style: final polish pass — spacing, touch targets, button consistency"
```
