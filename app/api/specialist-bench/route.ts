import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const SHEET_TAB = "SpecialistBench";

async function appendToSheet(row: string[]) {
  const serviceAccountKey = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
  );
  const { GoogleAuth } = await import("google-auth-library");
  const auth = new GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_TAB}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token.token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { firstName, lastName, email, role, institution, experience, markets, languages, brief } = body;

    if (!firstName || !lastName || !email || !role || !institution || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const fullName = `${firstName} ${lastName}`;
    const marketsStr = Array.isArray(markets) ? markets.join(", ") : "";

    try {
      await appendToSheet([timestamp, fullName, email, role, institution, experience, marketsStr, languages || "", brief || "", "New"]);
    } catch (sheetErr) {
      console.error("Sheet append failed:", sheetErr);
    }

    await resend.emails.send({
      from: "Executive Partners <recruiter@execpartners.ch>",
      to: ["recruiter@execpartners.ch"],
      subject: `[Specialist Bench] New profile: ${fullName} — ${role}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;color:#1a1a1a"><div style="background:#1B3A6B;padding:24px;border-radius:8px 8px 0 0"><h2 style="color:#C9A14A;margin:0;font-size:16px;letter-spacing:1px;text-transform:uppercase">Specialist Bench — New Registration</h2></div><div style="background:#f8f7f4;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e3de"><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;font-size:13px;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600;font-size:14px">${fullName}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#1B3A6B">${email}</a></td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Role</td><td style="padding:8px 0;font-size:14px">${role}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Institution</td><td style="padding:8px 0;font-size:14px">${institution}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Experience</td><td style="padding:8px 0;font-size:14px">${experience}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Markets</td><td style="padding:8px 0;font-size:14px">${marketsStr || "Not specified"}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#666">Languages</td><td style="padding:8px 0;font-size:14px">${languages || "Not specified"}</td></tr>${brief ? `<tr><td style="padding:8px 0;font-size:13px;color:#666;vertical-align:top">Notes</td><td style="padding:8px 0;font-size:14px">${brief}</td></tr>` : ""}</table></div><p style="font-size:11px;color:#999;margin-top:16px">Received: ${timestamp}</p></div>`,
    });

    await resend.emails.send({
      from: "Executive Partners <recruiter@execpartners.ch>",
      to: [email],
      subject: "You are on the Executive Partners Specialist Bench",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;color:#1a1a1a"><div style="background:#1B3A6B;padding:32px;border-radius:8px 8px 0 0;text-align:center"><h1 style="color:#C9A14A;margin:0;font-size:20px">Executive Partners</h1><p style="color:white;margin:8px 0 0;font-size:13px;opacity:0.7">Private Banking Recruitment, Geneva</p></div><div style="background:white;padding:36px;border:1px solid #e5e3de;border-top:none;border-radius:0 0 8px 8px"><p style="color:#1B3A6B;font-size:18px;font-weight:600;margin-top:0">Dear ${firstName},</p><p style="line-height:1.7;color:#444">Your profile has been registered on our Specialist Bench. We have noted your background as <strong>${role}</strong> at ${institution}.</p><p style="line-height:1.7;color:#444">We work exclusively with leading private banks and wealth managers in Switzerland and internationally. When a partner institution requests a profile that matches yours, we will reach out to you directly and confidentially.</p><p style="line-height:1.7;color:#444">In the meantime, there is nothing you need to do.</p><div style="background:#f8f7f4;border-left:3px solid #C9A14A;padding:16px 20px;margin:28px 0;border-radius:0 8px 8px 0"><p style="margin:0;font-size:13px;color:#555;line-height:1.6">To update your profile or withdraw your registration at any time, reply to this email or write to <a href="mailto:recruiter@execpartners.ch" style="color:#1B3A6B">recruiter@execpartners.ch</a>.</p></div><p style="color:#1B3A6B;font-weight:600;margin-top:24px">Gil M. Chalem<br/><span style="font-weight:400;font-size:13px;color:#666">Managing Partner, Executive Partners</span><br/><span style="font-weight:400;font-size:13px;color:#666">execpartners.ch</span></p></div></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Specialist bench error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
