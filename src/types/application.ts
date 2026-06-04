import type { ApplicationStage as PrismaStage } from "@prisma/client";

export const STAGE_TO_KOREAN: Record<PrismaStage, ApplicationStage> = {
  APPLIED: "지원",
  DOCUMENT: "서류",
  APTITUDE: "인적성",
  INTERVIEW_1: "면접 1차",
  INTERVIEW_2: "면접 2차",
  FINAL: "최종",
  PASSED: "합격",
  FAILED: "불합격",
};

export const KOREAN_TO_STAGE: Record<ApplicationStage, PrismaStage> = {
  지원: "APPLIED",
  서류: "DOCUMENT",
  인적성: "APTITUDE",
  "면접 1차": "INTERVIEW_1",
  "면접 2차": "INTERVIEW_2",
  최종: "FINAL",
  합격: "PASSED",
  불합격: "FAILED",
};

export const APPLICATION_STAGES = [
  "지원",
  "서류",
  "인적성",
  "면접 1차",
  "면접 2차",
  "최종",
  "합격",
  "불합격",
] as const;

export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

export function buildStages(options: {
  hasAptitude: boolean;
  hasSecondInterview: boolean;
}): ApplicationStage[] {
  const stages: ApplicationStage[] = ["지원", "서류"];
  if (options.hasAptitude) stages.push("인적성");
  stages.push("면접 1차");
  if (options.hasSecondInterview) stages.push("면접 2차");
  stages.push("최종", "합격", "불합격");
  return stages;
}

export interface Application {
  id: string;
  companyName: string;
  position: string;
  postingUrl: string;
  appliedAt: string;
  stage: ApplicationStage;
  hasAptitude: boolean;
  hasSecondInterview: boolean;
  memo: string;
  deadlineAt: string | null;
  interviewAt: string | null;
  resultAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationFormData = Omit<Application, "id" | "createdAt" | "updatedAt">;
