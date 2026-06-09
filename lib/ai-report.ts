// Server-only module. Imported exclusively by server components / server code.
// Reads DEEPSEEK_API_KEY from the server environment and never exposes it to the client.
import type {
  AvoidCombo,
  CourseAnalysis,
  Report,
  RiskLevel,
  StudentInput,
} from "@/lib/report";
import { DISCLAIMER } from "@/lib/report";

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-v4-flash";
const RISK_VALUES: RiskLevel[] = ["Low", "Medium", "High"];

const SYSTEM_PROMPT = [
  "You are a thoughtful academic strategist writing a course-selection report for a college student.",
  "Your job is to produce a careful, honest plan — not a cheerful summary. Be specific, realistic, and conservative about risk.",
  "Always reply with a single valid JSON object that matches the requested shape, and nothing else (no markdown, no prose outside the JSON).",
  "",
  "Follow these rules strictly:",
  "",
  "RISK CONSISTENCY:",
  "- Rate workloadRisk and gpaRisk first, then set overallRisk.",
  "- overallRisk MUST be at least the maximum of workloadRisk and gpaRisk. Never rate overall lower than either component.",
  "- If either component is High, overallRisk is High. If the highest component is Medium, overallRisk is Medium or High (use High when both components are Medium or the notes mention compounding pressure).",
  "",
  "AVOID OVER-OPTIMISM:",
  "- Do not default to Low. Low ratings must be earned.",
  "- Rate gpaRisk Low ONLY when the student has a strong GPA (about 3.5 or higher) AND the schedule is light or balanced. If the GPA is unknown/not provided, or below ~3.3, or the schedule contains two or more demanding courses (proof-heavy, systems-heavy, or known weed-out courses), rate gpaRisk Medium or High.",
  "- A schedule of mostly hard major requirements should not be rated Low workload.",
  "",
  "COURSE CHARACTERIZATION (be accurate, do not invent attributes):",
  "- Distinguish low-level / systems courses (e.g., operating systems, computer organization/architecture, embedded systems, compilers) from theory / problem-solving courses (e.g., Algorithms, Discrete Math, Linear Algebra, which are abstract and conceptually intensive).",
  "- Never call a theory or problem-solving course (such as Algorithms or Linear Algebra) 'low-level'. If you are unsure what a course covers, describe it neutrally by name without asserting its difficulty type.",
  "- When uncertain about a course's exact nature, prefer broad, defensible wording like 'mathematically demanding' or 'conceptually intensive' rather than specific claims such as 'heavy proof work' or naming exact topics. Do not over-characterize.",
  "",
  "PREREQUISITES (do not assert official requirements):",
  "- Do NOT claim that one course is an official prerequisite of another unless the student explicitly provided that requirement data.",
  "- Do NOT name a specific course as a prerequisite in parentheses or otherwise (e.g., never write 'prerequisites for Algorithms (Data Structures)'). That still implies an official requirement you do not have.",
  "- When a next step or note involves prerequisites, phrase it generically as: 'Verify official prerequisites in the course catalog.'",
  "- Separately, you MAY note that a completed course is 'useful preparation' for a candidate course — but keep that as its own statement, distinct from any mention of official prerequisites.",
  "",
  "EXPLANATIONS (courseAnalysis must cover EVERY candidate course):",
  "- For each course you DID recommend, the note must explain WHY it was selected (e.g., completed courses are useful preparation, it advances the stated goal, it balances the overall load).",
  "- For each candidate course you did NOT recommend, still include it in courseAnalysis with a note that BEGINS with 'Deferred this semester — ' and explains the specific reason (e.g., it would push workload or GPA risk too high this term, it lacks useful preparation, or it pairs better with a lighter course in a future semester).",
  "",
  "SCHEDULE SIZE:",
  "- If recommendedSchedule has fewer than 4 courses, explicitly state in whyItWorks that this is a lighter-load plan, and suggest (in whyItWorks or nextSteps) an optional fourth course — either one of the deferred candidates if appropriate, or a lighter elective — that the student could add if they want a fuller term.",
  "",
  "NEXT STEPS:",
  "- Make every next step specific to THIS student's actual courses and goal. Reference real course names, concrete prerequisites to verify, specific course pairings to watch, and registration timing.",
  "- Do not include generic filler that would apply to any student.",
].join("\n");

