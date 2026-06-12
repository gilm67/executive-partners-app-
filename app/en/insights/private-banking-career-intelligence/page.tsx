"use client";

import Link from "next/link";
import { useState } from "react";
import { BreadcrumbSchema } from "@/components/StructuredData";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.execpartners.ch";

const PAGE_URL = `${SITE}/en/insights/private-banking-career-intelligence`;

/* ── Anonymous email capture ─────────────────────────────────────────── */
function PortabilityCapture() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const obfuscate = (e: string) => {
    const [local, domain] = e.split("@");
    if (!domain) return e;
    return local[0] + "***@" + domain;
  };

  const handleSubmit = async () => {
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    try {
      await fetch("/api/portability-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "career-intelligence-2026" }),
      });
      setSent(true);
      setError("");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6 text-center">
        <p className="text-emerald-400 font-semibold text-sm">Report sent to {obfuscate(email)}</p>
        <p className="mt-1 text-xs text-white/50">Check your inbox. No follow-up unless you reach out.</p>
        <Link href="/en/portability" className="mt-4 inline-flex items-center rounded-xl bg-[#C9A14A] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition">
          Run your full Portability Score →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-6">
      <p className="text-sm font-semibold text-white mb-1">Not ready to book a call yet?</p>
      <p className="text-xs text-white/55 mb-4 leading-relaxed">
        Enter your email and we will send you an anonymous, encrypted summary of your portability profile. No name required. No follow-up unless you initiate it.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#C9A14A]/50 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-[#C9A14A] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition whitespace-nowrap"
        >
          Send my report
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <p className="mt-3 text-[10px] text-white/30 uppercase tracking-wider">Encrypted · No spam · No CRM entry without your consent</p>
    </div>
  );
}

