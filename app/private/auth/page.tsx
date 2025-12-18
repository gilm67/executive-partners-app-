// app/private/auth/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import AuthClient from "./AuthClient";

type PageProps = {
  searchParams?: { token?: string | string[]; next?: string | string[] };
};

/**
 * Allow internal redirects only.
 * We want to support:
 * - /private/... (admin/private area)
 * - /en/portability, /en/bp-simulator (public gated tools)
 * - optionally /en/... (keep it flexible but still internal)
 *
 * Block:
 * - absolute URLs
 * - protocol-relative //evil.com
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;
  const next = nextRaw.trim();
  if (!next) return null;

  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  // ✅ allow internal areas + your tools
  const allowedPrefixes = ["/private", "/en/portability", "/en/bp-simulator", "/en"];
  if (!allowedPrefixes.some((p) => next === p || next.startsWith(p + "/"))) return null;

  return next;
}

function firstString(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return null;
}

export default async function PrivateAuthPage({ searchParams }: PageProps) {
  const sp = await Promise.resolve(searchParams);

  const token = firstString(sp?.token)?.trim() || null;
  const next = sanitizeNext(firstString(sp?.next));

  return <AuthClient token={token} next={next} />;
}