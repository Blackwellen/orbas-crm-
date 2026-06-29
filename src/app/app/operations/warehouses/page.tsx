"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Warehouse, MapPin } from "lucide-react"

type WHStatus = "Active" | "Inactive" | "Under Maintenance"

interface WarehouseItem {
  id: string
  name: string
  location: string
  type: string
  capacity: number
  used: number
  zones: number
  manager: string
  managerInitials: string
  status: WHStatus
}

const WAREHOUSES: WarehouseItem[] = [
  { id: "wh1", name: "WH-London-01",     location: "Park Royal, London",       type: "Distribution",  capacity: 15000, used: 11400, zones: 8, manager: "Tom Harris",    managerInitials: "TH", status: "Active" },
  { id: "wh2", name: "WH-Manchester-01", location: "Trafford Park, Manchester", type: "Fulfilment",    capacity: 8000,  used: 5600,  zones: 5, manager: "Sarah Patel",   managerInitials: "SP", status: "Active" },
  { id: "wh3", name: "WH-Birmingham-01", location: "Tyseley, Birmingham",       type: "Storage",       capacity: 12000, used: 9840,  zones: 6, manager: "Mark Evans",    managerInitials: "ME", status: "Active" },
  { id: "wh4", name: "WH-Bristol-01",    location: "Avonmouth, Bristol",        type: "Distribution",  capacity: 10000, used: 3200,  zones: 4, manager: "Claire Wong",   managerInitials: "CW", status: "Active" },
  { id: "wh5", name: "WH-Leeds-01",      location: "Morley, Leeds",             type: "Cross-Dock",    capacity: 6000,  used: 4560,  zones: 3, manager: "James Finlay",  managerInitials: "JF", status: "Active" },
  { id: "wh6", name: "WH-Glasgow-01",    location: "Shawfield, Glasgow",        type: "Storage",       capacity: 7500,  used: 750,   zones: 4, manager: "Fiona McLeod", managerInitials: "FM", status: "Under Maintenance" },
  { id: "wh7", name: "WH-Coventry-01",   location: "Longford, Coventry",        type: "Fulfilment",    capacity: 9500,  used: 6840,  zones: 6, manager: "David Singh",   managerInitials: "DS", status: "Active" },
  { id: "wh8", name: "WH-Derby-01",      location: "Sinfin, Derby",             type: "Cold Storage",  capacity: 3000,  used: 2460,  zones: 2, manager: "Natalie Ross",  managerInitials: "NR", status: "Active" },
  { id: "wh9", name: "WH-Norwich-01",    location: "Longwater, Norwich",        type: "Storage",       capacity: 5000,  used: 0,     zones: 3, manager: "Peter Kay",     managerInitials: "PK", status: "Inactive" },
]

const STATUS_STYLE: Record<WHStatus, { bg: string; color: string; border: string }> = {
  Active:               { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  Inactive:             { bg: "rgba(107,114,128,0.12)", color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  "Under Maintenance":  { bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
}

function utilizationColor(pct: number): string {
  if (pct >= 90) return "#ef4444"
  if (pct >= 75) return "#f59e0b"
  return "#22c55e"
}

export default function WarehousesPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const types = Array.from(new Set(WAREHOUSES.map(w => w.type)))

  const filtered = WAREHOUSES.filter(w =>
    (w.name.toLowerCase().includes(search.toLowerCase()) || w.location.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === "all" || w.type === typeFilter) &&
    (statusFilter === "all" || w.status === statusFilter)
  )

  const totalCapacity = WAREHOUSES.reduce((s, w) => s + w.capacity, 0)
  const totalUsed = WAREHOUSES.reduce((s, w) => s + w.used, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Warehouses</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            {WAREHOUSES.length} warehouses · {totalUsed.toLocaleString()} / {totalCapacity.toLocaleString()} sqm used
          </p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> Add Warehouse
        </Button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Warehouses", value: WAREHOUSES.length.toString(), accent: "var(--primary)" },
          { label: "Active",           value: WAREHOUSES.filter(w => w.status === "Active").length.toString(), accent: "#22c55e" },
          { label: "Total Capacity",   value: `${(totalCapacity / 1000).toFixed(0)}K sqm`, accent: "var(--accent)" },
          { label: "Avg Utilization",  value: `${Math.round((totalUsed / totalCapacity) * 100)}%`, accent: "#f59e0b" },
        ].map(k => (
          <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: k.accent }}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <Input placeholder="Search warehouses or locations..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                  {["Name","Location","Type","Capacity (sqm)","Utilization","Zones","Manager","Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(w => {
                  const pct = Math.round((w.used / w.capacity) * 100)
                  const s = STATUS_STYLE[w.status]
                  return (
                    <tr key={w.id} className="border-b last:border-0 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.02)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      <td className="px-4 py-3">
                        <Link href={`/app/operations/warehouses/${w.id}`} className="flex items-center gap-2 font-medium hover:underline" style={{ color: "var(--foreground)" }}>
                          <Warehouse className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                          {w.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                          {w.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{w.capacity.toLocaleString()}</td>
                      <td className="px-4 py-3 w-44">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: utilizationColor(pct) }} />
                          </div>
                          <span className="text-xs font-medium w-8 text-right" style={{ color: utilizationColor(pct) }}>{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-medium" style={{ color: "var(--foreground)" }}>{w.zones}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {w.managerInitials}
                          </div>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.manager}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                          {w.status}
                        </span>
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
