import { cn } from "@/lib/utils";
import type { ApplicationStage } from "@/types/application";

const STAGE_STYLES: Record<ApplicationStage, string> = {
  지원: "bg-slate-100 text-slate-700",
  서류: "bg-blue-100 text-blue-700",
  인적성: "bg-purple-100 text-purple-700",
  "면접 1차": "bg-amber-100 text-amber-700",
  "면접 2차": "bg-orange-100 text-orange-700",
  최종: "bg-indigo-100 text-indigo-700",
  합격: "bg-green-100 text-green-700",
  불합격: "bg-red-100 text-red-700",
};

interface StageBadgeProps {
  stage: ApplicationStage;
  className?: string;
}

export function StageBadge({ stage, className }: StageBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STAGE_STYLES[stage],
        className
      )}
    >
      {stage}
    </span>
  );
}
