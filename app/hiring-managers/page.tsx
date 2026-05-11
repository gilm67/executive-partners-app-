export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";
import { ArrowRight, CheckCircle, Clock, Shield, TrendingUp } from "lucide-react";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "For Hiring Managers | Private Banking Recruitment | Executive Partners",
  description:
    "Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Singapore, London, New York.",
  openGraph: {
    title: "For Hiring Managers | Executive Partners",
    description:
      "Targeted senior hires in Private Banking & Wealth Management. Real AUM portability and long-term retention.",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Hiring Managers | Executive Partners",
    description:
      "Executive search for senior private banking roles. Specialists in AUM portability assessment.",
  },
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

const AVAILABLE = [
  { flag: "🇹🇷", label: "Turkish market Senior RM", detail: "UHNW profile · Geneva · Edmond de Rothschild background · Exploring discreetly" },
  { flag: "🇮🇹", label: "Italian market Senior RM", detail: "CHF 200M+ · Milan / Geneva · Available Q3 2026" },
  { flag: "🇷🇺", label: "CIS/CEE Senior RM", detail: "CHF 1.5B book · Zurich · Top-rated profile · Exploring discreetly" },
  { flag: "🇧🇷", label: "LATAM Investment Advisor", detail: "USD 2.5B team construct · Geneva · CS background · Available H2 2026" },
  { flag: "🇦🇪", label: "MEA Senior RM", detail: "USD 185M portable · Dubai · Available immediately" },
  { flag: "🇹🇷", label: "Turkish market RM", detail: "Geneva-based · Active mandate · Available Q2 2026" },
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
        description="Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Singapore, London, New York."
      />

      <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16 space-y-8">

        {/* ── HERO ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-[#C9A14A]/10 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">
              For Hiring Managers
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">
              The wrong hire costs you two years.<br />
              <span className="text-[#C9A14A]">We've placed 200+ bankers. 98% are still there.</span>
            </h1>
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

        {/* ── AVAILABLE NOW ── */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#C9A14A]/25 bg-black/40 px-6 py-7 md:px-10 md:py-8 backdrop-blur">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-1">Live talent · Updated monthly</div>
                <h2 className="text-xl md:text-2xl font-semibold">Bankers currently exploring</h2>
              </div>
              <Link href="/en/contact" className="hidden sm:flex items-center gap-1.5 text-xs text-[#C9A14A] hover:text-white transition-colors font-semibold">
                Request introduction <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {AVAILABLE.map((a) => (
                <div key={a.label} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <span className="text-xl flex-shrink-0">{a.flag}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{a.label}</div>
                    <div className="text-xs text-white/55 mt-0.5">{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-white/35">All profiles anonymised. Full details shared after NDA or existing mandate relationship.</p>
            <Link href="/en/contact" className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-xs text-[#C9A14A] font-semibold">
              Request introduction <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
                  href="/en/contact"
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
