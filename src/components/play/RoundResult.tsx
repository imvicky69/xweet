"use client";

import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Country } from "@/data/countries";

interface RoundResultProps {
  isCorrect: boolean;
  actualCountry: Country;
  selectedCountry: Country;
  pointsEarned: number;
  currentRound: number;
  totalRounds: number;
  onNextRound: () => void;
}

export default function RoundResult({
  isCorrect,
  actualCountry,
  selectedCountry,
  pointsEarned,
  currentRound,
  totalRounds,
  onNextRound,
}: RoundResultProps) {
  const isFinal = currentRound >= totalRounds;

  return (
    <div className="w-full bg-paper border border-terrain/35 rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 transition-all animate-in fade-in slide-in-from-bottom-2 text-carbon">
      {/* Left: Verdict Status Badge */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
            isCorrect
              ? "bg-signal-lime/30 border-signal-lime text-carbon"
              : "bg-carbon/5 border-terrain/40 text-terrain"
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-7 h-7 text-carbon" />
          ) : (
            <XCircle className="w-7 h-7 text-terrain" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                isCorrect
                  ? "bg-signal-lime text-carbon"
                  : "bg-terrain/20 text-terrain"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
            <span className="text-xs font-mono text-terrain">
              +{pointsEarned} {pointsEarned === 1 ? "Point" : "Points"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-space font-medium text-carbon mt-1">
            {actualCountry.name} <span className="text-xl">{actualCountry.flag}</span>
          </h3>
        </div>
      </div>

      {/* Center: Comparison pill */}
      <div className="flex items-center gap-3 text-xs font-mono w-full md:w-auto justify-start md:justify-center p-3 rounded-2xl bg-white/40 border border-terrain/20">
        <div className="space-y-0.5">
          <span className="text-terrain text-[10px] uppercase block">Your Guess</span>
          <span className="font-semibold text-carbon inline-flex items-center gap-1.5">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </span>
        </div>

        <div className="h-6 w-px bg-terrain/30 mx-2" />

        <div className="space-y-0.5">
          <span className="text-terrain text-[10px] uppercase block">Actual Country</span>
          <span className="font-semibold text-carbon inline-flex items-center gap-1.5">
            <span>{actualCountry.flag}</span>
            <span>{actualCountry.name}</span>
          </span>
        </div>
      </div>

      {/* Right: Next Round CTA */}
      <div className="w-full md:w-auto">
        <button
          onClick={onNextRound}
          className="w-full md:w-auto px-7 py-3.5 rounded-2xl bg-carbon hover:bg-carbon/90 text-paper font-semibold text-xs sm:text-sm font-mono tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
        >
          <span>{isFinal ? "See Final Results →" : `Next Round (${currentRound + 1}/10) →`}</span>
          <ArrowRight className="w-4 h-4 text-signal-lime" />
        </button>
      </div>
    </div>
  );
}
