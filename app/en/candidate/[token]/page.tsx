import type { Metadata } from "next";
import CandidateJourneyV2Client from "./CandidateJourneyV2Client";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: { absolute: "EP Candidate Assessment | Executive Partners — Confidential" },
  description: "Your personalised EP assessment prepared by Executive Partners.",
  robots: "noindex, nofollow",
};

async function getTokenData(token: string) {
  try {
    const res = await fetch(`https://www.execpartners.ch/api/token-info/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export default async function CandidateJourneyPage({ params }: { params: { token: string } }) {
  const data = await getTokenData(params.token);
  return (
    <CandidateJourneyV2Client
      token={params.token}
      candidateName={data?.candidateName || "Candidate"}
      institution={data?.institution || ""}
      mandate={data?.mandate || "Senior Assessment"}
      market={data?.market}
      hub={data?.hub}
    />
  );
}
