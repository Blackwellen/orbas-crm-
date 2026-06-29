"use client"

import React from "react"
import { Trash2, FileText, RotateCcw, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TRASH_FILES = [
  { id: 1, name: "Old Contract Draft — Q1 2026.pdf", type: "pdf", deletedBy: "Jordan Clarke", deletedDate: "3 Jun 2026", expiresIn: "27 days" },
  { id: 2, name: "Legacy Pricing Sheet 2025.xlsx", type: "xlsx", deletedBy: "Me", deletedDate: "5 Jun 2026", expiresIn: "25 days" },
  { id: 3, name: "Outdated Brand Logo v1.png", type: "png", deletedBy: "Tom Okafor", deletedDate: "7 Jun 2026", expiresIn: "23 days" },
  { id: 4, name: "Draft Proposal — ClearCloud.docx", type: "docx", deletedBy: "Me", deletedDate: "9 Jun 2026", expiresIn: "21 days" },
]

const typeColor: Record<string, string> = {
  pdf: "#dc2626", docx: "#1a56db", xlsx: "#16a34a", png: "#06b6d4"
}

export default function TrashPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Trash</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Files are permanently deleted after 30 days</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-xs font-medium hover:bg-[var(--secondary)]" style={{ color: "#dc2626" }}>
          <Trash2 className="h-3.5 w-3.5" /> Empty Trash
        </button>
      </div>

      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Deleted By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Deleted Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Expires In</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {TRASH_FILES.map(file => (
                <tr key={file.id} className="hover:bg-[var(--secondary)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 shrink-0" style={{ color: typeColor[file.type] ?? "#6b7280" }} />
                      <span className="text-sm text-[var(--muted-foreground)]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{file.deletedBy}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{file.deletedDate}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#d97706" }}>{file.expiresIn}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                        <RotateCcw className="h-3 w-3" /> Restore
                      </button>
                      <button className="inline-flex items-center gap-1 text-xs hover:underline" style={{ color: "#dc2626" }}>
                        <XCircle className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
