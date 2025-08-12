// app/api/candidates/export/route.ts
import { NextResponse } from "next/server";
import { getCandidates } from "@/lib/sheets"; // ✅ use alias so it works locally & on Vercel

export const runtime = "nodejs";

export async function GET() {
  const rows = await getCandidates();

  const headers = [
    "Timestamp","Name","Email","Role","Market",
    "AUM","Mobility","Notes","CV Link","LinkedIn Search",
    "AI Summary","Tags","Match Score","Shortlist"
  ];

  const esc = (v: any) => {
    const s = (v ?? "").toString();
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [
    headers.join(","),
    ...rows.map(r => headers.map(h => esc((r as any)[h])).join(",")),
  ];
  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="candidates_export.csv"`,
    },
  });
}
