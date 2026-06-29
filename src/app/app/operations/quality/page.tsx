"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react"

type InspResult = "Pass" | "Fail" | "Conditional Pass"
type NCRSeverity = "Critical" | "Major" | "Minor"
type NCRStatus = "Open" | "Under Review" | "Resolved" | "Closed"
type CAPAStatus = "Open" | "In Progress" | "Completed" | "Overdue"

const INSPECTIONS = [
  { id: "i1",  item: "PCB Assembly Rev3 — Batch 047",      inspector: "Priya Sharma",    date: "2025-07-07", result: "Pass" as InspResult,             notes: "All 20 units passed visual & functional" },
  { id: "i2",  item: "Hydraulic Seal Kit — PO-4819 recv", inspector: "Dan Cooper",       date: "2025-07-06", result: "Conditional Pass" as InspResult, notes: "3 seals showed minor flash — accepted" },
  { id: "i3",  item: "Aluminium Frame 2040 — Batch 003",   inspector: "Mike Davies",     date: "2025-07-05", result: "Pass" as InspResult,             notes: "Dimensional check OK, surface finish OK" },
  { id: "i4",  item: "Cable 24AWG — PO-4807 recv",         inspector: "Priya Sharma",    date: "2025-07-04", result: "Fail" as InspResult,             notes: "Insulation damage on 15% of roll" },
  { id: "i5",  item: "Servo Motor 24V — Returns batch",    inspector: "Dan Cooper",       date: "2025-07-03", result: "Fail" as InspResult,             notes: "2 of 3 units fail torque specification" },
  { id: "i6",  item: "Steel Plate 5mm — PO-4810",          inspector: "Mike Davies",     date: "2025-07-02", result: "Pass" as InspResult,             notes: "Hardness and flatness within tolerance" },
  { id: "i7",  item: "Safety Relay Board — Batch 012",     inspector: "Priya Sharma",    date: "2025-07-01", result: "Pass" as InspResult,             notes: "Full electrical test passed" },
  { id: "i8",  item: "Pneumatic Cylinder 50mm — recv",     inspector: "Tom Harris",      date: "2025-06-30", result: "Conditional Pass" as InspResult, notes: "Slight scoring on rod — customer notified" },
]

const NCRS = [
  { id: "n1",  ncrNo: "NCR-2025-018", title: "Insulation damage on Cable 24AWG",   severity: "Major" as NCRSeverity,    status: "Open" as NCRStatus,         assignee: "Dan Cooper",    raised: "2025-07-04", source: "Incoming Inspection" },
  { id: "n2",  ncrNo: "NCR-2025-017", title: "Servo Motor torque below spec",      severity: "Critical" as NCRSeverity, status: "Under Review" as NCRStatus, assignee: "Priya Sharma",  raised: "2025-07-03", source: "Customer Return" },
  { id: "n3",  ncrNo: "NCR-2025-016", title: "PCB solder bridging on AOI line",    severity: "Major" as NCRSeverity,    status: "Resolved" as NCRStatus,     assignee: "Mike Davies",   raised: "2025-06-28", source: "In-Process Inspection" },
  { id: "n4",  ncrNo: "NCR-2025-015", title: "Seal hardness out of tolerance",     severity: "Minor" as NCRSeverity,    status: "Closed" as NCRStatus,       assignee: "Tom Harris",    raised: "2025-06-20", source: "Supplier Audit" },
  { id: "n5",  ncrNo: "NCR-2025-014", title: "Hydraulic cylinder rod scoring",     severity: "Minor" as NCRSeverity,    status: "Open" as NCRStatus,         assignee: "Dan Cooper",    raised: "2025-06-30", source: "Incoming Inspection" },
  { id: "n6",  ncrNo: "NCR-2025-013", title: "Carbon fibre sheet delamination",    severity: "Critical" as NCRSeverity, status: "Under Review" as NCRStatus, assignee: "Priya Sharma",  raised: "2025-06-15", source: "In-Process Inspection" },
  { id: "n7",  ncrNo: "NCR-2025-012", title: "LED strip brightness variation",     severity: "Minor" as NCRSeverity,    status: "Closed" as NCRStatus,       assignee: "Mike Davies",   raised: "2025-06-10", source: "Final Inspection" },
]

