// lib/admin-auth.ts
import { headers as nextHeaders } from "next/headers";

const ADMIN_TOKEN =
  process.env.JOBS_ADMIN_TOKEN ?? process.env.APP_ADMIN_TOKEN ?? "";

/**
 * Returns true if the provided token matches the configured admin token.
 * Accepts a raw token or a "Bearer <token>" string.
 */
export function isAdmin(token?: string | null): boolean {
  if (!ADMIN_TOKEN) return false;
  if (!token) return false;

  const t = token.trim();
  if (!t) return false;

  if (t.toLowerCase().startsWith("bearer ")) {
    return t.slice(7).trim() === ADMIN_TOKEN;
  }
  return t === ADMIN_TOKEN;
}

/**
 * Reads the admin token from incoming request headers, if available.
 * Looks for:
 *   - x-admin-token: <token>
 *   - authorization: Bearer <token>
 *
 * Works around Next 15 typing where headers() may appear Promise-like.
 */
export function readIncomingToken(): string | null {
  try {
    const hOrPromise = nextHeaders() as any;

    // If headers() returned a Headers-like object (normal case)
    if (hOrPromise && typeof hOrPromise.get === "function") {
      const headerToken =
        hOrPromise.get("x-admin-token") ?? hOrPromise.get("X-Admin-Token");
      if (headerToken) return headerToken.trim();

      const auth =
        hOrPromise.get("authorization") ?? hOrPromise.get("Authorization");
      if (typeof auth === "string" && auth.toLowerCase().startsWith("bearer ")) {
        return auth.slice(7).trim();
      }
    }
  } catch {
    // next/headers not available (e.g., called outside request) – ignore
  }
  return null;
}