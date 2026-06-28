import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";

const SHEET = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const TAB   = "FitMatcher_Leads";

const AUM_LABELS: Record<string, string> = {
  sub50:    "Below CHF 50M",
  "50_150": "CHF 50M–150M",
  "150_500":"CHF 150M–500M",
  "500_1b": "CHF 500M–1B",
  above1b:  "Above CHF 1B",
};

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, aum, seniority, geography, clientType, mandate, employment, booking, assessment, ts } = body;

    const sheets = await getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET,
      range: `${TAB}!A:L`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          ts || new Date().toISOString(),
          name || "",
          email,
          AUM_LABELS[aum] || aum,
          seniority, geography, clientType, mandate, employment, booking,
          assessment?.segment || "",
          assessment?.demandLevel || "",
        ]],
      },
    });

    await resend.emails.send({
      from: "EP System <recruiter@execpartners.ch>",
      to:   "gil.chalem@execpartners.ch",
      subject: `[Fit Matcher] ${assessment?.demandLevel || ""} demand — ${(geography || "").toUpperCase()} / ${AUM_LABELS[aum] || aum}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:580px;color:#1a1a1a;line-height:1.7">
          <div style="border-bottom:1px solid #e0d8c8;padding-bottom:14px;margin-bottom:20px">
            <span style="font-size:10px;letter-spacing:3px;color:#9a8a7a;text-transform:uppercase">
              Executive Partners · Fit Matcher
            </span>
            <h2 style="font-weight:400;margin:8px 0 0">New Profile Assessment</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tr><td style="padding:5px 0;color:#777;width:42%">Name</td><td>${name || "Not provided"}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Email</td><td>${email}</td></tr>
            <tr><td style="padding:5px 0;color:#777">AUM</td><td><strong>${AUM_LABELS[aum] || aum}</strong></td></tr>
            <tr><td style="padding:5px 0;color:#777">Seniority</td><td>${seniority}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Geography</td><td>${geography}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Client Tier</td><td>${clientType}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Mandate Style</td><td>${mandate}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Employment Pref</td><td>${employment}</td></tr>
            <tr><td style="padding:5px 0;color:#777">Booking Centre</td><td>${booking}</td></tr>
          </table>
          <div style="background:#f9f7f2;border-left:3px solid #b89557;padding:16px 18px;margin:22px 0">
            <strong>${assessment?.segment || ""}</strong> — Demand: <strong>${assessment?.demandLevel || ""}</strong>
            <p style="font-size:12px;color:#777;font-style:italic;margin:8px 0 0">${assessment?.demandRationale || ""}</p>
          </div>
          <p style="font-size:11px;color:#aaa">Executive Partners · EP Internal · ${new Date().toLocaleDateString("en-GB")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[fit-matcher]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
