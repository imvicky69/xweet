export type AppCategory = "web" | "android" | "extension" | "games";

export type ReleaseStatus =
  | "Live"
  | "Closed Testing"
  | "GitHub Release"
  | "In Development"
  | "Coming Soon";

export interface EcosystemApp {
  id: string;
  name: string;
  category: AppCategory;
  categoryLabel: string;
  domain: string;
  iconPath: string;
  tagline: string;
  description: string;
  status: ReleaseStatus;
  platforms: string[];
  highlights: string[];
  tags: string[];
  webUrl?: string;
  detailsUrl?: string;
  playStoreUrl?: string;
  playTestingNote?: string;
  githubRepo?: string;
  githubReleaseRepo?: string;
  npmPackage?: string;
  featured?: boolean;
}

export const COMMUNITY_LINKS = {
  github: "https://github.com/imvicky69",
  instagram: "https://instagram.com/xweet_69",
  email: "mailto:vikky@xweet.in",
  playTestingEmail:
    "mailto:vikky@xweet.in?subject=Join%20Xweet%20Play%20Store%20Closed%20Testing&body=Hi%20Vikky%2C%20please%20add%20my%20Google%20Play%20email%20to%20the%20Xweet%20Closed%20Testing%20track%3A%20",
};

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: "xweet-bg",
    name: "xweet bg",
    category: "web",
    categoryLabel: "ON-DEVICE AI STUDIO",
    domain: "bg.xweet.in",
    iconPath: "/apps/xweet-bg.png",
    tagline: "Free on-device AI background remover with zero uploads and zero watermarks.",
    description:
      "Runs quantized BRIA RMBG-1.4 directly inside your browser via WebGPU and WebAssembly. Includes an interactive before/after compare slider, solid/gradient/blurred backdrops, de-fringe edge cleanup, trim-to-subject padding, and manual brush touch-up.",
    status: "Live",
    platforms: ["Web", "Offline PWA"],
    highlights: [
      "100% local WebGPU + WASM inference — photos never leave your device",
      "De-fringe edge decontamination, studio drop shadow, and trim-to-subject",
      "Passport, Avatar, and Product presets with PNG, WEBP & JPG export",
      "Works offline after first visit with HEIC/iPhone photo support",
    ],
    tags: ["Next.js", "WebGPU", "Transformers.js", "WASM", "Offline PWA"],
    webUrl: "https://bg.xweet.in",
    githubRepo: "https://github.com/imvicky69/bg-remover",
    featured: true,
  },
  {
    id: "wallpapers",
    name: "Xweet Wallpapers",
    category: "android",
    categoryLabel: "4K & AMOLED ARCHIVE",
    domain: "wallpaper.xweet.in",
    iconPath: "/apps/wallpapers.png",
    tagline: "Curated 4K & AMOLED wallpapers on web and Android with custom lockscreen framing.",
    description:
      "A hand-curated archive of minimal, floral, dark abstract, and AMOLED wallpapers for mobile and desktop. The Android app pairs Cloudflare R2 edge caching with a 4K desktop framing tool and one-tap native lockscreen setter.",
    status: "Closed Testing",
    platforms: ["Web (Live)", "Android (Closed Testing)"],
    highlights: [
      "Web gallery live at wallpaper.xweet.in with zero watermarks",
      "Interactive 4K framing cropper & live lockscreen clock preview on Android",
      "One-tap native WallpaperManager setter + 60-day smart disk cache",
      "Currently in Google Play Closed Testing — join testers to install",
    ],
    tags: ["Flutter", "Android", "Next.js", "Cloudflare R2", "4K UHD"],
    webUrl: "https://wallpaper.xweet.in",
    detailsUrl: "/wallpapers",
    playStoreUrl: "https://play.google.com/store/apps/details?id=in.xweet.wallpapers",
    playTestingNote: "Play Store Closed Testing",
    featured: true,
  },
  {
    id: "xweet-games",
    name: "Xweet Games",
    category: "games",
    categoryLabel: "WEB & ANDROID GAMES",
    domain: "xweet.in/games",
    iconPath: "/apps/xweet-games.png",
    tagline: "Ad-free collection of deduction & arcade games — playable on web and Android.",
    description:
      "Play minimalist browser games like unkn (10-round Street View geography deduction) and Wordle directly on the web, or try the native Flutter Xweet Games Android hub featuring arcade & reflex challenges with persistent high scores and haptics.",
    status: "Closed Testing",
    platforms: ["Web (Live)", "Android (Closed Testing)"],
    highlights: [
      "unkn: 360° Google Street View geography deduction game live on web",
      "Wordle: Strict light-mode 5-letter daily puzzle with streak persistence",
      "Android Hub (in.xweet.games): Cyber Reflex & modular Flutter mini-games",
      "100% free and ad-free — Android build in Play Store Closed Testing",
    ],
    tags: ["Next.js", "Flutter", "Google Maps SDK", "Android", "Zero Ads"],
    webUrl: "/games",
    detailsUrl: "/games",
    playTestingNote: "Play Store Closed Testing",
    featured: true,
  },
  {
    id: "infyn-dl",
    name: "Infyn DL",
    category: "android",
    categoryLabel: "OPEN-SOURCE MUSIC & DOWNLOADER",
    domain: "github.com/imvicky69/infyn-dl",
    iconPath: "/apps/infyn-dl.png",
    tagline: "Open-source, ad-free offline music player & YouTube/playlist downloader for Android.",
    description:
      "Built in Flutter with native yt-dlp and FFmpeg execution on-device. Stream or download single tracks, albums, and full YouTube Music playlists into organized offline folders with a built-in lock-screen audio player.",
    status: "GitHub Release",
    platforms: ["Android APK", "Open Source"],
    highlights: [
      "Native M4A / 320k MP3 extraction via embedded yt-dlp & FFmpeg",
      "Full playlist batch downloads with multi-worker acceleration (up to 5x)",
      "Built-in offline audio player with mini-player, queue & lock-screen controls",
      "100% ad-free & open source — dynamic latest APK directly from GitHub",
    ],
    tags: ["Flutter", "Kotlin", "yt-dlp", "FFmpeg", "Open Source"],
    githubRepo: "https://github.com/imvicky69/infyn-dl",
    githubReleaseRepo: "imvicky69/infyn-dl",
    featured: true,
  },
  {
    id: "infyn-home-tab",
    name: "Infyn Home Tab",
    category: "extension",
    categoryLabel: "CHROME EXTENSION · MANIFEST V3",
    domain: "infyn.software/home-tab",
    iconPath: "/apps/infyn-home-tab.png",
    tagline: "Lightweight Chrome & Chromium new-tab command center for developers.",
    description:
      "Turns every new browser tab into a distraction-free workspace with pinned GitHub repos (1-click git clone), Firebase console deep-links, a Pomodoro focus timer synced to the toolbar icon badge, Omnisearch (Cmd+K), and WebGL light shaders.",
    status: "GitHub Release",
    platforms: ["Chrome / Brave / Edge / Arc", "Open Source"],
    highlights: [
      "GitHub repo switcher & Firebase Console quick-links",
      "Background Manifest V3 Pomodoro timer synced to extension badge",
      "Cmd+K Omnisearch across Google, ChatGPT, Perplexity & GitHub",
      "100% local chrome.storage privacy with zero analytics or ads",
    ],
    tags: ["Manifest V3", "Chrome Extension", "WebGL", "Productivity", "MIT"],
    webUrl: "https://infyn.software/home-tab",
    githubRepo: "https://github.com/imvicky69/infyn-home-tab",
    githubReleaseRepo: "imvicky69/infyn-home-tab",
  },
  {
    id: "infyn",
    name: "Infyn Utilities",
    category: "web",
    categoryLabel: "BROWSER UTILITY SUITE & NPM SDK",
    domain: "infyn.software → infyn.xweet.in",
    iconPath: "/apps/infyn.png",
    tagline: "12+ client-side PDF & image browser tools + tree-shakeable NPM library.",
    description:
      "A complete privacy-first browser utility suite (soon migrating to infyn.xweet.in). Merge, split, password-protect, and unlock PDFs, batch compress images, strip EXIF GPS metadata, and convert iPhone HEIC files—all locally via WebAssembly.",
    status: "Live",
    platforms: ["Web Suite", "NPM Package (infyn)"],
    highlights: [
      "PDF Suite: Merger, Splitter, AES-256 Protector, Unlocker, PDF-to-Image",
      "Image Suite: Batch Compressor, Resizer, Converter, HEIC-to-JPG, EXIF Remover",
      "Also published on NPM (`infyn`, `infyn/pdf`, `infyn/image`) for React/Next.js",
      "Zero server uploads — everything executes inside your browser",
    ],
    tags: ["Next.js", "WebAssembly", "pdf-lib", "NPM", "TypeScript"],
    webUrl: "https://infyn.software",
    githubRepo: "https://github.com/imvicky69/infyn",
    npmPackage: "https://www.npmjs.com/package/infyn",
  },
  {
    id: "smiley-pdf",
    name: "Smiley PDF",
    category: "android",
    categoryLabel: "ANDROID PDF READER & SCANNER",
    domain: "smiley.xweet.in",
    iconPath: "/apps/smiley-pdf.png",
    tagline: "Fast Android PDF reader, document scanner & utility toolkit — coming to Play Store.",
    description:
      "Engineered in Flutter (`in.xweet.smileypdf`) for joyful, distraction-free document workflows on Android. Combines smooth PDF reading with document scanning and everyday PDF tools—completely free of ads and cloud tracking.",
    status: "In Development",
    platforms: ["Android (Coming Soon to Play Store)"],
    highlights: [
      "Fast native Flutter PDF viewer with clean Material 3 light & dark themes",
      "Built-in document scanner & multi-tool PDF utilities",
      "100% on-device privacy with zero ads or telemetry",
      "Currently in active development — Play Store launch coming soon",
    ],
    tags: ["Flutter", "Android", "Dart", "Document Scanner", "PDF Tools"],
    webUrl: "https://smiley.xweet.in",
  },
  {
    id: "indivio",
    name: "Indivio",
    category: "android",
    categoryLabel: "HYPERLOCAL FOOD DELIVERY APP",
    domain: "indivio.xweet.in",
    iconPath: "/apps/indivio.png",
    tagline: "Hyperlocal food delivery app for Tier-2 & Tier-3 Bharat — Android coming soon.",
    description:
      "A hyperlocal food delivery platform under Xweet, built for hometowns with 0% menu markup, fair restaurant terms, and live GPS rider tracking.",
    status: "Coming Soon",
    platforms: ["Web (indivio.xweet.in)", "Android (Coming Soon)"],
    highlights: [
      "0% menu price markup — authentic in-store restaurant pricing",
      "30-minute hyperlocal delivery with live WebSocket GPS tracking",
      "Built specifically for Tier-2 & Tier-3 towns left out by mega-apps",
      "Dedicated Android consumer, restaurant & rider apps launching soon",
    ],
    tags: ["Flutter", "Next.js", "WebSockets", "PostgreSQL", "Food Delivery"],
    webUrl: "https://indivio.xweet.in",
  },
];
