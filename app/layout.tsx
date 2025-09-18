import "./globals.css";
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className="dark" className="dark" className="dark" lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 antialiased" className="bg-neutral-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
