// app/api/portability/analyze/route.ts
import { NextResponse } from "next/server";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

type Status = "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Status {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: noStoreHeaders }
  );
}

export async function POST(req: Request) {
  // 1) Require authenticated private session (same as BP)
  let session: { email: string };
  try {
    session = (await requirePrivateSession()) as unknown as { email: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_session" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // 2) Require approval for portability tool
  const supabaseAdmin = await getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at")
    .eq("requester_email", session.email)
    .eq("request_type", "portability")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const status: Status = error ? "pending" : normalizeStatus(data?.status);

  if (status !== "approved") {
    return NextResponse.json(
      {
        ok: false,
        error: "access_required",
        status,
        requestId: data?.id ?? null,
      },
      { status: 403, headers: noStoreHeaders }
    );
  }

  // 3) Business logic (safe to run only if approved)
  await req.json().catch(() => ({})); // keep if you want to validate/ping

  // TODO: replace with your real scoring logic
  const score = 72; // placeholder
  const benchmark = { median: 65, topQuartile: 80 };

  return NextResponse.json(
    { ok: true, score, benchmark },
    { status: 200, headers: noStoreHeaders }
  );
}