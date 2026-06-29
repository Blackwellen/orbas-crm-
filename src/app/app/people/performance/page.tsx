"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Target, Users, CheckCircle, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Review Cycles", "Goals", "Reviews", "Calibration", "Analytics"]

const reviewCycles = [
  { id: "RC-001", name: "Q2 2026 Mid-Year Review",  period: "Apr–Jun 2026",  status: "Active",    participants: 167, completion: 34 },
  { id: "RC-002", name: "Q1 2026 Check-in",          period: "Jan–Mar 2026",  status: "Completed", participants: 163, completion: 100 },
  { id: "RC-003", name: "Annual Review 2025/26",     period: "Jan–Apr 2026",  status: "Completed", participants: 158, completion: 100 },
  { id: "RC-004", name: "Probation Review — May",    period: "May 2026",      status: "Active",    participants: 12,  completion: 58 },
  { id: "RC-005", name: "Probation Review — Jun",    period: "Jun 2026",      status: "Scheduled", participants: 8,   completion: 0  },
  { id: "RC-006", name: "Q3 2026 Mid-Year Review",   period: "Jul–Sep 2026",  status: "Scheduled", participants: 0,   completion: 0  },
]

const goals = [
  { id: "G001", employee: "Alex Thompson",   goal: "Deliver API redesign v2",           dueDate: "30 Jun 2026", progress: 75, status: "On Track" },
  { id: "G002", employee: "Sophie Clarke",   goal: "Launch 3 brand campaigns",          dueDate: "31 Jul 2026", progress: 40, status: "On Track" },
  { id: "G003", employee: "Noah Campbell",   goal: "Hit £500k ARR target",              dueDate: "31 Dec 2026", progress: 62, status: "On Track" },
  { id: "G004", employee: "Grace Bennett",   goal: "Reduce month-end close to 3 days",  dueDate: "30 Sep 2026", progress: 80, status: "On Track" },
  { id: "G005", employee: "Marcus Williams", goal: "Expand into 2 new verticals",       dueDate: "31 Dec 2026", progress: 35, status: "At Risk" },
  { id: "G006", employee: "Lena Cruz",       goal: "Ship Design System v3",             dueDate: "15 Jul 2026", progress: 90, status: "On Track" },
  { id: "G007", employee: "Olivia Wright",   goal: "Product roadmap 2027 planning",     dueDate: "31 Aug 2026", progress: 20, status: "Behind" },
  { id: "G008", employee: "Fatima Al-Zahra",goal: "Zero-downtime deployment pipeline",  dueDate: "30 Jun 2026", progress: 95, status: "On Track" },
  { id: "G009", employee: "Oliver Hughes",   goal: "IFRS 16 compliance project",        dueDate: "30 Jun 2026", progress: 88, status: "On Track" },
  { id: "G010", employee: "Priya Sharma",    goal: "Launch L&D Academy Phase 1",        dueDate: "31 Jul 2026", progress: 55, status: "On Track" },
  { id: "G011", employee: "Ravi Patel",      goal: "Reduce API latency by 40%",         dueDate: "30 Sep 2026", progress: 45, status: "At Risk" },
  { id: "G012", employee: "Katie Walsh",     goal: "Implement new supplier portal",     dueDate: "31 Aug 2026", progress: 30, status: "Behind" },
]

const reviews = [
  { id: "RV-001", employee: "Alex Thompson",   reviewer: "James Park",    period: "Q1 2026", score: 4.2, status: "Completed" },
  { id: "RV-002", employee: "Sophie Clarke",   reviewer: "Yasmin Okafor", period: "Q1 2026", score: 3.8, status: "Completed" },
  { id: "RV-003", employee: "Fatima Al-Zahra",reviewer: "James Park",    period: "Q2 2026", score: null, status: "In Progress" },
  { id: "RV-004", employee: "Noah Campbell",   reviewer: "Marcus Williams",period: "Q2 2026",score: null, status: "Draft" },
  { id: "RV-005", employee: "Lena Cruz",       reviewer: "Alex Thompson", period: "Q2 2026", score: null, status: "In Progress" },
  { id: "RV-006", employee: "Grace Bennett",   reviewer: "Harriet Stone", period: "Q1 2026", score: 4.5, status: "Completed" },
  { id: "RV-007", employee: "Oliver Hughes",   reviewer: "Harriet Stone", period: "Q2 2026", score: null, status: "Draft" },
  { id: "RV-008", employee: "Marcus Williams", reviewer: "Katherine Moss",period: "Q1 2026", score: 4.0, status: "Completed" },
  { id: "RV-009", employee: "Ravi Patel",      reviewer: "James Park",    period: "Q2 2026", score: null, status: "Draft" },
  { id: "RV-010", employee: "Olivia Wright",   reviewer: "James Park",    period: "Q1 2026", score: 4.3, status: "Completed" },
  { id: "RV-011", employee: "Priya Sharma",    reviewer: "Emma Thornton", period: "Q2 2026", score: null, status: "In Progress" },
  { id: "RV-012", employee: "Chloe Adams",     reviewer: "Grace Bennett", period: "Q1 2026", score: 3.5, status: "Completed" },
  { id: "RV-013", employee: "Katie Walsh",     reviewer: "Ryan Thompson", period: "Q2 2026", score: null, status: "Draft" },
  { id: "RV-014", employee: "Leon Davies",     reviewer: "Emma Thornton", period: "Q2 2026", score: null, status: "Draft" },
]

