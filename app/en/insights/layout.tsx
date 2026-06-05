import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Market Intelligence 2026 ",
  description:
    "Strategy, talent and market intelligence for senior private banking professionals. Analysis on Swiss consolidation, AUM portability, compensation and career moves across global wealth hubs.",
  alternates: { canonical: "https://www.execpartners.ch/en/insights" },
  openGraph: {
    title: "Private Banking Market Intelligence 2026 ",
    description:
      "In-depth analysis for senior private bankers. Written from Geneva, read across every major booking centre.",
    type: "website",
    url: "https://www.execpartners.ch/en/insights",
    images: [{ url: "/og.webp", width: 1200, height: 630 }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Market Intelligence 2026 ",
    description:
      "Strategy, talent and market intelligence for senior private banking professionals. Written from Geneva.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
