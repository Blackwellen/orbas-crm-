"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardList } from "lucide-react"

type WOStatus = "Open" | "In Progress" | "Completed" | "On Hold" | "Cancelled"
type WOPriority = "Critical" | "High" | "Medium" | "Low"

const WORK_ORDERS = [
  { id: "wo1",  woNo: "WO-INT-001", title: "Replace HVAC filters — Warehouse A",       type: "Maintenance",  priority: "Medium" as WOPriority,   status: "Completed" as WOStatus,   assignee: "Tom Harris",   dueDate: "2025-07-05" },
  { id: "wo2",  woNo: "WO-INT-002", title: "Forklift FL-03 annual inspection",          type: "Inspection",   priority: "High" as WOPriority,     status: "In Progress" as WOStatus, assignee: "Dan Cooper",   dueDate: "2025-07-10" },
  { id: "wo3",  woNo: "WO-INT-003", title: "Repair conveyor belt Section C",            type: "Repair",       priority: "Critical" as WOPriority, status: "In Progress" as WOStatus, assignee: "Mike Ross",    dueDate: "2025-07-08" },
  { id: "wo4",  woNo: "WO-INT-004", title: "Calibrate precision weighing scales",       type: "Calibration",  priority: "Medium" as WOPriority,   status: "Open" as WOStatus,        assignee: "Lisa Marsh",   dueDate: "2025-07-15" },
  { id: "wo5",  woNo: "WO-INT-005", title: "Install new fire suppression panel",        type: "Installation", priority: "High" as WOPriority,     status: "On Hold" as WOStatus,     assignee: "Tom Harris",   dueDate: "2025-07-20" },
  { id: "wo6",  woNo: "WO-INT-006", title: "Lubricate overhead crane wheels",           type: "Maintenance",  priority: "Low" as WOPriority,      status: "Open" as WOStatus,        assignee: "Dan Cooper",   dueDate: "2025-07-18" },
  { id: "wo7",  woNo: "WO-INT-007", title: "Electrical panel inspection B2",            type: "Inspection",   priority: "High" as WOPriority,     status: "Completed" as WOStatus,   assignee: "Mike Ross",    dueDate: "2025-07-03" },
  { id: "wo8",  woNo: "WO-INT-008", title: "Replace roller bearings on press line",     type: "Repair",       priority: "Critical" as WOPriority, status: "Open" as WOStatus,        assignee: "Lisa Marsh",   dueDate: "2025-07-09" },
  { id: "wo9",  woNo: "WO-INT-009", title: "Scheduled boiler service",                  type: "Maintenance",  priority: "Medium" as WOPriority,   status: "Completed" as WOStatus,   assignee: "Tom Harris",   dueDate: "2025-06-30" },
  { id: "wo10", woNo: "WO-INT-010", title: "Patch roof leak above storage bay 4",       type: "Repair",       priority: "High" as WOPriority,     status: "In Progress" as WOStatus, assignee: "Dan Cooper",   dueDate: "2025-07-12" },
]

const PRIORITY_STYLE: Record<WOPriority, { bg: string; color: string }> = {
  Critical: { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  High:     { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
  Medium:   { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
  Low:      { bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
}

const STATUS_STYLE: Record<WOStatus, { bg: string; color: string; border: string }> = {
  Open:        { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
  "In Progress":{ bg: "rgba(26,86,219,0.12)",  color: "var(--primary)", border: "rgba(26,86,219,0.3)" },
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  "On Hold":   { bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Cancelled:   { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
}

export default function WorkOrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Work Orders</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Internal maintenance and repair work orders</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> New Work Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open", value: WORK_ORDERS.filter(w => w.status === "Open").length.toString(), accent: "#6b7280" },
          { label: "In Progress", value: WORK_ORDERS.filter(w => w.status === "In Progress").length.toString(), accent: "var(--primary)" },
          { label: "Critical", value: WORK_ORDERS.filter(w => w.priority === "Critical").length.toString(), accent: "#ef4444" },
          { label: "Completed", value: WORK_ORDERS.filter(w => w.status === "Completed").length.toString(), accent: "#22c55e" },
        ].map(k => (
          <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: k.accent }}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                  {["WO #","Title","Type","Priority","Assignee","Due Date","Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WORK_ORDERS.map(w => {
                  const ps = PRIORITY_STYLE[w.priority]
                  const ss = STATUS_STYLE[w.status]
                  return (
                    <tr key={w.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: "var(--primary)" }}>{w.woNo}</td>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{w.title}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{w.type}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: ps.bg, color: ps.color }}>{w.priority}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{w.assignee}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{w.dueDate}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: ss.bg, color: ss.color, borderColor: ss.border }}>{w.status}</span>
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
