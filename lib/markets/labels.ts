// lib/markets/labels.ts

/**
 * Canonical market labels
 * Single source of truth across Insights, Portability, Jobs, PDFs
 */

export const MARKET_LABELS: Record<string, string> = {
  // Core booking hubs
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
  BENELUX: "Benelux (Belgium, Netherlands, Luxembourg)",
  NORDICS: "Nordics (Sweden, Norway, Denmark, Finland)",
  CEE: "Central & Eastern Europe",

  // Middle East & Africa
  MEA: "Middle East & Africa",
  SA: "Saudi Arabia",
  IL: "Israel",
  TR: "Turkey",

  // CIS
  CIS: "CIS (Russia, Kazakhstan, Ukraine, etc.)",

  // LATAM
  LATAM: "Latin America",
  BR: "Brazil",
  AR: "Argentina",
  CL: "Chile",
  PA: "Panama",
  CONOSUR: "Southern Cone (Cono Sur)",

  // Asia (regional)
  ASIA: "Asia (Regional)",
  Asia: "Asia (Regional)", // ✅ alias for articles / legacy usage
  CN: "China",
  IN: "India",

  // Fallback / manual
  OTHER: "Other market",
};

/**
 * Resolve market code to human-readable label
 * Safe for SSR / SSG / Client Components
 */
export function marketLabel(code?: string | null): string {
  if (!code) return "";
  return MARKET_LABELS[code] ?? code;
}