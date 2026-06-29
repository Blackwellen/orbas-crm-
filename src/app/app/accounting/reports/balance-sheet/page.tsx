"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, Download, FileSpreadsheet, FileText, ChevronDown,
  ChevronRight, CheckCircle2, AlertCircle, Scale
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Balance sheet data as at 10 Jun 2026
const BS = {
  currentAssets: {
    label: "Current Assets",
    items: [
      { code: "1100", name: "Cash & Bank", current: 130890, prior: 118240 },
      { code: "1200", name: "Accounts Receivable", current: 47140, prior: 38600 },
      { code: "1300", name: "Inventory", current: 42100, prior: 45200 },
      { code: "1500", name: "Prepaid Expenses", current: 4800, prior: 2400 },
      { code: "1400", name: "Other Current Assets", current: 1840, prior: 1200 },
    ],
  },
  nonCurrentAssets: {
    label: "Non-Current Assets",
    items: [
      { code: "1600", name: "Property, Plant & Equipment", current: 305200, prior: 296700 },
      { code: "1650", name: "Accumulated Depreciation", current: -67450, prior: -66210 },
      { code: "1700", name: "Intangible Assets", current: 22000, prior: 14000 },
      { code: "1750", name: "Long-term Investments", current: 15000, prior: 15000 },
    ],
  },
  currentLiabilities: {
    label: "Current Liabilities",
    items: [
      { code: "2100", name: "Accounts Payable", current: 31880, prior: 28400 },
      { code: "2200", name: "VAT Liability", current: 8960, prior: 7200 },
      { code: "2300", name: "Accrued Expenses", current: 6420, prior: 5800 },
      { code: "2400", name: "Short-term Borrowings", current: 12000, prior: 12000 },
      { code: "2500", name: "Deferred Revenue", current: 9600, prior: 4800 },
    ],
  },
  longTermLiabilities: {
    label: "Long-term Liabilities",
    items: [
      { code: "2600", name: "Long-term Loans", current: 85000, prior: 95000 },
      { code: "2700", name: "Director Loans", current: 15000, prior: 20000 },
      { code: "2800", name: "Deferred Tax Liability", current: 4200, prior: 3800 },
    ],
  },
  equity: {
    label: "Equity",
    items: [
      { code: "3000", name: "Share Capital", current: 50000, prior: 50000 },
      { code: "3100", name: "Share Premium", current: 20000, prior: 20000 },
      { code: "3200", name: "Retained Earnings", current: 195460, prior: 116930 },
      { code: "3300", name: "Current Year Profit", current: 83940, prior: 71200 },
    ],
  },
}

const fmt = (n: number) => {
  if (n < 0) return `(£${Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2 })})`
  return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
}

type SectionKey = keyof typeof BS

