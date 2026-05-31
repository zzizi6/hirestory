import Link from "next/link";
import { ClipboardList, BookOpen, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "지원 기록 관리",
    description:
      "회사명, 직무, 공고 링크, 전형 단계를 한 눈에 정리하고 진행 상황을 추적하세요.",
  },
  {
    icon: BookOpen,
    title: "면접 노트 & 회고",
    description:
      "질문과 답변을 기록하고, 잘한 점·부족했던 점·개선점으로 면접을 체계적으로 돌아보세요.",
  },
  {
    icon: CalendarDays,
    title: "통합 캘린더 & D-Day",
    description:
      "지원 마감일, 면접일, 결과 발표일을 캘린더에서 한눈에 확인하고 알림을 받으세요.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          취업 준비의 모든 기록,{" "}
          <span className="text-primary">한 곳에서</span>
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          지원 기록부터 면접 회고, 일정 관리까지 — Hirestory 하나로 취업
          준비를 체계적으로 관리하세요.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/signin"
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            무료로 시작하기
          </Link>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            대시보드 보기
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-2xl font-semibold text-foreground">
            핵심 기능
          </h2>
          <ul className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <Icon
                  className="mb-4 h-8 w-8 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
