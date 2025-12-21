"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const [openFaqKey, setOpenFaqKey] = useState<string | null>(null);
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

  // Duplicate for smooth marquee loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  /**
   * ✅ Candidate FAQ — 18 questions
   */
  const faq: FaqItem[] = [
    {
      q: "Do I pay any fees for your services?",
      a: "No. Our fees are paid entirely by hiring banks. You never pay anything to work with Executive Partners. This is standard in executive recruitment across the banking sector — employers value top talent and invest accordingly.",
    },
    {
      q: "How confidential is this process?",
      a: "Completely confidential. We never contact your current employer or disclose your interest in moving to anyone without your explicit permission. Most conversations happen outside office hours and we use personal email addresses, not work emails.",
    },
    {
      q: "I'm not actively looking but want to understand my options. Can I still talk to you?",
      a: "Absolutely. Many of our best placements come from passive candidates. There is no obligation or risk in exploring your options discreetly.",
    },
    {
      q: "How long does a typical placement take?",
      a: "From first conversation to signed offer, the process typically takes 8–16 weeks, depending on bank approvals, compliance, your notice period, and portfolio complexity.",
    },
    {
      q: "Do you have roles in specific cities?",
      a: "Yes. We work across Europe (Geneva, Zurich, London, Frankfurt, Paris, Madrid, Milan), the Middle East (Dubai, Abu Dhabi), Asia-Pacific (Singapore, Hong Kong), and the Americas (New York, Miami).",
    },
    {
      q: "What if my AUM isn't fully portable?",
      a: "Most RMs transfer between 30% and 80% of their book. Portability depends on client composition, jurisdiction, relationship depth, and constraints. Banks structure offers accordingly.",
    },
    {
      q: "How do you verify my AUM claims?",
      a: "Verification is done by the hiring bank during due diligence. We help you prepare anonymized client lists, revenue logic, concentration analysis, and disclosures early to avoid surprises.",
    },
    {
      q: "What if some of my clients have compliance issues?",
      a: "Transparency is essential. Issues don’t automatically disqualify a profile, but undisclosed issues can derail a process late. We help you frame risks honestly and early.",
    },
    {
      q: "How does your candidate vetting process work?",
      a: "We assess your book, portability, regulatory profile, career goals, and cultural fit. If there is a genuine match, we manage the introduction and the full process discreetly.",
    },
    {
      q: "What is your role in the hiring process?",
      a: "We advise end-to-end: positioning, introductions, compensation and contract guidance, interview preparation, due diligence support, closing, and onboarding.",
    },
    {
      q: "What if I want to stay confidential while exploring?",
      a: "That’s the standard. No work emails, no employer contact, no disclosure without your permission. We manage introductions discreetly and permission-based.",
    },
    {
      q: "What kind of compensation should I expect?",
      a: "It depends on geography, bank, seniority, and revenue. Switzerland, the UK, and the Middle East often price higher than continental Europe. We benchmark and advise realistically.",
    },
    {
      q: "Are there roles for different experience levels?",
      a: "Yes. We work with experienced RMs, rising talent, and cross-border moves. We’re transparent about what is realistic for each profile.",
    },
    {
      q: "What happens after I sign an offer?",
      a: "We stay involved through approvals, notice period planning, client transition strategy, and your first 90 days — execution is what drives long-term success.",
    },
    {
      q: "What if the placement doesn't work out?",
      a: "Rare, but if it happens, we help analyze the situation and support your next step. Retention matters more than short-term placements in private banking.",
    },
    {
      q: "How do I get started?",
      a: "Send your LinkedIn profile or a short CV. We schedule a confidential call to assess fit, current mandates, and advise honestly on next steps.",
    },
    {
      q: "How long before you contact me with opportunities?",
      a: "If there’s a strong match, typically within 2–4 weeks. Otherwise we maintain the relationship and re-engage when market demand aligns.",
    },
    {
      q: "Is there any cost to work with you?",
      a: "No. Hiring banks pay all fees. Your only investment is time for confidential discussions and interviews.",
    },
  ];

  const visibleFaq = showAllFaq ? faq : faq.slice(0, 8);

  // ✅ Reusable Value Card
  const ValueCard = ({
    imageSrc,
    accent,
    icon,
    title,
    items,
    href,
    cta,
    radial,
    buttonVariant = "gold",
  }: {
    imageSrc: string;
    accent: "gold" | "blue";
    icon: React.ReactNode;
    title: string;
    items: string[];
    href: string;
    cta: string;
    radial: string;
    buttonVariant?: "gold" | "white";
  }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.45)] transition hover:bg-white/[0.07] min-h-[320px] sm:min-h-0">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 92vw, 50vw"
          className="object-cover opacity-[0.26] scale-[1.03] transition duration-700 group-hover:scale-[1.06]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/75" />
        <div className={`absolute inset-0 ${radial}`} />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ring-1 ${
              accent === "gold"
                ? "bg-[#C9A14A]/15 ring-[#C9A14A]/35"
                : "bg-[#9ECBFF]/15 ring-[#9ECBFF]/30"
            }`}
          >
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-white/85">
          {items.map((txt) => (
            <li key={txt} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-300" />
              {txt}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <Link
            href={href}
            className={
              buttonVariant === "gold"
                ? "inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3.5 sm:py-3 text-black font-semibold shadow-lg shadow-black/40 hover:brightness-110 transition"
                : "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 sm:py-3 text-black font-semibold shadow-lg shadow-black/30 hover:bg-gray-100 transition"
            }
          >
            {cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

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

      {/* VALUE SECTION (RESTORED) */}
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

          {/* MOBILE: swipeable carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch] scrollbar-hide">
                <div className="snap-center shrink-0 w-[92%]">
                  <ValueCard
                    imageSrc="/home/candidates.jpg"
                    accent="gold"
                    icon={<Users className="h-5 w-5 text-[#F5D778]" />}
                    title="For Private Bankers"
                    items={[
                      "Discreet market calibration",
                      "Portability & business plan review",
                      "Negotiation & onboarding support",
                    ]}
                    href="/jobs"
                    cta="Explore Opportunities"
                    radial="bg-[radial-gradient(800px_360px_at_20%_20%,rgba(212,175,55,.18),transparent_60%)]"
                    buttonVariant="gold"
                  />
                </div>

                <div className="snap-center shrink-0 w-[92%]">
                  <ValueCard
                    imageSrc="/home/hiring-managers.jpg"
                    accent="blue"
                    icon={<TrendingUp className="h-5 w-5 text-[#DDEFFF]" />}
                    title="For Hiring Managers"
                    items={[
                      "Senior banker mapping",
                      "Verified portability logic",
                      "Clean compliance profiles",
                    ]}
                    href="/hiring-managers"
                    cta="Brief a Role"
                    radial="bg-[radial-gradient(900px_380px_at_80%_20%,rgba(158,203,255,.16),transparent_60%)]"
                    buttonVariant="white"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 backdrop-blur">
                Swipe →
              </div>

              <div className="mt-2 flex justify-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-white/30" />
                <span className="h-1.5 w-6 rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* DESKTOP: grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <ValueCard
              imageSrc="/home/candidates.jpg"
              accent="gold"
              icon={<Users className="h-5 w-5 text-[#F5D778]" />}
              title="For Private Bankers"
              items={[
                "Discreet market calibration",
                "Portability & business plan review",
                "Negotiation & onboarding support",
              ]}
              href="/jobs"
              cta="Explore Opportunities"
              radial="bg-[radial-gradient(800px_360px_at_20%_20%,rgba(212,175,55,.18),transparent_60%)]"
              buttonVariant="gold"
            />

            <ValueCard
              imageSrc="/home/hiring-managers.jpg"
              accent="blue"
              icon={<TrendingUp className="h-5 w-5 text-[#DDEFFF]" />}
              title="For Hiring Managers"
              items={[
                "Senior banker mapping",
                "Verified portability logic",
                "Clean compliance profiles",
              ]}
              href="/hiring-managers"
              cta="Brief a Role"
              radial="bg-[radial-gradient(900px_380px_at_80%_20%,rgba(158,203,255,.16),transparent_60%)]"
              buttonVariant="white"
            />
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

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black/40 to-transparent" />

            <div className="group py-6">
              <div className="flex w-max gap-5 pr-5 animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
                {marqueeItems.map((t, i) => (
                  <div
                    key={`${t.meta}-${i}`}
                    className="w-[300px] sm:w-[360px] rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur shadow-[0_14px_40px_rgba(0,0,0,.35)]"
                  >
                    <Quote className="h-4 w-4 text-[#F5D778]" />
                    <p className="mt-3 text-sm text-white/85 leading-relaxed">
                      “{t.quote}”
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="text-sm font-semibold">{t.meta}</div>
                      <div className="text-xs text-emerald-300 mt-1">
                        ✓ {t.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* scoped only — Vercel safe */}
              <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-33.333%);
                  }
                }
              `}</style>
            </div>
          </div>

          <p className="mt-3 text-xs text-white/45 text-center">Tip: hover to pause.</p>
        </div>
      </section>

      {/* FAQ (RESTORED) */}
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
            {visibleFaq.map((item) => {
              const isOpen = openFaqKey === item.q;

              return (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur"
                >
                  <button
                    onClick={() => setOpenFaqKey(isOpen ? null : item.q)}
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
                setOpenFaqKey(null);
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
                href={`/en/markets/${citySlug(city)}`}
                className="block rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 hover:bg-white/[0.08] transition cursor-pointer"
                aria-label={`Market ${city}`}
                prefetch={false}
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