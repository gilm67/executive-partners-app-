// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function norm(v: unknown): string {
  const s = (v ?? "").toString().trim();
  return s;
}
function yesNo(v: unknown): string {
  if (typeof v === "string") {
    return v.trim().toUpperCase().startsWith("Y") ? "YES" : "";
  }
  if (typeof v === "boolean") {
    return v ? "YES" : "";
  }
  return "";
}

/**
 * Expected JSON body (case-insensitive keys tolerated):
 * {
 *   "Title": string,
 *   "Role": string,
 *   "Location": string,
 *   "Market": string,
 *   "Seniority": string,
 *   "Summary": string,
 *   "Confidential": "YES" | "NO" | true | false
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const payload = {
      Title: norm(body.Title ?? body.title ?? body.Role ?? body.role),
      Role: norm(body.Role ?? body.role),
      Location: norm(body.Location ?? body.location),
      Market: norm(body.Market ?? body.market),
      Seniority: norm(body.Seniority ?? body.seniority),
      Summary: norm(body.Summary ?? body.summary),
      Confidential: yesNo(body.Confidential ?? body.confidential),
    };

    // basic guard: at least a title or role
    if (!payload.Title && !payload.Role) {
      return NextResponse.json(
        { ok: false, error: "Missing Title/Role" },
        { status: 400 }
      );
    }

    // create the job via your sheets adapter
    const result = await createJob(payload as any);

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

