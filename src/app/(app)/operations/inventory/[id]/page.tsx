"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft, Package2, ArrowUpDown, ArrowRightLeft, FileCheck2,
  Archive, Edit2, Save, MapPin, Hash, TrendingUp, TrendingDown,
  Calendar, BarChart2, Clock, CheckCircle
} from "lucide-react"

const itemData = {
  id: "1",
  sku: "TBM8-001",
  name: "Titanium Bolts M8 x 30mm",
  description: "High-tensile Grade 5 titanium hex head bolts, M8 thread, 30mm length. Suitable for aerospace and automotive applications.",
  category: "Fasteners",
  subcategory: "Bolts",
  status: "Critical" as const,
  onHand: 45,
  reserved: 30,
  available: 15,
  cost: 0.85,
  price: 2.40,
  reorderPoint: 100,
  reorderQty: 500,
  leadTimeDays: 14,
  weight: 0.012,
  unitOfMeasure: "Each",
  supplier: "Fastener World Ltd",
  supplierSKU: "FW-TI-M8-30",
}

const warehouseBreakdown = [
  { warehouse: "WH-London", bin: "A-03-12", onHand: 45, reserved: 30, available: 15, minStock: 100 },
  { warehouse: "WH-Manchester", bin: "B-01-04", onHand: 0, reserved: 0, available: 0, minStock: 50 },
  { warehouse: "WH-Birmingham", bin: "C-07-02", onHand: 0, reserved: 0, available: 0, minStock: 50 },
]

const lots = [
  { lot: "LOT-2024-1142", received: "2024-11-15", qty: 500, remaining: 45, expiry: "—", status: "Active" },
  { lot: "LOT-2024-0987", received: "2024-09-03", qty: 500, remaining: 0, expiry: "—", status: "Consumed" },
]

const movements = [
  { date: "2025-06-08", type: "OUT", reference: "SO-2025-1847", qty: -20, balance: 45, note: "Sales Order dispatch" },
  { date: "2025-06-05", type: "OUT", reference: "SO-2025-1832", qty: -35, balance: 65, note: "Sales Order dispatch" },
  { date: "2025-05-22", type: "IN", reference: "PO-2025-0821", qty: 500, balance: 100, note: "Purchase Order receipt" },
  { date: "2025-05-10", type: "ADJ", reference: "ADJ-2025-0047", qty: -5, balance: -400, note: "Stock count adjustment" },
  { date: "2025-04-18", type: "OUT", reference: "SO-2025-1701", qty: -60, balance: 0, note: "Sales Order dispatch" },
]

