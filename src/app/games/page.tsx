"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import HowToPlayModal from "@/components/HowToPlayModal";
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Crosshair,
  ArrowUpRight,
  RotateCcw,
  ShieldCheck,
  Zap,
  EyeOff,
  HelpCircle,
} from "lucide-react";

export default function GamesHubPage() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
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
      {/* Universal Studio Navigation: ONLY Games, Apps, About + 1 CTA */}
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* ========================================================================= */}
        {/* GAMES HUB HERO: Minimal One-Lined Header */}
        {/* ========================================================================= */}
        <section className="border-b border-terrain/20 pb-4 sm:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-thin tracking-tight text-carbon">
            Tactile Games &amp; Deductive Puzzles.
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-terrain shrink-0">
            <span className="w-2 h-2 rounded-full bg-signal-lime" />
            <span className="text-carbon font-medium">Free &amp; Ad-Free</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE GAMES ROSTER (unkn & wordle) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* GAME 01: unkn (Geo-01) */}
          <article className="border border-carbon rounded-3xl p-6 sm:p-10 bg-white/70 shadow-sm ring-1 ring-carbon/10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-terrain/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-signal-lime/25 border border-signal-lime/60 flex items-center justify-center text-carbon">
                    <Compass className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-terrain block">
                      GEOGRAPHY DEDUCTION
                    </span>
                    <span className="text-xs font-mono text-carbon font-semibold">
                      EXPEDITION · 10 ROUNDS
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-carbon font-semibold bg-signal-lime/30 border border-signal-lime px-2.5 py-1 rounded-full">
                  Flagship · Live
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-space font-medium text-carbon tracking-tight">
                  unkn
                </h2>
                <p className="text-sm sm:text-base font-medium text-carbon/90 mt-1 leading-snug">
                  Artisanal, minimalist GeoGuessr alternative with real Google 360° Street View panoramas.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
                Drop into mystery coordinates across the globe. Inspect landscape biomes, road infrastructure, sun angle, and architectural language to deduce the secret country with a keyboard-driven search interface.
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-terrain/15 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Real Google Maps JS SDK Street View (showRoadLabels: false)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Server-side secret country secrecy &amp; validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Complete 10-round expedition audit &amp; accuracy debrief</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-terrain/20 flex flex-wrap items-center gap-3">
              <Link
                href="/unkn"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-sm flex items-center gap-2 hover:scale-102 active:scale-98 border border-signal-lime/90 group"
              >
                <Compass className="w-4 h-4 text-carbon" />
                <span>Play Expedition (10 Rounds)</span>
                <ArrowRight className="w-4 h-4 text-carbon group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsHowToPlayOpen(true)}
                className="cursor-pointer border border-terrain/35 hover:border-carbon text-carbon font-mono text-xs px-4 py-3.5 rounded-2xl bg-white/50 hover:bg-white transition-colors inline-flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-terrain" />
                <span>How to Play</span>
              </button>
            </div>
          </article>

          {/* GAME 02: Wordle */}
          <article className="border border-terrain/35 rounded-3xl p-6 sm:p-10 bg-white/50 hover:bg-white/70 hover:border-carbon/70 transition-all shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-terrain/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-mist/30 border border-mist flex items-center justify-center text-carbon">
                    <Sparkles className="w-5 h-5 text-carbon" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-terrain block">
                      WORD DEDUCTION
                    </span>
                    <span className="text-xs font-mono text-carbon font-semibold">
                      DAILY PUZZLE · 6 ATTEMPTS
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-carbon font-semibold bg-mist/30 border border-mist px-2.5 py-1 rounded-full">
                  New Release · Free
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-space font-medium text-carbon tracking-tight flex items-center gap-2">
                  <span className="font-playwrite">wordle</span>
                </h2>
                <p className="text-sm sm:text-base font-medium text-carbon/90 mt-1 leading-snug">
                  Minimalist, tactile daily 5-letter vocabulary deduction puzzle.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
                A clean, distraction-free Wordle alternative engineered in strict light mode. 6 attempts to deduce the secret word, accompanied by responsive physical &amp; touch keyboard input, shareable emoji results, and persistent win streaks.
              </p>

              {/* Sample Tiles Visual */}
              <div className="pt-2 border-t border-terrain/15 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                  Tactile Palette Feedback:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                  <div className="w-8 h-8 rounded-lg bg-signal-lime text-carbon flex items-center justify-center border border-signal-lime">
                    W
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-mist/80 text-carbon flex items-center justify-center border border-mist">
                    O
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-terrain/20 text-terrain/70 flex items-center justify-center border border-terrain/30">
                    R
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-signal-lime text-carbon flex items-center justify-center border border-signal-lime">
                    D
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/70 text-carbon border border-carbon flex items-center justify-center">
                    S
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-terrain/15 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Sub-100ms keyboard interaction on phone and desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Win streak telemetry stored locally on your device</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>One-click clipboard score sharing (🟩🟪⬛)</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-terrain/20 flex flex-wrap items-center gap-3">
              <Link
                href="/wordle"
                className="cursor-pointer bg-carbon hover:bg-carbon/85 text-paper font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-sm flex items-center gap-2 hover:scale-102 active:scale-98 group"
              >
                <span>Play Wordle Now</span>
                <ArrowRight className="w-4 h-4 text-signal-lime group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/wordle"
                className="cursor-pointer border border-terrain/35 hover:border-carbon text-carbon font-mono text-xs px-4 py-3.5 rounded-2xl bg-white/40 hover:bg-white transition-colors"
              >
                <span>Quick Play</span>
              </Link>
            </div>
          </article>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE RECONNAISSANCE VIEWPORT (for unkn) */}
        {/* ========================================================================= */}
        <section id="preview" className="border border-terrain/30 rounded-3xl p-6 sm:p-10 bg-white/40 backdrop-blur-xs space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-terrain/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                Field Intel &amp; Reconnaissance
              </span>
              <h3 className="text-2xl sm:text-3xl font-space font-medium tracking-tight text-carbon mt-0.5">
                Observation Viewport Preview
              </h3>
            </div>

            {/* Territory Switcher Chips */}
            <div className="flex items-center gap-2">
              {PREVIEWS.map((p, idx) => (
                <button
                  key={p.country}
                  onClick={() => setActivePreviewLocation(idx)}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${activePreviewLocation === idx
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

          {/* Active Preview Viewport */}
          <div className="relative rounded-2xl overflow-hidden border border-terrain/40 aspect-video max-h-[460px] w-full bg-carbon">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 hover:scale-105"
              style={{
                backgroundImage: `url('${PREVIEWS[activePreviewLocation].image}')`,
              }}
            />

            {/* Viewport UI Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-carbon/40 pointer-events-none" />

            {/* Top Bar Telemetry */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1 rounded-lg bg-carbon/75 backdrop-blur-md border border-white/20 text-paper font-mono text-xs flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-signal-lime" />
                <span>{PREVIEWS[activePreviewLocation].coords}</span>
              </div>

              <div className="px-3 py-1 rounded-lg bg-carbon/75 backdrop-blur-md border border-white/20 text-signal-lime font-mono text-xs font-semibold">
                TARGET TERRITORY: UNKNOWN
              </div>
            </div>

            {/* Bottom Intel Card */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-paper/95 backdrop-blur-md border border-terrain/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-carbon pointer-events-auto">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-space font-medium text-base">
                    {PREVIEWS[activePreviewLocation].title}
                  </span>
                  <span className="text-xs font-mono text-terrain">
                    ({PREVIEWS[activePreviewLocation].flag} {PREVIEWS[activePreviewLocation].country})
                  </span>
                </div>
                <p className="text-xs font-mono text-terrain">
                  Clue: {PREVIEWS[activePreviewLocation].clue}
                </p>
              </div>

              <Link
                href="/unkn"
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs px-5 py-2.5 rounded-full transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-2xs border border-signal-lime"
              >
                <span>Launch Live Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO GAMING MANIFESTO */}
        {/* ========================================================================= */}
        <section className="border border-carbon rounded-3xl p-8 sm:p-12 bg-carbon text-paper space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-signal-lime">
              Studio Standards
            </span>
            <h3 className="text-2xl sm:text-4xl font-space font-light text-paper">
              How We Engineer Games at Xweet
            </h3>
            <p className="text-sm font-light text-terrain max-w-2xl leading-relaxed">
              We build games the way games used to be made: instant, responsive, respectful of your time, and free of corporate monetization tricks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs pt-4 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-signal-lime font-bold block">ZERO ADS OR PAYWALLS</span>
              <p className="text-terrain text-[11px] leading-relaxed font-light">
                No 30-second video ads before you can make a guess. No energy meters telling you to wait 4 hours. Play as much as you want.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-signal-lime font-bold block">SUB-100MS RESPONSIVENESS</span>
              <p className="text-terrain text-[11px] leading-relaxed font-light">
                Instant keyboard typing, fast Street View panorama loads, and smooth 60–120 FPS animations on mobile phones and desktop.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-signal-lime font-bold block">SERVER-SIDE SECRECY</span>
              <p className="text-terrain text-[11px] leading-relaxed font-light">
                Answers are validated on the server with cryptographic integrity. Inspection tools cannot cheat the target solution.
              </p>
            </div>
          </div>

          {/* Privacy & Sovereignty Link Strip */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-terrain border-t border-white/10">
            <span className="text-paper/70 font-light">
              All Xweet games operate under our verified zero-tracking architecture.
            </span>
            <Link
              href="/games/privacy"
              className="text-signal-lime hover:underline inline-flex items-center gap-1.5 font-semibold group shrink-0"
            >
              <span>Games Privacy Policy</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
      </main>

      {/* How to Play Modal for unkn */}
      <HowToPlayModal isOpen={isHowToPlayOpen} onClose={() => setIsHowToPlayOpen(false)} />

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
