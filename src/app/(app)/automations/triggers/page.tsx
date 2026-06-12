"use client"

import { Play, Plus } from "lucide-react"

const triggerTypes = [
  {
    category: "Record Events",
    color: "#1a56db",
    bg: "#eff6ff",
    triggers: [
      { name: "Record Created", desc: "Fires when a new record is created in any module", usedIn: 5 },
      { name: "Record Updated", desc: "Fires when a field value changes on an existing record", usedIn: 8 },
      { name: "Record Deleted", desc: "Fires when a record is permanently deleted", usedIn: 1 },
      { name: "Record Status Changed", desc: "Fires when the status field changes to a specific value", usedIn: 6 },
    ],
  },
  {
    category: "Time & Schedule",
    color: "#d97706",
    bg: "#fefce8",
    triggers: [
      { name: "Scheduled: Daily", desc: "Runs once per day at a defined time (e.g. 09:00 AM)", usedIn: 4 },
      { name: "Scheduled: Weekly", desc: "Runs on a specific day and time each week", usedIn: 2 },
      { name: "Scheduled: Monthly", desc: "Runs on a specific day each month", usedIn: 1 },
      { name: "Time Before/After Field", desc: "Triggers N days before or after a date field (e.g. 7 days before due date)", usedIn: 3 },
    ],
  },
  {
    category: "Webhooks & API",
    color: "#7c3aed",
    bg: "#f5f3ff",
    triggers: [
      { name: "Inbound Webhook", desc: "Fires when an external system POSTs to your unique webhook URL", usedIn: 3 },
      { name: "API Request", desc: "Triggered manually via the API using a workflow ID", usedIn: 0 },
    ],
  },
  {
    category: "Manual",
    color: "#16a34a",
    bg: "#f0fdf4",
    triggers: [
      { name: "Manual Trigger (Button)", desc: "User clicks 'Run Workflow' button on a record detail page", usedIn: 2 },
      { name: "Manual Trigger (Bulk)", desc: "Run across multiple selected records from a list view", usedIn: 1 },
    ],
  },
]

export default function TriggersPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Play size={24} style={{ color: "#f59e0b" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Triggers</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> New Workflow
        </button>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 28 }}>All available trigger types for your automation workflows.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {triggerTypes.map(cat => (
          <div key={cat.category}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{cat.category}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {cat.triggers.map(t => (
                <div key={t.name} style={{ border: `1px solid ${cat.color}30`, borderRadius: 10, padding: "18px 20px", background: cat.bg, display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Play size={14} style={{ color: cat.color }} />
                      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{t.name}</p>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{t.desc}</p>
                  </div>
                  {t.usedIn > 0 && (
                    <span style={{ background: "white", color: cat.color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, border: `1px solid ${cat.color}40`, flexShrink: 0, marginLeft: 12 }}>
                      {t.usedIn} workflows
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
