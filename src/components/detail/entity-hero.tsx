"use client";

/**
 * EntityHero — the standard header for every detail / profile page.
 *
 * Renders an optional cover banner, an avatar OR logo, the entity title + subtitle,
 * a status badge, a key-stat strip, and an action slot. Used for suppliers, employees,
 * donors, accounts, assets, inventory items, etc.
 *
 * Modular by design: pass data + an `actions` node; keep entity-specific markup in the
 * route's own `_components`.
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

export type HeroStat = {
  label: string;
  value: React.ReactNode;
  hint?: string;
};

export type EntityHeroProps = {
  name: string;
  subtitle?: React.ReactNode;
  /** Visual kind of the lead media. */
  kind?: "avatar" | "logo";
  imageUrl?: string;
  /** Optional cover/banner image behind the header. */
  coverUrl?: string;
  /** Status pill, e.g. { label: "Active", color: "#16a34a", bg: "#dcfce7" }. */
  status?: { label: string; color: string; bg: string };
  stats?: HeroStat[];
  /** Right-aligned action buttons (edit, more, etc.). */
  actions?: React.ReactNode;
  /** Back link target, e.g. "/app/operations/suppliers". */
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function EntityHero({
  name,
  subtitle,
  kind = "avatar",
  imageUrl,
  coverUrl,
  status,
  stats,
  actions,
  backHref,
  backLabel = "Back",
  className,
}: EntityHeroProps) {
  return (
    <div
      className={cn("rounded-xl border overflow-hidden", className)}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      {/* Cover banner */}
      <div
        className="h-24 w-full sm:h-28"
        style={{
          background: coverUrl
            ? `center/cover no-repeat url(${coverUrl})`
            : "linear-gradient(120deg, var(--primary), var(--accent))",
          opacity: coverUrl ? 1 : 0.9,
        }}
      />

      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        {backHref && (
          <Link
            href={backHref}
            className="mb-3 mt-3 inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar
              className={cn(
                "h-20 w-20 -mt-10 border-4 shadow-sm",
                kind === "logo" ? "rounded-xl" : "rounded-full",
              )}
              style={{ borderColor: "var(--card)", background: "var(--secondary)" }}
            >
              {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
              <AvatarFallback
                className={kind === "logo" ? "rounded-xl" : "rounded-full"}
                style={{ background: "var(--secondary)", color: "var(--foreground)" }}
              >
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>

            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                  {name}
                </h1>
                {status && (
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {stats && stats.length > 0 && (
          <div
            className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-4"
            style={{ borderColor: "var(--border)", background: "var(--border)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-3" style={{ background: "var(--card)" }}>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {s.label}
                </div>
                <div className="mt-0.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  {s.value}
                </div>
                {s.hint && (
                  <div className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                    {s.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
