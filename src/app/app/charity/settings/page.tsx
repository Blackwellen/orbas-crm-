"use client"

import { Settings, Save } from "lucide-react"
import { useState } from "react"

export default function CharitySettingsPage() {
  const [orgName, setOrgName] = useState("Orbas Community Foundation")
  const [regNumber, setRegNumber] = useState("1234567")
  const [hmrcRef, setHmrcRef] = useState("XR 12345 67890")
  const [finYearEnd, setFinYearEnd] = useState("March")
  const [currency, setCurrency] = useState("GBP")
  const [emailFrom, setEmailFrom] = useState("giving@communityfoundation.org.uk")

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Settings size={24} style={{ color: "#e11d48" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Charity Settings</h1>
      </div>

      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Organisation Details</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Organisation Name", val: orgName, set: setOrgName },
              { label: "Charity Registration Number", val: regNumber, set: setRegNumber },
              { label: "HMRC Charities Reference", val: hmrcRef, set: setHmrcRef },
              { label: "Donor Email From Address", val: emailFrom, set: setEmailFrom },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Financial Year End</label>
                <select value={finYearEnd} onChange={e => setFinYearEnd(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                  {["January", "March", "April", "June", "September", "December"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Currency</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>
          <Save size={14} /> Save Settings
        </button>
      </div>
    </div>
  )
}
