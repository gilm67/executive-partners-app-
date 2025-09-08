import type { Metadata } from "next";
import ClientInsights from "./ClientInsights";

export const metadata: Metadata = {
  title: "Insights — Executive Partners",
  description:
    "Private Wealth Pulse and articles by Executive Partners. Subscribe for weekly insights on Swiss and global private banking.",
  openGraph: {
    title: "Insights — Executive Partners",
    description:
      "Private Wealth Pulse and articles by Executive Partners.",
    url: "https://www.execpartners.ch/insights",
    images: [{ url: "/og.png" }],
  },
  alternates: { canonical: "https://www.execpartners.ch/insights" },
};

export default function InsightsPage() {
  return <ClientInsights />;
}
