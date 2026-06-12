"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, LayoutList, LayoutGrid, Users, Calendar } from "lucide-react"

type ProjectStatus = "Planning" | "Active" | "On Hold" | "Completed" | "Cancelled"

interface Project {
  id: string
  name: string
  client: string
  status: ProjectStatus
  start: string
  end: string
  budget: number
  spent: number
  progress: number
  owner: string
  ownerInitials: string
  teamSize: number
  type: string
}

const projects: Project[] = [
  { id: "1",  name: "Orbas Platform Rebuild",       client: "Orbas Ltd",            status: "Active",    start: "2025-01-15", end: "2025-09-30", budget: 120000, spent: 84200,  progress: 72,  owner: "Sarah Kim",       ownerInitials: "SK", teamSize: 8, type: "Software" },
  { id: "2",  name: "ERP Integration Phase 2",       client: "Hartmann Industries",  status: "Active",    start: "2025-02-01", end: "2025-08-31", budget: 85000,  spent: 62100,  progress: 58,  owner: "James Robertson",  ownerInitials: "JR", teamSize: 6, type: "Integration" },
  { id: "3",  name: "Mobile App v3.0",               client: "RetailCo UK",          status: "Active",    start: "2025-03-01", end: "2025-10-15", budget: 45000,  spent: 18400,  progress: 35,  owner: "Lucy Chen",        ownerInitials: "LC", teamSize: 5, type: "Software" },
  { id: "4",  name: "Data Warehouse Migration",      client: "FinServe Group",       status: "On Hold",   start: "2024-11-01", end: "2025-07-31", budget: 160000, spent: 98700,  progress: 62,  owner: "Sarah Kim",       ownerInitials: "SK", teamSize: 7, type: "Data" },
  { id: "5",  name: "Customer Portal",               client: "BuildCo Ltd",          status: "Active",    start: "2025-04-01", end: "2025-09-15", budget: 32000,  spent: 12900,  progress: 41,  owner: "Alex Turner",      ownerInitials: "AT", teamSize: 4, type: "Software" },
  { id: "6",  name: "ISO 27001 Compliance",          client: "Internal",             status: "Planning",  start: "2025-06-01", end: "2025-12-31", budget: 15000,  spent: 2400,   progress: 18,  owner: "James Robertson",  ownerInitials: "JR", teamSize: 3, type: "Compliance" },
  { id: "7",  name: "Analytics Dashboard",           client: "LogiFlow UK",          status: "Active",    start: "2025-01-10", end: "2025-07-10", budget: 28000,  spent: 19600,  progress: 78,  owner: "Lucy Chen",        ownerInitials: "LC", teamSize: 4, type: "Software" },
  { id: "8",  name: "Supply Chain API",              client: "Apex Manufacturing",   status: "Active",    start: "2025-02-15", end: "2025-08-15", budget: 67000,  spent: 34200,  progress: 52,  owner: "Sarah Kim",       ownerInitials: "SK", teamSize: 5, type: "Integration" },
  { id: "9",  name: "HR Self-Service Portal",        client: "Meridian Group",       status: "Completed", start: "2024-08-01", end: "2025-02-28", budget: 42000,  spent: 41800,  progress: 100, owner: "Alex Turner",      ownerInitials: "AT", teamSize: 4, type: "Software" },
  { id: "10", name: "Cloud Infrastructure Uplift",  client: "Internal",             status: "Active",    start: "2025-03-15", end: "2025-11-30", budget: 95000,  spent: 28000,  progress: 30,  owner: "Mike Davies",      ownerInitials: "MD", teamSize: 6, type: "Infrastructure" },
  { id: "11", name: "Payments Gateway Upgrade",      client: "RetailCo UK",          status: "Planning",  start: "2025-07-01", end: "2025-12-15", budget: 55000,  spent: 0,      progress: 0,   owner: "James Robertson",  ownerInitials: "JR", teamSize: 5, type: "Integration" },
  { id: "12", name: "CRM Data Migration",            client: "Hartmann Industries",  status: "Active",    start: "2025-04-10", end: "2025-08-10", budget: 38000,  spent: 14200,  progress: 37,  owner: "Lucy Chen",        ownerInitials: "LC", teamSize: 3, type: "Data" },
  { id: "13", name: "Security Audit & Pen Test",     client: "FinServe Group",       status: "Completed", start: "2025-01-15", end: "2025-03-31", budget: 22000,  spent: 21500,  progress: 100, owner: "Sarah Kim",       ownerInitials: "SK", teamSize: 2, type: "Security" },
  { id: "14", name: "E-commerce Platform Phase 3",   client: "ShopDirect Ltd",       status: "Active",    start: "2025-05-01", end: "2026-01-31", budget: 210000, spent: 42000,  progress: 20,  owner: "Alex Turner",      ownerInitials: "AT", teamSize: 9, type: "Software" },
  { id: "15", name: "IoT Sensor Dashboard",          client: "Apex Manufacturing",   status: "Cancelled", start: "2025-02-01", end: "2025-06-30", budget: 35000,  spent: 8900,   progress: 22,  owner: "Mike Davies",      ownerInitials: "MD", teamSize: 3, type: "Software" },
  { id: "16", name: "Business Intelligence Suite",   client: "LogiFlow UK",          status: "Planning",  start: "2025-08-01", end: "2026-03-31", budget: 78000,  spent: 0,      progress: 0,   owner: "James Robertson",  ownerInitials: "JR", teamSize: 6, type: "Data" },
]

