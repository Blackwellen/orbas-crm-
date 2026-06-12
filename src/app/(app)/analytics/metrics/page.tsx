"use client"

import React, { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

const categories = ["All", "Revenue", "Sales", "People", "Service", "Marketing"]

const metrics = [
  { name: "Total Revenue",     cat: "Revenue",   value: "£284,500", target: "£300,000", trend: "+12.4%", up: true,  progress: 95 },
  { name: "MRR",               cat: "Revenue",   value: "£47,250",  target: "£50,000",  trend: "+5.2%",  up: true,  progress: 95 },
  { name: "ARR",               cat: "Revenue",   value: "£567,000", target: "£600,000", trend: "+8.1%",  up: true,  progress: 95 },
  { name: "Gross Margin",      cat: "Revenue",   value: "68.4%",    target: "70%",      trend: "+1.2%",  up: true,  progress: 98 },
  { name: "Pipeline Value",    cat: "Sales",     value: "£1.24M",   target: "£1.5M",    trend: "+3.7%",  up: true,  progress: 83 },
  { name: "Win Rate",          cat: "Sales",     value: "38.2%",    target: "40%",      trend: "+2.1%",  up: true,  progress: 96 },
  { name: "Avg Deal Size",     cat: "Sales",     value: "£14,800",  target: "£15,000",  trend: "-2.1%",  up: false, progress: 99 },
  { name: "Sales Cycle Days",  cat: "Sales",     value: "21 days",  target: "18 days",  trend: "-3 days",up: true,  progress: 83 },
  { name: "Headcount",         cat: "People",    value: "148",      target: "160",      trend: "+4",     up: true,  progress: 93 },
  { name: "Attrition Rate",    cat: "People",    value: "4.2%",     target: "<5%",      trend: "-0.3%",  up: true,  progress: 84 },
  { name: "CSAT Score",        cat: "Service",   value: "4.6/5",    target: "4.5/5",    trend: "+0.1",   up: true,  progress: 102 },
  { name: "Ticket SLA %",      cat: "Service",   value: "91.4%",    target: "95%",      trend: "-1.2%",  up: false, progress: 96 },
  { name: "Open Tickets",      cat: "Service",   value: "84",       target: "<100",     trend: "+12",    up: false, progress: 84 },
  { name: "Lead Conversion",   cat: "Marketing", value: "12.8%",    target: "15%",      trend: "+0.8%",  up: true,  progress: 85 },
  { name: "CAC",               cat: "Marketing", value: "£1,240",   target: "<£1,500",  trend: "-£80",   up: true,  progress: 83 },
  { name: "LTV:CAC Ratio",     cat: "Marketing", value: "7.2x",     target: "6x",       trend: "+0.4x",  up: true,  progress: 120 },
]

export default function MetricsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All" ? metrics : metrics.filter(m => m.cat === activeCategory)

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Metrics Catalogue</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Track all key business metrics and targets</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === c
                ? "bg-[var(--primary)] text-white"
                : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(m => (
          <div key={m.name} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-[var(--muted-foreground)]">{m.name}</p>
                <p className="text-xl font-bold mt-1 text-[var(--foreground)]">{m.value}</p>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${m.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {m.trend}
              </span>
            </div>

            {/* Sparkline */}
            <div className="flex items-end gap-0.5 h-10 mb-3">
              {[55,48,62,58,70,65,72,68,80,75,88,100].map((h,i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: m.up ? "var(--primary)" : "#ef4444", opacity: 0.6 + i * 0.03 }} />
              ))}
            </div>

            {/* Target progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted-foreground)]">Target: {m.target}</span>
                <span className={m.progress >= 100 ? "text-emerald-600 font-medium" : "text-[var(--muted-foreground)]"}>
                  {Math.min(m.progress, 100)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                <div
                  className={`h-full rounded-full ${m.progress >= 100 ? "bg-emerald-500" : "bg-[var(--primary)]"}`}
                  style={{ width: `${Math.min(m.progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
