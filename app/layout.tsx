import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#0B0E13]">
      <body className="min-h-screen bg-[#0B0E13] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
