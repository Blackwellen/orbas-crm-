"use client"

import { useState } from "react"
import { Bell, Save } from "lucide-react"

const notificationTypes = [
  "New Ticket Assigned",
  "Deal Won",
  "Invoice Overdue",
  "Task Due",
  "Mention",
  "System Alerts",
  "Weekly Digest",
  "Monthly Report",
]

const channels = ["Email", "Push", "In-App", "SMS"]

const defaultPrefs: Record<string, Record<string, boolean>> = {
  "New Ticket Assigned": { Email: true, Push: true, "In-App": true, SMS: false },
  "Deal Won": { Email: true, Push: true, "In-App": true, SMS: false },
  "Invoice Overdue": { Email: true, Push: false, "In-App": true, SMS: true },
  "Task Due": { Email: false, Push: true, "In-App": true, SMS: false },
  "Mention": { Email: true, Push: true, "In-App": true, SMS: false },
  "System Alerts": { Email: true, Push: true, "In-App": true, SMS: true },
  "Weekly Digest": { Email: true, Push: false, "In-App": false, SMS: false },
  "Monthly Report": { Email: true, Push: false, "In-App": false, SMS: false },
}

export default function NotificationsSettingsPage() {
  const [prefs, setPrefs] = useState(defaultPrefs)

  function toggle(type: string, channel: string) {
    setPrefs(prev => ({
      ...prev,
      [type]: { ...prev[type], [channel]: !prev[type][channel] },
    }))
  }

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Bell size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Notification Preferences</h1>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white", maxWidth: 680 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>Notification Type</th>
              {channels.map(c => (
                <th key={c} style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notificationTypes.map((type, i) => (
              <tr key={type} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: "var(--foreground)" }}>{type}</td>
                {channels.map(ch => (
                  <td key={ch} style={{ padding: "14px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => toggle(type, ch)}
                      style={{
                        width: 40, height: 22, borderRadius: 11,
                        background: prefs[type][ch] ? "var(--primary)" : "var(--muted)",
                        border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s",
                      }}
                    >
                      <div style={{
                        position: "absolute", top: 2, left: prefs[type][ch] ? 20 : 2,
                        width: 18, height: 18, borderRadius: "50%", background: "white",
                        transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }} />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Save size={14} /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
