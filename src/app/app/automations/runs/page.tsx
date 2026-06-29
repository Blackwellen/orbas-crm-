"use client"

import { useState } from "react"
import { Clock, ChevronDown, ChevronRight } from "lucide-react"

const runs = [
  { workflow: "Lead Scoring Auto-update", triggeredAt: "10 Jun 2026 14:35:02", status: "Success", duration: "0.3s", records: 5, error: null },
  { workflow: "New Lead Welcome Email", triggeredAt: "10 Jun 2026 14:32:05", status: "Success", duration: "1.2s", records: 1, error: null },
  { workflow: "New Support Ticket → Slack Alert", triggeredAt: "10 Jun 2026 14:28:41", status: "Success", duration: "0.5s", records: 1, error: null },
  { workflow: "Lead Scoring Auto-update", triggeredAt: "10 Jun 2026 14:25:18", status: "Success", duration: "0.3s", records: 3, error: null },
  { workflow: "Webhook: New Form Submission → CRM", triggeredAt: "10 Jun 2026 14:22:07", status: "Success", duration: "1.8s", records: 1, error: null },
  { workflow: "Ticket SLA Breach Alert", triggeredAt: "10 Jun 2026 14:20:54", status: "Success", duration: "0.7s", records: 1, error: null },
  { workflow: "Invoice Overdue Reminder", triggeredAt: "10 Jun 2026 14:12:33", status: "Failed", duration: "2.1s", records: 0, error: "SMTP connection timeout — retry 3/3 failed" },
  { workflow: "New Support Ticket → Slack Alert", triggeredAt: "10 Jun 2026 13:22:10", status: "Partial", duration: "1.4s", records: 1, error: "Slack webhook rate limit exceeded (1 of 2 actions failed)" },
  { workflow: "Deal Stage Change Notification", triggeredAt: "10 Jun 2026 12:44:38", status: "Success", duration: "0.6s", records: 1, error: null },
  { workflow: "New Lead Welcome Email", triggeredAt: "10 Jun 2026 11:15:42", status: "Success", duration: "0.8s", records: 1, error: null },
  { workflow: "Invoice Overdue Reminder", triggeredAt: "10 Jun 2026 11:05:21", status: "Failed", duration: "1.8s", records: 0, error: "Template variable {{client_name}} resolved to null" },
  { workflow: "Abandoned Quote Follow-up", triggeredAt: "10 Jun 2026 10:30:00", status: "Success", duration: "1.1s", records: 4, error: null },
  { workflow: "Contact Birthday Email", triggeredAt: "10 Jun 2026 08:00:05", status: "Success", duration: "2.3s", records: 3, error: null },
  { workflow: "Invoice Overdue Reminder", triggeredAt: "10 Jun 2026 09:00:00", status: "Success", duration: "1.5s", records: 8, error: null },
  { workflow: "Monthly Revenue Report Email", triggeredAt: "01 Jun 2026 07:00:02", status: "Success", duration: "4.2s", records: 5, error: null },
  { workflow: "New Lead Welcome Email", triggeredAt: "09 Jun 2026 16:48:30", status: "Failed", duration: "0.9s", records: 0, error: "Invalid email address: no-reply@@invalid.com" },
  { workflow: "Lead Scoring Auto-update", triggeredAt: "09 Jun 2026 16:45:11", status: "Success", duration: "0.4s", records: 2, error: null },
  { workflow: "Staff Onboarding Checklist", triggeredAt: "09 Jun 2026 09:00:00", status: "Success", duration: "3.8s", records: 1, error: null },
  { workflow: "Contact Inactivity Re-engagement", triggeredAt: "10 Jun 2026 06:00:01", status: "Success", duration: "5.2s", records: 12, error: null },
  { workflow: "Negative Review Alert", triggeredAt: "07 Jun 2026 15:20:44", status: "Success", duration: "0.4s", records: 1, error: null },
  { workflow: "Webhook: New Form Submission → CRM", triggeredAt: "10 Jun 2026 13:54:02", status: "Success", duration: "1.9s", records: 1, error: null },
  { workflow: "Deal Stage Change Notification", triggeredAt: "10 Jun 2026 13:02:18", status: "Success", duration: "0.6s", records: 1, error: null },
  { workflow: "New Support Ticket → Slack Alert", triggeredAt: "10 Jun 2026 13:01:35", status: "Success", duration: "0.5s", records: 1, error: null },
  { workflow: "Trial Expiry — Upgrade Prompt", triggeredAt: "08 Jun 2026 09:00:00", status: "Failed", duration: "1.2s", records: 0, error: "SendGrid API key invalid or revoked" },
  { workflow: "Lead Scoring Auto-update", triggeredAt: "10 Jun 2026 14:10:05", status: "Success", duration: "0.3s", records: 7, error: null },
  { workflow: "New Lead Welcome Email", triggeredAt: "09 Jun 2026 15:08:55", status: "Success", duration: "1.0s", records: 1, error: null },
  { workflow: "Abandoned Quote Follow-up", triggeredAt: "09 Jun 2026 10:30:00", status: "Success", duration: "1.1s", records: 3, error: null },
  { workflow: "Contact Birthday Email", triggeredAt: "09 Jun 2026 08:00:05", status: "Success", duration: "2.1s", records: 2, error: null },
  { workflow: "Webhook: New Form Submission → CRM", triggeredAt: "09 Jun 2026 11:22:40", status: "Success", duration: "1.7s", records: 1, error: null },
  { workflow: "Deal Won — Celebration & Onboard", triggeredAt: "08 Jun 2026 14:55:12", status: "Success", duration: "2.8s", records: 1, error: null },
]

function statusStyle(s: string) {
  switch (s) {
    case "Success": return { background: "#dcfce7", color: "#16a34a" }
    case "Failed": return { background: "#fee2e2", color: "#dc2626" }
    case "Partial": return { background: "#fef9c3", color: "#d97706" }
    default: return { background: "#eff6ff", color: "#1a56db" }
  }
}

export default function RunHistoryPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = runs.filter(r => statusFilter === "All" || r.status === statusFilter)

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <Clock size={24} style={{ color: "#f59e0b" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Run History</h1>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["All", "Success", "Failed", "Partial", "Running"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: "1px solid var(--border)", cursor: "pointer", background: statusFilter === s ? "var(--primary)" : "white", color: statusFilter === s ? "white" : "var(--foreground)" }}>{s}</button>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["", "Workflow", "Triggered At", "Status", "Duration", "Records", "Error"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <>
                <tr key={i} onClick={() => setExpandedRow(expandedRow === i ? null : i)} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa", cursor: "pointer" }}>
                  <td style={{ padding: "10px 10px" }}>
                    {expandedRow === i ? <ChevronDown size={14} style={{ color: "var(--muted-foreground)" }} /> : <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />}
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{r.workflow}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.triggeredAt}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ ...statusStyle(r.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{r.status}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.duration}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{r.records}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#dc2626", maxWidth: 240 }}>{r.error ? r.error.substring(0, 40) + "..." : "—"}</td>
                </tr>
                {expandedRow === i && r.error && (
                  <tr key={`${i}-exp`} style={{ background: "#fff5f5" }}>
                    <td colSpan={7} style={{ padding: "12px 40px" }}>
                      <p style={{ fontSize: 12, color: "#dc2626", margin: 0, fontWeight: 600 }}>Error Details:</p>
                      <p style={{ fontSize: 13, color: "#dc2626", margin: "4px 0 0", fontFamily: "monospace" }}>{r.error}</p>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
