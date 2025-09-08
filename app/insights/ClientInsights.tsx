'use client';

import { useState } from "react";
import Link from "next/link";

type Item = {
  title: string;
  date: string;   // e.g., "Sep 1, 2025"
  href: string;
  tag: "Private Wealth Pulse" | "Article";
};

export default function ClientInsights({
  newsletter,
  articles,
}: {
  newsletter: Item[];
  articles: Item[];
}) {
  const [tab, setTab] = useState<"pulse" | "articles">("pulse");
  const items = tab === "pulse" ? newsletter : articles;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* soft brand background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            Research & Commentary
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Insights
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
            Private Wealth Pulse and articles on Swiss & global private banking. Fresh,
            practical takes for senior bankers and leadership.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-8 flex w-full max-w-lg rounded-xl border border-white/10 bg-white/5 p-1 text-sm font-semibold">
          <button
            onClick={() => setTab("pulse")}
            className={`flex-1 rounded-lg px-4 py-2 transition ${
              tab === "pulse" ? "bg-blue-600 text-white" : "text-white/80 hover:bg-white/10"
            }`}
          >
            Private Wealth Pulse
          </button>
          <button
            onClick={() => setTab("articles")}
            className={`flex-1 rounded-lg px-4 py-2 transition ${
              tab === "articles" ? "bg-blue-600 text-white" : "text-white/80 hover:bg-white/10"
            }`}
          >
            Articles
          </button>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.href}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_12px_50px_rgba(0,0,0,.5)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 [background:radial-gradient(120%_60%_at_50%_-10%,rgba(59,130,246,1),transparent_60%)]" />
              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/80">
                  {it.tag}
                </span>
                <h3 className="mt-2 line-clamp-3 text-lg font-semibold text-white min-h-[3.25rem]">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{it.date}</p>
              </div>
              <div className="mt-auto pt-4">
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Read on LinkedIn <span className="translate-y-[1px]">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Subscribe strip */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/70 to-emerald-600/70 p-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Subscribe to Private Wealth Pulse</h2>
              <p className="mt-1 text-sm text-white/90">
                One concise email with the signals that matter. No spam, ever.
              </p>
            </div>
            <form
              action="https://example.com/webhooks/subscribe" /* replace later */
              method="POST"
              className="flex w-full max-w-md gap-2"
            >
              <input
                required
                name="email"
                type="email"
                placeholder="you@bank.com"
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
