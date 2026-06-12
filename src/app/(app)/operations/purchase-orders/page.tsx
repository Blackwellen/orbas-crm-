"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"

type POStatus = "Draft" | "Sent" | "Partial" | "Received" | "Cancelled" | "Overdue"

interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  orderDate: string
  expectedDate: string
  lines: number
  total: string
  status: POStatus
}

const purchaseOrders: PurchaseOrder[] = [
  { id: "1", poNumber: "PO-2025-0847", supplier: "Fastener World Ltd", orderDate: "2025-06-08", expectedDate: "2025-06-22", lines: 8, total: "£12,450.00", status: "Sent" },
  { id: "2", poNumber: "PO-2025-0846", supplier: "TechParts Direct", orderDate: "2025-06-07", expectedDate: "2025-06-21", lines: 3, total: "£4,200.00", status: "Partial" },
  { id: "3", poNumber: "PO-2025-0845", supplier: "Global Steel Co", orderDate: "2025-06-06", expectedDate: "2025-06-20", lines: 12, total: "£28,900.00", status: "Draft" },
  { id: "4", poNumber: "PO-2025-0844", supplier: "Hydraulic Supplies UK", orderDate: "2025-06-05", expectedDate: "2025-06-12", lines: 5, total: "£7,640.00", status: "Received" },
  { id: "5", poNumber: "PO-2025-0843", supplier: "ElectroComponents", orderDate: "2025-06-01", expectedDate: "2025-06-08", lines: 22, total: "£15,320.00", status: "Overdue" },
  { id: "6", poNumber: "PO-2025-0842", supplier: "Aluminium Direct", orderDate: "2025-05-30", expectedDate: "2025-06-13", lines: 4, total: "£9,850.00", status: "Sent" },
  { id: "7", poNumber: "PO-2025-0841", supplier: "Packaging Solutions Ltd", orderDate: "2025-05-28", expectedDate: "2025-06-11", lines: 7, total: "£3,420.00", status: "Partial" },
  { id: "8", poNumber: "PO-2025-0840", supplier: "Chemical Supplies Group", orderDate: "2025-05-25", expectedDate: "2025-06-08", lines: 9, total: "£6,780.00", status: "Received" },
  { id: "9", poNumber: "PO-2025-0839", supplier: "Fastener World Ltd", orderDate: "2025-05-22", expectedDate: "2025-06-05", lines: 6, total: "£5,240.00", status: "Received" },
  { id: "10", poNumber: "PO-2025-0838", supplier: "CNC Tools Direct", orderDate: "2025-05-20", expectedDate: "2025-05-30", lines: 11, total: "£18,900.00", status: "Received" },
  { id: "11", poNumber: "PO-2025-0837", supplier: "Global Steel Co", orderDate: "2025-05-18", expectedDate: "2025-05-28", lines: 3, total: "£22,100.00", status: "Cancelled" },
  { id: "12", poNumber: "PO-2025-0836", supplier: "TechParts Direct", orderDate: "2025-05-15", expectedDate: "2025-05-29", lines: 14, total: "£11,650.00", status: "Received" },
  { id: "13", poNumber: "PO-2025-0835", supplier: "Pneumatic Systems UK", orderDate: "2025-05-12", expectedDate: "2025-05-26", lines: 8, total: "£8,430.00", status: "Received" },
  { id: "14", poNumber: "PO-2025-0834", supplier: "ElectroComponents", orderDate: "2025-05-10", expectedDate: "2025-05-24", lines: 19, total: "£14,280.00", status: "Overdue" },
  { id: "15", poNumber: "PO-2025-0833", supplier: "Bearings Direct", orderDate: "2025-05-08", expectedDate: "2025-05-22", lines: 5, total: "£3,960.00", status: "Received" },
]

const statusConfig: Record<POStatus, string> = {
  Draft: "bg-gray-500/15 text-gray-600 border-gray-300",
  Sent: "bg-blue-500/15 text-blue-600 border-blue-300",
  Partial: "bg-purple-500/15 text-purple-600 border-purple-300",
  Received: "bg-green-500/15 text-green-600 border-green-300",
  Cancelled: "bg-red-500/15 text-red-600 border-red-300",
  Overdue: "bg-orange-500/15 text-orange-700 border-orange-300",
}

export default function PurchaseOrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = purchaseOrders.filter(po => {
    const matchSearch = po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      po.supplier.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || po.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Purchase Orders</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{purchaseOrders.length} purchase orders</p>
        </div>
        <Link href="/app/operations/purchase-orders/new">
          <Button size="sm" className="gap-2 bg-[var(--primary)] text-white">
            <Plus className="h-4 w-4" /> New Purchase Order
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search PO# or supplier..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusConfig).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                  <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">PO #</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Supplier</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Order Date</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Expected Date</th>
                  <th className="text-center px-4 py-3 font-medium text-[var(--muted-foreground)]">Lines</th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Total</th>
                  <th className="text-center px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(po => (
                  <tr key={po.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                    <td className="px-4 py-3">
                      <Link href={`/app/operations/purchase-orders/${po.id}`} className="font-mono text-xs text-[var(--primary)] hover:underline font-medium">
                        {po.poNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{po.supplier}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{po.orderDate}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{po.expectedDate}</td>
                    <td className="px-4 py-3 text-center text-[var(--foreground)]">{po.lines}</td>
                    <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{po.total}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${statusConfig[po.status]}`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
