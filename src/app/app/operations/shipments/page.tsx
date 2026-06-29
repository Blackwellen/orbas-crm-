"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

const shipments = [
  { id: "1", tracking: "DHL-GB-2025-48921", carrier: "DHL Express", origin: "WH-London", destination: "Manchester Customer", status: "In Transit", created: "2025-06-08", eta: "2025-06-10" },
  { id: "2", tracking: "FEDEX-2025-384920", carrier: "FedEx International", origin: "WH-Birmingham", destination: "Berlin, Germany", status: "Pending", created: "2025-06-07", eta: "2025-06-12" },
  { id: "3", tracking: "ROYAL-2025-11847293", carrier: "Royal Mail Tracked 48", origin: "WH-Bristol", destination: "London Customer", status: "Delivered", created: "2025-06-05", eta: "2025-06-07" },
  { id: "4", tracking: "UPS-2025-18472938", carrier: "UPS Standard", origin: "WH-Manchester", destination: "Edinburgh Customer", status: "In Transit", created: "2025-06-06", eta: "2025-06-09" },
  { id: "5", tracking: "DHL-GB-2025-47832", carrier: "DHL Parcel UK", origin: "WH-London", destination: "Bristol Customer", status: "Delivered", created: "2025-06-04", eta: "2025-06-06" },
  { id: "6", tracking: "FEDEX-2025-372841", carrier: "FedEx International", origin: "WH-Birmingham", destination: "Paris, France", status: "Failed", created: "2025-06-03", eta: "2025-06-07" },
  { id: "7", tracking: "DPD-2025-28374912", carrier: "DPD Next Day", origin: "WH-Bristol", destination: "Cardiff Customer", status: "Delivered", created: "2025-06-03", eta: "2025-06-04" },
  { id: "8", tracking: "TNT-2025-193847201", carrier: "TNT Express", origin: "WH-London", destination: "Amsterdam, Netherlands", status: "In Transit", created: "2025-06-02", eta: "2025-06-11" },
  { id: "9", tracking: "ROYAL-2025-11829847", carrier: "Royal Mail Special Delivery", origin: "WH-Manchester", destination: "Liverpool Customer", status: "Delivered", created: "2025-06-01", eta: "2025-06-02" },
  { id: "10", tracking: "DHL-GB-2025-46921", carrier: "DHL Express", origin: "WH-Birmingham", destination: "Dublin, Ireland", status: "Pending", created: "2025-06-09", eta: "2025-06-13" },
]

const statusConfig: Record<string, string> = {
  Pending: "bg-gray-500/15 text-gray-600 border-gray-300",
  "In Transit": "bg-blue-500/15 text-blue-600 border-blue-300",
  Delivered: "bg-green-500/15 text-green-600 border-green-300",
  Failed: "bg-red-500/15 text-red-600 border-red-300",
}

export default function ShipmentsPage() {
  const [search, setSearch] = useState("")

  const filtered = shipments.filter(s =>
    s.tracking.toLowerCase().includes(search.toLowerCase()) ||
    s.carrier.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Shipments</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{shipments.length} shipments</p>
        </div>
        <Button size="sm" className="gap-2 bg-[var(--primary)] text-white">
          <Plus className="h-4 w-4" /> New Shipment
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input placeholder="Search tracking # or carrier..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="border border-[var(--border)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                  {["Tracking #","Carrier","Origin","Destination","Status","Created","ETA"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/20">
                    <td className="px-4 py-3">
                      <Link href={`/app/operations/shipments/${s.id}`} className="font-mono text-xs text-[var(--primary)] hover:underline font-medium">{s.tracking}</Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{s.carrier}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.origin}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{s.destination}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${statusConfig[s.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.created}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.eta}</td>
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
