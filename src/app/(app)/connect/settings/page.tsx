"use client"

import React, { useState } from "react"
import { Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TABS = ["General", "Business Hours", "Auto-Responses", "Chat Widget", "Integrations"]

export default function ConnectSettingsPage() {
  const [tab, setTab] = useState("General")
  const [widgetColor, setWidgetColor] = useState("#1a56db")
  const [greeting, setGreeting] = useState("Hi! How can we help you today?")
  const [offlineMsg, setOfflineMsg] = useState("We're currently offline. Leave a message and we'll get back to you!")

  const HOURS = ["00:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Connect Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure messaging channels and communication preferences</p>
      </div>

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
            <CardHeader><CardTitle className="text-sm">General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Team Name", defaultValue: "Orbas Support Team" },
                { label: "Default Reply Email", defaultValue: "noreply@orbas.io" },
                { label: "Support Portal URL", defaultValue: "help.orbas.io" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">{f.label}</label>
                  <input defaultValue={f.defaultValue}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Business Hours" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Business Hours</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day, i) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm text-[var(--foreground)] w-28">{day}</span>
                  <input type="checkbox" defaultChecked={i < 5}
                    className="rounded border-[var(--border)]" />
                  <select defaultValue="09:00" className="px-2 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                  <span className="text-xs text-[var(--muted-foreground)]">to</span>
                  <select defaultValue="17:00" className="px-2 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Auto-Responses" && (
        <div className="space-y-5 max-w-xl">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Auto-Response Templates</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Welcome Message (First Contact)", value: "Thanks for reaching out! A member of our team will respond within 2 hours during business hours." },
                { label: "Outside Business Hours", value: "We're currently offline. Our team is available Mon–Fri, 9am–5pm GMT. We'll get back to you on the next business day." },
                { label: "Ticket Acknowledgement", value: "We've received your request and created ticket #{ticket_id}. You'll receive updates at {customer_email}." },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">{f.label}</label>
                  <textarea defaultValue={f.value} rows={3}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Chat Widget" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Chat Widget Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Widget Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={widgetColor} onChange={e => setWidgetColor(e.target.value)}
                    className="h-9 w-14 rounded border border-[var(--border)] cursor-pointer" />
                  <input value={widgetColor} onChange={e => setWidgetColor(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm font-mono border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none" />
                </div>
              </div>
              {[
                { label: "Greeting Message", state: greeting, setState: setGreeting },
                { label: "Offline Message", state: offlineMsg, setState: setOfflineMsg },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">{f.label}</label>
                  <textarea value={f.state} onChange={e => f.setState(e.target.value)} rows={3}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                <Save className="h-4 w-4" /> Save
              </button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-sm">Live Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="relative rounded-xl overflow-hidden" style={{ background: "#f0f4f8", minHeight: 320, padding: 16 }}>
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                  <div className="rounded-2xl rounded-br-sm p-3 text-xs text-white shadow-lg max-w-[200px]"
                    style={{ background: widgetColor }}>
                    {greeting}
                  </div>
                  <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ background: widgetColor }}>
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "Integrations" && (
        <div className="space-y-4 max-w-2xl">
          {[
            { name: "Mailchimp", desc: "Sync email contacts and campaigns", connected: false, icon: "📧" },
            { name: "Twilio",    desc: "SMS and WhatsApp messaging gateway", connected: true,  icon: "📱" },
            { name: "Zapier",    desc: "Connect with 5000+ apps via Zapier", connected: false, icon: "⚡" },
            { name: "HubSpot",   desc: "Sync conversations with HubSpot CRM", connected: false, icon: "🔶" },
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
    </div>
  )
}
