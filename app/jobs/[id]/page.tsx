import { getJobByIdOrSlug } from "@/lib/sheets";
import ApplyButtons from "./ApplyButtons";

export default async function JobPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobByIdOrSlug(params.id);
  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  // Replace escaped \n with real newlines
  const description = (job.Description || "").replace(/\\n/g, "\n");

  // Format description with bold section headers
  const formattedDescription = description.split("\n").map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={idx} />;

    if (
      trimmed.toLowerCase().startsWith("key responsibilities") ||
      trimmed.toLowerCase().startsWith("key qualifications")
    ) {
      return (
        <p key={idx} className="font-bold mt-4 mb-2">
          {trimmed}
        </p>
      );
    }

    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      return (
        <li key={idx} className="ml-6 list-disc">
          {trimmed.replace(/^[-•]\s*/, "")}
        </li>
      );
    }

    return <p key={idx} className="mb-2">{trimmed}</p>;
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{job.Title || job.Role}</h1>
      <p className="text-gray-600 mb-4">
        {job.Location} • {job.Market} • {job.Seniority}
      </p>
      <p className="mb-6">{job.Summary}</p>

      <div className="prose max-w-none mb-6">{formattedDescription}</div>

      <ApplyButtons
        title={job.Title || job.Role || ""}
        market={job.Market}
        location={job.Location}
      />
    </div>
  );
}

