// components/portability/Section5Analysis.tsx
"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import EmailGateModal from "@/components/EmailGateModal";
import { usePortability } from "./store";

type PdfMode = "full" | "anon";

function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full ${
          pct >= 70 ? "bg-emerald-400" : pct >= 40 ? "bg-amber-400" : "bg-rose-400"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const clamp100 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function formatNow() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  } catch {
    return new Date().toLocaleString();
  }
}

function sanitizeFilePart(s: string) {
  return (s || "Diagnostic").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
}

export default function Section5Analysis() {
  /* ---------- STORE ---------- */
  const candidate_name = usePortability((s) => s.candidate_name);
  const candidate_email = usePortability((s) => s.candidate_email);
  const current_market = usePortability((s) => s.current_market);
  const years_experience = usePortability((s) => s.years_experience);

  const self_acquired_pct = usePortability((s) => s.self_acquired_pct);
  const avg_client_size_m = usePortability((s) => s.avg_client_size_m);
  const top_3_concentration_pct = usePortability((s) => s.top_3_concentration_pct);
  const inherited_book_pct = usePortability((s) => s.inherited_book_pct);

  const booking_centres = usePortability((s) => s.booking_centres);
  const cross_border_licenses = usePortability((s) => s.cross_border_licenses);
  const kyc_portability = usePortability((s) => s.kyc_portability);

  const primary_products = usePortability((s) => s.primary_products);
  const lending_exposure_m = usePortability((s) => s.lending_exposure_m);
  const total_aum_m = usePortability((s) => s.total_aum_m);
  const dpm_aum_pct = usePortability((s) => s.dpm_aum_pct);
  const advisory_aum_pct = usePortability((s) => s.advisory_aum_pct);

  const avg_relationship_years = usePortability((s) => s.avg_relationship_years);
  const clients_known_personally_pct = usePortability((s) => s.clients_known_personally_pct);
  const multi_generational_pct = usePortability((s) => s.multi_generational_pct);
  const client_referral_rate_pct = usePortability((s) => s.client_referral_rate_pct);

  const number_clients = usePortability((s) => s.number_clients);

  /* ---------- LOCAL STATE ---------- */
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);

  /* ======================= SCORE CALCULATION ======================= */
  const dimensions = useMemo(() => {
    // Client quality
    let clientQuality = 50;
    if ((self_acquired_pct ?? 0) >= 70) clientQuality += 20;
    else if ((self_acquired_pct ?? 0) >= 50) clientQuality += 10;
    else clientQuality -= 10;

    if ((avg_client_size_m ?? 0) >= 5) clientQuality += 15;
    else if ((avg_client_size_m ?? 0) >= 3) clientQuality += 10;
    else if ((avg_client_size_m ?? 0) >= 1.5) clientQuality += 5;

    if ((top_3_concentration_pct ?? 0) <= 30) clientQuality += 15;
    else if ((top_3_concentration_pct ?? 0) <= 45) clientQuality += 5;
    else clientQuality -= 10;

    // Regulatory
    let regulatory = 40;
    const tier1 = ["Geneva", "Zurich", "London", "Luxembourg", "Singapore"];
    if ((booking_centres ?? []).some((c) => tier1.includes(c))) regulatory += 20;

    if ((booking_centres ?? []).length >= 3) regulatory += 15;
    else if ((booking_centres ?? []).length >= 2) regulatory += 10;

    if (cross_border_licenses === 3) regulatory += 20;
    else if (cross_border_licenses === 2) regulatory += 10;
    else if (cross_border_licenses === 1) regulatory += 5;

    if (kyc_portability === 3) regulatory += 15;
    else if (kyc_portability === 2) regulatory += 10;
    else if (kyc_portability === 1) regulatory += 5;

    // Product dependency
    let productDep = 60;
    const products = primary_products ?? [];
    const hasLending = products.some((p) => p.includes("Lending"));
    const hasAlts = products.some(
      (p) => p.includes("Private Equity") || p.includes("Hedge") || p.includes("Real Estate")
    );

    if (hasLending && (total_aum_m ?? 0) > 0 && (lending_exposure_m ?? 0) > (total_aum_m ?? 0) * 0.3)
      productDep -= 20;
    else if (hasLending) productDep += 10;

    if (hasAlts) productDep += 10;
    if ((dpm_aum_pct ?? 0) >= 40) productDep += 15;
    if ((advisory_aum_pct ?? 0) >= 30) productDep += 10;

    // Relationship
    let relationship = 50;
    if ((avg_relationship_years ?? 0) >= 10) relationship += 20;
    else if ((avg_relationship_years ?? 0) >= 7) relationship += 15;
    else if ((avg_relationship_years ?? 0) >= 5) relationship += 10;

    if ((clients_known_personally_pct ?? 0) >= 80) relationship += 15;
    else if ((clients_known_personally_pct ?? 0) >= 60) relationship += 10;

    if ((multi_generational_pct ?? 0) >= 40) relationship += 10;
    else if ((multi_generational_pct ?? 0) >= 25) relationship += 5;

    if ((client_referral_rate_pct ?? 0) >= 20) relationship += 15;
    else if ((client_referral_rate_pct ?? 0) >= 10) relationship += 10;

    return {
      client_quality: clamp100(clientQuality),
      regulatory: clamp100(regulatory),
      product_dependency: clamp100(productDep),
      relationship_strength: clamp100(relationship),
    };
  }, [
    self_acquired_pct,
    avg_client_size_m,
    top_3_concentration_pct,
    booking_centres,
    cross_border_licenses,
    kyc_portability,
    primary_products,
    lending_exposure_m,
    total_aum_m,
    dpm_aum_pct,
    advisory_aum_pct,
    avg_relationship_years,
    clients_known_personally_pct,
    multi_generational_pct,
    client_referral_rate_pct,
  ]);

  const overallScore = useMemo(() => {
    return clamp100(
      dimensions.client_quality * 0.3 +
        dimensions.regulatory * 0.25 +
        dimensions.product_dependency * 0.2 +
        dimensions.relationship_strength * 0.25
    );
  }, [dimensions]);

  const verdict = useMemo(() => {
    if (overallScore >= 75) return "Excellent Portability";
    if (overallScore >= 60) return "Good Portability";
    if (overallScore >= 40) return "Moderate Portability";
    return "Limited Portability";
  }, [overallScore]);

  const interpretation = useMemo(() => {
    if (overallScore >= 80)
      return "Highly transferable book profile across Tier-1 platforms. Structuring and bank selection will drive execution speed.";
    if (overallScore >= 70)
      return "Strong portability profile. Main friction points are typically compliance portability and booking-centre fit.";
    if (overallScore >= 60)
      return "Good portability with identifiable constraints. A structured move plan and platform targeting is recommended.";
    if (overallScore >= 40)
      return "Conditional portability. Risk mitigation (KYC/booking/product dependencies) should be addressed before execution.";
    return "Limited portability under standard conditions. Material constraints must be resolved to improve transfer probability.";
  }, [overallScore]);

  // Benchmarking & percentile (illustrative internal model; swap with real data when available)
  const benchmarking = useMemo(() => {
    const marketProfiles = {
      CH: { avgScore: 68, topQuartile: 78, label: "Swiss private banking" },
      UK: { avgScore: 65, topQuartile: 75, label: "UK wealth management" },
      UAE: { avgScore: 62, topQuartile: 72, label: "UAE private banking" },
      SG: { avgScore: 66, topQuartile: 76, label: "Singapore wealth management" },
    };

    const market = (current_market as keyof typeof marketProfiles) || "CH";
    const profile = marketProfiles[market] || marketProfiles.CH;

    let percentile = 50;
    if (overallScore >= profile.topQuartile) percentile = 85;
    else if (overallScore >= profile.avgScore + 5) percentile = 70;
    else if (overallScore >= profile.avgScore) percentile = 55;
    else if (overallScore >= profile.avgScore - 10) percentile = 40;
    else percentile = 25;

    return {
      market: profile.label,
      percentile,
      avgScore: profile.avgScore,
      comparison: overallScore >= profile.avgScore ? "above" : "below",
    };
  }, [overallScore, current_market]);

  // Market-specific insights (heuristics)
  const marketInsights = useMemo(() => {
    const insights: string[] = [];

    if ((total_aum_m ?? 0) >= 500) {
      insights.push(
        `${total_aum_m}M AUM positions you for Tier-1 platforms (e.g., UBS UHNW, Pictet, Julius Baer, Lombard Odier).`
      );
    } else if ((total_aum_m ?? 0) >= 250) {
      insights.push(`${total_aum_m}M AUM qualifies for mid-tier private banks and select boutiques.`);
    } else if ((total_aum_m ?? 0) >= 100) {
      insights.push(`${total_aum_m}M AUM is typically suitable for boutiques and independent asset managers.`);
    } else {
      insights.push(`${total_aum_m ?? 0}M AUM: prioritize platform fit and growth plan to strengthen portability.`);
    }

    if ((avg_relationship_years ?? 0) >= 10) {
      insights.push(`${avg_relationship_years}-year avg relationships: expect higher transfer probability with preparation.`);
    } else if ((avg_relationship_years ?? 0) >= 5) {
      insights.push(`${avg_relationship_years}-year relationships: structured approach usually required to maximize transfers.`);
    } else {
      insights.push(`${avg_relationship_years ?? 0}-year relationships: loyalty risk; strengthen top-client coverage pre-move.`);
    }

    const market = current_market || "CH";
    if (market === "CH") insights.push("Swiss market: onboarding often 3–5 months due to regulatory depth.");
    else if (market === "UAE") insights.push("UAE market: onboarding can be faster (6–10 weeks) if licensing is aligned.");
    else if (market === "SG") insights.push("Singapore: 8–12 week onboarding; MAS licensing and suitability are stringent.");

    return insights;
  }, [total_aum_m, avg_relationship_years, current_market]);

  // Risk flags with impact/timeline (heuristics)
  const riskFlags = useMemo(() => {
    const flags: {
      label: string;
      severity: "High" | "Medium" | "Low";
      impact: string;
      timeToResolve: string;
    }[] = [];

    if ((inherited_book_pct ?? 0) > 50)
      flags.push({
        label: "High inherited book (>50%)",
        severity: "High",
        impact: "Elevated attrition risk",
        timeToResolve: "3–6 months to rebuild",
      });

    if ((top_3_concentration_pct ?? 0) > 50)
      flags.push({
        label: "Top-3 concentration >50%",
        severity: "High",
        impact: "High dependency on few clients",
        timeToResolve: "6–12 months to diversify",
      });
    else if ((top_3_concentration_pct ?? 0) > 45)
      flags.push({
        label: "Top-3 concentration >45%",
        severity: "Medium",
        impact: "Moderate concentration risk",
        timeToResolve: "3–6 months to adjust",
      });

    if ((booking_centres ?? []).length === 0)
      flags.push({
        label: "No booking centres selected",
        severity: "High",
        impact: "Cross-border execution constrained",
        timeToResolve: "Immediate (platform selection)",
      });
    else if ((booking_centres ?? []).length === 1)
      flags.push({
        label: "Single booking centre",
        severity: "Medium",
        impact: "Limited structuring options",
        timeToResolve: "4–8 weeks to add options",
      });

    if ((cross_border_licenses ?? 0) === 0)
      flags.push({
        label: "No cross-border licenses",
        severity: "High",
        impact: "Domestic market only",
        timeToResolve: "3–6 months licensing",
      });
    else if ((cross_border_licenses ?? 0) === 1)
      flags.push({
        label: "Limited cross-border coverage",
        severity: "Medium",
        impact: "Restricted geographic reach",
        timeToResolve: "2–4 months per jurisdiction",
      });

    if ((avg_client_size_m ?? 0) < 2)
      flags.push({
        label: "Avg client size <2M",
        severity: "Medium",
        impact: "Platform economics / fit risk",
        timeToResolve: "6–12 months repositioning",
      });

    if ((kyc_portability ?? 0) <= 1)
      flags.push({
        label: "Poor KYC portability",
        severity: "High",
        impact: "Onboarding delays likely",
        timeToResolve: "2–3 weeks documentation cleanup",
      });
    else if ((kyc_portability ?? 0) === 2)
      flags.push({
        label: "Partial KYC portability",
        severity: "Medium",
        impact: "Moderate onboarding friction",
        timeToResolve: "1–2 weeks updates",
      });

    if ((avg_relationship_years ?? 0) < 3)
      flags.push({
        label: "Relationships <3 years",
        severity: "Medium",
        impact: "Lower loyalty / transfer probability",
        timeToResolve: "Not addressable short-term",
      });

    if ((total_aum_m ?? 0) > 0 && (lending_exposure_m ?? 0) > (total_aum_m ?? 0) * 0.4)
      flags.push({
        label: "Lending exposure >40% of AUM",
        severity: "High",
        impact: "Platform lock-in / transfer barrier",
        timeToResolve: "6–12 months restructuring",
      });
    else if ((total_aum_m ?? 0) > 0 && (lending_exposure_m ?? 0) > (total_aum_m ?? 0) * 0.3)
      flags.push({
        label: "Lending exposure >30% of AUM",
        severity: "Medium",
        impact: "Platform dependency consideration",
        timeToResolve: "3–6 months adjustment",
      });

    const rank = { High: 0, Medium: 1, Low: 2 } as const;
    flags.sort((a, b) => rank[a.severity] - rank[b.severity]);

    return flags;
  }, [
    inherited_book_pct,
    top_3_concentration_pct,
    booking_centres,
    cross_border_licenses,
    avg_client_size_m,
    kyc_portability,
    avg_relationship_years,
    total_aum_m,
    lending_exposure_m,
  ]);

  // Recommendations with priority/timeline/cost (heuristics)
  const recommendations = useMemo(() => {
    const immediate: Array<{ text: string; priority: string; timeline: string; cost: string }> = [];
    const next30: Array<{ text: string; priority: string; timeline: string; cost: string }> = [];
    const strategic: Array<{ text: string; priority: string; timeline: string; cost: string }> = [];

    const centres = booking_centres ?? [];
    const products = primary_products ?? [];

    if ((kyc_portability ?? 0) < 2)
      immediate.push({
        text: "Standardize CRS/FATCA/MiFID/KYC documentation packages.",
        priority: "Critical",
        timeline: "2–3 weeks",
        cost: "CHF 3–5k legal review",
      });

    if (centres.length < 2)
      immediate.push({
        text: "Add a Tier-1 booking centre option (Geneva/Luxembourg/London/Singapore).",
        priority: "Critical",
        timeline: "1–2 weeks",
        cost: "Structuring advice CHF 5–10k",
      });

    if ((cross_border_licenses ?? 0) < 2)
      next30.push({
        text: "Secure multi-jurisdiction licensing aligned with target booking centres.",
        priority: "High",
        timeline: "2–4 months per jurisdiction",
        cost: "CHF 15–30k per license",
      });

    if ((top_3_concentration_pct ?? 0) > 45)
      next30.push({
        text: "Reduce top-3 concentration to <45% through diversification.",
        priority: "High",
        timeline: "3–6 months",
        cost: "Business development time",
      });

    if ((self_acquired_pct ?? 0) < 70)
      next30.push({
        text: "Validate/rebuild self-acquired relationships to a 70%+ target.",
        priority: "Important",
        timeline: "3–6 months",
        cost: "Client engagement effort",
      });

    if (!products.some((p) => p.includes("DPM")))
      strategic.push({
        text: "Introduce discretionary portfolio management (DPM) capability to improve stickiness.",
        priority: "Important",
        timeline: "3–6 months",
        cost: "Platform/ops setup varies",
      });

    if ((client_referral_rate_pct ?? 0) < 10)
      strategic.push({
        text: "Build a structured referral engine targeting 10%+ annual referral rate.",
        priority: "Nice-to-have",
        timeline: "6–12 months",
        cost: "Marketing/incentive budget",
      });

    if ((clients_known_personally_pct ?? 0) < 70)
      strategic.push({
        text: "Increase senior-level client contact coverage before execution.",
        priority: "Important",
        timeline: "2–4 months",
        cost: "Relationship time investment",
      });

    return { immediate, next30, strategic };
  }, [
    booking_centres,
    primary_products,
    kyc_portability,
    cross_border_licenses,
    top_3_concentration_pct,
    self_acquired_pct,
    client_referral_rate_pct,
    clients_known_personally_pct,
  ]);

  const nextSteps = useMemo(
    () => [
      "Book a confidential consultation to confirm platform targeting and structuring options.",
      "Use the Business Plan Simulator to model economics across target platforms.",
      "Address critical risk flags (KYC pack, booking centre selection) within 2–4 weeks.",
    ],
    []
  );

  /* ======================= TRACK DOWNLOAD ======================= */
  const logDownload = useCallback(
    (mode: PdfMode) => {
      fetch("/api/tool-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mode === "full" ? userEmail : null,
          tool_name: "portability",
          download_type: mode,
          score: overallScore,
          market: (booking_centres ?? [])[0] ?? null,
          total_aum_m: total_aum_m ?? null,
          self_acquired_pct: self_acquired_pct ?? null,
        }),
      }).catch(() => {});
    },
    [userEmail, overallScore, booking_centres, total_aum_m, self_acquired_pct]
  );

  /* ======================= NATIVE PDF GENERATION ======================= */
  const generateNativePDF = useCallback(
    async (mode: PdfMode) => {
      if (mode === "full" && !userEmail) {
        setShowEmailGate(true);
        return;
      }

      try {
        setSaving(true);

        const { PDFDocument, StandardFonts, rgb, degrees } = await import("pdf-lib");

        const PAGE_W = 595.28;
        const PAGE_H = 841.89;

        // Palette (banking)
        const C_BG = rgb(0.043, 0.055, 0.075);
        const C_CARD = rgb(0.08, 0.10, 0.13);
        const C_BORDER = rgb(0.14, 0.16, 0.20);
        const C_TEXT = rgb(0.95, 0.96, 0.97);
        const C_MUTED = rgb(0.62, 0.66, 0.72);
        const C_GOLD = rgb(0.831, 0.686, 0.216);
        const C_GOLD_DIM = rgb(0.7, 0.58, 0.18);
        const C_GREEN = rgb(0.16, 0.74, 0.52);
        const C_AMBER = rgb(0.98, 0.71, 0.16);
        const C_RED = rgb(0.94, 0.35, 0.42);

        const doc = await PDFDocument.create();
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

        let page = doc.addPage([PAGE_W, PAGE_H]);
        let pageNum = 1;

        const MARGIN = 50;
        const CONTENT_W = PAGE_W - MARGIN * 2;

        const drawPageBg = () => {
          page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: C_BG });
          page.drawRectangle({ x: 0, y: PAGE_H - 3, width: PAGE_W, height: 3, color: C_GOLD });
        };

        const wrapText = (text: string, maxW: number, size: number, f: any) => {
          const words = (text || "").split(/\s+/).filter(Boolean);
          const lines: string[] = [];
          let line = "";
          for (const w of words) {
            const test = line ? `${line} ${w}` : w;
            if (f.widthOfTextAtSize(test, size) <= maxW) line = test;
            else {
              if (line) lines.push(line);
              line = w;
            }
          }
          if (line) lines.push(line);
          return lines;
        };

        const drawText = (opts: {
          text: string;
          x: number;
          y: number;
          size: number;
          bold?: boolean;
          color?: any;
          maxWidth?: number;
          lineHeight?: number;
        }) => {
          const f = opts.bold ? fontB : font;
          const color = opts.color ?? C_TEXT;
          const lh = opts.lineHeight ?? opts.size * 1.4;

          if (!opts.maxWidth) {
            page.drawText(opts.text, { x: opts.x, y: opts.y, size: opts.size, font: f, color });
            return { height: lh, lines: 1 };
          }

          const lines = wrapText(opts.text, opts.maxWidth, opts.size, f);
          let y = opts.y;
          for (const ln of lines) {
            page.drawText(ln, { x: opts.x, y, size: opts.size, font: f, color });
            y -= lh;
          }
          return { height: lines.length * lh, lines: lines.length };
        };

        const drawCard = (x: number, yTop: number, w: number, h: number, accentBar?: boolean) => {
          const y = yTop - h;
          page.drawRectangle({ x: x + 2, y: y - 2, width: w, height: h, color: rgb(0, 0, 0), opacity: 0.15 });
          page.drawRectangle({ x, y, width: w, height: h, color: C_CARD, borderColor: C_BORDER, borderWidth: 0.5 });
          if (accentBar) page.drawRectangle({ x, y: yTop, width: w, height: 3, color: C_GOLD });
        };

        const scoreColor = (v: number) => (v >= 70 ? C_GREEN : v >= 40 ? C_AMBER : C_RED);

        const drawScoreBar = (x: number, y: number, w: number, h: number, value: number) => {
          const pct = Math.max(0, Math.min(100, Math.round(value)));
          const barW = (w * pct) / 100;

          page.drawRectangle({
            x,
            y,
            width: w,
            height: h,
            color: rgb(0.08, 0.10, 0.13),
            borderColor: C_BORDER,
            borderWidth: 0.5,
          });

          if (barW > 0) {
            const c = scoreColor(pct);
            page.drawRectangle({ x, y, width: barW, height: h, color: c });
            page.drawRectangle({
              x,
              y: y + h - 1,
              width: barW,
              height: 1,
              color: rgb(Math.min(1, c.red * 1.2), Math.min(1, c.green * 1.2), Math.min(1, c.blue * 1.2)),
              opacity: 0.6,
            });
          }
        };

        const footer = () => {
          page.drawRectangle({ x: MARGIN, y: 45, width: CONTENT_W, height: 0.5, color: C_BORDER });
          page.drawText("Executive Partners  •  Portability Readiness Diagnostic", {
            x: MARGIN,
            y: 30,
            size: 9,
            font,
            color: C_MUTED,
          });
          page.drawText(`Page ${pageNum}`, {
            x: PAGE_W - MARGIN - 42,
            y: 30,
            size: 9,
            font,
            color: C_MUTED,
          });
        };

        const newPage = () => {
          page = doc.addPage([PAGE_W, PAGE_H]);
          pageNum++;
          drawPageBg();
          footer();

          if (mode === "anon") {
            page.drawText("ANONYMIZED", {
              x: 100,
              y: 400,
              size: 72,
              font: fontB,
              color: rgb(0.10, 0.12, 0.16),
              rotate: degrees(25),
              opacity: 0.08,
            });
          }
        };

        const ensureSpace = (cursorY: number, needed: number) => {
          if (cursorY - needed < 70) newPage();
        };

        /* ==================== PAGE 1: COVER ==================== */
        drawPageBg();

        const headerH = 200;
        drawCard(MARGIN, PAGE_H - 80, CONTENT_W, headerH, true);

        const headerY = PAGE_H - 110;
        const headerX = MARGIN + 24;

        drawText({ text: "PORTABILITY READINESS", x: headerX, y: headerY, size: 28, bold: true, color: C_TEXT });
        drawText({ text: "DIAGNOSTIC", x: headerX, y: headerY - 32, size: 28, bold: true, color: C_GOLD });

        const subtitleY = headerY - 62;
        drawText({
          text: mode === "anon" ? "Anonymized Report  •  Internal Bank Review" : "Confidential Assessment  •  Candidate Diagnostic",
          x: headerX,
          y: subtitleY,
          size: 11,
          color: C_MUTED,
        });

        let metaY = subtitleY - 30;
        page.drawText("Generated:", { x: headerX, y: metaY, size: 9, font, color: C_MUTED });
        page.drawText(formatNow(), { x: headerX + 70, y: metaY, size: 9, font: fontB, color: C_TEXT });

        if (mode === "full") {
          metaY -= 18;
          const candName = candidate_name?.trim() || "—";
          const candEmail = candidate_email?.trim() || userEmail || "—";

          page.drawText("Candidate:", { x: headerX, y: metaY, size: 9, font, color: C_MUTED });
          page.drawText(candName, { x: headerX + 70, y: metaY, size: 9, font: fontB, color: C_TEXT });

          metaY -= 16;
          page.drawText("Email:", { x: headerX, y: metaY, size: 9, font, color: C_MUTED });
          page.drawText(candEmail, { x: headerX + 70, y: metaY, size: 9, font, color: C_TEXT });
        }

        // Hero score section
        let cursorY = PAGE_H - 320;
        const heroH = 220;
        drawCard(MARGIN, cursorY, CONTENT_W, heroH);

        const heroX = MARGIN + 24;
        const heroY = cursorY - 24;

        drawText({
          text: verdict.toUpperCase(),
          x: heroX,
          y: heroY,
          size: 24,
          bold: true,
          color: scoreColor(overallScore),
        });

        drawText({ text: `${overallScore}`, x: heroX, y: heroY - 50, size: 56, bold: true, color: C_GOLD });
        page.drawText("/100", { x: heroX + (overallScore >= 100 ? 85 : 70), y: heroY - 40, size: 18, font, color: C_MUTED });

        const interpY = heroY - 88;
        drawText({
          text: interpretation,
          x: heroX,
          y: interpY,
          size: 10.5,
          color: C_MUTED,
          maxWidth: CONTENT_W - 48,
          lineHeight: 14,
        });

        // Executive summary
        const summaryY = interpY - 38;
        page.drawText("EXECUTIVE SUMMARY", { x: heroX, y: summaryY, size: 9, font: fontB, color: C_GOLD });

        let summY = summaryY - 14;
        page.drawText(`• Benchmark: ${benchmarking.percentile}th percentile in ${benchmarking.market}`, {
          x: heroX,
          y: summY,
          size: 9,
          font,
          color: C_TEXT,
        });
        summY -= 12;
        page.drawText(`• Score ${benchmarking.comparison} market average (${benchmarking.avgScore})`, {
          x: heroX,
          y: summY,
          size: 9,
          font,
          color: C_TEXT,
        });
        summY -= 12;

        {
          const first = marketInsights[0] || "";
          const snippet = first.length > 90 ? first.substring(0, 90) + "…" : first;
          if (snippet) {
            page.drawText(`• ${snippet}`, { x: heroX, y: summY, size: 9, font, color: C_TEXT });
          }
        }

        cursorY -= heroH + 30;

        // Dimension grid
        const dimCardW = (CONTENT_W - 20) / 2;
        const dimCardH = 100;

        const dims = [
          ["Client Quality", dimensions.client_quality],
          ["Regulatory Infrastructure", dimensions.regulatory],
          ["Product Independence", dimensions.product_dependency],
          ["Relationship Strength", dimensions.relationship_strength],
        ] as const;

        for (let i = 0; i < 4; i++) {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const cardX = MARGIN + col * (dimCardW + 20);
          const cardY = cursorY - row * (dimCardH + 20);

          drawCard(cardX, cardY, dimCardW, dimCardH);

          const [label, val] = dims[i];
          const inX = cardX + 16;
          const inY = cardY - 20;

          drawText({ text: label, x: inX, y: inY, size: 10, color: C_MUTED });
          drawText({ text: `${val}`, x: inX, y: inY - 28, size: 32, bold: true, color: scoreColor(val) });
          page.drawText("/100", { x: inX + (val >= 100 ? 52 : 44), y: inY - 20, size: 12, font, color: C_MUTED });

          drawScoreBar(inX, inY - 52, dimCardW - 32, 8, val);
        }

        footer();

        /* ==================== PAGE 2: INSIGHTS ==================== */
        newPage();
        cursorY = PAGE_H - 80;

        const insightsH = Math.max(120, 60 + marketInsights.length * 16);
        drawCard(MARGIN, cursorY, CONTENT_W, insightsH, true);

        const insX = MARGIN + 24;
        let insY = cursorY - 24;

        drawText({ text: "Market Context & Positioning", x: insX, y: insY, size: 14, bold: true, color: C_GOLD });
        insY -= 28;

        for (const insight of marketInsights) {
          page.drawText("•", { x: insX, y: insY, size: 10, font: fontB, color: C_GOLD_DIM });
          const h = drawText({
            text: insight,
            x: insX + 12,
            y: insY,
            size: 10,
            color: C_TEXT,
            maxWidth: CONTENT_W - 48,
            lineHeight: 13,
          }).height;
          insY -= Math.max(16, h);
        }

        cursorY -= insightsH + 30;

        const riskH = Math.max(160, 70 + riskFlags.length * 28);
        ensureSpace(cursorY, riskH + 20);
        drawCard(MARGIN, cursorY, CONTENT_W, riskH, true);

        const riskX = MARGIN + 24;
        let riskY = cursorY - 24;

        drawText({ text: "Risk Flags & Impact Assessment", x: riskX, y: riskY, size: 14, bold: true, color: C_GOLD });
        riskY -= 32;

        if (riskFlags.length === 0) {
          drawText({
            text: "No major risk flags detected based on declared inputs.",
            x: riskX,
            y: riskY,
            size: 10,
            color: C_MUTED,
            maxWidth: CONTENT_W - 48,
          });
        } else {
          for (const flag of riskFlags.slice(0, 10)) {
            const dotColor = flag.severity === "High" ? C_RED : flag.severity === "Medium" ? C_AMBER : C_GREEN;

            page.drawCircle({ x: riskX + 4, y: riskY + 3, size: 4, color: dotColor });

            page.drawText(flag.severity, { x: riskX + 14, y: riskY, size: 9, font: fontB, color: dotColor });
            page.drawText("—", { x: riskX + 60, y: riskY, size: 9, font, color: C_MUTED });

            drawText({ text: flag.label, x: riskX + 72, y: riskY, size: 9, color: C_TEXT, maxWidth: CONTENT_W - 96 });

            riskY -= 12;
            page.drawText(`Impact: ${flag.impact}`, { x: riskX + 14, y: riskY, size: 8, font, color: C_MUTED });

            riskY -= 10;
            page.drawText(`Timeline: ${flag.timeToResolve}`, { x: riskX + 14, y: riskY, size: 8, font, color: C_MUTED });

            riskY -= 18;
          }
        }

        /* ==================== PAGE 3: RECOMMENDATIONS ==================== */
        newPage();
        cursorY = PAGE_H - 80;

        const groups = [
          ["Immediate Actions  (0–14 days)", recommendations.immediate],
          ["Next 30 Days  (15–45 days)", recommendations.next30],
          ["Strategic Horizon  (45–90 days)", recommendations.strategic],
        ] as const;

        for (const [title, items] of groups) {
          const groupH = Math.max(100, 60 + items.length * 40);
          ensureSpace(cursorY, groupH + 20);
          drawCard(MARGIN, cursorY, CONTENT_W, groupH, true);

          const recX = MARGIN + 24;
          let recY = cursorY - 24;

          drawText({ text: title, x: recX, y: recY, size: 13, bold: true, color: C_GOLD });
          recY -= 28;

          if (items.length === 0) {
            drawText({ text: "No immediate actions in this category.", x: recX, y: recY, size: 10, color: C_MUTED });
          } else {
            for (const item of items) {
              page.drawText("•", { x: recX, y: recY, size: 10, font: fontB, color: C_GOLD_DIM });

              drawText({
                text: item.text,
                x: recX + 12,
                y: recY,
                size: 9.5,
                color: C_TEXT,
                maxWidth: CONTENT_W - 48,
              });

              recY -= 12;
              page.drawText(`Priority: ${item.priority}  |  Timeline: ${item.timeline}  |  Cost: ${item.cost}`, {
                x: recX + 12,
                y: recY,
                size: 8,
                font,
                color: C_MUTED,
              });

              recY -= 22;
            }
          }

          cursorY -= groupH + 24;
        }

        const nextH = 110;
        ensureSpace(cursorY, nextH + 20);
        drawCard(MARGIN, cursorY, CONTENT_W, nextH, true);

        const nextX = MARGIN + 24;
        let nextY = cursorY - 24;

        drawText({ text: "Recommended Next Steps", x: nextX, y: nextY, size: 14, bold: true, color: C_GOLD });
        nextY -= 28;

        for (let i = 0; i < nextSteps.length; i++) {
          page.drawText(`${i + 1}.`, { x: nextX, y: nextY, size: 10, font: fontB, color: C_TEXT });
          drawText({
            text: nextSteps[i],
            x: nextX + 16,
            y: nextY,
            size: 10,
            color: C_TEXT,
            maxWidth: CONTENT_W - 56,
            lineHeight: 13,
          });
          nextY -= 20;
        }

        /* ==================== PAGE 4: METRICS & DISCLAIMER ==================== */
        newPage();

        const metricsH = 180;
        drawCard(MARGIN, PAGE_H - 80, CONTENT_W, metricsH, true);

        const metX = MARGIN + 24;
        let metY = PAGE_H - 80 - 24;

        drawText({ text: "Key Metrics Summary", x: metX, y: metY, size: 14, bold: true, color: C_GOLD });
        metY -= 32;

        const metrics: Array<[string, string]> = [
          ["Total AUM", `${total_aum_m ?? 0}M`],
          ["Number of Clients", `${number_clients ?? 0}`],
          ["Avg Client Size", `${((avg_client_size_m ?? 0) as number).toFixed(1)}M`],
          ["Self-Acquired Portfolio", `${self_acquired_pct ?? 0}%`],
          ["Top-3 Concentration", `${top_3_concentration_pct ?? 0}%`],
          ["Booking Centres", `${(booking_centres ?? []).join(", ") || "None"}`],
          ["Cross-Border Licenses", `${cross_border_licenses ?? 0}/3`],
          ["Avg Relationship Length", `${avg_relationship_years ?? 0} years`],
          ["KYC Portability", `${kyc_portability ?? 0}/3`],
          ["Years Experience", `${years_experience ?? 0}`],
        ];

        const colW = (CONTENT_W - 48) / 2;
        for (let i = 0; i < metrics.length; i++) {
          const [label, value] = metrics[i];
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = metX + col * (colW + 24);
          const y = metY - row * 16;

          page.drawText(label, { x, y, size: 9, font, color: C_MUTED });
          const valStr = value.length > 30 ? value.substring(0, 27) + "..." : value;
          page.drawText(valStr, { x: x + 140, y, size: 9, font: fontB, color: C_TEXT });
        }

        const disclaimerTop = PAGE_H - 80 - metricsH - 30;
        const disclaimerH = 140;
        drawCard(MARGIN, disclaimerTop, CONTENT_W, disclaimerH);

        const discX = MARGIN + 24;
        const discY = disclaimerTop - 24;

        drawText({ text: "Disclaimer & Limitations", x: discX, y: discY, size: 12, bold: true, color: C_GOLD });
        drawText({
          text:
            "This diagnostic is indicative and non-binding, based solely on declared inputs. Final transferability depends on platform selection, booking centre constraints, compliance onboarding timelines, client consent procedures, and internal risk approvals. Executive Partners provides no warranty as to accuracy or completeness. This analysis does not constitute legal, tax, or investment advice. Consult qualified legal and compliance advisors before executing any move.",
          x: discX,
          y: discY - 22,
          size: 9,
          color: C_MUTED,
          maxWidth: CONTENT_W - 48,
          lineHeight: 12,
        });

        // Save PDF
        const bytes = await doc.save();
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download =
          mode === "anon"
            ? "EP_Portability_Anonymized.pdf"
            : `EP_Portability_${sanitizeFilePart(candidate_name || "Diagnostic")}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        logDownload(mode);
      } catch (e) {
        console.error(e);
        alert("PDF generation failed. Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [
      userEmail,
      candidate_name,
      candidate_email,
      current_market,
      years_experience,
      overallScore,
      verdict,
      interpretation,
      dimensions,
      benchmarking,
      marketInsights,
      riskFlags,
      recommendations,
      nextSteps,
      booking_centres,
      total_aum_m,
      number_clients,
      avg_client_size_m,
      self_acquired_pct,
      top_3_concentration_pct,
      avg_relationship_years,
      cross_border_licenses,
      kyc_portability,
      logDownload,
    ]
  );

  /* ======================= RENDER UI ======================= */
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">5️⃣ Portability Analysis</h2>

      <div ref={reportRef} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold text-white">
              {verdict} <span className="text-white/60">({overallScore}/100)</span>
            </div>
            <Bar value={overallScore} />
            <p className="mt-2 text-sm text-white/70">{interpretation}</p>

            {/* Benchmarking display */}
            <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
              <div className="mb-1 text-xs font-semibold text-emerald-300">MARKET POSITIONING</div>
              <div className="text-sm text-white">
                {benchmarking.percentile}th percentile in {benchmarking.market}
                <span className="text-white/60">
                  {" "}
                  • Score {benchmarking.comparison} market avg ({benchmarking.avgScore})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Client Quality", dimensions.client_quality],
              ["Regulatory Infrastructure", dimensions.regulatory],
              ["Product Independence", dimensions.product_dependency],
              ["Relationship Strength", dimensions.relationship_strength],
            ].map(([label, val]) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{label}</span>
                  <span className="font-semibold text-white">{val}/100</span>
                </div>
                <Bar value={val as number} />
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        {marketInsights.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 text-sm font-semibold text-[#D4AF37]">Market Context</div>
            <ul className="space-y-2">
              {marketInsights.map((insight, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/80">
                  <span className="text-[#D4AF37]">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {overallScore >= 60 && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <div className="mb-2 text-sm text-white/80">
            A strong portability score creates value when translated into a realistic business plan.
          </div>

          <a
            href="/en/bp-simulator?src=portability&prefill=true"
            className="inline-flex rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#0B0E13] transition hover:bg-emerald-300"
          >
            Simulate your 3-year business plan →
          </a>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => generateNativePDF("full")}
          disabled={saving}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-sm font-semibold text-[#0B0E13] transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Generating PDF..." : "Download Full Analysis PDF"}
        </button>

        <button
          onClick={() => generateNativePDF("anon")}
          disabled={saving}
          className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          {saving ? "Generating PDF..." : "Download Anonymized PDF"}
        </button>
      </div>

      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={async (email) => {
          setUserEmail(email);
          setShowEmailGate(false);
          await generateNativePDF("full");
        }}
        score={overallScore}
        toolName="portability"
      />
    </section>
  );
}