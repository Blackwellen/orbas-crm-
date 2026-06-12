"use client"

import React, { useState } from "react"
import { Save, Plus, Trash2 } from "lucide-react"

const tabs = ["General", "Data Sources", "Permissions", "Notifications", "Integrations"]

const dataSources = [
  { id: "1", name: "Main Database", type: "PostgreSQL (Supabase)", status: "Connected", lastSync: "2 min ago" },
  { id: "2", name: "Google Analytics", type: "GA4", status: "Connected", lastSync: "1 hour ago" },
  { id: "3", name: "Stripe Payments", type: "Stripe", status: "Connected", lastSync: "15 min ago" },
  { id: "4", name: "HubSpot CRM", type: "HubSpot", status: "Disconnected", lastSync: "Never" },
]

export default function AnalyticsSettingsPage() {
  const [activeTab, setActiveTab] = useState("General")

  return (
    <div className="p-6 space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure data sources, permissions, and reporting preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "General" && (
        <div className="space-y-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">General Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-1.5">Default Date Range</label>
              <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This month</option>
                <option>This quarter</option>
                <option>This year</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-1.5">Currency Display</label>
              <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none">
                <option>GBP (£)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-1.5">Fiscal Year Start</label>
              <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none">
                <option>January</option>
                <option>April (UK Tax Year)</option>
                <option>July</option>
                <option>October</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-1.5">Data Refresh Rate</label>
              <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none">
                <option>Every 15 minutes</option>
                <option>Every 30 minutes</option>
                <option>Every hour</option>
                <option>Daily</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <label className="text-sm text-[var(--foreground)] flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              Enable AI-powered insights and anomaly detection
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-[var(--foreground)] flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              Show benchmark comparisons (industry averages)
            </label>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>
      )}

      {activeTab === "Data Sources" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">Connect external data sources to enrich your analytics</p>
            <button className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <Plus className="h-4 w-4" /> Add Source
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] divide-y divide-[var(--border)]">
            {dataSources.map(ds => (
              <div key={ds.id} className="flex items-center gap-4 px-5 py-4">
                <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-sm font-bold text-[var(--primary)]">
                  {ds.type.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)]">{ds.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{ds.type} · Last sync: {ds.lastSync}</p>
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: ds.status === "Connected" ? "#dcfce7" : "#fee2e2",
                    color: ds.status === "Connected" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {ds.status}
                </span>
                <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "Permissions" || activeTab === "Notifications" || activeTab === "Integrations") && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-10 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">{activeTab} settings coming soon</p>
        </div>
      )}
    </div>
  )
}
