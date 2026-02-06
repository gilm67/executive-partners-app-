/* app/insights/archive/page.tsx */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Insights Archive | Executive Partners" },
  description: "Browse the Private Wealth Pulse archive by year and market.",
  alternates: { canonical: "/en/insights/archive" },
  robots: { index: true, follow: true },
};

export default function InsightsArchiveRedirect() {
  redirect("/en/insights/archive");
}