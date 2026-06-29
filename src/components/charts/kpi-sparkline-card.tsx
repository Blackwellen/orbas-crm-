"use client";

/** KpiSparklineCard — premium KPI tile: label + value + delta arrow + sparkline. */
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "./sparkline";

export type KpiSparklineCardProps = {
  label: string;
  value: React.ReactNode;
  /** Percent change, e.g. 12.4 or -3.1. */
  delta?: number;
  /** Whether a positive delta is good (green). Defaults true. */
  positiveIsGood?: boolean;
  icon?: React.ReactNode;
  trend?: Array<Record<string, number>>;
  trendKey?: string;
  className?: string;
};

export function KpiSparklineCard({
  label,
  value,
  delta,
  positiveIsGood = true,
  icon,
  trend,
  trendKey = "v",
  className,
}: KpiSparklineCardProps) {
  const up = (delta ?? 0) >= 0;
  const good = up === positiveIsGood;
  const deltaColor = good ? "#16a34a" : "#dc2626";
  const lineColor = good ? "#16a34a" : "var(--primary)";

  return (
    <div
      className={cn("rounded-xl border p-4", className)}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
        {icon && <span style={{ color: "var(--muted-foreground)" }}>{icon}</span>}
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            {value}
          </div>
          {typeof delta === "number" && (
            <div className="mt-1 flex items-center gap-1 text-xs font-medium" style={{ color: deltaColor }}>
              {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {Math.abs(delta).toFixed(1)}%
            </div>
          )}
        </div>
        {trend && trend.length > 1 && (
          <div className="w-24">
            <Sparkline data={trend} dataKey={trendKey} color={lineColor} height={40} />
          </div>
        )}
      </div>
    </div>
  );
}
