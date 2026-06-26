"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PortabilityClient = dynamic(
  () => import("@/components/portability/PortabilityClient"),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-screen text-white/40 text-sm">Loading your assessment…</div> }
);

type TokenInfo = {
  candidateName: string;
  institution: string;
  mandate: string;
  market?: string;
  hub?: string;
};

export default function PortabilityTokenClient({ token }: { token: string }) {
  const [info, setInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/token-info/${token}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.candidateName) setInfo(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-white/40 text-sm">
      Loading your assessment…
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
      <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest">Executive Partners</p>
      <p className="text-white text-lg font-semibold">This link is invalid or has expired.</p>
      <p className="text-white/40 text-sm">Please contact your EP consultant for a new assessment link.</p>
    </div>
  );

  const firstName = info!.candidateName.trim().split(" ")[0];

  return (
    <div>
      {/* Personalised banner */}
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]/80">
          Portability Score™ · Executive Partners · Confidential
        </p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-white md:text-4xl">
          {firstName}, here is your AUM Portability Assessment
        </h1>
        {info!.institution && (
          <p className="mt-2 text-sm text-white/50">
            Prepared confidentially for your evaluation at{" "}
            <span className="text-white/70 font-medium">{info!.institution}</span>
            {info!.mandate ? ` · ${info!.mandate}` : ""}
          </p>
        )}
        <div className="mt-4 flex gap-6 border-t border-white/10 pt-4 text-sm text-white/30">
          <span>✓ 200+ placements tested</span>
          <span>✓ 6 blocks · 30 points</span>
          <span>✓ 100% confidential</span>
        </div>
      </div>
      <PortabilityClient
        prefillName={info!.candidateName}
        prefillMarket={info!.market}
        prefillHub={info!.hub}
      />
    </div>
  );
}
