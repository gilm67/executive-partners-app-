'use client';

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0B0E13] text-white antialiased">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
