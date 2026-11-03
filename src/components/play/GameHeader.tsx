"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User, ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/firebase/authContext";

interface GameHeaderProps {
  currentRound: number; // 1 to 10
  totalRounds: number; // 10
  correctCount: number;
  pastResults: boolean[]; // array of true/false for completed rounds
  isPlaying: boolean;
  onOpenAuth: () => void;
}

export default function GameHeader({
  currentRound,
  totalRounds,
  correctCount,
  pastResults,
  isPlaying,
  onOpenAuth,
}: GameHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleExitClick = (e: React.MouseEvent) => {
    if (isPlaying && currentRound > 0 && currentRound <= totalRounds) {
      e.preventDefault();
      setShowExitConfirm(true);
    } else {
      router.push("/games");
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    router.push("/games");
  };

  const formattedRound = String(Math.min(currentRound, totalRounds)).padStart(2, "0");
  const formattedTotal = String(totalRounds).padStart(2, "0");

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-terrain/25 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExitClick}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Return to Games"
            >
              <div className="w-8 h-8 rounded-xl bg-carbon/5 border border-terrain/30 flex items-center justify-center overflow-hidden group-hover:border-carbon transition-colors">
                <Image
                  src="/logo-navbar.png"
                  alt="UNKN"
                  width={24}
                  height={24}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-playwrite text-2xl tracking-tight text-carbon">unkn</span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-mono text-terrain border border-terrain/40 px-1.5 py-0.2 rounded">
                  ROUND {formattedRound}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Round & Progress Tracking */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-carbon font-medium">
                Round <strong className="text-carbon font-semibold">{formattedRound}</strong> of {formattedTotal}
              </span>
              <span className="text-terrain/40">•</span>
              <span className="text-terrain">
                <strong className="text-carbon font-semibold">{correctCount}</strong> / {totalRounds} Correct
              </span>
            </div>

            {/* 10 Compact Progress Segments */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalRounds }).map((_, i) => {
                const isPast = i < pastResults.length;
                const isCurrent = i === currentRound - 1;
                const isCorrect = pastResults[i] === true;

                return (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isPast
                        ? isCorrect
                          ? "w-4 sm:w-6 bg-signal-lime ring-1 ring-carbon/20"
                          : "w-4 sm:w-6 bg-terrain"
                        : isCurrent
                        ? "w-6 sm:w-8 bg-carbon animate-pulse"
                        : "w-3 sm:w-5 bg-terrain/25"
                    }`}
                    title={`Round ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: Auth Profile & Exit */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAuth}
              className="cursor-pointer text-xs font-mono px-3 py-1.5 rounded-full border border-terrain/35 hover:border-carbon text-terrain hover:text-carbon transition-colors flex items-center gap-1.5 bg-white/40"
              title="Account / Authentication"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline max-w-[110px] truncate">
                {user ? user.email?.split("@")[0] || "Player" : "Guest"}
              </span>
            </button>

            <button
              onClick={handleExitClick}
              className="cursor-pointer p-2 rounded-full border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors"
              title="Leave Game"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-paper border border-terrain/35 rounded-3xl p-6 shadow-2xl space-y-5 text-carbon">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-carbon/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-carbon" />
              </div>
              <div>
                <h3 className="text-lg font-space font-medium">Leave Game?</h3>
                <span className="text-[11px] font-mono text-terrain uppercase">Round {currentRound} of 10</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-terrain leading-relaxed">
              Are you sure you want to exit? Your progress in this 10-round game will be lost.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="cursor-pointer px-4 py-2 rounded-xl border border-terrain/35 hover:border-carbon text-xs font-mono text-carbon transition-colors"
              >
                Keep Playing
              </button>
              <button
                onClick={confirmExit}
                className="cursor-pointer px-4 py-2 rounded-xl bg-carbon text-paper hover:bg-carbon/90 text-xs font-mono transition-colors"
              >
                Leave Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
