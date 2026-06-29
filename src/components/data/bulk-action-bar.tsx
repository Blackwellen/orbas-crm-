"use client";

/** BulkActionBar — floating bar shown when rows are selected; renders module-specific actions. */
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type BulkAction = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  /** Visually mark as destructive. */
  destructive?: boolean;
};

export function BulkActionBar({
  count,
  actions,
  onClear,
  className,
}: {
  count: number;
  actions: BulkAction[];
  onClear: () => void;
  className?: string;
}) {
  if (count <= 0) return null;
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border px-3 py-2 shadow-lg",
        className,
      )}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <span className="rounded-md px-2 py-1 text-xs font-semibold text-white" style={{ background: "var(--primary)" }}>
        {count} selected
      </span>
      <div className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />
      {actions.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={a.onClick}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
          style={{ color: a.destructive ? "var(--destructive)" : "var(--foreground)" }}
        >
          {a.icon}
          {a.label}
        </button>
      ))}
      <div className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />
      <button type="button" onClick={onClear} aria-label="Clear selection" style={{ color: "var(--muted-foreground)" }}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
