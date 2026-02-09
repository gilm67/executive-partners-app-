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
  Url: string; // absolute preferred; relative allowed
  Industry?: string;
  DirectApply?: boolean;
  ValidThrough?: string; // ISO
  JobLocationType?: "ONSITE" | "TELECOMMUTE" | "HYBRID";
};

const SITE_URL = "https://www.execpartners.ch";

function toAbsoluteUrl(url: string) {
  const u = (url || "").trim();
  if (!u) return SITE_URL;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return `${SITE_URL}${u}`;
  return `${SITE_URL}/${u}`;
}

function parseLocation(loc: string) {
  const raw = (loc || "").trim();
  if (!raw) return { city: undefined as string | undefined, country: undefined as string | undefined };

  // typical: "Geneva, CH"
  const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const city = parts[0] || undefined;

  // country often 2-letter in 2nd part
  const countryCandidate = parts[1] || "";
  const country = countryCandidate ? countryCandidate.slice(0, 2).toUpperCase() : undefined;

  return { city, country };
}

type JobPostingJsonLd = {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    sameAs?: string;
  };
  datePosted: string;
  employmentType: string;
  identifier: {
    "@type": "PropertyValue";
    name: string;
    value: string;
  };
  url: string;
  validThrough: string;
  directApply?: boolean;
  industry?: string;
  jobLocationType?: "ONSITE" | "TELECOMMUTE" | "HYBRID";
  jobLocation?: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      addressLocality?: string;
      addressCountry?: string;
    };
  };
  baseSalary?: {
    "@type": "MonetaryAmount";
    currency: string;
    value: {
      "@type": "QuantitativeValue";
      minValue?: number;
      maxValue?: number;
      unitText: "YEAR";
    };
  };
  occupationalCategory?: string;
  employmentUnit?: string;
};

export default function JobJsonLd({ job }: { job: Job }) {
  const { city, country } = parseLocation(job.Location);

  const validThrough =
    job.ValidThrough || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

  const data: JobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.Title,
    description: job.Summary,
    hiringOrganization: {
      "@type": "Organization",
      name: job.HiringOrganization,
      sameAs: SITE_URL,
    },
    datePosted: job.DatePosted,
    employmentType: (job.EmploymentType || "FULL_TIME").trim() || "FULL_TIME",
    identifier: {
      "@type": "PropertyValue",
      name: job.HiringOrganization,
      value: job.ID,
    },
    url: toAbsoluteUrl(job.Url),
    validThrough,
    directApply: job.DirectApply ?? true,
    industry: job.Industry || "Private Banking & Wealth Management",
  };

  // Location
  if (city || country) {
    data.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: country,
      },
    };
    data.jobLocationType = job.JobLocationType || "ONSITE";
  }

  // Salary (supports min-only or max-only)
  const hasMin = typeof job.BaseSalaryMin === "number" && Number.isFinite(job.BaseSalaryMin);
  const hasMax = typeof job.BaseSalaryMax === "number" && Number.isFinite(job.BaseSalaryMax);

  if (hasMin || hasMax) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: (job.Currency || "CHF").trim() || "CHF",
      value: {
        "@type": "QuantitativeValue",
        ...(hasMin ? { minValue: job.BaseSalaryMin } : {}),
        ...(hasMax ? { maxValue: job.BaseSalaryMax } : {}),
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