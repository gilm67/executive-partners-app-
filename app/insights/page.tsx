/* app/insights/page.tsx */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Insights | Executive Partners",
  description:
    "Private Wealth Pulse — market pulse and hiring insights across Switzerland and global wealth hubs.",
  alternates: {
    canonical: "/en/insights",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InsightsPage() {
  redirect("/en/insights");
}