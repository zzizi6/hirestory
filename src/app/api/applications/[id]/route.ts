import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { KOREAN_TO_STAGE } from "@/types/application";
import type { ApplicationStage as PrismaStage } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await req.json()) as Partial<{
      companyName: string;
      position: string;
      postingUrl: string;
      appliedAt: string;
      stage: string;
      hasAptitude: boolean;
      hasSecondInterview: boolean;
      memo: string;
      deadlineAt: string | null;
      interviewAt: string | null;
      resultAt: string | null;
    }>;

    const data: Record<string, unknown> = {};
    if (body.companyName !== undefined) data.companyName = body.companyName;
    if (body.position !== undefined) data.position = body.position;
    if (body.postingUrl !== undefined) data.postingUrl = body.postingUrl;
    if (body.appliedAt !== undefined) data.appliedAt = new Date(body.appliedAt);
    if (body.stage !== undefined) {
      data.stage = KOREAN_TO_STAGE[body.stage as keyof typeof KOREAN_TO_STAGE] as PrismaStage;
    }
    if (body.hasAptitude !== undefined) data.hasAptitude = body.hasAptitude;
    if (body.hasSecondInterview !== undefined) data.hasSecondInterview = body.hasSecondInterview;
    if (body.memo !== undefined) data.memo = body.memo;
    if (body.deadlineAt !== undefined) data.deadlineAt = body.deadlineAt ? new Date(body.deadlineAt) : null;
    if (body.interviewAt !== undefined) data.interviewAt = body.interviewAt ? new Date(body.interviewAt) : null;
    if (body.resultAt !== undefined) data.resultAt = body.resultAt ? new Date(body.resultAt) : null;

    await prisma.application.update({ where: { id }, data });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
