import Link from "next/link";

import { generateAiReport } from "@/lib/ai-report";
import { buildRuleBasedReport, type RiskLevel, type StudentInput } from "@/lib/report";

type SearchParams = { [key: string]: string | string[] | undefined };

function getValue(params: SearchParams, key: string): string {
  const raw = params[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").trim();
}

function splitCourses(input: string): string[] {
  return input
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

const riskColor: Record<RiskLevel, string> = {
  Low: "text-green-300",
  Medium: "text-yellow-300",
  High: "text-red-300",
};

export default async function ReportResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const school = getValue(params, "school") || "Not provided";
  const major = getValue(params, "major") || "Not provided";
  const year = getValue(params, "year") || "Not provided";
  const gpa = getValue(params, "gpa") || "Not provided";
  const goal = getValue(params, "goal") || "Not provided";

  const completedCourses = splitCourses(getValue(params, "completedCourses"));
  const candidateCourses = splitCourses(getValue(params, "candidateCourses"));
  const notes = getValue(params, "notes");

  const input: StudentInput = {
    school,
    major,
    year,
    gpa,
    goal,
    completedCourses,
    candidateCourses,
    notes,
  };

  const report = (await generateAiReport(input)) ?? buildRuleBasedReport(input);

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

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400">
            Course Selection Report
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Your Course Selection Report
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            This report is generated from the academic background, candidate
            courses, and academic goal you submitted.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Student Profile</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">School</p>
                <p className="mt-2 font-medium">{school}</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Major</p>
                <p className="mt-2 font-medium">{major}</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Year</p>
                <p className="mt-2 font-medium">{year}</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">GPA</p>
                <p className="mt-2 font-medium">{gpa}</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4 md:col-span-2">
                <p className="text-sm text-slate-400">Main Goal</p>
                <p className="mt-2 font-medium">{goal}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Your Courses</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-sm text-slate-400">Completed Courses</p>
                {completedCourses.length > 0 ? (
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    {completedCourses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-slate-400">None provided</p>
                )}
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-sm text-slate-400">Candidate Courses</p>
                {candidateCourses.length > 0 ? (
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    {candidateCourses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-slate-400">None provided</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Overall Recommendation</h2>

            <div className="mt-6 rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">Recommended Schedule</p>
              {report.recommendedSchedule.length > 0 ? (
                <ul className="mt-3 list-inside list-disc space-y-2">
                  {report.recommendedSchedule.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-slate-400">
                  Add candidate courses to get a recommended schedule.
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Overall Risk Level</p>
                <p className={`mt-2 font-semibold ${riskColor[report.overallRisk]}`}>
                  {report.overallRisk}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Workload Risk</p>
                <p className={`mt-2 font-semibold ${riskColor[report.workloadRisk]}`}>
                  {report.workloadRisk}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">GPA Risk</p>
                <p className={`mt-2 font-semibold ${riskColor[report.gpaRisk]}`}>
                  {report.gpaRisk}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">Why This Schedule Works</p>
              <p className="mt-2 leading-7 text-slate-200">{report.whyItWorks}</p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Course-by-Course Analysis</h2>

            {report.courseAnalysis.length > 0 ? (
              <div className="mt-6 space-y-4">
                {report.courseAnalysis.map((item) => (
                  <div key={item.course} className="rounded-2xl bg-slate-800 p-5">
                    <p className="font-semibold">{item.course}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-slate-400">
                Add candidate courses to see a course-by-course breakdown.
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">
              Courses to Avoid Taking Together
            </h2>

            {report.avoidTogether.length > 0 ? (
              <div className="mt-6 space-y-4">
                {report.avoidTogether.map((combo) => (
                  <div
                    key={combo.courses.join("+")}
                    className="rounded-2xl bg-slate-800 p-5"
                  >
                    <p className="font-semibold">{combo.courses.join(" + ")}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {combo.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-slate-400">
                No risky course combinations were flagged for this schedule.
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Next Steps</h2>

            <ol className="mt-6 list-inside list-decimal space-y-3 text-slate-300">
              {report.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/course-report"
                className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Generate New Report
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
              >
                Back Home
              </Link>
            </div>
          </section>

          <p className="pb-10 text-sm leading-6 text-slate-500">
            Disclaimer: {report.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}
