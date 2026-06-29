"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Filter, Megaphone, Mail, Users, BarChart2,
  TrendingUp, Calendar, DollarSign, MoreHorizontal, Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

type CampaignStatus = "Draft" | "Scheduled" | "Active" | "Paused" | "Completed"
type CampaignType = "Email" | "Event" | "Social" | "PPC" | "Content" | "Direct Mail"

interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  leadsGenerated: number
  cost: number
  revenue: number
  roi: number
  owner: string
}

const CAMPAIGNS: Campaign[] = [
  { id: "c1",  name: "Q3 Enterprise Nurture Series",     type: "Email",      status: "Active",    startDate: "2026-06-01", endDate: "2026-08-31", leadsGenerated: 142, cost: 2400,  revenue: 185000, roi: 7608, owner: "Alex Turner" },
  { id: "c2",  name: "FinTech Summit 2026 Sponsorship",  type: "Event",      status: "Scheduled", startDate: "2026-07-15", endDate: "2026-07-17", leadsGenerated: 0,   cost: 12000, revenue: 0,      roi: 0,    owner: "Sarah Mitchell" },
  { id: "c3",  name: "LinkedIn Thought Leadership",      type: "Social",     status: "Active",    startDate: "2026-05-01", endDate: "2026-08-31", leadsGenerated: 89,  cost: 1800,  revenue: 42000,  roi: 2233, owner: "James Park" },
  { id: "c4",  name: "Google Ads — CRM Software",        type: "PPC",        status: "Active",    startDate: "2026-04-01", endDate: "2026-12-31", leadsGenerated: 318, cost: 8500,  revenue: 230000, roi: 2606, owner: "Alex Turner" },
  { id: "c5",  name: "CRM Whitepaper Download",          type: "Content",    status: "Active",    startDate: "2026-03-01", endDate: "2026-09-30", leadsGenerated: 204, cost: 3200,  revenue: 95000,  roi: 2869, owner: "Sarah Mitchell" },
  { id: "c6",  name: "Enterprise Prospect Mailer",       type: "Direct Mail",status: "Completed", startDate: "2026-05-01", endDate: "2026-05-31", leadsGenerated: 47,  cost: 5600,  revenue: 62000,  roi: 1007, owner: "James Park" },
  { id: "c7",  name: "Mid-Market Welcome Series",        type: "Email",      status: "Active",    startDate: "2026-06-10", endDate: "2026-07-31", leadsGenerated: 68,  cost: 1100,  revenue: 38000,  roi: 3354, owner: "Alex Turner" },
  { id: "c8",  name: "SaaStr Conference 2026",           type: "Event",      status: "Completed", startDate: "2026-04-20", endDate: "2026-04-22", leadsGenerated: 93,  cost: 9800,  revenue: 125000, roi: 1175, owner: "Sarah Mitchell" },
  { id: "c9",  name: "Twitter/X Brand Awareness",        type: "Social",     status: "Paused",    startDate: "2026-03-15", endDate: "2026-06-30", leadsGenerated: 31,  cost: 900,   revenue: 12000,  roi: 1233, owner: "James Park" },
  { id: "c10", name: "Bing Ads — Enterprise Software",   type: "PPC",        status: "Active",    startDate: "2026-05-01", endDate: "2026-12-31", leadsGenerated: 87,  cost: 3200,  revenue: 56000,  roi: 1650, owner: "Alex Turner" },
  { id: "c11", name: "Customer Success Stories Blog",    type: "Content",    status: "Active",    startDate: "2026-01-01", endDate: "2026-12-31", leadsGenerated: 156, cost: 2800,  revenue: 78000,  roi: 2686, owner: "Sarah Mitchell" },
  { id: "c12", name: "Q2 Win-Back Campaign",             type: "Email",      status: "Completed", startDate: "2026-04-01", endDate: "2026-05-31", leadsGenerated: 29,  cost: 800,   revenue: 22000,  roi: 2650, owner: "James Park" },
  { id: "c13", name: "Startup Accelerator Partnership",  type: "Event",      status: "Active",    startDate: "2026-06-01", endDate: "2026-12-31", leadsGenerated: 41,  cost: 4500,  revenue: 31000,  roi: 589,  owner: "Alex Turner" },
  { id: "c14", name: "Product Hunt Launch",              type: "Social",     status: "Draft",     startDate: "2026-07-01", endDate: "2026-07-15", leadsGenerated: 0,   cost: 0,     revenue: 0,      roi: 0,    owner: "Sarah Mitchell" },
  { id: "c15", name: "Industry Report — CRM Trends",     type: "Content",    status: "Draft",     startDate: "2026-07-01", endDate: "2026-09-30", leadsGenerated: 0,   cost: 4200,  revenue: 0,      roi: 0,    owner: "James Park" },
]

