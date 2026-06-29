"use client";

/** ViewSwitcher — segmented control to switch list views (table/card/board/calendar/map/gallery). */
import { cn } from "@/lib/utils";

export type ViewOption<T extends string = string> = { value: T; label?: string; icon?: React.ReactNode };

export function ViewSwitcher<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: ViewOption<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5 rounded-lg border p-0.5", className)}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
      role="tablist"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            title={o.label ?? o.value}
            onClick={() => onChange(o.value)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
            style={{
              background: active ? "var(--primary)" : "transparent",
              color: active ? "#fff" : "var(--muted-foreground)",
            }}
          >
            {o.icon}
            {o.label && <span>{o.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
