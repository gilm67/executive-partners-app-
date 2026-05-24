import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return <div style={{ padding: 24 }}>✅ Test route is working (src/app/test)</div>;
}
