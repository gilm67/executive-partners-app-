export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch") };

import "./globals.css";
import TopNav from "../components/TopNav"; // keep relative path
import Footer from "./components/Footer";  // add footer

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#0B0E13]" suppressHydrationWarning>
      <head>
        <meta name="grammarly:disabled" content="true" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white flex flex-col"
      >
        <div data-layout="ROOT-LAYOUT" className="hidden" />
        <TopNav />
        <main id="main" className="flex-1 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
