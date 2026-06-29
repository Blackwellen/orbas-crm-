"use client";

/**
 * CalendarGrid — month view with event chips. For leave, shifts, campaigns, renewals,
 * scheduled reports, interview schedules. Week starts Monday (UK).
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarEvent = { id: string; date: string | Date; label: string; color?: string };

const WD = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function CalendarGrid({
  initialMonth,
  events = [],
  onSelectDate,
  className,
}: {
  initialMonth?: Date;
  events?: CalendarEvent[];
  onSelectDate?: (d: Date) => void;
  className?: string;
}) {
  const [month, setMonth] = useState(() => {
    const d = initialMonth ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const today = new Date();

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  while (cells.length % 7 !== 0) cells.push(null);

  const evsFor = (d: Date) => events.filter((e) => sameDay(new Date(e.date), d));
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  return (
    <div className={cn("rounded-xl border", className)} style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={() => shift(-1)} aria-label="Previous month" className="rounded p-1 hover:bg-[var(--secondary)]">
            <ChevronLeft className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          </button>
          <button onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))} className="rounded px-2 py-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
            Today
          </button>
          <button onClick={() => shift(1)} aria-label="Next month" className="rounded p-1 hover:bg-[var(--secondary)]">
            <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b text-center text-[11px] font-medium" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
        {WD.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          const isToday = d && sameDay(d, today);
          const evs = d ? evsFor(d) : [];
          return (
            <button
              key={i}
              type="button"
              disabled={!d}
              onClick={() => d && onSelectDate?.(d)}
              className="min-h-[84px] border-b border-r p-1.5 text-left align-top last:border-r-0 disabled:opacity-40"
              style={{ borderColor: "var(--border)" }}
            >
              {d && (
                <>
                  <span
                    className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs", isToday && "font-bold text-white")}
                    style={{ background: isToday ? "var(--primary)" : "transparent", color: isToday ? "#fff" : "var(--foreground)" }}
                  >
                    {d.getDate()}
                  </span>
                  <div className="mt-1 space-y-1">
                    {evs.slice(0, 3).map((e) => (
                      <div
                        key={e.id}
                        className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                        style={{ background: e.color ?? "var(--primary)" }}
                        title={e.label}
                      >
                        {e.label}
                      </div>
                    ))}
                    {evs.length > 3 && (
                      <div className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                        +{evs.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
