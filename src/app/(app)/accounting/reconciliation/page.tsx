"use client"

import React, { useState } from "react"
import {
  ArrowLeftRight, CheckCircle2, AlertTriangle, Search, Filter,
  Zap, RefreshCw, ChevronDown, X, Check, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "debit" | "credit"
  matched?: string
}

const BANK_TXNS: Transaction[] = [
  { id: "bk001", date: "01 Jun 2026", description: "FASTER PAYMENT — Blackwell Consulting", amount: 7650, type: "credit" },
  { id: "bk002", date: "02 Jun 2026", description: "DD — Office Space Co Ltd", amount: 3200, type: "debit" },
  { id: "bk003", date: "03 Jun 2026", description: "BACS — Kensington AI Ltd", amount: 3400, type: "credit" },
  { id: "bk004", date: "05 Jun 2026", description: "DD — Amazon Web Services", amount: 2140, type: "debit" },
  { id: "bk005", date: "07 Jun 2026", description: "CHAPS — Regency Systems partial", amount: 4500, type: "credit" },
  { id: "bk006", date: "08 Jun 2026", description: "FP OUT — June payroll engineering", amount: 18400, type: "debit" },
  { id: "bk007", date: "10 Jun 2026", description: "DD — Google Ads", amount: 1800, type: "debit" },
  { id: "bk008", date: "11 Jun 2026", description: "FASTER PAYMENT — Pembroke Analytics", amount: 1200, type: "credit" },
  { id: "bk009", date: "12 Jun 2026", description: "SO — Annual insurance premium", amount: 4800, type: "debit" },
  { id: "bk010", date: "13 Jun 2026", description: "BACS OUT — Server hardware purchase", amount: 8500, type: "debit" },
]

const SYSTEM_TXNS: Transaction[] = [
  { id: "sy001", date: "01 Jun 2026", description: "INV-2026-0140 — Blackwell Consulting payment received", amount: 7650, type: "credit" },
  { id: "sy002", date: "04 Jun 2026", description: "BILL-0088 — Office Space Co rent", amount: 3200, type: "debit" },
  { id: "sy003", date: "03 Jun 2026", description: "INV-2026-0137 — Kensington AI Ltd payment", amount: 3400, type: "credit" },
  { id: "sy004", date: "05 Jun 2026", description: "BILL-0089 — AWS Cloud Services", amount: 2140, type: "debit" },
  { id: "sy005", date: "07 Jun 2026", description: "PAY-0241 — Regency Systems partial payment", amount: 4500, type: "credit" },
  { id: "sy006", date: "08 Jun 2026", description: "PAY-JUN-ENG — Engineering payroll", amount: 18400, type: "debit" },
  { id: "sy007", date: "10 Jun 2026", description: "EXP-0412 — Google Ads campaign", amount: 1800, type: "debit" },
  { id: "sy008", date: "11 Jun 2026", description: "INV-2026-0136 — Pembroke Analytics payment", amount: 1200, type: "credit" },
  { id: "sy009", date: "12 Jun 2026", description: "JNL-2026-049 — Prepaid insurance", amount: 4800, type: "debit" },
  { id: "sy010", date: "13 Jun 2026", description: "ASSET-0056 — Server equipment purchase", amount: 8500, type: "debit" },
  { id: "sy011", date: "14 Jun 2026", description: "JNL-2026-050 — Director loan (unmatched)", amount: 5000, type: "debit" },
  { id: "sy012", date: "15 Jun 2026", description: "INV-2026-0144 — Kensington AI outstanding", amount: 3400, type: "credit" },
]

const TABS = ["Unmatched", "Matched", "All", "Exceptions"] as const
type Tab = typeof TABS[number]

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

