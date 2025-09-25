import TopNav from "../components/TopNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main className="pt-16 md:pt-20">{children}</main>
      </body>
    </html>
  );
}