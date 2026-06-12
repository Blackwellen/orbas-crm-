"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, MapPin, Package2, ArrowUpDown } from "lucide-react"

const WAREHOUSE = {
  id: "wh1",
  name: "WH-London-01",
  location: "Park Royal Industrial Estate, London, NW10 7UH",
  type: "Distribution",
  capacity: 15000,
  used: 11400,
  zones: 8,
  staff: 24,
  manager: "Tom Harris",
  managerInitials: "TH",
  status: "Active",
  phone: "+44 20 8961 4400",
  email: "wh-london@orbas.io",
}

const STOCK = [
  { sku: "TBM8-001", name: "Titanium Bolts M8",        zone: "A-01", qty: 2400, unit: "pcs", reserved: 800 },
  { sku: "BRG-6204", name: "Ball Bearing 6204-2RS",    zone: "A-03", qty: 8200, unit: "pcs", reserved: 1200 },
  { sku: "SSW-M6",   name: "Stainless Washers M6",     zone: "A-05", qty: 6400, unit: "pcs", reserved: 1600 },
  { sku: "CAB-24AWG",name: "Cable 24AWG 100m",          zone: "B-02", qty: 420,  unit: "rolls",reserved: 120 },
  { sku: "ORL-NBR70",name: "O-Ring NBR Kit",            zone: "B-04", qty: 12000,unit: "pcs", reserved: 3000 },
  { sku: "CFS-2MM",  name: "Carbon Fibre Sheet 2mm",   zone: "C-01", qty: 180,  unit: "sheets",reserved: 60 },
  { sku: "INK-UV-1L",name: "UV Ink Black 1L",           zone: "C-03", qty: 84,   unit: "bottles",reserved: 24},
  { sku: "LED-WHT5", name: "LED Strip 5M White 24V",   zone: "D-01", qty: 320,  unit: "pcs", reserved: 40  },
  { sku: "STE-PLT-5",name: "Steel Plate 5mm",           zone: "D-02", qty: 240,  unit: "sheets",reserved: 60 },
  { sku: "PLY-18MM", name: "Plywood Sheet 18mm",        zone: "E-01", qty: 670,  unit: "sheets",reserved: 150 },
]

const ZONES = [
  { id: "z1", name: "Zone A", purpose: "Pick", capacity: 3000, used: 2800, locations: 120, aisles: 4 },
  { id: "z2", name: "Zone B", purpose: "Store", capacity: 4000, used: 3200, locations: 160, aisles: 5 },
  { id: "z3", name: "Zone C", purpose: "Store", capacity: 2500, used: 1900, locations: 100, aisles: 3 },
  { id: "z4", name: "Zone D", purpose: "Staging", capacity: 1500, used: 800, locations: 60, aisles: 2 },
  { id: "z5", name: "Zone E", purpose: "Cold", capacity: 2000, used: 1600, locations: 80, aisles: 2 },
  { id: "z6", name: "Zone F", purpose: "Pick", capacity: 800, used: 600, locations: 32, aisles: 1 },
  { id: "z7", name: "Zone G", purpose: "Dispatch", capacity: 700, used: 300, locations: 28, aisles: 1 },
  { id: "z8", name: "Zone H", purpose: "Returns", capacity: 500, used: 200, locations: 20, aisles: 1 },
]

const MOVEMENTS = [
  { id: "mv1", date: "2025-07-07", type: "IN",  sku: "BRG-6204", qty: 1200, source: "PO-4821 from SKF Ltd",          operator: "J.Brown" },
  { id: "mv2", date: "2025-07-07", type: "OUT", sku: "TBM8-001", qty: 500,  source: "Sales Order SO-9012",           operator: "A.Smith" },
  { id: "mv3", date: "2025-07-06", type: "IN",  sku: "ORL-NBR70",qty: 5000, source: "PO-4819 from Parker Seals",     operator: "J.Brown" },
  { id: "mv4", date: "2025-07-06", type: "OUT", sku: "CAB-24AWG",qty: 80,   source: "Sales Order SO-9008",           operator: "T.Harris" },
  { id: "mv5", date: "2025-07-05", type: "IN",  sku: "PLY-18MM", qty: 200,  source: "PO-4810 from Timber Direct",    operator: "A.Smith" },
  { id: "mv6", date: "2025-07-05", type: "XFER",sku: "CFS-2MM",  qty: 30,   source: "Transfer to WH-Birmingham-01", operator: "T.Harris" },
  { id: "mv7", date: "2025-07-04", type: "OUT", sku: "STE-PLT-5",qty: 60,   source: "Sales Order SO-9001",           operator: "J.Brown" },
  { id: "mv8", date: "2025-07-04", type: "IN",  sku: "LED-WHT5", qty: 100,  source: "PO-4807 from LEDWorld",         operator: "A.Smith" },
]

