import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Sparkles,
  Crop,
  Layers,
  HardDrive,
  Eye,
  CheckCircle2,
  Sliders,
  Cloud,
  Zap,
  Lock,
  ArrowRight,
  ArrowLeft,
  Mail,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Xweet Wallpapers — Curated 4K & AMOLED Wallpapers for Android",
  description:
    "Curated minimal, floral, dark abstract, and AMOLED wallpapers for Android. Features 4K desktop framing, one-tap direct lockscreen setter, smart edge caching, and zero ads.",
  openGraph: {
    title: "Xweet Wallpapers — Pure Visual Craft for Android",
    description:
      "Handcrafted 4K and AMOLED wallpapers with custom framing, one-tap direct setter, and zero ads.",
    url: "https://xweet.in/wallpapers",
    siteName: "Xweet",
    images: [{ url: "/wallpapers/icon.png", width: 512, height: 512, alt: "Xweet Wallpapers App Icon" }],
  },
};

const FEATURE_CARDS = [
  {
    num: "01",
    icon: Crop,
    title: "4K Desktop Framing Tool",
    tagline: "Custom Lockscreen Compositions",
    description:
      "For wallpapers with companion 4K desktop masters, frame your screen with mathematical precision. Pinch-to-zoom, pan without black voids, consult the 16:9 minimap overview, and preview the live lockscreen clock before applying.",
    highlights: [
      "Mathematical boundaries (zero black void leaks)",
      "Panoramic 16:9 overview minimap strip",
      "Interactive lockscreen clock preview toggle",
      "Sub-pixel Retina bitmap export rendering",
    ],
  },
  {
    num: "02",
    icon: Smartphone,
    title: "One-Tap Direct Setter",
    tagline: "Native Android WallpaperManager",
    description:
      "Apply artwork in a single touch. Direct integration with Android's system wallpaper manager lets you target Home Screen, Lock Screen, or Both screens simultaneously with instant tactile feedback.",
    highlights: [
      "Native WallpaperManager.FLAG_LOCK & FLAG_SYSTEM",
      "Home, Lock, or Both screens selection sheet",
      "Celebratory success feedback dialog",
      "Zero wallpaper compression or degradation",
    ],
  },
  {
    num: "03",
    icon: HardDrive,
    title: "Smart Edge Caching",
    tagline: "Cloudflare R2 + 60-Day Retention",
    description:
      "Never re-download the same wallpaper twice. Images are streamed from Cloudflare R2 edge locations and securely cached on device storage for instant offline browsing and minimal mobile data usage.",
    highlights: [
      "60-day persistent on-disk image retention",
      "ETag/Last-Modified HTTP validation",
      "One-tap 'Clear Wallpaper Cache' in Settings",
      "100% on-device local storage",
    ],
  },
  {
    num: "04",
    icon: Sliders,
    title: "Dynamic Catalog Taxonomy",
    tagline: "Live Firestore Category Extraction",
    description:
      "Browse hand-curated collections with live item counts. The intelligent catalog dynamically scans the live database, grouping drops into Flowers, Dark Abstract, AMOLED, Minimal, Nature, Lockscreen, and Anime.",
    highlights: [
      "Real-time item count badges on each filter pill",
      "Auto-scrolling tactile chip selector",
      "Pull-to-refresh variety shuffle",
      "All NEW wallpaper drops strictly on top",
    ],
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Tactile Editorial Aesthetic",
    tagline: "Xweet Design System & Haptics",
    description:
      "Designed with an artisanal light-mode palette inspired by vintage cartography and modern brutalism. High-contrast Carbon typography, Paper backgrounds, Signal Lime accents, and customizable haptic touch pulses.",
    highlights: [
      "Lightweight Outfit typography by Google Fonts",
      "9:19.5 smartphone aspect ratio cards",
      "Dominant color placeholders for zero visual pop-in",
      "Persisted haptic feedback toggle",
    ],
  },
  {
    num: "06",
    icon: ShieldCheck,
    title: "Sovereign Privacy",
    tagline: "Zero Accounts. Zero Tracking. Zero Ads.",
    description:
      "Your wallpaper choice is private. The app has no registration, no user profiles, no ad networks, no telemetry beacons, and zero cross-app trackers. It is completely free and ad-free.",
    highlights: [
      "No login, account, or email required",
      "Zero advertising SDKs or banner popups",
      "No location tracking or contacts access",
      "100% compliant with Google Play Data Safety",
    ],
  },
];

