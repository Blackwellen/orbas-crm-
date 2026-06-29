"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Trash2, AlertCircle, CheckCircle2, Save, Send,
  ChevronLeft, Paperclip, Keyboard, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface LineItem {
  id: string
  accountCode: string
  accountName: string
  description: string
  debit: string
  credit: string
  department: string
  costCentre: string
}

const ACCOUNTS = [
  { code: "1100", name: "Cash & Bank" },
  { code: "1200", name: "Accounts Receivable" },
  { code: "1300", name: "Inventory" },
  { code: "1500", name: "Prepaid Expenses" },
  { code: "1600", name: "Fixed Assets" },
  { code: "1650", name: "Accumulated Depreciation" },
  { code: "2100", name: "Accounts Payable" },
  { code: "2200", name: "VAT Liability" },
  { code: "2300", name: "Director Loans" },
  { code: "3000", name: "Share Capital" },
  { code: "3100", name: "Retained Earnings" },
  { code: "4000", name: "Sales Revenue" },
  { code: "4100", name: "Consulting Revenue" },
  { code: "5000", name: "Cost of Goods Sold" },
  { code: "6100", name: "Rent & Office Costs" },
  { code: "6200", name: "Software & Subscriptions" },
  { code: "6300", name: "Salaries & Wages" },
  { code: "6400", name: "Marketing & Advertising" },
  { code: "6500", name: "Travel & Entertainment" },
  { code: "7000", name: "Depreciation Expense" },
  { code: "7100", name: "Interest Expense" },
  { code: "8000", name: "Other Income" },
]

const DEPARTMENTS = ["Engineering", "Sales", "Marketing", "Finance", "Operations", "HR", "Management"]
const COST_CENTRES = ["CC-001 HQ", "CC-002 North", "CC-003 South", "CC-004 Digital", "CC-005 Services"]

const newLine = (): LineItem => ({
  id: crypto.randomUUID(),
  accountCode: "",
  accountName: "",
  description: "",
  debit: "",
  credit: "",
  department: "",
  costCentre: "",
})

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

