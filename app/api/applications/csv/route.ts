import { NextResponse } from "next/server";
import { getApplications } from "@/lib/sheets";

function csvEscape(value: string) {
  const v = (value ?? "").replace(/\r?\n/g, " ").trim();
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export async function GET() {
  const rows = await getApplications();

  const headers = ["Timestamp", "Name", "Email", "Role", "Market", "Notes", "Job ID"];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        csvEscape(r.Timestamp || ""),
        csvEscape(r.Name || ""),
        csvEscape(r.Email || ""),
        csvEscape(r.Role || ""),
        csvEscape(r.Market || ""),
        csvEscape(r.Notes || ""),
        csvEscape(r["Job ID"] || ""),
      ].join(",")
    ),
  ];

  const csv = lines.join("\n");
  const filename = `applications-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

