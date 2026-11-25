"use client";

import { useState } from "react";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import { COMMUNITY_LINKS } from "@/data/ecosystem";
import {
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Mail,
  ShieldCheck,
  Code2,
  FileCheck,
} from "lucide-react";

const PROJECT_TYPES = ["Web App", "Android / Flutter", "Full Ecosystem", "UI / Architecture"];
const BUDGET_RANGES = ["< $1.5k", "$1.5k – $3k", "$3k – $10k", "$10k+"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web App",
    budget: "$3k – $10k",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-6">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-terrain/20 pb-5">
          <div>
            <h1 className="text-3xl sm:text-5xl font-space font-light tracking-tight text-carbon">
              Inquire &amp; Collaborate
            </h1>
            <p className="text-xs sm:text-sm text-terrain font-light mt-1">
              Speak directly with the builder—zero sales layers, reply within 24 hours.
            </p>
          </div>
          <a
            href="mailto:contact@xweet.in"
            className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white/70 px-4 py-2 text-xs font-mono text-carbon hover:border-carbon transition-colors self-start sm:self-auto"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>contact@xweet.in</span>
          </a>
        </div>

        {/* Compact Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-terrain/35 bg-white/65 p-5 sm:p-7 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-signal-lime/40 border border-carbon/15 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-carbon" />
                </div>
                <h2 className="text-xl font-space font-medium text-carbon">Inquiry Received</h2>
                <p className="text-xs text-terrain max-w-sm mx-auto">
                  Thanks <strong>{formData.name}</strong>. We&apos;ll reply to{" "}
                  <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono underline text-carbon cursor-pointer pt-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="block space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                      Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                      Email *
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon"
                    />
                  </label>
                </div>

                {/* Project Type Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block">
                    Scope
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`cursor-pointer px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                          formData.projectType === type
                            ? "bg-carbon text-signal-lime border-carbon font-semibold"
                            : "bg-paper text-carbon border-terrain/30 hover:border-carbon"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block">
                    Budget
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={`cursor-pointer px-2.5 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                          formData.budget === range
                            ? "bg-signal-lime text-carbon border-carbon/20 font-semibold"
                            : "bg-paper text-terrain border-terrain/30 hover:border-carbon"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                    Brief *
                  </span>
                  <textarea
                    required
                    rows={3}
                    placeholder="What are you building, timeline, or links..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-terrain/30 bg-paper text-sm text-carbon focus:outline-none focus:border-carbon resize-none"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-terrain">
                    <Lock className="w-3 h-3" />
                    NDA friendly · Zero spam
                  </span>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-2.5 border border-carbon/15 inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Single Unified Info & Guarantees Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-carbon bg-carbon text-paper p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-signal-lime">
                  Direct Desk
                </span>
                <h2 className="text-xl sm:text-2xl font-space font-medium mt-0.5">
                  Fast, Transparent Builds
                </h2>
              </div>

              <div className="space-y-2.5 text-xs font-mono divide-y divide-white/10">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-terrain">EMAIL</span>
                  <a href="mailto:contact@xweet.in" className="text-signal-lime hover:underline">
                    contact@xweet.in
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-terrain">REPLY TIME</span>
                  <span>&lt; 24 Hours</span>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-terrain">TIMEZONE</span>
                  <span>IST (UTC +5:30)</span>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-terrain">AVAILABILITY</span>
                  <span className="text-signal-lime">Open for Sprints</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2.5 text-paper/90">
                <ShieldCheck className="w-4 h-4 text-signal-lime shrink-0" />
                <span>100% repository &amp; IP handover</span>
              </div>
              <div className="flex items-center gap-2.5 text-paper/90">
                <Code2 className="w-4 h-4 text-signal-lime shrink-0" />
                <span>Direct senior engineer collaboration</span>
              </div>
              <div className="flex items-center gap-2.5 text-paper/90">
                <FileCheck className="w-4 h-4 text-signal-lime shrink-0" />
                <span>Clear milestone-based pricing</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={COMMUNITY_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-[11px] font-mono"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
              <a
                href={COMMUNITY_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-[11px] font-mono"
              >
                <span>@xweet_69</span>
                <ArrowUpRight className="w-3 h-3 text-terrain" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
