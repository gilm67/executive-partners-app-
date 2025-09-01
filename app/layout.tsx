// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <TopNav />
        <main className="container-page">
          {children}
        </main>
      </body>
    </html>
  );
}
