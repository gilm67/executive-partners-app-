import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();
    const system = `You are the market intelligence engine for Executive Partners, a Geneva-based boutique executive search firm specialising exclusively in private banking and wealth management. Generate personalised market positioning assessments. RULES: Never name specific institutions actively hiring. Only refer to institution types. Use only publicly known structural market dynamics. Be specific to this exact profile. Elegant institutional prose only. No bullet points. No em dashes. Valid JSON only, no markdown fences. Format: {"segment":"4-6 word label","demandLevel":"High or Selective or Emerging","demandRationale":"one sentence","positioning":"2-3 sentences","assets":"2-3 sentences","friction":"1-2 sentences","outlook":"1-2 sentences"}`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY || "", "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages: [{ role: "user", content: "Assess this profile: " + profile }] }),
    });
    const data = await res.json();
    const raw = data.content?.find((b: { type: string }) => b.type === "text")?.text || "";
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return NextResponse.json({ result: parsed });
  } catch (err) {
    console.error("[fit-matcher-assess]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
