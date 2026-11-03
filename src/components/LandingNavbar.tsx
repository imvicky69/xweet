"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HelpCircle, ArrowLeft } from "lucide-react";

interface LandingNavbarProps {
  onOpenHowToPlay: () => void;
}

export default function LandingNavbar({ onOpenHowToPlay }: LandingNavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-terrain/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand + Back to Portfolio */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="cursor-pointer hidden lg:inline-flex items-center gap-2 text-xs font-mono text-terrain hover:text-carbon px-3 py-1.5 rounded-xl border border-terrain/25 hover:border-carbon bg-white/40 transition-colors"
            title="Return to xweet"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <div className="relative w-4 h-4 flex items-center justify-center">
              <Image src="/logo-clear.png" alt="Xweet" width={16} height={16} className="object-contain" />
            </div>
            <span>xweet</span>
          </Link>

          <Link href="/games" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-carbon/5 border border-terrain/30 overflow-hidden shadow-2xs group-hover:border-carbon transition-colors">
              <Image
                src="/logo-navbar.png"
                alt="unkn"
                width={36}
                height={36}
                className="object-contain p-1"
                priority
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-playwrite text-2xl tracking-tight text-carbon">unkn</span>
                <span className="text-[10px] uppercase tracking-widest font-mono text-terrain border border-terrain/40 px-1.5 py-0.2 rounded">
                  GEO-01
                </span>
              </div>
              <span className="text-[10px] font-mono text-terrain -mt-1 hidden sm:block">
                guess the country
              </span>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-normal text-carbon/80">
          <a
            href="#preview"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            Viewport
          </a>
          <a
            href="#mechanics"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            How it Works
          </a>
          <a
            href="#intel"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            Security &amp; Rules
          </a>
          <a
            href="#tokens"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            Design Tokens
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHowToPlay}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-terrain/35 hover:border-carbon text-terrain hover:text-carbon text-xs font-mono transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Play</span>
          </button>

          {/* Primary Play Button */}
          <Link
            href="/play"
            className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 border border-signal-lime/80"
          >
            <span>Play unkn</span>
            <ArrowRight className="w-4 h-4 text-carbon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
