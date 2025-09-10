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

  // ✅ Multi-size icons + one-time cache-buster on ICO
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=2",
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
    sameAs: [
      "https://www.linkedin.com/company/executive-partners/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@execpartners.ch",
        areaServed: ["CH", "AE", "GB", "SG", "US"],
        availableLanguage: ["en", "fr", "de"],
      },
    ],
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

        {/* 🔔 RSS autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Executive Partners – Private Wealth Pulse"
          href="/rss.xml"
        />

        {/* 🧭 Safari pinned tab (optional but nice) */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0B0E13" />
        <meta name="msapplication-TileColor" content="#0B0E13" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <Splash />
        <TopNav />

        <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* 🔗 Sitewide internal links footer (SEO juice + UX) */}
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-white/90">Executive Partners</h3>
                <p className="mt-2 text-sm text-white/70">
                  Geneva-based executive search focused on Private Banking &amp; Wealth Management.
                </p>
              </div>

              <nav aria-label="Markets we serve" className="text-sm">
                <h3 className="text-sm font-semibold text-white/90">Markets we serve</h3>
                <ul className="mt-2 grid grid-cols-2 gap-2 text-white/80">
                  <li><a className="hover:underline" href="/private-banking-jobs-switzerland">Switzerland</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-geneva">Geneva</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-zurich">Zurich</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-dubai">Dubai</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-singapore">Singapore</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-london">London</a></li>
                  <li><a className="hover:underline" href="/private-banking-jobs-new-york">New York</a></li>
                </ul>
              </nav>

              <nav aria-label="Company" className="text-sm">
                <h3 className="text-sm font-semibold text-white/90">Company</h3>
                <ul className="mt-2 space-y-2 text-white/80">
                  <li><a className="hover:underline" href="/jobs">Jobs</a></li>
                  <li><a className="hover:underline" href="/insights">Insights</a></li>
                  <li><a className="hover:underline" href="/apply">Apply</a></li>
                  <li><a className="hover:underline" href="/hiring-managers">Hiring Managers</a></li>
                  <li><a className="hover:underline" href="/contact">Contact</a></li>
                </ul>
              </nav>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
              <span>© {new Date().getFullYear()} Executive Partners. All rights reserved.</span>
              <a className="hover:underline" href="https://www.linkedin.com/company/executive-partners/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}