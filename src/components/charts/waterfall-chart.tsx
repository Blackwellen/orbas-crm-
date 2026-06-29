"use client";

/**
 * WaterfallChart — Recharts-based waterfall (P&L revenue→net, MRR new→churn→net, etc.).
 * Pass steps with signed deltas; mark totals with `isTotal` to render an absolute bar.
 */
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip, CartesianGrid } from "recharts";

export type WaterfallStep = { label: string; value: number; isTotal?: boolean };

const POS = "#16a34a";
const NEG = "#dc2626";
const TOTAL = "var(--primary)";

export function WaterfallChart({
  steps,
  height = 260,
  className,
}: {
  steps: WaterfallStep[];
  height?: number;
  className?: string;
}) {
  let running = 0;
  const data = steps.map((s) => {
    if (s.isTotal) {
      const row = { label: s.label, base: 0, bar: s.value, fill: TOTAL };
      running = s.value;
      return row;
    }
    const start = running;
    running += s.value;
    const base = Math.min(start, running);
    const bar = Math.abs(s.value);
    return { label: s.label, base, bar, fill: s.value >= 0 ? POS : NEG };
  });

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
            formatter={(value) => [value as number, "value"]}
          />
          <Bar dataKey="base" stackId="w" fill="transparent" />
          <Bar dataKey="bar" stackId="w" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
