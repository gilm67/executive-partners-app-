// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import Splash from "@/components/Splash";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Executive Partners – Private Banking & Wealth Management Search",
    template: "%s | Executive Partners",
  },
  description:
    "Executive Partners is Geneva’s leading recruiter for private banking and wealth management. Apply confidentially for Senior Relationship Manager and Private Banker roles in Switzerland, Dubai, Singapore, London, and New York.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Executive Partners",
    title: "Executive Partners – Private Banking & Wealth Management Search",
    description:
      "Confidential recruitment for private bankers, relationship managers, and wealth managers. Geneva-based, globally connected.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners – Private Banking & Wealth Management Search",
    description:
      "Confidential private banking & wealth management recruitment. Geneva-based, international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // ✅ Google Search Console verification
  verification: {
    google: "WEQvBE0-6FZmOaMbV2oVP9Cm9Zm6A25zU_0Jaghettk",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0E13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    logo: `${SITE}/logo.png`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Executive Partners",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/jobs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Executive Partners – Private Wealth Pulse"
          href="/rss.xml"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        <Splash />
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}