"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import { ECOSYSTEM_APPS } from "@/data/ecosystem";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Mail,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

const TESTABLE_APPS = ECOSYSTEM_APPS.filter(
  (app) => app.category === "android" || app.id === "xweet-games"
);

function matchAppFromQuery(raw: string | null): string {
  if (!raw) return TESTABLE_APPS[0]?.id ?? "wallpapers";
  const q = raw.trim().toLowerCase();
  const found = ECOSYSTEM_APPS.find(
    (app) =>
      app.id.toLowerCase() === q ||
      app.name.toLowerCase() === q ||
      app.name.toLowerCase().replace(/\s+/g, "-") === q ||
      app.name.toLowerCase().includes(q)
  );
  if (found && TESTABLE_APPS.some((t) => t.id === found.id)) {
    return found.id;
  }
  return TESTABLE_APPS[0]?.id ?? "wallpapers";
}

const JOIN_AS_TESTER_ENDPOINT =
  process.env.NEXT_PUBLIC_JOIN_AS_TESTER_URL ||
  "https://api.xweet.in/join-as-tester";

export default function JoinAsTesterPage() {
  const [selectedAppId, setSelectedAppId] = useState<string>(
    TESTABLE_APPS[0]?.id ?? "wallpapers"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState("");
  const [website, setWebsite] = useState("");
  const formLoadedAtRef = useRef<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const qApp = params.get("appName") ?? params.get("app");
    if (qApp) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAppId(matchAppFromQuery(qApp));
    }
  }, []);

  const selectedApp =
    TESTABLE_APPS.find((a) => a.id === selectedAppId) ?? TESTABLE_APPS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(JOIN_AS_TESTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: selectedAppId,
          name,
          email,
          device,
          website,
          _formLoadedAt: formLoadedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setErrorMsg(
          data?.error || "Could not submit your request. Please try again."
        );
        return;
      }

      setAlreadyRegistered(Boolean(data?.alreadyRegistered));
      setSubmitted(true);
    } catch {
      setErrorMsg(
        "Network error while submitting. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = `mailto:hello@xweet.in?subject=${encodeURIComponent(
    `Closed Testing Request: ${selectedApp?.name ?? "Xweet App"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nPlay Store Email: ${email}\nApp: ${selectedApp?.name ?? ""}\nDevice: ${
      device || "Android"
    }`
  )}`;

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-6">
        {/* Compact Header */}
        <div className="space-y-2 border-b border-terrain/20 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-terrain/30 text-[11px] font-mono text-carbon">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Google Play Closed Testing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-space font-light tracking-tight text-carbon">
            Join as a Tester
          </h1>
          <p className="text-xs sm:text-sm text-terrain font-light max-w-xl">
            Pick an app below and enter your Google Play email to receive your closed-testing invite link.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-terrain/35 bg-white/70 p-5 sm:p-8 shadow-2xs">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-signal-lime/45 border border-carbon/15 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-carbon" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  {alreadyRegistered
                    ? `You're already on the list for ${selectedApp?.name}`
                    : `You're on the list for ${selectedApp?.name}`}
                </h2>
                <p className="text-xs sm:text-sm text-terrain max-w-md mx-auto">
                  Thanks <strong>{name}</strong>. We&apos;ll add <strong>{email}</strong> to the{" "}
                  <strong>{selectedApp?.name}</strong> tester track and send your Play Store opt-in link.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-1.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs px-5 py-2.5 border border-carbon/15"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email Backup</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setAlreadyRegistered(false);
                    setErrorMsg(null);
                    formLoadedAtRef.current = Date.now();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-paper text-carbon font-mono text-xs px-4 py-2.5 hover:border-carbon cursor-pointer"
                >
                  Test Another App
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dynamic App Selector with Icons */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                    1. Select App *
                  </span>
                  {selectedApp && (
                    <span className="text-[11px] font-mono text-carbon font-semibold">
                      {selectedApp.name} · {selectedApp.status}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {TESTABLE_APPS.map((app) => {
                    const active = app.id === selectedAppId;
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedAppId(app.id)}
                        className={`cursor-pointer rounded-2xl border p-3 text-left flex items-center gap-3 transition-all ${
                          active
                            ? "border-carbon bg-signal-lime/35 ring-1 ring-carbon/20"
                            : "border-terrain/25 bg-paper/70 hover:border-carbon/60"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl border border-terrain/20 bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                          <Image
                            src={app.iconPath}
                            alt={app.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain rounded-md"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-space font-semibold text-xs sm:text-sm text-carbon truncate">
                            {app.name}
                          </p>
                          <p className="text-[10px] font-mono text-terrain truncate">
                            {app.status}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tester Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                    2. Your Name *
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikky Raja"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                    3. Google Play Email *
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                  4. Android Device (Optional)
                </span>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-terrain absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Nothing Phone (2), Pixel 8, Samsung A54 · Android 14"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                  />
                </div>
              </label>

              {/* Honeypot field for spam bots */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Footer Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-terrain/15">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-terrain">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Used only for Google Play tester opt-in · Zero spam
                </span>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/apps"
                    className="text-xs font-mono text-terrain hover:text-carbon px-3 py-2"
                  >
                    Browse Apps
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-2.5 border border-carbon/15 inline-flex items-center gap-2 transition-colors"
                  >
                    <span>{submitting ? "Submitting..." : "Request Tester Access"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
