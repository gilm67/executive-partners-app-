// app/de/insights/articles.ts

import type { MarketCode } from "@/app/en/insights/articles";

export type InsightArticleDe = {
  slug: string;
  title: string;
  date: string;
  markets: readonly MarketCode[];
  summary: string;
  readTime: string;
  keywords?: readonly string[];
};

export const INSIGHTS_DE: readonly InsightArticleDe[] = [
  {
    slug: "zuerich-privatbank-talentmarkt-und-gehaelter-2026",
    title: "Zürich Privatbank 2026: Gehälter, Talentmarkt und was Senior RMs jetzt wissen müssen",
    date: "2026-06-24",
    markets: ["CH"],
    summary: "Zürich ist der grösste Finanzplatz der Schweiz — aber der Talentmarkt im Private Banking befindet sich im Wandel. UBS-Integration, steigende Compliance-Anforderungen und ein Wettbewerb um erfahrene Relationship Manager, den der Markt so noch nicht erlebt hat.",
    readTime: "8 min",
    keywords: [
      "Zürich Privatbank Gehalt 2026",
      "Relationship Manager Zürich",
      "Private Banking Recruitment Zürich",
      "UBS Julius Baer Vontobel Stellen",
      "Headhunter Zürich Privatbank",
      "FINMA Compliance 2026",
      "Zürich Talentmarkt",
    ],
  },
  {
    slug: "zurich-talentmarkt-2026",
    title:
      "Zürich 2026: Warum der Talentmarkt im Private Banking gerade umkippt",
    date: "2026-02-19",
    markets: ["CH"],
    summary:
      "Rekord-Stellenstand, UBS-Integration, regulatorische Verschärfung — und mittendrin ein Wettbewerb um Senior Relationship Manager, den Zürich so noch nicht erlebt hat.",
    readTime: "7 min",
    keywords: [
      "Zürich Private Banking",
      "UBS Stellenabbau",
      "Talentmarkt Schweiz",
      "FINMA 2026",
      "Relationship Manager Zürich",
      "KPMG Swiss Private Banking",
    ],
  },
  {
    slug: "was-zuercher-privatbanken-pruefen",
    title: "Was Zürcher Privatbanken bei einem Wechsel wirklich prüfen",
    date: "2026-02-19",
    markets: ["CH"],
    summary:
      "Portabilität, Ertragsqualität, Compliance, kulturelle Passung — die fünf Prüfpunkte, an denen Senior-Kandidaten in Zürich gemessen werden.",
    readTime: "6 min",
    keywords: [
      "Private Banking Wechsel Zürich",
      "Relationship Manager Bewerbung",
      "Portabilität Schweiz",
      "Kompensation Privatbank",
      "AUM Transfer",
    ],
  },
] as const;