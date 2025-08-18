// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;

    const input: NewJobInput = {
      title: String(body?.title ?? body?.Title ?? "").trim(),
      role: String(body?.role ?? body?.Role ?? "").trim(),
      location: String(body?.location ?? body?.Location ?? "").trim(),
      market: String(body?.market ?? body?.Market ?? "").trim(),
      seniority: String(body?.seniority ?? body?.Seniority ?? "").trim(),
      summary: String(body?.summary ?? body?.Summary ?? "").trim(),
      description: String(body?.description ?? body?.Description ?? "").trim(),
    };

    if (!input.title) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: title" },
        { status: 400 }
      );
    }

    await createJob(input);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("jobs/create error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

