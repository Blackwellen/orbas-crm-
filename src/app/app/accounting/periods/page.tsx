"use client"

import React, { useState } from "react"
import {
  Lock, Unlock, CheckCircle2, XCircle, AlertCircle, CalendarCheck,
  ChevronDown, ChevronRight, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type PeriodStatus = "Open" | "Closing" | "Closed" | "Locked"

interface Period {
  id: string
  month: string
  status: PeriodStatus
  closingDate?: string
  closedBy?: string
  journalCount: number
  variance: number
  checklist: {
    bankRec: boolean
    arApReview: boolean
    accrualsPosted: boolean
    depreciationRun: boolean
  }
}

const PERIODS_2026: Period[] = [
  { id: "p01", month: "January 2026",  status: "Locked",  closingDate: "31 Jan 2026", closedBy: "James Harlow",  journalCount: 182, variance: 0,     checklist: { bankRec: true,  arApReview: true,  accrualsPosted: true,  depreciationRun: true  } },
  { id: "p02", month: "February 2026", status: "Locked",  closingDate: "28 Feb 2026", closedBy: "Emma Clarke",   journalCount: 167, variance: 0,     checklist: { bankRec: true,  arApReview: true,  accrualsPosted: true,  depreciationRun: true  } },
  { id: "p03", month: "March 2026",    status: "Locked",  closingDate: "31 Mar 2026", closedBy: "James Harlow",  journalCount: 204, variance: 0,     checklist: { bankRec: true,  arApReview: true,  accrualsPosted: true,  depreciationRun: true  } },
  { id: "p04", month: "April 2026",    status: "Closed",  closingDate: "30 Apr 2026", closedBy: "Emma Clarke",   journalCount: 198, variance: 120,   checklist: { bankRec: true,  arApReview: true,  accrualsPosted: true,  depreciationRun: true  } },
  { id: "p05", month: "May 2026",      status: "Closed",  closingDate: "05 Jun 2026", closedBy: "James Harlow",  journalCount: 211, variance: 0,     checklist: { bankRec: true,  arApReview: true,  accrualsPosted: true,  depreciationRun: true  } },
  { id: "p06", month: "June 2026",     status: "Closing", closingDate: undefined,     closedBy: undefined,       journalCount: 94,  variance: 13460, checklist: { bankRec: false, arApReview: true,  accrualsPosted: false, depreciationRun: true  } },
  { id: "p07", month: "July 2026",     status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
  { id: "p08", month: "August 2026",   status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
  { id: "p09", month: "September 2026",status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
  { id: "p10", month: "October 2026",  status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
  { id: "p11", month: "November 2026", status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
  { id: "p12", month: "December 2026", status: "Open",    closingDate: undefined,     closedBy: undefined,       journalCount: 0,   variance: 0,     checklist: { bankRec: false, arApReview: false, accrualsPosted: false, depreciationRun: false } },
]

const STATUS_CONFIG: Record<PeriodStatus, { label: string; className: string; icon: React.ElementType }> = {
  Open:    { label: "Open",    className: "bg-[var(--primary)]/10 text-[var(--primary)]",   icon: Unlock },
  Closing: { label: "Closing", className: "bg-[#d97706]/10 text-[#d97706]",                 icon: Clock },
  Closed:  { label: "Closed",  className: "bg-[#059669]/10 text-[#059669]",                 icon: CheckCircle2 },
  Locked:  { label: "Locked",  className: "bg-[var(--muted)] text-[var(--muted-foreground)]", icon: Lock },
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

function CheckIcon({ ok }: { ok: boolean }) {
  return ok
    ? <CheckCircle2 className="h-4 w-4 text-[#059669]" />
    : <XCircle className="h-4 w-4 text-[#dc2626] opacity-50" />
}

export default function PeriodsPage() {
  const [fiscalYear, setFiscalYear] = useState("2026")
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>("p06")

  const lockedCount = PERIODS_2026.filter(p => p.status === "Locked").length
  const closedCount = PERIODS_2026.filter(p => p.status === "Closed").length
  const openCount = PERIODS_2026.filter(p => p.status === "Open").length

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <CalendarCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Period Close</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Manage fiscal periods and month-end close</p>
          </div>
        </div>
        <Select value={fiscalYear} onValueChange={setFiscalYear}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">FY 2024</SelectItem>
            <SelectItem value="2025">FY 2025</SelectItem>
            <SelectItem value="2026">FY 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { label: "Locked", count: lockedCount, color: "text-[var(--muted-foreground)]" },
          { label: "Closed", count: closedCount, color: "text-[#059669]" },
          { label: "Closing", count: 1, color: "text-[#d97706]" },
          { label: "Open", count: openCount, color: "text-[var(--primary)]" },
          { label: "Total Journals", count: PERIODS_2026.reduce((s, p) => s + p.journalCount, 0), color: "text-[var(--foreground)]" },
          { label: "Open Variance", count: null, display: fmt(13460), color: "text-[#dc2626]" },
        ].map(item => (
          <div key={item.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center">
            <p className="text-xs text-[var(--muted-foreground)] mb-1">{item.label}</p>
            <p className={cn("text-2xl font-bold", item.color)}>{"display" in item && item.display ? item.display : item.count}</p>
          </div>
        ))}
      </div>

      {/* Period Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="w-8" />
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Month</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Closing Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Closed By</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Journals</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Variance</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PERIODS_2026.map(period => {
              const sc = STATUS_CONFIG[period.status]
              const StatusIcon = sc.icon
              const isExpanded = expandedPeriod === period.id
              const checkItems = [
                { label: "Bank Reconciled", ok: period.checklist.bankRec },
                { label: "AR/AP Reviewed", ok: period.checklist.arApReview },
                { label: "Accruals Posted", ok: period.checklist.accrualsPosted },
                { label: "Depreciation Run", ok: period.checklist.depreciationRun },
              ]
              const allChecked = checkItems.every(c => c.ok)
              const checkedCount = checkItems.filter(c => c.ok).length

              return (
                <React.Fragment key={period.id}>
                  <TableRow className={cn(
                    "hover:bg-[var(--muted)]/30 cursor-pointer",
                    period.status === "Closing" && "bg-[#d97706]/5",
                    isExpanded && "bg-[var(--muted)]/20"
                  )} onClick={() => setExpandedPeriod(isExpanded ? null : period.id)}>
                    <TableCell className="pl-4">
                      {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-[var(--foreground)]">{period.month}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold", sc.className)}>
                        <StatusIcon className="h-3 w-3" />{sc.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-[var(--muted-foreground)]">{period.closingDate ?? "—"}</TableCell>
                    <TableCell className="text-xs text-[var(--muted-foreground)]">{period.closedBy ?? "—"}</TableCell>
                    <TableCell className="text-right text-sm font-medium text-[var(--foreground)]">{period.journalCount}</TableCell>
                    <TableCell className="text-right">
                      {period.variance > 0 ? (
                        <span className="text-sm font-medium text-[#dc2626]">{fmt(period.variance)}</span>
                      ) : period.status !== "Open" ? (
                        <span className="text-sm font-medium text-[#059669]">Balanced</span>
                      ) : (
                        <span className="text-sm text-[var(--muted-foreground)]">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-end gap-1.5">
                        {period.status === "Open" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                            <Lock className="h-3 w-3" />Close
                          </Button>
                        )}
                        {period.status === "Closing" && (
                          <Button size="sm" className="h-7 text-xs gap-1 orbas-gradient text-white hover:opacity-90">
                            <CheckCircle2 className="h-3 w-3" />Complete Close
                          </Button>
                        )}
                        {period.status === "Closed" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                            <Lock className="h-3 w-3" />Lock
                          </Button>
                        )}
                        {period.status === "Locked" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-[var(--muted-foreground)]" disabled>
                            <Lock className="h-3 w-3" />Locked
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Checklist */}
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-[var(--muted)]/10 px-8 py-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">Pre-Close Checklist</p>
                            <span className={cn("text-xs font-medium", allChecked ? "text-[#059669]" : "text-[#d97706]")}>
                              {checkedCount} / {checkItems.length} complete
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {checkItems.map(item => (
                              <div key={item.label} className={cn(
                                "flex items-center gap-2 rounded-lg border p-3",
                                item.ok ? "border-[#059669]/20 bg-[#059669]/5" : "border-[#dc2626]/20 bg-[#dc2626]/5"
                              )}>
                                <CheckIcon ok={item.ok} />
                                <span className="text-xs font-medium text-[var(--foreground)]">{item.label}</span>
                              </div>
                            ))}
                          </div>
                          {!allChecked && period.status === "Closing" && (
                            <div className="flex items-center gap-2 text-xs text-[#d97706] mt-2">
                              <AlertCircle className="h-3.5 w-3.5" />
                              Complete all checklist items before closing this period.
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
