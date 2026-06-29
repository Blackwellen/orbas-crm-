"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, LayoutList, Calendar, Flag } from "lucide-react"

type MilestoneStatus = "Upcoming" | "In Progress" | "Completed" | "Overdue"

interface Milestone {
  id: string
  name: string
  project: string
  dueDate: string
  status: MilestoneStatus
  owner: string
  ownerInitials: string
  dependencies: string
}

const MILESTONES: Milestone[] = [
  { id: "m1",  name: "Design System Approved",     project: "Orbas Platform Rebuild",   dueDate: "2025-02-15", status: "Completed",   owner: "Lucy Chen",       ownerInitials: "LC", dependencies: "—" },
  { id: "m2",  name: "Backend API v1 Released",    project: "Orbas Platform Rebuild",   dueDate: "2025-04-30", status: "Completed",   owner: "James Robertson", ownerInitials: "JR", dependencies: "Design System" },
  { id: "m3",  name: "Beta Launch",                project: "Orbas Platform Rebuild",   dueDate: "2025-07-15", status: "In Progress", owner: "Sarah Kim",       ownerInitials: "SK", dependencies: "Backend API" },
  { id: "m4",  name: "UAT Sign-off",               project: "Orbas Platform Rebuild",   dueDate: "2025-08-30", status: "Upcoming",    owner: "Sarah Kim",       ownerInitials: "SK", dependencies: "Beta Launch" },
  { id: "m5",  name: "Go Live",                    project: "Orbas Platform Rebuild",   dueDate: "2025-09-30", status: "Upcoming",    owner: "Sarah Kim",       ownerInitials: "SK", dependencies: "UAT Sign-off" },
  { id: "m6",  name: "ERP Phase 1 Integration",    project: "ERP Integration Phase 2",  dueDate: "2025-04-15", status: "Completed",   owner: "James Robertson", ownerInitials: "JR", dependencies: "—" },
  { id: "m7",  name: "Data Migration Complete",    project: "ERP Integration Phase 2",  dueDate: "2025-06-30", status: "Overdue",     owner: "Alex Turner",     ownerInitials: "AT", dependencies: "Phase 1" },
  { id: "m8",  name: "User Acceptance Testing",    project: "ERP Integration Phase 2",  dueDate: "2025-08-15", status: "Upcoming",    owner: "Mike Davies",     ownerInitials: "MD", dependencies: "Data Migration" },
  { id: "m9",  name: "iOS App Submitted",          project: "Mobile App v3.0",          dueDate: "2025-07-01", status: "Overdue",     owner: "Lucy Chen",       ownerInitials: "LC", dependencies: "—" },
  { id: "m10", name: "Android Release",            project: "Mobile App v3.0",          dueDate: "2025-08-01", status: "Upcoming",    owner: "Lucy Chen",       ownerInitials: "LC", dependencies: "iOS App" },
  { id: "m11", name: "Portal MVP Complete",        project: "Customer Portal",          dueDate: "2025-07-31", status: "In Progress", owner: "Alex Turner",     ownerInitials: "AT", dependencies: "—" },
  { id: "m12", name: "ISO Controls Implemented",   project: "ISO 27001 Compliance",     dueDate: "2025-10-31", status: "Upcoming",    owner: "James Robertson", ownerInitials: "JR", dependencies: "—" },
  { id: "m13", name: "External Audit",             project: "ISO 27001 Compliance",     dueDate: "2025-12-01", status: "Upcoming",    owner: "Sarah Kim",       ownerInitials: "SK", dependencies: "ISO Controls" },
  { id: "m14", name: "API Finalised",              project: "Supply Chain API",         dueDate: "2025-06-30", status: "Completed",   owner: "Mike Davies",     ownerInitials: "MD", dependencies: "—" },
  { id: "m15", name: "Warehouse Integration",      project: "Supply Chain API",         dueDate: "2025-08-15", status: "In Progress", owner: "Mike Davies",     ownerInitials: "MD", dependencies: "API Finalised" },
  { id: "m16", name: "Dashboard v1 Shipped",       project: "Analytics Dashboard",      dueDate: "2025-07-10", status: "In Progress", owner: "Lucy Chen",       ownerInitials: "LC", dependencies: "—" },
]

const STATUS_STYLE: Record<MilestoneStatus, { bg: string; color: string; border: string }> = {
  Upcoming:    { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  "In Progress":{ bg: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  Overdue:     { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
}

function StatusBadge({ status }: { status: MilestoneStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
      {status}
    </span>
  )
}

// Group months for calendar view
const MONTHS = ["Jul 2025","Aug 2025","Sep 2025","Oct 2025"]
const MONTH_DATES: Record<string, string[]> = {
  "Jul 2025": ["2025-07","2025-07-01","2025-07-10","2025-07-15","2025-07-31"],
  "Aug 2025": ["2025-08","2025-08-01","2025-08-15","2025-08-30"],
  "Sep 2025": ["2025-09","2025-09-30"],
  "Oct 2025": ["2025-10","2025-10-31"],
}

export default function MilestonesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [view, setView] = useState<"list" | "calendar">("list")

  const projects = Array.from(new Set(MILESTONES.map(m => m.project)))

  const filtered = MILESTONES.filter(m => {
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || m.status === statusFilter) &&
      (projectFilter === "all" || m.project === projectFilter)
    )
  })

  const counts = {
    Upcoming: MILESTONES.filter(m => m.status === "Upcoming").length,
    "In Progress": MILESTONES.filter(m => m.status === "In Progress").length,
    Completed: MILESTONES.filter(m => m.status === "Completed").length,
    Overdue: MILESTONES.filter(m => m.status === "Overdue").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Milestones</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Track key delivery milestones across all projects</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.entries(counts) as [MilestoneStatus, number][]).map(([status, count]) => {
          const s = STATUS_STYLE[status]
          return (
            <Card key={status} className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{status}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{count}</p>
                  </div>
                  <Flag className="h-5 w-5" style={{ color: s.color, opacity: 0.7 }} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <Input placeholder="Search milestones..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-52"><SelectValue placeholder="Project" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(["Upcoming","In Progress","Completed","Overdue"] as MilestoneStatus[]).map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1 ml-auto">
          <Button size="sm" variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={view === "calendar" ? "default" : "outline"} onClick={() => setView("calendar")}>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "list" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    {["Milestone","Project","Due Date","Status","Owner","Dependencies"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <tr key={m.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 shrink-0" style={{ color: STATUS_STYLE[m.status].color }} />
                          <span className="font-medium" style={{ color: "var(--foreground)" }}>{m.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.project}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium" style={{ color: m.status === "Overdue" ? "#dc2626" : "var(--foreground)" }}>
                          {m.dueDate}
                        </span>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {m.ownerInitials}
                          </div>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.dependencies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {view === "calendar" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MONTHS.map(month => {
            const monthMilestones = filtered.filter(m => m.dueDate.startsWith(month.slice(0, 7).replace(" ", "-").replace("Jul","07").replace("Aug","08").replace("Sep","09").replace("Oct","10")))
            return (
              <Card key={month} className="border" style={{ borderColor: "var(--border)" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{month}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {monthMilestones.length === 0 ? (
                    <p className="text-xs py-4 text-center" style={{ color: "var(--muted-foreground)" }}>No milestones</p>
                  ) : monthMilestones.map(m => (
                    <div key={m.id} className="rounded-lg p-2.5" style={{ background: STATUS_STYLE[m.status].bg, borderLeft: `3px solid ${STATUS_STYLE[m.status].color}` }}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{m.name}</p>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{m.dueDate}</p>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
