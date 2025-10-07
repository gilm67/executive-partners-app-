export type JobDescription = {
  title: string; location: string; overview: string;
  responsibilities: string[]; requirements: string[]; competencies: string[]; offer: string[];
};

export const jobDescriptions: Record<string, JobDescription> = {
  "senior-relationship-manager-brazil": {
    title: "Senior Relationship Manager — Brazil",
    location: "Zurich or Geneva",
    overview:
      "The Senior Relationship Manager acquires, develops, and manages HNW/UHNW clients from Brazil, acting as a trusted advisor and delivering comprehensive private banking solutions tailored to each client’s needs.",
    responsibilities: [
      "Develop and expand a personal client network within the Brazil market.",
      "Act as strategic advisor across investments, lending, and estate planning.",
      "Deliver full-service banking, coordinating with product specialists as required.",
      "Proactively originate opportunities via networking and referrals.",
      "Provide consistent, high-value advice with long-term client satisfaction focus.",
      "Adhere to KYC/AML and internal policies; maintain impeccable documentation.",
      "Mentor juniors, contribute to team targets, and share best practices."
    ],
    requirements: [
      "University degree in finance, banking, or related; advanced credentials a plus.",
      "7–10+ years in private banking with a portable book in Brazil.",
      "Deep knowledge of markets, products, and relevant regulation.",
      "Fluency in English & Portuguese; French or Swiss-German is a plus.",
      "Entrepreneurial profile with proven hunting & farming track record.",
      "Swiss residency/permit desirable; cross-border experience an advantage."
    ],
    competencies: [
      "Strong business acumen, ethical & client-centric approach.",
      "Ability to orchestrate internal experts for holistic solutions.",
      "High compliance awareness and attention to detail.",
      "Drive, team spirit, and adaptability in a demanding environment."
    ],
    offer: [
      "Modern workplace and collaborative culture.",
      "Clear progression in a client-focused, entrepreneurial setting.",
      "Competitive compensation, benefits, and ongoing development."
    ]
  },
};

export function buildTemplateFromJob(job: { title: string; market?: string; location?: string; }): JobDescription {
  const market = job.market ?? "target market";
  const location = job.location ?? "Switzerland";
  return {
    title: job.title,
    location,
    overview: `The ${job.title} acquires, develops, and manages HNW/UHNW clients in ${market}, providing comprehensive private banking services and tailored wealth solutions.`,
    responsibilities: [
      `Build and expand a personal client network within the ${market} market.`,
      "Deliver integrated advice across investments, lending, and wealth planning.",
      "Coordinate execution with product and credit specialists as needed.",
      "Originate new mandates through networking and referrals.",
      "Uphold KYC/AML and internal control standards."
    ],
    requirements: [
      "7+ years of private banking with a portable client base.",
      "Broad product knowledge and regulatory awareness.",
      "Fluent communication; additional local language a plus.",
      "Entrepreneurial drive and sustained growth track record."
    ],
    competencies: [
      "Client-centric judgement and discretion.",
      "Compliance mindset; rigorous documentation.",
      "Team player with high ownership."
    ],
    offer: [
      "Competitive package and performance incentives.",
      "Room for progression and professional development."
    ]
  };
}
