"use client"

import React from "react"
import Link from "next/link"
import { Plus, ChevronRight, TrendingUp, TrendingDown, Users, DollarSign, BarChart3, Target } from "lucide-react"

const kpis = [
  { label: "Total Revenue (MTD)", value: "£284,500", change: "+12.4%", up: true,  icon: DollarSign },
  { label: "New Customers",        value: "143",       change: "+8.1%",  up: true,  icon: Users },
  { label: "Pipeline Value",       value: "£1.24M",    change: "+3.7%",  up: true,  icon: TrendingUp },
  { label: "Avg Deal Size",        value: "£14,800",   change: "-2.1%",  up: false, icon: Target },
]

const recentDashboards = [
  { id: "1", name: "Revenue Overview",     widgets: 8,  lastViewed: "2 hours ago",   owner: "Alex Turner" },
  { id: "2", name: "Sales Performance",    widgets: 12, lastViewed: "Yesterday",     owner: "Sarah Mitchell" },
  { id: "3", name: "Customer Health",      widgets: 6,  lastViewed: "3 days ago",    owner: "James Park" },
  { id: "4", name: "Marketing Attribution",widgets: 9,  lastViewed: "1 week ago",    owner: "Chloe Evans" },
  { id: "5", name: "Support Operations",   widgets: 7,  lastViewed: "2 weeks ago",   owner: "Tom Bradley" },
]

const chartPlaceholders = [
  { label: "Revenue Trend",    color: "var(--primary)",   desc: "Monthly revenue over 12 months" },
  { label: "Win Rate by Stage",color: "#10b981",          desc: "Conversion rate per pipeline stage" },
  { label: "Ticket Volume",    color: "#f59e0b",          desc: "Support tickets opened vs closed" },
  { label: "Headcount Growth", color: "#8b5cf6",          desc: "Team headcount over time" },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Business Intelligence at a glance · Updated just now</p>
        </div>
        <Link
          href="/app/analytics/dashboards"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Create Dashboard
        </Link>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-[var(--muted-foreground)]">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.up
                    ? <TrendingUp className="h-3.5 w-3.5" style={{ color: '#16a34a' }} />
                    : <TrendingDown className="h-3.5 w-3.5" style={{ color: '#dc2626' }} />
                  }
                  <span className="text-xs font-medium" style={{ color: kpi.up ? '#16a34a' : '#dc2626' }}>{kpi.change}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">vs last month</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                <kpi.icon className="h-5 w-5 text-[var(--primary)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {chartPlaceholders.map(c => (
          <div key={c.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{c.label}</h3>
              <BarChart3 className="h-4 w-4 text-[var(--muted-foreground)]" />
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">{c.desc}</p>
            {/* Simulated sparkline bars */}
            <div className="flex items-end gap-1.5 h-28">
              {[40, 55, 48, 70, 62, 80, 74, 88, 72, 95, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${h}%`, background: c.color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Dashboards */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center justify-between p-5 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Recent Dashboards</h2>
          <Link href="/app/analytics/dashboards" className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {recentDashboards.map(d => (
            <Link
              key={d.id}
              href={`/app/analytics/dashboards/${d.id}`}
              className="flex items-center justify-between px-5 py-3 hover:bg-[var(--muted)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{d.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{d.widgets} widgets · by {d.owner}</p>
                </div>
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">Viewed {d.lastViewed}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
