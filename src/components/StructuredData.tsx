// components/StructuredData.tsx
interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Executive Partners",
    "description": "Executive search firm specializing in senior private banking roles across Geneva, Zurich, London, Dubai, Singapore",
    "url": "https://www.execpartners.ch",
    "logo": "https://www.execpartners.ch/logo.png",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Geneva",
      "addressCountry": "CH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "url": "https://www.execpartners.ch/contact"
    },
    "sameAs": [
      "https://www.linkedin.com/company/executive-partners"
    ]
  };

  return <StructuredData data={schema} />;
}

// Job Posting Schema
export function JobPostingSchema({ 
  title, 
  description, 
  location, 
  datePosted,
  validThrough,
  minSalary,
  maxSalary 
}: {
  title: string;
  description: string;
  location: string;
  datePosted: string;
  validThrough: string;
  minSalary?: number;
  maxSalary?: number;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": title,
    "description": description,
    "datePosted": datePosted,
    "validThrough": validThrough,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Executive Partners",
      "sameAs": "https://www.execpartners.ch"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location,
        "addressCountry": "CH"
      }
    },
    ...(minSalary && maxSalary && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "CHF",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": minSalary,
          "maxValue": maxSalary,
          "unitText": "YEAR"
        }
      }
    })
  };

  return <StructuredData data={schema} />;
}

// Breadcrumb Schema
export function BreadcrumbSchema({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={schema} />;
}

// Service Schema (for tools)
export function ServiceSchema({
  name,
  description
}: {
  name: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Executive Partners"
    },
    "serviceType": "Career Assessment Tool",
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    }
  };

  return <StructuredData data={schema} />;
}