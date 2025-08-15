// lib/google.ts
import { google } from "googleapis";

function decodeServiceKey(): string {
  const b64 = process.env.GOOGLE_PRIVATE_KEY_B64 || "";
  const plain = process.env.GOOGLE_PRIVATE_KEY || "";

  if (b64) {
    const key = Buffer.from(b64, "base64").toString("utf8");
    if (!key.includes("BEGIN PRIVATE KEY")) {
      throw new Error("GOOGLE_PRIVATE_KEY_B64 decoded but not a valid PEM");
    }
    return key;
  }
  if (plain) {
    const key = plain.replace(/\\n/g, "\n");
    if (!key.includes("BEGIN PRIVATE KEY")) {
      throw new Error("GOOGLE_PRIVATE_KEY present but not a valid PEM");
    }
    return key;
  }
  throw new Error("Missing GOOGLE_PRIVATE_KEY_B64 / GOOGLE_PRIVATE_KEY");
}

export function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!clientEmail) throw new Error("Missing GOOGLE_CLIENT_EMAIL");
  const key = decodeServiceKey();

  return new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

