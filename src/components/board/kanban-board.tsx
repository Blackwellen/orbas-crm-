"use client";

/**
 * KanbanBoard — generic drag-and-drop board (@dnd-kit). Columns + cards, WIP counts,
 * optional per-column value totals, drag cards across columns with onMove.
 * Used by CRM pipeline/deals, hiring, tickets, work-queue, tasks, projects.
 */
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export type KanbanColumn = { key: string; label: string; color?: string };

export type KanbanBoardProps<T> = {
  columns: KanbanColumn[];
  items: T[];
  getId: (item: T) => string;
  getColumn: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  onMove?: (id: string, toColumn: string) => void;
  /** Optional per-column footer (e.g. weighted total). */
  columnFooter?: (columnKey: string, items: T[]) => React.ReactNode;
  className?: string;
};

function Card({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn("cursor-grab rounded-lg border active:cursor-grabbing", isDragging && "opacity-40")}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      {children}
    </div>
  );
}

function Column({
  column,
  count,
  children,
  footer,
}: {
  column: KanbanColumn;
  count: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });
  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: column.color ?? "var(--primary)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {column.label}
          </span>
          <span
            className="rounded-full px-1.5 text-[10px] font-semibold"
            style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
          >
            {count}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className="flex min-h-[120px] flex-1 flex-col gap-2 rounded-xl border p-2 transition-colors"
        style={{
          borderColor: isOver ? "var(--primary)" : "var(--border)",
          background: isOver ? "var(--secondary)" : "var(--background)",
        }}
      >
        {children}
      </div>
      {footer && <div className="mt-2 px-1">{footer}</div>}
    </div>
  );
}

export function KanbanBoard<T>({
  columns,
  items,
  getId,
  getColumn,
  renderCard,
  onMove,
  columnFooter,
  className,
}: KanbanBoardProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const byColumn = (key: string) => items.filter((i) => getColumn(i) === key);
  const activeItem = activeId ? items.find((i) => getId(i) === activeId) : null;

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const overCol = e.over?.id ? String(e.over.id) : null;
    const id = String(e.active.id);
    if (overCol && columns.some((c) => c.key === overCol)) onMove?.(id, overCol);
  };

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>
        {columns.map((col) => {
          const colItems = byColumn(col.key);
          return (
            <Column key={col.key} column={col} count={colItems.length} footer={columnFooter?.(col.key, colItems)}>
              {colItems.map((item) => (
                <Card key={getId(item)} id={getId(item)}>
                  {renderCard(item)}
                </Card>
              ))}
            </Column>
          );
        })}
      </div>
      <DragOverlay>
        {activeItem && (
          <div className="rounded-lg border shadow-lg" style={{ borderColor: "var(--primary)", background: "var(--card)" }}>
            {renderCard(activeItem)}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
