"use client";

/** LogoWall — "trusted by" grid of customer/partner logos (grayscale → color on hover). */
import { ProviderLogo } from "@/components/media/provider-logo";
import { cn } from "@/lib/utils";

export type WallLogo = { name: string; src?: string };

export function LogoWall({
  logos,
  title,
  className,
}: {
  logos: WallLogo[];
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      {title && (
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((l) => (
          <div key={l.name} className="flex items-center gap-2 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <ProviderLogo name={l.name} src={l.src} size="sm" />
            <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
