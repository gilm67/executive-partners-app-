// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import Splash from "@/components/Splash"; // ✅ Import splash

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
  const orgJsonLd = { /* … unchanged … */ };
  const websiteJsonLd = { /* … unchanged … */ };

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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0B0E13" />
        <meta name="msapplication-TileColor" content="#0B0E13" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        {/* ✅ Splash image on load */}
        <Splash />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <div className="relative z-[1]">
          <TopNav />
          <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>
          <footer className="border-t border-white/10">
            {/* … footer unchanged … */}
          </footer>
        </div>

        <Analytics />
      </body>
    </html>
  );
}