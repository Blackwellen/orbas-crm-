"use client"

import { useState } from "react"
import { GitBranch, Plus, Filter } from "lucide-react"

const workflows = [
  { name: "New Lead Welcome Email", trigger: "Record Created", actions: 3, lastRun: "10 Jun 14:32", runs30d: 412, successRate: 99.3, status: "Active" },
  { name: "Deal Won — Celebration & Onboard", trigger: "Record Updated", actions: 5, lastRun: "10 Jun 11:15", runs30d: 88, successRate: 100, status: "Active" },
  { name: "Invoice Overdue Reminder", trigger: "Scheduled", actions: 2, lastRun: "10 Jun 09:00", runs30d: 248, successRate: 94.8, status: "Active" },
  { name: "Ticket SLA Breach Alert", trigger: "Record Updated", actions: 4, lastRun: "10 Jun 13:54", runs30d: 156, successRate: 100, status: "Active" },
  { name: "Contact Birthday Email", trigger: "Scheduled", actions: 2, lastRun: "10 Jun 08:00", runs30d: 195, successRate: 100, status: "Active" },
  { name: "New Support Ticket → Slack Alert", trigger: "Record Created", actions: 2, lastRun: "10 Jun 14:01", runs30d: 634, successRate: 98.1, status: "Active" },
  { name: "Abandoned Quote Follow-up", trigger: "Scheduled", actions: 3, lastRun: "10 Jun 10:30", runs30d: 224, successRate: 100, status: "Active" },
  { name: "Staff Onboarding Checklist", trigger: "Record Created", actions: 8, lastRun: "09 Jun 09:00", runs30d: 28, successRate: 100, status: "Active" },
  { name: "Monthly Revenue Report Email", trigger: "Scheduled", actions: 2, lastRun: "01 Jun 07:00", runs30d: 1, successRate: 100, status: "Active" },
  { name: "Contact Inactivity Re-engagement", trigger: "Scheduled", actions: 3, lastRun: "10 Jun 06:00", runs30d: 88, successRate: 97.7, status: "Active" },
  { name: "Webhook: New Form Submission → CRM", trigger: "Webhook", actions: 4, lastRun: "10 Jun 14:25", runs30d: 382, successRate: 99.7, status: "Active" },
  { name: "Deal Stage Change Notification", trigger: "Record Updated", actions: 2, lastRun: "10 Jun 12:44", runs30d: 214, successRate: 100, status: "Active" },
  { name: "Lead Scoring Auto-update", trigger: "Record Updated", actions: 1, lastRun: "10 Jun 14:30", runs30d: 1842, successRate: 99.9, status: "Active" },
  { name: "GDPR Consent Expiry Warning", trigger: "Scheduled", actions: 3, lastRun: "10 Jun 08:00", runs30d: 45, successRate: 100, status: "Inactive" },
  { name: "Trial Expiry — Upgrade Prompt", trigger: "Scheduled", actions: 4, lastRun: "08 Jun 09:00", runs30d: 34, successRate: 100, status: "Error" },
  { name: "Contract Renewal Reminder", trigger: "Scheduled", actions: 3, lastRun: "10 Jun 08:00", runs30d: 18, successRate: 100, status: "Draft" },
  { name: "Negative Review Alert", trigger: "Webhook", actions: 3, lastRun: "07 Jun 15:20", runs30d: 12, successRate: 100, status: "Active" },
  { name: "Employee Anniversary Recognition", trigger: "Scheduled", actions: 2, lastRun: "05 Jun 08:00", runs30d: 8, successRate: 100, status: "Active" },
]

function statusStyle(s: string) {
  switch (s) {
    case "Active": return { background: "#dcfce7", color: "#16a34a" }
    case "Inactive": return { background: "#f3f4f6", color: "#6b7280" }
    case "Error": return { background: "#fee2e2", color: "#dc2626" }
    default: return { background: "#eff6ff", color: "#1a56db" }
  }
}

function triggerStyle(t: string) {
  switch (t) {
    case "Record Created": return { background: "#eff6ff", color: "#1a56db" }
    case "Record Updated": return { background: "#f0fdf4", color: "#16a34a" }
    case "Scheduled": return { background: "#fef9c3", color: "#d97706" }
    case "Webhook": return { background: "#f3e8ff", color: "#7c3aed" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

const triggerTypes = ["All", "Record Created", "Record Updated", "Scheduled", "Webhook", "Manual"]
const statuses = ["All", "Active", "Inactive", "Error", "Draft"]

export default function WorkflowsPage() {
  const [triggerFilter, setTriggerFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = workflows.filter(w =>
    (triggerFilter === "All" || w.trigger === triggerFilter) &&
    (statusFilter === "All" || w.status === statusFilter)
  )

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GitBranch size={24} style={{ color: "#f59e0b" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Workflows</h1>
          <span style={{ background: "#fef9c3", color: "#d97706", fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 10 }}>{workflows.length} total</span>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> New Workflow
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <Filter size={14} style={{ color: "var(--muted-foreground)" }} />
        <div style={{ display: "flex", gap: 4 }}>
          {triggerTypes.map(t => (
            <button key={t} onClick={() => setTriggerFilter(t)} style={{ padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, border: "1px solid var(--border)", cursor: "pointer", background: triggerFilter === t ? "#f59e0b" : "white", color: triggerFilter === t ? "white" : "var(--foreground)" }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, border: "1px solid var(--border)", cursor: "pointer", background: statusFilter === s ? "#475569" : "white", color: statusFilter === s ? "white" : "var(--foreground)" }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Name", "Trigger Type", "Actions", "Last Run", "Runs (30d)", "Success Rate", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((w, i) => (
              <tr key={w.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#f59e0b", cursor: "pointer" }}>{w.name}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...triggerStyle(w.trigger), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{w.trigger}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)", textAlign: "center" }}>{w.actions}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{w.lastRun}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{w.runs30d.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: w.successRate >= 99 ? "#16a34a" : w.successRate >= 95 ? "#d97706" : "#dc2626" }}>{w.successRate}%</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...statusStyle(w.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{w.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
