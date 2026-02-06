"use client";

import Link from "next/link";
import { INSIGHTS } from "./articles";
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

export default function InsightsPage() {
  const items = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Insights</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Market intelligence and hiring signals across private banking and wealth management.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((a) => (
          <Link
            key={a.slug}
            href={`/en/insights/${a.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="text-xs text-white/60">{formatDate(a.date)}</div>

            <div className="mt-2 text-lg font-semibold text-white">{a.title}</div>

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
    </main>
  );
}