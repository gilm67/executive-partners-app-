import { google } from "googleapis";

/** Return the first defined env value from a list of names. */
function firstEnv(names: string[]): string | undefined {
  for (const n of names) {
    const v = process.env[n];
    if (v && String(v).length > 0) return v;
  }
  return undefined;
}

/** Require at least one env var from the list; throw a helpful error if missing. */
function need(names: string[], label?: string): string {
  const v = firstEnv(names);
  if (!v) {
    const shown = label || names.join(" or ");
    throw new Error(`Missing env: ${shown}`);
  }
  return v;
}

/** Get & validate Google service-account private key (B64 or plain), normalize newlines. */
function getPrivateKey(): string {
  // Prefer base64 variants
  const b64 = firstEnv(["GOOGLE_PRIVATE_KEY_B64", "GOOGLE_SHEETS_PRIVATE_KEY_B64"]);
  if (b64) {
    const key = Buffer.from(b64, "base64").toString("utf8");
    if (!key.includes("BEGIN PRIVATE KEY")) {
      throw new Error(
        "Invalid Google private key. Check GOOGLE_PRIVATE_KEY_B64/GOOGLE_SHEETS_PRIVATE_KEY_B64 (preferred) " +
          "or GOOGLE_PRIVATE_KEY/GOOGLE_SHEETS_PRIVATE_KEY."
      );
    }
    return key;
  }

  // Fallback: plain text variants (may contain literal \n that we must unescape)
  const plain =
    firstEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_PRIVATE_KEY"]) || "";
  const normalized = plain.replace(/\\n/g, "\n");
  if (!normalized.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid Google private key. Check GOOGLE_PRIVATE_KEY_B64/GOOGLE_SHEETS_PRIVATE_KEY_B64 (preferred) " +
        "or GOOGLE_PRIVATE_KEY/GOOGLE_SHEETS_PRIVATE_KEY."
    );
  }
  return normalized;
}

/**
 * Sheets client helper
 * Accepts either SHEET_ID or GOOGLE_SHEET_ID (both supported).
 * Accepts either GOOGLE_SHEETS_CLIENT_EMAIL or GOOGLE_CLIENT_EMAIL.
 * Private key via GOOGLE_PRIVATE_KEY_B64/GOOGLE_SHEETS_PRIVATE_KEY_B64 (preferred)
 * or GOOGLE_PRIVATE_KEY/GOOGLE_SHEETS_PRIVATE_KEY.
 */
export function getSheetsClient() {
  const sheetId = need(["SHEET_ID", "GOOGLE_SHEET_ID"], "SHEET_ID");
  const clientEmail = need(
    ["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_CLIENT_EMAIL"],
    "GOOGLE_SHEETS_CLIENT_EMAIL"
  );
  const key = getPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, sheetId };
}

/** Optional: lightweight env status you can use in diagnostics routes. */
export function googleEnvStatus() {
  return {
    has_sheet_id: !!firstEnv(["SHEET_ID", "GOOGLE_SHEET_ID"]),
    has_client_email: !!firstEnv(["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_CLIENT_EMAIL"]),
    has_key_b64: !!firstEnv(["GOOGLE_PRIVATE_KEY_B64", "GOOGLE_SHEETS_PRIVATE_KEY_B64"]),
    has_key_plain: !!firstEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_PRIVATE_KEY"]),
  };
}
