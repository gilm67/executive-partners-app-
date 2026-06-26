import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "EP Assessment <noreply@auth.execpartners.ch>";
const TO_GIL = "gil.chalem@execpartners.ch";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: true, warning: "resend_not_configured" });

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { token, candidateName, institution, mandate, portabilityResult, motivation } = body;

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    const scoreColor = (portabilityResult?.overallPct || 0) >= 72 ? "#22c55e"
      : (portabilityResult?.overallPct || 0) >= 58 ? "#f59e0b" : "#ef4444";

    const html = `
<div style="font-family:Georgia,serif;max-width:640px;color:#1a1a2e">
  <div style="background:#1B3A6B;padding:24px 28px;border-radius:12px 12px 0 0">
    <p style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C9A14A;margin:0 0 8px">Executive Partners · Candidate Journey Complete</p>
    <h1 style="font-size:20px;color:#fff;margin:0">${candidateName}</h1>
    <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:4px 0 0">${institution}${mandate ? " · " + mandate : ""} · ${timestamp}</p>
  </div>

  <div style="background:#f8f9fb;padding:24px 28px;border:1px solid #e5e7eb">

    <h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#1B3A6B;margin:0 0 16px;border-bottom:2px solid #C9A14A;padding-bottom:8px">
      1. Portability Assessment
    </h2>
    ${portabilityResult ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Overall Score</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:14px;font-weight:700;color:${scoreColor}">${portabilityResult.overallPct}% — ${portabilityResult.overallLevel}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Transfer Range</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;font-weight:600;color:#1a1a2e">${portabilityResult.expectedTransferRange}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Onboarding Speed</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;font-weight:600;color:#1a1a2e">${portabilityResult.onboardingSpeed}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Core / Legal / Advanced</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${portabilityResult.corePct}% / ${portabilityResult.legalPct}% / ${portabilityResult.advancedPct}%</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">ROA</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${portabilityResult.roaBps} bps</td>
      </tr>
    </table>
    ` : "<p style=\"font-size:13px;color:#999\">Not completed</p>"}

    <h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#1B3A6B;margin:24px 0 16px;border-bottom:2px solid #C9A14A;padding-bottom:8px">
      2. Motivation & Fit
    </h2>
    ${motivation ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666;width:35%">Push factors</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${(motivation.pushFactors || []).join(", ") || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Pull factors</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.pullFactors || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Competing processes</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.competingProcesses || "—"}${motivation.competingNames ? " (" + motivation.competingNames + ")" : ""}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Base salary expected</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.baseSalaryExpected ? "CHF " + Number(motivation.baseSalaryExpected).toLocaleString() : "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Total year 1 expected</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.totalCompExpected ? "CHF " + Number(motivation.totalCompExpected).toLocaleString() : "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Guarantee expectation</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.guaranteeExpectation || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Clawback cover</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.clawbackCover || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:12px;color:#666">Availability timeline</td>
        <td style="padding:8px 12px;background:#f8f9fb;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.timeline || "—"}</td>
      </tr>
      ${motivation.additionalContext ? `
      <tr>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:12px;color:#666">Additional context</td>
        <td style="padding:8px 12px;background:#fff;border:1px solid #e5e7eb;font-size:13px;color:#1a1a2e">${motivation.additionalContext}</td>
      </tr>` : ""}
    </table>
    ` : "<p style=\"font-size:13px;color:#999\">Not completed</p>"}

    <p style="font-size:11px;color:#999;margin-top:20px;border-top:1px solid #e5e7eb;padding-top:12px">
      Token: ${token} · Submitted via EP Candidate Journey · ${timestamp}
    </p>
  </div>
</div>`;

    await resend.emails.send({
      from: FROM,
      to: TO_GIL,
      subject: `EP Journey Complete — ${candidateName} · ${institution}${portabilityResult ? " · " + portabilityResult.overallPct + "%" : ""}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[candidate-journey] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
