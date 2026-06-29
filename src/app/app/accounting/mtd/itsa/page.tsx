"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft, Info, Calendar, CheckCircle2, Clock, AlertTriangle,
  Send, FileText, ChevronDown, ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils"

const QUARTERS = [
  { id: "it-2526-q1", taxYear: "2025–26", quarter: "Q1", start: "06 Apr 2025", end: "05 Jul 2025", due: "05 Aug 2025", status: "Fulfilled", income: 28400.00, expenses: 9820.00 },
  { id: "it-2526-q2", taxYear: "2025–26", quarter: "Q2", start: "06 Jul 2025", end: "05 Oct 2025", due: "05 Nov 2025", status: "Fulfilled", income: 31200.00, expenses: 10410.00 },
  { id: "it-2526-q3", taxYear: "2025–26", quarter: "Q3", start: "06 Oct 2025", end: "05 Jan 2026", due: "05 Feb 2026", status: "Fulfilled", income: 29800.00, expenses: 11230.00 },
  { id: "it-2526-q4", taxYear: "2025–26", quarter: "Q4", start: "06 Jan 2026", end: "05 Apr 2026", due: "05 May 2026", status: "Open",      income: 33100.00, expenses: 12050.00 },
  { id: "it-2425-q1", taxYear: "2024–25", quarter: "Q1", start: "06 Apr 2024", end: "05 Jul 2024", due: "05 Aug 2024", status: "Fulfilled", income: 24900.00, expenses: 8640.00 },
  { id: "it-2425-q2", taxYear: "2024–25", quarter: "Q2", start: "06 Jul 2024", end: "05 Oct 2024", due: "05 Nov 2024", status: "Fulfilled", income: 26500.00, expenses: 9110.00 },
  { id: "it-2425-q3", taxYear: "2024–25", quarter: "Q3", start: "06 Oct 2024", end: "05 Jan 2025", due: "05 Feb 2025", status: "Fulfilled", income: 27800.00, expenses: 9890.00 },
  { id: "it-2425-q4", taxYear: "2024–25", quarter: "Q4", start: "06 Jan 2025", end: "05 Apr 2025", due: "05 May 2025", status: "Fulfilled", income: 29200.00, expenses: 10320.00 },
]

