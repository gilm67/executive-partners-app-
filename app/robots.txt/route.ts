// app/robots.txt/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";           // ensure process.env is available
export const dynamic = "force-dynamic";    // pick up env at request time

function getBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/$/, ""); // strip trailing slash
}

export function GET() {
  const base = getBase();
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
