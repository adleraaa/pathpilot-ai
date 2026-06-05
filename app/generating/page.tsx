import Link from "next/link";

import { GeneratingRedirect } from "./generating-redirect";

type SearchParams = { [key: string]: string | string[] | undefined };

function buildTarget(params: SearchParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) search.append(key, item);
    } else if (value !== undefined) {
      search.append(key, value);
    }
  }
  const query = search.toString();
  return query ? `/report-result?${query}` : "/report-result";
}

const STEPS = [
  "Analyzing completed courses",
  "Evaluating candidate courses",
  "Estimating workload and GPA risk",
  "Preparing personalized recommendations",
];

export default async function GeneratingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const target = buildTarget(params);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PathPilot AI
        </Link>

        <div className="flex gap-6 text-sm text-slate-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/course-report" className="hover:text-white">
            New Report
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white"
          role="status"
          aria-label="Generating report"
        />

        <h1 className="mt-8 text-3xl font-bold">
          Generating your academic strategy report...
        </h1>

        <p className="mt-4 text-slate-300">
          This only takes a moment. Please stay on this page.
        </p>

        <ul className="mt-10 w-full max-w-sm space-y-3 text-left">
          {STEPS.map((step) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4"
            >
              <span className="h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full bg-white" />
              <span className="text-slate-200">{step}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-slate-500">
          Not redirected automatically?{" "}
          <Link href={target} className="text-slate-300 underline hover:text-white">
            Continue to your report
          </Link>
          .
        </p>
      </section>

      <GeneratingRedirect target={target} />
    </main>
  );
}
