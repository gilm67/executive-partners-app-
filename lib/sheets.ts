import { google } from "googleapis";

function getSheetsAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL || "";
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("Missing GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY");
  return new google.auth.JWT({
    email,
    key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets", // read + write
    ],
  });
}

export type Candidate = {
  Timestamp: string;
  Name: string;
  Email: string;
  Role: string;
  Market: string;
  AUM: string;
  Mobility: string;
  Notes: string;
  "CV Link": string;
  "LinkedIn Search": string;
  "AI Summary": string;
  Tags: string;              // <- make sure your sheet’s header is “Tags”
  "Match Score": string | number;
  Shortlist?: string;        // <- column can be missing; we’ll create it
};

const TAB = "Candidates";

export async function getCandidates(): Promise<Candidate[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!A1:ZZ10000`,
  });

  const rows = resp.data.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0] as string[];
  const data = rows.slice(1);

  const objects = data.map((r) => {
    const o: any = {};
    headers.forEach((h, i) => { o[h] = r[i] ?? ""; });
    const ms = Number(o["Match Score"]);
    o["Match Score"] = Number.isFinite(ms) ? ms : o["Match Score"];
    return o as Candidate;
  });

  return objects;
}

/** Ensure a header exists; returns its 1-based column index. If missing, appends it. */
export async function ensureHeader(headerName: string): Promise<number> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // read first row (headers)
  const headersResp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!1:1`,
  });
  const headers = (headersResp.data.values?.[0] || []) as string[];

  let idx = headers.findIndex((h) => (h || "").trim().toLowerCase() === headerName.trim().toLowerCase());
  if (idx >= 0) return idx + 1; // 1-based

  // append header at the end
  const newHeaders = [...headers];
  newHeaders.push(headerName);
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${TAB}!1:1`,
    valueInputOption: "RAW",
    requestBody: { values: [newHeaders] },
  });
  return newHeaders.length; // new last column, 1-based
}

/**
 * Find row by (Timestamp, Email) and update the “Shortlist” column (YES/NO).
 * Creates the “Shortlist” header if it doesn’t exist.
 */
export async function updateShortlistCell(
  email: string,
  timestamp: string,
  value: "YES" | "NO"
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Ensure we know the shortlist column
  const shortlistCol = await ensureHeader("Shortlist");

  // Read all rows to find the match
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${TAB}!A1:ZZ10000`,
  });
  const rows = resp.data.values || [];
  if (rows.length < 2) throw new Error("No candidate rows.");

  const headers = rows[0] as string[];
  const tsIdx = headers.findIndex((h) => (h || "").toLowerCase() === "timestamp");
  const emailIdx = headers.findIndex((h) => (h || "").toLowerCase() === "email");
  if (tsIdx < 0 || emailIdx < 0) throw new Error("Sheet must contain 'Timestamp' and 'Email' headers.");

  // find row number (2-based because row 1 is headers)
  let rowNumber = -1;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] || [];
    const ts = (row[tsIdx] || "").toString().trim();
    const em = (row[emailIdx] || "").toString().trim();
    if (ts === timestamp && em === email) {
      rowNumber = i + 1; // 1-based index
      break;
    }
  }
  if (rowNumber < 0) throw new Error("Row not found for given email/timestamp.");

  // Build A1 notation for the shortlist cell
  const colLetter = colNumberToLetters(shortlistCol);
  const a1 = `${TAB}!${colLetter}${rowNumber}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: a1,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });
}

/** Convert 1-based column number to letters (e.g., 1->A, 28->AB) */
function colNumberToLetters(n: number): string {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
