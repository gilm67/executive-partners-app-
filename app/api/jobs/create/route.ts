// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NewJobInput>;

    const input: NewJobInput = {
      Title: (body.Title || body.Role || "").toString().trim(),
      Role: (body.Role || "").toString().trim(),
      Location: (body.Location || "").toString().trim(),
      Market: (body.Market || "").toString().trim(),
      Seniority: (body.Seniority || "").toString().trim(),
      Summary: (body.Summary || "").toString().trim(),
      Description: (body.Description || "").toString().trim(),
      Confidential: (body.Confidential || "YES").toString().trim(),
      Active: (body.Active || "TRUE").toString().trim(),
    };

    if (!input.Title && !input.Role) {
      return NextResponse.json(
        { ok: false, error: "Title or Role is required." },
        { status: 400 }
      );
    }

    const result = await createJob(input);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "Failed to create job." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch (err: any) {
    console.error("Create Job API error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}
