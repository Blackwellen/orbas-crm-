"use client"

import React, { useState } from "react"
import { Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsSettingsPage() {
  const [autoDelete, setAutoDelete] = useState("30")
  const [versionHistory, setVersionHistory] = useState(true)
  const [watermark, setWatermark] = useState(false)

  return (
    <div className="p-6 space-y-6 max-w-[800px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Documents Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure document storage and sharing preferences</p>
      </div>

      <Card className="border border-[var(--border)]">
        <CardHeader><CardTitle className="text-sm">Storage & Retention</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Auto-delete trash after (days)</label>
            <input type="number" value={autoDelete} onChange={e => setAutoDelete(e.target.value)}
              className="w-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)]">Version History</p>
              <p className="text-xs text-[var(--muted-foreground)]">Keep version history for all documents</p>
            </div>
            <button onClick={() => setVersionHistory(!versionHistory)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ background: versionHistory ? "var(--primary)" : "var(--border)" }}>
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${versionHistory ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--foreground)]">Watermark on Shared Documents</p>
              <p className="text-xs text-[var(--muted-foreground)]">Apply a watermark to documents shared externally</p>
            </div>
            <button onClick={() => setWatermark(!watermark)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ background: watermark ? "var(--primary)" : "var(--border)" }}>
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${watermark ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </CardContent>
      </Card>

      <Card className="border border-[var(--border)]">
        <CardHeader><CardTitle className="text-sm">Sharing Permissions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Allow external sharing", desc: "Let users share documents with external email addresses", enabled: true },
            { label: "Require sign-in to view", desc: "External viewers must sign in to access shared documents", enabled: false },
            { label: "Allow download of shared files", desc: "Viewers can download documents shared with them", enabled: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <div>
                <p className="text-sm text-[var(--foreground)]">{s.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{s.desc}</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0"
                style={{ background: s.enabled ? "var(--primary)" : "var(--border)" }}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
