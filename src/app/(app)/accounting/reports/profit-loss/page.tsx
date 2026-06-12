"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, Download, FileSpreadsheet, FileText, ChevronDown,
  ChevronRight, TrendingUp, TrendingDown, BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Cell
} from "recharts"
import { cn } from "@/lib/utils"

const PL_DATA = {
  revenue: {
    label: "Revenue",
    items: [
      { code: "4000", name: "Product Sales",          current: 42100, prior: 38200, budget: 40000 },
      { code: "4100", name: "Consulting Revenue",     current: 25100, prior: 19800, budget: 22000 },
    ],
  },
  cogs: {
    label: "Cost of Goods Sold",
    items: [
      { code: "5000", name: "Direct Materials",       current: 18400, prior: 16200, budget: 17000 },
      { code: "5100", name: "Direct Labour",          current: 8200,  prior: 7100,  budget: 7800 },
      { code: "5200", name: "Manufacturing Overhead", current: 1800,  prior: 1600,  budget: 1600 },
    ],
  },
  opex: {
    label: "Operating Expenses",
    items: [
      { code: "6100", name: "Rent & Office Costs",   current: 3200,  prior: 3200,  budget: 3200 },
      { code: "6200", name: "Software & SaaS",       current: 2140,  prior: 1890,  budget: 2000 },
      { code: "6300", name: "Salaries & Wages",      current: 18400, prior: 17200, budget: 18000 },
      { code: "6400", name: "Marketing",             current: 1800,  prior: 2100,  budget: 2500 },
      { code: "6500", name: "Travel & Entertainment",current: 620,   prior: 480,   budget: 800 },
      { code: "6600", name: "Professional Fees",     current: 1200,  prior: 900,   budget: 1000 },
      { code: "6700", name: "Insurance",             current: 400,   prior: 400,   budget: 400 },
      { code: "6800", name: "Other Expenses",        current: 900,   prior: 760,   budget: 800 },
    ],
  },
}

const MONTHLY_DATA = [
  { month: "Jan", revenue: 42000, expenses: 34000, net: 8000 },
  { month: "Feb", revenue: 48000, expenses: 34000, net: 14000 },
  { month: "Mar", revenue: 38000, expenses: 35000, net: 3000 },
  { month: "Apr", revenue: 61000, expenses: 40000, net: 21000 },
  { month: "May", revenue: 54000, expenses: 37000, net: 17000 },
  { month: "Jun", revenue: 67200, expenses: 43460, net: 23740 },
]

