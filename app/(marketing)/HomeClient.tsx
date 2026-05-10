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
} from "lucide-react";

import CandidateFAQ from "@/components/CandidateFAQ";
import { INSIGHTS } from "@/app/en/insights/articles";

// City data with region, country code and ambient glow color
const CITIES = [
  { name: "Geneva",    region: "Switzerland",  glow: "rgba(201,161,74,.18)",  primary: true  },
  { name: "Zurich",    region: "Switzerland",  glow: "rgba(201,161,74,.15)",  primary: true  },
  { name: "London",    region: "United Kingdom", glow: "rgba(158,203,255,.15)", primary: true },
  { name: "Dubai",     region: "UAE",          glow: "rgba(255,180,60,.18)",  primary: true  },
  { name: "Singapore", region: "Southeast Asia", glow: "rgba(100,220,180,.14)", primary: false },
  { name: "Hong Kong", region: "Asia Pacific", glow: "rgba(255,140,100,.14)", primary: false },
  { name: "New York",  region: "United States", glow: "rgba(158,203,255,.13)", primary: false },
  { name: "Miami",     region: "United States", glow: "rgba(158,203,255,.12)", primary: false },
  { name: "Paris",     region: "France",       glow: "rgba(201,161,74,.13)",  primary: false },
  { name: "Milan",     region: "Italy",        glow: "rgba(201,161,74,.12)",  primary: false },
  { name: "Madrid",    region: "Spain",        glow: "rgba(255,160,80,.12)",  primary: false },
  { name: "Lisbon",    region: "Portugal",     glow: "rgba(255,160,80,.11)",  primary: false },
];

