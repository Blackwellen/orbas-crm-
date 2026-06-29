"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  Plus, Search, Download, Upload, MoreHorizontal, Eye, Edit,
  Archive, Trash2, X, ChevronLeft, ChevronRight, LayoutList, Kanban
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils"

interface Deal {
  id: string
  name: string
  account: string
  accountId: string
  stage: string
  value: number
  probability: number
  owner: string
  closeDate: string
  lastActivity: string
}

const DEALS: Deal[] = [
  { id: "1",  name: "Enterprise SaaS Rollout",   account: "Fintech Corp Ltd",     accountId: "1", stage: "Proposal",     value: 95000, probability: 65, owner: "Alex Turner",    closeDate: "2026-06-30", lastActivity: "2026-06-09" },
  { id: "2",  name: "CRM Implementation",         account: "BlueWave Digital",     accountId: "2", stage: "Negotiation",  value: 82000, probability: 75, owner: "Sarah Mitchell", closeDate: "2026-07-15", lastActivity: "2026-06-08" },
  { id: "3",  name: "Data Analytics Suite",       account: "Prism Analytics",      accountId: "8", stage: "Qualification",value: 48000, probability: 45, owner: "James Park",     closeDate: "2026-07-22", lastActivity: "2026-06-07" },
  { id: "4",  name: "Cloud Migration Pack",       account: "TechGrid Ltd",         accountId: "4", stage: "Prospecting",  value: 67000, probability: 30, owner: "Chloe Evans",    closeDate: "2026-07-31", lastActivity: "2026-06-06" },
  { id: "5",  name: "Digital Transformation",     account: "Sandstone Corp",       accountId: "5", stage: "Proposal",     value: 55000, probability: 60, owner: "Tom Bradley",    closeDate: "2026-08-05", lastActivity: "2026-06-05" },
  { id: "6",  name: "Marketing Automation",       account: "Oakfield Media",       accountId: "6", stage: "Closing",      value: 38000, probability: 90, owner: "Alex Turner",    closeDate: "2026-06-12", lastActivity: "2026-06-04" },
  { id: "7",  name: "Security Audit Bundle",      account: "Vertex Solutions",     accountId: "3", stage: "Qualification",value: 42000, probability: 50, owner: "Sarah Mitchell", closeDate: "2026-07-20", lastActivity: "2026-06-03" },
  { id: "8",  name: "Platform Upgrade",           account: "NovaBuild Group",      accountId:"10", stage: "Negotiation",  value: 72000, probability: 80, owner: "James Park",     closeDate: "2026-06-28", lastActivity: "2026-06-02" },
  { id: "9",  name: "CMS Integration",            account: "Hartfield & Co",       accountId: "9", stage: "Closing",      value: 27000, probability: 95, owner: "Chloe Evans",    closeDate: "2026-06-10", lastActivity: "2026-06-01" },
  { id: "10", name: "Analytics Dashboard",        account: "Crestview Labs",       accountId: "7", stage: "Proposal",     value: 34000, probability: 55, owner: "Tom Bradley",    closeDate: "2026-08-18", lastActivity: "2026-05-30" },
  { id: "11", name: "AI Chatbot Integration",     account: "RapidFlow Systems",    accountId:"11", stage: "Prospecting",  value: 29000, probability: 25, owner: "Alex Turner",    closeDate: "2026-09-01", lastActivity: "2026-05-29" },
  { id: "12", name: "Infrastructure Overhaul",    account: "Gridpoint Technologies",accountId:"12",stage: "Qualification",value: 90000, probability: 40, owner: "Sarah Mitchell", closeDate: "2026-08-30", lastActivity: "2026-05-28" },
]

const STAGES = ["Prospecting","Qualification","Proposal","Negotiation","Closing"]

const stageColors: Record<string, string> = {
  Prospecting:   "bg-slate-100 text-slate-700",
  Qualification: "bg-blue-100 text-blue-700",
  Proposal:      "bg-violet-100 text-violet-700",
  Negotiation:   "bg-amber-100 text-amber-700",
  Closing:       "bg-emerald-100 text-emerald-700",
}

