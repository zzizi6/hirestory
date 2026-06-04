import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const rows = await prisma.interviewNote.findMany({
      orderBy: { interviewAt: "desc" },
      include: {
        application: { select: { companyName: true, position: true } },
        questions: { orderBy: { createdAt: "asc" } },
      },
    });

    const data = rows.map((row) => ({
      id: row.id,
      applicationId: row.applicationId,
      companyName: row.application.companyName,
      position: row.application.position,
      interviewAt: row.interviewAt.toISOString().split("T")[0],
      interviewType: row.interviewType,
      questions: row.questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer ?? "",
      })),
      goodPoints: row.goodPoints ?? "",
      badPoints: row.badPoints ?? "",
      improvements: row.improvements ?? "",
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
      applicationId: string;
      interviewAt: string;
      interviewType: string;
      questions: { question: string; answer?: string }[];
      goodPoints?: string;
      badPoints?: string;
      improvements?: string;
    };

    const created = await prisma.interviewNote.create({
      data: {
        applicationId: body.applicationId,
        interviewAt: new Date(body.interviewAt),
        interviewType: body.interviewType,
        goodPoints: body.goodPoints ?? null,
        badPoints: body.badPoints ?? null,
        improvements: body.improvements ?? null,
        questions: {
          create: body.questions.map((q) => ({
            question: q.question,
            answer: q.answer ?? null,
          })),
        },
      },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