const purchaseHistory = [
  { po: "PO-2025-0821", date: "2025-05-22", supplier: "Fastener World Ltd", qty: 500, unitCost: "£0.82", total: "£410.00", status: "Received" },
  { po: "PO-2025-0698", date: "2025-03-10", supplier: "Fastener World Ltd", qty: 500, unitCost: "£0.80", total: "£400.00", status: "Received" },
  { po: "PO-2024-1247", date: "2024-11-15", supplier: "Fastener World Ltd", qty: 500, unitCost: "£0.79", total: "£395.00", status: "Received" },
  { po: "PO-2024-1089", date: "2024-09-03", supplier: "Fastener World Ltd", qty: 1000, unitCost: "£0.77", total: "£770.00", status: "Received" },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-500/15 text-red-600 border-red-300",
    Low: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
    OK: "bg-green-500/15 text-green-600 border-green-300",
    Active: "bg-green-500/15 text-green-600 border-green-300",
    Consumed: "bg-gray-500/15 text-gray-600 border-gray-300",
    Received: "bg-green-500/15 text-green-600 border-green-300",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

export default function InventoryItemDetail() {
  const params = useParams()
  const [tab, setTab] = useState("overview")
  const [editing, setEditing] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/inventory" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Inventory
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{itemData.sku}</span>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
            <Package2 className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold text-[var(--foreground)]">{itemData.name}</h1>
              <StatusBadge status={itemData.status} />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">SKU: <span className="font-mono text-[var(--foreground)]">{itemData.sku}</span> · {itemData.category} · {itemData.subcategory}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="gap-1"><ArrowUpDown className="h-4 w-4" /> Adjust Stock</Button>
          <Button size="sm" variant="outline" className="gap-1"><ArrowRightLeft className="h-4 w-4" /> Transfer</Button>
          <Button size="sm" variant="outline" className="gap-1"><FileCheck2 className="h-4 w-4" /> Create PO</Button>
          <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-300 hover:bg-red-50"><Archive className="h-4 w-4" /> Archive</Button>
        </div>
      </div>

      {/* Fact Strip */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "On Hand", value: itemData.onHand, suffix: " ea", className: "" },
          { label: "Reserved", value: itemData.reserved, suffix: " ea", className: "" },
          { label: "Available", value: itemData.available, suffix: " ea", className: "text-red-500 font-bold" },
          { label: "Unit Cost", value: `£${itemData.cost.toFixed(2)}`, suffix: "", className: "" },
          { label: "Unit Price", value: `£${itemData.price.toFixed(2)}`, suffix: "", className: "" },
          { label: "Reorder Pt", value: itemData.reorderPoint, suffix: " ea", className: "" },
        ].map(f => (
          <Card key={f.label} className="border border-[var(--border)]">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-[var(--muted-foreground)]">{f.label}</p>
              <p className={`text-lg font-bold mt-0.5 ${f.className || "text-[var(--foreground)]"}`}>{f.value}{f.suffix}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1 bg-[var(--muted)]/30">
          {["overview","stock-levels","warehouses","lots","movements","purchase-history","sales-usage","reorder-rules","documents","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace(/-/g, " ")}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Item Details</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setEditing(!editing)} className="gap-1">
                {editing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                {editing ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {[
                { label: "Item Name", value: itemData.name },
                { label: "SKU", value: itemData.sku },
                { label: "Description", value: itemData.description, full: true },
                { label: "Category", value: itemData.category },
                { label: "Subcategory", value: itemData.subcategory },
                { label: "Unit of Measure", value: itemData.unitOfMeasure },
                { label: "Weight (kg)", value: itemData.weight.toString() },
                { label: "Default Supplier", value: itemData.supplier },
                { label: "Supplier SKU", value: itemData.supplierSKU },
                { label: "Lead Time (days)", value: itemData.leadTimeDays.toString() },
                { label: "Reorder Quantity", value: itemData.reorderQty.toString() },
              ].map(f => (
                <div key={f.label} className={f.full ? "col-span-2" : ""}>
                  <Label className="text-xs text-[var(--muted-foreground)]">{f.label}</Label>
                  {editing ? (
                    f.full ? <Textarea defaultValue={f.value} className="mt-1 text-sm" rows={3} /> :
                    <Input defaultValue={f.value} className="mt-1 h-8 text-sm" />
                  ) : (
                    <p className="mt-1 text-sm text-[var(--foreground)]">{f.value}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock-levels" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Stock Levels by Warehouse</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Warehouse</th>
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Bin</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">On Hand</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Reserved</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Available</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Min Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouseBreakdown.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{row.warehouse}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{row.bin}</td>
                      <td className="px-4 py-3 text-right">{row.onHand}</td>
                      <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{row.reserved}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${row.available <= 0 ? "text-red-500" : "text-green-600"}`}>{row.available}</td>
                      <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{row.minStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lots" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Lots & Serial Numbers</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Lot Number","Received Date","Original Qty","Remaining","Expiry","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lots.map((l, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{l.lot}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{l.received}</td>
                      <td className="px-4 py-3">{l.qty}</td>
                      <td className="px-4 py-3 font-semibold">{l.remaining}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{l.expiry}</td>
                      <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Stock Movement History</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Date","Type","Reference","Qty","Balance","Note"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {movements.map((m, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{m.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold ${
                          m.type === "IN" ? "bg-green-100 text-green-700" :
                          m.type === "OUT" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>{m.type}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{m.reference}</td>
                      <td className={`px-4 py-3 font-semibold ${m.qty > 0 ? "text-green-600" : "text-red-500"}`}>
                        {m.qty > 0 ? `+${m.qty}` : m.qty}
                      </td>
                      <td className="px-4 py-3">{m.balance}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-history" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Purchase History</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["PO #","Date","Supplier","Qty","Unit Cost","Total","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((p, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{p.po}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td>
                      <td className="px-4 py-3">{p.supplier}</td>
                      <td className="px-4 py-3">{p.qty}</td>
                      <td className="px-4 py-3">{p.unitCost}</td>
                      <td className="px-4 py-3 font-medium">{p.total}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reorder-rules" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Reorder Rules</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {[
                { label: "Reorder Point (min stock)", value: "100" },
                { label: "Reorder Quantity", value: "500" },
                { label: "Lead Time (days)", value: "14" },
                { label: "Safety Stock", value: "50" },
                { label: "Preferred Supplier", value: "Fastener World Ltd" },
                { label: "Auto-reorder", value: "Enabled" },
              ].map(f => (
                <div key={f.label} className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-sm text-[var(--muted-foreground)]">{f.label}</Label>
                  <Input defaultValue={f.value} className="h-8 text-sm" />
                </div>
              ))}
              <Button size="sm" className="bg-[var(--primary)] text-white mt-2">Save Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
              <Package2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No documents attached</p>
              <p className="text-sm mt-1">Upload specs, certificates, or datasheets</p>
              <Button size="sm" className="mt-4">Upload Document</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <div className="space-y-0">
                {[
                  { user: "Sarah K.", action: "Adjusted stock quantity from 65 to 45", time: "2025-06-08 14:32" },
                  { user: "James R.", action: "Created purchase order PO-2025-0821", time: "2025-05-20 09:15" },
                  { user: "System", action: "Auto-reorder triggered at reorder point 100", time: "2025-05-19 06:00" },
                  { user: "Sarah K.", action: "Updated reorder point from 75 to 100", time: "2025-05-01 11:22" },
                ].map((entry, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0">
                    <div className="h-7 w-7 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-[var(--primary)]">{entry.user[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--foreground)]"><span className="font-medium">{entry.user}</span> {entry.action}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{entry.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {["warehouses","sales-usage"].map(t => (
          <TabsContent key={t} value={t} className="mt-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
                <BarChart2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium capitalize">{t.replace(/-/g, " ")} data</p>
                <p className="text-sm mt-1">Live data from warehouse and sales modules</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
