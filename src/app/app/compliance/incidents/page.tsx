"use client"

import { AlertCircle, Plus } from "lucide-react"

const incidents = [
  { num: "INC-001", title: "Phishing email opened by staff member", type: "Cyber", severity: "High", reporter: "Sarah Chen", dateReported: "2026-06-08", status: "Under Investigation", rcaDue: "2026-06-22" },
  { num: "INC-002", title: "Unauthorised USB device detected on workstation", type: "Physical Security", severity: "Medium", reporter: "Mark Davies", dateReported: "2026-06-06", status: "Open", rcaDue: "2026-06-20" },
  { num: "INC-003", title: "24 failed login attempts on admin portal", type: "Cyber", severity: "Medium", reporter: "Auto-detected", dateReported: "2026-06-03", status: "Resolved", rcaDue: "2026-06-17" },
  { num: "INC-004", title: "Vendor DPA expired without renewal", type: "Non-compliance", severity: "Low", reporter: "James Wright", dateReported: "2026-05-30", status: "Resolved", rcaDue: "2026-06-13" },
  { num: "INC-005", title: "Production database backup failure (3 days)", type: "System Outage", severity: "Critical", reporter: "Rachel Kim", dateReported: "2026-05-25", status: "Closed", rcaDue: "2026-06-08" },
  { num: "INC-006", title: "Customer PII sent to incorrect email address", type: "Data Breach", severity: "High", reporter: "Tom Patel", dateReported: "2026-05-20", status: "Closed", rcaDue: "2026-06-03" },
  { num: "INC-007", title: "API key accidentally committed to public GitHub repo", type: "Data Breach", severity: "High", reporter: "Sarah Chen", dateReported: "2026-05-15", status: "Closed", rcaDue: "2026-05-29" },
  { num: "INC-008", title: "Office CCTV system offline for 6 hours", type: "Physical Security", severity: "Low", reporter: "Mark Davies", dateReported: "2026-05-10", status: "Closed", rcaDue: "2026-05-24" },
  { num: "INC-009", title: "Near miss: employee nearly clicked malicious link", type: "Near Miss", severity: "Low", reporter: "James Wright", dateReported: "2026-05-05", status: "Closed", rcaDue: "2026-05-19" },
  { num: "INC-010", title: "Payroll system unavailable for 4 hours", type: "System Outage", severity: "Medium", reporter: "Rachel Kim", dateReported: "2026-04-28", status: "Closed", rcaDue: "2026-05-12" },
]

function severityStyle(s: string) {
  switch (s) {
    case "Critical": return { background: "#fce7f3", color: "#e11d48" }
    case "High": return { background: "#fee2e2", color: "#dc2626" }
    case "Medium": return { background: "#fef9c3", color: "#d97706" }
    default: return { background: "#dcfce7", color: "#16a34a" }
  }
}

function statusStyle(s: string) {
  switch (s) {
    case "Under Investigation": return { background: "#fff7ed", color: "#ea580c" }
    case "Open": return { background: "#fee2e2", color: "#dc2626" }
    case "Resolved": return { background: "#eff6ff", color: "#1a56db" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

export default function IncidentsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertCircle size={24} style={{ color: "#dc2626" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Incident Log</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#dc2626", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Report Incident
        </button>
      </div>

      {/* Summary stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Open", count: incidents.filter(i => i.status === "Open" || i.status === "Under Investigation").length, style: { background: "#fee2e2", color: "#dc2626" } },
          { label: "Critical", count: incidents.filter(i => i.severity === "Critical").length, style: { background: "#fce7f3", color: "#e11d48" } },
          { label: "High", count: incidents.filter(i => i.severity === "High").length, style: { background: "#fee2e2", color: "#dc2626" } },
          { label: "Resolved", count: incidents.filter(i => i.status === "Resolved" || i.status === "Closed").length, style: { background: "#dcfce7", color: "#16a34a" } },
        ].map(s => (
          <div key={s.label} style={{ ...s.style, padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>{s.count} {s.label}</div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["#", "Title", "Type", "Severity", "Reporter", "Date Reported", "Status", "RCA Due"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc, i) => (
              <tr key={inc.num} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{inc.num}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "var(--foreground)", maxWidth: 260 }}>{inc.title}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{inc.type}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...severityStyle(inc.severity), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{inc.severity}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{inc.reporter}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{inc.dateReported}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(inc.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{inc.status}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{inc.rcaDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
