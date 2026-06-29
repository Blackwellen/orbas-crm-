"use client";

/**
 * InlineEditCell / InlineEditField — click-to-edit value with save/cancel.
 * Supports text, number, and select. Keep persistence in the caller's onSave.
 */
import { useEffect, useRef, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

export type InlineEditCellProps = {
  value: string | number;
  type?: "text" | "number" | "select";
  options?: Option[];
  onSave: (value: string) => void | Promise<void>;
  display?: (value: string | number) => React.ReactNode;
  className?: string;
  placeholder?: string;
};

export function InlineEditCell({
  value,
  type = "text",
  options = [],
  onSave,
  display,
  className,
  placeholder,
}: InlineEditCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => setDraft(String(value)), [value]);
  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  const commit = async () => {
    if (draft === String(value)) return setEditing(false);
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={cn("group inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-left text-sm hover:bg-[var(--secondary)]", className)}
        style={{ color: "var(--foreground)" }}
      >
        <span>{display ? display(value) : value || <span style={{ color: "var(--muted-foreground)" }}>{placeholder ?? "—"}</span>}</span>
        <Pencil className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
      </button>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {type === "select" ? (
        <select
          ref={ref as React.RefObject<HTMLSelectElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="rounded border px-1.5 py-1 text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="w-32 rounded border px-1.5 py-1 text-sm outline-none"
          style={{ borderColor: "var(--primary)", background: "var(--card)", color: "var(--foreground)" }}
        />
      )}
      <button type="button" onClick={commit} disabled={saving} aria-label="Save" style={{ color: "#16a34a" }}>
        <Check className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => setEditing(false)} aria-label="Cancel" style={{ color: "var(--muted-foreground)" }}>
        <X className="h-4 w-4" />
      </button>
    </span>
  );
}

export { InlineEditCell as InlineEditField };
