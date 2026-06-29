"use client"

import { useState } from "react"
import { ClipboardList, Plus } from "lucide-react"

const audits = [
  { id: "AUD-001", name: "ISO 27001 Internal Audit 2026", type: "Internal", scope: "Information Security Management", lead: "Sarah Chen", scheduled: "2026-06-22", status: "Upcoming", findings: 0 },
  { id: "AUD-002", name: "GDPR Compliance Review Q2", type: "Internal", scope: "Data Processing Activities", lead: "James Wright", scheduled: "2026-07-05", status: "Upcoming", findings: 0 },
  { id: "AUD-003", name: "PCI-DSS Quarterly Assessment", type: "External", scope: "Payment Systems & Card Data", lead: "Deloitte LLP", scheduled: "2026-07-15", status: "Upcoming", findings: 0 },
  { id: "AUD-004", name: "SOC2 Type II Readiness Review", type: "Internal", scope: "Trust Service Criteria", lead: "Mark Davies", scheduled: "2026-06-15", status: "In Progress", findings: 3 },
  { id: "AUD-005", name: "Financial Controls Audit", type: "External", scope: "Finance & Accounting", lead: "KPMG", scheduled: "2026-06-10", status: "In Progress", findings: 1 },
  { id: "AUD-006", name: "Supplier Security Assessment – Acme AWS", type: "Internal", scope: "Third Party Security", lead: "Rachel Kim", scheduled: "2026-05-20", status: "Completed", findings: 5 },
  { id: "AUD-007", name: "Annual Penetration Test Review", type: "External", scope: "Network & Application Security", lead: "NCC Group", scheduled: "2026-04-15", status: "Completed", findings: 8 },
  { id: "AUD-008", name: "HR Policy Compliance Audit", type: "Internal", scope: "Human Resources", lead: "Tom Patel", scheduled: "2026-03-20", status: "Completed", findings: 2 },
  { id: "AUD-009", name: "Business Continuity Exercise", type: "Internal", scope: "BCP & DR", lead: "Sarah Chen", scheduled: "2026-02-15", status: "Completed", findings: 4 },
  { id: "AUD-010", name: "Access Control Review", type: "Internal", scope: "Identity & Access Management", lead: "Mark Davies", scheduled: "2026-01-30", status: "Completed", findings: 7 },
  { id: "AUD-011", name: "Cyber Essentials Certification Audit", type: "External", scope: "Cyber Security Baseline", lead: "IASME", scheduled: "2026-08-01", status: "Upcoming", findings: 0 },
  { id: "AUD-012", name: "Health & Safety Inspection", type: "External", scope: "Workplace Safety", lead: "HSE Inspector", scheduled: "2026-08-20", status: "Upcoming", findings: 0 },
]

function statusStyle(s: string) {
  switch (s) {
    case "Upcoming": return { background: "#eff6ff", color: "#1a56db" }
    case "In Progress": return { background: "#fef9c3", color: "#d97706" }
    case "Completed": return { background: "#dcfce7", color: "#16a34a" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

export default function AuditsPage() {
  const [tab, setTab] = useState("all")

  const tabs = ["all", "upcoming", "in-progress", "completed"]
  const filtered = audits.filter(a => {
    if (tab === "upcoming") return a.status === "Upcoming"
    if (tab === "in-progress") return a.status === "In Progress"
    if (tab === "completed") return a.status === "Completed"
    return true
  })

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ClipboardList size={24} style={{ color: "#7c3aed" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Audit Schedule</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> New Audit
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? "var(--primary)" : "var(--muted-foreground)", borderBottom: tab === t ? "2px solid var(--primary)" : "2px solid transparent", textTransform: "capitalize" }}>
            {t.replace("-", " ")} {t === "all" ? `(${audits.length})` : `(${audits.filter(a => a.status === (t === "in-progress" ? "In Progress" : t.charAt(0).toUpperCase() + t.slice(1))).length})`}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["ID", "Audit Name", "Type", "Scope", "Lead Auditor", "Scheduled", "Status", "Findings"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{a.id}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{a.name}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: a.type === "External" ? "#f3e8ff" : "#eff6ff", color: a.type === "External" ? "#7c3aed" : "#1a56db", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{a.type}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)", maxWidth: 180 }}>{a.scope}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{a.lead}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{a.scheduled}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(a.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{a.status}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: a.findings > 0 ? "#dc2626" : "var(--muted-foreground)", textAlign: "center" }}>{a.findings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
