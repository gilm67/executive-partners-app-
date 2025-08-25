import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Honeypot
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const payload: ContactPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: (data.phone || "").trim(),
      role: (data.role || "").trim(),
      message: data.message.trim(),
      source: data.source || "jobs.execpartners.ch/contact",
    };

    const to = process.env.CONTACT_TO_EMAIL;
    const key = process.env.RESEND_API_KEY;
    if (!to || !key) {
      console.error("Missing envs", { hasTo: !!to, hasKey: !!key });
      return NextResponse.json({ error: "Server misconfig" }, { status: 500 });
    }

    const resend = new Resend(key);

    const result = await resend.emails.send({
      from: "Executive Partners <recruiter@execpartners.ch>",
      to,
      subject: `New contact form: ${payload.name}`,
      replyTo: payload.email, // ✅ correct property
      text:
        `Source: ${payload.source}\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        `Phone: ${payload.phone}\n` +
        `Role: ${payload.role}\n\n` +
        `${payload.message}\n`,
    });

    // 🔍 Log the full result for debugging in Vercel
    console.log("Resend response:", JSON.stringify(result, null, 2));

    if ((result as any)?.error) {
      console.error("Resend error:", (result as any).error);
      return NextResponse.json(
        { error: String((result as any).error?.message || (result as any).error) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
