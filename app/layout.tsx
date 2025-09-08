// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Ensure proper contrast color for mobile browser UI */}
        <meta name="theme-color" content="#0B0E13" />
        <meta name="color-scheme" content="dark" />
      </head>
      {/* Dark sitewide base + strong default text for legibility */}
      <body
        className="
          min-h-screen bg-[#0B0E13] text-white antialiased
          selection:bg-white/20 selection:text-white
        "
      >
        {/* Header remains; its links inherit white, giving readable mobile menu */}
        <TopNav />

        {/* Page container (unchanged spacing) */}
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}