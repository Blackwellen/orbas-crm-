"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft, Send, PackageCheck, FileCheck2, CheckCircle,
  XCircle, Copy, Edit2, Save, Truck, User, Clock
} from "lucide-react"

const po = {
  id: "1",
  poNumber: "PO-2025-0847",
  supplier: "Fastener World Ltd",
  warehouse: "WH-London",
  orderDate: "2025-06-08",
  expectedDate: "2025-06-22",
  reference: "REF-FW-2025-Jun",
  notes: "Please deliver before 12pm. Contact warehouse manager on arrival.",
  status: "Sent" as const,
  total: 12450.00,
  subtotal: 10375.00,
  vat: 2075.00,
}

const lines = [
  { id: "1", sku: "TBM8-001", description: "Titanium Bolts M8 x 30mm", qty: 500, unitCost: 0.85, total: 425.00, received: 0 },
  { id: "2", sku: "TBM10-001", description: "Titanium Bolts M10 x 40mm", qty: 300, unitCost: 1.20, total: 360.00, received: 0 },
  { id: "3", sku: "SSW-M6", description: "Stainless Steel Washers M6 Pack/100", qty: 50, unitCost: 12.50, total: 625.00, received: 0 },
  { id: "4", sku: "SSW-M8", description: "Stainless Steel Washers M8 Pack/100", qty: 50, unitCost: 14.00, total: 700.00, received: 0 },
  { id: "5", sku: "HNM8", description: "Hex Nuts M8 Stainless Pack/200", qty: 40, unitCost: 18.50, total: 740.00, received: 0 },
  { id: "6", sku: "HNM10", description: "Hex Nuts M10 Stainless Pack/200", qty: 30, unitCost: 22.00, total: 660.00, received: 0 },
  { id: "7", sku: "STD-M8-30", description: "Threaded Rod M8 x 1000mm", qty: 100, unitCost: 32.00, total: 3200.00, received: 0 },
  { id: "8", sku: "ALN-SET-50", description: "Allen Key Set 50pc Metric", qty: 25, unitCost: 147.00, total: 3675.00, received: 0 },
]

const approvals = [
  { role: "Purchasing Manager", user: "Sarah Khan", status: "Approved", date: "2025-06-08 09:15" },
  { role: "Finance Controller", user: "James Richardson", status: "Pending", date: "—" },
]

const activityLog = [
  { user: "Sarah K.", action: "Sent PO to supplier via email", time: "2025-06-08 09:30" },
  { user: "Sarah K.", action: "Approved purchase order", time: "2025-06-08 09:15" },
  { user: "System", action: "Purchase order PO-2025-0847 created", time: "2025-06-08 09:00" },
]

