import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { AnalyticsData, ConversionRate } from "@/types/analytics";

// 전형 단계 순서 (높을수록 진행된 단계)
const STAGE_ORDER: Record<string, number> = {
  APPLIED: 0,
  DOCUMENT: 1,
  APTITUDE: 2,
  INTERVIEW_1: 3,
  INTERVIEW_2: 4,
  FINAL: 5,
  PASSED: 6,
  FAILED: 6,
};

export async function GET(): Promise<NextResponse<AnalyticsData | { error: string }>> {
  try {
    const [apps, interviews] = await Promise.all([
      prisma.application.findMany({ select: { stage: true } }),
      prisma.interviewNote.findMany({ select: { interviewType: true } }),
    ]);

    // ── 전환율 계산 ──────────────────────────────────────
    const total = apps.length;

    const docOrAbove = apps.filter((a) => STAGE_ORDER[a.stage] >= 1).length;
    const interviewOrAbove = apps.filter((a) => STAGE_ORDER[a.stage] >= 3).length;
    const passed = apps.filter((a) => a.stage === "PASSED").length;

    const conversionRates: ConversionRate[] = [
      {
        label: "서류 통과율",
        passed: docOrAbove,
        total,
        rate: total > 0 ? Math.round((docOrAbove / total) * 100) / 100 : 0,
      },
      {
        label: "면접 통과율",
        passed: interviewOrAbove,
        total: docOrAbove,
        rate: docOrAbove > 0 ? Math.round((interviewOrAbove / docOrAbove) * 100) / 100 : 0,
      },
      {
        label: "최종 합격률",
        passed,
        total: interviewOrAbove,
        rate: interviewOrAbove > 0 ? Math.round((passed / interviewOrAbove) * 100) / 100 : 0,
      },
    ];

    // ── 면접 유형별 건수 ──────────────────────────────────
    const typeCounts: Record<string, number> = {};
    for (const note of interviews) {
      typeCounts[note.interviewType] = (typeCounts[note.interviewType] ?? 0) + 1;
    }
    const interviewTypes = Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({ type, count }));

    return NextResponse.json({ conversionRates, interviewTypes });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
