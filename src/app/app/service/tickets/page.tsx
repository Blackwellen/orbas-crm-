"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Plus, Search, Filter, Download, ChevronDown,
  CheckSquare, Ticket, Clock, User
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ALL_TICKETS = [
  { id: 2041, subject: "Cannot access admin dashboard after 2FA reset",       customer: "DataVault Ltd",       priority: "Critical", status: "Open",        agent: "Priya Mehta",   queue: "Enterprise",  created: "10 Jun 2026", sla: "breached" },
  { id: 2040, subject: "API rate limiting returns 429 on valid credentials",  customer: "Fintech Corp Ltd",    priority: "High",     status: "In Progress", agent: "James Hartley", queue: "Technical",   created: "10 Jun 2026", sla: "warning" },
  { id: 2039, subject: "Password reset email not arriving",                   customer: "Noah Simmons",        priority: "Medium",   status: "Pending",     agent: "Sara Collins",  queue: "General",     created: "9 Jun 2026",  sla: "ok" },
  { id: 2038, subject: "Billing discrepancy on May invoice",                  customer: "Oakfield Media",      priority: "High",     status: "Resolved",    agent: "Priya Mehta",   queue: "Billing",     created: "9 Jun 2026",  sla: "ok" },
  { id: 2037, subject: "Dashboard charts not loading on mobile",              customer: "BlueWave Digital",    priority: "Medium",   status: "Open",        agent: "Tom Okafor",    queue: "Technical",   created: "9 Jun 2026",  sla: "ok" },
  { id: 2036, subject: "Export to CSV producing corrupted files",             customer: "Prism Analytics",     priority: "High",     status: "In Progress", agent: "James Hartley", queue: "Technical",   created: "8 Jun 2026",  sla: "warning" },
  { id: 2035, subject: "SAML SSO configuration not applying",                 customer: "Vertex Solutions",    priority: "Critical", status: "Open",        agent: "Ellie Brooks",  queue: "Enterprise",  created: "8 Jun 2026",  sla: "breached" },
  { id: 2034, subject: "User import CSV fails at row 247",                    customer: "Sandstone Corp",      priority: "Medium",   status: "Pending",     agent: "Sara Collins",  queue: "General",     created: "8 Jun 2026",  sla: "ok" },
  { id: 2033, subject: "Notification preferences not saving",                 customer: "Emily Watts",         priority: "Low",      status: "Open",        agent: "Ellie Brooks",  queue: "General",     created: "7 Jun 2026",  sla: "ok" },
  { id: 2032, subject: "Webhook events not firing on deal close",             customer: "TechGrid Ltd",        priority: "High",     status: "In Progress", agent: "Priya Mehta",   queue: "Technical",   created: "7 Jun 2026",  sla: "ok" },
  { id: 2031, subject: "Duplicate contacts appearing after import",           customer: "NovaBuild Group",     priority: "Medium",   status: "Open",        agent: "Tom Okafor",    queue: "General",     created: "7 Jun 2026",  sla: "ok" },
  { id: 2030, subject: "Report scheduling not sending emails",                customer: "Crestview Labs",      priority: "Medium",   status: "Resolved",    agent: "James Hartley", queue: "General",     created: "6 Jun 2026",  sla: "ok" },
  { id: 2029, subject: "Custom domain SSL certificate expired",               customer: "Hartfield & Co",      priority: "Critical", status: "Closed",      agent: "Sara Collins",  queue: "Enterprise",  created: "6 Jun 2026",  sla: "ok" },
  { id: 2028, subject: "Team member cannot be assigned to deal",              customer: "Marcus Allen",        priority: "Low",      status: "Pending",     agent: "Ellie Brooks",  queue: "General",     created: "5 Jun 2026",  sla: "ok" },
  { id: 2027, subject: "Slow page load on contacts list (>3s)",               customer: "Bright Logistics",    priority: "Medium",   status: "Closed",      agent: "Tom Okafor",    queue: "Technical",   created: "5 Jun 2026",  sla: "ok" },
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

const slaLabel: Record<string, string> = {
  ok:       "On Track",
  warning:  "At Risk",
  breached: "Breached",
}

const STATUSES = ["All", "Open", "In Progress", "Pending", "Resolved", "Closed"]
const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"]
const QUEUES = ["All", "Enterprise", "Technical", "General", "Billing"]

export default function TicketsPage() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get("status") || "All"

  const [search, setSearch]       = useState("")
  const [status, setStatus]       = useState(statusFilter === "open" ? "Open" : "All")
  const [priority, setPriority]   = useState("All")
  const [queue, setQueue]         = useState("All")
  const [selected, setSelected]   = useState<number[]>([])
  const [tickets, setTickets]     = useState<any[]>(ALL_TICKETS)
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("tickets").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setTickets(data.map(t => ({
          ...t,
          subject: t.subject ?? t.title,
          customer: t.customer ?? t.contact_id ?? "",
          agent: t.agent ?? t.assignee_id ?? "",
          queue: t.queue ?? t.category ?? "",
          created: t.created ?? (t.created_at ? new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""),
          sla: t.sla ?? "ok",
        })))
      })
  }, [])

  const filtered = tickets.filter(t => {
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.customer.toLowerCase().includes(search.toLowerCase())) return false
    if (status !== "All" && t.status !== status) return false
    if (priority !== "All" && t.priority !== priority) return false
    if (queue !== "All" && t.queue !== queue) return false
    return true
  })

  function toggleSelect(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(prev => prev.length === filtered.length ? [] : filtered.map(t => t.id))
  }

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">All Tickets</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{filtered.length} tickets · Showing {status === "All" ? "all statuses" : status}{loading ? " · Loading…" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Download className="h-4 w-4" /> Export
          </button>
          <Link
            href="/app/service/tickets/new"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New Ticket
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-[var(--border)]">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={queue} onChange={e => setQueue(e.target.value)}
              className="border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {QUEUES.map(q => <option key={q}>{q}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 rounded-md bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-4 py-2.5">
          <CheckSquare className="h-4 w-4 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--primary)]">{selected.length} selected</span>
          <div className="flex items-center gap-2 ml-4">
            <button className="text-xs text-[var(--foreground)] hover:text-[var(--primary)] border border-[var(--border)] rounded px-2 py-1">Assign</button>
            <button className="text-xs text-[var(--foreground)] hover:text-[var(--primary)] border border-[var(--border)] rounded px-2 py-1">Change Priority</button>
            <button className="text-xs text-red-600 hover:text-red-700 border border-red-200 rounded px-2 py-1">Close</button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                <th className="px-4 py-3 text-left w-8">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll} className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">#ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Queue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(ticket => (
                <tr key={ticket.id} className="hover:bg-[var(--secondary)] transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(ticket.id)}
                      onChange={() => toggleSelect(ticket.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] font-mono">#{ticket.id}</td>
                  <td className="px-4 py-3 max-w-[280px]">
                    <Link href={`/app/service/tickets/${ticket.id}`}
                      className="font-medium text-[var(--primary)] hover:underline line-clamp-1">
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs whitespace-nowrap">{ticket.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                          {ticket.agent.split(" ").map((n: any) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">{ticket.agent}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{ticket.queue}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{ticket.created}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${slaStyle[ticket.sla]}`}>
                      {slaLabel[ticket.sla]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Ticket className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
              <p className="text-sm font-medium text-[var(--foreground)]">No tickets found</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
