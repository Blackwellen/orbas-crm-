"use client";

/**
 * DocumentViewer — inline preview for PDFs (native browser via <iframe>) and images.
 * Toolbar with title + open/download. For contracts, invoices, receipts, payslips, KB.
 * Production note: swap the iframe for react-pdf/pdfjs behind this same API if precise
 * page control / clause search is needed.
 */
import { Download, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function DocumentViewer({
  src,
  title,
  kind,
  height = 520,
  className,
}: {
  src?: string;
  title?: string;
  /** "pdf" | "image" | other; inferred from src extension if omitted. */
  kind?: "pdf" | "image";
  height?: number;
  className?: string;
}) {
  const ext = (src?.split(".").pop() ?? "").toLowerCase();
  const resolved = kind ?? (["png", "jpg", "jpeg", "gif", "webp"].includes(ext) ? "image" : "pdf");

  return (
    <div className={cn("overflow-hidden rounded-xl border", className)} style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <span className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {title ?? "Document"}
          </span>
        </div>
        {src && (
          <div className="flex items-center gap-1">
            <a href={src} target="_blank" rel="noreferrer" className="rounded p-1.5 hover:bg-[var(--secondary)]" aria-label="Open">
              <ExternalLink className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
            </a>
            <a href={src} download className="rounded p-1.5 hover:bg-[var(--secondary)]" aria-label="Download">
              <Download className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
            </a>
          </div>
        )}
      </div>
      <div style={{ height }} className="flex items-center justify-center" >
        {!src ? (
          <div className="flex flex-col items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <FileText className="h-8 w-8" />
            No preview available
          </div>
        ) : resolved === "image" ? (
          <img src={src} alt={title ?? ""} className="max-h-full max-w-full object-contain" />
        ) : (
          <iframe src={src} title={title ?? "document"} className="h-full w-full" style={{ border: "none" }} />
        )}
      </div>
    </div>
  );
}
