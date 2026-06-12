"use client"

import React, { useState } from "react"
import { Plus, ChevronDown, ChevronRight, Upload, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Account {
  code: string
  name: string
  type: string
  normalBalance: "Debit" | "Credit"
  balance: number
}

const COA: Record<string, { color: string; accounts: Account[] }> = {
  Assets: {
    color: "text-blue-700 bg-blue-50 border-blue-200",
    accounts: [
      { code: "1000", name: "Cash & Bank",             type: "Bank",              normalBalance: "Debit",  balance: 156740.50 },
      { code: "1100", name: "Accounts Receivable",     type: "Current Asset",     normalBalance: "Debit",  balance: 47140.00 },
      { code: "1150", name: "Allowance for Bad Debts", type: "Contra Asset",      normalBalance: "Credit", balance: -2000.00 },
      { code: "1200", name: "Prepaid Expenses",        type: "Current Asset",     normalBalance: "Debit",  balance: 4200.00 },
      { code: "1500", name: "Fixed Assets – Cost",     type: "Fixed Asset",       normalBalance: "Debit",  balance: 84000.00 },
      { code: "1550", name: "Accumulated Depreciation",type: "Contra Asset",      normalBalance: "Credit", balance: -22400.00 },
    ],
  },
  Liabilities: {
    color: "text-red-700 bg-red-50 border-red-200",
    accounts: [
      { code: "2000", name: "Accounts Payable",        type: "Current Liability", normalBalance: "Credit", balance: 31880.00 },
      { code: "2100", name: "VAT Control",             type: "Current Liability", normalBalance: "Credit", balance: 12340.00 },
      { code: "2200", name: "PAYE & NIC Payable",      type: "Current Liability", normalBalance: "Credit", balance: 8720.00 },
      { code: "2300", name: "Corporation Tax Payable", type: "Current Liability", normalBalance: "Credit", balance: 18400.00 },
      { code: "2500", name: "Long-term Loans",         type: "Non-current Liab",  normalBalance: "Credit", balance: 50000.00 },
    ],
  },
  Equity: {
    color: "text-violet-700 bg-violet-50 border-violet-200",
    accounts: [
      { code: "3000", name: "Share Capital",           type: "Equity",            normalBalance: "Credit", balance: 10000.00 },
      { code: "3100", name: "Retained Earnings",       type: "Equity",            normalBalance: "Credit", balance: 95140.50 },
      { code: "3200", name: "Owner Drawings",          type: "Equity",            normalBalance: "Debit",  balance: -24000.00 },
    ],
  },
  Income: {
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    accounts: [
      { code: "4000", name: "Sales Revenue",           type: "Income",            normalBalance: "Credit", balance: 284320.00 },
      { code: "4100", name: "Consulting Income",       type: "Income",            normalBalance: "Credit", balance: 72400.00 },
      { code: "4200", name: "Service Revenue",         type: "Income",            normalBalance: "Credit", balance: 48600.00 },
      { code: "4300", name: "Software Licences",       type: "Income",            normalBalance: "Credit", balance: 38400.00 },
      { code: "4900", name: "Other Income",            type: "Income",            normalBalance: "Credit", balance: 4800.00 },
    ],
  },
  Expenses: {
    color: "text-amber-700 bg-amber-50 border-amber-200",
    accounts: [
      { code: "6000", name: "Cost of Sales",           type: "Direct Cost",       normalBalance: "Debit",  balance: 84200.00 },
      { code: "6100", name: "IT & Software",           type: "Overhead",          normalBalance: "Debit",  balance: 22400.00 },
      { code: "6200", name: "Office & Admin",          type: "Overhead",          normalBalance: "Debit",  balance: 8640.00 },
      { code: "6300", name: "Travel & Subsistence",    type: "Overhead",          normalBalance: "Debit",  balance: 6820.00 },
      { code: "6400", name: "Professional Fees",       type: "Overhead",          normalBalance: "Debit",  balance: 18200.00 },
      { code: "6500", name: "Marketing & Advertising", type: "Overhead",          normalBalance: "Debit",  balance: 14400.00 },
      { code: "6600", name: "Utilities",               type: "Overhead",          normalBalance: "Debit",  balance: 3840.00 },
      { code: "7000", name: "Wages & Salaries",        type: "Payroll",           normalBalance: "Debit",  balance: 124000.00 },
      { code: "7100", name: "Employers NIC",           type: "Payroll",           normalBalance: "Debit",  balance: 14880.00 },
      { code: "7200", name: "Pension Contributions",   type: "Payroll",           normalBalance: "Debit",  balance: 6200.00 },
      { code: "7400", name: "Entertainment",           type: "Overhead",          normalBalance: "Debit",  balance: 2400.00 },
      { code: "8000", name: "Depreciation",            type: "Overhead",          normalBalance: "Debit",  balance: 8400.00 },
      { code: "8100", name: "Interest Expense",        type: "Finance Cost",      normalBalance: "Debit",  balance: 2600.00 },
    ],
  },
}

function fmt(n: number) {
  const abs = Math.abs(n)
  const sign = n < 0 ? "-" : ""
  return `${sign}£${abs.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
}

export default function ChartOfAccountsPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(Object.keys(COA)))
  const [addOpen, setAddOpen] = useState(false)

  function toggleSection(section: string) {
    setExpanded(prev => {
      const n = new Set(prev)
      n.has(section) ? n.delete(section) : n.add(section)
      return n
    })
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {Object.values(COA).reduce((s, g) => s + g.accounts.length, 0)} accounts across {Object.keys(COA).length} sections
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" />Import COA</Button>
          <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />Add Account
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(COA).map(([section, { color, accounts }]) => {
          const isExpanded = expanded.has(section)
          const sectionTotal = accounts.reduce((s, a) => s + a.balance, 0)
          return (
            <Card key={section} className="overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className={`w-full flex items-center justify-between px-4 py-3 border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors`}
              >
                <div className="flex items-center gap-2.5">
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />}
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${color}`}>{section}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">{accounts.length} accounts</span>
                </div>
                <span className="text-sm font-semibold">{fmt(sectionTotal)}</span>
              </button>

              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--muted)]/30 border-b border-[var(--border)]">
                        <th className="text-left px-4 py-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-20">Code</th>
                        <th className="text-left px-3 py-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium">Name</th>
                        <th className="text-left px-3 py-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium hidden md:table-cell">Type</th>
                        <th className="text-left px-3 py-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium hidden lg:table-cell">Normal Balance</th>
                        <th className="text-right px-4 py-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium">Balance</th>
                        <th className="w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((acc, idx) => (
                        <tr key={acc.code} className={`border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20 ${idx % 2 === 1 ? "bg-[var(--muted)]/10" : ""}`}>
                          <td className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--primary)]">{acc.code}</td>
                          <td className="px-3 py-2.5 font-medium">{acc.name}</td>
                          <td className="px-3 py-2.5 hidden md:table-cell text-[var(--muted-foreground)] text-xs">{acc.type}</td>
                          <td className="px-3 py-2.5 hidden lg:table-cell">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${acc.normalBalance === "Debit" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>
                              {acc.normalBalance}
                            </span>
                          </td>
                          <td className={`px-4 py-2.5 text-right font-semibold ${acc.balance < 0 ? "text-red-600" : ""}`}>{fmt(acc.balance)}</td>
                          <td className="pr-3 py-2.5">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Add Account Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Add Account</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Account Code</Label><Input placeholder="e.g. 4500" /></div>
              <div className="space-y-1.5">
                <Label>Section</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>{Object.keys(COA).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>Account Name</Label><Input placeholder="e.g. Grant Income" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="overhead">Overhead</SelectItem>
                    <SelectItem value="current_asset">Current Asset</SelectItem>
                    <SelectItem value="fixed_asset">Fixed Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Normal Balance</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Debit / Credit" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debit">Debit</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>Description</Label><Textarea placeholder="Optional description…" rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
