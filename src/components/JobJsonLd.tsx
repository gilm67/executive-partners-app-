"use client";
export default function JobJsonLd({ job }: { job: Record<string, any> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    ...job,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
