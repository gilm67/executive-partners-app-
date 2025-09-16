// lib/og.ts
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";

/**
 * Returns the correct OG image URL depending on the route
 */
export function getOgImage(path: string): string {
  if (path.startsWith("/about")) return `${SITE}/og-about.png`;
  if (path.startsWith("/markets")) return `${SITE}/og-markets.png`;
  if (path.startsWith("/portability")) return `${SITE}/og-portability.png`;
  return `${SITE}/og.png`; // fallback for homepage or others
}
