"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Terminal, Globe, Compass, Radio, Volume2, VolumeX, Shield, Code2 } from "lucide-react";

interface FooterProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHowToPlay: () => void;
}

export default function Footer({
  soundEnabled,
  onToggleSound,
  onOpenHowToPlay,
}: FooterProps) {
  const [utcTime, setUtcTime] = useState<string>("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().slice(17, 25) + " UTC"
      );
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
    { name: "Carbon", hex: "#171815", bg: "bg-carbon" },
    { name: "Paper", hex: "#F0EFE6", bg: "bg-paper" },
    { name: "Signal Lime", hex: "#D7F36A", bg: "bg-signal-lime" },
    { name: "Terrain", hex: "#858779", bg: "bg-terrain" },
    { name: "Mist", hex: "#B7A7D9", bg: "bg-mist" },
  ];

  return (
    <footer className="relative mt-20 border-t border-terrain/30 bg-paper text-carbon overflow-hidden">
      {/* Top Telemetry Strip */}
      <div className="border-b border-terrain/20 py-3 px-4 sm:px-8 bg-black/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-terrain">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span className="text-carbon font-medium uppercase tracking-wider">
              Telemetry Status: Active
            </span>
            <span className="text-terrain/50">•</span>
            <span>SAT PING: 24ms</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-carbon font-medium">{utcTime || "00:00:00 UTC"}</span>
            <span className="text-terrain/50 hidden sm:inline">•</span>
            <span className="hidden sm:inline">PROJECTION: SPHERICAL 360°</span>
          </div>
        </div>
      </div>

      {/* Main Architectural Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand & Editorial Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-carbon/5 border border-terrain/30 flex items-center justify-center">
                <Image
                  src="/logo-navbar.png"
                  alt="unkn"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-playwrite text-3xl tracking-tight text-carbon">unkn</span>
                <span className="block text-[11px] font-mono text-terrain uppercase tracking-widest -mt-1">
                  cartography &amp; geo-recon
                </span>
              </div>
            </div>

            <p className="text-sm font-light text-carbon/80 max-w-md leading-relaxed">
              A minimalist GeoGuessr alternative built for pure geographical instinct. No clutter, no dark patterns — just high-resolution street reconnaissance, topography, and editorial clarity.
            </p>

            <div className="pt-2">
              <span className="font-playwrite text-xl sm:text-2xl text-terrain block">
                &ldquo;Every coordinate has a memory.&rdquo;
              </span>
            </div>

            {/* Design System Swatches Bar */}
            <div className="pt-4 border-t border-terrain/20">
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

          {/* Tactical Keyboard Shortcuts (4 cols) */}
          <div className="lg:col-span-4 border-y lg:border-y-0 lg:border-x border-terrain/25 py-8 lg:py-0 lg:px-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-carbon">
              <Terminal className="w-4 h-4 text-terrain" />
              <span>Tactical Keybindings</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/40 border border-terrain/20">
                <span className="text-terrain">Select / Confirm Guess</span>
                <kbd className="px-2 py-1 rounded bg-paper border border-terrain/40 text-carbon shadow-2xs text-[11px]">
                  SPACE / ENTER
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/40 border border-terrain/20">
                <span className="text-terrain">Reset Camera to North</span>
                <kbd className="px-2 py-1 rounded bg-paper border border-terrain/40 text-carbon shadow-2xs text-[11px]">
                  R
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/40 border border-terrain/20">
                <span className="text-terrain">Toggle Field Intelligence</span>
                <kbd className="px-2 py-1 rounded bg-paper border border-terrain/40 text-carbon shadow-2xs text-[11px]">
                  I
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/40 border border-terrain/20">
                <span className="text-terrain">Audio &amp; SFX Haptics</span>
                <button
                  onClick={onToggleSound}
                  className="cursor-pointer text-[10px] px-2 py-1 rounded bg-carbon text-paper hover:bg-carbon/80 transition-colors inline-flex items-center gap-1"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3 h-3 text-signal-lime" />
                      <span>ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3 h-3 text-terrain" />
                      <span>MUTED</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-terrain font-light pt-2">
              Pro-tip: Inspect sunlight angle and road bollard colors to deduce latitude in seconds.
            </p>
          </div>

          {/* Engine & Recon Specs (3 cols) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-carbon mb-3">
                <Radio className="w-4 h-4 text-terrain" />
                <span>Recon Specs</span>
              </div>

              <ul className="space-y-2 text-xs font-mono text-terrain">
                <li className="flex justify-between border-b border-terrain/15 pb-1">
                  <span>Cartography:</span>
                  <span className="text-carbon">Google Maps API</span>
                </li>
                <li className="flex justify-between border-b border-terrain/15 pb-1">
                  <span>Engine:</span>
                  <span className="text-carbon">Next.js 16 Turbo</span>
                </li>
                <li className="flex justify-between border-b border-terrain/15 pb-1">
                  <span>Styling:</span>
                  <span className="text-carbon">Tailwind CSS v4</span>
                </li>
                <li className="flex justify-between border-b border-terrain/15 pb-1">
                  <span>Mode:</span>
                  <span className="text-carbon font-semibold">Strict Light Mode</span>
                </li>
                <li className="flex justify-between border-b border-terrain/15 pb-1">
                  <span>Typography:</span>
                  <span className="text-carbon">Geist + Playwrite</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenHowToPlay}
                className="cursor-pointer w-full py-2.5 px-4 rounded-xl border border-terrain/40 hover:border-carbon text-xs font-medium text-carbon hover:bg-white/50 transition-all text-center block"
              >
                Read Field Manual →
              </button>
            </div>
          </div>
        </div>

        {/* Large Brutalist Watermark */}
        <div className="mt-12 pt-8 border-t border-terrain/25 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-terrain">
          <div className="flex items-center gap-3">
            <span className="font-playwrite text-base text-carbon">unkn</span>
            <span>•</span>
            <span>© 2026 unkn reconnaissance studio</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-terrain">GEO-01 // MVP RELEASE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-lime" />
            <span className="text-[11px] text-carbon">PAPER #F0EFE6 &amp; CARBON #171815</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
