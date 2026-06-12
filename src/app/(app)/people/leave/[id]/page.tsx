"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, Calendar, FileText, Clock, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn, getInitials } from "@/lib/utils"

const REQUESTS: Record<string, any> = {
  "LR001": {
    id: "LR001", employee: "Sophie Clarke", dept: "Marketing", role: "Brand Manager",
    manager: "Yasmin Okafor", type: "Annual Leave", start: "17 Jun 2026", end: "21 Jun 2026",
    days: 5, reason: "Family holiday to Spain", status: "Pending",
    submitted: "5 Jun 2026", coverArranged: true, coverPerson: "Anya Singh",
    approvalChain: [
      { name: "Yasmin Okafor",   role: "Line Manager",    status: "Pending",  date: null },
      { name: "Emma Thornton",   role: "HR Business Partner", status: "Awaiting", date: null },
    ],
    balance: { annual: { total: 25, used: 8, remaining: 17 }, sick: { total: 10, used: 0, remaining: 10 } },
    history: [
      { type: "Annual Leave",  dates: "24–28 Mar 2026", days: 5, status: "Approved" },
      { type: "Sick Leave",    dates: "14 Jan 2026",    days: 1, status: "Approved" },
      { type: "Annual Leave",  dates: "23–27 Dec 2025", days: 5, status: "Approved" },
    ],
  },
  "LR004": {
    id: "LR004", employee: "Grace Bennett", dept: "Finance", role: "Senior Finance Analyst",
    manager: "Harriet Stone", type: "Parental Leave", start: "1 Jul 2026", end: "30 Sep 2026",
    days: 65, reason: "Maternity leave — first child", status: "Pending",
    submitted: "3 Jun 2026", coverArranged: true, coverPerson: "Oliver Hughes",
    approvalChain: [
      { name: "Harriet Stone",   role: "Line Manager",    status: "Approved", date: "4 Jun 2026" },
      { name: "Emma Thornton",   role: "CPO",             status: "Pending",  date: null },
      { name: "Daniel Roberts",  role: "CFO",             status: "Awaiting", date: null },
    ],
    balance: { annual: { total: 25, used: 20, remaining: 5 }, sick: { total: 10, used: 4, remaining: 6 } },
    history: [
      { type: "Annual Leave",  dates: "27–31 Jan 2026", days: 5, status: "Approved" },
      { type: "Annual Leave",  dates: "23–27 Dec 2025", days: 5, status: "Approved" },
    ],
  },
}

const FALLBACK = REQUESTS["LR001"]

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Pending:   "bg-[#f59e0b]/10 text-[#f59e0b]",
    Approved:  "bg-[#10b981]/10 text-[#10b981]",
    Rejected:  "bg-[#ef4444]/10 text-[#ef4444]",
    Awaiting:  "bg-[var(--muted)] text-[var(--muted-foreground)]",
    Cancelled: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  }
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", map[status] || map.Pending)}>{status}</span>
}

