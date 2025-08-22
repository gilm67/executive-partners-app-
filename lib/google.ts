import { google } from "googleapis";

/** Return the first non-empty env from a list */
function firstEnv(names: string[]): string | undefined {
  for (const n of names) {
    const v = process.env[n];
    if (v && String(v).trim().length > 0) return v;
  }
  return undefined;
}

/** Require at least one env var from the list (throw if missing) */
function need(names: string[], label?: string): string {
  const v = firstEnv(names);
  if (!v) {
    const shown = label || names.join(" or ");
    throw new Error(`Missing env: ${shown}`);
  }
  return v;
}

/** Build a JWT + Sheets client configured from env */
export function getSheetsClient() {
  // Accept both SHEET_ID or GOOGLE_SHEET_ID
  const sheetId = need(["SHEET_ID", "GOOGLE_SHEET_ID"], "SHEET_ID");

  // Accept both GOOGLE_SHEETS_CLIENT_EMAIL or GOOGLE_CLIENT_EMAIL
  const clientEmail = need(
    ["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_CLIENT_EMAIL"],
    "GOOGLE_SHEETS_CLIENT_EMAIL"
  );

  // Prefer B64 private key, otherwise allow plain
  const b64 = firstEnv(["GOOGLE_PRIVATE_KEY_B64", "GOOGLE_SHEETS_PRIVATE_KEY_B64"]);
  const plain = firstEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_PRIVATE_KEY"]) || "";

  // If B64 exists, decode it, otherwise use plain
  let key = b64 ? Buffer.from(b64, "base64").toString("utf8") : plain;

  // Defensive: sometimes keys come with escaped \n; normalize to real newlines
  key = key.replace(/\\n/g, "\n").trim();

  // Basic sanity check so errors are clear
  if (!key.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid Google private key. Check GOOGLE_PRIVATE_KEY_B64/GOOGLE_SHEETS_PRIVATE_KEY_B64 (preferred) " +
        "or GOOGLE_PRIVATE_KEY/GOOGLE_SHEETS_PRIVATE_KEY."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, sheetId };
}

/** Light-weight diag helper you can use in /api/google/diag */
export function hasGoogleEnv() {
  return {
    has_sheet_id: !!firstEnv(["SHEET_ID", "GOOGLE_SHEET_ID"]),
    has_client_email: !!firstEnv(["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_CLIENT_EMAIL"]),
    has_key_b64: !!firstEnv(["GOOGLE_PRIVATE_KEY_B64", "GOOGLE_SHEETS_PRIVATE_KEY_B64"]),
    has_key_plain: !!firstEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_PRIVATE_KEY"]),
  };
}
