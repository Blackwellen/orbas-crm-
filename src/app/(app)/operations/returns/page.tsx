"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, RotateCcw } from "lucide-react"

type ReturnType = "Customer Return" | "Supplier Return"
type ReturnStatus = "Requested" | "Approved" | "In Transit" | "Received" | "Refunded" | "Replaced" | "Closed"
type ReturnReason = "Defective" | "Wrong Item" | "Damaged" | "Changed Mind" | "Not Delivered"

interface Return {
  id: string
  rmaNo: string
  party: string
  type: ReturnType
  items: string
  qty: number
  reason: ReturnReason
  status: ReturnStatus
  requested: string
  completed: string | null
  value: number
}

const RETURNS: Return[] = [
  { id: "r1",  rmaNo: "RMA-2025-001", party: "RetailCo UK",         type: "Customer Return", items: "Servo Motor 24V (x3)",      qty: 3,  reason: "Defective",     status: "Refunded",  requested: "2025-06-10", completed: "2025-06-28", value: 567 },
  { id: "r2",  rmaNo: "RMA-2025-002", party: "Apex Manufacturing",   type: "Customer Return", items: "PCB Assembly Rev3 (x5)",    qty: 5,  reason: "Defective",     status: "Replaced",  requested: "2025-06-12", completed: "2025-07-01", value: 212.50 },
  { id: "r3",  rmaNo: "RMA-2025-003", party: "Parker Seals",         type: "Supplier Return", items: "Hydraulic Seal Kit (x10)", qty: 10, reason: "Wrong Item",    status: "Closed",    requested: "2025-06-14", completed: "2025-06-30", value: 189 },
  { id: "r4",  rmaNo: "RMA-2025-004", party: "BuildCo Ltd",          type: "Customer Return", items: "Aluminium Extrusion 40x40", qty: 20, reason: "Wrong Item",    status: "Received",  requested: "2025-06-20", completed: null,         value: 175 },
  { id: "r5",  rmaNo: "RMA-2025-005", party: "Hartmann Industries",  type: "Customer Return", items: "CNC End Mill D6 (x8)",      qty: 8,  reason: "Damaged",       status: "Approved",  requested: "2025-06-25", completed: null,         value: 231.20 },
  { id: "r6",  rmaNo: "RMA-2025-006", party: "SKF Ltd",              type: "Supplier Return", items: "Ball Bearing 6204 (x50)",  qty: 50, reason: "Defective",     status: "In Transit",requested: "2025-06-28", completed: null,         value: 160 },
  { id: "r7",  rmaNo: "RMA-2025-007", party: "LogiFlow UK",           type: "Customer Return", items: "Safety Glass 6mm (x4)",    qty: 4,  reason: "Damaged",       status: "Requested", requested: "2025-07-01", completed: null,         value: 380 },
  { id: "r8",  rmaNo: "RMA-2025-008", party: "FinServe Group",        type: "Customer Return", items: "Control Panel Type C",      qty: 1,  reason: "Changed Mind",  status: "Requested", requested: "2025-07-02", completed: null,         value: 1200 },
  { id: "r9",  rmaNo: "RMA-2025-009", party: "LEDWorld Ltd",          type: "Supplier Return", items: "LED Strip 5M (x20)",        qty: 20, reason: "Wrong Item",    status: "Approved",  requested: "2025-07-03", completed: null,         value: 450 },
  { id: "r10", rmaNo: "RMA-2025-010", party: "Meridian Group",        type: "Customer Return", items: "Cable 24AWG 100m (x5)",     qty: 5,  reason: "Not Delivered", status: "Closed",    requested: "2025-06-05", completed: "2025-06-25", value: 92 },
  { id: "r11", rmaNo: "RMA-2025-011", party: "ShopDirect Ltd",        type: "Customer Return", items: "HEPA Filter F7 (x10)",      qty: 10, reason: "Defective",     status: "Replaced",  requested: "2025-06-08", completed: "2025-06-30", value: 145 },
  { id: "r12", rmaNo: "RMA-2025-012", party: "Timber Direct",         type: "Supplier Return", items: "Plywood Sheet 18mm (x30)", qty: 30, reason: "Damaged",       status: "In Transit",requested: "2025-07-05", completed: null,         value: 960 },
]

const STATUS_STYLE: Record<ReturnStatus, { bg: string; color: string; border: string }> = {
  Requested:  { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  Approved:   { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  "In Transit":{ bg: "rgba(245,158,11,0.12)", color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Received:   { bg: "rgba(26,86,219,0.12)",   color: "var(--primary)", border: "rgba(26,86,219,0.3)" },
  Refunded:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  Replaced:   { bg: "rgba(139,92,246,0.12)",  color: "#7c3aed", border: "rgba(139,92,246,0.3)"  },
  Closed:     { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
}

const REASON_STYLE: Record<ReturnReason, { bg: string; color: string }> = {
  Defective:     { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  "Wrong Item":  { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
  Damaged:       { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  "Changed Mind":{ bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
  "Not Delivered":{ bg: "rgba(59,130,246,0.12)",color: "#3b82f6" },
}

export default function ReturnsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = RETURNS.filter(r =>
    (r.rmaNo.toLowerCase().includes(search.toLowerCase()) || r.party.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === "all" || r.type === typeFilter) &&
    (statusFilter === "all" || r.status === statusFilter)
  )

  const pending = RETURNS.filter(r => ["Requested","Approved","In Transit","Received"].includes(r.status)).length
  const thisMonth = RETURNS.filter(r => r.requested.startsWith("2025-07") || r.requested.startsWith("2025-06")).length
  const returnRate = 4.2

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Returns (RMA)</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Customer and supplier return management</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> Create Return
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-4">
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Pending Returns</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "#f59e0b" }}>{pending}</p>
          </CardContent>
        </Card>
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-4">
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>This Month Returns</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "var(--primary)" }}>{thisMonth}</p>
          </CardContent>
        </Card>
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-4">
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Return Rate</p>
            <p className="text-2xl font-bold mt-1" style={{ color: returnRate > 5 ? "#ef4444" : "#22c55e" }}>{returnRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
          <Input placeholder="Search RMA or party..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Customer Return">Customer Return</SelectItem>
            <SelectItem value="Supplier Return">Supplier Return</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(["Requested","Approved","In Transit","Received","Refunded","Replaced","Closed"] as ReturnStatus[]).map(s => (
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
                  {["RMA #","Party","Type","Items","Reason","Status","Requested","Completed"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const ss = STATUS_STYLE[r.status]
                  const rs = REASON_STYLE[r.reason]
                  return (
                    <tr key={r.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <RotateCcw className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--primary)" }} />
                          <span className="font-mono text-xs font-semibold" style={{ color: "var(--primary)" }}>{r.rmaNo}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{r.party}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                          style={r.type === "Customer Return"
                            ? { background: "rgba(26,86,219,0.12)", color: "var(--primary)" }
                            : { background: "rgba(139,92,246,0.12)", color: "#7c3aed" }}
                        >
                          {r.type === "Customer Return" ? "Customer" : "Supplier"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs max-w-40 truncate" style={{ color: "var(--muted-foreground)" }}>{r.items}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: rs.bg, color: rs.color }}>
                          {r.reason}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: ss.bg, color: ss.color, borderColor: ss.border }}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.requested}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.completed ?? "—"}</td>
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
