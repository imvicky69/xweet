"use client";

import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import { ECOSYSTEM_APPS, COMMUNITY_LINKS, type ReleaseStatus } from "@/data/ecosystem";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Mail,
  FlaskConical,
  Users,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

function statusStyle(status: ReleaseStatus): string {
  switch (status) {
    case "Live":
      return "bg-signal-lime/45 border-carbon/20 text-carbon";
    case "Closed Testing":
      return "bg-amber-100/80 border-amber-300 text-amber-900";
    case "GitHub Release":
      return "bg-emerald-100/80 border-emerald-300 text-emerald-900";
    case "In Development":
    case "Coming Soon":
      return "bg-mist/30 border-mist/60 text-carbon";
  }
}

export default function StudioHomePage() {
  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full">
        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-terrain/25">
          <div className="max-w-4xl space-y-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-thin tracking-tight leading-[1.03] text-carbon">
              Independent software built with precision &amp; restraint.
            </h1>

            <p className="text-base sm:text-lg text-carbon/75 max-w-2xl font-light leading-relaxed">
              Xweet is our parent ecosystem for on-device web tools, ad-free Android apps, browser games, and{" "}
              <strong className="font-medium text-carbon">Indivio</strong> food delivery — zero trackers, zero clutter.
            </p>

            {/* Exactly 2 Clean Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/apps"
                className="bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm px-6 py-3.5 rounded-full transition-all shadow-sm inline-flex items-center gap-2 border border-carbon/15"
              >
                <span>Explore All {ECOSYSTEM_APPS.length} Apps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="border border-terrain/40 hover:border-carbon bg-white/50 hover:bg-white text-carbon font-mono text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all inline-flex items-center gap-2"
              >
                <span>About Founder &amp; Story</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM DIRECTORY PREVIEW (CLEAN, UNCLUTTERED GRID) ────────── */}
        <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                Xweet Ecosystem
              </span>
              <h2 className="text-2xl sm:text-4xl font-space font-medium tracking-tight text-carbon mt-1">
                Apps, Tools &amp; Branches
              </h2>
            </div>
            <Link
              href="/apps"
              className="text-xs font-mono font-semibold text-carbon border border-terrain/35 hover:border-carbon bg-white/60 hover:bg-white px-4 py-2 rounded-full transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Full Specs, APKs &amp; Filters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ECOSYSTEM_APPS.map((app) => (
              <Link
                key={app.id}
                href={`/apps#${app.id}`}
                className="group rounded-2xl border border-terrain/30 bg-white/65 hover:bg-white hover:border-carbon p-5 flex flex-col justify-between gap-5 transition-all shadow-2xs hover:shadow-sm"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl border border-terrain/20 bg-paper p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                      <Image
                        src={app.iconPath}
                        alt={`${app.name} icon`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-space font-semibold text-lg text-carbon group-hover:underline underline-offset-4">
                      {app.name}
                    </h3>
                    <p className="text-[11px] font-mono text-terrain truncate">{app.domain}</p>
                    <p className="text-xs text-carbon/80 leading-relaxed mt-2 line-clamp-2">
                      {app.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-terrain/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-terrain truncate">{app.platforms[0]}</span>
                  <span className="text-carbon font-semibold inline-flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ABOUT FOUNDER & XWEET COMMUNITY ──────────────────────────────── */}
        <section
          id="community"
          className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 border-t border-terrain/25"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Founder Card */}
            <div className="lg:col-span-7 rounded-3xl border border-terrain/35 bg-white/65 p-6 sm:p-9 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-carbon/20 shrink-0 bg-paper">
                <Image
                  src="/vikky.jpg"
                  alt="Vikky Raja — Founder of Xweet & Indivio"
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-terrain">
                  About the Builder
                </span>
                <h2 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
                  Vikky Raja
                </h2>
                <p className="text-xs sm:text-sm text-carbon/80 leading-relaxed font-light">
                  Started in 2025 as <strong>Indivio Studio</strong> crafting SaaS and web tools. As our products grew,{" "}
                  <strong>Indivio</strong> became our dedicated hyperlocal food delivery app, and{" "}
                  <strong>Xweet</strong> became the root ecosystem housing all our utilities, apps, and games.
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 rounded-full bg-carbon text-paper px-4 py-2 text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-signal-lime" />
                  </Link>
                  <Link
                    href="/unkn"
                    className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-paper px-4 py-2 text-xs font-mono text-carbon hover:border-carbon transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Play unkn</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Xweet Community & Closed Testing Card */}
            <div className="lg:col-span-5 rounded-3xl border border-carbon bg-carbon text-paper p-6 sm:p-9 flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-signal-lime">
                  <Users className="w-3.5 h-3.5" />
                  <span>Xweet Community &amp; Beta</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-medium">
                  Join Closed Testing &amp; Open Source
                </h3>
                <p className="text-xs text-terrain leading-relaxed">
                  Test upcoming Play Store releases (<strong>Xweet Wallpapers</strong>,{" "}
                  <strong>Xweet Games</strong>, <strong>Smiley PDF</strong>), grab signed APKs from GitHub, or follow builds in public.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={COMMUNITY_LINKS.playTestingEmail}
                  className="inline-flex items-center gap-1.5 rounded-full bg-signal-lime text-carbon px-4 py-2 text-xs font-semibold hover:bg-[#cbf056] transition-colors"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Join Play Closed Testing</span>
                </a>
                <a
                  href={COMMUNITY_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-paper px-4 py-2 text-xs font-mono transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-terrain" />
                </a>
                <a
                  href={COMMUNITY_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-paper px-4 py-2 text-xs font-mono transition-colors"
                >
                  <span>@xweet_69</span>
                  <ArrowUpRight className="w-3 h-3 text-terrain" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPACT COMMISSIONS STRIP ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-8">
          <div className="rounded-3xl border border-terrain/35 bg-white/50 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-terrain">
                Select Commissions
              </span>
              <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                Need a web platform, mobile app, or local-first tool?
              </h2>
              <p className="text-xs font-mono text-terrain">
                Direct collaboration with senior engineering — zero agency layers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-carbon text-paper px-5 py-3 text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Inquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-signal-lime" />
              </Link>
              <a
                href={COMMUNITY_LINKS.email}
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-paper px-4 py-3 text-xs font-mono text-carbon hover:border-carbon transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>contact@xweet.in</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  );
}
