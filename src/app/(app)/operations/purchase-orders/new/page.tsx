"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Plus, Trash2, CheckCircle, Building2 } from "lucide-react"

const steps = ["Supplier & Delivery", "Line Items", "Review & Submit"]

const suppliers = [
  "Fastener World Ltd", "TechParts Direct", "Global Steel Co",
  "Hydraulic Supplies UK", "ElectroComponents", "Aluminium Direct",
  "Packaging Solutions Ltd", "CNC Tools Direct",
]

const warehouses = ["WH-London", "WH-Manchester", "WH-Birmingham", "WH-Bristol"]

interface LineItem {
  id: string
  sku: string
  description: string
  qty: number
  unitCost: number
}

const defaultLines: LineItem[] = [
  { id: "1", sku: "", description: "", qty: 1, unitCost: 0 },
]

export default function NewPurchaseOrderPage() {
  const [step, setStep] = useState(0)
  const [supplier, setSupplier] = useState("")
  const [warehouse, setWarehouse] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [reference, setReference] = useState("")
  const [notes, setNotes] = useState("")
  const [lines, setLines] = useState<LineItem[]>(defaultLines)
  const [submitted, setSubmitted] = useState(false)

  function addLine() {
    setLines(prev => [...prev, { id: Date.now().toString(), sku: "", description: "", qty: 1, unitCost: 0 }])
  }

  function removeLine(id: string) {
    setLines(prev => prev.filter(l => l.id !== id))
  }

  function updateLine(id: string, field: keyof LineItem, value: string | number) {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.unitCost, 0)
  const vat = subtotal * 0.2
  const total = subtotal + vat

  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto mt-16 text-center">
        <div className="h-16 w-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Purchase Order Created</h2>
        <p className="text-[var(--muted-foreground)] mt-2">PO-2025-0848 has been created and saved as a draft.</p>
        <div className="flex gap-3 justify-center mt-6">
          <Link href="/app/operations/purchase-orders/1">
            <Button variant="outline">View PO</Button>
          </Link>
          <Link href="/app/operations/purchase-orders">
            <Button className="bg-[var(--primary)] text-white">Back to POs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/purchase-orders" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Purchase Orders
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">New Purchase Order</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">New Purchase Order</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Step {step + 1} of {steps.length}: {steps[step]}</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step ? "bg-green-500 text-white" :
                i === step ? "bg-[var(--primary)] text-white" :
                "bg-[var(--muted)] text-[var(--muted-foreground)]"
              }`}>
                {i < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm ${i === step ? "font-medium text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-green-500" : "bg-[var(--border)]"}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Supplier & Delivery */}
      {step === 0 && (
        <Card className="border border-[var(--border)]">
          <CardHeader><CardTitle className="text-base">Supplier & Delivery Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Supplier <span className="text-red-500">*</span></Label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger><SelectValue placeholder="Select supplier..." /></SelectTrigger>
                  <SelectContent>
                    {suppliers.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Delivery Warehouse <span className="text-red-500">*</span></Label>
                <Select value={warehouse} onValueChange={setWarehouse}>
                  <SelectTrigger><SelectValue placeholder="Select warehouse..." /></SelectTrigger>
                  <SelectContent>
                    {warehouses.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Expected Delivery Date</Label>
                <Input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Reference / PO Number Override</Label>
                <Input placeholder="Auto-generated if blank" value={reference} onChange={e => setReference(e.target.value)} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Notes to Supplier</Label>
                <Textarea placeholder="Add any delivery instructions or notes..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Line Items */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-[var(--border)]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Line Items</CardTitle>
                <Button size="sm" variant="outline" onClick={addLine} className="gap-1">
                  <Plus className="h-4 w-4" /> Add Row
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                        <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">SKU</th>
                        <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">Description</th>
                        <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">Qty</th>
                        <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">Unit Cost</th>
                        <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">Total</th>
                        <th className="w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map(line => (
                        <tr key={line.id} className="border-b border-[var(--border)] last:border-0">
                          <td className="px-2 py-2">
                            <Input placeholder="SKU" value={line.sku} onChange={e => updateLine(line.id, "sku", e.target.value)} className="h-8 text-xs w-28" />
                          </td>
                          <td className="px-2 py-2">
                            <Input placeholder="Item description" value={line.description} onChange={e => updateLine(line.id, "description", e.target.value)} className="h-8 text-xs" />
                          </td>
                          <td className="px-2 py-2">
                            <Input type="number" min={1} value={line.qty} onChange={e => updateLine(line.id, "qty", Number(e.target.value))} className="h-8 text-xs w-16 text-right" />
                          </td>
                          <td className="px-2 py-2">
                            <Input type="number" min={0} step={0.01} value={line.unitCost} onChange={e => updateLine(line.id, "unitCost", Number(e.target.value))} className="h-8 text-xs w-24 text-right" />
                          </td>
                          <td className="px-4 py-2 text-right font-medium">
                            £{(line.qty * line.unitCost).toFixed(2)}
                          </td>
                          <td className="px-2 py-2">
                            <Button size="sm" variant="ghost" onClick={() => removeLine(line.id)} className="h-7 w-7 p-0 text-red-500 hover:bg-red-50">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Running Total Sidebar */}
          <Card className="border border-[var(--border)] h-fit">
            <CardHeader><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Subtotal</span>
                <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-[var(--primary)]">£{total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-[var(--muted-foreground)] pt-1">
                {lines.length} line{lines.length !== 1 ? "s" : ""} · Supplier: {supplier || "—"}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 2 && (
        <Card className="border border-[var(--border)]">
          <CardHeader><CardTitle className="text-base">Review Purchase Order</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Supplier", value: supplier || "—" },
                { label: "Delivery Warehouse", value: warehouse || "—" },
                { label: "Expected Date", value: deliveryDate || "—" },
                { label: "Reference", value: reference || "Auto-generated" },
                { label: "Lines", value: lines.length.toString() },
                { label: "Total (incl. VAT)", value: `£${total.toFixed(2)}` },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-[var(--muted-foreground)]">{f.label}</p>
                  <p className="font-medium text-[var(--foreground)] mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>
            {notes && (
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Notes</p>
                <p className="text-sm mt-1 p-2 bg-[var(--muted)]/30 rounded">{notes}</p>
              </div>
            )}
            <div className="border border-[var(--border)] rounded-lg p-3 bg-blue-500/5">
              <p className="text-sm font-medium text-blue-600">Approval not required for this order</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Orders under £50,000 are auto-approved for this supplier</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button className="bg-[var(--primary)] text-white" onClick={() => setStep(s => s + 1)}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button className="bg-[var(--primary)] text-white" onClick={() => setSubmitted(true)}>
            <CheckCircle className="h-4 w-4 mr-1" /> Create Purchase Order
          </Button>
        )}
      </div>
    </div>
  )
}
