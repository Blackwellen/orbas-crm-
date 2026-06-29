"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, Users, AlertCircle, XCircle, MoreHorizontal } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"

const mrrTrend = [
  { month: "Jan", mrr: 121000 },
  { month: "Feb", mrr: 128500 },
  { month: "Mar", mrr: 133200 },
  { month: "Apr", mrr: 139800 },
  { month: "May", mrr: 144100 },
  { month: "Jun", mrr: 148350 },
]

const plans = ["Starter", "Growth", "Scale", "Enterprise"]

const subscriptions = [
  { id: "s1", customer: "Apex Capital Group", plan: "Enterprise", mrr: 299, startDate: "2025-01-15", nextBilling: "2026-07-15", status: "Active", cycle: "Monthly" },
  { id: "s2", customer: "Meridian Law LLP", plan: "Scale", mrr: 129, startDate: "2025-03-01", nextBilling: "2026-07-01", status: "Active", cycle: "Monthly" },
  { id: "s3", customer: "NorthStar Retail", plan: "Growth", mrr: 79, startDate: "2025-06-10", nextBilling: "2026-07-10", status: "Active", cycle: "Monthly" },
  { id: "s4", customer: "Finsbury Consulting", plan: "Starter", mrr: 39, startDate: "2026-01-01", nextBilling: "2026-07-01", status: "Trialing", cycle: "Monthly" },
  { id: "s5", customer: "Southbank Media", plan: "Growth", mrr: 79, startDate: "2025-08-20", nextBilling: "2026-06-20", status: "Past Due", cycle: "Monthly" },
  { id: "s6", customer: "BrightPath Energy", plan: "Enterprise", mrr: 299, startDate: "2024-11-01", nextBilling: "2026-07-01", status: "Active", cycle: "Annual" },
  { id: "s7", customer: "Albion Logistics", plan: "Scale", mrr: 129, startDate: "2025-02-14", nextBilling: "2026-07-14", status: "Active", cycle: "Monthly" },
  { id: "s8", customer: "Greenfield Brands", plan: "Starter", mrr: 39, startDate: "2026-04-05", nextBilling: "2026-07-05", status: "Trialing", cycle: "Monthly" },
  { id: "s9", customer: "Sterling Insurance", plan: "Enterprise", mrr: 299, startDate: "2024-09-01", nextBilling: "2026-07-01", status: "Active", cycle: "Annual" },
  { id: "s10", customer: "Whitmore Partners", plan: "Growth", mrr: 79, startDate: "2025-05-12", nextBilling: "—", status: "Cancelled", cycle: "Monthly" },
  { id: "s11", customer: "Harrington Industrial", plan: "Scale", mrr: 129, startDate: "2025-07-22", nextBilling: "2026-07-22", status: "Active", cycle: "Monthly" },
  { id: "s12", customer: "Lakeside Hotels", plan: "Growth", mrr: 79, startDate: "2025-09-03", nextBilling: "2026-07-03", status: "Paused", cycle: "Monthly" },
  { id: "s13", customer: "Quantum Architects", plan: "Starter", mrr: 39, startDate: "2026-02-01", nextBilling: "2026-07-01", status: "Active", cycle: "Monthly" },
  { id: "s14", customer: "Crown Legal Group", plan: "Enterprise", mrr: 299, startDate: "2025-01-08", nextBilling: "2026-07-08", status: "Active", cycle: "Monthly" },
  { id: "s15", customer: "Parkway Housing Trust", plan: "Scale", mrr: 129, startDate: "2025-04-18", nextBilling: "2026-07-18", status: "Active", cycle: "Monthly" },
  { id: "s16", customer: "Summit Pharma Ltd", plan: "Growth", mrr: 79, startDate: "2025-10-11", nextBilling: "2026-07-11", status: "Active", cycle: "Monthly" },
  { id: "s17", customer: "Riverside Academy", plan: "Starter", mrr: 39, startDate: "2026-03-01", nextBilling: "2026-06-01", status: "Past Due", cycle: "Monthly" },
  { id: "s18", customer: "Coastal Transport Co", plan: "Growth", mrr: 79, startDate: "2025-12-15", nextBilling: "—", status: "Cancelled", cycle: "Monthly" },
]

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Active:   { bg: "#dcfce7", color: "#16a34a" },
    Trialing: { bg: "#dbeafe", color: "#1d4ed8" },
    "Past Due": { bg: "#fff7ed", color: "#c2410c" },
    Cancelled: { bg: "#f1f5f9", color: "#64748b" },
    Paused:   { bg: "#fef3c7", color: "#d97706" },
  }
  return map[s] ?? { bg: "#f1f5f9", color: "#64748b" }
}

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [planFilter, setPlanFilter] = useState("All")

  const filtered = subscriptions.filter(s => {
    const matchSearch = search === "" || s.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || s.status === statusFilter
    const matchPlan = planFilter === "All" || s.plan === planFilter
    return matchSearch && matchStatus && matchPlan
  })

  const activeCount = subscriptions.filter(s => s.status === "Active").length
  const churned = subscriptions.filter(s => s.status === "Cancelled").length

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Recurring revenue management and billing overview</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-32 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrTrend}>
                <Line type="monotone" dataKey="mrr" stroke="#16a34a" strokeWidth={2} dot={false} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [formatCurrency(v), "MRR"]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>MRR</p>
                <p className="text-lg font-bold" style={{ color: "#16a34a" }}>{formatCurrency(148350)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>ARR</p>
                <p className="text-lg font-bold">{formatCurrency(1780200)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Active</p>
                <p className="text-lg font-bold">{activeCount}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Churned MTD</p>
                <p className="text-lg font-bold" style={{ color: "#dc2626" }}>{churned}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["All", "Active", "Trialing", "Past Due", "Cancelled", "Paused"].map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-36" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Plans</SelectItem>
            {plans.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm self-center" style={{ color: "var(--muted-foreground)" }}>{filtered.length} subscriptions</span>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                {["Customer", "Plan", "MRR", "Start Date", "Next Billing", "Status", "Billing Cycle", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const badge = statusBadge(s.status)
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/subscriptions/${s.id}`} className="font-medium hover:underline" style={{ color: "var(--foreground)" }}>
                        {s.customer}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "var(--secondary)" }}>{s.plan}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(s.mrr)}<span className="text-xs font-normal ml-0.5" style={{ color: "var(--muted-foreground)" }}>/mo</span></td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(s.startDate)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{s.nextBilling === "—" ? "—" : formatDate(s.nextBilling)}</td>
                    <td className="px-4 py-3">
                      <span style={{ backgroundColor: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{s.cycle}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
