'use client';
import "../globals.css";
import HydratedSplash from "@/components/HydratedSplash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HydratedSplash />
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
