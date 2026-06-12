"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Save, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LineItem { id: string; description: string; account: string; qty: number; rate: number; taxRate: number }

const SUPPLIERS = ["AWS UK Ltd","Office Space Partners","Broadgate IT Supplies","BT Business","Creative Spark Agency","RSM UK Audit LLP","Peninsula HR Services"]
const ACCOUNTS = ["6000 – Cost of Sales","6100 – IT & Software","6200 – Office & Admin","6300 – Travel & Subsistence","6400 – Professional Fees","6500 – Marketing","6600 – Utilities"]
const TAX_RATES = [{ label: "Standard 20%", value: 20 },{ label: "Reduced 5%", value: 5 },{ label: "Zero Rated 0%", value: 0 }]

function newLine(): LineItem { return { id: crypto.randomUUID(), description: "", account: ACCOUNTS[0], qty: 1, rate: 0, taxRate: 20 } }
function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function NewBillPage() {
  const [lines, setLines] = useState<LineItem[]>([newLine()])

  function updateLine(id: string, field: keyof LineItem, value: string | number) {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  const subtotal = lines.reduce((s, l) => s + l.qty * l.rate, 0)
  const tax = lines.reduce((s, l) => s + l.qty * l.rate * l.taxRate / 100, 0)
  const total = subtotal + tax

  return (
    <div className="p-6 max-w-screen-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/app/accounting/bills"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">New Purchase Bill</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Record a supplier invoice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Bill Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Supplier</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select supplier…" /></SelectTrigger>
                  <SelectContent>
                    {SUPPLIERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Bill Number</Label><Input defaultValue="BILL-2024-0089" /></div>
              <div className="space-y-1.5"><Label>Reference</Label><Input placeholder="Supplier invoice ref…" /></div>
              <div className="space-y-1.5"><Label>Bill Date</Label><Input type="date" defaultValue="2024-06-10" /></div>
              <div className="space-y-1.5"><Label>Due Date</Label><Input type="date" defaultValue="2024-07-10" /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Line Items</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                      <th className="text-left px-4 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[35%]">Description</th>
                      <th className="text-left px-3 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[22%]">Account</th>
                      <th className="text-right px-3 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[8%]">Qty</th>
                      <th className="text-right px-3 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[12%]">Rate (£)</th>
                      <th className="text-right px-3 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[12%]">Tax</th>
                      <th className="text-right px-3 py-2.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-medium w-[10%]">Total</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((line, idx) => (
                      <tr key={line.id} className="border-b border-[var(--border)] last:border-0">
                        <td className="px-4 py-2">
                          <Input value={line.description} onChange={e => updateLine(line.id,"description",e.target.value)} placeholder={`Item ${idx+1}`} className="h-8 text-sm border-0 shadow-none bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Select value={line.account} onValueChange={v => updateLine(line.id,"account",v)}>
                            <SelectTrigger className="h-8 text-xs border-0 shadow-none bg-transparent"><SelectValue /></SelectTrigger>
                            <SelectContent>{ACCOUNTS.map(a => <SelectItem key={a} value={a} className="text-xs">{a}</SelectItem>)}</SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input type="number" min={1} value={line.qty} onChange={e => updateLine(line.id,"qty",parseFloat(e.target.value)||0)} className="h-8 text-sm text-right border-0 shadow-none bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input type="number" min={0} step={0.01} value={line.rate} onChange={e => updateLine(line.id,"rate",parseFloat(e.target.value)||0)} className="h-8 text-sm text-right border-0 shadow-none bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Select value={String(line.taxRate)} onValueChange={v => updateLine(line.id,"taxRate",parseFloat(v))}>
                            <SelectTrigger className="h-8 text-xs border-0 shadow-none bg-transparent"><SelectValue /></SelectTrigger>
                            <SelectContent>{TAX_RATES.map(t => <SelectItem key={t.label} value={String(t.value)} className="text-xs">{t.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2 text-right font-medium">{fmt(line.qty*line.rate)}</td>
                        <td className="pr-3 py-2">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--muted-foreground)] hover:text-red-600" onClick={() => setLines(p => p.filter(l => l.id !== line.id))} disabled={lines.length===1}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3">
                <Button variant="ghost" size="sm" className="gap-1.5 text-[var(--primary)]" onClick={() => setLines(p => [...p, newLine()])}>
                  <Plus className="h-4 w-4" />Add Row
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-1.5">
              <Label>Notes</Label>
              <Textarea placeholder="Internal notes…" rows={3} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Bill Total</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">Subtotal</span><span className="font-medium">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">VAT</span><span className="font-medium">{fmt(tax)}</span></div>
              <Separator />
              <div className="flex justify-between font-bold"><span>Total (GBP)</span><span className="text-[var(--primary)] text-lg">{fmt(total)}</span></div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <Button className="w-full gap-1.5" size="sm">
              <CheckSquare className="h-4 w-4" />Approve Bill
            </Button>
            <Button variant="outline" className="w-full gap-1.5" size="sm">
              <Save className="h-4 w-4" />Save Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
