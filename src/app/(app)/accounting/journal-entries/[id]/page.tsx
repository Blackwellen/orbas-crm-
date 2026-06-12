"use client"

import React, { useState } from "react"
import Link from "next/link"
import { use } from "react"
import {
  ChevronLeft, CheckCircle2, AlertCircle, Edit, Send, RotateCcw,
  Printer, Download, Paperclip, Clock, User, FileText, ArrowLeftRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const JOURNAL_DATA: Record<string, {
  reference: string
  date: string
  status: "Draft" | "Posted" | "Reversed"
  description: string
  narration: string
  createdBy: string
  createdAt: string
  postedAt?: string
  lines: { account: string; accountName: string; description: string; debit: number; credit: number; department: string }[]
  auditTrail: { date: string; user: string; action: string; note: string }[]
  attachments: { name: string; size: string; uploaded: string }[]
  relatedEntries: { ref: string; date: string; type: string; amount: string }[]
}> = {
  "je-001": {
    reference: "JNL-2026-050",
    date: "16 Jun 2026",
    status: "Draft",
    description: "Director loan repayment received",
    narration: "Recording the repayment of director loan from J. Thomas. Funds received via BACS transfer on 16 June 2026.",
    createdBy: "Emma Clarke",
    createdAt: "16 Jun 2026 09:14",
    lines: [
      { account: "2300", accountName: "Director Loans", description: "Director loan repayment — J. Thomas", debit: 5000, credit: 0, department: "Finance" },
      { account: "3000", accountName: "Share Capital", description: "Director loan repayment — J. Thomas", debit: 0, credit: 5000, department: "Finance" },
    ],
    auditTrail: [
      { date: "16 Jun 2026 09:14", user: "Emma Clarke", action: "Created", note: "Journal created as draft" },
      { date: "16 Jun 2026 10:32", user: "Emma Clarke", action: "Edited", note: "Updated narration text" },
    ],
    attachments: [{ name: "director-loan-agreement.pdf", size: "245 KB", uploaded: "16 Jun 2026" }],
    relatedEntries: [],
  },
  "je-002": {
    reference: "JNL-2026-049",
    date: "12 Jun 2026",
    status: "Posted",
    description: "Prepaid insurance — annual policy",
    narration: "Recording payment of annual business insurance policy. Premium covers 12 months from June 2026.",
    createdBy: "Emma Clarke",
    createdAt: "12 Jun 2026 11:02",
    postedAt: "12 Jun 2026 11:15",
    lines: [
      { account: "1500", accountName: "Prepaid Expenses", description: "Annual business insurance premium", debit: 4800, credit: 0, department: "Finance" },
      { account: "1100", accountName: "Cash & Bank", description: "Annual business insurance premium", debit: 0, credit: 4800, department: "Finance" },
    ],
    auditTrail: [
      { date: "12 Jun 2026 11:02", user: "Emma Clarke", action: "Created", note: "Journal created as draft" },
      { date: "12 Jun 2026 11:15", user: "James Harlow", action: "Posted", note: "Approved and posted by Finance Manager" },
    ],
    attachments: [
      { name: "insurance-invoice-2026.pdf", size: "182 KB", uploaded: "12 Jun 2026" },
      { name: "insurance-schedule.pdf", size: "94 KB", uploaded: "12 Jun 2026" },
    ],
    relatedEntries: [
      { ref: "JNL-2026-043", date: "28 May 2026", type: "Depreciation", amount: "£1,240.00" },
    ],
  },
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

const TABS = ["Details", "Audit Trail", "Attachments", "Related Entries"] as const
type Tab = typeof TABS[number]

export default function JournalEntryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>("Details")

  const entry = JOURNAL_DATA[id] ?? JOURNAL_DATA["je-002"]

  const totalDebits = entry.lines.reduce((s, l) => s + l.debit, 0)
  const totalCredits = entry.lines.reduce((s, l) => s + l.credit, 0)
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.005

  const statusConfig = {
    Draft:    { label: "Draft",    className: "bg-[#d97706]/10 text-[#d97706]" },
    Posted:   { label: "Posted",   className: "bg-[#059669]/10 text-[#059669]" },
    Reversed: { label: "Reversed", className: "bg-[var(--muted)] text-[var(--muted-foreground)]" },
  }

  const sc = statusConfig[entry.status]

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Back */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/journal-entries">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">Journal Entries</span>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-sm font-medium text-[var(--foreground)]">{entry.reference}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{entry.reference}</h1>
            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", sc.className)}>
              {sc.label}
            </span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm">{entry.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{entry.date}</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{entry.createdBy}</span>
            {entry.postedAt && <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-[#059669]" />Posted {entry.postedAt}</span>}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {entry.status === "Draft" && (
            <Button size="sm" variant="outline" className="h-9 gap-1.5">
              <Edit className="h-4 w-4" />Edit
            </Button>
          )}
          {entry.status === "Draft" && (
            <Button size="sm" className="h-9 gap-1.5 orbas-gradient text-white hover:opacity-90">
              <Send className="h-4 w-4" />Post Journal
            </Button>
          )}
          {entry.status === "Posted" && (
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-[#d97706] border-[#d97706]/30">
              <RotateCcw className="h-4 w-4" />Create Reversal
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-9 gap-1.5">
            <Printer className="h-4 w-4" />Print
          </Button>
          <Button size="sm" variant="outline" className="h-9 gap-1.5">
            <Download className="h-4 w-4" />Export
          </Button>
        </div>
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

      {/* Tab Content */}
      {activeTab === "Details" && (
        <div className="space-y-5">
          {/* Narration */}
          {entry.narration && (
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-1.5">Narration</p>
                <p className="text-sm text-[var(--foreground)]">{entry.narration}</p>
              </CardContent>
            </Card>
          )}

          {/* Line Items */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Line Items</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Account</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Debit</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Credit</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entry.lines.map((line, idx) => (
                  <TableRow key={idx} className="hover:bg-[var(--muted)]/20">
                    <TableCell>
                      <div className="font-mono text-xs font-semibold text-[var(--primary)]">{line.account}</div>
                      <div className="text-xs text-[var(--foreground)]">{line.accountName}</div>
                    </TableCell>
                    <TableCell className="text-sm text-[var(--muted-foreground)]">{line.description}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium text-[var(--foreground)]">
                      {line.debit > 0 ? fmt(line.debit) : "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium text-[var(--foreground)]">
                      {line.credit > 0 ? fmt(line.credit) : "—"}
                    </TableCell>
                    <TableCell className="text-xs text-[var(--muted-foreground)]">{line.department}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-[var(--muted)]/30 font-bold border-t-2 border-[var(--border)]">
                  <TableCell colSpan={2} className="text-sm font-semibold text-[var(--foreground)]">Totals</TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold text-[var(--foreground)]">{fmt(totalDebits)}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold text-[var(--foreground)]">{fmt(totalCredits)}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-xs font-semibold",
                      isBalanced ? "text-[#059669]" : "text-[#dc2626]"
                    )}>
                      {isBalanced ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      {isBalanced ? "Balanced" : "Unbalanced"}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          {/* Reversal Section (if Posted) */}
          {entry.status === "Posted" && (
            <Card className="border-[#d97706]/20 bg-[#d97706]/5">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <ArrowLeftRight className="h-5 w-5 text-[#d97706] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--foreground)]">Create Reversing Entry</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                      Generate an automatic reversal of this journal entry. The reversing entry will have the same accounts but with debits and credits swapped.
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 gap-1.5 text-[#d97706] border-[#d97706]/30 hover:bg-[#d97706]/10 shrink-0">
                    <RotateCcw className="h-3.5 w-3.5" />Create Reversal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "Audit Trail" && (
        <Card>
          <CardContent className="pt-5">
            <div className="space-y-3">
              {entry.auditTrail.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-3 border-b border-[var(--border)] last:border-0">
                  <div className="w-28 shrink-0 text-xs text-[var(--muted-foreground)] pt-0.5">{evt.date}</div>
                  <div className="flex items-center gap-2 w-28 shrink-0">
                    <div className="w-6 h-6 rounded-full orbas-gradient flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-[var(--foreground)] truncate">{evt.user}</span>
                  </div>
                  <div>
                    <span className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold mr-2",
                      evt.action === "Posted" ? "bg-[#059669]/10 text-[#059669]" :
                      evt.action === "Created" ? "bg-[var(--primary)]/10 text-[var(--primary)]" :
                      "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    )}>
                      {evt.action}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">{evt.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Attachments" && (
        <Card>
          <CardContent className="pt-5">
            {entry.attachments.length > 0 ? (
              <div className="space-y-2">
                {entry.attachments.map((att, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/20">
                    <Paperclip className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">{att.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{att.size} · Uploaded {att.uploaded}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Download className="h-3.5 w-3.5" />Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--muted-foreground)]">
                <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No attachments</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "Related Entries" && (
        <Card>
          <CardContent className="pt-5">
            {entry.relatedEntries.length > 0 ? (
              <div className="space-y-2">
                {entry.relatedEntries.map((rel, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3">
                    <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <div className="flex-1">
                      <Link href={`/app/accounting/journal-entries/${rel.ref}`} className="text-sm font-medium text-[var(--primary)] hover:underline">{rel.ref}</Link>
                      <p className="text-xs text-[var(--muted-foreground)]">{rel.type} · {rel.date}</p>
                    </div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">{rel.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--muted-foreground)]">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No related entries</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
