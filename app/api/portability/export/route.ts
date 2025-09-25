import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

type Payload = {
  marketLabel?: string;
  bookingCentres?: string[];
  inputs?: {
    aumMix?: number;
    crossBorderLicenses?: number;
    productScope?: number;
    clientConcentration?: number;
    kycPortability?: number;
  };
  score?: number;
  benchmark?: { median: number; topQuartile: number };
  recommendations?: string[];
  interpretation?: string[];
};

function fmt(n?: number) {
  return typeof n === "number" ? String(n) : "—";
}

// Small helpers for labels to keep banker-friendly wording
const aumLabel = (n?: number) =>
  ({ 1: "Highly concentrated", 2: "Moderately concentrated", 3: "Balanced", 4: "Diversified", 5: "Well diversified" } as const)[(n ?? 3) as 1|2|3|4|5] ?? "—";
const concLabel = (n?: number) =>
  ({ 1: "Very diversified", 2: "Diversified", 3: "Balanced", 4: "Concentrated", 5: "Top-heavy" } as const)[(n ?? 3) as 1|2|3|4|5] ?? "—";
const prodLabel = (n?: number) =>
  ({ 1: "Advisory only", 2: "Advisory + DPM", 3: "Advisory/DPM + Lending", 4: "Advisory/DPM + Lending + Alternatives" } as const)[(n ?? 2) as 1|2|3|4] ?? "—";
const licLabel = (n?: number) =>
  ({ 0: "None / onshore only", 1: "Limited outbound", 2: "Multi-jurisdiction", 3: "Robust multi-jurisdiction" } as const)[(n ?? 1) as 0|1|2|3] ?? "—";
const kycLabel = (n?: number) =>
  ({ 0: "No reuse", 1: "Partial reuse", 2: "Good reuse", 3: "Near full reuse" } as const)[(n ?? 1) as 0|1|2|3] ?? "—";

