"use client";

/**
 * ProviderLogo / EntityLogo — renders a brand logo image when available, otherwise a
 * deterministic colored letter-tile fallback. For suppliers, integrations, carriers,
 * funders, banks, customers.
 */
import { cn } from "@/lib/utils";

const TILE_COLORS = ["#1a56db", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#0ea5e9", "#ec4899"];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

const SIZES = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };

export function ProviderLogo({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  if (src) {
    return (
      <span
        className={cn("inline-flex items-center justify-center overflow-hidden rounded-md border bg-white", SIZES[size], className)}
        style={{ borderColor: "var(--border)" }}
      >
        <img src={src} alt={name} className="h-full w-full object-contain p-1" />
      </span>
    );
  }
  const color = TILE_COLORS[hash(name) % TILE_COLORS.length];
  const letters = name.replace(/[^a-zA-Z0-9 ]/g, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-md font-bold text-white", SIZES[size], className)}
      style={{ background: color }}
    >
      {letters || name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export { ProviderLogo as EntityLogo };
