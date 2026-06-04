import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const apps = await prisma.application.findMany({
      select: {
        id: true,
        companyName: true,
        position: true,
        deadlineAt: true,
        interviewAt: true,
        resultAt: true,
      },
    });

    const events = apps.flatMap((app) => {
      const label = `${app.companyName} — ${app.position}`;
      const result = [];

      if (app.deadlineAt) {
        result.push({
          id: `${app.id}-deadline`,
          title: `${label} 지원 마감`,
          start: app.deadlineAt.toISOString(),
          end: app.deadlineAt.toISOString(),
          type: "deadline",
          applicationId: app.id,
        });
      }
      if (app.interviewAt) {
        result.push({
          id: `${app.id}-interview`,
          title: `${label} 면접`,
          start: app.interviewAt.toISOString(),
          end: app.interviewAt.toISOString(),
          type: "interview",
          applicationId: app.id,
        });
      }
      if (app.resultAt) {
        result.push({
          id: `${app.id}-result`,
          title: `${label} 결과 발표`,
          start: app.resultAt.toISOString(),
          end: app.resultAt.toISOString(),
          type: "result",
          applicationId: app.id,
        });
      }

      return result;
    });

    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
