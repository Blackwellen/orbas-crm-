"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search, Filter, ChevronRight, Plus, Download, ArrowLeft, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

const VAT_RETURNS = [
  { id: "vr-01", period: "Q1 2026", start: "01 Jan 2026", end: "31 Mar 2026", due: "07 May 2026", status: "Open",      box1: 44820.00, box4: 26399.50, box5: 18420.50 },
  { id: "vr-02", period: "Q4 2025", start: "01 Oct 2025", end: "31 Dec 2025", due: "07 Feb 2026", status: "Fulfilled", box1: 52100.00, box4: 29790.00, box5: 22310.00 },
  { id: "vr-03", period: "Q3 2025", start: "01 Jul 2025", end: "30 Sep 2025", due: "07 Nov 2025", status: "Fulfilled", box1: 48400.00, box4: 28524.60, box5: 19875.40 },
  { id: "vr-04", period: "Q2 2025", start: "01 Apr 2025", end: "30 Jun 2025", due: "07 Aug 2025", status: "Fulfilled", box1: 51200.00, box4: 29550.00, box5: 21650.00 },
  { id: "vr-05", period: "Q1 2025", start: "01 Jan 2025", end: "31 Mar 2025", due: "07 May 2025", status: "Fulfilled", box1: 43600.00, box4: 25609.20, box5: 17990.80 },
  { id: "vr-06", period: "Q4 2024", start: "01 Oct 2024", end: "31 Dec 2024", due: "07 Feb 2025", status: "Overdue",   box1: 40200.00, box4: 23859.80, box5: 16340.20 },
  { id: "vr-07", period: "Q3 2024", start: "01 Jul 2024", end: "30 Sep 2024", due: "07 Nov 2024", status: "Fulfilled", box1: 38900.00, box4: 22410.00, box5: 16490.00 },
  { id: "vr-08", period: "Q2 2024", start: "01 Apr 2024", end: "30 Jun 2024", due: "07 Aug 2024", status: "Fulfilled", box1: 37500.00, box4: 21780.50, box5: 15719.50 },
  { id: "vr-09", period: "Q1 2024", start: "01 Jan 2024", end: "31 Mar 2024", due: "07 May 2024", status: "Fulfilled", box1: 36100.00, box4: 20944.00, box5: 15156.00 },
  { id: "vr-10", period: "Q4 2023", start: "01 Oct 2023", end: "31 Dec 2023", due: "07 Feb 2024", status: "Fulfilled", box1: 34800.00, box4: 19942.00, box5: 14858.00 },
  { id: "vr-11", period: "Q3 2023", start: "01 Jul 2023", end: "30 Sep 2023", due: "07 Nov 2023", status: "Fulfilled", box1: 33200.00, box4: 18920.00, box5: 14280.00 },
  { id: "vr-12", period: "Q2 2023", start: "01 Apr 2023", end: "30 Jun 2023", due: "07 Aug 2023", status: "Fulfilled", box1: 31500.00, box4: 17885.00, box5: 13615.00 },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Fulfilled: { bg: "#dcfce7", color: "#16a34a" },
    Open:      { bg: "#fef9c3", color: "#ca8a04" },
    Overdue:   { bg: "#fee2e2", color: "#dc2626" },
  }
  const cfg = map[status] ?? { bg: "#f3f4f6", color: "#6b7280" }
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function VATReturnsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  const filtered = VAT_RETURNS.filter(r => {
    const matchSearch = r.period.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || r.status.toLowerCase() === statusFilter
    const matchYear = yearFilter === "all" || r.start.includes(yearFilter)
    return matchSearch && matchStatus && matchYear
  })

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3">
        <Link href="/app/accounting/mtd">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> MTD
          </Button>
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <h1 className="text-2xl font-bold tracking-tight">VAT Returns</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <Input
              placeholder="Search periods…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 w-52 text-sm"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-36 text-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-9 w-32 text-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <SelectValue placeholder="Tax Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-2" /> Export
          </Button>
          <Button size="sm" style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus size={14} className="mr-2" /> Submit Return
          </Button>
        </div>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                  {["Period", "Start Date", "End Date", "Due Date", "Status", "Box 1 (Output VAT)", "Box 4 (Input VAT)", "Box 5 (Net VAT)", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr
                    key={r.id}
                    onClick={() => router.push(`/app/accounting/mtd/vat-returns/${r.id}`)}
                    className="cursor-pointer transition-colors hover:bg-[var(--muted)]"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-4 py-3 font-semibold text-xs">{r.period}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.start}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.end}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.due}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-xs font-medium">{formatCurrency(r.box1)}</td>
                    <td className="px-4 py-3 text-xs font-medium">{formatCurrency(r.box4)}</td>
                    <td className="px-4 py-3 text-xs font-bold">{formatCurrency(r.box5)}</td>
                    <td className="px-4 py-3">
                      <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center" style={{ color: "var(--muted-foreground)" }}>
                <FileText size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No VAT returns found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        Showing {filtered.length} of {VAT_RETURNS.length} returns · All figures exclude VAT
      </p>
    </div>
  )
}
