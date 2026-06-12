"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  Plus, Search, Download, Upload, MoreHorizontal, Eye, Edit,
  Mail, Archive, Trash2, X, ChevronLeft, ChevronRight, LayoutList, LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, getInitials, formatDate, formatRelativeTime } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  email: string
  account: string
  accountId: string
  phone: string
  jobTitle: string
  status: "Active" | "Inactive" | "Do Not Contact"
  owner: string
  lastActivity: string
}

const CONTACTS: Contact[] = [
  { id: "1",  name: "Sarah Chen",        email: "s.chen@bluewave.digital",       account: "BlueWave Digital",   accountId: "2", phone: "+44 20 7234 5678", jobTitle: "CTO",                       status: "Active",         owner: "Alex Turner",    lastActivity: "2026-06-09" },
  { id: "2",  name: "Marcus Williams",   email: "m.williams@fintechcorp.co.uk",  account: "Fintech Corp Ltd",   accountId: "1", phone: "+44 20 7345 6789", jobTitle: "CFO",                       status: "Active",         owner: "Sarah Mitchell", lastActivity: "2026-06-08" },
  { id: "3",  name: "Lucy Patterson",    email: "l.patterson@techgrid.io",       account: "TechGrid Ltd",       accountId: "4", phone: "+44 20 7456 7890", jobTitle: "Head of IT",                status: "Active",         owner: "James Park",     lastActivity: "2026-06-07" },
  { id: "4",  name: "Robert Ashford",    email: "r.ashford@sandstone.co.uk",     account: "Sandstone Corp",     accountId: "5", phone: "+44 20 7567 8901", jobTitle: "CEO",                       status: "Active",         owner: "Chloe Evans",    lastActivity: "2026-06-06" },
  { id: "5",  name: "Natasha Patel",     email: "n.patel@vertexsolutions.co.uk", account: "Vertex Solutions",   accountId: "3", phone: "+44 20 7678 9012", jobTitle: "Procurement Director",      status: "Active",         owner: "Tom Bradley",    lastActivity: "2026-06-05" },
  { id: "6",  name: "Henry Brooks",      email: "h.brooks@oakfieldmedia.co.uk",  account: "Oakfield Media",     accountId: "6", phone: "+44 20 7789 0123", jobTitle: "MD",                        status: "Active",         owner: "Alex Turner",    lastActivity: "2026-06-04" },
  { id: "7",  name: "Fiona Stewart",     email: "f.stewart@crestviewlabs.io",    account: "Crestview Labs",     accountId: "7", phone: "+44 20 7890 1234", jobTitle: "VP Engineering",            status: "Active",         owner: "Sarah Mitchell", lastActivity: "2026-06-03" },
  { id: "8",  name: "David Osei",        email: "d.osei@prismanalytics.com",     account: "Prism Analytics",    accountId: "8", phone: "+44 20 7901 2345", jobTitle: "Data Director",             status: "Inactive",       owner: "James Park",     lastActivity: "2026-05-28" },
  { id: "9",  name: "Elena Kovacs",      email: "e.kovacs@hartfield.co.uk",      account: "Hartfield & Co",     accountId: "9", phone: "+44 20 7012 3456", jobTitle: "Operations Manager",        status: "Active",         owner: "Chloe Evans",    lastActivity: "2026-06-02" },
  { id: "10", name: "Tom Fitzgerald",    email: "t.fitz@novabuild.co.uk",        account: "NovaBuild Group",    accountId:"10", phone: "+44 20 7123 4567", jobTitle: "Business Development",      status: "Active",         owner: "Tom Bradley",    lastActivity: "2026-06-01" },
  { id: "11", name: "Amara Okafor",      email: "a.okafor@rapidflow.co.uk",      account: "RapidFlow Systems",  accountId:"11", phone: "+44 20 7234 5679", jobTitle: "Head of Product",           status: "Active",         owner: "Alex Turner",    lastActivity: "2026-05-30" },
  { id: "12", name: "Charlotte Reed",    email: "c.reed@gridpoint.io",           account: "Gridpoint Technologies",accountId:"12",phone: "+44 20 7345 6780",jobTitle: "CTO",                      status: "Do Not Contact", owner: "Sarah Mitchell", lastActivity: "2026-05-15" },
  { id: "13", name: "George Hannigan",   email: "g.hannigan@axisgroup.co.uk",    account: "Axis Group",         accountId:"13", phone: "+44 20 7456 7891", jobTitle: "CFO",                       status: "Active",         owner: "James Park",     lastActivity: "2026-05-29" },
  { id: "14", name: "Jasmine Farooq",    email: "j.farooq@clearpath.co.uk",      account: "Clearpath Consulting",accountId:"14",phone: "+44 20 7567 8902", jobTitle: "Strategy Director",         status: "Active",         owner: "Chloe Evans",    lastActivity: "2026-05-27" },
  { id: "15", name: "Ben Sorrell",       email: "b.sorrell@apexventures.co.uk",  account: "Apex Ventures",      accountId:"15", phone: "+44 20 7678 9013", jobTitle: "Partner",                   status: "Inactive",       owner: "Tom Bradley",    lastActivity: "2026-05-20" },
]

