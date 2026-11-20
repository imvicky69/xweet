"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  Compass,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Monitor,
  Download,
  Image as ImageIcon,
  Search,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Layers,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

type CategoryFilter = "all" | "utilities" | "mobile" | "wallpapers" | "games";

export default function AppsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const APPS = [
    {
      id: "wallpaper",
      category: "wallpapers",
      categoryLabel: "VISUAL ARCHIVE · 4K / 5K ULTRA-HD",
      title: "Xweet Wallpapers",
      domain: "wallpaper.xweet.in",
      tagline: "Curated 4K & 5K wallpapers for smartphone screens & desktop workstations.",
      description:
        "A hand-curated archive of minimalist, tactile, brutalist, and architectural wallpapers. Rendered in high-fidelity 4K, 5K, and deep OLED black tones. Completely free, direct downloads, and zero watermark clutter.",
      badge: "Featured Visuals · Free",
      icon: ImageIcon,
      platforms: ["Phone (9:16)", "Desktop (16:9)", "Ultrawide (21:9)"],
      highlights: [
        "Curated minimal geometry & tactile photography",
        "OLED true-black variants for battery conservation",
        "Direct one-click high-res downloads with zero compression",
        "Optimized for iPhone, Android, MacBook & PC displays",
      ],
      metrics: "4K / 5K Ultra-HD • Zero Watermarks • Daily / Weekly Additions",
      tags: ["Wallpapers", "Curated Design", "4K UHD", "OLED Black", "Desktop & Mobile"],
      primaryCta: "Browse Wallpapers ↗",
      primaryUrl: "https://wallpaper.xweet.in",
      isFeatured: true,
    },
    {
      id: "infyn",
      category: "utilities",
      categoryLabel: "SOVEREIGN IN-BROWSER UTILITY SUITE · WASM",
      title: "Infyn DL & Utilities",
      domain: "infyn.software",
      tagline: "100% private in-browser downloader, background remover & file utility suite.",
      description:
        "An independent suite of browser-native utilities built for uncompromised privacy. Uses client-side WebAssembly to execute AI background removal, batch image compression, media conversion, and AES-GCM file encryption. Files never touch a cloud server.",
      badge: "Sovereign Web · Wasm",
      icon: Download,
      platforms: ["Web (Desktop & Mobile)", "Progressive Web App"],
      highlights: [
        "Fast media downloader & converter utilities",
        "On-device AI background removal with zero cloud latency",
        "Batch WebP / PNG / JPG lossless compression",
        "Client-side AES-GCM file encryption & decryption",
      ],
      metrics: "100% Client-Side • Zero Cloud Uploads • Sub-Second Latency",
      tags: ["Next.js", "WebAssembly", "Media Downloader", "Web Crypto", "Privacy"],
      primaryCta: "Launch Infyn Suite ↗",
      primaryUrl: "https://infyn.software",
      isFeatured: false,
    },
    {
      id: "smiley-pdf",
      category: "mobile",
      categoryLabel: "ANDROID MOBILE APPLICATION · FLUTTER",
      title: "Smiley PDF",
      domain: "smiley.xweet.in",
      tagline: "120 FPS hardware-accelerated Android document reader with biometric lock.",
      description:
        "Engineered from scratch in Flutter for instant response and confidentiality. Includes a biometric Private Vault (fingerprint & PIN lock) to protect confidential documents, zero battery consumption on standby, and 100% air-gapped on-device file privacy.",
      badge: "Mobile App · Android",
      icon: FileText,
      platforms: ["Android APK", "Google Play"],
      highlights: [
        "120 FPS high-framerate hardware accelerated PDF engine",
        "Biometric Private Vault with fingerprint & hardware PIN lock",
        "Zero tracking analytics, zero telemetry, and zero ads",
        "Instant document search & bookmarking",
      ],
      metrics: "120 FPS Engine • Biometric Security • Air-Gapped",
      tags: ["Flutter", "Android", "Dart", "Biometrics", "Native Rendering"],
      primaryCta: "Get Smiley PDF ↗",
      primaryUrl: "https://smiley.xweet.in",
      isFeatured: false,
    },
    {
      id: "unkn",
      category: "games",
      categoryLabel: "INTERACTIVE CARTOGRAPHY GAME · STREET VIEW",
      title: "unkn",
      domain: "xweet.in/unkn",
      tagline: "Artisanal, minimalist geography deduction game with real Google 360° panoramas.",
      description:
        "A full-stack geography deduction game. Drop into unknown global coordinates across 10 tactical rounds, analyze architectural clues, solar orientation, and road markings, and guess the country using a keyboard-driven search interface.",
      badge: "Flagship Game · Live",
      icon: Compass,
      platforms: ["Web Browser (Desktop & Mobile)"],
      highlights: [
        "Authentic Google Street View 360° panoramic navigation",
        "Server-side answer validation with cryptographic secrecy",
        "Keyboard-driven searchable dropdown country selector",
        "Comprehensive 10-round expedition audit & accuracy debrief",
      ],
      metrics: "10-Round Expedition • Server-Side Secrecy • Strict Light Mode",
      tags: ["Next.js", "Google Maps JS API", "Firebase", "TypeScript", "Tailwind CSS"],
      primaryCta: "Play Expedition (10 Rounds) →",
      primaryUrl: "/unkn",
      secondaryUrl: "/games",
      isFeatured: true,
    },
    {
      id: "wordle",
      category: "games",
      categoryLabel: "VOCABULARY DEDUCTION GAME · DAILY PUZZLE",
      title: "Wordle",
      domain: "xweet.in/wordle",
      tagline: "Minimalist, tactile daily 5-letter vocabulary deduction puzzle.",
      description:
        "A clean, distraction-free Wordle alternative engineered in strict light mode. 6 attempts to deduce the secret word, accompanied by responsive physical & touch keyboard input, shareable emoji results, and persistent win streaks.",
      badge: "New Game · Free",
      icon: Sparkles,
      platforms: ["Web Browser (Desktop & Mobile)", "PWA Compatible"],
      highlights: [
        "Tactile tile color feedback (Signal Lime, Mist, Terrain)",
        "Responsive on-screen keyboard + physical desktop keyboard listener",
        "Win streak & accuracy metrics saved locally on-device",
        "One-click clipboard score sharing with emoji grid",
      ],
      metrics: "6 Attempts • 5-Letter Deduction • Zero Distraction",
      tags: ["Word Puzzle", "Next.js", "Vocabulary", "Touch-Friendly", "Tailwind CSS"],
      primaryCta: "Play Wordle Now →",
      primaryUrl: "/wordle",
      isFeatured: false,
    },
    {
      id: "indivio",
      category: "utilities",
      categoryLabel: "HYPERLOCAL LOGISTICS PLATFORM · WEBSOCKETS",
      title: "Indivio Logistics",
      domain: "indivio.xweet.in",
      tagline: "Low-latency food delivery and courier dispatch engine with real-time GPS tracking.",
      description:
        "A complete ordering and dispatch platform connecting regional merchants with customers. Features live courier GPS telematics streaming over low-latency WebSockets, automated dispatch routing, and PostgreSQL transactional data integrity.",
      badge: "Platform Engine · Live",
      icon: Layers,
      platforms: ["Web Client", "Merchant Console", "Driver PWA"],
      highlights: [
        "Sub-50ms WebSocket real-time courier telemetry",
        "30-minute hyperlocal delivery dispatch pipeline",
        "Live interactive route maps & ETA computation",
        "PostgreSQL transactional schemas & caching",
      ],
      metrics: "Sub-50ms Latency • Real-Time WebSockets • PostgreSQL Sync",
      tags: ["Next.js", "Node.js", "WebSockets", "PostgreSQL", "Geospatial"],
      primaryCta: "View Platform ↗",
      primaryUrl: "https://indivio.xweet.in",
      isFeatured: false,
    },
  ];

  const filteredApps = useMemo(() => {
    return APPS.filter((app) => {
      const matchesCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        app.title.toLowerCase().includes(query) ||
        app.tagline.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation */}
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-terrain">
            <Link href="/" className="hover:text-carbon transition-colors">
              Xweet Studio
            </Link>
            <span>/</span>
            <span className="text-carbon font-semibold uppercase tracking-wider">
              Apps &amp; Software Catalog
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-thin tracking-tight leading-[1.02] text-carbon">
            Sovereign Apps &amp; Digital Archives. <br />
            <span className="font-space font-light text-terrain text-3xl sm:text-5xl lg:text-6xl block mt-2 tracking-tight">
              crafted for utility, speed &amp; aesthetics.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-carbon/75 font-light leading-relaxed max-w-2xl">
            A curated collection of independent software, private utilities, wallpaper archives, and web games.
          </p>

          {/* Quick Stats Strip */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-terrain border-t border-terrain/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-signal-lime" />
              <span className="text-carbon font-semibold">{APPS.length} Independent Releases</span>
            </div>
            <span>•</span>
            <span>Zero Tracking Telemetry</span>
            <span>•</span>
            <span>Free Public Access</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FILTER BAR & SEARCH */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-terrain/25 pb-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === "all"
                    ? "bg-carbon text-paper font-semibold shadow-xs"
                    : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/40"
                }`}
              >
                All Releases ({APPS.length})
              </button>
              <button
                onClick={() => setSelectedCategory("wallpapers")}
                className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedCategory === "wallpapers"
                    ? "bg-carbon text-paper font-semibold shadow-xs"
                    : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/40"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Wallpapers (4K/5K)</span>
              </button>
              <button
                onClick={() => setSelectedCategory("utilities")}
                className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedCategory === "utilities"
                    ? "bg-carbon text-paper font-semibold shadow-xs"
                    : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/40"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Utilities &amp; Tools</span>
              </button>
              <button
                onClick={() => setSelectedCategory("mobile")}
                className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedCategory === "mobile"
                    ? "bg-carbon text-paper font-semibold shadow-xs"
                    : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/40"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Apps</span>
              </button>
              <button
                onClick={() => setSelectedCategory("games")}
                className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedCategory === "games"
                    ? "bg-carbon text-paper font-semibold shadow-xs"
                    : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/40"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive Games</span>
              </button>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-terrain absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search apps by name or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-terrain/30 bg-white/60 text-xs font-mono text-carbon placeholder:text-terrain/60 focus:outline-none focus:border-carbon transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED WALLPAPER CALLOUT BANNER (wallpaper.xweet.in) */}
        {/* ========================================================================= */}
        {(selectedCategory === "all" || selectedCategory === "wallpapers") && !searchQuery && (
          <section className="relative overflow-hidden rounded-3xl border border-carbon bg-carbon text-paper p-8 sm:p-12 shadow-sm">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-signal-lime uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-signal-lime" />
                  <span>Visual Archive · wallpaper.xweet.in</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-paper">
                  Ultra-HD Wallpapers for Mobile &amp; Desktop.
                </h2>

                <p className="text-sm sm:text-base text-terrain font-light leading-relaxed max-w-xl">
                  Hand-curated wallpapers in true 4K &amp; 5K resolution. Featuring architectural forms, high-altitude cartography, brutalist typography, and OLED pitch-black tones engineered for modern high-DPI displays.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://wallpaper.xweet.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm hover:scale-102 active:scale-98 border border-signal-lime"
                  >
                    <span>Explore Wallpaper Archive ↗</span>
                    <ArrowUpRight className="w-4 h-4 text-carbon" />
                  </a>

                  <span className="text-xs font-mono text-terrain">
                    Free Direct Download • Zero Watermarks
                  </span>
                </div>
              </div>

              {/* Visual Display Mockup Pill */}
              <div className="lg:col-span-5 flex items-center justify-center gap-4 font-mono text-xs">
                {/* Phone Card Mockup */}
                <div className="w-36 h-56 rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-3 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between text-[10px] text-terrain">
                    <span>9:16</span>
                    <Smartphone className="w-3 h-3 text-signal-lime" />
                  </div>
                  <div className="text-center space-y-1 my-auto">
                    <span className="text-[11px] font-space text-paper block">Mobile OLED</span>
                    <span className="text-[9px] text-terrain">Ultra-HD Portrait</span>
                  </div>
                  <div className="w-8 h-1 bg-white/30 rounded-full mx-auto" />
                </div>

                {/* Desktop Card Mockup */}
                <div className="w-56 h-36 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-3 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between text-[10px] text-terrain">
                    <span>16:9 / 21:9</span>
                    <Monitor className="w-3 h-3 text-signal-lime" />
                  </div>
                  <div className="text-center space-y-1 my-auto">
                    <span className="text-[11px] font-space text-paper block">Desktop &amp; Ultrawide</span>
                    <span className="text-[9px] text-terrain">4K &amp; 5K Resolution</span>
                  </div>
                  <span className="text-[9px] text-signal-lime text-center block">wallpaper.xweet.in</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* APP LISTING GRID */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          {filteredApps.length === 0 ? (
            <div className="py-20 text-center space-y-3 border border-dashed border-terrain/30 rounded-3xl">
              <span className="text-sm font-mono text-terrain block">
                No applications matching &quot;{searchQuery}&quot; in this category.
              </span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="cursor-pointer text-xs font-mono text-carbon underline hover:text-black"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredApps.map((app, idx) => {
              const Icon = app.icon;
              return (
                <article
                  key={app.id}
                  className={`border rounded-3xl p-6 sm:p-10 transition-all ${
                    app.isFeatured
                      ? "border-carbon bg-white/70 shadow-sm ring-1 ring-carbon/10"
                      : "border-terrain/35 bg-white/40 hover:bg-white/60 hover:border-carbon/60 shadow-2xs"
                  }`}
                >
                  {/* Top metadata strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/20 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-signal-lime/20 border border-signal-lime/50 flex items-center justify-center text-carbon">
                        <Icon className="w-4 h-4 text-carbon" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-terrain">
                        {app.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-terrain bg-black/5 px-2.5 py-0.5 rounded-full border border-terrain/20">
                        {app.domain}
                      </span>
                      <span className="text-xs font-mono text-carbon font-semibold bg-signal-lime/30 border border-signal-lime px-2.5 py-0.5 rounded-full">
                        {app.badge}
                      </span>
                    </div>
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Titles & Direct Actions */}
                    <div className="lg:col-span-5 space-y-4">
                      <h3 className="text-2xl sm:text-4xl font-space font-medium text-carbon tracking-tight">
                        {app.title}
                      </h3>

                      <p className="text-sm sm:text-base font-medium text-carbon/90 leading-snug">
                        {app.tagline}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {app.primaryUrl.startsWith("/") ? (
                          <Link
                            href={app.primaryUrl}
                            className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98 border border-signal-lime/80"
                          >
                            <Compass className="w-4 h-4 text-carbon" />
                            <span>{app.primaryCta}</span>
                          </Link>
                        ) : (
                          <a
                            href={app.primaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-carbon hover:bg-carbon/90 text-paper font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
                          >
                            <span>{app.primaryCta}</span>
                            <ArrowUpRight className="w-4 h-4 text-signal-lime" />
                          </a>
                        )}

                        {app.secondaryUrl && (
                          <Link
                            href={app.secondaryUrl}
                            className="text-xs font-mono text-terrain hover:text-carbon px-4 py-3 rounded-2xl border border-terrain/30 hover:border-carbon transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>Game Rules</span>
                          </Link>
                        )}
                      </div>

                      {/* Supported Platforms */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block mb-1">
                          Platforms:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {app.platforms.map((p) => (
                            <span
                              key={p}
                              className="text-[10px] font-mono text-carbon/80 bg-paper px-2 py-0.5 rounded border border-terrain/25"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Technical Highlights & Specs */}
                    <div className="lg:col-span-7 space-y-4 bg-paper/60 p-6 sm:p-7 rounded-2xl border border-terrain/20 text-sm">
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-terrain mb-1.5">
                          Architecture &amp; Features
                        </h4>
                        <p className="text-carbon/90 font-light leading-relaxed text-xs sm:text-sm mb-3">
                          {app.description}
                        </p>

                        <ul className="space-y-1.5 pt-1">
                          {app.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs font-mono text-carbon/90"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-signal-lime mt-1 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-terrain/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {app.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-lg bg-white/80 border border-terrain/30 font-mono text-[10px] text-terrain"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="text-[10px] font-mono text-terrain font-medium">
                          {app.metrics.split("•")[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* ========================================================================= */}
        {/* COLLABORATION & INQUIRY FOOTER CALLOUT */}
        {/* ========================================================================= */}
        <section className="border border-terrain/35 rounded-3xl p-8 sm:p-12 bg-white/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              Bespoke Engineering
            </span>
            <h3 className="text-xl sm:text-2xl font-space font-medium text-carbon">
              Need a custom application or high-performance tool built?
            </h3>
            <p className="text-xs font-mono text-terrain max-w-xl">
              We take on a small number of select commissions each year for web platforms, mobile apps, and real-time systems.
            </p>
          </div>
          <Link
            href="/contact"
            className="cursor-pointer bg-carbon hover:bg-carbon/85 text-paper font-mono text-xs px-6 py-3.5 rounded-full transition-all shadow-sm shrink-0 flex items-center gap-2 hover:scale-102 active:scale-98"
          >
            <span>Inquire About a Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-signal-lime" />
          </Link>
        </section>
      </main>

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
