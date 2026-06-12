"use client"

import { Plug, CheckCircle, XCircle, Settings } from "lucide-react"

const integrations = [
  { name: "Slack", category: "Communication", desc: "Send notifications and alerts to Slack channels.", status: "Connected", account: "#general, #sales", logo: "SL" },
  { name: "Google Workspace", category: "Productivity", desc: "Sync contacts and calendar events with Google.", status: "Connected", account: "james@company.com", logo: "GW" },
  { name: "Stripe", category: "Payments", desc: "Sync payment and subscription data automatically.", status: "Connected", account: "company.com account", logo: "ST" },
  { name: "Zapier", category: "Automation", desc: "Connect to 5,000+ apps via Zapier workflows.", status: "Connected", account: "API Token active", logo: "ZP" },
  { name: "Mailchimp", category: "Email Marketing", desc: "Sync contacts and manage email campaigns.", status: "Disconnected", account: "—", logo: "MC" },
  { name: "HubSpot", category: "CRM", desc: "Two-way sync of contacts and deal data.", status: "Disconnected", account: "—", logo: "HS" },
  { name: "Xero", category: "Accounting", desc: "Sync invoices, payments and financial records.", status: "Connected", account: "company Ltd", logo: "XR" },
  { name: "Twilio", category: "SMS", desc: "Send SMS notifications and alerts to contacts.", status: "Disconnected", account: "—", logo: "TW" },
  { name: "GitHub", category: "Development", desc: "Link commits and PRs to tasks and projects.", status: "Connected", account: "orbas-company", logo: "GH" },
  { name: "Salesforce", category: "CRM", desc: "Import and sync Salesforce contacts and leads.", status: "Disconnected", account: "—", logo: "SF" },
]

export default function IntegrationsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Plug size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Integrations</h1>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 28 }}>Connect your favourite tools to streamline your workflow.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <div style={{ background: "#dcfce7", color: "#16a34a", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
          {integrations.filter(i => i.status === "Connected").length} Connected
        </div>
        <div style={{ background: "#f3f4f6", color: "#6b7280", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
          {integrations.filter(i => i.status === "Disconnected").length} Available
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {integrations.map(int => (
          <div key={int.name} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 22, background: "white", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "var(--foreground)" }}>{int.logo}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{int.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{int.category}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {int.status === "Connected" ? (
                    <CheckCircle size={14} style={{ color: "#16a34a" }} />
                  ) : (
                    <XCircle size={14} style={{ color: "#dc2626" }} />
                  )}
                  <span style={{ fontSize: 12, fontWeight: 600, color: int.status === "Connected" ? "#16a34a" : "#6b7280" }}>{int.status}</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "6px 0 10px", lineHeight: 1.4 }}>{int.desc}</p>
              {int.status === "Connected" && (
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "0 0 10px" }}>Account: {int.account}</p>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                {int.status === "Connected" ? (
                  <>
                    <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "white", fontSize: 12, cursor: "pointer", color: "var(--foreground)" }}>
                      <Settings size={12} /> Configure
                    </button>
                    <button style={{ padding: "5px 12px", border: "1px solid #fee2e2", borderRadius: 6, background: "white", fontSize: 12, cursor: "pointer", color: "#dc2626" }}>Disconnect</button>
                  </>
                ) : (
                  <button style={{ padding: "5px 14px", border: "none", borderRadius: 6, background: "var(--primary)", fontSize: 12, cursor: "pointer", color: "white", fontWeight: 600 }}>Connect</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
