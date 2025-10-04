// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BP Simulator – Executive Partners",
  description:
    "Business Plan Simulator for Private Bankers by Executive Partners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header className="p-4 border-b">
          <nav className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-semibold">
              BP Simulator
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}