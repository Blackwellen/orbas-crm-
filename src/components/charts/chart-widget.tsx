"use client";

/**
 * ChartWidget — single Recharts wrapper keyed by `type`, themed to CSS variables.
 * Replaces ad-hoc / fake-CSS-bar charts across the app.
 *
 * Supported types: line | area | bar | stacked-bar | pie | donut.
 * For specialised charts use the dedicated exports: Sparkline, ScoreGauge,
 * FunnelChart, WaterfallChart (separate files in this folder).
 */

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export type ChartSeries = { key: string; label?: string; color?: string };
export type ChartType = "line" | "area" | "bar" | "stacked-bar" | "pie" | "donut";

const PALETTE = [
  "var(--primary)",
  "var(--accent)",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#0ea5e9",
  "#ec4899",
];

const axisStyle = { fontSize: 11, fill: "var(--muted-foreground)" } as const;

function ChartTooltip() {
  return (
    <Tooltip
      contentStyle={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        fontSize: 12,
        color: "var(--foreground)",
      }}
      labelStyle={{ color: "var(--muted-foreground)" }}
    />
  );
}

export type ChartWidgetProps = {
  type: ChartType;
  data: Array<Record<string, unknown>>;
  /** Category axis key (x). For pie/donut, the label key. */
  xKey: string;
  /** One or more value series. For pie/donut, the first series' key is the value. */
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
};

export function ChartWidget({
  type,
  data,
  xKey,
  series,
  height = 240,
  showGrid = true,
  showLegend = false,
  className,
}: ChartWidgetProps) {
  const color = (i: number, s?: ChartSeries) => s?.color ?? PALETTE[i % PALETTE.length];

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
            <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={40} />
            <ChartTooltip />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color(i, s)}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        ) : type === "area" ? (
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color(i, s)} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={color(i, s)} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
            <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={40} />
            <ChartTooltip />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color(i, s)}
                strokeWidth={2}
                fill={`url(#grad-${s.key})`}
              />
            ))}
          </AreaChart>
        ) : type === "bar" || type === "stacked-bar" ? (
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />}
            <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={40} />
            <ChartTooltip />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={color(i, s)}
                radius={[4, 4, 0, 0]}
                stackId={type === "stacked-bar" ? "a" : undefined}
                maxBarSize={48}
              />
            ))}
          </BarChart>
        ) : (
          <PieChart>
            <ChartTooltip />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            <Pie
              data={data}
              dataKey={series[0]?.key ?? "value"}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              innerRadius={type === "donut" ? "60%" : 0}
              outerRadius="85%"
              paddingAngle={type === "donut" ? 2 : 0}
              stroke="var(--card)"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
