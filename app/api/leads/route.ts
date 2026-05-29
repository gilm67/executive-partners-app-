import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: true, warning: "resend_not_configured" });
    }
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, message } = body as { name?: string; email: string; message?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "EP <noreply@auth.execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: `New lead — ${email}`,
      html: `<p><b>${name || "Anonymous"}</b> (${email})${message ? `<br><br>${message}` : ""}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