export default function DealsPage() {
  const [view, setView] = useState<"table" | "kanban">("table")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [deals, setDeals] = useState<any[]>(DEALS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("deals").select("*, contacts(*), accounts(*)").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setDeals(data.map(d => ({
          ...d,
          name: d.name ?? d.title,
          account: d.account ?? d.accounts?.name ?? "",
          accountId: d.accountId ?? d.account_id ?? "",
          closeDate: d.closeDate ?? d.expected_close_date ?? "",
          lastActivity: d.lastActivity ?? d.updated_at ?? d.created_at,
        })))
      })
  }, [])

  const filtered = deals.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.account.toLowerCase().includes(search.toLowerCase())
    const matchStage = stageFilter === "all" || d.stage === stageFilter
    return matchSearch && matchStage
  })

  const byStage = STAGES.map(stage => ({
    stage,
    deals: filtered.filter(d => d.stage === stage),
    total: filtered.filter(d => d.stage === stage).reduce((s, d) => s + d.value, 0),
  }))

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Deals</h1>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{filtered.length}</span>
          {loading && <span className="text-xs text-[var(--muted-foreground)]">Loading…</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm" asChild><Link href="/app/crm/deals/new"><Plus className="h-4 w-4 mr-1.5" />New Deal</Link></Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input placeholder="Search deals…" className="pl-8 h-8 text-sm w-60" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="h-8 text-sm w-40"><SelectValue placeholder="Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        {(stageFilter !== "all" || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setStageFilter("all"); setSearch("") }}>
            <X className="h-3.5 w-3.5 mr-1" />Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant={view === "table" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("table")}><LayoutList className="h-4 w-4" /></Button>
          <Button variant={view === "kanban" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("kanban")}><Kanban className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Table */}
      {view === "table" && (
        <div className="rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 w-10">
                    <Checkbox checked={selected.size === filtered.length && filtered.length > 0}
                      onCheckedChange={() => selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(d => d.id)))} />
                  </th>
                  {["Deal Name","Account","Stage","Value","Probability","Owner","Close Date","Last Activity",""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(d => (
                  <tr key={d.id} className={cn("hover:bg-[var(--muted)]/50 transition-colors", selected.has(d.id) && "bg-[var(--primary)]/5")}>
                    <td className="px-4 py-3">
                      <Checkbox checked={selected.has(d.id)} onCheckedChange={() => setSelected(p => { const n = new Set(p); n.has(d.id) ? n.delete(d.id) : n.add(d.id); return n })} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/deals/${d.id}`} className="font-medium text-[var(--primary)] hover:underline whitespace-nowrap">{d.name}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/accounts/${d.accountId}`} className="text-xs text-[var(--foreground)] hover:text-[var(--primary)] whitespace-nowrap">{d.account}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", stageColors[d.stage])}>{d.stage}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)] text-right whitespace-nowrap">{formatCurrency(d.value)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={d.probability} className="h-1.5 w-16" />
                        <span className="text-xs text-[var(--muted-foreground)] w-8">{d.probability}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(d.owner)}</AvatarFallback></Avatar>
                        <span className="text-xs text-[var(--muted-foreground)]">{d.owner.split(" ")[0]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(d.closeDate)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(d.lastActivity)}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild><Link href={`/app/crm/deals/${d.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Archive className="h-3.5 w-3.5 mr-2" />Archive</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kanban */}
      {view === "kanban" && (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-[900px]">
            {byStage.map(col => (
              <div key={col.stage} className="flex-1 min-w-[200px]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">{col.stage}</span>
                    <span className="ml-1.5 text-xs text-[var(--muted-foreground)]">({col.deals.length})</span>
                  </div>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">{formatCurrency(col.total)}</span>
                </div>
                <div className="space-y-2">
                  {col.deals.map(d => (
                    <Link key={d.id} href={`/app/crm/deals/${d.id}`}>
                      <Card className="border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-sm transition-all cursor-pointer">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium text-[var(--foreground)] mb-1 leading-snug">{d.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mb-2">{d.account}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[var(--foreground)]">{formatCurrency(d.value)}</span>
                            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                              d.probability >= 70 ? "bg-emerald-100 text-emerald-700" :
                              d.probability >= 40 ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-600"
                            )}>{d.probability}%</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Avatar className="h-5 w-5"><AvatarFallback className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(d.owner)}</AvatarFallback></Avatar>
                            <span className="text-[10px] text-[var(--muted-foreground)]">{formatDate(d.closeDate)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {col.deals.length === 0 && (
                    <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center">
                      <p className="text-xs text-[var(--muted-foreground)]">No deals</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "table" && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-[var(--muted-foreground)]">Showing 1–{filtered.length} of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8" disabled><ChevronLeft className="h-4 w-4" />Previous</Button>
            <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs">1</Button>
            <Button variant="outline" size="sm" className="h-8" disabled>Next<ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  )
}
