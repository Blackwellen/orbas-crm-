"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  TrendingUp, Target, DollarSign, BarChart2, Users,
  ChevronDown, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, formatCurrency, getInitials } from "@/lib/utils"

const MONTHLY_DATA = [
  { month: "Jan", forecast: 280000, actual: 262000, quota: 300000 },
  { month: "Feb", forecast: 320000, actual: 305000, quota: 300000 },
  { month: "Mar", forecast: 350000, actual: 378000, quota: 320000 },
  { month: "Apr", forecast: 290000, actual: 275000, quota: 320000 },
  { month: "May", forecast: 410000, actual: 430000, quota: 350000 },
  { month: "Jun", forecast: 385000, actual: null,   quota: 350000 },
  { month: "Jul", forecast: 420000, actual: null,   quota: 380000 },
  { month: "Aug", forecast: 460000, actual: null,   quota: 400000 },
]

const REPS = [
  { name: "Alex Turner",    quota: 450000, committed: 185000, bestCase: 245000, pipeline: 310000, gap: 265000, attainment: 41 },
  { name: "Sarah Mitchell", quota: 380000, committed: 210000, bestCase: 270000, pipeline: 425000, gap: 170000, attainment: 55 },
  { name: "James Park",     quota: 320000, committed: 120000, bestCase: 175000, pipeline: 280000, gap: 200000, attainment: 38 },
  { name: "Olivia Davies",  quota: 280000, committed: 160000, bestCase: 215000, pipeline: 195000, gap: 120000, attainment: 57 },
  { name: "Tom Harrison",   quota: 240000, committed: 95000,  bestCase: 130000, pipeline: 160000, gap: 145000, attainment: 40 },
]

const DEALS = [
  { id: "d1",  name: "Enterprise SaaS Rollout",    account: "Fintech Corp Ltd",    stage: "Proposal",     value: 95000, probability: 65, closeDate: "2026-08-31", owner: "Alex Turner",    category: "Commit" },
  { id: "d10", name: "Security Compliance Suite",  account: "Barclays PLC",        stage: "Negotiation",  value: 155000,probability: 75, closeDate: "2026-07-31", owner: "Alex Turner",    category: "Commit" },
  { id: "d5",  name: "CRM Upgrade Project",        account: "Lloyds Banking Group",stage: "Qualification",value: 125000,probability: 45, closeDate: "2026-08-31", owner: "Sarah Mitchell", category: "Pipeline" },
  { id: "d6",  name: "Digital Workplace Suite",    account: "NHS Digital",         stage: "Qualification",value: 210000,probability: 50, closeDate: "2026-09-30", owner: "Sarah Mitchell", category: "Best Case" },
  { id: "d11", name: "API Platform Rollout",       account: "Sky Group",           stage: "Negotiation",  value: 72000, probability: 80, closeDate: "2026-07-20", owner: "James Park",     category: "Commit" },
  { id: "d12", name: "SaaS Consolidation Deal",    account: "Tesco Stores Ltd",    stage: "Negotiation",  value: 198000,probability: 70, closeDate: "2026-07-15", owner: "Sarah Mitchell", category: "Best Case" },
  { id: "d4",  name: "Data Analytics Suite",       account: "Fintech Corp Ltd",    stage: "Qualification",value: 48000, probability: 40, closeDate: "2026-09-15", owner: "James Park",     category: "Pipeline" },
  { id: "d8",  name: "E-Commerce Integration",     account: "ASOS Ltd",            stage: "Proposal",     value: 67000, probability: 60, closeDate: "2026-09-01", owner: "James Park",     category: "Best Case" },
]

const categoryColors: Record<string, string> = {
  Commit:    "bg-emerald-100 text-emerald-700",
  "Best Case": "bg-blue-100 text-blue-700",
  Pipeline:  "bg-violet-100 text-violet-700",
}

const stageColors: Record<string, string> = {
  Prospecting: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Qualification: "bg-blue-100 text-blue-700",
  Proposal: "bg-violet-100 text-violet-700",
  Negotiation: "bg-amber-100 text-amber-700",
  "Closed Won": "bg-emerald-100 text-emerald-700",
  "Closed Lost": "bg-red-100 text-red-700",
}

