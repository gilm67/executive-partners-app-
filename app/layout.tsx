import type { ReactNode } from "react";
import "./globals.css";
import TopNav from "../components/TopNav";    // keep relative
import Splash from "../components/Splash";    // cinematic splash
import Footer from "../components/Footer";    // global footer

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        {/* Skip link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-white/10 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        {/* One-time cinematic splash (click to skip) */}
        <Splash />

        {/* Sticky site header */}
        <TopNav />

        {/* Page content; top padding prevents overlap with sticky header */}
        <main id="main" className="flex-1 pt-16 md:pt-20 safe-px safe-pt">
          {children}
        </main>

        {/* Global footer across all pages */}
        <Footer />
      </body>
    </html>
  );
}