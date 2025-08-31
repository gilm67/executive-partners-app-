// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Partners",
  description: "International & Swiss Private Banking — HNW/UHNWI",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <TopNav />
        <main className="container-page">{children}</main>
      </body>
    </html>
  );
}
