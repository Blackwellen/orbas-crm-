"use client"

import React, { useState } from "react"
import {
  FolderOpen, FileText, FileImage, File, Plus, Upload, Grid3X3, List,
  ChevronRight, Users, Clock, HardDrive, MoreHorizontal, Search, Star
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const FOLDERS = [
  { id: "root", label: "My Documents", children: [
    { id: "contracts", label: "Contracts", children: [] },
    { id: "invoices",  label: "Invoices",  children: [] },
    { id: "hr",        label: "HR Docs",   children: [] },
    { id: "marketing", label: "Marketing", children: [] },
    { id: "legal",     label: "Legal",     children: [] },
  ]},
  { id: "shared", label: "Shared", children: [] },
]

type FileItem = {
  id: number; name: string; type: "pdf" | "docx" | "xlsx" | "png" | "pptx"
  folder: string; modified: string; size: string; shared: boolean; starred: boolean
}

const FILES: FileItem[] = [
  { id: 1, name: "Enterprise Services Agreement — DataVault Ltd.pdf", type: "pdf", folder: "contracts", modified: "10 Jun 2026", size: "2.4 MB", shared: true, starred: true },
  { id: 2, name: "Q2 2026 Invoice — Apex Analytics.pdf", type: "pdf", folder: "invoices", modified: "9 Jun 2026", size: "0.8 MB", shared: false, starred: false },
  { id: 3, name: "Employee Handbook v4.2.docx", type: "docx", folder: "hr", modified: "7 Jun 2026", size: "1.1 MB", shared: true, starred: false },
  { id: 4, name: "Product Launch Deck — June 2026.pptx", type: "pptx", folder: "marketing", modified: "5 Jun 2026", size: "8.7 MB", shared: true, starred: false },
  { id: 5, name: "NDA — ClearCloud Inc.pdf", type: "pdf", folder: "legal", modified: "3 Jun 2026", size: "0.4 MB", shared: false, starred: true },
  { id: 6, name: "FY2026 Budget Projection.xlsx", type: "xlsx", folder: "contracts", modified: "1 Jun 2026", size: "3.2 MB", shared: false, starred: false },
  { id: 7, name: "Brand Guidelines 2026.pdf", type: "pdf", folder: "marketing", modified: "28 May 2026", size: "12.1 MB", shared: true, starred: false },
  { id: 8, name: "Onboarding Checklist.docx", type: "docx", folder: "hr", modified: "25 May 2026", size: "0.2 MB", shared: false, starred: false },
]

const RECENT = FILES.slice(0, 4)

const typeConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  pdf:  { color: "#dc2626", bg: "#fef2f2", icon: FileText },
  docx: { color: "#1a56db", bg: "#eff6ff", icon: FileText },
  xlsx: { color: "#16a34a", bg: "#f0fdf4", icon: FileText },
  pptx: { color: "#d97706", bg: "#fffbeb", icon: FileText },
  png:  { color: "#06b6d4", bg: "#ecfeff", icon: FileImage },
}

function FileIcon({ type }: { type: string }) {
  const cfg = typeConfig[type] ?? { color: "#6b7280", bg: "#f3f4f6", icon: File }
  const Icon = cfg.icon
  return (
    <div className="p-2 rounded-lg shrink-0" style={{ background: cfg.bg }}>
      <Icon className="h-4 w-4" style={{ color: cfg.color }} />
    </div>
  )
}

