"use client"

import React, { useState } from "react"
import { Plus, RefreshCw, Database } from "lucide-react"

const datasets = [
  { id: "1", name: "CRM Revenue",         source: "CRM",        rows: "142,840", lastRefresh: "10 Jun 2026 08:00", schedule: "Daily 08:00",   status: "active" },
  { id: "2", name: "Sales Pipeline",      source: "CRM",        rows: "8,412",   lastRefresh: "10 Jun 2026 08:00", schedule: "Hourly",        status: "active" },
  { id: "3", name: "Customer Cohorts",    source: "CRM",        rows: "24,100",  lastRefresh: "9 Jun 2026 22:00",  schedule: "Daily 22:00",   status: "active" },
  { id: "4", name: "P&L Monthly",         source: "Accounting", rows: "3,600",   lastRefresh: "1 Jun 2026 00:01",  schedule: "Monthly",       status: "active" },
  { id: "5", name: "Invoices",            source: "Accounting", rows: "18,240",  lastRefresh: "10 Jun 2026 06:00", schedule: "Daily 06:00",   status: "active" },
  { id: "6", name: "Headcount History",   source: "People",     rows: "1,850",   lastRefresh: "3 Jun 2026 09:00",  schedule: "Weekly Mon",    status: "active" },
  { id: "7", name: "Support Tickets",     source: "Service",    rows: "52,900",  lastRefresh: "10 Jun 2026 07:00", schedule: "Hourly",        status: "active" },
  { id: "8", name: "Website Analytics",   source: "External",   rows: "890,000", lastRefresh: "10 Jun 2026 09:00", schedule: "Every 6 hours", status: "paused" },
]

const sourceColors: Record<string, string> = {
  CRM:        "bg-blue-100 text-blue-700",
  Accounting: "bg-emerald-100 text-emerald-700",
  People:     "bg-violet-100 text-violet-700",
  Service:    "bg-amber-100 text-amber-700",
  External:   "bg-slate-100 text-slate-700",
}

export default function DatasetsPage() {
  const [search, setSearch] = useState("")
  const filtered = datasets.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Datasets</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage data sources and refresh schedules</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" />
          Create Dataset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Datasets", value: "8" },
          { label: "Total Rows",     value: "1.18M" },
          { label: "Active Syncs",   value: "7" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{s.value}</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search datasets..."
        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] w-full max-w-xs placeholder:text-[var(--muted-foreground)]"
      />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Source</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Rows</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Last Refreshed</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Schedule</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(ds => (
              <tr key={ds.id} className="hover:bg-[var(--muted)] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span className="font-medium text-[var(--foreground)]">{ds.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sourceColors[ds.source] || "bg-slate-100 text-slate-700"}`}>
                    {ds.source}
                  </span>
                </td>
                <td className="px-5 py-4 text-[var(--muted-foreground)]">{ds.rows}</td>
                <td className="px-5 py-4 text-[var(--muted-foreground)] text-xs">{ds.lastRefresh}</td>
                <td className="px-5 py-4 text-[var(--muted-foreground)] text-xs">{ds.schedule}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ds.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {ds.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                    <RefreshCw className="h-3.5 w-3.5" />Refresh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
