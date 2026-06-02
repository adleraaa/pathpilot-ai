# PathPilot AI

AI-powered academic planning assistant that helps college students choose their courses for the upcoming semester. Students enter their academic background and the courses they are considering, and PathPilot AI generates a personalized course-selection report with a recommended schedule, risk analysis, and concrete next steps.

**Live demo:** [https://pathpilot-ai-one.vercel.app/](https://pathpilot-ai-one.vercel.app/)

---

## Overview

PathPilot AI takes a few simple form inputs — school, major, year, GPA, completed courses, candidate courses, and a main goal — and turns them into a structured, readable report. When an AI provider is configured, it generates a tailored report through the DeepSeek API on the server. When it is not, it falls back to deterministic rule-based logic, so the app always works.

## Problem

Course registration is stressful and easy to get wrong. Students have to balance major requirements, GPA strategy, workload, prerequisites, and longer-term goals like transferring or applying to graduate school — usually with limited advisor time and scattered information. It is hard to know whether a proposed schedule is realistic or risky before committing to it.

## Solution

PathPilot AI converts those inputs into a clear course report. It recommends which candidate courses to take, flags workload and GPA risk, explains *why* the schedule makes sense, warns about risky course combinations, and suggests next steps — all in one place, with a guaranteed rule-based fallback so it is always usable.

## Features

- Personalized course-selection report from a single form.
- Recommended schedule drawn only from the student's candidate courses.
- Risk analysis: overall risk, workload risk, and GPA risk.
- Plain-language "Why This Schedule Works" explanation.
- Course-by-course analysis and "courses to avoid taking together" warnings.
- Actionable next steps and an academic disclaimer.
- Graceful degradation: a rule-based report guarantees the app works without any API key.
- Clean, responsive dark UI.

## Tech Stack

- **Next.js** — App Router, server components (Next.js 16)
- **React** — UI rendering (React 19)
- **TypeScript** — type-safe application code
- **Tailwind CSS** — styling (Tailwind CSS 4)
- **DeepSeek API** — AI-generated reports via server-side `fetch` (no SDK dependency)
- **Vercel** — hosting and deployment

## How It Works

1. The user fills out the form at `/course-report` (school, major, year, GPA, completed courses, candidate courses, goal, and optional notes).
2. The form submits via `GET` to `/report-result`, passing the inputs as query parameters.
3. `/report-result` is a server component. It parses the inputs and asks the report generator for a structured report.
4. The page renders the report into clearly separated sections: Student Profile, Your Courses, Overall Recommendation, Course-by-Course Analysis, Courses to Avoid Taking Together, and Next Steps.

## AI Integration and Fallback Logic

The report generator follows a single, predictable path:

1. **AI path** — If a DeepSeek API key is configured, the server calls the DeepSeek Chat Completions API and requests a JSON-structured report. The response is parsed and validated against the expected schema.
2. **Rule-based fallback** — The app silently uses the built-in rule-based report whenever:
   - `DEEPSEEK_API_KEY` is missing,
   - the API call fails or returns a non-success status,
   - the request times out, or
   - the response is malformed or fails validation.

This guarantees the demo is always functional, even with no key configured. The integration uses native `fetch` with no new npm dependency.

## Security Notes

- The DeepSeek API call runs **only on the server** (inside a server component / server-only module).
- The API key is read from the `DEEPSEEK_API_KEY` environment variable and is **never** sent to or exposed in the browser.
- `.env.local` holds your real key locally and is **git-ignored**, so it is never committed.
- `.env.example` documents the variable name without containing a real key.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. (Optional) enable AI reports
cp .env.example .env.local
# then open .env.local and set DEEPSEEK_API_KEY=your_deepseek_api_key

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> If you add or change `DEEPSEEK_API_KEY` while the server is running, stop it with `Ctrl+C` and run `npm run dev` again so the new value is picked up.

Other scripts:

```bash
npm run lint    # run ESLint
npm run build   # production build
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | No | DeepSeek API key for AI-generated reports. If unset, the app uses the rule-based report. Read on the server only — never exposed to the client. |

Get a key at [platform.deepseek.com](https://platform.deepseek.com/).

## Sample Input

You can try the demo with generic values like:

- **School:** Sample University
- **Major:** Computer Science
- **Year:** Sophomore
- **GPA:** 3.50
- **Completed Courses:** Intro to Programming, Data Structures, Calculus I
- **Candidate Courses:** Algorithms, Database Systems, Linear Algebra, Software Engineering
- **Goal:** Balanced schedule
- **Notes:** I want to choose a manageable schedule while making steady progress toward my degree.

## Future Improvements

- Prerequisite checking against a real course catalog.
- Save and compare multiple schedule options.
- Accounts so students can revisit past reports.
- Export the report as a shareable PDF.
- Richer GPA-impact modeling based on course difficulty.
- Support for additional AI providers.

---

> **Disclaimer:** PathPilot AI provides academic planning assistance only. Always verify requirements with your official school catalog and academic advisor.
