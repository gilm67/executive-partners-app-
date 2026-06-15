export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";
import { ArrowRight, CheckCircle, Clock, Shield, TrendingUp, Lock } from "lucide-react";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "Private Banking Recruitment Switzerland | Senior RM & Team Head Search | Executive Partners",
  description:
    "Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Riyadh, Singapore, London, New York.",
  openGraph: {
    title: "Private Banking Recruitment Switzerland | Senior RM & Team Head Search",
    description:
      "Targeted senior hires in Private Banking & Wealth Management. Real AUM portability and long-term retention.",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Executive Partners – Private Banking Recruitment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruitment Switzerland | Executive Partners",
    description:
      "Executive search for senior private banking roles. Specialists in AUM portability assessment.",
    images: ["/og.webp"],
  },
  alternates: { canonical: "https://www.execpartners.ch/en/hiring-managers" },
};

const CASES = [
  {
    flag: "🇮🇹",
    market: "Italian desk · Geneva",
    role: "Senior Relationship Manager",
    aum: "CHF 280M portable book",
    time: "Mandate to offer: 18 days",
    retention: "Still at the bank · 22 months",
  },
  {
    flag: "🇷🇺",
    market: "CIS/CEE desk · Zurich",
    role: "Investment Advisor",
    aum: "USD 140M book · no minimum required",
    time: "Mandate to offer: 11 days",
    retention: "Still at the bank · 14 months",
  },
  {
    flag: "🇨🇭",
    market: "Swiss onshore · Geneva",
    role: "Senior Relationship Manager",
    aum: "CHF 190M portable book",
    time: "Mandate to offer: 24 days",
    retention: "Still at the bank · 31 months",
  },
];

