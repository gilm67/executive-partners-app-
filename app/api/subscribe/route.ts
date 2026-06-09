import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Executive Partners <no-reply@execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: `📬 New PWP subscriber: ${email}`,
      html: `
        <div style="font-family:system-ui;padding:20px;">
          <h2 style="font-size:18px;">New Private Wealth Pulse subscriber</h2>
          <p style="font-size:15px;">Email: <strong>${email}</strong></p>
          <p style="font-size:12px;color:#999;">Submitted via execpartners.ch/en/insights</p>
        </div>
      `,
      text: `New PWP subscriber: ${email}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SUBSCRIBE_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
