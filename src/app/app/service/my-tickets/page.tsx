"use client"

import React, { useState } from "react"
import Link from "next/link"
import { User, Plus, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const MY_TICKETS = [
  { id: 2041, subject: "Cannot access admin dashboard after 2FA reset",      customer: "DataVault Ltd",     priority: "Critical", status: "Open",        created: "10 Jun 2026", sla: "breached" },
  { id: 2040, subject: "API rate limiting returns 429 on valid credentials", customer: "Fintech Corp Ltd",  priority: "High",     status: "In Progress", created: "10 Jun 2026", sla: "warning" },
  { id: 2036, subject: "Export to CSV producing corrupted files",            customer: "Prism Analytics",   priority: "High",     status: "In Progress", created: "8 Jun 2026",  sla: "warning" },
  { id: 2032, subject: "Webhook events not firing on deal close",            customer: "TechGrid Ltd",      priority: "High",     status: "In Progress", created: "7 Jun 2026",  sla: "ok" },
  { id: 2039, subject: "Password reset email not arriving",                  customer: "Noah Simmons",      priority: "Medium",   status: "Pending",     created: "9 Jun 2026",  sla: "ok" },
  { id: 2034, subject: "User import CSV fails at row 247",                   customer: "Sandstone Corp",    priority: "Medium",   status: "Pending",     created: "8 Jun 2026",  sla: "ok" },
  { id: 2037, subject: "Dashboard charts not loading on mobile",             customer: "BlueWave Digital",  priority: "Medium",   status: "Open",        created: "9 Jun 2026",  sla: "ok" },
  { id: 2031, subject: "Duplicate contacts appearing after import",          customer: "NovaBuild Group",   priority: "Medium",   status: "Open",        created: "7 Jun 2026",  sla: "ok" },
  { id: 2028, subject: "Team member cannot be assigned to deal",             customer: "Marcus Allen",      priority: "Low",      status: "Pending",     created: "5 Jun 2026",  sla: "ok" },
  { id: 2033, subject: "Notification preferences not saving",                customer: "Emily Watts",       priority: "Low",      status: "Open",        created: "7 Jun 2026",  sla: "ok" },
  { id: 2038, subject: "Billing discrepancy on May invoice",                 customer: "Oakfield Media",    priority: "High",     status: "Resolved",    created: "9 Jun 2026",  sla: "ok" },
  { id: 2030, subject: "Report scheduling not sending emails",               customer: "Crestview Labs",    priority: "Medium",   status: "Resolved",    created: "6 Jun 2026",  sla: "ok" },
]

const priorityStyle: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High:     "bg-orange-100 text-orange-700",
  Medium:   "bg-amber-100 text-amber-700",
  Low:      "bg-slate-100 text-slate-600",
}

const statusStyle: Record<string, string> = {
  "Open":        "bg-blue-100 text-blue-700",
  "In Progress": "bg-violet-100 text-violet-700",
  "Pending":     "bg-amber-100 text-amber-700",
  "Resolved":    "bg-emerald-100 text-emerald-700",
  "Closed":      "bg-slate-100 text-slate-600",
}

const slaStyle: Record<string, string> = {
  ok:       "bg-emerald-100 text-emerald-700",
  warning:  "bg-amber-100 text-amber-700",
  breached: "bg-red-100 text-red-700",
}
const slaLabel: Record<string, string> = { ok: "On Track", warning: "At Risk", breached: "Breached" }

const STATUSES = ["All", "Open", "In Progress", "Pending", "Resolved", "Closed"]

export default function MyTicketsPage() {
  const [search, setSearch]   = useState("")
  const [status, setStatus]   = useState("All")

  const open       = MY_TICKETS.filter(t => ["Open", "In Progress"].includes(t.status)).length
  const pending    = MY_TICKETS.filter(t => t.status === "Pending").length
  const resolved   = MY_TICKETS.filter(t => t.status === "Resolved").length
  const breached   = MY_TICKETS.filter(t => t.sla === "breached").length

  const filtered = MY_TICKETS.filter(t => {
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase())) return false
    if (status !== "All" && t.status !== status) return false
    return true
  })

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <User className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">My Tickets</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Assigned to you · Priya Mehta</p>
          </div>
        </div>
        <Link href="/app/service/tickets/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" /> New Ticket
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Open / Active", value: open,    color: "text-blue-600",    bg: "bg-blue-50" },
          { label: "Pending",       value: pending,  color: "text-amber-600",   bg: "bg-amber-50" },
          { label: "Resolved",      value: resolved, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "SLA Breached",  value: breached, color: "text-red-600",     bg: "bg-red-50" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)] font-medium">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search my tickets…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
        </div>
        <div className="flex gap-1">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${status === s ? "bg-[var(--primary)] text-white" : "border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">#ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-[var(--muted-foreground)]">#{t.id}</td>
                  <td className="px-4 py-3 max-w-[320px]">
                    <Link href={`/app/service/tickets/${t.id}`} className="font-medium text-[var(--primary)] hover:underline line-clamp-1">{t.subject}</Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{t.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[t.priority]}`}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{t.created}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${slaStyle[t.sla]}`}>{slaLabel[t.sla]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
