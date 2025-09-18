import "../globals.css";
import TopNav from "@/components/TopNav";
import HydratedSplash from "@/components/HydratedSplash";

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";

type Locale = "en" | "fr" | "de";

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
    "Executive Partners is Geneva’s leading recruiter for private banking and wealth management. Apply confidentially for Senior Relat$",
  alternates: {
    canonical: "/",
    languages: {
      en: `${SITE}/`,
      fr: `${SITE}/fr`,
      de: `${SITE}/de`,
      "x-default": `${SITE}/`,
    },
  },
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
    description: "Confidential private banking & wealth management recruitment. Geneva-based, international reach.",
    images: ["/og.png"],
  },
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
  verification: { google: "WEQvBE0-6FZmOaMbV2oVP9Cm9Zm6A25zU_0Jaghettk" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0E13",
  colorScheme: "dark",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // …the rest of your file stays the same…
  // keep your <HydratedSplash /> where it already is in the JSX
}
