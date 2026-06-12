"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Save, Send, Eye, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

interface LineItem {
  id: string
  description: string
  account: string
  qty: number
  rate: number
  taxRate: number
}

const TAX_RATES = [
  { label: "Standard 20%", value: 20 },
  { label: "Reduced 5%",   value: 5 },
  { label: "Zero Rated 0%",value: 0 },
  { label: "Exempt 0%",    value: 0 },
]

const ACCOUNTS = [
  "4000 – Sales Revenue",
  "4100 – Consulting Income",
  "4200 – Service Revenue",
  "4300 – Software Licences",
  "4400 – Support & Maintenance",
]

const CUSTOMERS = [
  "Meridian Tech Ltd",
  "Holloway & Partners",
  "Blackwell Consulting",
  "Stratford Solutions",
  "Thames Digital",
  "Kensington AI Ltd",
  "Pembroke Analytics",
  "Regency Systems",
]

function newLine(): LineItem {
  return { id: crypto.randomUUID(), description: "", account: ACCOUNTS[0], qty: 1, rate: 0, taxRate: 20 }
}

export default function NewInvoicePage() {
  const [lines, setLines] = useState<LineItem[]>([newLine()])
  const [discount, setDiscount] = useState(0)

  function updateLine(id: string, field: keyof LineItem, value: string | number) {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  function removeLine(id: string) {
    setLines(prev => prev.filter(l => l.id !== id))
  }

  const subtotal = lines.reduce((s, l) => s + (l.qty * l.rate), 0)
  const discountAmt = (subtotal * discount) / 100
  const taxable = subtotal - discountAmt
  const tax = lines.reduce((s, l) => s + (l.qty * l.rate * l.taxRate / 100), 0) * (1 - discount / 100)
  const total = taxable + tax

  function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }

  return (
    <div className="p-6 max-w-screen-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/app/accounting/invoices"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">New Invoice</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Create and send a sales invoice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left panel */}
        <div className="xl:col-span-2 space-y-5">
          {/* Customer & Invoice Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select or search customer…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add_new" className="text-[var(--primary)] font-medium">+ Add New Customer</SelectItem>
                    <Separator className="my-1" />
                    {CUSTOMERS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invoiceNo">Invoice Number</Label>
                <Input id="invoiceNo" defaultValue="INV-2024-0143" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ref">Reference</Label>
                <Input id="ref" placeholder="PO number, project ref…" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input id="issueDate" type="date" defaultValue="2024-06-10" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" defaultValue="2024-06-24" />
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                      <th className="text-left px-4 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[35%]">Description</th>
                      <th className="text-left px-3 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[22%]">Account</th>
                      <th className="text-right px-3 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[8%]">Qty</th>
                      <th className="text-right px-3 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[12%]">Rate (£)</th>
                      <th className="text-right px-3 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[12%]">Tax</th>
                      <th className="text-right px-3 py-2.5 font-medium text-[var(--muted-foreground)] text-xs uppercase tracking-wide w-[10%]">Total</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((line, idx) => (
                      <tr key={line.id} className="border-b border-[var(--border)] last:border-0">
                        <td className="px-4 py-2">
                          <Input
                            value={line.description}
                            onChange={e => updateLine(line.id, "description", e.target.value)}
                            placeholder={`Item ${idx + 1}`}
                            className="h-8 text-sm border-0 shadow-none bg-transparent focus-visible:ring-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select value={line.account} onValueChange={v => updateLine(line.id, "account", v)}>
                            <SelectTrigger className="h-8 text-xs border-0 shadow-none bg-transparent w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ACCOUNTS.map(a => <SelectItem key={a} value={a} className="text-xs">{a}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            min={1}
                            value={line.qty}
                            onChange={e => updateLine(line.id, "qty", parseFloat(e.target.value) || 0)}
                            className="h-8 text-sm text-right border-0 shadow-none bg-transparent focus-visible:ring-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={line.rate}
                            onChange={e => updateLine(line.id, "rate", parseFloat(e.target.value) || 0)}
                            className="h-8 text-sm text-right border-0 shadow-none bg-transparent focus-visible:ring-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={String(line.taxRate)}
                            onValueChange={v => updateLine(line.id, "taxRate", parseFloat(v))}
                          >
                            <SelectTrigger className="h-8 text-xs border-0 shadow-none bg-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TAX_RATES.map(t => (
                                <SelectItem key={t.label} value={String(t.value)} className="text-xs">{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-sm">
                          {fmt(line.qty * line.rate)}
                        </td>
                        <td className="pr-3 py-2">
                          <Button
                            variant="ghost" size="icon" className="h-7 w-7 text-[var(--muted-foreground)] hover:text-red-600"
                            onClick={() => removeLine(line.id)}
                            disabled={lines.length === 1}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3">
                <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-[var(--primary)]" onClick={() => setLines(p => [...p, newLine()])}>
                  <Plus className="h-4 w-4" />Add Row
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes & Terms */}
          <Card>
            <CardContent className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes to customer (visible on invoice)…" rows={3} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="terms">Payment Terms</Label>
                <Textarea id="terms" defaultValue="Payment due within 14 days. Please make payment by BACS to the bank details shown. Late payments are subject to statutory interest under the Late Payment of Commercial Debts Act." rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Running Totals */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Invoice Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Subtotal</span>
                <span className="font-medium">{fmt(subtotal)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--muted-foreground)] flex-1">Discount (%)</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={discount}
                  onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                  className="h-7 w-16 text-right text-sm"
                />
                <span className="text-[var(--muted-foreground)] text-xs w-20 text-right">{fmt(discountAmt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">VAT (20%)</span>
                <span className="font-medium">{fmt(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total (GBP)</span>
                <span className="text-[var(--primary)] text-lg">{fmt(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardContent className="pt-5 space-y-4">
              <div className="space-y-1.5">
                <Label>Payment Terms</Label>
                <Select defaultValue="14">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Net 7 days</SelectItem>
                    <SelectItem value="14">Net 14 days</SelectItem>
                    <SelectItem value="30">Net 30 days</SelectItem>
                    <SelectItem value="60">Net 60 days</SelectItem>
                    <SelectItem value="eom">End of Month</SelectItem>
                    <SelectItem value="immediate">Due Immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select defaultValue="gbp">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gbp">GBP – British Pound £</SelectItem>
                    <SelectItem value="eur">EUR – Euro €</SelectItem>
                    <SelectItem value="usd">USD – US Dollar $</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" size="sm">
              <Send className="h-4 w-4 mr-2" />Send Invoice
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Save className="h-4 w-4 mr-2" />Save Draft
            </Button>
            <Button variant="ghost" className="w-full" size="sm">
              <Eye className="h-4 w-4 mr-2" />Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
