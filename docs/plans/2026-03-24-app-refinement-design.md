# Qantas Travel Companion App — Refinement Design

**Date**: 2026-03-24
**Goal**: Depth of craft + case study presentation for UI/UX/Product Designer portfolio
**Approach**: Polish & deepen 6 existing screens + add AI assistant overlay (Approach A)
**Brand**: Qantas-branded concept — strict adherence to brand guide

---

## 1. Brand Alignment (Foundation)

### Typography
- Replace DM Sans with Qantas Sans (Light 300, Regular 400, Medium 500, Bold 700)
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Hierarchy: H1 32-48px Bold, H2 24-28px Bold/Medium, H3 18-20px Medium, Body 16-17px Regular (line-height 1.55-1.6), Captions 14-15px, Buttons 17px Medium

### Colors
| Token | Current (wrong) | Correct |
|-------|-----------------|---------|
| accent/red | `#E0001B` | `#E1081F` |
| digital red | — | `#DD0000` |
| dark text | `#1A1A1A` | `#1F1F1F` |
| secondary text | `#3C3C43` | `#555555` |
| bg secondary | `#F2F2F7` | `#F7F7F7` |
| border | `rgba(0,0,0,0.06)` | `#E5E5E5` |

### Spacing & Components
- 4px base grid throughout
- Button height: 56px, border-radius: 12px
- Card border-radius: 16px, padding: 24px, shadow: `0 4px 16px rgba(0,0,0,0.1)`
- Touch targets: min 48x48
- Container padding: 20-24px sides
- Motion: 200-300ms ease-out standardized

---

## 2. Home Screen

- Time-aware greeting: "Good morning, Alex"
- Profile avatar (initials "AJ") replacing "Log in" for logged-in state
- Weather snippet on next flight card: "14C, partly cloudy in Tokyo"
- Trip readiness items tappable with chevrons, amber treatment for "Review needed"
- Smart suggestions labeled "Suggested by AI" with dismiss capability
- Loyalty card: prominent Gold tier badge, "4,750 pts to Platinum" progress
- Quick actions: larger touch targets, brand red icon accents

---

## 3. Airport Map

- Recognizable terminal floor plan (rectangular concourse, gate alcoves, central corridor, labeled zones)
- Directional cone on "You are here" dot
- Animated route line (traveling dots) with walking time labels at midpoint
- Category-specific mini icons on POI markers (fork, plug, shield)
- "Navigate here" action in selected popup
- Filter chips with count badges, actual filtering behavior
- Walking time and open/closed status in nearby list

---

## 4. Disruption Flow

- Emotional design: warm background tint, slower amber pulse (not red) for delays
- Lead with reassurance: "We're taking care of this" before delay details
- Original time struck through alongside new time
- Connection impact indicator (safe/at risk)
- Alternative comparison: justify "Recommended" tag with reason
- Explicit "Keep current flight" option
- Post-rebooking summary: new flight + boarding pass link + baggage status + "What to do now"
- Entitlements with "Claim" buttons and expiry info

---

## 5. Boarding Pass

- Subtle Qantas kangaroo watermark background
- QR code placeholder (grid pattern) replacing random barcode
- Class indicator strip (thin red line for Economy)
- Terminal info, baggage allowance, FF number + status
- Live ticking countdown (useEffect/setInterval)
- Boarding state transitions: "Opens in..." -> "Now boarding" -> "Final call" with color shifts
- Mini seat map preview with 14A highlighted
- Apple Wallet + Google Wallet icons, "Share boarding pass" secondary action

---

## 6. Trip Wrap

- Gradient header (red-to-warm-orange) for celebratory feel
- Dramatic staggered count-up animations with scale bounce
- Interactive bar chart (tap bar -> tooltip with routes)
- World map with curved route arcs (hero visual)
- Flags/country indicators on airport codes
- Milestone storytelling cards: longest flight, most visited, favourite seat, hours in air
- Tree icon row for sustainability (colored = offset, gray = remaining)
- Year-over-year comparison: "12% greener than 2025"
- Shareable card preview above the share button (Instagram Stories / LinkedIn format)

---

## 7. AI Assistant Overlay

- Floating action button (brand red, sparkle icon) above tab bar on every screen
- Half-sheet modal slide-up, not full screen
- Name: "Ask Qantas"
- User messages: right-aligned gray bubbles. Assistant: white cards with red left border
- Context-aware suggestion chips per screen:
  - Home: "What should I pack?" / "Is my flight on time?"
  - Disruption: "What are my rights?" / "Find hotels nearby"
  - Map: "Where's the nearest lounge?" / "How long to my gate?"
  - Boarding: "Can I upgrade my seat?" / "Meal options on my flight"
- Mocked typing indicator (three animated dots)
- Short, warm, actionable responses with inline action buttons and embedded mini cards
- Mocked responses only — no real API integration

---

## Out of Scope
- New screens (seat selection, in-flight, loyalty dashboard)
- Real AI API integration
- Backend/data persistence
- Native mobile features (biometrics, push notifications)
