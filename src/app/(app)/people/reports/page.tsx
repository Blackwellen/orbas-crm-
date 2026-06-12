"use client"

import React from "react"
import { Play, Calendar, Download, Users, TrendingDown, DollarSign, CalendarDays, BookOpen, Target, BarChart3, Heart, Clock } from "lucide-react"

const reports = [
  {
    id: "headcount",
    title: "Headcount Report",
    description: "Total headcount by department, employment type, location, and trend over time.",
    icon: Users,
    color: "var(--primary)",
    lastRun: "10 Jun 2026",
    format: "Excel / PDF",
    tags: ["People", "Headcount"],
  },
  {
    id: "turnover",
    title: "Turnover Analysis",
    description: "Employee attrition rates, reasons for leaving, department breakdown, and retention trends.",
    icon: TrendingDown,
    color: "#8b5cf6",
    lastRun: "1 Jun 2026",
    format: "Excel / PDF",
    tags: ["People", "Attrition"],
  },
  {
    id: "payroll",
    title: "Payroll Summary",
    description: "Monthly payroll costs by department, PAYE, NI, pension contributions, and YTD totals.",
    icon: DollarSign,
    color: "#10b981",
    lastRun: "25 May 2026",
    format: "Excel / CSV",
    tags: ["Finance", "Payroll"],
  },
  {
    id: "leave",
    title: "Leave Report",
    description: "Leave taken by type, department, employee. Leave balances and absence patterns.",
    icon: CalendarDays,
    color: "#f59e0b",
    lastRun: "5 Jun 2026",
    format: "Excel / PDF",
    tags: ["Leave", "Absence"],
  },
  {
    id: "training",
    title: "Training Completion",
    description: "Mandatory and optional training completion rates by employee, department, and course.",
    icon: BookOpen,
    color: "#06b6d4",
    lastRun: "3 Jun 2026",
    format: "Excel / PDF",
    tags: ["Learning", "Compliance"],
  },
  {
    id: "performance",
    title: "Performance Summary",
    description: "Review scores, goal completion, calibration distribution, and trend by team.",
    icon: Target,
    color: "#ec4899",
    lastRun: "1 Apr 2026",
    format: "Excel / PDF",
    tags: ["Performance"],
  },
  {
    id: "diversity",
    title: "Diversity Report",
    description: "Workforce demographics, gender pay gap analysis, ethnicity breakdown (where disclosed).",
    icon: Heart,
    color: "#f97316",
    lastRun: "1 Mar 2026",
    format: "PDF",
    tags: ["DEI", "Compliance"],
  },
  {
    id: "absence",
    title: "Absence Report",
    description: "Bradford Factor scores, recurring absence patterns, and sickness trends by team.",
    icon: Clock,
    color: "#ef4444",
    lastRun: "5 Jun 2026",
    format: "Excel / PDF",
    tags: ["Absence", "Wellbeing"],
  },
  {
    id: "compensation",
    title: "Compensation Analysis",
    description: "Salary band distribution, compa ratios, pay equity analysis, and benchmark comparison.",
    icon: BarChart3,
    color: "#3b82f6",
    lastRun: "1 May 2026",
    format: "Excel / PDF",
    tags: ["Finance", "Compensation"],
  },
  {
    id: "recruitment",
    title: "Recruitment Funnel",
    description: "Time to hire, source of hire, offer acceptance rates, and diversity of applicants.",
    icon: Users,
    color: "#14b8a6",
    lastRun: "8 Jun 2026",
    format: "Excel / PDF",
    tags: ["Hiring", "Recruitment"],
  },
  {
    id: "engagement",
    title: "Engagement Report",
    description: "eNPS scores, pulse survey results, recognition trends, and feedback themes.",
    icon: Heart,
    color: "#a855f7",
    lastRun: "5 Jun 2026",
    format: "PDF",
    tags: ["Engagement"],
  },
  {
    id: "starters-leavers",
    title: "Starters & Leavers",
    description: "New hires and departures by month, department, role, and reason for leaving.",
    icon: Users,
    color: "#22c55e",
    lastRun: "9 Jun 2026",
    format: "Excel / PDF",
    tags: ["People", "Headcount"],
  },
]

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">People Reports</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Generate, schedule, and export people analytics reports</p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Reports Available", value: reports.length },
          { label: "Scheduled Reports",  value: 4             },
          { label: "Last Export",        value: "Today"       },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map(r => (
          <div key={r.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 flex flex-col gap-4 hover:border-[var(--primary)]/40 transition-colors group">
            {/* Icon + title */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${r.color}18` }}>
                <r.icon className="h-5 w-5" style={{ color: r.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight">{r.title}</h3>
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  {r.tags.map(t => (
                    <span key={t} className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed flex-1">{r.description}</p>

            {/* Meta */}
            <div className="text-[10px] text-[var(--muted-foreground)] space-y-0.5">
              <p>Last run: {r.lastRun}</p>
              <p>Format: {r.format}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
                <Play className="h-3 w-3" />Run
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--muted)]">
                <Calendar className="h-3 w-3" />Schedule
              </button>
              <button className="p-1.5 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
