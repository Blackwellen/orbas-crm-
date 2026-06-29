"use client";

/**
 * RecordSummaryPanel — right-rail card group for detail pages.
 *
 * Use for record lifecycle, key facts, linked records, owner, and quick actions.
 * Compose multiple <SummaryCard>s; keep entity-specific content in the route's _components.
 */

import { cn } from "@/lib/utils";

export function RecordSummaryPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <aside className={cn("flex w-full flex-col gap-4", className)}>{children}</aside>;
}

export function SummaryCard({
  title,
  action,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && (
            <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export type SummaryRow = { label: string; value: React.ReactNode };

/** Convenience: a label/value list for quick facts. */
export function SummaryFacts({ rows }: { rows: SummaryRow[] }) {
  return (
    <dl className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-3 text-sm">
          <dt style={{ color: "var(--muted-foreground)" }}>{r.label}</dt>
          <dd className="text-right font-medium" style={{ color: "var(--foreground)" }}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
