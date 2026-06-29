"use client"

import React from "react"
import Link from "next/link"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts"
import {
  UserPlus, Users, TrendingUp, CheckSquare, DollarSign,
  Plus, Upload, Download, Clock, Phone, Mail, Calendar,
  ChevronRight, Circle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, getInitials } from "@/lib/utils"

const pipelineData = [
  { stage: "Prospecting", value: 420000, count: 28 },
  { stage: "Qualification", value: 310000, count: 19 },
  { stage: "Proposal", value: 280000, count: 15 },
  { stage: "Negotiation", value: 165000, count: 12 },
  { stage: "Closing", value: 65000, count: 10 },
]

const kpiData = [
  { label: "Total Leads",    value: "247",     sub: "+18 this week",  icon: UserPlus,    color: "text-blue-600",   bg: "bg-blue-50" },
  { label: "Active Deals",   value: "84",      sub: "12 closing soon",icon: TrendingUp,  color: "text-emerald-600",bg: "bg-emerald-50" },
  { label: "Pipeline Value", value: "Â£1.24M",  sub: "across 5 stages",icon: DollarSign,  color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Won MTD",        value: "Â£89K",    sub: "67% of target",  icon: CheckSquare, color: "text-cyan-600",   bg: "bg-cyan-50" },
  { label: "Overdue Tasks",  value: "12",      sub: "Needs attention", icon: Clock,       color: "text-red-600",    bg: "bg-red-50" },
]

const kanbanStages = [
  { name: "Prospecting",   count: 28, value: 420000, deals: [{ name: "Fintech Corp Ltd", val: 95000 }, { name: "NovaBuild Group", val: 72000 }] },
  { name: "Qualification", count: 19, value: 310000, deals: [{ name: "Vertex Solutions", val: 48000 }, { name: "Oakfield Media", val: 61000 }] },
  { name: "Proposal",      count: 15, value: 280000, deals: [{ name: "BlueWave Digital", val: 34000 }, { name: "Sandstone Corp", val: 55000 }] },
  { name: "Negotiation",   count: 12, value: 165000, deals: [{ name: "TechGrid Ltd", val: 82000 }, { name: "Prism Analytics", val: 42000 }] },
  { name: "Closing",       count: 10, value: 65000,  deals: [{ name: "Crestview Labs", val: 38000 }, { name: "Hartfield & Co", val: 27000 }] },
]

const stageColors: Record<string, string> = {
  Prospecting: "bg-slate-100 text-slate-700",
  Qualification: "bg-blue-100 text-blue-700",
  Proposal: "bg-violet-100 text-violet-700",
  Negotiation: "bg-amber-100 text-amber-700",
  Closing: "bg-emerald-100 text-emerald-700",
}

const activityFeed = [
  { icon: UserPlus, text: "New lead James Whitfield from Fintech Corp Ltd", time: "2m ago",  color: "text-blue-500" },
  { icon: Phone,    text: "Call logged with Sarah Chen Â· BlueWave Digital", time: "18m ago", color: "text-emerald-500" },
  { icon: TrendingUp, text: "Deal 'Enterprise SaaS Rollout' moved to Proposal", time: "34m ago", color: "text-violet-500" },
  { icon: Mail,     text: "Email sent to Oliver Hughes Â· TechGrid Ltd", time: "1h ago",  color: "text-cyan-500" },
  { icon: CheckSquare, text: "Task completed: Send pricing deck to Prism Analytics", time: "2h ago", color: "text-slate-500" },
  { icon: Calendar, text: "Meeting scheduled with Crestview Labs for 14 Jun", time: "3h ago", color: "text-amber-500" },
  { icon: UserPlus, text: "Lead Emma Thornton converted to contact", time: "4h ago",  color: "text-blue-500" },
  { icon: TrendingUp, text: "Deal 'Oakfield Media CRM' marked as Won â€” Â£61K", time: "5h ago", color: "text-emerald-600" },
]

const openDeals = [
  { id: "1", name: "Enterprise SaaS Rollout", account: "Fintech Corp Ltd",   stage: "Proposal",     value: 95000, owner: "Alex Turner",    close: "30 Jun 2026", prob: 65 },
  { id: "2", name: "CRM Implementation",      account: "BlueWave Digital",   stage: "Negotiation",  value: 82000, owner: "Sarah Mitchell", close: "15 Jul 2026", prob: 75 },
  { id: "3", name: "Data Analytics Suite",    account: "Prism Analytics",    stage: "Qualification",value: 48000, owner: "James Park",     close: "22 Jul 2026", prob: 45 },
  { id: "4", name: "Cloud Migration Pack",    account: "TechGrid Ltd",       stage: "Prospecting",  value: 67000, owner: "Chloe Evans",    close: "31 Jul 2026", prob: 30 },
  { id: "5", name: "Digital Transformation",  account: "Sandstone Corp",     stage: "Proposal",     value: 55000, owner: "Tom Bradley",    close: "5 Aug 2026",  prob: 60 },
  { id: "6", name: "Marketing Automation",    account: "Oakfield Media",     stage: "Closing",      value: 38000, owner: "Alex Turner",    close: "12 Jun 2026", prob: 90 },
  { id: "7", name: "Security Audit Bundle",   account: "Vertex Solutions",   stage: "Qualification",value: 42000, owner: "Sarah Mitchell", close: "20 Jul 2026", prob: 50 },
  { id: "8", name: "Platform Upgrade",        account: "NovaBuild Group",    stage: "Negotiation",  value: 72000, owner: "James Park",     close: "28 Jun 2026", prob: 80 },
  { id: "9", name: "CMS Integration",         account: "Hartfield & Co",     stage: "Closing",      value: 27000, owner: "Chloe Evans",    close: "10 Jun 2026", prob: 95 },
  { id: "10",name: "Analytics Dashboard",     account: "Crestview Labs",     stage: "Proposal",     value: 34000, owner: "Tom Bradley",    close: "18 Aug 2026", prob: 55 },
]

export default function CrmOverviewPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">CRM</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Customer relationship overview Â· Updated just now</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" asChild>
            <Link href="/app/crm/leads/new"><Upload className="h-4 w-4 mr-1.5" />Import</Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" />Export
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/app/crm/leads/new"><Plus className="h-4 w-4 mr-1.5" />New Lead</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/app/crm/contacts/new"><Plus className="h-4 w-4 mr-1.5" />New Contact</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/app/crm/deals/new"><Plus className="h-4 w-4 mr-1.5" />New Deal</Link>
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiData.map(kpi => (
          <Card key={kpi.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{kpi.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{kpi.sub}</p>
                </div>
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pipeline by Stage Bar Chart */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Pipeline by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pipelineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={v => `Â£${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: 12 }}
                  formatter={(v: any) => [formatCurrency(v), "Value"]}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Kanban mini-preview */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Deals Kanban</CardTitle>
            <Link href="/app/crm/deals" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="flex gap-2 p-4 min-w-[520px]">
                {kanbanStages.map(stage => (
                  <div key={stage.name} className="flex-1 min-w-[90px]">
                    <div className="text-[10px] font-semibold text-[var(--muted-foreground)] mb-1.5 truncate">{stage.name}</div>
                    <div className="text-xs font-bold text-[var(--foreground)]">{stage.count}</div>
                    <div className="text-[10px] text-[var(--muted-foreground)] mb-2">{formatCurrency(stage.value, "GBP")}</div>
                    <div className="space-y-1.5">
                      {stage.deals.map(d => (
                        <div key={d.name} className="bg-[var(--muted)] rounded-md p-1.5">
                          <div className="text-[10px] font-medium text-[var(--foreground)] truncate leading-tight">{d.name}</div>
                          <div className="text-[10px] text-[var(--muted-foreground)]">{formatCurrency(d.val)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            <Link href="/app/crm/activities" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                  <div className={`mt-0.5 shrink-0 ${item.color}`}>
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--foreground)] leading-snug">{item.text}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Deals Table */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Open Deals</CardTitle>
          <Link href="/app/crm/deals" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-0.5">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Deal Name</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Account</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Stage</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Value</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Owner</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Close Date</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {openDeals.map(deal => (
                  <tr key={deal.id} className="hover:bg-[var(--muted)] transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/deals/${deal.id}`} className="font-medium text-[var(--primary)] hover:underline">
                        {deal.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{deal.account}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${stageColors[deal.stage] || "bg-slate-100 text-slate-700"}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{formatCurrency(deal.value)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                            {getInitials(deal.owner)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[var(--muted-foreground)] text-xs">{deal.owner}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">{deal.close}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={deal.prob} className="h-1.5 w-20" />
                        <span className="text-xs text-[var(--muted-foreground)]">{deal.prob}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

