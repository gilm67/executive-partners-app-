import ClientMount from "./ClientMount";

export const metadata = { title: "Portability – Executive Partners" };

export default function Page() {
  return (
    <main className="portability-page min-h-screen body-grain">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ClientMount />
      </div>
    </main>
  );
}