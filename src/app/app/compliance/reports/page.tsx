"use client"

import { BarChart2, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"

const frameworkScores = [
  { framework: "GDPR", score: 92 },
  { framework: "ISO 27001", score: 78 },
  { framework: "SOC2", score: 65 },
  { framework: "PCI-DSS", score: 55 },
  { framework: "Cyber Essentials", score: 84 },
]

const riskTrend = [
  { month: "Jan", critical: 3, high: 8, medium: 12 },
  { month: "Feb", critical: 2, high: 7, medium: 11 },
  { month: "Mar", critical: 3, high: 6, medium: 10 },
  { month: "Apr", critical: 2, high: 7, medium: 9 },
  { month: "May", critical: 2, high: 5, medium: 9 },
  { month: "Jun", critical: 2, high: 5, medium: 8 },
]

const reports = [
  { title: "Q2 2026 Compliance Report", date: "01 Jul 2026", type: "Quarterly", size: "2.4 MB" },
  { title: "Q1 2026 Compliance Report", date: "01 Apr 2026", type: "Quarterly", size: "2.1 MB" },
  { title: "Annual Risk Assessment 2025", date: "01 Jan 2026", type: "Annual", size: "5.8 MB" },
  { title: "ISO 27001 Gap Analysis Report", date: "15 Mar 2026", type: "Assessment", size: "3.2 MB" },
  { title: "GDPR Audit Report 2025", date: "10 Nov 2025", type: "Audit", size: "1.8 MB" },
]

export default function ComplianceReportsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BarChart2 size={24} style={{ color: "#16a34a" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Compliance Reports</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Download size={16} /> Generate Report
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Framework Scores Bar Chart */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Compliance by Framework</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={frameworkScores} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="framework" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(v: any) => [`${v}%`, "Score"]} />
              <Bar dataKey="score" fill="#16a34a" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Trend */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Risk Trend (6 months)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="critical" fill="#e11d48" name="Critical" stackId="a" />
              <Bar dataKey="high" fill="#dc2626" name="High" stackId="a" />
              <Bar dataKey="medium" fill="#f59e0b" name="Medium" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Library */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Report Library</h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Report Title", "Type", "Date", "Size", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={r.title} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{r.title}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: "#eff6ff", color: "#1a56db", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{r.type}</span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.date}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.size}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "white", fontSize: 12, cursor: "pointer", color: "var(--foreground)" }}>
                    <Download size={12} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

