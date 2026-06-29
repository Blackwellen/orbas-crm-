"use client";

/** FunnelChart — CSS funnel (no chart lib). Stages narrow by value; shows conversion %. */
import { cn } from "@/lib/utils";

export type FunnelStage = { label: string; value: number; color?: string };

const PALETTE = ["var(--primary)", "#3b6fe0", "#5a86ea", "#7b9cf0", "#9bb4f5"];

export function FunnelChart({
  stages,
  formatValue = (n) => n.toLocaleString(),
  className,
}: {
  stages: FunnelStage[];
  formatValue?: (n: number) => string;
  className?: string;
}) {
  const top = stages[0]?.value || 1;
  return (
    <div className={cn("space-y-1.5", className)}>
      {stages.map((s, i) => {
        const widthPct = Math.max(8, (s.value / top) * 100);
        const conv = i === 0 ? 100 : (s.value / (stages[i - 1].value || 1)) * 100;
        return (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-right text-xs" style={{ color: "var(--muted-foreground)" }}>
              {s.label}
            </div>
            <div className="flex-1">
              <div
                className="flex h-9 items-center justify-between rounded-md px-3 text-xs font-semibold text-white transition-all"
                style={{ width: `${widthPct}%`, background: s.color ?? PALETTE[i % PALETTE.length] }}
              >
                <span>{formatValue(s.value)}</span>
                {i > 0 && <span className="opacity-80">{conv.toFixed(0)}%</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
