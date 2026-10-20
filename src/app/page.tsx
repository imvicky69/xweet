"use client";

import { useState } from "react";
import Link from "next/link";
import LandingNavbar from "@/components/LandingNavbar";
import HowToPlayModal from "@/components/HowToPlayModal";
import Footer from "@/components/Footer";
import {
  Compass,
  ArrowRight,
  Globe,
  MapPin,
  Crosshair,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activePreviewLocation, setActivePreviewLocation] = useState(0);

  const PREVIEWS = [
    {
      title: "Kyoto Forest Sanctuary",
      country: "Japan",
      flag: "🇯🇵",
      coords: "35.0163° N, 135.6713° E",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
      clue: "Left-hand traffic • Japanese flora & signage",
    },
    {
      title: "Southern Alps Glacial Pass",
      country: "New Zealand",
      flag: "🇳🇿",
      coords: "44.9858° S, 168.8524° E",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
      clue: "Sun in the north • Alpine tussock grassland",
    },
    {
      title: "Vík Basalt Coastline",
      country: "Iceland",
      flag: "🇮🇸",
      coords: "63.4186° N, 19.0060° W",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80",
      clue: "Treeless volcanic tundra • Distinctive road markers",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Top Landing Navbar */}
      <LandingNavbar onOpenHowToPlay={() => setIsHowToPlayOpen(true)} />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="flex flex-col items-start max-w-4xl space-y-6">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-thin tracking-tight leading-[1.02] text-carbon">
              Drop into the unknown. <br />
              <span className="font-playwrite text-4xl sm:text-6xl lg:text-7xl text-terrain block mt-2">
                deduce the country.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-carbon/80 max-w-2xl font-light leading-relaxed pt-2">
              An artisanal, minimalist <strong className="font-medium text-carbon font-space">GeoGuessr alternative</strong> designed for pure cartographic instinct. Survey real Google Street View panoramas, calculate solar azimuth, inspect landscape biomes, and lock your target.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/play"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-md flex items-center gap-3 hover:scale-105 active:scale-95 border border-signal-lime/90 group"
              >
                <span>Start Expedition</span>
                <ArrowRight className="w-5 h-5 text-carbon group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsHowToPlayOpen(true)}
                className="cursor-pointer border border-terrain/40 hover:border-carbon text-carbon font-normal text-base px-7 py-4 rounded-full hover:bg-black/5 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-terrain" />
                <span>Expedition Rules</span>
              </button>

              <span className="text-xs font-mono text-terrain pl-2 hidden sm:inline">
                Strict Light Mode • Real Google Street View
              </span>
            </div>

            {/* Telemetry Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full pt-8 border-t border-terrain/25">
              <div className="p-4 rounded-2xl bg-white/40 border border-terrain/20">
                <span className="text-[11px] font-mono text-terrain uppercase block">Territories</span>
                <span className="text-2xl font-light font-mono text-carbon">10 / Game</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/40 border border-terrain/20">
                <span className="text-[11px] font-mono text-terrain uppercase block">View Angle</span>
                <span className="text-2xl font-light font-mono text-carbon">360° Spherical</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/40 border border-terrain/20">
                <span className="text-[11px] font-mono text-terrain uppercase block">Target Ceiling</span>
                <span className="text-2xl font-light font-mono text-carbon">10 Points Max</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/40 border border-terrain/20">
                <span className="text-[11px] font-mono text-terrain uppercase block">Scoring Rule</span>
                <span className="text-2xl font-light font-mono text-carbon">1 Pt / Match</span>
              </div>
            </div>
          </div>
        </section>

        {/* Viewport Preview Showcase Section */}
        <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="border border-terrain/30 rounded-3xl p-6 sm:p-8 bg-white/30 backdrop-blur-xs space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-terrain/20 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                  Interactive Observation Viewport
                </span>
                <h2 className="text-2xl sm:text-3xl font-space font-medium tracking-tight text-carbon mt-0.5">
                  Reconnaissance in Pure Paper &amp; Carbon Clarity
                </h2>
              </div>

              {/* Territory Switcher Chips */}
              <div className="flex items-center gap-2">
                {PREVIEWS.map((p, idx) => (
                  <button
                    key={p.country}
                    onClick={() => setActivePreviewLocation(idx)}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                      activePreviewLocation === idx
                        ? "bg-carbon text-paper font-medium shadow-xs"
                        : "bg-paper text-terrain hover:text-carbon border border-terrain/30"
                    }`}
                  >
                    <span>{p.flag}</span>
                    <span className="hidden sm:inline">{p.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-terrain/40 shadow-inner group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                style={{
                  backgroundImage: `url(${PREVIEWS[activePreviewLocation].image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Viewport Center Crosshair */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                <Crosshair className="w-12 h-12 text-paper stroke-[1]" />
              </div>

              {/* Telemetry Overlays */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-carbon/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-terrain/40 text-[11px] font-mono text-paper space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
                  <span className="text-signal-lime font-semibold">TERRITORY SCAN</span>
                </div>
                <div className="text-terrain text-[10px]">
                  COORDINATES: <span className="text-paper">{PREVIEWS[activePreviewLocation].coords}</span>
                </div>
                <div className="text-terrain text-[10px]">
                  SIGNATURE: <span className="text-paper">{PREVIEWS[activePreviewLocation].clue}</span>
                </div>
              </div>

              {/* Bottom Right CTA to Play */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <Link
                  href="/play"
                  className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-carbon" />
                  <span>Launch Live Arena →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Field Mechanics Section */}
        <section id="mechanics" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              Tactical Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-space font-medium tracking-tight text-carbon mt-1">
              Engineered for Geographical Instinct
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-terrain/30 rounded-3xl p-8 bg-white/35 space-y-4 hover:border-carbon transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-signal-lime/30 border border-signal-lime/60 flex items-center justify-center font-mono font-semibold text-carbon">
                01
              </div>
              <h3 className="text-2xl font-space font-medium text-carbon">Real Street View</h3>
              <p className="text-sm text-carbon/80 leading-relaxed font-normal">
                Inspect 360° spherical panoramas powered by Google Maps JavaScript API. Observe solar azimuth, road line markings, utility poles, and flora.
              </p>
              <div className="pt-2 text-xs font-mono text-terrain">
                Interactive Pan &amp; Tilt • North Reset • Fullscreen
              </div>
            </div>

            <div className="border border-terrain/30 rounded-3xl p-8 bg-white/35 space-y-4 hover:border-carbon transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-mist/35 border border-mist/70 flex items-center justify-center font-mono font-semibold text-carbon">
                02
              </div>
              <h3 className="text-2xl font-space font-medium text-carbon">Searchable Guesser</h3>
              <p className="text-sm text-carbon/80 leading-relaxed font-normal">
                Quickly search by country name, ISO code, or continent. Keyboard-friendly navigation with arrow keys and instant selection confirmation.
              </p>
              <div className="pt-2 text-xs font-mono text-terrain">
                Fuzzy Search • Keyboard Accessible • Dropdown Popover
              </div>
            </div>

            <div className="border border-terrain/30 rounded-3xl p-8 bg-white/35 space-y-4 hover:border-carbon transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-carbon text-paper flex items-center justify-center font-mono font-semibold">
                03
              </div>
              <h3 className="text-2xl font-space font-medium text-carbon">Expedition Audit</h3>
              <p className="text-sm text-carbon/80 leading-relaxed font-normal">
                Answers are validated securely on the server and revealed round by round. Complete 10 rounds to unlock your full territory audit report.
              </p>
              <div className="pt-2 text-xs font-mono text-terrain">
                Server-side Validation • 10-Round Debrief • Firestore Sync
              </div>
            </div>
          </div>
        </section>

        {/* Global Coverage & Security Section */}
        <section id="intel" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="border border-carbon rounded-3xl p-8 sm:p-12 bg-carbon text-paper space-y-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-signal-lime">
                Verified Global Coordinates
              </span>
              <h2 className="text-3xl sm:text-4xl font-space font-medium tracking-tight text-paper">
                Authentic Street View. Zero Spoilers.
              </h2>
              <p className="text-sm text-terrain font-light leading-relaxed">
                Every round selects from verified Street View locations across all continents. The server keeps target country answers strictly hidden until you submit your deduction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-white/5 border border-terrain/30 space-y-2">
                <span className="text-signal-lime text-[10px] block">SECURITY FIRST</span>
                <h4 className="text-base text-paper font-space font-medium">Server-Side Validation</h4>
                <p className="text-terrain text-[11px] leading-relaxed">
                  Answers and country coordinates are never broadcast to the browser beforehand. Inspecting client memory reveals nothing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-terrain/30 space-y-2">
                <span className="text-terrain text-[10px] block">TEN ROUNDS</span>
                <h4 className="text-base text-paper font-space font-medium">Discrete Scoring</h4>
                <p className="text-terrain text-[11px] leading-relaxed">
                  Earn 1 point for every sovereign nation correctly identified. Maximum expedition score is 10 points.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-terrain/30 space-y-2">
                <span className="text-mist text-[10px] block">CLOUD PERSISTENCE</span>
                <h4 className="text-base text-paper font-space font-medium">Firebase Integration</h4>
                <p className="text-terrain text-[11px] leading-relaxed">
                  Play as a guest or sign in with Google or Email to archive your full ten-round history to Cloud Firestore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design System & Palette Tokens Anchor */}
        <section id="tokens" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              Architecture &amp; Theme Tokens
            </span>
            <h2 className="text-3xl font-space font-medium text-carbon mt-1">
              Built on Pure Brand Tokens in Light Mode
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl border border-terrain/30 bg-carbon text-paper">
              <div className="w-full h-12 rounded-lg bg-carbon border border-white/20 mb-2" />
              <span className="font-medium text-sm block">Carbon</span>
              <span className="font-mono text-xs text-terrain">#171815</span>
            </div>

            <div className="p-4 rounded-2xl border border-terrain/30 bg-paper text-carbon">
              <div className="w-full h-12 rounded-lg bg-[#F0EFE6] border border-black/10 mb-2" />
              <span className="font-medium text-sm block">Paper</span>
              <span className="font-mono text-xs text-terrain">#F0EFE6</span>
            </div>

            <div className="p-4 rounded-2xl border border-terrain/30 bg-paper text-carbon">
              <div className="w-full h-12 rounded-lg bg-[#D7F36A] border border-black/10 mb-2" />
              <span className="font-medium text-sm block">Signal Lime</span>
              <span className="font-mono text-xs text-terrain">#D7F36A</span>
            </div>

            <div className="p-4 rounded-2xl border border-terrain/30 bg-paper text-carbon">
              <div className="w-full h-12 rounded-lg bg-[#858779] border border-black/10 mb-2" />
              <span className="font-medium text-sm block">Terrain</span>
              <span className="font-mono text-xs text-terrain">#858779</span>
            </div>

            <div className="p-4 rounded-2xl border border-terrain/30 bg-paper text-carbon col-span-2 sm:col-span-1">
              <div className="w-full h-12 rounded-lg bg-[#B7A7D9] border border-black/10 mb-2" />
              <span className="font-medium text-sm block">Mist</span>
              <span className="font-mono text-xs text-terrain">#B7A7D9</span>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="border border-terrain/35 rounded-3xl p-8 sm:p-14 bg-signal-lime/20 text-center space-y-6">
            <h2 className="text-4xl sm:text-6xl font-space font-light tracking-tight text-carbon">
              Ready to test your instincts?
            </h2>
            <p className="font-playwrite text-2xl sm:text-3xl text-terrain max-w-xl mx-auto">
              survey ten unkn territories now.
            </p>
            <div className="pt-2">
              <Link
                href="/play"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-md inline-flex items-center gap-2 hover:scale-105 active:scale-95 border border-signal-lime/90"
              >
                <span>Launch Recon Session</span>
                <ArrowRight className="w-4 h-4 text-carbon" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <Footer
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenHowToPlay={() => {}}
      />
    </div>
  );
}
