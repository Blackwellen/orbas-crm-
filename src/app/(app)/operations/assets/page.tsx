"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

const assets = [
  { id: "1", assetNo: "AST-001", name: "CNC Machining Centre Doosan DNM 4500", category: "Production Equipment", assignedTo: "WH-Birmingham", location: "Bay 3", purchaseDate: "2022-03-15", currentValue: "£124,000", status: "Active" },
  { id: "2", assetNo: "AST-002", name: "Forklift Toyota 8FBMT25", category: "Material Handling", assignedTo: "WH-London", location: "Dock A", purchaseDate: "2021-07-20", currentValue: "£18,500", status: "Active" },
  { id: "3", assetNo: "AST-003", name: "Hydraulic Press 100T Greenerd", category: "Production Equipment", assignedTo: "WH-Manchester", location: "Bay 1", purchaseDate: "2020-11-01", currentValue: "£42,000", status: "Maintenance" },
  { id: "4", assetNo: "AST-004", name: "Delivery Van Mercedes Sprinter", category: "Vehicles", assignedTo: "Logistics", location: "Car Park", purchaseDate: "2023-01-10", currentValue: "£22,400", status: "Active" },
  { id: "5", assetNo: "AST-005", name: "Laser Cutter Trumpf TruLaser 3030", category: "Production Equipment", assignedTo: "WH-Birmingham", location: "Bay 4", purchaseDate: "2023-06-01", currentValue: "£185,000", status: "Active" },
  { id: "6", assetNo: "AST-006", name: "Pallet Racking System Heavy Duty", category: "Storage", assignedTo: "WH-London", location: "Mezzanine", purchaseDate: "2019-04-15", currentValue: "£8,200", status: "Active" },
  { id: "7", assetNo: "AST-007", name: "Air Compressor Atlas Copco GA30", category: "Utilities", assignedTo: "WH-Bristol", location: "Plant Room", purchaseDate: "2021-09-22", currentValue: "£5,600", status: "Active" },
  { id: "8", assetNo: "AST-008", name: "Dell Server PowerEdge R740", category: "IT Equipment", assignedTo: "HQ IT", location: "Server Room", purchaseDate: "2022-11-01", currentValue: "£6,800", status: "Active" },
  { id: "9", assetNo: "AST-009", name: "Overhead Crane 5T Demag", category: "Material Handling", assignedTo: "WH-Manchester", location: "Bay 2", purchaseDate: "2018-05-10", currentValue: "£28,000", status: "Active" },
  { id: "10", assetNo: "AST-010", name: "3D Printer Stratasys F370", category: "Production Equipment", assignedTo: "Engineering", location: "Design Lab", purchaseDate: "2024-02-14", currentValue: "£32,500", status: "Active" },
  { id: "11", assetNo: "AST-011", name: "Welding Robot FANUC ARC Mate", category: "Production Equipment", assignedTo: "WH-Birmingham", location: "Bay 5", purchaseDate: "2020-08-01", currentValue: "£67,000", status: "Active" },
  { id: "12", assetNo: "AST-012", name: "Milling Machine Haas VF-2", category: "Production Equipment", assignedTo: "WH-Manchester", location: "Bay 1", purchaseDate: "2019-12-01", currentValue: "£38,000", status: "Maintenance" },
  { id: "13", assetNo: "AST-013", name: "Ford Transit Custom Van", category: "Vehicles", assignedTo: "Field Service", location: "Yard", purchaseDate: "2022-08-15", currentValue: "£14,200", status: "Active" },
  { id: "14", assetNo: "AST-014", name: "Scanning CMM Zeiss Contura", category: "Quality Equipment", assignedTo: "Quality Lab", location: "QC Bay", purchaseDate: "2023-09-01", currentValue: "£89,000", status: "Active" },
  { id: "15", assetNo: "AST-015", name: "Shredder Industrial Bramidan B320", category: "Utilities", assignedTo: "WH-London", location: "Waste Area", purchaseDate: "2017-06-20", currentValue: "£2,100", status: "Retired" },
]

const statusConfig: Record<string, string> = {
  Active: "bg-green-500/15 text-green-600 border-green-300",
  Maintenance: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
  Retired: "bg-gray-500/15 text-gray-600 border-gray-300",
  Disposed: "bg-red-500/15 text-red-600 border-red-300",
}

export default function AssetsPage() {
  const [search, setSearch] = useState("")

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.assetNo.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Assets Register</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{assets.length} assets tracked</p>
        </div>
        <Button size="sm" className="gap-2 bg-[var(--primary)] text-white">
          <Plus className="h-4 w-4" /> New Asset
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input placeholder="Search assets..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                  {["Asset #","Name","Category","Assigned To","Location","Purchase Date","Current Value","Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                    <td className="px-4 py-3">
                      <Link href={`/app/operations/assets/${a.id}`} className="font-mono text-xs text-[var(--primary)] hover:underline font-medium">{a.assetNo}</Link>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)] max-w-xs truncate">{a.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">{a.category}</span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.assignedTo}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.location}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.purchaseDate}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{a.currentValue}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${statusConfig[a.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {a.status}
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
