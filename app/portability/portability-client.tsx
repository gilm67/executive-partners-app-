// app/portability/portability-client.tsx
"use client";

import { useCallback, useState } from "react";

// Use your existing components from the repo (relative path; no "@/")
import PortabilityForm from "../../components/portability/PortabilityForm";
import ResultCard from "../../components/portability/ResultCard";

type AnalyzePayload = Record<string, unknown>;
type AnalyzeResponse = {
  score: number;
  flags?: string[];
  reasons_pos?: string[];
  reasons_neg?: string[];
  summary?: string;
};

export default function PortabilityClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (data: AnalyzePayload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/portability/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Analyze failed (${res.status})`);
      }
      const json = (await res.json()) as AnalyzeResponse;
      setResult(json);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <PortabilityForm onSubmit={onSubmit} disabled={loading} />
      </div>

      <div className="md:col-span-2 space-y-4">
        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/80">
            Computing your Portability Score…
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}