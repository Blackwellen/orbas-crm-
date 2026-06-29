"use client";

/**
 * OrgChartTree — zoomable org chart with photo nodes and collapse/expand.
 * Pure CSS tree (recursive) + zoom controls. Used by People org-chart, succession,
 * and a mini "reporting line" on employee profiles.
 */
import { useState } from "react";
import { Minus, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { EntityAvatar } from "@/components/media/entity-avatar";
import { cn } from "@/lib/utils";

export type OrgNode = {
  id: string;
  name: string;
  title?: string;
  src?: string;
  children?: OrgNode[];
};

function Node({ node, onSelect }: { node: OrgNode; onSelect?: (id: string) => void }) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  return (
    <li className="flex flex-col items-center">
      <div
        className="relative flex w-44 flex-col items-center rounded-xl border px-3 py-3 text-center shadow-sm"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <EntityAvatar name={node.name} src={node.src} size="md" />
        <button type="button" onClick={() => onSelect?.(node.id)} className="mt-2 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          {node.name}
        </button>
        {node.title && (
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {node.title}
          </span>
        )}
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>

      {hasChildren && open && (
        <ul className="relative mt-6 flex items-start gap-6 before:absolute before:-top-3 before:left-1/2 before:h-3 before:w-px before:bg-[var(--border)]">
          {node.children!.map((c) => (
            <div key={c.id} className="relative pt-3 before:absolute before:left-1/2 before:top-0 before:h-3 before:w-px before:bg-[var(--border)]">
              <Node node={c} onSelect={onSelect} />
            </div>
          ))}
        </ul>
      )}
    </li>
  );
}

export function OrgChartTree({
  root,
  onSelect,
  className,
}: {
  root: OrgNode;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const [zoom, setZoom] = useState(1);
  return (
    <div className={cn("relative overflow-auto rounded-xl border p-6", className)} style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-lg border p-0.5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} className="rounded p-1" aria-label="Zoom out">
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
          {Math.round(zoom * 100)}%
        </span>
        <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))} className="rounded p-1" aria-label="Zoom in">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-w-max justify-center" style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}>
        <ul>
          <Node node={root} onSelect={onSelect} />
        </ul>
      </div>
    </div>
  );
}
