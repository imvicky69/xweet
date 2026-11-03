"use client";

import { X, Compass } from "lucide-react";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-paper border border-terrain/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-carbon">
        <div className="p-6 border-b border-terrain/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-signal-lime/25 border border-signal-lime/50 flex items-center justify-center">
              <Compass className="w-5 h-5 text-carbon" />
            </div>
            <div>
              <h3 className="text-xl font-space font-medium tracking-tight">How to Play</h3>
              <p className="text-xs text-terrain">Quick 3-step guide</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-carbon/10 text-terrain hover:text-carbon transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm font-normal text-carbon/90 max-h-[65vh] overflow-y-auto">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-carbon text-paper text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-semibold text-carbon font-space">Explore the 360° Street View</h4>
              <p className="text-xs text-terrain mt-0.5 leading-relaxed">
                Pan, tilt, zoom, and click along roads. Observe road markings, driving side (left vs right), sun angle, vegetation, and language signs.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-carbon text-paper text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-semibold text-carbon font-space">Search &amp; Pick a Country</h4>
              <p className="text-xs text-terrain mt-0.5 leading-relaxed">
                Open the dropdown and type any country name or code. Use arrow keys or click to select, then click &ldquo;Submit Guess&rdquo;.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-carbon text-paper text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-semibold text-carbon font-space">10 Rounds &amp; Scoring</h4>
              <p className="text-xs text-terrain mt-0.5 leading-relaxed">
                Each game has 10 rounds. You earn 1 point for every correct country (max 10 points). At the end, you will receive a full breakdown of all your guesses.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-terrain/25 bg-paper flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-6 py-2.5 rounded-xl bg-signal-lime text-carbon font-semibold text-xs font-mono uppercase tracking-wider hover:brightness-105 transition-all shadow-xs"
          >
            Got It, Let&apos;s Play
          </button>
        </div>
      </div>
    </div>
  );
}
