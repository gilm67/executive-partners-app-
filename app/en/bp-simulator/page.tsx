// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import React from "react";
import { headers, cookies } from "next/headers";

import BpSimulatorClient from "./BpSimulatorClient";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Business Plan Simulator — Executive Partners",
  description:
    "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
};

/* ✅ SAME SHELL AS PORTABILITY */
function GateShell({ children }: { children: React.ReactNode }) {
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
      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {children}
      </div>
    </main>
  );
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
          A bank-style business case builder to stress-test portability assumptions
          (NNM, ROA, revenues, margins) before you engage with a platform.
        </p>
      </div>
    </div>
  );
}

/**
 * ✅ Server-side decision (no flicker, no “approved but still blocked” UI)
 * We call /api/private/me using the incoming cookie.
 */
async function getMeStatus(): Promise<{
  ok: boolean;
  session?: "active" | "none";
  access?: { bp?: "approved" | "pending" | "none" };
}> {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = h.get("x-forwarded-proto") || "https";
    const base = host ? `${proto}://${host}` : "https://www.execpartners.ch";

    // Forward the cookie to the internal API
    const cookieHeader = cookies().toString();

    const res = await fetch(`${base}/api/private/me`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) return { ok: false };
    return (await res.json()) as any;
  } catch {
    return { ok: false };
  }
}

export default async function Page() {
  // 🔐 Must be logged in (keeps your secure flow)
  await requirePrivateSession(undefined, "/en/bp-simulator");

  // ✅ Decide server-side whether user is approved for BP
  const me = await getMeStatus();
  const bpStatus = me?.access?.bp || "none";
  const approved = bpStatus === "approved";

  return (
    <GateShell>
      <BpTeaser />

      {/* ✅ CRITICAL: render ONE or the other, never both */}
      <div className="mt-8">
        {approved ? (
          <BpSimulatorClient />
        ) : (
          <AccessRequestGate
            requestType="bp"
            title="Business Plan Simulator — Access required"
            description="Request access to unlock the full simulator."
            refreshHref="/en/bp-simulator"
          />
        )}
      </div>
    </GateShell>
  );
}