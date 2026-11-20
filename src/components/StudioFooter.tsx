"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ExternalLink, ArrowRight } from "lucide-react";

export default function StudioFooter() {
  const [utcTime, setUtcTime] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + " UTC");
      setCurrentYear(now.getFullYear());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyColor = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(name);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const TOKENS = [
    { name: "Carbon", hex: "#171815" },
    { name: "Paper", hex: "#F0EFE6" },
    { name: "Signal Lime", hex: "#D7F36A" },
    { name: "Terrain", hex: "#858779" },
    { name: "Mist", hex: "#B7A7D9" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-terrain/30 bg-paper text-carbon overflow-hidden">
      {/* Top Telemetry Strip */}
      <div className="border-b border-terrain/20 py-3 px-4 sm:px-8 bg-black/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-terrain">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span className="text-carbon font-medium uppercase tracking-wider">
              Studio Operations: Active · Sovereign Software &amp; Experiments
            </span>
            <span className="text-terrain/50">•</span>
            <span>Available for Select Commissions</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-carbon font-medium">{utcTime || "00:00:00 UTC"}</span>
            <span className="text-terrain/50 hidden sm:inline">•</span>
            <span className="hidden sm:inline">100% On-Device Respect &amp; Clean Code</span>
          </div>
        </div>
      </div>

      {/* Main Architectural Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Studio Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                <Image
                  src="/logo-clear.png"
                  alt="xweet"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <span className="font-playwrite text-3xl tracking-tight text-carbon">xweet</span>
            </div>

            <p className="text-sm font-light text-carbon/80 max-w-md leading-relaxed">
              An independent software studio crafting sovereign web utilities, 120 FPS mobile apps, and cartographic games. Built with precision, restraint, and zero synthetic bloat.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon text-xs font-semibold transition-all border border-signal-lime/90 shadow-2xs"
              >
                <span>Inquire About Commissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Design Tokens Palette Bar */}
            <div className="pt-3 border-t border-terrain/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-terrain">
                  Design Tokens
                </span>
                {copiedHex && (
                  <span className="text-[10px] font-mono text-carbon font-semibold">
                    Copied {copiedHex}!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {TOKENS.map((token) => (
                  <button
                    key={token.name}
                    onClick={() => copyColor(token.hex, token.name)}
                    className="cursor-pointer group relative flex items-center gap-1.5 px-2 py-1 rounded-lg border border-terrain/30 hover:border-carbon transition-colors bg-white/40"
                    title={`Click to copy ${token.name} (${token.hex})`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: token.hex }}
                    />
                    <span className="text-[10px] font-mono text-terrain group-hover:text-carbon">
                      {token.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Software Releases (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
              Releases &amp; Apps
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://wallpaper.xweet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-carbon text-terrain transition-colors flex items-center justify-between group"
                >
                  <span>Wallpapers (4K/5K)</span>
                  <span className="text-[9px] bg-black/5 text-terrain px-1.5 py-0.2 rounded border border-terrain/20">
                    UHD
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://infyn.software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-carbon text-terrain transition-colors flex items-center justify-between group"
                >
                  <span>Infyn DL &amp; Suite</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://smiley.xweet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-carbon text-terrain transition-colors flex items-center justify-between group"
                >
                  <span>Smiley PDF (Android)</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <Link
                  href="/unkn"
                  className="hover:text-carbon text-carbon font-medium transition-colors flex items-center justify-between group"
                >
                  <span>unkn (Geography Game)</span>
                  <span className="text-[10px] bg-signal-lime text-carbon px-1.5 py-0.2 rounded font-semibold">
                    PLAY
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wordle"
                  className="hover:text-carbon text-carbon font-medium transition-colors flex items-center justify-between group"
                >
                  <span>Wordle (Word Game)</span>
                  <span className="text-[10px] bg-mist/70 text-carbon px-1.5 py-0.2 rounded font-semibold">
                    PLAY
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="https://indivio.xweet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-carbon text-terrain transition-colors flex items-center justify-between group"
                >
                  <span>Indivio Logistics</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <Link
                  href="/apps"
                  className="hover:text-carbon text-carbon font-semibold transition-colors block pt-1.5 border-t border-terrain/15"
                >
                  View All Apps &amp; Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
              Studio
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/apps" className="text-carbon font-medium hover:text-black transition-colors flex items-center gap-1.5">
                  <span>Apps Catalog</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />
                </Link>
              </li>
              <li>
                <Link href="/#releases" className="text-terrain hover:text-carbon transition-colors">
                  Software Releases
                </Link>
              </li>
              <li>
                <Link href="/#ethos" className="text-terrain hover:text-carbon transition-colors">
                  Studio Ethos
                </Link>
              </li>
              <li>
                <Link href="/#commissions" className="text-terrain hover:text-carbon transition-colors">
                  Select Commissions
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-terrain hover:text-carbon transition-colors">
                  Games Hub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-carbon font-semibold hover:underline transition-colors">
                  Inquire
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Network (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="mailto:contact@xweet.in"
                  className="text-signal-lime font-semibold hover:underline transition-colors block"
                >
                  contact@xweet.in
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/imvicky69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terrain hover:text-carbon transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terrain hover:text-carbon transition-colors flex items-center gap-1.5"
                >
                  <span>X / Twitter</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-terrain hover:text-carbon transition-colors flex items-center gap-1"
                >
                  <span>Inquiry Form</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

            {/* Bottom Colophon Bar */}
            <div className="pt-10 mt-10 border-t border-terrain/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-terrain">
              <div className="flex items-center gap-2">
                <span>© {currentYear} Xweet Studio.</span>
                <span>Crafted with precision &amp; restraint.</span>
              </div>

                <div className="flex items-center gap-6">
                  <span className="hidden sm:inline">Strict Light Mode • Sovereign Architecture</span>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-carbon flex items-center gap-1 cursor-pointer transition-colors"
                    aria-label="Scroll back to top"
                  >
                    <span>Back to Top</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </footer>
          );
}
