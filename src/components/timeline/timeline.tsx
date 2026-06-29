"use client";

/**
 * Timeline — vertical event/audit timeline with avatars, icons, and relative time.
 * Used on every [id] detail page's Activity / History / Approval tab.
 */
import { cn, formatRelativeTime } from "@/lib/utils";
import { EntityAvatar } from "@/components/media/entity-avatar";

export type TimelineEvent = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** ISO date or Date. */
  at: string | Date;
  actor?: { name: string; src?: string };
  /** Optional icon (overrides avatar). */
  icon?: React.ReactNode;
  /** Dot/accent color. */
  color?: string;
};

export function Timeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-5", className)}>
      {events.map((e, i) => (
        <li key={e.id} className="relative flex gap-3 pl-1">
          {/* connector line */}
          {i < events.length - 1 && (
            <span className="absolute left-[15px] top-8 h-[calc(100%+4px)] w-px" style={{ background: "var(--border)" }} />
          )}
          <div className="relative z-[1] shrink-0">
            {e.icon ? (
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: e.color ?? "var(--primary)" }}
              >
                {e.icon}
              </span>
            ) : e.actor ? (
              <EntityAvatar name={e.actor.name} src={e.actor.src} size="sm" />
            ) : (
              <span
                className="mt-1 block h-3 w-3 rounded-full ring-4"
                style={{ background: e.color ?? "var(--primary)", ["--tw-ring-color" as string]: "var(--card)" }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                {e.title}
              </p>
              <time className="shrink-0 text-xs" style={{ color: "var(--muted-foreground)" }}>
                {formatRelativeTime(e.at)}
              </time>
            </div>
            {e.description && (
              <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                {e.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
