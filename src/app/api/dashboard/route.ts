import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { STAGE_TO_KOREAN } from "@/types/application";
import type { ApplicationStage as PrismaStage } from "@prisma/client";

export async function GET() {
  try {
    const apps = await prisma.application.findMany({
      select: { stage: true, appliedAt: true },
    });

    const total = apps.length;
    const passed = apps.filter((a) => a.stage === "PASSED").length;
    const failed = apps.filter((a) => a.stage === "FAILED").length;
    const inProgress = total - passed - failed;

    // 단계별 건수
    const stageCounts: Record<string, number> = {};
    for (const app of apps) {
      const label = STAGE_TO_KOREAN[app.stage as PrismaStage];
      stageCounts[label] = (stageCounts[label] ?? 0) + 1;
    }
    const byStage = Object.entries(stageCounts).map(([stage, count]) => ({
      stage,
      count,
    }));

    // 월별 지원 건수
    const monthCounts: Record<string, number> = {};
    for (const app of apps) {
      const month = app.appliedAt.toISOString().slice(0, 7); // "2026-01"
      monthCounts[month] = (monthCounts[month] ?? 0) + 1;
    }
    const byMonth = Object.entries(monthCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    return NextResponse.json({ total, inProgress, passed, failed, byStage, byMonth });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
