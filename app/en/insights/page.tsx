"use client";

import { useEffect, useMemo, useState } from "react";
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

/* ----------------------- self-healing recommended ----------------------- */

const DEAD_SLUGS_KEY = "insights_dead_slugs";

function getDeadSlugs(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(DEAD_SLUGS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function markDeadSlug(slug: string) {
  try {
    const dead = getDeadSlugs();
    dead.add(slug);
    localStorage.setItem(DEAD_SLUGS_KEY, JSON.stringify([...dead]));
  } catch {}
}

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
};

/* -------------------------------- page -------------------------------- */

export default function InsightsPage() {
  const sorted = useMemo(
    () => [...INSIGHTS].sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date)),
    []
  );

  const featured = useMemo(
    () => sorted.filter((a) => a.featured).slice(0, 6),
    [sorted]
  );

  /* ---------------- Recommended logic ---------------- */

  const [role, setRole] = useState<RoleKey>("rm");

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

  const featuredSlugs = useMemo(
    () => new Set(featured.map((a) => a.slug)),
    [featured]
  );

  const recommended = useMemo(() => {
    const picked: InsightArticle[] = [];
    const dead = getDeadSlugs();

    for (const slug of RECOMMENDED_BY_ROLE[role]) {
      if (dead.has(slug)) continue;

      const a = sorted.find((x) => x.slug === slug);

      if (!a) {
        markDeadSlug(slug); // 🔥 self-heal permanently
        continue;
      }

      if (featuredSlugs.has(a.slug)) continue;

      picked.push(a);
      if (picked.length === 3) break;
    }

    // Fallback if list shrinks
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

  /* -------------------------------- render -------------------------------- */

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* HERO */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold text-white">Insights</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Private banking intelligence on strategy, talent, and market power.
        </p>
      </header>

      {/* RECOMMENDED */}
      <section className="mb-14">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                Recommended for you
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                {role === "rm" ? "Relationship Managers" : "Hiring Managers"}
              </h2>
            </div>

            <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
              <button
                onClick={() => setRole("rm")}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg ${
                  role === "rm" ? "bg-white/10 text-white" : "text-white/60"
                }`}
              >
                I’m an RM
              </button>
              <button
                onClick={() => setRole("hm")}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg ${
                  role === "hm" ? "bg-white/10 text-white" : "text-white/60"
                }`}
              >
                I’m Hiring
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recommended.map((a) => (
              <Link
                key={a.slug}
                href={`/en/insights/${a.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="text-xs text-white/60">{formatDate(a.date)}</div>
                <h3 className="mt-2 text-base font-semibold text-white">{a.title}</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(a.markets ?? []).map((m) => (
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
        </div>
      </section>

      {/* LATEST */}
      <section className="mb-14">
        <h2 className="mb-6 text-lg font-semibold text-white">Latest intelligence</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.slug}
              href={`/en/insights/${a.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/60">{formatDate(a.date)}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{a.title}</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {(a.markets ?? []).map((m) => (
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
      <section className="mt-16">
        <h2 className="mb-6 text-lg font-semibold text-white">Browse by sub-theme</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P1_SUBTHEMES.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
            >
              <h3 className="text-sm font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-xs text-white/60">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}