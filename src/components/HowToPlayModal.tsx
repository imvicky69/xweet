"use client";

import { X, Compass, Globe, Award, CheckCircle2 } from "lucide-react";

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
              <h3 className="text-xl font-space font-medium tracking-tight">How to Play UNKN</h3>
              <p className="text-xs text-terrain">Field Reconnaissance Expedition Manual</p>
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
              <h4 className="font-semibold text-carbon font-space">Inspect the 360° Street View</h4>
              <p className="text-xs text-terrain mt-0.5 leading-relaxed">
                Pan, tilt, and zoom around the viewport. Observe solar azimuth, road surface markings, vehicle driving side (LHD vs RHD), landscape biomes, and architectural vernacular.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-carbon text-paper text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-semibold text-carbon font-space">Deduce Sovereign Country</h4>
              <p className="text-xs text-terrain mt-0.5 leading-relaxed">
                Use the searchable country selector dropdown. Filter by name or code and select the country you believe you are in.
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
                Each expedition consists of exactly 10 rounds. You earn 1 point for a correct answer and 0 points for a miss. The maximum score is 10. Complete all ten rounds to receive your expedition audit report.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-terrain/25 bg-paper flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-6 py-2.5 rounded-xl bg-signal-lime text-carbon font-semibold text-xs font-mono uppercase tracking-wider hover:brightness-105 transition-all shadow-xs"
          >
            Ready for Recon
          </button>
        </div>
      </div>
    </div>
  );
}
