"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MapPin, Users, TrendingUp, AlertTriangle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const territories = [
  { id: "t1", name: "London South", region: "London", reps: 4, revenueYTD: 412000, quota: 500000, attainment: 82, status: "On Track", deals: 18 },
  { id: "t2", name: "London North", region: "London", reps: 3, revenueYTD: 295000, quota: 400000, attainment: 74, status: "At Risk", deals: 14 },
  { id: "t3", name: "Midlands East", region: "Midlands", reps: 3, revenueYTD: 187000, quota: 250000, attainment: 75, status: "On Track", deals: 11 },
  { id: "t4", name: "Midlands West", region: "Midlands", reps: 2, revenueYTD: 143000, quota: 200000, attainment: 72, status: "At Risk", deals: 9 },
  { id: "t5", name: "North England", region: "North", reps: 4, revenueYTD: 321000, quota: 350000, attainment: 92, status: "Exceeding", deals: 22 },
  { id: "t6", name: "Scotland", region: "Scotland", reps: 3, revenueYTD: 218000, quota: 280000, attainment: 78, status: "On Track", deals: 13 },
  { id: "t7", name: "Wales", region: "Wales", reps: 2, revenueYTD: 97000, quota: 160000, attainment: 61, status: "Behind", deals: 7 },
  { id: "t8", name: "South West", region: "South West", reps: 3, revenueYTD: 256000, quota: 300000, attainment: 85, status: "On Track", deals: 15 },
]

const regions = ["All Regions", "London", "Midlands", "North", "Scotland", "Wales", "South West"]

const statusStyle = (s: string) => {
  if (s === "Exceeding") return { backgroundColor: "#dcfce7", color: "#16a34a" }
  if (s === "On Track") return { backgroundColor: "#dbeafe", color: "#1d4ed8" }
  if (s === "At Risk") return { backgroundColor: "#fff7ed", color: "#c2410c" }
  return { backgroundColor: "#fee2e2", color: "#dc2626" }
}

const attainmentColor = (pct: number) => {
  if (pct >= 90) return "#16a34a"
  if (pct >= 75) return "#1d4ed8"
  if (pct >= 60) return "#d97706"
  return "#dc2626"
}

export default function TerritoriesPage() {
  const [region, setRegion] = useState("All Regions")

  const filtered = region === "All Regions" ? territories : territories.filter(t => t.region === region)

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Territories</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Manage regional sales coverage and quota assignments</p>
        </div>
        <Button style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Territory
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Territories", value: "8", icon: MapPin, color: "#1d4ed8" },
          { label: "Active Reps", value: "24", icon: Users, color: "#16a34a" },
          { label: "Avg Revenue / Territory", value: formatCurrency(241125), icon: TrendingUp, color: "#7c3aed" },
          { label: "Coverage Gaps", value: "3 regions", icon: AlertTriangle, color: "#dc2626" },
        ].map(stat => (
          <Card key={stat.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + "1a" }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-44" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{filtered.length} territories</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(t => (
          <Link key={t.id} href={`/app/crm/territories/${t.id}`}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{t.region}</p>
                  </div>
                  <span style={{ ...statusStyle(t.status), padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{t.status}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Revenue YTD</p>
                    <p className="text-sm font-semibold">{formatCurrency(t.revenueYTD)}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Quota</p>
                    <p className="text-sm font-semibold">{formatCurrency(t.quota)}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Assigned Reps</p>
                    <p className="text-sm font-semibold">{t.reps}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Open Deals</p>
                    <p className="text-sm font-semibold">{t.deals}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--muted-foreground)" }}>Attainment</span>
                    <span style={{ color: attainmentColor(t.attainment), fontWeight: 600 }}>{t.attainment}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--secondary)" }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${t.attainment}%`, backgroundColor: attainmentColor(t.attainment) }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