export default function ReconciliationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Unmatched")
  const [bankSearch, setBankSearch] = useState("")
  const [sysSearch, setSysSearch] = useState("")
  const [bankAccount, setBankAccount] = useState("barclays-current")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [selectedSys, setSelectedSys] = useState<string | null>(null)
  const [matched, setMatched] = useState<Map<string, string>>(new Map())

  const matchedBankIds = new Set(matched.keys())
  const matchedSysIds = new Set(matched.values())

  const unmatchedBank = BANK_TXNS.filter(t => !matchedBankIds.has(t.id))
  const unmatchedSys = SYSTEM_TXNS.filter(t => !matchedSysIds.has(t.id))

  const filteredBank = (activeTab === "Matched" ? BANK_TXNS.filter(t => matchedBankIds.has(t.id)) : unmatchedBank)
    .filter(t => !bankSearch || t.description.toLowerCase().includes(bankSearch.toLowerCase()))
  const filteredSys = (activeTab === "Matched" ? SYSTEM_TXNS.filter(t => matchedSysIds.has(t.id)) : unmatchedSys)
    .filter(t => !sysSearch || t.description.toLowerCase().includes(sysSearch.toLowerCase()))

  const handleMatch = () => {
    if (!selectedBank || !selectedSys) return
    setMatched(prev => new Map([...prev, [selectedBank, selectedSys]]))
    setSelectedBank(null)
    setSelectedSys(null)
  }

  const handleUnmatch = (bankId: string) => {
    setMatched(prev => {
      const next = new Map(prev)
      next.delete(bankId)
      return next
    })
  }

  const autoMatch = () => {
    const newMatches = new Map(matched)
    BANK_TXNS.forEach(b => {
      if (matchedBankIds.has(b.id)) return
      const match = SYSTEM_TXNS.find(s =>
        !matchedSysIds.has(s.id) &&
        Math.abs(s.amount - b.amount) < 0.01 &&
        s.type === b.type
      )
      if (match) newMatches.set(b.id, match.id)
    })
    setMatched(newMatches)
  }

  const bankBalance = 156740
  const bookBalance = 143280
  const difference = bankBalance - bookBalance

  const progress = matched.size
  const total = BANK_TXNS.length

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <ArrowLeftRight className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Bank Reconciliation</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Match bank statement transactions to system records</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={autoMatch}>
            <Zap className="h-3.5 w-3.5" />Auto-Match
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />Import Statement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Bank Balance</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(bankBalance)}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Barclays Current · 10 Jun 2026</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Book Balance</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(bookBalance)}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Cash & Bank account · GL 1100</p>
        </div>
        <div className={cn("rounded-xl border p-4", Math.abs(difference) < 0.01 ? "border-[#059669]/30 bg-[#059669]/5" : "border-[#dc2626]/30 bg-[#dc2626]/5")}>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Difference</p>
          <p className={cn("text-xl font-bold", Math.abs(difference) < 0.01 ? "text-[#059669]" : "text-[#dc2626]")}>{fmt(Math.abs(difference))}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{Math.abs(difference) < 0.01 ? "Fully reconciled" : "Outstanding difference"}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Progress</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{progress} / {total}</p>
          <div className="mt-2 h-2 rounded-full bg-[var(--muted)]">
            <div className="h-2 rounded-full orbas-gradient transition-all" style={{ width: `${(progress / total) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={bankAccount} onValueChange={setBankAccount}>
          <SelectTrigger className="h-9 w-52 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="barclays-current">Barclays Current Account</SelectItem>
            <SelectItem value="barclays-savings">Barclays Savings Account</SelectItem>
            <SelectItem value="hsbc-usd">HSBC USD Account</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />Date Range
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Match indicator when both selected */}
      {selectedBank && selectedSys && (() => {
        const bk = BANK_TXNS.find(t => t.id === selectedBank)
        const sy = SYSTEM_TXNS.find(t => t.id === selectedSys)
        const amountMatch = bk && sy && Math.abs(bk.amount - sy.amount) < 0.01
        return (
          <div className={cn(
            "rounded-xl border p-3 flex items-center gap-3",
            amountMatch ? "border-[#059669]/30 bg-[#059669]/5" : "border-[#d97706]/30 bg-[#d97706]/5"
          )}>
            {amountMatch
              ? <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0" />
              : <AlertTriangle className="h-4 w-4 text-[#d97706] shrink-0" />
            }
            <span className="text-sm text-[var(--foreground)] flex-1">
              {amountMatch
                ? `Amounts match — ${fmt(bk!.amount)}`
                : `Amount mismatch — Bank: ${bk ? fmt(bk.amount) : "—"} vs System: ${sy ? fmt(sy.amount) : "—"}`
              }
            </span>
            <Button size="sm" className={cn("h-8 gap-1.5", amountMatch ? "orbas-gradient text-white hover:opacity-90" : "border-[#d97706] text-[#d97706]")} variant={amountMatch ? "default" : "outline"} onClick={handleMatch}>
              <Check className="h-3.5 w-3.5" />Match Transactions
            </Button>
            <Button size="sm" variant="ghost" className="h-8" onClick={() => { setSelectedBank(null); setSelectedSys(null) }}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        )
      })()}

      {/* Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bank Statement Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Bank Statement</CardTitle>
              <span className="text-xs text-[var(--muted-foreground)]">{filteredBank.length} transactions</span>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input placeholder="Search bank transactions…" className="pl-8 h-8 text-xs" value={bankSearch} onChange={e => setBankSearch(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {filteredBank.map(txn => {
                const isSelected = selectedBank === txn.id
                const isMatched = matchedBankIds.has(txn.id)
                return (
                  <div
                    key={txn.id}
                    onClick={() => !isMatched && setSelectedBank(isSelected ? null : txn.id)}
                    className={cn(
                      "px-4 py-3 flex items-center gap-3 transition-colors",
                      isMatched ? "bg-[#059669]/5 cursor-default" : "cursor-pointer hover:bg-[var(--muted)]/30",
                      isSelected && "bg-[var(--primary)]/5 border-l-2 border-[var(--primary)]"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{txn.description}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{txn.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn("text-sm font-semibold", txn.type === "credit" ? "text-[#059669]" : "text-[var(--foreground)]")}>
                        {txn.type === "credit" ? "+" : "-"}{fmt(txn.amount)}
                      </p>
                      {isMatched && (
                        <span className="text-[10px] text-[#059669] flex items-center gap-0.5 justify-end">
                          <CheckCircle2 className="h-2.5 w-2.5" />Matched
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Transactions Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">System Transactions</CardTitle>
              <span className="text-xs text-[var(--muted-foreground)]">{filteredSys.length} transactions</span>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input placeholder="Search system transactions…" className="pl-8 h-8 text-xs" value={sysSearch} onChange={e => setSysSearch(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {filteredSys.map(txn => {
                const isSelected = selectedSys === txn.id
                const isMatched = matchedSysIds.has(txn.id)
                return (
                  <div
                    key={txn.id}
                    onClick={() => !isMatched && setSelectedSys(isSelected ? null : txn.id)}
                    className={cn(
                      "px-4 py-3 flex items-center gap-3 transition-colors",
                      isMatched ? "bg-[#059669]/5 cursor-default" : "cursor-pointer hover:bg-[var(--muted)]/30",
                      isSelected && "bg-[var(--primary)]/5 border-l-2 border-[var(--primary)]"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{txn.description}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{txn.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn("text-sm font-semibold", txn.type === "credit" ? "text-[#059669]" : "text-[var(--foreground)]")}>
                        {txn.type === "credit" ? "+" : "-"}{fmt(txn.amount)}
                      </p>
                      {isMatched && (
                        <span className="text-[10px] text-[#059669] flex items-center gap-0.5 justify-end">
                          <CheckCircle2 className="h-2.5 w-2.5" />Matched
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 px-4 py-2.5">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Select one transaction from each panel to match them together. Use Auto-Match to automatically pair transactions with identical amounts.</span>
      </div>
    </div>
  )
}
