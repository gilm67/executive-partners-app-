import Image from "next/image";

export const dynamic = "force-static";

export default function BpSimulatorPage() {
  const simUrl = process.env.NEXT_PUBLIC_SIMULATOR_URL || "https://sim.execpartners.ch/";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/bp-sim-hero.png"
          alt="Business Plan Simulator"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Business Plan Simulator</h1>
        </div>
      </div>

      {/* Embed Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <iframe
          src={simUrl}
          width="100%"
          height="800"
          className="border rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
