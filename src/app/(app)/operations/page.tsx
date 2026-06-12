"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package2, AlertTriangle, FileCheck2, Ship, Boxes,
  Plus, ArrowUpDown, ArrowRightLeft, PackageCheck
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

const kpis = [
  { label: "Stock Value", value: "Â£847K", icon: Package2, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Low Stock Items", value: "23", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { label: "Open POs", value: "47", icon: FileCheck2, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Pending Shipments", value: "12", icon: Ship, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { label: "Total Assets", value: "156", icon: Boxes, color: "text-green-500", bg: "bg-green-500/10" },
]

const lowStockItems = [
  { item: "Titanium Bolts M8", warehouse: "WH-London", onHand: 45, reorderPoint: 100, status: "Critical" },
  { item: "PCB Assembly Rev3", warehouse: "WH-Manchester", onHand: 12, reorderPoint: 50, status: "Critical" },
  { item: "Hydraulic Seal Kit", warehouse: "WH-Birmingham", onHand: 78, reorderPoint: 100, status: "Low" },
  { item: "Carbon Fibre Sheet 2mm", warehouse: "WH-London", onHand: 3, reorderPoint: 20, status: "Critical" },
  { item: "Aluminium Extrusion 40x40", warehouse: "WH-Bristol", onHand: 156, reorderPoint: 200, status: "Low" },
  { item: "Servo Motor 24V", warehouse: "WH-Manchester", onHand: 8, reorderPoint: 25, status: "Critical" },
  { item: "Stainless Washers M6", warehouse: "WH-London", onHand: 320, reorderPoint: 400, status: "Low" },
  { item: "Pneumatic Cylinder 50mm", warehouse: "WH-Birmingham", onHand: 6, reorderPoint: 15, status: "Low" },
]

const recentPOs = [
  { po: "PO-2025-0847", supplier: "Fastener World Ltd", lines: 8, total: "Â£12,450", status: "Sent" },
  { po: "PO-2025-0846", supplier: "TechParts Direct", lines: 3, total: "Â£4,200", status: "Partial" },
  { po: "PO-2025-0845", supplier: "Global Steel Co", lines: 12, total: "Â£28,900", status: "Draft" },
  { po: "PO-2025-0844", supplier: "Hydraulic Supplies UK", lines: 5, total: "Â£7,640", status: "Received" },
  { po: "PO-2025-0843", supplier: "ElectroComponents", lines: 22, total: "Â£15,320", status: "Overdue" },
]

const stockByCategory = [
  { category: "Raw Materials", value: 312000 },
  { category: "Components", value: 228000 },
  { category: "Finished Goods", value: 187000 },
  { category: "WIP", value: 64000 },
  { category: "Packaging", value: 36000 },
  { category: "Consumables", value: 20000 },
]

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Critical: "bg-red-500/15 text-red-600 border-red-300",
    Low: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
    OK: "bg-green-500/15 text-green-600 border-green-300",
    Sent: "bg-blue-500/15 text-blue-600 border-blue-300",
    Partial: "bg-purple-500/15 text-purple-600 border-purple-300",
    Draft: "bg-gray-500/15 text-gray-600 border-gray-300",
    Received: "bg-green-500/15 text-green-600 border-green-300",
    Overdue: "bg-red-500/15 text-red-600 border-red-300",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

export default function OperationsOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Operations Overview</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Stock, procurement, and logistics at a glance</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" /> Adjust Stock
          </Button>
          <Button size="sm" className="gap-2 bg-[var(--primary)] text-white">
            <Plus className="h-4 w-4" /> New PO
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{k.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${k.bg}`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col */}
        <div className="lg:col-span-2 space-y-6">
          {/* Low Stock Alerts */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" /> Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                      <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">Item</th>
                      <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">Warehouse</th>
                      <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">On Hand</th>
                      <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">Reorder Pt</th>
                      <th className="text-center px-4 py-2 font-medium text-[var(--muted-foreground)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                        <td className="px-4 py-2.5 font-medium text-[var(--foreground)]">{row.item}</td>
                        <td className="px-4 py-2.5 text-[var(--muted-foreground)]">{row.warehouse}</td>
                        <td className="px-4 py-2.5 text-right text-[var(--foreground)]">{row.onHand}</td>
                        <td className="px-4 py-2.5 text-right text-[var(--muted-foreground)]">{row.reorderPoint}</td>
                        <td className="px-4 py-2.5 text-center">{statusBadge(row.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent POs */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                      <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">PO #</th>
                      <th className="text-left px-4 py-2 font-medium text-[var(--muted-foreground)]">Supplier</th>
                      <th className="text-center px-4 py-2 font-medium text-[var(--muted-foreground)]">Lines</th>
                      <th className="text-right px-4 py-2 font-medium text-[var(--muted-foreground)]">Total</th>
                      <th className="text-center px-4 py-2 font-medium text-[var(--muted-foreground)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPOs.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                        <td className="px-4 py-2.5 font-mono text-xs text-[var(--primary)] font-medium">{row.po}</td>
                        <td className="px-4 py-2.5 text-[var(--foreground)]">{row.supplier}</td>
                        <td className="px-4 py-2.5 text-center text-[var(--muted-foreground)]">{row.lines}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-[var(--foreground)]">{row.total}</td>
                        <td className="px-4 py-2.5 text-center">{statusBadge(row.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          {/* Stock by Category Chart */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Stock Value by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stockByCategory} layout="vertical" margin={{ left: 8, right: 16, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tickFormatter={v => `Â£${(v/1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} width={80} />
                  <Tooltip formatter={(v: any) => [`Â£${v.toLocaleString()}`, "Value"]} />
                  <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2 bg-[var(--primary)] text-white" size="sm">
                <Plus className="h-4 w-4" /> New Purchase Order
              </Button>
              <Button className="w-full justify-start gap-2" size="sm" variant="outline">
                <ArrowUpDown className="h-4 w-4" /> Adjust Stock
              </Button>
              <Button className="w-full justify-start gap-2" size="sm" variant="outline">
                <ArrowRightLeft className="h-4 w-4" /> Transfer Stock
              </Button>
              <Button className="w-full justify-start gap-2" size="sm" variant="outline">
                <PackageCheck className="h-4 w-4" /> Receive Goods
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