export default function DocumentsPage() {
  const [view, setView] = useState<"grid" | "list">("list")
  const [activeFolder, setActiveFolder] = useState("root")
  const [search, setSearch] = useState("")

  const displayFiles = FILES.filter(f => {
    const matchFolder = activeFolder === "root" || f.folder === activeFolder
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    return matchFolder && matchSearch
  })

  const usedGB = 4.2
  const totalGB = 50

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Documents</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage and organise your files</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Upload className="h-4 w-4" /> Upload File
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <FolderOpen className="h-4 w-4" /> New Folder
          </button>
          <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
            <Plus className="h-4 w-4" /> New Document
          </button>
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Files</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {RECENT.map(file => (
            <Card key={file.id} className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer">
              <CardContent className="p-3 flex items-center gap-3">
                <FileIcon type={file.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--foreground)] truncate">{file.name}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{file.modified} · {file.size}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-5">
        {/* Folder Sidebar */}
        <div className="w-52 shrink-0">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-2">
              {FOLDERS.map(folder => (
                <div key={folder.id}>
                  <button
                    onClick={() => setActiveFolder(folder.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${activeFolder === folder.id ? "font-semibold" : "text-[var(--foreground)] hover:bg-[var(--secondary)]"}`}
                    style={activeFolder === folder.id ? { color: "var(--primary)", background: "var(--primary)" + "12" } : {}}>
                    <FolderOpen className="h-4 w-4 shrink-0" />
                    {folder.label}
                  </button>
                  {folder.children.map(child => (
                    <button key={child.id} onClick={() => setActiveFolder(child.id)}
                      className={`w-full flex items-center gap-2 pl-7 pr-3 py-1.5 rounded-md text-xs transition-colors ${activeFolder === child.id ? "font-semibold" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"}`}
                      style={activeFolder === child.id ? { color: "var(--primary)", background: "var(--primary)" + "10" } : {}}>
                      <ChevronRight className="h-3 w-3 shrink-0" />
                      {child.label}
                    </button>
                  ))}
                </div>
              ))}

              {/* Storage Bar */}
              <div className="mt-4 px-3 pt-3 border-t border-[var(--border)]">
                <p className="text-[10px] text-[var(--muted-foreground)] mb-1.5">
                  <HardDrive className="h-3 w-3 inline mr-1" />
                  {usedGB} GB / {totalGB} GB used
                </p>
                <div className="rounded-full overflow-hidden" style={{ background: "var(--secondary)", height: 5 }}>
                  <div className="h-full rounded-full" style={{ width: `${(usedGB / totalGB) * 100}%`, background: "var(--primary)" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Browser */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Breadcrumb + Controls */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
              <span>My Documents</span>
              {activeFolder !== "root" && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-[var(--foreground)] font-medium capitalize">{activeFolder}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search files..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none w-44" />
              </div>
              <div className="flex items-center border border-[var(--border)] rounded-md overflow-hidden">
                <button onClick={() => setView("list")}
                  className={`p-1.5 transition-colors ${view === "list" ? "text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}
                  style={view === "list" ? { background: "var(--primary)" } : {}}>
                  <List className="h-4 w-4" />
                </button>
                <button onClick={() => setView("grid")}
                  className={`p-1.5 transition-colors ${view === "grid" ? "text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}
                  style={view === "grid" ? { background: "var(--primary)" } : {}}>
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {view === "list" ? (
            <Card className="border border-[var(--border)]">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Modified</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Size</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--muted-foreground)]">Shared</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {displayFiles.map(file => (
                      <tr key={file.id} className="hover:bg-[var(--secondary)] transition-colors cursor-pointer">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <FileIcon type={file.type} />
                            <span className="text-sm font-medium text-[var(--foreground)] max-w-xs truncate">{file.name}</span>
                            {file.starred && <Star className="h-3 w-3 fill-current shrink-0" style={{ color: "#d97706" }} />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {file.modified}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-[var(--muted-foreground)]">{file.size}</td>
                        <td className="px-4 py-3 text-center">
                          {file.shared && <Users className="h-3.5 w-3.5 inline" style={{ color: "#1a56db" }} />}
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)]">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {displayFiles.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-sm text-[var(--muted-foreground)]">
                          No files found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {displayFiles.map(file => (
                <Card key={file.id} className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <FileIcon type={file.type} />
                      <button className="p-1 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)]">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-tight">{file.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-1">{file.modified} · {file.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.shared && (
                        <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: "#1a56db" }}>
                          <Users className="h-2.5 w-2.5" /> Shared
                        </span>
                      )}
                      {file.starred && <Star className="h-3 w-3 fill-current ml-auto" style={{ color: "#d97706" }} />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
