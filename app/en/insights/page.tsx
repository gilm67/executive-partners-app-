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

type RoleKey = "rm" | "hm";
const ROLE_STORAGE_KEY = "insights_role";

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

  const [role, setRole] = useState<RoleKey>("rm");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ROLE_STORAGE_KEY) as RoleKey | null;
      if (saved === "rm" || saved === "hm") setRole(saved);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch {
      /* noop */
    }
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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* Example of SAFE markets rendering */}
      {recommended.map((a) => (
        <Link
          key={a.slug}
          href={`/en/insights/${a.slug}`}
          className="block rounded-xl border border-white/10 bg-white/5 p-5"
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
    </main>
  );
}