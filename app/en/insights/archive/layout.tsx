import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Insights Archive ",
  description:
    "Full archive of Private Wealth Pulse articles. In-depth analysis on Swiss private banking, AUM portability, compensation, market consolidation and career moves across global wealth hubs.",
  alternates: { canonical: "https://www.execpartners.ch/en/insights/archive" },
  openGraph: {
    title: "Private Banking Insights Archive ",
    description: "Full archive of Private Wealth Pulse — strategy, talent and market intelligence for senior private banking professionals.",
    type: "website",
    url: "https://www.execpartners.ch/en/insights/archive",
    images: [{ url: "/og.webp", width: 1200, height: 630 }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Insights Archive ",
    description: "Full archive of Private Wealth Pulse articles on Swiss private banking, portability, compensation and career intelligence.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
