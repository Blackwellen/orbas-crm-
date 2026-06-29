"use client"

import React, { useState } from "react"
import { Plus, ToggleLeft, ToggleRight, Calendar } from "lucide-react"

const initialReports = [
  { id: "1", name: "Weekly Revenue Summary",    schedule: "Weekly",  recipients: "exec@orbas.io, cfo@orbas.io",         lastSent: "Mon 9 Jun 08:00",  nextSend: "Mon 16 Jun 08:00",  active: true  },
  { id: "2", name: "Daily Deals Digest",        schedule: "Daily",   recipients: "sales@orbas.io",                      lastSent: "10 Jun 07:00",      nextSend: "11 Jun 07:00",       active: true  },
  { id: "3", name: "Monthly Board Pack",        schedule: "Monthly", recipients: "board@orbas.io",                      lastSent: "1 Jun 09:00",       nextSend: "1 Jul 09:00",        active: true  },
  { id: "4", name: "Pipeline Health Report",    schedule: "Weekly",  recipients: "vp-sales@orbas.io",                   lastSent: "Mon 9 Jun 08:30",  nextSend: "Mon 16 Jun 08:30",  active: true  },
  { id: "5", name: "Customer Support Metrics",  schedule: "Daily",   recipients: "support-mgr@orbas.io",                lastSent: "10 Jun 07:30",      nextSend: "11 Jun 07:30",       active: false },
  { id: "6", name: "Marketing Attribution",     schedule: "Monthly", recipients: "cmo@orbas.io, marketing@orbas.io",    lastSent: "1 Jun 10:00",       nextSend: "1 Jul 10:00",        active: true  },
  { id: "7", name: "HR Headcount Update",       schedule: "Weekly",  recipients: "hr@orbas.io",                         lastSent: "Mon 9 Jun 09:00",  nextSend: "Mon 16 Jun 09:00",  active: false },
]

const scheduleColors: Record<string, string> = {
  Daily:   "bg-blue-100 text-blue-700",
  Weekly:  "bg-violet-100 text-violet-700",
  Monthly: "bg-amber-100 text-amber-700",
}

export default function ScheduledReportsPage() {
  const [reports, setReports] = useState(initialReports)

  function toggleActive(id: string) {
    setReports(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Scheduled Reports</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Automate report delivery to stakeholders</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" />
          Schedule Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Scheduled",  value: reports.length.toString() },
          { label: "Active",           value: reports.filter(r => r.active).toString() },
          { label: "Sent This Month",  value: "24" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-2xl font-bold mt-1 text-[var(--foreground)]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Report Name</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Schedule</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Recipients</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Last Sent</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Next Send</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-[var(--muted)] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span className="font-medium text-[var(--foreground)]">{r.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${scheduleColors[r.schedule]}`}>
                    {r.schedule}
                  </span>
                </td>
                <td className="px-5 py-4 text-[var(--muted-foreground)] text-xs max-w-[200px] truncate">{r.recipients}</td>
                <td className="px-5 py-4 text-[var(--muted-foreground)] text-xs">{r.lastSent}</td>
                <td className="px-5 py-4 text-[var(--muted-foreground)] text-xs">{r.nextSend}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${r.active ? "bg-emerald-100 text-emerald-700" : "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>
                    {r.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggleActive(r.id)} className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                    {r.active
                      ? <><ToggleRight className="h-4 w-4 text-emerald-500" />Disable</>
                      : <><ToggleLeft className="h-4 w-4" />Enable</>
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
