// lib/insights/subTheme.ts

import type { Pillar1SubTheme } from "@/app/en/insights/articles";

export type SubThemeSlug =
  | "positioning"
  | "scale-vs-boutique"
  | "roa-platform"
  | "ma-restructuring";

const P1_TO_SLUG: Record<Pillar1SubTheme, SubThemeSlug> = {
  Positioning: "positioning",
  ScaleVsBoutique: "scale-vs-boutique",
  ROAPlatform: "roa-platform",
  "M&ARestructuring": "ma-restructuring",
};

const SLUG_TO_P1: Record<SubThemeSlug, Pillar1SubTheme> = {
  positioning: "Positioning",
  "scale-vs-boutique": "ScaleVsBoutique",
  "roa-platform": "ROAPlatform",
  "ma-restructuring": "M&ARestructuring",
};

export function subThemeToSlug(subTheme: Pillar1SubTheme): SubThemeSlug {
  return P1_TO_SLUG[subTheme];
}

export function slugToP1SubTheme(slug: string): Pillar1SubTheme | null {
  return (SLUG_TO_P1 as Record<string, Pillar1SubTheme | undefined>)[slug] ?? null;
}