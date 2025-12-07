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

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Executive Partners — Private Banking & Wealth Management",
    template: "%s | Executive Partners",
  },
  description:
    "Geneva-based executive search focused on Private Banking & Wealth Management across Switzerland, the UK, US, Dubai, Singapore, and Hong Kong.",
  openGraph: {
    type: "website",
    url: SITE,
    title: "Executive Partners — Private Banking & Wealth Management",
    description:
      "Executive search for Private Banking & Wealth Management. Market microsites: compensation, licensing, client base, relocation.",
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners — Private Banking & Wealth Management",
    description:
      "Executive search for Private Banking & Wealth Management. Market microsites: compensation, licensing, client base, relocation.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050814", // match brand-bg
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    sameAs: ["https://www.linkedin.com/company/executive-partners/"],
    logo: `${SITE}/ep-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geneva",
      addressCountry: "CH",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Executive Partners",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/en/insights?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "1";

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
        className="min-h-screen overflow-x-hidden body-grain bg-brand-bg text-white antialiased selection:bg-white/20 selection:text-white"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        {/* Sticky, blurred header with fixed height */}
        <header
          role="banner"
          className="sticky top-0 inset-x-0 z-50 h-16 md:h-20 border-b border-white/10 bg-brand-bg/80 backdrop-blur-md"
        >
          <TopNav />
        </header>

        {/* Spacer for non-home pages; hidden on "/" and "/en" so the hero can cover the header */}
        <div id="global-spacer" aria-hidden className="h-4 md:h-5" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var p = location.pathname;
                  var isHome = (p === "/" || p === "/en");
                  if (isHome) {
                    var el = document.getElementById("global-spacer");
                    if (el) el.style.display = "none";
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        <main id="main">{children}</main>

        <Footer />

        {enableAnalytics && <Analytics />}
      </body>
    </html>
  );
}