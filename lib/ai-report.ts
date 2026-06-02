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

function buildPrompt(input: StudentInput): string {
  return [
    "You are an academic advisor generating a course-selection report for a college student.",
    "Use ONLY the candidate courses the student listed for the recommended schedule. Do not invent course codes.",
    "Recommend 3-4 candidate courses. Be specific and practical.",
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
    '  "overallRisk": "Low" | "Medium" | "High",',
    '  "workloadRisk": "Low" | "Medium" | "High",',
    '  "gpaRisk": "Low" | "Medium" | "High",',
    '  "whyItWorks": string,',
    '  "courseAnalysis": { "course": string, "note": string }[],',
    '  "avoidTogether": { "courses": string[], "reason": string }[],',
    '  "nextSteps": string[]',
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
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are an academic advisor. Always reply with a single valid JSON object that matches the requested shape.",
          },
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
