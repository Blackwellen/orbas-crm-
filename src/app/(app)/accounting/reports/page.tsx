"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BarChart3, FileText, TrendingUp, DollarSign, Clock, Calendar,
  Play, ChevronDown, ChevronRight, Download, Building2, Receipt,
  ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from "recharts"
import { cn } from "@/lib/utils"

interface ReportCard {
  id: string
  title: string
  description: string
  href?: string
  category: string
  lastRun?: string
  popular?: boolean
}

const REPORT_CATEGORIES = [
  {
    id: "financial",
    label: "Financial Statements",
    icon: BarChart3,
    color: "#1a56db",
    reports: [
      { id: "pl", title: "Profit & Loss", description: "Income statement showing revenue, expenses and net profit", href: "/app/accounting/reports/profit-loss", lastRun: "10 Jun 2026", popular: true },
      { id: "bs", title: "Balance Sheet", description: "Assets, liabilities and equity as at a date", href: "/app/accounting/reports/balance-sheet", lastRun: "10 Jun 2026", popular: true },
      { id: "tb", title: "Trial Balance", description: "All account balances for a period", href: "/app/accounting/reports/trial-balance", lastRun: "09 Jun 2026", popular: true },
      { id: "cf", title: "Cash Flow Statement", description: "Operating, investing and financing cash flows", lastRun: "05 Jun 2026" },
    ],
  },
  {
    id: "arap",
    label: "AR / AP",
    icon: Receipt,
    color: "#7c3aed",
    reports: [
      { id: "ar-age", title: "AR Ageing", description: "Receivables by age bucket (30/60/90+ days)", lastRun: "10 Jun 2026" },
      { id: "ap-age", title: "AP Ageing", description: "Payables by age bucket (30/60/90+ days)", lastRun: "10 Jun 2026" },
      { id: "cust-stmt", title: "Customer Statements", description: "Individual customer outstanding balances", lastRun: "08 Jun 2026" },
      { id: "supp-stmt", title: "Supplier Statements", description: "Individual supplier account statements", lastRun: "07 Jun 2026" },
    ],
  },
  {
    id: "tax",
    label: "Tax",
    icon: Building2,
    color: "#d97706",
    reports: [
      { id: "vat", title: "VAT Return Summary", description: "VAT collected and reclaimable for a quarter", lastRun: "30 Apr 2026" },
      { id: "tax-liab", title: "Tax Liability Report", description: "Corporation tax estimates and provisions", lastRun: "31 Mar 2026" },
    ],
  },
  {
    id: "management",
    label: "Management Reports",
    icon: TrendingUp,
    color: "#059669",
    reports: [
      { id: "bva", title: "Budget vs Actual", description: "Variance analysis against approved budgets", lastRun: "10 Jun 2026" },
      { id: "cc", title: "Cost Centre Report", description: "Spending breakdown by cost centre", lastRun: "09 Jun 2026" },
      { id: "dept", title: "Profit by Department", description: "P&L allocated by business unit", lastRun: "08 Jun 2026" },
    ],
  },
]

// Mini P&L data for inline preview
const PL_PREVIEW = [
  { line: "Revenue",           value: 67200,  indent: 0, type: "income" },
  { line: "  Product Sales",   value: 42100,  indent: 1, type: "income" },
  { line: "  Consulting",      value: 25100,  indent: 1, type: "income" },
  { line: "COGS",              value: 28400,  indent: 0, type: "expense" },
  { line: "Gross Profit",      value: 38800,  indent: 0, type: "subtotal" },
  { line: "  Salaries",        value: 18400,  indent: 1, type: "expense" },
  { line: "  Rent & Office",   value: 3200,   indent: 1, type: "expense" },
  { line: "  Software",        value: 2140,   indent: 1, type: "expense" },
  { line: "  Marketing",       value: 1800,   indent: 1, type: "expense" },
  { line: "  Other Opex",      value: 1520,   indent: 1, type: "expense" },
  { line: "EBITDA",            value: 11740,  indent: 0, type: "subtotal" },
  { line: "  Depreciation",    value: 1240,   indent: 1, type: "expense" },
  { line: "EBIT",              value: 10500,  indent: 0, type: "subtotal" },
  { line: "  Interest",        value: 860,    indent: 1, type: "expense" },
  { line: "Net Profit BT",     value: 9640,   indent: 0, type: "subtotal" },
  { line: "  Tax (19%)",       value: 1832,   indent: 1, type: "expense" },
  { line: "Net Profit AT",     value: 7808,   indent: 0, type: "total" },
]

