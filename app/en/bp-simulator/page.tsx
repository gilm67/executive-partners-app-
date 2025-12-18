// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import BpSimulatorClient from "./BpSimulatorClient";

// ✅ Same gating primitives as Portability
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Business Plan Simulator — Executive Partners",
  description:
    "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
  openGraph: {
    title: "Business Plan Simulator — Executive Partners",
    description:
      "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
    url: "https://execpartners-prod.vercel.app/en/bp-simulator",
    siteName: "Executive Partners",
    locale: "en_CH",
    type: "website",
    images: [
      {
        url: "/og/og-bp-simulator.png",
        width: 1200,
        height: 630,
        alt: "Executive Partners — Business Plan Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator — Executive Partners",
    description:
      "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
    images: ["/og/og-bp-simulator.png"],
  },
};

type Status = "none" | "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Exclude<Status, "none"> {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

function BpTeaser() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Private Tool Preview
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Business Plan Simulator — Preview
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
          A bank-style business case builder to stress-test portability
          assumptions (NNM, ROA, revenues, margins) before you engage with a
          platform.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/50">
              Module
            </div>
            <div className="mt-1 text-base font-semibold text-white">
              3-Year NNM Plan
            </div>
            <div className="mt-2 text-xs text-white/65">
              Build Year 1–3 scenarios with realistic conversion and book
              migration.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/50">
              Module
            </div>
            <div className="mt-1 text-base font-semibold text-white">
              Revenue / ROA Logic
            </div>
            <div className="mt-2 text-xs text-white/65">
              Advisory vs DPM mix, recurring share, lending and alternatives
              impact.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/50">
              Output
            </div>
            <div className="mt-1 text-base font-semibold text-white">
              Export-ready pack
            </div>
            <div className="mt-2 text-xs text-white/65">
              Generate a clean PDF for internal discussions (private &amp;
              confidential).
            </div>
          </div>
        </div>
      </div>

      {/* Locked/blurred preview panel */}
      <div className="relative overflow-hidden rounded-2xl border border-brandGold/25 bg-black/40">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_-10%,rgba(201,161,74,.18),transparent_55%),radial-gradient(900px_460px_at_110%_0%,rgba(245,231,192,.14),transparent_60%)]" />
        <div className="relative p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">
                Locked preview
              </div>
              <div className="mt-1 text-xs text-white/60">
                Request access to unlock the full simulator.
              </div>
            </div>
            <div className="rounded-full border border-brandGold/30 bg-black/50 px-3 py-1 text-xs text-brandGoldPale">
              🔒 Access required
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/50 p-4">
              <div className="h-3 w-32 rounded bg-white/10" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-white/10" />
                <div className="h-3 w-5/6 rounded bg-white/10" />
                <div className="h-3 w-4/6 rounded bg-white/10" />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/50 p-4">
              <div className="h-3 w-40 rounded bg-white/10" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-white/10" />
                <div className="h-3 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-3/4 rounded bg-white/10" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 backdrop-blur-[6px]" />
        </div>
      </div>
    </div>
  );
}

export default async function Page() {
  // ✅ Must be logged-in (same as Portability/BP secure)
  const session = await requirePrivateSession();

  // ✅ Latest request for BP tool
  const supabaseAdmin = await getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at,reviewed_at,reviewed_by")
    .eq("requester_email", session.email)
    .eq("request_type", "bp")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const status: Status = error
    ? "none"
    : data?.status
    ? normalizeStatus(data.status)
    : "none";

  const isApproved = status === "approved";

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-8">
        {isApproved ? (
          <BpSimulatorClient />
        ) : (
          <>
            <BpTeaser />
            <AccessRequestGate
              requestType="bp"
              title="Business Plan Simulator — Access required"
              description="To use this tool, request access. We validate requests and enable access once approved."
              status={status === "none" ? "pending" : status}
              requestId={data?.id ?? null}
            />
          </>
        )}
      </div>
    </main>
  );
}