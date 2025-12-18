// app/en/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./PortabilityClient";

// ✅ Reuse same private session + gate UI (single approval system)
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Portability Readiness Score™ | Executive Partners",
  description:
    "Interactive Portability Readiness Score™ for Private Banking & Wealth Management across Switzerland, UK, UAE, Asia, US and key EU hubs.",
};

type Status = "none" | "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Exclude<Status, "none"> {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export default async function PortabilityPage() {
  // ✅ 1) Must be logged in (same as BP)
  const session = await requirePrivateSession(); // expected: { email: string, ... }

  // ✅ 2) Look up the latest request for THIS tool
  const supabaseAdmin = await getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at,reviewed_at,reviewed_by")
    .eq("requester_email", session.email)
    .eq("request_type", "portability")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // ✅ If query fails, do NOT silently treat as pending; surface a gate state.
  // Here we fall back to "none" and let the gate display a generic message.
  const status: Status = error
    ? "none"
    : data?.status
    ? normalizeStatus(data.status)
    : "none";

  const isApproved = status === "approved";

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain portability-page">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {isApproved ? (
          <PortabilityClient />
        ) : (
          <AccessRequestGate
            requestType="portability"
            title="Portability Readiness Score™ — Access required"
            description="To use this tool, request access. We validate requests and enable access once approved."
            status={status === "none" ? "pending" : status}
            requestId={data?.id ?? null}
          />
        )}
      </div>
    </main>
  );
}