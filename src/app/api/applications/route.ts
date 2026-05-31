import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { KOREAN_TO_STAGE, STAGE_TO_KOREAN } from "@/types/application";
import type { ApplicationStage as PrismaStage } from "@prisma/client";

export async function GET() {
  try {
    const rows = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });

    const data = rows.map((row) => ({
      id: row.id,
      companyName: row.companyName,
      position: row.position,
      postingUrl: row.postingUrl ?? "",
      appliedAt: row.appliedAt.toISOString().split("T")[0],
      stage: STAGE_TO_KOREAN[row.stage],
      hasAptitude: row.hasAptitude,
      hasSecondInterview: row.hasSecondInterview,
      memo: row.memo ?? "",
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      companyName: string;
      position: string;
      postingUrl?: string;
      appliedAt: string;
      stage: string;
      hasAptitude: boolean;
      hasSecondInterview: boolean;
      memo?: string;
    };

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    const prismaStage = KOREAN_TO_STAGE[body.stage as keyof typeof KOREAN_TO_STAGE] as PrismaStage;

    const created = await prisma.application.create({
      data: {
        userId: user.id,
        companyName: body.companyName,
        position: body.position,
        postingUrl: body.postingUrl ?? null,
        appliedAt: new Date(body.appliedAt),
        stage: prismaStage,
        hasAptitude: body.hasAptitude,
        hasSecondInterview: body.hasSecondInterview,
        memo: body.memo ?? null,
      },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
