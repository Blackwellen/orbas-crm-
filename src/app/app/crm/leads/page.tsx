"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  Plus, Upload, Download, Search, ChevronLeft, ChevronRight,
  MoreHorizontal, Eye, Edit, RefreshCw, Mail, UserCheck,
  Archive, Trash2, LayoutList, LayoutGrid, SlidersHorizontal, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, getInitials, formatDate } from "@/lib/utils"

type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted"
type LeadSource = "Website" | "Referral" | "LinkedIn" | "Cold Outreach" | "Event" | "Other"

interface Lead {
  id: string
  name: string
  email: string
  company: string
  source: LeadSource
  status: LeadStatus
  score: number
  owner: string
  created: string
  phone?: string
}

const SAMPLE_LEADS: Lead[] = [
  { id: "1",  name: "James Whitfield",  email: "j.whitfield@fintechcorp.co.uk",  company: "Fintech Corp Ltd",     source: "LinkedIn",       status: "New",       score: 82, owner: "Alex Turner",    created: "2026-06-08" },
  { id: "2",  name: "Priya Sharma",     email: "priya.s@novabuild.co.uk",        company: "NovaBuild Group",       source: "Website",        status: "Contacted", score: 67, owner: "Sarah Mitchell", created: "2026-06-07" },
  { id: "3",  name: "Oliver Hughes",    email: "o.hughes@techgrid.io",           company: "TechGrid Ltd",          source: "Cold Outreach",  status: "Qualified", score: 91, owner: "James Park",     created: "2026-06-05" },
  { id: "4",  name: "Emma Thornton",    email: "emma.t@vertexsolutions.co.uk",   company: "Vertex Solutions",      source: "Referral",       status: "Converted", score: 95, owner: "Chloe Evans",    created: "2026-06-04" },
  { id: "5",  name: "Daniel Roberts",   email: "d.roberts@bluewave.digital",     company: "BlueWave Digital",      source: "Event",          status: "New",       score: 55, owner: "Tom Bradley",    created: "2026-06-03" },
  { id: "6",  name: "Sophie Clarke",    email: "s.clarke@oakfieldmedia.co.uk",   company: "Oakfield Media",        source: "LinkedIn",       status: "Contacted", score: 72, owner: "Alex Turner",    created: "2026-06-02" },
  { id: "7",  name: "Marcus Williams",  email: "m.williams@sandstone.co.uk",     company: "Sandstone Corp",        source: "Website",        status: "New",       score: 44, owner: "Sarah Mitchell", created: "2026-06-01" },
  { id: "8",  name: "Charlotte Davies", email: "c.davies@crestviewlabs.io",      company: "Crestview Labs",        source: "Referral",       status: "Qualified", score: 88, owner: "James Park",     created: "2026-05-30" },
  { id: "9",  name: "Aiden Foster",     email: "a.foster@hartfield.co.uk",       company: "Hartfield & Co",        source: "Cold Outreach",  status: "New",       score: 38, owner: "Chloe Evans",    created: "2026-05-29" },
  { id: "10", name: "Isabella King",    email: "i.king@prismanalytics.com",      company: "Prism Analytics",       source: "Event",          status: "Contacted", score: 76, owner: "Tom Bradley",    created: "2026-05-28" },
  { id: "11", name: "Ethan Morgan",     email: "e.morgan@rapidflow.co.uk",       company: "RapidFlow Systems",     source: "LinkedIn",       status: "New",       score: 61, owner: "Alex Turner",    created: "2026-05-27" },
  { id: "12", name: "Amelia Brooks",    email: "a.brooks@gridpoint.io",          company: "Gridpoint Technologies",source: "Website",        status: "Qualified", score: 84, owner: "Sarah Mitchell", created: "2026-05-26" },
  { id: "13", name: "Noah Campbell",    email: "n.campbell@axisgroup.co.uk",     company: "Axis Group",            source: "Referral",       status: "New",       score: 49, owner: "James Park",     created: "2026-05-25" },
  { id: "14", name: "Grace Bennett",    email: "g.bennett@clearpath.co.uk",      company: "Clearpath Consulting",  source: "Event",          status: "Contacted", score: 70, owner: "Chloe Evans",    created: "2026-05-24" },
  { id: "15", name: "Liam Peterson",    email: "l.peterson@apexventures.co.uk",  company: "Apex Ventures",         source: "Cold Outreach",  status: "New",       score: 35, owner: "Tom Bradley",    created: "2026-05-23" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  New:       { label: "New",       className: "bg-blue-100 text-blue-700" },
  Contacted: { label: "Contacted", className: "bg-amber-100 text-amber-700" },
  Qualified: { label: "Qualified", className: "bg-violet-100 text-violet-700" },
  Converted: { label: "Converted", className: "bg-emerald-100 text-emerald-700" },
}

const sourceConfig: Record<string, string> = {
  Website:       "bg-cyan-100 text-cyan-700",
  Referral:      "bg-pink-100 text-pink-700",
  LinkedIn:      "bg-blue-100 text-blue-700",
  "Cold Outreach": "bg-slate-100 text-slate-700",
  Event:         "bg-orange-100 text-orange-700",
  Other:         "bg-gray-100 text-gray-700",
}

export default function LeadsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [view, setView] = useState<"table" | "cards">("table")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [leads, setLeads] = useState<any[]>(SAMPLE_LEADS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("leads").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setLeads(data)
        setLoading(false)
      })
  }, [])

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || l.status === statusFilter
    const matchSource = sourceFilter === "all" || l.source === sourceFilter
    return matchSearch && matchStatus && matchSource
  })

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map(l => l.id)))
    }
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Leads</h1>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{filtered.length}</span>
          {loading && <span className="text-xs text-[var(--muted-foreground)]">Loading…</span>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm" asChild>
            <Link href="/app/crm/leads/new"><Plus className="h-4 w-4 mr-1.5" />New Lead</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search leads…"
            className="pl-8 h-8 text-sm w-60"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 text-sm w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="h-8 text-sm w-40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {(statusFilter !== "all" || sourceFilter !== "all" || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--muted-foreground)]" onClick={() => { setStatusFilter("all"); setSourceFilter("all"); setSearch("") }}>
            <X className="h-3.5 w-3.5 mr-1" />Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant={view === "table" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("table")}>
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button variant={view === "cards" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("cards")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-2 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg px-4 py-2 flex-wrap">
          <span className="text-sm font-medium text-[var(--primary)]">{selected.size} selected</span>
          <div className="h-4 w-px bg-[var(--border)]" />
          <Button size="sm" variant="ghost" className="h-7 text-xs"><RefreshCw className="h-3.5 w-3.5 mr-1" />Convert</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs"><UserCheck className="h-3.5 w-3.5 mr-1" />Assign</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs"><Archive className="h-3.5 w-3.5 mr-1" />Archive</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:text-red-700"><Trash2 className="h-3.5 w-3.5 mr-1" />Delete</Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 ml-auto text-[var(--muted-foreground)]" onClick={() => setSelected(new Set())}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 w-10">
                    <Checkbox
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Source</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Score</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Owner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Created</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(lead => (
                  <tr key={lead.id} className={cn("hover:bg-[var(--muted)]/50 transition-colors", selected.has(lead.id) && "bg-[var(--primary)]/5")}>
                    <td className="px-4 py-3">
                      <Checkbox checked={selected.has(lead.id)} onCheckedChange={() => toggleOne(lead.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/leads/${lead.id}`} className="font-medium text-[var(--primary)] hover:underline whitespace-nowrap">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">{lead.email}</td>
                    <td className="px-4 py-3 text-[var(--foreground)] text-xs">{lead.company}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", sourceConfig[lead.source])}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", statusConfig[lead.status].className)}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={lead.score} className="h-1.5 w-16" />
                        <span className="text-xs text-[var(--muted-foreground)] w-6">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)]">
                            {getInitials(lead.owner)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[var(--muted-foreground)]">{lead.owner.split(" ")[0]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(lead.created)}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem asChild><Link href={`/app/crm/leads/${lead.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem><RefreshCw className="h-3.5 w-3.5 mr-2" />Convert</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="h-3.5 w-3.5 mr-2" />Send Email</DropdownMenuItem>
                          <DropdownMenuItem><UserCheck className="h-3.5 w-3.5 mr-2" />Assign</DropdownMenuItem>
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

      {/* Cards View */}
      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(lead => (
            <Card key={lead.id} className="border border-[var(--border)] hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
                        {getInitials(lead.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/app/crm/leads/${lead.id}`} className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
                        {lead.name}
                      </Link>
                      <p className="text-xs text-[var(--muted-foreground)]">{lead.company}</p>
                    </div>
                  </div>
                  <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", statusConfig[lead.status].className)}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mb-2">{lead.email}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium", sourceConfig[lead.source])}>
                    {lead.source}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[var(--muted-foreground)]">Score:</span>
                    <span className="text-xs font-semibold text-[var(--foreground)]">{lead.score}</span>
                  </div>
                </div>
                <Progress value={lead.score} className="h-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <p className="text-sm text-[var(--muted-foreground)]">Showing 1–{filtered.length} of 247</p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8" disabled><ChevronLeft className="h-4 w-4" />Previous</Button>
          {[1,2,3,"...",17].map((p, i) => (
            <Button key={i} variant={p === 1 ? "default" : "outline"} size="sm" className="h-8 w-8 p-0 text-xs">
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="h-8">Next<ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  )
}