export default function LeaveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const req = REQUESTS[id] || FALLBACK
  const [comment, setComment] = useState("")
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null)

  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6">
      {/* Back */}
      <div className="flex items-center gap-3">
        <Link href="/app/people/leave" className="p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Leave Request — {req.id}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Submitted {req.submitted}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Employee Card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-base bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(req.employee)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--foreground)]">{req.employee}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{req.role} · {req.dept}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Manager: {req.manager}</p>
              </div>
              {statusBadge(req.status)}
            </div>
          </div>

          {/* Leave Details */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Leave Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Leave Type",     value: req.type,   icon: FileText },
                { label: "Duration",       value: `${req.days} days`, icon: Clock },
                { label: "Start Date",     value: req.start,  icon: Calendar },
                { label: "End Date",       value: req.end,    icon: Calendar },
                { label: "Cover Arranged", value: req.coverArranged ? `Yes — ${req.coverPerson}` : "No", icon: User },
              ].map(f => (
                <div key={f.label} className="flex items-start gap-2">
                  <f.icon className="h-4 w-4 mt-0.5 text-[var(--muted-foreground)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">{f.label}</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)] mb-1">Reason</p>
              <p className="text-sm text-[var(--foreground)] bg-[var(--muted)] rounded-lg p-3">{req.reason}</p>
            </div>
          </div>

          {/* Approval Chain */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Approval Chain</h3>
            <div className="space-y-3">
              {req.approvalChain.map((step: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    step.status === "Approved" ? "bg-[#10b981]/10 text-[#10b981]" :
                    step.status === "Pending"  ? "bg-[#f59e0b]/10 text-[#f59e0b]" :
                    "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  )}>{i + 1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">{step.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{step.role}</p>
                  </div>
                  <div className="text-right">
                    {statusBadge(step.status)}
                    {step.date && <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approve / Reject */}
          {req.status === "Pending" && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
              <h3 className="font-semibold text-[var(--foreground)]">Your Decision</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDecision("approved")}
                  className={cn("flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold border-2 transition-colors",
                    decision === "approved" ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]" : "border-[var(--border)] text-[var(--foreground)] hover:border-[#10b981]/50"
                  )}
                >
                  <CheckCircle className="h-4 w-4" />Approve
                </button>
                <button
                  onClick={() => setDecision("rejected")}
                  className={cn("flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold border-2 transition-colors",
                    decision === "rejected" ? "border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]" : "border-[var(--border)] text-[var(--foreground)] hover:border-[#ef4444]/50"
                  )}
                >
                  <XCircle className="h-4 w-4" />Reject
                </button>
              </div>
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Comment (optional)</label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  placeholder="Add a comment for the employee…"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] p-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
                />
              </div>
              <button
                disabled={!decision}
                className="w-full rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
                style={{ background: decision === "approved" ? "#10b981" : decision === "rejected" ? "#ef4444" : "var(--muted)" }}
              >
                {decision ? `Confirm ${decision === "approved" ? "Approval" : "Rejection"}` : "Select a decision above"}
              </button>
            </div>
          )}

          {/* Previous Leave History */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
            <div className="px-5 pt-5 pb-3">
              <h3 className="font-semibold text-[var(--foreground)]">Previous Leave History</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-y border-[var(--border)]">
                  {["Type", "Dates", "Days", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {req.history.map((h: any, i: number) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-5 py-3 text-[var(--foreground)]">{h.type}</td>
                    <td className="px-5 py-3 text-xs text-[var(--muted-foreground)]">{h.dates}</td>
                    <td className="px-5 py-3 text-sm text-[var(--foreground)]">{h.days}</td>
                    <td className="px-5 py-3">{statusBadge(h.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Rail — Leave Balance */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Leave Balance — {req.employee.split(" ")[0]}</h3>
            {[
              { label: "Annual Leave",  data: req.balance.annual,  color: "var(--primary)" },
              { label: "Sick Leave",    data: req.balance.sick,    color: "#10b981" },
            ].map(b => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[var(--foreground)]">{b.label}</span>
                  <span className="text-sm font-bold text-[var(--foreground)]">{b.data.remaining}<span className="text-xs font-normal text-[var(--muted-foreground)]">/{b.data.total} days</span></span>
                </div>
                <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(b.data.used / b.data.total) * 100}%`, background: b.color }} />
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.data.used} used · {b.data.remaining} remaining</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-3">
            <h3 className="font-semibold text-[var(--foreground)]">Request Info</h3>
            <div className="space-y-2">
              {[
                { label: "Request ID",  value: req.id },
                { label: "Submitted",   value: req.submitted },
                { label: "Leave Type",  value: req.type },
                { label: "Duration",    value: `${req.days} working days` },
              ].map(f => (
                <div key={f.label} className="flex justify-between">
                  <span className="text-xs text-[var(--muted-foreground)]">{f.label}</span>
                  <span className="text-xs font-medium text-[var(--foreground)]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
