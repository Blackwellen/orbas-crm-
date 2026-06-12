"use client"

import { BookOpen, Plus, CheckCircle } from "lucide-react"

const trainings = [
  { title: "Information Security Fundamentals", assigned: 48, completed: 45, dueDate: "2026-06-30", status: "Active", mandatory: true },
  { title: "GDPR Awareness for All Staff", assigned: 48, completed: 48, dueDate: "2026-03-31", status: "Complete", mandatory: true },
  { title: "Phishing Recognition & Prevention", assigned: 48, completed: 42, dueDate: "2026-07-15", status: "Active", mandatory: true },
  { title: "Anti-Bribery & Corruption", assigned: 48, completed: 46, dueDate: "2026-05-31", status: "Complete", mandatory: true },
  { title: "Health & Safety Induction", assigned: 12, completed: 12, dueDate: "2026-04-30", status: "Complete", mandatory: true },
  { title: "Data Classification & Handling", assigned: 22, completed: 18, dueDate: "2026-07-31", status: "Active", mandatory: false },
  { title: "Incident Reporting Procedures", assigned: 15, completed: 9, dueDate: "2026-08-15", status: "Active", mandatory: false },
  { title: "PCI-DSS for Finance Team", assigned: 8, completed: 8, dueDate: "2026-04-15", status: "Complete", mandatory: true },
  { title: "Secure Coding Practices (Dev Team)", assigned: 10, completed: 7, dueDate: "2026-07-01", status: "Active", mandatory: false },
  { title: "Third-Party Risk Awareness", assigned: 20, completed: 12, dueDate: "2026-08-31", status: "Active", mandatory: false },
]

export default function TrainingPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BookOpen size={24} style={{ color: "#16a34a" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Compliance Training</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Assign Training
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Completed", count: trainings.filter(t => t.status === "Complete").length, style: { background: "#dcfce7", color: "#16a34a" } },
          { label: "In Progress", count: trainings.filter(t => t.status === "Active").length, style: { background: "#fef9c3", color: "#d97706" } },
          { label: "Overdue", count: 2, style: { background: "#fee2e2", color: "#dc2626" } },
        ].map(s => (
          <div key={s.label} style={{ ...s.style, padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>{s.count} {s.label}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {trainings.map(t => {
          const pct = Math.round((t.completed / t.assigned) * 100)
          return (
            <div key={t.title} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "18px 24px", background: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {t.status === "Complete" ? <CheckCircle size={18} style={{ color: "#16a34a" }} /> : <BookOpen size={18} style={{ color: "#f59e0b" }} />}
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{t.title}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "2px 0 0" }}>Due: {t.dueDate} · {t.completed}/{t.assigned} completed</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {t.mandatory && <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 8 }}>Mandatory</span>}
                  <span style={{ background: t.status === "Complete" ? "#dcfce7" : "#fef9c3", color: t.status === "Complete" ? "#16a34a" : "#d97706", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{t.status}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16a34a" : "#f59e0b", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)", minWidth: 36 }}>{pct}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
