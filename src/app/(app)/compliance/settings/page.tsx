"use client"

import { Settings, Save } from "lucide-react"
import { useState } from "react"

export default function ComplianceSettingsPage() {
  const [riskApprover, setRiskApprover] = useState("Mark Davies")
  const [reviewFreq, setReviewFreq] = useState("quarterly")
  const [notifyOnNew, setNotifyOnNew] = useState(true)
  const [notifyOnBreach, setNotifyOnBreach] = useState(true)
  const [gdprContact, setGdprContact] = useState("James Wright")

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Settings size={24} style={{ color: "#16a34a" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Compliance Settings</h1>
      </div>

      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Risk Management */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Risk Management</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Risk Approver</label>
              <input value={riskApprover} onChange={e => setRiskApprover(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Review Frequency</label>
              <select value={reviewFreq} onChange={e => setReviewFreq(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="biannual">Bi-annual</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Notifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Notify on new risk identified", key: "notifyOnNew", val: notifyOnNew, set: setNotifyOnNew },
              { label: "Notify on policy breach / incident", key: "notifyOnBreach", val: notifyOnBreach, set: setNotifyOnBreach },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--foreground)" }}>{n.label}</span>
                <button onClick={() => n.set(!n.val)} style={{ width: 44, height: 24, borderRadius: 12, background: n.val ? "#16a34a" : "var(--muted)", border: "none", cursor: "pointer", position: "relative" }}>
                  <div style={{ position: "absolute", top: 2, left: n.val ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* GDPR */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>GDPR</h3>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Data Protection Officer / GDPR Contact</label>
            <input value={gdprContact} onChange={e => setGdprContact(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
          </div>
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#16a34a", color: "white", border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>
          <Save size={14} /> Save Settings
        </button>
      </div>
    </div>
  )
}
