"use client";

import Link from "next/link";
import { Award, RotateCcw, Home, Check, X, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/lib/firebase/authContext";

export interface SummaryRoundItem {
  roundNumber: number;
  actualCountry: { name: string; code: string; flag: string };
  selectedCountry: { name: string; code: string; flag: string };
  isCorrect: boolean;
  points: number;
  coordinates?: { lat: number; lng: number };
}

interface ExpeditionSummaryProps {
  finalScore: number;
  totalRounds: number;
  correctCount: number;
  accuracyPercentage: number;
  rounds: SummaryRoundItem[];
  onPlayAgain: () => void;
  isSaved?: boolean;
  onOpenAuth: () => void;
}

export default function ExpeditionSummary({
  finalScore,
  totalRounds,
  correctCount,
  accuracyPercentage,
  rounds,
  onPlayAgain,
  isSaved,
  onOpenAuth,
}: ExpeditionSummaryProps) {
  const { user, isConfigured } = useAuth();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 text-carbon py-4">
      {/* Top Header Card */}
      <div className="border border-terrain/35 rounded-3xl p-8 sm:p-10 bg-white/60 backdrop-blur-md shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-terrain/25 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              Expedition Completed • Reconnaissance Debrief
            </span>
            <h1 className="text-3xl sm:text-4xl font-space font-medium text-carbon">
              Global Cartography Assessment
            </h1>
            <p className="text-xs sm:text-sm text-terrain font-light">
              Official ten-round reconnaissance mission evaluation across world sovereign borders.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {isSaved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-signal-lime/25 text-carbon border border-signal-lime/60">
                <ShieldCheck className="w-4 h-4 text-carbon" />
                <span>Expedition Saved</span>
              </span>
            ) : user ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-terrain/15 text-terrain">
                <span>Saving to Firestore...</span>
              </span>
            ) : isConfigured ? (
              <button
                onClick={onOpenAuth}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-terrain/40 hover:border-carbon text-terrain hover:text-carbon transition-colors bg-white/50"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign in to save record</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Score Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
            <span className="text-[11px] font-mono text-terrain uppercase block">Final Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-carbon">
                {finalScore}
              </span>
              <span className="text-sm font-mono text-terrain">/ {totalRounds}</span>
            </div>
            <span className="text-[11px] font-mono text-terrain block pt-1">
              1 point awarded per exact sovereign match
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
            <span className="text-[11px] font-mono text-terrain uppercase block">Accuracy Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-carbon">
                {accuracyPercentage}%
              </span>
            </div>
            <span className="text-[11px] font-mono text-terrain block pt-1">
              {correctCount} correct out of {totalRounds} territories
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
            <span className="text-[11px] font-mono text-terrain uppercase block">Status Rating</span>
            <div className="text-2xl sm:text-3xl font-space font-medium text-carbon pt-1">
              {finalScore >= 8 ? "Master Navigator" : finalScore >= 5 ? "Senior Scout" : "Cadet Observer"}
            </div>
            <span className="text-[11px] font-mono text-terrain block pt-1">
              Calculated on verified coordinates
            </span>
          </div>
        </div>
      </div>

      {/* Round-by-Round Expeditions Log */}
      <div className="border border-terrain/35 rounded-3xl p-6 sm:p-8 bg-paper shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
          <h3 className="text-lg font-space font-medium text-carbon">Ten-Round Territory Log</h3>
          <span className="text-xs font-mono text-terrain uppercase">Audit Trail</span>
        </div>

        <div className="divide-y divide-terrain/15">
          {rounds.map((r) => (
            <div
              key={r.roundNumber}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-carbon/5 border border-terrain/30 flex items-center justify-center font-bold text-terrain shrink-0">
                  {String(r.roundNumber).padStart(2, "0")}
                </span>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-sm text-carbon font-normal">
                    <span>{r.actualCountry.flag}</span>
                    <span className="font-medium">{r.actualCountry.name}</span>
                    <span className="text-xs text-terrain font-mono">({r.actualCountry.code})</span>
                  </div>
                  {r.coordinates && (
                    <span className="text-[10px] text-terrain block">
                      COORDS: {r.coordinates.lat.toFixed(4)}°, {r.coordinates.lng.toFixed(4)}°
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-[10px] text-terrain block">GUESSED</span>
                  <span className="text-carbon font-medium inline-flex items-center gap-1">
                    <span>{r.selectedCountry.flag}</span>
                    <span>{r.selectedCountry.name}</span>
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 ${
                    r.isCorrect
                      ? "bg-signal-lime text-carbon border-signal-lime"
                      : "bg-terrain/20 text-terrain border-terrain/30"
                  }`}
                >
                  {r.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="cursor-pointer w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-terrain/40 hover:border-carbon text-carbon font-medium text-xs sm:text-sm font-mono tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Base Station</span>
        </Link>

        <button
          onClick={onPlayAgain}
          className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm font-mono tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102 active:scale-98 border border-signal-lime/80"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Launch New Expedition</span>
        </button>
      </div>
    </div>
  );
}
