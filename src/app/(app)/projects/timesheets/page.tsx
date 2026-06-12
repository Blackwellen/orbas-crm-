"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"

const TEAM = ["Sarah Kim","James Robertson","Lucy Chen","Alex Turner","Mike Davies","Priya Sharma"]
const PROJECTS = ["Orbas Platform Rebuild","ERP Integration Phase 2","Mobile App v3.0","Customer Portal","Supply Chain API"]
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

// Mock hours data: team[member][day][projectIndex]
const HOURS_DATA: Record<string, Record<string, Record<string, number>>> = {
  "Sarah Kim":       { Mon: { "Orbas Platform Rebuild": 6, "Customer Portal": 2 }, Tue: { "Orbas Platform Rebuild": 7 }, Wed: { "Supply Chain API": 4, "Orbas Platform Rebuild": 3 }, Thu: { "Orbas Platform Rebuild": 8 }, Fri: { "Orbas Platform Rebuild": 5 }, Sat: {}, Sun: {} },
  "James Robertson": { Mon: { "ERP Integration Phase 2": 8 }, Tue: { "ERP Integration Phase 2": 7, "Orbas Platform Rebuild": 1 }, Wed: { "ERP Integration Phase 2": 8 }, Thu: { "ERP Integration Phase 2": 6, "Customer Portal": 2 }, Fri: { "ERP Integration Phase 2": 7 }, Sat: {}, Sun: {} },
  "Lucy Chen":       { Mon: { "Mobile App v3.0": 8 }, Tue: { "Mobile App v3.0": 6 }, Wed: { "Mobile App v3.0": 7 }, Thu: { "Orbas Platform Rebuild": 4, "Mobile App v3.0": 3 }, Fri: { "Mobile App v3.0": 8 }, Sat: {}, Sun: {} },
  "Alex Turner":     { Mon: { "Customer Portal": 8 }, Tue: { "Customer Portal": 7 }, Wed: { "Supply Chain API": 8 }, Thu: { "Customer Portal": 5 }, Fri: { "Customer Portal": 6 }, Sat: {}, Sun: {} },
  "Mike Davies":     { Mon: { "Supply Chain API": 8 }, Tue: { "Supply Chain API": 7 }, Wed: { "Supply Chain API": 8 }, Thu: { "Supply Chain API": 6 }, Fri: { "Supply Chain API": 7 }, Sat: {}, Sun: {} },
  "Priya Sharma":    { Mon: { "Orbas Platform Rebuild": 6, "Mobile App v3.0": 2 }, Tue: { "ERP Integration Phase 2": 8 }, Wed: { "Mobile App v3.0": 7 }, Thu: { "Orbas Platform Rebuild": 8 }, Fri: { "ERP Integration Phase 2": 6 }, Sat: {}, Sun: {} },
}

function dayTotal(member: string, day: string) {
  const entries = HOURS_DATA[member]?.[day] ?? {}
  return Object.values(entries).reduce((a, b) => a + b, 0)
}

function memberTotal(member: string) {
  return DAYS.reduce((sum, d) => sum + dayTotal(member, d), 0)
}

const APPROVALS = [
  { id: 1, member: "Lucy Chen",       week: "W27", hours: 40, status: "Pending",  submitted: "2025-07-06" },
  { id: 2, member: "James Robertson", week: "W27", hours: 37, status: "Pending",  submitted: "2025-07-06" },
  { id: 3, member: "Mike Davies",     week: "W26", hours: 36, status: "Approved", submitted: "2025-06-29" },
  { id: 4, member: "Alex Turner",     week: "W26", hours: 34, status: "Approved", submitted: "2025-06-29" },
  { id: 5, member: "Priya Sharma",    week: "W25", hours: 35, status: "Rejected", submitted: "2025-06-22" },
]

type TabId = "my" | "team" | "all" | "approvals"

