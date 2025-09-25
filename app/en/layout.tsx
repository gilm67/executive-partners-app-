// app/en/layout.tsx
import "../globals.css";
import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-[100svh] flex flex-col bg-[#0B0E13] text-white antialiased selection:bg-white/20 selection:text-white">
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}