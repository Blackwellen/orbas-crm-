"use client"

import { CheckSquare, Plus } from "lucide-react"

const controls = [
  { id: "CTR-001", title: "Multi-Factor Authentication (MFA)", type: "Preventive", frequency: "Continuous", owner: "Sarah Chen", lastTested: "2026-05-15", status: "Effective", risks: 4 },
  { id: "CTR-002", title: "Annual Security Awareness Training", type: "Preventive", frequency: "Annual", owner: "Mark Davies", lastTested: "2026-03-01", status: "Effective", risks: 5 },
  { id: "CTR-003", title: "Vulnerability Scanning", type: "Detective", frequency: "Weekly", owner: "Rachel Kim", lastTested: "2026-06-07", status: "Effective", risks: 3 },
  { id: "CTR-004", title: "Endpoint Detection & Response (EDR)", type: "Detective", frequency: "Continuous", owner: "Sarah Chen", lastTested: "2026-05-01", status: "Effective", risks: 2 },
  { id: "CTR-005", title: "Penetration Testing", type: "Detective", frequency: "Annual", owner: "Tom Patel", lastTested: "2026-01-20", status: "Effective", risks: 6 },
  { id: "CTR-006", title: "Access Review & Recertification", type: "Detective", frequency: "Quarterly", owner: "James Wright", lastTested: "2026-04-10", status: "Partially Effective", risks: 4 },
  { id: "CTR-007", title: "Data Loss Prevention (DLP)", type: "Preventive", frequency: "Continuous", owner: "Sarah Chen", lastTested: "2026-05-20", status: "Effective", risks: 3 },
  { id: "CTR-008", title: "Incident Response Plan", type: "Corrective", frequency: "Annual (test)", owner: "Mark Davies", lastTested: "2026-02-15", status: "Effective", risks: 5 },
  { id: "CTR-009", title: "Business Continuity Plan", type: "Corrective", frequency: "Annual (test)", owner: "Rachel Kim", lastTested: "2026-02-20", status: "Partially Effective", risks: 4 },
  { id: "CTR-010", title: "Firewall Rules Review", type: "Preventive", frequency: "Monthly", owner: "Tom Patel", lastTested: "2026-06-01", status: "Effective", risks: 2 },
  { id: "CTR-011", title: "GDPR Data Subject Request Process", type: "Compensating", frequency: "As needed", owner: "James Wright", lastTested: "2026-04-05", status: "Effective", risks: 2 },
  { id: "CTR-012", title: "Daily Encrypted Backups", type: "Corrective", frequency: "Daily", owner: "Sarah Chen", lastTested: "2026-04-15", status: "Effective", risks: 3 },
  { id: "CTR-013", title: "Supplier Security Assessment", type: "Preventive", frequency: "Annual", owner: "Mark Davies", lastTested: "2026-03-10", status: "Ineffective", risks: 2 },
  { id: "CTR-014", title: "Change Management Process", type: "Preventive", frequency: "Continuous", owner: "Rachel Kim", lastTested: "2026-05-25", status: "Effective", risks: 3 },
  { id: "CTR-015", title: "Physical Access Controls (CCTV/Badges)", type: "Preventive", frequency: "Continuous", owner: "Tom Patel", lastTested: "2026-04-30", status: "Effective", risks: 2 },
  { id: "CTR-016", title: "Security Patching Process", type: "Preventive", frequency: "Monthly", owner: "James Wright", lastTested: "2026-06-05", status: "Partially Effective", risks: 4 },
  { id: "CTR-017", title: "Encryption at Rest & Transit", type: "Preventive", frequency: "Continuous", owner: "Sarah Chen", lastTested: "2026-05-10", status: "Effective", risks: 3 },
  { id: "CTR-018", title: "Fraud Detection Monitoring", type: "Detective", frequency: "Continuous", owner: "Mark Davies", lastTested: "2026-05-18", status: "Not Tested", risks: 1 },
]

function statusStyle(s: string) {
  switch (s) {
    case "Effective": return { background: "#dcfce7", color: "#16a34a" }
    case "Partially Effective": return { background: "#fef9c3", color: "#d97706" }
    case "Ineffective": return { background: "#fee2e2", color: "#dc2626" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

function typeBadge(t: string) {
  switch (t) {
    case "Preventive": return { background: "#eff6ff", color: "#1a56db" }
    case "Detective": return { background: "#f3e8ff", color: "#7c3aed" }
    case "Corrective": return { background: "#fff7ed", color: "#ea580c" }
    default: return { background: "#f0fdf4", color: "#16a34a" }
  }
}

export default function ControlsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CheckSquare size={24} style={{ color: "#16a34a" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Controls Library</h1>
          <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 10 }}>{controls.length} controls</span>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Add Control
        </button>
      </div>

      {/* Summary stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Effective", count: controls.filter(c => c.status === "Effective").length, style: { background: "#dcfce7", color: "#16a34a" } },
          { label: "Partial", count: controls.filter(c => c.status === "Partially Effective").length, style: { background: "#fef9c3", color: "#d97706" } },
          { label: "Ineffective", count: controls.filter(c => c.status === "Ineffective").length, style: { background: "#fee2e2", color: "#dc2626" } },
          { label: "Not Tested", count: controls.filter(c => c.status === "Not Tested").length, style: { background: "#f3f4f6", color: "#6b7280" } },
        ].map(s => (
          <div key={s.label} style={{ ...s.style, padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
            {s.count} {s.label}
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Control ID", "Title", "Type", "Frequency", "Owner", "Last Tested", "Status", "Linked Risks"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {controls.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{c.id}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{c.title}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...typeBadge(c.type), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{c.type}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.frequency}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{c.owner}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.lastTested}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(c.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{c.status}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)", textAlign: "center" }}>{c.risks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
