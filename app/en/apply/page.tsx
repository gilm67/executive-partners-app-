// app/en/apply/page.tsx
import ApplyPage, { metadata } from "../../apply/page";

// Re-export metadata so SEO stays consistent
export { metadata };

// Use the same revalidate value as /apply (60 seconds)
export const revalidate = 60;

// Reuse the existing ApplyPage so logic and form stay in one place
export default function EnApplyPage(props: any) {
  return <ApplyPage {...props} />;
}