const fmt = (n: number) => `Â£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
const fmtK = (n: number) => `Â£${(n / 1000).toFixed(0)}k`
const pct = (a: number, b: number) => b !== 0 ? ((a - b) / b * 100).toFixed(1) : "â€”"
const margin = (profit: number, revenue: number) => revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0"

export default function ProfitLossPage() {
  const [period, setPeriod] = useState("month")
  const [compareMode, setCompareMode] = useState("prior-period")
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["revenue", "cogs", "opex"]))

  const toggleSection = (key: string) => setExpanded(prev => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })

  const totalRevenue = PL_DATA.revenue.items.reduce((s, i) => s + i.current, 0)
  const priorRevenue = PL_DATA.revenue.items.reduce((s, i) => s + i.prior, 0)
  const budgetRevenue = PL_DATA.revenue.items.reduce((s, i) => s + i.budget, 0)

  const totalCOGS = PL_DATA.cogs.items.reduce((s, i) => s + i.current, 0)
  const priorCOGS = PL_DATA.cogs.items.reduce((s, i) => s + i.prior, 0)

  const grossProfit = totalRevenue - totalCOGS
  const priorGrossProfit = priorRevenue - priorCOGS

  const totalOpEx = PL_DATA.opex.items.reduce((s, i) => s + i.current, 0)
  const priorOpEx = PL_DATA.opex.items.reduce((s, i) => s + i.prior, 0)

  const ebitda = grossProfit - totalOpEx
  const priorEbitda = priorGrossProfit - priorOpEx

  const depreciation = 1240
  const priorDep = 1240

  const ebit = ebitda - depreciation
  const priorEbit = priorEbitda - priorDep

  const interest = 860
  const priorInterest = 800

  const profitBT = ebit - interest
  const priorProfitBT = priorEbit - priorInterest

  const taxRate = 0.19
  const tax = profitBT * taxRate
  const priorTax = priorProfitBT * taxRate

  const netProfit = profitBT - tax
  const priorNetProfit = priorProfitBT - priorTax

  const compareLabel = compareMode === "prior-period" ? "May 2026" : compareMode === "prior-year" ? "Jun 2025" : "Budget"
  const getCompare = (item: { current: number; prior: number; budget: number }) =>
    compareMode === "budget" ? item.budget : item.prior

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/reports"><ChevronLeft className="h-4 w-4" /></Link>
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">Reports</span>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-sm font-medium text-[var(--foreground)]">Profit & Loss</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Profit & Loss Statement</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">June 2026 Â· GBP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" />Excel</Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileText className="h-3.5 w-3.5" />PDF</Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-9 w-36 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Select value={compareMode} onValueChange={setCompareMode}>
          <SelectTrigger className="h-9 w-44 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="prior-period">vs Last Period</SelectItem>
            <SelectItem value="prior-year">vs Last Year</SelectItem>
            <SelectItem value="budget">vs Budget</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: totalRevenue, margin: null, change: pct(totalRevenue, priorRevenue) },
          { label: "Gross Profit", value: grossProfit, margin: margin(grossProfit, totalRevenue), change: pct(grossProfit, priorGrossProfit) },
          { label: "EBITDA", value: ebitda, margin: margin(ebitda, totalRevenue), change: pct(ebitda, priorEbitda) },
          { label: "Net Profit", value: netProfit, margin: margin(netProfit, totalRevenue), change: pct(netProfit, priorNetProfit) },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)] mb-1">{kpi.label}</p>
            <p className="text-xl font-bold text-[var(--foreground)]">{fmt(kpi.value)}</p>
            <div className="flex items-center gap-2 mt-1">
              {kpi.margin && <span className="text-xs text-[var(--muted-foreground)]">{kpi.margin}% margin</span>}
              <span className={cn("text-xs font-medium flex items-center gap-0.5", parseFloat(kpi.change) >= 0 ? "text-[#059669]" : "text-[#dc2626]")}>
                {parseFloat(kpi.change) >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-[var(--primary)]" />Monthly Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={fmtK} />
              <Tooltip formatter={(v: any) => [fmt(v)]} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="revenue" name="Revenue" fill="#1a56db" opacity={0.7} radius={[2, 2, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#dc2626" opacity={0.5} radius={[2, 2, 0, 0]} />
              <Bar dataKey="net" name="Net Profit" fill="#059669" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Full P&L Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)]/40 border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-16">Code</th>
                <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Current Period</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">{compareLabel}</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Variance</th>
              </tr>
            </thead>
            <tbody>

              {/* Revenue Section */}
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]/20 cursor-pointer hover:bg-[var(--muted)]/30" onClick={() => toggleSection("revenue")}>
                <td className="px-5 py-3 text-xs font-semibold text-[var(--muted-foreground)]"></td>
                <td className="px-3 py-3 flex items-center gap-1.5">
                  {expanded.has("revenue") ? <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                  <span className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">Revenue</span>
                </td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[var(--foreground)]">{fmt(totalRevenue)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorRevenue)}</td>
                <td className="px-5 py-3 text-right font-mono">
                  <span className={cn("text-xs font-semibold", totalRevenue >= priorRevenue ? "text-[#059669]" : "text-[#dc2626]")}>
                    {totalRevenue >= priorRevenue ? "+" : ""}{pct(totalRevenue, priorRevenue)}%
                  </span>
                </td>
              </tr>
              {expanded.has("revenue") && PL_DATA.revenue.items.map(item => (
                <tr key={item.code} className="border-b border-[var(--border)]/60 hover:bg-[var(--muted)]/20">
                  <td className="px-5 py-2.5 font-mono text-xs text-[var(--muted-foreground)]">{item.code}</td>
                  <td className="px-3 py-2.5 pl-10 text-xs text-[var(--foreground)]">{item.name}</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--foreground)]">{fmt(item.current)}</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--muted-foreground)]">{fmt(getCompare(item))}</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs">
                    <span className={cn(item.current >= getCompare(item) ? "text-[#059669]" : "text-[#dc2626]")}>
                      {item.current >= getCompare(item) ? "+" : ""}{pct(item.current, getCompare(item))}%
                    </span>
                  </td>
                </tr>
              ))}

              {/* COGS */}
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]/20 cursor-pointer hover:bg-[var(--muted)]/30" onClick={() => toggleSection("cogs")}>
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 flex items-center gap-1.5">
                  {expanded.has("cogs") ? <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                  <span className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">Cost of Goods Sold</span>
                </td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[#dc2626]">({fmt(totalCOGS)})</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">({fmt(priorCOGS)})</td>
                <td className="px-5 py-3 text-right"></td>
              </tr>
              {expanded.has("cogs") && PL_DATA.cogs.items.map(item => (
                <tr key={item.code} className="border-b border-[var(--border)]/60 hover:bg-[var(--muted)]/20">
                  <td className="px-5 py-2.5 font-mono text-xs text-[var(--muted-foreground)]">{item.code}</td>
                  <td className="px-3 py-2.5 pl-10 text-xs text-[var(--foreground)]">{item.name}</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--foreground)]">({fmt(item.current)})</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--muted-foreground)]">({fmt(getCompare(item))})</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs">
                    <span className={cn(item.current <= getCompare(item) ? "text-[#059669]" : "text-[#dc2626]")}>
                      {item.current <= getCompare(item) ? "" : "+"}{pct(item.current, getCompare(item))}%
                    </span>
                  </td>
                </tr>
              ))}

              {/* Gross Profit */}
              <tr className="border-b-2 border-[var(--border)] bg-[var(--primary)]/5">
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 text-sm font-bold text-[var(--foreground)]">Gross Profit</td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[#059669]">{fmt(grossProfit)}</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">{fmt(priorGrossProfit)}</td>
                <td className="px-5 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">
                  {margin(grossProfit, totalRevenue)}% margin
                </td>
              </tr>

              {/* OpEx */}
              <tr className="border-b border-[var(--border)] bg-[var(--muted)]/20 cursor-pointer hover:bg-[var(--muted)]/30" onClick={() => toggleSection("opex")}>
                <td className="px-5 py-3"></td>
                <td className="px-3 py-3 flex items-center gap-1.5">
                  {expanded.has("opex") ? <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                  <span className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">Operating Expenses</span>
                </td>
                <td className="px-5 py-3 text-right font-bold font-mono text-[#dc2626]">({fmt(totalOpEx)})</td>
                <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)]">({fmt(priorOpEx)})</td>
                <td className="px-5 py-3 text-right"></td>
              </tr>
              {expanded.has("opex") && PL_DATA.opex.items.map(item => (
                <tr key={item.code} className="border-b border-[var(--border)]/60 hover:bg-[var(--muted)]/20 cursor-pointer">
                  <td className="px-5 py-2.5 font-mono text-xs text-[var(--muted-foreground)]">{item.code}</td>
                  <td className="px-3 py-2.5 pl-10 text-xs text-[var(--foreground)] hover:text-[var(--primary)]">{item.name}</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--foreground)]">({fmt(item.current)})</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs text-[var(--muted-foreground)]">({fmt(getCompare(item))})</td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs">
                    <span className={cn(item.current <= getCompare(item) ? "text-[#059669]" : "text-[#dc2626]")}>
                      {item.current <= getCompare(item) ? "" : "+"}{pct(item.current, getCompare(item))}%
                    </span>
                  </td>
                </tr>
              ))}

              {/* EBITDA */}
              {[
                { label: "EBITDA", curr: ebitda, prior: priorEbitda },
                { label: "Depreciation & Amortisation", curr: -depreciation, prior: -priorDep, isExpense: true },
                { label: "EBIT", curr: ebit, prior: priorEbit },
                { label: "Interest & Finance Costs", curr: -interest, prior: -priorInterest, isExpense: true },
                { label: "Net Profit Before Tax", curr: profitBT, prior: priorProfitBT },
                { label: "Income Tax (19%)", curr: -tax, prior: -priorTax, isExpense: true },
                { label: "Net Profit After Tax", curr: netProfit, prior: priorNetProfit, isTotal: true },
              ].map(row => (
                <tr key={row.label} className={cn(
                  "border-b border-[var(--border)]",
                  row.isTotal ? "border-t-2 bg-[#059669]/5" : "hover:bg-[var(--muted)]/20"
                )}>
                  <td className="px-5 py-3"></td>
                  <td className={cn("px-3 py-3 text-sm", row.isTotal ? "font-bold text-[var(--foreground)]" : "text-[var(--foreground)]")}>{row.label}</td>
                  <td className={cn("px-5 py-3 text-right font-mono", row.isTotal ? "font-bold text-[#059669]" : row.isExpense ? "text-[#dc2626]" : row.curr < 0 ? "text-[#dc2626]" : "text-[#059669]")}>
                    {row.curr < 0 ? `(${fmt(Math.abs(row.curr))})` : fmt(row.curr)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-[var(--muted-foreground)] text-sm">
                    {row.prior < 0 ? `(${fmt(Math.abs(row.prior))})` : fmt(row.prior)}
                  </td>
                  <td className="px-5 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">
                    {row.isTotal && `${margin(netProfit, totalRevenue)}% margin`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

