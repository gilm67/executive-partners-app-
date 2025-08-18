// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// very light validation/normalization without importing types
function norm(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const input = {
      Title: norm(body.Title || body.title || body.Role || body.role),
      Location: norm(body.Location || body.location),
      Market: norm(body.Market || body.market),
      Seniority: norm(body.Seniority || body.seniority),
      Summary: norm(body.Summary || body.summary || ""),
      Confidential: norm(body.Confidential || body.confidential || "")
        .toUpperCase()
        .replace(/\s+/g, "") === "YES"
        ? "YES"
        : "",
    };

    if (!input.Title) {
      return NextResponse.json(
        { ok: false, error: "Title is required" },
        { status: 400 }
      );
    }

    // createJob should write to Google Sheet and return some id/row ref
    const result = await createJob(input as any);

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}

