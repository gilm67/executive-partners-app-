// app/api/jobs/activate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/sheets"; // re-exported from lib/google

function requireAuth(req: NextRequest): string | null {
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Auth
    const token = requireAuth(req);
    if (!token || token !== process.env.APP_ADMIN_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const active = (searchParams.get("active") || "TRUE").toUpperCase();

    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }
    if (active !== "TRUE" && active !== "FALSE") {
      return NextResponse.json({ ok: false, error: "active must be TRUE or FALSE" }, { status: 400 });
    }

    const { sheets, sheetId } = getSheetsClient();

    // Read the sheet
    const read = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Jobs!A1:Z",
      majorDimension: "ROWS",
    });

    const values = read.data.values || [];
    if (values.length < 2) {
      return NextResponse.json({ ok: false, error: "No rows" }, { status: 404 });
    }

    const headers = values[0].map((h) => String(h).trim());
    const idCol = headers.findIndex((h) => h.toLowerCase() === "id");
    const activeCol = headers.findIndex((h) => h.toLowerCase() === "active");

    if (idCol === -1 || activeCol === -1) {
      return NextResponse.json({ ok: false, error: "ID or Active column missing" }, { status: 500 });
    }

    const bodyRows = values.slice(1);
    const rowIndex = bodyRows.findIndex((r) => String(r[idCol] ?? "") === id);
    if (rowIndex === -1) {
      return NextResponse.json({ ok: false, error: `Job id ${id} not found` }, { status: 404 });
    }

    // Convert 0-based column index -> A1 column letters (handles >26 cols safely)
    const indexToColumn = (index: number) => {
      let col = "";
      while (index >= 0) {
        col = String.fromCharCode((index % 26) + 65) + col;
        index = Math.floor(index / 26) - 1;
      }
      return col;
    };

    const sheetRow = rowIndex + 2; // +1 header +1 to get 1-based
    const colLetter = indexToColumn(activeCol);
    const targetRange = `Jobs!${colLetter}${sheetRow}:${colLetter}${sheetRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: targetRange,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[active]] },
    });

    return NextResponse.json({ ok: true, id, active });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Unknown error" }, { status: 500 });
  }
}
