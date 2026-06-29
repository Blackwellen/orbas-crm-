"use client"

import { Zap, Plus, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const runData = [
  { day: "28 May", runs: 198 },
  { day: "29 May", runs: 215 },
  { day: "30 May", runs: 187 },
  { day: "31 May", runs: 234 },
  { day: "1 Jun", runs: 221 },
  { day: "2 Jun", runs: 189 },
  { day: "3 Jun", runs: 242 },
  { day: "4 Jun", runs: 228 },
  { day: "5 Jun", runs: 256 },
  { day: "6 Jun", runs: 201 },
  { day: "7 Jun", runs: 238 },
  { day: "8 Jun", runs: 219 },
  { day: "9 Jun", runs: 247 },
  { day: "10 Jun", runs: 247 },
]

const activeWorkflows = [
  { name: "New Lead Welcome Email", trigger: "Record Created", lastRun: "10 Jun 2026, 14:32", runsToday: 18, successRate: 100 },
  { name: "Deal Won — Celebration & Onboard", trigger: "Record Updated", lastRun: "10 Jun 2026, 11:15", runsToday: 3, successRate: 100 },
  { name: "Invoice Overdue Reminder", trigger: "Scheduled", lastRun: "10 Jun 2026, 09:00", runsToday: 12, successRate: 91.7 },
  { name: "Ticket SLA Breach Alert", trigger: "Record Updated", lastRun: "10 Jun 2026, 13:54", runsToday: 5, successRate: 100 },
  { name: "Contact Birthday Email", trigger: "Scheduled", lastRun: "10 Jun 2026, 08:00", runsToday: 7, successRate: 100 },
  { name: "New Support Ticket → Slack Alert", trigger: "Record Created", lastRun: "10 Jun 2026, 14:01", runsToday: 22, successRate: 95.5 },
  { name: "Abandoned Quote Follow-up", trigger: "Scheduled", lastRun: "10 Jun 2026, 10:30", runsToday: 8, successRate: 100 },
  { name: "Staff Onboarding Checklist", trigger: "Record Created", lastRun: "09 Jun 2026, 09:00", runsToday: 1, successRate: 100 },
]

const errors = [
  { workflow: "Invoice Overdue Reminder", error: "SMTP connection timeout — retry 3/3 failed", time: "10 Jun 14:12" },
  { workflow: "New Support Ticket → Slack Alert", error: "Slack webhook rate limit exceeded", time: "10 Jun 13:22" },
  { workflow: "Invoice Overdue Reminder", error: "Template variable {{client_name}} resolved to null", time: "10 Jun 11:05" },
  { workflow: "New Lead Welcome Email", error: "Invalid email address: no-reply@@invalid.com", time: "09 Jun 16:48" },
]

export default function AutomationsOverviewPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={28} style={{ color: "#f59e0b" }} />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Automations Overview</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> New Workflow
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active Workflows", value: "18", color: "#f59e0b" },
          { label: "Runs Today", value: "247", color: "#1a56db" },
          { label: "Success Rate", value: "98.2%", color: "#16a34a" },
          { label: "Errors Today", value: "4", color: "#dc2626" },
        ].map(k => (
          <div key={k.label} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
            <p style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500, margin: 0 }}>{k.label}</p>
            <p style={{ fontSize: 30, fontWeight: 700, color: k.color, margin: "4px 0 0" }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white", marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Automation Runs — Last 14 Days</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={runData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="runs" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Active Workflows */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Active Workflows</h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Name", "Trigger", "Last Run", "Today", "Success"].map(h => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeWorkflows.map((w, i) => (
                <tr key={w.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#f59e0b", cursor: "pointer" }}>{w.name}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ background: "#fef9c3", color: "#d97706", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{w.trigger}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 11, color: "var(--muted-foreground)" }}>{w.lastRun}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{w.runsToday}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: w.successRate >= 98 ? "#16a34a" : "#d97706" }}>{w.successRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Error Log */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
            <AlertCircle size={14} style={{ color: "#dc2626" }} />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Recent Errors</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {errors.map((e, i) => (
              <div key={i} style={{ padding: "14px 20px", borderBottom: i < errors.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}>{e.workflow}</span>
                  <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{e.time}</span>
                </div>
                <p style={{ fontSize: 11, color: "#dc2626", margin: 0, lineHeight: 1.4 }}>{e.error}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
