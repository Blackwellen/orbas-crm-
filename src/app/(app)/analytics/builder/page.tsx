"use client"

import React, { useState } from "react"
import { Plus, Trash2, Save, Download, ChevronDown } from "lucide-react"

const dataSources = ["CRM", "Accounting", "People", "Service", "Inventory", "Projects"]
const metricsBySource: Record<string, string[]> = {
  CRM:         ["Revenue", "Deals Won", "Win Rate", "Pipeline Value", "Leads Created", "Activities"],
  Accounting:  ["Total Revenue", "Gross Profit", "Net Profit", "Invoices Issued", "Overdue Invoices", "Cash Flow"],
  People:      ["Headcount", "New Hires", "Attrition Rate", "Avg Salary", "Open Positions", "Training Hours"],
  Service:     ["Tickets Created", "Tickets Resolved", "Avg Resolution Time", "CSAT", "SLA Compliance", "Escalations"],
  Inventory:   ["Stock Level", "Stock Value", "Low Stock Items", "Reorder Triggers", "Turnover Rate"],
  Projects:    ["Projects Active", "On-Time Delivery", "Budget Variance", "Milestones Completed", "Overdue Tasks"],
}
const groupByOptions = ["Day", "Week", "Month", "Quarter", "Year", "Owner", "Stage", "Category", "Region"]
const sortDirections = ["Ascending", "Descending"]

const previewRows = [
  { period: "Jan 2026", revenue: "£42,800", deals: "18", winRate: "34%", pipeline: "£210,000" },
  { period: "Feb 2026", revenue: "£51,200", deals: "22", winRate: "38%", pipeline: "£245,000" },
  { period: "Mar 2026", revenue: "£48,600", deals: "20", winRate: "36%", pipeline: "£228,000" },
  { period: "Apr 2026", revenue: "£67,400", deals: "28", winRate: "42%", pipeline: "£312,000" },
  { period: "May 2026", revenue: "£74,500", deals: "31", winRate: "44%", pipeline: "£358,000" },
]

export default function ReportBuilderPage() {
  const [source, setSource] = useState("CRM")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["Revenue", "Deals Won", "Win Rate"])
  const [groupBy, setGroupBy] = useState("Month")
  const [sortCol, setSortCol] = useState("period")
  const [sortDir, setSortDir] = useState("Ascending")
  const [limit, setLimit] = useState("100")
  const [filters, setFilters] = useState([{ col: "Stage", op: "is", val: "Closed Won" }])

  const metrics = metricsBySource[source] || []

  function toggleMetric(m: string) {
    setSelectedMetrics(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  function addFilter() {
    setFilters(prev => [...prev, { col: "Owner", op: "is", val: "" }])
  }

  function removeFilter(i: number) {
    setFilters(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Report Builder</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Build custom reports from your data</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <Save className="h-4 w-4" />
            Save Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-5">
          {/* Data Source */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Data Source</h3>
            <div className="grid grid-cols-2 gap-2">
              {dataSources.map(s => (
                <button
                  key={s}
                  onClick={() => { setSource(s); setSelectedMetrics([]) }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    source === s
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Group By */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Group By</h3>
            <div className="relative">
              <select
                value={groupBy}
                onChange={e => setGroupBy(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] appearance-none"
              >
                {groupByOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
            </div>
          </div>

          {/* Metrics */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Metrics</h3>
            <div className="space-y-2">
              {metrics.map(m => (
                <label key={m} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(m)}
                    onChange={() => toggleMetric(m)}
                    className="h-4 w-4 rounded border-[var(--border)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Filters</h3>
              <button onClick={addFilter} className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                <Plus className="h-3.5 w-3.5" />Add
              </button>
            </div>
            <div className="space-y-2">
              {filters.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)]"
                    value={f.col}
                    onChange={e => setFilters(prev => prev.map((x,idx) => idx===i ? {...x,col:e.target.value} : x))}
                    placeholder="Column"
                  />
                  <select
                    className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)]"
                    value={f.op}
                    onChange={e => setFilters(prev => prev.map((x,idx) => idx===i ? {...x,op:e.target.value} : x))}
                  >
                    <option>is</option><option>is not</option><option>contains</option><option>&gt;</option><option>&lt;</option>
                  </select>
                  <input
                    className="flex-1 rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)]"
                    value={f.val}
                    onChange={e => setFilters(prev => prev.map((x,idx) => idx===i ? {...x,val:e.target.value} : x))}
                    placeholder="Value"
                  />
                  <button onClick={() => removeFilter(i)} className="text-[var(--muted-foreground)] hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sort & Limit */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Sort & Limit</h3>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)]"
                value={sortCol}
                onChange={e => setSortCol(e.target.value)}
                placeholder="Sort column"
              />
              <select
                className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)]"
                value={sortDir}
                onChange={e => setSortDir(e.target.value)}
              >
                {sortDirections.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--muted-foreground)] w-12">Limit</label>
              <input
                type="number"
                className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)] w-24"
                value={limit}
                onChange={e => setLimit(e.target.value)}
              />
              <span className="text-xs text-[var(--muted-foreground)]">rows</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Preview</h3>
              <span className="text-xs text-[var(--muted-foreground)]">Showing 5 of {limit} rows · {source}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">{groupBy}</th>
                    {selectedMetrics.map(m => (
                      <th key={m} className="text-left px-4 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {previewRows.map((row, i) => (
                    <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{row.period}</td>
                      {selectedMetrics.map(m => (
                        <td key={m} className="px-4 py-3 text-[var(--muted-foreground)]">
                          {m === "Revenue" || m === "Total Revenue" ? row.revenue
                            : m.includes("Deal") ? row.deals
                            : m.includes("Win") ? row.winRate
                            : m.includes("Pipeline") ? row.pipeline
                            : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart preview */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Chart Preview</h3>
            <div className="flex items-end gap-2 h-40">
              {previewRows.map((row, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-sm bg-[var(--primary)] opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${[55, 65, 62, 85, 95][i]}%` }}
                  />
                  <span className="text-[9px] text-[var(--muted-foreground)] whitespace-nowrap">{row.period.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
