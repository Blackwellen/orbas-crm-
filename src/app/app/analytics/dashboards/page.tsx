"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Star, BarChart3, LayoutDashboard } from "lucide-react"

const allDashboards = [
  { id: "1", name: "Revenue Overview",      owner: "Alex Turner",    lastViewed: "2h ago",    widgets: 8,  pinned: true,  shared: true },
  { id: "2", name: "Sales Performance",     owner: "Sarah Mitchell", lastViewed: "Yesterday", widgets: 12, pinned: true,  shared: true },
  { id: "3", name: "Customer Health",       owner: "James Park",     lastViewed: "3 days ago",widgets: 6,  pinned: false, shared: true },
  { id: "4", name: "Marketing Attribution", owner: "Chloe Evans",    lastViewed: "1 week ago",widgets: 9,  pinned: false, shared: false },
  { id: "5", name: "Support Operations",    owner: "Tom Bradley",    lastViewed: "2 weeks ago",widgets: 7, pinned: false, shared: true },
  { id: "6", name: "HR Metrics",            owner: "Me",             lastViewed: "3 weeks ago",widgets: 5, pinned: false, shared: false },
  { id: "7", name: "Finance Dashboard",     owner: "Me",             lastViewed: "1 month ago",widgets: 10,pinned: false, shared: false },
  { id: "8", name: "Pipeline Snapshot",     owner: "Alex Turner",    lastViewed: "Just now",  widgets: 4,  pinned: false, shared: true },
]

type FilterTab = "all" | "mine" | "shared"

export default function DashboardsPage() {
  const [filter, setFilter] = useState<FilterTab>("all")
  const [starred, setStarred] = useState<Set<string>>(new Set(["1","2"]))

  const filtered = allDashboards.filter(d => {
    if (filter === "mine") return d.owner === "Me"
    if (filter === "shared") return d.shared
    return true
  })

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboards</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Browse and manage your analytics dashboards</p>
        </div>
        <Link
          href="/app/analytics/dashboards/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Dashboard
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {(["all","mine","shared"] as FilterTab[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${
              filter === f
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {f === "all" ? "All" : f === "mine" ? "Mine" : "Shared"}
          </button>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(d => (
          <div key={d.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden hover:shadow-md transition-shadow group">
            {/* Thumbnail */}
            <div className="h-32 bg-[var(--muted)] flex items-center justify-center relative">
              <LayoutDashboard className="h-10 w-10 text-[var(--muted-foreground)] opacity-40" />
              <button
                onClick={() => setStarred(prev => {
                  const next = new Set(prev)
                  next.has(d.id) ? next.delete(d.id) : next.add(d.id)
                  return next
                })}
                className="absolute top-2 right-2 p-1 rounded-md hover:bg-[var(--background)] transition-colors"
              >
                <Star className={`h-4 w-4 ${starred.has(d.id) ? "fill-amber-400 text-amber-400" : "text-[var(--muted-foreground)]"}`} />
              </button>
              {d.pinned && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-semibold">Pinned</span>
              )}
            </div>
            <div className="p-4">
              <Link href={`/app/analytics/dashboards/${d.id}`} className="block">
                <h3 className="font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">{d.name}</h3>
              </Link>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">by {d.owner}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                  <BarChart3 className="h-3.5 w-3.5" />
                  {d.widgets} widgets
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">{d.lastViewed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
