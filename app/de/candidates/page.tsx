import type { Metadata } from "next";
import CandidatesPage from "../../candidates/page";

export const metadata: Metadata = {
  title:
    "Kandidaten – Private Banker & Wealth Manager | Executive Partners",
  description:
    "Massgeschneiderte Unterstützung für Private Banker und Wealth Manager, die ihre Portabilität und Karriereoptionen prüfen möchten.",
};

export default function CandidatesDePage() {
  // Reuse the exact same layout & architecture as /candidates
  return <CandidatesPage locale="de" />;
}