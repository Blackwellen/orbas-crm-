"use client";

/**
 * FlowCanvas — node-based automation builder surface (trigger → condition → action).
 * Renders typed nodes in a vertical flow with SVG connectors and "+ add step" affordances.
 * Lightweight (no flow lib); selection + add/insert via callbacks. Used by Automations.
 */
import { Plus, Zap, GitBranch, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowNodeType = "trigger" | "condition" | "action";
export type FlowNode = {
  id: string;
  type: FlowNodeType;
  title: string;
  subtitle?: string;
};

const TYPE_META: Record<FlowNodeType, { color: string; bg: string; Icon: React.ElementType; label: string }> = {
  trigger: { color: "#7c3aed", bg: "#ede9fe", Icon: Zap, label: "Trigger" },
  condition: { color: "#d97706", bg: "#fef3c7", Icon: GitBranch, label: "Condition" },
  action: { color: "#1a56db", bg: "#dbeafe", Icon: Play, label: "Action" },
};

export function FlowCanvas({
  nodes,
  selectedId,
  onSelect,
  onAddAfter,
  className,
}: {
  nodes: FlowNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onAddAfter?: (afterId: string | null) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center gap-0 rounded-xl border p-6", className)}
      style={{
        borderColor: "var(--border)",
        background:
          "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <AddButton onClick={() => onAddAfter?.(null)} hidden={nodes.length > 0} />
      {nodes.map((n, i) => {
        const m = TYPE_META[n.type];
        const Icon = m.Icon;
        const selected = n.id === selectedId;
        return (
          <div key={n.id} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onSelect?.(n.id)}
              className="w-72 rounded-xl border-2 bg-[var(--card)] p-3 text-left shadow-sm transition-all"
              style={{ borderColor: selected ? m.color : "var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: m.bg, color: m.color }}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: m.color }}>
                    {m.label}
                  </div>
                  <div className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {n.title}
                  </div>
                </div>
              </div>
              {n.subtitle && (
                <p className="mt-1.5 truncate text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {n.subtitle}
                </p>
              )}
            </button>
            {/* connector */}
            <div className="h-6 w-px" style={{ background: "var(--border)" }} />
            {i === nodes.length - 1 ? (
              <AddButton onClick={() => onAddAfter?.(n.id)} />
            ) : (
              <button
                type="button"
                onClick={() => onAddAfter?.(n.id)}
                className="-my-1 flex h-5 w-5 items-center justify-center rounded-full border opacity-50 hover:opacity-100"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
                aria-label="Insert step"
              >
                <Plus className="h-3 w-3" />
              </button>
            )}
            {i < nodes.length - 1 && <div className="h-6 w-px" style={{ background: "var(--border)" }} />}
          </div>
        );
      })}
    </div>
  );
}

function AddButton({ onClick, hidden }: { onClick: () => void; hidden?: boolean }) {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-2 text-xs font-medium"
      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--card)" }}
    >
      <Plus className="h-3.5 w-3.5" /> Add step
    </button>
  );
}
