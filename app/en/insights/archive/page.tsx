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

function getYear(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  return Number.isFinite(y) ? y : 0;
}

// Keep your primary filter markets simple (as requested)
const FILTER_MARKETS = ["ALL", "CH", "UK", "US", "UAE", "ASIA"] as const;
type FilterMarket = (typeof FILTER_MARKETS)[number];

export default function InsightsArchivePage() {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState<FilterMarket>("ALL");

  const sorted = useMemo(() => {
    return [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  // Archive = everything NOT featured
  const archive = useMemo(() => {
    return sorted.filter((a) => !a.featured);
  }, [sorted]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return archive.filter((a) => {
      const matchMarket = market === "ALL" ? true : a.markets.includes(market);
      const matchQuery =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query);

      return matchMarket && matchQuery;
    });
  }, [archive, q, market]);

  const groupedByYear = useMemo(() => {
    const map = new Map<number, typeof filtered>();
    for (const a of filtered) {
      const y = getYear(a.date);
      const arr = map.get(y) ?? [];
      arr.push(a);
      map.set(y, arr);
    }
    // newest year first
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-white">Insights Archive</h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Browse older insights by year. Filter by market and search by title
            or summary.
          </p>
        </div>

        <Link
          href="/en/insights"
          className="mt-1 text-sm font-semibold text-white/75 hover:text-white"
        >
          ← Back to Insights
        </Link>
      </div>

      {/* Controls */}
      <div className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/70">
            Search
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title or summary…"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          />
        </div>

        {/* Market */}
        <div>
          <label className="block text-xs font-semibold text-white/70">
            Market
          </label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as FilterMarket)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-white/20"
          >
            {FILTER_MARKETS.map((m) => (
              <option key={m} value={m}>
                {m === "ALL" ? "All markets" : marketLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex items-center justify-between text-xs text-white/60">
          <div>
            Showing <span className="text-white">{filtered.length}</span>{" "}
            archive articles
          </div>

          <button
            onClick={() => {
              setQ("");
              setMarket("ALL");
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-semibold text-white/80 hover:bg-white/10 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Year sections */}
      {groupedByYear.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/70">
          No archive articles match your search/filter.
        </div>
      ) : (
        <div className="space-y-10">
          {groupedByYear.map(([year, items]) => (
            <section key={year}>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="text-lg font-semibold text-white">{year}</h2>
                <div className="text-xs text-white/60">{items.length} articles</div>
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

                    <div className="mt-3 text-sm text-white/70">{a.summary}</div>

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
          ))}
        </div>
      )}
    </main>
  );
}