export default function TimesheetsPage() {
  const [tab, setTab] = useState<TabId>("team")
  const [weekOffset, setWeekOffset] = useState(0)
  const [memberFilter, setMemberFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

  const weekLabel = weekOffset === 0 ? "This Week (W27)" : weekOffset === -1 ? "Last Week (W26)" : `W${27 + weekOffset}`

  const billableHours = TEAM.reduce((sum, m) => sum + memberTotal(m), 0) * 0.85
  const nonBillable = TEAM.reduce((sum, m) => sum + memberTotal(m), 0) * 0.15
  const totalHours = TEAM.reduce((sum, m) => sum + memberTotal(m), 0)
  const overtime = TEAM.reduce((sum, m) => sum + Math.max(0, memberTotal(m) - 40), 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Timesheets</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Track and manage team time entries</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> Log Time
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Hours This Week", value: `${totalHours}h`, accent: "var(--primary)" },
          { label: "Billable", value: `${Math.round(billableHours)}h`, accent: "#22c55e" },
          { label: "Non-Billable", value: `${Math.round(nonBillable)}h`, accent: "#f59e0b" },
          { label: "Overtime", value: `${overtime}h`, accent: "#ef4444" },
        ].map(k => (
          <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: k.accent }}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b flex gap-1" style={{ borderColor: "var(--border)" }}>
        {([["my","My Timesheets"],["team","Team"],["all","All"],["approvals","Approvals"]] as [TabId,string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: tab === id ? "var(--primary)" : "transparent",
              color: tab === id ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === "team" || tab === "all") && (
        <>
          {/* Week nav + filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5" style={{ borderColor: "var(--border)" }}>
              <button onClick={() => setWeekOffset(w => w - 1)}>
                <ChevronLeft className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
              </button>
              <span className="text-sm font-medium w-36 text-center" style={{ color: "var(--foreground)" }}>{weekLabel}</span>
              <button onClick={() => setWeekOffset(w => w + 1)}>
                <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Team Member" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {TEAM.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-52"><SelectValue placeholder="Project" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {PROJECTS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Weekly grid */}
          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      <th className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Team Member</th>
                      {DAYS.map(d => (
                        <th key={d} className="text-center px-3 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{d}</th>
                      ))}
                      <th className="text-right px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM.filter(m => memberFilter === "all" || m === memberFilter).map(m => {
                      const total = memberTotal(m)
                      return (
                        <tr key={m} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                                {m.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium" style={{ color: "var(--foreground)" }}>{m}</span>
                            </div>
                          </td>
                          {DAYS.map(d => {
                            const h = dayTotal(m, d)
                            return (
                              <td key={d} className="px-3 py-3 text-center">
                                {h > 0 ? (
                                  <span
                                    className="inline-flex items-center justify-center h-8 w-10 rounded-lg text-xs font-semibold"
                                    style={{
                                      background: h >= 8 ? "rgba(34,197,94,0.15)" : h >= 6 ? "rgba(26,86,219,0.12)" : "rgba(245,158,11,0.12)",
                                      color: h >= 8 ? "#16a34a" : h >= 6 ? "var(--primary)" : "#d97706",
                                    }}
                                  >
                                    {h}h
                                  </span>
                                ) : (
                                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>—</span>
                                )}
                              </td>
                            )
                          })}
                          <td className="px-4 py-3 text-right">
                            <span className="font-bold" style={{ color: total > 40 ? "#ef4444" : "var(--foreground)" }}>{total}h</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {tab === "my" && (
        <div className="rounded-xl border flex flex-col items-center justify-center py-16" style={{ borderColor: "var(--border)" }}>
          <Clock className="h-10 w-10 mb-3" style={{ color: "var(--muted-foreground)" }} />
          <p className="font-medium" style={{ color: "var(--foreground)" }}>No time entries this week</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Click Log Time to add your first entry</p>
        </div>
      )}

      {tab === "approvals" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                  {["Team Member","Week","Hours","Submitted","Status","Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPROVALS.map(a => (
                  <tr key={a.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{a.member}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{a.week}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{a.hours}h</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{a.submitted}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                        style={
                          a.status === "Approved" ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                          : a.status === "Rejected" ? { background: "rgba(239,68,68,0.12)", color: "#dc2626" }
                          : { background: "rgba(245,158,11,0.12)", color: "#d97706" }
                        }
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {a.status === "Pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="h-7 text-xs" style={{ background: "#22c55e", color: "#fff" }}>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
