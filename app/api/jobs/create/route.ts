// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Normalize expected fields from the sheet schema we use elsewhere
    const input = {
      Title: (body.Title || body.Role || "").toString().trim(),
      Location: (body.Location || "").toString().trim(),
      Market: (body.Market || "").toString().trim(),
      Seniority: (body.Seniority || "").toString().trim(),
      Summary: (body.Summary || "").toString().trim(),
      Description: (body.Description || "").toString(),
      Confidential: (body.Confidential || body.confidential || "").toString().trim(),
    };

    const result = await createJob(input);
    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}


