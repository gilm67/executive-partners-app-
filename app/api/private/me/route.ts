// app/api/private/me/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  if (!match) return null;
  const raw = match[1] ?? "";
  const val = decodeURIComponent(raw).trim();
  return val || null;
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const sessionValue = getCookieValue(cookieHeader, "ep_private_session");

  const hasSessionCookie =
    typeof sessionValue === "string" &&
    sessionValue.length >= 16 &&
    !["null", "undefined"].includes(sessionValue.toLowerCase());

  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.trim().slice("bearer ".length).trim()
    : "";
  const hasBearer = bearer.length > 20;

  if (!hasSessionCookie && !hasBearer) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          Pragma: "no-cache",
        },
      }
    );
  }

  return NextResponse.json(
    { ok: true, authenticated: true },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
      },
    }
  );
}