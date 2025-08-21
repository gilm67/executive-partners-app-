// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/sheets";
import { DateTime } from "luxon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  jobId?: string;
  role?: string;
  location?: string;
  market?: string;
};

// === POST: Save a new inquiry ===
export async function POST(req: Request) {
  try {
    const data: ContactPayload = await req.json();
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sheets = await getSheetsClient();
    const ts = DateTime.now().setZone("Europe/Zurich").toFormat("yyyy-MM-dd HH:mm:ss");
    const ua = req.headers.get("user-agent") || "";

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID!,
      range: "Applications!A:K", // Matches your headers
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          ts,                // Timestamp
          data.name,         // Name
          data.email,        // Email
          data.message,      // Message
          data.jobId || "",  // JobID
          data.role || "",   // Role
          data.location || "", // Location
          data.market || "", // Market
          "contact_page",    // Source
          ua,                // UserAgent
          "New",             // Notes
        ]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ Contact form error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// === GET: Preview last 10 inquiries ===
export async function GET() {
  try {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID!,
      range: "Applications!A:K",
    });

    const rows = res.data.values || [];
    const [header, ...data] = rows;
    if (!header) return NextResponse.json([]);

    // Take the last 10 entries, most recent first
    const last10 = data.slice(-10).reverse();

    const formatted = last10.map((r) => ({
      Timestamp: r[0] || "",
      Name: r[1] || "",
      Email: r[2] || "",
      Message: r[3] || "",
      JobID: r[4] || "",
      Role: r[5] || "",
      Location: r[6] || "",
      Market: r[7] || "",
      Source: r[8] || "",
      UserAgent: r[9] || "",
      Notes: r[10] || "",
    }));

    return NextResponse.json(formatted);
  } catch (err: any) {
    console.error("❌ Contact form fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
