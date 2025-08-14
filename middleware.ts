// middleware.ts (at the project root)
import { NextRequest, NextResponse } from "next/server";

/** Protect these paths with Basic Auth */
const PROTECTED = ["/hiring-managers"];

function needsAuth(pathname: string) {
  return PROTECTED.some((p) => pathname.startsWith(p));
}

/** Safe decode for Basic auth; returns "user:pass" or "" */
function decodeBasic(b64: string) {
  try {
    return atob(b64);
  } catch {
    return "";
  }
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Executive Partners — HM"',
    },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!needsAuth(pathname)) {
    return NextResponse.next();
  }

  const user = process.env.HM_USER || "";
  const pass = process.env.HM_PASS || "";

  if (!user || !pass) return unauthorized();

  const header = req.headers.get("authorization") || "";
  const [scheme, credentials] = header.split(" ");
  if (scheme?.toLowerCase() !== "basic" || !credentials) {
    return unauthorized();
  }

  const decoded = decodeBasic(credentials);
  const idx = decoded.indexOf(":");
  const u = idx >= 0 ? decoded.slice(0, idx) : "";
  const p = idx >= 0 ? decoded.slice(idx + 1) : "";

  if (u === user && p === pass) {
    return NextResponse.next();
  }
  return unauthorized();
}

export const config = {
  matcher: ["/hiring-managers/:path*"],
};

