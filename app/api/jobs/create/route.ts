// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type NewJobInput = {
  Title: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Confidential?: string; // "YES" | "NO"
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NewJobInput>;

    const payload: NewJobInput = {
      Title: (body.Title || body["Role"] || "").toString().trim(),
      Location: (body.Location || "").toString().trim(),
      Market: (body.Market || "").toString().trim(),
      Seniority: (body.Seniority || "").toString().trim(),
      Summary: (body.Summary || "").toString().trim(),
      Description: (body.Description || "").toString(),
      Confidential: ((body.Confidential || "").toString().toUpperCase() === "YES" ? "YES" : "NO"),
    };

    if (!payload.Title) {
      return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
    }

    const id = await createJob(payload);
    return NextResponse.json({ ok: true, id });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