function buildPrompt(input: StudentInput): string {
  return [
    "Generate a course-selection report for the following student.",
    "Use ONLY the candidate courses listed below for the recommended schedule. Do not invent course codes.",
    "Recommend 3-4 candidate courses, and explain the ones you defer.",
    "",
    `School: ${input.school}`,
    `Major: ${input.major}`,
    `Year: ${input.year}`,
    `GPA: ${input.gpa}`,
    `Main goal: ${input.goal}`,
    `Completed courses: ${input.completedCourses.join(", ") || "None provided"}`,
    `Candidate courses: ${input.candidateCourses.join(", ") || "None provided"}`,
    `Additional notes: ${input.notes || "None"}`,
    "",
    "Respond with a single JSON object and nothing else. Use exactly this shape:",
    "{",
    '  "recommendedSchedule": string[],   // 3-4 courses chosen ONLY from the candidate courses',
    '  "overallRisk": "Low" | "Medium" | "High",   // at least the max of workloadRisk and gpaRisk',
    '  "workloadRisk": "Low" | "Medium" | "High",',
    '  "gpaRisk": "Low" | "Medium" | "High",',
    '  "whyItWorks": string,',
    '  "courseAnalysis": { "course": string, "note": string }[],   // include EVERY candidate course; defer ones start with "Deferred this semester — "',
    '  "avoidTogether": { "courses": string[], "reason": string }[],   // only genuine conflicts, with an accurate reason',
    '  "nextSteps": string[]   // specific to this student\'s courses and goal',
    "}",
  ].join("\n");
}

function isRisk(value: unknown): value is RiskLevel {
  return typeof value === "string" && (RISK_VALUES as string[]).includes(value);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function validate(raw: unknown): Report | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  if (!isRisk(r.overallRisk) || !isRisk(r.workloadRisk) || !isRisk(r.gpaRisk)) return null;
  if (typeof r.whyItWorks !== "string" || r.whyItWorks.trim().length === 0) return null;

  const recommendedSchedule = toStringArray(r.recommendedSchedule);
  if (recommendedSchedule.length === 0) return null;

  const courseAnalysis: CourseAnalysis[] = Array.isArray(r.courseAnalysis)
    ? r.courseAnalysis
        .filter(
          (c): c is { course: string; note: string } =>
            typeof c === "object" &&
            c !== null &&
            typeof (c as Record<string, unknown>).course === "string" &&
            typeof (c as Record<string, unknown>).note === "string",
        )
        .map((c) => ({ course: c.course, note: c.note }))
    : [];

  const avoidTogether: AvoidCombo[] = Array.isArray(r.avoidTogether)
    ? r.avoidTogether
        .filter(
          (c): c is { courses: unknown; reason: string } =>
            typeof c === "object" &&
            c !== null &&
            typeof (c as Record<string, unknown>).reason === "string",
        )
        .map((c) => ({ courses: toStringArray(c.courses), reason: c.reason }))
        .filter((c) => c.courses.length > 0)
    : [];

  return {
    recommendedSchedule,
    overallRisk: r.overallRisk,
    workloadRisk: r.workloadRisk,
    gpaRisk: r.gpaRisk,
    whyItWorks: r.whyItWorks,
    courseAnalysis,
    avoidTogether,
    nextSteps: toStringArray(r.nextSteps),
    disclaimer: DISCLAIMER,
    source: "ai",
  };
}

export async function generateAiReport(input: StudentInput): Promise<Report | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;
  if (input.candidateCourses.length === 0) return null;

  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2000,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(input) },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string" || content.trim().length === 0) return null;

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return null;
    }

    return validate(parsed);
  } catch {
    return null;
  }
}
