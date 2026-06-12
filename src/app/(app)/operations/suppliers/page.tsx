"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

const suppliers = [
  { id: "1", name: "Fastener World Ltd", category: "Fasteners", country: "United Kingdom", contact: "Tom Bradley", openPOs: 3, ytdSpend: "£48,200", lastOrder: "2025-06-08", status: "Active" },
  { id: "2", name: "TechParts Direct", category: "Electronics", country: "United Kingdom", contact: "Lisa Chen", openPOs: 2, ytdSpend: "£62,400", lastOrder: "2025-06-07", status: "Active" },
  { id: "3", name: "Global Steel Co", category: "Raw Materials", country: "Germany", contact: "Hans Müller", openPOs: 1, ytdSpend: "£124,000", lastOrder: "2025-06-06", status: "Active" },
  { id: "4", name: "Hydraulic Supplies UK", category: "Hydraulics", country: "United Kingdom", contact: "Dave Williams", openPOs: 0, ytdSpend: "£31,500", lastOrder: "2025-06-05", status: "Active" },
  { id: "5", name: "ElectroComponents", category: "Electronics", country: "Netherlands", contact: "Jan van Berg", openPOs: 2, ytdSpend: "£87,300", lastOrder: "2025-06-01", status: "Active" },
  { id: "6", name: "Aluminium Direct", category: "Raw Materials", country: "United Kingdom", contact: "Phil Carter", openPOs: 1, ytdSpend: "£45,800", lastOrder: "2025-05-30", status: "Active" },
  { id: "7", name: "Packaging Solutions Ltd", category: "Packaging", country: "United Kingdom", contact: "Angela Marsh", openPOs: 1, ytdSpend: "£18,200", lastOrder: "2025-05-28", status: "Active" },
  { id: "8", name: "CNC Tools Direct", category: "Tooling", country: "United Kingdom", contact: "Rob Evans", openPOs: 0, ytdSpend: "£29,600", lastOrder: "2025-05-20", status: "Active" },
  { id: "9", name: "Chemical Supplies Group", category: "Chemicals", country: "Belgium", contact: "Pierre Dubois", openPOs: 0, ytdSpend: "£22,100", lastOrder: "2025-05-25", status: "Active" },
  { id: "10", name: "Pneumatic Systems UK", category: "Pneumatics", country: "United Kingdom", contact: "Sue Hart", openPOs: 0, ytdSpend: "£35,400", lastOrder: "2025-05-12", status: "Active" },
  { id: "11", name: "Bearings Direct", category: "Bearings", country: "Sweden", contact: "Erik Lindqvist", openPOs: 0, ytdSpend: "£19,800", lastOrder: "2025-05-08", status: "Active" },
  { id: "12", name: "Sealco International", category: "Seals", country: "France", contact: "Marie Leclerc", openPOs: 0, ytdSpend: "£8,900", lastOrder: "2025-04-15", status: "Inactive" },
]

export default function SuppliersPage() {
  const [search, setSearch] = useState("")

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Suppliers</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{suppliers.length} suppliers</p>
        </div>
        <Button size="sm" className="gap-2 bg-[var(--primary)] text-white">
          <Plus className="h-4 w-4" /> New Supplier
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input placeholder="Search suppliers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                  {["Supplier","Category","Country","Primary Contact","Open POs","YTD Spend","Last Order","Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                    <td className="px-4 py-3">
                      <Link href={`/app/operations/suppliers/${s.id}`} className="font-medium text-[var(--primary)] hover:underline">{s.name}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">{s.category}</span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.country}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{s.contact}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${s.openPOs > 0 ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}>{s.openPOs}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{s.ytdSpend}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.lastOrder}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
                        s.status === "Active" ? "bg-green-500/15 text-green-600 border-green-300" : "bg-gray-500/15 text-gray-600 border-gray-300"
                      }`}>{s.status}</span>
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
