'use client';

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/en" || pathname === "/en/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased">
        {isLanding ? (
          // ✅ Leave /en exactly as it is now (landing keeps its own layout/splash)
          children
        ) : (
          // ✅ Add global header/footer for all other /en/* pages
          <>
            <Header />
            <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
