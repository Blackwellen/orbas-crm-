"use client"

import { useState } from "react"
import { AlertTriangle, ArrowLeft, CheckSquare, Clock } from "lucide-react"
import Link from "next/link"

export default function RiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [tab, setTab] = useState("overview")

  const risk = {
    id: "RSK-001",
    title: "Ransomware Attack on Core Systems",
    category: "Cyber",
    description: "A ransomware attack targeting our core ERP and database systems could result in significant data loss, operational disruption, and regulatory penalties under GDPR. Threat actors increasingly target organisations of our size using spear-phishing and vulnerability exploitation.",
    likelihood: 4,
    impact: 5,
    inherentScore: 20,
    residualScore: 12,
    owner: "Sarah Chen",
    reviewer: "Mark Davies",
    status: "Assessed",
    dateIdentified: "2026-01-15",
    lastReviewed: "2026-05-20",
    dueDate: "2026-07-01",
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualLikelihood: 4,
    residualImpact: 3,
  }

  const controls = [
    { id: "CTR-004", title: "Endpoint Detection & Response (EDR)", type: "Detective", status: "Effective", tested: "2026-05-01" },
    { id: "CTR-012", title: "Daily Encrypted Backups (offsite)", type: "Corrective", status: "Effective", tested: "2026-04-15" },
    { id: "CTR-019", title: "Email Filtering & Anti-phishing", type: "Preventive", status: "Effective", tested: "2026-05-10" },
    { id: "CTR-023", title: "Network Segmentation", type: "Preventive", status: "Partially Effective", tested: "2026-03-20" },
  ]

  const actions = [
    { title: "Conduct tabletop ransomware exercise", owner: "Sarah Chen", due: "2026-06-30", status: "In Progress" },
    { title: "Patch all Windows Server instances", owner: "Mark Davies", due: "2026-06-15", status: "Complete" },
    { title: "Review backup restoration SLA", owner: "Rachel Kim", due: "2026-07-01", status: "Not Started" },
    { title: "Deploy additional network monitoring", owner: "Tom Patel", due: "2026-07-15", status: "Not Started" },
  ]

  const history = [
    { date: "2026-05-20", user: "Mark Davies", change: "Risk re-assessed — residual score updated from 15 to 12" },
    { date: "2026-04-10", user: "Sarah Chen", change: "EDR control added and linked to this risk" },
    { date: "2026-03-01", user: "James Wright", change: "Likelihood updated from 3 to 4 following threat intel briefing" },
    { date: "2026-01-15", user: "Sarah Chen", change: "Risk initially identified and created" },
  ]

  const tabs = ["overview", "controls", "action-plan", "history"]

  function scoreStyle(s: number) {
    if (s >= 16) return { background: "#fce7f3", color: "#e11d48" }
    if (s >= 10) return { background: "#fee2e2", color: "#dc2626" }
    if (s >= 5) return { background: "#fef9c3", color: "#d97706" }
    return { background: "#dcfce7", color: "#16a34a" }
  }

  function actionStyle(s: string) {
    switch (s) {
      case "Complete": return { background: "#dcfce7", color: "#16a34a" }
      case "In Progress": return { background: "#eff6ff", color: "#1a56db" }
      default: return { background: "#f3f4f6", color: "#6b7280" }
    }
  }

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <Link href="/app/compliance/risks" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", fontSize: 13, textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Risk Register
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <AlertTriangle size={28} style={{ color: "#f59e0b", marginTop: 2 }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", fontFamily: "monospace" }}>{risk.id}</span>
              <span style={{ background: "#fef9c3", color: "#d97706", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>Assessed</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{risk.title}</h1>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "4px 0 0" }}>Owner: {risk.owner} · Reviewer: {risk.reviewer} · Due: {risk.dueDate}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)", background: "white", fontSize: 13, cursor: "pointer", color: "var(--foreground)" }}>Edit Risk</button>
          <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Close Risk</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? "var(--primary)" : "var(--muted-foreground)", borderBottom: tab === t ? "2px solid var(--primary)" : "2px solid transparent", textTransform: "capitalize" }}>
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Description</h3>
              <p style={{ fontSize: 14, color: "var(--foreground)", lineHeight: 1.6 }}>{risk.description}</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Risk Assessment</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: 16, background: "#fff7ed", borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: "#d97706", fontWeight: 600, marginBottom: 8 }}>INHERENT RISK (before controls)</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Likelihood</p><p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{risk.inherentLikelihood}/5</p></div>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Impact</p><p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{risk.inherentImpact}/5</p></div>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Score</p><span style={{ ...scoreStyle(risk.inherentScore), fontSize: 22, fontWeight: 700, padding: "2px 10px", borderRadius: 6 }}>{risk.inherentScore}</span></div>
                  </div>
                </div>
                <div style={{ padding: 16, background: "#f0fdf4", borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, marginBottom: 8 }}>RESIDUAL RISK (after controls)</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Likelihood</p><p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{risk.residualLikelihood}/5</p></div>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Impact</p><p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{risk.residualImpact}/5</p></div>
                    <div><p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Score</p><span style={{ ...scoreStyle(risk.residualScore), fontSize: 22, fontWeight: 700, padding: "2px 10px", borderRadius: 6 }}>{risk.residualScore}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Details</h3>
              {[["Category", risk.category], ["Status", risk.status], ["Owner", risk.owner], ["Reviewer", risk.reviewer], ["Identified", risk.dateIdentified], ["Last Reviewed", risk.lastReviewed], ["Review Due", risk.dueDate]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "controls" && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Control ID", "Title", "Type", "Status", "Last Tested"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {controls.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--primary)", fontFamily: "monospace", fontWeight: 600 }}>{c.id}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{c.title}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.type}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ background: c.status === "Effective" ? "#dcfce7" : "#fef9c3", color: c.status === "Effective" ? "#16a34a" : "#d97706", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>{c.status}</span>
                  </td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.tested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "action-plan" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {actions.map(a => (
            <div key={a.title} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 16, background: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{a.title}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "4px 0 0" }}>Owner: {a.owner} · Due: {a.due}</p>
              </div>
              <span style={{ ...actionStyle(a.status), fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 10 }}>{a.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {history.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 20, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={14} style={{ color: "white" }} />
                </div>
                {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{h.user}</p>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "2px 0" }}>{h.change}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{h.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
