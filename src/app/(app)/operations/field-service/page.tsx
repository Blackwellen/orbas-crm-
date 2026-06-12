"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MapPin, Clock } from "lucide-react"

type WOStatus = "Scheduled" | "En Route" | "In Progress" | "Completed" | "Cancelled"
type WOPriority = "Critical" | "High" | "Medium" | "Low"

interface WorkOrder {
  id: string
  woNo: string
  customer: string
  address: string
  type: string
  priority: WOPriority
  technician: string
  techInitials: string
  scheduledDate: string
  scheduledTime: string
  status: WOStatus
  estimatedHours: number
}

const WORK_ORDERS: WorkOrder[] = [
  { id: "wo1",  woNo: "WO-2025-001", customer: "Hartmann Industries",  address: "12 Mill St, Manchester",       type: "Preventive Maintenance", priority: "High",     technician: "Dan Cooper",    techInitials: "DC", scheduledDate: "2025-07-07", scheduledTime: "09:00", status: "Completed",  estimatedHours: 3 },
  { id: "wo2",  woNo: "WO-2025-002", customer: "BuildCo Ltd",           address: "45 Park Rd, Birmingham",       type: "Corrective Repair",      priority: "Critical", technician: "Lisa Marsh",    techInitials: "LM", scheduledDate: "2025-07-07", scheduledTime: "10:00", status: "In Progress", estimatedHours: 4 },
  { id: "wo3",  woNo: "WO-2025-003", customer: "RetailCo UK",            address: "78 High St, Leeds",            type: "Installation",           priority: "Medium",   technician: "Tom Hughes",    techInitials: "TH", scheduledDate: "2025-07-07", scheduledTime: "13:00", status: "En Route",   estimatedHours: 5 },
  { id: "wo4",  woNo: "WO-2025-004", customer: "Apex Manufacturing",     address: "3 Industrial Way, Bristol",    type: "Emergency Callout",      priority: "Critical", technician: "Dan Cooper",    techInitials: "DC", scheduledDate: "2025-07-08", scheduledTime: "08:00", status: "Scheduled",  estimatedHours: 2 },
  { id: "wo5",  woNo: "WO-2025-005", customer: "LogiFlow UK",             address: "56 Dock Rd, Liverpool",        type: "Inspection",             priority: "Low",      technician: "Sarah Bell",    techInitials: "SB", scheduledDate: "2025-07-08", scheduledTime: "09:30", status: "Scheduled",  estimatedHours: 2 },
  { id: "wo6",  woNo: "WO-2025-006", customer: "FinServe Group",          address: "22 Central Ave, London",       type: "Corrective Repair",      priority: "High",     technician: "Mike Ross",     techInitials: "MR", scheduledDate: "2025-07-08", scheduledTime: "11:00", status: "Scheduled",  estimatedHours: 3 },
  { id: "wo7",  woNo: "WO-2025-007", customer: "Orbas Ltd",              address: "99 Tech Park, London",          type: "Preventive Maintenance", priority: "Medium",   technician: "Lisa Marsh",    techInitials: "LM", scheduledDate: "2025-07-09", scheduledTime: "09:00", status: "Scheduled",  estimatedHours: 4 },
  { id: "wo8",  woNo: "WO-2025-008", customer: "BuildCo Ltd",             address: "12 Station Rd, Coventry",      type: "Installation",           priority: "Medium",   technician: "Tom Hughes",    techInitials: "TH", scheduledDate: "2025-07-09", scheduledTime: "14:00", status: "Scheduled",  estimatedHours: 6 },
  { id: "wo9",  woNo: "WO-2025-009", customer: "Hartmann Industries",     address: "8 Factory Lane, Derby",        type: "Emergency Callout",      priority: "Critical", technician: "Dan Cooper",    techInitials: "DC", scheduledDate: "2025-07-10", scheduledTime: "07:30", status: "Scheduled",  estimatedHours: 2 },
  { id: "wo10", woNo: "WO-2025-010", customer: "Meridian Group",          address: "34 Commerce Way, Norwich",     type: "Inspection",             priority: "Low",      technician: "Sarah Bell",    techInitials: "SB", scheduledDate: "2025-07-10", scheduledTime: "11:00", status: "Scheduled",  estimatedHours: 1.5 },
  { id: "wo11", woNo: "WO-2025-011", customer: "ShopDirect Ltd",          address: "67 West Rd, Glasgow",          type: "Corrective Repair",      priority: "High",     technician: "Mike Ross",     techInitials: "MR", scheduledDate: "2025-07-11", scheduledTime: "09:00", status: "Scheduled",  estimatedHours: 3 },
  { id: "wo12", woNo: "WO-2025-012", customer: "RetailCo UK",             address: "90 Bridge St, Bristol",        type: "Preventive Maintenance", priority: "Low",      technician: "Lisa Marsh",    techInitials: "LM", scheduledDate: "2025-07-11", scheduledTime: "13:00", status: "Scheduled",  estimatedHours: 2 },
  { id: "wo13", woNo: "WO-2025-013", customer: "Apex Manufacturing",      address: "2 Production Rd, Birmingham",  type: "Installation",           priority: "Medium",   technician: "Tom Hughes",    techInitials: "TH", scheduledDate: "2025-07-14", scheduledTime: "08:00", status: "Scheduled",  estimatedHours: 8 },
  { id: "wo14", woNo: "WO-2025-014", customer: "FinServe Group",           address: "15 Exchange Sq, Manchester",   type: "Emergency Callout",      priority: "Critical", technician: "Dan Cooper",    techInitials: "DC", scheduledDate: "2025-07-14", scheduledTime: "10:30", status: "Scheduled",  estimatedHours: 2 },
  { id: "wo15", woNo: "WO-2025-015", customer: "BuildCo Ltd",              address: "48 Trade Park, Leeds",         type: "Inspection",             priority: "Medium",   technician: "Sarah Bell",    techInitials: "SB", scheduledDate: "2025-07-15", scheduledTime: "09:00", status: "Scheduled",  estimatedHours: 2 },
]

