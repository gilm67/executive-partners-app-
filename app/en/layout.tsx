'use client';

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HydratedSplash from "@/components/HydratedSplash";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0B0E13] text-white antialiased">
        {/* Splash appears only once (per localStorage guard). Keep it here to limit to /en routes */}
        <HydratedSplash />

        {/* Global Header on all pages */}
        <Header />

        {/* Page container (same max width & spacing used by the landing) */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>

        {/* Global Footer on all pages */}
        <Footer />
      </body>
    </html>
  );
}
