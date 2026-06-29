"use client";

/**
 * HeatmapGrid — generic value heatmap (cols × rows), colored by intensity.
 * RiskHeatmapMatrix — 5×5 likelihood × impact GRC matrix with optional plotted risks.
 */
import { cn } from "@/lib/utils";

function lerpColor(t: number) {
  // green (low) → amber → red (high)
  const stops = [
    [22, 163, 74],
    [245, 158, 11],
    [220, 38, 38],
  ];
  const seg = t < 0.5 ? 0 : 1;
  const lt = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = stops[seg];
  const b = stops[seg + 1];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * lt));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function HeatmapGrid({
  columns,
  rows,
  values,
  max,
  formatCell,
  className,
}: {
  columns: string[];
  rows: string[];
  /** values[rowIndex][colIndex] */
  values: number[][];
  max?: number;
  formatCell?: (v: number) => string;
  className?: string;
}) {
  const hi = max ?? Math.max(1, ...values.flat());
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="border-separate" style={{ borderSpacing: 3 }}>
        <thead>
          <tr>
            <th />
            {columns.map((c) => (
              <th key={c} className="px-1 pb-1 text-[11px] font-medium" style={{ color: "var(--muted-foreground)" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rLabel, r) => (
            <tr key={rLabel}>
              <td className="pr-2 text-right text-[11px] font-medium" style={{ color: "var(--muted-foreground)" }}>
                {rLabel}
              </td>
              {columns.map((_, c) => {
                const v = values[r]?.[c] ?? 0;
                const t = Math.max(0, Math.min(1, v / hi));
                return (
                  <td key={c}>
                    <div
                      className="flex h-10 w-12 items-center justify-center rounded text-xs font-semibold text-white"
                      style={{ background: v === 0 ? "var(--secondary)" : lerpColor(t) }}
                      title={`${rLabel} · ${columns[c]}: ${v}`}
                    >
                      {v > 0 ? (formatCell ? formatCell(v) : v) : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type RiskPoint = { id: string; label: string; likelihood: number; impact: number };

/** 5×5 risk matrix. likelihood/impact are 1..5. */
export function RiskHeatmapMatrix({
  risks,
  onSelect,
  className,
}: {
  risks: RiskPoint[];
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const cell = (l: number, i: number) => {
    const score = l * i; // 1..25
    const t = (score - 1) / 24;
    return lerpColor(t);
  };
  const at = (l: number, i: number) => risks.filter((r) => r.likelihood === l && r.impact === i);

  return (
    <div className={cn("inline-block", className)}>
      <div className="flex">
        <div className="flex flex-col-reverse justify-around pr-2 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
          {[1, 2, 3, 4, 5].map((l) => (
            <span key={l} className="h-12 leading-[3rem]">
              L{l}
            </span>
          ))}
        </div>
        <div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(5, 3rem)", gap: 3 }}>
            {[5, 4, 3, 2, 1].map((l) =>
              [1, 2, 3, 4, 5].map((i) => {
                const here = at(l, i);
                return (
                  <div
                    key={`${l}-${i}`}
                    className="relative flex h-12 w-12 items-center justify-center rounded"
                    style={{ background: cell(l, i), opacity: here.length ? 1 : 0.45 }}
                  >
                    {here.map((r, idx) => (
                      <button
                        key={r.id}
                        type="button"
                        title={r.label}
                        onClick={() => onSelect?.(r.id)}
                        className="absolute flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold text-white"
                        style={{
                          borderColor: "#fff",
                          background: "rgba(0,0,0,0.55)",
                          transform: `translate(${idx * 8 - (here.length - 1) * 4}px, 0)`,
                        }}
                      >
                        {r.label.slice(0, 2)}
                      </button>
                    ))}
                  </div>
                );
              }),
            )}
          </div>
          <div className="mt-1 grid text-center text-[11px]" style={{ gridTemplateColumns: "repeat(5, 3rem)", gap: 3, color: "var(--muted-foreground)" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i}>I{i}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
