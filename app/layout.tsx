// app/layout.tsx
import "./globals.css";
import SubtleBg from "@/app/components/SubtleBg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {/* Global subtle background */}
        <SubtleBg />
        {children}
      </body>
    </html>
  );
}


