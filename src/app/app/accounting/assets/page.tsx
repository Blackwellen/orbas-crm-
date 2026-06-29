"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Search, Filter, Download, MoreHorizontal, Eye,
  Edit, Trash2, Package, TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type AssetStatus = "Active" | "Disposed" | "Under Maintenance"

interface Asset {
  id: string
  name: string
  category: string
  purchaseDate: string
  cost: number
  accDepreciation: number
  bookValue: number
  status: AssetStatus
  location: string
  method: string
  usefulLife: number
}

const ASSETS: Asset[] = [
  { id: "ast-001", name: "Dell PowerEdge R750 Server", category: "IT Equipment", purchaseDate: "15 Jan 2024", cost: 18500, accDepreciation: 5550, bookValue: 12950, status: "Active", location: "Server Room, HQ", method: "Straight Line", usefulLife: 5 },
  { id: "ast-002", name: "Canary Wharf Office Fit-out", category: "Buildings", purchaseDate: "01 Apr 2023", cost: 85000, accDepreciation: 10200, bookValue: 74800, status: "Active", location: "Floor 12, Canary Wharf", method: "Straight Line", usefulLife: 25 },
  { id: "ast-003", name: "Ford Transit Van — YR73 ABC", category: "Vehicles", purchaseDate: "20 Mar 2022", cost: 28000, accDepreciation: 16800, bookValue: 11200, status: "Active", location: "Operations Depot", method: "Declining Balance", usefulLife: 5 },
  { id: "ast-004", name: "MacBook Pro Fleet (x12)", category: "IT Equipment", purchaseDate: "10 Sep 2023", cost: 24000, accDepreciation: 9600, bookValue: 14400, status: "Active", location: "Various — Staff", method: "Straight Line", usefulLife: 3 },
  { id: "ast-005", name: "Office Furniture Package", category: "Furniture", purchaseDate: "01 Apr 2023", cost: 12400, accDepreciation: 3720, bookValue: 8680, status: "Active", location: "HQ Open Plan", method: "Straight Line", usefulLife: 10 },
  { id: "ast-006", name: "Cisco Network Infrastructure", category: "IT Equipment", purchaseDate: "05 Jul 2021", cost: 14200, accDepreciation: 14200, bookValue: 0, status: "Active", location: "Server Room, HQ", method: "Straight Line", usefulLife: 5 },
  { id: "ast-007", name: "BMW 5 Series — EK22 XZP", category: "Vehicles", purchaseDate: "01 Feb 2022", cost: 42000, accDepreciation: 38000, bookValue: 4000, status: "Under Maintenance", location: "Car Park Level B", method: "Declining Balance", usefulLife: 5 },
  { id: "ast-008", name: "CNC Milling Machine", category: "Machinery", purchaseDate: "12 Nov 2020", cost: 56000, accDepreciation: 33600, bookValue: 22400, status: "Active", location: "Production Floor, Unit 4", method: "Straight Line", usefulLife: 10 },
  { id: "ast-009", name: "Sony Broadcast Camera Kit", category: "IT Equipment", purchaseDate: "28 Jun 2019", cost: 8900, accDepreciation: 8900, bookValue: 0, status: "Disposed", location: "Disposed — Jun 2024", method: "Straight Line", usefulLife: 5 },
  { id: "ast-010", name: "Warehouse Racking System", category: "Machinery", purchaseDate: "03 Aug 2022", cost: 9800, accDepreciation: 2940, bookValue: 6860, status: "Active", location: "Warehouse, Unit 4", method: "Straight Line", usefulLife: 10 },
  { id: "ast-011", name: "HP LaserJet Enterprise Fleet (x4)", category: "IT Equipment", purchaseDate: "15 Oct 2023", cost: 3600, accDepreciation: 1440, bookValue: 2160, status: "Active", location: "HQ Print Room", method: "Straight Line", usefulLife: 3 },
  { id: "ast-012", name: "Commercial Coffee Machine", category: "Furniture", purchaseDate: "01 Apr 2023", cost: 2800, accDepreciation: 840, bookValue: 1960, status: "Active", location: "HQ Kitchen", method: "Straight Line", usefulLife: 10 },
]

