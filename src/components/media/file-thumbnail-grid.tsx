"use client";

/**
 * FileThumbnailGrid — document/file cards with image thumbnails or type-colored icons.
 * For DMS libraries, contract/invoice/receipt attachments, templates, KB media.
 */
import { FileText, FileSpreadsheet, FileImage, File as FileIcon, FileArchive } from "lucide-react";
import { cn } from "@/lib/utils";

export type FileItem = {
  id: string;
  name: string;
  /** lowercase extension or mime hint, e.g. "pdf", "xlsx", "png". */
  kind?: string;
  /** thumbnail image URL (for images / rendered first page). */
  thumb?: string;
  meta?: string;
};

const TYPE_STYLE: Record<string, { color: string; Icon: React.ElementType }> = {
  pdf: { color: "#dc2626", Icon: FileText },
  doc: { color: "#2563eb", Icon: FileText },
  docx: { color: "#2563eb", Icon: FileText },
  xls: { color: "#16a34a", Icon: FileSpreadsheet },
  xlsx: { color: "#16a34a", Icon: FileSpreadsheet },
  csv: { color: "#16a34a", Icon: FileSpreadsheet },
  png: { color: "#8b5cf6", Icon: FileImage },
  jpg: { color: "#8b5cf6", Icon: FileImage },
  jpeg: { color: "#8b5cf6", Icon: FileImage },
  zip: { color: "#f59e0b", Icon: FileArchive },
};

export function FileThumbnailGrid({
  files,
  onOpen,
  className,
}: {
  files: FileItem[];
  onOpen?: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {files.map((f) => {
        const t = TYPE_STYLE[(f.kind ?? "").toLowerCase()] ?? { color: "var(--muted-foreground)", Icon: FileIcon };
        const Icon = t.Icon;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onOpen?.(f.id)}
            className="group overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-md"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="flex h-28 items-center justify-center" style={{ background: "var(--secondary)" }}>
              {f.thumb ? (
                <img src={f.thumb} alt={f.name} className="h-full w-full object-cover" />
              ) : (
                <Icon className="h-9 w-9" style={{ color: t.color }} />
              )}
            </div>
            <div className="p-3">
              <div className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {f.name}
              </div>
              {f.meta && (
                <div className="truncate text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {f.meta}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
