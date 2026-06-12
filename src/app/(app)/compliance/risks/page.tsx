"use client"

import { useState } from "react"
import { AlertTriangle, Plus, Filter } from "lucide-react"

const risks = [
  { id: "RSK-001", title: "Ransomware Attack on Core Systems", category: "Cyber", likelihood: 4, impact: 5, owner: "Sarah Chen", status: "Assessed", due: "2026-07-01" },
  { id: "RSK-002", title: "GDPR Data Subject Rights Breach", category: "Compliance", likelihood: 3, impact: 5, owner: "Mark Davies", status: "Mitigated", due: "2026-06-30" },
  { id: "RSK-003", title: "Key Person Dependency – CTO", category: "Operational", likelihood: 3, impact: 4, owner: "James Wright", status: "Accepted", due: "2026-08-15" },
  { id: "RSK-004", title: "Third-Party Supplier Insolvency", category: "Financial", likelihood: 2, impact: 4, owner: "Rachel Kim", status: "Identified", due: "2026-07-20" },
  { id: "RSK-005", title: "Social Media Reputational Damage", category: "Reputational", likelihood: 3, impact: 3, owner: "Tom Patel", status: "Assessed", due: "2026-09-01" },
  { id: "RSK-006", title: "Payment Card Fraud (PCI-DSS Gap)", category: "Financial", likelihood: 4, impact: 4, owner: "Sarah Chen", status: "Assessed", due: "2026-06-25" },
  { id: "RSK-007", title: "Phishing Campaign Success", category: "Cyber", likelihood: 5, impact: 3, owner: "Mark Davies", status: "Mitigated", due: "2026-07-10" },
  { id: "RSK-008", title: "Regulatory Licence Withdrawal", category: "Compliance", likelihood: 1, impact: 5, owner: "James Wright", status: "Identified", due: "2026-10-01" },
  { id: "RSK-009", title: "Insider Threat – Data Exfiltration", category: "Cyber", likelihood: 2, impact: 5, owner: "Rachel Kim", status: "Assessed", due: "2026-07-15" },
  { id: "RSK-010", title: "Business Continuity Plan Failure", category: "Operational", likelihood: 2, impact: 4, owner: "Tom Patel", status: "Mitigated", due: "2026-08-01" },
  { id: "RSK-011", title: "Market Share Loss to Competitor", category: "Strategic", likelihood: 4, impact: 3, owner: "Sarah Chen", status: "Accepted", due: "2026-12-31" },
  { id: "RSK-012", title: "Cloud Provider Outage (AWS)", category: "Operational", likelihood: 2, impact: 3, owner: "Mark Davies", status: "Mitigated", due: "2026-07-30" },
  { id: "RSK-013", title: "Employee Data Privacy Violation", category: "Compliance", likelihood: 3, impact: 3, owner: "James Wright", status: "Identified", due: "2026-06-28" },
  { id: "RSK-014", title: "Financial Misstatement", category: "Financial", likelihood: 1, impact: 4, owner: "Rachel Kim", status: "Assessed", due: "2026-09-15" },
  { id: "RSK-015", title: "Software Supply Chain Attack", category: "Cyber", likelihood: 2, impact: 4, owner: "Sarah Chen", status: "Identified", due: "2026-07-05" },
  { id: "RSK-016", title: "Workplace Health & Safety Incident", category: "Operational", likelihood: 3, impact: 2, owner: "Tom Patel", status: "Mitigated", due: "2026-08-20" },
  { id: "RSK-017", title: "IP Theft by Former Employee", category: "Reputational", likelihood: 2, impact: 3, owner: "Mark Davies", status: "Accepted", due: "2026-11-01" },
  { id: "RSK-018", title: "Failure to Meet ESG Targets", category: "Strategic", likelihood: 3, impact: 2, owner: "James Wright", status: "Identified", due: "2026-09-30" },
  { id: "RSK-019", title: "DDoS Attack on Customer Portal", category: "Cyber", likelihood: 4, impact: 2, owner: "Rachel Kim", status: "Mitigated", due: "2026-07-25" },
  { id: "RSK-020", title: "Contract Non-renewal – Top Client", category: "Financial", likelihood: 2, impact: 3, owner: "Tom Patel", status: "Assessed", due: "2026-08-31" },
]

function scoreStyle(score: number) {
  if (score >= 16) return { background: "#fce7f3", color: "#e11d48" }
  if (score >= 10) return { background: "#fee2e2", color: "#dc2626" }
  if (score >= 5) return { background: "#fef9c3", color: "#d97706" }
  return { background: "#dcfce7", color: "#16a34a" }
}

function statusStyle(s: string) {
  switch (s) {
    case "Mitigated": return { background: "#dcfce7", color: "#16a34a" }
    case "Assessed": return { background: "#eff6ff", color: "#1a56db" }
    case "Accepted": return { background: "#fef9c3", color: "#d97706" }
    case "Closed": return { background: "#f3f4f6", color: "#6b7280" }
    default: return { background: "#fee2e2", color: "#dc2626" }
  }
}

const categories = ["All", "Operational", "Financial", "Cyber", "Compliance", "Reputational", "Strategic"]
const statuses = ["All", "Identified", "Assessed", "Mitigated", "Accepted", "Closed"]

export default function RisksPage() {
  const [catFilter, setCatFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = risks.filter(r =>
    (catFilter === "All" || r.category === catFilter) &&
    (statusFilter === "All" || r.status === statusFilter)
  )

  const stats = {
    total: risks.length,
    critical: risks.filter(r => r.likelihood * r.impact >= 16).length,
    high: risks.filter(r => { const s = r.likelihood * r.impact; return s >= 10 && s < 16 }).length,
    medium: risks.filter(r => { const s = r.likelihood * r.impact; return s >= 5 && s < 10 }).length,
    low: risks.filter(r => r.likelihood * r.impact < 5).length,
  }

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={24} style={{ color: "#f59e0b" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Risk Register</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Add Risk
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total", value: stats.total, style: { background: "#f8fafc", color: "#334155" } },
          { label: "Critical", value: stats.critical, style: { background: "#fce7f3", color: "#e11d48" } },
          { label: "High", value: stats.high, style: { background: "#fee2e2", color: "#dc2626" } },
          { label: "Medium", value: stats.medium, style: { background: "#fef9c3", color: "#d97706" } },
          { label: "Low", value: stats.low, style: { background: "#dcfce7", color: "#16a34a" } },
        ].map(s => (
          <div key={s.label} style={{ ...s.style, padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
            {s.value} {s.label}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
        <Filter size={16} style={{ color: "var(--muted-foreground)" }} />
        <div style={{ display: "flex", gap: 6 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: catFilter === c ? "var(--primary)" : "white", color: catFilter === c ? "white" : "var(--foreground)" }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: statusFilter === s ? "#475569" : "white", color: statusFilter === s ? "white" : "var(--foreground)" }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Risk ID", "Title", "Category", "Likelihood", "Impact", "Score", "Owner", "Status", "Due Date"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const score = r.likelihood * r.impact
              return (
                <tr key={r.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)", fontWeight: 500, maxWidth: 220 }}>{r.title}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.category}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "center" }}>{r.likelihood}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "center" }}>{r.impact}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ ...scoreStyle(score), padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{score}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{r.owner}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ ...statusStyle(r.status), padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{r.status}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.due}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
