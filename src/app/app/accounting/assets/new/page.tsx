"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, Save, Package, Info, TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"

interface FormData {
  name: string
  category: string
  serial: string
  purchaseDate: string
  cost: string
  salvageValue: string
  usefulLife: string
  depMethod: string
  location: string
  supplier: string
  invoiceRef: string
  description: string
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

function calcSchedule(cost: number, salvage: number, life: number, method: string) {
  const rows = []
  let bv = cost
  const annualSL = (cost - salvage) / life
  const dbRate = method === "Declining Balance" ? 2 / life : 0

  for (let yr = 1; yr <= life; yr++) {
    let dep = 0
    if (method === "Straight Line") {
      dep = annualSL
    } else if (method === "Declining Balance") {
      dep = Math.min(bv * dbRate, bv - salvage)
    }
    dep = Math.max(0, Math.min(dep, bv - salvage))
    const closing = Math.max(salvage, bv - dep)
    rows.push({ year: `Year ${yr}`, openingBV: bv, depreciation: bv - closing, closingBV: closing })
    bv = closing
  }
  return rows
}

export default function NewAssetPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    category: "",
    serial: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    cost: "",
    salvageValue: "",
    usefulLife: "",
    depMethod: "Straight Line",
    location: "",
    supplier: "",
    invoiceRef: "",
    description: "",
  })

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const cost = parseFloat(form.cost) || 0
  const salvage = parseFloat(form.salvageValue) || 0
  const life = parseInt(form.usefulLife) || 0
  const hasPreview = cost > 0 && life > 0 && cost > salvage

  const schedule = hasPreview ? calcSchedule(cost, salvage, life, form.depMethod) : []
  const annualDep = hasPreview && schedule.length > 0 ? schedule[0].depreciation : 0
  const monthlyDep = annualDep / 12

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/assets"><ChevronLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Add Fixed Asset</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Register a new asset to the asset register</p>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Asset Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Asset Name *</label>
              <Input placeholder="e.g. Dell PowerEdge R750 Server" value={form.name} onChange={e => set("name", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Category *</label>
              <Select value={form.category} onValueChange={v => set("category", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select category…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Machinery">Machinery</SelectItem>
                  <SelectItem value="Vehicles">Vehicles</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                  <SelectItem value="Buildings">Buildings</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Serial Number</label>
              <Input placeholder="Manufacturer serial number" value={form.serial} onChange={e => set("serial", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Location</label>
              <Input placeholder="e.g. Server Room, HQ" value={form.location} onChange={e => set("location", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Description</label>
              <Input placeholder="Brief asset description" value={form.description} onChange={e => set("description", e.target.value)} className="h-9 text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Purchase & Depreciation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Purchase Date *</label>
              <Input type="date" value={form.purchaseDate} onChange={e => set("purchaseDate", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Purchase Cost (£) *</label>
              <Input type="number" placeholder="0.00" value={form.cost} onChange={e => set("cost", e.target.value)} className="h-9 text-sm" min="0" step="0.01" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Salvage Value (£)</label>
              <Input type="number" placeholder="0.00" value={form.salvageValue} onChange={e => set("salvageValue", e.target.value)} className="h-9 text-sm" min="0" step="0.01" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Useful Life (Years) *</label>
              <Input type="number" placeholder="5" value={form.usefulLife} onChange={e => set("usefulLife", e.target.value)} className="h-9 text-sm" min="1" max="50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Depreciation Method *</label>
              <Select value={form.depMethod} onValueChange={v => set("depMethod", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Straight Line">Straight Line</SelectItem>
                  <SelectItem value="Declining Balance">Declining Balance (200%)</SelectItem>
                  <SelectItem value="Units of Production">Units of Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Supplier</label>
              <Input placeholder="Supplier name" value={form.supplier} onChange={e => set("supplier", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Purchase Invoice Ref</label>
              <Input placeholder="INV-2024-XXXXX" value={form.invoiceRef} onChange={e => set("invoiceRef", e.target.value)} className="h-9 text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Depreciation Preview */}
      {hasPreview && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-[var(--primary)]" />
                Depreciation Preview
              </CardTitle>
              <div className="flex gap-4 text-xs text-[var(--muted-foreground)]">
                <span>Annual: <span className="font-semibold text-[var(--foreground)]">{fmt(annualDep)}</span></span>
                <span>Monthly: <span className="font-semibold text-[var(--foreground)]">{fmt(monthlyDep)}</span></span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Period</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Opening Book Value</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Depreciation</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Closing Book Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row, idx) => (
                  <TableRow key={idx} className="hover:bg-[var(--muted)]/20">
                    <TableCell className="text-sm font-medium text-[var(--foreground)]">{row.year}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[var(--foreground)]">{fmt(row.openingBV)}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[#dc2626]">({fmt(row.depreciation)})</TableCell>
                    <TableCell className="text-right font-mono text-sm font-bold text-[var(--foreground)]">{fmt(row.closingBV)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!hasPreview && (
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 px-4 py-3">
          <Info className="h-3.5 w-3.5 shrink-0" />
          Enter Purchase Cost, Salvage Value and Useful Life to see the depreciation schedule preview.
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="outline" size="sm" className="h-9" asChild>
          <Link href="/app/accounting/assets">Cancel</Link>
        </Button>
        <Button size="sm" className="h-9 gap-1.5 orbas-gradient text-white hover:opacity-90">
          <Save className="h-4 w-4" />Save Asset
        </Button>
      </div>
    </div>
  )
}
