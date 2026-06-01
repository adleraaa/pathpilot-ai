import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-bold tracking-tight">PathPilot AI</div>

        <div className="hidden gap-6 text-sm text-slate-300 sm:flex">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/course-report" className="hover:text-white">
            Course Report
          </Link>
          <a href="#about" className="hover:text-white">
            About
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            AI academic planning for college students
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Plan smarter courses with AI.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            PathPilot AI helps college students generate personalized course
            recommendations based on their major, completed courses, academic
            goals, GPA strategy, and workload preference.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/course-report"
              className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start Course Report
            </Link>

            <a
              href="#about"
              className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-900"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold">Sample Report</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Recommended Schedule</p>
              <p className="mt-2 font-medium">
                CS 382, MA 232, MGT 103, HASS Elective
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Overall Risk Level</p>
              <p className="mt-2 font-medium text-yellow-300">Medium</p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="mt-2 font-medium">
                Check prerequisites and compare professor options before
                registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Course Planning</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Get a recommended schedule based on completed courses, candidate
            courses, and academic goals.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">GPA Strategy</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Identify risky course combinations and balance difficult major
            requirements with lighter electives.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Academic Goals</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Align course choices with transfer preparation, graduate school
            planning, internships, and long-term goals.
          </p>
        </div>
      </section>
    </main>
  );
}