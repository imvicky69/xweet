import type { Metadata } from "next";
import Link from "next/link";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  ShieldCheck,
  EyeOff,
  HardDrive,
  Lock,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  UserX,
  Ban,
  Smartphone,
  ExternalLink,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Xweet Wallpapers",
  description:
    "Privacy Policy for Xweet Wallpapers: minimal, accessible, and respectful of your privacy. Zero accounts, zero advertisements, and zero tracking.",
  openGraph: {
    title: "Privacy Policy — Xweet Wallpapers",
    description:
      "Frame freely. Stay private. Curated 4K and minimal wallpapers engineered without accounts, ads, or invasive analytics.",
    url: "https://xweet.in/wallpapers/privacy",
    siteName: "Xweet",
  },
};

const SECTIONS = [
  { id: "section-1", num: "01", title: "Information We Collect" },
  { id: "section-2", num: "02", title: "Wallpaper Caching & Storage" },
  { id: "section-3", num: "03", title: "Device Permissions" },
  { id: "section-4", num: "04", title: "Content Delivery Infrastructure" },
  { id: "section-5", num: "05", title: "Advertising and Tracking" },
  { id: "section-6", num: "06", title: "Data Sharing" },
  { id: "section-7", num: "07", title: "Children's Privacy" },
  { id: "section-8", num: "08", title: "Data Security" },
  { id: "section-9", num: "09", title: "Changes to This Policy" },
  { id: "section-10", num: "10", title: "Contact Us" },
];

