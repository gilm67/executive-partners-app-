import ExpressInterestForm from "@/components/ExpressInterestForm";

export default function TestInterestPage() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-2xl font-semibold">Test: Express Interest</h1>
        <div className="mt-6">
          <ExpressInterestForm jobId="test" jobTitle="Test Role" />
        </div>
      </div>
    </main>
  );
}