const EOY = [
  { taxYear: "2024–25", deadline: "31 Jan 2026", status: "Fulfilled", tax: 12840.00 },
  { taxYear: "2023–24", deadline: "31 Jan 2025", status: "Fulfilled", tax: 11290.00 },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Fulfilled: { bg: "#dcfce7", color: "#16a34a" },
    Open:      { bg: "#fef9c3", color: "#ca8a04" },
    Overdue:   { bg: "#fee2e2", color: "#dc2626" },
  }
  const cfg = map[status] ?? { bg: "#f3f4f6", color: "#6b7280" }
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function ITSAPage() {
  const [submitId, setSubmitId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<Set<string>>(new Set())
  const [eoyOpen, setEoyOpen] = useState(false)

  const totalIncome2526 = QUARTERS.filter(q => q.taxYear === "2025–26").reduce((s, q) => s + q.income, 0)
  const totalExpenses2526 = QUARTERS.filter(q => q.taxYear === "2025–26").reduce((s, q) => s + q.expenses, 0)
  const openCount = QUARTERS.filter(q => q.status === "Open" && !submitted.has(q.id)).length

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3">
        <Link href="/app/accounting/mtd">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> MTD
          </Button>
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <h1 className="text-2xl font-bold tracking-tight">Income Tax Self Assessment (ITSA)</h1>
      </div>

      <Card style={{ background: "rgba(26,86,219,0.04)", border: "1px solid rgba(26,86,219,0.15)" }}>
        <CardContent className="p-4 flex items-start gap-3">
          <Info size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
          <div className="text-sm space-y-1">
            <p className="font-semibold" style={{ color: "var(--foreground)" }}>MTD for Income Tax Self Assessment</p>
            <p style={{ color: "var(--muted-foreground)" }}>
              From April 2026, self-employed individuals and landlords with annual income over £50,000 must submit quarterly digital updates to HMRC instead of a single annual Self Assessment return. Each update reports income and expenses for the quarter. A final End of Year (EOY) declaration is then submitted to crystallise the tax position.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardContent className="p-5">
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Current Tax Year</p>
            <p className="text-2xl font-bold mt-1">2025–26</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>6 Apr 2025 – 5 Apr 2026</p>
          </CardContent>
        </Card>
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardContent className="p-5">
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Next Quarterly Update Due</p>
            <p className="text-2xl font-bold mt-1">05 May 2026</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Q4 2025–26</p>
          </CardContent>
        </Card>
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardContent className="p-5">
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Updates Submitted (2025–26)</p>
            <p className="text-2xl font-bold mt-1">{4 - openCount} / 4</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Income: {formatCurrency(totalIncome2526)} · Expenses: {formatCurrency(totalExpenses2526)}
            </p>
          </CardContent>
        </Card>
      </div>

      {["2025–26", "2024–25"].map(year => (
        <Card key={year} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Tax Year {year} — Quarterly Updates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                    {["Quarter", "Period Start", "Period End", "Due Date", "Status", "Income", "Expenses", "Net Profit", ""].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUARTERS.filter(q => q.taxYear === year).map(q => {
                    const isDone = q.status === "Fulfilled" || submitted.has(q.id)
                    return (
                      <tr key={q.id} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td className="px-4 py-3 font-semibold text-xs">{q.quarter}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{q.start}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{q.end}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{q.due}</td>
                        <td className="px-4 py-3"><StatusBadge status={isDone ? "Fulfilled" : q.status} /></td>
                        <td className="px-4 py-3 text-xs font-medium">{formatCurrency(q.income)}</td>
                        <td className="px-4 py-3 text-xs font-medium">{formatCurrency(q.expenses)}</td>
                        <td className="px-4 py-3 text-xs font-bold">{formatCurrency(q.income - q.expenses)}</td>
                        <td className="px-4 py-3">
                          {!isDone && (
                            <Button size="sm" onClick={() => setSubmitId(q.id)} style={{ background: "var(--primary)", color: "#fff", height: 28, fontSize: 12 }}>
                              <Send size={12} className="mr-1" /> Submit
                            </Button>
                          )}
                          {isDone && <CheckCircle2 size={16} style={{ color: "#16a34a" }} />}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">End of Year (EOY) Declarations</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setEoyOpen(!eoyOpen)}>
              {eoyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            After all 4 quarterly updates are submitted, a final EOY declaration crystallises the tax liability for the year.
          </p>
        </CardHeader>
        {eoyOpen && (
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                  {["Tax Year", "Submission Deadline", "Status", "Tax Liability", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EOY.map(e => (
                  <tr key={e.taxYear} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 text-xs font-semibold">{e.taxYear}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{e.deadline}</td>
                    <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                    <td className="px-4 py-3 text-xs font-bold">{formatCurrency(e.tax)}</td>
                    <td className="px-4 py-3"><CheckCircle2 size={16} style={{ color: "#16a34a" }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        )}
      </Card>

      <Dialog open={!!submitId} onOpenChange={() => setSubmitId(null)}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 420 }}>
          <DialogHeader>
            <DialogTitle>Submit Quarterly Update</DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              This will submit the quarterly income and expenses update to HMRC via the MTD API.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm py-2" style={{ color: "var(--muted-foreground)" }}>
            Please confirm all income and expense figures for this quarter are correct before submitting.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitId(null)}>Cancel</Button>
            <Button
              onClick={() => {
                if (submitId) setSubmitted(prev => new Set(prev).add(submitId))
                setSubmitId(null)
              }}
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <Send size={14} className="mr-2" /> Confirm &amp; Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
