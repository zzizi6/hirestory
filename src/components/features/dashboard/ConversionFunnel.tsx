"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ConversionRate } from "@/types/analytics";

interface ConversionFunnelProps {
  data: ConversionRate[];
}

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa"];

export function ConversionFunnel({ data }: ConversionFunnelProps) {
  if (data.length === 0 || data.every((d) => d.total === 0)) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        데이터가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
          <XAxis
            type="number"
            domain={[0, 1]}
            tickFormatter={(v: unknown) => `${Math.round(Number(v) * 100)}%`}
            tick={{ fontSize: 12 }}
            className="fill-muted-foreground"
          />
          <YAxis
            type="category"
            dataKey="label"
            width={88}
            tick={{ fontSize: 12 }}
            className="fill-muted-foreground"
          />
          <Tooltip
            formatter={(value: unknown) => [
              `${Math.round(Number(value) * 100)}%`,
              "통과율",
            ]}
          />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 수치 보조 텍스트 */}
      <ul className="grid grid-cols-3 gap-3" aria-label="전환율 상세">
        {data.map((d) => (
          <li
            key={d.label}
            className="flex flex-col items-center gap-1 rounded-lg border border-border bg-muted/40 p-3"
          >
            <span className="text-xs text-muted-foreground">{d.label}</span>
            <span className="text-xl font-bold text-foreground">
              {d.total > 0 ? `${Math.round(d.rate * 100)}%` : "-"}
            </span>
            <span className="text-xs text-muted-foreground">
              {d.passed} / {d.total}건
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
