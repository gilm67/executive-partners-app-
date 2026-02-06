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

const CORE_FILTERS = [
  { code: "ALL", label: "All" },
  { code: "CH", label: "Switzerland" },
  { code: "UK", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "UAE", label: "Dubai / UAE" },
  { code: "Asia", label: "Asia" },
] as const;

type FilterCode = (typeof CORE_FILTERS)[number]["code"];

export default function InsightsArchivePage() {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState<FilterCode>("ALL");

  const { years, grouped } = useMemo(() => {
    const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

    const query = q.trim().toLowerCase();

    const filtered = sorted.filter((a) => {
      const matchesQuery =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query);

      const matchesMarket =
        market === "ALL" ? true : a.markets.includes(market);

      return matchesQuery && matchesMarket;
    });

    const map = new Map<number, typeof filtered>();
    for (const a of filtered) {
      const y = new Date(a.date).getFullYear();
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(a);
    }

    const years = Array.from(map.keys()).sort((a, b) => b - a);
    return { years, grouped: map };
  }, [q, market]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-white">Insights Archive</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Full library of insights. Use search + market filters to find older pieces fast.
          </p>
          <div className="mt-3">
            <Link href="/en/insights" className="text-sm font-semibold text-white/75 hover:text-white">
              ← Back to Insights
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-white/85">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title or summary…"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white/85">Filter by market</label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as FilterCode)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white"
          >
            {CORE_FILTERS.map((m) => (
              <option key={m.code} value={m.code}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Year sections */}
      <div className="space-y-10">
        {years.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            No results. Try a different search or market filter.
          </div>
        )}

        {years.map((year) => {
          const items = grouped.get(year) ?? [];
          return (
            <section key={year}>
              <h2 className="mb-4 text-xl font-semibold text-white">{year}</h2>

              <div className="grid gap-4 md:grid-cols-2">
                {items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/en/insights/${a.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <div className="text-xs text-white/60">{formatDate(a.date)}</div>
                    <div className="mt-2 text-base font-semibold text-white">{a.title}</div>
                    <div className="mt-2 text-sm text-white/70">{a.summary}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
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

                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                      Read summary →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}