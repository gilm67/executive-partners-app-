import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "EP Tools <noreply@auth.execpartners.ch>";
const TO = "gil.chalem@execpartners.ch";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[capture-lead] RESEND_API_KEY not set");
      return NextResponse.json({ ok: true, warning: "resend_not_configured" });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, tool, summary } = body as {
      name?: string; email: string; tool: string; summary?: string;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const displayName = name?.trim() || "Anonymous";
    const toolLabel = tool === "portability" ? "Portability Readiness Score™" : "Business Plan Simulator";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    await resend.emails.send({
      from: FROM, to: TO,
      subject: `🔔 New tool lead — ${toolLabel} — ${email}`,
      html: `<p><b>${displayName}</b> (${email}) used <b>${toolLabel}</b> at ${timestamp}${summary ? `<br><br>${summary}` : ""}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capture-lead] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
