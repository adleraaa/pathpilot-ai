export default function ReportResultPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <a href="/" className="text-xl font-bold tracking-tight">
          PathPilot AI
        </a>

        <div className="flex gap-6 text-sm text-slate-300">
          <a href="/" className="hover:text-white">
            Home
          </a>
          <a href="/course-report" className="hover:text-white">
            New Report
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400">
            AI-Generated Course Selection Report
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Your Course Selection Report
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            This is a sample report generated from your academic background,
            candidate courses, and academic goal.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Student Profile</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">School</p>
                <p className="mt-2 font-medium">
                  Stevens Institute of Technology
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Major</p>
                <p className="mt-2 font-medium">Computer Science</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Year</p>
                <p className="mt-2 font-medium">Sophomore</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Main Goal</p>
                <p className="mt-2 font-medium">Protect GPA</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Overall Recommendation</h2>

            <div className="mt-6 rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">Recommended Schedule</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>CS 382</li>
                <li>MA 232</li>
                <li>MGT 103</li>
                <li>HASS Elective</li>
              </ul>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Overall Risk</p>
                <p className="mt-2 font-semibold text-yellow-300">Medium</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Workload Risk</p>
                <p className="mt-2 font-semibold text-yellow-300">Medium</p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">GPA Risk</p>
                <p className="mt-2 font-semibold text-yellow-300">Medium</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Why This Schedule Works</h2>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>
                <strong className="text-white">CS 382</strong> helps you
                continue progressing through the Computer Science major.
              </li>
              <li>
                <strong className="text-white">MA 232</strong> supports future
                CS, AI, data science, and graduate school preparation.
              </li>
              <li>
                <strong className="text-white">MGT 103</strong> helps balance
                the workload with a less technical course.
              </li>
              <li>
                <strong className="text-white">HASS Elective</strong> reduces
                GPA pressure and keeps the schedule more manageable.
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Course-by-Course Analysis</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">CS 382</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This course is important for CS major progress. It may involve
                  a moderate amount of programming and conceptual work, so it
                  should be balanced with lighter courses.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">MA 232</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This course supports technical preparation for AI, data
                  science, algorithms, and graduate-level study.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">MGT 103</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This course can help balance the schedule and reduce the risk
                  of taking too many technical courses at the same time.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">
              Courses to Avoid Taking Together
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              If your priority is GPA protection, avoid taking CS 382, CS 385,
              and a difficult math course in the same semester. This combination
              may create a high workload and increase academic risk.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold">Next Steps</h2>

            <ol className="mt-6 list-inside list-decimal space-y-3 text-slate-300">
              <li>Check prerequisites in the official school catalog.</li>
              <li>Confirm this plan with your academic advisor.</li>
              <li>Compare professor options before registration.</li>
              <li>Prepare one backup course in case of waitlist issues.</li>
              <li>Review whether this schedule supports your transfer or graduate school goals.</li>
            </ol>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/course-report"
                className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Generate New Report
              </a>

              <a
                href="/"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
              >
                Back Home
              </a>
            </div>
          </section>

          <p className="pb-10 text-sm leading-6 text-slate-500">
            Disclaimer: PathPilot AI provides academic planning assistance only.
            Always verify requirements with your official school catalog and
            academic advisor.
          </p>
        </div>
      </section>
    </main>
  );
}
