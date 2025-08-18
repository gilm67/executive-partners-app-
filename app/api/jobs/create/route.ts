// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Accept whatever fields your form sends and pass through to createJob().
    const payload = await req.json();

    // createJob in lib/sheets should accept a plain object and handle header mapping.
    await createJob(payload);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}