const CAPAS = [
  { id: "c1", capaNo: "CAPA-2025-009", title: "Root cause analysis — cable insulation",   assignee: "Dan Cooper",   dueDate: "2025-07-21", status: "Open" as CAPAStatus,        linkedNCR: "NCR-2025-018" },
  { id: "c2", capaNo: "CAPA-2025-008", title: "Servo motor supplier qualification review",assignee: "Priya Sharma", dueDate: "2025-07-15", status: "In Progress" as CAPAStatus, linkedNCR: "NCR-2025-017" },
  { id: "c3", capaNo: "CAPA-2025-007", title: "AOI calibration and operator retraining",  assignee: "Mike Davies",  dueDate: "2025-07-10", status: "Completed" as CAPAStatus,   linkedNCR: "NCR-2025-016" },
  { id: "c4", capaNo: "CAPA-2025-006", title: "Update seal inspection procedure",          assignee: "Tom Harris",   dueDate: "2025-06-28", status: "Completed" as CAPAStatus,   linkedNCR: "NCR-2025-015" },
  { id: "c5", capaNo: "CAPA-2025-005", title: "Cylinder rod scoring prevention protocol",  assignee: "Dan Cooper",   dueDate: "2025-07-07", status: "Overdue" as CAPAStatus,     linkedNCR: "NCR-2025-014" },
  { id: "c6", capaNo: "CAPA-2025-004", title: "Carbon fibre lamination process review",   assignee: "Priya Sharma", dueDate: "2025-07-18", status: "In Progress" as CAPAStatus, linkedNCR: "NCR-2025-013" },
]