export default function NewJournalEntryPage() {
  const [date, setDate] = useState("2026-06-10")
  const [reference] = useState("JNL-2026-051")
  const [description, setDescription] = useState("")
  const [memo, setMemo] = useState("")
  const [lines, setLines] = useState<LineItem[]>([newLine(), newLine()])
  const [attachments, setAttachments] = useState<string[]>([])

  const updateLine = (id: string, field: keyof LineItem, value: string) => {
    setLines(prev => prev.map(l => {
      if (l.id !== id) return l
      const updated = { ...l, [field]: value }
      if (field === "accountCode") {
        const acct = ACCOUNTS.find(a => a.code === value)
        updated.accountName = acct?.name ?? ""
      }
      return updated
    }))
  }

  const addLine = () => setLines(prev => [...prev, newLine()])

  const removeLine = (id: string) => {
    if (lines.length <= 2) return
    setLines(prev => prev.filter(l => l.id !== id))
  }

  const totalDebits = lines.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0)
  const totalCredits = lines.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0)
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.005 && totalDebits > 0

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/journal-entries">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">New Journal Entry</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Manual double-entry bookkeeping</p>
        </div>
      </div>

      {/* Header Fields */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[var(--foreground)]">Entry Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Date *</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Reference</label>
              <Input value={reference} readOnly className="h-9 text-sm bg-[var(--muted)]/30 font-mono" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Description *</label>
              <Input
                placeholder="Brief description of this journal entry"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="col-span-4 space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Memo / Narration</label>
              <textarea
                placeholder="Optional detailed notes for this journal entry"
                value={memo}
                onChange={e => setMemo(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-[var(--foreground)]">Line Items</CardTitle>
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
              <Keyboard className="h-3 w-3" />
              <span>Tab to navigate · Enter to add line</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-48">Account</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Debit (£)</th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Credit (£)</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-36">Department</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-36">Cost Centre</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {lines.map((line, idx) => (
                  <tr key={line.id} className={cn("hover:bg-[var(--muted)]/20", idx % 2 === 1 && "bg-[var(--muted)]/10")}>
                    <td className="px-3 py-2">
                      <Select value={line.accountCode} onValueChange={v => updateLine(line.id, "accountCode", v)}>
                        <SelectTrigger className="h-8 text-xs border-[var(--border)]">
                          <SelectValue placeholder="Select account…" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACCOUNTS.map(a => (
                            <SelectItem key={a.code} value={a.code} className="text-xs">
                              {a.code} — {a.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        placeholder="Line description"
                        value={line.description}
                        onChange={e => updateLine(line.id, "description", e.target.value)}
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={line.debit}
                        onChange={e => {
                          updateLine(line.id, "debit", e.target.value)
                          if (e.target.value) updateLine(line.id, "credit", "")
                        }}
                        className="h-8 text-xs text-right font-mono"
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={line.credit}
                        onChange={e => {
                          updateLine(line.id, "credit", e.target.value)
                          if (e.target.value) updateLine(line.id, "debit", "")
                        }}
                        className="h-8 text-xs text-right font-mono"
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Select value={line.department} onValueChange={v => updateLine(line.id, "department", v)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Dept." />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map(d => (
                            <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2">
                      <Select value={line.costCentre} onValueChange={v => updateLine(line.id, "costCentre", v)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Cost centre" />
                        </SelectTrigger>
                        <SelectContent>
                          {COST_CENTRES.map(c => (
                            <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-2 py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-[var(--muted-foreground)] hover:text-[#dc2626]"
                        onClick={() => removeLine(line.id)}
                        disabled={lines.length <= 2}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--border)] bg-[var(--muted)]/30">
                  <td className="px-4 py-2.5" colSpan={2}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-[var(--primary)]" onClick={addLine}>
                      <Plus className="h-3.5 w-3.5" />Add Line
                    </Button>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-sm font-bold text-[var(--foreground)]">
                    {fmt(totalDebits)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-sm font-bold text-[var(--foreground)]">
                    {fmt(totalCredits)}
                  </td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Balance Indicator */}
      <div className={cn(
        "rounded-xl border p-4 flex items-center gap-3",
        isBalanced
          ? "border-[#059669]/30 bg-[#059669]/5"
          : totalDebits > 0 || totalCredits > 0
          ? "border-[#dc2626]/30 bg-[#dc2626]/5"
          : "border-[var(--border)] bg-[var(--muted)]/20"
      )}>
        {isBalanced ? (
          <CheckCircle2 className="h-5 w-5 text-[#059669] shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 text-[#dc2626] shrink-0" />
        )}
        <div className="flex-1">
          <p className={cn("text-sm font-semibold", isBalanced ? "text-[#059669]" : "text-[#dc2626]")}>
            {isBalanced ? "Journal entry is balanced" : totalDebits > 0 || totalCredits > 0 ? "Journal entry is not balanced" : "Enter line items to check balance"}
          </p>
          {!isBalanced && (totalDebits > 0 || totalCredits > 0) && (
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Difference: {fmt(Math.abs(totalDebits - totalCredits))} · Debits: {fmt(totalDebits)} · Credits: {fmt(totalCredits)}
            </p>
          )}
        </div>
        {isBalanced && (
          <div className="text-xs text-[var(--muted-foreground)]">
            {lines.filter(l => l.accountCode).length} lines · {fmt(totalDebits)} balanced
          </div>
        )}
      </div>

      {/* Attachments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[var(--foreground)]">Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
            <Paperclip className="h-6 w-6 text-[var(--muted-foreground)] mx-auto mb-2" />
            <p className="text-sm text-[var(--muted-foreground)]">Drop files here or click to upload</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">PDF, PNG, JPG up to 10MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard shortcuts hint */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 px-4 py-2.5">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Keyboard shortcuts: <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] bg-[var(--background)]">Ctrl+S</kbd> Save Draft · <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] bg-[var(--background)]">Ctrl+Enter</kbd> Post · <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] bg-[var(--background)]">Tab</kbd> Next field · <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] bg-[var(--background)]">Alt+A</kbd> Add line</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="outline" size="sm" className="h-9" asChild>
          <Link href="/app/accounting/journal-entries">Cancel</Link>
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Save className="h-4 w-4" />Save as Draft
          </Button>
          <Button
            size="sm"
            className={cn("h-9 gap-1.5", isBalanced ? "orbas-gradient text-white hover:opacity-90" : "opacity-50 cursor-not-allowed")}
            disabled={!isBalanced}
          >
            <Send className="h-4 w-4" />Post Journal
          </Button>
        </div>
      </div>
    </div>
  )
}