const STATUS_CONFIG: Record<AssetStatus, { label: string; className: string }> = {
  Active:             { label: "Active",           className: "bg-[#059669]/10 text-[#059669]" },
  Disposed:           { label: "Disposed",         className: "bg-[var(--muted)] text-[var(--muted-foreground)]" },
  "Under Maintenance":{ label: "Under Maintenance",className: "bg-[#d97706]/10 text-[#d97706]" },
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

const TABS = ["All Assets", "Depreciating", "Fully Depreciated", "Disposed"] as const
type Tab = typeof TABS[number]

export default function AssetsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState<Tab>("All Assets")

  const tabFiltered = ASSETS.filter(a => {
    if (activeTab === "Depreciating") return a.bookValue > 0 && a.status === "Active"
    if (activeTab === "Fully Depreciated") return a.bookValue === 0
    if (activeTab === "Disposed") return a.status === "Disposed"
    return true
  })

  const filtered = tabFiltered.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "all" || a.category === categoryFilter
    const matchStatus = statusFilter === "all" || a.status === statusFilter
    return matchSearch && matchCat && matchStatus
  })

  const totalCost = ASSETS.reduce((s, a) => s + a.cost, 0)
  const totalDepreciation = ASSETS.reduce((s, a) => s + a.accDepreciation, 0)
  const totalBookValue = ASSETS.reduce((s, a) => s + a.bookValue, 0)
  const totalAssets = ASSETS.length

  const categories = Array.from(new Set(ASSETS.map(a => a.category)))

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Fixed Assets</h1>
            <p className="text-sm text-[var(--muted-foreground)]">{totalAssets} assets · Net book value {fmt(totalBookValue)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Download className="h-3.5 w-3.5" />Export
          </Button>
          <Button size="sm" className="h-9 gap-1.5 orbas-gradient text-white hover:opacity-90" asChild>
            <Link href="/app/accounting/assets/new">
              <Plus className="h-4 w-4" />Add Asset
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-[var(--foreground)]">{totalAssets}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Across {categories.length} categories</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Cost</p>
          <p className="text-2xl font-bold text-[var(--foreground)]">{fmt(totalCost)}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Purchase value</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Depreciation</p>
          <p className="text-2xl font-bold text-[#dc2626]">{fmt(totalDepreciation)}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{((totalDepreciation / totalCost) * 100).toFixed(1)}% of cost</p>
        </div>
        <div className="rounded-xl border border-[#059669]/20 bg-[#059669]/5 p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Net Book Value</p>
          <p className="text-2xl font-bold text-[#059669]">{fmt(totalBookValue)}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{((totalBookValue / totalCost) * 100).toFixed(1)}% of cost</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search assets…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
            <SelectItem value="Disposed">Disposed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-3.5 w-3.5" />More Filters
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Asset Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Category</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Purchase Date</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Cost</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Acc. Depreciation</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-28">Book Value</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Location</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(asset => {
              const sc = STATUS_CONFIG[asset.status]
              const depPct = asset.cost > 0 ? (asset.accDepreciation / asset.cost) * 100 : 0
              return (
                <TableRow key={asset.id} className="hover:bg-[var(--muted)]/30">
                  <TableCell>
                    <Link href={`/app/accounting/assets/${asset.id}`} className="font-medium text-sm text-[var(--foreground)] hover:text-[var(--primary)] hover:underline">
                      {asset.name}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[var(--muted-foreground)]">{asset.method} · {asset.usefulLife}yr life</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium">{asset.category}</span>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--muted-foreground)]">{asset.purchaseDate}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium text-[var(--foreground)]">{fmt(asset.cost)}</TableCell>
                  <TableCell className="text-right">
                    <div className="font-mono text-sm font-medium text-[#dc2626]">{fmt(asset.accDepreciation)}</div>
                    <div className="flex justify-end mt-0.5">
                      <div className="w-16 h-1 rounded-full bg-[var(--muted)]">
                        <div className="h-1 rounded-full bg-[#dc2626]" style={{ width: `${depPct}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold" style={{ color: asset.bookValue === 0 ? "var(--muted-foreground)" : "#059669" }}>
                    {fmt(asset.bookValue)}
                  </TableCell>
                  <TableCell>
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold", sc.className)}>
                      {sc.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--muted-foreground)] max-w-xs truncate">{asset.location}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                          <Link href={`/app/accounting/assets/${asset.id}`} className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-3.5 w-3.5" />Edit Asset
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <TrendingDown className="h-3.5 w-3.5" />Record Depreciation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-[#dc2626]">
                          <Trash2 className="h-3.5 w-3.5" />Dispose Asset
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
