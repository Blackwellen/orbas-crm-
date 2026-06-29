"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, ArrowUpDown, RefreshCw, LayoutList, LayoutGrid } from "lucide-react"

type StockStatus = "OK" | "Low" | "Critical" | "Out"

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  onHand: number
  reserved: number
  available: number
  warehouse: string
  reorderPoint: number
  status: StockStatus
  cost: number
}

const inventory: InventoryItem[] = [
  { id: "1", sku: "TBM8-001", name: "Titanium Bolts M8 x 30mm", category: "Fasteners", onHand: 45, reserved: 30, available: 15, warehouse: "WH-London", reorderPoint: 100, status: "Critical", cost: 0.85 },
  { id: "2", sku: "PCB-REV3", name: "PCB Assembly Revision 3", category: "Electronics", onHand: 12, reserved: 8, available: 4, warehouse: "WH-Manchester", reorderPoint: 50, status: "Critical", cost: 42.50 },
  { id: "3", sku: "HSK-5050", name: "Hydraulic Seal Kit 50mm", category: "Seals & Gaskets", onHand: 78, reserved: 20, available: 58, warehouse: "WH-Birmingham", reorderPoint: 100, status: "Low", cost: 18.90 },
  { id: "4", sku: "CFS-2MM", name: "Carbon Fibre Sheet 2mm", category: "Raw Materials", onHand: 3, reserved: 0, available: 3, warehouse: "WH-London", reorderPoint: 20, status: "Critical", cost: 125.00 },
  { id: "5", sku: "AEX-4040", name: "Aluminium Extrusion 40x40", category: "Raw Materials", onHand: 156, reserved: 40, available: 116, warehouse: "WH-Bristol", reorderPoint: 200, status: "Low", cost: 8.75 },
  { id: "6", sku: "SRV-24V", name: "Servo Motor 24V 10Nm", category: "Electronics", onHand: 8, reserved: 5, available: 3, warehouse: "WH-Manchester", reorderPoint: 25, status: "Critical", cost: 189.00 },
  { id: "7", sku: "SSW-M6", name: "Stainless Steel Washers M6", category: "Fasteners", onHand: 320, reserved: 80, available: 240, warehouse: "WH-London", reorderPoint: 400, status: "Low", cost: 0.12 },
  { id: "8", sku: "PNC-50MM", name: "Pneumatic Cylinder 50mm Stroke", category: "Pneumatics", onHand: 6, reserved: 2, available: 4, warehouse: "WH-Birmingham", reorderPoint: 15, status: "Low", cost: 67.40 },
  { id: "9", sku: "BRG-6204", name: "Ball Bearing 6204-2RS", category: "Bearings", onHand: 450, reserved: 100, available: 350, warehouse: "WH-London", reorderPoint: 300, status: "OK", cost: 3.20 },
  { id: "10", sku: "LED-WHT5", name: "LED Strip 5M White 24V", category: "Electronics", onHand: 0, reserved: 0, available: 0, warehouse: "WH-Manchester", reorderPoint: 10, status: "Out", cost: 22.50 },
  { id: "11", sku: "STE-PLT-5", name: "Steel Plate 5mm 1000x2000", category: "Raw Materials", onHand: 24, reserved: 6, available: 18, warehouse: "WH-Birmingham", reorderPoint: 20, status: "OK", cost: 78.00 },
  { id: "12", sku: "ORL-NBR70", name: "O-Ring NBR 70 Shore Kit", category: "Seals & Gaskets", onHand: 1200, reserved: 200, available: 1000, warehouse: "WH-London", reorderPoint: 500, status: "OK", cost: 0.08 },
  { id: "13", sku: "MHB-2050", name: "MDF Housing Box 200x500mm", category: "Packaging", onHand: 89, reserved: 30, available: 59, warehouse: "WH-Bristol", reorderPoint: 75, status: "OK", cost: 4.50 },
  { id: "14", sku: "CNC-TOOL-D6", name: "CNC End Mill D6 4-Flute", category: "Tooling", onHand: 15, reserved: 0, available: 15, warehouse: "WH-Manchester", reorderPoint: 20, status: "Low", cost: 28.90 },
  { id: "15", sku: "CAB-24AWG", name: "Cable 24AWG Stranded 100m", category: "Electrical", onHand: 42, reserved: 12, available: 30, warehouse: "WH-London", reorderPoint: 30, status: "OK", cost: 18.40 },
  { id: "16", sku: "SPRK-IGN", name: "Ignition Spark Module", category: "Electronics", onHand: 0, reserved: 5, available: -5, warehouse: "WH-Birmingham", reorderPoint: 10, status: "Out", cost: 54.00 },
  { id: "17", sku: "PLY-18MM", name: "Plywood Sheet 18mm 2440x1220", category: "Raw Materials", onHand: 67, reserved: 15, available: 52, warehouse: "WH-Bristol", reorderPoint: 40, status: "OK", cost: 32.00 },
  { id: "18", sku: "INK-UV-1L", name: "UV Ink Black 1 Litre", category: "Consumables", onHand: 8, reserved: 3, available: 5, warehouse: "WH-London", reorderPoint: 12, status: "Low", cost: 45.00 },
  { id: "19", sku: "FLT-HEPA-F7", name: "HEPA Filter F7 Panel", category: "Consumables", onHand: 22, reserved: 4, available: 18, warehouse: "WH-Manchester", reorderPoint: 15, status: "OK", cost: 14.50 },
  { id: "20", sku: "GLS-SAF-6", name: "Safety Glass 6mm Tempered", category: "Raw Materials", onHand: 18, reserved: 6, available: 12, warehouse: "WH-Birmingham", reorderPoint: 20, status: "Low", cost: 95.00 },
]

