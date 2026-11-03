"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Menu, X } from "lucide-react";

export default function StudioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-terrain/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-normal text-carbon/80">
          <Link
            href="/#services"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            Services
          </Link>
          <Link
            href="/#work"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="hover:text-carbon transition-colors text-xs uppercase tracking-wider font-mono text-terrain hover:text-black"
          >
            About Us
          </Link>
          <Link
            href="/games"
            className="text-xs uppercase tracking-wider font-mono text-carbon font-medium hover:text-black flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-terrain" />
            <span>Games</span>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />
          </Link>
        </nav>

        {/* Right Action: Contact Now */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 border border-signal-lime/90 group"
          >
            <span>Contact Now</span>
            <ArrowRight className="w-4 h-4 text-carbon group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl border border-terrain/30 text-carbon hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-terrain/25 bg-paper px-6 py-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-terrain">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-carbon hover:text-carbon py-1.5 border-b border-terrain/15"
            >
              01 // Services
            </Link>
            <Link
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-carbon hover:text-carbon py-1.5 border-b border-terrain/15"
            >
              02 // Work &amp; Case Studies
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-carbon hover:text-carbon py-1.5 border-b border-terrain/15"
            >
              03 // About Us &amp; Journey
            </Link>
            <Link
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="text-carbon font-semibold py-1.5 flex items-center justify-between border-b border-terrain/15"
            >
              <span>04 // Interactive Games (unkn)</span>
              <span className="text-[10px] bg-signal-lime text-carbon px-2 py-0.5 rounded-full font-bold">
                PLAY
              </span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-carbon font-semibold py-2 text-sm flex items-center gap-2"
            >
              <span>Contact Us Directly →</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
