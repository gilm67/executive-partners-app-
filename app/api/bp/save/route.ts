import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'node:fs';

export const dynamic = 'force-dynamic';

const HEADER_ORDER = [
  "Timestamp","Candidate Name","Candidate Email","Current Role","Candidate Location",
  "Current Employer","Current Market","Currency","Base Salary","Last Bonus",
  "Current Number of Clients","Current AUM (M CHF)",
  "NNM Year 1 (M CHF)","NNM Year 2 (M CHF)","NNM Year 3 (M CHF)",
  "Revenue Year 1 (CHF)","Revenue Year 2 (CHF)","Revenue Year 3 (CHF)",
  "Total Revenue 3Y (CHF)","Profit Margin (%)","Total Profit 3Y (CHF)",
  "Score","AI Evaluation Notes"
];

function readServiceAccount() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    const parsed = JSON.parse(inline);
    // fix private_key newlines if needed
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    }
    return parsed;
  }
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_FILE;
  if (file && fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    return parsed;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sa = readServiceAccount();
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const TAB = process.env.GOOGLE_SHEET_TAB || 'BP_Entries';

    if (!sa || !SHEET_ID) {
      return NextResponse.json(
        { ok: false, error: 'not_configured', message: 'Google credentials or SHEET_ID missing' },
        { status: 501 },
      );
    }

    const auth = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Compute the same derived fields you had in Streamlit
    const nnm_y1 = Number(body.nnm_y1_m || 0);
    const nnm_y2 = Number(body.nnm_y2_m || 0);
    const nnm_y3 = Number(body.nnm_y3_m || 0);
    const roa1 = Number(body.roa_y1 || 0);
    const roa2 = Number(body.roa_y2 || 0);
    const roa3 = Number(body.roa_y3 || 0);
    const base_salary = Number(body.base_salary || 0);

    const rev1 = nnm_y1 * roa1 / 100 * 1_000_000;
    const rev2 = nnm_y2 * roa2 / 100 * 1_000_000;
    const rev3 = nnm_y3 * roa3 / 100 * 1_000_000;
    const total_rev_3y = rev1 + rev2 + rev3;
    const fixed_cost = base_salary * 1.25;
    const total_profit_3y = (rev1 + rev2 + rev3) - (fixed_cost * 3);
    const profit_margin_pct = total_rev_3y > 0 ? ((total_rev_3y - fixed_cost * 3) / total_rev_3y) * 100 : 0;

    // Optional score/verdict from client (or compute server-side if you prefer)
    const score = Number(body.score ?? 0);
    const ai_notes = String(body.ai_notes ?? '');

    const rowMap: Record<string, any> = {
      "Timestamp": new Date().toISOString().replace('T', ' ').slice(0, 19),
      "Candidate Name": body.candidate_name || '',
      "Candidate Email": body.candidate_email || '',
      "Current Role": body.current_role || '',
      "Candidate Location": body.candidate_location || '',
      "Current Employer": body.current_employer || '',
      "Current Market": body.current_market || '',
      "Currency": body.currency || 'CHF',
      "Base Salary": base_salary,
      "Last Bonus": Number(body.last_bonus || 0),
      "Current Number of Clients": Number(body.current_number_clients || 0),
      "Current AUM (M CHF)": Number(body.current_assets_m || 0),
      "NNM Year 1 (M CHF)": nnm_y1,
      "NNM Year 2 (M CHF)": nnm_y2,
      "NNM Year 3 (M CHF)": nnm_y3,
      "Revenue Year 1 (CHF)": rev1,
      "Revenue Year 2 (CHF)": rev2,
      "Revenue Year 3 (CHF)": rev3,
      "Total Revenue 3Y (CHF)": total_rev_3y,
      "Profit Margin (%)": profit_margin_pct,
      "Total Profit 3Y (CHF)": total_profit_3y,
      "Score": score,
      "AI Evaluation Notes": ai_notes,
    };

    const row = HEADER_ORDER.map((k) => rowMap[k] ?? '');

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${TAB}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: 'server_error', message: err?.message ?? 'Unknown' }, { status: 500 });
  }
}
