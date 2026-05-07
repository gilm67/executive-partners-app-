"use client";

import { useMemo } from "react";
import Link from "next/link";
import { INSIGHTS } from "./articles";
import { marketLabel } from "@/lib/markets/marketLabel";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
  } catch { return iso; }
}

function safeDateMs(iso?: string) {
  const t = Date.parse((iso || "").trim());
  return Number.isNaN(t) ? 0 : t;
}

function isNew(iso: string) {
  return Date.now() - safeDateMs(iso) <= 14 * 86400000;
}

const LINKEDIN_ONLY = [
  { title: "Smoke Over the DIFC", date: "2026-04-27", url: "https://www.linkedin.com/pulse/smoke-over-difc-gil-m-chalem--d0lbe/" },
  { title: "Bern Holds the Line", date: "2026-04-23", url: "https://www.linkedin.com/pulse/bern-holds-line-gil-m-chalem--nudte/" },
  { title: "The 10 Billion Myth: Why Size Is the Wrong Lens on Swiss Private Banking Consolidation", date: "2026-04-21", url: "https://www.linkedin.com/pulse/10-billion-myth-why-size-wrong-lens-swiss-private-gil-m-chalem--myq8e/" },
  { title: "The Bank That Can't Choose a CEO", date: "2026-04-20", url: "https://www.linkedin.com/pulse/bank-cant-choose-ceo-gil-m-chalem--g9qje/" },
  { title: "The Revenue Grid Nobody Shows You Before You Sign", date: "2026-04-14", url: "https://www.linkedin.com/pulse/revenue-grid-nobody-shows-you-before-sign-gil-m-chalem--w2cwe/" },
  { title: "Dubai's Illusion Is Gone. Where Does That Leave You?", date: "2026-03-09", url: "https://www.linkedin.com/pulse/dubais-illusion-gone-where-does-leave-you-gil-m-chalem--mrdye/" },
  { title: "Zurich 2026: Warum der Talentmarkt im Private Banking gerade umkippt", date: "2026-02-20", url: "https://www.linkedin.com/pulse/z%C3%BCrich-2026-warum-der-talentmarkt-im-private-banking-gil-m-chalem--wcx4e/" },
];

const THEMES = [
  { key: "Positioning", title: "Positioning", href: "/en/insights/subtheme/positioning", desc: "Who is winning and losing and why." },
  { key: "ScaleVsBoutique", title: "Scale vs Boutique", href: "/en/insights/subtheme/scale-vs-boutique", desc: "Economics of scale vs boutique models." },
  { key: "ROAPlatform", title: "ROA & Platform", href: "/en/insights/subtheme/roa-platform", desc: "ROA pressure, platforms, cost of compliance." },
  { key: "MARestructuring", title: "M&A & Restructuring", href: "/en/insights/subtheme/m-a-restructuring", desc: "M&A, integrations, silent restructurings." },
];

export default function InsightsPage() {
  const sorted = useMemo(
    () => [...INSIGHTS].sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date)),
    []
  );

  const internal = useMemo(() => sorted.filter((a) => a.body).slice(0, 9), [sorted]);
  const hero = internal[0];
  const rest = internal.slice(1);

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-white/8 blur-3xl opacity-25" />
          <div className="absolute top-20 left-[-160px] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/8 blur-3xl opacity-30" />
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/60">
            Private Wealth Pulse
            <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
            17,000+ subscribers
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Intelligence for senior<br />private banking professionals.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/65 leading-relaxed">
            Strategy, talent, and market power — written from Geneva, read across every major booking centre.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#articles" className="inline-flex items-center rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition">
              Read latest articles
            </a>
            <Link href="/en/insights/archive" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition">
              Browse archive
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { n: "200+", label: "Placements" },
              { n: "17k+", label: "Newsletter subscribers" },
              { n: "6", label: "Primary markets" },
              { n: "14+", label: "In-depth articles" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-white">{s.n}</div>
                <div className="mt-0.5 text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 space-y-20">

        {/* INTERNAL ARTICLES */}
        <section id="articles">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">Full articles — read on execpartners.ch</div>
              <h2 className="mt-2 text-2xl font-semibold text-white">Latest intelligence</h2>
              <p className="mt-1.5 text-sm text-white/60">In-depth analysis. No paywall. No login.</p>
            </div>
            <Link href="/en/insights/archive" className="hidden sm:inline-flex text-sm font-medium text-white/60 hover:text-white transition underline underline-offset-4">
              Full archive
            </Link>
          </div>

          {hero && (
            <Link
              href={`/en/insights/${hero.slug}`}
              className="group mb-6 flex flex-col rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-0.5 hover:border-[#D4AF37]/30 hover:bg-white/8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">Latest</span>
                <span className="text-xs text-white/50">{formatDate(hero.date)}</span>
                {isNew(hero.date) && (
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">New</span>
                )}
              </div>
              <h3 className="mt-3 text-2xl font-semibold leading-snug text-white md:text-3xl">{hero.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 line-clamp-3">{hero.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(hero.markets ?? []).slice(0, 5).map((m) => (
                  <span key={m} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">{marketLabel(m)}</span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                Read full article <span className="transition group-hover:translate-x-1">&#8594;</span>
              </div>
            </Link>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/en/insights/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-white/50">{formatDate(a.date)}</span>
                  {isNew(a.date) && (
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">New</span>
                  )}
                </div>
                <h3 className="mt-3 flex-1 text-base font-semibold leading-snug text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-white/60 line-clamp-2">{a.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(a.markets ?? []).slice(0, 3).map((m) => (
                    <span key={m} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/65">{marketLabel(m)}</span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37]">
                  Read <span className="transition group-hover:translate-x-0.5">&#8594;</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/en/insights/archive" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition">
              View all articles
            </Link>
          </div>
        </section>

        {/* THEMES */}
        <section>
          <div className="mb-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">Pillar I</div>
            <h2 className="mt-2 text-xl font-semibold text-white">Browse by theme</h2>
            <p className="mt-1.5 text-sm text-white/60">Four analytical lenses. One industry.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:bg-white/8"
              >
                <h3 className="text-sm font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37]">
                  Explore <span className="transition group-hover:translate-x-0.5">&#8594;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* LINKEDIN ONLY */}
        <section>
          <div className="mb-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Also published</div>
            <h2 className="mt-2 text-xl font-semibold text-white">More on LinkedIn</h2>
            <p className="mt-1.5 text-sm text-white/60">Additional pieces published exclusively on LinkedIn Pulse.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...LINKEDIN_ONLY]
              .sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date))
              .map((a) => (
                <a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-white/50">{formatDate(a.date)}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">LinkedIn</span>
                  </div>
                  <h3 className="mt-3 flex-1 text-sm font-semibold leading-snug text-white">{a.title}</h3>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 group-hover:text-white/80 transition">
                    Read on LinkedIn <span className="transition group-hover:translate-x-0.5">&#8594;</span>
                  </div>
                </a>
              ))}
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section>
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 via-white/5 to-white/5 p-10 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">Private Wealth Pulse</div>
            <h2 className="mt-3 text-2xl font-semibold text-white">Get the analysis in your inbox.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/65">
              Join 17,000+ senior private banking professionals who read Gil M. Chalem every week. No noise. No fluff. Just the signals that matter.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              
                href="https://www.linkedin.com/newsletters/private-wealth-pulse-7049706791347752960/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
              >
                Subscribe on LinkedIn
              </a>
              <Link
                href="/en/contact"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                Speak with Gil
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
