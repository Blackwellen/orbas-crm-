"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  Plus, Search, Download, Upload, MoreHorizontal, Eye, Edit,
  Archive, Trash2, X, ChevronLeft, ChevronRight, LayoutList, LayoutGrid, Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils"

interface Account {
  id: string
  name: string
  industry: string
  type: "Prospect" | "Customer" | "Partner"
  contacts: number
  openDeals: number
  arr: number
  owner: string
  lastActivity: string
}

const ACCOUNTS: Account[] = [
  { id: "1",  name: "Fintech Corp Ltd",         industry: "Financial Services",  type: "Customer",  contacts: 8,  openDeals: 3, arr: 185000, owner: "Alex Turner",    lastActivity: "2026-06-09" },
  { id: "2",  name: "BlueWave Digital",          industry: "Technology",          type: "Customer",  contacts: 5,  openDeals: 2, arr: 120000, owner: "Sarah Mitchell", lastActivity: "2026-06-08" },
  { id: "3",  name: "Vertex Solutions",          industry: "IT Consulting",       type: "Prospect",  contacts: 3,  openDeals: 1, arr: 0,      owner: "James Park",     lastActivity: "2026-06-07" },
  { id: "4",  name: "TechGrid Ltd",              industry: "Technology",          type: "Customer",  contacts: 6,  openDeals: 1, arr: 95000,  owner: "Chloe Evans",    lastActivity: "2026-06-06" },
  { id: "5",  name: "Sandstone Corp",            industry: "Construction",        type: "Prospect",  contacts: 4,  openDeals: 2, arr: 0,      owner: "Tom Bradley",    lastActivity: "2026-06-05" },
  { id: "6",  name: "Oakfield Media",            industry: "Media & Marketing",   type: "Customer",  contacts: 7,  openDeals: 1, arr: 61000,  owner: "Alex Turner",    lastActivity: "2026-06-04" },
  { id: "7",  name: "Crestview Labs",            industry: "Biotechnology",       type: "Prospect",  contacts: 3,  openDeals: 1, arr: 0,      owner: "Sarah Mitchell", lastActivity: "2026-06-03" },
  { id: "8",  name: "Prism Analytics",           industry: "Data & Analytics",    type: "Customer",  contacts: 5,  openDeals: 2, arr: 78000,  owner: "James Park",     lastActivity: "2026-05-28" },
  { id: "9",  name: "Hartfield & Co",            industry: "Legal Services",      type: "Partner",   contacts: 2,  openDeals: 1, arr: 45000,  owner: "Chloe Evans",    lastActivity: "2026-06-02" },
  { id: "10", name: "NovaBuild Group",           industry: "Construction",        type: "Prospect",  contacts: 4,  openDeals: 1, arr: 0,      owner: "Tom Bradley",    lastActivity: "2026-06-01" },
  { id: "11", name: "RapidFlow Systems",         industry: "Technology",          type: "Customer",  contacts: 3,  openDeals: 0, arr: 42000,  owner: "Alex Turner",    lastActivity: "2026-05-30" },
  { id: "12", name: "Gridpoint Technologies",    industry: "IT Infrastructure",   type: "Partner",   contacts: 5,  openDeals: 0, arr: 30000,  owner: "Sarah Mitchell", lastActivity: "2026-05-20" },
]

const typeColors: Record<string, string> = {
  Prospect: "bg-blue-100 text-blue-700",
  Customer: "bg-emerald-100 text-emerald-700",
  Partner:  "bg-violet-100 text-violet-700",
}

const industryColors: Record<string, string> = {
  "Financial Services": "bg-amber-100 text-amber-700",
  "Technology":         "bg-blue-100 text-blue-700",
  "IT Consulting":      "bg-cyan-100 text-cyan-700",
  "Construction":       "bg-orange-100 text-orange-700",
  "Media & Marketing":  "bg-pink-100 text-pink-700",
  "Biotechnology":      "bg-emerald-100 text-emerald-700",
  "Data & Analytics":   "bg-violet-100 text-violet-700",
  "Legal Services":     "bg-slate-100 text-slate-700",
  "IT Infrastructure":  "bg-indigo-100 text-indigo-700",
}

