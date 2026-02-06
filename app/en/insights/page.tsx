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
  const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  const featured = sorted.filter((a) => a.featured).slice(0, 6);

  // ✅ IMPORTANT: exclude featured from "popular" to avoid duplicates
  const popular = sorted
    .filter((a) => !a.featured && typeof a.engagementScore === "number")
    .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
    .slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Insights</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Market intelligence and hiring signals across private banking and wealth management.
        </p>
      </div>

      {/* Featured */}
      <div className="mb-10 flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">Featured</h2>
        <Link
          href="/en/insights/archive"
          className="text-sm font-semibold text-white/75 hover:text-white"
        >
          Browse archive →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((a) => (
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

      {/* Popular */}
      {popular.length > 0 && (
        <>
          <div className="mt-14 mb-6">
            <h2 className="text-lg font-semibold text-white">Popular on LinkedIn</h2>
            <p className="mt-1 text-sm text-white/60">
              Based on engagement score (manual ranking for now).
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {popular.map((a) => (
              <a
                key={a.slug}
                href={a.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">{formatDate(a.date)}</div>
                  <div className="text-xs text-white/60">Score: {a.engagementScore}</div>
                </div>

                <div className="mt-2 text-base font-semibold text-white">{a.title}</div>

                <div className="mt-3 text-sm text-white/70">{a.summary}</div>

                <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#D4AF37]">
                  Read on LinkedIn →
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}