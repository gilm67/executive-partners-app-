/* app/en/insights/archive/page.tsx */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { INSIGHTS } from "../articles";
import { marketLabel } from "@/lib/markets/marketLabel";

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

function yearFromIso(iso: string) {
  const y = Number(String(iso).slice(0, 4));
  return Number.isFinite(y) ? y : 0;
}

const MARKET_FILTERS = [
  { code: "ALL", label: "All" },
  { code: "CH", label: "Switzerland (CH)" },
  { code: "UK", label: "United Kingdom (UK)" },
  { code: "US", label: "United States (US)" },
  { code: "UAE", label: "Dubai / UAE" },
  { code: "ASIA", label: "Asia" },
  { code: "EU", label: "Europe (EU)" },
  { code: "MEA", label: "Middle East & Africa (MEA)" },
  { code: "LATAM", label: "Latin America (LATAM)" },
] as const;

export default function InsightsArchivePage() {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState<(typeof MARKET_FILTERS)[number]["code"]>(
    "ALL"
  );

  const { years, byYear } = useMemo(() => {
    const query = q.trim().toLowerCase();

    // ✅ Archive only = NOT featured
    const archived = INSIGHTS.filter((a) => a.featured !== true);

    const filtered = archived.filter((a) => {
      const matchesMarket =
        market === "ALL" ? true : a.markets.includes(market as any);

      const haystack = `${a.title} ${a.summary}`.toLowerCase();
      const matchesQuery = query ? haystack.includes(query) : true;

      return matchesMarket && matchesQuery;
    });

    // newest first
    const sorted = [...filtered].sort((a, b) => (a.date < b.date ? 1 : -1));

    const map = new Map<number, typeof sorted>();
    for (const a of sorted) {
      const y = yearFromIso(a.date);
      const arr = map.get(y) ?? [];
      arr.push(a);
      map.set(y, arr);
    }

    const y = Array.from(map.keys())
      .filter((n) => n > 0)
      .sort((a, b) => b - a);

    return { years: y, byYear: map };
  }, [q, market]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
            Insights Archive
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Archive</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Older Private Wealth Pulse articles, grouped by year. Filter by
            market and search titles/summaries.
          </p>

          <div className="mt-3">
            <Link
              href="/en/insights"
              className="text-sm font-semibold text-white/75 hover:text-white"
            >
              ← Back to Insights
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="flex w-full flex-col gap-3 md:w-[420px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (title + summary)…"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          />

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as any)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
          >
            {MARKET_FILTERS.map((m) => (
              <option key={m.code} value={m.code} className="bg-[#0B0E13]">
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {years.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          No archived articles match your filters.
        </div>
      ) : (
        <div className="space-y-10">
          {years.map((y) => {
            const items = byYear.get(y) ?? [];
            return (
              <section key={y}>
                <div className="mb-5 flex items-end justify-between">
                  <h2 className="text-lg font-semibold text-white">{y}</h2>
                  <div className="text-xs text-white/60">{items.length} posts</div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {items.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/en/insights/${a.slug}`}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                    >
                      <div className="text-xs text-white/60">
                        {formatDate(a.date)}
                      </div>

                      <div className="mt-2 text-lg font-semibold text-white">
                        {a.title}
                      </div>

                      <div className="mt-3 text-sm text-white/70">
                        {a.summary}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {a.markets.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                            title={marketLabel(m)}
                          >
                            {marketLabel(m)}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                        Read summary →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}