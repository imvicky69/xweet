"use client";

import { useState } from "react";
import Image from "next/image";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Code2,
  Lock,
  FileCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web Application",
    budget: "$3,000 – $10,000",
    timeline: "1 - 2 Months",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending inquiry (client side feedback)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const PROJECT_TYPES = [
    "Web Application",
    "Mobile App (iOS & Android)",
    "Full-Stack Ecosystem",
    "UI/UX & Redesign",
    "API / Real-time System",
  ];

  const BUDGET_RANGES = [
    "< $1,500",
    "$1,500 – $3,000",
    "$3,000 – $10,000",
    "$10,000+",
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      <StudioNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-terrain/35 text-xs font-mono text-carbon">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span className="uppercase tracking-wider font-semibold">
              START A PROJECT · DIRECT ARCHITECT CONSULTATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-space font-light tracking-tight text-carbon">
            Let&apos;s build your <br />
            <span className="font-playwrite text-3xl sm:text-5xl text-terrain block mt-1">
              app or website.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-carbon/80 font-light leading-relaxed">
            Have a product vision, technical specification, or redesign ready to execute? Share your requirements below. You will speak directly with an experienced builder—no sales friction, no outsourced handoffs.
          </p>
        </div>

        {/* Main Form & Trust Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-terrain/35 rounded-3xl p-6 sm:p-10 bg-white/60 backdrop-blur-xs shadow-sm space-y-6">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-signal-lime/30 border border-signal-lime text-carbon flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-carbon" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
                    Inquiry Received!
                  </h3>

                  <p className="text-sm text-carbon/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. We have received your project details. We will review your technical scope and reply to <strong>{formData.email}</strong> within <strong>24 hours</strong> with an architectural breakdown.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="cursor-pointer text-xs font-mono text-carbon underline hover:text-black"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-terrain">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-terrain/35 bg-paper text-carbon text-sm focus:outline-none focus:border-carbon transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-terrain">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-terrain/35 bg-paper text-carbon text-sm focus:outline-none focus:border-carbon transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-terrain">
                      Project Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() =>
                            setFormData({ ...formData, projectType: type })
                          }
                          className={`cursor-pointer px-3.5 py-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${formData.projectType === type
                              ? "bg-carbon text-paper border-carbon shadow-2xs"
                              : "bg-paper text-carbon border-terrain/30 hover:border-carbon/60"
                            }`}
                        >
                          <span>{type}</span>
                          {formData.projectType === type && (
                            <span className="w-2 h-2 rounded-full bg-signal-lime" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-terrain">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_RANGES.map((range) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() =>
                            setFormData({ ...formData, budget: range })
                          }
                          className={`cursor-pointer px-3 py-2 rounded-xl border text-center text-xs font-mono transition-all ${formData.budget === range
                              ? "bg-signal-lime text-carbon font-semibold border-signal-lime"
                              : "bg-paper text-terrain border-terrain/30 hover:border-carbon/60"
                            }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Scope */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-terrain">
                      Project Overview &amp; Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what you're building, key features, target deadline, or any existing repos/designs..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-terrain/35 bg-paper text-carbon text-sm focus:outline-none focus:border-carbon transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer w-full py-4 rounded-2xl bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border border-signal-lime/90 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Project Request</span>
                          <ArrowRight className="w-4 h-4 text-carbon" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-terrain text-center pt-1">
                    <Lock className="w-3.5 h-3.5 text-terrain" />
                    <span>Zero spam. Strict privacy. NDA friendly.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Trust Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channel Box */}
            <div className="border border-carbon rounded-3xl p-6 sm:p-8 bg-carbon text-paper space-y-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-signal-lime block">
                    Studio Channels
                  </span>
                  <h3 className="text-xl sm:text-2xl font-space font-medium">
                    Direct Inquiries
                  </h3>
                  <p className="text-xs text-terrain font-light leading-relaxed">
                    Prefer direct correspondence over forms? Reach out to our lead engineering desk.
                  </p>
                </div>
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <Image
                    src="/logo-clear.png"
                    alt="xweet"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs divide-y divide-white/10">
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-terrain">DIRECT EMAIL</span>
                  <a
                    href="mailto:hello@xweet.in"
                    className="text-signal-lime hover:underline font-semibold"
                  >
                    hello@xweet.in
                  </a>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-terrain">RESPONSE GUARANTEE</span>
                  <span className="text-paper">&lt; 24 Hours</span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-terrain">LOCATION / TIMEZONE</span>
                  <span className="text-paper">Worldwide (UTC +5:30)</span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-terrain">DEVELOPMENT SLOTS</span>
                  <span className="text-signal-lime flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-pulse" />
                    <span>Active Sprints Open</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Client Commitments / Trust Factors */}
            <div className="border border-terrain/35 rounded-3xl p-6 sm:p-8 bg-white/40 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
                Client Guarantees &amp; Standards
              </h4>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-signal-lime/30 border border-signal-lime/60 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-carbon" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-carbon font-space text-sm">
                      100% Code &amp; IP Ownership
                    </h5>
                    <p className="text-terrain mt-0.5 leading-relaxed">
                      All repositories, production configurations, and design assets are transferred directly to your organization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-mist/35 border border-mist/70 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-4 h-4 text-carbon" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-carbon font-space text-sm">
                      Direct Developer Collaboration
                    </h5>
                    <p className="text-terrain mt-0.5 leading-relaxed">
                      You collaborate directly with senior product builders. Zero lost context or synthetic agency markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-carbon text-paper flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-carbon font-space text-sm">
                      Milestone-Based Transparent Invoicing
                    </h5>
                    <p className="text-terrain mt-0.5 leading-relaxed">
                      Structured milestone deliverables with zero surprise fees. You sign off on working code before payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}

