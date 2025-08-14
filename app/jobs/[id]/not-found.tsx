export default function JobNotFound() {
  return (
    <section className="space-y-6 text-center py-20">
      <h1 className="text-3xl font-semibold text-neutral-800">
        Job Not Found
      </h1>
      <p className="text-neutral-600">
        The job you are looking for may have been removed or is no longer active.
      </p>
      <a
        href="/jobs"
        className="inline-block mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
      >
        Back to Jobs
      </a>
    </section>
  );
}
