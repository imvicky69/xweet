import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import { Reveal } from "@/components/Reveal";
import { ECOSYSTEM_APPS, COMMUNITY_LINKS } from "@/data/ecosystem";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Layers,
  MapPin,
  FlaskConical,
  Mail,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

const TIMELINE = [
  {
    period: "Early 2025",
    label: "First Builds",
    title: "Shipping Everyday Utilities",
    icon: Code2,
    description:
      "Started building small, fast web tools and mobile apps from Nirmali, Bihar — focused on daily productivity, file workflows, and clean personalization.",
  },
  {
    period: "Mid 2025",
    label: "Free Tools",
    title: "Browser & Android Apps",
    icon: Smartphone,
    description:
      "Expanded into on-device web tools like bg.xweet.in and Infyn, 4K wallpapers, ad-free Android utilities, and browser games — keeping core tools free and tracker-free.",
  },
  {
    period: "2026",
    label: "Xweet",
    title: "Everything Under xweet.in",
    icon: Layers,
    description:
      "Brought all web utilities, mobile apps, open-source releases, and products like Indivio together under one simple home at xweet.in.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
        {/* ── FOUNDER HERO ────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-terrain/25 pb-14">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-carbon/20 bg-paper shadow-sm">
              <Image
                src="/vikky.jpg"
                alt="Vikky Raja — Builder of Xweet"
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171815]/90 via-[#171815]/45 to-transparent p-6 text-[#f0efe6]">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-signal-lime text-[#171815] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Builder · Xweet
                </span>
                <p className="font-space text-2xl font-medium mt-1.5">Vikky Raja</p>
                <p className="text-xs font-mono text-[#f0efe6]/80 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-signal-lime" />
                  Nirmali, Bihar · India
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 border border-terrain/30 text-[11px] font-mono text-carbon">
              <span className="w-2 h-2 rounded-full bg-signal-lime" />
              <span>About · Vikky Raja</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-thin tracking-tight leading-[1.06] text-carbon">
              Shipping free apps for{" "}
              <span className="font-space font-medium underline decoration-signal-lime decoration-4 underline-offset-4">
                daily work
              </span>{" "}
              and personalization.
            </h1>

            <div className="space-y-3.5 text-sm sm:text-base text-carbon/85 font-light leading-relaxed">
              <p>
                I&apos;m <strong>Vikky Raja</strong>, an independent developer from Nirmali, Bihar. I started shipping apps for daily productivity, practical work, and clean personalization — with a simple goal of providing as many genuinely free web and mobile tools as possible.
              </p>
              <p>
                From local-first browser utilities like{" "}
                <a
                  href="https://bg.xweet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-carbon underline underline-offset-4"
                >
                  bg.xweet.in
                </a>{" "}
                (AI background remover &amp;{" "}
                <a
                  href="https://bg.xweet.in/passport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-carbon underline underline-offset-4"
                >
                  passport photo maker
                </a>
                ) and{" "}
                <a
                  href="https://infyn.software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-carbon underline underline-offset-4"
                >
                  Infyn
                </a>{" "}
                to Android apps like Xweet Wallpapers, Smiley PDF, and Indivio, <strong>Xweet</strong> is where I keep everything organized and ad-free.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-3 border border-carbon/15 transition-colors"
              >
                <span>Browse All {ECOSYSTEM_APPS.length} Apps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:vikky@xweet.in"
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white px-5 py-3 text-xs font-mono text-carbon hover:border-carbon transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>vikky@xweet.in</span>
              </a>
              <a
                href={COMMUNITY_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white px-5 py-3 text-xs font-mono text-carbon hover:border-carbon transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/imvicky69</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
              <a
                href={COMMUNITY_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white px-5 py-3 text-xs font-mono text-carbon hover:border-carbon transition-colors"
              >
                <span>@xweet_69</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              Timeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-space font-medium text-carbon mt-1">
              How Xweet Came Together
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIMELINE.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={idx * 70} className="h-full">
                  <div className="h-full rounded-3xl border border-terrain/35 bg-white/65 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-signal-lime/35 border border-carbon/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-carbon" />
                        </div>
                        <span className="text-[11px] font-mono text-terrain bg-paper px-3 py-1 rounded-full border border-terrain/25">
                          {step.period}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                        {step.label}
                      </span>
                      <h3 className="text-xl font-space font-medium text-carbon">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── COMPLETE ECOSYSTEM MAP ──────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                Apps &amp; Tools
              </span>
              <h2 className="text-2xl sm:text-4xl font-space font-medium text-carbon mt-1">
                Everything Under Xweet
              </h2>
            </div>
            <Link
              href="/apps"
              className="text-xs font-mono font-semibold text-carbon underline underline-offset-4"
            >
              Open Full Apps Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ECOSYSTEM_APPS.map((app) => (
              <Link
                key={app.id}
                href={`/apps#${app.id}`}
                className="rounded-2xl border border-terrain/30 bg-white/60 hover:bg-white hover:border-carbon p-4 flex items-center gap-3.5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl border border-terrain/20 bg-paper p-1 shrink-0 overflow-hidden">
                  <Image
                    src={app.iconPath}
                    alt={app.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-space font-semibold text-sm text-carbon truncate">
                    {app.name}
                  </p>
                  <p className="text-[11px] font-mono text-terrain truncate">{app.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── COMMUNITY & FAQ ─────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-3xl border border-carbon bg-carbon text-paper p-7 sm:p-9 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-signal-lime">
                Closed Testing &amp; Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-space font-medium">
                Try New Builds Early
              </h2>
              <p className="text-xs sm:text-sm text-terrain leading-relaxed">
                Join Google Play closed testing for Xweet Wallpapers and Xweet Games, grab open-source APKs like Infyn DL, or write directly if you have feedback.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/join-as-tester"
                className="inline-flex items-center gap-1.5 rounded-full bg-signal-lime text-carbon px-4 py-2.5 text-xs font-semibold hover:bg-[#cbf056]"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Join Play Closed Testing</span>
              </Link>
              <a
                href="mailto:vikky@xweet.in"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-paper px-4 py-2.5 text-xs font-mono"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>vikky@xweet.in</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl border border-terrain/35 bg-white/65 p-7 sm:p-9 space-y-5">
            <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
              Common Questions
            </h2>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="border-b border-terrain/20 pb-3">
                <p className="font-semibold text-carbon">
                  How does the free Passport Size Photo Maker &amp; BG Remover work?
                </p>
                <p className="text-carbon/80 font-light mt-1">
                  Live at{" "}
                  <a
                    href="https://bg.xweet.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium text-carbon"
                  >
                    bg.xweet.in
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://bg.xweet.in/passport"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium text-carbon"
                  >
                    bg.xweet.in/passport
                  </a>
                  , it removes photo backgrounds 100% locally in your browser with zero uploads, applies customizable light studio backdrops, auto-crops head and shoulders (35×45 mm, 2×2 in, or custom), and packs any photo count onto 4×6, A4, or Letter print sheets as 300 DPI PDF or JPG without wasting paper.
                </p>
              </div>
              <div className="border-b border-terrain/20 pb-3">
                <p className="font-semibold text-carbon">
                  Why make so many tools free?
                </p>
                <p className="text-carbon/80 font-light mt-1">
                  Everyday utilities — removing a background, editing PDFs, setting a wallpaper, or playing a quick puzzle — shouldn&apos;t need subscriptions or ad trackers. Running web tools locally in your browser also keeps hosting lightweight.
                </p>
              </div>
              <div className="border-b border-terrain/20 pb-3">
                <p className="font-semibold text-carbon">
                  Where can I download Infyn DL and Infyn Home Tab?
                </p>
                <p className="text-carbon/80 font-light mt-1">
                  Both are open-source on GitHub (`imvicky69/infyn-dl` and `imvicky69/infyn-home-tab`), and the{" "}
                  <Link href="/apps" className="underline font-medium text-carbon">
                    Apps Directory
                  </Link>{" "}
                  links directly to their latest release downloads.
                </p>
              </div>
              <div>
                <p className="font-semibold text-carbon">
                  How can I reach you for feedback or work?
                </p>
                <p className="text-carbon/80 font-light mt-1">
                  Email me directly at{" "}
                  <a href="mailto:vikky@xweet.in" className="underline font-medium text-carbon">
                    vikky@xweet.in
                  </a>{" "}
                  or use the{" "}
                  <Link href="/contact" className="underline font-medium text-carbon">
                    contact page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  );
}
