"use client";

/**
 * DetailShell — page frame for every detail / profile page.
 *
 * Slots:
 *  • hero    — an <EntityHero> (full width)
 *  • tabs    — a <DetailTabs> (full width, sits under the hero)
 *  • children — main tab content
 *  • rightRail — optional <RecordSummaryPanel> (shown beside content on large screens)
 *
 * Keeps every detail page consistent and modular: the page composes the shell,
 * the shell owns layout only.
 */

import { cn } from "@/lib/utils";

export function DetailShell({
  hero,
  tabs,
  rightRail,
  children,
  className,
}: {
  hero?: React.ReactNode;
  tabs?: React.ReactNode;
  rightRail?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] space-y-4 p-4 sm:p-6", className)}>
      {hero}
      {tabs}
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          rightRail && "lg:grid-cols-[minmax(0,1fr)_320px]",
        )}
      >
        <div className="min-w-0 space-y-4">{children}</div>
        {rightRail && <div className="min-w-0">{rightRail}</div>}
      </div>
    </div>
  );
}
