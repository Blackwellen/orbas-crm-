"use client"

import React, { useState } from "react"
import {
  Search, Download, Filter, ChevronLeft, ChevronRight,
  FileText, FileSpreadsheet, BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface LedgerEntry {
  id: string
  date: string
  accountCode: string
  accountName: string
  description: string
  debit: number
  credit: number
  balance: number
  reference: string
  postedBy: string
  status: "Posted" | "Unposted" | "Reconciled" | "Flagged"
}

const LEDGER_ENTRIES: LedgerEntry[] = [
  { id: "GL001", date: "01 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "Opening balance — Barclays Current", debit: 156740, credit: 0, balance: 156740, reference: "OB-JUN-26", postedBy: "System", status: "Posted" },
  { id: "GL002", date: "02 Jun 2026", accountCode: "4000", accountName: "Sales Revenue", description: "Invoice INV-2026-0141 — Holloway & Partners", debit: 0, credit: 1850, balance: 1850, reference: "INV-2026-0141", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL003", date: "02 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "Invoice INV-2026-0141 — Holloway & Partners", debit: 1850, credit: 0, balance: 1850, reference: "INV-2026-0141", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL004", date: "03 Jun 2026", accountCode: "4000", accountName: "Sales Revenue", description: "Invoice INV-2026-0142 — Meridian Tech Ltd", debit: 0, credit: 4200, balance: 6050, reference: "INV-2026-0142", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL005", date: "03 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "Invoice INV-2026-0142 — Meridian Tech Ltd", debit: 4200, credit: 0, balance: 6050, reference: "INV-2026-0142", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL006", date: "04 Jun 2026", accountCode: "6100", accountName: "Rent & Office Costs", description: "June office rent — Canary Wharf", debit: 3200, credit: 0, balance: 3200, reference: "BILL-0088", postedBy: "James Harlow", status: "Posted" },
  { id: "GL007", date: "04 Jun 2026", accountCode: "2100", accountName: "Accounts Payable", description: "June office rent — Canary Wharf", debit: 0, credit: 3200, balance: 3200, reference: "BILL-0088", postedBy: "James Harlow", status: "Posted" },
  { id: "GL008", date: "05 Jun 2026", accountCode: "6200", accountName: "Software & Subscriptions", description: "AWS Cloud Services — June", debit: 2140, credit: 0, balance: 2140, reference: "BILL-0089", postedBy: "James Harlow", status: "Posted" },
  { id: "GL009", date: "05 Jun 2026", accountCode: "2100", accountName: "Accounts Payable", description: "AWS Cloud Services — June", debit: 0, credit: 2140, balance: 5340, reference: "BILL-0089", postedBy: "James Harlow", status: "Posted" },
  { id: "GL010", date: "06 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "Payment received — Blackwell Consulting INV-2026-0140", debit: 7650, credit: 0, balance: 164390, reference: "PAY-0240", postedBy: "System", status: "Reconciled" },
  { id: "GL011", date: "06 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "Payment received — Blackwell Consulting INV-2026-0140", debit: 0, credit: 7650, balance: 0, reference: "PAY-0240", postedBy: "System", status: "Reconciled" },
  { id: "GL012", date: "07 Jun 2026", accountCode: "5000", accountName: "Cost of Goods Sold", description: "Product costs — June week 1", debit: 12400, credit: 0, balance: 12400, reference: "JNL-2026-048", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL013", date: "07 Jun 2026", accountCode: "1300", accountName: "Inventory", description: "Product costs — June week 1", debit: 0, credit: 12400, balance: 42100, reference: "JNL-2026-048", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL014", date: "08 Jun 2026", accountCode: "6300", accountName: "Salaries & Wages", description: "June payroll — engineering dept", debit: 18400, credit: 0, balance: 18400, reference: "PAY-JUN-ENG", postedBy: "James Harlow", status: "Posted" },
  { id: "GL015", date: "08 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "June payroll — engineering dept", debit: 0, credit: 18400, balance: 145990, reference: "PAY-JUN-ENG", postedBy: "James Harlow", status: "Posted" },
  { id: "GL016", date: "09 Jun 2026", accountCode: "4100", accountName: "Consulting Revenue", description: "Invoice INV-2026-0143 — Thames Digital", debit: 0, credit: 5100, balance: 11150, reference: "INV-2026-0143", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL017", date: "09 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "Invoice INV-2026-0143 — Thames Digital", debit: 5100, credit: 0, balance: 11150, reference: "INV-2026-0143", postedBy: "Sarah Mitchell", status: "Flagged" },
  { id: "GL018", date: "10 Jun 2026", accountCode: "6400", accountName: "Marketing & Advertising", description: "Google Ads — June campaign", debit: 1800, credit: 0, balance: 1800, reference: "EXP-0412", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL019", date: "10 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "Google Ads — June campaign", debit: 0, credit: 1800, balance: 144190, reference: "EXP-0412", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL020", date: "11 Jun 2026", accountCode: "2200", accountName: "VAT Liability", description: "VAT collected Q2 — week 2", debit: 0, credit: 2046, balance: 2046, reference: "VAT-JUN-W2", postedBy: "System", status: "Posted" },
  { id: "GL021", date: "11 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "VAT collected Q2 — week 2", debit: 2046, credit: 0, balance: 13196, reference: "VAT-JUN-W2", postedBy: "System", status: "Posted" },
  { id: "GL022", date: "12 Jun 2026", accountCode: "1500", accountName: "Prepaid Expenses", description: "Prepaid insurance — annual policy", debit: 4800, credit: 0, balance: 4800, reference: "JNL-2026-049", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL023", date: "12 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "Prepaid insurance — annual policy", debit: 0, credit: 4800, balance: 139390, reference: "JNL-2026-049", postedBy: "Emma Clarke", status: "Posted" },
  { id: "GL024", date: "13 Jun 2026", accountCode: "1600", accountName: "Fixed Assets", description: "New server equipment purchase", debit: 8500, credit: 0, balance: 8500, reference: "ASSET-0056", postedBy: "James Harlow", status: "Posted" },
  { id: "GL025", date: "13 Jun 2026", accountCode: "1100", accountName: "Cash & Bank", description: "New server equipment purchase", debit: 0, credit: 8500, balance: 130890, reference: "ASSET-0056", postedBy: "James Harlow", status: "Posted" },
  { id: "GL026", date: "14 Jun 2026", accountCode: "7000", accountName: "Depreciation Expense", description: "Monthly depreciation — May assets", debit: 1240, credit: 0, balance: 1240, reference: "DEP-JUN-26", postedBy: "System", status: "Posted" },
  { id: "GL027", date: "14 Jun 2026", accountCode: "1650", accountName: "Accumulated Depreciation", description: "Monthly depreciation — May assets", debit: 0, credit: 1240, balance: 14680, reference: "DEP-JUN-26", postedBy: "System", status: "Posted" },
  { id: "GL028", date: "15 Jun 2026", accountCode: "4000", accountName: "Sales Revenue", description: "Invoice INV-2026-0144 — Kensington AI Ltd", debit: 0, credit: 3400, balance: 14550, reference: "INV-2026-0144", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL029", date: "15 Jun 2026", accountCode: "1200", accountName: "Accounts Receivable", description: "Invoice INV-2026-0144 — Kensington AI Ltd", debit: 3400, credit: 0, balance: 16596, reference: "INV-2026-0144", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL030", date: "16 Jun 2026", accountCode: "3000", accountName: "Share Capital", description: "Director loan repayment received", debit: 0, credit: 5000, balance: 5000, reference: "JNL-2026-050", postedBy: "Emma Clarke", status: "Unposted" },
  { id: "GL031", date: "16 Jun 2026", accountCode: "2300", accountName: "Director Loans", description: "Director loan repayment received", debit: 5000, credit: 0, balance: 5000, reference: "JNL-2026-050", postedBy: "Emma Clarke", status: "Unposted" },
  { id: "GL032", date: "17 Jun 2026", accountCode: "6500", accountName: "Travel & Entertainment", description: "Sales team travel — Birmingham", debit: 620, credit: 0, balance: 620, reference: "EXP-0413", postedBy: "Sarah Mitchell", status: "Posted" },
  { id: "GL033", date: "17 Jun 2026", accountCode: "2100", accountName: "Accounts Payable", description: "Sales team travel — Birmingham", debit: 0, credit: 620, balance: 6160, reference: "EXP-0413", postedBy: "Sarah Mitchell", status: "Posted" },
]

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

const TABS = ["All Entries", "Unposted", "Reconciled", "Flagged"] as const
type TabType = typeof TABS[number]

export default function GeneralLedgerPage() {
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState("month")
  const [accountFilter, setAccountFilter] = useState("all")
  const [activeTab, setActiveTab] = useState<TabType>("All Entries")
  const [page, setPage] = useState(1)
  const PER_PAGE = 50

  const tabFiltered = LEDGER_ENTRIES.filter(e => {
    if (activeTab === "Unposted") return e.status === "Unposted"
    if (activeTab === "Reconciled") return e.status === "Reconciled"
    if (activeTab === "Flagged") return e.status === "Flagged"
    return true
  })

  const filtered = tabFiltered.filter(e => {
    const matchSearch = !search ||
      e.accountName.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.reference.toLowerCase().includes(search.toLowerCase()) ||
      e.accountCode.includes(search)
    const matchAccount = accountFilter === "all" || e.accountCode === accountFilter
    return matchSearch && matchAccount
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const totalDebits = filtered.reduce((s, e) => s + e.debit, 0)
  const totalCredits = filtered.reduce((s, e) => s + e.credit, 0)
  const netBalance = totalDebits - totalCredits

  const uniqueAccounts = Array.from(new Set(LEDGER_ENTRIES.map(e => e.accountCode)))
    .map(code => ({ code, name: LEDGER_ENTRIES.find(e => e.accountCode === code)!.accountName }))

  const statusColor = (s: string) => {
    if (s === "Posted") return "bg-[#059669]/10 text-[#059669]"
    if (s === "Unposted") return "bg-[#d97706]/10 text-[#d97706]"
    if (s === "Reconciled") return "bg-[var(--primary)]/10 text-[var(--primary)]"
    if (s === "Flagged") return "bg-[#dc2626]/10 text-[#dc2626]"
    return "bg-[var(--muted)] text-[var(--muted-foreground)]"
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">General Ledger</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {filtered.length} entries · June 2026
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <FileSpreadsheet className="h-3.5 w-3.5" />Export CSV
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <FileText className="h-3.5 w-3.5" />Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Debits</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(totalDebits)}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Credits</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(totalCredits)}</p>
        </div>
        <div className={cn("rounded-xl border p-4", Math.abs(netBalance) < 0.01 ? "border-[#059669]/30 bg-[#059669]/5" : "border-[#dc2626]/30 bg-[#dc2626]/5")}>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Net Balance</p>
          <p className={cn("text-xl font-bold", Math.abs(netBalance) < 0.01 ? "text-[#059669]" : "text-[#dc2626]")}>{fmt(Math.abs(netBalance))}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search entries…" className="pl-8 h-9 text-sm" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Select value={accountFilter} onValueChange={v => { setAccountFilter(v); setPage(1) }}>
          <SelectTrigger className="h-9 w-52 text-sm">
            <SelectValue placeholder="All Accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {uniqueAccounts.map(a => (
              <SelectItem key={a.code} value={a.code}>{a.code} — {a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />More Filters
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setPage(1) }}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            {tab}
            <span className="ml-1.5 text-xs rounded-full px-1.5 py-0.5 bg-[var(--muted)] text-[var(--muted-foreground)]">
              {LEDGER_ENTRIES.filter(e => {
                if (tab === "Unposted") return e.status === "Unposted"
                if (tab === "Reconciled") return e.status === "Reconciled"
                if (tab === "Flagged") return e.status === "Flagged"
                return true
              }).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Code</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Account Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Debit</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Credit</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Balance</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-36">Reference</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Posted By</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map(entry => (
              <TableRow key={entry.id} className="hover:bg-[var(--muted)]/30 text-sm">
                <TableCell className="text-[var(--muted-foreground)] text-xs">{entry.date}</TableCell>
                <TableCell className="font-mono text-xs font-medium text-[var(--primary)]">{entry.accountCode}</TableCell>
                <TableCell className="font-medium text-[var(--foreground)] text-xs">{entry.accountName}</TableCell>
                <TableCell className="text-[var(--muted-foreground)] text-xs max-w-xs truncate">{entry.description}</TableCell>
                <TableCell className="text-right font-mono text-xs font-medium text-[var(--foreground)]">
                  {entry.debit > 0 ? fmt(entry.debit) : "—"}
                </TableCell>
                <TableCell className="text-right font-mono text-xs font-medium text-[var(--foreground)]">
                  {entry.credit > 0 ? fmt(entry.credit) : "—"}
                </TableCell>
                <TableCell className="text-right font-mono text-xs font-semibold text-[var(--foreground)]">{fmt(entry.balance)}</TableCell>
                <TableCell className="text-xs text-[var(--primary)] font-medium">{entry.reference}</TableCell>
                <TableCell className="text-xs text-[var(--muted-foreground)]">{entry.postedBy}</TableCell>
                <TableCell>
                  <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold", statusColor(entry.status))}>
                    {entry.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
          <span>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
