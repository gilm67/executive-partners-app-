// app/api/portability/analyze/route.ts
import { NextResponse } from "next/server";
import { computeScore } from "@/lib/portability/score";
import { MARKET_BENCHMARKS } from "@/lib/portability/benchmarks";

export async function POST(req: Request) {
  const i = await req.json();
  const score = computeScore(i);
  const b = MARKET_BENCHMARKS[i.marketId] || { median: 68, topQuartile: 80, commonCaps: [] };

  const gaps:string[] = [];
  if (score < b.topQuartile) gaps.push("Add a widely accepted booking centre (e.g., Singapore) to widen custodian matches.");
  if (i.clientConcentration > 3) gaps.push("Lower top-3 client concentration below 45% to de-risk portability.");
  if (i.kycPortability < 2) gaps.push("Standardize CRS/FATCA + MiFID/LSFin packs for reuse across custodians.");

  return NextResponse.json({ score, benchmark: b, recommendations: gaps.slice(0,3) });
}