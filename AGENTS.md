# unkn — Agent Guidelines & Project Architecture

## 🧭 Project Context: Phase 1 Real Gameplay
**`unkn`** is a minimal, editorial-style geography guessing game engineered with Next.js (App Router), Tailwind CSS v4, Google Maps JavaScript API, and Firebase.
- **Landing Page (`/`)**: High-craft editorial base station introducing the game, viewport preview, mechanics, theme tokens, and direct "Start Expedition" CTA.
- **Gameplay Route (`/unkn`)**: **Phase 1 Ten-Round Expedition**. Integrates real Google Street View panoramas, server-side secret country selection & validation, searchable dropdown country guesser, round outcome breakdown, and complete expedition audit report.
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

## 🎨 Design Tokens & Palette System (Adaptive Light & Dark Mode)
The application supports **both Light and Dark Mode** (`html.dark` toggled via `StudioNavbar` and persisted in `localStorage["xweet-theme"]`) using CSS-variable-backed tokens in `src/app/globals.css` (`@theme inline`):

| Token | Light | Dark (`html.dark`) | Usage | Tailwind Class |
|---|---|---|---|---|
| **Carbon** | `#171815` | `#F0EFE6` | Primary text, high-contrast surfaces | `bg-carbon`, `text-carbon`, `border-carbon` |
| **Paper** | `#F0EFE6` | `#111210` | Page canvas, light/dark base surface | `bg-paper`, `text-paper`, `border-paper` |
| **Signal Lime** | `#D7F36A` | `#D7F36A` | Primary actions, active highlights | `bg-signal-lime`, `text-signal-lime` |
| **Terrain** | `#858779` | `#9D9F92` | Secondary text, subtle borders, labels | `bg-terrain`, `text-terrain`, `border-terrain` |
| **Mist** | `#B7A7D9` | `#B7A7D9` | Rare secondary accent, soft badges | `bg-mist`, `text-mist`, `border-mist` |

### Dark Mode Rules for All Future Extensions
1. **Always use `@theme inline` in `globals.css`**: Never hardcode static hex values in `@theme` for semantic palette tokens—always bind them to `var(--paper)`, `var(--carbon)`, `var(--terrain)`, etc., so Tailwind utilities adapt automatically.
2. **Never hardcode light-only colors without dark support**: Avoid raw `text-black`, `bg-[#...]`, or light pastel badges without `dark:` variants or `html.dark` rules. Prefer `bg-paper`, `text-carbon`, `text-terrain`, and `border-terrain/*`.
3. **Verify contrast on `bg-carbon` surfaces**: In dark mode, `bg-carbon` stays dark (`#1c1e1a`) for contrast cards and buttons, so ensure any text inside `bg-carbon` remains readable (`#f0efe6` / `text-signal-lime`).
4. **Test both themes**: Every new page, modal, and component must look clean and legible in both Light Mode and Dark Mode.

---

## 🔤 Typography
- **Space Grotesk (`font-space`)**: Prominent headings, editorial titles.
- **Geist (`font-geist`)**: Body text, button labels, UI controls.
- **Geist Mono (`font-mono`)**: Coordinates, round numbers, scores, and technical telemetry.
- **Playwrite Deutschland Grundschrift (`font-playwrite`)**: Distinctive handwritten branding script & quotes.

---

## 🎮 Game Architecture (`/unkn`)
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
