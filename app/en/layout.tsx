'use client';

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0B0E13] text-white antialiased">
        {/* Global Header on all /en pages */}
        <Header />

        {/* Page container (same width as landing) */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>

        {/* Global Footer on all /en pages */}
        <Footer />
      </body>
    </html>
  );
}
