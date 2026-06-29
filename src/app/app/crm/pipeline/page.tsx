"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Plus, Filter, LayoutGrid, List, ChevronDown, MoreHorizontal,
  TrendingUp, DollarSign, Target, Users, Clock, Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, formatCurrency, getInitials } from "@/lib/utils"

type Stage = "Prospecting" | "Qualification" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"

interface Deal {
  id: string
  name: string
  account: string
  value: number
  owner: string
  probability: number
  daysInStage: number
  stage: Stage
  closeDate: string
  avatar?: string
}

const DEALS: Deal[] = [
  { id: "d1",  name: "Retail Analytics Platform",    account: "Currys PLC",          value: 42000,  owner: "Alex Turner",    probability: 20, daysInStage: 3,  stage: "Prospecting",  closeDate: "2026-09-30" },
  { id: "d2",  name: "Cloud Migration Starter",       account: "Specsavers UK",       value: 18500,  owner: "Sarah Mitchell", probability: 25, daysInStage: 7,  stage: "Prospecting",  closeDate: "2026-10-15" },
  { id: "d3",  name: "HR System Integration",         account: "John Lewis & Partners",value: 31000,  owner: "James Park",     probability: 30, daysInStage: 2,  stage: "Prospecting",  closeDate: "2026-10-01" },
  { id: "d4",  name: "Data Analytics Suite",          account: "Fintech Corp Ltd",    value: 48000,  owner: "James Park",     probability: 40, daysInStage: 11, stage: "Qualification", closeDate: "2026-09-15" },
  { id: "d5",  name: "CRM Upgrade Project",           account: "Lloyds Banking Group",value: 125000, owner: "Alex Turner",    probability: 45, daysInStage: 6,  stage: "Qualification", closeDate: "2026-08-31" },
  { id: "d6",  name: "Digital Workplace Suite",       account: "NHS Digital",         value: 210000, owner: "Sarah Mitchell", probability: 50, daysInStage: 9,  stage: "Qualification", closeDate: "2026-09-30" },
  { id: "d7",  name: "Enterprise SaaS Rollout",       account: "Fintech Corp Ltd",    value: 95000,  owner: "Alex Turner",    probability: 65, daysInStage: 14, stage: "Proposal",     closeDate: "2026-08-31" },
  { id: "d8",  name: "E-Commerce Integration",        account: "ASOS Ltd",            value: 67000,  owner: "James Park",     probability: 60, daysInStage: 5,  stage: "Proposal",     closeDate: "2026-09-01" },
  { id: "d9",  name: "B2B Portal Rebuild",            account: "Unilever UK",         value: 88000,  owner: "Sarah Mitchell", probability: 55, daysInStage: 8,  stage: "Proposal",     closeDate: "2026-08-15" },
  { id: "d10", name: "Security Compliance Suite",     account: "Barclays PLC",        value: 155000, owner: "Alex Turner",    probability: 75, daysInStage: 3,  stage: "Negotiation",  closeDate: "2026-07-31" },
  { id: "d11", name: "API Platform Rollout",          account: "Sky Group",           value: 72000,  owner: "James Park",     probability: 80, daysInStage: 12, stage: "Negotiation",  closeDate: "2026-07-20" },
  { id: "d12", name: "SaaS Consolidation Deal",       account: "Tesco Stores Ltd",    value: 198000, owner: "Sarah Mitchell", probability: 70, daysInStage: 7,  stage: "Negotiation",  closeDate: "2026-07-15" },
  { id: "d13", name: "Full CRM Rollout",              account: "BP PLC",              value: 310000, owner: "Alex Turner",    probability: 100, daysInStage: 0, stage: "Closed Won",   closeDate: "2026-06-01" },
  { id: "d14", name: "Cloud ERP Migration",           account: "Vodafone UK",         value: 145000, owner: "James Park",     probability: 100, daysInStage: 0, stage: "Closed Won",   closeDate: "2026-05-15" },
  { id: "d15", name: "Legacy System Decommission",    account: "BT Group",            value: 55000,  owner: "Sarah Mitchell", probability: 0,  daysInStage: 0,  stage: "Closed Lost",  closeDate: "2026-05-01" },
  { id: "d16", name: "SaaS Bundle Renewal",           account: "Aviva PLC",           value: 38000,  owner: "Alex Turner",    probability: 0,  daysInStage: 0,  stage: "Closed Lost",  closeDate: "2026-04-30" },
]

