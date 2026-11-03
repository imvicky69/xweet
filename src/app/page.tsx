"use client";

import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  ArrowRight,
  Compass,
  Code2,
  ShieldCheck,
  Zap,
  Smartphone,
  Server,
  Laptop,
  Palette,
  Workflow,
} from "lucide-react";

export default function AppAndWebsiteStudioPage() {
  const SERVICES = [
    {
      id: "web",
      num: "01",
      icon: Laptop,
      title: "Custom Web Applications",
      subtitle: "Fast, resilient, and SEO-optimized web platforms built with modern architectures.",
      description:
        "We build bespoke full-stack web applications, SaaS dashboards, and client portals using Next.js and TypeScript. Every interface is engineered for sub-second page loads, accessible navigation, and strict type safety.",
      features: [
        "Server-Side Rendering (SSR) & Edge Caching",
        "Responsive, mobile-first layouts with Tailwind CSS",
        "User authentication, Stripe/billing & RBAC systems",
        "Production deployment on Vercel or cloud infra",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS v4", "Node.js", "PostgreSQL"],
    },
    {
      id: "mobile",
      num: "02",
      icon: Smartphone,
      title: "Mobile App Development",
      subtitle: "Native & cross-platform mobile apps for iOS and Android with 120 FPS performance.",
      description:
        "From consumer utilities to on-demand service clients, we engineer high-framerate mobile apps using Flutter and React Native. Built with hardware-accelerated rendering, biometric security, and offline data sync.",
      features: [
        "iOS & Android cross-platform codebases",
        "Biometric security (FaceID, Fingerprint & PIN)",
        "Offline-first SQLite data synchronization",
        "End-to-end App Store & Google Play publishing",
      ],
      stack: ["Flutter", "Dart", "React Native", "Android", "iOS", "SQLite"],
    },
    {
      id: "backend",
      num: "03",
      icon: Server,
      title: "Real-Time Systems & APIs",
      subtitle: "Scalable backend services, WebSockets pipelines, and geospatial data layers.",
      description:
        "High-concurrency backend services engineered for low latency and data integrity. We build live WebSocket streams, RESTful microservices, and database layers that handle high transaction volumes without degradation.",
      features: [
        "Sub-50ms WebSocket real-time synchronization",
        "Geospatial routing & live GPS tracking pipelines",
        "Relational schemas (PostgreSQL) & in-memory caching",
        "Zero-trust API security & role-based validation",
      ],
      stack: ["Node.js", "Express", "WebSockets", "PostgreSQL", "Redis", "REST APIs"],
    },
    {
      id: "design",
      num: "04",
      icon: Palette,
      title: "UI/UX & Design Systems",
      subtitle: "Artisanal, tactile interfaces designed for high clarity and conversion.",
      description:
        "We craft distinct digital brand identities and design systems that stand out from generic corporate SaaS templates. From interactive Figma prototypes to tokenized Tailwind code, we ensure flawless visual fidelity.",
      features: [
        "Editorial brutalist & clean minimal design aesthetic",
        "Figma component libraries & interactive design tokens",
        "Micro-interactions, haptic feedback & fluid animations",
        "WCAG accessibility & strict light/dark palette balance",
      ],
      stack: ["Figma", "Tailwind CSS v4", "Design Tokens", "Typography", "Motion"],
    },
  ];

  const TRUST_PILLARS = [
    {
      title: "Direct Engineer Collaboration",
      desc: "You partner directly with senior product engineers. Zero non-technical account managers, zero lost context, and immediate technical feedback.",
      icon: Code2,
    },
    {
      title: "100% Code & Asset Ownership",
      desc: "All source code, Git repositories, Figma design files, and cloud credentials belong strictly to your company from day one. Zero vendor lock-in.",
      icon: ShieldCheck,
    },
    {
      title: "Weekly Sprint Checkpoints",
      desc: "We ship working software incrementally. You test functional staging builds every single week so there are never surprises or missed deadlines.",
      icon: Workflow,
    },
    {
      title: "Zero Synthetic Bloat",
      desc: "No sluggish templates or invasive tracking libraries. Every line of code is intentional, type-safe, and engineered for long-term maintainability.",
      icon: Zap,
    },
  ];

  const FEATURED_WORK = [
    {
      id: "unkn",
      num: "01",
      category: "REAL-TIME GEOSPATIAL GAME · GOOGLE STREET VIEW",
      title: "unkn (Geo-01)",
      tagline: "Minimalist, editorial GeoGuessr alternative with real 360° panoramas.",
      description:
        "A full-stack interactive geography deduction game. Engineered with Google Street View panoramas, server-side secret country validation, and a searchable country selector with keyboard navigation.",
      metrics: "10-Round Session • Server-Side Validation • Strict Light Mode",
      tags: ["Next.js", "Google Maps JS API", "Tailwind CSS v4", "Firebase", "TypeScript"],
      isGame: true,
      href: "/games",
      cta: "Play unkn (Live Game) →",
    },
    {
      id: "infyn",
      num: "02",
      category: "PRIVACY UTILITY SUITE · WEBASSEMBLY",
      title: "Infyn Ecosystem",
      tagline: "100% private in-browser utilities running locally with zero cloud uploads.",
      description:
        "An independent software suite delivering AI background removal, client-side batch compression, PDF manipulation, and AES-GCM file encryption. All computations execute on-device.",
      metrics: "100% Client-Side • Zero Telemetry • Offline PWA Architecture",
      tags: ["Next.js", "TypeScript", "WebAssembly", "Web Crypto API", "Tailwind CSS"],
      href: "https://infyn.software",
      cta: "Launch Infyn ↗",
    },
    {
      id: "smiley-pdf",
      num: "03",
      category: "ANDROID MOBILE APP · BIOMETRIC SECURITY",
      title: "Smiley PDF",
      tagline: "Fast, private Android PDF reader with 120 FPS hardware acceleration.",
      description:
        "Native Android document viewer engineered in Flutter. Features biometric Private Vault (fingerprint & PIN lock), zero battery drain, and 100% air-gapped on-device file privacy.",
      metrics: "120 FPS Native Engine • Biometric Vault • Zero Analytics",
      tags: ["Flutter", "Android", "Dart", "Biometrics", "Native Rendering"],
      href: "https://smiley.xweet.in",
      cta: "Explore Smiley PDF ↗",
    },
    {
      id: "indivio",
      num: "04",
      category: "HYPERLOCAL PLATFORM · FOOD & LIVE LOGISTICS",
      title: "Indivio",
      tagline: "Hyperlocal food delivery platform with 30-minute delivery & live GPS.",
      description:
        "Full-stack ordering and delivery ecosystem connecting regional restaurants with customers. Includes customer web client, merchant dispatch console, and real-time courier GPS routing over WebSockets.",
      metrics: "30-Min Delivery Pipeline • Real-Time WebSockets • PostgreSQL Sync",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL"],
      href: "https://indivio.xweet.in",
      cta: "Explore Indivio ↗",
    },
  ];

  const JOURNEY_STEPS = [
    {
      num: "01",
      phase: "DISCOVERY & ARCHITECTURE",
      title: "Requirements Blueprint",
      desc: "We analyze your user personas, technical requirements, data models, and edge constraints to build a concrete development roadmap with clear milestone estimates.",
    },
    {
      num: "02",
      phase: "CORE SPRINTS",
      title: "Rapid Iterative Engineering",
      desc: "We write clean, typed, modular code in weekly sprint cadences. You receive active staging URLs to test working software as features are completed.",
    },
    {
      num: "03",
      phase: "HARDENING & QA",
      title: "Performance & Security Audit",
      desc: "We stress-test edge cases, verify responsive layouts across mobile & desktop devices, audit page load latency, and eliminate bottlenecks.",
    },
    {
      num: "04",
      phase: "PRODUCTION LAUNCH",
      title: "Deployment & Asset Handover",
      desc: "We handle DNS configuration, production infrastructure setup, and complete transfer of repositories, documentation, and credentials to your team.",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation */}
      <StudioNavbar />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 lg:pt-12 pb-14 sm:pb-20 border-b border-terrain/25">
          <div className="flex flex-col items-start max-w-4xl space-y-4 sm:space-y-5">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-thin tracking-tight leading-[1.01] text-carbon">
              We build custom apps &amp; websites. <br />
              <span className="font-playwrite text-4xl sm:text-6xl lg:text-7xl text-terrain block mt-1">
                engineered to ship and scale.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-carbon/80 max-w-3xl font-light leading-relaxed pt-1">
              <strong className="text-carbon font-medium font-space">Xweet</strong> designs and engineers high-performance web platforms, cross-platform mobile apps, and custom digital software. Direct senior developer collaboration, 100% code ownership, and zero agency bloat.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/contact"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-md flex items-center gap-3 hover:scale-105 active:scale-95 border border-signal-lime/90 group"
              >
                <span>Contact Now</span>
                <ArrowRight className="w-4 h-4 text-carbon group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#services"
                className="cursor-pointer bg-carbon hover:bg-carbon/90 text-paper font-semibold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-md flex items-center gap-2 hover:scale-102 active:scale-98"
              >
                <span>Explore Services ↓</span>
              </a>

              <Link
                href="/games"
                className="cursor-pointer border border-terrain/40 hover:border-carbon text-carbon font-mono text-xs sm:text-sm px-5 sm:px-6 py-3.5 sm:py-4 rounded-full hover:bg-black/5 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-terrain" />
                <span>Play unkn (Demo Game)</span>
              </Link>
            </div>

            {/* Trust Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full pt-8">
              <div className="p-4 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-[11px] font-mono text-terrain uppercase block">Code Ownership</span>
                <span className="text-base sm:text-lg font-space font-medium text-carbon">100% IP &amp; Repos</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-[11px] font-mono text-terrain uppercase block">Collaboration</span>
                <span className="text-base sm:text-lg font-space font-medium text-carbon">Direct Developers</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-[11px] font-mono text-terrain uppercase block">Performance Target</span>
                <span className="text-base sm:text-lg font-space font-medium text-carbon">Sub-100ms Latency</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-[11px] font-mono text-terrain uppercase block">Delivery Cadence</span>
                <span className="text-base sm:text-lg font-space font-medium text-carbon">Weekly Sprints</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Services */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                01 // Development Services
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
                Custom Engineering for Apps &amp; Websites
              </h2>
            </div>
            <p className="text-sm font-mono text-terrain max-w-md">
              From concept validation to enterprise deployment, we engineer every tier with clean code, strict types, and robust architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="border border-terrain/35 rounded-3xl p-8 sm:p-10 bg-white/50 hover:bg-white/70 hover:border-carbon/70 transition-all shadow-xs space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-signal-lime/25 border border-signal-lime/60 flex items-center justify-center text-carbon">
                        <Icon className="w-6 h-6 text-carbon" />
                      </div>
                      <span className="text-xs font-mono text-terrain font-semibold">
                        SERVICE {s.num}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
                      {s.title}
                    </h3>

                    <p className="text-sm font-medium text-carbon/80">
                      {s.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-terrain leading-relaxed font-light">
                      {s.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-terrain/20">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block">
                        Included Deliverables:
                      </span>
                      <ul className="space-y-1.5">
                        {s.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-mono text-carbon">
                            <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-terrain/20 flex flex-wrap gap-2">
                    {s.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-paper border border-terrain/30 font-mono text-[11px] text-terrain"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-carbon text-paper border border-carbon flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-space font-medium">
                Need a custom app or website built on your schedule?
              </h4>
              <p className="text-xs font-mono text-terrain">
                Receive an architectural quote and timeline estimation within 24 hours.
              </p>
            </div>
            <Link
              href="/contact"
              className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shrink-0 shadow-sm hover:scale-105 active:scale-95"
            >
              Contact Now →
            </Link>
          </div>
        </section>

        {/* Section 02: Trust & Client Standards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              02 // Why Clients Trust Xweet
            </span>
            <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
              Built on Transparency, Speed &amp; Integrity
            </h2>
            <p className="text-sm sm:text-base text-terrain font-light mt-2 max-w-2xl leading-relaxed">
              We reject the typical agency playbook of subcontracted labor, opaque billable hours, and neglected code quality. Here is our client standard:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  className="border border-terrain/30 rounded-3xl p-6 bg-white/40 space-y-3 hover:border-carbon transition-colors"
                >
                  <div className="w-10 h-10 rounded-2xl bg-signal-lime/25 border border-signal-lime/50 flex items-center justify-center text-carbon">
                    <Icon className="w-5 h-5 text-carbon" />
                  </div>

                  <h3 className="text-lg font-space font-medium text-carbon">
                    {t.title}
                  </h3>

                  <p className="text-xs text-carbon/80 leading-relaxed font-light">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 03: Featured Work */}
        <section id="work" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                03 // Proof of Execution
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
                Shipped Software &amp; Case Studies
              </h2>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono text-carbon font-medium border border-terrain/30 px-4 py-2 rounded-full self-start md:self-auto bg-white/40 hover:bg-white/70 transition-colors inline-flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-terrain" />
              <span>Explore Interactive Games Hub →</span>
            </Link>
          </div>

          <div className="space-y-10">
            {FEATURED_WORK.map((item) => (
              <article
                key={item.id}
                className={`border rounded-3xl p-6 sm:p-10 transition-all shadow-sm ${
                  item.isGame
                    ? "border-carbon bg-white/70 ring-1 ring-carbon/10"
                    : "border-terrain/35 bg-white/40 hover:border-carbon/70"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-terrain/20 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-mono font-bold text-terrain">
                      {item.num}
                    </span>
                    <span className="text-terrain/40">/</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-terrain">
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-terrain font-medium bg-black/5 px-2.5 py-1 rounded-full">
                    {item.metrics}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-2xl sm:text-4xl font-space font-medium text-carbon tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium text-carbon/90">
                      {item.tagline}
                    </p>

                    <div className="pt-2">
                      {item.isGame ? (
                        <Link
                          href={item.href}
                          className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98 border border-signal-lime/80"
                        >
                          <Compass className="w-4 h-4 text-carbon" />
                          <span>{item.cta}</span>
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-carbon hover:bg-carbon/90 text-paper font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-sm inline-flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
                        >
                          <span>{item.cta}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4 bg-paper/60 p-6 rounded-2xl border border-terrain/20 text-sm">
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-terrain mb-1">
                        Architecture &amp; Implementation
                      </h4>
                      <p className="text-carbon/90 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-terrain/20 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-white/70 border border-terrain/30 font-mono text-[11px] text-terrain"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 04: About Us, Who We Are & Our Journey */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
          <div className="border border-carbon rounded-3xl p-8 sm:p-14 bg-carbon text-paper space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-signal-lime">
                    04 // Who We Are &amp; Our Journey
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-paper mt-1">
                    An Engineering Studio Built on Craftsmanship
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-terrain font-light leading-relaxed">
                  <p>
                    <strong className="text-paper font-medium">Xweet</strong> began as a studio dedicated to building sovereign digital tools and interactive software experiments. We started by building offline utilities, 120 FPS mobile apps, and real-time mapping games that demanded ruthless optimization and zero reliance on corporate SaaS templates.
                  </p>

                  <p>
                    Along the way, founders and businesses approached us with a recurring problem: traditional agencies were bloated, slow, and delivered sluggish codebases. We expanded our capabilities to offer full-service custom application and website development.
                  </p>

                  <p>
                    Today, our mission remains unaltered: build software worth using. We provide founders and organizations with direct access to senior developers, fixed milestone estimates, and codebases designed for longevity.
                  </p>
                </div>

                {/* Studio Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-signal-lime text-[11px] block font-semibold">01. RELENTLESS SPEED</span>
                    <p className="text-terrain text-[11px] leading-relaxed">
                      Sub-100ms cold starts, lightweight bundle footprints, and high framerates.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-signal-lime text-[11px] block font-semibold">02. PRIVACY FIRST</span>
                    <p className="text-terrain text-[11px] leading-relaxed">
                      Strict data hygiene, zero user surveillance scripts, and local compute pipelines.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-signal-lime text-[11px] block font-semibold">03. FULL IP HANDOVER</span>
                    <p className="text-terrain text-[11px] leading-relaxed">
                      Complete ownership of source repositories, build configs, and deployment access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Studio Factsheet (5 cols) */}
              <div className="lg:col-span-5 bg-white/5 border border-terrain/30 rounded-2xl p-6 sm:p-8 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-signal-lime text-[10px] uppercase tracking-widest block font-bold">
                    Studio Factsheet
                  </span>
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <Image
                      src="/logo-clear.png"
                      alt="xweet"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-3 divide-y divide-white/10">
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-terrain">ENTITY</span>
                    <span className="text-paper font-semibold">Xweet Studio</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-terrain">CORE SPECIALTY</span>
                    <span className="text-paper">App &amp; Website Development</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-terrain">HEADQUARTERS</span>
                    <span className="text-paper">India (Serving Clients Globally)</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-terrain">COMMUNICATION</span>
                    <span className="text-signal-lime font-semibold">Direct Developer Access</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-terrain">ENGAGEMENT MODEL</span>
                    <span className="text-paper">Fixed Milestone Sprints</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-terrain">AVERAGE DELIVERY</span>
                    <span className="text-paper">2 – 8 Weeks per MVP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Stage Sprint Journey */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xl font-space font-medium text-paper">
                  Our 4-Stage Sprint Journey
                </h4>
                <span className="text-xs font-mono text-signal-lime uppercase tracking-wider">
                  How We Take You From Idea to Production
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {JOURNEY_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="p-5 rounded-2xl bg-white/5 border border-terrain/25 space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-signal-lime font-bold">{step.num}</span>
                      <span className="text-[10px] text-terrain uppercase">{step.phase}</span>
                    </div>
                    <h5 className="text-sm font-space font-medium text-paper pt-1">
                      {step.title}
                    </h5>
                    <p className="text-terrain text-[11px] leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Final Contact / CTA Banner */}
        <section id="contact-banner" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-terrain/25">
          <div className="border border-terrain/35 rounded-3xl p-8 sm:p-14 bg-signal-lime/20 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-carbon font-semibold">
              START YOUR PROJECT TODAY
            </span>

            <h2 className="text-4xl sm:text-6xl font-space font-light tracking-tight text-carbon">
              Ready to build your next app or website?
            </h2>

            <p className="font-playwrite text-2xl sm:text-3xl text-terrain max-w-xl mx-auto">
              turn your concept into production software.
            </p>

            <p className="text-sm sm:text-base text-carbon/80 max-w-xl mx-auto font-light leading-relaxed">
              Tell us what you are building. Receive an architectural quote and milestone schedule within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="cursor-pointer bg-carbon hover:bg-carbon/90 text-paper font-semibold text-base px-10 py-4 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Contact Now</span>
                <ArrowRight className="w-4 h-4 text-signal-lime" />
              </Link>

              <a
                href="mailto:contact@xweet.in"
                className="cursor-pointer bg-paper hover:bg-white text-carbon font-mono text-xs sm:text-sm px-6 py-4 rounded-full border border-terrain/40 hover:border-carbon transition-colors inline-flex items-center gap-2"
              >
                <span>Email Directly: contact@xweet.in</span>
              </a>

              <Link
                href="/games"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-4 rounded-full border border-signal-lime/90 transition-all inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-carbon" />
                <span>Play unkn Game</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
