import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruitment-agency`;

export const metadata: Metadata = {
  title: { absolute: "Retained Private Banking Recruitment Agency Switzerland" },
  description:
    "Retained private banking recruitment agency, Geneva. Exclusive mandates with banks and EAMs. No contingency. No panels. One calibrated shortlist per search.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Retained Private Banking Recruitment Agency Switzerland",
    description: "Geneva-based retained boutique private banking recruitment agency. Senior RMs, Team Heads and Investment Advisors placed across 14 global wealth hubs. Confidential. No contingency. No panels.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: "/og.webp" }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retained Private Banking Recruitment Agency Switzerland",
    description: "Geneva-based retained boutique private banking recruitment agency. Senior RMs, Team Heads and Investment Advisors placed across 14 global wealth hubs. Confidential. No contingency. No panels.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

const HUBS = [
  { city: "Geneva", slug: "geneva", flag: "🇨🇭" },
  { city: "Zurich", slug: "zurich", flag: "🇨🇭" },
  { city: "London", slug: "london", flag: "🇬🇧" },
  { city: "Dubai", slug: "dubai", flag: "🇦🇪" },
  { city: "Riyadh", slug: "riyadh", flag: "🇸🇦" },
  { city: "Singapore", slug: "singapore", flag: "🇸🇬" },
  { city: "Hong Kong", slug: "hong-kong", flag: "🇭🇰" },
  { city: "New York", slug: "new-york", flag: "🇺🇸" },
  { city: "Miami", slug: "miami", flag: "🇺🇸" },
  { city: "Paris", slug: "paris", flag: "🇫🇷" },
  { city: "Milan", slug: "milan", flag: "🇮🇹" },
  { city: "Madrid", slug: "madrid", flag: "🇪🇸" },
  { city: "Lisbon", slug: "lisbon", flag: "🇵🇹" },
];

const TOOLS = [
  { label: "AUM Portability Score", href: "/en/portability", desc: "Estimate how much of your book will follow you." },
  { label: "Business Plan Simulator", href: "/en/bp-simulator", desc: "Stress-test revenue and wallet share before a move." },
  { label: "Career Intelligence 2026 (PDF)", href: "/pdfs/private-banking-career-intelligence-2026.pdf", desc: "Compensation benchmarks and hiring signals across 14 hubs." },
];

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(800px 360px at 15% -10%, rgba(201,161,74,.18) 0%, rgba(201,161,74,0) 55%)" }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 pb-24 pt-14">

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
            Geneva · Switzerland · Private Banking · Executive Search
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Private Banking Recruitment Agency in Switzerland
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
            Executive Partners is a Geneva-based boutique focused{" "}
            <span className="font-semibold text-neutral-100">exclusively</span> on private banking
            and wealth management. We place Senior Relationship Managers, Team Heads, Investment
            Advisors and Market Leaders across{" "}
            <span className="font-semibold text-neutral-100">14 global wealth hubs</span>, from
            Geneva and Zurich to Dubai, Riyadh, Singapore and London. Every search is conducted
            personally by Gil M. Chalem, Managing Partner.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/en/hiring-managers" className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black hover:brightness-110 transition">
              Brief a mandate
            </Link>
            <Link href="/en/candidates" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition">
              Submit your profile
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: "200+", label: "Placements" },
            { n: "98%", label: "Retention rate" },
            { n: "14", label: "Global hubs" },
            { n: "2,300+", label: "PWP subscribers" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
              <div className="text-2xl font-extrabold text-[#D4AF37]">{s.n}</div>
              <div className="mt-1 text-xs text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* What we do */}
        <section className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">For hiring managers</h2>
            <p className="text-sm leading-relaxed text-neutral-300">
              We provide calibrated shortlists of senior bankers with personally owned, portable
              client franchises. Every introduction includes a portability analysis, business plan
              assessment, and compensation benchmark relevant to your platform and target markets.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              We work on a retained or exclusive basis for senior mandates and cover all 14 hubs
              from a single Geneva-based point of contact. No panels. No volume play.
            </p>
            <Link href="/en/hiring-managers" className="inline-block text-sm font-semibold text-[#D4AF37] hover:underline">
              How we work with hiring managers →
            </Link>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">For private bankers</h2>
            <p className="text-sm leading-relaxed text-neutral-300">
              We advise senior private bankers confidentially on strategic moves. We help you
              understand your AUM portability, build a credible business plan, navigate
              non-compete agreements, and identify which platforms genuinely fit your client
              franchise, whether in Switzerland or across our 14 global hubs.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              Your profile is never shared without your explicit consent.
            </p>
            <Link href="/en/candidates" className="inline-block text-sm font-semibold text-[#D4AF37] hover:underline">
              How we work with candidates →
            </Link>
          </div>
        </section>

        {/* Markets */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold">Active across 14 global hubs</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {HUBS.map((h) => (
              <Link
                key={h.slug}
                href={`/en/markets/${h.slug}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm hover:border-[#C9A14A]/40 hover:bg-white/[0.07] transition"
              >
                <span>{h.flag}</span>
                <span className="font-medium text-neutral-200">{h.city}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold">Free tools for private bankers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#C9A14A]/40 hover:bg-white/[0.06] transition group"
              >
                <p className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition">{t.label}</p>
                <p className="mt-1 text-xs text-neutral-400">{t.desc}</p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-[#D4AF37]">Open →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent intelligence */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold">Recent market intelligence</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { slug: "the-sandbox-talent-map", title: "The Sandbox Talent Map", summary: "Which bankers are positioned to keep Gulf clients, win them, or lose them." },
              { slug: "is-your-aum-portable", title: "Is Your AUM Actually Portable?", summary: "The six questions every banker gets wrong before a move." },
              { slug: "compliance-golden-handcuff", title: "Compliance Is the New Golden Handcuff", summary: "Why your compliance file is now the most important document in your career." },
              { slug: "the-platform-illusion", title: "The Platform Illusion", summary: "Banks sell platform quality. Clients follow the banker." },
            ].map((a) => (
              <Link
                key={a.slug}
                href={`/en/insights/${a.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#C9A14A]/40 hover:bg-white/[0.06] transition group"
              >
                <p className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition">{a.title}</p>
                <p className="mt-1 text-xs text-neutral-400">{a.summary}</p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-[#D4AF37]">Read →</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/en/insights" className="text-sm text-neutral-400 hover:text-white transition">
              View full intelligence archive →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur">
          <h2 className="text-2xl font-semibold">Ready to discuss a mandate or a move?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">
            Every conversation is confidential. We work with a small number of senior bankers and
            hiring institutions at any time so each engagement receives proper attention.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/en/contact" className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-black hover:brightness-110 transition">
              Contact Executive Partners
            </Link>
            <Link href="/en/jobs" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition">
              View live mandates
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
