"use client"

import React, { useState } from "react"
import { FileText, FileImage, File, Users, Eye, Edit2, XCircle, Search, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const SHARED_FILES = [
  { id: 1, name: "Enterprise Services Agreement — DataVault Ltd.pdf", type: "pdf", owner: "Jordan Clarke", sharedBy: "Jordan Clarke", sharedDate: "10 Jun 2026", access: "Edit", ownerAvatar: "JC" },
  { id: 2, name: "Q2 2026 Marketing Strategy.pptx", type: "pptx", owner: "Me", sharedBy: "Sara Collins", sharedDate: "8 Jun 2026", access: "View", ownerAvatar: "SC" },
  { id: 3, name: "Product Roadmap H2 2026.xlsx", type: "xlsx", owner: "Daniel Walsh", sharedBy: "Daniel Walsh", sharedDate: "7 Jun 2026", access: "View", ownerAvatar: "DW" },
  { id: 4, name: "Onboarding Guide v3.1.pdf", type: "pdf", owner: "Priya Mehta", sharedBy: "Priya Mehta", sharedDate: "5 Jun 2026", access: "Edit", ownerAvatar: "PM" },
  { id: 5, name: "FY2026 Budget Projection.xlsx", type: "xlsx", owner: "Me", sharedBy: "Layla Hassan", sharedDate: "3 Jun 2026", access: "View", ownerAvatar: "LH" },
  { id: 6, name: "Brand Assets 2026.png", type: "png", owner: "Tom Okafor", sharedBy: "Tom Okafor", sharedDate: "1 Jun 2026", access: "View", ownerAvatar: "TO" },
  { id: 7, name: "Software NDA Template.docx", type: "docx", owner: "Me", sharedBy: "James Hartley", sharedDate: "30 May 2026", access: "Edit", ownerAvatar: "JH" },
  { id: 8, name: "Competitor Analysis Q2.pdf", type: "pdf", owner: "Ellie Brooks", sharedBy: "Ellie Brooks", sharedDate: "28 May 2026", access: "View", ownerAvatar: "EB" },
]

const typeConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  pdf:  { color: "#dc2626", bg: "#fef2f2", icon: FileText },
  docx: { color: "#1a56db", bg: "#eff6ff", icon: FileText },
  xlsx: { color: "#16a34a", bg: "#f0fdf4", icon: FileText },
  pptx: { color: "#d97706", bg: "#fffbeb", icon: FileText },
  png:  { color: "#06b6d4", bg: "#ecfeff", icon: FileImage },
}

const accessConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  Edit: { color: "#1a56db", bg: "#eff6ff", icon: Edit2 },
  View: { color: "#6b7280", bg: "#f3f4f6", icon: Eye },
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

export default function SharedPage() {
  const [search, setSearch] = useState("")
  const [accessFilter, setAccessFilter] = useState("All")

  const filtered = SHARED_FILES.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.sharedBy.toLowerCase().includes(search.toLowerCase())
    const matchAccess = accessFilter === "All" || f.access === accessFilter
    return matchSearch && matchAccess
  })

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Shared With Me</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Files that others have shared with you</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3 py-1.5 text-xs text-[var(--muted-foreground)]">
            <Users className="h-3.5 w-3.5" /> {SHARED_FILES.length} files shared
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search shared files..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
        </div>
        <div className="flex gap-2">
          {["All", "View", "Edit"].map(f => (
            <button key={f} onClick={() => setAccessFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                accessFilter === f ? "text-white" : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
              style={accessFilter === f ? { background: "var(--primary)" } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Shared By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Date Shared</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Access Level</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(file => {
                  const ac = accessConfig[file.access]
                  const AccessIcon = ac.icon
                  return (
                    <tr key={file.id} className="hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileIcon type={file.type} />
                          <span className="text-sm font-medium text-[var(--foreground)] max-w-xs truncate">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[9px]" style={{ background: "var(--primary)", color: "white" }}>
                              {file.ownerAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-[var(--foreground)]">{file.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{file.sharedBy}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                          <Clock className="h-3 w-3" /> {file.sharedDate}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ color: ac.color, background: ac.bg }}>
                          <AccessIcon className="h-3 w-3" />
                          {file.access}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                            <Eye className="h-3 w-3" /> Open
                          </button>
                          <button className="inline-flex items-center gap-1 text-xs hover:underline" style={{ color: "#dc2626" }}>
                            <XCircle className="h-3 w-3" /> Revoke
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-[var(--muted-foreground)]">
                      No shared files found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