const CURATED_COLLECTIONS = [
  {
    name: "Flowers",
    count: "12 Wallpapers",
    description: "Sculptural daisies, calla lilies, cherry blossoms, and delicate botanical studies.",
    tag: "BOTANICAL",
    bg: "bg-[#F3EFE0]",
  },
  {
    name: "Dark Abstract",
    count: "10 Wallpapers",
    description: "Midnight amber curves, dark navy dunes, and textured cinematic backdrops.",
    tag: "CINEMATIC",
    bg: "bg-[#EAE8DE]",
  },
  {
    name: "AMOLED Mobile",
    count: "8 Wallpapers",
    description: "Deep true-black backdrops crafted to maximize contrast and battery conservation on OLED displays.",
    tag: "TRUE BLACK",
    bg: "bg-[#E6E8D6]",
  },
  {
    name: "Minimal Geometry",
    count: "7 Wallpapers",
    description: "Warm neutrals, cool minimal forms, and calm uncluttered negative space.",
    tag: "CALM",
    bg: "bg-[#EAE3DE]",
  },
  {
    name: "Nature & Vertical",
    count: "6 Wallpapers",
    description: "Sunlit mountain passes, alpine horizons, and atmospheric landscape vistas.",
    tag: "LANDSCAPES",
    bg: "bg-[#DFE7DB]",
  },
  {
    name: "Lockscreen Edition",
    count: "6 Wallpapers",
    description: "Specially framed vertical art tailored for Android lockscreen clock ergonomics.",
    tag: "9:16 RETINA",
    bg: "bg-[#E8E2EE]",
  },
];