const statusColors: Record<CampaignStatus, string> = {
  Draft: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Scheduled: "bg-blue-100 text-blue-700",
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Completed: "bg-violet-100 text-violet-700",
}

const typeIcons: Record<CampaignType, React.ReactNode> = {
  Email:       <Mail className="h-3.5 w-3.5" />,
  Event:       <Calendar className="h-3.5 w-3.5" />,
  Social:      <Users className="h-3.5 w-3.5" />,
  PPC:         <BarChart2 className="h-3.5 w-3.5" />,
  Content:     <Megaphone className="h-3.5 w-3.5" />,
  "Direct Mail": <Filter className="h-3.5 w-3.5" />,
}

const typeColors: Record<CampaignType, string> = {
  Email: "bg-blue-100 text-blue-700",
  Event: "bg-violet-100 text-violet-700",
  Social: "bg-[var(--accent)]/10 text-[var(--accent)]",
  PPC: "bg-amber-100 text-amber-700",
  Content: "bg-emerald-100 text-emerald-700",
  "Direct Mail": "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

export default function CampaignsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = CAMPAIGNS.filter(c => {
    if (typeFilter !== "all" && c.type !== typeFilter) return false
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const active = CAMPAIGNS.filter(c => c.status === "Active").length
  const totalLeads = CAMPAIGNS.reduce((s, c) => s + c.leadsGenerated, 0)
  const totalRevenue = CAMPAIGNS.reduce((s, c) => s + c.revenue, 0)
  const avgRoi = Math.round(CAMPAIGNS.filter(c => c.roi > 0).reduce((s, c) => s + c.roi, 0) / CAMPAIGNS.filter(c => c.roi > 0).length)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Campaigns</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Track and manage all marketing campaigns</p>
          </div>
          <Button size="sm" className="h-9 text-sm" asChild>
            <Link href="/app/crm/campaigns/new"><Plus className="h-4 w-4 mr-2" />New Campaign</Link>
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Active Campaigns", value: String(active), icon: Megaphone, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
            { label: "Total Leads Generated", value: String(totalLeads), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Total Pipeline from Campaigns", value: formatCurrency(totalRevenue), icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Average ROI", value: `${avgRoi}%`, icon: BarChart2, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
              <div className={cn("p-2 rounded-lg", m.bg)}>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <div>
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">{m.label}</p>
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
              placeholder="Search campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs w-52"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {["Email", "Event", "Social", "PPC", "Content", "Direct Mail"].map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {["Draft", "Scheduled", "Active", "Paused", "Completed"].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-6">
        <Card className="border border-[var(--border)]">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  {["Name", "Type", "Status", "Start Date", "End Date", "Leads", "Cost", "Revenue", "ROI", "Owner", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-[var(--muted)]/50 group">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/campaigns/${c.id}`} className="font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium", typeColors[c.type])}>
                        {typeIcons[c.type]}{c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[c.status])}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(c.startDate)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(c.endDate)}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-sm">{c.leadsGenerated > 0 ? c.leadsGenerated : "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.cost > 0 ? formatCurrency(c.cost) : "—"}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[var(--foreground)]">{c.revenue > 0 ? formatCurrency(c.revenue) : "—"}</td>
                    <td className="px-4 py-3">
                      {c.roi > 0 ? (
                        <span className={cn("text-xs font-semibold", c.roi >= 1000 ? "text-emerald-600" : "text-[var(--foreground)]")}>
                          {c.roi}%
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.owner}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href={`/app/crm/campaigns/${c.id}`}><Eye className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Megaphone className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
                <p className="text-sm text-[var(--muted-foreground)]">No campaigns match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
