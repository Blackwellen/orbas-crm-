"use client"

import React, { useState } from "react"
import { Key, Plus, Copy, Eye, EyeOff, Trash2, RefreshCw } from "lucide-react"

const apiKeys = [
  { id: "1", name: "Production API Key",     prefix: "sk_live_8xK2...", permissions: ["read", "write"], lastUsed: "2 min ago",   created: "1 Jan 2025",  status: "active" },
  { id: "2", name: "Staging Integration",    prefix: "sk_test_mN9P...", permissions: ["read"],         lastUsed: "1 hour ago",  created: "15 Mar 2025", status: "active" },
  { id: "3", name: "Analytics Export Bot",   prefix: "sk_live_pQ7R...", permissions: ["read"],         lastUsed: "Yesterday",   created: "20 Jun 2025", status: "active" },
  { id: "4", name: "Deprecated Webhook Key", prefix: "sk_live_zZ1X...", permissions: ["read", "write"],lastUsed: "3 months ago",created: "8 Feb 2024",  status: "revoked" },
]

const webhooks = [
  { id: "1", url: "https://webhook.site/abc123",    events: ["invoice.paid", "deal.won"],    status: "active",   lastCall: "5 min ago" },
  { id: "2", url: "https://hooks.zapier.com/xyz987", events: ["contact.created"],            status: "active",   lastCall: "1 hour ago" },
  { id: "3", url: "https://api.example.com/webhook", events: ["ticket.created", "ticket.resolved"], status: "failing", lastCall: "2 days ago" },
]

export default function ApiKeysPage() {
  const [showNew, setShowNew] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")

  return (
    <div className="p-6 space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">API Keys & Webhooks</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage API keys for external integrations and webhook endpoints</p>
      </div>

      {/* API Keys */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center justify-between p-5 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">API Keys</h2>
          <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Generate Key
          </button>
        </div>

        {showNew && (
          <div className="p-4 border-b border-[var(--border)] bg-[var(--secondary)]">
            <p className="text-xs font-medium text-[var(--foreground)] mb-2">New API Key</p>
            <div className="flex gap-2">
              <input
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                placeholder="Key name (e.g. Production API)"
                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              />
              <select className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none">
                <option>Read only</option>
                <option>Read + Write</option>
                <option>Full access</option>
              </select>
              <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-sm font-medium text-white hover:opacity-90" onClick={() => setShowNew(false)}>
                Generate
              </button>
              <button className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)]" onClick={() => setShowNew(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="divide-y divide-[var(--border)]">
          {apiKeys.map(key => (
            <div key={key.id} className="flex items-center gap-4 px-5 py-4">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--secondary)' }}>
                <Key className="h-4 w-4 text-[var(--primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[var(--foreground)]">{key.name}</p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      background: key.status === "active" ? "#dcfce7" : "#fee2e2",
                      color: key.status === "active" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {key.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <code className="text-xs text-[var(--muted-foreground)] font-mono bg-[var(--secondary)] px-1.5 py-0.5 rounded">{key.prefix}</code>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {key.permissions.join(" + ")} · Last used: {key.lastUsed} · Created: {key.created}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors" title="Copy key">
                  <Copy className="h-4 w-4 text-[var(--muted-foreground)]" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors" title="Rotate key">
                  <RefreshCw className="h-4 w-4 text-[var(--muted-foreground)]" />
                </button>
                {key.status === "active" && (
                  <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors" title="Revoke key">
                    <Trash2 className="h-4 w-4" style={{ color: '#dc2626' }} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center justify-between p-5 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Webhooks</h2>
          <button className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Add Webhook
          </button>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {webhooks.map(wh => (
            <div key={wh.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-[var(--foreground)] truncate">{wh.url}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {wh.events.map(e => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">{e}</span>
                  ))}
                  <span className="text-xs text-[var(--muted-foreground)]">Last call: {wh.lastCall}</span>
                </div>
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: wh.status === "active" ? "#dcfce7" : "#fee2e2",
                  color: wh.status === "active" ? "#16a34a" : "#dc2626",
                }}
              >
                {wh.status}
              </span>
              <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors">
                <Trash2 className="h-4 w-4" style={{ color: '#dc2626' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Security note:</strong> API keys are shown only once upon creation. Keep them secure and never commit them to source control. All API requests are logged in the Audit Log.
        </p>
      </div>
    </div>
  )
}
