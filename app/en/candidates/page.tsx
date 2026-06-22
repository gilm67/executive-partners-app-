import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Jobs Switzerland | Senior RM Career Guidance",
  description:
    "Private banking jobs in Geneva, Zurich, Dubai and Singapore. Confidential career guidance and portability review for senior relationship managers.",
  openGraph: {
    title: "For Private Bankers ",
    description:
      "Discreet career guidance for senior private banking professionals. Portability assessment and strategic moves.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Jobs Switzerland ",
    description:
      "Confidential career guidance for private banking relationship managers and team heads.",
  },
  alternates: { canonical: "https://www.execpartners.ch/en/candidates" },
};

export { default } from "../../candidates/page";
// Remove the metadata export from here