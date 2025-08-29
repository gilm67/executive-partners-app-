import { NextResponse } from "next/server";

async function upstash(url?: string, token?: string, path?: string, method: "GET"|"POST"="GET") {
  if (!url || !token) return { error: "missing url/token" };
  const res = await fetch(`${url}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    next: { revalidate: 0 },
  });
  try { return await res.json(); } catch { return { status: res.status }; }
}

export async function GET() {
  const env = {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || null,
    UPSTASH_REDIS_REST_TOKEN_present: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL || null,
    KV_REST_API_TOKEN_present: !!process.env.KV_REST_API_TOKEN,
    JOBS_ADMIN_TOKEN_present: !!process.env.JOBS_ADMIN_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";

  // test write/read in Upstash
  const setResult = await upstash(url, token, `/set/job:env-debug:ping/pong`, "POST");
  const getResult = await upstash(url, token, `/get/job:env-debug:ping`, "GET");

  return NextResponse.json({ ok: true, env, setResult, getResult });
}
