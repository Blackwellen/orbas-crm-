"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, Download, FileSpreadsheet, FileText,
  Search, Filter, CheckCircle2, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface TBRow {
  code: string
  name: string
  type: string
  openDr: number
  openCr: number
  periodDr: number
  periodCr: number
  closingDr: number
  closingCr: number
}

const TRIAL_BALANCE: TBRow[] = [
  { code: "1100", name: "Cash & Bank",                type: "Asset",     openDr: 118240, openCr: 0,      periodDr: 19640, periodCr: 6990,  closingDr: 130890, closingCr: 0 },
  { code: "1200", name: "Accounts Receivable",        type: "Asset",     openDr: 38600,  openCr: 0,      periodDr: 16596, periodCr: 8056,  closingDr: 47140,  closingCr: 0 },
  { code: "1300", name: "Inventory",                  type: "Asset",     openDr: 45200,  openCr: 0,      periodDr: 0,     periodCr: 3100,  closingDr: 42100,  closingCr: 0 },
  { code: "1400", name: "Other Current Assets",       type: "Asset",     openDr: 1200,   openCr: 0,      periodDr: 640,   periodCr: 0,     closingDr: 1840,   closingCr: 0 },
  { code: "1500", name: "Prepaid Expenses",           type: "Asset",     openDr: 2400,   openCr: 0,      periodDr: 4800,  periodCr: 2400,  closingDr: 4800,   closingCr: 0 },
  { code: "1600", name: "Property, Plant & Equipment",type: "Asset",     openDr: 296700, openCr: 0,      periodDr: 8500,  periodCr: 0,     closingDr: 305200, closingCr: 0 },
  { code: "1650", name: "Accumulated Depreciation",   type: "Asset",     openDr: 0,      openCr: 66210,  periodDr: 0,     periodCr: 1240,  closingDr: 0,      closingCr: 67450 },
  { code: "1700", name: "Intangible Assets",          type: "Asset",     openDr: 14000,  openCr: 0,      periodDr: 8000,  periodCr: 0,     closingDr: 22000,  closingCr: 0 },
  { code: "1750", name: "Long-term Investments",      type: "Asset",     openDr: 15000,  openCr: 0,      periodDr: 0,     periodCr: 0,     closingDr: 15000,  closingCr: 0 },
  { code: "2100", name: "Accounts Payable",           type: "Liability", openDr: 0,      openCr: 28400,  periodDr: 0,     periodCr: 3480,  closingDr: 0,      closingCr: 31880 },
  { code: "2200", name: "VAT Liability",              type: "Liability", openDr: 0,      openCr: 7200,   periodDr: 0,     periodCr: 1760,  closingDr: 0,      closingCr: 8960 },
  { code: "2300", name: "Accrued Expenses",           type: "Liability", openDr: 0,      openCr: 5800,   periodDr: 0,     periodCr: 620,   closingDr: 0,      closingCr: 6420 },
  { code: "2400", name: "Short-term Borrowings",      type: "Liability", openDr: 0,      openCr: 12000,  periodDr: 0,     periodCr: 0,     closingDr: 0,      closingCr: 12000 },
  { code: "2500", name: "Deferred Revenue",           type: "Liability", openDr: 0,      openCr: 4800,   periodDr: 0,     periodCr: 4800,  closingDr: 0,      closingCr: 9600 },
  { code: "2600", name: "Long-term Loans",            type: "Liability", openDr: 0,      openCr: 95000,  periodDr: 10000, periodCr: 0,     closingDr: 0,      closingCr: 85000 },
  { code: "2700", name: "Director Loans",             type: "Liability", openDr: 0,      openCr: 20000,  periodDr: 5000,  periodCr: 0,     closingDr: 0,      closingCr: 15000 },
  { code: "2800", name: "Deferred Tax Liability",     type: "Liability", openDr: 0,      openCr: 3800,   periodDr: 0,     periodCr: 400,   closingDr: 0,      closingCr: 4200 },
  { code: "3000", name: "Share Capital",              type: "Equity",    openDr: 0,      openCr: 50000,  periodDr: 0,     periodCr: 0,     closingDr: 0,      closingCr: 50000 },
  { code: "3100", name: "Share Premium",              type: "Equity",    openDr: 0,      openCr: 20000,  periodDr: 0,     periodCr: 0,     closingDr: 0,      closingCr: 20000 },
  { code: "3200", name: "Retained Earnings",          type: "Equity",    openDr: 0,      openCr: 116930, periodDr: 0,     periodCr: 78530, closingDr: 0,      closingCr: 195460 },
  { code: "4000", name: "Sales Revenue",              type: "Income",    openDr: 0,      openCr: 0,      periodDr: 0,     periodCr: 42100, closingDr: 0,      closingCr: 42100 },
  { code: "4100", name: "Consulting Revenue",         type: "Income",    openDr: 0,      openCr: 0,      periodDr: 0,     periodCr: 25100, closingDr: 0,      closingCr: 25100 },
  { code: "5000", name: "Cost of Goods Sold",         type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 28400, periodCr: 0,     closingDr: 28400,  closingCr: 0 },
  { code: "6100", name: "Rent & Office Costs",        type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 3200,  periodCr: 0,     closingDr: 3200,   closingCr: 0 },
  { code: "6200", name: "Software & Subscriptions",   type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 2140,  periodCr: 0,     closingDr: 2140,   closingCr: 0 },
  { code: "6300", name: "Salaries & Wages",           type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 18400, periodCr: 0,     closingDr: 18400,  closingCr: 0 },
  { code: "6400", name: "Marketing & Advertising",    type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 1800,  periodCr: 0,     closingDr: 1800,   closingCr: 0 },
  { code: "6500", name: "Travel & Entertainment",     type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 620,   periodCr: 0,     closingDr: 620,    closingCr: 0 },
  { code: "6600", name: "Professional Fees",          type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 1200,  periodCr: 0,     closingDr: 1200,   closingCr: 0 },
  { code: "6700", name: "Insurance",                  type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 400,   periodCr: 0,     closingDr: 400,    closingCr: 0 },
  { code: "6800", name: "Other Expenses",             type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 900,   periodCr: 0,     closingDr: 900,    closingCr: 0 },
  { code: "7000", name: "Depreciation Expense",       type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 1240,  periodCr: 0,     closingDr: 1240,   closingCr: 0 },
  { code: "7100", name: "Interest Expense",           type: "Expense",   openDr: 0,      openCr: 0,      periodDr: 860,   periodCr: 0,     closingDr: 860,    closingCr: 0 },
]

