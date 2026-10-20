## Hello UNKN

A Next.js application built with **Tailwind CSS v4**, locked in **Light Mode**, powered by the custom **unkn** brand design system and dual typography.

---

### 🎨 Color Palette Tokens

| Token | Hex | Usage | Tailwind Class | CSS Variable |
|---|---|---|---|---|
| **Carbon** | `#171815` | Main dark background & high-contrast surface | `bg-carbon`, `text-carbon` | `var(--carbon)` |
| **Paper** | `#F0EFE6` | Text and light surfaces (Default Light Mode canvas) | `bg-paper`, `text-paper` | `var(--paper)` |
| **Signal Lime** | `#D7F36A` | Primary action and active state | `bg-signal-lime`, `text-signal-lime` | `var(--signal-lime)` |
| **Terrain** | `#858779` | Secondary text, subtle borders, and structural outlines | `bg-terrain`, `text-terrain` | `var(--terrain)` |
| **Mist** | `#B7A7D9` | Rare secondary accent and soft tags | `bg-mist`, `text-mist` | `var(--mist)` |

---

### 🔤 Typography

- **Geist Thin (100)**: Primary body and interface font. Set globally on `<body>` with `font-weight: 100`.
  - Utility class: `font-geist font-thin` or `font-geist-thin`
- **Playwrite Deutschland Grundschrift**: Display and handwritten script typeface for accents and titles.
  - Utility class: `font-playwrite`

---

### 🚀 Getting Started

```bash
# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.