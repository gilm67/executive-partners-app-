import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const KV_URL = process.env.KV_REST_API_URL!;
const KV_TOKEN = process.env.KV_REST_API_TOKEN!;

function generateToken(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

async function storeInKV(token: string, data: object) {
  const key = `assessment:token:${token}`;
  const value = JSON.stringify(data);
  // Vercel KV REST API: SET with 90-day expiry
  const res = await fetch(`${KV_URL}/set/${key}/${encodeURIComponent(value)}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  });
  if (!res.ok) throw new Error(`KV set failed: ${await res.text()}`);
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    // Auth check — only callable from private pages
    const auth = req.headers.get("x-ep-admin");
    if (auth !== process.env.TALENT_BENCH_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { candidateName, institution, mandate, market, language } = body;

    if (!candidateName || !institution) {
      return NextResponse.json({ error: "candidateName and institution required" }, { status: 400 });
    }

    // Generate unique token
    let token = generateToken(8);
    // Simple uniqueness check — regenerate if collision (extremely unlikely)
    token = generateToken(8);

    const tokenData = {
      candidateName,
      institution,
      mandate: mandate || "Senior Relationship Manager",
      market: market || "",
      language: language || "en",
      createdAt: new Date().toISOString(),
      used: false,
      usedAt: null,
    };

    await storeInKV(token, tokenData);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.execpartners.ch";
    const url = `${baseUrl}/en/candidate-assessment/${token}`;

    return NextResponse.json({ success: true, token, url, data: tokenData });
  } catch (err: any) {
    console.error("create-token error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
