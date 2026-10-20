"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, Compass, ArrowRight, RotateCw, MapPin } from "lucide-react";
import { LocationItem, CountryChoice } from "@/data/locations";

interface RoundResultModalProps {
  isOpen: boolean;
  location: LocationItem;
  guessedCountry: CountryChoice | null;
  pointsEarned: number;
  isCorrect: boolean;
  currentRound: number;
  totalRounds: number;
  onNextRound: () => void;
  onPlayAgain: () => void;
}

export default function RoundResultModal({
  isOpen,
  location,
  guessedCountry,
  pointsEarned,
  isCorrect,
  currentRound,
  totalRounds,
  onNextRound,
  onPlayAgain,
}: RoundResultModalProps) {
  useEffect(() => {
    if (isOpen && isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D7F36A", "#B7A7D9", "#171815", "#858779"],
      });
    }
  }, [isOpen, isCorrect]);

  if (!isOpen) return null;

  const isFinalRound = currentRound >= totalRounds;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-paper border border-terrain/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-carbon">
        {/* Banner */}
        <div
          className={`p-6 border-b flex items-center justify-between ${
            isCorrect
              ? "bg-signal-lime/25 border-signal-lime/60"
              : "bg-carbon/5 border-terrain/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-carbon fill-signal-lime" />
            ) : (
              <XCircle className="w-8 h-8 text-terrain" />
            )}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                {isCorrect ? "TARGET CONFIRMED" : "MISCALCULATED"}
              </span>
              <h2 className="text-2xl font-light tracking-tight text-carbon">
                {location.country} {location.flag}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-terrain uppercase block">Earned</span>
            <span className="text-2xl font-semibold font-mono text-carbon">
              +{pointsEarned.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Comparison Details */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 rounded-2xl bg-white/40 border border-terrain/25">
              <span className="text-[10px] font-mono text-terrain uppercase block mb-1">
                Actual Location
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{location.flag}</span>
                <span className="font-medium text-carbon">{location.country}</span>
              </div>
              <span className="text-xs text-terrain font-mono mt-1 block">
                {location.city}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/40 border border-terrain/25">
              <span className="text-[10px] font-mono text-terrain uppercase block mb-1">
                Your Guess
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{guessedCountry?.flag || "❓"}</span>
                <span className="font-medium text-carbon">
                  {guessedCountry?.name || "No Guess"}
                </span>
              </div>
              <span className="text-xs text-terrain font-mono mt-1 block">
                {guessedCountry?.continent || "Unknown"}
              </span>
            </div>
          </div>

          {/* Geographical Field Trivia */}
          <div className="border border-terrain/25 rounded-2xl p-4 bg-paper/60 space-y-1.5">
            <span className="text-[10px] font-mono text-terrain uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-carbon" />
              Field Reconnaissance &amp; Meta Clue
            </span>
            <p className="text-xs text-carbon/90 leading-relaxed font-normal">
              {location.trivia}
            </p>
          </div>

          {/* Coordinates revealed */}
          <div className="flex items-center justify-between text-xs font-mono text-terrain px-1">
            <span>Coordinates:</span>
            <span className="text-carbon font-semibold">
              {location.coordinates.lat.toFixed(4)}° N, {location.coordinates.lng.toFixed(4)}° E
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-terrain/25 bg-paper flex items-center justify-between">
          <span className="text-xs font-mono text-terrain">
            Round {currentRound} of {totalRounds}
          </span>

          {isFinalRound ? (
            <button
              onClick={onPlayAgain}
              className="cursor-pointer px-6 py-3 rounded-2xl bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Play New Game</span>
            </button>
          ) : (
            <button
              onClick={onNextRound}
              className="cursor-pointer px-6 py-3 rounded-2xl bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm shadow-md transition-all flex items-center gap-2 hover:scale-102 active:scale-98"
            >
              <span>Next Territory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
