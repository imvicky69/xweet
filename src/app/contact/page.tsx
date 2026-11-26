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

const PROJECT_TYPES = ["Portfolio / Site", "Web App", "Android & iOS App", "Full Ecosystem"];
const BUDGET_PRESETS = [
  { label: "₹8,000+", hint: "Portfolio / Landing" },
  { label: "₹25,000+", hint: "Web App / SaaS" },
  { label: "₹70,000+", hint: "Full Android & iOS" },
  { label: "Custom", hint: "Enter INR" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Web App",
    budget: "₹25,000+",
    customBudget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const effectiveBudget =
    formData.budget === "Custom"
      ? formData.customBudget.trim() || "Flexible / Custom"
      : formData.budget;

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
            href="mailto:vikky@xweet.in"
            className="inline-flex items-center gap-1.5 rounded-full border border-terrain/35 bg-white/70 px-4 py-2 text-xs font-mono text-carbon hover:border-carbon transition-colors self-start sm:self-auto"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>vikky@xweet.in</span>
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
                  Thanks <strong>{formData.name}</strong>. We received your{" "}
                  <strong>{formData.projectType}</strong> inquiry ({effectiveBudget}) and will reach out to{" "}
                  <strong>{formData.email}</strong>
                  {formData.phone ? ` or ${formData.phone}` : ""} within 24 hours.
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <label className="block space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-terrain">
                      Phone / WhatsApp
                    </span>
                    <input
                      type="tel"
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                {/* Budget Pills (INR) + Optional Custom Input */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block">
                    Budget (INR · Optional)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {BUDGET_PRESETS.map((item) => {
                      const active = formData.budget === item.label;
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => setFormData({ ...formData, budget: item.label })}
                          className={`cursor-pointer px-3 py-2 rounded-2xl border text-left transition-colors ${
                            active
                              ? "bg-signal-lime text-carbon border-carbon/20 font-semibold"
                              : "bg-paper text-carbon border-terrain/30 hover:border-carbon"
                          }`}
                        >
                          <span className="block text-xs font-mono leading-tight">{item.label}</span>
                          <span
                            className={`block text-[10px] mt-0.5 ${
                              active ? "text-carbon/75" : "text-terrain"
                            }`}
                          >
                            {item.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {formData.budget === "Custom" && (
                    <input
                      type="text"
                      placeholder="Enter optional budget in INR (e.g. ₹40,000)"
                      value={formData.customBudget}
                      onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-terrain/30 bg-paper text-xs font-mono text-carbon focus:outline-none focus:border-carbon"
                    />
                  )}
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
                  <a href="mailto:hello@xweet.in" className="text-signal-lime hover:underline">
                    hello@xweet.in
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-terrain">STARTING AT</span>
                  <span>₹8,000 (Site) · ₹70k (Mobile)</span>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-terrain">REPLY TIME</span>
                  <span>&lt; 24 Hours</span>
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
                <span>Clear milestone-based INR pricing</span>
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
