# Qantas Brand Guide – Digital / UI/UX Edition

**Updated for Portfolio Project – Mobile & Web Customer-Facing Airline App**
**Primary Typeface**: Qantas Sans (latest custom corporate font)
**Focus**: Practical guidelines for web, mobile, and Figma-based design systems
**Version**: 2026 Digital-First

## 1. Brand Overview

Qantas is Australia's flagship airline. The brand stands for reliability, premium Australian hospitality, innovation, and the optimistic "Spirit of Australia".

**Core Personality**: Warm, confident, approachable, optimistic, experienced, and genuinely helpful.

## 2. Logo

- **Primary Mark**: Modern Flying Kangaroo in red within a stylized tailfin shape.
- **Wordmark**: QANTAS in uppercase, bold, strong presence.
- **Clear Space**: Minimum 50% of logo height/width on all sides.
- **Minimum Size**: 32px height on digital screens.
- **Variations**: Full color, black, white (for dark backgrounds), icon-only.

## 3. Color Palette

### Primary
- **Qantas Red** (Logo / Primary CTA): `#E1081F`
- **Qantas Digital Red** (UI accents): `#DD0000`

### Neutrals
- **Black**: `#000000`
- **Dark Text**: `#1F1F1F` / `#323232`
- **White**: `#FFFFFF`
- **Light Gray**: `#F7F7F7` / `#F2F2F2`
- **Mid Gray**: `#E5E5E5`

### Supporting Australian Accents
- Outback Red: `#C10000`
- Sunrise Orange: `#E86831`
- Wattle Yellow: `#FF9D2D` (use sparingly)

**UI Usage Rule**: Use Qantas Red strategically for primary actions only. Backgrounds should remain clean and calm (mostly white/light gray).

## 4. Typography – Qantas Sans

**Primary Typeface**: **Qantas Sans** (custom corporate font by Klim Type Foundry)

**Available Weights** (from official sources):
- QantasSans-Light.woff2
- QantasSans-Regular.woff2
- QantasSans-Medium.woff2
- QantasSans-Bold.woff2

**CSS @font-face Implementation**:
```css
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

Recommended Usage (Digital Hierarchy):

H1 / Page Titles: 32–48px, Bold (700)
H2 / Section Headers: 24–28px, Bold or Medium (700/500)
H3 / Card Titles: 18–20px, Medium (500)
Body Text: 16–17px, Regular (400), line-height 1.55–1.6
UI Text / Captions: 14–15px, Regular or Medium
Buttons: 16–17px, Medium (500)
Fallback Stack: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

5. Design Tokens & CSS Rules (Recommended)
:root {
  /* Colors */
  --qantas-red: #E1081F;
  --qantas-digital-red: #DD0000;
  --text-primary: #1F1F1F;
  --text-secondary: #555555;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F7;
  --border-light: #E5E5E5;

  /* Typography */
  --font-qantas: 'Qantas Sans', system-ui, sans-serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing (4px base scale) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
}

6. Layout & Spacing System
Base Grid: 4px
Mobile Container: Max 428px (with generous side padding of 20–24px)
Section Spacing: 48–64px vertical rhythm
Card Padding: 24px internal
Generous Whitespace: Core aesthetic – avoid clutter

8. Specific UI Component Guidelines
Primary Button:

Background: --qantas-red
Height: 56px (mobile)
Border-radius: 12px
Font: Medium 17px
Hover/Active: Slight darken + scale 98%
Cards:

Background: White
Border-radius: 16px
Shadow: --shadow-md
Internal padding: 24px
Image radius: 12px (if present)
Forms:

Label: Medium 15px
Input height: 56px
Focus state: Red border + subtle red glow
Navigation:

Bottom tab bar: Fixed, icons + labels, active = red icon + text
9. Motion & Micro-interactions
Purposeful and smooth (200–300ms ease-out)
Boarding pass reveal animation
Status updates with subtle checkmark pop
Skeleton loaders during loading states
Button press scale + color transition
10. Accessibility
Minimum contrast ratio 4.5:1 (especially red on white)
Large touch targets (minimum 48x48dp)
Focus states visible
Semantic HTML + ARIA labels
Support Dynamic Type / font scaling
11. Do's and Don'ts
Do:

Use generous whitespace and calm layouts
Apply Qantas Red as strategic accent for key actions
Prioritize clarity and user confidence
Use Qantas Sans consistently
Don't:

Overuse red (causes visual fatigue)
Create cluttered or stressful screens
Use outdated fonts (Ciutadella) — use Qantas Sans
Apply heavy shadows or skeuomorphic effects