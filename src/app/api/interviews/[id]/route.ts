import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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
      interviewAt: string;
      interviewType: string;
      goodPoints: string;
      badPoints: string;
      improvements: string;
    }>;

    const data: Record<string, unknown> = {};
    if (body.interviewAt !== undefined) data.interviewAt = new Date(body.interviewAt);
    if (body.interviewType !== undefined) data.interviewType = body.interviewType;
    if (body.goodPoints !== undefined) data.goodPoints = body.goodPoints;
    if (body.badPoints !== undefined) data.badPoints = body.badPoints;
    if (body.improvements !== undefined) data.improvements = body.improvements;

    await prisma.interviewNote.update({ where: { id }, data });

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
    await prisma.interviewNote.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
