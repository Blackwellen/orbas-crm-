"use client";

/**
 * ScoreGauge — SVG radial gauge (no chart lib). For compliance score, SLA, attainment,
 * capacity, security posture, etc. `value`/`max` drive a colored arc + center label.
 */
import { cn } from "@/lib/utils";

export type ScoreGaugeProps = {
  value: number;
  max?: number;
  label?: string;
  /** Override the arc color; otherwise derived from RAG thresholds. */
  color?: string;
  /** Show value as a percentage of max. */
  asPercent?: boolean;
  size?: number;
  thickness?: number;
  className?: string;
};

function ragColor(pct: number) {
  if (pct >= 0.75) return "#16a34a";
  if (pct >= 0.4) return "#f59e0b";
  return "#dc2626";
}

export function ScoreGauge({
  value,
  max = 100,
  label,
  color,
  asPercent = true,
  size = 140,
  thickness = 12,
  className,
}: ScoreGaugeProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const arc = color ?? ragColor(pct);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--secondary)" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={arc}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: size * 0.22, fontWeight: 700, fill: "var(--foreground)" }}
        >
          {asPercent ? `${Math.round(pct * 100)}%` : value}
        </text>
        {label && (
          <text
            x="50%"
            y="64%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: size * 0.085, fill: "var(--muted-foreground)" }}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