const ACCOUNT_TYPES = ["All Types", "Asset", "Liability", "Equity", "Income", "Expense"]

const fmt = (n: number) => n > 0 ? `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "—"

export default function TrialBalancePage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [period, setPeriod] = useState("month")

  const filtered = TRIAL_BALANCE.filter(row => {
    const matchSearch = !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.code.includes(search)
    const matchType = typeFilter === "All Types" || row.type === typeFilter
    return matchSearch && matchType
  })

  const totalOpenDr = filtered.reduce((s, r) => s + r.openDr, 0)
  const totalOpenCr = filtered.reduce((s, r) => s + r.openCr, 0)
  const totalPeriodDr = filtered.reduce((s, r) => s + r.periodDr, 0)
  const totalPeriodCr = filtered.reduce((s, r) => s + r.periodCr, 0)
  const totalClosingDr = filtered.reduce((s, r) => s + r.closingDr, 0)
  const totalClosingCr = filtered.reduce((s, r) => s + r.closingCr, 0)

  const openBalanced = Math.abs(totalOpenDr - totalOpenCr) < 1
  const closingBalanced = Math.abs(totalClosingDr - totalClosingCr) < 1

  const typeColors: Record<string, string> = {
    Asset: "bg-[var(--primary)]/10 text-[var(--primary)]",
    Liability: "bg-[#dc2626]/10 text-[#dc2626]",
    Equity: "bg-[#059669]/10 text-[#059669]",
    Income: "bg-[#d97706]/10 text-[#d97706]",
    Expense: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/reports"><ChevronLeft className="h-4 w-4" /></Link>
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">Reports</span>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-sm font-medium">Trial Balance</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Trial Balance</h1>
            <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
              closingBalanced ? "bg-[#059669]/10 text-[#059669]" : "bg-[#dc2626]/10 text-[#dc2626]")}>
              {closingBalanced ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {closingBalanced ? "Balanced" : "Out of Balance"}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">June 2026 · {TRIAL_BALANCE.length} accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" />Excel</Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileText className="h-3.5 w-3.5" />PDF</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search accounts…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-9 w-36 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ACCOUNT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-9 w-36 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="month">June 2026</SelectItem>
            <SelectItem value="quarter">Q2 2026</SelectItem>
            <SelectItem value="ytd">YTD 2026</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 ml-auto">
          <Download className="h-3.5 w-3.5" />Export
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--muted)]/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Code</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Account Name</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Type</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Opening Dr</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Opening Cr</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Period Dr</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Period Cr</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Closing Dr</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Closing Cr</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(row => (
                <TableRow key={row.code} className="hover:bg-[var(--muted)]/30">
                  <TableCell className="font-mono text-xs text-[var(--primary)] font-semibold">{row.code}</TableCell>
                  <TableCell className="text-sm font-medium text-[var(--foreground)]">{row.name}</TableCell>
                  <TableCell>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", typeColors[row.type] ?? "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                      {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-[var(--foreground)]">{fmt(row.openDr)}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-[var(--foreground)]">{fmt(row.openCr)}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-[var(--foreground)]">{fmt(row.periodDr)}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-[var(--foreground)]">{fmt(row.periodCr)}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold text-[var(--foreground)]">{fmt(row.closingDr)}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold text-[var(--foreground)]">{fmt(row.closingCr)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals row */}
        <div className={cn("border-t-2 border-[var(--border)] bg-[var(--muted)]/30 px-0")}>
          <table className="w-full text-sm">
            <tfoot>
              <tr>
                <td className="w-20 px-5 py-3" />
                <td className="px-3 py-3 font-bold text-sm text-[var(--foreground)]">TOTALS</td>
                <td className="w-24 px-3 py-3" />
                <td className="text-right px-5 py-3 font-bold font-mono text-sm text-[var(--foreground)] w-28">
                  £{totalOpenDr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className="text-right px-5 py-3 font-bold font-mono text-sm text-[var(--foreground)] w-28">
                  £{totalOpenCr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className="text-right px-5 py-3 font-bold font-mono text-sm text-[var(--foreground)] w-28">
                  £{totalPeriodDr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className="text-right px-5 py-3 font-bold font-mono text-sm text-[var(--foreground)] w-28">
                  £{totalPeriodCr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className={cn("text-right px-5 py-3 font-bold font-mono text-sm w-28", closingBalanced ? "text-[#059669]" : "text-[#dc2626]")}>
                  £{totalClosingDr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className={cn("text-right px-5 py-3 font-bold font-mono text-sm w-28", closingBalanced ? "text-[#059669]" : "text-[#dc2626]")}>
                  £{totalClosingCr.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
              </tr>
              {closingBalanced && (
                <tr>
                  <td colSpan={9} className="px-5 py-2 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#059669] font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />Trial balance is in balance · Debits equal Credits
                    </span>
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  )
}
