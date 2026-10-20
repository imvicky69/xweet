# unkn — Agent Guidelines & Project Architecture

## 🧭 Project Context
**`unkn`** is a minimalist, high-craft **GeoGuessr alternative game** engineered with Next.js (App Router), Tailwind CSS v4, and Google Maps API.
- **Landing Page (`/`)**: High-craft editorial landing page with hero section, reconnaissance preview, game mechanics breakdown, tactical intel tiers, design tokens showcase, and primary "Play unkn" CTA button.
- **Game Arena (`/play`)**: **"Guess the Country" MVP**. The player is dropped into unknown coordinates via 360° Street View panoramas and must inspect geographical hints (sun position, driving side, foliage, script, road markings) to guess the correct country on the world map before timer runs out or to maximize their streak/score.
- **Phase 2 Implementation Scope**: Full Google Maps JavaScript API SDK (StreetViewService, Photospheres, geometry calculation, custom map styling in Paper/Carbon palette) and dynamic Haversine distance scoring algorithms.

---

## ⚡ Golden Rules (Strict Enforcement)
1. **Never open or run the dev server / localhost on your own** unless explicitly prompted by the user.
2. **Step-by-step excellence**: Build and refine incrementally with zero half-baked components.
3. **No generic AI-type theme or components**: Avoid purple gradients, bot bubbles, or cookie-cutter SaaS templates. The aesthetic must feel like an artisanal, editorial cartography tool / tactile brutalist game studio.
4. **Everything minimal yet premium**: Uncompromising visual polish, thoughtful micro-interactions, razor-sharp alignment, and intentional spacing.
5. **Use extra dependencies when needed**: Add Lucide icons, Canvas Confetti, sound effects, or motion utilities if they elevate the experience.
6. **Proactively suggest better options & architectural improvements**.
7. **SEO Friendly**: Ensure semantic HTML, proper meta tags, OpenGraph previews, and accessible keyboard navigability.

---

## 🎨 Design Tokens & Palette System (Locked Light Mode)
The application operates in **Strict Light Mode** using custom tokens defined in `src/app/globals.css`:

| Token | Hex | Usage | Tailwind Class | CSS Variable |
|---|---|---|---|---|
| **Carbon** | `#171815` | Main dark background, contrast surfaces, primary text | `bg-carbon`, `text-carbon`, `border-carbon` | `var(--carbon)` |
| **Paper** | `#F0EFE6` | Default light canvas, light surfaces, text on dark cards | `bg-paper`, `text-paper`, `border-paper` | `var(--paper)` |
| **Signal Lime** | `#D7F36A` | Primary actions ("Play unkn", "Confirm Guess", active state, scores) | `bg-signal-lime`, `text-signal-lime` | `var(--signal-lime)` |
| **Terrain** | `#858779` | Secondary text, subtle borders, telemetry, coordinate grids | `bg-terrain`, `text-terrain`, `border-terrain` | `var(--terrain)` |
| **Mist** | `#B7A7D9` | Rare secondary accent, clue badges, streak multipliers | `bg-mist`, `text-mist`, `border-mist` | `var(--mist)` |

---

## 🔤 Typography Hierarchy & Readability Rules
1. **Geist**:
   - Variable weights available (`100` to `900`).
   - **Body text & UI controls**: `font-weight: 380` / `400` with `text-carbon` for high contrast and effortless legibility.
   - **Geist Thin (100)**: Reserved strictly for oversized display statistics (scores, streak counters, lat/long telemetry, architectural headers) where large font sizes provide natural weight (`font-thin font-geist`).
2. **Playwrite Deutschland Grundschrift (`font-playwrite`)**:
   - Handwritten, cursive German script font used for branding flair (`unkn`), handwritten clue stamps, destination hints, and editorial accents.

---

## 🗺️ Route Architecture
- **`/`**: High-craft landing page introducing the game, features, preview viewport, and direct "Play unkn" CTA.
- **`/play`**: Live reconnaissance game arena with Street View viewport, country drawer, field intelligence, and round results.
