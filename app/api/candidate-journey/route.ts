import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "EP Assessment <noreply@auth.execpartners.ch>";
const TO_GIL = "gil.chalem@execpartners.ch";

const fmt = (n: number) => new Intl.NumberFormat("en-CH", { maximumFractionDigits: 0 }).format(n);
const chf = (v: string | number) => v ? `CHF ${fmt(Number(v))}` : "—";
const pct = (v: number) => `${v}%`;
const band = (v: number) => v >= 72 ? "#16a34a" : v >= 58 ? "#d97706" : "#dc2626";
const row = (bg: string, label: string, value: string) =>
  `<tr><td style="padding:9px 14px;background:${bg};border:1px solid #e2e8f0;font-size:12px;color:#64748b;width:38%">${label}</td><td style="padding:9px 14px;background:${bg};border:1px solid #e2e8f0;font-size:13px;color:#0f172a">${value}</td></tr>`;
const section = (title: string, n: string) =>
  `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1B3A6B;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid #C9A14A">${n}. ${title}</h2>`;

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

    const pr = portabilityResult || {};
    const bp = bpResult || {};
    const mo = motivation || {};

    // Portability interpretation
    const portComment = pr.overallPct >= 85
      ? "Tier-1 profile. No critical disqualifiers. Suitable for immediate structured approach."
      : pr.overallPct >= 72
      ? "Strong profile. Minor legal or documentation preparation recommended before approach."
      : pr.overallPct >= 58
      ? "Workable profile with conditions. Legal review and KYC preparation essential before committee."
      : "Challenging profile. Targeted remediation required — do not present without preparation.";

    // BP interpretation
    const bpComment = !bp.committeeScore ? "Not completed." :
      bp.committeeScore >= 80
      ? `Committee-ready. Score ${bp.committeeScore}/100. Breakeven Month ${bp.breakEvenMonth || "—"} — Year 1 positive. Present with confidence.`
      : bp.committeeScore >= 60
      ? `Solid case. Score ${bp.committeeScore}/100. Breakeven Month ${bp.breakEvenMonth || "—"}. Strengthen NNM pipeline documentation before committee.`
      : `Needs work. Score ${bp.committeeScore}/100. Revenue assumptions require review before committee presentation.`;

    // Motivation flags
    const motFlags: string[] = [];
    if (!mo.pushFactors?.length) motFlags.push("No push factors selected");
    if (!mo.pullFactors) motFlags.push("Pull factors not specified — generic motivation is a red flag at interview");
    if (mo.competing === "4plus") motFlags.push("Running a broad search — sequencing risk, manage timeline carefully");
    if (mo.guarantee === "full") motFlags.push("Full year 1 guarantee requested — factor into negotiation package");
    if (mo.clawback === "Yes — receiving bank to cover") motFlags.push("Outstanding clawback to cover — quantify and include in sign-on package");

    const timelineLabel: Record<string,string> = {
      immediate:"Available immediately",
      "1mo":"After 1 month",
      "2to3mo":"After 2–3 months",
      "3to6mo":"After 3–6 months (garden leave)",
      "6plus":"After 6+ months",
      flexible:"Flexible — depends on offer",
    };
    const compLabel: Record<string,string> = {
      only:"This is the only active process",
      "1early":"1 early-stage conversation",
      "2to3":"2–3 active at similar stage",
      "4plus":"Running a broad search (4+)",
    };
    const guarLabel: Record<string,string> = {
      none:"No guarantee — assessed on transferred book",
      partial:"Partial guarantee (3–6 months cover)",
      full:"Full year 1 guarantee requested",
    };

    const html = `
<div style="font-family:Georgia,serif;max-width:660px;margin:0 auto;color:#0f172a">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#1B3A6B 0%,#0f2550 100%);padding:28px 32px;border-radius:14px 14px 0 0">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A14A;margin:0 0 10px">Executive Partners · EP Candidate Assessment</p>
    <h1 style="font-size:24px;font-weight:700;color:#fff;margin:0 0 6px;font-family:Georgia,serif">${candidateName}</h1>
    <p style="font-size:13px;color:rgba(255,255,255,0.55);margin:0">${institution}${mandate ? " · " + mandate : ""} · ${timestamp}</p>
    <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap">
      ${pr.overallPct ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 16px;text-align:center">
        <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 4px">Portability</p>
        <p style="font-size:22px;font-weight:700;color:${band(pr.overallPct)};margin:0">${pr.overallPct}%</p>
      </div>` : ""}
      ${bp.committeeScore ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 16px;text-align:center">
        <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 4px">Committee</p>
        <p style="font-size:22px;font-weight:700;color:${band(bp.committeeScore)};margin:0">${bp.committeeScore}/100</p>
      </div>` : ""}
      ${bp.breakEvenMonth ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 16px;text-align:center">
        <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 4px">Breakeven</p>
        <p style="font-size:22px;font-weight:700;color:#fff;margin:0">M${bp.breakEvenMonth}</p>
      </div>` : ""}
      ${bp.grossTotal ? `<div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:10px 16px;text-align:center">
        <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin:0 0 4px">3Y Revenue</p>
        <p style="font-size:16px;font-weight:700;color:#fff;margin:0">${fmt(bp.grossTotal)}</p>
      </div>` : ""}
    </div>
  </div>

  <!-- BODY -->
  <div style="background:#f8fafc;padding:28px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px">

    ${section("Portability Assessment™", "1")}
    ${pr.overallPct ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff", "Overall Score", `<strong style="color:${band(pr.overallPct)}">${pr.overallPct}% — ${pr.overallLevel}</strong>`)}
      ${row("#f8fafc", "Expected Transfer Range", pr.expectedTransferRange || "—")}
      ${row("#fff", "Indicative Onboarding", pr.onboardingSpeed || "—")}
      ${row("#f8fafc", "Core / Legal / Advanced", `${pct(pr.corePct)} / ${pct(pr.legalPct)} / ${pct(pr.advancedPct)}`)}
      ${row("#fff", "Market", pr.market || "—")}
      ${row("#f8fafc", "ROA", `${pr.roaBps} bps`)}
    </table>
    <div style="background:#fff;border:1px solid #e2e8f0;border-left:4px solid ${band(pr.overallPct)};padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:4px">
      <p style="font-size:12px;font-weight:600;color:#1B3A6B;margin:0 0 4px">EP Assessment</p>
      <p style="font-size:13px;color:#334155;margin:0;line-height:1.6">${portComment}</p>
    </div>` : `<p style="font-size:13px;color:#94a3b8">Not completed.</p>`}

    ${section("Business Plan — Committee Readiness", "2")}
    ${bp.committeeScore ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff", "Committee Readiness Score", `<strong style="color:${band(bp.committeeScore)}">${bp.committeeScore}/100</strong>`)}
      ${row("#f8fafc", "Breakeven", bp.breakEvenMonth ? `Month ${bp.breakEvenMonth}${bp.breakEvenMonth <= 12 ? " — Year 1 ✓" : bp.breakEvenMonth <= 24 ? " — Year 2" : " — Year 3"}` : "Beyond 36 months")}
      ${row("#fff", "3Y Gross Revenue", bp.grossTotal ? fmt(bp.grossTotal) : "—")}
      ${row("#f8fafc", "3Y Net Margin", bp.nmTotal !== undefined ? (bp.nmTotal >= 0 ? `+${fmt(bp.nmTotal)}` : fmt(bp.nmTotal)) : "—")}
    </table>
    <div style="background:#fff;border:1px solid #e2e8f0;border-left:4px solid ${band(bp.committeeScore)};padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:4px">
      <p style="font-size:12px;font-weight:600;color:#1B3A6B;margin:0 0 4px">EP Assessment</p>
      <p style="font-size:13px;color:#334155;margin:0;line-height:1.6">${bpComment}</p>
    </div>` : `<p style="font-size:13px;color:#94a3b8">Not completed.</p>`}

    ${section("Motivation & Fit", "3")}
    ${mo ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
      ${row("#fff", "Push factors", (mo.pushFactors || []).join(", ") || "—")}
      ${row("#f8fafc", "Pull factors — " + institution, mo.pullFactors || "—")}
      ${row("#fff", "Competing processes", compLabel[mo.competing] || "—")}
      ${row("#f8fafc", "Expected base salary", chf(mo.baseSalary))}
      ${row("#fff", "Expected total year 1 comp", chf(mo.totalComp))}
      ${row("#f8fafc", "Guarantee expectation", guarLabel[mo.guarantee] || "—")}
      ${row("#fff", "Clawback", mo.clawback || "—")}
      ${row("#f8fafc", "Availability", timelineLabel[mo.timeline] || mo.timeline || "—")}
      ${mo.extra ? row("#fff", "Additional context", mo.extra) : ""}
    </table>
    ${motFlags.length > 0 ? `
    <div style="background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:4px">
      <p style="font-size:12px;font-weight:600;color:#92400e;margin:0 0 6px">Flags to address</p>
      ${motFlags.map(f => `<p style="font-size:12px;color:#78350f;margin:2px 0">— ${f}</p>`).join("")}
    </div>` : `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-left:4px solid #16a34a;padding:12px 16px;border-radius:0 8px 8px 0">
      <p style="font-size:12px;color:#166534;margin:0">✓ No critical motivation flags detected. Profile is presentable.</p>
    </div>`}` : `<p style="font-size:13px;color:#94a3b8">Not completed.</p>`}

    ${section("EP Next Steps", "4")}
    <div style="background:#fff;border:1px solid #e2e8f0;padding:16px;border-radius:8px">
      <p style="font-size:13px;color:#334155;margin:0 0 10px;line-height:1.7">
        Based on the above assessment, the recommended next step is a 30-minute call with ${candidateName} to review the portability score in detail, align on the business plan assumptions, and confirm sequencing before any approach to ${institution}.
      </p>
      <p style="font-size:12px;color:#94a3b8;margin:0">Token: ${token} · Submitted via EP Candidate Journey · ${timestamp}</p>
    </div>

  </div>
</div>`;

    await resend.emails.send({
      from: FROM,
      to: TO_GIL,
      subject: `EP Journey — ${candidateName} · ${institution} · Port ${pr.overallPct || "?"}% · Cmte ${bp.committeeScore || "?"}/100`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[candidate-journey] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
