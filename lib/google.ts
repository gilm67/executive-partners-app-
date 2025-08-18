import { google } from "googleapis";

/** Try multiple env var names, return the first non-empty value (trimmed). */
function firstEnv(names: string[]): string | undefined {
  for (const n of names) {
    const v = process.env[n];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

/** Require an env var (supporting multiple names); throw if missing. */
function need(names: string[], label?: string): string {
  const v = firstEnv(names);
  if (!v) {
    const shown = label || names.join(" or ");
    throw new Error(`Missing env: ${shown}`);
  }
  return v;
}

/** Decode the service account private key.
 *  - Prefer Base64 variants (no newline issues).
 *  - Fall back to plain env with \n escapes.
 *  Supported names:
 *    - B64: GOOGLE_PRIVATE_KEY_B64, GOOGLE_SHEETS_PRIVATE_KEY_B64
 *    - Plain: GOOGLE_PRIVATE_KEY, GOOGLE_SHEETS_PRIVATE_KEY
 */
function getServiceAccountKey(): string {
  const b64 = firstEnv(["GOOGLE_PRIVATE_KEY_B64", "GOOGLE_SHEETS_PRIVATE_KEY_B64"]);
  if (b64) {
    return Buffer.from(b64, "base64").toString("utf8");
  }
  const raw =
    firstEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_PRIVATE_KEY"]) || "";
  // Convert literal \n sequences into real newlines
  return raw.replace(/\\n/g, "\n");
}

/** Sheets client using a Service Account JWT.
 *  Supported env names:
 *   - Sheet ID: SHEET_ID or GOOGLE_SHEET_ID
 *   - Client email: GOOGLE_SHEETS_CLIENT_EMAIL or GOOGLE_CLIENT_EMAIL
 *   - Key: handled by getServiceAccountKey()
 */
export function getSheetsClient() {
  const sheetId = need(["SHEET_ID", "GOOGLE_SHEET_ID"], "SHEET_ID");
  const clientEmail = need(
    ["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_CLIENT_EMAIL"],
    "GOOGLE_SHEETS_CLIENT_EMAIL"
  );
  const key = getServiceAccountKey();

  if (!key.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid Google private key. Check GOOGLE_PRIVATE_KEY_B64/GOOGLE_SHEETS_PRIVATE_KEY_B64 (preferred) " +
        "or GOOGLE_PRIVATE_KEY/GOOGLE_SHEETS_PRIVATE_KEY."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      // add Drive scope only if you truly need Drive file ops:
      // "https://www.googleapis.com/auth/drive",
    ],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, sheetId };
}

/** Optional health info for debugging /health */
export function googleEnvHealth() {
  const hasSheetId = !!firstEnv(["SHEET_ID", "GOOGLE_SHEET_ID"]);
  const hasClientEmail = !!firstEnv([
    "GOOGLE_SHEETS_CLIENT_EMAIL",
    "GOOGLE_CLIENT_EMAIL",
  ]);
  const hasKeyB64 = !!firstEnv([
    "GOOGLE_PRIVATE_KEY_B64",
    "GOOGLE_SHEETS_PRIVATE_KEY_B64",
  ]);
  const hasKeyPlain = !!firstEnv([
    "GOOGLE_PRIVATE_KEY",
    "GOOGLE_SHEETS_PRIVATE_KEY",
  ]);

  return {
    has_sheet_id: hasSheetId,
    has_client_email: hasClientEmail,
    has_key_b64: hasKeyB64,
    has_key_plain: hasKeyPlain,
  };
}