const statusColors: Record<Contact["status"], string> = {
  "Active":         "bg-emerald-100 text-emerald-700",
  "Inactive":       "bg-slate-100 text-slate-600",
  "Do Not Contact": "bg-red-100 text-red-700",
}

export default function ContactsPage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [contacts, setContacts] = useState<any[]>(CONTACTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("contacts").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setContacts(data)
        setLoading(false)
      })
  }, [])

  const filtered = contacts.filter(c => {
    const name = c.name || `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim()
    const account = c.account || c.account_id || ""
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || (c.email || "").toLowerCase().includes(search.toLowerCase()) || account.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  // Normalise Supabase rows (snake_case) to the shape the UI expects
  function normalise(c: any): Contact {
    return {
      id:           c.id,
      name:         c.name ?? `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim(),
      email:        c.email ?? "",
      account:      c.account ?? (c.accounts ? c.accounts.name : "") ?? "",
      accountId:    c.accountId ?? c.account_id ?? "",
      phone:        c.phone ?? "",
      jobTitle:     c.jobTitle ?? c.job_title ?? "",
      status:       c.status ?? "Active",
      owner:        c.owner ?? c.owner_id ?? "",
      lastActivity: c.lastActivity ?? c.updated_at ?? c.created_at ?? "",
    }
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(c => c.id)))
  }

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Contacts</h1>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">
            {filtered.length}
          </span>
          {loading && <span className="text-xs text-[var(--muted-foreground)]">Loading…</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm" asChild>
            <Link href="/app/crm/contacts/new"><Plus className="h-4 w-4 mr-1.5" />New Contact</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input placeholder="Search contacts…" className="pl-8 h-8 text-sm w-60" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 text-sm w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Do Not Contact">Do Not Contact</SelectItem>
          </SelectContent>
        </Select>
        {(statusFilter !== "all" || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setStatusFilter("all"); setSearch("") }}>
            <X className="h-3.5 w-3.5 mr-1" />Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant={view === "table" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("table")}><LayoutList className="h-4 w-4" /></Button>
          <Button variant={view === "cards" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("cards")}><LayoutGrid className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-2 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg px-4 py-2">
          <span className="text-sm font-medium text-[var(--primary)]">{selected.size} selected</span>
          <div className="h-4 w-px bg-[var(--border)]" />
          <Button size="sm" variant="ghost" className="h-7 text-xs"><Mail className="h-3.5 w-3.5 mr-1" />Email</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs"><Archive className="h-3.5 w-3.5 mr-1" />Archive</Button>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600"><Trash2 className="h-3.5 w-3.5 mr-1" />Delete</Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 ml-auto" onClick={() => setSelected(new Set())}><X className="h-4 w-4" /></Button>
        </div>
      )}

      {/* Table */}
      {view === "table" && (
        <div className="rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
                  {["Name","Email","Account","Phone","Job Title","Status","Owner","Last Activity",""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(raw => { const c = normalise(raw); return (
                  <tr key={c.id} className={cn("hover:bg-[var(--muted)]/50 transition-colors", selected.has(c.id) && "bg-[var(--primary)]/5")}>
                    <td className="px-4 py-3"><Checkbox checked={selected.has(c.id)} onCheckedChange={() => setSelected(p => { const n = new Set(p); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n })} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(c.name)}</AvatarFallback>
                        </Avatar>
                        <Link href={`/app/crm/contacts/${c.id}`} className="font-medium text-[var(--primary)] hover:underline whitespace-nowrap">{c.name}</Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.email}</td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/accounts/${c.accountId}`} className="text-xs text-[var(--primary)] hover:underline whitespace-nowrap">{c.account}</Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{c.phone}</td>
                    <td className="px-4 py-3 text-xs text-[var(--foreground)]">{c.jobTitle}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[c.status])}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{c.owner}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatRelativeTime(c.lastActivity)}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild><Link href={`/app/crm/contacts/${c.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem><Mail className="h-3.5 w-3.5 mr-2" />Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Archive className="h-3.5 w-3.5 mr-2" />Archive</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards */}
      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(raw => { const c = normalise(raw); return (
            <Card key={c.id} className="border border-[var(--border)] hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(c.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link href={`/app/crm/contacts/${c.id}`} className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] block truncate">{c.name}</Link>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{c.jobTitle}</p>
                    <Link href={`/app/crm/accounts/${c.accountId}`} className="text-xs text-[var(--primary)] hover:underline truncate">{c.account}</Link>
                  </div>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0", statusColors[c.status])}>{c.status}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{c.email}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{c.phone}</p>
              </CardContent>
            </Card>
          )})}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-[var(--muted-foreground)]">Showing 1–{filtered.length} of {filtered.length}</p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8" disabled><ChevronLeft className="h-4 w-4" />Previous</Button>
          <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs">1</Button>
          <Button variant="outline" size="sm" className="h-8" disabled>Next<ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  )
}
