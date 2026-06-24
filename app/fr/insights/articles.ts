// app/fr/insights/articles.ts

import type { MarketCode } from "@/app/en/insights/articles";

export type InsightArticleFr = {
  slug: string;
  title: string;
  date: string;
  markets: readonly MarketCode[];
  summary: string;
  readTime: string;
  keywords?: readonly string[];
};

export const INSIGHTS_FR: readonly InsightArticleFr[] = [
  {
    slug: "geneve-banque-privee-salaires-et-marche-2026",
    title: "Genève Banque Privée 2026 : Salaires, Marché des Talents et Ce que Tout Senior RM Doit Savoir",
    date: "2026-06-24",
    markets: ["CH"],
    summary: "Genève reste la place de banque privée la plus internationale du monde — mais le marché des talents s'est profondément transformé. Secteur EAM en expansion, exigences compliance renforcées, et une concurrence pour les Senior RMs avec livre portable que la place n'avait pas connue depuis une décennie.",
    readTime: "8 min",
    keywords: [
      "Genève banque privée salaire 2026",
      "Relationship Manager Genève",
      "recrutement banque privée Genève",
      "UBP Pictet Lombard Odier recrutement",
      "headhunter Genève banque privée",
      "FINMA compliance 2026",
      "marché talent Genève",
    ],
  },
];
