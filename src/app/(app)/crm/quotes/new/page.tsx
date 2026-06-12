"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft, Plus, Trash2, FileText, Send, Save,
  Building2, User, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, formatCurrency } from "@/lib/utils"

interface LineItem {
  id: string
  product: string
  description: string
  qty: number
  unitPrice: number
  discount: number
  tax: number
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: "li1", product: "Orbas CRM — Enterprise Licence", description: "Annual SaaS licence for 200 seats", qty: 1, unitPrice: 48000, discount: 0, tax: 20 },
  { id: "li2", product: "Implementation & Onboarding", description: "Full implementation, data migration and training", qty: 1, unitPrice: 28000, discount: 10, tax: 20 },
  { id: "li3", product: "Premium Support Package", description: "24/7 dedicated support, 4-hour SLA, CSM", qty: 1, unitPrice: 12000, discount: 0, tax: 20 },
]

function calcLineTotal(item: LineItem) {
  const subtotal = item.qty * item.unitPrice
  const afterDiscount = subtotal * (1 - item.discount / 100)
  const taxAmount = afterDiscount * (item.tax / 100)
  return afterDiscount + taxAmount
}

export default function NewQuotePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    account: "Fintech Corp Ltd",
    contact: "Marcus Williams",
    deal: "Enterprise SaaS Rollout",
    quoteDate: "2026-06-10",
    expiryDate: "2026-07-10",
    paymentTerms: "Net 30",
    currency: "GBP",
    reference: "PROJ-2026-ENT-001",
    notes: "This proposal is valid for 30 days from the quote date. Prices are exclusive of VAT unless stated. Implementation timeline starts within 2 weeks of contract signature.",
    terms: "Standard terms and conditions apply. See attached service agreement for full contractual terms.",
  })
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS)

  function updateForm(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }))
  }

  function updateItem(id: string, field: keyof LineItem, value: string | number) {
    setItems(p => p.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  function addItem() {
    setItems(p => [...p, {
      id: `li${Date.now()}`,
      product: "",
      description: "",
      qty: 1,
      unitPrice: 0,
      discount: 0,
      tax: 20,
    }])
  }

  function removeItem(id: string) {
    setItems(p => p.filter(i => i.id !== id))
  }

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0)
  const discountTotal = items.reduce((s, i) => s + (i.qty * i.unitPrice) * (i.discount / 100), 0)
  const taxableAmount = subtotal - discountTotal
  const taxTotal = items.reduce((s, i) => {
    const afterDiscount = i.qty * i.unitPrice * (1 - i.discount / 100)
    return s + afterDiscount * (i.tax / 100)
  }, 0)
  const grandTotal = taxableAmount + taxTotal

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/quotes"><ChevronLeft className="h-4 w-4 mr-1" />Back to Quotes</Link>
        </Button>
      </div>

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--foreground)]">New Quote</h1>
              <p className="text-xs text-[var(--muted-foreground)]">Draft — Q-0043</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <FileText className="h-3.5 w-3.5 mr-1.5" />Preview PDF
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Save className="h-3.5 w-3.5 mr-1.5" />Save Draft
            </Button>
            <Button size="sm" className="h-8 text-xs">
              <Send className="h-3.5 w-3.5 mr-1.5" />Send to Customer
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-5">
        {/* Customer & Quote Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Customer */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[var(--muted-foreground)]" />
                <CardTitle className="text-sm font-semibold">Customer Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Account</Label>
                <Select value={form.account} onValueChange={v => updateForm("account", v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fintech Corp Ltd">Fintech Corp Ltd</SelectItem>
                    <SelectItem value="Barclays PLC">Barclays PLC</SelectItem>
                    <SelectItem value="NHS Digital">NHS Digital</SelectItem>
                    <SelectItem value="Lloyds Banking Group">Lloyds Banking Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Contact</Label>
                <Select value={form.contact} onValueChange={v => updateForm("contact", v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marcus Williams">Marcus Williams — CFO</SelectItem>
                    <SelectItem value="James Whitfield">James Whitfield — Head of Ops</SelectItem>
                    <SelectItem value="Sophie Lane">Sophie Lane — IT Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Linked Deal</Label>
                <Select value={form.deal} onValueChange={v => updateForm("deal", v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enterprise SaaS Rollout">Enterprise SaaS Rollout</SelectItem>
                    <SelectItem value="Security Compliance Suite">Security Compliance Suite</SelectItem>
                    <SelectItem value="API Platform Rollout">API Platform Rollout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quote Meta */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                <CardTitle className="text-sm font-semibold">Quote Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Quote Date</Label>
                <Input type="date" value={form.quoteDate} onChange={e => updateForm("quoteDate", e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Expiry Date</Label>
                <Input type="date" value={form.expiryDate} onChange={e => updateForm("expiryDate", e.target.value)} className="h-9" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Payment Terms</Label>
                <Select value={form.paymentTerms} onValueChange={v => updateForm("paymentTerms", v)}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Immediate", "Net 7", "Net 14", "Net 30", "Net 60", "Net 90"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Currency</Label>
                <Select value={form.currency} onValueChange={v => updateForm("currency", v)}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Customer Reference</Label>
                <Input value={form.reference} onChange={e => updateForm("reference", e.target.value)} className="h-9" placeholder="Customer PO or reference number" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Line Items</CardTitle>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={addItem}>
              <Plus className="h-3.5 w-3.5 mr-1" />Add Line Item
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Product / Service", "Description", "Qty", "Unit Price (£)", "Discount %", "Tax %", "Total", ""].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {items.map(item => {
                    const lineTotal = calcLineTotal(item)
                    return (
                      <tr key={item.id} className="hover:bg-[var(--muted)]/30">
                        <td className="px-3 py-2.5">
                          <Input
                            value={item.product}
                            onChange={e => updateItem(item.id, "product", e.target.value)}
                            className="h-7 text-xs min-w-[160px]"
                            placeholder="Product name"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            value={item.description}
                            onChange={e => updateItem(item.id, "description", e.target.value)}
                            className="h-7 text-xs min-w-[180px]"
                            placeholder="Description"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            type="number"
                            value={item.qty}
                            onChange={e => updateItem(item.id, "qty", Number(e.target.value))}
                            className="h-7 text-xs w-16"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={e => updateItem(item.id, "unitPrice", Number(e.target.value))}
                            className="h-7 text-xs w-28"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            type="number"
                            value={item.discount}
                            onChange={e => updateItem(item.id, "discount", Number(e.target.value))}
                            className="h-7 text-xs w-16"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            type="number"
                            value={item.tax}
                            onChange={e => updateItem(item.id, "tax", Number(e.target.value))}
                            className="h-7 text-xs w-16"
                          />
                        </td>
                        <td className="px-3 py-2.5 font-semibold whitespace-nowrap">
                          {formatCurrency(lineTotal)}
                        </td>
                        <td className="px-3 py-2.5">
                          <Button
                            variant="ghost" size="sm"
                            className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end p-4 border-t border-[var(--border)]">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Discount</span>
                  <span className="font-medium text-red-600">−{formatCurrency(discountTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Tax (VAT)</span>
                  <span className="font-medium">{formatCurrency(taxTotal)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-[var(--foreground)]">Total</span>
                  <span className="text-[var(--foreground)]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Notes</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                value={form.notes}
                onChange={e => updateForm("notes", e.target.value)}
                className="min-h-[100px] text-sm"
                placeholder="Internal or customer-facing notes..."
              />
            </CardContent>
          </Card>
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Terms & Conditions</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                value={form.terms}
                onChange={e => updateForm("terms", e.target.value)}
                className="min-h-[100px] text-sm"
                placeholder="Payment and contract terms..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Button variant="outline" asChild className="h-9">
            <Link href="/app/crm/quotes">Cancel</Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 text-sm">
              <FileText className="h-4 w-4 mr-2" />Preview PDF
            </Button>
            <Button variant="outline" className="h-9 text-sm">
              <Save className="h-4 w-4 mr-2" />Save Draft
            </Button>
            <Button className="h-9 text-sm">
              <Send className="h-4 w-4 mr-2" />Send to Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
