"use client"

import React, { useState } from "react"
import { Plus, Mail, MessageCircle, Globe, Phone, Hash, Settings, Wifi, WifiOff, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const CHANNELS = [
  { id: 1, name: "Support Email", type: "Email", account: "support@orbas.io", status: "Active", messagesToday: 47, agents: 8, icon: Mail, iconColor: "#1a56db" },
  { id: 2, name: "Sales Email", type: "Email", account: "sales@orbas.io", status: "Active", messagesToday: 23, agents: 5, icon: Mail, iconColor: "#1a56db" },
  { id: 3, name: "Website Live Chat", type: "Live Chat", account: "orbas.io", status: "Active", messagesToday: 31, agents: 6, icon: MessageCircle, iconColor: "#16a34a" },
  { id: 4, name: "WhatsApp Business", type: "WhatsApp", account: "+44 20 7946 0958", status: "Active", messagesToday: 18, agents: 4, icon: Phone, iconColor: "#16a34a" },
  { id: 5, name: "Facebook Messenger", type: "Facebook", account: "OrbaCRM Official", status: "Active", messagesToday: 9, agents: 3, icon: Globe, iconColor: "#1a56db" },
  { id: 6, name: "Twitter/X Support", type: "Twitter/X", account: "@orbas_support", status: "Error", messagesToday: 0, agents: 2, icon: Hash, iconColor: "#000" },
  { id: 7, name: "Instagram DMs", type: "Instagram", account: "@orbas_crm", status: "Inactive", messagesToday: 0, agents: 2, icon: Globe, iconColor: "#d97706" },
  { id: 8, name: "SMS Notifications", type: "SMS", account: "+44 800 000 0000", status: "Active", messagesToday: 12, agents: 0, icon: Phone, iconColor: "#06b6d4" },
]

const statusConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  Active:   { color: "#16a34a", bg: "#f0fdf4", icon: Wifi },
  Inactive: { color: "#6b7280", bg: "#f3f4f6", icon: WifiOff },
  Error:    { color: "#dc2626", bg: "#fef2f2", icon: AlertCircle },
}

export default function ChannelsPage() {
  const [channels] = useState(CHANNELS)

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Channels</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage all connected communication channels</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> Add Channel
        </button>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Channels",   value: String(channels.filter(c => c.status === "Active").length), color: "#16a34a" },
          { label: "Messages Today",    value: String(channels.reduce((s, c) => s + c.messagesToday, 0)), color: "#1a56db" },
          { label: "Channels w/ Issues",value: String(channels.filter(c => c.status === "Error" || c.status === "Inactive").length), color: "#dc2626" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channels Table */}
      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Channel</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Messages Today</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Connected Account</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Agents</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--muted-foreground)]">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {channels.map(ch => {
                  const sc = statusConfig[ch.status]
                  const StatusIcon = sc.icon
                  return (
                    <tr key={ch.id} className="hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md" style={{ background: ch.iconColor + "18" }}>
                            <ch.icon className="h-4 w-4" style={{ color: ch.iconColor }} />
                          </div>
                          <span className="font-medium text-[var(--foreground)]">{ch.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                          {ch.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ color: sc.color, background: sc.bg }}>
                          <StatusIcon className="h-3 w-3" />
                          {ch.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)] font-semibold">{ch.messagesToday}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] font-mono">{ch.account}</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">{ch.agents}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] text-[var(--muted-foreground)]">
                          <Settings className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