function today() {
  const d = new Date();
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595.28, 841.89]); // A4 portrait
    const { width, height } = page.getSize();

    // Fonts & palette
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const ink = {
      text: rgb(0.18, 0.19, 0.2),
      light: rgb(0.58, 0.60, 0.63),
      border: rgb(0.86, 0.87, 0.89),
      panel: rgb(0.96, 0.97, 0.98),
      brand: rgb(0.07, 0.55, 0.43), // emerald-ish
      brandSoft: rgb(0.82, 0.94, 0.90),
    };

    const M = 48; // margin
    let y = height - M;

    // Watermark (subtle)
    const wm = "EXECUTIVE PARTNERS";
    page.drawText(wm, {
      x: 110, y: height/2 - 40, size: 60, font: fontBold,
      color: ink.light, rotate: degrees(30), opacity: 0.08,
    });

    // Header bar
    page.drawRectangle({ x: 0, y: height - 64, width, height: 64, color: rgb(0.985, 0.99, 0.995) });
    page.drawText("EXECUTIVE PARTNERS", { x: M, y: height - 42, size: 10, font: fontBold, color: ink.light });
    page.drawText("Portability Dossier", { x: M, y: height - 60, size: 22, font: fontBold, color: ink.text });
    page.drawText(today(), { x: width - M - 100, y: height - 52, size: 10, font: font, color: ink.light });

    // Executive summary card
    const cardX = M, cardW = width - M*2;
    const cardH = 120;
    y = height - 90;
    page.drawRectangle({ x: cardX, y: y - cardH, width: cardW, height: cardH, color: ink.panel, borderColor: ink.border, borderWidth: 1 });
    page.drawText("Executive summary", { x: cardX + 16, y: y - 26, size: 12, font: fontBold, color: ink.text });

    const mk = body.marketLabel || "—";
    const bc = (body.bookingCentres && body.bookingCentres.length) ? body.bookingCentres.join(", ") : "—";
    page.drawText(`Market: ${mk}`, { x: cardX + 16, y: y - 46, size: 11, font: font, color: ink.text });
    page.drawText(`Booking centres: ${bc}`, { x: cardX + 16, y: y - 64, size: 11, font: font, color: ink.text });

    // Score bar on the right of the card
    const score = body.score ?? 0;
    const median = body.benchmark?.median ?? 0;
    const topQ = body.benchmark?.topQuartile ?? 0;

    const barX = cardX + cardW * 0.45, barY = y - 56, barW = cardW * 0.45, barH = 12;
    page.drawText("Score", { x: barX, y: y - 26, size: 12, font: fontBold, color: ink.text });
    page.drawRectangle({ x: barX, y: barY, width: barW, height: barH, color: ink.border });
    const fillW = Math.max(0, Math.min(barW, (barW * score) / 100));
    page.drawRectangle({ x: barX, y: barY, width: fillW, height: barH, color: ink.brand });

    // Median & top quartile ticks
    const mdX = barX + (barW * median) / 100;
    const tqX = barX + (barW * topQ) / 100;
    page.drawRectangle({ x: mdX - 1, y: barY - 2, width: 2, height: barH + 4, color: ink.light });
    page.drawRectangle({ x: tqX - 1, y: barY - 2, width: 2, height: barH + 4, color: ink.light });
    page.drawText("Median", { x: mdX - 16, y: barY + 16, size: 8, font: font, color: ink.light });
    page.drawText("Top quartile", { x: tqX - 20, y: barY + 16, size: 8, font: font, color: ink.light });

    const scoreStr = `${score}/100`;
    page.drawText(scoreStr, { x: barX + barW + 8, y: barY - 1, size: 11, font: fontBold, color: ink.text });

    // Section divider
    y = y - cardH - 18;
    page.drawLine({ start: { x: M, y }, end: { x: width - M, y }, thickness: 1, color: ink.border });
    y -= 26;

    // Inputs & context (two columns)
    page.drawText("Inputs & context", { x: M, y, size: 12, font: fontBold, color: ink.text });
    y -= 18;

    const colGap = 28;
    const colW = (width - M*2 - colGap) / 2;
    let leftX = M, rightX = M + colW + colGap;
    let leftY = y, rightY = y;

    const inputs = body.inputs || {};
    const lineH = 16;

    const drawKV = (x: number, yIn: number, k: string, v: string) => {
      page.drawText(`${k}:`, { x, y: yIn, size: 10, font: fontBold, color: ink.text });
      page.drawText(v,     { x: x + 124, y: yIn, size: 10, font, color: ink.text });
    };

    // Left column
    drawKV(leftX, leftY, "AUM mix", `${fmt(inputs.aumMix)} — ${aumLabel(inputs.aumMix)}`); leftY -= lineH;
    drawKV(leftX, leftY, "Client concentration", `${fmt(inputs.clientConcentration)} — ${concLabel(inputs.clientConcentration)}`); leftY -= lineH;
    drawKV(leftX, leftY, "Cross-border licenses", `${fmt(inputs.crossBorderLicenses)} — ${licLabel(inputs.crossBorderLicenses)}`); leftY -= lineH;

    // Right column
    drawKV(rightX, rightY, "Product scope", `${fmt(inputs.productScope)} — ${prodLabel(inputs.productScope)}`); rightY -= lineH;
    drawKV(rightX, rightY, "Compliance / KYC portability", `${fmt(inputs.kycPortability)} — ${kycLabel(inputs.kycPortability)}`); rightY -= lineH;

    y = Math.min(leftY, rightY) - 14;
    page.drawLine({ start: { x: M, y }, end: { x: width - M, y }, thickness: 1, color: ink.border });
    y -= 22;

    // BULLET lists
    const drawBullets = (title: string, items: string[]) => {
      page.drawText(title, { x: M, y, size: 12, font: fontBold, color: ink.text });
      y -= 14;
      const bullet = "•";
      items.forEach((t) => {
        // wrap naive: split by ~84 chars
        const chunks: string[] = [];
        const words = t.split(" ");
        let line = "";
        words.forEach((w) => {
          if ((line + " " + w).trim().length > 84) {
            chunks.push(line.trim());
            line = w;
          } else {
            line += " " + w;
          }
        });
        if (line.trim()) chunks.push(line.trim());
        chunks.forEach((chunk, idx) => {
          const pre = idx === 0 ? `${bullet} ` : "   ";
          page.drawText(pre + chunk, { x: M + 2, y, size: 10, font, color: ink.text });
          y -= 14;
        });
      });
      y -= 8;
      page.drawLine({ start: { x: M, y }, end: { x: width - M, y }, thickness: 1, color: ink.border });
      y -= 22;
    };

    const interp = body.interpretation ?? [
      "Score meaning: 80+ usually gets fast, competitive offers. 65–79 is portable with targeted remediation; below 65 expect gating on onboarding and outbound permissions.",
      "Documentation: Ensure CRS/FATCA & MiFID/LSFin packs; tax residency proofs and PoAs are current and transferable.",
      "Licensing: Validate key target geographies; avoid mis-selling risk on outbound activity.",
      "Product scope: Lending and Alternatives materially increase portability if documentation & client classification support them.",
      "Concentration: If top-5 clients exceed ~45% of AUM, expect questions on relationship durability & revenue stability.",
    ];

    drawBullets("Interpretation & banker guidance", interp);

    const steps = body.recommendations ?? [
      "Add a Tier-1 hub (e.g., London, Luxembourg, Singapore) to widen custodian matches.",
      "Standardize CRS/FATCA + MiFID/LSFin packs for reuse across custodians.",
    ];

    drawBullets("Recommended next steps", steps);

    const bytes = await pdf.save();
  const buf = Buffer.from(bytes);
  return new NextResponse(buf as any, { status: 200, headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename="Portability.pdf"", "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("export error:", e);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
