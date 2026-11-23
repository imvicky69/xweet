import type { Metadata } from "next";
import Link from "next/link";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  ShieldCheck,
  EyeOff,
  WifiOff,
  HardDrive,
  Lock,
  Mail,
  Globe,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  UserX,
  Ban,
  Compass,
  Smartphone,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Xweet Games",
  description:
    "Privacy Policy for Xweet Games: minimal, accessible, and respectful of your privacy. Zero accounts, zero advertisements, and zero tracking.",
  openGraph: {
    title: "Privacy Policy — Xweet Games",
    description:
      "Play freely. Stay private. Minimalist games engineered without accounts, ads, or invasive analytics.",
    url: "https://xweet.in/games/privacy",
    siteName: "Xweet",
  },
};

const SECTIONS = [
  { id: "section-1", num: "01", title: "Information We Collect" },
  { id: "section-2", num: "02", title: "Local Game Data" },
  { id: "section-3", num: "03", title: "Internet Connectivity" },
  { id: "section-4", num: "04", title: "Advertising and Tracking" },
  { id: "section-5", num: "05", title: "Data Sharing" },
  { id: "section-6", num: "06", title: "Children's Privacy" },
  { id: "section-7", num: "07", title: "Data Security" },
  { id: "section-8", num: "08", title: "Third-Party Services" },
  { id: "section-9", num: "09", title: "Changes to This Policy" },
  { id: "section-10", num: "10", title: "Contact Us" },
];

