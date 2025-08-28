// app/api/jobs/list/route.ts
export const revalidate = 0;            // always fresh
export const dynamic = "force-dynamic"; // don't cache at the edge

export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "") ||
    "https://jobs.execpartners.ch";

  try {
    const r = await fetch(`${base}/api/jobs/list`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const body = await r.text();
    return new Response(body, {
      status: r.status,
      headers: {
        "content-type": r.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return Response.json({ ok: false, error: "Upstream error" }, { status: 502 });
  }
}