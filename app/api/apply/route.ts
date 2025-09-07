// app/api/apply/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const payload = Object.fromEntries(form.entries());

    // OPTIONAL: forward to Google Apps Script / Zapier / Manatal webhook
    const url = process.env.APPLICANT_WEBHOOK_URL;
    if (url) {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, received: payload });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "apply failed" }, { status: 500 });
  }
}