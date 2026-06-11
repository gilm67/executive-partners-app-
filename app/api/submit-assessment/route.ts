import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, data } = body;
    if (token) {
      const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
      if (fs.existsSync(tokensPath)) {
        const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
        if (!tokens[token]) {
          return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
        }
      }
    }
    const prompt = buildPrompt(data);
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2800,
      system: "You are Gil M. Chalem, Managing Partner of Executive Partners, a Geneva boutique exclusively focused on private banking executive search. Write in practitioner-insider prose: direct, precise with CHF figures, no bullet points in flowing sections, no em dashes, confident and human.",
      messages: [{ role: "user", content: prompt }],
    });
    const analysis = message.content[0].type === "text" ? message.content[0].text : "";
    const rawText = buildRawSubmissionText(data);
    const safeName = String(data.name || "candidate").replace(/[^a-zA-Z0-9-_ ]/g, "").trim().replace(/\s+/g, "-") || "candidate";
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "EP Assessment <noreply@auth.execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: "EP Assessment — " + data.name + " | " + data.institution + " | CHF " + data.aum + "M",
      html: buildEmailHTML(data, analysis),
      attachments: [
        {
          filename: safeName + "-assessment-raw.txt",
          content: Buffer.from(rawText, "utf-8").toString("base64"),
        },
      ],
    });
    if (resendError) {
      console.error("Resend send error:", JSON.stringify(resendError));
      throw new Error("Email send failed: " + (resendError.message || JSON.stringify(resendError)));
    }
    console.log("Resend send success, id:", resendData?.id);
    if (token) {
      try {
        const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
        const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
        tokens[token].used = true;
        tokens[token].usedAt = new Date().toISOString();
        tokens[token].candidateName = data.name;
        fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));
      } catch (writeErr) {
        console.error("Token write skipped (read-only fs):", writeErr);
      }
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Assessment error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildPrompt(d: Record<string, unknown>): string {
  const aum = Number(d.aum) || 0;
  const revenue = Number(d.revenue) || 0;
  const roa = aum > 0 && revenue > 0 ? Math.round((revenue / aum) * 10000) : 0;
  const port = Number(d.portability) || 40;
  const transferred = Math.round(aum * (port / 100));
  const nnm1 = Number(d.nnm1) || 0;
  const nnm2 = Number(d.nnm2) || 0;
  const nnm3 = Number(d.nnm3) || 0;
  const targetROA = Number(d.targetROA) || 0;
  const y1 = transferred + nnm1;
  const y2 = y1 + nnm2;
  const y3 = y2 + nnm3;
  const y1rev = targetROA > 0 ? (y1 * (targetROA / 10000)).toFixed(2) : "n/a";
  const y2rev = targetROA > 0 ? (y2 * (targetROA / 10000)).toFixed(2) : "n/a";
  const y3rev = targetROA > 0 ? (y3 * (targetROA / 10000)).toFixed(2) : "n/a";
  const ds = Math.round(aum * (port / 100) * 0.6);
  const dsRev = targetROA > 0 ? (ds * (targetROA / 10000)).toFixed(2) : "n/a";
  const totalCost = Math.round((Number(d.totalComp) || 0) * 1.18);
  const noticeGarden = (parseInt(String(d.notice)) || 0) + (parseInt(String(d.garden)) || 0);
  const anchors = Array.isArray(d.anchors) ? d.anchors.join(", ") : "none";
  const kycFlags = Array.isArray(d.kycFlags) ? d.kycFlags.join(", ") : "none";

  return [
    "You are Gil M. Chalem, Managing Partner of Executive Partners. Generate a structured EP-quality analysis.",
    "",
    "VOICE: Practitioner-insider. Direct. Precise with CHF figures. No bullet points within sections. No em dashes. Flowing analytical prose.",
    "",
    "CANDIDATE: " + d.name + " | " + d.institution + " | " + d.tenure + " years | " + d.seniority + " | " + d.market + " | " + d.booking,
    "BOOK: CHF " + aum + "M AUM | " + d.clients + " clients | Largest: " + d.concentration + "% | Self-originated: " + d.originated + "% | Domicile: " + d.domicile,
    "Portability: " + d.portability + "% | Reason: " + (d.portabilityReason || "not stated") + " | Prior move: " + (d.priorMove || "none"),
    "Anchors: " + anchors + " | Anchor AUM%: " + d.anchorPct + "%",
    "REVENUE: CHF " + revenue + "M | " + roa + " bps ROA | Recurring: " + d.recurring + "% | Transactional: " + d.transactional + "%",
    "Wallet share: " + d.wallet + " | Products: " + d.products + " | Co-mgmt: " + (d.coManage || "none"),
    "LEGAL: Notice: " + d.notice + "m | Garden: " + d.garden + "m | Lock-up: " + noticeGarden + "m | Non-solicit: " + d.nonsolicit,
    "Compliance: " + d.compliance + " | KYC risk: " + d.kycRisk + "% | Flags: " + kycFlags + " | Onboarding: " + d.onboarding,
    "PLAN: NNM Y1: " + nnm1 + "M | Y2: " + nnm2 + "M | Y3: " + nnm3 + "M | ROA: " + targetROA + " bps",
    "Transferred: CHF " + transferred + "M | Y1: " + y1 + "M -> " + y1rev + "M rev | Y2: " + y2 + "M -> " + y2rev + "M rev | Y3: " + y3 + "M -> " + y3rev + "M rev",
    "Downside 60%: CHF " + ds + "M -> " + dsRev + "M | Prospects Y3: CHF " + d.prospects + "M",
    "Comp: Base CHF " + d.base + "K | Total Y1 CHF " + d.totalComp + "K | Guarantee: " + d.guarantee + " | Employer cost: CHF " + totalCost + "K",
    "MOTIVATION: Push: " + (d.push || "not stated"),
    "Pull: " + (d.pull || "not stated"),
    "Platform knowledge: " + d.platform + " | Conversations: " + (d.competitors || "none"),
    "Additional: " + (d.additional || "none"),
    "",
    "GENERATE THIS STRUCTURE -- flowing prose, no bullets, no em dashes:",
    "",
    "EP CANDIDATE ANALYSIS -- " + String(d.name).toUpperCase(),
    String(d.institution) + " | " + String(d.market) + " | CHF " + aum + "M AUM",
    "",
    "SECTION 1 -- BOOK QUALITY ASSESSMENT",
    "Two paragraphs. Credibility, concentration risk, self-originated vs assigned, domicile, plausibility vs tenure.",
    "",
    "SECTION 2 -- PORTABILITY VERDICT",
    "Two paragraphs. EP 40% baseline adjusted. Specific CHF figures for 12m and 36m transfer. 18-month rule.",
    "",
    "SECTION 3 -- REVENUE QUALITY",
    "One paragraph. ROA credibility, recurring vs transactional, wallet share, product mix.",
    "",
    "SECTION 4 -- LEGAL AND COMPLIANCE RISK",
    "One paragraph. Effective transfer window after " + noticeGarden + " months. KYC delay. Risk rating.",
    "",
    "SECTION 5 -- BUSINESS PLAN STRESS TEST",
    "Two paragraphs. NNM consistency, revenue trajectory, breakeven, compensation. Downside at 60% with CHF figures.",
    "",
    "SECTION 6 -- MOTIVATION AND FIT",
    "One paragraph. Push vs pull. Platform knowledge. Departure risk. One direct sentence on whether to proceed.",
    "",
    "SECTION 7 -- EP VERDICT",
    "Five scores (5 each): AUM quality, revenue quality, portability, legal/compliance, motivation/fit. Total /25. Threshold 22+. Disqualifiers. Next step."
  ].join("\n");
}

