import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { getSheetsClient } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** helpers */
const z = (v: any) => (v ?? "").toString().trim();

function joinName(first: string, last: string) {
  const a = z(first), b = z(last);
  return (a && b) ? `${a} ${b}` : (a || b);
}

function pickNameFromForm(get: (k: string) => FormDataEntryValue | null) {
  // common aliases used by various forms
  const direct =
    z(get("name")) ||
    z(get("fullName")) ||
    z(get("fullname")) ||
    z(get("candidateName")) ||
    z(get("yourName")) ||
    z(get("applicantName"));
  if (direct) return direct;

  // first/last combinations
  const combos: Array<[string, string]> = [
    ["firstName", "lastName"],
    ["firstname", "lastname"],
    ["first_name", "last_name"],
    ["given_name", "family_name"],
  ];
  for (const [f, l] of combos) {
    const combined = joinName(z(get(f) as any), z(get(l) as any));
    if (combined) return combined;
  }
  return "";
}

function pickNameFromJSON(body: any) {
  // direct
  const direct =
    z(body?.name) ||
    z(body?.fullName) ||
    z(body?.fullname) ||
    z(body?.candidateName) ||
    z(body?.yourName) ||
    z(body?.applicantName);
  if (direct) return direct;
  // first/last
  return joinName(body?.firstName ?? body?.firstname ?? body?.first_name ?? body?.given_name,
                  body?.lastName ?? body?.lastname ?? body?.last_name ?? body?.family_name);
}

export async function POST(req: Request) {
  try {
    const ua = req.headers.get("user-agent") || "";
    const ctype = req.headers.get("content-type") || "";

    // shared fields
    let Name = "", Email = "", Message = "", JobID = "", Role = "", Location = "", Market = "", Source = "apply_form", UserNotes = "";
    // optional CV meta (columns after Notes are fine even if your sheet doesn’t have headers yet)
    let CVFileName = "", CVFileSize = "", CVStored = "FALSE";

    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();

      Name    = pickNameFromForm((k) => form.get(k));
      Email   = z(form.get("email"));
      Message = z(form.get("message"));
      JobID   = z(form.get("jobId"));
      Role    = z(form.get("role"));
      Location= z(form.get("location"));
      Market  = z(form.get("market"));
      Source  = z(form.get("source")) || "apply_form";
      UserNotes = z(form.get("notes"));

      const file = form.get("cv") as File | null;
      if (file) {
        CVFileName = file.name || "cv";
        CVFileSize = String(file.size ?? "");
        // OAuth not configured → skip upload but keep meta
        CVStored = "FALSE";
      }
    } else if (ctype.includes("application/json")) {
      const body = await req.json();

      Name    = pickNameFromJSON(body);
      Email   = z(body.email);
      Message = z(body.message);
      JobID   = z(body.jobId);
      Role    = z(body.role);
      Location= z(body.location);
      Market  = z(body.market);
      Source  = z(body.source) || "apply_form";
      UserNotes = z(body.notes);
    } else {
      return NextResponse.json({ ok: false, error: "Unsupported content-type" }, { status: 400 });
    }

    if (!Email) {
      return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
    }

    // If the form forgot to send a name, try one last fallback from email local-part
    if (!Name && Email.includes("@")) {
      Name = Email.split("@")[0].replace(/[._-]+/g, " ").trim();
    }

    const { sheets, sheetId } = getSheetsClient();
    const Timestamp = DateTime.now().setZone("Europe/Zurich").toISO();

    // Your header order:
    // Timestamp, Name, Email, Message, JobID, Role, Location, Market, Source, UserAgent, Notes, (optional) CVFileName, CVFileSize, CVStored
    const row = [
      Timestamp,
      Name,
      Email,
      Message,
      JobID,
      Role,
      Location,
      Market,
      Source,
      ua,
      UserNotes,
      CVFileName,
      CVFileSize,
      CVStored,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Applications!A1:Z1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