const PRIORITY_STYLE: Record<WOPriority, { bg: string; color: string; border: string }> = {
  Critical: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
  High:     { bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Medium:   { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  Low:      { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
}

const STATUS_STYLE: Record<WOStatus, { bg: string; color: string; border: string }> = {
  Scheduled:   { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  "En Route":  { bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  "In Progress":{ bg: "rgba(26,86,219,0.12)",  color: "var(--primary)", border: "rgba(26,86,219,0.3)" },
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  Cancelled:   { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
}

const TECHNICIANS = ["Dan Cooper","Lisa Marsh","Tom Hughes","Sarah Bell","Mike Ross"]
const DISPATCH_HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]

type TabId = "workorders" | "dispatch" | "technicians"

export default function FieldServicePage() {
  const [tab, setTab] = useState<TabId>("workorders")
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = WORK_ORDERS.filter(w =>
    (w.woNo.toLowerCase().includes(search.toLowerCase()) || w.customer.toLowerCase().includes(search.toLowerCase())) &&
    (priorityFilter === "all" || w.priority === priorityFilter) &&
    (statusFilter === "all" || w.status === statusFilter)
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Field Service</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Work orders, dispatch, and technician management</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> New Work Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Today's WOs",      value: WORK_ORDERS.filter(w => w.scheduledDate === "2025-07-07").length.toString(), accent: "var(--primary)" },
          { label: "In Progress",      value: WORK_ORDERS.filter(w => w.status === "In Progress").length.toString(),       accent: "var(--accent)" },
          { label: "Critical",         value: WORK_ORDERS.filter(w => w.priority === "Critical").length.toString(),        accent: "#ef4444" },
          { label: "Completed Today",  value: WORK_ORDERS.filter(w => w.status === "Completed").length.toString(),         accent: "#22c55e" },
          { label: "Technicians",      value: TECHNICIANS.length.toString(),                                                accent: "#8b5cf6" },
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
        {([["workorders","Work Orders"],["dispatch","Dispatch Board"],["technicians","Technicians"]] as [TabId,string][]).map(([id, label]) => (
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

      {tab === "workorders" && (
        <>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
              <Input placeholder="Search work orders or customers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {(["Critical","High","Medium","Low"] as WOPriority[]).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {(["Scheduled","En Route","In Progress","Completed","Cancelled"] as WOStatus[]).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["WO #","Customer","Type","Priority","Technician","Scheduled","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(w => {
                      const ps = PRIORITY_STYLE[w.priority]
                      const ss = STATUS_STYLE[w.status]
                      return (
                        <tr key={w.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                          <td className="px-4 py-3">
                            <Link href={`/app/operations/field-service/${w.id}`} className="font-mono text-xs font-semibold hover:underline" style={{ color: "var(--primary)" }}>
                              {w.woNo}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium" style={{ color: "var(--foreground)" }}>{w.customer}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.address}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{w.type}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: ps.bg, color: ps.color, borderColor: ps.border }}>
                              {w.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                                {w.techInitials}
                              </div>
                              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.technician}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                              <span style={{ color: "var(--foreground)" }}>{w.scheduledDate}</span>
                              <span style={{ color: "var(--muted-foreground)" }}>{w.scheduledTime}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: ss.bg, color: ss.color, borderColor: ss.border }}>
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
        </>
      )}

      {tab === "dispatch" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)", width: 140 }}>Time</th>
                    {TECHNICIANS.map(t => (
                      <th key={t} className="text-center px-3 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{t}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DISPATCH_HOURS.map(hour => (
                    <tr key={hour} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-2 font-medium" style={{ color: "var(--muted-foreground)" }}>{hour}</td>
                      {TECHNICIANS.map(tech => {
                        const wo = WORK_ORDERS.find(w => w.technician === tech && w.scheduledDate === "2025-07-07" && w.scheduledTime === hour)
                        return (
                          <td key={tech} className="px-2 py-1.5 text-center">
                            {wo ? (
                              <Link href={`/app/operations/field-service/${wo.id}`}>
                                <div
                                  className="rounded px-2 py-1 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                                  style={{
                                    background: STATUS_STYLE[wo.status].bg,
                                    color: STATUS_STYLE[wo.status].color,
                                    border: `1px solid ${STATUS_STYLE[wo.status].border}`,
                                  }}
                                >
                                  <p className="font-semibold">{wo.woNo}</p>
                                  <p className="truncate max-w-24">{wo.customer}</p>
                                </div>
                              </Link>
                            ) : (
                              <span style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "technicians" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECHNICIANS.map(tech => {
            const techWOs = WORK_ORDERS.filter(w => w.technician === tech)
            const activeWO = techWOs.find(w => w.status === "In Progress" || w.status === "En Route")
            return (
              <Card key={tech} className="border" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--primary)" }}>
                      {tech.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: "var(--foreground)" }}>{tech}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Field Technician</p>
                    </div>
                    <div className="ml-auto">
                      {activeWO ? (
                        <span className="inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                      ) : (
                        <span className="inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#6b7280" }} />
                      )}
                    </div>
                  </div>
                  {activeWO ? (
                    <div className="rounded-lg p-3" style={{ background: "var(--muted)" }}>
                      <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Current job</p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{activeWO.customer}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{activeWO.type}</p>
                    </div>
                  ) : (
                    <div className="rounded-lg p-3 text-center" style={{ background: "var(--muted)" }}>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Available</p>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted-foreground)" }}>Assigned this week</span>
                    <span className="font-semibold" style={{ color: "var(--foreground)" }}>{techWOs.length} WOs</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
