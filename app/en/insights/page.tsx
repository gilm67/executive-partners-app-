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
type SubThemeMeta = { count: number; lastUpdated?: string; top: InsightArticle | null };

/* ----------------------- recommended-for-you config ----------------------- */

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
    "swiss-european-banks-tighten-grip-cis-clients", // ✅ FIXED
  ],
} as const;

/* -------------------------------- page -------------------------------- */

export default function InsightsPage() {
  const sorted = useMemo(
    () => [...INSIGHTS].sort((a, b) => safeDateMs(b.date) - safeDateMs(a.date)),
    []
  );

  const featured = useMemo(() => sorted.filter((a) => a.featured).slice(0, 6), [sorted]);

  const popular = useMemo(
    () =>
      sorted
        .filter((a) => !a.featured && typeof a.engagementScore === "number")
        .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
        .slice(0, 3),
    [sorted]
  );

  const [role, setRole] = useState<RoleKey>("rm");

  useEffect(() => {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY) as RoleKey | null;
    if (saved === "rm" || saved === "hm") setRole(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* … rest of your JSX unchanged … */}
    </main>
  );
}