const INSP_STYLE: Record<InspResult, { bg: string; color: string }> = {
  Pass:               { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  Fail:               { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  "Conditional Pass": { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
}

const SEVERITY_STYLE: Record<NCRSeverity, { bg: string; color: string }> = {
  Critical: { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  Major:    { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
  Minor:    { bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
}

const NCR_STATUS_STYLE: Record<NCRStatus, { bg: string; color: string; border: string }> = {
  Open:          { bg: "rgba(239,68,68,0.12)",   color: "#dc2626", border: "rgba(239,68,68,0.3)"   },
  "Under Review":{ bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Resolved:      { bg: "rgba(26,86,219,0.12)",   color: "var(--primary)", border: "rgba(26,86,219,0.3)" },
  Closed:        { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
}

const CAPA_STATUS_STYLE: Record<CAPAStatus, { bg: string; color: string }> = {
  Open:        { bg: "rgba(107,114,128,0.1)",  color: "#6b7280" },
  "In Progress":{ bg: "rgba(26,86,219,0.12)",  color: "var(--primary)" },
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
  Overdue:     { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
}

type TabId = "inspections" | "ncrs" | "capas" | "audits"

export default function QualityPage() {
  const [tab, setTab] = useState<TabId>("inspections")
  const [search, setSearch] = useState("")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Quality Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Inspections, non-conformances, and corrective actions</p>
        </div>
        <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus className="h-4 w-4" /> New Inspection
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pass Rate",         value: `${Math.round((INSPECTIONS.filter(i => i.result === "Pass").length / INSPECTIONS.length) * 100)}%`, accent: "#22c55e" },
          { label: "Open NCRs",         value: NCRS.filter(n => n.status === "Open" || n.status === "Under Review").length.toString(), accent: "#ef4444" },
          { label: "Overdue CAPAs",     value: CAPAS.filter(c => c.status === "Overdue").length.toString(), accent: "#f59e0b" },
          { label: "Closed This Month", value: NCRS.filter(n => n.status === "Closed").length.toString(), accent: "var(--primary)" },
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
        {([["inspections","Inspections"],["ncrs","NCRs"],["capas","Corrective Actions"],["audits","Audits"]] as [TabId,string][]).map(([id, label]) => (
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

      {tab === "inspections" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                  {["Item / Batch","Inspector","Date","Result","Notes"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INSPECTIONS.map(i => {
                  const s = INSP_STYLE[i.result]
                  return (
                    <tr key={i.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{i.item}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{i.inspector}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{i.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {i.result === "Pass" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: s.color }} />
                          ) : (
                            <AlertTriangle className="h-3.5 w-3.5" style={{ color: s.color }} />
                          )}
                          <span className="text-xs font-medium" style={{ color: s.color }}>{i.result}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs max-w-56 truncate" style={{ color: "var(--muted-foreground)" }}>{i.notes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "ncrs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{NCRS.length} non-conformance reports</span>
            <Button size="sm" className="gap-2" style={{ background: "#ef4444", color: "#fff" }}>
              <Plus className="h-4 w-4" /> Raise NCR
            </Button>
          </div>
          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    {["NCR #","Title","Severity","Status","Assignee","Raised","Source"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NCRS.map(n => {
                    const sev = SEVERITY_STYLE[n.severity]
                    const st = NCR_STATUS_STYLE[n.status]
                    return (
                      <tr key={n.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{n.ncrNo}</td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{n.title}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: sev.bg, color: sev.color }}>{n.severity}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: st.bg, color: st.color, borderColor: st.border }}>{n.status}</span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{n.assignee}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{n.raised}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{n.source}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "capas" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{CAPAS.length} corrective actions</span>
            <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
              <Plus className="h-4 w-4" /> New CAPA
            </Button>
          </div>
          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    {["CAPA #","Title","Linked NCR","Assignee","Due Date","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAPAS.map(c => {
                    const s = CAPA_STATUS_STYLE[c.status]
                    return (
                      <tr key={c.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{c.capaNo}</td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{c.title}</td>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{c.linkedNCR}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{c.assignee}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: c.status === "Overdue" ? "#dc2626" : "var(--foreground)", fontWeight: c.status === "Overdue" ? 600 : 400 }}>
                          {c.dueDate}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: s.bg, color: s.color }}>{c.status}</span>
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

      {tab === "audits" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Quality Audits</h2>
            <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
              <Plus className="h-4 w-4" /> Schedule Audit
            </Button>
          </div>
          <Card className="border" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                    {["Audit","Type","Lead Auditor","Scheduled","Status","Findings"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: "ISO 9001 Internal Audit Q2",     type: "Internal",  auditor: "Priya Sharma", date: "2025-06-15", status: "Completed", findings: 3 },
                    { title: "Supplier Audit — Parker Seals",   type: "Supplier",  auditor: "Dan Cooper",   date: "2025-06-20", status: "Completed", findings: 1 },
                    { title: "Process Audit — PCB Line A",      type: "Process",   auditor: "Mike Davies",  date: "2025-07-10", status: "Scheduled", findings: 0 },
                    { title: "ISO 9001 Internal Audit Q3",      type: "Internal",  auditor: "Priya Sharma", date: "2025-09-15", status: "Planned",   findings: 0 },
                    { title: "Customer Audit — Hartmann",       type: "Customer",  auditor: "Tom Harris",   date: "2025-08-05", status: "Planned",   findings: 0 },
                  ].map((a, i) => (
                    <tr key={i} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{a.title}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>{a.type}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{a.auditor}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{a.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                          style={a.status === "Completed"
                            ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                            : a.status === "Scheduled"
                            ? { background: "rgba(59,130,246,0.12)", color: "#3b82f6" }
                            : { background: "rgba(107,114,128,0.1)", color: "#6b7280" }}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {a.findings > 0 ? (
                          <span className="font-semibold" style={{ color: "#d97706" }}>{a.findings} findings</span>
                        ) : (
                          <span style={{ color: "var(--muted-foreground)" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