const STATUS_STYLE: Record<ProjectStatus, { bg: string; color: string; border: string }> = {
  Planning:  { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  Active:    { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  "On Hold": { bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Completed: { bg: "rgba(107,114,128,0.12)", color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  Cancelled: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      {status}
    </span>
  )
}

function fmt(n: number) {
  return n >= 1000000 ? `£${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `£${(n / 1000).toFixed(0)}K` : `£${n}`
}

function progressColor(p: number) {
  if (p === 100) return "#22c55e"
  if (p > 60) return "var(--primary)"
  if (p > 30) return "#f59e0b"
  return "#ef4444"
}

export default function AllProjectsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [view, setView] = useState<"table" | "cards">("table")

  const owners = Array.from(new Set(projects.map(p => p.owner)))
  const clients = Array.from(new Set(projects.map(p => p.client)))

  const filtered = projects.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) &&
      (statusFilter === "all" || p.status === statusFilter) &&
      (ownerFilter === "all" || p.owner === ownerFilter) &&
      (clientFilter === "all" || p.client === clientFilter)
    )
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>All Projects</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{filtered.length} of {projects.length} projects</p>
        </div>
        <Link href="/app/projects/projects/new">
          <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <Input placeholder="Search projects or clients..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(Object.keys(STATUS_STYLE) as ProjectStatus[]).map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Owner" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Owners</SelectItem>
            {owners.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Client" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {clients.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-1 ml-auto">
          <Button size="sm" variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={view === "cards" ? "default" : "outline"} onClick={() => setView("cards")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "table" ? (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "rgba(var(--muted),0.3)" }}>
                    {["Project Name","Client","Status","Start","End","Budget","Spent","% Complete","Owner","Team"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 font-medium text-xs ${i >= 5 && i <= 6 ? "text-right" : i === 7 ? "text-left" : i === 9 ? "text-right" : "text-left"}`}
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr
                      key={p.id}
                      className="border-b last:border-0 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.03)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      <td className="px-4 py-3">
                        <Link href={`/app/projects/projects/${p.id}`} className="font-medium hover:underline" style={{ color: "var(--foreground)" }}>
                          {p.name}
                        </Link>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{p.type}</p>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{p.client}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{p.start}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{p.end}</td>
                      <td className="px-4 py-3 text-right font-medium" style={{ color: "var(--foreground)" }}>{fmt(p.budget)}</td>
                      <td className="px-4 py-3 text-right" style={{ color: "var(--muted-foreground)" }}>{fmt(p.spent)}</td>
                      <td className="px-4 py-3 w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                            <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: progressColor(p.progress) }} />
                          </div>
                          <span className="text-xs font-medium w-7 text-right" style={{ color: "var(--foreground)" }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {p.ownerInitials}
                          </div>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Users className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.teamSize}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <Link key={p.id} href={`/app/projects/projects/${p.id}`}>
              <Card className="border hover:shadow-md transition-all cursor-pointer h-full" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate" style={{ color: "var(--foreground)" }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{p.client}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "var(--muted-foreground)" }}>Progress</span>
                      <span className="font-semibold" style={{ color: "var(--foreground)" }}>{p.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: progressColor(p.progress) }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg p-2" style={{ background: "var(--muted)" }}>
                      <p style={{ color: "var(--muted-foreground)" }}>Budget</p>
                      <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{fmt(p.budget)}</p>
                    </div>
                    <div className="rounded-lg p-2" style={{ background: "var(--muted)" }}>
                      <p style={{ color: "var(--muted-foreground)" }}>Spent</p>
                      <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{fmt(p.spent)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)" }}>
                        {p.ownerInitials}
                      </div>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.owner}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.end}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
