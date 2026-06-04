import type { DashboardData } from "@/types/dashboard";

interface SummaryCardsProps {
  data: DashboardData;
}

interface CardItem {
  label: string;
  value: number;
  description: string;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const cards: CardItem[] = [
    { label: "전체 지원", value: data.total, description: "총 지원 건수" },
    { label: "진행 중", value: data.inProgress, description: "합격·불합격 제외" },
    { label: "합격", value: data.passed, description: "최종 합격" },
    { label: "불합격", value: data.failed, description: "탈락 또는 포기" },
  ];

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="지원 현황 요약">
      {cards.map((card) => (
        <li
          key={card.label}
          className="flex flex-col gap-1 rounded-xl border border-border bg-background p-5"
        >
          <span className="text-sm text-muted-foreground">{card.label}</span>
          <span
            className="text-3xl font-bold text-foreground"
            aria-label={`${card.label} ${card.value}건`}
          >
            {card.value}
          </span>
          <span className="text-xs text-muted-foreground">{card.description}</span>
        </li>
      ))}
    </ul>
  );
}
