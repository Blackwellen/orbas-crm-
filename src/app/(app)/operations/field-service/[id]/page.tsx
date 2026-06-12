"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, MapPin, Wrench, Clock, CheckSquare, Package, ImageIcon, PenLine, FileText } from "lucide-react"

const WO = {
  id: "wo1",
  woNo: "WO-2025-001",
  customer: "Hartmann Industries",
  address: "12 Mill Street, Trafford Park, Manchester, M17 1GE",
  contactName: "Peter Hartmann",
  contactPhone: "+44 161 872 4400",
  equipment: "Hydraulic Press HPX-3000",
  assetTag: "AST-0042",
  faultDescription: "Hydraulic pressure drops below 200 bar during operation cycle. Machine stops automatically at safety threshold. Issue started 3 days ago, intermittent at first.",
  technician: "Dan Cooper",
  techInitials: "DC",
  status: "Completed",
  priority: "High",
  scheduledDate: "2025-07-07",
  scheduledTime: "09:00",
  completedTime: "12:30",
  travelTime: 45,
  workTime: 165,
}

const TASKS = [
  { id: "t1", label: "Check hydraulic fluid level",           done: true },
  { id: "t2", label: "Inspect hydraulic pump output pressure", done: true },
  { id: "t3", label: "Check for hydraulic leaks in circuit",   done: true },
  { id: "t4", label: "Inspect pressure relief valve",          done: true },
  { id: "t5", label: "Test accumulator pressure",              done: true },
  { id: "t6", label: "Replace worn seals",                     done: true },
  { id: "t7", label: "Bleed hydraulic circuit",                done: true },
  { id: "t8", label: "Test machine under full load",           done: true },
  { id: "t9", label: "Complete service report",                done: false },
]

const PARTS = [
  { id: "p1", partNo: "HSK-5050",    name: "Hydraulic Seal Kit 50mm", qty: 2, unit: "sets",   status: "Used" },
  { id: "p2", partNo: "ORL-NBR70",   name: "O-Ring NBR Kit",          qty: 1, unit: "kit",    status: "Used" },
  { id: "p3", partNo: "HYD-FLUID-5L",name: "Hydraulic Fluid 5L",      qty: 2, unit: "bottles",status: "Used" },
  { id: "p4", partNo: "PRV-3000",    name: "Pressure Relief Valve",   qty: 1, unit: "pcs",    status: "Required" },
]

const WORKFLOW = ["Scheduled","Dispatched","On Site","Completed","Invoiced"]
const CURRENT_STEP = 3

const STATUS_COLORS: Record<string, string> = {
  Scheduled: "#6b7280",
  "En Route": "#3b82f6",
  "In Progress": "var(--primary)",
  Completed: "#22c55e",
  Cancelled: "#dc2626",
}

const TABS = ["Overview","Tasks","Parts","Time","Photos","Signature","Notes"] as const
type Tab = typeof TABS[number]

