import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function GET(req: Request) {
  // Vercel Cron 인증 확인
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const apps = await prisma.application.findMany({
      where: {
        OR: [
          { deadlineAt: { gte: today, lt: tomorrow } },
          { interviewAt: { gte: today, lt: tomorrow } },
          { resultAt: { gte: today, lt: tomorrow } },
        ],
      },
      include: { user: { select: { email: true, name: true } } },
    });

    const results = await Promise.allSettled(
      apps.flatMap((app) => {
        const emails: Promise<unknown>[] = [];
        const to = app.user.email;
        const name = app.user.name ?? "안녕하세요";

        if (app.deadlineAt && app.deadlineAt >= today && app.deadlineAt < tomorrow) {
          emails.push(
            resend.emails.send({
              from: "Hirestory <noreply@hirestory.dev>",
              to,
              subject: `[Hirestory] ${app.companyName} 지원 마감일입니다`,
              html: `<p>${name}님, 오늘은 <strong>${app.companyName} — ${app.position}</strong> 지원 마감일입니다.</p>`,
            })
          );
        }
        if (app.interviewAt && app.interviewAt >= today && app.interviewAt < tomorrow) {
          emails.push(
            resend.emails.send({
              from: "Hirestory <noreply@hirestory.dev>",
              to,
              subject: `[Hirestory] ${app.companyName} 면접 당일입니다`,
              html: `<p>${name}님, 오늘은 <strong>${app.companyName} — ${app.position}</strong> 면접일입니다. 화이팅!</p>`,
            })
          );
        }
        if (app.resultAt && app.resultAt >= today && app.resultAt < tomorrow) {
          emails.push(
            resend.emails.send({
              from: "Hirestory <noreply@hirestory.dev>",
              to,
              subject: `[Hirestory] ${app.companyName} 결과 발표일입니다`,
              html: `<p>${name}님, 오늘은 <strong>${app.companyName} — ${app.position}</strong> 결과 발표일입니다.</p>`,
            })
          );
        }

        return emails;
      })
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({ sent, failed });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
