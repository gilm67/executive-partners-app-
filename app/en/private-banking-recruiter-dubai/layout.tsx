import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Recruiter Dubai DIFC | Senior RM & GCC Search | Executive Partners",
  description: "Executive Partners is a specialist private banking recruiter in Dubai DIFC, placing Senior RMs, Team Heads and GCC/NRI bankers at leading DIFC platforms.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banking-recruiter-dubai" },
  openGraph: {
    title: "Private Banking Recruiter Dubai DIFC | Executive Partners",
    description: "Specialist private banking recruitment in Dubai. GCC, NRI and expat wealth. Senior RM and Team Head mandates across DIFC and ADGM.",
    type: "website",
    url: "https://www.execpartners.ch/en/private-banking-recruiter-dubai",
    images: [{ url: "/og.webp" }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter Dubai DIFC | Executive Partners",
    description: "Specialist private banking recruitment in Dubai. GCC, NRI and expat wealth. Senior RM and Team Head mandates.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
