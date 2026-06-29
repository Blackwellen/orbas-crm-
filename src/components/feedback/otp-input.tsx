"use client";

/** OtpInput — segmented one-time-code input with auto-advance, paste, and shake-on-error. */
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function OtpInput({
  length = 6,
  onComplete,
  error,
  className,
}: {
  length?: number;
  onComplete?: (code: string) => void;
  error?: boolean;
  className?: string;
}) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    const next = [...vals];
    next[i] = v.slice(-1);
    setVals(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every((c) => c) && next.join("").length === length) onComplete?.(next.join(""));
  };

  return (
    <div className={cn("flex gap-2", error && "animate-[shake_0.3s]", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={vals[i]}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => set(i, e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          onPaste={(e) => {
            const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
            if (digits.length) {
              const next = Array(length).fill("").map((_, k) => digits[k] ?? "");
              setVals(next);
              if (digits.length === length) onComplete?.(digits.join(""));
              refs.current[Math.min(digits.length, length - 1)]?.focus();
              e.preventDefault();
            }
          }}
          className="h-12 w-11 rounded-lg border text-center text-lg font-semibold outline-none focus:ring-2"
          style={{
            borderColor: error ? "var(--destructive)" : "var(--border)",
            background: "var(--card)",
            color: "var(--foreground)",
            ["--tw-ring-color" as string]: "var(--primary)",
          }}
        />
      ))}
    </div>
  );
}
