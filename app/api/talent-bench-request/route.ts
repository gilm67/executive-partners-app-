import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { candidateId, candidateTitle, requesterEmail } = await req.json();

    if (!requesterEmail || !candidateId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Executive Partners <noreply@execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      replyTo: requesterEmail,
      subject: `Talent Bench request: ${candidateId} (${candidateTitle})`,
      text: `A client has requested the full profile for:

Candidate ID: ${candidateId}
Title: ${candidateTitle}
Requester email: ${requesterEmail}

Follow up directly with the requester.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("talent-bench-request error", err);
    return NextResponse.json(
      { error: "Failed to send request" },
      { status: 500 }
    );
  }
}
