import type { ReactNode } from "react";
import "./globals.css";
import TopNav from "../components/TopNav"; // keep relative

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0E13] text-white antialiased">
        <TopNav />
        <main className="pt-16 md:pt-20">{children}</main>
      </body>
    </html>
  );
}
