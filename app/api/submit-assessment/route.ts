import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, data } = body;

    // Validate token if provided
    if (token) {
      const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
      if (fs.existsSync(tokensPath)) {
        const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
        if (!tokens[token]) {
          return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
        }
      }
    }

    // Build the analysis prompt
    const prompt = buildPrompt(data);

    // Call Claude
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2800,
      system: "You are Gil M. Chalem, Managing Partner of Executive Partners, a Geneva boutique exclusively focused on private banking executive search. Write in practitioner-insider prose: direct, precise with CHF figures, no bullet points in flowing sections, no em dashes, confident and human. You are preparing a confidential briefing document for a hiring committee presentation.",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = message.content[0].type === "text" ? message.content[0].text : "";

    // Send email to Gil
    await resend.emails.send({
      from: "EP Assessment <noreply@execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: `EP Assessment — ${data.name} | ${data.institution} | CHF ${data.aum}M`,
      html: buildEmailHTML(data, analysis),
    });

    // Mark token as used
    if (token) {
      const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
      const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
      tokens[token].used = true;
      tokens[token].usedAt = new Date().toISOString();
      tokens[token].candidateName = data.name;
      fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));
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

  return \`You are Gil M. Chalem, Managing Partner of Executive Partners. Generate a structured EP-quality analysis.

VOICE: Practitioner-insider. Direct. Precise with CHF figures. No bullet points within sections. No em dashes. Flowing analytical prose. Confidential briefing document tone.

CANDIDATE: \${d.name} | \${d.institution} | \${d.tenure} years | \${d.seniority} | \${d.market} | \${d.booking}

BOOK: CHF \${aum}M AUM | \${d.clients} clients | Largest relationship: \${d.concentration}% | Self-originated: \${d.originated}% | Domicile: \${d.domicile}
Portability estimate: \${d.portability}% | Reason: \${d.portabilityReason || "not stated"} | Prior move: \${d.priorMove || "none"}
Anchors: \${Array.isArray(d.anchors) ? d.anchors.join(", ") : "none"} | Anchor AUM%: \${d.anchorPct}%

REVENUE: CHF \${revenue}M annual | \${roa} bps ROA | Recurring: \${d.recurring}% | Transactional: \${d.transactional}%
Co-management: \${d.coManage || "none"} | Wallet share: \${d.wallet} | Products: \${d.products}

LEGAL: Notice: \${d.notice}m | Garden leave: \${d.garden}m | Lock-up: \${noticeGarden}m | Non-solicit: \${d.nonsolicit}
Compliance: \${d.compliance} | KYC risk: \${d.kycRisk}% | Flags: \${Array.isArray(d.kycFlags) ? d.kycFlags.join(", ") : "none"} | Onboarding: \${d.onboarding}

BUSINESS PLAN (CHF M): NNM Y1: \${nnm1} | Y2: \${nnm2} | Y3: \${nnm3} | Target ROA: \${targetROA} bps
Transferred (\${port}%): CHF \${transferred}M | Y1: CHF \${y1}M → \${y1rev}M rev | Y2: CHF \${y2}M → \${y2rev}M rev | Y3: CHF \${y3}M → \${y3rev}M rev
Downside (60%): CHF \${ds}M → \${dsRev}M rev | Prospects Y3: CHF \${d.prospects}M
Base: CHF \${d.base}K | Total comp Y1: CHF \${d.totalComp}K | Guarantee: \${d.guarantee} | Total employer cost: CHF \${totalCost}K

MOTIVATION: Push: \${d.push || "not stated"} | Pull: \${d.pull || "not stated"} | Platform knowledge: \${d.platform}
Other conversations: \${d.competitors || "none"} | Additional: \${d.additional || "none"}

GENERATE THIS STRUCTURE — flowing prose, no bullets, no em dashes:

EP CANDIDATE ANALYSIS — \${String(d.name).toUpperCase()}
\${d.institution} | \${d.market} | CHF \${aum}M AUM

SECTION 1 — BOOK QUALITY ASSESSMENT
Two paragraphs. Credibility of stated book. Concentration risk. Self-originated vs assigned. Domicile implications. Plausibility vs tenure and seniority.

SECTION 2 — PORTABILITY VERDICT
Two paragraphs. Clear verdict. EP 40% baseline adjusted for anchors, prior move, wallet share. Specific CHF figures for 12-month and 36-month transfer. 18-month rule applied.

SECTION 3 — REVENUE QUALITY
One substantive paragraph. ROA credibility. Recurring vs transactional for post-move continuity. Wallet share and new money potential. Product mix quality.

SECTION 4 — LEGAL & COMPLIANCE RISK
One paragraph. Effective transfer window after \${noticeGarden} months lock-up. KYC delay estimate. Overall legal risk rating.

SECTION 5 — BUSINESS PLAN STRESS TEST
Two paragraphs. NNM vs portability consistency. Revenue trajectory on cumulative AUM model. Breakeven vs cost structure. Compensation justification. Downside at 60% with CHF figures.

SECTION 6 — MOTIVATION & FIT
One paragraph. Push vs pull balance. Platform knowledge. Departure risk. One direct sentence on whether to proceed.

SECTION 7 — EP VERDICT
Five dimension scores (5 each): AUM quality, revenue quality, portability and relationship ownership, legal and compliance, motivation and fit. Total out of 25. Threshold 22+. Any disqualifiers. One specific next step.\`;
}

function buildEmailHTML(d: Record<string, unknown>, analysis: string): string {
  const sections = analysis.split(/SECTION \d+ —/g).filter(Boolean);
  const sectionTitles = analysis.match(/SECTION \d+ — [^\n]+/g) || [];

  const sectionsHTML = sectionTitles.map((title, i) => \`
    <div style="margin-bottom:28px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#C9A84C;margin-bottom:8px;font-family:Georgia,serif">\${title}</div>
      <div style="font-size:14px;line-height:1.8;color:#1A1A2E;white-space:pre-wrap">\${(sections[i + 1] || "").trim()}</div>
    </div>
  \`).join("");

  return \`
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#F8F6F1;font-family:'DM Sans',Arial,sans-serif">
    <div style="max-width:680px;margin:0 auto;padding:32px 20px">
      <div style="background:#0B0F1A;border-radius:10px 10px 0 0;padding:24px 28px">
        <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A84C;margin-bottom:4px">Executive Partners — Confidential</div>
        <div style="font-family:Georgia,serif;font-size:22px;color:#E8EAF0;font-weight:400">\${d.name} — Portability & Business Case Analysis</div>
        <div style="font-size:12px;color:#8892A4;margin-top:6px">\${d.institution} | \${d.market} | CHF \${d.aum}M AUM | Submitted \${new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}</div>
      </div>
      <div style="background:#fff;border:1px solid #DDD8CC;border-top:none;border-radius:0 0 10px 10px;padding:28px">
        \${sectionsHTML || \`<div style="white-space:pre-wrap;font-size:14px;line-height:1.8;color:#1A1A2E">\${analysis}</div>\`}
      </div>
      <div style="text-align:center;margin-top:20px;font-size:12px;color:#9B9B9B">
        Executive Partners — gil.chalem@execpartners.ch — execpartners.ch
      </div>
    </div>
  </body>
  </html>\`;
}
