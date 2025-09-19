'use client';
import "../globals.css";
import HydratedSplash from "@/components/HydratedSplash";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#0B0E13] text-white"
        style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        <HydratedSplash />
        {/* <Header /> */}

        {/* ✅ let each page handle its own container/width */}
        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}