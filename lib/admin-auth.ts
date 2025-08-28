import { headers } from "next/headers";

/** Read token from headers (does not consume the request body). */
export function readIncomingToken(): string | null {
  const h = headers();
  const headerToken = h.get("x-admin-token");
  if (headerToken) return headerToken.trim();

  const auth = h.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return null;
}

/** Safely read token from JSON body without consuming the original Request. */
export async function readBodyToken(req: Request): Promise<string | null> {
  try {
    const clone = req.clone(); // important: don’t consume caller’s body
    const data = await clone.json().catch(() => null);
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

  const headTok = readIncomingToken();
  if (headTok && headTok === envToken) return { ok: true as const };

  const bodyTok = await readBodyToken(req);
  if (bodyTok && bodyTok === envToken) return { ok: true as const };

  return { ok: false as const, status: 401, message: "Unauthorized" };
}
