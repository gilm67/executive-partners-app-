// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Playfair_Display } from "next/font/google";
import { getAllMarkets } from "@/lib/markets/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", preload: false });

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

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
  themeColor: "#0B0E13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  const markets = getAllMarkets();

  return (
    <html lang="en" className={`h-full ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>

      {/* No 'has-sticky-header' to avoid double spacing; spacer controls offset */}
      <body
        className="min-h-screen overflow-x-hidden body-grain bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white"
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
          className="sticky top-0 inset-x-0 z-50 h-16 md:h-20 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur-md"
        >
          <TopNav />
        </header>

        {/* Reduced spacer (half again) for tighter alignment */}
        <div aria-hidden className="h-4 md:h-5" />

        <main id="main">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="container-max py-10">
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
                  {markets.map((m) => (
                    <li key={m.slug}>
                      <Link className="hover:underline" href={`/en/markets/${m.slug}`}>
                        {m.city}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Link className="text-emerald-400 hover:text-emerald-300" href="/en/markets">
                    View all markets →
                  </Link>
                </div>
              </nav>

              <nav aria-label="Company" className="text-sm">
                <h3 className="text-sm font-semibold text-white/90">Company</h3>
                <ul className="mt-2 space-y-2 text-white/80">
                  <li><Link className="hover:underline" href="/en/jobs">Jobs</Link></li>
                  <li><Link className="hover:underline" href="/en/insights">Insights</Link></li>
                  <li><Link className="hover:underline" href="/en/bp-simulator">BP Simulator</Link></li>
                  <li><Link className="hover:underline" href="/en/portability">Portability</Link></li>
                  <li><Link className="hover:underline" href="/en/apply">Apply</Link></li>
                  <li><Link className="hover:underline" href="/en/hiring-managers">Hiring Managers</Link></li>
                  <li><Link className="hover:underline" href="/en/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
              <span>© {new Date().getFullYear()} Executive Partners. All rights reserved.</span>
              <a
                className="hover:underline"
                href="https://www.linkedin.com/company/executive-partners/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>

        {enableAnalytics && <Analytics />}
      </body>
    </html>
  );
}