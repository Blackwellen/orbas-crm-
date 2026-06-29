"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, TrendingUp, Target, BarChart2, Edit } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const territoryData: Record<string, {
  name: string; region: string; revenueYTD: number; quota: number; attainment: number; dealsOpen: number; status: string;
  reps: { name: string; quota: number; attained: number; pct: number; won: number }[];
  accounts: { company: string; revenue: number; status: string; lastActivity: string }[];
}> = {
  t1: {
    name: "London South", region: "London", revenueYTD: 412000, quota: 500000, attainment: 82, dealsOpen: 18, status: "On Track",
    reps: [
      { name: "Sophie Turner", quota: 130000, attained: 108000, pct: 83, won: 6 },
      { name: "James Patel", quota: 130000, attained: 112000, pct: 86, won: 7 },
      { name: "Rachel Moore", quota: 130000, attained: 104000, pct: 80, won: 5 },
      { name: "David Chen", quota: 110000, attained: 88000, pct: 80, won: 4 },
    ],
    accounts: [
      { company: "Apex Capital Group", revenue: 84000, status: "Active", lastActivity: "2026-06-08" },
      { company: "Meridian Law LLP", revenue: 62000, status: "Active", lastActivity: "2026-06-05" },
      { company: "Southbank Media", revenue: 47000, status: "At Risk", lastActivity: "2026-05-28" },
      { company: "City Bridge Finance", revenue: 39000, status: "Active", lastActivity: "2026-06-09" },
      { company: "Lambeth Holdings", revenue: 35000, status: "Active", lastActivity: "2026-06-03" },
      { company: "Bermondsey Logistics", revenue: 31000, status: "Churned", lastActivity: "2026-04-15" },
      { company: "Peckham Digital", revenue: 28000, status: "Active", lastActivity: "2026-06-07" },
      { company: "Camberwell Studios", revenue: 22000, status: "Prospect", lastActivity: "2026-06-10" },
      { company: "Clapham Retail Group", revenue: 19000, status: "Active", lastActivity: "2026-06-01" },
      { company: "Streatham Ventures", revenue: 14000, status: "Prospect", lastActivity: "2026-06-06" },
    ],
  },
  t2: {
    name: "London North", region: "London", revenueYTD: 295000, quota: 400000, attainment: 74, dealsOpen: 14, status: "At Risk",
    reps: [
      { name: "Oliver Hughes", quota: 140000, attained: 108000, pct: 77, won: 5 },
      { name: "Priya Singh", quota: 140000, attained: 97000, pct: 69, won: 4 },
      { name: "Tom Walsh", quota: 120000, attained: 90000, pct: 75, won: 4 },
    ],
    accounts: [
      { company: "Islington Tech", revenue: 55000, status: "Active", lastActivity: "2026-06-07" },
      { company: "Hackney Works", revenue: 43000, status: "Active", lastActivity: "2026-06-04" },
      { company: "Camden Creative", revenue: 38000, status: "At Risk", lastActivity: "2026-05-20" },
      { company: "Archway Partners", revenue: 31000, status: "Active", lastActivity: "2026-06-08" },
      { company: "Finsbury Consulting", revenue: 26000, status: "Active", lastActivity: "2026-05-30" },
      { company: "Stoke Newington Co.", revenue: 22000, status: "Prospect", lastActivity: "2026-06-09" },
      { company: "Tottenham Digital", revenue: 19000, status: "Active", lastActivity: "2026-06-02" },
      { company: "Holloway Retail", revenue: 15000, status: "Churned", lastActivity: "2026-03-22" },
      { company: "Dalston Media", revenue: 12000, status: "Active", lastActivity: "2026-05-25" },
      { company: "Crouch End Studios", revenue: 11000, status: "Prospect", lastActivity: "2026-06-10" },
    ],
  },
}

const fallbackTerritory = territoryData.t1

const statusStyle = (s: string) => {
  if (s === "Active") return { backgroundColor: "#dcfce7", color: "#16a34a" }
  if (s === "At Risk") return { backgroundColor: "#fff7ed", color: "#c2410c" }
  if (s === "Prospect") return { backgroundColor: "#dbeafe", color: "#1d4ed8" }
  if (s === "Churned") return { backgroundColor: "#f1f5f9", color: "#64748b" }
  return { backgroundColor: "#f1f5f9", color: "#64748b" }
}

const attainmentColor = (pct: number) => {
  if (pct >= 90) return "#16a34a"
  if (pct >= 75) return "#1d4ed8"
  if (pct >= 60) return "#d97706"
  return "#dc2626"
}

export default function TerritoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState("overview")
  const territory = territoryData[id] ?? fallbackTerritory

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/crm/territories">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{territory.name}</h1>
            <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{territory.region}</span>
            <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{territory.status}</span>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Territory overview and performance metrics</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}>
          <Edit className="w-4 h-4" />
          Edit Territory
        </Button>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {["overview", "reps", "accounts"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-sm font-medium capitalize transition-colors"
            style={{
              borderBottom: tab === t ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === t ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t === "reps" ? "Reps & Quota" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Revenue YTD", value: formatCurrency(territory.revenueYTD), icon: TrendingUp, color: "#1d4ed8" },
              { label: "Quota", value: formatCurrency(territory.quota), icon: Target, color: "#7c3aed" },
              { label: "Attainment", value: `${territory.attainment}%`, icon: BarChart2, color: attainmentColor(territory.attainment) },
              { label: "Open Deals", value: String(territory.dealsOpen), icon: MapPin, color: "#d97706" },
            ].map(s => (
              <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "1a" }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                    <p className="text-xl font-bold">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader>
              <CardTitle className="text-base">Territory Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ height: 280, background: "var(--secondary)", border: "2px dashed var(--border)" }}
              >
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2" style={{ color: "var(--muted-foreground)" }} />
                  <p className="font-medium" style={{ color: "var(--muted-foreground)" }}>Territory Map</p>
                  <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Interactive map available in production</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--muted-foreground)" }}>Quota attainment</span>
                  <span style={{ color: attainmentColor(territory.attainment), fontWeight: 600 }}>{territory.attainment}% of {formatCurrency(territory.quota)}</span>
                </div>
                <div className="h-3 rounded-full" style={{ background: "var(--secondary)" }}>
                  <div className="h-3 rounded-full" style={{ width: `${territory.attainment}%`, backgroundColor: attainmentColor(territory.attainment) }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "reps" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader>
            <CardTitle className="text-base">Assigned Reps & Quota Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                  {["Rep Name", "Quota", "Attained", "% Complete", "Deals Won"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {territory.reps.map((rep, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 font-medium">{rep.name}</td>
                    <td className="px-4 py-3">{formatCurrency(rep.quota)}</td>
                    <td className="px-4 py-3">{formatCurrency(rep.attained)}</td>
                    <td className="px-4 py-3" style={{ minWidth: 160 }}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full" style={{ background: "var(--secondary)" }}>
                          <div className="h-2 rounded-full" style={{ width: `${rep.pct}%`, backgroundColor: attainmentColor(rep.pct) }} />
                        </div>
                        <span style={{ color: attainmentColor(rep.pct), fontWeight: 600, fontSize: 12 }}>{rep.pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{rep.won}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "accounts" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader>
            <CardTitle className="text-base">Accounts in Territory</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                  {["Company", "Revenue", "Status", "Last Activity"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {territory.accounts.map((acc, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 font-medium">{acc.company}</td>
                    <td className="px-4 py-3">{formatCurrency(acc.revenue)}</td>
                    <td className="px-4 py-3">
                      <span style={{ ...statusStyle(acc.status), padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{acc.status}</span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(acc.lastActivity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
