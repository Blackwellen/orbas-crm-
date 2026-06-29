"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BookOpen, Search, Plus, Eye, ThumbsUp, Edit2, FileText,
  ChevronRight, TrendingUp, Star, Globe, FolderOpen
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CATEGORIES = [
  { id: "all", label: "All Articles", count: 48 },
  { id: "getting-started", label: "Getting Started", count: 12 },
  { id: "account-billing", label: "Account & Billing", count: 8 },
  { id: "technical", label: "Technical", count: 14 },
  { id: "integrations", label: "Integrations", count: 7 },
  { id: "faq", label: "FAQ", count: 7 },
]

const ARTICLES = [
  { id: "1001", title: "How to reset your two-factor authentication", category: "getting-started", categoryLabel: "Getting Started", views: 4821, helpful: 94, author: "Priya Mehta", updated: "9 Jun 2026", status: "Published" },
  { id: "1002", title: "Setting up SSO with SAML 2.0", category: "technical", categoryLabel: "Technical", views: 3104, helpful: 88, author: "James Hartley", updated: "8 Jun 2026", status: "Published" },
  { id: "1003", title: "Understanding your monthly invoice", category: "account-billing", categoryLabel: "Account & Billing", views: 2874, helpful: 91, author: "Sara Collins", updated: "7 Jun 2026", status: "Published" },
  { id: "1004", title: "Connecting Slack to your workspace", category: "integrations", categoryLabel: "Integrations", views: 2211, helpful: 87, author: "Tom Okafor", updated: "6 Jun 2026", status: "Published" },
  { id: "1005", title: "Getting started with the mobile app", category: "getting-started", categoryLabel: "Getting Started", views: 1998, helpful: 90, author: "Ellie Brooks", updated: "5 Jun 2026", status: "Published" },
  { id: "1006", title: "How to export your data to CSV", category: "technical", categoryLabel: "Technical", views: 1762, helpful: 83, author: "Priya Mehta", updated: "4 Jun 2026", status: "Published" },
  { id: "1007", title: "Understanding SLA policies and breach escalation", category: "technical", categoryLabel: "Technical", views: 1540, helpful: 89, author: "James Hartley", updated: "3 Jun 2026", status: "Published" },
  { id: "1008", title: "Zapier integration guide", category: "integrations", categoryLabel: "Integrations", views: 1432, helpful: 85, author: "Sara Collins", updated: "2 Jun 2026", status: "Draft" },
  { id: "1009", title: "Frequently asked questions about data retention", category: "faq", categoryLabel: "FAQ", views: 1287, helpful: 82, author: "Tom Okafor", updated: "1 Jun 2026", status: "Published" },
  { id: "1010", title: "Custom roles and permission management", category: "account-billing", categoryLabel: "Account & Billing", views: 1104, helpful: 79, author: "Ellie Brooks", updated: "31 May 2026", status: "Under Review" },
  { id: "1011", title: "Troubleshooting API authentication errors", category: "technical", categoryLabel: "Technical", views: 987, helpful: 86, author: "Priya Mehta", updated: "30 May 2026", status: "Published" },
  { id: "1012", title: "How to invite team members", category: "getting-started", categoryLabel: "Getting Started", views: 876, helpful: 93, author: "James Hartley", updated: "29 May 2026", status: "Published" },
]

const kpis = [
  { label: "Total Articles", value: "48", icon: FileText, color: "#1a56db" },
  { label: "Published", value: "39", icon: Globe, color: "#16a34a" },
  { label: "Avg Helpful Rating", value: "87%", icon: ThumbsUp, color: "#06b6d4" },
  { label: "Total Views", value: "28.4K", icon: Eye, color: "#d97706" },
]

const statusColor: Record<string, { color: string; bg: string }> = {
  "Published":    { color: "#16a34a", bg: "#f0fdf4" },
  "Draft":        { color: "#d97706", bg: "#fffbeb" },
  "Under Review": { color: "#1a56db", bg: "#eff6ff" },
}

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = ARTICLES.filter(a => {
    const matchCat = activeCategory === "all" || a.category === activeCategory
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.categoryLabel.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Knowledge Base</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Self-service articles and guides for customers and agents</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg" style={{ background: k.color + "18" }}>
                <k.icon className="h-5 w-5" style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
        />
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Category Sidebar */}
        <div className="w-52 shrink-0">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                    activeCategory === cat.id
                      ? "text-[var(--primary)] font-semibold bg-[var(--primary)]/8"
                      : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                    {cat.label}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">{cat.count}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Articles Table */}
        <div className="flex-1 min-w-0">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Category</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Views</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Helpful %</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Author</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Updated</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filtered.map(article => {
                      const sc = statusColor[article.status]
                      return (
                        <tr key={article.id} className="hover:bg-[var(--secondary)] transition-colors">
                          <td className="px-4 py-3">
                            <Link
                              href={`/app/service/knowledge-base/${article.id}`}
                              className="font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-2"
                            >
                              <BookOpen className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
                              {article.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                              {article.categoryLabel}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">
                            <span className="flex items-center justify-end gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="flex items-center justify-end gap-1 font-medium" style={{ color: article.helpful >= 90 ? "#16a34a" : article.helpful >= 80 ? "#d97706" : "#dc2626" }}>
                              <ThumbsUp className="h-3 w-3" />
                              {article.helpful}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[var(--muted-foreground)]">{article.author}</td>
                          <td className="px-4 py-3 text-[var(--muted-foreground)]">{article.updated}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{ color: sc.color, background: sc.bg }}>
                              {article.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Link href={`/app/service/knowledge-base/${article.id}`}
                              className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                              <Edit2 className="h-3 w-3" /> Edit
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-sm text-[var(--muted-foreground)]">
                          No articles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
