import "./globals.css";
import TopNav from "@/components/TopNav";
import Splash from "@/components/Splash";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0E13" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased">
        <Splash />
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
      </body>
    </html>
  );
}