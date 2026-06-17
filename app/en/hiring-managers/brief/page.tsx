import type { Metadata } from "next";
import BriefForm from "./BriefForm";

export const metadata: Metadata = {
  title: { absolute: "Share a Hiring Brief – Executive Partners" },
  description:
    "Share a confidential hiring brief for senior private banking roles. We revert with clarifying questions or a proposed call slot.",
  alternates: { canonical: "https://www.execpartners.ch/en/hiring-managers/brief" },
};

export default function HiringManagersBriefPage() {
  return <BriefForm />;
}
