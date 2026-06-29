"use client"

import React, { useState } from "react"
import { Plus, AlertTriangle, Clock, Filter, ChevronDown, Edit2, User, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ACTIVE_ESCALATIONS = [
  { id: 2041, customer: "Jordan Clarke", company: "DataVault Ltd", priority: "Critical", waitTime: "3h 22m", slaBreach: true, assignedTo: "Priya Mehta", escalatedTo: "Platform Team", escalatedAt: "10 Jun, 11:32" },
  { id: 2035, customer: "Mia Nguyen", company: "Apex Analytics", priority: "Critical", waitTime: "2h 47m", slaBreach: true, assignedTo: "James Hartley", escalatedTo: "Tier 2 Support", escalatedAt: "10 Jun, 10:15" },
  { id: 2029, customer: "Oliver Grant", company: "ClearCloud Inc", priority: "High", waitTime: "5h 10m", slaBreach: true, assignedTo: "Sara Collins", escalatedTo: "Senior Engineer", escalatedAt: "10 Jun, 06:50" },
  { id: 2018, customer: "Ava Thompson", company: "BrightPulse Ltd", priority: "High", waitTime: "1h 55m", slaBreach: false, assignedTo: "Tom Okafor", escalatedTo: "Team Lead", escalatedAt: "10 Jun, 13:05" },
  { id: 2011, customer: "Noah Kim", company: "Venture Stack", priority: "Medium", waitTime: "9h 30m", slaBreach: true, assignedTo: "Ellie Brooks", escalatedTo: "Tier 2 Support", escalatedAt: "9 Jun, 23:30" },
  { id: 2007, customer: "Sophia Lewis", company: "MetaScale Co", priority: "High", waitTime: "4h 12m", slaBreach: false, assignedTo: "Priya Mehta", escalatedTo: "Product Team", escalatedAt: "10 Jun, 09:48" },
]

const ESCALATION_RULES = [
  { id: 1, name: "Critical SLA Breach", condition: "Ticket open > 1h AND Priority = Critical", action: "Escalate to Platform Team", priority: 1, active: true },
  { id: 2, name: "High Priority Unresponsive", condition: "No agent response > 2h AND Priority = High", action: "Escalate to Team Lead", priority: 2, active: true },
  { id: 3, name: "Medium Overdue", condition: "Ticket open > 24h AND Priority = Medium", action: "Escalate to Tier 2 Support", priority: 3, active: true },
  { id: 4, name: "VIP Customer Any Priority", condition: "Customer tag = VIP AND Open > 30 min", action: "Notify Account Manager", priority: 4, active: true },
  { id: 5, name: "Weekend Critical", condition: "Priority = Critical AND Day = Weekend", action: "Page On-Call Engineer", priority: 5, active: false },
]

const priorityColor: Record<string, { color: string; bg: string }> = {
  Critical: { color: "#dc2626", bg: "#fef2f2" },
  High:     { color: "#d97706", bg: "#fffbeb" },
  Medium:   { color: "#1a56db", bg: "#eff6ff" },
  Low:      { color: "#6b7280", bg: "#f9fafb" },
}

export default function EscalationsPage() {
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [breachFilter, setBreachFilter] = useState("all")

  const filtered = ACTIVE_ESCALATIONS.filter(e => {
    const matchPriority = priorityFilter === "all" || e.priority === priorityFilter
    const matchBreach = breachFilter === "all" || (breachFilter === "breached" ? e.slaBreach : !e.slaBreach)
    return matchPriority && matchBreach
  })

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Escalations</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Active escalations and escalation rule management</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> New Rule
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Escalations", value: String(ACTIVE_ESCALATIONS.length), color: "#dc2626" },
          { label: "SLA Breached",       value: String(ACTIVE_ESCALATIONS.filter(e => e.slaBreach).length), color: "#dc2626" },
          { label: "Pending Response",   value: "4", color: "#d97706" },
          { label: "Resolved Today",     value: "11", color: "#16a34a" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Escalations */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" style={{ color: "#dc2626" }} />
              Active Escalations
            </CardTitle>
            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={e => setPriorityFilter(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--muted-foreground)] pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={breachFilter}
                  onChange={e => setBreachFilter(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none"
                >
                  <option value="all">All Tickets</option>
                  <option value="breached">SLA Breached</option>
                  <option value="ok">SLA OK</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--muted-foreground)] pointer-events-none" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Ticket #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Waiting Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">SLA Breach</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Assigned To</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Escalated To</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Escalated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(e => {
                  const pc = priorityColor[e.priority]
                  return (
                    <tr key={e.id} className="hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-semibold text-[var(--primary)]">#{e.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px]" style={{ background: "var(--primary)", color: "white" }}>
                              {e.customer.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium text-[var(--foreground)]">{e.customer}</p>
                            <p className="text-[10px] text-[var(--muted-foreground)]">{e.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ color: pc.color, background: pc.bg }}>
                          {e.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-mono" style={{ color: "#d97706" }}>
                          <Clock className="h-3 w-3" /> {e.waitTime}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {e.slaBreach
                          ? <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ color: "#dc2626", background: "#fef2f2" }}>
                              <AlertTriangle className="h-3 w-3" /> Breached
                            </span>
                          : <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ color: "#16a34a", background: "#f0fdf4" }}>
                              OK
                            </span>
                        }
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--foreground)]">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 text-[var(--muted-foreground)]" />
                          {e.assignedTo}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                          <Zap className="h-3 w-3 text-[var(--muted-foreground)]" />
                          {e.escalatedTo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{e.escalatedAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Rules */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Escalation Rules</CardTitle>
          <span className="text-xs text-[var(--muted-foreground)]">Drag to reorder</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--border)]">
            {ESCALATION_RULES.map(rule => (
              <div key={rule.id} className={`flex items-center gap-4 px-4 py-3 hover:bg-[var(--secondary)] transition-colors ${!rule.active ? "opacity-50" : ""}`}>
                <span className="text-xs font-bold text-[var(--muted-foreground)] w-5">{rule.priority}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">{rule.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    <span style={{ color: "#1a56db" }}>IF</span> {rule.condition} →{" "}
                    <span style={{ color: "#16a34a" }}>THEN</span> {rule.action}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${rule.active ? "" : "opacity-60"}`}
                    style={{ color: rule.active ? "#16a34a" : "#6b7280", background: rule.active ? "#f0fdf4" : "#f3f4f6" }}>
                    {rule.active ? "Active" : "Inactive"}
                  </span>
                  <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
