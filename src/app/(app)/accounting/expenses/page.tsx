"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Receipt, Grid3X3, List, MoreHorizontal, Eye, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ExpenseStatus = "Draft" | "Submitted" | "Approved" | "Rejected" | "Paid"
type ViewMode = "table" | "card"

interface Expense {
  id: string
  date: string
  description: string
  category: string
  amount: number
  submittedBy: string
  hasReceipt: boolean
  status: ExpenseStatus
}

const EXPENSES: Expense[] = [
  { id: "EXP-001", date: "08 Jun 2024", description: "Client lunch – Meridian Tech Ltd", category: "Entertainment",      amount: 186.40,  submittedBy: "Sarah Mitchell",  hasReceipt: true,  status: "Approved" },
  { id: "EXP-002", date: "07 Jun 2024", description: "Train to Manchester – client visit",category: "Travel",             amount: 142.00,  submittedBy: "James Holloway",  hasReceipt: true,  status: "Paid" },
  { id: "EXP-003", date: "06 Jun 2024", description: "AWS Marketplace – tool licence",   category: "IT & Software",       amount: 89.00,   submittedBy: "Dev Team",        hasReceipt: false, status: "Submitted" },
  { id: "EXP-004", date: "05 Jun 2024", description: "Office stationery – Q2 restock",   category: "Office & Admin",      amount: 64.50,   submittedBy: "Alice Thompson",  hasReceipt: true,  status: "Approved" },
  { id: "EXP-005", date: "04 Jun 2024", description: "Parking – Bristol site visit",     category: "Travel",              amount: 22.00,   submittedBy: "Sarah Mitchell",  hasReceipt: false, status: "Draft" },
  { id: "EXP-006", date: "03 Jun 2024", description: "LinkedIn Premium – Jun",           category: "Subscriptions",       amount: 54.99,   submittedBy: "Marketing",       hasReceipt: true,  status: "Paid" },
  { id: "EXP-007", date: "02 Jun 2024", description: "Team meal – project launch",       category: "Entertainment",       amount: 312.80,  submittedBy: "James Holloway",  hasReceipt: true,  status: "Rejected" },
  { id: "EXP-008", date: "01 Jun 2024", description: "Uber – Heathrow client pickup",    category: "Travel",              amount: 48.20,   submittedBy: "Sarah Mitchell",  hasReceipt: true,  status: "Paid" },
  { id: "EXP-009", date: "31 May 2024", description: "Zoom Pro licence renewal",         category: "Subscriptions",       amount: 143.88,  submittedBy: "IT Admin",        hasReceipt: true,  status: "Approved" },
  { id: "EXP-010", date: "30 May 2024", description: "Printing – brochure reprint",      category: "Marketing",           amount: 224.00,  submittedBy: "Marketing",       hasReceipt: false, status: "Submitted" },
  { id: "EXP-011", date: "29 May 2024", description: "Courier – urgent doc delivery",    category: "Postage & Courier",   amount: 18.50,   submittedBy: "Alice Thompson",  hasReceipt: true,  status: "Paid" },
  { id: "EXP-012", date: "28 May 2024", description: "Whiteboard & markers",             category: "Office & Admin",      amount: 42.99,   submittedBy: "IT Admin",        hasReceipt: false, status: "Draft" },
  { id: "EXP-013", date: "27 May 2024", description: "GDrive storage upgrade",           category: "IT & Software",       amount: 24.00,   submittedBy: "Dev Team",        hasReceipt: true,  status: "Paid" },
  { id: "EXP-014", date: "26 May 2024", description: "Heathrow parking – 2 nights",     category: "Travel",              amount: 68.00,   submittedBy: "James Holloway",  hasReceipt: true,  status: "Approved" },
  { id: "EXP-015", date: "25 May 2024", description: "Conference registration – FinTech",category: "Professional Dev",    amount: 395.00,  submittedBy: "Sarah Mitchell",  hasReceipt: true,  status: "Approved" },
]

const STATUS_CONFIG: Record<ExpenseStatus, { label: string; className: string }> = {
  Draft:     { label: "Draft",     className: "bg-slate-100 text-slate-600" },
  Submitted: { label: "Submitted", className: "bg-blue-100 text-blue-700" },
  Approved:  { label: "Approved",  className: "bg-violet-100 text-violet-700" },
  Rejected:  { label: "Rejected",  className: "bg-red-100 text-red-700" },
  Paid:      { label: "Paid",      className: "bg-emerald-100 text-emerald-700" },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Entertainment":     "bg-pink-100 text-pink-700",
  "Travel":            "bg-blue-100 text-blue-700",
  "IT & Software":     "bg-violet-100 text-violet-700",
  "Office & Admin":    "bg-slate-100 text-slate-600",
  "Subscriptions":     "bg-cyan-100 text-cyan-700",
  "Marketing":         "bg-amber-100 text-amber-700",
  "Postage & Courier": "bg-orange-100 text-orange-700",
  "Professional Dev":  "bg-emerald-100 text-emerald-700",
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function ExpensesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState<ViewMode>("table")

  const filtered = EXPENSES.filter(e => {
    const matchSearch = e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.submittedBy.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || e.status === statusFilter
    return matchSearch && matchStatus
  })

  const total = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const pendingCount = EXPENSES.filter(e => e.status === "Submitted").length

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Expenses</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {EXPENSES.length} expenses · {fmt(total)} total · {pendingCount} awaiting approval
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />New Expense
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search expenses…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(STATUS_CONFIG).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" />Filters</Button>
        <div className="flex rounded-md border border-[var(--border)] overflow-hidden ml-auto">
          <button
            onClick={() => setView("table")}
            className={`px-3 py-2 text-sm ${view === "table" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("card")}
            className={`px-3 py-2 text-sm border-l border-[var(--border)] ${view === "card" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--muted)]/40">
                <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Date</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Description</TableHead>
                <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Category</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Amount</TableHead>
                <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Submitted By</TableHead>
                <TableHead className="hidden lg:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Receipt</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(exp => {
                const s = STATUS_CONFIG[exp.status]
                const catColor = CATEGORY_COLORS[exp.category] || "bg-gray-100 text-gray-600"
                return (
                  <TableRow key={exp.id} className="hover:bg-[var(--muted)]/40">
                    <TableCell className="text-sm text-[var(--muted-foreground)] whitespace-nowrap">{exp.date}</TableCell>
                    <TableCell>
                      <Link href={`/app/accounting/expenses/${exp.id}`} className="text-sm font-medium hover:text-[var(--primary)] hover:underline">
                        {exp.description}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${catColor}`}>
                        {exp.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-sm">{fmt(exp.amount)}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{exp.submittedBy}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {exp.hasReceipt ? (
                        <Receipt className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Receipt className="h-4 w-4 text-[var(--muted-foreground)]/40" />
                      )}
                    </TableCell>
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
                          <DropdownMenuItem asChild><Link href={`/app/accounting/expenses/${exp.id}`} className="flex gap-2"><Eye className="h-3.5 w-3.5" />View</Link></DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" />Approve</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600"><XCircle className="h-3.5 w-3.5" />Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(exp => {
            const s = STATUS_CONFIG[exp.status]
            const catColor = CATEGORY_COLORS[exp.category] || "bg-gray-100 text-gray-600"
            return (
              <Card key={exp.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${catColor}`}>
                      {exp.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.className}`}>
                      {s.label}
                    </span>
                  </div>
                  <p className="font-medium text-sm mb-1 line-clamp-2">{exp.description}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)] mb-3">{fmt(exp.amount)}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                    <span>{exp.submittedBy}</span>
                    <span>{exp.date}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
