"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Filter, Download, Send, CheckSquare, Archive,
  MoreHorizontal, Eye, Edit, Copy, Trash2, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

type InvoiceStatus = "Draft" | "Sent" | "Partial" | "Paid" | "Overdue" | "Void"

interface Invoice {
  id: string
  customer: string
  issueDate: string
  dueDate: string
  amount: number
  paid: number
  status: InvoiceStatus
}

const INVOICES: Invoice[] = [
  { id: "INV-2024-0142", customer: "Meridian Tech Ltd",      issueDate: "04 Jun 2024", dueDate: "18 Jun 2024", amount: 4200,  paid: 0,     status: "Overdue" },
  { id: "INV-2024-0141", customer: "Holloway & Partners",    issueDate: "03 Jun 2024", dueDate: "17 Jun 2024", amount: 1850,  paid: 0,     status: "Sent" },
  { id: "INV-2024-0140", customer: "Blackwell Consulting",   issueDate: "02 Jun 2024", dueDate: "16 Jun 2024", amount: 7650,  paid: 7650,  status: "Paid" },
  { id: "INV-2024-0139", customer: "Stratford Solutions",    issueDate: "01 Jun 2024", dueDate: "15 Jun 2024", amount: 2300,  paid: 1000,  status: "Partial" },
  { id: "INV-2024-0138", customer: "Thames Digital",         issueDate: "31 May 2024", dueDate: "14 Jun 2024", amount: 5100,  paid: 0,     status: "Overdue" },
  { id: "INV-2024-0137", customer: "Kensington AI Ltd",      issueDate: "30 May 2024", dueDate: "13 Jun 2024", amount: 3400,  paid: 3400,  status: "Paid" },
  { id: "INV-2024-0136", customer: "Pembroke Analytics",     issueDate: "29 May 2024", dueDate: "12 Jun 2024", amount: 1200,  paid: 0,     status: "Sent" },
  { id: "INV-2024-0135", customer: "Regency Systems",        issueDate: "28 May 2024", dueDate: "11 Jun 2024", amount: 8900,  paid: 8900,  status: "Paid" },
  { id: "INV-2024-0134", customer: "Aldgate Ventures",       issueDate: "27 May 2024", dueDate: "10 Jun 2024", amount: 620,   paid: 0,     status: "Draft" },
  { id: "INV-2024-0133", customer: "Croydon Fabrications",   issueDate: "26 May 2024", dueDate: "09 Jun 2024", amount: 3750,  paid: 3750,  status: "Paid" },
  { id: "INV-2024-0132", customer: "Nottingham Networks",    issueDate: "25 May 2024", dueDate: "08 Jun 2024", amount: 9200,  paid: 0,     status: "Overdue" },
  { id: "INV-2024-0131", customer: "Finsbury Solutions",     issueDate: "24 May 2024", dueDate: "07 Jun 2024", amount: 2750,  paid: 0,     status: "Sent" },
  { id: "INV-2024-0130", customer: "Westminster Logistics",  issueDate: "23 May 2024", dueDate: "06 Jun 2024", amount: 6400,  paid: 6400,  status: "Paid" },
  { id: "INV-2024-0129", customer: "Bradford Industrial",    issueDate: "22 May 2024", dueDate: "05 Jun 2024", amount: 1100,  paid: 0,     status: "Void" },
  { id: "INV-2024-0128", customer: "Camden Creative",        issueDate: "21 May 2024", dueDate: "04 Jun 2024", amount: 4800,  paid: 2400,  status: "Partial" },
]

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; className: string }> = {
  Draft:   { label: "Draft",   className: "bg-slate-100 text-slate-600 border-slate-200" },
  Sent:    { label: "Sent",    className: "bg-blue-100 text-blue-700 border-blue-200" },
  Partial: { label: "Partial", className: "bg-amber-100 text-amber-700 border-amber-200" },
  Paid:    { label: "Paid",    className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Overdue: { label: "Overdue", className: "bg-red-100 text-red-700 border-red-200" },
  Void:    { label: "Void",    className: "bg-gray-100 text-gray-500 border-gray-200" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function InvoicesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = INVOICES.filter(inv => {
    const matchSearch = inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map(i => i.id)))
    }
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalAR = INVOICES.filter(i => i.status !== "Paid" && i.status !== "Void").reduce((s, i) => s + (i.amount - i.paid), 0)
  const overdueTotal = INVOICES.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0)

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Sales Invoices</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {INVOICES.length} invoices · AR outstanding {fmt(totalAR)} · Overdue {fmt(overdueTotal)}
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/app/accounting/invoices/new">
            <Plus className="h-4 w-4 mr-1.5" />New Invoice
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search invoices…"
            className="pl-8 h-9 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(STATUS_CONFIG).map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />Filters
        </Button>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Download className="h-3.5 w-3.5" />Export
        </Button>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-md px-3 py-1.5">
            <span className="text-sm font-medium text-[var(--primary)]">{selected.size} selected</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <Send className="h-3.5 w-3.5" />Send
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <CheckSquare className="h-3.5 w-3.5" />Mark Paid
            </Button>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <Archive className="h-3.5 w-3.5" />Archive
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="w-10 pl-4">
                <Checkbox
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Invoice #</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Customer</TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Issue Date</TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Due Date</TableHead>
              <TableHead className="text-right font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Amount</TableHead>
              <TableHead className="text-right hidden lg:table-cell font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Paid</TableHead>
              <TableHead className="text-right hidden lg:table-cell font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Balance Due</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(inv => {
              const s = STATUS_CONFIG[inv.status]
              const balance = inv.amount - inv.paid
              return (
                <TableRow key={inv.id} className={`hover:bg-[var(--muted)]/40 ${selected.has(inv.id) ? "bg-[var(--primary)]/5" : ""}`}>
                  <TableCell className="pl-4">
                    <Checkbox checked={selected.has(inv.id)} onCheckedChange={() => toggleOne(inv.id)} />
                  </TableCell>
                  <TableCell>
                    <Link href={`/app/accounting/invoices/${inv.id}`} className="text-[var(--primary)] font-medium text-sm hover:underline">
                      {inv.id}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-[var(--foreground)] font-medium">{inv.customer}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{inv.issueDate}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{inv.dueDate}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{fmt(inv.amount)}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-sm text-emerald-600">{fmt(inv.paid)}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-sm font-medium">{balance > 0 ? fmt(balance) : "—"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${s.className}`}>
                      {s.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/app/accounting/invoices/${inv.id}`} className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-3.5 w-3.5" />Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Send className="h-3.5 w-3.5" />Send
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Copy className="h-3.5 w-3.5" />Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />Void
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
