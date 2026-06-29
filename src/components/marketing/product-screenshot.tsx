"use client";

/** ProductScreenshot — browser-chrome frame around a screenshot image or live node. */
import { cn } from "@/lib/utils";

export function ProductScreenshot({
  src,
  alt,
  children,
  className,
}: {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl border shadow-2xl", className)}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
        <span className="h-3 w-3 rounded-full" style={{ background: "#ef4444" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#f59e0b" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#10b981" }} />
        <span className="mx-auto rounded px-8 py-0.5 text-[10px]" style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
          app.orbascrm.com
        </span>
      </div>
      {children ?? (src && <img src={src} alt={alt ?? "Product screenshot"} className="w-full" />)}
    </div>
  );
}
