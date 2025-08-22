import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://execpartners.ch"),
  title: {
    default: "Executive Partners | Private Banking Recruitment",
    template: "%s | Executive Partners",
  },
  description:
    "Executive Partners connects leading private banks with top wealth-management talent. Geneva-based; mandates across Switzerland, UK, US, Dubai, Singapore & Hong Kong.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Executive Partners | Private Banking Recruitment",
    description:
      "Recruitment for Private Banking & Wealth Management — Geneva, Zurich, London, New York, Dubai, Singapore.",
    url: "https://execpartners.ch",
    siteName: "Executive Partners",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Executive Partners — Private Banking Recruitment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners | Private Banking Recruitment",
    description:
      "Recruitment for Private Banking & Wealth Management — Geneva, Zurich, London, New York, Dubai, Singapore.",
    images: ["/og.png"],
  },
  applicationName: "Executive Partners",
  category: "Recruitment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* ✅ Replace G-XXXXXXXXXX with your real GA4 Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
