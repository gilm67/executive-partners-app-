// app/layout.tsx — minimal wrapper so the app has a root layout
export const metadata = {
  title: "Executive Partners",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
