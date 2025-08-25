type Job = {
  ID: string;
  Title: string;
  Summary: string;
  Location: string; // e.g. "Geneva, CH"
  Seniority?: string;
  Market?: string;
  DatePosted: string; // ISO
  EmploymentType?: string; // e.g. FULL_TIME
  HiringOrganization: string;
  BaseSalaryMin?: number;
  BaseSalaryMax?: number;
  Currency?: string; // e.g. CHF
  Url: string;
};

export default function JobJsonLd({ job }: { job: Job }) {
  // derive pieces
  const [cityRaw = "", countryRaw = ""] = (job.Location || "").split(",").map(s => s.trim());
  const city = cityRaw || undefined;
  const country = (countryRaw || "").slice(0, 2) || undefined;

  const validThrough = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

  const data: any = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.Title,
    description: job.Summary,
    hiringOrganization: {
      "@type": "Organization",
      name: job.HiringOrganization,
      sameAs: "https://execpartners.ch",
    },
    datePosted: job.DatePosted,
    employmentType: job.EmploymentType || "FULL_TIME",
    identifier: {
      "@type": "PropertyValue",
      name: job.HiringOrganization,
      value: job.ID,
    },
    url: job.Url,
    validThrough,
    directApply: true,
    industry: "Private Banking & Wealth Management",
  };

  if (city || country) {
    data.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: country,
      },
    };
    data.jobLocationType = "ONSITE";
  }

  if (job.BaseSalaryMin || job.BaseSalaryMax) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.Currency || "CHF",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.BaseSalaryMin,
        maxValue: job.BaseSalaryMax,
        unitText: "YEAR",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
