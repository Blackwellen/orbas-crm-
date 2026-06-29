"use client"

import React, { useState } from "react"
import Link from "next/link"
import { use } from "react"
import {
  ChevronLeft, Edit, TrendingDown, Trash2, Printer, Download,
  Package, MapPin, Calendar, DollarSign, Wrench, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { cn } from "@/lib/utils"

const ASSETS: Record<string, {
  id: string
  name: string
  category: string
  serial: string
  purchaseDate: string
  cost: number
  salvageValue: number
  usefulLife: number
  method: string
  accDepreciation: number
  bookValue: number
  status: string
  location: string
  supplier: string
  invoiceRef: string
  insurance?: string
  description: string
  depSchedule: { period: string; openingBV: number; depreciation: number; closingBV: number }[]
  maintenanceLogs: { date: string; type: string; description: string; cost: number; by: string }[]
  documents: { name: string; size: string; date: string }[]
}> = {
  "ast-001": {
    id: "ast-001",
    name: "Dell PowerEdge R750 Server",
    category: "IT Equipment",
    serial: "DELL-R750-2024-0042",
    purchaseDate: "15 Jan 2024",
    cost: 18500,
    salvageValue: 1000,
    usefulLife: 5,
    method: "Straight Line",
    accDepreciation: 5550,
    bookValue: 12950,
    status: "Active",
    location: "Server Room, HQ — Rack 3B",
    supplier: "Dell Technologies UK",
    invoiceRef: "DELL-INV-2024-00234",
    insurance: "Business Assets Policy — Zurich (£50k limit)",
    description: "Primary production server handling main application workload. 2x Intel Xeon Gold, 256GB RAM, 8TB NVMe storage.",
    depSchedule: [
      { period: "Year 1 (2024)", openingBV: 18500, depreciation: 3500, closingBV: 15000 },
      { period: "Year 2 (2025)", openingBV: 15000, depreciation: 3500, closingBV: 11500 },
      { period: "Year 3 (2026)", openingBV: 11500, depreciation: 3500, closingBV: 8000 },
      { period: "Year 4 (2027)", openingBV: 8000, depreciation: 3500, closingBV: 4500 },
      { period: "Year 5 (2028)", openingBV: 4500, depreciation: 3500, closingBV: 1000 },
    ],
    maintenanceLogs: [
      { date: "10 Mar 2026", type: "Preventive", description: "Annual firmware update and hardware diagnostics", cost: 0, by: "James Harlow" },
      { date: "05 Oct 2025", type: "Corrective", description: "Replace failed HDD in RAID array (disk 4 of 8)", cost: 340, by: "Dell Support" },
      { date: "15 Jan 2025", type: "Preventive", description: "1-year service inspection — all OK", cost: 0, by: "James Harlow" },
    ],
    documents: [
      { name: "dell-purchase-invoice.pdf", size: "284 KB", date: "15 Jan 2024" },
      { name: "dell-warranty-certificate.pdf", size: "156 KB", date: "15 Jan 2024" },
      { name: "server-spec-sheet.pdf", size: "442 KB", date: "15 Jan 2024" },
    ],
  },
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`

const TABS = ["Overview", "Depreciation Schedule", "Maintenance Log", "Documents", "Disposal"] as const
type Tab = typeof TABS[number]

export default function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>("Overview")

  const asset = ASSETS[id] ?? ASSETS["ast-001"]

  const chartData = asset.depSchedule.map(r => ({
    period: r.period.replace(" (", "\n("),
    cost: asset.cost,
    bookValue: r.closingBV,
    depreciation: asset.cost - r.closingBV,
  }))

  const monthlyDep = ((asset.cost - asset.salvageValue) / asset.usefulLife / 12)

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/app/accounting/assets"><ChevronLeft className="h-4 w-4" /></Link>
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">Fixed Assets</span>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-sm font-medium text-[var(--foreground)]">{asset.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{asset.name}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#059669]/10 text-[#059669]">
              {asset.status}
            </span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm">{asset.category} · Serial: {asset.serial}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Purchased {asset.purchaseDate}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{asset.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-9 gap-1.5"><Edit className="h-4 w-4" />Edit</Button>
          <Button size="sm" variant="outline" className="h-9 gap-1.5"><TrendingDown className="h-4 w-4" />Record Depreciation</Button>
          <Button size="sm" variant="outline" className="h-9 gap-1.5 text-[#dc2626] border-[#dc2626]/30"><Trash2 className="h-4 w-4" />Dispose</Button>
          <Button size="sm" variant="outline" className="h-9 gap-1.5"><Printer className="h-4 w-4" />Print</Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Purchase Cost</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(asset.cost)}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Accumulated Depreciation</p>
          <p className="text-xl font-bold text-[#dc2626]">{fmt(asset.accDepreciation)}</p>
        </div>
        <div className="rounded-xl border border-[#059669]/20 bg-[#059669]/5 p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Net Book Value</p>
          <p className="text-xl font-bold text-[#059669]">{fmt(asset.bookValue)}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs text-[var(--muted-foreground)] mb-1">Monthly Depreciation</p>
          <p className="text-xl font-bold text-[var(--foreground)]">{fmt(monthlyDep)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]")}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Asset Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Asset Name", asset.name],
                ["Category", asset.category],
                ["Serial Number", asset.serial],
                ["Purchase Date", asset.purchaseDate],
                ["Purchase Cost", fmt(asset.cost)],
                ["Salvage Value", fmt(asset.salvageValue)],
                ["Useful Life", `${asset.usefulLife} years`],
                ["Depreciation Method", asset.method],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                  <span className="text-xs text-[var(--muted-foreground)]">{label}</span>
                  <span className="text-xs font-medium text-[var(--foreground)]">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Purchase & Insurance</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Supplier", asset.supplier],
                ["Invoice Reference", asset.invoiceRef],
                ["Location", asset.location],
                ["Insurance", asset.insurance ?? "Not specified"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between py-1.5 border-b border-[var(--border)] last:border-0 gap-4">
                  <span className="text-xs text-[var(--muted-foreground)] shrink-0">{label}</span>
                  <span className="text-xs font-medium text-[var(--foreground)] text-right">{value}</span>
                </div>
              ))}
              {asset.description && (
                <div className="pt-2">
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">Description</p>
                  <p className="text-xs text-[var(--foreground)]">{asset.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Depreciation Schedule Tab */}
      {activeTab === "Depreciation Schedule" && (
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Cost vs Book Value Over Time</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a56db" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="period" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: any) => [fmt(v)]} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="cost" name="Original Cost" stroke="#1a56db" strokeWidth={2} fill="url(#costGrad)" />
                  <Area type="monotone" dataKey="bookValue" name="Book Value" stroke="#059669" strokeWidth={2} fill="url(#bvGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Depreciation Schedule</CardTitle></CardHeader>
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
                {asset.depSchedule.map((row, idx) => (
                  <TableRow key={idx} className="hover:bg-[var(--muted)]/20">
                    <TableCell className="text-sm font-medium text-[var(--foreground)]">{row.period}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[var(--foreground)]">{fmt(row.openingBV)}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[#dc2626]">({fmt(row.depreciation)})</TableCell>
                    <TableCell className="text-right font-mono text-sm font-bold text-[var(--foreground)]">{fmt(row.closingBV)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* Maintenance Log Tab */}
      {activeTab === "Maintenance Log" && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Maintenance History</CardTitle>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                <Wrench className="h-3.5 w-3.5" />Log Maintenance
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Date</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Type</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Cost</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {asset.maintenanceLogs.map((log, idx) => (
                  <TableRow key={idx} className="hover:bg-[var(--muted)]/20">
                    <TableCell className="text-xs text-[var(--muted-foreground)]">{log.date}</TableCell>
                    <TableCell>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold",
                        log.type === "Corrective" ? "bg-[#dc2626]/10 text-[#dc2626]" : "bg-[var(--primary)]/10 text-[var(--primary)]")}>
                        {log.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-[var(--foreground)]">{log.description}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-[var(--foreground)]">{log.cost > 0 ? fmt(log.cost) : "—"}</TableCell>
                    <TableCell className="text-xs text-[var(--muted-foreground)]">{log.by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Documents Tab */}
      {activeTab === "Documents" && (
        <Card>
          <CardContent className="pt-5 space-y-2">
            {asset.documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/20">
                <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">{doc.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{doc.size} · {doc.date}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  <Download className="h-3.5 w-3.5" />Download
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Disposal Tab */}
      {activeTab === "Disposal" && (
        <Card className="border-[#dc2626]/20">
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <Trash2 className="h-10 w-10 text-[var(--muted-foreground)] mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">Asset Not Yet Disposed</p>
              <p className="text-xs text-[var(--muted-foreground)] mb-4 max-w-sm mx-auto">
                When this asset is disposed of, the disposal details including proceeds, gain/loss on disposal and journal entries will appear here.
              </p>
              <Button size="sm" variant="outline" className="gap-1.5 text-[#dc2626] border-[#dc2626]/30 hover:bg-[#dc2626]/5">
                <Trash2 className="h-4 w-4" />Record Disposal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
