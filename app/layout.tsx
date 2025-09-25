// app/layout.tsx
import type { ReactNode } from "react";
import TopNav from "../components/TopNav"; // keep this relative import
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {/* Global, sticky navigation */}
        <TopNav />
        {/* Keep content below the sticky bar */}
        <main className="pt-16 md:pt-20">{children}</main>
      </body>
    </html>
  );
}