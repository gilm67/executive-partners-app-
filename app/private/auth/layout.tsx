export const metadata = {
  robots: { index: false, follow: false },
};

export default function PrivateAuthLayout({ children }: { children: React.ReactNode }) {
  // ✅ No gate here — auth pages must remain reachable
  return <>{children}</>;
}