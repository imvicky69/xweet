"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function StudioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isGames =
    pathname.startsWith("/games") || pathname.startsWith("/unkn") || pathname.startsWith("/wordle");
  const isApps = pathname.startsWith("/apps");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const navItems = [
    { label: "Apps", href: "/apps", active: isApps },
    { label: "Games", href: "/games", active: isGames },
    { label: "About", href: "/about", active: isAbout },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md border-b border-terrain/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-white/80 border border-terrain/25 p-1 group-hover:border-carbon transition-colors">
            <Image
              src="/logo-clear.png"
              alt="xweet"
              width={26}
              height={26}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-playwrite text-2xl sm:text-[26px] tracking-tight text-carbon group-hover:opacity-85 transition-opacity">
            xweet
          </span>
        </Link>

        {/* Center Floating Pill Nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 rounded-full border border-terrain/25 bg-white/65 p-1 shadow-2xs"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                item.active
                  ? "bg-carbon text-signal-lime font-semibold shadow-2xs"
                  : "text-terrain hover:text-carbon hover:bg-paper/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Single Clean CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/contact"
            className={`cursor-pointer font-mono text-xs px-4 sm:px-5 py-2 rounded-full transition-all inline-flex items-center gap-1.5 border ${
              isContact
                ? "bg-signal-lime text-carbon border-carbon font-semibold"
                : "bg-carbon hover:bg-carbon/90 text-paper border-carbon"
            }`}
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-signal-lime" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full border border-terrain/30 bg-white/60 text-carbon hover:border-carbon transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-terrain/20 bg-paper px-4 py-4 space-y-2">
          <nav className="flex flex-col gap-1.5 font-mono text-xs">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-2xl flex items-center justify-between transition-colors ${
                  item.active
                    ? "bg-carbon text-signal-lime font-semibold"
                    : "bg-white/60 text-carbon border border-terrain/20"
                }`}
              >
                <span>{item.label}</span>
                {item.active && <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
