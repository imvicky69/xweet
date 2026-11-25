"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import { Reveal } from "@/components/Reveal";
import {
  ECOSYSTEM_APPS,
  type AppCategory,
  type EcosystemApp,
  type ReleaseStatus,
} from "@/data/ecosystem";
import { useGithubLatestRelease, formatAssetSize } from "@/lib/github-release";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Download,
  Globe,
  Smartphone,
  Puzzle,
  Compass,
  Package,
  FlaskConical,
  Tag,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

type FilterValue = "all" | AppCategory;

function statusPillClass(status: ReleaseStatus): string {
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

function GithubLatestReleaseBar({ repo }: { repo: string }) {
  const { release, loading } = useGithubLatestRelease(repo);

  if (loading) {
    return (
      <div className="rounded-xl border border-terrain/20 bg-paper/70 px-3.5 py-2.5 text-[11px] font-mono text-terrain">
        Fetching latest GitHub release…
      </div>
    );
  }

  if (!release) {
    return (
      <div className="rounded-xl border border-terrain/20 bg-paper/70 px-3.5 py-2.5 flex items-center justify-between gap-2 text-[11px] font-mono">
        <span className="text-terrain">GitHub Releases available</span>
        <a
          href={`https://github.com/${repo}/releases/latest`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-carbon underline underline-offset-2 inline-flex items-center gap-1"
        >
          Open Releases <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    );
  }

  const prioritizedAssets = release.assets
    .filter((a) => /\.(apk|zip|crx)$/i.test(a.name))
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-emerald-300/70 bg-emerald-50/70 p-3.5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 text-white px-2.5 py-0.5 font-semibold">
            <Tag className="w-3 h-3" />
            {release.tagName}
          </span>
          <span className="text-emerald-950 font-semibold">Latest Release</span>
        </div>
        {release.totalDownloads > 0 && (
          <span className="text-emerald-800">
            {release.totalDownloads.toLocaleString()} downloads
          </span>
        )}
      </div>

      {prioritizedAssets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {prioritizedAssets.map((asset) => {
            const shortLabel = asset.name.includes("arm64")
              ? "ARM64 APK"
              : asset.name.includes("armeabi-v7a")
              ? "ARMv7 APK"
              : asset.name.endsWith(".apk")
              ? "Universal APK"
              : asset.name;

            return (
              <a
                key={asset.name}
                href={asset.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-carbon text-paper px-3 py-1.5 text-[11px] font-mono font-semibold hover:opacity-90 transition-opacity"
              >
                <Download className="w-3 h-3 text-signal-lime" />
                <span>{shortLabel}</span>
                {asset.size > 0 && (
                  <span className="text-paper/65">({formatAssetSize(asset.size)})</span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AppCatalogCard({ app }: { app: EcosystemApp }) {
  return (
    <article
      id={app.id}
      className="scroll-mt-24 rounded-3xl border border-terrain/35 bg-white/65 hover:border-carbon/70 p-6 sm:p-9 transition-all shadow-2xs"
    >
      {/* Top strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/20 pb-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl border border-terrain/25 bg-paper p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={app.iconPath}
              alt={`${app.name} icon`}
              width={48}
              height={48}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-terrain block">
              {app.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-space font-medium text-carbon tracking-tight">
              {app.name}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-terrain bg-paper px-3 py-1 rounded-full border border-terrain/25">
            {app.domain}
          </span>
          <span
            className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${statusPillClass(
              app.status
            )}`}
          >
            {app.status}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Tagline, Actions & Platforms */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-sm sm:text-base font-medium text-carbon leading-snug">
            {app.tagline}
          </p>

          {/* Dynamic GitHub Release for infyn-dl / infyn-home-tab */}
          {app.githubReleaseRepo && <GithubLatestReleaseBar repo={app.githubReleaseRepo} />}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {app.webUrl &&
              (app.webUrl.startsWith("/") ? (
                <Link
                  href={app.webUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs px-5 py-2.5 border border-carbon/15 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Web App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <a
                  href={app.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs px-5 py-2.5 border border-carbon/15 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Web</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}

            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-carbon text-paper font-mono text-xs px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                <Smartphone className="w-3.5 h-3.5 text-signal-lime" />
                <span>Play Store</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
            )}

            {app.playTestingNote && (
              <Link
                href={`/join-as-tester?appName=${encodeURIComponent(app.id)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-50 text-amber-950 font-mono text-xs font-semibold px-4 py-2.5 hover:bg-amber-100 transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Join Closed Testing</span>
              </Link>
            )}

            {app.githubRepo && (
              <a
                href={app.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white text-carbon font-mono text-xs px-4 py-2.5 hover:border-carbon transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
            )}

            {app.npmPackage && (
              <a
                href={app.npmPackage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white text-carbon font-mono text-xs px-4 py-2.5 hover:border-carbon transition-colors"
              >
                <Package className="w-3.5 h-3.5" />
                <span>NPM</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
            )}

            {app.detailsUrl && app.detailsUrl !== app.webUrl && (
              <Link
                href={app.detailsUrl}
                className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-paper text-carbon font-mono text-xs px-4 py-2.5 hover:border-carbon transition-colors"
              >
                <span>App Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {/* Platforms */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {app.platforms.map((p) => (
              <span
                key={p}
                className="text-[10px] font-mono text-carbon/85 bg-paper px-2.5 py-0.5 rounded-full border border-terrain/25"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Detailed Description, Highlights & Tags */}
        <div className="lg:col-span-7 space-y-4 bg-paper/70 p-5 sm:p-7 rounded-2xl border border-terrain/20">
          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-terrain mb-1.5">
              Overview &amp; Capabilities
            </h3>
            <p className="text-carbon/90 font-light leading-relaxed text-xs sm:text-sm">
              {app.description}
            </p>
          </div>

          <ul className="space-y-1.5 pt-1">
            {app.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs font-mono text-carbon/90">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-lime mt-1.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-terrain/20 flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-lg bg-white/85 border border-terrain/30 font-mono text-[10px] text-terrain"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AppsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ECOSYSTEM_APPS.filter((app) => {
      const catMatch = selectedCategory === "all" || app.category === selectedCategory;
      const textMatch =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.domain.toLowerCase().includes(q) ||
        app.tags.some((t) => t.toLowerCase().includes(q));
      return catMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  const filters: { id: FilterValue; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: `All (${ECOSYSTEM_APPS.length})` },
    { id: "web", label: "Web Tools", icon: Globe },
    { id: "android", label: "Android Apps", icon: Smartphone },
    { id: "extension", label: "Extensions", icon: Puzzle },
    { id: "games", label: "Games", icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        {/* Header */}
        <section className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-terrain">
            <Link href="/" className="hover:text-carbon transition-colors">
              Xweet
            </Link>
            <span>/</span>
            <span className="text-carbon font-semibold uppercase tracking-wider">
              Apps &amp; Ecosystem
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-thin tracking-tight leading-[1.04] text-carbon">
            All Xweet Apps, Extensions &amp; Platforms.
          </h1>

          <p className="text-sm sm:text-base text-carbon/75 font-light leading-relaxed max-w-2xl">
            Every product under the Xweet ecosystem—including live on-device web tools, Play Store Closed Testing Android builds, dynamic GitHub APK releases, and{" "}
            <strong className="font-medium text-carbon">Indivio</strong> food delivery.
          </p>
        </section>

        {/* Filter & Search */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-terrain/25 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => {
              const Icon = f.icon;
              const active = selectedCategory === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedCategory(f.id)}
                  className={`cursor-pointer px-4 py-2 rounded-full text-xs font-mono transition-all inline-flex items-center gap-1.5 ${
                    active
                      ? "bg-carbon text-paper font-semibold"
                      : "border border-terrain/30 text-terrain hover:border-carbon hover:text-carbon bg-white/50"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-terrain absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search apps, tools, stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-terrain/30 bg-white/70 text-xs font-mono text-carbon placeholder:text-terrain/60 focus:outline-none focus:border-carbon"
            />
          </div>
        </section>

        {/* Apps List */}
        <section className="space-y-6">
          {filteredApps.length === 0 ? (
            <div className="py-16 text-center space-y-3 border border-dashed border-terrain/30 rounded-3xl">
              <p className="text-sm font-mono text-terrain">
                No apps matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-mono text-carbon underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredApps.map((app, idx) => (
              <Reveal key={app.id} delay={idx * 40}>
                <AppCatalogCard app={app} />
              </Reveal>
            ))
          )}
        </section>
      </main>

      <StudioFooter />
    </div>
  );
}
