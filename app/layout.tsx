// app/layout.tsx
import "./globals.css";
import TopNav from "../components/TopNav";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", preload: false });

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const metadata: Metadata = { /* ...unchanged... */ };
export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#0B0E13", colorScheme:"dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = { /* ...unchanged... */ };
  const websiteJsonLd = { /* ...unchanged... */ };
  const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "1";

  return (
    <html lang="en" className={`h-full ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* ...unchanged... */}
      </head>

      {/* 🔧 Add suppressHydrationWarning here to ignore extension-injected attributes */}
      <body
        className="min-h-screen overflow-x-hidden body-grain bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white"
        suppressHydrationWarning
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2">
          Skip to content
        </a>

        <TopNav />
        <main id="main">{children}</main>

        {/* Footer (your updated markets list) */}
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
                  <li><a className="hover:underline" href="/markets/geneva">Geneva</a></li>
                  <li><a className="hover:underline" href="/markets/zurich">Zürich</a></li>
                  <li><a className="hover:underline" href="/markets/london">London</a></li>
                  <li><a className="hover:underline" href="/markets/dubai">Dubai</a></li>
                  <li><a className="hover:underline" href="/markets/singapore">Singapore</a></li>
                  <li><a className="hover:underline" href="/markets/hong-kong">Hong Kong</a></li>
                  <li><a className="hover:underline" href="/markets/new-york">New York</a></li>
                  <li><a className="hover:underline" href="/markets/miami">Miami</a></li>
                  <li><a className="hover:underline" href="/markets/paris">Paris</a></li>
                  <li><a className="hover:underline" href="/markets/madrid">Madrid</a></li>
                  <li><a className="hover:underline" href="/markets/milano">Milano</a></li>
                  <li><a className="hover:underline" href="/markets/lisbon">Lisbon</a></li>
                </ul>
                <div className="mt-3">
                  <a className="text-emerald-400 hover:text-emerald-300" href="/markets">
                    View all markets →
                  </a>
                </div>
              </nav>

              <nav aria-label="Company" className="text-sm">
                <h3 className="text-sm font-semibold text-white/90">Company</h3>
                <ul className="mt-2 space-y-2 text-white/80">
                  <li><a className="hover:underline" href="/jobs">Jobs</a></li>
                  <li><a className="hover:underline" href="/insights">Insights</a></li>
                  <li><a className="hover:underline" href="/business-plan-simulator">BP Simulator</a></li>
                  <li><a className="hover:underline" href="/portability">Portability</a></li>
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

        {enableAnalytics && <Analytics />}
      </body>
    </html>
  );
}