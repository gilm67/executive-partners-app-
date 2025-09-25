import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function readSA(): any {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) { try { return JSON.parse(inline); } catch {} }
  const fp = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_FILE || './service_account.json';
  const fs = require('fs');
  return JSON.parse(fs.readFileSync(fp,'utf8'));
}

export async function GET() {
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const TAB = process.env.GOOGLE_SHEET_TAB;
    if (!SHEET_ID) {
      return NextResponse.json({ ok:false, message:'GOOGLE_SHEET_ID missing' }, { status: 500 });
    }

    const sa = readSA();
    const auth = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
    const titles = meta.data.sheets?.map(s => s.properties?.title) || [];

    return NextResponse.json({
      ok: true,
      sheetId: SHEET_ID,
      tabEnv: TAB,
      tabs: titles,
      saEmail: sa.client_email
    });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message }, { status: 500 });
  }
}