const CHART_DATA = [
  { month: "Jan", revenue: 42000, expenses: 34000, net: 8000 },
  { month: "Feb", revenue: 48000, expenses: 34000, net: 14000 },
  { month: "Mar", revenue: 38000, expenses: 35000, net: 3000 },
  { month: "Apr", revenue: 61000, expenses: 40000, net: 21000 },
  { month: "May", revenue: 54000, expenses: 37000, net: 17000 },
  { month: "Jun", revenue: 67200, expenses: 43000, net: 24200 },
]

const fmt = (n: number) => `Â£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
const fmtK = (n: number) => `Â£${(n / 1000).toFixed(0)}k`

export default function ReportsPage() {
  const [expandedReport, setExpandedReport] = useState<string | null>(null)

  const toggleReport = (id: string) => setExpandedReport(prev => prev === id ? null : id)

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Reports</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Financial reporting & management accounts</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Calendar className="h-3.5 w-3.5" />Schedule Reports
        </Button>
      </div>

      {/* Quick KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Monthly Revenue", value: "Â£67,200", change: "+14.2% vs May", up: true, icon: ArrowUpRight },
          { label: "Monthly Expenses", value: "Â£43,000", change: "+5.1% vs May", up: false, icon: ArrowDownRight },
          { label: "Net Profit (Jun)", value: "Â£24,200", change: "36% margin", up: true, icon: TrendingUp },
          { label: "YTD Net Profit", value: "Â£83,940", change: "vs Â£71,200 LY", up: true, icon: TrendingUp },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--muted-foreground)]">{kpi.label}</span>
              <kpi.icon className={cn("h-4 w-4", kpi.up ? "text-[#059669]" : "text-[#dc2626]")} />
            </div>
            <p className="text-xl font-bold text-[var(--foreground)]">{kpi.value}</p>
            <p className={cn("text-xs mt-0.5 font-medium", kpi.up ? "text-[#059669]" : "text-[#dc2626]")}>{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="space-y-4">
        {REPORT_CATEGORIES.map(cat => (
          <div key={cat.id}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                <cat.icon className="h-3.5 w-3.5" style={{ color: cat.color }} />
              </div>
              <h2 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">{cat.label}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.reports.map(report => (
                <div key={report.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[var(--foreground)]">{report.title}</h3>
                          {"popular" in report && report.popular && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full orbas-gradient text-white font-medium">Popular</span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{report.description}</p>
                        {report.lastRun && (
                          <p className="text-[10px] text-[var(--muted-foreground)] mt-1 flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />Last run: {report.lastRun}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1.5"
                          onClick={() => toggleReport(report.id)}
                        >
                          <Play className="h-3 w-3" />
                          {expandedReport === report.id ? "Close" : "Run"}
                        </Button>
                        {report.href && (
                          <Button size="sm" variant="ghost" className="h-7 text-xs" asChild>
                            <Link href={report.href}>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Inline P&L Preview */}
                  {expandedReport === "pl" && report.id === "pl" && (
                    <div className="border-t border-[var(--border)] bg-[var(--muted)]/20 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[var(--foreground)]">P&L Summary â€” June 2026</p>
                        <Link href="/app/accounting/reports/profit-loss" className="text-xs text-[var(--primary)] hover:underline">Full report â†’</Link>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          {PL_PREVIEW.map((row, idx) => (
                            <div key={idx} className={cn(
                              "flex items-center justify-between py-0.5",
                              row.indent > 0 && "pl-3",
                              row.type === "subtotal" && "border-t border-[var(--border)] pt-1 mt-1",
                              row.type === "total" && "border-t-2 border-[var(--border)] pt-1 mt-1"
                            )}>
                              <span className={cn("text-xs", row.type === "total" ? "font-bold text-[var(--foreground)]" : row.type === "subtotal" ? "font-semibold text-[var(--foreground)]" : "text-[var(--muted-foreground)]")}>
                                {row.line}
                              </span>
                              <span className={cn("text-xs font-mono", row.type === "income" || row.type === "subtotal" || row.type === "total" ? "font-semibold text-[var(--foreground)]" : "text-[var(--muted-foreground)]")}>
                                {row.type === "expense" ? `(${fmt(row.value)})` : fmt(row.value)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={fmtK} />
                              <Tooltip formatter={(v: any) => [fmt(v)]} />
                              <Bar dataKey="net" name="Net Profit" radius={[2, 2, 0, 0]}>
                                {CHART_DATA.map((entry, idx) => (
                                  <Cell key={idx} fill={entry.net > 0 ? "#059669" : "#dc2626"} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generic inline preview for other reports */}
                  {expandedReport === report.id && report.id !== "pl" && (
                    <div className="border-t border-[var(--border)] bg-[var(--muted)]/20 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[var(--muted-foreground)]">
                          Preview not available inline.
                          {report.href ? " Click Full Report for the complete view." : " Export or schedule this report."}
                        </p>
                        {report.href && (
                          <Link href={report.href} className="text-xs text-[var(--primary)] hover:underline">Full report â†’</Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

