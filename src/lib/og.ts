/**
 * Resolve an OpenGraph image path based on the route.
 * Centralized so all pages use consistent OG URLs.
 */
export function getOgImage(path: string): string {
  const SITE =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";

  if (path.startsWith("/markets")) return `${SITE}/og-markets.png`;
  if (path.startsWith("/portability")) return `${SITE}/og-portability.png`;

  // fallback
  return `${SITE}/og.png`;
}
