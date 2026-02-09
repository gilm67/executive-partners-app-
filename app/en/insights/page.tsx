"use client";

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

function pickTopArticle(items: readonly InsightArticle[]) {
  if (!items.length) return null;

  const arr = [...items];
  const withScore = arr.filter((a) => typeof a.engagementScore === "number");

  if (withScore.length) {
    return withScore
      .slice()
      .sort(
        (a, b) =>
          (b.engagementScore ?? 0) - (a.engagementScore ?? 0) ||
          safeDateMs(b.date) - safeDateMs(a.date)
      )[0];
  }

  return arr.slice().sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date))[0];
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

const PILLARS = [
  {
    code: "P1",
    title: "Strategy & Power Structures",
    desc: "Competitive moves, ROA pressure, operating models, M&A realities.",
    href: "/en/insights/pillar/p1",
    enabled: true,
  },
  { code: "P2", title: "Talent & Compensation", desc: "Coming soon.", href: "#", enabled: false },
  { code: "P3", title: "Client Behaviour", desc: "Coming soon.", href: "#", enabled: false },
  { code: "P4", title: "Regulation & Compliance", desc: "Coming soon.", href: "#", enabled: false },
] as const;

type P1SubThemeKey = (typeof P1_SUBTHEMES)[number]["key"];

type SubThemeMeta = {
  count: number;
  lastUpdated?: string;
  top: InsightArticle | null;
};

/* -------------------------------- page -------------------------------- */

export default function InsightsPage() {
  const sorted = [...INSIGHTS].sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date));

  const featured = sorted.filter((a) => a.featured).slice(0, 6);

  const popular = sorted
    .filter((a) => !a.featured && typeof a.engagementScore === "number")
    .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
    .slice(0, 3);

  const p1Items = sorted.filter((a) => a.pillar === "P1" && a.subTheme);

  const p1BySubTheme = p1Items.reduce<Record<string, InsightArticle[]>>((acc, a) => {
    (acc[a.subTheme as string] ||= []).push(a);
    return acc;
  }, {});

  const p1SubThemeMeta = Object.fromEntries(
    P1_SUBTHEMES.map((s) => {
      const items = [...(p1BySubTheme[s.key] || [])];
      const lastUpdated = items[0]?.date;
      const top = pickTopArticle(items);

      return [
        s.key,
        {
          count: items.length,
          lastUpdated,
          top,
        } satisfies SubThemeMeta,
      ];
    })
  ) as Record<P1SubThemeKey, SubThemeMeta>;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* HERO */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold text-white">Insights</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Private banking intelligence on strategy, compensation, and market moves.
        </p>

        <a
          href="#latest"
          className="mt-6 inline-flex rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
        >
          Start with the latest →
        </a>
      </header>

      {/* LATEST */}
      <section id="latest" className="mb-12 scroll-mt-28">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Latest intelligence</h2>
            <p className="text-sm text-white/60">Best entry point.</p>
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
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/60">{formatDate(a.date)}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{a.title}</h3>
              <p className="mt-3 text-sm text-white/70">{a.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {a.markets.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                  >
                    {marketLabel(m)}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SUB-THEMES */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
              Strategy — Pillar I
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">Browse by sub-theme</h2>
          </div>

          <Link href="/en/insights/pillar/p1" className="text-sm text-white/70 hover:text-white">
            Open Pillar →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P1_SUBTHEMES.map((s) => {
            const meta = p1SubThemeMeta[s.key];
            const top = meta?.top;

            return (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                    {meta.count}
                  </span>
                </div>

                <p className="mt-2 text-xs text-white/60">{s.desc}</p>

                <div className="mt-3 text-[11px] text-white/60">
                  Updated {meta.lastUpdated ? formatDate(meta.lastUpdated) : "—"}
                </div>

                {/* Compact top article */}
                <div className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70">
                  {top ? (
                    <>
                      <span className="uppercase tracking-[0.18em] text-white/45">Top:</span>{" "}
                      <span className="line-clamp-1">{top.title}</span>
                    </>
                  ) : (
                    "No articles yet."
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* POPULAR */}
      {popular.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-white">Popular on LinkedIn</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {popular.map((a) => (
              <a
                key={a.slug}
                href={a.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="text-xs text-white/60">
                  {formatDate(a.date)} · Score {a.engagementScore}
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">{a.title}</h3>
                <p className="mt-3 text-sm text-white/70">{a.summary}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* PILLARS */}
      <section className="mt-16">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Explore by theme</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) =>
            p.enabled ? (
              <Link
                key={p.code}
                href={p.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-xs text-white/60">{p.desc}</p>
              </Link>
            ) : (
              <div
                key={p.code}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-60"
              >
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-xs text-white/60">{p.desc}</p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}