const ZONE_PURPOSE_COLOR: Record<string, { bg: string; color: string }> = {
  Pick:     { bg: "rgba(26,86,219,0.12)",  color: "var(--primary)" },
  Store:    { bg: "rgba(107,114,128,0.12)", color: "#6b7280" },
  Staging:  { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
  Cold:     { bg: "rgba(6,182,212,0.12)",   color: "#0891b2" },
  Dispatch: { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  Returns:  { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
}

const MOVEMENT_TYPE_COLOR: Record<string, { bg: string; color: string }> = {
  IN:   { bg: "rgba(34,197,94,0.12)",  color: "#16a34a" },
  OUT:  { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
  XFER: { bg: "rgba(245,158,11,0.12)", color: "#d97706" },
}

const TABS = ["Overview","Stock","Zones","Movements","Settings"] as const
type Tab = typeof TABS[number]

export default function WarehouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [tab, setTab] = useState<Tab>("Overview")
  const usedPct = Math.round((WAREHOUSE.used / WAREHOUSE.capacity) * 100)

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top bar */}
      <div className="border-b px-6 py-4 flex items-center gap-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/app/operations/warehouses">
          <Button size="sm" variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Warehouses
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        <h1 className="font-semibold" style={{ color: "var(--foreground)" }}>{WAREHOUSE.name}</h1>
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", borderColor: "rgba(34,197,94,0.3)" }}>
          {WAREHOUSE.status}
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b px-6 flex gap-1" style={{ borderColor: "var(--border)" }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: tab === t ? "var(--primary)" : "transparent",
              color: tab === t ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6">
        {tab === "Overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Location</p>
                      <div className="flex items-start gap-1 mt-0.5">
                        <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                        <p className="font-medium" style={{ color: "var(--foreground)" }}>{WAREHOUSE.location}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Manager</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)" }}>
                          {WAREHOUSE.managerInitials}
                        </div>
                        <p className="font-medium" style={{ color: "var(--foreground)" }}>{WAREHOUSE.manager}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Type</p>
                      <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WAREHOUSE.type}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Staff Count</p>
                      <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WAREHOUSE.staff} staff</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Phone</p>
                      <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WAREHOUSE.phone}</p>
                    </div>
                    <div>
                      <p style={{ color: "var(--muted-foreground)" }}>Email</p>
                      <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{WAREHOUSE.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border" style={{ borderColor: "var(--border)" }}>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Capacity Utilization</p>
                    <p className="text-3xl font-bold" style={{ color: usedPct >= 90 ? "#ef4444" : usedPct >= 75 ? "#f59e0b" : "#22c55e" }}>{usedPct}%</p>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{
                        width: `${usedPct}%`,
                        background: usedPct >= 90 ? "#ef4444" : usedPct >= 75 ? "#f59e0b" : "#22c55e",
                      }} />
                    </div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {WAREHOUSE.used.toLocaleString()} / {WAREHOUSE.capacity.toLocaleString()} sqm
                    </p>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Zones", value: WAREHOUSE.zones },
                    { label: "Staff", value: WAREHOUSE.staff },
                  ].map(k => (
                    <Card key={k.label} className="border" style={{ borderColor: "var(--border)" }}>
                      <CardContent className="p-3">
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k.label}</p>
                        <p className="text-xl font-bold mt-0.5" style={{ color: "var(--foreground)" }}>{k.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Stock" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Stock in {WAREHOUSE.name}</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["SKU","Item Name","Zone","On Hand","Unit","Reserved","Available"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STOCK.map(s => (
                      <tr key={s.sku} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{s.sku}</td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{s.name}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>{s.zone}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{s.qty.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{s.unit}</td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{s.reserved.toLocaleString()}</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "#22c55e" }}>{(s.qty - s.reserved).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Zones" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Warehouse Zones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ZONES.map(z => {
                const pct = Math.round((z.used / z.capacity) * 100)
                const pc = ZONE_PURPOSE_COLOR[z.purpose] ?? { bg: "var(--muted)", color: "var(--muted-foreground)" }
                return (
                  <Card key={z.id} className="border" style={{ borderColor: "var(--border)" }}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>{z.name}</h3>
                        <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: pc.bg, color: pc.color }}>{z.purpose}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: "var(--muted-foreground)" }}>Utilization</span>
                          <span className="font-medium" style={{ color: pct >= 90 ? "#ef4444" : "var(--foreground)" }}>{pct}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#22c55e" }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div className="rounded p-1.5" style={{ background: "var(--muted)" }}>
                          <p style={{ color: "var(--muted-foreground)" }}>Capacity</p>
                          <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{z.capacity}</p>
                        </div>
                        <div className="rounded p-1.5" style={{ background: "var(--muted)" }}>
                          <p style={{ color: "var(--muted-foreground)" }}>Locations</p>
                          <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{z.locations}</p>
                        </div>
                        <div className="rounded p-1.5" style={{ background: "var(--muted)" }}>
                          <p style={{ color: "var(--muted-foreground)" }}>Aisles</p>
                          <p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{z.aisles}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {tab === "Movements" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Stock Movements</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Date","Type","SKU","Qty","Source/Destination","Operator"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOVEMENTS.map(m => {
                      const tc = MOVEMENT_TYPE_COLOR[m.type]
                      return (
                        <tr key={m.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.date}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: tc.bg, color: tc.color }}>{m.type}</span>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{m.sku}</td>
                          <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{m.qty.toLocaleString()}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.source}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.operator}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Settings" && (
          <div className="max-w-lg space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Warehouse Settings</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-6 space-y-4">
                {[
                  { label: "Name", value: WAREHOUSE.name },
                  { label: "Location", value: WAREHOUSE.location },
                  { label: "Type", value: WAREHOUSE.type },
                  { label: "Manager", value: WAREHOUSE.manager },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                ))}
                <Button size="sm" style={{ background: "var(--primary)", color: "#fff" }}>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
