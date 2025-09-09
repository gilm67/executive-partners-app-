// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import Splash from "@/components/Splash";
import type { Metadata } from "next";

// —— Global SEO (site-wide defaults)
export const metadata: Metadata = {
  metadataBase:
    process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL("https://www.execpartners.ch"),
  title: {
    default: "Executive Partners – Private Banking Recruitment",
    template: "%s | Executive Partners",
  },
  description:
    "Executive Partners is Geneva’s leading recruiter for private banking and wealth management. Apply confidentially for Senior Relationship Manager and Private Banker roles in Switzerland, Dubai, Singapore, London, and New York.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Executive Partners",
    title: "Executive Partners – Private Banking Recruitment",
    description:
      "Confidential recruitment for private bankers, relationship managers, and wealth managers. Geneva-based, globally connected.",
    images: [
      {
        url: "/og.png", // place a 1200x630 image at public/og.png
        width: 1200,
        height: 630,
        alt: "Executive Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners – Private Banking Recruitment",
    description:
      "Confidential private banking & wealth management recruitment. Geneva-based, international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0E13" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        {/* Splash stays above the nav so it overlays the first view */}
        <Splash />
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}