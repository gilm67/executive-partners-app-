import type { Metadata } from "next";
import CandidateJourneyClient from "./CandidateJourneyClient";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: { absolute: "EP Candidate Assessment | Executive Partners — Confidential" },
  description: "Your personalised EP assessment prepared by Executive Partners.",
  robots: "noindex, nofollow",
};

export default function CandidateJourneyPage({ params }: { params: { token: string } }) {
  return <CandidateJourneyClient token={params.token} />;
}
