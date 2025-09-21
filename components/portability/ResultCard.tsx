"use client";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  score: number;
  median: number;
  topQuartile: number;
  recs: string[];
  marketLabel: string;
};

export default function ResultCard({ score, median, topQuartile, recs, marketLabel }: Props) {
  const tier:
    | { label: string; tone: string }
    = useMemo(() => {
      if (score >= topQuartile) return { label: "Top quartile", tone: "text-emerald-400" };
      if (score >= median) return { label: "At/above median", tone: "text-amber-300" };
      return { label: "Below median", tone: "text-neutral-300" };
    }, [score, median, topQuartile]);

  // simple 100-scale bar with markers
  const pct = Math.max(0, Math.min(100, score));
  const medianPct = Math.max(0, Math.min(100, median));
  const qPct = Math.max(0, Math.min(100, topQuartile));

  return (
    <Card className="card-ep">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Portability Readiness</span>
          <Badge variant="secondary" className="text-xs">{marketLabel}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 card-pad-ep pt-0">
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-4xl font-semibold leading-none ${tier.tone}`}>{score}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-neutral-400">{tier.label}</div>
          </div>
          <div className="text-sm text-neutral-300">
            Median <span className="font-medium text-neutral-200">{median}</span> • Top Q <span className="font-medium text-neutral-200">{topQuartile}</span>
          </div>
        </div>

        {/* progress bar */}
        <div className="relative h-2 rounded-full bg-white/10">
          <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/70" style={{ width: `${pct}%` }} />
          {/* markers */}
          <div className="absolute -top-1 h-4 w-px bg-amber-300/70" style={{ left: `${medianPct}%` }} />
          <div className="absolute -top-1 h-4 w-px bg-emerald-400/80" style={{ left: `${qPct}%` }} />
        </div>

        {recs.length > 0 && (
          <div>
            <div className="h2-ep mb-2 text-base">Quick wins</div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-200">
              {recs.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}

        <div className="pt-1 flex flex-wrap gap-3">
          <Button className="cta-ep">Map my booking-centre options</Button>
          <Button variant="outline" className="border-white/15 text-neutral-100 hover:bg-white/10">Get my bank-ready dossier</Button>
        </div>
      </CardContent>
    </Card>
  );
}