/* ── BP Simulator animated preview ──────────────────────────────────── */
function BPSimulatorPreview() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      label: "01 Book inputs",
      screen: (
        <div className="space-y-3">
          {[
            { label: "AUM under management", pct: 65, value: "CHF 280M", color: "bg-[#C9A14A]" },
            { label: "Estimated portable %", pct: 55, value: "55%", color: "bg-emerald-400" },
            { label: "Revenue margin (bps)", pct: 70, value: "68 bps", color: "bg-blue-400" },
          ].map(r => (
            <div key={r.label}>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{r.label}</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-sm font-semibold text-white w-16 text-right">{r.value}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "02 Portability score",
      screen: (
        <div className="text-center py-2">
          <div className="relative mx-auto h-24 w-24">
            <svg viewBox="0 0 36 36" className="rotate-[-90deg] h-24 w-24">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#C9A14A" strokeWidth="3"
                strokeDasharray="72 28" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">72</span>
              <span className="text-[9px] text-white/40 uppercase">/100</span>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-[#C9A14A]">Strong portability</p>
          <p className="mt-1 text-xs text-white/50">CHF 154M estimated transferable within 12 months</p>
        </div>
      ),
    },
    {
      label: "03 Business case",
      screen: (
        <div className="space-y-2">
          {[
            { label: "Year-1 revenue (conservative)", value: "CHF 890K", color: "text-white" },
            { label: "Year-2 revenue (base case)", value: "CHF 1.54M", color: "text-emerald-400" },
            { label: "Break-even AUM", value: "CHF 95M", color: "text-white" },
            { label: "NPC buyout recommendation", value: "6 months", color: "text-[#C9A14A]" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
              <span className="text-xs text-white/50">{r.label}</span>
              <span className={`text-xs font-semibold ${r.color}`}>{r.value}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-[#C9A14A]/20 bg-[#0B1929] overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/30">
          execpartners.ch/en/bp-simulator
        </div>
      </div>
      <div className="flex border-b border-white/10">
        {steps.map((s, i) => (
          <button key={s.label} onClick={() => setActive(i)}
            className={`flex-1 py-2 text-[10px] font-semibold uppercase tracking-wider transition ${
              active === i ? "text-[#C9A14A] border-b-2 border-[#C9A14A]" : "text-white/30 hover:text-white/60"
            }`}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="p-5 min-h-[160px]">{steps[active].screen}</div>
      <div className="flex justify-between items-center border-t border-white/10 px-5 py-3">
        <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
          className="text-xs text-white/30 hover:text-white/60 disabled:opacity-20 transition">
          Back
        </button>
        {active < steps.length - 1 ? (
          <button onClick={() => setActive(active + 1)}
            className="rounded-lg bg-[#C9A14A] px-4 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition">
            Next →
          </button>
        ) : (
          <Link href="/en/bp-simulator"
            className="rounded-lg bg-[#C9A14A] px-4 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition">
            Open simulator →
          </Link>
        )}
      </div>
    </div>
  );
}

/* ── Hub data ────────────────────────────────────────────────────────── */
const HUBS = [
  {
    city: "Geneva", flag: "🇨🇭", slug: "geneva",
    demand: "Very High", demandColor: "text-emerald-400",
    comp: "CHF 180–350K base + 50–150% bonus (Senior RM)",
    segments: "UHNW, Cross-border, EAM, Swiss Onshore, LATAM, MEA, CIS",
    signal: "The Credit Suisse alumni pool is thinning. Banks that moved in 2024 secured the talent. Those still calibrating are now competing for a smaller, more expensive pool. Cross-border franchise depth and EAM connectivity are the differentiators hiring managers are paying a premium for in H2 2026.",
  },
  {
    city: "Zurich", flag: "🇨🇭", slug: "zurich",
    demand: "High", demandColor: "text-emerald-400",
    comp: "CHF 170–320K base + 50–140% bonus (Senior RM)",
    segments: "Swiss Onshore, DACH, International UHNW, EAM",
    signal: "Zurich remains the primary hub for DACH onshore wealth. UBS, Julius Baer, ZKB, Pictet and Vontobel are all actively building. Demand is highest for bankers with proven German-speaking entrepreneur and family-office relationships and balance-sheet fluency.",
  },
  {
    city: "Dubai", flag: "🇦🇪", slug: "dubai",
    demand: "Extremely High", demandColor: "text-[#C9A14A]",
    comp: "USD 200–400K base + 60–180% bonus (Senior RM) · Tax-free",
    segments: "GCC Onshore, NRI, CIS, African family offices, Expat UHNW",
    signal: "Dubai is the fastest-moving hiring market in EP's network in 2026. DIFC and ADGM platforms are expanding simultaneously. The talent gap for senior bankers with GCC and NRI coverage is acute — banks are moving faster on offers and paying above-cycle to close. Tax-free structures make total compensation significantly above Geneva equivalent at comparable seniority.",
  },
  {
    city: "Singapore", flag: "🇸🇬", slug: "singapore",
    demand: "High", demandColor: "text-emerald-400",
    comp: "SGD 220–420K base + 60–150% bonus (Senior RM)",
    segments: "China Family Wealth, SEA Entrepreneurs, North Asia, ASEAN",
    signal: "MAS-licensed platforms are consolidating market share. Demand is concentrated on bankers with genuine Mainland China and SEA family wealth relationships. Mandarin fluency combined with a portable book above SGD 300M is the profile commanding the strongest offers in 2026.",
  },
  {
    city: "London", flag: "🇬🇧", slug: "london",
    demand: "Moderate", demandColor: "text-blue-400",
    comp: "GBP 150–300K base + 40–120% bonus (Senior RM)",
    segments: "MENA, Russian-speaking, Indian, International UHNW",
    signal: "Post-Brexit cross-border complexity has settled into a new normal. London remains a critical booking centre for international UHNW — particularly MENA and South Asian wealth. Hiring is selective but consistent. Bankers with dual-licensed capability (UK FCA + Swiss or UAE equivalents) are unusually well-positioned.",
  },
  {
    city: "Hong Kong", flag: "🇭🇰", slug: "hong-kong",
    demand: "Moderate", demandColor: "text-blue-400",
    comp: "HKD 1.8–3.5M base + variable (Senior RM)",
    segments: "Mainland China, North Asia, SFC-licensed platforms",
    signal: "Hong Kong remains the primary APAC gateway for Mainland China flows despite geopolitical headwinds. SFC oversight is stringent. Senior bankers with established Mainland relationships and a track record at a reputable international platform are commanding significant premiums as the talent pool for genuinely portable books tightens.",
  },
  {
    city: "New York", flag: "🇺🇸", slug: "new-york",
    demand: "Selective", demandColor: "text-white/60",
    comp: "USD 200–450K base + variable (Senior RM)",
    segments: "Latin American UHNW, International Family Offices, Global Ultra-High Net Worth",
    signal: "New York operates at the intersection of US domestic wealth and international booking complexity. EP focuses exclusively on internationally-oriented mandates — LATAM-facing bankers, multi-family office roles, and senior hires at international private banks with US-resident UHNW client bases.",
  },
  {
    city: "Miami", flag: "🇺🇸", slug: "miami",
    demand: "Growing", demandColor: "text-emerald-400",
    comp: "USD 180–380K base + variable (Senior RM)",
    segments: "LATAM Offshore, Brazilian, Argentine, Colombian UHNW",
    signal: "Miami is consolidating its position as the primary US offshore gateway for Latin American wealth. Platforms are investing significantly in compliance infrastructure to handle the cross-border complexity. Bankers with established Brazilian, Argentine and Colombian HNW and UHNW relationships are in strong demand — particularly those with a clean, documented cross-border book.",
  },
  {
    city: "Paris", flag: "🇫🇷", slug: "paris",
    demand: "Stable", demandColor: "text-white/60",
    comp: "EUR 160–300K base + variable (Senior RM)",
    segments: "French Onshore UHNW, EU Cross-border, Family Offices",
    signal: "Paris operates as an EU onshore hub with deep domestic client connectivity. The family-office ecosystem is maturing. Bankers who understand French fiscal and succession planning and hold personal UHNW relationships with established French entrepreneurs and family offices are the profile in demand.",
  },
  {
    city: "Milan", flag: "🇮🇹", slug: "milan",
    demand: "Active", demandColor: "text-emerald-400",
    comp: "EUR 150–280K base + variable (Senior RM)",
    segments: "Italian Entrepreneur Wealth, Northern Italy UHNW, Cross-border",
    signal: "Northern Italy remains one of the most active European markets for senior private banking talent in 2026. Italian entrepreneur and family-business wealth is growing, and the appetite among Swiss and international platforms for bankers with genuine Italian UHNW relationships — particularly those with cross-border structuring knowledge — is high.",
  },
  {
    city: "Madrid", flag: "🇪🇸", slug: "madrid",
    demand: "Growing", demandColor: "text-emerald-400",
    comp: "EUR 140–260K base + variable (Senior RM)",
    segments: "Spanish Onshore, Entrepreneur Wealth, LATAM-connected",
    signal: "Spain's private banking market is deepening as domestic entrepreneur wealth grows and cross-border connectivity with Luxembourg and Swiss platforms increases. Madrid is an increasingly important hub for bankers who bridge Spanish onshore wealth with international structuring needs.",
  },
  {
    city: "Lisbon", flag: "🇵🇹", slug: "lisbon",
    demand: "Emerging", demandColor: "text-white/60",
    comp: "EUR 120–240K base + variable (Senior RM)",
    segments: "Expat UHNW, EU Residency-driven Wealth, Affluent HNW",
    signal: "Lisbon is an emerging EU wealth node driven by a growing expat and digital-nomad UHNW base, NHR regime-attracted wealth, and Portugal's position as a low-friction EU entry point. Roles often blend private banking with wealth planning and family-office-style services.",
  },
];

/* ── Page ────────────────────────────────────────────────────────────── */
export default function CareerIntelligencePage() {
  const [activeHub, setActiveHub] = useState(0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Insights", url: `${SITE}/en/insights` },
          { name: "Career Intelligence 2026", url: PAGE_URL },
        ]}
      />

      <main className="relative min-h-screen text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(1200px 420px at 20% -10%, rgba(255,215,130,0.08) 0%, rgba(0,0,0,0) 60%)" }}
        />

        <div className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-12">

          {/* Header */}
          <div className="mx-auto w-fit rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 px-3 py-1 text-xs font-semibold text-[#C9A14A]">
            2026 Career Intelligence Report
          </div>
          <h1 className="mt-4 text-center text-4xl font-bold tracking-tight md:text-5xl">
            Private Banking Career Intelligence 2026
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/55">
            Hiring signals, compensation benchmarks, and portability intelligence for senior private banking professionals navigating their next move. 13 hubs. Placement data from 200+ transactions.
          </p>

          {/* Market Overview — sharpened */}
          <section className="mt-10 rounded-2xl border border-[#C9A14A]/20 bg-white/5 p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">Market Overview — H2 2026</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/65">
              <p>
                Three structural shifts are defining the private banking talent market in H2 2026. First, <strong className="text-white">the Credit Suisse alumni pool is thinning</strong>. Banks that moved decisively in 2024 secured the most portable, best-documented books. Those still calibrating are now competing for a smaller and materially more expensive residual pool.
              </p>
              <p>
                Second, <strong className="text-white">compliance infrastructure has quietly become the most effective retention tool in the industry</strong>. Senior bankers with CHF 300M+ books are discovering mid-negotiation that the documentation required to re-onboard their clients at a new institution under current FinSA and KYC obligations takes six to eighteen months they did not price into their decision. The banks built it that way.
              </p>
              <p>
                Third, <strong className="text-white">the definition of a portable book has narrowed</strong>. Banks are approving offers faster when portability logic is pre-documented — AUM composition, wallet share, compliance status, and a written three-year revenue case. Bankers who walk in with that documentation are closing in weeks. Bankers who arrive with a verbal AUM figure are waiting months.
              </p>
              <p>
                Dubai and Milan are the two highest-velocity hiring markets in EP's network right now. Geneva remains the deepest market by volume. Singapore is accelerating on the back of China family wealth flows. London, Hong Kong, and New York are selective but consistent.
              </p>
            </div>
          </section>

          {/* Compensation */}
          <section className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">Compensation Benchmarks</h2>
            <p className="mt-1 text-xs text-white/40 uppercase tracking-wider">EP placement data 2024–2026 · Indicative ranges · Varies by AUM quality and portability</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                { hub: "🇨🇭 Geneva / Zurich", rows: [["Senior RM · CHF 100–300M AUM","CHF 180–350K base + 50–150% bonus"],["Team Head · CHF 500M+ AUM","CHF 280–450K base + 80–200% bonus"],["Market Head","CHF 350–600K+ base + carry / equity"]] },
                { hub: "🇦🇪 Dubai (DIFC · ADGM)", rows: [["Senior RM · USD 150–400M AUM","USD 200–400K base + 60–180% bonus · Tax-free"],["Team Head · USD 800M+ AUM","USD 350–550K base + 100–250% bonus"],["Premium vs Geneva","Total comp 20–40% above Swiss equivalent"]] },
                { hub: "🇸🇬 Singapore", rows: [["Senior RM · SGD 200–500M AUM","SGD 220–420K base + 60–150% bonus"],["Team Head · SGD 1B+ AUM","SGD 400–650K base + 100–200% bonus"],["China / SEA connectivity","Commands material premium in 2026"]] },
                { hub: "🇬🇧 London", rows: [["Senior RM · GBP 100–250M AUM","GBP 150–300K base + 40–120% bonus"],["Team Head · GBP 500M+ AUM","GBP 250–450K base + 80–180% bonus"],["Dual-licensed bankers","Premium for FCA + UAE or Swiss equivalents"]] },
                { hub: "🇭🇰 Hong Kong", rows: [["Senior RM · HKD equivalent","HKD 1.8–3.5M base + variable"],["North Asia / Mainland China","Books above SGD 300M commanding top offers"],["SFC licensing","Required — factor into timeline"]] },
                { hub: "🇺🇸 New York · Miami", rows: [["Senior RM (International focus)","USD 180–450K base + variable"],["LATAM offshore specialists (Miami)","Strong demand · clean books essential"],["Multi-family office roles","Above-market total comp for right profile"]] },
                { hub: "🇫🇷🇮🇹🇪🇸🇵🇹 European Hubs", rows: [["Milan · Senior RM","EUR 150–280K base + variable"],["Madrid · Senior RM","EUR 140–260K base + variable"],["Paris / Lisbon · Senior RM","EUR 120–300K base depending on seniority"]] },
              ].map(h => (
                <div key={h.hub} className="rounded-xl border border-[#C9A14A]/15 bg-black/20 p-4">
                  <h3 className="font-semibold text-[#C9A14A] text-sm mb-3">{h.hub}</h3>
                  <div className="space-y-2">
                    {h.rows.map(([label, value]) => (
                      <div key={label}>
                        <span className="text-[11px] text-white/40 block">{label}</span>
                        <span className="text-xs text-white/80">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hub Intelligence — interactive */}
          <section className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-white/5 p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">Hub Intelligence</h2>
            <p className="mt-1 text-sm text-white/55 mb-5">Select a market for hiring signals, client segments, and EP observations from active mandates.</p>
            {/* Hub tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {HUBS.map((h, i) => (
                <button key={h.city} onClick={() => setActiveHub(i)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    activeHub === i
                      ? "bg-[#C9A14A] text-black"
                      : "border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20"
                  }`}>
                  {h.flag} {h.city}
                </button>
              ))}
            </div>
            {/* Active hub card */}
            {(() => {
              const h = HUBS[activeHub];
              return (
                <div className="rounded-xl border border-[#C9A14A]/20 bg-black/20 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{h.flag} {h.city}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{h.segments}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${h.demandColor}`}>{h.demand}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Typical Senior RM compensation</p>
                    <p className="text-sm text-[#C9A14A] font-semibold">{h.comp}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">EP market signal — H2 2026</p>
                    <p className="text-sm leading-relaxed text-white/65">{h.signal}</p>
                  </div>
                  <div className="mt-4">
                    <Link href={`/en/markets/${h.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A14A] hover:underline">
                      View full {h.city} market page →
                    </Link>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Portability + anonymous capture */}
          <section className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-white/5 p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">AUM Portability Intelligence</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#C9A14A]/15 bg-black/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Transfer rates by segment</h3>
                {[
                  { label: "Family Office AUM (RM owns relationship)", pct: "70–85%", w: "78%" },
                  { label: "HNW · USD 5–50M (personal relationships)", pct: "60–75%", w: "68%" },
                  { label: "UHNW · USD 50M+ (within 12 months)", pct: "45–65%", w: "55%" },
                  { label: "Institutional / Corporate (committee-driven)", pct: "20–40%", w: "30%" },
                ].map(r => (
                  <div key={r.label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60 flex-1 pr-2">{r.label}</span>
                      <span className="text-[#C9A14A] font-semibold whitespace-nowrap">{r.pct}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-1.5 rounded-full bg-[#C9A14A]/60" style={{ width: r.w }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#C9A14A]/15 bg-black/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">What banks look for in 2026</h3>
                {[
                  ["Wallet share above 40%", "Top clients with 40%+ of total wealth in your book transfer at materially higher rates"],
                  ["Clean cross-border documentation", "FINMA and KYC standards have hardened — open documentation reduces your effective AUM by 20–30%"],
                  ["Pre-documented business case", "Banks close offers 3x faster when portability logic arrives pre-built, not verbal"],
                  ["Non-solicit clarity", "Understanding your clause before the first call puts you in a stronger negotiating position"],
                ].map(([title, desc]) => (
                  <div key={title} className="mb-3">
                    <p className="text-xs font-semibold text-white/80">{title}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <PortabilityCapture />
            </div>
          </section>

          {/* BP Simulator preview */}
          <section className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">Business Plan Simulator</h2>
            <p className="mt-1 text-sm text-white/55 mb-4">
              The tool senior bankers use before any conversation with a bank. Model your book, validate your portability, and walk in with a three-year P&L already built. Banks close offers faster when you arrive prepared.
            </p>
            <BPSimulatorPreview />
            <p className="mt-3 text-xs text-white/30 text-center">Interactive preview — click through the steps, then open the full simulator.</p>
          </section>

          {/* Strategic Guidance — rewritten */}
          <section className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-white/5 p-6">
            <h2 className="text-xl font-bold text-[#C9A14A]">Strategic Guidance for H2 2026</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  who: "Senior RMs",
                  advice: "The bankers getting the best offers right now are not the ones with the largest books. They are the ones who arrive with a written portability case — AUM composition, wallet share by client, compliance status, and a realistic transfer timeline. That document changes the conversation from negotiation to approval.",
                },
                {
                  who: "Team Heads",
                  advice: "Demand written clarity on revenue-sharing models before you engage seriously with any platform. The gap between verbal commitment and contractual reality on bonus pools and team-move support is where most deals fall apart at the final stage. Get it in writing before you brief your team.",
                },
                {
                  who: "Timing",
                  advice: "H2 2026 is active. Bonus season created natural transition points in Q1 — the bankers who moved are now onboarding. New mandates are opening through summer. Plan for 3–6 month garden leave and model the NPC buyout into your offer. The preparation window before your first call is where the negotiating advantage is built.",
                },
              ].map(s => (
                <div key={s.who} className="rounded-xl border border-[#C9A14A]/15 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C9A14A] mb-2">{s.who}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{s.advice}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-8 rounded-2xl border border-[#C9A14A]/20 bg-gradient-to-br from-[#C9A14A]/10 to-transparent p-8 text-center">
            <h3 className="text-xl font-bold text-white">Ready to calibrate your next move?</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/55">
              Confidential. Senior-level. No obligation. No CV required at this stage.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/en/portability" className="rounded-xl bg-[#C9A14A] px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition">
                Calculate Portability Score
              </Link>
              <Link href="/en/bp-simulator" className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                Open BP Simulator
              </Link>
              <Link href="/en/contact" className="rounded-xl border border-white/10 px-6 py-3 text-sm text-white/60 hover:text-white transition">
                Speak with a Recruiter
              </Link>
            </div>
          </section>

          {/* PDF */}
          <div className="mt-6 text-center">
            <a href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 px-5 py-2 text-sm font-semibold text-[#C9A14A] hover:bg-[#C9A14A]/15 transition">
              ↓ Download 2026 PDF guide
            </a>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-xs text-white/30">
            Data compiled from Executive Partners placements, market research, and confidential compensation surveys (2024–2026). Figures are indicative and vary based on AUM quality, portability, and individual performance.
          </div>

        </div>
      </main>
    </>
  );
}
