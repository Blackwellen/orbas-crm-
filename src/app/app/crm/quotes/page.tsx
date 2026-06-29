"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Filter, FileText, Eye, MoreHorizontal,
  DollarSign, TrendingUp, CheckCircle, BarChart2
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils"

type QuoteStatus = "Draft" | "Sent" | "Viewed" | "Accepted" | "Declined" | "Expired"

interface Quote {
  id: string
  quoteNumber: string
  account: string
  accountId: string
  deal: string
  dealId: string
  status: QuoteStatus
  total: number
  created: string
  expiry: string
  owner: string
  currency: string
}

const QUOTES: Quote[] = [
  { id: "q1",  quoteNumber: "Q-0042", account: "Fintech Corp Ltd",    accountId: "1", deal: "Enterprise SaaS Rollout",  dealId: "1",  status: "Sent",     total: 95000,  created: "2026-06-09", expiry: "2026-07-09", owner: "Alex Turner",    currency: "GBP" },
  { id: "q2",  quoteNumber: "Q-0041", account: "Barclays PLC",        accountId: "2", deal: "Security Compliance Suite",dealId: "10", status: "Viewed",   total: 155000, created: "2026-06-07", expiry: "2026-07-07", owner: "Alex Turner",    currency: "GBP" },
  { id: "q3",  quoteNumber: "Q-0040", account: "Lloyds Banking Group",accountId: "3", deal: "CRM Upgrade Project",      dealId: "5",  status: "Accepted", total: 125000, created: "2026-06-05", expiry: "2026-07-05", owner: "Sarah Mitchell", currency: "GBP" },
  { id: "q4",  quoteNumber: "Q-0039", account: "Sky Group",           accountId: "4", deal: "API Platform Rollout",     dealId: "11", status: "Draft",    total: 72000,  created: "2026-06-08", expiry: "2026-07-08", owner: "James Park",     currency: "GBP" },
  { id: "q5",  quoteNumber: "Q-0038", account: "Tesco Stores Ltd",    accountId: "5", deal: "SaaS Consolidation Deal",  dealId: "12", status: "Sent",     total: 198000, created: "2026-06-03", expiry: "2026-07-03", owner: "Sarah Mitchell", currency: "GBP" },
  { id: "q6",  quoteNumber: "Q-0037", account: "ASOS Ltd",            accountId: "6", deal: "E-Commerce Integration",   dealId: "8",  status: "Declined", total: 67000,  created: "2026-05-28", expiry: "2026-06-28", owner: "James Park",     currency: "GBP" },
  { id: "q7",  quoteNumber: "Q-0036", account: "NHS Digital",         accountId: "7", deal: "Digital Workplace Suite",  dealId: "6",  status: "Accepted", total: 210000, created: "2026-05-25", expiry: "2026-06-25", owner: "Sarah Mitchell", currency: "GBP" },
  { id: "q8",  quoteNumber: "Q-0035", account: "Fintech Corp Ltd",    accountId: "1", deal: "Enterprise SaaS Rollout",  dealId: "1",  status: "Expired",  total: 88000,  created: "2026-05-20", expiry: "2026-06-05", owner: "Alex Turner",    currency: "GBP" },
  { id: "q9",  quoteNumber: "Q-0034", account: "BP PLC",              accountId: "8", deal: "Full CRM Rollout",         dealId: "13", status: "Accepted", total: 310000, created: "2026-05-10", expiry: "2026-06-10", owner: "Alex Turner",    currency: "GBP" },
  { id: "q10", quoteNumber: "Q-0033", account: "Vodafone UK",         accountId: "9", deal: "Cloud ERP Migration",      dealId: "14", status: "Accepted", total: 145000, created: "2026-05-01", expiry: "2026-06-01", owner: "James Park",     currency: "GBP" },
]

const statusColors: Record<QuoteStatus, string> = {
  Draft: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Sent: "bg-blue-100 text-blue-700",
  Viewed: "bg-violet-100 text-violet-700",
  Accepted: "bg-emerald-100 text-emerald-700",
  Declined: "bg-red-100 text-red-700",
  Expired: "bg-amber-100 text-amber-700",
}

export default function QuotesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")

  const filtered = QUOTES.filter(q => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false
    if (ownerFilter !== "all" && q.owner !== ownerFilter) return false
    if (search && !q.quoteNumber.toLowerCase().includes(search.toLowerCase()) && !q.account.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalQuoted = QUOTES.reduce((s, q) => s + q.total, 0)
  const acceptedValue = QUOTES.filter(q => q.status === "Accepted").reduce((s, q) => s + q.total, 0)
  const winRate = Math.round((QUOTES.filter(q => q.status === "Accepted").length / QUOTES.filter(q => q.status !== "Draft").length) * 100)
  const avgQuote = Math.round(QUOTES.reduce((s, q) => s + q.total, 0) / QUOTES.length)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">Quotes & Proposals</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Manage all quotes and proposals</p>
          </div>
          <Button size="sm" className="h-9 text-sm" asChild>
            <Link href="/app/crm/quotes/new"><Plus className="h-4 w-4 mr-2" />New Quote</Link>
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Total Quoted", value: formatCurrency(totalQuoted), icon: FileText, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
            { label: "Accepted Value", value: formatCurrency(acceptedValue), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Win Rate", value: `${winRate}%`, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Avg Quote Value", value: formatCurrency(avgQuote), icon: BarChart2, color: "text-amber-600", bg: "bg-amber-50" },
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
              placeholder="Search quotes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs w-48"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {["Draft", "Sent", "Viewed", "Accepted", "Declined", "Expired"].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-6">
        <Card className="border border-[var(--border)]">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  {["Quote #", "Account", "Deal", "Status", "Total", "Created", "Expiry", "Owner", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(q => (
                  <tr key={q.id} className="hover:bg-[var(--muted)]/50 group">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/quotes/${q.quoteNumber}`} className="font-semibold text-[var(--primary)] hover:underline">
                        {q.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/accounts/${q.accountId}`} className="text-sm text-[var(--foreground)] hover:text-[var(--primary)] hover:underline">
                        {q.account}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-[160px] truncate">
                      <Link href={`/app/crm/deals/${q.dealId}`} className="hover:text-[var(--primary)] hover:underline">
                        {q.deal}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[q.status])}>{q.status}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[var(--foreground)]">{formatCurrency(q.total)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(q.created)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(q.expiry)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(q.owner)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[var(--muted-foreground)]">{q.owner}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href={`/app/crm/quotes/${q.quoteNumber}`}><Eye className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
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
                <FileText className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
                <p className="text-sm text-[var(--muted-foreground)]">No quotes match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
