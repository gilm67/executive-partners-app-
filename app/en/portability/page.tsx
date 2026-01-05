// app/en/portability/page.tsx
import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";

import { requirePrivateSession } from "@/app/private/lib/require-session";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";
import PortabilityClient from "./PortabilityClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "AUM Portability Calculator | Private Banking | Executive Partners",
  description:
    "Calculate realistic AUM transfer potential before moving banks. Professional portability assessment tool for private banking relationship managers.",
  openGraph: {
    title: "Portability Score Calculator | Executive Partners",
    description:
      "Assess portability readiness with our Private Banking diagnostic. Analyze clients, domicile, products, and constraints.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUM Portability Calculator | Executive Partners",
    description:
      "Calculate realistic book transfer potential for private banking moves.",
  },
};

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

function PortabilityTeaser() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Private Tool Preview
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Portability — Preview
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
          A structured portability diagnostic (clients, domicile mix, product
          dependencies, onboarding constraints) to validate real-world moveability.
        </p>
      </div>
    </div>
  );
}

async function isPortabilityApproved(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionHash = cookieStore.get("ep_private")?.value || null;
    if (!sessionHash) return false;

    const supabase = await getSupabaseAdmin();

    const { data: session, error: sessErr } = await supabase
      .from("private_sessions")
      .select("email, expires_at, revoked_at")
      .eq("session_hash", sessionHash)
      .is("revoked_at", null)
      .maybeSingle();

    if (sessErr || !session?.email) return false;

    if (session.expires_at) {
      const exp = new Date(session.expires_at).getTime();
      if (Number.isFinite(exp) && exp < Date.now()) return false;
    }

    const email = String(session.email).trim().toLowerCase();
    if (!email) return false;

    const { data: req, error: reqErr } = await supabase
      .from("private_profile_access_requests")
      .select("status")
      .eq("requester_email", email)
      .eq("request_type", "portability")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (reqErr) return false;

    return String(req?.status || "").toLowerCase() === "approved";
  } catch {
    return false;
  }
}

export default async function Page() {
  await requirePrivateSession(undefined, "/en/portability");

  const approved = await isPortabilityApproved();

  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: SITE },
          { name: "Portability Calculator", url: `${SITE}/en/portability` }
        ]}
      />
      
      <ServiceSchema
        name="Portability Score Calculator"
        description="Calculate realistic AUM transfer potential before moving banks. Professional portability assessment tool for private banking relationship managers analyzing clients, domicile, products, and constraints."
      />

      <GateShell>
        <PortabilityTeaser />

        <div className="mt-8">
          {approved ? (
            <PortabilityClient />
          ) : (
            <AccessRequestGate
              requestType="portability"
              title="Portability — Access required"
              description="Request access to unlock the full portability diagnostic."
              refreshHref="/en/portability"
            />
          )}
        </div>
      </GateShell>
    </>
  );
}