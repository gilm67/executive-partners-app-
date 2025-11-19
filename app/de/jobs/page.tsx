// app/de/jobs/page.tsx
import type { Metadata } from "next";
import JobsPage from "../../jobs/page";

export const metadata: Metadata = {
  title: "Jobs für Private Banker – Executive Partners",
  description:
    "Ausgewählte Positionen für Private Banker, Wealth Manager und Führungskräfte in den wichtigsten Finanzzentren.",
};

export default function JobsDePage() {
  return <JobsPage locale="de" />;
}