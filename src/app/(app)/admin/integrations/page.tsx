"use client"

import React, { useState } from "react"
import { Plus, ExternalLink, RefreshCw, Check, X } from "lucide-react"

const integrations = [
  { id: "1", name: "Stripe",            category: "Payments",      status: "connected",    logo: "S",  color: "#635bff", desc: "Process payments and sync invoices", lastSync: "5 min ago" },
  { id: "2", name: "Xero",              category: "Accounting",    status: "connected",    logo: "X",  color: "#13b5ea", desc: "Sync chart of accounts and transactions", lastSync: "1 hour ago" },
  { id: "3", name: "Google Workspace",  category: "Productivity",  status: "connected",    logo: "G",  color: "#4285f4", desc: "Calendar, Gmail and Drive integration", lastSync: "Real-time" },
  { id: "4", name: "Slack",             category: "Messaging",     status: "connected",    logo: "Sl", color: "#4a154b", desc: "Send notifications and alerts to Slack", lastSync: "Real-time" },
  { id: "5", name: "Mailchimp",         category: "Marketing",     status: "disconnected", logo: "M",  color: "#ffe01b", desc: "Sync contacts to email marketing lists", lastSync: "—" },
  { id: "6", name: "HubSpot",           category: "CRM",           status: "disconnected", logo: "H",  color: "#ff7a59", desc: "Bi-directional contact and deal sync", lastSync: "—" },
  { id: "7", name: "Microsoft 365",     category: "Productivity",  status: "disconnected", logo: "Ms", color: "#0078d4", desc: "Outlook calendar and Teams messaging", lastSync: "—" },
  { id: "8", name: "QuickBooks",        category: "Accounting",    status: "disconnected", logo: "QB", color: "#2ca01c", desc: "Sync accounting data with QuickBooks", lastSync: "—" },
  { id: "9", name: "Twilio",            category: "Messaging",     status: "connected",    logo: "Tw", color: "#f22f46", desc: "SMS and voice notifications", lastSync: "Real-time" },
  { id: "10", name: "Zapier",           category: "Automation",    status: "disconnected", logo: "Za", color: "#ff4a00", desc: "Connect to 6,000+ apps via Zapier", lastSync: "—" },
  { id: "11", name: "DocuSign",         category: "Documents",     status: "disconnected", logo: "DS", color: "#ffcc00", desc: "Electronic signature integration", lastSync: "—" },
  { id: "12", name: "Salesforce",       category: "CRM",           status: "disconnected", logo: "SF", color: "#00a1e0", desc: "Import/export CRM data from Salesforce", lastSync: "—" },
]

const categories = ["All", "Payments", "Accounting", "Productivity", "Messaging", "CRM", "Marketing", "Automation", "Documents"]

export default function IntegrationsPage() {
  const [filter, setFilter] = useState("All")
  const [showConnected, setShowConnected] = useState<boolean | null>(null)

  const filtered = integrations.filter(i => {
    const catMatch = filter === "All" || i.category === filter
    const statusMatch = showConnected === null || (showConnected ? i.status === "connected" : i.status === "disconnected")
    return catMatch && statusMatch
  })

  const connectedCount = integrations.filter(i => i.status === "connected").length

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Integrations</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{connectedCount} of {integrations.length} integrations connected</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" /> Browse All Integrations
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)]"
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowConnected(showConnected === true ? null : true)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
              showConnected === true ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[var(--secondary)] text-[var(--foreground)]"
            }`}
          >
            <Check className="h-3 w-3" /> Connected
          </button>
          <button
            onClick={() => setShowConnected(showConnected === false ? null : false)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
              showConnected === false ? "bg-[#fee2e2] text-[#dc2626]" : "bg-[var(--secondary)] text-[var(--foreground)]"
            }`}
          >
            <X className="h-3 w-3" /> Not Connected
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(integration => (
          <div key={integration.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: integration.color }}>
                  {integration.logo}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{integration.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{integration.category}</p>
                </div>
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: integration.status === "connected" ? "#dcfce7" : "#f3f4f6",
                  color: integration.status === "connected" ? "#16a34a" : "#6b7280",
                }}
              >
                {integration.status === "connected" ? "Connected" : "Not Connected"}
              </span>
            </div>

            <p className="text-xs text-[var(--muted-foreground)] flex-1">{integration.desc}</p>

            {integration.status === "connected" && (
              <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                <RefreshCw className="h-3 w-3" /> Last sync: {integration.lastSync}
              </p>
            )}

            <div className="flex gap-2">
              {integration.status === "connected" ? (
                <>
                  <button className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                    Configure
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors" style={{ borderColor: '#dc2626', color: '#dc2626' }}>
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--primary)] text-xs font-medium text-white hover:opacity-90">
                  <ExternalLink className="h-3 w-3" /> Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
