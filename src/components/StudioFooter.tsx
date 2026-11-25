"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function StudioFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-terrain/25 bg-paper text-carbon mt-20 relative overflow-hidden">
      {/* 1. Clean Top Editorial Strip */}
      <div className="border-b border-terrain/20 bg-white/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-terrain font-semibold flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-lime" />
                <span>Xweet Ecosystem</span>
              </span>
              <h2 className="font-space text-2xl sm:text-3xl font-medium tracking-tight text-carbon leading-tight">
                Crafted with precision &amp; restraint.
              </h2>
              <p className="text-xs sm:text-sm text-terrain font-light leading-relaxed">
                Sovereign browser tools, ad-free Android apps, games, and Indivio food delivery — built independently.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <nav className="flex flex-wrap items-center gap-4 text-xs font-mono text-terrain">
                <Link href="/apps" className="hover:text-carbon transition-colors">
                  Apps
                </Link>
                <Link href="/about" className="hover:text-carbon transition-colors">
                  About
                </Link>
                <Link href="/games" className="hover:text-carbon transition-colors">
                  Games
                </Link>
                <Link href="/contact" className="hover:text-carbon transition-colors">
                  Contact
                </Link>
              </nav>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 h-9 px-4 bg-white/70 hover:bg-white text-carbon font-mono text-[11px] font-medium border border-terrain/30 hover:border-carbon rounded-full transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Massive Minimalist Architectural Sign-off */}
      <div className="w-full overflow-hidden select-none pointer-events-none -my-3 sm:-my-6 flex justify-center">
        <span className="font-space text-[20vw] sm:text-[17vw] font-bold tracking-tighter text-carbon/[0.05] leading-none whitespace-nowrap uppercase">
          XWEET
        </span>
      </div>

      {/* 3. Bottom Hairline Strip */}
      <div className="border-t border-terrain/20 bg-white/45 relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-8 py-4 text-[11px] font-mono text-terrain">
          <div className="flex items-center gap-2.5">
            <div className="relative h-5 w-5 rounded-full overflow-hidden bg-white border border-terrain/30 flex items-center justify-center shrink-0">
              <Image
                src="/logo-clear.png"
                alt="Xweet"
                fill
                sizes="20px"
                className="object-contain p-0.5"
              />
            </div>
            <span className="font-semibold text-carbon tracking-wide">XWEET</span>
            <span className="text-terrain/40">•</span>
            <span>© 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/imvicky69"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-carbon transition-colors"
            >
              GitHub
            </a>
            <span className="text-terrain/40">•</span>
            <a
              href="https://instagram.com/xweet_69"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-carbon transition-colors"
            >
              @xweet_69
            </a>
            <span className="text-terrain/40">•</span>
            <a
              href="mailto:hello@xweet.in"
              className="hover:text-carbon transition-colors"
            >
              hello@xweet.in
            </a>
            <span className="text-terrain/40">•</span>
            <Link href="/games/privacy" className="hover:text-carbon transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
