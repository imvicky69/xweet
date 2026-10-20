"use client";

import Image from "next/image";
import { Compass, Sparkles, HelpCircle, Volume2, VolumeX, Eye } from "lucide-react";

interface NavbarProps {
  score: number;
  streak: number;
  currentRound: number;
  totalRounds: number;
  isClueOpen: boolean;
  onToggleClue: () => void;
  onOpenHowToPlay: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navbar({
  score,
  streak,
  currentRound,
  totalRounds,
  isClueOpen,
  onToggleClue,
  onOpenHowToPlay,
  soundEnabled,
  onToggleSound,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-terrain/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-carbon/5 border border-terrain/30 overflow-hidden shadow-2xs">
            <Image
              src="/logo-navbar.png"
              alt="unkn emblem"
              width={36}
              height={36}
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-playwrite text-2xl tracking-tight text-carbon">unkn</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-mono text-terrain border border-terrain/40 px-1.5 py-0.2 rounded">
                GEO • MVP
              </span>
            </div>
            <span className="text-[11px] font-mono text-terrain -mt-1 hidden sm:block">
              guess the country
            </span>
          </div>
        </div>

        {/* Center: Round & Progress Tracking */}
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-terrain">
            <Compass className="w-3.5 h-3.5 text-carbon animate-spin" style={{ animationDuration: "14s" }} />
            <span>ROUND {currentRound} / {totalRounds}</span>
          </div>
          {/* Progress Segments */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentRound - 1
                    ? "w-7 bg-carbon"
                    : i === currentRound - 1
                    ? "w-9 bg-signal-lime ring-1 ring-carbon/20"
                    : "w-7 bg-terrain/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Score, Streak & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Clue Drawer Toggle Button */}
          <button
            onClick={onToggleClue}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              isClueOpen
                ? "bg-mist text-carbon border-mist shadow-xs"
                : "bg-paper hover:bg-mist/20 text-terrain hover:text-carbon border-terrain/40"
            }`}
            title="Field Intelligence & Clues"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Intel</span>
          </button>

          {/* Streak Multiplier */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-mist/25 text-carbon border border-mist/50">
            <Sparkles className="w-3 h-3 text-carbon" />
            <span className="font-semibold">{streak}x</span>
            <span className="hidden lg:inline text-[10px] text-terrain">streak</span>
          </div>

          {/* Primary Score Counter */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-signal-lime text-carbon font-mono shadow-xs border border-signal-lime/80">
            <span className="text-[11px] uppercase tracking-wider text-carbon/70 font-sans font-medium">
              SCORE
            </span>
            <span className="font-semibold text-sm sm:text-base">
              {score.toLocaleString()}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="cursor-pointer p-2 rounded-full border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors"
            title={soundEnabled ? "Mute audio" : "Enable sound FX"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-terrain/60" />
            )}
          </button>

          {/* How to Play Modal */}
          <button
            onClick={onOpenHowToPlay}
            className="cursor-pointer p-2 rounded-full border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors"
            title="How to Play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
