"use client";

/**
 * FilterBar — search input + filter controls slot + active-filter pills + view-switcher slot.
 * SavedViewChips — a row of saved-view chips (e.g. All / Mine / Overdue).
 */
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  filters,
  activePills,
  right,
  className,
}: {
  search?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
  /** Filter controls (selects, dropdowns). */
  filters?: React.ReactNode;
  /** Active-filter pills with remove handlers. */
  activePills?: { key: string; label: string; onRemove: () => void }[];
  /** Right-aligned slot (view switcher, export, etc.). */
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {onSearchChange && (
          <div
            className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <Search className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
            <input
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "var(--foreground)" }}
            />
          </div>
        )}
        {filters}
        {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
      </div>

      {activePills && activePills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activePills.map((p) => (
            <span
              key={p.key}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ background: "var(--secondary)", color: "var(--foreground)" }}
            >
              {p.label}
              <button type="button" onClick={p.onRemove} aria-label={`Remove ${p.label}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export type SavedView = { key: string; label: string; count?: number };

export function SavedViewChips({
  views,
  value,
  onChange,
  className,
}: {
  views: SavedView[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {views.map((v) => {
        const active = v.key === value;
        return (
          <button
            key={v.key}
            type="button"
            onClick={() => onChange(v.key)}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderColor: active ? "var(--primary)" : "var(--border)",
              background: active ? "var(--primary)" : "var(--card)",
              color: active ? "#fff" : "var(--muted-foreground)",
            }}
          >
            {v.label}
            {typeof v.count === "number" && (
              <span
                className="rounded-full px-1.5 text-[10px] font-semibold"
                style={{ background: active ? "rgba(255,255,255,0.25)" : "var(--secondary)" }}
              >
                {v.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
