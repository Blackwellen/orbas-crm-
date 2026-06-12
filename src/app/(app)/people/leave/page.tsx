"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, CheckCircle, XCircle, CalendarDays, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Leave Requests", "Leave Balances", "Leave Calendar", "Leave Policies"]

const leaveRequests = [
  { id: "LR001", name: "Sophie Clarke",    dept: "Marketing",  type: "Annual Leave",    start: "17 Jun 2026", end: "21 Jun 2026", days: 5,  status: "Pending",  reason: "Family holiday" },
  { id: "LR002", name: "Aiden Foster",     dept: "Operations", type: "Sick Leave",      start: "10 Jun 2026", end: "10 Jun 2026", days: 1,  status: "Pending",  reason: "Unwell" },
  { id: "LR003", name: "Noah Campbell",    dept: "Sales",      type: "Annual Leave",    start: "24 Jun 2026", end: "28 Jun 2026", days: 5,  status: "Pending",  reason: "Vacation" },
  { id: "LR004", name: "Grace Bennett",    dept: "Finance",    type: "Parental Leave",  start: "1 Jul 2026",  end: "30 Sep 2026", days: 65, status: "Pending",  reason: "Maternity leave" },
  { id: "LR005", name: "Oliver Hughes",    dept: "Product",    type: "TOIL",            start: "14 Jun 2026", end: "14 Jun 2026", days: 1,  status: "Approved", reason: "Time off in lieu" },
  { id: "LR006", name: "Fatima Al-Zahra", dept: "Engineering",type: "Annual Leave",    start: "7 Jul 2026",  end: "11 Jul 2026", days: 5,  status: "Approved", reason: "Holiday" },
  { id: "LR007", name: "Marcus Williams", dept: "Sales",      type: "Annual Leave",    start: "14 Jul 2026", end: "18 Jul 2026", days: 5,  status: "Approved", reason: "Summer break" },
  { id: "LR008", name: "Lena Cruz",       dept: "Engineering",type: "Sick Leave",      start: "3 Jun 2026",  end: "4 Jun 2026",  days: 2,  status: "Approved", reason: "Illness" },
  { id: "LR009", name: "Ben Hughes",      dept: "Marketing",  type: "Compassionate",   start: "31 May 2026", end: "2 Jun 2026",  days: 3,  status: "Approved", reason: "Bereavement" },
  { id: "LR010", name: "Ravi Patel",      dept: "Engineering",type: "Annual Leave",    start: "21 Jul 2026", end: "1 Aug 2026",  days: 10, status: "Approved", reason: "Summer holiday" },
  { id: "LR011", name: "Katie Walsh",     dept: "Operations", type: "Study Leave",     start: "25 Jun 2026", end: "25 Jun 2026", days: 1,  status: "Rejected", reason: "CIPD exam" },
  { id: "LR012", name: "Isla Martin",     dept: "Product",    type: "Annual Leave",    start: "28 Jul 2026", end: "1 Aug 2026",  days: 5,  status: "Approved", reason: "Holiday" },
  { id: "LR013", name: "Niamh Kelly",     dept: "Finance",    type: "Annual Leave",    start: "4 Aug 2026",  end: "8 Aug 2026",  days: 5,  status: "Pending",  reason: "Family trip" },
  { id: "LR014", name: "Leon Davies",     dept: "HR",         type: "Annual Leave",    start: "11 Aug 2026", end: "15 Aug 2026", days: 5,  status: "Pending",  reason: "Holiday" },
  { id: "LR015", name: "Chloe Adams",     dept: "HR",         type: "Sick Leave",      start: "9 Jun 2026",  end: "9 Jun 2026",  days: 1,  status: "Approved", reason: "Medical appointment" },
  { id: "LR016", name: "Ryan Thompson",   dept: "Operations", type: "TOIL",            start: "20 Jun 2026", end: "20 Jun 2026", days: 1,  status: "Approved", reason: "Overtime compensation" },
  { id: "LR017", name: "Anya Singh",      dept: "Marketing",  type: "Annual Leave",    start: "4 Aug 2026",  end: "8 Aug 2026",  days: 5,  status: "Cancelled",reason: "Holiday (cancelled)" },
  { id: "LR018", name: "Sam Okafor",      dept: "Operations", type: "Annual Leave",    start: "18 Aug 2026", end: "22 Aug 2026", days: 5,  status: "Pending",  reason: "Holiday" },
  { id: "LR019", name: "Harriet Stone",   dept: "Finance",    type: "Annual Leave",    start: "25 Aug 2026", end: "29 Aug 2026", days: 5,  status: "Pending",  reason: "Holiday" },
  { id: "LR020", name: "Charlotte Davies",dept: "Operations", type: "Annual Leave",    start: "1 Sep 2026",  end: "5 Sep 2026",  days: 5,  status: "Approved", reason: "Conference" },
]

