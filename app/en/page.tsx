// app/en/page.tsx
import type { Metadata } from "next";
import HomePage from "../page"; // <- reuse shared, localized homepage

export const metadata: Metadata = {
  title: "Executive Partners – International & Swiss Private Banking",
  description:
    "Executive Search & Talent Advisory for HNW/UHNW Private Banking. Geneva-based, globally connected.",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomeEnPage() {
  return <HomePage locale="en" />;
}