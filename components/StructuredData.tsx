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

// Organization + LocalBusiness Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EmploymentAgency"],
    "name": "Executive Partners",
    "legalName": "Executive Partners Sàrl",
    "description": "Geneva-based boutique executive search firm specialising exclusively in senior private banking and wealth management. 200+ placements, 98% 12-month retention rate.",
    "url": "https://www.execpartners.ch",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.execpartners.ch/transparent-ep-logo.png"
    },
    "image": "https://www.execpartners.ch/og.webp",
    "email": "gil.chalem@execpartners.ch",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Geneva",
      "addressRegion": "Geneva",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.2044,
      "longitude": 6.1432
    },
    "areaServed": [
      { "@type": "City", "name": "Geneva" },
      { "@type": "City", "name": "Zurich" },
      { "@type": "City", "name": "London" },
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Singapore" },
      { "@type": "City", "name": "Hong Kong" },
      { "@type": "City", "name": "Milan" }
    ],
    "knowsAbout": [
      "Private Banking Recruitment",
      "Wealth Management Executive Search",
      "Relationship Manager Headhunting",
      "AUM Portability Advisory",
      "Senior Banker Placement",
      "External Asset Manager Recruitment"
    ],
    "priceRange": "$$$$",
    "slogan": "Where the right talent meets the right platform.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "email": "gil.chalem@execpartners.ch",
      "url": "https://www.execpartners.ch/en/contact"
    },
    "sameAs": [
      "https://www.linkedin.com/company/executive-partners-sarl",
      "https://www.execpartners.ch"
    ]
  };

  return <StructuredData data={schema} />;
}

// FAQ Schema — renders expandable rich results in Google SERPs
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I pay any fees for your services as a candidate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Executive Partners is entirely free for candidates. Our fees are paid exclusively by the hiring institution upon successful placement. You will never be charged at any stage of the process."
        }
      },
      {
        "@type": "Question",
        "name": "How confidential is this process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fully confidential. Your profile and CV are never shared with any institution without your explicit, named consent. We do not post your details publicly and operate on a direct, named-mandate basis only."
        }
      },
      {
        "@type": "Question",
        "name": "I am not actively looking but want to understand my options. Can I still speak with you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — and this is the most common starting point. Most senior bankers we work with are not actively searching. An initial conversation costs nothing and allows us to benchmark your market value, assess portability, and give you a clear picture of what options exist before you decide to move."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical private banking placement take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From first conversation to signed offer, a senior private banking placement typically takes between 8 and 20 weeks depending on the seniority of the role, the complexity of the compliance process, and garden leave constraints."
        }
      },
      {
        "@type": "Question",
        "name": "Do you have private banking roles outside Switzerland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While our headquarters are in Geneva, we run active mandates across London, Dubai (DIFC), Singapore, Hong Kong, Milan, and select US locations including New York and Miami."
        }
      },
      {
        "@type": "Question",
        "name": "What if my AUM is not fully portable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Partial portability is the norm, not the exception. Most senior bankers realistically transfer between 40% and 70% of their book. We use our Portability Readiness Score methodology to model realistic transfer scenarios and identify platforms whose onboarding committees are well-suited to your specific book profile."
        }
      }
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