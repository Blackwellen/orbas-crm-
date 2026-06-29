"use client"

import { Shield, AlertTriangle, CheckSquare, FileText, ClipboardList, AlertCircle, Plus, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Open Risks", value: "8", icon: AlertTriangle, color: "#f59e0b" },
  { label: "Controls Active", value: "42", icon: CheckSquare, color: "#16a34a" },
  { label: "Policies Reviewed", value: "18/23", icon: FileText, color: "#1a56db" },
  { label: "Audits Due", value: "3", icon: ClipboardList, color: "#7c3aed" },
  { label: "Incidents Open", value: "2", icon: AlertCircle, color: "#dc2626" },
  { label: "Compliance Score", value: "84%", icon: TrendingUp, color: "#06b6d4" },
]

const deadlines = [
  { title: "GDPR Annual Review", date: "2026-06-15", priority: "high" },
  { title: "ISO 27001 Internal Audit", date: "2026-06-22", priority: "high" },
  { title: "Security Awareness Training", date: "2026-06-30", priority: "medium" },
  { title: "PCI-DSS Quarterly Scan", date: "2026-07-05", priority: "medium" },
  { title: "SOC2 Evidence Collection", date: "2026-07-15", priority: "low" },
  { title: "Cookie Policy Update", date: "2026-07-20", priority: "low" },
]

const recentIncidents = [
  { title: "Phishing attempt on staff email", severity: "high", date: "2026-06-08" },
  { title: "Unauthorised USB device detected", severity: "medium", date: "2026-06-06" },
  { title: "Failed login attempts (x24)", severity: "medium", date: "2026-06-03" },
  { title: "Vendor data processing agreement expired", severity: "low", date: "2026-05-30" },
]

const frameworks = [
  { name: "GDPR", score: 92 },
  { name: "ISO 27001", score: 78 },
  { name: "SOC2", score: 65 },
  { name: "PCI-DSS", score: 55 },
]

// Heat map data: {likelihood, impact}
const riskDots = [
  { l: 4, i: 5, label: "Cyber Attack" },
  { l: 3, i: 4, label: "Data Breach" },
  { l: 2, i: 5, label: "Regulatory Fine" },
  { l: 5, i: 3, label: "System Outage" },
  { l: 3, i: 3, label: "Staff Non-compliance" },
  { l: 1, i: 4, label: "Supplier Failure" },
  { l: 2, i: 2, label: "Process Error" },
  { l: 4, i: 2, label: "Minor Incident" },
]

function severityBadge(s: string) {
  if (s === "high") return { background: "#fee2e2", color: "#dc2626" }
  if (s === "medium") return { background: "#fef9c3", color: "#d97706" }
  return { background: "#dcfce7", color: "#16a34a" }
}

function priorityBadge(p: string) {
  if (p === "high") return { background: "#fee2e2", color: "#dc2626" }
  if (p === "medium") return { background: "#fef9c3", color: "#d97706" }
  return { background: "#dcfce7", color: "#16a34a" }
}

function heatColor(l: number, i: number) {
  const score = l * i
  if (score >= 16) return "#dc2626"
  if (score >= 9) return "#f59e0b"
  if (score >= 4) return "#84cc16"
  return "#22c55e"
}

export default function ComplianceOverviewPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Shield size={28} style={{ color: "#16a34a" }} />
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Compliance Overview</h1>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>Last updated: 10 Jun 2026</p>
          </div>
        </div>
        <span style={{ background: "#fef9c3", color: "#d97706", fontWeight: 700, fontSize: 13, padding: "6px 16px", borderRadius: 20, border: "1px solid #fde68a" }}>
          Overall Risk: Medium
        </span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 32 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: "var(--sidebar-bg)" === "var(--sidebar-bg)" ? "white" : "var(--background)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <k.icon size={16} style={{ color: k.color }} />
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>{k.label}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Middle row: Heat Map + Deadlines + Incidents */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Risk Heat Map */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Risk Heat Map</h2>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 8 }}>Impact →</div>
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(5, 1fr)", gap: 3, width: 200, height: 200 }}>
              {Array.from({ length: 5 }, (_, row) =>
                Array.from({ length: 5 }, (_, col) => {
                  const l = 5 - row
                  const i = col + 1
                  const score = l * i
                  let bg = "#f0fdf4"
                  if (score >= 16) bg = "#fee2e2"
                  else if (score >= 9) bg = "#fef9c3"
                  else if (score >= 4) bg = "#f0fdf4"
                  const dots = riskDots.filter(d => d.l === l && d.i === i)
                  return (
                    <div key={`${row}-${col}`} style={{ background: bg, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }} title={dots.map(d => d.label).join(", ")}>
                      {dots.length > 0 && (
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: heatColor(l, i) }} />
                      )}
                    </div>
                  )
                })
              )}
            </div>
            <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginTop: 8 }}>← Likelihood</div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            {[{ label: "Critical", color: "#dc2626" }, { label: "High", color: "#f59e0b" }, { label: "Medium", color: "#84cc16" }, { label: "Low", color: "#22c55e" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Upcoming Deadlines</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {deadlines.map(d => (
              <div key={d.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", margin: 0 }}>{d.title}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{d.date}</p>
                </div>
                <span style={{ ...priorityBadge(d.priority), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{d.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Recent Incidents</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentIncidents.map(inc => (
              <div key={inc.title} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ ...severityBadge(inc.severity), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, textTransform: "capitalize" }}>{inc.severity}</span>
                  <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{inc.date}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", margin: 0 }}>{inc.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Frameworks + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24 }}>
        {/* Compliance by Framework */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Compliance by Framework</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {frameworks.map(f => (
              <div key={f.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{f.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: f.score >= 80 ? "#16a34a" : f.score >= 65 ? "#d97706" : "#dc2626" }}>{f.score}%</span>
                </div>
                <div style={{ height: 8, background: "var(--muted)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ width: `${f.score}%`, height: "100%", background: f.score >= 80 ? "#16a34a" : f.score >= 65 ? "#f59e0b" : "#dc2626", borderRadius: 8, transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white", minWidth: 220 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Review Risk", color: "#fef9c3", text: "#d97706" },
              { label: "Log Incident", color: "#fee2e2", text: "#dc2626" },
              { label: "Start Audit", color: "#eff6ff", text: "#1a56db" },
              { label: "Update Policy", color: "#f0fdf4", text: "#16a34a" },
            ].map(a => (
              <button key={a.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, border: "none", background: a.color, color: a.text, fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", textAlign: "left" }}>
                <Plus size={14} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
