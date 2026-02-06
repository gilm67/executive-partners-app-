// lib/markets/labels.ts
import type { MarketCode } from "./types";

export const MARKET_LABELS: Record<MarketCode, string> = {
  // Core hubs
  CH: "Switzerland",
  UK: "United Kingdom",
  US: "United States",
  UAE: "Dubai / United Arab Emirates",
  SG: "Singapore",
  HK: "Hong Kong",
  LU: "Luxembourg",

  // Europe
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  BE: "Belgium",
  AT: "Austria",
  GR: "Greece",
  NORDICS: "Nordics (Sweden, Norway, Denmark, Finland)",
  BENELUX: "Benelux",
  CEE: "Central & Eastern Europe",

  // MEA
  MEA: "Middle East & Africa",
  SA: "Saudi Arabia",
  IL: "Israel",
  TR: "Turkey",

  // CIS
  CIS: "CIS (Russia, Kazakhstan, etc.)",

  // LATAM
  LATAM: "Latin America",
  BR: "Brazil",
  AR: "Argentina",
  CL: "Chile",
  PA: "Panama",
  CONOSUR: "Cono Sur (Southern Cone)",

  // Asia (regional)
  Asia: "Asia (Regional)",
  CN: "China",
  IN: "India",

  // Manual / fallback
  OTHER: "Other market",
};

export function marketLabel(code: string) {
  // Safe runtime fallback (keeps UI stable even if a string slips in)
  return (MARKET_LABELS as Record<string, string>)[code] ?? code;
}