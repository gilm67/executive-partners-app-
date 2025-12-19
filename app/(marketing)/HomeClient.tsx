"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  X,
  Quote,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

type FaqItem = { q: string; a: string };

export default function HomeClient() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const canSubmit = useMemo(() => email.trim().includes("@"), [email]);

  const handleEmailSubmit = async () => {
    if (!canSubmit) return;
    await new Promise((r) => setTimeout(r, 600));
    setFormSubmitted(true);
    setTimeout(() => {
      setShowEmailPopup(false);
      setFormSubmitted(false);
      setEmail("");
    }, 1500);
  };

  const cities = [
    "Geneva",
    "Zurich",
    "London",
    "Dubai",
    "Singapore",
    "Hong Kong",
    "New York",
    "Miami",
    "Paris",
    "Milan",
    "Madrid",
    "Lisbon",
  ];

  const citySlug = (city: string) =>
    city
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[’']/g, "")
      .replace(/\s+/g, "-");

  const testimonials = [
    {
      quote:
        "Executive Partners calibrated my move with a realistic portability view. Discreet, fast and outcome-driven.",
      meta: "Senior RM · Swiss Private Bank",
      result: "Strong retention after move",
    },
    {
      quote:
        "Outstanding shortlist quality. Senior bankers with verified revenue logic and clean compliance.",
      meta: "Market Head · International Private Bank",
      result: "Role filled successfully",
    },
    {
      quote: "Their tools materially improved approval discussions with the bank.",
      meta: "Team Head · Private Banking",
      result: "Approval-ready business plan",
    },
  ];

  /**
   * FAQ — 18 questions (luxe accordion)
   * If you want the exact original wording from your file, paste it and I’ll swap it in 1:1.
   */
  const faq: FaqItem[] = [
  {
    q: "Do I pay any fees for your services?",
    a: "No. Our fees are paid entirely by hiring banks. You never pay anything to work with Executive Partners. This is standard in executive recruitment across the banking sector — employers value top talent and invest accordingly.",
  },
  {
    q: "How confidential is this process?",
    a: "Completely confidential. We never contact your current employer or disclose your interest in moving to anyone without your explicit permission. Most conversations happen outside office hours and we use personal email addresses, not work emails. This reflects best practice in executive recruitment and our commitment to protecting your career.",
  },
  {
    q: "I'm not actively looking but want to understand my options. Can I still talk to you?",
    a: "Absolutely. Most of our best placements come from passive candidates — professionals who were not actively job hunting but open to the right opportunity. These hires bring stability, proven track records, and strong client relationships, which is exactly what hiring banks value. There is no obligation or risk in exploring your options.",
  },
  {
    q: "How long does a typical placement take?",
    a: "From first conversation to signed offer, the process typically takes 8–16 weeks. Timelines depend on bank approval processes, regulatory requirements, your notice period, and the complexity of your client portfolio. Senior RM moves often sit at the longer end due to deeper due diligence on AUM and client relationships.",
  },
  {
    q: "Do you have roles in specific cities?",
    a: "Yes. We work across Europe (Geneva, Zurich, London, Frankfurt, Paris, Madrid, Milano), the Middle East (Dubai, Abu Dhabi), Asia-Pacific (Singapore, Hong Kong), and the Americas (New York, Miami). If no current role matches, we keep your profile active and can also provide proactive market mapping.",
  },
  {
    q: "What if my AUM isn't fully portable?",
    a: "Most relationship managers transfer between 30% and 80% of their book. Portability depends on client composition, jurisdiction, relationship depth, and regulatory constraints. Banks understand this and structure offers accordingly. Our Portability Score helps you build realistic, credible assumptions.",
  },
  {
    q: "How do you verify my AUM claims?",
    a: "Verification is done by the hiring bank during due diligence. We prepare you for what banks will request, including anonymised client lists, portfolio statements, revenue reports, concentration analysis, and non-compete constraints, so there are no surprises during approvals.",
  },
  {
    q: "What if some of my clients have compliance issues?",
    a: "Transparency is essential. Compliance issues do not automatically disqualify a candidate, but undisclosed issues can derail offers late in the process. We help you frame risks honestly, demonstrate sound risk management, and prepare appropriate disclosures early.",
  },
  {
    q: "How does your candidate vetting process work?",
    a: "We assess your book, portability, regulatory profile, career goals, and cultural fit with target banks. If there is a genuine match with an active mandate, we manage the introduction and process. If not, we maintain the relationship for future opportunities.",
  },
  {
    q: "What is your role in the hiring process?",
    a: "We act as advisor and advocate throughout: positioning your profile, introducing you to the right banks, advising on compensation and non-compete clauses, preparing you for interviews and due diligence, and supporting closing and onboarding.",
  },
  {
    q: "What if I want to stay confidential while exploring?",
    a: "That is exactly how most candidates engage with us. No work emails, no LinkedIn outreach, no employer contact without written permission. We manage introductions discreetly and can position you as a passive candidate approached by the bank.",
  },
  {
    q: "What kind of compensation should I expect?",
    a: "Compensation depends on geography, bank type, seniority, and revenue generation. Switzerland, the UK, and the Middle East generally offer higher packages than continental Europe. We provide realistic benchmarks and negotiate on your behalf.",
  },
  {
    q: "Are there roles for different experience levels?",
    a: "Yes. We work with experienced RMs (7+ years), rising talents (3–7 years), and professionals relocating geographically. Most mandates are senior, but we are transparent about what is realistic for each profile.",
  },
  {
    q: "What happens after I sign an offer?",
    a: "We stay involved through regulatory approvals, notice period management, client transition planning, and your first 90 days at the new bank. Early execution often determines long-term success.",
  },
  {
    q: "What if the placement doesn't work out?",
    a: "This is rare, but if it happens, we help analyse the situation and support your next step. Long-term retention matters more than short-term placements in private banking.",
  },
  {
    q: "How do I get started?",
    a: "Send us your LinkedIn profile or a short CV. We will schedule a confidential discussion to understand your background, assess current mandates, and advise honestly on next steps. There is no obligation.",
  },
  {
    q: "How long before you contact me with opportunities?",
    a: "If there is a strong match, typically within 2–4 weeks. Otherwise, your profile remains active and we reach out when market demand aligns. Private banking recruitment is cyclical, and timing matters.",
  },
  {
    q: "Is there any cost to work with you?",
    a: "No. Hiring banks pay all fees. Your only investment is time spent in confidential discussions with us and potential employers.",
  },
];

  const visibleFaq = showAllFaq ? faq : faq.slice(0, 8);

  return (
    <div className="relative text-white">
      {/* BACKDROP */}
      <div className="absolute inset-0 -z-10 bg-[#070A10]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 420px at 15% 0%, rgba(201,161,74,.18), transparent 60%), radial-gradient(800px 380px at 90% 20%, rgba(158,203,255,.14), transparent 55%), linear-gradient(to bottom, rgba(255,255,255,.04), rgba(0,0,0,0))",
        }}
      />

      {/* VALUE SECTION */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Confidential • Senior-level • Outcome-driven
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Built for senior private banking moves
            </h2>
            <p className="mt-3 text-white/75 max-w-3xl mx-auto">
              Executive search and advisory with disciplined portability logic and
              real market intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Candidates */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.45)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#C9A14A]/15 ring-1 ring-[#C9A14A]/35 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#F5D778]" />
                </div>
                <h3 className="text-xl font-semibold">For Private Bankers</h3>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Discreet market calibration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Portability &amp; business plan review
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Negotiation &amp; onboarding support
                </li>
              </ul>

              <div className="mt-7">
                <Link
                  href="/jobs"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-black font-semibold shadow-lg shadow-black/40 hover:brightness-110 transition"
                >
                  Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Hiring Managers */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.45)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#9ECBFF]/15 ring-1 ring-[#9ECBFF]/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#DDEFFF]" />
                </div>
                <h3 className="text-xl font-semibold">For Hiring Managers</h3>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Senior banker mapping
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Verified portability logic
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
                  Clean compliance profiles
                </li>
              </ul>

              <div className="mt-7">
                <Link
                  href="/hiring-managers"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-black font-semibold shadow-lg shadow-black/30 hover:bg-gray-100 transition"
                >
                  Brief a Role <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 border-y border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Client feedback
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Trusted by private banking professionals
              </h2>
              <p className="mt-2 text-white/75 max-w-2xl">
                Discreet execution. Strong outcomes. Measurable retention.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
            >
              Request a confidential call <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur shadow-[0_14px_40px_rgba(0,0,0,.35)]"
              >
                <Quote className="h-4 w-4 text-[#F5D778]" />
                <p className="mt-3 text-sm text-white/85 leading-relaxed">
                  “{t.quote}”
                </p>
                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="text-sm font-semibold">{t.meta}</div>
                  <div className="text-xs text-emerald-300 mt-1">✓ {t.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (18 Qs) */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur">
              <HelpCircle className="h-4 w-4 text-[#F5D778]" />
              Candidate FAQ
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-white/75 max-w-2xl mx-auto">
              The answers below reflect our real process: discreet, permission-based,
              and senior-focused.
            </p>
          </div>

          <div className="space-y-3">
            {visibleFaq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white/95">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-white/70 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-white/80 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setShowAllFaq((v) => !v);
                setOpenFaq(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
            >
              {showAllFaq ? "Show fewer questions" : "Show all 18 questions"}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  showAllFaq ? "rotate-180" : ""
                }`}
              />
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 hover:brightness-110 transition"
            >
              Ask a confidential question <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="py-16 border-t border-white/10 bg-black/25">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Globe className="h-8 w-8 mx-auto text-[#DDEFFF]" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Global Private Banking Hubs
          </h2>
          <p className="mt-3 text-white/75">
            Explore opportunities in key booking centres
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/private-banking-jobs/${citySlug(city)}`}
                className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 hover:bg-white/[0.08] transition"
              >
                <span className="font-semibold text-white/90">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready to calibrate your next move?
          </h2>
          <p className="mt-3 text-white/75">
            Confidential discussion. Senior-level insight. No obligation.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-8 py-4 text-black font-semibold shadow-lg shadow-black/40 hover:brightness-110 transition"
            >
              Schedule a confidential call <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <button
              onClick={() => setShowEmailPopup(true)}
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-8 py-4 text-white font-semibold ring-1 ring-white/12 hover:bg-white/10 transition"
            >
              Get access to tools <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* EMAIL MODAL */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B0E13] p-8 rounded-2xl w-full max-w-md relative border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,.75)]">
            <button
              onClick={() => setShowEmailPopup(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {!formSubmitted ? (
              <>
                <h3 className="text-xl font-semibold">Access the tools</h3>
                <p className="mt-2 text-sm text-white/70">
                  Enter your email to receive a secure access link.
                </p>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-5 w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                  placeholder="your.email@bank.com"
                />

                <button
                  onClick={handleEmailSubmit}
                  disabled={!canSubmit}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-black font-semibold disabled:opacity-60 shadow-lg shadow-black/40 hover:brightness-110 transition"
                >
                  Get access
                </button>

                <p className="mt-4 text-xs text-white/50 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-emerald-300 mx-auto" />
                <p className="mt-3 text-white/80">Check your email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}