"use client"

import { Settings, Save } from "lucide-react"
import { useState } from "react"

export default function AutomationsSettingsPage() {
  const [maxRetries, setMaxRetries] = useState("3")
  const [retryDelay, setRetryDelay] = useState("5")
  const [errorEmail, setErrorEmail] = useState("devops@company.com")
  const [globalEnabled, setGlobalEnabled] = useState(true)
  const [logRetention, setLogRetention] = useState("90")

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Settings size={24} style={{ color: "#f59e0b" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Automation Settings</h1>
      </div>

      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Global toggle */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Enable All Automations</p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "2px 0 0" }}>Globally pause or resume all active workflows.</p>
            </div>
            <button onClick={() => setGlobalEnabled(!globalEnabled)} style={{ width: 48, height: 26, borderRadius: 13, background: globalEnabled ? "#16a34a" : "var(--muted)", border: "none", cursor: "pointer", position: "relative" }}>
              <div style={{ position: "absolute", top: 3, left: globalEnabled ? 24 : 3, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
        </div>

        {/* Error handling */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 18 }}>Error Handling</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Max Retries</label>
                <select value={maxRetries} onChange={e => setMaxRetries(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                  {["1", "2", "3", "5", "10"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Retry Delay (minutes)</label>
                <select value={retryDelay} onChange={e => setRetryDelay(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                  {["1", "5", "15", "30", "60"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Error Notification Email</label>
              <input value={errorEmail} onChange={e => setErrorEmail(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
            </div>
          </div>
        </div>

        {/* Log retention */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Log Retention</h3>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Keep run logs for</label>
            <select value={logRetention} onChange={e => setLogRetention(e.target.value)} style={{ padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>
          <Save size={14} /> Save Settings
        </button>
      </div>
    </div>
  )
}
