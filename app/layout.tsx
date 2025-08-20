// app/layout.tsx
import "./globals.css";
import TopNav from "@/components/TopNav";

// Compute once on the server at module load (UTC to avoid TZ edge cases)
const YEAR = new Date().getUTCFullYear();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white antialiased">
        <TopNav />
        <main className="mx-auto w-full max-w-6xl px-6 py-8">{children}</main>

        <footer className="mx-auto mt-10 w-full max-w-6xl px-6 py-10 text-sm text-neutral-400">
          <span suppressHydrationWarning>
            © {YEAR} Executive Partners — Geneva
          </span>
        </footer>
      </body>
    </html>
  );
}