export default function HiringManagersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "For Hiring Managers", url: `${SITE}/en/hiring-managers` },
        ]}
      />
      <ServiceSchema
        name="Private Banking Executive Search"
        description="Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Riyadh, Singapore, London, New York."
      />

      <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16 space-y-8">

        {/* ── HERO ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-[#C9A14A]/10 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">
              For Hiring Managers
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">
              Private Banking Recruitment Switzerland — Senior RMs, Team Heads &amp; Market Leaders
            </h1>
            <p className="mt-3 text-lg md:text-xl font-semibold leading-tight text-neutral-200">
              The wrong hire costs you two years.<br />
              <span className="text-[#C9A14A]">We've placed 200+ bankers. 98% are still there.</span>
            </p>
            <p className="mt-4 max-w-3xl text-sm md:text-base text-white/75">
              We specialise exclusively in private banking. We screen AUM portability, book composition, cross-border fit and compliance profile before you see a name. Average mandate-to-offer: 17 days.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="https://calendly.com/execpartners/15-minute-career-consultation"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C46A] px-6 py-3 text-sm font-semibold text-[#090C14] hover:brightness-110 transition-all"
              >
                Brief a mandate — same day response <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                View live mandates
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
              {[
                { n: "200+", label: "Senior placements" },
                { n: "98%", label: "12-month retention" },
                { n: "17d", label: "Avg. mandate-to-offer" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-[#C9A14A]">{s.n}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* ── COMPLIANCE RISK ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-red-500/5 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400/80">
              Risk Mitigation
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">
              How we eliminate the legal and compliance risk of a senior lateral hire
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65 max-w-3xl">
              Every senior lateral hire in private banking carries three categories of legal and compliance risk that most recruitment processes do not surface until it is too late. EP addresses each one before you see a candidate name.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Non-solicit exposure",
                  risk: "The risk: A banker joins your platform and contacts former clients before the non-solicit window has closed or in scope of a clause that prohibits indirect approaches. Your institution faces potential exposure in injunction or damages proceedings.",
                  how: "How EP addresses it: Every candidate is screened for non-solicit clause duration, scope, and practical enforceability before introduction. We map the clause against planned client contact timelines and document any residual exposure in the candidate dossier — so your legal team is never surprised.",
                },
                {
                  title: "KYC and documentation gaps",
                  risk: "The risk: An incoming banker brings cross-border clients with open source-of-wealth questions, incomplete beneficial ownership structures, or CRS and FATCA gaps that create onboarding friction or trigger a regulatory review.",
                  how: "How EP addresses it: We pre-screen cross-border book compliance status as part of the Portability Score assessment. Candidates with material documentation gaps are identified before introduction. Clients that would have stalled on onboarding are flagged before you make an offer — not after.",
                },
                {
                  title: "Portability mismatch",
                  risk: "The risk: A banker is hired on a verbal CHF 400M AUM claim. Twelve months later CHF 80M has transferred and the remainder is institutionally anchored at the previous bank. The business case fails. The hire becomes a multi-year cost.",
                  how: "How EP addresses it: Every introduction includes a written portability rationale covering AUM composition, wallet share by client tier, realistic transfer timeline, and a year-one revenue estimate. The 98% twelve-month retention rate across EP placements is the outcome of this discipline.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-xs text-red-400/75 leading-relaxed mb-4">{item.risk}</p>
                  <p className="text-xs text-emerald-400/80 leading-relaxed">{item.how}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-5">
              <p className="text-sm font-semibold text-white mb-2">Team lift-outs and desk builds</p>
              <p className="text-sm text-white/60 leading-relaxed">
                For team moves and desk builds the legal complexity multiplies. EP manages the sequencing of individual approaches, coordinates non-solicit windows across team members, and documents each candidate independently — ensuring the process is defensible and that no single approach creates grounds for a conspiracy-to-breach claim. We have coordinated team moves of two to six bankers across Geneva, Zurich, and Dubai without a legal challenge.
              </p>
            </div>
          </div>
        </section>

        {/* ── TALENT BENCH TEASER ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#C9A14A]/25 bg-gradient-to-br from-[#C9A14A]/10 via-black/40 to-black/40 px-6 py-8 md:px-10 md:py-10 backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-2">
                  <Lock className="h-3 w-3" />
                  Confidential · By request
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  A curated bench of senior private banking talent, ready to move
                </h2>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">
                  Beyond our live mandates, we maintain a confidential bench of senior professionals across front, middle and support functions, Relationship Managers, Investment Advisors, Team Heads, EAM and intermediary coverage specialists, and compliance and credit risk leaders, spanning Switzerland, the Middle East, CIS/CEE, LATAM and Southern Europe. Front-office profiles come with portability already screened. All profiles are shared on an anonymised basis; full details follow an NDA or an existing mandate relationship.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:min-w-[240px]">
                <Link
                  href="/talent-bench-login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C46A] px-6 py-3 text-sm font-semibold text-[#090C14] hover:brightness-110 transition-all"
                >
                  Access the Talent Bench <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Request introduction
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-7 md:px-10 md:py-8 backdrop-blur">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-1">Anonymised placements</div>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Recent mandates completed</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {CASES.map((c) => (
                <div key={c.market} className="rounded-2xl border border-white/8 bg-black/30 px-4 py-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-xs font-semibold text-white/70">{c.market}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{c.role}</div>
                  <div className="space-y-1.5 text-xs text-white/55">
                    <div className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-[#C9A14A]" />{c.aum}</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-[#C9A14A]" />{c.time}</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-emerald-400" />{c.retention}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 md:px-10 md:py-8 backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-xl space-y-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A]">No portals. No admin.</div>
                <h2 className="text-xl md:text-2xl font-semibold">Brief us in one message</h2>
                <p className="text-sm text-white/70">
                  Tell us: booking centre, market focus, seniority, AUM minimum, regulatory requirements. We respond the same business day with clarifying questions or a proposed call.
                </p>
                <ul className="space-y-2">
                  {[
                    "Director / MD RMs, Team Heads, Market Leaders",
                    "Swiss onshore, international desks, EAM-facing roles",
                    "CH · UK · US · MEA · LATAM · APAC coverage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                      <Shield className="h-4 w-4 text-[#C9A14A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:min-w-[220px]">
                <Link
                  href="https://calendly.com/execpartners/15-minute-career-consultation"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C46A] px-6 py-3 text-sm font-semibold text-[#090C14] hover:brightness-110 transition-all"
                >
                  Brief a mandate <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/en/portability"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  AUM portability tool
                </Link>
                <p className="text-[11px] text-white/35 text-center">Existing clients: use your secure private URL or contact us to resend it.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