function buildRawSubmissionText(d: Record<string, unknown>): string {
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const arr = (v: unknown) => Array.isArray(v) ? (v.length ? v.join(", ") : "none") : (v || "not specified");
  const lines: string[] = [];
  lines.push("EP AUM PORTABILITY & BUSINESS CASE ASSESSMENT");
  lines.push("Raw candidate submission — " + date);
  lines.push("=".repeat(60));
  lines.push("");
  lines.push("CANDIDATE PROFILE");
  lines.push("Name: " + d.name);
  lines.push("Current institution: " + d.institution);
  lines.push("Years at institution: " + d.tenure);
  lines.push("Seniority level: " + (d.seniority || "not specified"));
  lines.push("Primary market coverage: " + d.market);
  lines.push("Booking centre(s): " + (d.booking || "not specified"));
  lines.push("");
  lines.push("Q1 — BOOK SIZE & STRUCTURE");
  lines.push("Total AUM: CHF " + d.aum + "M");
  lines.push("Number of clients: " + d.clients);
  lines.push("Largest relationship (% of AUM): " + (d.concentration || "not specified"));
  lines.push("% self-originated: " + (d.originated || "not specified"));
  lines.push("Client domicile distribution: " + (d.domicile || "not specified"));
  lines.push("");
  lines.push("Q2 — PORTABILITY ESTIMATE");
  lines.push("12-month portability: " + d.portability + "%");
  lines.push("Reason: " + (d.portabilityReason || "not specified"));
  lines.push("Prior move: " + (d.priorMove || "none"));
  lines.push("");
  lines.push("Q3 — INSTITUTIONAL ANCHORS");
  lines.push("Anchors: " + arr(d.anchors));
  lines.push("Estimated % of AUM affected by anchors: " + (d.anchorPct || "not specified"));
  lines.push("");
  lines.push("Q4 — REVENUE PRODUCTION");
  lines.push("Annual revenue: CHF " + d.revenue + "M");
  lines.push("% recurring: " + (d.recurring || "not specified"));
  lines.push("% transactional: " + (d.transactional || "not specified"));
  lines.push("Co-management note: " + (d.coManage || "not specified"));
  lines.push("");
  lines.push("Q5 — WALLET SHARE & PRODUCT MIX");
  lines.push("Wallet share: " + d.wallet);
  lines.push("Product mix: " + d.products);
  lines.push("");
  lines.push("Q6 — NOTICE, GARDEN LEAVE & NON-SOLICITATION");
  lines.push("Notice period: " + (d.notice || "not specified") + " months");
  lines.push("Garden leave: " + (d.garden || "not specified") + " months");
  lines.push("Non-solicitation: " + (d.nonsolicit || "not specified"));
  lines.push("Compliance record: " + (d.compliance || "not specified"));
  lines.push("Additional legal notes: " + (d.legalNotes || "none"));
  lines.push("");
  lines.push("Q7 — CLIENT ONBOARDING RISK");
  lines.push("KYC risk %: " + (d.kycRisk || "not specified"));
  lines.push("KYC flags: " + arr(d.kycFlags));
  lines.push("Onboarding timeline: " + (d.onboarding || "not specified"));
  lines.push("");
  lines.push("Q8 — THREE-YEAR AUM & REVENUE BUILD");
  lines.push("Year 1 NNM: CHF " + d.nnm1 + "M");
  lines.push("Year 2 NNM: CHF " + d.nnm2 + "M");
  lines.push("Year 3 NNM: CHF " + d.nnm3 + "M");
  lines.push("Target ROA: " + d.targetROA + " bps");
  lines.push("New prospect pipeline by Year 3: CHF " + (d.prospects || "not specified") + "M");
  lines.push("Key assumptions and risks: " + (d.bpAssumptions || "none"));
  lines.push("");
  lines.push("Q9 — COMPENSATION EXPECTATIONS");
  lines.push("Base salary: CHF " + (d.base || "not specified") + "K");
  lines.push("Total Year 1 comp: CHF " + (d.totalComp || "not specified") + "K");
  lines.push("Guarantee expectation: " + (d.guarantee || "not specified"));
  lines.push("");
  lines.push("Q10 — PRIMARY MOTIVATION");
  lines.push("Push factors: " + (d.push || "not specified"));
  lines.push("Pull factors: " + (d.pull || "not specified"));
  lines.push("Other conversations: " + (d.competitors || "none"));
  lines.push("");
  lines.push("Q11 — PLATFORM KNOWLEDGE & ADDITIONAL CONTEXT");
  lines.push("Platform knowledge: " + d.platform);
  lines.push("Additional context: " + (d.additional || "none"));
  lines.push("");
  return lines.join("\n");
}

