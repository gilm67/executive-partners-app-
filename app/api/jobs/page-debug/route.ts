// app/api/jobs/page-debug/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = (h.get("x-forwarded-proto") || "https").split(",")[0].trim();
    if (host) return `${proto}://${host}`;
  } catch {}
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.execpartners.ch";
}

export const runtime = "nodejs";

export async function GET() {
  const base = getBaseUrl();
  let status = 0;
  let ok = false;
  let text = "";
  let json: any = null;

  try {
    const res = await fetch(`${base}/api/jobs/list`, {
      next: { revalidate: 60 },
      cache: "no-store",
    });
    status = res.status;
    ok = res.ok;
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      json = await res.json();
    } else {
      text = (await res.text()).slice(0, 200);
    }
  } catch (e: any) {
    text = `fetch threw: ${e?.message || String(e)}`;
  }

  return NextResponse.json({
    base,
    status,
    ok,
    preview: json ?? text,
    now: new Date().toISOString(),
  });
}
