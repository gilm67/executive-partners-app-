// app/api/candidates/pdf/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getCandidates } from "@/lib/sheets"; // adjust if your alias differs

export const runtime = "nodejs";

function findByTsEmail(rows: any[], ts: string, email: string) {
  return rows.find(
    (r) =>
      (r.Timestamp || "").toString().trim() === ts.trim() &&
      (r.Email || "").toString().trim().toLowerCase() === email.trim().toLowerCase()
  );
}

function anonymiseName(fullName: string) {
  if (!fullName) return "Anonymous Candidate";
  const parts = fullName.split(/\s+/);
  const first = parts[0] || "Candidate";
  return `${first} (Anon)`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ts = searchParams.get("ts") || "";
    const email = searchParams.get("email") || "";

    if (!ts || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing ts/email query params." },
        { status: 400 }
      );
    }

    const rows = await getCandidates();
    const row = findByTsEmail(rows as any[], ts, email);
    if (!row) {
      return NextResponse.json(
        { ok: false, error: "Candidate not found." },
        { status: 404 }
      );
    }

    // Build a simple, elegant one-pager PDF
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595.28, 841.89]); // A4 portrait (points)
    const { width } = page.getSize();

    const fontTitle = await pdf.embedFont(StandardFonts.HelveticaBold);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const blue = rgb(0.09, 0.28, 0.55);
    const dark = rgb(0.12, 0.12, 0.12);
    const gray = rgb(0.4, 0.4, 0.4);

    const marginX = 48;
    let y = 780;

    // Header bar / title
    page.drawText("Executive Partners — Top Talent", {
      x: marginX,
      y,
      size: 16,
      font: fontTitle,
      color: blue,
    });
    y -= 16 + 8;

    // Candidate (anonymised)
    const name = anonymiseName(row.Name);
    const line1 = `${name} • ${row.Role || "—"} • ${row.Market || "—"}`;
    page.drawText(line1, { x: marginX, y, size: 12, font, color: dark });
    y -= 18;

    // Meta row
    const matchScore = row["Match Score"] ? `Match ${row["Match Score"]}` : "Match —";
    const aum = row.AUM ? `AUM ${row.AUM}` : "AUM —";
    const tsDisplay = row.Timestamp?.replace("T", " ").replace("Z", "") || "—";
    const meta = `${matchScore}  •  ${aum}  •  Added ${tsDisplay}`;
    page.drawText(meta, { x: marginX, y, size: 10, font, color: gray });
    y -= 24;

    // Divider
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
    y -= 18;

    // Summary
    page.drawText("Summary", { x: marginX, y, size: 12, font: fontTitle, color: dark });
    y -= 16;

    const summary = row["AI Summary"] || "—";
    y = drawWrapped(page, summary, {
      x: marginX,
      y,
      maxWidth: width - marginX * 2,
      lineHeight: 14,
      font,
      size: 11,
      color: dark,
    });
    y -= 14;

    // Tags
    page.drawText("Tags", { x: marginX, y, size: 12, font: fontTitle, color: dark });
    y -= 14;

    const tags = (row.Tags || "").toString().replace(/,\s*/g, "  •  ") || "—";
    y = drawWrapped(page, tags, {
      x: marginX,
      y,
      maxWidth: width - marginX * 2,
      lineHeight: 14,
      font,
      size: 10.5,
      color: gray,
    });
    y -= 10;

    // Links (public)
    const links: string[] = [];
    if (row["LinkedIn Search"]) links.push("LinkedIn Search");
    if (row["CV Link"]) links.push("CV attached");
    const linksText = links.length ? links.join("  •  ") : "No public links";
    page.drawText(linksText, { x: marginX, y, size: 10, font, color: gray });
    y -= 24;

    // Footer
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
    y -= 14;

    page.drawText("© Executive Partners — Geneva • Confidential candidate overview (anonymous)", {
      x: marginX,
      y,
      size: 9,
      font,
      color: gray,
    });

    const bytes = await pdf.save();
    const filenameSafe = `${name.replace(/[^\w\-]+/g, "_")}_onepager.pdf`;

    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filenameSafe}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("PDF error:", e?.message || e);
    return NextResponse.json({ ok: false, error: "Failed to generate PDF." }, { status: 500 });
  }
}

type WrapOpts = {
  x: number;
  y: number;
  maxWidth: number;
  lineHeight: number;
  font: any;
  size: number;
  color: any;
};

function drawWrapped(page: any, text: string, opts: WrapOpts) {
  const words = text.split(/\s+/);
  let line = "";
  let y = opts.y;

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    const width = opts.font.widthOfTextAtSize(test, opts.size);
    if (width > opts.maxWidth) {
      page.drawText(line, {
        x: opts.x,
        y,
        size: opts.size,
        font: opts.font,
        color: opts.color,
      });
      y -= opts.lineHeight;
      line = w;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, {
      x: opts.x,
      y,
      size: opts.size,
      font: opts.font,
      color: opts.color,
    });
    y -= opts.lineHeight;
  }
  return y;
}
