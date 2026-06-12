"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Eye, CheckSquare, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BillStatus = "Draft" | "Received" | "Approved" | "Paid" | "Overdue"

interface Bill {
  id: string
  supplier: string
  date: string
  due: string
  total: number
  balance: number
  status: BillStatus
}

const BILLS: Bill[] = [
  { id: "BILL-2024-0088", supplier: "AWS UK Ltd",                 date: "01 Jun 2024", due: "30 Jun 2024", total: 3420,  balance: 3420,  status: "Approved" },
  { id: "BILL-2024-0087", supplier: "Office Space Partners",      date: "01 Jun 2024", due: "01 Jun 2024", total: 8500,  balance: 0,     status: "Paid" },
  { id: "BILL-2024-0086", supplier: "Broadgate IT Supplies",      date: "31 May 2024", due: "14 Jun 2024", total: 1240,  balance: 1240,  status: "Overdue" },
  { id: "BILL-2024-0085", supplier: "BT Business",                date: "31 May 2024", due: "30 Jun 2024", total: 620,   balance: 620,   status: "Received" },
  { id: "BILL-2024-0084", supplier: "Creative Spark Agency",      date: "28 May 2024", due: "11 Jun 2024", total: 4800,  balance: 4800,  status: "Overdue" },
  { id: "BILL-2024-0083", supplier: "Citylink Courier Services",  date: "27 May 2024", due: "10 Jun 2024", total: 380,   balance: 0,     status: "Paid" },
  { id: "BILL-2024-0082", supplier: "Peninsula HR Services",      date: "24 May 2024", due: "07 Jun 2024", total: 2100,  balance: 0,     status: "Paid" },
  { id: "BILL-2024-0081", supplier: "Cloud9 Hosting Ltd",         date: "20 May 2024", due: "03 Jun 2024", total: 940,   balance: 940,   status: "Overdue" },
  { id: "BILL-2024-0080", supplier: "Gatwick Travel Agency",      date: "17 May 2024", due: "31 May 2024", total: 1660,  balance: 0,     status: "Paid" },
  { id: "BILL-2024-0079", supplier: "RSM UK Audit LLP",           date: "15 May 2024", due: "14 Jun 2024", total: 6200,  balance: 6200,  status: "Approved" },
  { id: "BILL-2024-0078", supplier: "Experian Business",          date: "10 May 2024", due: "24 May 2024", total: 480,   balance: 480,   status: "Draft" },
  { id: "BILL-2024-0077", supplier: "PrintMasters UK",            date: "05 May 2024", due: "19 May 2024", total: 720,   balance: 0,     status: "Paid" },
]

const STATUS_CONFIG: Record<BillStatus, { label: string; className: string }> = {
  Draft:    { label: "Draft",    className: "bg-slate-100 text-slate-600" },
  Received: { label: "Received", className: "bg-blue-100 text-blue-700" },
  Approved: { label: "Approved", className: "bg-violet-100 text-violet-700" },
  Paid:     { label: "Paid",     className: "bg-emerald-100 text-emerald-700" },
  Overdue:  { label: "Overdue",  className: "bg-red-100 text-red-700" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function BillsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = BILLS.filter(b => {
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.supplier.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  function toggleAll() {
    setSelected(prev => prev.size === filtered.length ? new Set() : new Set(filtered.map(b => b.id)))
  }

  const apTotal = BILLS.filter(b => b.balance > 0).reduce((s, b) => s + b.balance, 0)

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Purchase Bills</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {BILLS.length} bills · AP outstanding {fmt(apTotal)}
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/app/accounting/bills/new">
            <Plus className="h-4 w-4 mr-1.5" />New Bill
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search bills…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(STATUS_CONFIG).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />Filters
        </Button>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Download className="h-3.5 w-3.5" />Export
        </Button>
        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-md px-3 py-1.5">
            <span className="text-sm font-medium text-[var(--primary)]">{selected.size} selected</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
              <CheckSquare className="h-3.5 w-3.5" />Approve
            </Button>
          </div>
        )}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="w-10 pl-4">
                <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Bill #</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Supplier</TableHead>
              <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Bill Date</TableHead>
              <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Due Date</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Total</TableHead>
              <TableHead className="text-right hidden lg:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Balance</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(bill => {
              const s = STATUS_CONFIG[bill.status]
              return (
                <TableRow key={bill.id} className={`hover:bg-[var(--muted)]/40 ${selected.has(bill.id) ? "bg-[var(--primary)]/5" : ""}`}>
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selected.has(bill.id)}
                      onCheckedChange={() => setSelected(prev => { const n = new Set(prev); n.has(bill.id) ? n.delete(bill.id) : n.add(bill.id); return n })}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/app/accounting/bills/${bill.id}`} className="text-[var(--primary)] font-medium text-sm hover:underline">
                      {bill.id}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{bill.supplier}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{bill.date}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{bill.due}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{fmt(bill.total)}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-sm">{bill.balance > 0 ? fmt(bill.balance) : "—"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.className}`}>
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
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem asChild>
                          <Link href={`/app/accounting/bills/${bill.id}`} className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <CheckSquare className="h-3.5 w-3.5" />Approve
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