export default function WallpapersLandingPage() {
  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation Bar */}
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-12 sm:space-y-20">
        {/* ========================================================================= */}
        {/* BREADCRUMB & METADATA TELEMETRY STRIP */}
        {/* ========================================================================= */}
        <section className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-terrain/20 text-xs font-mono text-terrain">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-terrain hover:text-carbon transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Studio Home</span>
            </Link>
            <span className="text-terrain/40">•</span>
            <Link
              href="/apps"
              className="hover:text-carbon transition-colors"
            >
              Apps Catalog
            </Link>
            <span className="text-terrain/40">•</span>
            <span className="text-carbon font-medium uppercase tracking-wider">
              Xweet Wallpapers
            </span>
            <span className="text-terrain/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline bg-black/5 px-2 py-0.5 rounded border border-terrain/20 text-[11px]">
              DOC-ID: XW-APP-2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span className="text-carbon font-semibold text-[11px] uppercase tracking-wider">
              v1.0.0 Live on Google Play
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HERO SECTION WITH AUTHENTIC APP LOGO & GOOGLE PLAY INSTALL */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Branding, Title, Pitch & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category / Platform Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-carbon text-paper">
              <Sparkles className="w-3.5 h-3.5 text-signal-lime" />
              <span>CURATED VISUAL ARCHIVE • ANDROID</span>
            </div>

            {/* Brand Logo & Wordmark Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border border-carbon shadow-sm shrink-0 bg-white p-2">
                <Image
                  src="/wallpapers/app-icon.png"
                  alt="Xweet Wallpapers App Icon"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-space font-black tracking-tight text-carbon">
                    XWEET
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-signal-lime border border-carbon text-carbon font-mono text-[10px] font-extrabold tracking-wider">
                    WALLPAPERS
                  </span>
                </div>
                <p className="text-xs font-mono text-terrain mt-0.5">
                  Package: in.xweet.wallpapers • v1.0.0
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-space font-medium text-carbon tracking-tight leading-[1.08]">
              Curated Wallpapers. Artisanal Framing. Zero Bloat.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-carbon/85 font-light leading-relaxed max-w-2xl">
              Elevate your Android lockscreen with handcrafted minimal, floral, dark abstract, and AMOLED wallpapers. Features an interactive 4K desktop framing tool, one-tap direct setter, smart edge caching, and zero ads.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Google Play Store Direct Install Button */}
              <a
                href="https://play.google.com/store/apps/details?id=in.xweet.wallpapers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-carbon hover:bg-black text-paper transition-all border border-carbon shadow-md group cursor-pointer hover:scale-102 active:scale-98"
              >
                {/* Official Google Play Multi-Color Vector Icon */}
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M48.7 13.9C39.6 23.6 34.3 38.3 34.3 56.5v399c0 18.2 5.3 32.9 14.4 42.6l2.4 2.4 227-227v-5.4L51.1 11.5l-2.4 2.4z"
                  />
                  <path
                    fill="#00E676"
                    d="m356.5 334.8-78.4-78.4v-5.4l78.4-78.4 2.7 1.5 92.9 52.8c26.5 15.1 26.5 39.8 0 54.9l-92.9 52.8-2.7 1.7z"
                  />
                  <path
                    fill="#FFD600"
                    d="m278.1 251 78.4 78.4-270.1 153.5c-14.6 8.2-27.5 7.2-35.3-1.1l227-227V251z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m278.1 256.4-227-227C58.9 21.1 71.8 22.1 86.4 30.4l270.1 153.5-78.4 78.4v-5.9z"
                  />
                </svg>
                <div className="text-left font-mono">
                  <span className="block text-[10px] uppercase tracking-wider text-terrain/90 leading-none">
                    GET IT ON
                  </span>
                  <span className="block text-base font-bold text-paper font-sans leading-tight">
                    Google Play
                  </span>
                </div>
              </a>

              {/* Privacy Policy Link */}
              <Link
                href="/wallpapers/privacy"
                className="px-5 py-4 rounded-2xl bg-white/70 hover:bg-white text-carbon font-mono text-xs font-semibold transition-all border border-terrain/35 inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:border-carbon"
              >
                <ShieldCheck className="w-4 h-4 text-signal-lime" />
                <span>Privacy Policy</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-terrain pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-signal-lime" />
                <span>100% Free &amp; Ad-Free</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-signal-lime" />
                <span>Zero Accounts Required</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-signal-lime" />
                <span>Android 8.0+ Ready</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative border border-carbon rounded-3xl p-6 sm:p-8 bg-white/80 backdrop-blur-xs shadow-md space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-terrain/20 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-signal-lime" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-carbon">
                    Xweet Wallpapers UI
                  </span>
                </div>
                <span className="text-[11px] font-mono text-terrain">63+ CURATED DROPS</span>
              </div>

              {/* Mock Mobile Viewport Preview */}
              <div className="relative aspect-[9/16] max-h-[380px] mx-auto rounded-2xl overflow-hidden border border-terrain/30 shadow-inner bg-carbon/5 flex flex-col justify-between p-4">
                {/* Wallpaper Artwork Background */}
                <Image
                  src="https://cdn.xweet.in/wallpapers/midnight-amber.webp"
                  alt="Midnight Amber Wallpaper Preview"
                  fill
                  className="object-cover -z-10"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Simulated Lockscreen Clock Overlay */}
                <div className="text-center pt-6 space-y-1">
                  <div className="text-xs font-mono text-white/90 drop-shadow-sm">
                    Tuesday, November 24
                  </div>
                  <div className="text-4xl font-space font-medium text-white tracking-tight drop-shadow-md">
                    00:08
                  </div>
                </div>

                {/* Bottom App Overlay Controls */}
                <div className="p-3 rounded-xl bg-carbon/80 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="font-semibold truncate">Midnight Amber</span>
                    <span className="text-signal-lime font-bold">4K UHD</span>
                  </div>
                  <div className="w-full py-1.5 rounded-lg bg-signal-lime text-carbon text-center font-mono text-[10px] font-extrabold uppercase tracking-wider">
                    ✓ Applied to Both Screens
                  </div>
                </div>
              </div>

              {/* Telemetry Micro Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-paper border border-terrain/20">
                  <span className="text-terrain block text-[9px] uppercase">Engine</span>
                  <span className="font-semibold text-carbon">Native WallpaperManager</span>
                </div>
                <div className="p-2.5 rounded-xl bg-paper border border-terrain/20">
                  <span className="text-terrain block text-[9px] uppercase">Edge CDN</span>
                  <span className="font-semibold text-carbon">Cloudflare R2 (Global)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6 KEY FEATURES GRID */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-terrain/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain block">
                CORE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-space font-medium text-carbon tracking-tight mt-1">
                Engineered for Visual Excellence.
              </h2>
            </div>
            <p className="text-xs font-mono text-terrain max-w-xs">
              Every interaction is tuned for high craft, low battery overhead, and uncompromising privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((card) => {
              const IconComp = card.icon;
              return (
                <article
                  key={card.num}
                  className="p-6 sm:p-8 rounded-3xl bg-white/60 border border-terrain/30 hover:border-carbon transition-all shadow-xs space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-signal-lime/25 border border-signal-lime/60 flex items-center justify-center text-carbon">
                        <IconComp className="w-5 h-5 text-carbon" />
                      </div>
                      <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                        {card.num}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-terrain block">
                        {card.tagline}
                      </span>
                      <h3 className="text-xl font-space font-medium text-carbon tracking-tight mt-0.5">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-1.5 pt-3 border-t border-terrain/15 text-xs font-mono text-carbon/90">
                    {card.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0 mt-1.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CURATED COLLECTIONS OVERVIEW */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-terrain/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain block">
                CURATED ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-4xl font-space font-medium text-carbon tracking-tight mt-1">
                Artisanal Themes &amp; Categories.
              </h2>
            </div>
            <span className="text-xs font-mono text-carbon font-semibold bg-signal-lime/30 border border-signal-lime px-3 py-1 rounded-full shrink-0">
              63+ Wallpapers Live
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURATED_COLLECTIONS.map((col) => (
              <div
                key={col.name}
                className={`p-6 rounded-3xl border border-terrain/25 ${col.bg} space-y-3 shadow-2xs hover:shadow-xs transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-black/5 border border-terrain/20 text-[10px] font-mono font-bold tracking-wider text-carbon">
                    {col.tag}
                  </span>
                  <span className="text-xs font-mono font-semibold text-carbon">
                    {col.count}
                  </span>
                </div>

                <h3 className="text-lg font-space font-medium text-carbon">
                  {col.name}
                </h3>

                <p className="text-xs text-carbon/80 font-light leading-relaxed">
                  {col.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECHNICAL ARCHITECTURE & SPECIFICATIONS */}
        {/* ========================================================================= */}
        <section className="border border-carbon rounded-3xl p-6 sm:p-10 bg-white/70 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain block">
                APPLICATION TELEMETRY
              </span>
              <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon tracking-tight mt-0.5">
                Technical Specifications
              </h2>
            </div>
            <span className="text-xs font-mono text-carbon bg-paper border border-terrain/30 px-3 py-1 rounded-full">
              Production Release · v1.0.0
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">Target OS</span>
              <span className="font-semibold text-carbon block">Android 8.0+</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">Framework</span>
              <span className="font-semibold text-carbon block">Flutter 3.x</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">Database</span>
              <span className="font-semibold text-carbon block">Cloud Firestore</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">CDN Edge</span>
              <span className="font-semibold text-carbon block">Cloudflare R2</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">Package</span>
              <span className="font-semibold text-carbon truncate block">in.xweet.wallpapers</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-terrain/25 space-y-1">
              <span className="text-[10px] text-terrain uppercase block">License</span>
              <span className="font-semibold text-carbon block">Free &amp; Ad-Free</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM DOWNLOAD BANNER */}
        {/* ========================================================================= */}
        <section className="border border-terrain/35 rounded-3xl p-8 sm:p-14 bg-white/70 backdrop-blur-xs shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-white border border-carbon flex items-center justify-center mx-auto shadow-sm p-2">
            <Image
              src="/wallpapers/app-icon.png"
              alt="Xweet Wallpapers App Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-space font-medium text-carbon tracking-tight">
              Frame your screen today.
            </h2>
            <p className="text-xs sm:text-sm text-terrain font-light leading-relaxed">
              Download Xweet Wallpapers directly from the Google Play Store. Zero ads, zero accounts, and 100% on-device sovereignty.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=in.xweet.wallpapers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-7 py-4 rounded-2xl bg-carbon hover:bg-black text-paper transition-all border border-carbon shadow-md group cursor-pointer hover:scale-102 active:scale-98"
            >
              {/* Official Google Play Multi-Color Vector Icon */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M48.7 13.9C39.6 23.6 34.3 38.3 34.3 56.5v399c0 18.2 5.3 32.9 14.4 42.6l2.4 2.4 227-227v-5.4L51.1 11.5l-2.4 2.4z"
                />
                <path
                  fill="#00E676"
                  d="m356.5 334.8-78.4-78.4v-5.4l78.4-78.4 2.7 1.5 92.9 52.8c26.5 15.1 26.5 39.8 0 54.9l-92.9 52.8-2.7 1.7z"
                />
                <path
                  fill="#FFD600"
                  d="m278.1 251 78.4 78.4-270.1 153.5c-14.6 8.2-27.5 7.2-35.3-1.1l227-227V251z"
                />
                <path
                  fill="#FF3D00"
                  d="m278.1 256.4-227-227C58.9 21.1 71.8 22.1 86.4 30.4l270.1 153.5-78.4 78.4v-5.9z"
                />
              </svg>
              <div className="text-left font-mono">
                <span className="block text-[10px] uppercase tracking-wider text-terrain/90 leading-none">
                  GET IT ON
                </span>
                <span className="block text-base font-bold text-paper font-sans leading-tight">
                  Google Play
                </span>
              </div>
            </a>

            <Link
              href="/wallpapers/privacy"
              className="px-6 py-4 rounded-2xl bg-paper hover:bg-white text-carbon font-mono text-xs font-semibold transition-all border border-terrain/30 inline-flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-signal-lime" />
              <span>Read Privacy Policy</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
