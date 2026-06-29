"use client"

import React, { useState } from "react"
import { Search, Download, AlertCircle, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Supplier {
  id: string
  name: string
  totalBilled: number
  totalPaid: number
  outstanding: number
  overdue: number
  lastBill: string
}

const SUPPLIERS: Supplier[] = [
  { id: "s-001", name: "AWS UK Ltd",               totalBilled: 41040,  totalPaid: 37620,  outstanding: 3420,  overdue: 0,    lastBill: "01 Jun 2024" },
  { id: "s-002", name: "Office Space Partners",    totalBilled: 102000, totalPaid: 102000, outstanding: 0,     overdue: 0,    lastBill: "01 Jun 2024" },
  { id: "s-003", name: "Broadgate IT Supplies",    totalBilled: 8420,   totalPaid: 7180,   outstanding: 1240,  overdue: 1240, lastBill: "31 May 2024" },
  { id: "s-004", name: "BT Business",              totalBilled: 7440,   totalPaid: 6820,   outstanding: 620,   overdue: 0,    lastBill: "31 May 2024" },
  { id: "s-005", name: "Creative Spark Agency",    totalBilled: 28800,  totalPaid: 24000,  outstanding: 4800,  overdue: 4800, lastBill: "28 May 2024" },
  { id: "s-006", name: "Citylink Courier",         totalBilled: 4560,   totalPaid: 4560,   outstanding: 0,     overdue: 0,    lastBill: "27 May 2024" },
  { id: "s-007", name: "Peninsula HR Services",    totalBilled: 25200,  totalPaid: 25200,  outstanding: 0,     overdue: 0,    lastBill: "24 May 2024" },
  { id: "s-008", name: "Cloud9 Hosting Ltd",       totalBilled: 11280,  totalPaid: 10340,  outstanding: 940,   overdue: 940,  lastBill: "20 May 2024" },
  { id: "s-009", name: "Gatwick Travel Agency",    totalBilled: 19920,  totalPaid: 19920,  outstanding: 0,     overdue: 0,    lastBill: "17 May 2024" },
  { id: "s-010", name: "RSM UK Audit LLP",         totalBilled: 18600,  totalPaid: 12400,  outstanding: 6200,  overdue: 0,    lastBill: "15 May 2024" },
  { id: "s-011", name: "Experian Business",        totalBilled: 5760,   totalPaid: 5280,   outstanding: 480,   overdue: 0,    lastBill: "10 May 2024" },
  { id: "s-012", name: "PrintMasters UK",          totalBilled: 8640,   totalPaid: 8640,   outstanding: 0,     overdue: 0,    lastBill: "05 May 2024" },
]

function fmt(n: number) { return n > 0 ? `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "—" }

export default function SuppliersAPPage() {
  const [search, setSearch] = useState("")

  const filtered = SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalAP = SUPPLIERS.reduce((s, c) => s + c.outstanding, 0)
  const totalOverdue = SUPPLIERS.reduce((s, c) => s + c.overdue, 0)
  const totalBilled = SUPPLIERS.reduce((s, c) => s + c.totalBilled, 0)

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Supplier AP Ledger</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {SUPPLIERS.length} suppliers · Total outstanding £{totalAP.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />Export
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total AP Outstanding", value: `£${totalAP.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-violet-600", icon: TrendingDown, bg: "bg-violet-50", ic: "text-violet-600" },
          { label: "Overdue Payables",     value: `£${totalOverdue.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-red-600",    icon: AlertCircle,  bg: "bg-red-50",    ic: "text-red-600" },
          { label: "Total Billed (YTD)",   value: `£${totalBilled.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-[var(--foreground)]",icon: TrendingDown,bg: "bg-slate-100", ic: "text-slate-600" },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${k.bg} shrink-0`}>
                <k.icon className={`h-4 w-4 ${k.ic}`} />
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
        <Input placeholder="Search suppliers…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="pl-4 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Supplier</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Total Billed</TableHead>
              <TableHead className="text-right hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Total Paid</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Outstanding</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Overdue</TableHead>
              <TableHead className="hidden lg:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Last Bill</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(s => (
              <TableRow key={s.id} className="hover:bg-[var(--muted)]/40">
                <TableCell className="pl-4 font-medium text-sm">{s.name}</TableCell>
                <TableCell className="text-right text-sm">{fmt(s.totalBilled)}</TableCell>
                <TableCell className="text-right hidden md:table-cell text-sm text-emerald-600">{fmt(s.totalPaid)}</TableCell>
                <TableCell className="text-right text-sm font-semibold">{s.outstanding > 0 ? fmt(s.outstanding) : <span className="text-[var(--muted-foreground)]">—</span>}</TableCell>
                <TableCell className="text-right text-sm">
                  {s.overdue > 0 ? <span className="text-red-600 font-semibold">{fmt(s.overdue)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-[var(--muted-foreground)]">{s.lastBill}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
