// app/en/apply/page.tsx
import type { Metadata } from "next";
import ApplyPage, {
  metadata as baseMetadata,
  revalidate as baseRevalidate,
} from "../../apply/page";

// Re-export metadata and revalidate settings so SEO is identical
export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...(baseMetadata.alternates || {}),
    canonical: "/en/apply",
  },
};

export const revalidate = baseRevalidate;

// Reuse the existing ApplyPage so logic and form stay in one place
export default function EnApplyPage(props: any) {
  return <ApplyPage {...props} />;
}