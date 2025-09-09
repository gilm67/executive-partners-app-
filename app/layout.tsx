// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import Splash from "@/components/Splash";
import type { Metadata } from "next";

/** Resolve absolute site URL from env or fallback */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

/** —— Global SEO (site-wide defaults) */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    // ✅ New default title for the site (home/landing)
    default: "Executive Partners – Private Banking & Wealth Management Search",
    // Pages get “%s | Executive Partners” unless they use title.absolute
    template: "%s | Executive Partners",
  },
  description:
    "Executive Partners is Geneva’s leading recruiter for private banking and wealth management. Apply confidentially for Senior Relationship Manager and Private Banker roles in Switzerland, Dubai, Singapore, London, and New York.",
  // Path is fine; Next builds absolute from metadataBase
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Executive Partners",
    title: "Executive Partners – Private Banking & Wealth Management Search",
    description:
      "Confidential recruitment for private bankers, relationship managers, and wealth managers. Geneva-based, globally connected.",
    images: [
      {
        url: "/og.png", // 1200x630 in /public
        width: 1200,
        height: 630,
        alt: "Executive Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners – Private Banking & Wealth Management Search",
    description:
      "Confidential private banking & wealth management recruitment. Geneva-based, international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  // Small UX/SEO niceties
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD: Organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    logo: `${SITE}/logo.png`, // square ≥112x112 at /public/logo.png
    // sameAs: ["https://www.linkedin.com/company/executive-partners"], // add when ready
  };

  // JSON-LD: WebSite + SearchAction (sitelinks search)
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
        <meta name="theme-color" content="#0B0E13" />
        <meta name="color-scheme" content="dark" />
        {/* Perf niceties (safe, optional) */}
        <link relName="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        <Splash />
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
      </body>
    </html>
  );
}