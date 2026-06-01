import Link from "next/link";

export default function CourseReportPage() {
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
            Course Report
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400">
            Course Selection Report
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Tell us about your academic background.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Enter your school, major, completed courses, candidate courses, and
            academic goal. PathPilot AI will use this information to generate a
            personalized course recommendation report.
          </p>
        </div>

        <form
          method="get"
          action="/report-result"
          className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="school" className="mb-2 block text-sm font-medium">
                School
              </label>
              <input
                id="school"
                name="school"
                type="text"
                placeholder="Stevens Institute of Technology"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label htmlFor="major" className="mb-2 block text-sm font-medium">
                Major
              </label>
              <input
                id="major"
                name="major"
                type="text"
                placeholder="Computer Science"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="year" className="mb-2 block text-sm font-medium">
                Year
              </label>
              <select
                id="year"
                name="year"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
              >
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </div>

            <div>
              <label htmlFor="gpa" className="mb-2 block text-sm font-medium">
                Current GPA, optional
              </label>
              <input
                id="gpa"
                name="gpa"
                type="text"
                placeholder="3.65"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="completedCourses"
              className="mb-2 block text-sm font-medium"
            >
              Completed Courses
            </label>
            <textarea
              id="completedCourses"
              name="completedCourses"
              placeholder="CS 115, CS 284, MA 125, MA 126..."
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label
              htmlFor="candidateCourses"
              className="mb-2 block text-sm font-medium"
            >
              Candidate Courses for Next Semester
            </label>
            <textarea
              id="candidateCourses"
              name="candidateCourses"
              placeholder="CS 382, CS 385, MA 232, MGT 103..."
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label htmlFor="goal" className="mb-2 block text-sm font-medium">
              Main Academic Goal
            </label>
            <select
              id="goal"
              name="goal"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
            >
              <option>Protect GPA</option>
              <option>Graduate on time</option>
              <option>Prepare for transfer</option>
              <option>Prepare for graduate school</option>
              <option>Prepare for internship</option>
              <option>Balanced schedule</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
              Additional Notes, optional
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="I want a manageable schedule because I will also work part-time..."
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Generate Report
          </button>
        </form>
      </section>
    </main>
  );
}