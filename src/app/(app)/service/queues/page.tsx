"use client"

import React from "react"
import Link from "next/link"
import { Layers, Plus, Users, Clock, Ticket, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const QUEUES = [
  {
    id: "1",
    name: "Enterprise",
    team: "Enterprise Support",
    description: "High-priority tickets from enterprise-tier customers",
    open: 18,
    avgResolution: "3.2h",
    sla: "1h response / 8h resolution",
    members: 4,
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: "2",
    name: "Technical",
    team: "Engineering Support",
    description: "Technical bugs, API issues, and integration failures",
    open: 27,
    avgResolution: "5.8h",
    sla: "2h response / 24h resolution",
    members: 6,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "3",
    name: "General",
    team: "Customer Success",
    description: "General support requests and how-to questions",
    open: 31,
    avgResolution: "2.1h",
    sla: "4h response / 48h resolution",
    members: 8,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "4",
    name: "Billing",
    team: "Finance Support",
    description: "Invoice queries, subscription changes, and payment issues",
    open: 8,
    avgResolution: "1.4h",
    sla: "2h response / 12h resolution",
    members: 3,
    color: "bg-amber-100 text-amber-700",
  },
]

export default function QueuesPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Queues</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage ticket routing and team assignment</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <Plus className="h-4 w-4" /> Create Queue
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Queues",    value: QUEUES.length,                                     color: "text-[var(--foreground)]" },
          { label: "Open Tickets",    value: QUEUES.reduce((s, q) => s + q.open, 0),             color: "text-blue-600" },
          { label: "Total Agents",    value: QUEUES.reduce((s, q) => s + q.members, 0),          color: "text-emerald-600" },
          { label: "Active Policies", value: 4,                                                  color: "text-violet-600" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)] font-medium">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Queue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {QUEUES.map(queue => (
          <Card key={queue.id} className="border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{queue.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">{queue.team}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${queue.color}`}>
                  {queue.open} open
                </span>
              </div>

              <p className="text-sm text-[var(--muted-foreground)] mb-4">{queue.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center rounded-md bg-[var(--muted)] p-2.5">
                  <Ticket className="h-4 w-4 text-[var(--muted-foreground)] mx-auto mb-1" />
                  <p className="text-sm font-bold text-[var(--foreground)]">{queue.open}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Open</p>
                </div>
                <div className="text-center rounded-md bg-[var(--muted)] p-2.5">
                  <Clock className="h-4 w-4 text-[var(--muted-foreground)] mx-auto mb-1" />
                  <p className="text-sm font-bold text-[var(--foreground)]">{queue.avgResolution}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Avg Resolve</p>
                </div>
                <div className="text-center rounded-md bg-[var(--muted)] p-2.5">
                  <Users className="h-4 w-4 text-[var(--muted-foreground)] mx-auto mb-1" />
                  <p className="text-sm font-bold text-[var(--foreground)]">{queue.members}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Agents</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                <div>
                  <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide font-medium">SLA Policy</p>
                  <p className="text-xs text-[var(--foreground)] mt-0.5">{queue.sla}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/app/service/queues/${queue.id}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
                    Manage
                  </Link>
                  <button className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1.5 text-xs text-[var(--muted-foreground)] hover:bg-[var(--secondary)]">
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
