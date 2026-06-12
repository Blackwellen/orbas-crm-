"use client"

import React, { useState } from "react"
import { Plus, Clock, CheckCircle, AlertTriangle, Edit2, ToggleLeft, ToggleRight, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const SLA_POLICIES = [
  {
    id: 1, name: "Enterprise SLA", priority: "Critical", responseTime: "1h", resolutionTime: "4h",
    businessHours: "24x7", escalationAfter: "30 min", active: true,
    compliance: 87, breaches: 3,
  },
  {
    id: 2, name: "Enterprise SLA", priority: "High", responseTime: "2h", resolutionTime: "8h",
    businessHours: "24x7", escalationAfter: "1h", active: true,
    compliance: 92, breaches: 2,
  },
  {
    id: 3, name: "Standard SLA", priority: "Medium", responseTime: "4h", resolutionTime: "24h",
    businessHours: "9x5", escalationAfter: "2h", active: true,
    compliance: 96, breaches: 1,
  },
  {
    id: 4, name: "Standard SLA", priority: "Low", responseTime: "8h", resolutionTime: "48h",
    businessHours: "9x5", escalationAfter: "4h", active: true,
    compliance: 99, breaches: 0,
  },
  {
    id: 5, name: "Basic SLA", priority: "Medium", responseTime: "8h", resolutionTime: "3d",
    businessHours: "9x5", escalationAfter: "4h", active: false,
    compliance: 94, breaches: 0,
  },
]

const complianceData = [
  { name: "Compliant", value: 87, color: "#16a34a" },
  { name: "Breached",  value: 13, color: "#dc2626" },
]

const kpis = [
  { label: "Active Policies", value: "4", icon: CheckCircle, color: "#16a34a" },
  { label: "Total Breaches",  value: "6",  icon: AlertTriangle, color: "#dc2626" },
  { label: "Compliance Rate", value: "94%", icon: TrendingUp, color: "#1a56db" },
  { label: "Avg Resolution",  value: "5.2h", icon: Clock, color: "#d97706" },
]

const priorityBreakdown = [
  { priority: "Critical", count: 8,  sla: "1h / 4h",  breaches: 3, compliance: 87 },
  { priority: "High",     count: 19, sla: "2h / 8h",  breaches: 2, compliance: 92 },
  { priority: "Medium",   count: 34, sla: "4h / 24h", breaches: 1, compliance: 96 },
  { priority: "Low",      count: 23, sla: "8h / 48h", breaches: 0, compliance: 99 },
]

const priorityColor: Record<string, string> = {
  Critical: "#dc2626",
  High: "#d97706",
  Medium: "#1a56db",
  Low: "#6b7280",
}

export default function SLAPage() {
  const [policies, setPolicies] = useState(SLA_POLICIES)

  function togglePolicy(id: number) {
    setPolicies(p => p.map(pol => pol.id === id ? { ...pol, active: !pol.active } : pol))
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">SLA Policies</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Service level agreement management and compliance monitoring</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> New SLA Policy
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg" style={{ background: k.color + "18" }}>
                <k.icon className="h-5 w-5" style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Donut */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Overall Compliance — June 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={complianceData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                    {complianceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {complianceData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-[var(--muted-foreground)]">{d.name}</span>
                    <span className="text-sm font-bold text-[var(--foreground)] ml-auto">{d.value}%</span>
                  </div>
                ))}
                <p className="text-xs text-[var(--muted-foreground)] pt-1">Total: 6 breaches this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Breakdown */}
        <Card className="border border-[var(--border)] lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Per-Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--muted-foreground)]">Priority</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--muted-foreground)]">Tickets</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--muted-foreground)]">SLA Target</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--muted-foreground)]">Breaches</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--muted-foreground)]">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {priorityBreakdown.map(row => (
                  <tr key={row.priority} className="hover:bg-[var(--secondary)]">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        style={{ background: priorityColor[row.priority] }}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--foreground)]">{row.count}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{row.sla}</td>
                    <td className="px-4 py-3 text-right">
                      <span style={{ color: row.breaches > 0 ? "#dc2626" : "#16a34a" }} className="font-semibold">{row.breaches}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 rounded-full overflow-hidden" style={{ background: "var(--secondary)", height: 6 }}>
                          <div className="h-full rounded-full" style={{ width: `${row.compliance}%`, background: row.compliance >= 95 ? "#16a34a" : row.compliance >= 85 ? "#d97706" : "#dc2626" }} />
                        </div>
                        <span className="text-xs font-semibold text-[var(--foreground)]">{row.compliance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Policies Table */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">All SLA Policies</CardTitle>
          <span className="text-xs text-[var(--muted-foreground)]">{policies.filter(p => p.active).length} active</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Policy Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Response Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Resolution Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Business Hours</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Escalation</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Compliance</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--muted-foreground)]">Active</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {policies.map(pol => (
                  <tr key={pol.id} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{pol.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style={{ background: priorityColor[pol.priority] }}>
                        {pol.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]">{pol.responseTime}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]">{pol.resolutionTime}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                        <Clock className="h-3 w-3" /> {pol.businessHours}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">After {pol.escalationAfter}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold" style={{ color: pol.compliance >= 95 ? "#16a34a" : pol.compliance >= 85 ? "#d97706" : "#dc2626" }}>
                        {pol.compliance}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => togglePolicy(pol.id)}>
                        {pol.active
                          ? <ToggleRight className="h-5 w-5 inline" style={{ color: "#16a34a" }} />
                          : <ToggleLeft className="h-5 w-5 inline text-[var(--muted-foreground)]" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
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
