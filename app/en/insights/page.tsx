"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { INSIGHTS, type InsightArticle } from "./articles";
import { marketLabel } from "@/lib/markets/marketLabel";

/* -------------------------------- helpers -------------------------------- */

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function safeDateMs(iso?: string) {
  const t = Date.parse((iso || "").trim());
  return Number.isNaN(t) ? 0 : t;
}

/* -------------------------------- config -------------------------------- */

const P1_SUBTHEMES = [
  {
    key: "Positioning",
    title: "Positioning",
    href: "/en/insights/subtheme/positioning",
    desc: "Who is winning, who is losing — and why.",
  },
  {
    key: "ScaleVsBoutique",
    title: "Scale vs Boutique",
    href: "/en/insights/subtheme/scale-vs-boutique",
    desc: "Economics of scale vs boutique models.",
  },
  {
    key: "ROAPlatform",
    title: "ROA & Platform",
    href: "/en/insights/subtheme/roa-platform",
    desc: "ROA pressure, platforms, cost of compliance.",
  },
  {
    key: "M&ARestructuring",
    title: "M&A & Restructuring",
    href: "/en/insights/subtheme/m-a-restructuring",
    desc: "M&A, integrations, silent restructurings.",
  },
] as const;

type RoleKey = "rm" | "hm";
const ROLE_STORAGE_KEY = "insights_role";

/**
 * (Optional next step later: self-healing / auto-derivation)
 * For now: curated slugs.
 */
const RECOMMENDED_BY_ROLE: Record<RoleKey, readonly string[]> = {
  rm: [
    "investment-advisor-replacing-rm",
    "how-build-billion-dollar-client-portfolio-banking",
    "ultimate-guide-interview-preparation-recruiters",
    "family-office-revolution",
    "traditional-private-banks-vs-family-offices",
    "should-private-banks-embrace-bitcoin-clients",
  ],
  hm: [
    "ubs-unbeatable",
    "ubss-silent-earthquake-10000-more-jobs-set-disappear-2027",
    "ubs-switzerlands-banking-giant-transformation",
    "changing-face-swiss-private-banking",
    "swiss-private-banking-shake-up-mega-mergers",
    "swiss-european-banks-tighten-grip-cis-clients",
  ],
} as const;

/* -------------------------------- page -------------------------------- */

