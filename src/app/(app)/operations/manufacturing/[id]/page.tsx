"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, Cog, CheckCircle2, Clock } from "lucide-react"

const MO = {
  id: "mo1",
  orderNo: "MO-2025-001",
  product: "PCB Assembly Rev3",
  qty: 200,
  unit: "pcs",
  status: "In Progress",
  startDate: "2025-06-15",
  dueDate: "2025-07-15",
  bom: "BOM-PCB-R3",
  route: "RT-Electronics-A",
  progress: 68,
  workstation: "WS-Electronics-1",
  produced: 136,
  scrapped: 4,
}

const BOM = [
  { id: "b1", component: "PCB Bare Board Rev3",     qty: 200, unit: "pcs",  available: 240, status: "Available" },
  { id: "b2", component: "Microcontroller STM32F4", qty: 200, unit: "pcs",  available: 180, status: "Shortage" },
  { id: "b3", component: "Resistor 10K 0402",       qty: 4000,unit: "pcs",  available: 8000,status: "Available" },
  { id: "b4", component: "Capacitor 100nF 0402",    qty: 2000,unit: "pcs",  available: 5000,status: "Available" },
  { id: "b5", component: "Connector 6-pin JST",     qty: 400, unit: "pcs",  available: 350, status: "Shortage" },
  { id: "b6", component: "Crystal 16MHz",           qty: 200, unit: "pcs",  available: 220, status: "Available" },
  { id: "b7", component: "LED Red 0402",            qty: 600, unit: "pcs",  available: 700, status: "Available" },
  { id: "b8", component: "Solder Paste 500g",       qty: 2,   unit: "jars", available: 4,   status: "Available" },
]

const OPERATIONS = [
  { id: "op1", step: 1, name: "Solder Paste Application", workstation: "WS-Paste-1",  estimatedTime: 45,  actualTime: 42,  status: "Completed" },
  { id: "op2", step: 2, name: "SMT Pick & Place",          workstation: "WS-SMT-1",    estimatedTime: 120, actualTime: 118, status: "Completed" },
  { id: "op3", step: 3, name: "Reflow Soldering",          workstation: "WS-Reflow-1", estimatedTime: 60,  actualTime: 65,  status: "Completed" },
  { id: "op4", step: 4, name: "AOI Inspection",            workstation: "WS-AOI-1",    estimatedTime: 30,  actualTime: null,status: "In Progress" },
  { id: "op5", step: 5, name: "Through-Hole Assembly",     workstation: "WS-THT-1",    estimatedTime: 90,  actualTime: null,status: "Pending" },
  { id: "op6", step: 6, name: "Wave Soldering",            workstation: "WS-Wave-1",   estimatedTime: 45,  actualTime: null,status: "Pending" },
  { id: "op7", step: 7, name: "Final Testing",             workstation: "WS-Test-1",   estimatedTime: 60,  actualTime: null,status: "Pending" },
  { id: "op8", step: 8, name: "Packaging",                 workstation: "WS-Pack-1",   estimatedTime: 30,  actualTime: null,status: "Pending" },
]

const MATERIALS = [
  { id: "mt1", component: "PCB Bare Board Rev3",     required: 200, consumed: 136, remaining: 64, unit: "pcs" },
  { id: "mt2", component: "Microcontroller STM32F4", required: 200, consumed: 136, remaining: 64, unit: "pcs" },
  { id: "mt3", component: "Resistor 10K 0402",       required: 4000,consumed: 2720,remaining: 1280,unit: "pcs" },
  { id: "mt4", component: "Capacitor 100nF 0402",    required: 2000,consumed: 1360,remaining: 640, unit: "pcs" },
  { id: "mt5", component: "Connector 6-pin JST",     required: 400, consumed: 272, remaining: 128, unit: "pcs" },
]

