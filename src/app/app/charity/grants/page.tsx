"use client"

import { Award, Plus } from "lucide-react"

const grants = [
  { name: "Arts Council England – Project Grant", funder: "Arts Council England", amount: 45000, start: "2026-04-01", end: "2027-03-31", status: "In Progress", lead: "Rachel Kim", reportingDue: "2026-10-01" },
  { name: "National Lottery Community Fund", funder: "NLCF", amount: 75000, start: "2025-10-01", end: "2027-09-30", status: "In Progress", lead: "James Wright", reportingDue: "2026-09-30" },
  { name: "Big Society Capital – Capacity Building", funder: "Big Society Capital", amount: 20000, start: "2026-01-01", end: "2026-12-31", status: "In Progress", lead: "Sarah Chen", reportingDue: "2026-12-15" },
  { name: "Henry Smith Charity", funder: "Henry Smith Charity", amount: 30000, start: "2025-04-01", end: "2026-03-31", status: "Complete", lead: "Mark Davies", reportingDue: "2026-04-30" },
  { name: "Joseph Rowntree Foundation", funder: "JRF", amount: 15000, start: "2024-07-01", end: "2025-06-30", status: "Complete", lead: "Rachel Kim", reportingDue: "2025-07-31" },
  { name: "Esmée Fairbairn Foundation", funder: "EFF", amount: 50000, start: "2026-06-01", end: "2029-05-31", status: "Awarded", lead: "James Wright", reportingDue: "2026-12-01" },
  { name: "Tudor Trust Emergency Relief", funder: "Tudor Trust", amount: 10000, start: "2026-03-15", end: "2026-06-30", status: "Complete", lead: "Sarah Chen", reportingDue: "2026-07-15" },
  { name: "Lloyds Bank Foundation", funder: "Lloyds Bank Foundation", amount: 25000, start: "2025-10-01", end: "2026-09-30", status: "In Progress", lead: "Tom Patel", reportingDue: "2026-10-31" },
  { name: "Comic Relief – Community Grants", funder: "Comic Relief", amount: 8000, start: "2026-02-01", end: "2026-07-31", status: "In Progress", lead: "Mark Davies", reportingDue: "2026-08-15" },
  { name: "DCMS Strategic Investment", funder: "DCMS", amount: 85000, start: "2026-07-01", end: "2027-06-30", status: "Prospect", lead: "Rachel Kim", reportingDue: "—" },
  { name: "Garfield Weston Foundation", funder: "Garfield Weston", amount: 20000, start: "2025-01-01", end: "2025-12-31", status: "Rejected", lead: "James Wright", reportingDue: "—" },
  { name: "Wellcome Trust – Health Innovation", funder: "Wellcome Trust", amount: 60000, start: "2026-09-01", end: "2028-08-31", status: "Applied", lead: "Sarah Chen", reportingDue: "—" },
]

function statusStyle(s: string) {
  switch (s) {
    case "Awarded": return { background: "#dcfce7", color: "#16a34a" }
    case "In Progress": return { background: "#eff6ff", color: "#1a56db" }
    case "Complete": return { background: "#f3f4f6", color: "#6b7280" }
    case "Applied": return { background: "#fef9c3", color: "#d97706" }
    case "Prospect": return { background: "#f3e8ff", color: "#7c3aed" }
    case "Rejected": return { background: "#fee2e2", color: "#dc2626" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

const totalAwarded = grants.filter(g => ["Awarded", "In Progress", "Complete"].includes(g.status)).reduce((a, g) => a + g.amount, 0)
const pipeline = grants.filter(g => ["Prospect", "Applied"].includes(g.status)).reduce((a, g) => a + g.amount, 0)
const successful = grants.filter(g => ["Awarded", "In Progress", "Complete"].includes(g.status)).length
const total = grants.filter(g => g.status !== "Prospect").length
const successRate = Math.round((successful / total) * 100)
const reportsDue = grants.filter(g => g.reportingDue !== "—" && g.status === "In Progress").length

export default function GrantsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Award size={24} style={{ color: "#f59e0b" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Grant Management</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Log Grant
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Awarded", value: `£${totalAwarded.toLocaleString()}`, color: "#16a34a" },
          { label: "Pipeline Value", value: `£${pipeline.toLocaleString()}`, color: "#7c3aed" },
          { label: "Success Rate", value: `${successRate}%`, color: "#1a56db" },
          { label: "Reports Due", value: String(reportsDue), color: "#d97706" },
        ].map(k => (
          <div key={k.label} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
            <p style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500, margin: 0 }}>{k.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: k.color, margin: "4px 0 0" }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Grant Name", "Funder", "Amount", "Start", "End", "Status", "Lead", "Reporting Due"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grants.map((g, i) => (
              <tr key={g.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#f59e0b", cursor: "pointer" }}>{g.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{g.funder}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{"£"}{g.amount.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{g.start}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{g.end}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(g.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{g.status}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{g.lead}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: g.reportingDue !== "—" ? "#dc2626" : "var(--muted-foreground)", fontWeight: g.reportingDue !== "—" ? 600 : 400 }}>{g.reportingDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