export default function BalanceSheetPage() {
  const [asAtDate, setAsAtDate] = useState("2026")
  const [expanded, setExpanded] = useState<Set<SectionKey>>(new Set(Object.keys(BS) as SectionKey[]))

  const toggle = (key: SectionKey) => setExpanded(prev => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })

  const sumSection = (key: SectionKey) => BS[key].items.reduce((s, i) => s + i.current, 0)
  const sumSectionPrior = (key: SectionKey) => BS[key].items.reduce((s, i) => s + i.prior, 0)

  const totalCurrentAssets = sumSection("currentAssets")
  const totalNonCurrentAssets = sumSection("nonCurrentAssets")
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets

  const totalCurrentLiabilities = sumSection("currentLiabilities")
  const totalLongTermLiabilities = sumSection("longTermLiabilities")
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities

  const totalEquity = sumSection("equity")

  const totalLiabEquity = totalLiabilities + totalEquity
  const inBalance = Math.abs(totalAssets - totalLiabEquity) < 1

  const priorCurrentAssets = sumSectionPrior("currentAssets")
  const priorNonCurrentAssets = sumSectionPrior("nonCurrentAssets")
  const priorTotalAssets = priorCurrentAssets + priorNonCurrentAssets
  const priorCurrentLiab = sumSectionPrior("currentLiabilities")
  const priorLongTermLiab = sumSectionPrior("longTermLiabilities")
  const priorTotalLiab = priorCurrentLiab + priorLongTermLiab
  const priorEquity = sumSectionPrior("equity")
  const priorLiabEquity = priorTotalLiab + priorEquity

  const renderSection = (key: SectionKey, invertStyle = false) => {
    const section = BS[key]
    const total = sumSection(key)
    const priorTotal = sumSectionPrior(key)
    const isOpen = expanded.has(key)
    return (
      <>
        <tr
          className="border-b border-[var(--border)] bg-[var(--muted)]/20 cursor-pointer hover:bg-[var(--muted)]/30"
          onClick={() => toggle(key)}
        >
          <td className="px-5 py-3 w-16"></td>
          <td className="px-3 py-3 flex items-center gap-1.5">
            {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
            <span className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">{section.label}</span>
          </td>
          <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(total)}</td>
          <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorTotal)}</td>
        </tr>
        {isOpen && section.items.map(item => (
          <tr key={item.code} className="border-b border-[var(--border)]/60 hover:bg-[var(--muted)]/20">
            <td className="px-5 py-2.5 font-mono text-xs text-[var(--muted-foreground)]">{item.code}</td>
            <td className="px-3 py-2.5 pl-10 text-xs text-[var(--foreground)]">{item.name}</td>
            <td className={cn("px-5 py-2.5 text-right font-mono text-xs", item.current < 0 ? "text-[#dc2626]" : "text-[var(--foreground)]")}>{fmt(item.current)}</td>
            <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--muted-foreground)]">{fmt(item.prior)}</td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/reports"><ChevronLeft className="h-4 w-4" /></Link>
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">Reports</span>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-sm font-medium">Balance Sheet</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Balance Sheet</h1>
            <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
              inBalance ? "bg-[#059669]/10 text-[#059669]" : "bg-[#dc2626]/10 text-[#dc2626]")}>
              {inBalance ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {inBalance ? "In Balance" : "Out of Balance"}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">As at 10 June 2026 · Comparative: 31 Dec 2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" />Excel</Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileText className="h-3.5 w-3.5" />PDF</Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <Select value={asAtDate} onValueChange={setAsAtDate}>
          <SelectTrigger className="h-9 w-44 text-sm"><SelectValue placeholder="As at date" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">10 June 2026</SelectItem>
            <SelectItem value="2025-q1">31 Mar 2026</SelectItem>
            <SelectItem value="2025-dec">31 Dec 2025</SelectItem>
            <SelectItem value="2025-sep">30 Sep 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Assets</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(totalAssets)}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Liabilities</p>
          <p className="text-xl font-bold text-[#dc2626]">{fmt(totalLiabilities)}</p>
        </div>
        <div className="rounded-xl border border-[#059669]/20 bg-[#059669]/5 p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Equity</p>
          <p className="text-xl font-bold text-[#059669]">{fmt(totalEquity)}</p>
        </div>
      </div>

      {/* Balance Sheet Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)]/40 border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-16">Code</th>
                <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Account</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-36">10 Jun 2026</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-36">31 Dec 2025</th>
              </tr>
            </thead>
            <tbody>
              {/* ASSETS */}
              <tr className="bg-[var(--primary)]/5">
                <td colSpan={4} className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">ASSETS</td>
              </tr>
              {renderSection("currentAssets")}
              <tr className="border-b-2 border-[var(--border)] bg-[var(--primary)]/5">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-sm font-bold text-[var(--foreground)]">Total Current Assets</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(totalCurrentAssets)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorCurrentAssets)}</td>
              </tr>
              {renderSection("nonCurrentAssets")}
              <tr className="border-b-2 border-[var(--border)] bg-[var(--primary)]/5">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-sm font-bold text-[var(--foreground)]">Total Non-Current Assets</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(totalNonCurrentAssets)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorNonCurrentAssets)}</td>
              </tr>
              <tr className="border-b-2 border-[var(--border)] bg-[var(--primary)]/10">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-base font-bold text-[var(--foreground)]">TOTAL ASSETS</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-lg text-[var(--foreground)]">{fmt(totalAssets)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorTotalAssets)}</td>
              </tr>

              {/* LIABILITIES */}
              <tr className="bg-[#dc2626]/5">
                <td colSpan={4} className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#dc2626]">LIABILITIES</td>
              </tr>
              {renderSection("currentLiabilities")}
              <tr className="border-b-2 border-[var(--border)] bg-[#dc2626]/5">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-sm font-bold text-[var(--foreground)]">Total Current Liabilities</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(totalCurrentLiabilities)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorCurrentLiab)}</td>
              </tr>
              {renderSection("longTermLiabilities")}
              <tr className="border-b-2 border-[var(--border)] bg-[#dc2626]/5">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-sm font-bold text-[var(--foreground)]">Total Long-term Liabilities</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(totalLongTermLiabilities)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorLongTermLiab)}</td>
              </tr>
              <tr className="border-b-2 border-[var(--border)] bg-[#dc2626]/8">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-base font-bold text-[var(--foreground)]">TOTAL LIABILITIES</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-lg text-[#dc2626]">{fmt(totalLiabilities)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorTotalLiab)}</td>
              </tr>

              {/* EQUITY */}
              <tr className="bg-[#059669]/5">
                <td colSpan={4} className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#059669]">EQUITY</td>
              </tr>
              {renderSection("equity")}
              <tr className="border-b-2 border-[var(--border)] bg-[#059669]/10">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-base font-bold text-[var(--foreground)]">TOTAL EQUITY</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-lg text-[#059669]">{fmt(totalEquity)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorEquity)}</td>
              </tr>

              {/* Total */}
              <tr className={cn("border-t-2", inBalance ? "bg-[#059669]/10" : "bg-[#dc2626]/10")}>
                <td className="px-5 py-4"></td>
                <td className="px-3 py-4 flex items-center gap-2">
                  <Scale className={cn("h-4 w-4", inBalance ? "text-[#059669]" : "text-[#dc2626]")} />
                  <span className="text-base font-bold text-[var(--foreground)]">TOTAL LIABILITIES + EQUITY</span>
                </td>
                <td className={cn("px-5 py-4 text-right font-bold font-mono text-lg", inBalance ? "text-[#059669]" : "text-[#dc2626]")}>{fmt(totalLiabEquity)}</td>
                <td className="px-5 py-4 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorLiabEquity)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