export default function GamesPrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation Bar */}
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 sm:space-y-16">
        {/* ========================================================================= */}
        {/* BREADCRUMB & METADATA TELEMETRY STRIP */}
        {/* ========================================================================= */}
        <section className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-terrain/20 text-xs font-mono text-terrain">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-terrain hover:text-carbon transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Games Hub</span>
            </Link>
            <span className="text-terrain/40">•</span>
            <span className="text-carbon font-medium uppercase tracking-wider">
              Legal Telemetry
            </span>
            <span className="text-terrain/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline bg-black/5 px-2 py-0.5 rounded border border-terrain/20 text-[11px]">
              DOC-ID: XG-PRIVACY-2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span className="text-carbon font-semibold text-[11px] uppercase tracking-wider">
              Zero-Tracking Verified
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EDITORIAL HERO SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-carbon text-paper">
            <ShieldCheck className="w-3.5 h-3.5 text-signal-lime" />
            <span>SOVEREIGN DATA PRINCIPLE</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-space font-medium text-carbon tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base font-mono text-terrain">
              Last updated: <strong className="text-carbon font-semibold">November 23, 2026</strong>
            </p>
          </div>

          <p className="text-lg sm:text-xl text-carbon/90 font-light leading-relaxed max-w-3xl">
            <strong>Xweet Games</strong> is a collection of minimal, thoughtfully designed games developed by Xweet. We believe games should be fun, accessible, and respectful of your privacy. That&apos;s why Xweet Games is designed to work without accounts, advertisements, or invasive tracking.
          </p>

          {/* 4 Pillars Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/25 space-y-1.5">
              <UserX className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">0 Accounts</div>
              <div className="text-[11px] text-terrain leading-snug">No registration or email required.</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/25 space-y-1.5">
              <Ban className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">0 Advertisements</div>
              <div className="text-[11px] text-terrain leading-snug">Zero ad networks or tracking SDKs.</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/25 space-y-1.5">
              <WifiOff className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">100% Offline</div>
              <div className="text-[11px] text-terrain leading-snug">Gameplay runs directly on-device.</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/25 space-y-1.5">
              <HardDrive className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">On-Device Storage</div>
              <div className="text-[11px] text-terrain leading-snug">Streaks & scores stay on your phone.</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN SPLIT: SECTIONS (LEFT) & STICKY TABLE OF CONTENTS (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* SECTION 1 */}
            <article
              id="section-1"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Information We Collect
                </h2>
              </div>

              <p className="text-sm sm:text-base text-carbon/85 leading-relaxed">
                Xweet Games does not intentionally collect personal information.
              </p>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-mono uppercase tracking-wider text-terrain">
                  Currently, the app:
                </p>
                <ul className="space-y-2 text-sm text-carbon/90">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not require registration or login.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not collect your name, email address, or phone number.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not use advertising SDKs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not use analytics or behavioral tracking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not track your location.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not sell or share personal information with advertisers.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* SECTION 2 */}
            <article
              id="section-2"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Local Game Data
                </h2>
              </div>

              <p className="text-sm sm:text-base text-carbon/85 leading-relaxed">
                To provide a smooth gaming experience, Xweet Games may store certain information locally on your device, including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Game progress and scores.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Puzzle history and completed challenges.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Daily streaks and achievements.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Game preferences and settings.</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-sm text-carbon/85 leading-relaxed border-t border-terrain/15">
                <p>
                  This information remains on your device and is not transmitted to Xweet&apos;s servers.
                </p>
                <p className="text-xs text-terrain leading-relaxed">
                  You can generally remove locally stored game data by clearing the app&apos;s storage or uninstalling the app, subject to your device&apos;s backup settings.
                </p>
              </div>
            </article>

            {/* SECTION 3 */}
            <article
              id="section-3"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Internet Connectivity
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  The games currently included in Xweet Games are designed to work offline.
                </p>
                <p className="p-3.5 rounded-2xl bg-black/[0.03] border border-terrain/20 text-xs font-mono text-carbon">
                  The app does not require an internet connection for its core gameplay.
                </p>
              </div>
            </article>

            {/* SECTION 4 */}
            <article
              id="section-4"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Advertising and Tracking
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p className="font-medium text-carbon">
                  Xweet Games currently contains no advertisements.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  We do not use advertising identifiers, third-party advertising networks, or tracking technologies to monitor your activity across apps or websites.
                </p>
              </div>
            </article>

            {/* SECTION 5 */}
            <article
              id="section-5"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Data Sharing
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p className="font-medium text-carbon">
                  We do not sell, rent, or share personal information with third parties.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  Since the current version does not intentionally collect personal information, we do not maintain a database of player profiles or personal gameplay activity.
                </p>
              </div>
            </article>

            {/* SECTION 6 */}
            <article
              id="section-6"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Children&apos;s Privacy
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  Xweet Games is designed to offer simple, accessible puzzle and casual games.
                </p>
                <p>
                  We do not knowingly collect personal information from children.
                </p>
                <p className="text-xs text-terrain">
                  If you believe personal information has been collected unexpectedly, please contact us.
                </p>
              </div>
            </article>

            {/* SECTION 7 */}
            <article
              id="section-7"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Data Security
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  Our approach to privacy is to minimize data collection.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  Game progress and preferences are stored locally on your device. The protection of this information also depends on your device&apos;s operating system and security settings.
                </p>
              </div>
            </article>

            {/* SECTION 8 */}
            <article
              id="section-8"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  08
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Third-Party Services
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  The current version of Xweet Games does not intentionally integrate third-party advertising, analytics, or user-tracking services.
                </p>
                <p className="text-xs text-terrain leading-relaxed">
                  Any future integration that changes our data practices will be reflected in this policy.
                </p>
              </div>
            </article>

            {/* SECTION 9 */}
            <article
              id="section-9"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/50 border border-terrain/30 space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-carbon text-paper px-2.5 py-0.5 rounded-full">
                  09
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Changes to This Policy
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  We may update this Privacy Policy as Xweet Games evolves.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  If future versions introduce features such as online gameplay, accounts, cloud synchronization, or other services involving personal information, we will update this policy to explain the relevant data practices.
                </p>
                <p className="text-xs font-mono text-carbon/80 pt-1">
                  Changes will be published on this page with a revised &quot;Last updated&quot; date.
                </p>
              </div>
            </article>

            {/* SECTION 10 */}
            <article
              id="section-10"
              className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white/70 border border-carbon space-y-5 shadow-sm ring-1 ring-carbon/10"
            >
              <div className="flex items-center gap-3 border-b border-terrain/20 pb-3">
                <span className="text-xs font-mono font-bold bg-signal-lime text-carbon px-2.5 py-0.5 rounded-full border border-carbon">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  Contact Us
                </h2>
              </div>

              <p className="text-sm sm:text-base text-carbon/85 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, you can contact us at:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                    DEVELOPER
                  </span>
                  <span className="text-sm font-space font-medium text-carbon block">
                    Xweet
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                    DIRECT EMAIL
                  </span>
                  <a
                    href="mailto:hello@xweet.in"
                    className="text-sm font-mono font-semibold text-carbon hover:text-black hover:underline transition-colors block"
                  >
                    hello@xweet.in
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                    STUDIO WEBSITE
                  </span>
                  <a
                    href="https://xweet.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono font-semibold text-carbon hover:text-black hover:underline transition-colors block"
                  >
                    xweet.in ↗
                  </a>
                </div>
              </div>

              {/* Tagline Callout */}
              <div className="pt-4 border-t border-terrain/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-playwrite text-lg text-carbon">xweet games</span>
                  <span className="text-terrain/50">—</span>
                  <span className="font-medium text-carbon">Play freely. Stay private.</span>
                </div>

                <a
                  href="mailto:hello@xweet.in"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs transition-all border border-signal-lime/80 shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send an Email</span>
                </a>
              </div>
            </article>
          </div>

          {/* Right Column: Sticky Navigation Index & Quick Access (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Table of Contents Card */}
            <div className="p-6 rounded-3xl bg-white/60 border border-terrain/30 backdrop-blur-xs space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-terrain" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-carbon">
                    Policy Index
                  </span>
                </div>
                <span className="text-[10px] font-mono text-terrain">10 SECTIONS</span>
              </div>

              <nav className="space-y-1 font-mono text-xs">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-xl hover:bg-black/5 text-terrain hover:text-carbon transition-colors group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-terrain/60 group-hover:text-carbon">
                        {sec.num}.
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 text-carbon transition-opacity text-[10px]">
                      ↓
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Ethos Micro Card */}
            <div className="p-6 rounded-3xl bg-paper border border-terrain/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
                <Lock className="w-4 h-4 text-terrain" />
                <span>Zero Tracking Ethos</span>
              </div>
              <p className="text-xs text-terrain leading-relaxed font-light">
                We design games as sovereign tools. That means no background behavioral profiling, no tracking pixels, and no ad SDK batteries draining your device.
              </p>
              <div className="pt-1">
                <Link
                  href="/games"
                  className="text-xs font-mono font-medium text-carbon hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Games Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Google Play App Card */}
            <div className="p-6 rounded-3xl bg-black/5 border border-terrain/25 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                  GOOGLE PLAY STORE
                </span>
                <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-space font-medium text-carbon">
                  Xweet Games
                </h4>
                <p className="text-xs font-light text-terrain leading-relaxed">
                  Minimal offline puzzle &amp; deductive games for Android.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=in.xweet.games"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-carbon hover:bg-black text-paper font-mono text-xs font-semibold transition-all shadow-sm group"
              >
                {/* Official Google Play Multi-Color Vector */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 512 512" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M48.7 13.9C39.6 23.6 34.3 38.3 34.3 56.5v399c0 18.2 5.3 32.9 14.4 42.6l2.4 2.4 227-227v-5.4L51.1 11.5l-2.4 2.4z"
                  />
                  <path
                    fill="#00E676"
                    d="m356.5 334.8-78.4-78.4v-5.4l78.4-78.4 2.7 1.5 92.9 52.8c26.5 15.1 26.5 39.8 0 54.9l-92.9 52.8-2.7 1.7z"
                  />
                  <path
                    fill="#FFD600"
                    d="m278.1 251 78.4 78.4-270.1 153.5c-14.6 8.2-27.5 7.2-35.3-1.1l227-227V251z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m278.1 256.4-227-227C58.9 21.1 71.8 22.1 86.4 30.4l270.1 153.5-78.4 78.4v-5.9z"
                  />
                </svg>
                <span>Get it on Google Play</span>
                <ExternalLink className="w-3.5 h-3.5 text-terrain/60 group-hover:text-paper group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </aside>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL SIGNOFF & GOOGLE PLAY DOWNLOAD BANNER */}
        {/* ========================================================================= */}
        <section className="border border-terrain/35 rounded-3xl p-8 sm:p-12 bg-white/60 backdrop-blur-xs shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-signal-lime text-carbon flex items-center justify-center mx-auto shadow-2xs border border-signal-lime/80">
            <Smartphone className="w-6 h-6 text-carbon" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
              Xweet Games — Play freely. Stay private.
            </h3>
            <p className="text-xs sm:text-sm text-terrain font-light leading-relaxed">
              Minimal, tactile puzzle and casual games for Android. Zero ads, zero accounts, and 100% on-device local storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=in.xweet.games"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-carbon hover:bg-black text-paper transition-all border border-carbon shadow-md group cursor-pointer"
            >
              {/* Authentic Google Play Multi-Color Logo */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M48.7 13.9C39.6 23.6 34.3 38.3 34.3 56.5v399c0 18.2 5.3 32.9 14.4 42.6l2.4 2.4 227-227v-5.4L51.1 11.5l-2.4 2.4z"
                />
                <path
                  fill="#00E676"
                  d="m356.5 334.8-78.4-78.4v-5.4l78.4-78.4 2.7 1.5 92.9 52.8c26.5 15.1 26.5 39.8 0 54.9l-92.9 52.8-2.7 1.7z"
                />
                <path
                  fill="#FFD600"
                  d="m278.1 251 78.4 78.4-270.1 153.5c-14.6 8.2-27.5 7.2-35.3-1.1l227-227V251z"
                />
                <path
                  fill="#FF3D00"
                  d="m278.1 256.4-227-227C58.9 21.1 71.8 22.1 86.4 30.4l270.1 153.5-78.4 78.4v-5.9z"
                />
              </svg>
              <div className="text-left font-mono">
                <span className="block text-[9px] uppercase tracking-wider text-terrain/80 leading-none">GET IT ON</span>
                <span className="block text-sm font-bold text-paper font-sans leading-tight">Google Play</span>
              </div>
            </a>

            <a
              href="mailto:hello@xweet.in"
              className="px-6 py-3.5 rounded-2xl bg-paper hover:bg-white text-carbon font-mono text-xs font-semibold transition-all border border-terrain/30 inline-flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-terrain" />
              <span>Contact Developer</span>
            </a>
          </div>
        </section>
      </main>

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