export default function HomeClient() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const citySlug = (city: string) =>
    city.toLowerCase().trim()
      .replace(/&/g, "and")
      .replace(/['']/g, "")
      .replace(/\s+/g, "-");

  const testimonials = [
    {
      quote: "Executive Partners calibrated my move with a realistic portability view. Discreet, fast and outcome-driven.",
      meta: "Senior RM · Swiss Private Bank",
      result: "Strong retention after move",
    },
    {
      quote: "Outstanding shortlist quality. Senior bankers with verified revenue logic and clean compliance.",
      meta: "Market Head · International Private Bank",
      result: "Role filled successfully",
    },
    {
      quote: "Their tools materially improved approval discussions with the bank.",
      meta: "Team Head · Private Banking",
      result: "Approval-ready business plan",
    },
  ];

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  const ValueCard = ({
    imageSrc, accent, icon, title, items, href, cta, radial, buttonVariant = "gold",
  }: {
    imageSrc: string; accent: "gold" | "blue"; icon: React.ReactNode;
    title: string; items: string[]; href: string; cta: string;
    radial: string; buttonVariant?: "gold" | "white";
  }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur shadow-[0_24px_64px_rgba(0,0,0,.55)] transition-all duration-500 hover:border-white/20 hover:shadow-[0_32px_80px_rgba(0,0,0,.65)]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 92vw, 50vw"
          className="object-cover opacity-[0.22] scale-[1.04] transition duration-700 group-hover:scale-[1.08] group-hover:opacity-[0.28]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />
        <div className={`absolute inset-0 ${radial}`} />
      </div>

      <div className={`absolute top-0 left-0 right-0 h-[1px] ${accent === "gold" ? "bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" : "bg-gradient-to-r from-transparent via-[#9ECBFF]/50 to-transparent"}`} />

      <div className="relative p-7 sm:p-9">
        <div className="flex items-center gap-4">
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center ring-1 ${accent === "gold" ? "bg-[#C9A14A]/15 ring-[#C9A14A]/40" : "bg-[#9ECBFF]/12 ring-[#9ECBFF]/30"}`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
        </div>

        <div className="mt-6 mb-5 h-px bg-white/8" />

        <ul className="space-y-3">
          {items.map((txt) => (
            <li key={txt} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
              {txt}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={href}
            className={
              buttonVariant === "gold"
                ? "inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C9A14A] to-[#F0D060] px-6 py-3.5 text-[#0B0E13] text-sm font-semibold tracking-wide shadow-[0_8px_32px_rgba(201,161,74,.35)] hover:shadow-[0_12px_40px_rgba(201,161,74,.50)] hover:brightness-105 transition-all duration-300"
                : "inline-flex w-full items-center justify-center rounded-full bg-white/8 px-6 py-3.5 text-white text-sm font-semibold tracking-wide ring-1 ring-white/15 hover:bg-white/14 hover:ring-white/25 transition-all duration-300"
            }
          >
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative text-white">
      {/* BACKDROP */}
      <div className="absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 500px at 10% 0%, rgba(201,161,74,.12), transparent 55%), radial-gradient(900px 400px at 92% 15%, rgba(158,203,255,.10), transparent 50%)",
        }}
      />

      {/* KPI STRIP */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-white/8 text-center">
            {[
              { value: "200+", label: "Placements", sub: "Senior RMs & Private Bankers" },
              { value: "98%", label: "12-month Retention", sub: "Candidates still in seat" },
              { value: "12+", label: "Global Hubs", sub: "Geneva · Dubai · Singapore" },
            ].map((kpi) => (
              <div key={kpi.label} className="px-4 py-8 sm:px-8 sm:py-10 text-center">
                <div className="font-[var(--font-playfair)] text-3xl sm:text-5xl font-semibold text-[#D4AF37]">
                  {kpi.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-white/90 tracking-wide uppercase">
                  {kpi.label}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-white/45 leading-snug hidden sm:block">
                  {kpi.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/60 backdrop-blur mb-5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Confidential · Senior-level · Outcome-driven
            </div>
            <h2 className="font-[var(--font-playfair)] text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15]">
              Built for senior<br />
              <span className="text-[#D4AF37]">private banking</span> moves
            </h2>
            <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Executive search and advisory with disciplined portability logic and real market intelligence.
            </p>
          </div>

          {/* MOBILE: swipeable carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch] scrollbar-hide">
                <div className="snap-center shrink-0 w-[92%]">
                  <ValueCard
                    imageSrc="/home/candidates.jpg"
                    accent="gold"
                    icon={<Users className="h-5 w-5 text-[#F5D778]" />}
                    title="For Private Bankers"
                    items={["Discreet market calibration", "Portability & business plan review", "Negotiation & onboarding support"]}
                    href="/jobs"
                    cta="Explore Opportunities"
                    radial="bg-[radial-gradient(800px_360px_at_20%_20%,rgba(212,175,55,.15),transparent_60%)]"
                    buttonVariant="gold"
                  />
                </div>
                <div className="snap-center shrink-0 w-[92%]">
                  <ValueCard
                    imageSrc="/home/hiring-managers.jpg"
                    accent="blue"
                    icon={<TrendingUp className="h-5 w-5 text-[#DDEFFF]" />}
                    title="For Hiring Managers"
                    items={["Senior banker mapping", "Verified portability logic", "Clean compliance profiles"]}
                    href="/hiring-managers"
                    cta="Brief a Role"
                    radial="bg-[radial-gradient(900px_380px_at_80%_20%,rgba(158,203,255,.13),transparent_60%)]"
                    buttonVariant="white"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] text-white/60 backdrop-blur md:hidden">
                Swipe &#8594;
              </div>
              <div className="mt-3 flex justify-center gap-1.5">
                <span className="h-1 w-8 rounded-full bg-[#D4AF37]/60" />
                <span className="h-1 w-4 rounded-full bg-white/15" />
              </div>
            </div>
          </div>

          {/* DESKTOP: grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-5">
            <ValueCard
              imageSrc="/home/candidates.jpg"
              accent="gold"
              icon={<Users className="h-5 w-5 text-[#F5D778]" />}
              title="For Private Bankers"
              items={["Discreet market calibration", "Portability & business plan review", "Negotiation & onboarding support"]}
              href="/jobs"
              cta="Explore Opportunities"
              radial="bg-[radial-gradient(800px_360px_at_20%_20%,rgba(212,175,55,.15),transparent_60%)]"
              buttonVariant="gold"
            />
            <ValueCard
              imageSrc="/home/hiring-managers.jpg"
              accent="blue"
              icon={<TrendingUp className="h-5 w-5 text-[#DDEFFF]" />}
              title="For Hiring Managers"
              items={["Senior banker mapping", "Verified portability logic", "Clean compliance profiles"]}
              href="/hiring-managers"
              cta="Brief a Role"
              radial="bg-[radial-gradient(900px_380px_at_80%_20%,rgba(158,203,255,.13),transparent_60%)]"
              buttonVariant="white"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════
          GLOBAL HUBS — premium two-tier card layout
      ═══════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/80 mb-3">
                Markets
              </p>
              <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl font-semibold tracking-tight">
                Global Private Banking Hubs
              </h2>
              <p className="mt-2 text-white/50 text-sm sm:text-base">
                Explore mandates across 12 key booking centres
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/25 text-[11px] tracking-widest uppercase">
              <Globe className="h-3.5 w-3.5" />
              <span>12 financial centres</span>
            </div>
          </div>

          {/* Primary hubs — 2x2 large cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {[
              { idx: "01", flag: "🇨🇭", city: "Geneva",    region: "Switzerland · Booking centre",  slug: "geneva",    photo: "/markets/geneva.jpg",    glow: "rgba(201,161,74,0.08)" },
              { idx: "02", flag: "🇨🇭", city: "Zurich",    region: "Switzerland · Booking centre",  slug: "zurich",    photo: "/markets/zurich.jpg",    glow: "rgba(201,161,74,0.08)" },
              { idx: "03", flag: "🇬🇧", city: "London",    region: "United Kingdom · Booking centre", slug: "london",    photo: "/markets/london.jpg",   glow: "rgba(158,203,255,0.07)" },
              { idx: "04", flag: "🇦🇪", city: "Dubai",     region: "UAE · DIFC booking centre",     slug: "dubai",     photo: "/markets/dubai.jpg",     glow: "rgba(255,180,60,0.07)" },
            ].map((c) => (
              <Link
                key={c.city}
                href={`/en/markets/${c.slug}`}
                prefetch={false}
                className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#D4AF37]/40"
              >
                {c.photo && <Image src={c.photo} alt={c.city} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/93" />
                <div className="relative z-10 p-6">
                <p className="font-mono text-[11px] text-white/20 group-hover:text-[#D4AF37]/40 transition-colors mb-3">{c.idx}</p>
                <span className="text-2xl mb-3 block">{c.flag}</span>
                <div className="font-[var(--font-playfair)] text-xl font-semibold text-white">{c.city}</div>
                <div className="text-xs text-white/40 mt-1">{c.region}</div>
                <div className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 text-[#D4AF37]/80">
                  Primary hub
                </div>
                <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                  <span className="text-xs text-white/30 font-medium group-hover:text-white/50 transition-colors">View market</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]/60 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary hubs — 4-column compact cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { idx: "05", flag: "🇸🇬", city: "Singapore", region: "Southeast Asia",  slug: "singapore", photo: "/markets/singapore.jpg", glow: "rgba(100,220,180,0.07)" },
              { idx: "06", flag: "🇭🇰", city: "Hong Kong", region: "Asia Pacific",    slug: "hong-kong", photo: "/markets/hong-kong.jpg", glow: "rgba(255,140,100,0.07)" },
              { idx: "07", flag: "🇺🇸", city: "New York",  region: "United States",   slug: "new-york",  photo: "/markets/new-york.jpg",  glow: "rgba(158,203,255,0.07)" },
              { idx: "08", flag: "🇺🇸", city: "Miami",     region: "United States",   slug: "miami",     photo: "/markets/miami.jpg",     glow: "rgba(158,203,255,0.06)" },
              { idx: "09", flag: "🇫🇷", city: "Paris",     region: "France",          slug: "paris",     photo: "/markets/paris.jpg",     glow: "rgba(201,161,74,0.06)" },
              { idx: "10", flag: "🇮🇹", city: "Milan",     region: "Italy",           slug: "milan",     photo: "/markets/milan.jpg",     glow: "rgba(201,161,74,0.06)" },
              { idx: "11", flag: "🇪🇸", city: "Madrid",    region: "Spain",           slug: "madrid",    photo: "/markets/madrid.jpg",    glow: "rgba(255,160,80,0.06)" },
              { idx: "12", flag: "🇵🇹", city: "Lisbon",    region: "Portugal",        slug: "lisbon",    photo: "/markets/lisbon.jpg",    glow: "rgba(255,160,80,0.06)" },
            ].map((c) => (
              <Link
                key={c.city}
                href={`/en/markets/${c.slug}`}
                prefetch={false}
                className="group relative overflow-hidden rounded-xl border border-white/8 transition-all duration-300 hover:border-[#D4AF37]/35"
              >
                {c.photo && <Image src={c.photo} alt={c.city} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/93" />
                <div className="relative z-10 p-4">
                <p className="font-mono text-[10px] text-white/15 group-hover:text-[#D4AF37]/35 transition-colors mb-2">{c.idx}</p>
                <span className="text-lg mb-2 block">{c.flag}</span>
                <div className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-tight">{c.city}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{c.region}</div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-white/20 group-hover:text-[#D4AF37]/60 transition-colors duration-200">
                  <span className="font-medium">View market</span>
                  <ArrowRight className="h-3 w-3 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* INSIGHTS STRIP */}
      <section className="py-20 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/80 mb-3">Private Wealth Pulse</p>
              <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl font-semibold tracking-tight">Latest Intelligence</h2>
              <p className="mt-2 text-white/50 text-sm">Strategy and talent analysis for senior private banking professionals.</p>
            </div>
            <Link href="/en/insights" className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <InsightsStrip />
        </div>
      </section>

      {/* FAQ */}
      <CandidateFAQ compact limit={6} />



      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 600px at 50% 100%, rgba(201,161,74,.14), transparent 60%), radial-gradient(800px 400px at 20% 50%, rgba(158,203,255,.08), transparent 55%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="mx-auto max-w-4xl px-4 py-24 sm:py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/70 mb-5">
            Next step
          </p>
          <h2 className="font-[var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Ready to calibrate<br />
            <span className="text-[#D4AF37]">your next move?</span>
          </h2>
          <p className="mt-5 text-white/55 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Confidential discussion. Senior-level insight. No obligation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C9A14A] to-[#F0D060] px-8 py-4 text-[#0B0E13] text-sm font-semibold tracking-wide shadow-[0_8px_40px_rgba(201,161,74,.40)] hover:shadow-[0_12px_52px_rgba(201,161,74,.55)] hover:brightness-105 transition-all duration-300"
            >
              Schedule a confidential call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <button
              onClick={() => setShowEmailPopup(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 py-4 text-white text-sm font-semibold tracking-wide hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            >
              Get access to tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <p className="mt-8 text-[11px] text-white/30 tracking-wide">
            Used by 500+ private bankers · 100% confidential · No obligation
          </p>
        </div>
      </section>

      {/* EMAIL MODAL */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-black/90 p-8 rounded-2xl w-full max-w-md relative border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,.80)]">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <button
              onClick={() => setShowEmailPopup(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {!formSubmitted ? (
              <>
                <h3 className="text-xl font-semibold tracking-tight">Access the tools</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  Enter your email to receive a secure access link.
                </p>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-6 w-full rounded-xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/30 transition"
                  placeholder="your.email@bank.com"
                />

                <button
                  onClick={handleEmailSubmit}
                  disabled={!canSubmit}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-[#C9A14A] to-[#F0D060] px-6 py-3 text-[#0B0E13] text-sm font-semibold tracking-wide disabled:opacity-50 shadow-[0_8px_32px_rgba(201,161,74,.35)] hover:brightness-105 transition-all duration-300"
                >
                  Get access
                </button>

                <p className="mt-4 text-[11px] text-white/35 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
                <p className="mt-4 text-white/80 font-semibold">Check your email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function InsightsStrip() {
  const articles = [...INSIGHTS]
    .filter((a) => a.body)
    .sort((a, b) => {
      const ta = Date.parse((a.date || "").trim());
      const tb = Date.parse((b.date || "").trim());
      return (isNaN(tb) ? 0 : tb) - (isNaN(ta) ? 0 : ta);
    })
    .slice(0, 3);

  function fmt(iso: string) {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      }).format(new Date(iso));
    } catch { return iso; }
  }

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {articles.map((a, i) => (
        <Link
          key={a.slug}
          href={`/en/insights/${a.slug}`}
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#D4AF37]/30"
        >
          {i === 0 && (
            <span className="mb-3 w-fit rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
              Latest
            </span>
          )}
          <div className="text-xs text-white/40 mb-3">{fmt(a.date)}</div>
          <h3 className="flex-1 font-[var(--font-playfair)] text-lg font-semibold leading-snug text-white">{a.title}</h3>
          <p className="mt-3 text-sm text-white/60 line-clamp-2">{a.summary}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
            Read full article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}

