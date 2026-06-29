"use client";

/**
 * DashboardGrid — drag-to-reorder widget grid (@dnd-kit/sortable). Each widget can span
 * 1–4 columns. Toggle `editable` to show drag handles. Used by Analytics dashboards and
 * the Home cockpit.
 */
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type DashboardWidget = { id: string; span?: 1 | 2 | 3 | 4; content: React.ReactNode };

function Widget({ widget, editable }: { widget: DashboardWidget; editable: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id });
  const span = widget.span ?? 1;
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        gridColumn: `span ${span} / span ${span}`,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={cn("relative rounded-xl border", editable && "ring-1")}
      // ring color via inline to respect tokens
    >
      {editable && (
        <button
          {...attributes}
          {...listeners}
          className="absolute right-2 top-2 z-10 cursor-grab rounded p-1"
          style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
          aria-label="Drag widget"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      {widget.content}
    </div>
  );
}

export function DashboardGrid({
  widgets,
  onReorder,
  editable = false,
  columns = 4,
  className,
}: {
  widgets: DashboardWidget[];
  onReorder?: (ids: string[]) => void;
  editable?: boolean;
  columns?: number;
  className?: string;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = widgets.map((w) => w.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    onReorder?.(arrayMove(ids, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
        <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {widgets.map((w) => (
            <Widget key={w.id} widget={w} editable={editable} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
