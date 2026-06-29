"use client"

import React, { useState } from "react"
import { Plus, Search, FileText, Clock, BarChart2, Download, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TEMPLATES = [
  { id: 1, name: "Enterprise Services Agreement", category: "Contracts", lastUsed: "9 Jun 2026", usageCount: 24, tags: ["legal", "enterprise"] },
  { id: 2, name: "Software Development NDA", category: "NDA", lastUsed: "7 Jun 2026", usageCount: 18, tags: ["legal", "nda"] },
  { id: 3, name: "Consulting Proposal Template", category: "Proposals", lastUsed: "5 Jun 2026", usageCount: 31, tags: ["sales", "proposal"] },
  { id: 4, name: "Standard Invoice Template", category: "Invoices", lastUsed: "4 Jun 2026", usageCount: 67, tags: ["billing", "invoice"] },
  { id: 5, name: "Employee Offer Letter", category: "HR", lastUsed: "2 Jun 2026", usageCount: 12, tags: ["hr", "onboarding"] },
  { id: 6, name: "Data Processing Agreement", category: "Legal", lastUsed: "1 Jun 2026", usageCount: 9, tags: ["legal", "gdpr"] },
  { id: 7, name: "Marketing Campaign Brief", category: "Marketing", lastUsed: "30 May 2026", usageCount: 15, tags: ["marketing"] },
  { id: 8, name: "Vendor Onboarding Form", category: "Contracts", lastUsed: "28 May 2026", usageCount: 7, tags: ["procurement"] },
  { id: 9, name: "Performance Review Template", category: "HR", lastUsed: "25 May 2026", usageCount: 22, tags: ["hr", "review"] },
  { id: 10, name: "SaaS Subscription Agreement", category: "Contracts", lastUsed: "20 May 2026", usageCount: 11, tags: ["legal", "saas"] },
  { id: 11, name: "Press Release Template", category: "Marketing", lastUsed: "15 May 2026", usageCount: 5, tags: ["marketing", "pr"] },
  { id: 12, name: "Partnership Agreement", category: "Legal", lastUsed: "10 May 2026", usageCount: 8, tags: ["legal", "partners"] },
]

const CATEGORIES = ["All", "Contracts", "Proposals", "Invoices", "HR", "NDA", "Legal", "Marketing"]

const categoryColor: Record<string, { color: string; bg: string }> = {
  Contracts:  { color: "#1a56db", bg: "#eff6ff" },
  Proposals:  { color: "#16a34a", bg: "#f0fdf4" },
  Invoices:   { color: "#d97706", bg: "#fffbeb" },
  HR:         { color: "#7c3aed", bg: "#f5f3ff" },
  NDA:        { color: "#dc2626", bg: "#fef2f2" },
  Legal:      { color: "#374151", bg: "#f3f4f6" },
  Marketing:  { color: "#06b6d4", bg: "#ecfeff" },
}

export default function TemplatesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = TEMPLATES.filter(t => {
    const matchCat = category === "All" || t.category === category
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Document Templates</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Reusable templates for contracts, proposals, and more</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> New Template
        </button>
      </div>

      {/* Search + Category Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat ? "text-white" : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
              style={category === cat ? { background: "var(--primary)" } : {}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => {
          const cc = categoryColor[t.category] ?? { color: "#6b7280", bg: "#f3f4f6" }
          return (
            <Card key={t.id} className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
              <CardContent className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-lg" style={{ background: cc.bg }}>
                    <FileText className="h-5 w-5" style={{ color: cc.color }} />
                  </div>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ color: cc.color, background: cc.bg }}>
                    {t.category}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                      <Clock className="h-3 w-3" /> {t.lastUsed}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                      <BarChart2 className="h-3 w-3" /> {t.usageCount} uses
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-1 flex-wrap">
                  {t.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-[var(--secondary)] px-2 py-0.5 text-[10px] text-[var(--muted-foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
                    <Copy className="h-3 w-3" /> Use Template
                  </button>
                  <button className="p-1.5 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-sm text-[var(--muted-foreground)]">
            No templates found
          </div>
        )}
      </div>
    </div>
  )
}