const statusConfig: Record<StockStatus, { label: string; className: string }> = {
  OK:       { label: "OK",       className: "bg-green-500/15 text-green-600 border-green-300" },
  Low:      { label: "Low",      className: "bg-yellow-500/15 text-yellow-600 border-yellow-300" },
  Critical: { label: "Critical", className: "bg-red-500/15 text-red-600 border-red-300" },
  Out:      { label: "Out",      className: "bg-gray-500/15 text-gray-600 border-gray-300" },
}

function StatusBadge({ status }: { status: StockStatus }) {
  const cfg = statusConfig[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

const categoryColors: Record<string, string> = {
  "Fasteners": "bg-blue-500/10 text-blue-700",
  "Electronics": "bg-purple-500/10 text-purple-700",
  "Seals & Gaskets": "bg-orange-500/10 text-orange-700",
  "Raw Materials": "bg-gray-500/10 text-gray-700",
  "Pneumatics": "bg-cyan-500/10 text-cyan-700",
  "Bearings": "bg-teal-500/10 text-teal-700",
  "Packaging": "bg-pink-500/10 text-pink-700",
  "Tooling": "bg-yellow-500/10 text-yellow-700",
  "Electrical": "bg-indigo-500/10 text-indigo-700",
  "Consumables": "bg-green-500/10 text-green-700",
}

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState<"table" | "cards">("table")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const categories = Array.from(new Set(inventory.map(i => i.category)))

  const filtered = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "all" || item.category === categoryFilter
    const matchStatus = statusFilter === "all" || item.status === statusFilter
    return matchSearch && matchCat && matchStatus
  })

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(i => i.id)))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Inventory</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{inventory.length} SKUs across all warehouses</p>
        </div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <>
              <Button size="sm" variant="outline" className="gap-1"><Download className="h-4 w-4" /> Export</Button>
              <Button size="sm" variant="outline" className="gap-1"><ArrowUpDown className="h-4 w-4" /> Adjust Stock</Button>
              <Button size="sm" variant="outline" className="gap-1"><RefreshCw className="h-4 w-4" /> Reorder Selected</Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search SKU or item name..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="OK">OK</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="Out">Out</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 ml-auto">
          <Button size="sm" variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")} className="gap-1">
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={view === "cards" ? "default" : "outline"} onClick={() => setView("cards")} className="gap-1">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "table" ? (
        <Card className="border border-[var(--border)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    <th className="px-4 py-3 w-8">
                      <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} />
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">SKU</th>
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Item Name</th>
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Category</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">On Hand</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Reserved</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Available</th>
                    <th className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">Warehouse</th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--muted-foreground)]">Reorder Pt</th>
                    <th className="text-center px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(item => (
                    <tr key={item.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                      <td className="px-4 py-3">
                        <Checkbox checked={selected.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/app/operations/inventory/${item.id}`} className="font-mono text-xs text-[var(--primary)] hover:underline">
                          {item.sku}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{item.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[item.category] ?? "bg-gray-100 text-gray-700"}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)] font-medium">{item.onHand.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{item.reserved.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${item.available <= 0 ? "text-red-500" : "text-[var(--foreground)]"}`}>
                        {item.available.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{item.warehouse}</td>
                      <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{item.reorderPoint}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(item => (
            <Link key={item.id} href={`/app/operations/inventory/${item.id}`}>
              <Card className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs text-[var(--primary)]">{item.sku}</p>
                      <p className="font-medium text-sm text-[var(--foreground)] mt-0.5 leading-tight">{item.name}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[item.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {item.category}
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[var(--muted)]/30 rounded p-2">
                      <p className="text-xs text-[var(--muted-foreground)]">On Hand</p>
                      <p className="font-bold text-sm text-[var(--foreground)]">{item.onHand}</p>
                    </div>
                    <div className="bg-[var(--muted)]/30 rounded p-2">
                      <p className="text-xs text-[var(--muted-foreground)]">Reserved</p>
                      <p className="font-bold text-sm text-[var(--foreground)]">{item.reserved}</p>
                    </div>
                    <div className="bg-[var(--muted)]/30 rounded p-2">
                      <p className="text-xs text-[var(--muted-foreground)]">Available</p>
                      <p className={`font-bold text-sm ${item.available <= 0 ? "text-red-500" : "text-green-600"}`}>{item.available}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.warehouse}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
