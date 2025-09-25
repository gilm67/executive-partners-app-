// app/api/save-bp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const HEADER_ORDER = [
  'Timestamp','Candidate Name','Candidate Email','Current Role','Candidate Location',
  'Current Employer','Current Market','Currency','Base Salary','Last Bonus',
  'Current Number of Clients','Current AUM (M CHF)',
  'NNM Year 1 (M CHF)','NNM Year 2 (M CHF)','NNM Year 3 (M CHF)',
  'Revenue Year 1 (CHF)','Revenue Year 2 (CHF)','Revenue Year 3 (CHF)',
  'Total Revenue 3Y (CHF)','Profit Margin (%)','Total Profit 3Y (CHF)',
  'Score','AI Evaluation Notes',
];

// --- Helpers ---
function normalizePrivateKey(pk: string | undefined) {
  if (!pk) return pk;
  // Accept either literal newlines or \n-escaped lines
  return pk.includes('\\n') ? pk.replace(/\\n/g, '\n') : pk;
}

function readServiceAccount(): { client_email: string; private_key: string } {
  // 1) Inline JSON env
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    try {
      const obj = JSON.parse(inline);
      obj.private_key = normalizePrivateKey(obj.private_key);
      if (!obj.client_email || !obj.private_key) {
        throw new Error('client_email or private_key missing in inline JSON');
      }
      return obj;
    } catch (e: any) {
      throw new Error(`Invalid GOOGLE_SERVICE_ACCOUNT_JSON: ${e?.message}`);
    }
  }

  // 2) JSON file
  const fp = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_FILE || './service_account.json';
  try {
    const fs = require('fs');
    const raw = fs.readFileSync(fp, 'utf8');
    const obj = JSON.parse(raw);
    obj.private_key = normalizePrivateKey(obj.private_key);
    if (!obj.client_email || !obj.private_key) {
      throw new Error('client_email or private_key missing in file JSON');
    }
    return obj;
  } catch (e: any) {
    throw new Error(
      `Could not read service account JSON (file=${fp}). Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_FILE. ${e?.message}`
    );
  }
}

// --- Route ---
export async function POST(req: NextRequest) {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const TAB = process.env.GOOGLE_SHEET_TAB || 'BP_Entries';

  if (!SHEET_ID) {
    return NextResponse.json(
      { ok: false, error: 'config', message: 'GOOGLE_SHEET_ID missing' },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'bad_request', message: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  try {
    // Auth
    const sa = readServiceAccount();
    const auth = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // Derived numbers (match Streamlit)
    const nnm_y1 = Number(body.nnm_y1_m || 0);
    const nnm_y2 = Number(body.nnm_y2_m || 0);
    const nnm_y3 = Number(body.nnm_y3_m || 0);
    const roa1   = Number(body.roa_y1 || 0);
    const roa2   = Number(body.roa_y2 || 0);
    const roa3   = Number(body.roa_y3 || 0);
    const base_salary = Number(body.base_salary || 0);

    const rev1 = (nnm_y1 * roa1 / 100) * 1_000_000;
    const rev2 = (nnm_y2 * roa2 / 100) * 1_000_000;
    const rev3 = (nnm_y3 * roa3 / 100) * 1_000_000;
    const total_rev_3y = rev1 + rev2 + rev3;
    const fixed_cost   = base_salary * 1.25;
    const total_profit_3y = total_rev_3y - (fixed_cost * 3);
    const profit_margin_pct = total_rev_3y > 0 ? ((total_rev_3y - fixed_cost * 3) / total_rev_3y) * 100 : 0;

    const score    = Number(body.score ?? 0);
    const ai_notes = String(body.ai_notes ?? '');

    // Build row in the exact header order
    const rowMap: Record<string, any> = {
      'Timestamp': new Date().toISOString().replace('T', ' ').slice(0, 19),
      'Candidate Name': body.candidate_name || '',
      'Candidate Email': body.candidate_email || '',
      'Current Role': body.current_role || '',
      'Candidate Location': body.candidate_location || '',
      'Current Employer': body.current_employer || '',
      'Current Market': body.current_market || '',
      'Currency': body.currency || 'CHF',
      'Base Salary': base_salary,
      'Last Bonus': Number(body.last_bonus || 0),
      'Current Number of Clients': Number(body.current_number_clients || 0),
      'Current AUM (M CHF)': Number(body.current_assets_m || 0),
      'NNM Year 1 (M CHF)': nnm_y1,
      'NNM Year 2 (M CHF)': nnm_y2,
      'NNM Year 3 (M CHF)': nnm_y3,
      'Revenue Year 1 (CHF)': rev1,
      'Revenue Year 2 (CHF)': rev2,
      'Revenue Year 3 (CHF)': rev3,
      'Total Revenue 3Y (CHF)': total_rev_3y,
      'Profit Margin (%)': profit_margin_pct,
      'Total Profit 3Y (CHF)': total_profit_3y,
      'Score': score,
      'AI Evaluation Notes': ai_notes,
    };
    const row = HEADER_ORDER.map((k) => rowMap[k] ?? '');

    // Append
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${TAB}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Try to classify common causes to help you fix quickly
    const msg = String(err?.message || 'Unknown');
    let hint = '';

    if (/invalid_grant|invalid jwt/i.test(msg)) {
      hint = 'The private_key is likely malformed. If you pasted JSON in env, be sure newlines are \\n (escaped).';
    } else if (/PERMISSION_DENIED|403/i.test(msg)) {
      hint = 'Share the Google Sheet with the service account client_email as Editor.';
    } else if (/not found|404/i.test(msg)) {
      hint = 'Sheet ID or tab name is wrong. Check GOOGLE_SHEET_ID / GOOGLE_SHEET_TAB.';
    } else if (/Could not read service account JSON/i.test(msg)) {
      hint = 'Set GOOGLE_SERVICE_ACCOUNT_JSON (inline JSON) or GOOGLE_SERVICE_ACCOUNT_JSON_FILE (path).';
    }

    console.error('save-bp error:', msg);
    return NextResponse.json(
      { ok: false, error: 'server_error', message: hint ? `${msg} — ${hint}` : msg },
      { status: 500 }
    );
  }
}