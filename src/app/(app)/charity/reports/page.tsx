"use client"

import { BarChart2, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

const incomeBySource = [
  { source: "Individual Donations", amount: 187320 },
  { source: "Corporate Donations", amount: 82600 },
  { source: "Grants", amount: 120000 },
  { source: "Trusts & Foundations", amount: 97400 },
]

const PIE_COLORS = ["#e11d48", "#1a56db", "#f59e0b", "#16a34a"]

const monthlyGiving = [
  { month: "Jul", amount: 32400 },
  { month: "Aug", amount: 28900 },
  { month: "Sep", amount: 41200 },
  { month: "Oct", amount: 38700 },
  { month: "Nov", amount: 55300 },
  { month: "Dec", amount: 72100 },
  { month: "Jan", amount: 29800 },
  { month: "Feb", amount: 34200 },
  { month: "Mar", amount: 45600 },
  { month: "Apr", amount: 38900 },
  { month: "May", amount: 41700 },
  { month: "Jun", amount: 28820 },
]

export default function CharityReportsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BarChart2 size={24} style={{ color: "#e11d48" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Fundraising Reports</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* KPI Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Raised YTD", value: "Â£487,320", color: "#e11d48" },
          { label: "vs. Last Year", value: "+18.4%", color: "#16a34a" },
          { label: "Average Gift", value: "Â£65", color: "#1a56db" },
          { label: "Gift Aid Claimed", value: "Â£135,630", color: "#7c3aed" },
        ].map(k => (
          <div key={k.label} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 18, background: "white" }}>
            <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{k.label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: k.color, margin: "4px 0 0" }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Monthly giving bar chart */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Monthly Giving</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyGiving}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`Â£${v.toLocaleString()}`, "Raised"]} />
              <Bar dataKey="amount" fill="#e11d48" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income by source pie */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Income by Source</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={incomeBySource} dataKey="amount" nameKey="source" cx="50%" cy="50%" outerRadius={80}>
                {incomeBySource.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
              <Tooltip formatter={(v: any) => [`Â£${v.toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