export default function AccountsPage() {
  const [view, setView] = useState<"table" | "cards">("table")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [accounts, setAccounts] = useState<any[]>(ACCOUNTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("accounts").select("*").order("name")
      .then(({ data }) => {
        if (data && data.length > 0) setAccounts(data)
        setLoading(false)
      })
  }, [])

  const filtered = accounts.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.industry.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || a.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Accounts</h1>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{filtered.length}</span>
          {loading && <span className="text-xs text-[var(--muted-foreground)]">Loading…</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm" asChild><Link href="/app/crm/accounts/new"><Plus className="h-4 w-4 mr-1.5" />New Account</Link></Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input placeholder="Search accounts…" className="pl-8 h-8 text-sm w-60" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-8 text-sm w-36"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Prospect">Prospect</SelectItem>
            <SelectItem value="Customer">Customer</SelectItem>
            <SelectItem value="Partner">Partner</SelectItem>
          </SelectContent>
        </Select>
        {(typeFilter !== "all" || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setTypeFilter("all"); setSearch("") }}>
            <X className="h-3.5 w-3.5 mr-1" />Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant={view === "table" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("table")}><LayoutList className="h-4 w-4" /></Button>
          <Button variant={view === "cards" ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView("cards")}><LayoutGrid className="h-4 w-4" /></Button>
        </div>
      </div>

      {view === "table" && (
        <div className="rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 w-10">
                    <Checkbox checked={selected.size === filtered.length && filtered.length > 0}
                      onCheckedChange={() => selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(a => a.id)))} />
                  </th>
                  {["Company","Industry","Type","Contacts","Open Deals","ARR","Owner","Last Activity",""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(a => (
                  <tr key={a.id} className={cn("hover:bg-[var(--muted)]/50 transition-colors", selected.has(a.id) && "bg-[var(--primary)]/5")}>
                    <td className="px-4 py-3">
                      <Checkbox checked={selected.has(a.id)} onCheckedChange={() => setSelected(p => { const n = new Set(p); n.has(a.id) ? n.delete(a.id) : n.add(a.id); return n })} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/accounts/${a.id}`} className="font-medium text-[var(--primary)] hover:underline">{a.name}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", industryColors[a.industry] || "bg-slate-100 text-slate-700")}>{a.industry}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", typeColors[a.type])}>{a.type}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-semibold text-[var(--foreground)]">{a.contacts}</td>
                    <td className="px-4 py-3 text-center text-xs font-semibold text-[var(--foreground)]">{a.openDeals}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-[var(--foreground)]">{a.arr > 0 ? formatCurrency(a.arr) : "—"}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{a.owner}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatRelativeTime(a.lastActivity)}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild><Link href={`/app/crm/accounts/${a.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
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

      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(a => (
            <Card key={a.id} className="border border-[var(--border)] hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/app/crm/accounts/${a.id}`} className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] block truncate">{a.name}</Link>
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", industryColors[a.industry] || "bg-slate-100 text-slate-700")}>{a.industry}</span>
                  </div>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0", typeColors[a.type])}>{a.type}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[var(--muted)] rounded-md p-2">
                    <p className="text-sm font-bold text-[var(--foreground)]">{a.contacts}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Contacts</p>
                  </div>
                  <div className="bg-[var(--muted)] rounded-md p-2">
                    <p className="text-sm font-bold text-[var(--foreground)]">{a.openDeals}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Deals</p>
                  </div>
                  <div className="bg-[var(--muted)] rounded-md p-2">
                    <p className="text-sm font-bold text-[var(--foreground)]">{a.arr > 0 ? `£${(a.arr/1000).toFixed(0)}k` : "—"}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">ARR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
