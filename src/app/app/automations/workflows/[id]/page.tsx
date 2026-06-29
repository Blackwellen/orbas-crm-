"use client"

import { useState } from "react"
import { ArrowLeft, Zap, GitBranch, Mail, Clock, Play, CheckCircle, XCircle, ToggleLeft } from "lucide-react"
import Link from "next/link"

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [tab, setTab] = useState("builder")
  const [enabled, setEnabled] = useState(true)

  const runHistory = [
    { id: "RUN-9241", at: "10 Jun 2026 14:32:05", duration: "1.2s", status: "Success", records: 1 },
    { id: "RUN-9198", at: "10 Jun 2026 11:15:42", duration: "0.8s", status: "Success", records: 1 },
    { id: "RUN-9154", at: "10 Jun 2026 09:44:18", duration: "3.4s", status: "Failed", records: 0 },
    { id: "RUN-9112", at: "09 Jun 2026 17:22:01", duration: "1.0s", status: "Success", records: 1 },
    { id: "RUN-9089", at: "09 Jun 2026 15:08:55", duration: "1.1s", status: "Success", records: 1 },
    { id: "RUN-9054", at: "09 Jun 2026 12:30:22", duration: "0.9s", status: "Success", records: 1 },
    { id: "RUN-9020", at: "09 Jun 2026 10:14:07", duration: "1.3s", status: "Success", records: 1 },
    { id: "RUN-8988", at: "08 Jun 2026 16:55:40", duration: "2.2s", status: "Partial", records: 1 },
    { id: "RUN-8954", at: "08 Jun 2026 14:20:11", duration: "0.9s", status: "Success", records: 1 },
    { id: "RUN-8920", at: "08 Jun 2026 11:04:36", duration: "1.0s", status: "Success", records: 1 },
    { id: "RUN-8899", at: "07 Jun 2026 17:40:52", duration: "1.1s", status: "Success", records: 1 },
    { id: "RUN-8865", at: "07 Jun 2026 15:22:28", duration: "0.8s", status: "Success", records: 1 },
    { id: "RUN-8831", at: "07 Jun 2026 13:10:04", duration: "1.4s", status: "Success", records: 1 },
    { id: "RUN-8800", at: "06 Jun 2026 16:05:17", duration: "1.0s", status: "Success", records: 1 },
    { id: "RUN-8769", at: "06 Jun 2026 11:44:33", duration: "0.9s", status: "Success", records: 1 },
    { id: "RUN-8740", at: "05 Jun 2026 17:28:12", duration: "1.2s", status: "Success", records: 1 },
    { id: "RUN-8710", at: "05 Jun 2026 14:15:08", duration: "1.1s", status: "Success", records: 1 },
    { id: "RUN-8681", at: "05 Jun 2026 10:52:44", duration: "0.8s", status: "Failed", records: 0 },
    { id: "RUN-8650", at: "04 Jun 2026 17:33:20", duration: "1.3s", status: "Success", records: 1 },
    { id: "RUN-8622", at: "04 Jun 2026 13:07:55", duration: "1.0s", status: "Success", records: 1 },
  ]

  function runStatusStyle(s: string) {
    switch (s) {
      case "Success": return { background: "#dcfce7", color: "#16a34a" }
      case "Failed": return { background: "#fee2e2", color: "#dc2626" }
      case "Partial": return { background: "#fef9c3", color: "#d97706" }
      default: return { background: "#eff6ff", color: "#1a56db" }
    }
  }

  const steps = [
    { type: "TRIGGER", icon: Zap, label: "Record Created", config: "When a new Lead is created in CRM", color: "#f59e0b", bg: "#fffbeb" },
    { type: "CONDITION", icon: GitBranch, label: "If / Else", config: "If Lead source = 'Website Form'", color: "#7c3aed", bg: "#f5f3ff" },
    { type: "ACTION", icon: Mail, label: "Send Email", config: "Template: 'New Lead Welcome' — to Lead email", color: "#1a56db", bg: "#eff6ff" },
    { type: "ACTION", icon: Clock, label: "Wait 30 minutes", config: "Delay before next action", color: "#6b7280", bg: "#f9fafb" },
    { type: "ACTION", icon: Play, label: "Create Task", config: "Assign follow-up call to Lead owner within 1 hour", color: "#16a34a", bg: "#f0fdf4" },
  ]

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <Link href="/app/automations/workflows" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", fontSize: 13, textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Workflows
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Zap size={22} style={{ color: "#f59e0b" }} />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>New Lead Welcome Email</h1>
            <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>Active</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>Trigger: Record Created · Last run: 10 Jun 14:32 · 412 runs in 30 days</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setEnabled(!enabled)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)", background: enabled ? "#f0fdf4" : "white", color: enabled ? "#16a34a" : "var(--muted-foreground)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <ToggleLeft size={16} />
            {enabled ? "Enabled" : "Disabled"}
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: "#f59e0b", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Play size={14} /> Test Run
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
        {["builder", "run-history", "settings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#f59e0b" : "var(--muted-foreground)", borderBottom: tab === t ? "2px solid #f59e0b" : "2px solid transparent", textTransform: "capitalize" }}>
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "builder" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 480, border: `2px solid ${step.color}40`, borderRadius: 12, padding: "16px 20px", background: step.bg, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: step.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <step.icon size={16} style={{ color: "white" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{step.type}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{step.label}</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "8px 0 0 42px" }}>{step.config}</p>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 24, background: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "run-history" && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Run ID", "Triggered At", "Status", "Duration", "Records Processed"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {runHistory.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--primary)", fontFamily: "monospace", fontWeight: 600 }}>{r.id}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.at}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {r.status === "Success" ? <CheckCircle size={12} style={{ color: "#16a34a" }} /> : <XCircle size={12} style={{ color: "#dc2626" }} />}
                      <span style={{ ...runStatusStyle(r.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{r.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{r.duration}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--foreground)", textAlign: "center" }}>{r.records}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Workflow Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ label: "Name", value: "New Lead Welcome Email" }, { label: "Description", value: "Sends welcome email when a new lead is created" }, { label: "Owner", value: "Sarah Chen" }].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 4 }}>{f.label}</label>
                  <input defaultValue={f.value} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
                </div>
              ))}
              <button style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>Save Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
