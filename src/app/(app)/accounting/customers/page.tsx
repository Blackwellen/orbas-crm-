"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, Download, AlertCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Customer {
  id: string
  name: string
  totalInvoiced: number
  totalPaid: number
  outstanding: number
  overdue: number
  lastInvoice: string
}

const CUSTOMERS: Customer[] = [
  { id: "c-001", name: "Meridian Tech Ltd",     totalInvoiced: 28400,  totalPaid: 24200,  outstanding: 4200,  overdue: 4200,  lastInvoice: "04 Jun 2024" },
  { id: "c-002", name: "Holloway & Partners",   totalInvoiced: 15600,  totalPaid: 13750,  outstanding: 1850,  overdue: 0,     lastInvoice: "03 Jun 2024" },
  { id: "c-003", name: "Blackwell Consulting",  totalInvoiced: 52400,  totalPaid: 52400,  outstanding: 0,     overdue: 0,     lastInvoice: "02 Jun 2024" },
  { id: "c-004", name: "Stratford Solutions",   totalInvoiced: 18200,  totalPaid: 15900,  outstanding: 2300,  overdue: 0,     lastInvoice: "01 Jun 2024" },
  { id: "c-005", name: "Thames Digital",        totalInvoiced: 38600,  totalPaid: 33500,  outstanding: 5100,  overdue: 5100,  lastInvoice: "31 May 2024" },
  { id: "c-006", name: "Kensington AI Ltd",     totalInvoiced: 44200,  totalPaid: 44200,  outstanding: 0,     overdue: 0,     lastInvoice: "30 May 2024" },
  { id: "c-007", name: "Pembroke Analytics",    totalInvoiced: 9800,   totalPaid: 8600,   outstanding: 1200,  overdue: 0,     lastInvoice: "29 May 2024" },
  { id: "c-008", name: "Regency Systems",       totalInvoiced: 71400,  totalPaid: 71400,  outstanding: 0,     overdue: 0,     lastInvoice: "28 May 2024" },
  { id: "c-009", name: "Nottingham Networks",   totalInvoiced: 22600,  totalPaid: 13400,  outstanding: 9200,  overdue: 9200,  lastInvoice: "25 May 2024" },
  { id: "c-010", name: "Finsbury Solutions",    totalInvoiced: 16200,  totalPaid: 13450,  outstanding: 2750,  overdue: 0,     lastInvoice: "24 May 2024" },
  { id: "c-011", name: "Westminster Logistics", totalInvoiced: 34800,  totalPaid: 34800,  outstanding: 0,     overdue: 0,     lastInvoice: "23 May 2024" },
  { id: "c-012", name: "Camden Creative",       totalInvoiced: 12400,  totalPaid: 9600,   outstanding: 2800,  overdue: 0,     lastInvoice: "21 May 2024" },
]

function fmt(n: number) { return n > 0 ? `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "—" }

export default function CustomersARPage() {
  const [search, setSearch] = useState("")

  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalAR = CUSTOMERS.reduce((s, c) => s + c.outstanding, 0)
  const totalOverdue = CUSTOMERS.reduce((s, c) => s + c.overdue, 0)
  const totalInvoiced = CUSTOMERS.reduce((s, c) => s + c.totalInvoiced, 0)

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Customer AR Ledger</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {CUSTOMERS.length} customers · Total outstanding £{totalAR.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />Export
        </Button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total AR Outstanding", value: `£${totalAR.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-[var(--primary)]", icon: TrendingUp, bg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Overdue",              value: `£${totalOverdue.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-red-600",            icon: AlertCircle, bg: "bg-red-50", iconColor: "text-red-600" },
          { label: "Total Invoiced (YTD)", value: `£${totalInvoiced.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-emerald-600",        icon: TrendingUp, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${k.bg} shrink-0`}>
                <k.icon className={`h-4 w-4 ${k.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${k.color}`}>{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input placeholder="Search customers…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="pl-4 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Customer</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Total Invoiced</TableHead>
              <TableHead className="text-right hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Total Paid</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Outstanding</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Overdue</TableHead>
              <TableHead className="hidden lg:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Last Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id} className="hover:bg-[var(--muted)]/40">
                <TableCell className="pl-4 font-medium text-sm">{c.name}</TableCell>
                <TableCell className="text-right text-sm">{fmt(c.totalInvoiced)}</TableCell>
                <TableCell className="text-right hidden md:table-cell text-sm text-emerald-600">{fmt(c.totalPaid)}</TableCell>
                <TableCell className="text-right text-sm font-semibold">{c.outstanding > 0 ? fmt(c.outstanding) : <span className="text-[var(--muted-foreground)]">—</span>}</TableCell>
                <TableCell className="text-right text-sm">
                  {c.overdue > 0 ? (
                    <span className="text-red-600 font-semibold">{fmt(c.overdue)}</span>
                  ) : <span className="text-[var(--muted-foreground)]">—</span>}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-[var(--muted-foreground)]">{c.lastInvoice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
