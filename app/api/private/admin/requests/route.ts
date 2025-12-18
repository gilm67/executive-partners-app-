// app/api/private/admin/requests/route.ts
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/app/private/lib/require-admin-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

export async function GET(req: Request) {
  // ✅ Works for browser + curl (cookie comes from req.headers.cookie)
  const auth = await requireAdminApi(req);

  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status, headers: noStoreHeaders }
    );
  }

  const { supabaseAdmin } = auth;

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "query_failed" },
      { status: 500, headers: noStoreHeaders }
    );
  }

  return NextResponse.json(
    { ok: true, data: data ?? [] },
    { status: 200, headers: noStoreHeaders }
  );
}