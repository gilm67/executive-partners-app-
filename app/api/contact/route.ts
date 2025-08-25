import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  message: string;
  website?: string; // honeypot
  source?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<ContactPayload>;

    // --- Anti-spam honeypot ---
    if (data.website) {
      // Bot likely filled the hidden field; accept but do nothing
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // --- Required fields ---
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Build a clean payload
    const payload: ContactPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: (data.phone || "").trim(),
      role: (data.role || "").trim(),
      message: data.message.trim(),
      source: data.source || "jobs.execpartners.ch/contact",
    };

    // --- Send email via Resend ---
    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      throw new Error("CONTACT_TO_EMAIL env var not set");
    }

    const result = await resend.emails.send({
      from: "Executive Partners <recruiter@execpartners.ch>",
      to,
      subject: `New contact form: ${payload.name}`,
      reply_to: payload.email,
      text:
        `Source: ${payload.source}\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        `Phone: ${payload.phone}\n` +
        `Role: ${payload.role}\n\n` +
        `${payload.message}\n`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
