"use client";

/**
 * ESignPlacementCanvas — drag signature/date/text/initials fields onto a document image,
 * color-coded per signer. Coordinates are normalized 0..1 of the page. For the e-sign
 * wizard (documents/signatures/new) and the public sign/[token] page.
 */
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SignFieldType = "signature" | "initials" | "date" | "text";
export type SignField = {
  id: string;
  type: SignFieldType;
  x: number; // 0..1
  y: number; // 0..1
  signerColor: string;
  signerName?: string;
};

const TYPE_LABEL: Record<SignFieldType, string> = {
  signature: "Signature",
  initials: "Initials",
  date: "Date",
  text: "Text",
};

export function ESignPlacementCanvas({
  pageSrc,
  fields,
  onChange,
  aspect = "1/1.414", // A4 portrait
  className,
}: {
  pageSrc?: string;
  fields: SignField[];
  onChange?: (fields: SignField[]) => void;
  aspect?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragId || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onChange?.(fields.map((f) => (f.id === dragId ? { ...f, x, y } : f)));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragId(null)}
      onPointerLeave={() => setDragId(null)}
      className={cn("relative overflow-hidden rounded-xl border bg-white", className)}
      style={{ aspectRatio: aspect, borderColor: "var(--border)" }}
    >
      {pageSrc ? (
        <img src={pageSrc} alt="document page" className="pointer-events-none h-full w-full object-contain" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm" style={{ color: "#94a3b8" }}>
          Document page
        </div>
      )}

      {fields.map((f) => (
        <div
          key={f.id}
          onPointerDown={() => setDragId(f.id)}
          className="absolute flex cursor-move items-center justify-center rounded border-2 border-dashed text-[10px] font-semibold"
          style={{
            left: `${f.x * 100}%`,
            top: `${f.y * 100}%`,
            transform: "translate(-50%, -50%)",
            width: f.type === "signature" ? 120 : f.type === "text" ? 100 : 64,
            height: 32,
            borderColor: f.signerColor,
            background: `${f.signerColor}20`,
            color: f.signerColor,
          }}
          title={f.signerName ? `${TYPE_LABEL[f.type]} — ${f.signerName}` : TYPE_LABEL[f.type]}
        >
          {TYPE_LABEL[f.type]}
        </div>
      ))}
    </div>
  );
}
