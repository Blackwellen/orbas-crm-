"use client"

import React, { useState } from "react"
import {
  BarChart2, TrendingUp, Activity, Users, Target, GitBranch,
  Clock, Megaphone, ArrowUpRight, Play, Download
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatCurrency } from "@/lib/utils"

const PIPELINE_DATA = [
  { stage: "Prospecting", deals: 8, value: 285000 },
  { stage: "Qualification", deals: 12, value: 486000 },
  { stage: "Proposal", deals: 6, value: 280000 },
  { stage: "Negotiation", deals: 4, value: 425000 },
  { stage: "Won", deals: 9, value: 765000 },
]

const WIN_LOSS_DATA = [
  { month: "Jan", won: 4, lost: 2 },
  { month: "Feb", won: 6, lost: 3 },
  { month: "Mar", won: 7, lost: 1 },
  { month: "Apr", won: 5, lost: 4 },
  { month: "May", won: 9, lost: 2 },
  { month: "Jun", won: 3, lost: 1 },
]

const ACTIVITY_DATA = [
  { rep: "Alex Turner", calls: 48, emails: 125, meetings: 12 },
  { rep: "Sarah Mitchell", calls: 36, emails: 98, meetings: 9 },
  { rep: "James Park", calls: 29, emails: 87, meetings: 7 },
  { rep: "Olivia Davies", calls: 41, emails: 110, meetings: 11 },
]

const LEAD_SOURCE_DATA = [
  { name: "Inbound Web", value: 38, fill: "#1a56db" },
  { name: "Referral", value: 22, fill: "#06b6d4" },
  { name: "PPC", value: 18, fill: "#6366f1" },
  { name: "Social", value: 12, fill: "#10b981" },
  { name: "Events", value: 7, fill: "#f59e0b" },
  { name: "Cold Outreach", value: 3, fill: "#ef4444" },
]

const CONVERSION_DATA = [
  { stage: "Leads", count: 892 },
  { stage: "Qualified", count: 312 },
  { stage: "Demo", count: 148 },
  { stage: "Proposal", count: 62 },
  { stage: "Won", count: 28 },
]

const REP_PERFORMANCE = [
  { rep: "Alex Turner",    quota: 450000, actual: 310000, deals: 12, winRate: 68 },
  { rep: "Sarah Mitchell", quota: 380000, actual: 290000, deals: 10, winRate: 72 },
  { rep: "James Park",     quota: 320000, actual: 198000, deals: 8,  winRate: 58 },
  { rep: "Olivia Davies",  quota: 280000, actual: 245000, deals: 9,  winRate: 75 },
]

const VELOCITY_DATA = [
  { month: "Jan", days: 54 },
  { month: "Feb", days: 48 },
  { month: "Mar", days: 42 },
  { month: "Apr", days: 51 },
  { month: "May", days: 38 },
  { month: "Jun", days: 35 },
]

const CAMPAIGN_ROI = [
  { name: "Email Nurture", cost: 2400, revenue: 185000, roi: 7608 },
  { name: "Google Ads", cost: 8500, revenue: 230000, roi: 2606 },
  { name: "Content", cost: 3200, revenue: 95000, roi: 2869 },
  { name: "Events", cost: 9800, revenue: 125000, roi: 1175 },
  { name: "Social", cost: 1800, revenue: 42000, roi: 2233 },
]

interface ReportCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  accent: string
  chart: React.ReactNode
  metric: string
  metricLabel: string
}

