import { NextResponse } from "next/server";
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

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
      return NextResponse.json({ ok: true }, { status: 200 }); // bot, drop silently
    }

    // --- Required fields ---
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

    // // Uncomment to send via Resend
    // const to = process.env.CONTACT_TO_EMAIL;
    // if (!to) throw new Error("CONTACT_TO_EMAIL env var not set");
    // await resend.emails.send({
    //   from: "Executive Partners <no-reply@execpartners.ch>",
    //   to,
    //   subject: `New contact form: ${payload.name}`,
    //   reply_to: payload.email,
    //   text:
    //     `Source: ${payload.source}\n` +
    //     `Name: ${payload.name}\n` +
    //     `Email: ${payload.email}\n` +
    //     `Phone: ${payload.phone}\n` +
    //     `Role: ${payload.role}\n\n` +
    //     `${payload.message}\n`,
    // });

    console.log("Contact form submission:", payload);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
