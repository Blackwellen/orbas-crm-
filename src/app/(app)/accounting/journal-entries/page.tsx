"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Filter, Download, Eye, Edit, Copy,
  MoreHorizontal, FileEdit, RotateCcw, Printer
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
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type JEStatus = "Draft" | "Posted" | "Reversed"

interface JournalEntry {
  id: string
  reference: string
  date: string
  description: string
  debitTotal: number
  creditTotal: number
  status: JEStatus
  createdBy: string
  lineCount: number
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  { id: "je-001", reference: "JNL-2026-050", date: "16 Jun 2026", description: "Director loan repayment received", debitTotal: 5000, creditTotal: 5000, status: "Draft", createdBy: "Emma Clarke", lineCount: 2 },
  { id: "je-002", reference: "JNL-2026-049", date: "12 Jun 2026", description: "Prepaid insurance — annual policy", debitTotal: 4800, creditTotal: 4800, status: "Posted", createdBy: "Emma Clarke", lineCount: 2 },
  { id: "je-003", reference: "JNL-2026-048", date: "07 Jun 2026", description: "Product costs — June week 1", debitTotal: 12400, creditTotal: 12400, status: "Posted", createdBy: "Emma Clarke", lineCount: 2 },
  { id: "je-004", reference: "JNL-2026-047", date: "05 Jun 2026", description: "Accrual — outstanding consulting fees", debitTotal: 3600, creditTotal: 3600, status: "Posted", createdBy: "James Harlow", lineCount: 2 },
  { id: "je-005", reference: "JNL-2026-046", date: "04 Jun 2026", description: "Correction — misposted payroll entry", debitTotal: 1200, creditTotal: 1200, status: "Posted", createdBy: "Emma Clarke", lineCount: 4 },
  { id: "je-006", reference: "JNL-2026-045", date: "02 Jun 2026", description: "Month-end accruals — May", debitTotal: 8750, creditTotal: 8750, status: "Posted", createdBy: "James Harlow", lineCount: 6 },
  { id: "je-007", reference: "JNL-2026-044", date: "31 May 2026", description: "Intercompany transfer — subsidiary A", debitTotal: 15000, creditTotal: 15000, status: "Reversed", createdBy: "Emma Clarke", lineCount: 2 },
  { id: "je-008", reference: "JNL-2026-043", date: "28 May 2026", description: "Depreciation charge — May 2026", debitTotal: 1240, creditTotal: 1240, status: "Posted", createdBy: "System", lineCount: 8 },
  { id: "je-009", reference: "JNL-2026-042", date: "25 May 2026", description: "Bad debt provision — Stratford Solutions", debitTotal: 2300, creditTotal: 2300, status: "Posted", createdBy: "James Harlow", lineCount: 2 },
  { id: "je-010", reference: "JNL-2026-041", date: "22 May 2026", description: "Revaluation — foreign currency balances", debitTotal: 430, creditTotal: 430, status: "Posted", createdBy: "Emma Clarke", lineCount: 4 },
  { id: "je-011", reference: "JNL-2026-040", date: "19 May 2026", description: "Stock write-down — obsolete inventory", debitTotal: 5600, creditTotal: 5600, status: "Posted", createdBy: "James Harlow", lineCount: 2 },
  { id: "je-012", reference: "JNL-2026-039", date: "15 May 2026", description: "Research & development capitalisation", debitTotal: 22000, creditTotal: 22000, status: "Posted", createdBy: "Emma Clarke", lineCount: 4 },
  { id: "je-013", reference: "JNL-2026-038", date: "10 May 2026", description: "Loan interest accrual — April", debitTotal: 860, creditTotal: 860, status: "Posted", createdBy: "James Harlow", lineCount: 2 },
  { id: "je-014", reference: "JNL-2026-037", date: "05 May 2026", description: "Opening balance correction — Q2", debitTotal: 340, creditTotal: 340, status: "Posted", createdBy: "Emma Clarke", lineCount: 2 },
  { id: "je-015", reference: "JNL-2026-036", date: "01 May 2026", description: "Revenue deferral — annual subscription", debitTotal: 9600, creditTotal: 9600, status: "Draft", createdBy: "James Harlow", lineCount: 2 },
]

const STATUS_CONFIG: Record<JEStatus, { label: string; className: string }> = {
  Draft:    { label: "Draft",    className: "bg-[#d97706]/10 text-[#d97706]" },
  Posted:   { label: "Posted",   className: "bg-[#059669]/10 text-[#059669]" },
  Reversed: { label: "Reversed", className: "bg-[var(--muted)] text-[var(--muted-foreground)]" },
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

export default function JournalEntriesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const filtered = JOURNAL_ENTRIES.filter(je => {
    const matchSearch = !search ||
      je.reference.toLowerCase().includes(search.toLowerCase()) ||
      je.description.toLowerCase().includes(search.toLowerCase()) ||
      je.createdBy.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || je.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalDraft = JOURNAL_ENTRIES.filter(j => j.status === "Draft").length
  const totalPosted = JOURNAL_ENTRIES.filter(j => j.status === "Posted").length

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <FileEdit className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Journal Entries</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {totalPosted} posted · {totalDraft} draft
            </p>
          </div>
        </div>
        <Button size="sm" className="h-9 gap-1.5 orbas-gradient text-white hover:opacity-90" asChild>
          <Link href="/app/accounting/journal-entries/new">
            <Plus className="h-4 w-4" />New Journal Entry
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search journal entries…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Posted">Posted</SelectItem>
            <SelectItem value="Reversed">Reversed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />More Filters
        </Button>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 ml-auto">
          <Download className="h-3.5 w-3.5" />Export
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Reference</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Debit Total</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Credit Total</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Lines</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Created By</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(je => {
              const sc = STATUS_CONFIG[je.status]
              return (
                <TableRow key={je.id} className="hover:bg-[var(--muted)]/30">
                  <TableCell>
                    <Link href={`/app/accounting/journal-entries/${je.id}`} className="text-[var(--primary)] font-semibold text-sm hover:underline">
                      {je.reference}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--muted-foreground)]">{je.date}</TableCell>
                  <TableCell className="text-sm text-[var(--foreground)] max-w-xs truncate">{je.description}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium text-[var(--foreground)]">{fmt(je.debitTotal)}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium text-[var(--foreground)]">{fmt(je.creditTotal)}</TableCell>
                  <TableCell className="text-sm text-[var(--muted-foreground)]">{je.lineCount} lines</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold", sc.className)}>
                      {sc.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--muted-foreground)]">{je.createdBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                          <Link href={`/app/accounting/journal-entries/${je.id}`} className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />View Details
                          </Link>
                        </DropdownMenuItem>
                        {je.status === "Draft" && (
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-3.5 w-3.5" />Edit
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Copy className="h-3.5 w-3.5" />Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Printer className="h-3.5 w-3.5" />Print
                        </DropdownMenuItem>
                        {je.status === "Posted" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-[#d97706]">
                              <RotateCcw className="h-3.5 w-3.5" />Create Reversal
                            </DropdownMenuItem>
                          </>
                        )}
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
