import type { JobDescription } from "@/lib/jobDescriptions";

export default function JobLongDescription({ data }: { data: JobDescription }) {
  if (!data) return null;
  return (
    <section className="prose prose-invert max-w-none mt-10">
      <h2>{data.title}</h2>
      <p><strong>Location:</strong> {data.location}</p>
      <h3>Position Overview</h3><p>{data.overview}</p>
      <h3>Key Responsibilities</h3><ul>{data.responsibilities.map((t,i)=><li key={i}>{t}</li>)}</ul>
      <h3>Core Requirements</h3><ul>{data.requirements.map((t,i)=><li key={i}>{t}</li>)}</ul>
      <h3>Essential Competencies</h3><ul>{data.competencies.map((t,i)=><li key={i}>{t}</li>)}</ul>
      <h3>What Our Client Offers</h3><ul>{data.offer.map((t,i)=><li key={i}>{t}</li>)}</ul>
    </section>
  );
}
