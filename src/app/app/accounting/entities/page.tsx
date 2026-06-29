"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus, Building2, Eye, Pencil, LayoutGrid, List,
  TrendingUp, TrendingDown, CheckCircle2, XCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

const ENTITIES = [
  {
    id: "ent-01",
    name: "Orbas Technologies Ltd",
    type: "Limited Company",
    companyNo: "13849201",
    vatNo: "GB 392 8471 22",
    status: "Active",
    currency: "GBP",
    revenue: 2840000,
    expenses: 1920000,
    lastClosed: "31 Mar 2026",
    country: "United Kingdom",
    incorporated: "12 Jan 2021",
  },
  {
    id: "ent-02",
    name: "Orbas Consulting LLP",
    type: "Partnership",
    companyNo: "OC418823",
    vatNo: "GB 407 2219 88",
    status: "Active",
    currency: "GBP",
    revenue: 980000,
    expenses: 640000,
    lastClosed: "31 Mar 2026",
    country: "United Kingdom",
    incorporated: "03 Sep 2019",
  },
  {
    id: "ent-03",
    name: "Orbas US Inc.",
    type: "Corporation",
    companyNo: "EIN 85-3291044",
    vatNo: "N/A",
    status: "Active",
    currency: "USD",
    revenue: 1450000,
    expenses: 990000,
    lastClosed: "31 Dec 2025",
    country: "United States",
    incorporated: "17 Mar 2022",
  },
  {
    id: "ent-04",
    name: "Orbas DACH GmbH",
    type: "GmbH",
    companyNo: "HRB 229441",
    vatNo: "DE 312 449 821",
    status: "Active",
    currency: "EUR",
    revenue: 720000,
    expenses: 510000,
    lastClosed: "31 Dec 2025",
    country: "Germany",
    incorporated: "28 Jun 2022",
  },
  {
    id: "ent-05",
    name: "Orbas Legacy Systems Ltd",
    type: "Limited Company",
    companyNo: "08841122",
    vatNo: "GB 189 4401 10",
    status: "Inactive",
    currency: "GBP",
    revenue: 0,
    expenses: 12400,
    lastClosed: "31 Mar 2024",
    country: "United Kingdom",
    incorporated: "22 Nov 2014",
  },
  {
    id: "ent-06",
    name: "Thomas & Associates",
    type: "Sole Trader",
    companyNo: "N/A",
    vatNo: "GB 441 0921 77",
    status: "Active",
    currency: "GBP",
    revenue: 340000,
    expenses: 218000,
    lastClosed: "05 Apr 2026",
    country: "United Kingdom",
    incorporated: "01 Apr 2018",
  },
]

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  "Limited Company": { bg: "#eff6ff", color: "#1d4ed8" },
  "Partnership":     { bg: "#faf5ff", color: "#7c3aed" },
  "Corporation":     { bg: "#fff7ed", color: "#c2410c" },
  "GmbH":            { bg: "#f0fdf4", color: "#15803d" },
  "Sole Trader":     { bg: "#fefce8", color: "#a16207" },
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Active") return (
    <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>Active</span>
  )
  return (
    <span style={{ backgroundColor: "#f3f4f6", color: "#6b7280", padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>Inactive</span>
  )
}

function TypeBadge({ type }: { type: string }) {
  const cfg = TYPE_COLORS[type] ?? { bg: "#f3f4f6", color: "#6b7280" }
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600 }}>{type}</span>
  )
}

export default function EntitiesPage() {
  const [consolidated, setConsolidated] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const totalRevenue = ENTITIES.filter(e => e.status === "Active" && e.currency === "GBP").reduce((s, e) => s + e.revenue, 0)
  const totalExpenses = ENTITIES.filter(e => e.status === "Active" && e.currency === "GBP").reduce((s, e) => s + e.expenses, 0)

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Entities</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Manage multiple legal entities — each with its own chart of accounts, VAT registration, and financials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConsolidated(c => !c)}
            style={{ background: consolidated ? "var(--primary)" : undefined, color: consolidated ? "#fff" : undefined }}
          >
            <LayoutGrid size={14} className="mr-2" />
            {consolidated ? "Consolidated View ON" : "Consolidated View"}
          </Button>
          <Button onClick={() => setAddOpen(true)} style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus size={14} className="mr-2" /> Add Entity
          </Button>
        </div>
      </div>

      {consolidated && (
        <Card style={{ background: "rgba(26,86,219,0.04)", border: "1px solid rgba(26,86,219,0.2)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Consolidated Summary (GBP entities only)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Revenue",  value: totalRevenue,               icon: TrendingUp },
                { label: "Total Expenses", value: totalExpenses,              icon: TrendingDown },
                { label: "Net Profit",     value: totalRevenue - totalExpenses, icon: TrendingUp },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                  <p className="text-xl font-bold mt-0.5">{formatCurrency(s.value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ENTITIES.map(e => {
          const gp = e.revenue - e.expenses
          return (
            <Card key={e.id} style={{ background: "var(--card)", border: "1px solid var(--border)" }} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: "var(--primary)", color: "#fff" }}>
                      {e.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">{e.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{e.country}</p>
                    </div>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  <TypeBadge type={e.type} />
                </div>
                <div className="space-y-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <div className="flex justify-between">
                    <span>Company No.</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{e.companyNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT Number</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{e.vatNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Currency</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{e.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Closed</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{e.lastClosed}</span>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Revenue</p>
                      <p className="text-xs font-bold mt-0.5">{formatCurrency(e.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Expenses</p>
                      <p className="text-xs font-bold mt-0.5">{formatCurrency(e.expenses)}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Net</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: gp >= 0 ? "#16a34a" : "#dc2626" }}>{formatCurrency(gp)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link href={`/app/accounting/entities/${e.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Eye size={13} /> View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Pencil size={13} /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 520 }}>
          <DialogHeader>
            <DialogTitle>Add Entity</DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              Create a new legal entity. It will have its own chart of accounts and financial records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {[
              { label: "Legal Name", placeholder: "e.g. Orbas Holdings Ltd" },
              { label: "Company Number", placeholder: "e.g. 12345678" },
              { label: "VAT Number", placeholder: "e.g. GB 123 4567 89" },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-sm font-medium">{f.label}</label>
                <Input placeholder={f.placeholder} style={{ background: "var(--muted)", border: "1px solid var(--border)" }} />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-sm font-medium">Entity Type</label>
              <Select>
                <SelectTrigger style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ltd">Limited Company</SelectItem>
                  <SelectItem value="llp">LLP / Partnership</SelectItem>
                  <SelectItem value="sole">Sole Trader</SelectItem>
                  <SelectItem value="corp">Corporation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)} style={{ background: "var(--primary)", color: "#fff" }}>
              Create Entity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
