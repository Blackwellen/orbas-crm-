"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Cog } from "lucide-react"

type MOStatus = "Draft" | "Released" | "In Progress" | "Completed" | "Cancelled"

interface MOrder {
  id: string
  orderNo: string
  product: string
  qty: number
  unit: string
  status: MOStatus
  startDate: string
  dueDate: string
  bom: string
  route: string
  progress: number
  workstation: string
}

const ORDERS: MOrder[] = [
  { id: "mo1",  orderNo: "MO-2025-001", product: "PCB Assembly Rev3",          qty: 200,  unit: "pcs",    status: "In Progress", startDate: "2025-06-15", dueDate: "2025-07-15", bom: "BOM-PCB-R3",   route: "RT-Electronics-A", progress: 68, workstation: "WS-Electronics-1" },
  { id: "mo2",  orderNo: "MO-2025-002", product: "Hydraulic Actuator 50mm",    qty: 50,   unit: "units",  status: "In Progress", startDate: "2025-06-20", dueDate: "2025-07-20", bom: "BOM-HYD-50",  route: "RT-Mechanical-B",  progress: 45, workstation: "WS-Assembly-3" },
  { id: "mo3",  orderNo: "MO-2025-003", product: "Control Panel Type C",        qty: 30,   unit: "units",  status: "Released",    startDate: "2025-07-01", dueDate: "2025-07-31", bom: "BOM-CP-C",    route: "RT-Electronics-B", progress: 10, workstation: "WS-Electronics-2" },
  { id: "mo4",  orderNo: "MO-2025-004", product: "Motor Drive Unit 24V",        qty: 100,  unit: "units",  status: "In Progress", startDate: "2025-06-10", dueDate: "2025-07-10", bom: "BOM-MDU-24",  route: "RT-Assembly-A",    progress: 82, workstation: "WS-Assembly-1" },
  { id: "mo5",  orderNo: "MO-2025-005", product: "Aluminium Frame 2040",        qty: 500,  unit: "pcs",    status: "Completed",   startDate: "2025-05-15", dueDate: "2025-06-30", bom: "BOM-AF-2040", route: "RT-Fab-A",         progress: 100, workstation: "WS-Fab-2" },
  { id: "mo6",  orderNo: "MO-2025-006", product: "Sensor Module IoT v2",        qty: 150,  unit: "pcs",    status: "Released",    startDate: "2025-07-05", dueDate: "2025-08-05", bom: "BOM-SNS-V2",  route: "RT-Electronics-A", progress: 5, workstation: "WS-Electronics-1" },
  { id: "mo7",  orderNo: "MO-2025-007", product: "Gearbox Assembly 4:1",        qty: 25,   unit: "units",  status: "In Progress", startDate: "2025-06-25", dueDate: "2025-07-25", bom: "BOM-GB-41",   route: "RT-Mechanical-A",  progress: 60, workstation: "WS-Mechanical-2" },
  { id: "mo8",  orderNo: "MO-2025-008", product: "Safety Relay Board",          qty: 80,   unit: "pcs",    status: "Draft",       startDate: "2025-07-15", dueDate: "2025-08-15", bom: "BOM-SRB",     route: "RT-Electronics-C", progress: 0, workstation: "TBD" },
  { id: "mo9",  orderNo: "MO-2025-009", product: "Pneumatic Manifold 8-port",   qty: 40,   unit: "units",  status: "Draft",       startDate: "2025-07-20", dueDate: "2025-08-20", bom: "BOM-PM-8P",   route: "RT-Pneumatic-A",   progress: 0, workstation: "TBD" },
  { id: "mo10", orderNo: "MO-2025-010", product: "LED Controller Board",        qty: 300,  unit: "pcs",    status: "Completed",   startDate: "2025-05-01", dueDate: "2025-06-15", bom: "BOM-LED-CB",  route: "RT-Electronics-A", progress: 100, workstation: "WS-Electronics-1" },
  { id: "mo11", orderNo: "MO-2025-011", product: "Enclosure Box IP65",          qty: 120,  unit: "pcs",    status: "In Progress", startDate: "2025-07-01", dueDate: "2025-07-30", bom: "BOM-ENC-65",  route: "RT-Fab-B",         progress: 35, workstation: "WS-Fab-1" },
  { id: "mo12", orderNo: "MO-2025-012", product: "Cable Harness Type B",        qty: 200,  unit: "sets",   status: "Cancelled",   startDate: "2025-06-01", dueDate: "2025-07-01", bom: "BOM-CH-B",    route: "RT-Assembly-B",    progress: 15, workstation: "WS-Assembly-2" },
]