export default function ForecastingPage() {
  const [period, setPeriod] = useState("quarter")

  const totalQuota = REPS.reduce((s, r) => s + r.quota, 0)
  const committed = REPS.reduce((s, r) => s + r.committed, 0)
  const bestCase = REPS.reduce((s, r) => s + r.bestCase, 0)
  const pipeline = REPS.reduce((s, r) => s + r.pipeline, 0)
  const attainment = Math.round((committed / totalQuota) * 100)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Sales Forecasting</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Revenue forecast and quota attainment tracking</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="h-9 w-44 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Committed Revenue", value: formatCurrency(committed), icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", change: "+12%" },
            { label: "Best Case", value: formatCurrency(bestCase), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", change: "+8%" },
            { label: "Total Pipeline", value: formatCurrency(pipeline), icon: BarChart2, color: "text-violet-600", bg: "bg-violet-50", change: "+23%" },
            { label: "Quota", value: formatCurrency(totalQuota), icon: Target, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10", change: null },
            { label: "Attainment", value: `${attainment}%`, icon: Users, color: "text-amber-600", bg: "bg-amber-50", change: "+5pp" },
          ].map(m => (
            <Card key={m.label} className="border border-[var(--border)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("p-2 rounded-lg", m.bg)}>
                    <m.icon className={cn("h-4 w-4", m.color)} />
                  </div>
                  {m.change && (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="h-3 w-3" />{m.change}
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-[var(--foreground)]">{m.value}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{m.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Attainment Progress */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Quarter Attainment</CardTitle>
              <span className="text-sm font-bold text-[var(--foreground)]">{attainment}% of quota</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Progress value={attainment} className="h-4 rounded-full" />
              <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1.5">
                <span>0%</span>
                <span className="font-medium text-[var(--foreground)]">{formatCurrency(committed)} committed</span>
                <span>Quota: {formatCurrency(totalQuota)}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: "Commit", value: committed, color: "bg-emerald-500" },
                { label: "Best Case", value: bestCase - committed, color: "bg-blue-400" },
                { label: "Pipeline", value: pipeline - bestCase, color: "bg-violet-300" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-sm", f.color)} />
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)]">{formatCurrency(f.value)}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Forecast vs Actual Chart */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Monthly Forecast vs Actual vs Quota</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `Â£${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => formatCurrency(v)} />
                <Legend />
                <ReferenceLine y={300000} stroke="var(--border)" strokeDasharray="4 4" label={{ value: "Quota", fontSize: 10 }} />
                <Bar dataKey="actual" fill="var(--primary)" name="Actual" radius={[4, 4, 0, 0]} />
                <Bar dataKey="forecast" fill="var(--accent)" opacity={0.6} name="Forecast" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rep Forecast Table */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Forecast by Rep</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  {["Rep", "Quota", "Committed", "Best Case", "Pipeline", "Gap to Quota", "Attainment"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {REPS.map(rep => (
                  <tr key={rep.name} className="hover:bg-[var(--muted)]/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(rep.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[var(--foreground)]">{rep.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatCurrency(rep.quota)}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{formatCurrency(rep.committed)}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{formatCurrency(rep.bestCase)}</td>
                    <td className="px-4 py-3 text-sm text-violet-600">{formatCurrency(rep.pipeline)}</td>
                    <td className="px-4 py-3 text-sm text-red-500">âˆ’{formatCurrency(rep.gap)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-[var(--muted)] rounded-full h-1.5">
                          <div
                            className={cn("h-1.5 rounded-full", rep.attainment >= 50 ? "bg-emerald-500" : "bg-amber-500")}
                            style={{ width: `${Math.min(rep.attainment, 100)}%` }}
                          />
                        </div>
                        <span className={cn("text-xs font-semibold", rep.attainment >= 50 ? "text-emerald-600" : "text-amber-600")}>
                          {rep.attainment}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="border-t-2 border-[var(--border)] bg-[var(--muted)]/50 font-semibold">
                  <td className="px-4 py-3 text-sm font-bold">Total</td>
                  <td className="px-4 py-3 text-sm">{formatCurrency(totalQuota)}</td>
                  <td className="px-4 py-3 text-emerald-600">{formatCurrency(committed)}</td>
                  <td className="px-4 py-3 text-blue-600">{formatCurrency(bestCase)}</td>
                  <td className="px-4 py-3 text-violet-600">{formatCurrency(pipeline)}</td>
                  <td className="px-4 py-3 text-red-500">âˆ’{formatCurrency(REPS.reduce((s, r) => s + r.gap, 0))}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-[var(--foreground)]">{attainment}%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Deal Contribution Table */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Deals Contributing to Forecast</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  {["Deal Name", "Account", "Stage", "Value", "Probability", "Weighted", "Close Date", "Owner", "Category"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {DEALS.map(d => (
                  <tr key={d.id} className="hover:bg-[var(--muted)]/50">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/deals/${d.id}`} className="font-medium text-[var(--primary)] hover:underline">{d.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{d.account}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", stageColors[d.stage])}>{d.stage}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(d.value)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{d.probability}%</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">{formatCurrency(Math.round(d.value * d.probability / 100))}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{d.closeDate}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{d.owner}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", categoryColors[d.category])}>{d.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

