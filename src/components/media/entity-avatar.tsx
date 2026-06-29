"use client";

/**
 * EntityAvatar — photo avatar with initials fallback + optional presence dot.
 * AvatarStack — overlapping group of avatars with a "+N" overflow chip.
 * Replaces the initials-only avatars used across the app.
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

const SIZES = { xs: "h-6 w-6 text-[10px]", sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-base" };

export type EntityAvatarProps = {
  name: string;
  src?: string;
  size?: keyof typeof SIZES;
  /** "online" | "away" | "busy" | "offline" — renders a presence dot. */
  presence?: "online" | "away" | "busy" | "offline";
  shape?: "circle" | "square";
  className?: string;
};

const PRESENCE: Record<string, string> = {
  online: "#16a34a",
  away: "#f59e0b",
  busy: "#dc2626",
  offline: "#94a3b8",
};

export function EntityAvatar({ name, src, size = "md", presence, shape = "circle", className }: EntityAvatarProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <Avatar className={cn(SIZES[size], shape === "square" ? "rounded-md" : "rounded-full")}>
        {src && <AvatarImage src={src} alt={name} />}
        <AvatarFallback
          className={shape === "square" ? "rounded-md" : "rounded-full"}
          style={{ background: "var(--secondary)", color: "var(--foreground)" }}
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {presence && (
        <span
          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2"
          style={{ background: PRESENCE[presence], borderColor: "var(--card)" }}
        />
      )}
    </span>
  );
}

export type AvatarStackPerson = { name: string; src?: string };

export function AvatarStack({
  people,
  max = 4,
  size = "sm",
  className,
}: {
  people: AvatarStackPerson[];
  max?: number;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {shown.map((p, i) => (
          <span key={i} className="ring-2 rounded-full" style={{ ["--tw-ring-color" as string]: "var(--card)" }}>
            <EntityAvatar name={p.name} src={p.src} size={size} />
          </span>
        ))}
      </div>
      {extra > 0 && (
        <span
          className={cn("ml-1 inline-flex items-center justify-center rounded-full font-medium", SIZES[size])}
          style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