const STATUS_STYLE: Record<MOStatus, { bg: string; color: string; border: string }> = {
  Draft:       { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  Released:    { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  "In Progress":{ bg: "rgba(26,86,219,0.12)",  color: "var(--primary)", border: "rgba(26,86,219,0.3)" },
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  Cancelled:   { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
}

type TabId = "all" | "in-progress" | "pending" | "completed"

export default function ManufacturingPage() {
  const [tab, setTab] = useState<TabId>("all")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const tabOrders = {
    all: ORDERS,
    "in-progress": ORDERS.filter(o => o.status === "In Progress"),
    pending: ORDERS.filter(o => o.status === "Draft" || o.status === "Released"),
    completed: ORDERS.filter(o => o.status === "Completed"),
  }

  const filtered = tabOrders[tab].filter(o =>
    (o.product.toLowerCase().includes(search.toLowerCase()) || o.orderNo.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "all" || o.status === statusFilter)
  )

  const active = ORDERS.filter(o => o.status === "In Progress").length
  const onSchedule = ORDERS.filter(o => o.status === "In Progress" && o.progress >= 50).length
  const overdue = ORDERS.filter(o => o.status === "In Progress" && new Date(o.dueDate) < new Date("2025-07-07")).length
  const totalUnits = ORDERS.filter(o => o.status === "Completed").reduce((s, o) => s + o.qty, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Manufacturing</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Production orders, BOMs, and workstation scheduling</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> New Manufacturing Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Orders",    value: active.toString(),    accent: "var(--primary)" },
          { label: "On Schedule",      value: onSchedule.toString(),accent: "#22c55e" },
          { label: "Overdue",          value: overdue.toString(),   accent: "#ef4444" },
          { label: "Units Produced",   value: totalUnits.toLocaleString(), accent: "#8b5cf6" },
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
        {([["all","All Orders"],["in-progress","In Progress"],["pending","Pending"],["completed","Completed"]] as [TabId,string][]).map(([id, label]) => (
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

      {/* Filters */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <Input placeholder="Search orders or products..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(["Draft","Released","In Progress","Completed","Cancelled"] as MOStatus[]).map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
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
                  {["Order #","Product","Qty","Status","Start","Due","BOM","Route","Progress","Workstation"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                  const s = STATUS_STYLE[o.status]
                  return (
                    <tr key={o.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3">
                        <Link href={`/app/operations/manufacturing/${o.id}`} className="font-mono text-xs font-semibold hover:underline" style={{ color: "var(--primary)" }}>
                          {o.orderNo}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{o.product}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold" style={{ color: "var(--foreground)" }}>{o.qty}</span>
                        <span className="text-xs ml-1" style={{ color: "var(--muted-foreground)" }}>{o.unit}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.startDate}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.dueDate}</td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{o.bom}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.route}</td>
                      <td className="px-4 py-3 w-32">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                            <div className="h-full rounded-full" style={{
                              width: `${o.progress}%`,
                              background: o.progress === 100 ? "#22c55e" : o.progress >= 60 ? "var(--primary)" : "#f59e0b",
                            }} />
                          </div>
                          <span className="text-xs font-medium w-8 text-right" style={{ color: "var(--foreground)" }}>{o.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.workstation}</td>
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
