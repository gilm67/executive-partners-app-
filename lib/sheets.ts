import { google } from "googleapis";

/* =========================
   Google Sheets Auth
   ========================= */
export function getSheetsAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL || "";

  // Prefer the base64-encoded key if available
  let key = "";
  if (process.env.GOOGLE_PRIVATE_KEY_B64) {
    key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, "base64").toString("utf8");
  } else if (process.env.GOOGLE_PRIVATE_KEY) {
    key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  }

  if (!email || !key) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY(_B64)");
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}