export default function WallpapersPrivacyPage() {
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
              href="/"
              className="inline-flex items-center gap-1.5 text-terrain hover:text-carbon transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Studio Home</span>
            </Link>
            <span className="text-terrain/40">•</span>
            <span className="text-carbon font-medium uppercase tracking-wider">
              Legal Telemetry
            </span>
            <span className="text-terrain/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline bg-black/5 px-2 py-0.5 rounded border border-terrain/20 text-[11px]">
              DOC-ID: XW-PRIVACY-2026
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
              Last updated: <strong className="text-carbon font-semibold">November 24, 2026</strong>
            </p>
          </div>

          <p className="text-lg sm:text-xl text-carbon/90 font-light leading-relaxed max-w-3xl">
            <strong>Xweet Wallpapers</strong> is a collection of curated, minimal, and high-definition wallpapers crafted by Xweet. We believe your personal device should remain personal. That&apos;s why Xweet Wallpapers is engineered with zero accounts, zero advertisements, and zero tracking.
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
              <Smartphone className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">Native Setter</div>
              <div className="text-[11px] text-terrain leading-snug">Direct on-device wallpaper application.</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-terrain/25 space-y-1.5">
              <HardDrive className="w-5 h-5 text-carbon" />
              <div className="font-semibold text-carbon">Smart Cache</div>
              <div className="text-[11px] text-terrain leading-snug">Zero duplicate edge re-downloads.</div>
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
                Xweet Wallpapers does not collect, record, or profile any personal information.
              </p>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-mono uppercase tracking-wider text-terrain">
                  Specifically, the app:
                </p>
                <ul className="space-y-2 text-sm text-carbon/90">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not require an account, profile, login, or email.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not collect personal names, telephone numbers, or device contacts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not integrate advertising SDKs or programmatic ad exchanges.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not track your physical location or GPS coordinates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not monitor cross-app browsing habits or build behavioral marketing profiles.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5 fill-carbon" />
                    <span>Does not sell, rent, or monetize your data with third-party brokers.</span>
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
                  Wallpaper Caching &amp; Storage
                </h2>
              </div>

              <p className="text-sm sm:text-base text-carbon/85 leading-relaxed">
                To minimize your mobile data usage and provide instantaneous offline viewing, Xweet Wallpapers manages high-resolution images locally on your device:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Smart 60-day persistent disk image cache.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Zero redundant re-downloads via ETag checks.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Interactive framing crop buffers stored locally.</span>
                </div>
                <div className="p-3 rounded-2xl bg-paper/80 border border-terrain/25 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lime shrink-0" />
                  <span>Haptic feedback preferences stored on-device.</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-sm text-carbon/85 leading-relaxed border-t border-terrain/15">
                <p>
                  All downloaded artwork and thumbnails remain strictly on your physical phone storage and are never uploaded or linked to any cloud identity.
                </p>
                <p className="text-xs text-terrain leading-relaxed">
                  You can purge the entire image cache at any time using the <strong>&quot;Clear Wallpaper Cache&quot;</strong> button in the app&apos;s Settings screen, or by clearing storage in Android System Settings.
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
                  Device Permissions
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  Xweet Wallpapers requests only the minimum Android platform permissions strictly required for its core functionality:
                </p>

                <div className="p-4 rounded-2xl bg-paper border border-terrain/30 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-carbon font-semibold">
                    <Smartphone className="w-4 h-4 text-signal-lime" />
                    <span>android.permission.SET_WALLPAPER</span>
                  </div>
                  <p className="text-terrain text-[11px] leading-relaxed">
                    Used exclusively when you tap &quot;Apply to Home Screen&quot;, &quot;Lock Screen&quot;, or &quot;Both Screens&quot;. It allows Android&apos;s native WallpaperManager API to set your chosen wallpaper.
                  </p>
                </div>

                <p className="text-xs text-terrain leading-relaxed">
                  The app does <strong>not</strong> request or access sensitive device permissions such as Camera, Microphone, Read Contacts, Precise Location, or Phone State.
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
                  Content Delivery Infrastructure
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  To stream curated wallpapers and thumbnails to your device, the app connects to modern, secure edge infrastructure:
                </p>
                <ul className="space-y-2 text-sm text-carbon/90">
                  <li className="flex items-start gap-2.5">
                    <Cloud className="w-4 h-4 text-carbon shrink-0 mt-0.5" />
                    <span><strong>Cloud Firestore:</strong> Used to stream catalog taxonomy, titles, categories, and dominant color metadata.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Cloud className="w-4 h-4 text-carbon shrink-0 mt-0.5" />
                    <span><strong>Cloudflare R2 Edge CDN (cdn.xweet.in):</strong> High-performance content delivery network serving static, read-only 4K and mobile WebP image assets without user-identifying tracking cookies.</span>
                  </li>
                </ul>
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
                  Advertising and Tracking
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p className="font-medium text-carbon">
                  Xweet Wallpapers is 100% ad-free.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  We do not embed banner ads, interstitial popups, rewarded video networks, or user-tracking telemetry frameworks. We do not inspect your device advertising ID (GAID/AAID).
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
                  Data Sharing
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p className="font-medium text-carbon">
                  We do not sell, rent, lease, or share personal information with third parties.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  Because the application does not collect user identities, profiles, or personal browsing histories, there is no personal database to share or monetize.
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
                  Children&apos;s Privacy
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  Xweet Wallpapers is curated for general creative appreciation and contains no inappropriate content.
                </p>
                <p>
                  We do not knowingly collect personal information from children under 13 (or under the applicable age of digital consent in your jurisdiction).
                </p>
                <p className="text-xs text-terrain">
                  If you have reason to believe any personal data has been submitted unexpectedly, please contact us for immediate resolution.
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
                  Data Security
                </h2>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-carbon/85 leading-relaxed">
                <p>
                  Our primary security strategy is data minimization: by not collecting your personal information, your exposure to remote data breaches is eliminated.
                </p>
                <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                  All communication with our edge content servers takes place over encrypted HTTPS/TLS channels.
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
                  We may periodically review and update this Privacy Policy as Xweet Wallpapers introduces new features or architectural improvements.
                </p>
                <p className="text-xs font-mono text-carbon/80 pt-1">
                  Updates will always be published on this page with a revised &quot;Last updated&quot; timestamp.
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
                If you have any questions, feedback, or inquiries regarding this Privacy Policy, please reach out to us:
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
                  <span className="font-playwrite text-lg text-carbon">xweet wallpapers</span>
                  <span className="text-terrain/50">—</span>
                  <span className="font-medium text-carbon">Crafted for focused screens.</span>
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
                We design wallpapers as high-craft visual assets, not data harvesting conduits. No telemetry beacons, no ad trackers, and zero background analytics.
              </p>
              <div className="pt-1">
                <Link
                  href="/"
                  className="text-xs font-mono font-medium text-carbon hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Xweet Studio</span>
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
                  Xweet Wallpapers
                </h4>
                <p className="text-xs font-light text-terrain leading-relaxed">
                  Minimal, curated 4K &amp; AMOLED wallpapers with custom framing for Android.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=in.xweet.wallpapers"
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
            <ImageIcon className="w-6 h-6 text-carbon" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
              Xweet Wallpapers — Pure visual craft.
            </h3>
            <p className="text-xs sm:text-sm text-terrain font-light leading-relaxed">
              Curated minimal, abstract, and floral wallpapers for Android. Zero ads, zero accounts, and smart on-device persistent caching.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=in.xweet.wallpapers"
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