const cycleStatusStyle: Record<string, string> = {
  Active:    "bg-[var(--primary)]/10 text-[var(--primary)]",
  Completed: "bg-[#10b981]/10 text-[#10b981]",
  Scheduled: "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

const reviewStatusStyle: Record<string, string> = {
  Draft:        "bg-[var(--muted)] text-[var(--muted-foreground)]",
  "In Progress":"bg-[var(--primary)]/10 text-[var(--primary)]",
  Completed:    "bg-[#10b981]/10 text-[#10b981]",
  Calibration:  "bg-[#8b5cf6]/10 text-[#8b5cf6]",
}

const goalStatusColor: Record<string, string> = {
  "On Track": "#10b981",
  "At Risk":  "#f59e0b",
  "Behind":   "#ef4444",
  "Completed":"#06b6d4",
}

export default function PerformancePage() {
  const [tab, setTab] = useState("Review Cycles")

  const activeReviews   = reviews.filter(r => r.status === "In Progress").length
  const completedReviews = reviews.filter(r => r.status === "Completed").length
  const totalGoals      = goals.length
  const onTrackGoals    = goals.filter(g => g.status === "On Track").length

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Performance</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Review cycles, goals, and performance analytics</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />New Review Cycle
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Reviews",    value: activeReviews,   icon: Clock,        color: "var(--primary)" },
          { label: "Completed Reviews", value: completedReviews,icon: CheckCircle,  color: "#10b981" },
          { label: "Total Goals",       value: totalGoals,      icon: Target,       color: "#8b5cf6" },
          { label: "Goals On Track",    value: onTrackGoals,    icon: Users,        color: "#f59e0b" },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${k.color}18` }}>
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
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
            tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}>{t}</button>
        ))}
      </div>

      {/* Review Cycles */}
      {tab === "Review Cycles" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Review Cycle", "Period", "Status", "Participants", "Completion", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {reviewCycles.map(c => (
                <tr key={c.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.period}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", cycleStatusStyle[c.status])}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{c.participants}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.completion}%`, background: c.completion === 100 ? "#10b981" : "var(--primary)" }} />
                      </div>
                      <span className="text-xs text-[var(--foreground)] font-medium">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-[var(--primary)] hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Goals */}
      {tab === "Goals" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Goal", "Due Date", "Progress", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {goals.map(g => (
                <tr key={g.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(g.employee)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-[var(--foreground)]">{g.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)] max-w-72">{g.goal}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{g.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${g.progress}%`, background: goalStatusColor[g.status] }} />
                      </div>
                      <span className="text-xs font-medium text-[var(--foreground)]">{g.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${goalStatusColor[g.status]}18`, color: goalStatusColor[g.status] }}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reviews */}
      {tab === "Reviews" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Reviewer", "Period", "Score", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {reviews.map(r => (
                <tr key={r.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(r.employee)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-[var(--foreground)]">{r.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{r.reviewer}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{r.period}</td>
                  <td className="px-4 py-3">
                    {r.score ? <span className="text-sm font-bold" style={{ color: r.score >= 4 ? "#10b981" : r.score >= 3 ? "var(--primary)" : "#f59e0b" }}>{r.score} / 5</span> : <span className="text-xs text-[var(--muted-foreground)]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", reviewStatusStyle[r.status])}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/app/people/performance/${r.id}`} className="text-xs text-[var(--primary)] hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calibration */}
      {tab === "Calibration" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
          <h3 className="font-semibold text-[var(--foreground)]">Q2 2026 Calibration Session</h3>
          <p className="text-sm text-[var(--muted-foreground)]">Scheduled for 15 Jul 2026 · 14 employees in scope</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Exceptional (5)",       count: 3  },
              { label: "Exceeds Expectations",  count: 22 },
              { label: "Meets Expectations",    count: 98 },
              { label: "Needs Improvement",     count: 8  },
              { label: "Unsatisfactory",        count: 1  },
              { label: "Pending Calibration",   count: 35 },
            ].map(c => (
              <div key={c.label} className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{c.label}</p>
                <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{c.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics */}
      {tab === "Analytics" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Avg Score Q1 2026",       value: "3.9 / 5",   sub: "+0.2 vs Q4 2025" },
            { label: "High Performers",          value: "25",        sub: "Score ≥ 4.5" },
            { label: "Needs Improvement",        value: "9",         sub: "Score < 3.0" },
            { label: "Goals Achieved This Qtr",  value: "74%",       sub: "88 / 119 goals" },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
