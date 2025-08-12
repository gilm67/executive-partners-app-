import { google } from "googleapis";
import { Readable } from "stream";

function envOrThrow(name) {
  const v = (process.env[name] || "").trim();
  if (!v) throw new Error(`Missing ${name} in env`);
  return v;
}

const GOOGLE_CLIENT_EMAIL = envOrThrow("GOOGLE_CLIENT_EMAIL");
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
const GOOGLE_DRIVE_FOLDER_ID = envOrThrow("GOOGLE_DRIVE_FOLDER_ID");

const auth = new google.auth.JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function main() {
  const now = new Date().toISOString().replace(/[:.]/g, "-");
  const name = `EP-drive-check-${now}.txt`;
  const content = `Executive Partners drive check at ${new Date().toISOString()}`;
  const stream = Readable.from(Buffer.from(content, "utf8"));

  const res = await drive.files.create({
    requestBody: {
      name,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
      mimeType: "text/plain",
    },
    media: { mimeType: "text/plain", body: stream },
    fields: "id, webViewLink, parents",
    supportsAllDrives: true,
  });

  console.log("✅ Upload OK");
  console.log("File ID:", res.data.id);
  console.log("Link   :", res.data.webViewLink || `https://drive.google.com/file/d/${res.data.id}/view`);
}

main().catch((e) => {
  console.error("❌ Upload failed:", e.message || e);
  process.exit(1);
});
