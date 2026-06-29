"use client"

import React, { use, useState } from "react"
import { Plus, Edit3, TrendingUp, TrendingDown, BarChart3, PieChart, Table2, AlignLeft } from "lucide-react"

const dashboardData: Record<string, { name: string; widgets: WidgetData[] }> = {
  "1": {
    name: "Revenue Overview",
    widgets: [
      { id: "w1", type: "kpi",  title: "Total Revenue",    value: "£284,500", trend: "+12.4%", up: true },
      { id: "w2", type: "kpi",  title: "MRR",              value: "£47,250",  trend: "+5.2%",  up: true },
      { id: "w3", type: "kpi",  title: "Churn Rate",       value: "2.1%",     trend: "-0.4%",  up: true },
      { id: "w4", type: "kpi",  title: "LTV",              value: "£8,940",   trend: "+3.1%",  up: true },
      { id: "w5", type: "bar",  title: "Revenue by Month" },
      { id: "w6", type: "line", title: "MRR Growth Trend" },
      { id: "w7", type: "pie",  title: "Revenue by Segment" },
      { id: "w8", type: "table",title: "Top Accounts" },
    ]
  },
  "2": {
    name: "Sales Performance",
    widgets: [
      { id: "w1", type: "kpi",  title: "Deals Won",    value: "34",      trend: "+8",     up: true },
      { id: "w2", type: "kpi",  title: "Win Rate",     value: "38.2%",   trend: "+2.1%",  up: true },
      { id: "w3", type: "kpi",  title: "Avg Cycle",    value: "21 days", trend: "-3 days",up: true },
      { id: "w4", type: "bar",  title: "Deals by Stage" },
      { id: "w5", type: "line", title: "Win Rate Trend" },
      { id: "w6", type: "pie",  title: "Revenue by Rep" },
    ]
  },
}

interface WidgetData {
  id: string
  type: "kpi" | "bar" | "line" | "pie" | "table" | "text"
  title: string
  value?: string
  trend?: string
  up?: boolean
}

function WidgetCard({ widget, editMode }: { widget: WidgetData; editMode: boolean }) {
  const typeIcon = { bar: BarChart3, line: TrendingUp, pie: PieChart, table: Table2, text: AlignLeft, kpi: TrendingUp }
  const Icon = typeIcon[widget.type] || BarChart3

  if (widget.type === "kpi") {
    return (
      <div className={`rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 relative ${editMode ? "ring-2 ring-[var(--primary)]/30" : ""}`}>
        {editMode && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--primary)]" />}
        <p className="text-xs font-medium text-[var(--muted-foreground)]">{widget.title}</p>
        <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{widget.value}</p>
        {widget.trend && (
          <div className="flex items-center gap-1 mt-1">
            {widget.up ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> : <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
            <span className={`text-xs ${widget.up ? "text-emerald-600" : "text-red-500"}`}>{widget.trend}</span>
          </div>
        )}
        {/* Sparkline */}
        <div className="flex items-end gap-0.5 h-8 mt-3">
          {[60,45,70,55,80,65,90,75,95,88,100,92].map((h,i) => (
            <div key={i} className="flex-1 rounded-sm bg-[var(--primary)]/20" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 relative ${editMode ? "ring-2 ring-[var(--primary)]/30" : ""}`}>
      {editMode && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--primary)]" />}
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h3 className="text-sm font-semibold text-[var(--foreground)]">{widget.title}</h3>
      </div>
      <div className="flex items-end gap-1.5 h-28">
        {[40,65,52,78,60,85,70,90,66,95,80,100].map((h,i) => (
          <div key={i} className="flex-1 rounded-sm bg-[var(--primary)]/70 hover:bg-[var(--primary)] transition-colors" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

const widgetTypes = [
  { type: "kpi",   label: "KPI Card" },
  { type: "bar",   label: "Bar Chart" },
  { type: "line",  label: "Line Chart" },
  { type: "pie",   label: "Pie Chart" },
  { type: "table", label: "Table" },
  { type: "text",  label: "Text" },
]

export default function DashboardViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [editMode, setEditMode] = useState(false)
  const [showAddWidget, setShowAddWidget] = useState(false)

  const dash = dashboardData[id] ?? dashboardData["1"]

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">{dash.name}</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{dash.widgets.length} widgets · Last updated 2 hours ago</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddWidget(true)}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Widget
          </button>
          <button
            onClick={() => setEditMode(e => !e)}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${editMode ? "bg-[var(--primary)] text-white" : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)]"}`}
          >
            <Edit3 className="h-4 w-4" />
            {editMode ? "Done Editing" : "Edit Layout"}
          </button>
        </div>
      </div>

      {editMode && (
        <div className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 px-4 py-3 text-sm text-[var(--primary)]">
          Edit mode active — widgets are highlighted. Drag to reorder (visual only).
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dash.widgets.filter(w => w.type === "kpi").map(w => (
          <WidgetCard key={w.id} widget={w} editMode={editMode} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dash.widgets.filter(w => w.type !== "kpi").map(w => (
          <WidgetCard key={w.id} widget={w} editMode={editMode} />
        ))}
      </div>

      {/* Add Widget Modal */}
      {showAddWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAddWidget(false)}>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold mb-4 text-[var(--foreground)]">Add Widget</h2>
            <div className="grid grid-cols-2 gap-3">
              {widgetTypes.map(wt => (
                <button
                  key={wt.type}
                  onClick={() => setShowAddWidget(false)}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-3 text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 text-[var(--muted-foreground)]" />
                  {wt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddWidget(false)}
              className="mt-4 w-full rounded-md border border-[var(--border)] py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
