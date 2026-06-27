import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "Gil M. Chalem — Executive Partners <noreply@auth.execpartners.ch>";
const TO_GIL = "gil.chalem@execpartners.ch";

const fmt = (n: number) => new Intl.NumberFormat("en-CH", { maximumFractionDigits: 0 }).format(n);
const chf = (v: string | number) => v ? `CHF ${fmt(Number(v))}` : "—";
const band = (v: number) => v >= 72 ? "#16a34a" : v >= 58 ? "#d97706" : "#dc2626";
const bandBg = (v: number) => v >= 72 ? "#f0fdf4" : v >= 58 ? "#fffbeb" : "#fef2f2";
const row = (bg: string, label: string, value: string) =>
  `<tr><td style="padding:9px 14px;background:${bg};border:1px solid #e2e8f0;font-size:12px;color:#64748b;width:38%">${label}</td><td style="padding:9px 14px;background:${bg};border:1px solid #e2e8f0;font-size:13px;color:#0f172a">${value}</td></tr>`;
const section = (title: string, n: string) =>
  `<h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#1B3A6B;margin:28px 0 12px;padding-bottom:8px;border-bottom:2px solid #C9A14A">${n}. ${title}</h2>`;

// ── Candidate-facing HTML ────────────────────────────────────────────────────
function buildCandidateHtml(params: {
  candidateName: string; firstName: string; institution: string; mandate: string;
  timestamp: string; pr: any; bp: any; mo: any;
}) {
  const { candidateName, firstName, institution, mandate, timestamp, pr, bp, mo } = params;

  const portComment = !pr.overallPct ? "" :
    pr.overallPct >= 85 ? "Your portability profile is in the top tier of EP placements. Your client relationships, legal position, and geographic flexibility combine to make you a highly attractive candidate at Tier-1 level. With appropriate sequencing, you should expect competitive processes."
    : pr.overallPct >= 72 ? "You present a strong portability profile. Your commercial position is credible and the legal framework is manageable. A structured, sequenced approach — beginning with 2–3 target institutions — is the right next step."
    : pr.overallPct >= 58 ? "Your portability profile is workable with targeted preparation. There are specific legal and documentation elements to address before approaching institutions. Gil will walk you through these on your call."
    : "Your profile requires targeted preparation before an approach is appropriate. The good news is that most constraints are addressable — Gil will outline a specific action plan on your call.";

  const bpComment = !bp.committeeScore ? "" :
    bp.committeeScore >= 80 ? `Your business plan presents a compelling commercial case. A committee score of ${bp.committeeScore}/100 with breakeven at Month ${bp.breakEvenMonth} is a strong outcome — this level of preparation materially accelerates offer timelines.`
    : bp.committeeScore >= 60 ? `Your business plan is a solid starting point. A committee score of ${bp.committeeScore}/100 demonstrates commercial credibility. There are specific elements Gil will help you strengthen before presenting to a committee.`
    : `Your business plan needs refinement before committee presentation. A score of ${bp.committeeScore}/100 indicates that the current assumptions will face challenge. Gil will work with you on the key areas.`;

  const timelineLabel: Record<string,string> = {
    immediate:"Available immediately", "1mo":"After 1 month",
    "2to3mo":"After 2–3 months", "3to6mo":"After 3–6 months",
    "6plus":"After 6+ months", flexible:"Flexible — depends on offer",
  };

  // Score arc SVG (inline, works in most email clients)
  const arcSvg = (pct: number, color: string, label: string, sub: string) => {
    const r = 42, cx = 52, cy = 52, circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;
    return `
    <div style="text-align:center;padding:0 8px">
      <svg width="104" height="104" viewBox="0 0 104 104" style="transform:rotate(-90deg)">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="8"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="8"
          stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}" stroke-linecap="round"/>
      </svg>
      <div style="margin-top:-66px;height:104px;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <p style="font-size:22px;font-weight:700;color:${color};margin:0;line-height:1">${pct}</p>
        <p style="font-size:10px;color:#94a3b8;margin:0">/ 100</p>
      </div>
      <p style="font-size:11px;font-weight:700;color:#1B3A6B;margin:8px 0 2px;text-transform:uppercase;letter-spacing:0.06em">${label}</p>
      <p style="font-size:10px;color:#94a3b8;margin:0">${sub}</p>
    </div>`;
  };

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Georgia,serif">
<div style="max-width:640px;margin:0 auto">

  <!-- WATERMARK WRAPPER -->
  <div style="position:relative;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)">

    <!-- Watermark (diagonal repeat using background) -->
    <div style="position:absolute;inset:0;pointer-events:none;opacity:0.028;background-image:repeating-linear-gradient(-45deg,transparent,transparent 60px,#1B3A6B 60px,#1B3A6B 61px);z-index:0"></div>
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);font-size:42px;font-weight:900;color:#1B3A6B;opacity:0.04;white-space:nowrap;pointer-events:none;letter-spacing:0.06em;z-index:0">EXECUTIVE PARTNERS · CONFIDENTIAL</div>

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#1B3A6B 0%,#0d2347 100%);padding:32px 36px;position:relative;z-index:1">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="vertical-align:middle">
            <p style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C9A14A;margin:0 0 8px">Executive Partners · Geneva</p>
            <p style="font-size:10px;color:rgba(255,255,255,0.4);margin:0 0 12px;letter-spacing:0.06em">PRIVATE BANKING & WEALTH MANAGEMENT · SINCE 2008</p>
            <h1 style="font-size:26px;font-weight:700;color:#fff;margin:0 0 4px;font-family:Georgia,serif">EP Candidate Assessment</h1>
            <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0">${institution}${mandate ? " · " + mandate : ""}</p>
          </td>
          <td style="vertical-align:middle;text-align:right;width:120px">
            <div style="width:56px;height:56px;border-radius:50%;background:rgba(201,161,74,0.2);border:2px solid rgba(201,161,74,0.5);display:inline-flex;align-items:center;justify-content:center">
              <p style="font-size:18px;font-weight:900;color:#C9A14A;margin:0">EP</p>
            </div>
          </td>
        </tr>
      </table>
      <!-- Gold separator -->
      <div style="height:1px;background:linear-gradient(90deg,rgba(201,161,74,0.6),rgba(201,161,74,0.1));margin:20px 0 16px"></div>
      <p style="font-size:18px;color:#fff;margin:0;font-family:Georgia,serif">Dear ${firstName},</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:6px 0 0">Prepared exclusively for you by Gil M. Chalem · ${timestamp}</p>
    </div>

    <!-- INTRO -->
    <div style="padding:24px 36px 0;position:relative;z-index:1">
      <p style="font-size:14px;color:#334155;line-height:1.8;margin:0">
        Thank you for completing your EP assessment. What follows is your confidential profile — the result of 200+ placements distilled into a framework that tells you exactly where you stand before any approach to a hiring institution.
      </p>
      <p style="font-size:14px;color:#334155;line-height:1.8;margin:12px 0 0">
        This document is strictly confidential. It will not be shared with ${institution} or any other institution without your explicit agreement.
      </p>
    </div>

    <!-- SCORE SUMMARY -->
    ${(pr.overallPct || bp.committeeScore) ? `
    <div style="padding:24px 36px;position:relative;z-index:1">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px">
        <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#C9A14A;margin:0 0 20px">Your Assessment at a Glance</p>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            ${pr.overallPct ? `<td style="text-align:center;padding:0 12px;border-right:1px solid #e2e8f0">${arcSvg(pr.overallPct, band(pr.overallPct), "Portability", pr.overallLevel || "")}</td>` : ""}
            ${bp.committeeScore ? `<td style="text-align:center;padding:0 12px${pr.overallPct && bp.breakEvenMonth ? ";border-right:1px solid #e2e8f0" : ""}">${arcSvg(bp.committeeScore, band(bp.committeeScore), "Committee Score", bp.breakEvenMonth ? `Breakeven Month ${bp.breakEvenMonth}` : "")}</td>` : ""}
            ${bp.grossTotal ? `<td style="text-align:center;padding:0 12px">
              <div style="text-align:center;padding:0 8px">
                <p style="font-size:20px;font-weight:700;color:#1B3A6B;margin:0 0 4px">${fmt(bp.grossTotal)}</p>
                <p style="font-size:10px;color:#94a3b8;margin:0 0 24px">CHF</p>
                <p style="font-size:11px;font-weight:700;color:#1B3A6B;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.06em">3Y Revenue</p>
                <p style="font-size:10px;color:#94a3b8;margin:0">Projected</p>
              </div>
            </td>` : ""}
          </tr>
        </table>
      </div>
    </div>` : ""}

    <!-- PORTABILITY -->
    ${pr.overallPct ? `
    <div style="padding:0 36px;position:relative;z-index:1">
      ${section("Portability Assessment™ — EP Proprietary Framework", "1")}
      <table style="width:100%;border-collapse:collapse;margin-bottom:14px">
        ${row("#fff", "Overall Portability Score", `<strong style="color:${band(pr.overallPct)}">${pr.overallPct}% — ${pr.overallLevel}</strong>`)}
        ${row("#f8fafc", "Expected AUM Transfer Range", pr.expectedTransferRange || "—")}
        ${row("#fff", "Indicative Onboarding Timeline", pr.onboardingSpeed || "—")}
        ${row("#f8fafc", "Core Portability", `${pr.corePct}% — Client relationships, booking flexibility, product breadth`)}
        ${row("#fff", "Legal & Structural", `${pr.legalPct}% — Jurisdiction, garden leave, clawback, EAM exposure`)}
        ${row("#f8fafc", "Advanced Factors", `${pr.advPct || pr.advancedPct}% — Track record, relationship depth, platform fit`)}
        ${row("#fff", "Market", pr.market || "—")}
        ${row("#f8fafc", "ROA Profile", `${pr.roaBps} bps — ${pr.roaBps >= 90 ? "Above average" : pr.roaBps >= 65 ? "Within typical range" : "Below typical range"} for ${pr.market || "your market"}`)}
      </table>
      <div style="background:${bandBg(pr.overallPct)};border:1px solid ${band(pr.overallPct)}33;border-left:4px solid ${band(pr.overallPct)};padding:14px 18px;border-radius:0 8px 8px 0">
        <p style="font-size:11px;font-weight:700;color:#1B3A6B;margin:0 0 5px;text-transform:uppercase;letter-spacing:0.08em">Gil M. Chalem — Executive Partners</p>
        <p style="font-size:13px;color:#334155;margin:0;line-height:1.7">${portComment}</p>
      </div>
    </div>` : ""}

    <!-- BP -->
    ${bp.committeeScore ? `
    <div style="padding:0 36px;position:relative;z-index:1">
      ${section("Business Plan — Committee Readiness", "2")}
      <table style="width:100%;border-collapse:collapse;margin-bottom:14px">
        ${row("#fff", "Committee Readiness Score", `<strong style="color:${band(bp.committeeScore)}">${bp.committeeScore}/100 — ${bp.committeeScore >= 80 ? "Committee-ready" : bp.committeeScore >= 60 ? "Solid foundation" : "Needs refinement"}</strong>`)}
        ${row("#f8fafc", "Breakeven", bp.breakEvenMonth ? `Month ${bp.breakEvenMonth} — ${bp.breakEvenMonth <= 12 ? "Year 1 positive. Exceptional result." : bp.breakEvenMonth <= 24 ? "Year 2 — within standard range." : "Year 3 — committees will probe assumptions."}` : "Beyond 36 months")}
        ${row("#fff", "3Y Projected Revenue", bp.grossTotal ? `CHF ${fmt(bp.grossTotal)}` : "—")}
        ${row("#f8fafc", "3Y Net Margin", bp.nmTotal !== undefined ? (bp.nmTotal >= 0 ? `CHF +${fmt(bp.nmTotal)} — commercially justified` : `CHF ${fmt(bp.nmTotal)} — requires review`) : "—")}
      </table>
      <div style="background:${bandBg(bp.committeeScore)};border:1px solid ${band(bp.committeeScore)}33;border-left:4px solid ${band(bp.committeeScore)};padding:14px 18px;border-radius:0 8px 8px 0">
        <p style="font-size:11px;font-weight:700;color:#1B3A6B;margin:0 0 5px;text-transform:uppercase;letter-spacing:0.08em">Gil M. Chalem — Executive Partners</p>
        <p style="font-size:13px;color:#334155;margin:0;line-height:1.7">${bpComment}</p>
      </div>
    </div>` : ""}

    <!-- AVAILABILITY -->
    ${mo.timeline ? `
    <div style="padding:0 36px;position:relative;z-index:1">
      ${section("Profile Summary", "3")}
      <table style="width:100%;border-collapse:collapse;margin-bottom:14px">
        ${mo.timeline ? row("#fff", "Availability", timelineLabel[mo.timeline] || mo.timeline) : ""}
        ${mo.baseSalary ? row("#f8fafc", "Base salary expectation", chf(mo.baseSalary)) : ""}
        ${mo.totalComp ? row("#fff", "Total year 1 expectation", chf(mo.totalComp)) : ""}
        ${mo.guarantee ? row("#f8fafc", "Guarantee", mo.guarantee === "none" ? "No guarantee — assessed on book" : mo.guarantee === "partial" ? "Partial guarantee (3–6 months)" : "Full year 1 guarantee") : ""}
      </table>
    </div>` : ""}

    <!-- NEXT STEPS -->
    <div style="padding:0 36px 32px;position:relative;z-index:1">
      ${section("What Happens Next", "4")}
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:16px">
        ${[
          ["Within 24 hours", `Gil M. Chalem will contact you directly to discuss your assessment results and confirm the approach strategy for ${institution}.`],
          ["Before any approach", `Your complete profile will be reviewed in a confidential 30-minute call. Nothing is shared with ${institution} or any other institution without your explicit agreement.`],
          ["Your EP dossier", "This document is your reference. Keep it confidential — it contains commercially sensitive information about your book and position."],
        ].map(([title, text], i) => `
        <div style="display:flex;gap:14px;${i > 0 ? "margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0" : ""}">
          <div style="flex-shrink:0;width:28px;height:28px;border-radius:50%;background:rgba(27,58,107,0.1);display:flex;align-items:center;justify-content:center">
            <p style="font-size:12px;font-weight:700;color:#1B3A6B;margin:0">${i + 1}</p>
          </div>
          <div>
            <p style="font-size:12px;font-weight:700;color:#1B3A6B;margin:0 0 3px;text-transform:uppercase;letter-spacing:0.06em">${title}</p>
            <p style="font-size:13px;color:#334155;margin:0;line-height:1.6">${text}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background:linear-gradient(135deg,#1B3A6B 0%,#0d2347 100%);padding:24px 36px;border-radius:0 0 16px 16px;position:relative;z-index:1">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="vertical-align:top">
            <p style="font-size:13px;font-weight:700;color:#C9A14A;margin:0 0 4px">Gil M. Chalem</p>
            <p style="font-size:12px;color:rgba(255,255,255,0.6);margin:0 0 2px">Managing Partner — Executive Partners</p>
            <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0">Geneva · Private Banking & Wealth Management</p>
          </td>
          <td style="vertical-align:top;text-align:right">
            <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 3px">recruiter@execpartners.ch</p>
            <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 3px">execpartners.ch</p>
            <p style="font-size:10px;color:rgba(255,255,255,0.25);margin:8px 0 0">200+ placements · 98% retention</p>
          </td>
        </tr>
      </table>
      <div style="height:1px;background:rgba(201,161,74,0.3);margin:16px 0"></div>
      <p style="font-size:10px;color:rgba(255,255,255,0.25);margin:0;line-height:1.6">
        This document is strictly confidential and prepared exclusively for ${candidateName}. It contains proprietary EP assessment methodology and commercially sensitive information. Do not forward or distribute without the express consent of Executive Partners.
      </p>
    </div>

  </div>

  <p style="text-align:center;font-size:11px;color:#94a3b8;margin:16px 0 0">Executive Partners · execpartners.ch · Geneva</p>
</div>
</body>
</html>`;
}

// ── Internal report HTML ─────────────────────────────────────────────────────
function buildInternalHtml(params: {
  candidateName: string; institution: string; mandate: string; timestamp: string;
  token: string; pr: any; bp: any; mo: any;
}) {
  const { candidateName, institution, mandate, timestamp, token, pr, bp, mo } = params;
  const portComment = !pr.overallPct ? "" :
    pr.overallPct >= 85 ? "Tier-1 profile. No critical disqualifiers. Suitable for immediate structured approach."
    : pr.overallPct >= 72 ? "Strong profile. Minor legal or documentation preparation recommended before approach."
    : pr.overallPct >= 58 ? "Workable profile with conditions. Legal review and KYC preparation essential before committee."
    : "Challenging profile. Targeted remediation required — do not present without preparation.";

  const bpComment = !bp.committeeScore ? "Not completed." :
    bp.committeeScore >= 80 ? `Committee-ready. Score ${bp.committeeScore}/100. Breakeven Month ${bp.breakEvenMonth || "—"} — Year 1 positive. Present with confidence.`
    : bp.committeeScore >= 60 ? `Solid case. Score ${bp.committeeScore}/100. Breakeven Month ${bp.breakEvenMonth || "—"}. Strengthen NNM pipeline documentation before committee.`
    : `Needs work. Score ${bp.committeeScore}/100. Revenue assumptions require review before committee presentation.`;

  const motFlags: string[] = [];
  if (!mo.pushFactors?.length) motFlags.push("No push factors selected");
  if (!mo.pullFactors) motFlags.push("Pull factors not specified");
  if (mo.competing === "4plus") motFlags.push("Running a broad search — sequencing risk");
  if (mo.guarantee === "full") motFlags.push("Full year 1 guarantee requested");
  if (mo.clawback === "Yes — receiving bank to cover") motFlags.push("Outstanding clawback to cover");

  const timelineLabel: Record<string,string> = {
    immediate:"Available immediately","1mo":"After 1 month",
    "2to3mo":"After 2–3 months","3to6mo":"After 3–6 months",
    "6plus":"After 6+ months",flexible:"Flexible",
  };
  const compLabel: Record<string,string> = {
    only:"Only active process","1early":"1 early-stage conversation",
    "2to3":"2–3 active at similar stage","4plus":"Running a broad search (4+)",
  };
  const guarLabel: Record<string,string> = {
    none:"No guarantee",partial:"Partial guarantee",full:"Full year 1 guarantee",
  };

  return `
<div style="font-family:Georgia,serif;max-width:660px;color:#0f172a">
  <div style="background:linear-gradient(135deg,#1B3A6B 0%,#0d2347 100%);padding:28px 32px;border-radius:12px 12px 0 0">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A14A;margin:0 0 10px">Executive Partners · Internal Assessment Report</p>
    <h1 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 6px">${candidateName}</h1>
    <p style="font-size:13px;color:rgba(255,255,255,0.55);margin:0">${institution}${mandate ? " · " + mandate : ""} · ${timestamp}</p>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      ${pr.overallPct ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;text-align:center"><p style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 3px">Portability</p><p style="font-size:20px;font-weight:700;color:${band(pr.overallPct)};margin:0">${pr.overallPct}%</p></div>` : ""}
      ${bp.committeeScore ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;text-align:center"><p style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 3px">Committee</p><p style="font-size:20px;font-weight:700;color:${band(bp.committeeScore)};margin:0">${bp.committeeScore}/100</p></div>` : ""}
      ${bp.breakEvenMonth ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;text-align:center"><p style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 3px">Breakeven</p><p style="font-size:20px;font-weight:700;color:#fff;margin:0">M${bp.breakEvenMonth}</p></div>` : ""}
      ${bp.grossTotal ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;text-align:center"><p style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 3px">3Y Revenue</p><p style="font-size:14px;font-weight:700;color:#fff;margin:0">${fmt(bp.grossTotal)}</p></div>` : ""}
    </div>
  </div>
  <div style="background:#f8fafc;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
    <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1B3A6B;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #C9A14A">1. Portability</h2>
    ${pr.overallPct ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff","Score",`<strong style="color:${band(pr.overallPct)}">${pr.overallPct}% — ${pr.overallLevel}</strong>`)}
      ${row("#f8fafc","Transfer Range",pr.expectedTransferRange||"—")}
      ${row("#fff","Onboarding",pr.onboardingSpeed||"—")}
      ${row("#f8fafc","Core / Legal / Adv",`${pr.corePct}% / ${pr.legalPct}% / ${pr.advPct||pr.advancedPct}%`)}
      ${row("#fff","Market",pr.market||"—")}
      ${row("#f8fafc","ROA",`${pr.roaBps} bps`)}
    </table>
    <div style="background:${bandBg(pr.overallPct)};border-left:4px solid ${band(pr.overallPct)};padding:10px 14px;border-radius:0 6px 6px 0;margin-bottom:4px">
      <p style="font-size:12px;color:#334155;margin:0;line-height:1.6">${portComment}</p>
    </div>` : `<p style="font-size:13px;color:#94a3b8">Not completed.</p>`}

    <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1B3A6B;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #C9A14A">2. Business Plan</h2>
    ${bp.committeeScore ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff","Committee Score",`<strong style="color:${band(bp.committeeScore)}">${bp.committeeScore}/100</strong>`)}
      ${row("#f8fafc","Breakeven",bp.breakEvenMonth?`Month ${bp.breakEvenMonth}`:"Beyond 36mo")}
      ${row("#fff","3Y Revenue",bp.grossTotal?fmt(bp.grossTotal):"—")}
      ${row("#f8fafc","3Y Net Margin",bp.nmTotal!==undefined?(bp.nmTotal>=0?`+${fmt(bp.nmTotal)}`:fmt(bp.nmTotal)):"—")}
    </table>
    <div style="background:${bandBg(bp.committeeScore)};border-left:4px solid ${band(bp.committeeScore)};padding:10px 14px;border-radius:0 6px 6px 0;margin-bottom:4px">
      <p style="font-size:12px;color:#334155;margin:0;line-height:1.6">${bpComment}</p>
    </div>` : `<p style="font-size:13px;color:#94a3b8">Not completed.</p>`}

    <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1B3A6B;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #C9A14A">3. Motivation & Fit</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff","Push factors",(mo.pushFactors||[]).join(", ")||"—")}
      ${row("#f8fafc","Pull — "+institution,mo.pullFactors||"—")}
      ${row("#fff","Competing",compLabel[mo.competing]||"—")}
      ${row("#f8fafc","Base salary",chf(mo.baseSalary))}
      ${row("#fff","Total Y1",chf(mo.totalComp))}
      ${row("#f8fafc","Guarantee",guarLabel[mo.guarantee]||"—")}
      ${row("#fff","Clawback",mo.clawback||"—")}
      ${row("#f8fafc","Timeline",timelineLabel[mo.timeline]||mo.timeline||"—")}
      ${mo.extra?row("#fff","Context",mo.extra):""}
    </table>
    ${motFlags.length > 0 ? `
    <div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 14px;border-radius:0 6px 6px 0">
      <p style="font-size:11px;font-weight:700;color:#92400e;margin:0 0 5px">FLAGS</p>
      ${motFlags.map(f=>`<p style="font-size:12px;color:#78350f;margin:2px 0">— ${f}</p>`).join("")}
    </div>` : `<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:10px 14px;border-radius:0 6px 6px 0"><p style="font-size:12px;color:#166534;margin:0">✓ No critical motivation flags.</p></div>`}

    <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1B3A6B;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #C9A14A">4. Recommended Next Step</h2>
    <div style="background:#fff;border:1px solid #e2e8f0;padding:14px;border-radius:8px">
      <p style="font-size:13px;color:#334155;margin:0;line-height:1.7">Schedule a 30-minute call with ${candidateName} to review results, align on business plan assumptions, and confirm sequencing before any approach to ${institution}. ${!pr.overallPct || pr.overallPct >= 58 ? "Profile is presentable — move to structured approach." : "Preparation required before approach."}</p>
    </div>
    <p style="font-size:11px;color:#94a3b8;margin:20px 0 0;border-top:1px solid #e2e8f0;padding-top:12px">Token: ${token} · ${timestamp}</p>
  </div>
</div>`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: true, warning: "resend_not_configured" });

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { token, candidateName, institution, mandate, portabilityResult, bpResult, motivation } = body;

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    const firstName = (candidateName || "").trim().split(" ")[0];
    const pr = portabilityResult || {};
    const bp = bpResult || {};
    const mo = motivation || {};

    // Candidate email — get from BP Section 1
    const candidateEmail = body.candidateEmail || mo.email || null;

    const subjectInternal = `EP Journey — ${candidateName} · ${institution} · Port ${pr.overallPct || "?"}% · Cmte ${bp.committeeScore || "?"}/100`;
    const subjectCandidate = `Your EP Assessment · ${institution} · ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;

    const internalHtml = buildInternalHtml({ candidateName, institution, mandate, timestamp, token, pr, bp, mo });
    const candidateHtml = buildCandidateHtml({ candidateName, firstName, institution, mandate, timestamp, pr, bp, mo });

    // Send internal report to Gil
    await resend.emails.send({
      from: FROM, to: TO_GIL,
      subject: subjectInternal,
      html: internalHtml,
    });

    // Send candidate report if email available
    if (candidateEmail && candidateEmail.includes("@")) {
      await resend.emails.send({
        from: FROM, to: candidateEmail,
        replyTo: "gil.chalem@execpartners.ch",
        subject: subjectCandidate,
        html: candidateHtml,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[candidate-journey] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
