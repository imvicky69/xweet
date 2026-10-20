# unkn — Agent Guidelines & Project Architecture

## 🧭 Project Context: Phase 1 Real Gameplay
**`unkn`** is a minimal, editorial-style geography guessing game engineered with Next.js (App Router), Tailwind CSS v4, Google Maps JavaScript API, and Firebase.
- **Landing Page (`/`)**: High-craft editorial base station introducing the game, viewport preview, mechanics, theme tokens, and direct "Start Expedition" CTA.
- **Gameplay Route (`/play`)**: **Phase 1 Ten-Round Expedition**. Integrates real Google Street View panoramas, server-side secret country selection & validation, searchable dropdown country guesser, round outcome breakdown, and complete expedition audit report.
- **Firebase Auth & Firestore**: Guest play supported by default; Google sign-in and Email/Password authentication for archiving completed games to Firestore.

---

## ⚡ Golden Rules (Strict Enforcement)
1. **Never open or run dev server / localhost on your own** unless explicitly prompted by the user.
2. **Step-by-step excellence**: Build and refine incrementally with zero half-baked components.
3. **No generic AI-type theme or components**: Avoid purple gradients, bot bubbles, or cookie-cutter SaaS templates. The aesthetic must feel like an artisanal, editorial cartography tool / tactile brutalist game studio.
4. **Everything minimal yet premium**: Uncompromising visual polish, thoughtful micro-interactions, razor-sharp alignment, and intentional spacing.
5. **Real API Integration over placeholders**: Use real Google Street View panoramas. If API key is missing, provide a clear setup/error state rather than pretending fake gameplay.
6. **Server-Side Answer Secrecy**: The browser must never receive the target country before submission.
7. **SEO Friendly**: Ensure semantic HTML, proper meta tags, OpenGraph previews, and accessible keyboard navigability.

---

## 🎨 Design Tokens & Palette System (Locked Light Mode)
The application operates in **Strict Light Mode** using custom tokens defined in `src/app/globals.css`:

| Token | Hex | Usage | Tailwind Class | CSS Variable |
|---|---|---|---|---|
| **Carbon** | `#171815` | Main dark background, contrast surfaces, primary text | `bg-carbon`, `text-carbon`, `border-carbon` | `var(--carbon)` |
| **Paper** | `#F0EFE6` | Default light canvas, light surfaces, text on dark cards | `bg-paper`, `text-paper`, `border-paper` | `var(--paper)` |
| **Signal Lime** | `#D7F36A` | Primary actions ("Start Expedition", "Submit Guess", active state) | `bg-signal-lime`, `text-signal-lime` | `var(--signal-lime)` |
| **Terrain** | `#858779` | Secondary text, subtle borders, telemetry, coordinate grids | `bg-terrain`, `text-terrain`, `border-terrain` | `var(--terrain)` |
| **Mist** | `#B7A7D9` | Rare secondary accent, clue badges, soft highlights | `bg-mist`, `text-mist`, `border-mist` | `var(--mist)` |

---

## 🔤 Typography
- **Space Grotesk (`font-space`)**: Prominent headings, editorial titles.
- **Geist (`font-geist`)**: Body text, button labels, UI controls.
- **Geist Mono (`font-mono`)**: Coordinates, round numbers, scores, and technical telemetry.
- **Playwrite Deutschland Grundschrift (`font-playwrite`)**: Distinctive handwritten branding script & quotes.

---

## 🎮 Game Architecture (`/play`)
1. **Game Controller State Machine**:
   `ready` → `loading-location` → `playing` → `submitting-guess` → `result` → `completed` (and `error`).
2. **Components**:
   - `GameHeader`: UNKN logo, round counter (`01 / 10`), correct count, 10-round progress segments, exit confirmation modal, auth badge.
   - `StreetViewExplorer`: Google Maps JS SDK Street View Panorama (`showRoadLabels: false`, `addressControl: false`), fullscreen toggle, North reset, setup/error state.
   - `CountryGuessPanel`: Searchable dropdown, arrow key navigation, country flags, submit guess validation.
   - `RoundResult`: `CORRECT` / `INCORRECT` verdict, actual country vs guess comparison, 1 pt / 0 pt award, next round trigger.
   - `ExpeditionSummary`: Final score (/10), accuracy percentage, 10-round audit trail, play again & home actions.
   - `AuthModal`: Google sign in, email/password login/register, guest mode, missing Firebase setup notice.
3. **Server-Side API Routes**:
   - `POST /api/game/start`: Creates session with 10 random non-repeating verified locations. Returns coordinates only without answers.
   - `POST /api/game/guess`: Validates country code on server, updates score, returns answer & next round coordinates.
   - `GET /api/game/summary`: Delivers the complete ten-round audit debrief.
   - `POST /api/game/save`: Validates and saves completed game to Firestore.
