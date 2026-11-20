"use client";

import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import HeroCartographyGlobe from "@/components/HeroCartographyGlobe";
import {
  ArrowRight,
  Compass,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  EyeOff,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function StudioHomePage() {
    const RELEASES = [
      {
        id: "unkn",
        category: "INTERACTIVE CARTOGRAPHY GAME",
        title: "unkn",
        tagline: "Minimalist, artisanal geography deduction game with real Google 360° Street View.",
        description:
        "A full-stack interactive geography guessing game engineered for pure cartographic instinct. Survey real Google Street View panoramas, analyze sun angles and road markings, and guess the country with a searchable keyboard-driven interface.",
        badge: "Flagship Release · Live",
        metrics: "10-Round Session • Server-Side Secrecy • Strict Light Mode",
        tags: ["Next.js", "Google Maps JS API", "Tailwind CSS v4", "Firebase", "TypeScript"],
        isFlagship: true,
        playHref: "/play",
        detailsHref: "/games",
        primaryCta: "Play Expedition (10 Rounds) →",
      },
      {
        id: "xwordle",
        category: "VOCABULARY DEDUCTION GAME",
        title: "xwordle",
        tagline: "Minimalist, tactile daily 5-letter vocabulary deduction puzzle.",
        description:
        "A clean, distraction-free Wordle alternative engineered in strict light mode. 6 attempts to deduce the secret word, accompanied by responsive physical & touch keyboard input, shareable emoji results, and persistent win streaks.",
        badge: "New Game · Free",
        metrics: "6 Attempts • 5-Letter Deduction • Strict Light Mode",
        tags: ["Word Puzzle", "Next.js", "Tactile UI", "Tailwind CSS"],
        isFlagship: false,
        playHref: "/games/xwordle",
        primaryCta: "Play xwordle Now →",
      },
      {
        id: "wallpaper",
        category: "CURATED VISUAL ARCHIVE · 4K / 5K ULTRA-HD",
        title: "Xweet Wallpapers",
        tagline: "Curated 4K & 5K wallpapers for smartphone screens & desktop workstations.",
        description:
        "A hand-curated archive of minimalist, tactile, architectural, and dark OLED wallpapers. Rendered in high-fidelity 4K, 5K, and OLED black tones for iPhone, Android, and widescreen displays. Completely free, direct downloads, zero watermark clutter.",
        badge: "Visual Archive · Free",
        metrics: "4K / 5K Ultra-HD • Zero Watermarks • OLED Black Tones",
        tags: ["Wallpapers", "4K UHD", "OLED Black", "Curated Design", "Mobile & Desktop"],
        isFlagship: false,
        externalHref: "https://wallpaper.xweet.in",
        primaryCta: "Explore Wallpapers ↗",
      },
      {
        id: "infyn",
        category: "SOVEREIGN IN-BROWSER UTILITY SUITE",
        title: "Infyn DL & Utilities",
        tagline: "100% private in-browser digital utilities running locally with zero cloud uploads.",
        description:
        "An independent software suite delivering fast media downloading, AI background removal, client-side batch image compression, and AES-GCM file encryption. All computations execute on-device with zero telemetry or data retention.",
        badge: "Sovereign Web · Wasm",
        metrics: "100% Client-Side • Zero Telemetry • Offline PWA Architecture",
        tags: ["Next.js", "TypeScript", "WebAssembly", "Media Downloader", "Web Crypto API"],
        isFlagship: false,
        externalHref: "https://infyn.software",
        primaryCta: "Launch Infyn (Web) ↗",
      },
      {
        id: "smiley-pdf",
        category: "ANDROID MOBILE APPLICATION",
        title: "Smiley PDF",
        tagline: "Fast, air-gapped Android document reader with 120 FPS hardware acceleration.",
        description:
        "Native Android document viewer engineered in Flutter. Features biometric Private Vault (fingerprint & PIN lock), zero battery drain, and 100% air-gapped on-device file privacy with no analytics or tracking scripts.",
        badge: "Mobile Release · Android",
        metrics: "120 FPS Native Engine • Biometric Vault • Zero Analytics",
        tags: ["Flutter", "Android", "Dart", "Biometrics", "Native Rendering"],
        isFlagship: false,
        externalHref: "https://smiley.xweet.in",
        primaryCta: "Explore Mobile App ↗",
      },
      {
        id: "indivio",
        category: "HYPERLOCAL LOGISTICS PLATFORM",
        title: "Indivio",
        tagline: "Low-latency food delivery and courier dispatch engine with live GPS tracking.",
        description:
        "Full-stack ordering and delivery ecosystem connecting regional merchants with consumers. Features real-time courier GPS tracking over WebSockets, low-latency dispatch routing, and PostgreSQL transactional sync.",
        badge: "Platform Engine · Live",
        metrics: "30-Min Delivery Pipeline • Real-Time WebSockets • PostgreSQL Sync",
        tags: ["Next.js", "React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL"],
        isFlagship: false,
        externalHref: "https://indivio.xweet.in",
        primaryCta: "View Platform ↗",
      },
    ];

  const ETHOS = [
      {
        title: "Sovereign Privacy & Local-First",
        icon: EyeOff,
        description:
          "Software should respect human autonomy. Where possible, our applications process data strictly on-device using WebAssembly and modern browser APIs. Zero telemetry, zero tracking cookies, and zero third-party surveillance scripts.",
      },
      {
        title: "Sub-100ms Tactile Speed",
        icon: Zap,
        description:
          "Digital tools should feel like responsive physical machinery. We target sub-second page loads, 120 FPS mobile interfaces, instant keyboard shortcuts, and lightweight asset bundles that respect battery life and network bandwidth.",
      },
      {
        title: "Restraint Over Feature Bloat",
        icon: Cpu,
        description:
          "We reject noisy software designed to extract attention. Every interface is intentional, every typography decision is deliberate, and every tool focuses on doing its primary job with quiet excellence before getting out of your way.",
      },
    ];

    const CAPABILITIES = [
      {
        title: "Web Platforms & Tools",
        desc: "Fast, responsive web applications engineered with Next.js, React, and TypeScript. Optimized for sub-second loads and keyboard ergonomics.",
      },
      {
        title: "Cross-Platform Mobile",
        desc: "Native iOS and Android applications built in Flutter. High-framerate rendering, biometric security, and offline-first data sync.",
      },
      {
        title: "Real-Time & Geospatial",
        desc: "Low-latency WebSocket architectures, interactive maps, and transactional backend APIs built with clean type safety.",
      },
    ];

    return (
      <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
        {/* Studio Navigation */}
        <StudioNavbar />

        <main className="flex-1 w-full">
        {/* ========================================================================= */}
        {/* HERO SECTION: Studio Manifesto & Immediate Focus */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 border-b border-terrain/25">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
              {/* Main Editorial Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-thin tracking-tight leading-[1.01] text-carbon">
                Independent software crafted with precision &amp; restraint. <br />
                <span className="font-space font-light text-terrain text-3xl sm:text-5xl lg:text-6xl block mt-2 sm:mt-3 tracking-tight">
                  sovereign tools, games &amp; web apps.
                </span>
              </h1>

              {/* Studio Purpose Statement */}
              <p className="text-base sm:text-lg lg:text-xl text-carbon/75 max-w-2xl font-light leading-relaxed pt-1">
                An independent studio building fast, private tools and tactile games — free of tracking, ads, and clutter.
              </p>

              {/* Direct Editorial Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/play"
                  className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-md flex items-center gap-3 hover:scale-105 active:scale-95 border border-signal-lime/90 group"
                >
                  <Compass className="w-4 h-4 text-carbon" />
                  <span>Play unkn Expedition</span>
                  <ArrowRight className="w-4 h-4 text-carbon group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/apps"
                  className="cursor-pointer border border-terrain/40 hover:border-carbon text-carbon font-mono text-xs sm:text-sm px-6 py-3.5 sm:py-4 rounded-full hover:bg-black/5 transition-all flex items-center gap-2"
                >
                  <span>Browse Dedicated Apps →</span>
                </Link>

                <a
                  href="#releases"
                  className="cursor-pointer text-xs font-mono text-terrain hover:text-carbon px-4 py-3.5 sm:py-4 transition-colors"
                >
                  <span>Releases Index ↓</span>
                </a>

                <Link
                  href="/contact"
                  className="cursor-pointer text-xs font-mono text-terrain hover:text-carbon px-4 py-3.5 sm:py-4 transition-colors"
                >
                  <span>Select Commissions →</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Interactive 3D Cartography Model (PC / Desktop View Only) */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-center xl:justify-end items-center">
              <HeroCartographyGlobe />
            </div>
          </div>

          {/* Streamlined Studio Principles Strip */}
          <div className="w-full pt-6 sm:pt-8 border-t border-terrain/20 mt-6 sm:mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-terrain">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                <span className="text-carbon/90 font-medium">Local-First &amp; Sovereign Privacy</span>
              </div>
              <div className="hidden sm:inline-block text-terrain/40">•</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                <span className="text-carbon/90 font-medium">120 FPS &amp; Sub-100ms Response</span>
              </div>
              <div className="hidden sm:inline-block text-terrain/40">•</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                <span className="text-carbon/90 font-medium">Zero Surveillance or Ad Trackers</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHIPPED SOFTWARE RELEASES (The Centerpiece) */}
        {/* ========================================================================= */}
        <section id="releases" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain font-medium">
                Shipped Software &amp; Games
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
                The Software Releases
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-xs sm:text-sm font-mono text-terrain max-w-md">
                Living digital products, interactive tools, and sovereign utilities designed and maintained independently by Xweet.
              </p>
              <Link
                href="/apps"
                className="self-start sm:self-auto text-xs font-mono text-carbon font-semibold border border-terrain/30 hover:border-carbon bg-white/40 hover:bg-white/70 px-4 py-2 rounded-full transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>View Dedicated Apps Catalog →</span>
              </Link>
            </div>
          </div>

          <div className="space-y-12">
            {RELEASES.map((item) => (
              <article
                key={item.id}
                className={`border rounded-3xl p-6 sm:p-10 transition-all ${
                  item.isFlagship
                    ? "border-carbon bg-white/70 shadow-sm ring-1 ring-carbon/10"
                    : "border-terrain/35 bg-white/40 hover:bg-white/60 hover:border-carbon/60 shadow-2xs"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/20 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-signal-lime shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-terrain font-medium">
                      {item.category}
                    </span>
                  </div>

                                        <span className="text-xs font-mono text-carbon font-semibold bg-black/5 border border-terrain/25 px-3 py-1 rounded-full self-start sm:self-auto">
                                          {item.badge}
                                        </span>
                                    </div>

                                    {/* Content grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                      {/* Left Column: Title & Actions */}
                                      <div className="lg:col-span-5 space-y-4">
                                        <h3 className="text-2xl sm:text-4xl font-space font-medium text-carbon tracking-tight">
                                          {item.title}
                                        </h3>

                                          <p className="text-sm sm:text-base font-medium text-carbon/90 leading-snug">
                                            {item.tagline}
                                          </p>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      {item.playHref ? (
                        <>
                          <Link
                            href={item.playHref}
                            className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98 border border-signal-lime/80"
                          >
                            <Compass className="w-4 h-4 text-carbon" />
                            <span>{item.primaryCta}</span>
                          </Link>

                          {item.detailsHref && (
                            <Link
                              href={item.detailsHref}
                              className="text-xs font-mono text-terrain hover:text-carbon px-4 py-3 rounded-2xl border border-terrain/30 hover:border-carbon transition-colors inline-flex items-center gap-1.5"
                            >
                              <span>Game Rules &amp; Previews</span>
                            </Link>
                          )}
                        </>
                      ) : (
                        <a
                          href={item.externalHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-carbon hover:bg-carbon/90 text-paper font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
                        >
                          <span>{item.primaryCta}</span>
                        </a>
                      )}
                    </div>
                  </div>

                                            {/* Right Column: Narrative & Technical Badges */}
                                            <div className="lg:col-span-7 space-y-4 bg-paper/60 p-6 sm:p-7 rounded-2xl border border-terrain/20 text-sm">
                                              <div>
                                                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-terrain mb-1.5">
                                                    Craft &amp; Architecture
                                                  </h4>
                                                  <p className="text-carbon/90 font-light leading-relaxed">
                                                    {item.description}
                                                  </p>
                                              </div>

                                                <div className="pt-3 border-t border-terrain/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                  <div className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag) => (
                                                      <span
                                                        key={tag}
                                                        className="px-2.5 py-1 rounded-lg bg-white/80 border border-terrain/30 font-mono text-[11px] text-terrain"
                                                      >
                                                        {tag}
                                                      </span>
                                                    ))}
                                                  </div>

                                                  <span className="text-[11px] font-mono text-terrain font-medium">
                                                    {item.metrics.split("•")[0].trim()}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </article>
            ))}
                                      </div>

                                      {/* Laboratory & Experiments Callout */}
                                      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/40 border border-dashed border-terrain/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="space-y-1 text-center sm:text-left">
                                          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-terrain uppercase">
                                            <Sparkles className="w-3.5 h-3.5 text-signal-lime" />
                                            <span>Studio Laboratory</span>
                                          </div>
                                          <h4 className="text-lg font-space font-medium text-carbon">
                                            Experimental Prototypes &amp; Micro-Tools in Testing
                                          </h4>
                                          <p className="text-xs font-mono text-terrain max-w-xl">
                                            We continuously experiment with WebAssembly graphics pipelines, procedural cartography generators, and local offline encryption.
                                          </p>
                                        </div>
                                        <Link
                                          href="/games"
                                          className="cursor-pointer border border-terrain/35 hover:border-carbon bg-white px-5 py-2.5 rounded-full text-xs font-mono text-carbon transition-colors inline-flex items-center gap-2 shrink-0"
                                        >
                                          <span>Explore Interactive Hub →</span>
                                        </Link>
                                      </div>
                                    </section>

                                            {/* ========================================================================= */}
                                            {/* SECTION 02: STUDIO ETHOS (Craft Principles) */}
                                            {/* ========================================================================= */}
                                            <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
                                              <div className="mb-14">
                                                <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                                                  Studio Philosophy &amp; Convictions
                                                </span>
                                                <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
                                                  Software Ethos &amp; Convictions
                                                </h2>
                                                <p className="text-sm sm:text-base text-terrain font-light mt-2 max-w-2xl leading-relaxed">
                                                  We reject the dark patterns, sluggish frameworks, and surveillance trackers pervasive in modern digital products. Here is how we build:
                                                </p>
                                              </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                  {ETHOS.map((e) => {
                                                    const Icon = e.icon;
                                                    return (
                <div
                  key={e.title}
                  className="border border-terrain/35 rounded-3xl p-8 bg-white/50 space-y-4 hover:border-carbon/70 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-signal-lime/25 border border-signal-lime/60 flex items-center justify-center text-carbon">
                        <Icon className="w-6 h-6 text-carbon" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-terrain bg-black/5 px-2.5 py-0.5 rounded-full border border-terrain/20 font-medium">
                        Standard
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                      {e.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-carbon/80 leading-relaxed font-light">
                      {e.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-terrain/20 font-mono text-[10px] uppercase tracking-widest text-terrain">
                    Xweet Standard
                  </div>
                </div>
              );
            })}
          </div>
        </section>

                                                {/* ========================================================================= */}
                                                {/* SECTION 03: SELECT COMMISSIONS (Tasteful & Unbloated) */}
                                                {/* ========================================================================= */}
                                                <section id="commissions" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
                                                  <div className="border border-carbon rounded-3xl p-8 sm:p-14 bg-carbon text-paper space-y-10">
                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                                      <div className="lg:col-span-7 space-y-4">
                                                        <span className="text-xs font-mono uppercase tracking-widest text-signal-lime">
                                                          Bespoke Collaboration
                                                        </span>
                                                        <h2 className="text-3xl sm:text-5xl font-space font-light tracking-tight text-paper">
                                                          Available for Select Commissions
                                                        </h2>
                                                        <p className="text-sm sm:text-base text-terrain font-light leading-relaxed max-w-xl">
                                                          Alongside building sovereign independent software, we partner with a handful of visionary founders, studios, and engineering teams each year to design, architect, and ship high-impact digital systems.
                                                        </p>
                                                        <p className="text-xs font-mono text-terrain/90">
                                                          Direct senior engineer collaboration • Fixed milestone delivery • 100% IP &amp; repository handover.
                                                        </p>
                                                      </div>

                                                            {/* Direct Actions Card */}
                                                            <div className="lg:col-span-5 bg-white/5 border border-terrain/30 rounded-2xl p-6 sm:p-8 space-y-5 font-mono text-xs">
                                                              <div>
                                                                <span className="text-[10px] text-signal-lime uppercase tracking-widest block font-bold mb-1">
                                                                  Direct Inquiry Route
                                                                </span>
                                                                <p className="text-terrain text-[11px] leading-relaxed">
                                                                  Have a high-conviction product or technical system to engineer? We review incoming scopes directly with no account managers.
                                                                </p>
                                                              </div>

                                                                <div className="space-y-3 pt-2">
                                                                  <Link
                                                                    href="/contact"
                                                                    className="w-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-between transition-all hover:scale-102 active:scale-98 border border-signal-lime"
                                                                  >
                                                                    <span>Inquire About a Project</span>
                                                                    <ArrowRight className="w-4 h-4 text-carbon" />
                                                                  </Link>

                                                                  <a
                                                                    href="mailto:contact@xweet.in"
                                                                    className="w-full border border-terrain/40 hover:border-paper text-paper text-xs py-3 px-6 rounded-xl flex items-center justify-between transition-colors bg-white/5"
                                                                  >
                                                                    <span>Email: contact@xweet.in</span>
                                                                    <ArrowUpRight className="w-3.5 h-3.5 text-terrain" />
                                                                  </a>
                                                                </div>
                                                              </div>
                                                            </div>

                                                                    {/* Core Capabilities */}
                                                                    <div className="pt-8 border-t border-white/10">
                                                                      <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block mb-4">
                                                                        What We Build With Select Partners:
                                                                      </span>
                                                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                                                                        {CAPABILITIES.map((c, i) => (
                                                                          <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                                                                            <h4 className="text-sm font-space font-medium text-paper">
                                                                              {c.title}
                                                                            </h4>
                                                                            <p className="text-terrain text-[11px] leading-relaxed font-light">
                                                                              {c.desc}
                                                                            </p>
                                                                          </div>
                                                                        ))}
                                                                      </div>
                                                                    </div>
                                                                  </div>
        </section>
                                                            </main>

                                                            {/* Studio Architectural Footer */}
                                                            <StudioFooter />
                                                        </div>
                                                        );
}
