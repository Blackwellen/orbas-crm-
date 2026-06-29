"use client"

import React from "react"
import Link from "next/link"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import {
  Ticket, Clock, CheckCircle, AlertTriangle, ChevronRight,
  TrendingUp, TrendingDown, Award, Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getInitials } from "@/lib/utils"

const kpis = [
  { label: "Open Tickets",      value: "84",    sub: "+6 since yesterday",  icon: Ticket,        color: "text-blue-600",   bg: "bg-blue-50",   trend: "up" },
  { label: "First Response",    value: "1.8h",  sub: "avg hours",           icon: Clock,         color: "text-amber-600",  bg: "bg-amber-50",  trend: "down" },
  { label: "Resolution Rate",   value: "91%",   sub: "+3% vs last week",    icon: CheckCircle,   color: "text-emerald-600",bg: "bg-emerald-50",trend: "up" },
  { label: "SLA Breached",      value: "7",     sub: "2 critical",          icon: AlertTriangle, color: "text-red-600",    bg: "bg-red-50",    trend: "up" },
]

const ticketsOverTime = [
  { day: "Mon", opened: 14, resolved: 11 },
  { day: "Tue", opened: 18, resolved: 16 },
  { day: "Wed", opened: 22, resolved: 19 },
  { day: "Thu", opened: 16, resolved: 20 },
  { day: "Fri", opened: 24, resolved: 18 },
  { day: "Sat", opened: 8,  resolved: 12 },
  { day: "Sun", opened: 5,  resolved: 9  },
]

const byStatus = [
  { name: "Open",        value: 38, color: "#3b82f6" },
  { name: "In Progress", value: 21, color: "#f59e0b" },
  { name: "Pending",     value: 12, color: "#8b5cf6" },
  { name: "Resolved",    value: 9,  color: "#10b981" },
  { name: "Closed",      value: 4,  color: "#6b7280" },
]

const byPriority = [
  { priority: "Critical", count: 8  },
  { priority: "High",     count: 19 },
  { priority: "Medium",   count: 34 },
  { priority: "Low",      count: 23 },
]

const priorityColors: Record<string, string> = {
  Critical: "#ef4444",
  High:     "#f97316",
  Medium:   "#f59e0b",
  Low:      "#6b7280",
}

const recentActivity = [
  { text: "Ticket #2041 escalated to Tier 2 support",           time: "3m ago",  type: "escalate" },
  { text: "Agent Priya Mehta resolved Ticket #2038",             time: "12m ago", type: "resolve" },
  { text: "New ticket from DataVault Ltd — API authentication",  time: "19m ago", type: "new" },
  { text: "SLA breach warning on Ticket #2035 (Critical)",       time: "31m ago", type: "warning" },
  { text: "Knowledge base article 'Reset Password' published",   time: "45m ago", type: "kb" },
  { text: "Queue 'Enterprise' auto-assigned 3 tickets",          time: "1h ago",  type: "assign" },
  { text: "Ticket #2030 rated 5 stars by customer",              time: "1h ago",  type: "csat" },
  { text: "Ticket #2027 closed after 48h inactivity",            time: "2h ago",  type: "close" },
]

const activityColor: Record<string, string> = {
  escalate: "text-red-500",
  resolve:  "text-emerald-500",
  new:      "text-blue-500",
  warning:  "text-amber-500",
  kb:       "text-violet-500",
  assign:   "text-cyan-500",
  csat:     "text-emerald-400",
  close:    "text-slate-400",
}

const topAgents = [
  { name: "Priya Mehta",    resolved: 47, csat: 4.9, avatar: "PM" },
  { name: "James Hartley",  resolved: 43, csat: 4.7, avatar: "JH" },
  { name: "Sara Collins",   resolved: 38, csat: 4.8, avatar: "SC" },
  { name: "Tom Okafor",     resolved: 35, csat: 4.6, avatar: "TO" },
  { name: "Ellie Brooks",   resolved: 29, csat: 4.5, avatar: "EB" },
]

export default function ServiceOverviewPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Service</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Helpdesk overview · Updated just now</p>
        </div>
        <Link
          href="/app/service/tickets/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Ticket className="h-4 w-4" />
          New Ticket
        </Link>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <Card key={kpi.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {kpi.trend === "up"
                      ? <TrendingUp className={`h-3 w-3 ${kpi.label === "SLA Breached" ? "text-red-500" : "text-emerald-500"}`} />
                      : <TrendingDown className="h-3 w-3 text-emerald-500" />}
                    <p className="text-xs text-[var(--muted-foreground)]">{kpi.sub}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tickets Over Time */}
        <Card className="border border-[var(--border)] lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tickets This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ticketsOverTime} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="opened"   stroke="#3b82f6" strokeWidth={2} dot={false} name="Opened" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={false} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By Status Donut */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">By Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={byStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value">
                  {byStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {byStatus.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-xs text-[var(--muted-foreground)] truncate">{s.name}</span>
                  <span className="text-xs font-semibold text-[var(--foreground)] ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* By Priority Bar */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tickets by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={byPriority} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="priority" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={56} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {byPriority.map((entry, i) => (
                    <Cell key={i} fill={priorityColors[entry.priority]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            <Link href="/app/service/tickets" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {recentActivity.map((item, i) => (
                <div key={i} className="px-4 py-2.5">
                  <p className={`text-xs leading-snug ${activityColor[item.type]}`}>{item.text}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Agents Leaderboard */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Top Agents This Week</CardTitle>
            <Award className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {topAgents.map((agent, i) => (
                <div key={agent.name} className="flex items-center gap-3 px-4 py-2.5">
                  <span className={`text-xs font-bold w-4 shrink-0 ${i === 0 ? "text-amber-500" : "text-[var(--muted-foreground)]"}`}>
                    #{i + 1}
                  </span>
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                      {agent.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--foreground)] truncate">{agent.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{agent.resolved} resolved</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-[var(--foreground)]">{agent.csat}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