const STAGE_CONFIG = [
  { key: "Prospecting" as Stage,  label: "Prospecting",  color: "border-t-[var(--muted-foreground)]", badge: "bg-[var(--muted)] text-[var(--muted-foreground)]", dot: "bg-[var(--muted-foreground)]" },
  { key: "Qualification" as Stage,label: "Qualification", color: "border-t-blue-500",   badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-500" },
  { key: "Proposal" as Stage,     label: "Proposal",      color: "border-t-violet-500", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  { key: "Negotiation" as Stage,  label: "Negotiation",   color: "border-t-amber-500",  badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { key: "Closed Won" as Stage,   label: "Closed Won",    color: "border-t-emerald-500",badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  { key: "Closed Lost" as Stage,  label: "Closed Lost",   color: "border-t-red-500",    badge: "bg-red-100 text-red-700",    dot: "bg-red-500" },
]

export default function PipelinePage() {
  const router = useRouter()
  const [view, setView] = useState<"kanban" | "table">("kanban")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [searchQ, setSearchQ] = useState("")

  const filtered = DEALS.filter(d => {
    if (ownerFilter !== "all" && d.owner !== ownerFilter) return false
    if (searchQ && !d.name.toLowerCase().includes(searchQ.toLowerCase()) && !d.account.toLowerCase().includes(searchQ.toLowerCase())) return false
    return true
  })

  const totalPipeline = filtered.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").reduce((s, d) => s + d.value, 0)
  const weighted = filtered.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").reduce((s, d) => s + d.value * d.probability / 100, 0)
  const wonValue = filtered.filter(d => d.stage === "Closed Won").reduce((s, d) => s + d.value, 0)
  const activeCount = filtered.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").length

  const stageColors: Record<Stage, string> = {
    "Prospecting": "bg-[var(--muted)] text-[var(--muted-foreground)]",
    "Qualification": "bg-blue-100 text-blue-700",
    "Proposal": "bg-violet-100 text-violet-700",
    "Negotiation": "bg-amber-100 text-amber-700",
    "Closed Won": "bg-emerald-100 text-emerald-700",
    "Closed Lost": "bg-red-100 text-red-700",
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Pipeline</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Manage and track your deals across all stages</p>
          </div>
          <Button size="sm" className="h-9 text-sm">
            <Plus className="h-4 w-4 mr-2" />New Deal
          </Button>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Total Pipeline", value: formatCurrency(totalPipeline), icon: TrendingUp, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
            { label: "Weighted Value", value: formatCurrency(Math.round(weighted)), icon: Target, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Closed Won (YTD)", value: formatCurrency(wonValue), icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Deals", value: String(activeCount), icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
              <div className={cn("p-2 rounded-lg", m.bg)}>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{m.label}</p>
                <p className="text-base font-bold text-[var(--foreground)]">{m.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <Input
              placeholder="Search deals..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="h-8 pl-8 text-xs w-48"
            />
          </div>
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="h-8 text-xs w-40">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="Alex Turner">Alex Turner</SelectItem>
              <SelectItem value="Sarah Mitchell">Sarah Mitchell</SelectItem>
              <SelectItem value="James Park">James Park</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 text-xs w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="next-quarter">Next Quarter</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-1 border border-[var(--border)] rounded-md overflow-hidden">
            <button
              onClick={() => setView("kanban")}
              className={cn("px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors",
                view === "kanban" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />Kanban
            </button>
            <button
              onClick={() => setView("table")}
              className={cn("px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors",
                view === "table" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              )}
            >
              <List className="h-3.5 w-3.5" />Table
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      {view === "kanban" && (
        <div className="overflow-x-auto">
          <div className="flex gap-4 p-6 min-w-max">
            {STAGE_CONFIG.map(stage => {
              const stageDeals = filtered.filter(d => d.stage === stage.key)
              const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0)
              return (
                <div key={stage.key} className="w-72 shrink-0">
                  {/* Column Header */}
                  <div className={cn("bg-[var(--card)] border border-[var(--border)] rounded-t-lg px-3 py-2.5 border-t-4", stage.color)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--foreground)]">{stage.label}</span>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-semibold", stage.badge)}>
                          {stageDeals.length}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Plus className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                      </Button>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{formatCurrency(stageTotal)}</p>
                  </div>

                  {/* Cards */}
                  <div className="bg-[var(--muted)]/40 border border-t-0 border-[var(--border)] rounded-b-lg p-2 space-y-2 min-h-[200px]">
                    {stageDeals.map(deal => (
                      <Link key={deal.id} href={`/app/crm/deals/${deal.id}`}>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--primary)] transition-colors">{deal.name}</p>
                              <p className="text-[10px] text-[var(--muted-foreground)] truncate">{deal.account}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 shrink-0 ml-1">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--foreground)]">{formatCurrency(deal.value)}</span>
                            <span className="text-[10px] text-[var(--muted-foreground)]">{deal.probability}%</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[8px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(deal.owner)}</AvatarFallback>
                              </Avatar>
                              <span className="text-[10px] text-[var(--muted-foreground)]">{deal.owner.split(" ")[0]}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]">
                              <Clock className="h-3 w-3" />
                              {deal.daysInStage > 0 ? `${deal.daysInStage}d` : "Today"}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-xs text-[var(--muted-foreground)]">
                        No deals in this stage
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="px-6 py-6">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Deal Name", "Account", "Stage", "Value", "Probability", "Owner", "Days in Stage", "Close Date"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.map(deal => (
                    <tr key={deal.id} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3">
                        <Link href={`/app/crm/deals/${deal.id}`} className="font-medium text-[var(--primary)] hover:underline">{deal.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{deal.account}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", stageColors[deal.stage])}>{deal.stage}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{formatCurrency(deal.value)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[var(--muted)] rounded-full h-1.5">
                            <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: `${deal.probability}%` }} />
                          </div>
                          <span className="text-xs text-[var(--muted-foreground)]">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[8px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(deal.owner)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-[var(--muted-foreground)]">{deal.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">
                        {deal.daysInStage > 0 ? `${deal.daysInStage} days` : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{deal.closeDate}</td>
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
