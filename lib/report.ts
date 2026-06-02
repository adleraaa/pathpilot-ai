export type RiskLevel = "Low" | "Medium" | "High";

export type StudentInput = {
  school: string;
  major: string;
  year: string;
  gpa: string;
  goal: string;
  completedCourses: string[];
  candidateCourses: string[];
  notes: string;
};

export type CourseAnalysis = {
  course: string;
  note: string;
};

export type AvoidCombo = {
  courses: string[];
  reason: string;
};

export type Report = {
  recommendedSchedule: string[];
  overallRisk: RiskLevel;
  workloadRisk: RiskLevel;
  gpaRisk: RiskLevel;
  whyItWorks: string;
  courseAnalysis: CourseAnalysis[];
  avoidTogether: AvoidCombo[];
  nextSteps: string[];
  disclaimer: string;
  source: "ai" | "rule-based";
};

export const DISCLAIMER =
  "PathPilot AI provides academic planning assistance only. Always verify requirements with your official school catalog and academic advisor.";

const NEXT_STEPS = [
  "Check prerequisites in the official school catalog.",
  "Confirm this plan with your academic advisor.",
  "Compare professor options before registration.",
  "Prepare one backup course in case of waitlist issues.",
  "Review whether this schedule supports your transfer or graduate school goals.",
];

const RISK_ORDER: Record<RiskLevel, number> = { Low: 0, Medium: 1, High: 2 };

export function maxRisk(a: RiskLevel, b: RiskLevel): RiskLevel {
  return RISK_ORDER[a] >= RISK_ORDER[b] ? a : b;
}

function workloadRisk(candidateCount: number): RiskLevel {
  if (candidateCount >= 5) return "High";
  if (candidateCount >= 3) return "Medium";
  return "Low";
}

function gpaRisk(gpa: string): RiskLevel {
  const value = Number.parseFloat(gpa);
  if (Number.isNaN(value)) return "Low";
  if (value < 3.0) return "High";
  if (value < 3.5) return "Medium";
  return "Low";
}

export function buildRuleBasedReport(input: StudentInput): Report {
  const recommendedSchedule = input.candidateCourses.slice(0, 4);
  const workload = workloadRisk(input.candidateCourses.length);
  const gpa = gpaRisk(input.gpa);
  const overallRisk = maxRisk(workload, gpa);

  const courseAnalysis: CourseAnalysis[] = recommendedSchedule.map((course) => ({
    course,
    note: "Included from your candidate list. Verify prerequisites and time conflicts before registering.",
  }));

  const goalLabel =
    input.goal && input.goal !== "Not provided" ? input.goal.toLowerCase() : "your academic goal";

  const whyItWorks =
    recommendedSchedule.length > 0
      ? `This schedule keeps your next semester to ${recommendedSchedule.length} course${
          recommendedSchedule.length === 1 ? "" : "s"
        } drawn from the courses you are already considering, which supports ${goalLabel} while keeping the workload manageable.`
      : "Add candidate courses to get a recommended schedule tailored to your goal.";

  return {
    recommendedSchedule,
    overallRisk,
    workloadRisk: workload,
    gpaRisk: gpa,
    whyItWorks,
    courseAnalysis,
    avoidTogether: [],
    nextSteps: NEXT_STEPS,
    disclaimer: DISCLAIMER,
    source: "rule-based",
  };
}