export default function WorkOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [tab, setTab] = useState<Tab>("Overview")
  const [tasks, setTasks] = useState(TASKS)

  function toggleTask(taskId: string) {
    setTasks(ts => ts.map(t => t.id === taskId ? { ...t, done: !t.done } : t))
  }

  const completedTasks = tasks.filter(t => t.done).length

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
      <div className="border-b px-6 py-4 flex items-center gap-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/app/operations/field-service">
          <Button size="sm" variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Field Service
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        <Wrench className="h-4 w-4" style={{ color: "var(--primary)" }} />
        <h1 className="font-semibold" style={{ color: "var(--foreground)" }}>{WO.woNo}</h1>
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border"
          style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", borderColor: "rgba(34,197,94,0.3)" }}
        >
          {WO.status}
        </span>
      </div>

      {/* Workflow Status Bar */}
      <div className="px-6 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
        <div className="flex items-center gap-0">
          {WORKFLOW.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: i <= CURRENT_STEP ? "#22c55e" : "var(--muted-foreground)" }}
                >
                  {i <= CURRENT_STEP ? "✓" : i + 1}
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: i <= CURRENT_STEP ? "#16a34a" : "var(--muted-foreground)" }}>
                  {step}
                </span>
              </div>
              {i < WORKFLOW.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-4" style={{ background: i < CURRENT_STEP ? "#22c55e" : "var(--border)" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b px-6 flex gap-1 overflow-x-auto" style={{ borderColor: "var(--border)" }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
            style={{
              borderColor: tab === t ? "var(--primary)" : "transparent",
              color: tab === t ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6">
        {tab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardHeader className="pb-3"><CardTitle className="text-base">Customer & Location</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Customer</p>
                  <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{WO.customer}</p>
                </div>
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Contact</p>
                  <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WO.contactName} · {WO.contactPhone}</p>
                </div>
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Address</p>
                  <div className="flex items-start gap-1.5 mt-0.5">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>{WO.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardHeader className="pb-3"><CardTitle className="text-base">Equipment & Fault</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Equipment</p>
                  <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{WO.equipment}</p>
                </div>
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Asset Tag</p>
                  <p className="font-mono font-medium mt-0.5" style={{ color: "var(--primary)" }}>{WO.assetTag}</p>
                </div>
                <div>
                  <p style={{ color: "var(--muted-foreground)" }}>Fault Description</p>
                  <p className="mt-0.5 leading-relaxed" style={{ color: "var(--foreground)" }}>{WO.faultDescription}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardHeader className="pb-3"><CardTitle className="text-base">Technician & Schedule</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--primary)" }}>
                    {WO.techInitials}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--foreground)" }}>{WO.technician}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Assigned Technician</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: "var(--muted-foreground)" }}>Scheduled</p>
                    <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WO.scheduledDate} {WO.scheduledTime}</p>
                  </div>
                  <div>
                    <p style={{ color: "var(--muted-foreground)" }}>Completed</p>
                    <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WO.scheduledDate} {WO.completedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardHeader className="pb-3"><CardTitle className="text-base">Task Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--muted-foreground)" }}>Tasks Completed</span>
                  <span className="font-semibold" style={{ color: "#22c55e" }}>{completedTasks}/{tasks.length}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(completedTasks / tasks.length) * 100}%`, background: "#22c55e" }} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Tasks" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Service Checklist</h2>
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{completedTasks}/{tasks.length} completed</span>
            </div>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-4 space-y-2">
                {tasks.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all"
                    style={{ background: t.done ? "rgba(34,197,94,0.08)" : "transparent" }}
                  >
                    <div
                      className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0"
                      style={{
                        borderColor: t.done ? "#22c55e" : "var(--border)",
                        background: t.done ? "#22c55e" : "transparent",
                      }}
                    >
                      {t.done && <CheckSquare className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm" style={{
                      color: t.done ? "var(--muted-foreground)" : "var(--foreground)",
                      textDecoration: t.done ? "line-through" : "none",
                    }}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Parts" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Parts Used & Required</h2>
              <Button size="sm" variant="outline" className="gap-2">
                <Package className="h-4 w-4" /> Add Part
              </Button>
            </div>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Part #","Name","Qty","Unit","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PARTS.map(p => (
                      <tr key={p.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{p.partNo}</td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{p.name}</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{p.qty}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{p.unit}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                            style={p.status === "Used"
                              ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                              : { background: "rgba(245,158,11,0.12)", color: "#d97706" }}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Time" && (
          <div className="space-y-4 max-w-lg">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Time Tracking</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Travel Time",   value: `${WO.travelTime}m`,  accent: "#8b5cf6" },
                { label: "Work Time",     value: `${WO.workTime}m`,    accent: "var(--primary)" },
                { label: "Total Billing", value: `${Math.round((WO.travelTime + WO.workTime) / 60 * 10) / 10}h`, accent: "#22c55e" },
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
              <CardContent className="p-4 space-y-3 text-sm">
                {[
                  { label: "Departure", value: `${WO.scheduledDate} 08:15` },
                  { label: "Arrived on Site", value: `${WO.scheduledDate} 09:00` },
                  { label: "Work Started", value: `${WO.scheduledDate} 09:10` },
                  { label: "Work Completed", value: `${WO.scheduledDate} ${WO.completedTime}` },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>{f.label}</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{f.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Photos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Site Photos</h2>
              <Button size="sm" variant="outline" className="gap-2">
                <ImageIcon className="h-4 w-4" /> Upload Photos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Before — Hydraulic leak", time: "09:15" },
                { label: "During — Seal replacement", time: "10:30" },
                { label: "After — System pressurised", time: "12:00" },
              ].map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                  <div className="h-36 flex items-center justify-center" style={{ background: "var(--muted)" }}>
                    <ImageIcon className="h-8 w-8" style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{p.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{p.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Signature" && (
          <div className="space-y-4 max-w-md">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Customer Sign-off</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-xl border-2 border-dashed h-32 flex items-center justify-center" style={{ borderColor: "var(--border)" }}>
                  <div className="text-center">
                    <PenLine className="h-6 w-6 mx-auto mb-1" style={{ color: "var(--muted-foreground)" }} />
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Customer signature captured</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Peter Hartmann · 12:28</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  By signing, the customer confirms the work has been completed satisfactorily.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Notes" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Service Notes</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-4">
                <textarea
                  rows={8}
                  defaultValue="Root cause: worn hydraulic seals on the main actuator allowed pressure to bleed off during operation. Replaced both seal kits and O-ring set. Flushed and refilled hydraulic circuit with new fluid. Tested at full operating pressure (280 bar) for 15 minutes with no pressure drop observed.&#10;&#10;Recommendation: schedule preventive maintenance every 6 months to inspect seals before failure."
                  className="w-full text-sm resize-none rounded-lg"
                  style={{ background: "transparent", border: "none", outline: "none", color: "var(--foreground)" }}
                />
                <div className="flex justify-end pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                  <Button size="sm" style={{ background: "var(--primary)", color: "#fff" }}>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