function buildEmailHTML(d: Record<string, unknown>, analysis: string): string {
  const escaped = analysis.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return "<!DOCTYPE html><html><head><meta charset=\'UTF-8\'></head><body style=\'margin:0;padding:0;background:#F8F6F1;font-family:Arial,sans-serif\'>" +
    "<div style=\'max-width:680px;margin:0 auto;padding:32px 20px\'>" +
    "<div style=\'background:#0B0F1A;border-radius:10px 10px 0 0;padding:24px 28px\'>" +
    "<div style=\'font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A84C;margin-bottom:4px\'>Executive Partners</div>" +
    "<div style=\'font-size:22px;color:#E8EAF0\'>" + String(d.name) + " -- Portability Analysis</div>" +
    "<div style=\'font-size:12px;color:#8892A4;margin-top:6px\'>" + String(d.institution) + " | CHF " + String(d.aum) + "M | " + date + "</div>" +
    "</div><div style=\'background:#fff;border:1px solid #DDD8CC;border-top:none;border-radius:0 0 10px 10px;padding:28px\'>" +
    "<pre style=\'font-size:14px;line-height:1.8;color:#1A1A2E;white-space:pre-wrap;font-family:Arial,sans-serif;margin:0\'>" + escaped + "</pre>" +
    "</div></div></body></html>";
}
