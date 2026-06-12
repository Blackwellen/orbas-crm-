"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Mail, Users, Play, Pause, Edit2,
  MoreHorizontal, CheckCircle, MessageSquare, Clock,
  TrendingUp, BarChart2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn, formatDate } from "@/lib/utils"

type SequenceStatus = "Active" | "Paused" | "Draft"

interface Sequence {
  id: string
  name: string
  steps: number
  activeContacts: number
  enrolled: number
  completed: number
  replyRate: number
  openRate: number
  status: SequenceStatus
  created: string
  owner: string
  type: string
}

const SEQUENCES: Sequence[] = [
  { id: "s1",  name: "Enterprise Follow-Up Series",         steps: 7,  activeContacts: 84,  enrolled: 312, completed: 228, replyRate: 18.4, openRate: 44.2, status: "Active", created: "2026-05-01", owner: "Alex Turner",    type: "Follow-up" },
  { id: "s2",  name: "New Lead Onboarding",                 steps: 5,  activeContacts: 143, enrolled: 580, completed: 437, replyRate: 12.1, openRate: 51.7, status: "Active", created: "2026-04-01", owner: "Sarah Mitchell", type: "Onboarding" },
  { id: "s3",  name: "Contract Renewal Outreach",           steps: 6,  activeContacts: 37,  enrolled: 142, completed: 105, replyRate: 24.6, openRate: 58.3, status: "Active", created: "2026-03-15", owner: "James Park",     type: "Renewal" },
  { id: "s4",  name: "Cold Outreach — Financial Services",  steps: 8,  activeContacts: 201, enrolled: 640, completed: 439, replyRate: 8.7,  openRate: 32.1, status: "Active", created: "2026-05-10", owner: "Alex Turner",    type: "Cold Outreach" },
  { id: "s5",  name: "Demo No-Show Re-engagement",          steps: 4,  activeContacts: 22,  enrolled: 98,  completed: 76,  replyRate: 31.2, openRate: 62.4, status: "Active", created: "2026-05-20", owner: "Sarah Mitchell", type: "Re-engagement" },
  { id: "s6",  name: "Post-Demo Nurture",                   steps: 6,  activeContacts: 58,  enrolled: 215, completed: 157, replyRate: 22.3, openRate: 47.8, status: "Active", created: "2026-04-15", owner: "James Park",     type: "Nurture" },
  { id: "s7",  name: "SaaS Trial Activation",               steps: 9,  activeContacts: 112, enrolled: 420, completed: 308, replyRate: 14.8, openRate: 55.1, status: "Active", created: "2026-03-01", owner: "Alex Turner",    type: "Onboarding" },
  { id: "s8",  name: "Churned Customer Win-Back",           steps: 5,  activeContacts: 19,  enrolled: 87,  completed: 68,  replyRate: 11.4, openRate: 38.9, status: "Paused", created: "2026-02-01", owner: "Sarah Mitchell", type: "Win-Back" },
  { id: "s9",  name: "Mid-Market Prospect Sequence",        steps: 7,  activeContacts: 0,   enrolled: 0,   completed: 0,   replyRate: 0,    openRate: 0,    status: "Draft",  created: "2026-06-08", owner: "James Park",     type: "Cold Outreach" },
  { id: "s10", name: "Event Follow-Up — SaaStr 2026",       steps: 4,  activeContacts: 67,  enrolled: 93,  completed: 26,  replyRate: 27.5, openRate: 61.3, status: "Active", created: "2026-04-23", owner: "Alex Turner",    type: "Event Follow-up" },
  { id: "s11", name: "LinkedIn Connection Nurture",         steps: 5,  activeContacts: 89,  enrolled: 240, completed: 151, replyRate: 9.8,  openRate: 41.6, status: "Active", created: "2026-04-05", owner: "Sarah Mitchell", type: "Social" },
]

const statusColors: Record<SequenceStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Draft: "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

export default function SequencesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = SEQUENCES.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false
    if (typeFilter !== "all" && s.type !== typeFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const activeSeqs = SEQUENCES.filter(s => s.status === "Active").length
  const totalActive = SEQUENCES.reduce((s, q) => s + q.activeContacts, 0)
  const totalEnrolled = SEQUENCES.reduce((s, q) => s + q.enrolled, 0)
  const avgReply = SEQUENCES.filter(s => s.replyRate > 0).reduce((s, q) => s + q.replyRate, 0) / SEQUENCES.filter(s => s.replyRate > 0).length

  const types = [...new Set(SEQUENCES.map(s => s.type))]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Sequences</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Automated outreach and follow-up sequences</p>
          </div>
          <Button size="sm" className="h-9 text-sm">
            <Plus className="h-4 w-4 mr-2" />New Sequence
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Active Sequences", value: String(activeSeqs), icon: Play, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Contacts", value: String(totalActive), icon: Users, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
            { label: "Total Enrolled", value: String(totalEnrolled), icon: Mail, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Avg Reply Rate", value: `${avgReply.toFixed(1)}%`, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
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
              placeholder="Search sequences..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs w-52"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 text-xs w-44">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
                  {["Sequence Name", "Type", "Status", "Steps", "Active", "Enrolled", "Completed", "Reply Rate", "Open Rate", "Owner", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(seq => (
                  <tr key={seq.id} className="hover:bg-[var(--muted)]/50 group">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors cursor-pointer">
                        {seq.name}
                      </p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">Created {formatDate(seq.created)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">{seq.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[seq.status])}>{seq.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {Array.from({ length: Math.min(seq.steps, 8) }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-sm bg-[var(--primary)]/30" />
                          ))}
                        </div>
                        <span className="text-xs text-[var(--muted-foreground)]">{seq.steps}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{seq.activeContacts > 0 ? seq.activeContacts : "—"}</td>
                    <td className="px-4 py-3 text-sm">{seq.enrolled > 0 ? seq.enrolled : "—"}</td>
                    <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{seq.completed > 0 ? seq.completed : "—"}</td>
                    <td className="px-4 py-3">
                      {seq.replyRate > 0 ? (
                        <span className={cn("text-xs font-semibold", seq.replyRate >= 20 ? "text-emerald-600" : seq.replyRate >= 10 ? "text-amber-600" : "text-[var(--muted-foreground)]")}>
                          {seq.replyRate}%
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {seq.openRate > 0 ? (
                        <span className="text-xs font-semibold text-[var(--primary)]">{seq.openRate}%</span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{seq.owner}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {seq.status === "Active" ? (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-amber-600">
                            <Pause className="h-3.5 w-3.5" />
                          </Button>
                        ) : seq.status === "Paused" ? (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-emerald-600">
                            <Play className="h-3.5 w-3.5" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-emerald-600">
                            <Play className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Enrol Contacts</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
                <Mail className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
                <p className="text-sm text-[var(--muted-foreground)]">No sequences match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
