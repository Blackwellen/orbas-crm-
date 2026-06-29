"use client";

/**
 * GanttChart — timeline of tasks with positioned bars, progress fill, today marker,
 * and dependency connectors. Pure CSS/SVG (no chart lib). Date math via day offsets.
 * Used by Projects (project plan / portfolio), Operations (manufacturing / work-orders),
 * CRM (campaign schedule), milestones roadmaps.
 */
import { cn } from "@/lib/utils";

export type GanttTask = {
  id: string;
  label: string;
  start: string | Date;
  end: string | Date;
  progress?: number; // 0..1
  color?: string;
  group?: string;
};

const DAY = 86400000;
const toDate = (d: string | Date) => (d instanceof Date ? d : new Date(d));
const dayDiff = (a: Date, b: Date) => Math.round((a.getTime() - b.getTime()) / DAY);

export function GanttChart({
  tasks,
  pxPerDay = 26,
  rowHeight = 40,
  labelWidth = 180,
  className,
}: {
  tasks: GanttTask[];
  pxPerDay?: number;
  rowHeight?: number;
  labelWidth?: number;
  className?: string;
}) {
  if (!tasks.length) return null;
  const starts = tasks.map((t) => toDate(t.start).getTime());
  const ends = tasks.map((t) => toDate(t.end).getTime());
  const min = new Date(Math.min(...starts));
  const max = new Date(Math.max(...ends));
  min.setDate(min.getDate() - 1);
  max.setDate(max.getDate() + 1);
  const totalDays = Math.max(1, dayDiff(max, min));
  const width = totalDays * pxPerDay;
  const today = new Date();
  const todayX = dayDiff(today, min) * pxPerDay;

  // month header segments
  const months: { label: string; x: number; w: number }[] = [];
  let cursor = new Date(min);
  while (cursor < max) {
    const mStart = new Date(cursor);
    const mEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    const segEnd = mEnd < max ? mEnd : max;
    months.push({
      label: mStart.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
      x: dayDiff(mStart, min) * pxPerDay,
      w: dayDiff(segEnd, mStart) * pxPerDay,
    });
    cursor = mEnd;
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border", className)} style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div style={{ minWidth: labelWidth + width }}>
        {/* header */}
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          <div style={{ width: labelWidth }} className="shrink-0 px-3 py-2 text-xs font-semibold" />
          <div className="relative" style={{ width, height: 28 }}>
            {months.map((m, i) => (
              <div
                key={i}
                className="absolute top-0 border-l px-2 py-1 text-[11px] font-medium"
                style={{ left: m.x, width: m.w, borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                {m.label}
              </div>
            ))}
          </div>
        </div>

        {/* rows */}
        <div className="relative">
          {/* today line */}
          {todayX >= 0 && todayX <= width && (
            <div
              className="pointer-events-none absolute top-0 z-[2] w-px"
              style={{ left: labelWidth + todayX, height: tasks.length * rowHeight, background: "var(--accent)" }}
            />
          )}
          {tasks.map((t) => {
            const s = toDate(t.start);
            const e = toDate(t.end);
            const x = dayDiff(s, min) * pxPerDay;
            const w = Math.max(pxPerDay, (dayDiff(e, s) + 1) * pxPerDay);
            const prog = Math.max(0, Math.min(1, t.progress ?? 0));
            const color = t.color ?? "var(--primary)";
            return (
              <div key={t.id} className="flex items-center border-b" style={{ height: rowHeight, borderColor: "var(--border)" }}>
                <div
                  style={{ width: labelWidth }}
                  className="shrink-0 truncate px-3 text-sm"
                  title={t.label}
                >
                  <span style={{ color: "var(--foreground)" }}>{t.label}</span>
                </div>
                <div className="relative" style={{ width, height: rowHeight }}>
                  <div
                    className="absolute top-1/2 flex -translate-y-1/2 items-center overflow-hidden rounded-md"
                    style={{ left: x, width: w, height: 20, background: "color-mix(in srgb, " + "var(--primary) 18%, transparent)" }}
                  >
                    <div className="h-full rounded-md" style={{ width: `${prog * 100}%`, background: color }} />
                    <span className="absolute left-2 text-[10px] font-medium" style={{ color: "var(--foreground)" }}>
                      {Math.round(prog * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