const OP_STATUS: Record<string, { bg: string; color: string }> = {
  Completed:   { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  "In Progress":{ bg: "rgba(26,86,219,0.12)", color: "var(--primary)" },
  Pending:     { bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
}

const BOM_STATUS: Record<string, { bg: string; color: string }> = {
  Available: { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  Shortage:  { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
}

const TABS = ["Overview","BOM","Operations","Materials","Quality","Documents"] as const
type Tab = typeof TABS[number]

export default function ManufacturingOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [tab, setTab] = useState<Tab>("Overview")

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
      <div className="border-b px-6 py-4 flex items-center gap-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/app/operations/manufacturing">
          <Button size="sm" variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Manufacturing
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        <Cog className="h-4 w-4" style={{ color: "var(--primary)" }} />
        <h1 className="font-semibold" style={{ color: "var(--foreground)" }}>{MO.orderNo} — {MO.product}</h1>
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: "rgba(26,86,219,0.12)", color: "var(--primary)", borderColor: "rgba(26,86,219,0.3)" }}>
          {MO.status}
        </span>
      </div>

      <div className="border-b px-6 flex gap-1" style={{ borderColor: "var(--border)" }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      { label: "Product", value: MO.product },
                      { label: "Order Number", value: MO.orderNo },
                      { label: "Quantity", value: `${MO.qty} ${MO.unit}` },
                      { label: "Workstation", value: MO.workstation },
                      { label: "Start Date", value: MO.startDate },
                      { label: "Due Date", value: MO.dueDate },
                      { label: "BOM", value: MO.bom },
                      { label: "Route", value: MO.route },
                    ].map(f => (
                      <div key={f.label}>
                        <p style={{ color: "var(--muted-foreground)" }}>{f.label}</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{f.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border" style={{ borderColor: "var(--border)" }}>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Production Progress</p>
                    <p className="text-3xl font-bold" style={{ color: "var(--primary)" }}>{MO.progress}%</p>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{ width: `${MO.progress}%`, background: "var(--primary)" }} />
                    </div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {MO.produced} produced · {MO.scrapped} scrapped
                    </p>
                  </CardContent>
                </Card>
                {[
                  { label: "Produced",  value: `${MO.produced}/${MO.qty}`, color: "#22c55e" },
                  { label: "Scrapped",  value: MO.scrapped.toString(),      color: "#ef4444" },
                ].map(k => (
                  <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
                    <CardContent className="p-3">
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
                      <p className="text-xl font-bold mt-0.5" style={{ color: k.color }}>{k.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "BOM" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Bill of Materials — {MO.bom}</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Component","Qty Required","Unit","Available Stock","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BOM.map(b => {
                      const s = BOM_STATUS[b.status]
                      return (
                        <tr key={b.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                          <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{b.component}</td>
                          <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{b.qty.toLocaleString()}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{b.unit}</td>
                          <td className="px-4 py-3" style={{ color: b.available >= b.qty ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
                            {b.available.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: s.bg, color: s.color }}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Operations" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Production Operations — {MO.route}</h2>
            <div className="space-y-3">
              {OPERATIONS.map(op => {
                const s = OP_STATUS[op.status]
                return (
                  <Card key={op.id} className="border" style={{ borderColor: "var(--border)" }}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ background: op.status === "Completed" ? "#22c55e" : op.status === "In Progress" ? "var(--primary)" : "var(--muted-foreground)" }}
                        >
                          {op.status === "Completed" ? <CheckCircle2 className="h-4 w-4" /> : op.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium" style={{ color: "var(--foreground)" }}>{op.name}</p>
                            <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: s.bg, color: s.color }}>{op.status}</span>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{op.workstation}</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" style={{ color: "var(--muted-foreground)" }} />
                            <span style={{ color: "var(--muted-foreground)" }}>Est: {op.estimatedTime}m</span>
                            {op.actualTime && (
                              <span className="font-semibold" style={{ color: op.actualTime <= op.estimatedTime ? "#22c55e" : "#ef4444" }}>
                                Actual: {op.actualTime}m
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {tab === "Materials" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Materials Consumed</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Component","Required","Consumed","Remaining","Unit"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MATERIALS.map(m => (
                      <tr key={m.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{m.component}</td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{m.required.toLocaleString()}</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>
                          {m.consumed.toLocaleString()}
                          <div className="h-1 mt-1 rounded-full overflow-hidden" style={{ background: "var(--muted)", width: 64 }}>
                            <div className="h-full rounded-full" style={{ width: `${(m.consumed / m.required) * 100}%`, background: "var(--primary)" }} />
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{m.remaining.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Quality" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Quality Control</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Pass Rate",  value: "96.8%", accent: "#22c55e" },
                { label: "Scrapped",   value: `${MO.scrapped} pcs`, accent: "#ef4444" },
                { label: "Rework",     value: "8 pcs", accent: "#f59e0b" },
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
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>Defect Log</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                      {["Date","Operation","Defect Type","Qty","Disposition"].map(h => (
                        <th key={h} className="text-left py-2 pr-4 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "2025-06-28", op: "Reflow", type: "Tombstone", qty: 2, disp: "Scrapped" },
                      { date: "2025-06-30", op: "AOI",    type: "Short Circuit", qty: 1, disp: "Rework" },
                      { date: "2025-07-02", op: "Reflow", type: "Cold Joint", qty: 1,  disp: "Scrapped" },
                      { date: "2025-07-04", op: "THT",    type: "Missing Component", qty: 4, disp: "Rework" },
                    ].map((d, i) => (
                      <tr key={i} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="py-2 pr-4 text-xs" style={{ color: "var(--muted-foreground)" }}>{d.date}</td>
                        <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>{d.op}</td>
                        <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>{d.type}</td>
                        <td className="py-2 pr-4 font-semibold" style={{ color: "var(--foreground)" }}>{d.qty}</td>
                        <td className="py-2 pr-4">
                          <span style={{ color: d.disp === "Scrapped" ? "#dc2626" : "#d97706", fontWeight: 500 }}>{d.disp}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Documents" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Documents</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-4 space-y-3">
                {[
                  { name: "BOM-PCB-R3.pdf",            type: "BOM",    date: "2025-06-10" },
                  { name: "RT-Electronics-A Route.pdf", type: "Route",  date: "2025-06-10" },
                  { name: "Work Instructions Rev2.pdf", type: "WI",     date: "2025-06-12" },
                  { name: "QC Checklist v4.pdf",        type: "Quality",date: "2025-06-14" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{d.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{d.type} · {d.date}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-7">Download</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
