// app/api/revalidate-jobs/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token =
    req.headers.get("x-admin-token") ||
    (req.headers.get("authorization")?.toLowerCase().startsWith("bearer ")
      ? req.headers.get("authorization")!.slice(7).trim()
      : "");

  if (!process.env.JOBS_ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Server auth not configured" }, { status: 500 });
  }
  if (!token || token !== process.env.JOBS_ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Tell Next.js to revalidate the /jobs page
    // The path must match your route segment
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch"}/jobs`, {
      method: "PURGE",
    });

    return NextResponse.json({ ok: true, revalidated: "/jobs" });
  } catch (err: any) {
    console.error("Revalidate error", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