export default function InsightsPage() {
  const sorted = useMemo(
    () => [...INSIGHTS].sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date)),
    []
  );

  const featured = useMemo(() => sorted.filter((a) => a.featured).slice(0, 6), [sorted]);

  /* ---------------- Recommended logic ---------------- */

  const [role, setRole] = useState<RoleKey>("rm");

  // Auto-scroll into view refs (premium chip behaviour)
  const roleToggleRef = useRef<HTMLDivElement | null>(null);
  const rmBtnRef = useRef<HTMLButtonElement | null>(null);
  const hmBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY) as RoleKey | null;
      if (saved === "rm" || saved === "hm") setRole(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch {}
  }, [role]);

  // ✅ Auto-center active chip when role changes (mobile-friendly)
  useEffect(() => {
    const container = roleToggleRef.current;
    const active = role === "rm" ? rmBtnRef.current : hmBtnRef.current;
    if (!container || !active) return;

    // Only when it can scroll
    if (container.scrollWidth <= container.clientWidth) return;

    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();

    const current = container.scrollLeft;
    const delta = aRect.left - cRect.left - (cRect.width / 2 - aRect.width / 2);

    container.scrollTo({ left: current + delta, behavior: "smooth" });
  }, [role]);

  const featuredSlugs = useMemo(() => new Set(featured.map((a) => a.slug)), [featured]);

  const recommended = useMemo(() => {
    const picked: InsightArticle[] = [];

    for (const slug of RECOMMENDED_BY_ROLE[role]) {
      const a = sorted.find((x) => x.slug === slug);
      if (!a || featuredSlugs.has(a.slug)) continue;
      picked.push(a);
      if (picked.length === 3) break;
    }

    if (picked.length < 3) {
      for (const a of sorted) {
        if (featuredSlugs.has(a.slug)) continue;
        if (picked.some((p) => p.slug === a.slug)) continue;
        picked.push(a);
        if (picked.length === 3) break;
      }
    }

    return picked;
  }, [role, sorted, featuredSlugs]);

  const roleLabel = role === "rm" ? "Relationship Managers" : "Hiring Managers";
  const roleKicker =
    role === "rm"
      ? "Career moves, portability, and performance-led roles."
      : "Strategy, restructuring signals, and talent implications.";

  return (
    <main className="relative overflow-hidden">
      {/* Background (premium / less dull) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base */}
        <div className="absolute inset-0 bg-[#060A12]" />
        {/* soft spotlights */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-30" />
        <div className="absolute top-40 left-[-200px] h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-3xl opacity-35" />
        <div className="absolute bottom-[-220px] right-[-200px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl opacity-25" />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        {/* HERO (stronger hierarchy) */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
            Private Wealth Pulse
            <span className="h-1 w-1 rounded-full bg-[#D4AF37]/80" />
            Insights
          </div>

          <h1 className="mt-5 text-4xl font-semibold text-white tracking-tight">
            Intelligence that makes decisions easier.
          </h1>

          <p className="mt-3 max-w-2xl text-white/70">
            Private banking analysis on strategy, talent, and market power — built for Switzerland and major
            booking centres.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#latest"
              className="inline-flex items-center rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
            >
              Start with latest →
            </a>
            <Link
              href="/en/insights/archive"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              Browse archive
            </Link>
          </div>
        </header>

        {/* RECOMMENDED (hero-module feel) */}
        <section className="mb-14">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Recommended for you
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">{roleLabel}</h2>
                <p className="mt-1 text-sm text-white/60">{roleKicker}</p>
              </div>

              {/* role toggle (scrollable + auto-center) */}
              <div
                ref={roleToggleRef}
                className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-white/15 bg-black/20 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <button
                  ref={rmBtnRef}
                  type="button"
                  aria-pressed={role === "rm"}
                  onClick={() => setRole("rm")}
                  className={[
                    "shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition",
                    role === "rm"
                      ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]"
                      : "text-white/60 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  I’m an RM
                </button>
                <button
                  ref={hmBtnRef}
                  type="button"
                  aria-pressed={role === "hm"}
                  onClick={() => setRole("hm")}
                  className={[
                    "shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition",
                    role === "hm"
                      ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]"
                      : "text-white/60 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  I’m Hiring
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommended.map((a) => (
                <Link
                  key={a.slug}
                  href={`/en/insights/${a.slug}`}
                  className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-white/55">{formatDate(a.date)}</div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                      Recommended
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-white leading-snug">
                    {a.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(a.markets ?? []).slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                        title={marketLabel(m)}
                      >
                        {marketLabel(m)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                    Read <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
              <Link
                href="/en/insights/archive"
                className="text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
              >
                Browse all insights →
              </Link>
              <span className="text-white/20">•</span>
              <Link
                href="/en/contact"
                className="text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
              >
                Speak confidentially →
              </Link>
            </div>
          </div>
        </section>

        {/* LATEST */}
        <section id="latest" className="mb-14 scroll-mt-28">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Latest
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">Latest intelligence</h2>
              <p className="mt-1 text-sm text-white/60">The freshest reads — updated as you publish.</p>
            </div>

            <Link href="/en/insights/archive" className="text-sm text-white/70 hover:text-white">
              Browse archive →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.slug}
                href={`/en/insights/${a.slug}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-xs text-white/55">{formatDate(a.date)}</div>
                <h3 className="mt-3 text-lg font-semibold text-white leading-snug">{a.title}</h3>
                <p className="mt-3 text-sm text-white/70 line-clamp-3">{a.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(a.markets ?? []).slice(0, 4).map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                      title={marketLabel(m)}
                    >
                      {marketLabel(m)}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                  Read <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SUB-THEMES */}
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Pillar I
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">Browse by sub-theme</h2>
              <p className="mt-1 text-sm text-white/60">Four chapters. Clear entry points.</p>
            </div>

            <Link href="/en/insights/pillar/p1" className="text-sm text-white/70 hover:text-white">
              Open Pillar I →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {P1_SUBTHEMES.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                    Chapter
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/65">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                  Explore <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}