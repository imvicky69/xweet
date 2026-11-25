"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Compass, Menu, X } from "lucide-react";

export default function StudioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isGames = pathname.startsWith("/games") || pathname.startsWith("/unkn") || pathname.startsWith("/wordle");
  const isApps = pathname.startsWith("/apps");
  const isAbout = pathname.startsWith("/about");

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-terrain/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            <Image
              src="/logo-clear.png"
              alt="xweet"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-playwrite text-2xl sm:text-3xl tracking-tight text-carbon group-hover:opacity-90 transition-opacity">
            xweet
          </span>
          <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-terrain/80 border border-terrain/30 px-2 py-0.5 rounded-full ml-1">
            Studio
          </span>
        </Link>

        {/* Desktop Navigation Links: ONLY Games, Apps, About */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-carbon/80">
          <Link
            href="/games"
            className={`transition-colors text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 ${
              isGames
                ? "text-carbon font-semibold bg-black/5 px-3 py-1 rounded-full border border-terrain/30 shadow-2xs"
                : "text-terrain hover:text-carbon"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-terrain" />
            <span>Games</span>
            {isGames && <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />}
          </Link>

          <Link
            href="/apps"
            className={`transition-colors text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 ${
              isApps
                ? "text-carbon font-semibold bg-black/5 px-3 py-1 rounded-full border border-terrain/30 shadow-2xs"
                : "text-terrain hover:text-carbon"
            }`}
          >
            <span>Apps</span>
            {isApps && <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />}
          </Link>

          <Link
            href="/about"
            className={`transition-colors text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 ${
              isAbout
                ? "text-carbon font-semibold bg-black/5 px-3 py-1 rounded-full border border-terrain/30 shadow-2xs"
                : "text-terrain hover:text-carbon"
            }`}
          >
            <span>About</span>
            {isAbout && <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />}
          </Link>
        </nav>

        {/* Right: Exactly ONE CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/contact"
            className="cursor-pointer bg-carbon hover:bg-carbon/85 text-paper font-mono text-xs px-4 sm:px-6 py-2.5 rounded-full transition-all duration-200 shadow-2xs flex items-center gap-2 hover:scale-102 active:scale-98 border border-carbon group"
          >
            <span>Inquire</span>
            <ArrowRight className="w-3.5 h-3.5 text-signal-lime group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl border border-terrain/30 text-carbon hover:bg-black/5 transition-colors touch-manipulation"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Adaptive phone responsiveness) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-terrain/25 bg-paper px-6 py-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col space-y-1 font-mono text-xs uppercase tracking-wider text-terrain">
            <Link
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 flex items-center justify-between border-b border-terrain/15 ${
                isGames ? "text-carbon font-semibold" : "text-carbon/90 hover:text-carbon"
              }`}
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-terrain" />
                <span>Games &amp; Puzzles</span>
              </div>
              <span className="text-[10px] bg-signal-lime text-carbon px-2 py-0.5 rounded-full font-bold">
                PLAY
              </span>
            </Link>

            <Link
              href="/apps"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 flex items-center justify-between border-b border-terrain/15 ${
                isApps ? "text-carbon font-semibold" : "text-carbon/90 hover:text-carbon"
              }`}
            >
              <span>Apps &amp; Software</span>
              <span className="text-[10px] bg-black/5 text-terrain px-2 py-0.5 rounded-full border border-terrain/20 font-medium">
                CATALOG
              </span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 border-b border-terrain/15 ${
                isAbout ? "text-carbon font-semibold" : "text-carbon/90 hover:text-carbon"
              }`}
            >
              About &amp; Story
            </Link>

            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold py-3 px-4 rounded-xl flex items-center justify-between text-xs tracking-normal font-sans border border-signal-lime shadow-2xs"
              >
                <span>Inquire About a Project</span>
                <ArrowRight className="w-4 h-4 text-carbon" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
