"use client"

import { FileText, Plus } from "lucide-react"

const policies = [
  { name: "Information Security Policy", category: "IT Security", version: "3.2", owner: "Sarah Chen", lastReviewed: "2026-03-01", nextReview: "2027-03-01", status: "Active", ackPct: 94 },
  { name: "Acceptable Use Policy", category: "IT Security", version: "2.1", owner: "Mark Davies", lastReviewed: "2026-01-15", nextReview: "2027-01-15", status: "Active", ackPct: 88 },
  { name: "Data Protection & Privacy Policy", category: "Data Protection", version: "4.0", owner: "James Wright", lastReviewed: "2026-04-10", nextReview: "2027-04-10", status: "Active", ackPct: 97 },
  { name: "Remote Working Policy", category: "HR", version: "1.3", owner: "Rachel Kim", lastReviewed: "2026-02-20", nextReview: "2027-02-20", status: "Active", ackPct: 91 },
  { name: "Password & Access Management Policy", category: "IT Security", version: "2.4", owner: "Sarah Chen", lastReviewed: "2025-12-01", nextReview: "2026-12-01", status: "Under Review", ackPct: 82 },
  { name: "Code of Conduct", category: "Code of Conduct", version: "5.0", owner: "Tom Patel", lastReviewed: "2026-01-10", nextReview: "2027-01-10", status: "Active", ackPct: 100 },
  { name: "Anti-Bribery & Corruption Policy", category: "Financial", version: "2.0", owner: "James Wright", lastReviewed: "2026-03-15", nextReview: "2027-03-15", status: "Active", ackPct: 96 },
  { name: "Health & Safety Policy", category: "H&S", version: "3.1", owner: "Rachel Kim", lastReviewed: "2026-04-01", nextReview: "2027-04-01", status: "Active", ackPct: 99 },
  { name: "Incident Response Policy", category: "IT Security", version: "1.8", owner: "Sarah Chen", lastReviewed: "2025-11-20", nextReview: "2026-11-20", status: "Active", ackPct: 78 },
  { name: "Supplier & Vendor Management Policy", category: "IT Security", version: "1.2", owner: "Mark Davies", lastReviewed: "2025-10-15", nextReview: "2026-10-15", status: "Under Review", ackPct: 65 },
  { name: "Business Continuity Policy", category: "IT Security", version: "2.3", owner: "Tom Patel", lastReviewed: "2026-02-01", nextReview: "2027-02-01", status: "Active", ackPct: 87 },
  { name: "Whistleblowing Policy", category: "HR", version: "1.5", owner: "James Wright", lastReviewed: "2026-01-25", nextReview: "2027-01-25", status: "Active", ackPct: 92 },
  { name: "Social Media Policy", category: "HR", version: "2.0", owner: "Rachel Kim", lastReviewed: "2025-09-10", nextReview: "2026-09-10", status: "Draft", ackPct: 0 },
  { name: "Expense & Reimbursement Policy", category: "Financial", version: "3.0", owner: "Tom Patel", lastReviewed: "2026-03-20", nextReview: "2027-03-20", status: "Active", ackPct: 85 },
  { name: "Equality & Diversity Policy", category: "HR", version: "2.2", owner: "Mark Davies", lastReviewed: "2025-08-01", nextReview: "2026-08-01", status: "Archived", ackPct: 73 },
]

function statusStyle(s: string) {
  switch (s) {
    case "Active": return { background: "#dcfce7", color: "#16a34a" }
    case "Under Review": return { background: "#fef9c3", color: "#d97706" }
    case "Draft": return { background: "#eff6ff", color: "#1a56db" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

export default function PoliciesPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText size={24} style={{ color: "#1a56db" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Policy Management</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> New Policy
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Active", count: policies.filter(p => p.status === "Active").length, style: { background: "#dcfce7", color: "#16a34a" } },
          { label: "Under Review", count: policies.filter(p => p.status === "Under Review").length, style: { background: "#fef9c3", color: "#d97706" } },
          { label: "Draft", count: policies.filter(p => p.status === "Draft").length, style: { background: "#eff6ff", color: "#1a56db" } },
          { label: "Archived", count: policies.filter(p => p.status === "Archived").length, style: { background: "#f3f4f6", color: "#6b7280" } },
        ].map(s => (
          <div key={s.label} style={{ ...s.style, padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>{s.count} {s.label}</div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Policy Name", "Category", "Ver.", "Owner", "Last Reviewed", "Next Review", "Status", "Acknowledgement"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {policies.map((p, i) => (
              <tr key={p.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--primary)", cursor: "pointer" }}>{p.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{p.category}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--foreground)", fontFamily: "monospace" }}>v{p.version}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{p.owner}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{p.lastReviewed}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{p.nextReview}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(p.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{p.status}</span>
                </td>
                <td style={{ padding: "10px 14px", minWidth: 160 }}>
                  {p.ackPct > 0 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--muted)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${p.ackPct}%`, height: "100%", background: p.ackPct >= 90 ? "#16a34a" : p.ackPct >= 70 ? "#f59e0b" : "#dc2626", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", minWidth: 32 }}>{p.ackPct}%</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
