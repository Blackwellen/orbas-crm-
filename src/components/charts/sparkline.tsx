"use client";

/** Sparkline — tiny inline trend line/area, no axes. For KPI cards and table rows. */
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export function Sparkline({
  data,
  dataKey = "v",
  color = "var(--primary)",
  height = 36,
  className,
}: {
  data: Array<Record<string, number>>;
  dataKey?: string;
  color?: string;
  height?: number;
  className?: string;
}) {
  const id = `spark-${dataKey}-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} fill={`url(#${id})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
