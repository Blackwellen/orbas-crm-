"use client"

import React from "react"
import Link from "next/link"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import {
  Users, UserPlus, Briefcase, TrendingDown, DollarSign,
  ChevronRight, Clock, CheckCircle, AlertCircle,
  CalendarDays, Star, Award, TrendingUp, ShieldCheck, BookOpen
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const deptData = [
  { dept: "Engineering",  count: 42 },
  { dept: "Sales",        count: 28 },
  { dept: "Marketing",    count: 18 },
  { dept: "Finance",      count: 14 },
  { dept: "Operations",   count: 22 },
  { dept: "Product",      count: 16 },
  { dept: "HR",           count: 9  },
  { dept: "Legal",        count: 6  },
  { dept: "Customer Svc", count: 12 },
]

const kpis = [
  { label: "Total Headcount",   value: "167",    sub: "+4 this month",        icon: Users,       color: "var(--primary)" },
  { label: "New Hires (Month)", value: "8",      sub: "3 starting next week", icon: UserPlus,    color: "#10b981" },
  { label: "Open Positions",    value: "14",     sub: "6 urgent",             icon: Briefcase,   color: "#8b5cf6" },
  { label: "Avg Tenure",        value: "3.4 yrs",sub: "+0.2 vs last yr",      icon: Clock,       color: "#f59e0b" },
  { label: "Turnover Rate",     value: "4.2%",   sub: "Below industry avg",   icon: TrendingDown,color: "#06b6d4" },
  { label: "Avg Salary",        value: "52,400", sub: "+3.1% YoY",            icon: DollarSign,  color: "#ec4899" },
]

const quickActions = [
  { label: "Add Employee",  href: "/app/people/directory/new",    icon: UserPlus,    bg: "bg-[var(--primary)]" },
  { label: "Post Job",      href: "/app/people/hiring",           icon: Briefcase,   bg: "bg-[#8b5cf6]" },
  { label: "Run Payroll",   href: "/app/people/payroll/new",      icon: DollarSign,  bg: "bg-[#10b981]" },
  { label: "Approve Leave", href: "/app/people/leave",            icon: CalendarDays,bg: "bg-[#f59e0b]" },
]

const recentActivity = [
  { icon: UserPlus,    text: "Alex Thompson joined as Senior Engineer",            time: "10m ago",  type: "hire" },
  { icon: CheckCircle, text: "Payroll run May 2026 approved - 247,800",            time: "1h ago",   type: "payroll" },
  { icon: AlertCircle, text: "Sarah Chen leave request pending approval",           time: "2h ago",   type: "leave" },
  { icon: Star,        text: "Q2 2026 performance review cycle started (23 staff)", time: "3h ago",   type: "perf" },
  { icon: Users,       text: "Org chart updated - IT dept restructured",            time: "5h ago",   type: "org" },
  { icon: Briefcase,   text: "New role posted: Product Designer (Mid-level)",       time: "6h ago",   type: "hire" },
  { icon: Clock,       text: "3 employees have expiring right-to-work docs",        time: "1d ago",   type: "alert" },
  { icon: Award,       text: "James Park completed Leadership Essentials course",   time: "1d ago",   type: "learning" },
  { icon: TrendingUp,  text: "Priya Sharma promoted to Lead Engineer",              time: "2d ago",   type: "promo" },
  { icon: CalendarDays,text: "Marcus Williams annual leave approved (17-21 Jun)",   time: "2d ago",   type: "leave" },
]

const activityColor: Record<string, string> = {
  hire: "var(--primary)", payroll: "#10b981", leave: "#f59e0b",
  perf: "#8b5cf6", org: "#06b6d4",
  alert: "#ef4444", learning: "#10b981", promo: "#8b5cf6",
}

const pendingApprovals = [
  { name: "Sophie Clarke",   type: "Annual Leave",   dates: "17-21 Jun 2026",  days: 5,  dept: "Marketing"  },
  { name: "Aiden Foster",    type: "Sick Leave",     dates: "10 Jun 2026",     days: 1,  dept: "Operations" },
  { name: "Noah Campbell",   type: "Annual Leave",   dates: "24-28 Jun 2026",  days: 5,  dept: "Sales"      },
  { name: "Grace Bennett",   type: "Parental Leave", dates: "1 Jul - 30 Sep",  days: 65, dept: "Finance"    },
  { name: "Oliver Hughes",   type: "TOIL",           dates: "14 Jun 2026",     days: 1,  dept: "Product"    },
  { name: "Fatima Al-Zahra", type: "Annual Leave",   dates: "7-11 Jul 2026",   days: 5,  dept: "Engineering"},
]

const orgHealth = [
  { label: "eNPS Score",          value: 42, unit: "",  max: 100, color: "#10b981",        threshold: 30 },
  { label: "Training Completion", value: 78, unit: "%", max: 100, color: "var(--primary)", threshold: 70 },
  { label: "Policy Compliance",   value: 94, unit: "%", max: 100, color: "#8b5cf6",        threshold: 80 },
  { label: "Onboarding on Track", value: 86, unit: "%", max: 100, color: "#06b6d4",        threshold: 75 },
]

export default function PeopleOverviewPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">People</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">HRIS Command Centre · Updated just now</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {quickActions.map(a => (
            <Link
              key={a.label}
              href={a.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity",
                a.bg
              )}
            >
              <a.icon className="h-4 w-4" />
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[var(--muted-foreground)] font-medium truncate">{kpi.label}</p>
                <p className="text-xl font-bold mt-1 text-[var(--foreground)]">{kpi.value}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{kpi.sub}</p>
              </div>
              <div className="shrink-0 p-2 rounded-lg" style={{ background: `${kpi.color}18` }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Headcount by Dept */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Headcount by Department</h3>
            <span className="text-xs text-[var(--muted-foreground)]">167 total</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={40} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: 12 }}
                formatter={(v: any) => [v, "Headcount"]}
              />
              <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Activity</h3>
            <span className="text-xs text-[var(--muted-foreground)]">Live</span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentActivity.slice(0, 8).map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                <item.icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: activityColor[item.type] || "var(--muted-foreground)" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--foreground)] leading-snug">{item.text}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Org Health + Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Org Health */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" style={{ color: "var(--primary)" }} />
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Org Health Indicators</h3>
          </div>
          {orgHealth.map(h => (
            <div key={h.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[var(--foreground)]">{h.label}</span>
                <span className="text-xs font-semibold text-[var(--foreground)]">{h.value}{h.unit}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(h.value / h.max) * 100}%`, background: h.color }}
                />
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                {h.value >= h.threshold ? "On target" : "Below target"} · threshold {h.threshold}{h.unit}
              </p>
            </div>
          ))}
          <div className="pt-2 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <span className="text-xs text-[var(--muted-foreground)]">12 mandatory trainings overdue</span>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Pending Approvals</h3>
            <Link href="/app/people/leave" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Employee</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Dates</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Days</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Dept</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {pendingApprovals.map((req, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                            {getInitials(req.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-[var(--foreground)]">{req.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
                        {req.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{req.dates}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{req.days}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{req.dept}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-white hover:opacity-90" style={{ background: "#10b981" }}>
                          <CheckCircle className="h-3 w-3" />Approve
                        </button>
                        <button className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