const leaveBalances = [
  { name: "Alex Thompson",   dept: "Engineering", annual: { total: 28, used: 12, remaining: 16 }, sick: { total: 10, used: 1, remaining: 9  }, toil: { total: 3,  used: 2, remaining: 1 } },
  { name: "Sophie Clarke",   dept: "Marketing",   annual: { total: 25, used: 8,  remaining: 17 }, sick: { total: 10, used: 0, remaining: 10 }, toil: { total: 0,  used: 0, remaining: 0 } },
  { name: "Aiden Foster",    dept: "Operations",  annual: { total: 25, used: 15, remaining: 10 }, sick: { total: 10, used: 2, remaining: 8  }, toil: { total: 1,  used: 0, remaining: 1 } },
  { name: "Noah Campbell",   dept: "Sales",       annual: { total: 25, used: 10, remaining: 15 }, sick: { total: 10, used: 0, remaining: 10 }, toil: { total: 2,  used: 1, remaining: 1 } },
  { name: "Lena Cruz",       dept: "Engineering", annual: { total: 28, used: 7,  remaining: 21 }, sick: { total: 10, used: 3, remaining: 7  }, toil: { total: 4,  used: 2, remaining: 2 } },
  { name: "Ravi Patel",      dept: "Engineering", annual: { total: 28, used: 5,  remaining: 23 }, sick: { total: 10, used: 0, remaining: 10 }, toil: { total: 3,  used: 3, remaining: 0 } },
  { name: "Olivia Wright",   dept: "Product",     annual: { total: 30, used: 10, remaining: 20 }, sick: { total: 10, used: 1, remaining: 9  }, toil: { total: 0,  used: 0, remaining: 0 } },
  { name: "Grace Bennett",   dept: "Finance",     annual: { total: 25, used: 20, remaining: 5  }, sick: { total: 10, used: 4, remaining: 6  }, toil: { total: 0,  used: 0, remaining: 0 } },
  { name: "Marcus Williams", dept: "Sales",       annual: { total: 25, used: 6,  remaining: 19 }, sick: { total: 10, used: 0, remaining: 10 }, toil: { total: 0,  used: 0, remaining: 0 } },
]

const policies = [
  { name: "Annual Leave",       days: 25, accrual: "Monthly",  carryover: "5 days max", notes: "Pro-rated for part-time" },
  { name: "Sick Leave",         days: 10, accrual: "Annual",   carryover: "None",       notes: "Requires medical cert after 3 days" },
  { name: "Parental Leave",     days: 130,accrual: "N/A",      carryover: "N/A",        notes: "Statutory + enhanced policy" },
  { name: "TOIL",               days: 0,  accrual: "Earned",   carryover: "Same period",notes: "Must be taken within 3 months" },
  { name: "Compassionate Leave",days: 5,  accrual: "Annual",   carryover: "None",       notes: "Subject to manager approval" },
  { name: "Study Leave",        days: 5,  accrual: "Annual",   carryover: "None",       notes: "Requires pre-approval and evidence" },
  { name: "Unpaid Leave",       days: 0,  accrual: "N/A",      carryover: "N/A",        notes: "Discretionary — line manager sign-off" },
]

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Pending:   "bg-[#f59e0b]/10 text-[#f59e0b]",
    Approved:  "bg-[#10b981]/10 text-[#10b981]",
    Rejected:  "bg-[#ef4444]/10 text-[#ef4444]",
    Cancelled: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  }
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", map[status] || map.Pending)}>{status}</span>
}

