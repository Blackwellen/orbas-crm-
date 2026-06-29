"use client";

/** TestimonialCarousel — rotating customer quotes with avatar, name, company, rating. */
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { EntityAvatar } from "@/components/media/entity-avatar";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
};

export function TestimonialCarousel({
  items,
  intervalMs = 6000,
  className,
}: {
  items: Testimonial[];
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const t = items[i];
  if (!t) return null;

  return (
    <div className={cn("rounded-2xl border p-8 text-center", className)} style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="mb-4 flex justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="h-4 w-4" style={{ fill: k < (t.rating ?? 5) ? "#f59e0b" : "transparent", color: "#f59e0b" }} />
        ))}
      </div>
      <blockquote className="mx-auto max-w-2xl text-lg font-medium" style={{ color: "var(--foreground)" }}>
        “{t.quote}”
      </blockquote>
      <div className="mt-6 flex items-center justify-center gap-3">
        <EntityAvatar name={t.name} src={t.avatar} size="md" />
        <div className="text-left">
          <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {t.name}
          </div>
          {t.role && (
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {t.role}
            </div>
          )}
        </div>
      </div>
      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-1.5">
          {items.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Testimonial ${k + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: k === i ? 20 : 6, background: k === i ? "var(--primary)" : "var(--border)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
