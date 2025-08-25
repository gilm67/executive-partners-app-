export default function BrokenPageDemo() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Executive Partners</h1>
        <p className="mt-2 text-neutral-300">
          International & Swiss Private Banking — HNW/UHNWI
        </p>
      </section>

      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Executive Partners
      </footer>
    </main>
  );
}