const statusConfig: Record<string, string> = {
  Draft: "bg-gray-500/15 text-gray-600 border-gray-300",
  Sent: "bg-blue-500/15 text-blue-600 border-blue-300",
  Partial: "bg-purple-500/15 text-purple-600 border-purple-300",
  Received: "bg-green-500/15 text-green-600 border-green-300",
  Cancelled: "bg-red-500/15 text-red-600 border-red-300",
  Overdue: "bg-orange-500/15 text-orange-700 border-orange-300",
  Approved: "bg-green-500/15 text-green-600 border-green-300",
  Pending: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusConfig[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

export default function PurchaseOrderDetail() {
  const [tab, setTab] = useState("summary")
  const [receivedQtys, setReceivedQtys] = useState<Record<string, number>>({})

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/purchase-orders" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Purchase Orders
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{po.poNumber}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-[var(--foreground)]">{po.poNumber}</h1>
            <StatusBadge status={po.status} />
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{po.supplier} · {po.warehouse} · Expected {po.expectedDate}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="gap-1"><Send className="h-4 w-4" /> Send to Supplier</Button>
          <Button size="sm" variant="outline" className="gap-1"><PackageCheck className="h-4 w-4" /> Receive Goods</Button>
          <Button size="sm" variant="outline" className="gap-1"><FileCheck2 className="h-4 w-4" /> Create Bill</Button>
          <Button size="sm" variant="outline" className="gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Approve</Button>
          <Button size="sm" variant="outline" className="gap-1"><Copy className="h-4 w-4" /> Duplicate</Button>
          <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-300"><XCircle className="h-4 w-4" /> Cancel</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1 bg-[var(--muted)]/30">
          {["summary","lines","approvals","receiving","supplier","bills","documents","activity","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-base">Order Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "PO Number", value: po.poNumber },
                  { label: "Supplier", value: po.supplier },
                  { label: "Delivery Warehouse", value: po.warehouse },
                  { label: "Order Date", value: po.orderDate },
                  { label: "Expected Date", value: po.expectedDate },
                  { label: "Reference", value: po.reference },
                  { label: "Status", value: po.status, badge: true },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">{f.label}</span>
                    {f.badge ? <StatusBadge status={f.value} /> : <span className="font-medium text-[var(--foreground)]">{f.value}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-base">Financial Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-medium">£{po.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">VAT (20%)</span>
                  <span>£{po.vat.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-[var(--primary)]">£{po.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
                </div>
                {po.notes && (
                  <div className="mt-3 p-2 bg-[var(--muted)]/30 rounded text-xs text-[var(--muted-foreground)]">
                    <p className="font-medium text-[var(--foreground)] mb-1">Notes</p>
                    {po.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lines" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Line Items ({lines.length})</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                      <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">SKU</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Description</th>
                      <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Qty</th>
                      <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Unit Cost</th>
                      <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Total</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(line => (
                      <tr key={line.id} className="border-b border-[var(--border)] last:border-0">
                        <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{line.sku}</td>
                        <td className="px-4 py-3 text-[var(--foreground)]">{line.description}</td>
                        <td className="px-4 py-3 text-right">{line.qty}</td>
                        <td className="px-4 py-3 text-right">£{line.unitCost.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-semibold">£{line.total.toFixed(2)}</td>
                        <td className="px-4 py-3 w-40">
                          <div className="flex items-center gap-2">
                            <Progress value={(line.received / line.qty) * 100} className="h-2 flex-1" />
                            <span className="text-xs text-[var(--muted-foreground)] w-12 text-right">{line.received}/{line.qty}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Approval Chain</CardTitle></CardHeader>
            <CardContent className="p-0">
              {approvals.map((a, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-[var(--border)] last:border-0">
                  <div className="h-9 w-9 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[var(--primary)]">{a.user[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-[var(--foreground)]">{a.user}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{a.role}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={a.status} />
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{a.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receiving" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Receive Goods</CardTitle>
              <Button size="sm" className="bg-[var(--primary)] text-white gap-1">
                <PackageCheck className="h-4 w-4" /> Confirm Receipt
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Item</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Ordered</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Previously Received</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Receiving Now</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map(line => (
                    <tr key={line.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium">{line.description}</p>
                        <p className="font-mono text-xs text-[var(--primary)]">{line.sku}</p>
                      </td>
                      <td className="px-4 py-3 text-right">{line.qty}</td>
                      <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">0</td>
                      <td className="px-4 py-3 text-right">
                        <Input
                          type="number"
                          min={0}
                          max={line.qty}
                          defaultValue={0}
                          className="h-8 w-20 text-right ml-auto"
                          onChange={e => setReceivedQtys(prev => ({ ...prev, [line.id]: Number(e.target.value) }))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier" className="mt-4">
          <Card className="border border-[var(--border)] max-w-md">
            <CardHeader><CardTitle className="text-base">Supplier Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Company", value: "Fastener World Ltd" },
                { label: "Account Ref", value: "FW-001" },
                { label: "Primary Contact", value: "Tom Bradley" },
                { label: "Email", value: "tbradley@fastenerworld.co.uk" },
                { label: "Phone", value: "+44 1234 567890" },
                { label: "Payment Terms", value: "30 days net" },
                { label: "Country", value: "United Kingdom" },
              ].map(f => (
                <div key={f.label} className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">{f.label}</span>
                  <span className="font-medium">{f.value}</span>
                </div>
              ))}
              <Link href="/app/operations/suppliers/1">
                <Button size="sm" variant="outline" className="w-full mt-2">View Supplier Profile</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              {activityLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0">
                  <div className="h-7 w-7 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-[var(--primary)]">{entry.user[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">{entry.user}</span> {entry.action}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {["bills","documents","audit"].map(t => (
          <TabsContent key={t} value={t} className="mt-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
                <FileCheck2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium capitalize">No {t} yet</p>
                <p className="text-sm mt-1">Items will appear here once created</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
