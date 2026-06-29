"use client";

/** PasswordStrengthMeter — heuristic strength bar (length, case, digit, symbol). */
import { cn } from "@/lib/utils";

export function scorePassword(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s);
}

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["#dc2626", "#f59e0b", "#eab308", "#22c55e", "#16a34a"];

export function PasswordStrengthMeter({ password, className }: { password: string; className?: string }) {
  const score = scorePassword(password);
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: password && i <= score - 1 ? COLORS[score] : "var(--border)" }}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs" style={{ color: COLORS[score] }}>
          {LABELS[score]}
        </p>
      )}
    </div>
  );
}
