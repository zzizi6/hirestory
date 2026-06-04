import { SummaryCards } from "@/components/features/dashboard/SummaryCards";
import { StageBarChart } from "@/components/features/dashboard/StageBarChart";
import { MonthlyLineChart } from "@/components/features/dashboard/MonthlyLineChart";
import type { DashboardData } from "@/types/dashboard";

async function getDashboardData(): Promise<DashboardData> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return { total: 0, inProgress: 0, passed: 0, failed: 0, byStage: [], byMonth: [] };
  }
  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          나의 취업 준비 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <section aria-labelledby="summary-heading">
          <h2
            id="summary-heading"
            className="mb-4 text-base font-semibold text-foreground"
          >
            지원 현황 요약
          </h2>
          <SummaryCards data={data} />
        </section>

        <section
          aria-labelledby="stage-chart-heading"
          className="rounded-xl border border-border bg-background p-6"
        >
          <h2
            id="stage-chart-heading"
            className="mb-4 text-base font-semibold text-foreground"
          >
            전형 단계별 현황
          </h2>
          <StageBarChart data={data.byStage} />
        </section>

        <section
          aria-labelledby="monthly-chart-heading"
          className="rounded-xl border border-border bg-background p-6"
        >
          <h2
            id="monthly-chart-heading"
            className="mb-4 text-base font-semibold text-foreground"
          >
            월별 지원 추이
          </h2>
          <MonthlyLineChart data={data.byMonth} />
        </section>
      </div>
    </div>
  );
}