export default function ReportsPage() {
  const [runningReport, setRunningReport] = useState<string | null>(null)

  function runReport(id: string) {
    setRunningReport(id)
    setTimeout(() => setRunningReport(null), 1500)
  }

  const reports: ReportCard[] = [
    {
      id: "pipeline",
      title: "Pipeline Report",
      description: "Deal distribution across stages with value and count",
      icon: <GitBranch className="h-5 w-5" />,
      accent: "text-[var(--primary)]",
      metric: formatCurrency(1476000),
      metricLabel: "Total Pipeline",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={PIPELINE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="deals" fill="var(--primary)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "winloss",
      title: "Win / Loss Analysis",
      description: "Monthly won vs lost deals trend and reasons",
      icon: <Target className="h-5 w-5" />,
      accent: "text-emerald-600",
      metric: "73%",
      metricLabel: "Win Rate (YTD)",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={WIN_LOSS_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="won" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="lost" fill="#ef4444" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "activity",
      title: "Sales Activity Report",
      description: "Calls, emails and meetings logged by rep",
      icon: <Activity className="h-5 w-5" />,
      accent: "text-violet-600",
      metric: "588",
      metricLabel: "Activities this month",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={ACTIVITY_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="calls" fill="#6366f1" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="emails" fill="var(--accent)" radius={[2, 2, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "leadsource",
      title: "Lead Source Analysis",
      description: "Lead volume and quality by acquisition channel",
      icon: <Users className="h-5 w-5" />,
      accent: "text-[var(--accent)]",
      metric: "892",
      metricLabel: "Total leads this quarter",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <PieChart>
            <Pie data={LEAD_SOURCE_DATA} cx="50%" cy="50%" innerRadius={20} outerRadius={38} dataKey="value">
              {LEAD_SOURCE_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "repperfomance",
      title: "Rep Performance",
      description: "Quota attainment, deals closed and win rate by rep",
      icon: <TrendingUp className="h-5 w-5" />,
      accent: "text-amber-600",
      metric: "68%",
      metricLabel: "Team quota attainment",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={REP_PERFORMANCE} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="actual" fill="#f59e0b" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "funnel",
      title: "Conversion Funnel",
      description: "Lead-to-close conversion rates at each stage",
      icon: <BarChart2 className="h-5 w-5" />,
      accent: "text-blue-600",
      metric: "3.1%",
      metricLabel: "Lead-to-close rate",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={CONVERSION_DATA} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="count" fill="var(--primary)" opacity={0.7} radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "velocity",
      title: "Deal Velocity",
      description: "Average days to close — track sales cycle trends",
      icon: <Clock className="h-5 w-5" />,
      accent: "text-rose-600",
      metric: "35 days",
      metricLabel: "Avg deal cycle (Jun)",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={VELOCITY_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Line type="monotone" dataKey="days" stroke="#f43f5e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "campaignroi",
      title: "Campaign ROI",
      description: "Revenue attributed to campaigns vs spend",
      icon: <Megaphone className="h-5 w-5" />,
      accent: "text-teal-600",
      metric: "3,498%",
      metricLabel: "Avg campaign ROI",
      chart: (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={CAMPAIGN_ROI} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="roi" fill="#14b8a6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Reports</h1>
            <p className="text-sm text-[var(--muted-foreground)]">CRM analytics and reporting hub</p>
          </div>
          <Button size="sm" variant="outline" className="h-9 text-sm">
            <Download className="h-4 w-4 mr-2" />Export All
          </Button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="border-b border-[var(--border)] bg-[var(--muted)]/40 px-6 py-3">
        <div className="flex items-center gap-6 overflow-x-auto">
          {[
            { label: "Total Pipeline", value: formatCurrency(1476000), up: true },
            { label: "Won This Quarter", value: formatCurrency(765000), up: true },
            { label: "Win Rate", value: "73%", up: true },
            { label: "Avg Deal Cycle", value: "35 days", up: false },
            { label: "Leads This Month", value: "312", up: true },
            { label: "Activities Logged", value: "588", up: true },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 shrink-0">
              <div>
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">{s.label}</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-[var(--foreground)]">{s.value}</p>
                  <ArrowUpRight className={cn("h-3 w-3", s.up ? "text-emerald-500" : "text-red-500 rotate-90")} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {reports.map(r => (
            <Card key={r.id} className="border border-[var(--border)] hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={cn("inline-flex p-2 rounded-lg bg-[var(--muted)]", r.accent)}>
                    {r.icon}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost" size="sm"
                      className="h-7 text-xs"
                      onClick={() => runReport(r.id)}
                    >
                      {runningReport === r.id ? (
                        <span className="text-[var(--primary)] flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
                          Running...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Play className="h-3 w-3" />Run
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <CardTitle className="text-sm font-semibold">{r.title}</CardTitle>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">{r.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mini chart */}
                <div className="mb-3">
                  {r.chart}
                </div>
                <div className="pt-2 border-t border-[var(--border)]">
                  <p className={cn("text-lg font-bold", r.accent)}>{r.metric}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">{r.metricLabel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Tables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline by Stage */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Pipeline by Stage</CardTitle>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-[var(--primary)]">Full Report →</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Stage", "Deals", "Value", "Avg Days"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {PIPELINE_DATA.map(row => (
                    <tr key={row.stage} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-2.5 font-medium text-xs">{row.stage}</td>
                      <td className="px-4 py-2.5 text-xs">{row.deals}</td>
                      <td className="px-4 py-2.5 font-semibold text-xs">{formatCurrency(row.value)}</td>
                      <td className="px-4 py-2.5 text-xs text-[var(--muted-foreground)]">{Math.floor(Math.random() * 20 + 5)}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Rep Performance */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Rep Performance</CardTitle>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-[var(--primary)]">Full Report →</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Rep", "Quota", "Actual", "Win Rate", "Attainment"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {REP_PERFORMANCE.map(r => (
                    <tr key={r.rep} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-2.5 font-medium text-xs">{r.rep}</td>
                      <td className="px-4 py-2.5 text-xs text-[var(--muted-foreground)]">{formatCurrency(r.quota)}</td>
                      <td className="px-4 py-2.5 font-semibold text-xs text-emerald-600">{formatCurrency(r.actual)}</td>
                      <td className="px-4 py-2.5 text-xs">{r.winRate}%</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 bg-[var(--muted)] rounded-full h-1.5">
                            <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: `${Math.round(r.actual / r.quota * 100)}%` }} />
                          </div>
                          <span className="text-xs font-medium">{Math.round(r.actual / r.quota * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
