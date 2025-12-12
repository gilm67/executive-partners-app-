// app/layout.tsx
import "./globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Playfair_Display } from "next/font/google";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

/**
 * 🔐 CANONICAL DOMAIN (ABSOLUTE TRUTH FOR SEO)
 * Never changes. Never points to Vercel.
 */
const CANONICAL_DOMAIN = "https://www.execpartners.ch";

/**
 * 🌍 RUNTIME SITE URL (for OG images, previews, JSON-LD)
 * Can be Vercel in non-prod environments.
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : CANONICAL_DOMAIN);

const OG_IMAGE = `${SITE}/og.png`;

const DEFAULT_TITLE = "Executive Search & Private Banking Recruitment | Geneva";
const DEFAULT_DESCRIPTION =
  "Executive search boutique in Geneva specialised in Private Banking & Wealth Management recruitment for senior RMs, Team Heads and leaders across global wealth hubs.";

// ----------------- GLOBAL METADATA (SEO) -----------------
export const metadata: Metadata = {
  /**
   * ✅ Force canonical base to execpartners.ch
   */
  metadataBase: new URL(CANONICAL_DOMAIN),

  /**
   * ✅ Canonical is path-based, not domain-based
   * Next.js will resolve /about → https://www.execpartners.ch/about
   */
  alternates: {
    canonical: "/",
  },

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Executive Partners",
  },

  description: DEFAULT_DESCRIPTION,

  openGraph: {
    type: "website",
    url: CANONICAL_DOMAIN,
    title: DEFAULT_TITLE,
    description:
      "Executive search for Private Banking & Wealth Management: senior Relationship Managers, Team Heads and leadership roles across Switzerland, the UK, US, Dubai, Singapore and Hong Kong.",
    siteName: "Executive Partners",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Executive Partners – Private Banking & Wealth Management Executive Search",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Executive search boutique for Private Banking & Wealth Management. We advise and place senior RMs, Team Heads and leaders across the main global wealth hubs.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F1A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Executive Partners",
    url: CANONICAL_DOMAIN,
    sameAs: ["https://www.linkedin.com/company/executive-partners/"],
    logo: `${CANONICAL_DOMAIN}/ep-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geneva",
      addressCountry: "CH",
    },
    areaServed: ["CH", "GB", "US", "AE", "SG", "HK", "EU"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Client & Candidate Enquiries",
        availableLanguage: ["en", "fr", "de"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Executive Partners",
    url: CANONICAL_DOMAIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${CANONICAL_DOMAIN}/en/insights?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`h-full ${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>

      <body
        className="min-h-screen overflow-x-hidden body-grain text-white antialiased selection:bg-white/20 selection:text-white"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <header
          role="banner"
          className="sticky inset-x-0 top-0 z-50 h-16 bg-[#0B0F1A]/80 backdrop-blur-md md:h-20"
        >
          <TopNav />
        </header>

        <main id="main">{children}</main>

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}