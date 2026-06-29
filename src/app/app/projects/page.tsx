"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FolderOpen, CheckSquare, Flag, DollarSign, Clock, TrendingDown,
  Plus, AlertTriangle, Users, Activity, Milestone
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell
} from "recharts"

const kpis = [
  { label: "Active Projects", value: "24", sub: "+2 this month", icon: FolderOpen, accent: "var(--primary)" },
  { label: "On Track", value: "14", sub: "58% of active", icon: CheckSquare, accent: "#22c55e" },
  { label: "At Risk", value: "7", sub: "needs attention", icon: AlertTriangle, accent: "#f59e0b" },
  { label: "Overdue", value: "3", sub: "immediate action", icon: TrendingDown, accent: "#ef4444" },
  { label: "Total Budget", value: "£1.84M", sub: "across all projects", icon: DollarSign, accent: "#8b5cf6" },
  { label: "Spent", value: "£1.12M", sub: "61% of budget", icon: DollarSign, accent: "#06b6d4" },
  { label: "Remaining", value: "£720K", sub: "39% remaining", icon: DollarSign, accent: "#10b981" },
]

const portfolioHealth = [
  { name: "On Track", onTrack: 14, atRisk: 0, overdue: 0 },
  { name: "At Risk", onTrack: 0, atRisk: 7, overdue: 0 },
  { name: "Overdue", onTrack: 0, atRisk: 0, overdue: 3 },
]

const portfolioData = [
  { dept: "Engineering", onTrack: 6, atRisk: 3, overdue: 1 },
  { dept: "Marketing", onTrack: 2, atRisk: 1, overdue: 0 },
  { dept: "Operations", onTrack: 3, atRisk: 2, overdue: 1 },
  { dept: "Design", onTrack: 3, atRisk: 1, overdue: 1 },
]

const recentActivity = [
  { id: 1, user: "SK", action: "Updated milestone", project: "Orbas Platform Rebuild", time: "12m ago", type: "milestone" },
  { id: 2, user: "JR", action: "Logged 6.5h", project: "ERP Integration Phase 2", time: "45m ago", type: "time" },
  { id: 3, user: "LC", action: "Completed task", project: "Mobile App v3.0", time: "1h ago", type: "task" },
  { id: 4, user: "AT", action: "Added team member", project: "Customer Portal", time: "2h ago", type: "team" },
  { id: 5, user: "SK", action: "Budget alert raised", project: "Data Warehouse Migration", time: "3h ago", type: "alert" },
  { id: 6, user: "MK", action: "Uploaded document", project: "ISO 27001 Compliance", time: "4h ago", type: "doc" },
  { id: 7, user: "JR", action: "Status changed to At Risk", project: "Analytics Dashboard", time: "5h ago", type: "alert" },
]

const resourceUtilization = [
  { name: "Engineering", allocated: 92, available: 8 },
  { name: "Design", allocated: 78, available: 22 },
  { name: "QA", allocated: 85, available: 15 },
  { name: "DevOps", allocated: 65, available: 35 },
  { name: "PM", allocated: 88, available: 12 },
]

const activityTypeColor: Record<string, string> = {
  milestone: "var(--primary)",
  time: "#8b5cf6",
  task: "#22c55e",
  team: "#06b6d4",
  alert: "#ef4444",
  doc: "#f59e0b",
}

export default function ProjectsOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Projects Overview</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Portfolio health, resources, and delivery status</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <Clock className="h-4 w-4" /> Log Time
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <CheckSquare className="h-4 w-4" /> My Tasks
          </Button>
          <Link href="/app/projects/milestones">
            <Button size="sm" variant="outline" className="gap-2">
              <Milestone className="h-4 w-4" /> View Milestones
            </Button>
          </Link>
          <Link href="/app/projects/projects/new">
            <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: `${k.accent}18` }}
                >
                  <k.icon className="h-4 w-4" style={{ color: k.accent }} />
                </div>
              </div>
              <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{k.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Health Chart */}
        <div className="lg:col-span-2">
          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Portfolio Health by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={portfolioData} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="onTrack" name="On Track" fill="#22c55e" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="atRisk" name="At Risk" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="overdue" name="Overdue" fill="#ef4444" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Resource Utilization */}
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resourceUtilization.map(r => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: "var(--foreground)" }}>{r.name}</span>
                  <span className="font-semibold" style={{ color: r.allocated > 85 ? "#ef4444" : r.allocated > 70 ? "#f59e0b" : "#22c55e" }}>
                    {r.allocated}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${r.allocated}%`,
                      background: r.allocated > 85 ? "#ef4444" : r.allocated > 70 ? "#f59e0b" : "#22c55e",
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" style={{ color: "var(--primary)" }} />
              Recent Project Activity
            </CardTitle>
            <Button size="sm" variant="ghost" className="text-xs" style={{ color: "var(--primary)" }}>
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map(a => (
              <div key={a.id} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                  style={{ background: activityTypeColor[a.type] }}
                >
                  {a.user}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>
                    <span className="font-medium">{a.action}</span>
                    <span style={{ color: "var(--muted-foreground)" }}> on </span>
                    <span className="font-medium" style={{ color: "var(--primary)" }}>{a.project}</span>
                  </p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