export default function LeavePage() {
  const [tab, setTab] = useState("Leave Requests")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All Types")

  const pending  = leaveRequests.filter(r => r.status === "Pending").length
  const approved = leaveRequests.filter(r => r.status === "Approved").length
  const totalDays = leaveRequests.filter(r => r.status === "Approved").reduce((s, r) => s + r.days, 0)

  const filtered = leaveRequests.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || r.status === statusFilter
    const matchType   = typeFilter === "All Types" || r.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Leave Management</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage leave requests, balances, and policies</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />New Leave Request
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending Requests",    value: pending,   color: "#f59e0b", icon: CalendarDays },
          { label: "Approved This Month", value: approved,  color: "#10b981", icon: CheckCircle },
          { label: "Total Days Taken",    value: totalDays, color: "var(--primary)", icon: CalendarDays },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg" style={{ background: `${k.color}18` }}>
              <k.icon className="h-5 w-5" style={{ color: k.color }} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)]">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
              tab === t
                ? "border-[var(--primary)] text-[var(--primary)] font-medium"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >{t}</button>
        ))}
      </div>

      {/* Leave Requests Tab */}
      {tab === "Leave Requests" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee…" className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {["All", "Pending", "Approved", "Rejected", "Cancelled"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {["All Types", "Annual Leave", "Sick Leave", "Parental Leave", "TOIL", "Compassionate", "Study Leave", "Unpaid Leave"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Employee", "Leave Type", "Start Date", "End Date", "Days", "Status", "Reason", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(req => (
                  <tr key={req.id} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(req.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/app/people/leave/${req.id}`} className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)]">{req.name}</Link>
                          <p className="text-[10px] text-[var(--muted-foreground)]">{req.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">{req.type}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{req.start}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{req.end}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">{req.days}</td>
                    <td className="px-4 py-3">{statusBadge(req.status)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-36 truncate">{req.reason}</td>
                    <td className="px-4 py-3">
                      {req.status === "Pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-white hover:opacity-90" style={{ background: "#10b981" }}>
                            <CheckCircle className="h-3 w-3" />Approve
                          </button>
                          <button className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-white hover:opacity-90" style={{ background: "#ef4444" }}>
                            <XCircle className="h-3 w-3" />Reject
                          </button>
                        </div>
                      ) : (
                        <Link href={`/app/people/leave/${req.id}`} className="text-xs text-[var(--primary)] hover:underline">View</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Balances Tab */}
      {tab === "Leave Balances" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Department", "Annual (Remaining/Total)", "Sick (Remaining/Total)", "TOIL (Remaining)"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leaveBalances.map((b, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(b.name)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-[var(--foreground)]">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{b.dept}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(b.annual.used / b.annual.total) * 100}%`, background: "var(--primary)" }} />
                      </div>
                      <span className="text-xs text-[var(--foreground)]">{b.annual.remaining}/{b.annual.total}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(b.sick.used / b.sick.total) * 100}%`, background: "#10b981" }} />
                      </div>
                      <span className="text-xs text-[var(--foreground)]">{b.sick.remaining}/{b.sick.total}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-[var(--foreground)]">{b.toil.remaining} days</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Leave Calendar Tab */}
      {tab === "Leave Calendar" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Showing approved leave for June 2026</p>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--muted-foreground)] mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 0
              const date = day + 1
              const isWeekend = (i % 7) === 5 || (i % 7) === 6
              const hasLeave = [17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 7, 8, 9, 10, 14].includes(date)
              return (
                <div
                  key={i}
                  className={cn(
                    "h-12 rounded-lg flex flex-col items-center justify-center text-xs transition-colors",
                    date < 1 || date > 30 ? "opacity-0" : "",
                    isWeekend ? "bg-[var(--muted)]/50" : "bg-[var(--background)] border border-[var(--border)]",
                    hasLeave && !isWeekend ? "border-[var(--primary)]/40" : ""
                  )}
                >
                  {date >= 1 && date <= 30 && (
                    <>
                      <span className={cn("font-medium", isWeekend ? "text-[var(--muted-foreground)]" : "text-[var(--foreground)]")}>{date}</span>
                      {hasLeave && <div className="h-1 w-1 rounded-full mt-0.5" style={{ background: "var(--primary)" }} />}
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary)" }} /><span className="text-xs text-[var(--muted-foreground)]">Leave approved</span></div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /><span className="text-xs text-[var(--muted-foreground)]">Pending</span></div>
          </div>
        </div>
      )}

      {/* Leave Policies Tab */}
      {tab === "Leave Policies" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Leave Type", "Annual Allowance", "Accrual", "Carryover", "Notes", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {policies.map((p, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{p.days > 0 ? `${p.days} days` : "Earned"}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{p.accrual}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{p.carryover}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-48">{p.notes}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-[var(--primary)] hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
