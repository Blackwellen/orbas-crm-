"use client"

import React, { useState } from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TABS = ["General", "Ticket Settings", "SLA", "Notifications", "Integrations", "Custom Fields"]

export default function ServiceSettingsPage() {
  const [tab, setTab] = useState("General")
  const [ticketPrefix, setTicketPrefix] = useState("TKT")
  const [autoAssign, setAutoAssign] = useState(true)
  const [csatEnabled, setCsatEnabled] = useState(true)
  const [csatDelay, setCsatDelay] = useState("24")
  const [workStart, setWorkStart] = useState("09:00")
  const [workEnd, setWorkEnd] = useState("17:00")

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Service Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure helpdesk behaviour and integrations</p>
      </div>

      {/* Tab Nav */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "General" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Workspace Identity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Organisation Name", defaultValue: "Orbas CRM" },
                { label: "Support Email", defaultValue: "support@orbas.io" },
                { label: "Support Phone", defaultValue: "+44 20 1234 5678" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">{f.label}</label>
                  <input defaultValue={f.defaultValue}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Ticket Settings" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Ticket Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Ticket ID Prefix</label>
                <div className="flex items-center gap-2">
                  <input value={ticketPrefix} onChange={e => setTicketPrefix(e.target.value)}
                    className="w-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                  <span className="text-sm text-[var(--muted-foreground)]">e.g. {ticketPrefix}-2041</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-2">Auto-Assignment</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAutoAssign(!autoAssign)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    style={{ background: autoAssign ? "var(--primary)" : "var(--border)" }}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${autoAssign ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                  <span className="text-sm text-[var(--foreground)]">{autoAssign ? "Enabled" : "Disabled"}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Automatically assign new tickets based on queue rules and agent availability.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Auto-Close After (days)</label>
                <input type="number" defaultValue={7}
                  className="w-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                <p className="text-xs text-[var(--muted-foreground)] mt-1">Resolved tickets will be auto-closed after this many days of inactivity.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Default Priority</label>
                <select className="px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                  <option>Medium</option><option>Low</option><option>High</option><option>Critical</option>
                </select>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">CSAT Survey</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCsatEnabled(!csatEnabled)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  style={{ background: csatEnabled ? "var(--primary)" : "var(--border)" }}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${csatEnabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-sm text-[var(--foreground)]">Enable CSAT Surveys</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Send Survey After (hours)</label>
                <input type="number" value={csatDelay} onChange={e => setCsatDelay(e.target.value)}
                  className="w-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Survey Question</label>
                <input defaultValue="How satisfied were you with our support?"
                  className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "SLA" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Working Hours</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Work Day Start</label>
                  <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Work Day End</label>
                  <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-2">Working Days</label>
                <div className="flex gap-2 flex-wrap">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                    <button key={d}
                      className="px-3 py-1.5 text-xs font-medium rounded-md border transition-colors"
                      style={i < 5
                        ? { borderColor: "var(--primary)", color: "var(--primary)", background: "var(--primary)" + "18" }
                        : { borderColor: "var(--border)", color: "var(--muted-foreground)", background: "transparent" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Notifications" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New ticket assigned",     enabled: true },
                { label: "Ticket reply received",   enabled: true },
                { label: "SLA breach warning",       enabled: true },
                { label: "Ticket resolved",          enabled: false },
                { label: "Escalation triggered",     enabled: true },
                { label: "CSAT response received",   enabled: false },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--foreground)]">{n.label}</span>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    style={{ background: n.enabled ? "var(--primary)" : "var(--border)" }}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${n.enabled ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Integrations" && (
        <div className="space-y-4 max-w-2xl">
          {[
            { name: "Slack", desc: "Post ticket notifications to Slack channels", connected: true, icon: "💬" },
            { name: "Jira", desc: "Create Jira issues from escalated tickets", connected: false, icon: "🔷" },
            { name: "PagerDuty", desc: "Trigger alerts for critical SLA breaches", connected: true, icon: "🚨" },
            { name: "Zendesk", desc: "Sync tickets with Zendesk for legacy data", connected: false, icon: "🎧" },
          ].map(intg => (
            <Card key={intg.name} className="border border-[var(--border)]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{intg.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{intg.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{intg.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium" style={{ color: intg.connected ? "#16a34a" : "var(--muted-foreground)" }}>
                    {intg.connected ? "Connected" : "Not connected"}
                  </span>
                  <button className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
                    {intg.connected ? "Configure" : "Connect"}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "Custom Fields" && (
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">Custom fields appear on ticket detail forms.</p>
            <button className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
              <Plus className="h-3.5 w-3.5" /> Add Field
            </button>
          </div>
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Field Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Required</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    { name: "Product Area", type: "Dropdown", required: true },
                    { name: "Affected Users Count", type: "Number", required: false },
                    { name: "Browser/OS", type: "Text", required: false },
                    { name: "Reproduction Steps", type: "Long Text", required: false },
                  ].map((f, i) => (
                    <tr key={i} className="hover:bg-[var(--secondary)]">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{f.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--foreground)]">{f.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: f.required ? "#16a34a" : "var(--muted-foreground)" }}>
                          {f.required ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-[var(--muted-foreground)] hover:text-[#dc2626]">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
