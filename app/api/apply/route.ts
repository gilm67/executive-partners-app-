// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { appendApplication } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const role = (body.role || "").toString().trim();
    const market = (body.market || "").toString().trim();
    const notes = (body.notes || "").toString().trim();
    const jobId = (body.jobId || "").toString().trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and Email are required" }, { status: 400 });
    }

    await appendApplication({
      Timestamp: new Date().toISOString(),
      Name: name,
      Email: email,
      Role: role,
      Market: market,
      Notes: notes,
      JobID: jobId || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}

