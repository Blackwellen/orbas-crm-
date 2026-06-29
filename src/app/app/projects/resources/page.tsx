"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Users, AlertTriangle } from "lucide-react"

const TEAM = [
  { name: "Sarah Kim",       role: "Project Manager",   capacity: 40 },
  { name: "James Robertson", role: "Lead Developer",    capacity: 40 },
  { name: "Lucy Chen",       role: "UX Designer",       capacity: 40 },
  { name: "Alex Turner",     role: "DevOps Engineer",   capacity: 40 },
  { name: "Mike Davies",     role: "Backend Developer", capacity: 40 },
  { name: "Priya Sharma",    role: "QA Engineer",       capacity: 40 },
  { name: "Tom Bradley",     role: "Frontend Dev",      capacity: 40 },
  { name: "Anna Wong",       role: "Business Analyst",  capacity: 32 },
]

const WEEKS = ["W27","W28","W29","W30","W31","W32","W33","W34"]

// Allocation % per member per week (hours/40*100)
const ALLOCATION: Record<string, Record<string, number>> = {
  "Sarah Kim":       { W27: 75, W28: 75, W29: 80, W30: 60, W31: 50, W32: 50, W33: 40, W34: 40 },
  "James Robertson": { W27: 100, W28: 100, W29: 100, W30: 100, W31: 90, W32: 80, W33: 60, W34: 50 },
  "Lucy Chen":       { W27: 80, W28: 90, W29: 100, W30: 100, W31: 80, W32: 60, W33: 40, W34: 30 },
  "Alex Turner":     { W27: 60, W28: 70, W29: 70, W30: 80, W31: 80, W32: 100, W33: 90, W34: 60 },
  "Mike Davies":     { W27: 100, W28: 100, W29: 100, W30: 100, W31: 100, W32: 80, W33: 70, W34: 50 },
  "Priya Sharma":    { W27: 70, W28: 80, W29: 90, W30: 100, W31: 100, W32: 90, W33: 80, W34: 60 },
  "Tom Bradley":     { W27: 50, W28: 60, W29: 80, W30: 90, W31: 110, W32: 100, W33: 80, W34: 70 },
  "Anna Wong":       { W27: 40, W28: 40, W29: 50, W30: 60, W31: 60, W32: 50, W33: 40, W34: 30 },
}

function allocationColor(pct: number): { bg: string; color: string } {
  if (pct > 100) return { bg: "rgba(239,68,68,0.85)", color: "#fff" }
  if (pct >= 90) return { bg: "rgba(245,158,11,0.85)", color: "#fff" }
  if (pct >= 70) return { bg: "rgba(26,86,219,0.75)", color: "#fff" }
  if (pct > 0)   return { bg: "rgba(34,197,94,0.2)", color: "#16a34a" }
  return { bg: "transparent", color: "var(--muted-foreground)" }
}

export default function ResourcePlanPage() {
  const [teamFilter, setTeamFilter] = useState("all")
  const [weekOffset, setWeekOffset] = useState(0)

  const displayWeeks = WEEKS.slice(weekOffset, weekOffset + 6)
  const filteredTeam = TEAM.filter(m => teamFilter === "all" || m.role === teamFilter)

  const roles = Array.from(new Set(TEAM.map(m => m.role)))

  // Summary stats
  const totalCapacity = TEAM.length * 40
  const avgUtilization = Math.round(
    TEAM.reduce((sum, m) => sum + (ALLOCATION[m.name]?.["W27"] ?? 0), 0) / TEAM.length
  )
  const overAllocated = TEAM.filter(m => (ALLOCATION[m.name]?.["W27"] ?? 0) > 100).length
  const availableCapacity = Math.round(TEAM.reduce((sum, m) => {
    const pct = ALLOCATION[m.name]?.["W27"] ?? 0
    return sum + Math.max(0, 100 - pct) / 100 * (m.capacity)
  }, 0))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Resource Planning</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Team allocation and capacity overview</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Utilization Rate", value: `${avgUtilization}%`, accent: avgUtilization > 85 ? "#f59e0b" : "#22c55e", icon: Users },
          { label: "Over Allocated", value: `${overAllocated} people`, accent: overAllocated > 0 ? "#ef4444" : "#22c55e", icon: AlertTriangle },
          { label: "Available Capacity", value: `${availableCapacity}h / wk`, accent: "var(--primary)", icon: Users },
          { label: "Total Team", value: `${TEAM.length} members`, accent: "var(--accent)", icon: Users },
        ].map(k => (
          <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: k.accent }}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5" style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))} disabled={weekOffset === 0}>
            <ChevronLeft className="h-4 w-4" style={{ color: weekOffset === 0 ? "var(--muted-foreground)" : "var(--foreground)" }} />
          </button>
          <span className="text-sm font-medium w-28 text-center" style={{ color: "var(--foreground)" }}>
            {displayWeeks[0]} – {displayWeeks[displayWeeks.length - 1]}
          </span>
          <button onClick={() => setWeekOffset(w => Math.min(WEEKS.length - 6, w + 1))} disabled={weekOffset >= WEEKS.length - 6}>
            <ChevronRight className="h-4 w-4" style={{ color: weekOffset >= WEEKS.length - 6 ? "var(--muted-foreground)" : "var(--foreground)" }} />
          </button>
        </div>
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter by role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Legend */}
        <div className="flex items-center gap-3 ml-auto text-xs">
          {[
            { label: "Available (<70%)", bg: "rgba(34,197,94,0.2)", color: "#16a34a" },
            { label: "Busy (70–89%)", bg: "rgba(26,86,219,0.75)", color: "#fff" },
            { label: "Near Limit (90–100%)", bg: "rgba(245,158,11,0.85)", color: "#fff" },
            { label: "Over Allocated (>100%)", bg: "rgba(239,68,68,0.85)", color: "#fff" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-3 w-5 rounded" style={{ background: l.bg, border: "1px solid rgba(0,0,0,0.1)" }} />
              <span style={{ color: "var(--muted-foreground)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                  <th className="text-left px-4 py-3 font-medium text-xs w-52" style={{ color: "var(--muted-foreground)" }}>Team Member</th>
                  {displayWeeks.map(w => (
                    <th key={w} className="text-center px-3 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{w}</th>
                  ))}
                  <th className="text-center px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Avg</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeam.map(m => {
                  const avg = Math.round(displayWeeks.reduce((s, w) => s + (ALLOCATION[m.name]?.[w] ?? 0), 0) / displayWeeks.length)
                  return (
                    <tr key={m.name} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {m.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-xs" style={{ color: "var(--foreground)" }}>{m.name}</p>
                            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.role}</p>
                          </div>
                        </div>
                      </td>
                      {displayWeeks.map(w => {
                        const pct = ALLOCATION[m.name]?.[w] ?? 0
                        const { bg, color } = allocationColor(pct)
                        return (
                          <td key={w} className="px-2 py-2 text-center">
                            {pct > 0 ? (
                              <div
                                className="rounded-lg py-1.5 text-xs font-semibold inline-flex items-center justify-center w-14"
                                style={{ background: bg, color }}
                              >
                                {pct}%
                              </div>
                            ) : (
                              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>—</span>
                            )}
                          </td>
                        )
                      })}
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-xs" style={{ color: avg > 95 ? "#f59e0b" : "var(--foreground)" }}>{avg}%</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
