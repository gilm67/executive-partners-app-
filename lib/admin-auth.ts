// lib/admin-auth.ts
/**
 * Admin auth helpers for API routes.
 * Reads token from request headers or JSON body and compares with env.
 */

export function readIncomingTokenFromReq(req: Request): string | null {
  // 1) Custom header
  const headerToken = req.headers.get("x-admin-token");
  if (headerToken) return headerToken.trim();

  // 2) Authorization: Bearer <token>
  const auth = req.headers.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return null;
}

export async function readBodyToken(req: Request): Promise<string | null> {
  try {
    // clone so downstream can still read the body if needed
    const data = await req.clone().json().catch(() => null);
    if (data && typeof data.token === "string") return data.token.trim();
    return null;
  } catch {
    return null;
  }
}

export async function assertAdmin(req: Request) {
  const envToken = process.env.JOBS_ADMIN_TOKEN;
  if (!envToken) {
    return { ok: false as const, status: 500, message: "Server auth not configured" };
  }

  const headTok = readIncomingTokenFromReq(req);
  if (headTok && headTok === envToken) return { ok: true as const };

  const bodyTok = await readBodyToken(req);
  if (bodyTok && bodyTok === envToken) return { ok: true as const };

  return { ok: false as const, status: 401, message: "Unauthorized" };
}