"use client"

import React, { useState } from "react"
import { Search, Filter, Download } from "lucide-react"

const auditLogs = [
  { id: "1",  actor: "Sarah Mitchell", action: "Updated",  resource: "Deal: Enterprise Contract Q4",   module: "CRM",        ip: "82.132.0.1",   time: "Today 11:42" },
  { id: "2",  actor: "Alex Turner",    action: "Created",  resource: "Invoice: INV-2025-1842",          module: "Accounting", ip: "82.132.0.2",   time: "Today 11:38" },
  { id: "3",  actor: "James Park",     action: "Deleted",  resource: "Lead: John Smith",                module: "CRM",        ip: "82.132.0.5",   time: "Today 11:20" },
  { id: "4",  actor: "Admin",          action: "Logged In",resource: "Authentication",                  module: "Auth",       ip: "185.45.12.3",  time: "Today 11:15" },
  { id: "5",  actor: "Chloe Evans",    action: "Exported", resource: "Customer List (CSV)",             module: "Analytics",  ip: "82.132.0.8",   time: "Today 10:58" },
  { id: "6",  actor: "Tom Bradley",    action: "Updated",  resource: "Employee: Maria Santos",          module: "People",     ip: "82.132.0.3",   time: "Today 10:44" },
  { id: "7",  actor: "Sarah Mitchell", action: "Created",  resource: "Ticket: #TKT-8821",              module: "Service",    ip: "82.132.0.1",   time: "Today 10:30" },
  { id: "8",  actor: "Alex Turner",    action: "Posted",   resource: "Journal Entry: JE-2025-0842",    module: "Accounting", ip: "82.132.0.2",   time: "Today 10:12" },
  { id: "9",  actor: "System",         action: "Synced",   resource: "Bank Statement: Lloyds Current",  module: "Accounting", ip: "System",       time: "Today 10:00" },
  { id: "10", actor: "James Park",     action: "Updated",  resource: "Project: Website Redesign",      module: "Projects",   ip: "82.132.0.5",   time: "Yesterday 17:44" },
  { id: "11", actor: "Admin",          action: "Invited",  resource: "User: new.user@acme.com",         module: "Admin",      ip: "82.132.0.9",   time: "Yesterday 16:20" },
  { id: "12", actor: "Chloe Evans",    action: "Approved", resource: "Leave Request: Annual Leave (5d)",module: "People",     ip: "82.132.0.8",   time: "Yesterday 15:58" },
  { id: "13", actor: "Tom Bradley",    action: "Sent",     resource: "Invoice: INV-2025-1838",          module: "Accounting", ip: "82.132.0.3",   time: "Yesterday 14:30" },
  { id: "14", actor: "System",         action: "Triggered",resource: "Automation: Invoice Reminder",   module: "Automations",ip: "System",       time: "Yesterday 14:00" },
  { id: "15", actor: "Sarah Mitchell", action: "Updated",  resource: "Settings: Notification Prefs",   module: "Settings",   ip: "82.132.0.1",   time: "Yesterday 13:22" },
]

const actionColors: Record<string, { bg: string; color: string }> = {
  Created:   { bg: "#dcfce7", color: "#16a34a" },
  Updated:   { bg: "#dbeafe", color: "#2563eb" },
  Deleted:   { bg: "#fee2e2", color: "#dc2626" },
  Exported:  { bg: "#fef9c3", color: "#d97706" },
  "Logged In": { bg: "#f3e8ff", color: "#9333ea" },
  Posted:    { bg: "#dcfce7", color: "#16a34a" },
  Synced:    { bg: "#f3f4f6", color: "#6b7280" },
  Invited:   { bg: "#dbeafe", color: "#2563eb" },
  Approved:  { bg: "#dcfce7", color: "#16a34a" },
  Sent:      { bg: "#f3e8ff", color: "#9333ea" },
  Triggered: { bg: "#fff7ed", color: "#f59e0b" },
}

export default function AuditLogPage() {
  const [search, setSearch] = useState("")
  const [moduleFilter, setModuleFilter] = useState("All")

  const modules = ["All", "CRM", "Accounting", "People", "Projects", "Service", "Analytics", "Automations", "Admin", "Auth", "Settings"]

  const filtered = auditLogs.filter(log => {
    const matchSearch = search === "" || log.actor.toLowerCase().includes(search.toLowerCase()) || log.resource.toLowerCase().includes(search.toLowerCase())
    const matchModule = moduleFilter === "All" || log.module === moduleFilter
    return matchSearch && matchModule
  })

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Audit Log</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Complete record of all user and system actions in this workspace</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
          <Download className="h-4 w-4" /> Export Log
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search actor or resource..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--muted-foreground)]" />
          <select
            value={moduleFilter}
            onChange={e => setModuleFilter(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
          >
            {modules.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <input type="date" className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none" defaultValue="2025-12-01" />
        <span className="text-sm text-[var(--muted-foreground)]">to</span>
        <input type="date" className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none" defaultValue="2025-12-31" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Timestamp</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Actor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Action</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Resource</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Module</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(log => {
              const actionStyle = actionColors[log.action] ?? { bg: "#f3f4f6", color: "#6b7280" }
              return (
                <tr key={log.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-[var(--foreground)]">{log.actor}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: actionStyle.bg, color: actionStyle.color }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)] max-w-[280px] truncate">{log.resource}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{log.module}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] font-mono">{log.ip}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--muted-foreground)]">Showing {filtered.length} of {auditLogs.length} log entries. Logs are retained for 24 months.</p>
    </div>
  )
}
