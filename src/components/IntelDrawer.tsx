"use client";

import { useState } from "react";
import { Eye, ShieldAlert, Sparkles, X, ChevronDown, Check } from "lucide-react";
import { LocationItem } from "@/data/locations";

interface IntelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationItem;
  unlockedClues: Set<number>;
  onUnlockClue: (clueIndex: number, penalty: number) => void;
}

export default function IntelDrawer({
  isOpen,
  onClose,
  location,
  unlockedClues,
  onUnlockClue,
}: IntelDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-paper border border-terrain/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-carbon">
        {/* Header */}
        <div className="p-6 border-b border-terrain/25 flex items-center justify-between bg-mist/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-mist/30 border border-mist/70 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-carbon" />
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-tight">Field Intelligence</h3>
              <p className="text-xs text-terrain">Unlock tactical clues with minor score trade-offs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-carbon/10 text-terrain hover:text-carbon transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clues List */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Clue 1: Hemisphere & Climate (Free) */}
          <div className="border border-terrain/30 rounded-2xl p-4 bg-white/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                Clue 01 • Atmospheric Intel
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal-lime/30 text-carbon border border-signal-lime/50 font-semibold">
                FREE CLUE
              </span>
            </div>
            <div className="text-sm font-normal text-carbon pt-1">
              <p><strong>Hemisphere:</strong> {location.hints.hemisphere}</p>
              <p className="text-xs text-terrain mt-1"><strong>Terrain &amp; Climate:</strong> {location.hints.climate}</p>
            </div>
          </div>

          {/* Clue 2: Driving Side (-250 pts) */}
          <div className="border border-terrain/30 rounded-2xl p-4 bg-white/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                Clue 02 • Road Markings &amp; Traffic
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-terrain/15 text-terrain border border-terrain/30">
                -250 PTS
              </span>
            </div>

            {unlockedClues.has(2) ? (
              <div className="pt-2 text-sm font-medium text-carbon flex items-center gap-2">
                <Check className="w-4 h-4 text-signal-lime" />
                <span>Vehicle Driving Side: <strong>{location.hints.drivingSide}-Hand Drive</strong></span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-terrain italic">Traffic flow direction redacted</span>
                <button
                  onClick={() => onUnlockClue(2, 250)}
                  className="cursor-pointer text-xs font-mono px-3 py-1.5 rounded-xl bg-carbon text-paper hover:bg-carbon/80 transition-colors"
                >
                  Reveal (-250 pts)
                </button>
              </div>
            )}
          </div>

          {/* Clue 3: Native Script / Language (-500 pts) */}
          <div className="border border-terrain/30 rounded-2xl p-4 bg-white/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                Clue 03 • Native Script &amp; Signage
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mist/30 text-carbon border border-mist/60">
                -500 PTS
              </span>
            </div>

            {unlockedClues.has(3) ? (
              <div className="pt-2 text-sm font-medium text-carbon">
                <span className="font-playwrite text-lg text-carbon block mb-1">
                  {location.hints.scriptHint}
                </span>
                <span className="text-xs text-terrain">Bilingual / local linguistic signatures</span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-terrain italic">Linguistic alphabet sample redacted</span>
                <button
                  onClick={() => onUnlockClue(3, 500)}
                  className="cursor-pointer text-xs font-mono px-3 py-1.5 rounded-xl bg-mist text-carbon hover:bg-mist/80 transition-colors font-medium"
                >
                  Reveal (-500 pts)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-terrain/25 bg-paper flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 rounded-xl bg-carbon text-paper text-xs font-mono hover:bg-carbon/90 transition-colors"
          >
            Close Intel
          </button>
        </div>
      </div>
    </div>
  );
}
