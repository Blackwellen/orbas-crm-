"use client"

import React, { useState } from "react"
import { Plus, Edit2, GripVertical, ToggleLeft, ToggleRight, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const RULES = [
  {
    id: 1, name: "VIP Customer Fast Track", priority: 1,
    conditions: [{ type: "Customer tag", value: "VIP" }],
    action: "Assign to team: Enterprise Support",
    active: true,
  },
  {
    id: 2, name: "Critical Keywords — Escalate", priority: 2,
    conditions: [{ type: "Keywords contain", value: "urgent, down, broken, critical" }],
    action: "Assign to agent: On-call Engineer",
    active: true,
  },
  {
    id: 3, name: "Email — Sales Funnel", priority: 3,
    conditions: [{ type: "Channel is", value: "Email" }, { type: "Keywords contain", value: "pricing, plan, upgrade" }],
    action: "Assign to team: Sales",
    active: true,
  },
  {
    id: 4, name: "Outside Business Hours Auto-Reply", priority: 4,
    conditions: [{ type: "Time is", value: "Outside 9:00–17:00 Mon–Fri" }],
    action: "Send auto-reply: We are currently offline",
    active: true,
  },
  {
    id: 5, name: "Live Chat — Technical Support", priority: 5,
    conditions: [{ type: "Channel is", value: "Live Chat" }, { type: "Keywords contain", value: "API, integration, error, bug" }],
    action: "Assign to team: Technical Support",
    active: true,
  },
  {
    id: 6, name: "Twitter/X Mentions — Social Team", priority: 6,
    conditions: [{ type: "Channel is", value: "Twitter/X" }],
    action: "Assign to team: Social Media",
    active: false,
  },
  {
    id: 7, name: "Tag Billing Queries", priority: 7,
    conditions: [{ type: "Keywords contain", value: "invoice, billing, payment, charge" }],
    action: "Add tag: billing",
    active: true,
  },
]

export default function RoutingPage() {
  const [rules, setRules] = useState(RULES)

  function toggleRule(id: number) {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, active: !rule.active } : rule))
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Routing Rules</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Automatically route conversations based on conditions</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" /> New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Rules",    value: String(rules.filter(r => r.active).length), color: "#16a34a" },
          { label: "Inactive Rules",  value: String(rules.filter(r => !r.active).length), color: "#6b7280" },
          { label: "Total Rules",     value: String(rules.length), color: "#1a56db" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rules */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Rules (ordered by priority)</CardTitle>
          <span className="text-xs text-[var(--muted-foreground)]">Drag to reorder · Higher priority rules run first</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--border)]">
            {rules.map(rule => (
              <div key={rule.id}
                className={`flex items-start gap-3 px-4 py-4 hover:bg-[var(--secondary)] transition-colors ${!rule.active ? "opacity-60" : ""}`}>
                <button className="mt-0.5 text-[var(--muted-foreground)] cursor-grab active:cursor-grabbing">
                  <GripVertical className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-[var(--muted-foreground)] mt-1 w-4 shrink-0">{rule.priority}</span>

                <div className="flex-1 space-y-2">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{rule.name}</p>

                  {/* Conditions */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#1a56db" }}>IF</span>
                    {rule.conditions.map((cond, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="text-xs text-[var(--muted-foreground)] font-semibold">AND</span>}
                        <span className="inline-flex items-center rounded-full bg-[var(--secondary)] border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                          <span className="text-[var(--muted-foreground)] mr-1">{cond.type}:</span>
                          <span className="font-medium">{cond.value}</span>
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#16a34a" }}>THEN</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--secondary)] border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                      <Zap className="h-3 w-3 text-[var(--muted-foreground)]" />
                      {rule.action}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 mt-0.5">
                  <button onClick={() => toggleRule(rule.id)}>
                    {rule.active
                      ? <ToggleRight className="h-5 w-5" style={{ color: "#16a34a" }} />
                      : <ToggleLeft className="h-5 w-5 text-[var(--muted-foreground)]" />}
                  </button>
                  <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
