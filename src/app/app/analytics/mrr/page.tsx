"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Download, RefreshCw, Users, DollarSign, BarChart3, Activity } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts"

const mrrBreakdownData = [
  { month: "Jul '24", newMRR: 12400, expansionMRR: 4200, contractionMRR: -1800, churnedMRR: -3200 },
  { month: "Aug '24", newMRR: 14100, expansionMRR: 5100, contractionMRR: -2100, churnedMRR: -2800 },
  { month: "Sep '24", newMRR: 11800, expansionMRR: 4800, contractionMRR: -1600, churnedMRR: -3500 },
  { month: "Oct '24", newMRR: 15200, expansionMRR: 6200, contractionMRR: -2400, churnedMRR: -2900 },
  { month: "Nov '24", newMRR: 13900, expansionMRR: 5500, contractionMRR: -1900, churnedMRR: -3100 },
  { month: "Dec '24", newMRR: 16800, expansionMRR: 7100, contractionMRR: -2200, churnedMRR: -2600 },
  { month: "Jan '25", newMRR: 14500, expansionMRR: 5800, contractionMRR: -1700, churnedMRR: -3800 },
  { month: "Feb '25", newMRR: 17200, expansionMRR: 6400, contractionMRR: -2500, churnedMRR: -2700 },
  { month: "Mar '25", newMRR: 18900, expansionMRR: 7800, contractionMRR: -2800, churnedMRR: -2400 },
  { month: "Apr '25", newMRR: 16100, expansionMRR: 6900, contractionMRR: -2100, churnedMRR: -3200 },
  { month: "May '25", newMRR: 19400, expansionMRR: 8200, contractionMRR: -2600, churnedMRR: -2900 },
  { month: "Jun '25", newMRR: 21200, expansionMRR: 9100, contractionMRR: -3000, churnedMRR: -2500 },
]

const arrGrowthData = [
  { month: "Jul '24", arr: 1180000 },
  { month: "Aug '24", arr: 1215000 },
  { month: "Sep '24", arr: 1242000 },
  { month: "Oct '24", arr: 1298000 },
  { month: "Nov '24", arr: 1335000 },
  { month: "Dec '24", arr: 1402000 },
  { month: "Jan '25", arr: 1441000 },
  { month: "Feb '25", arr: 1498000 },
  { month: "Mar '25", arr: 1572000 },
  { month: "Apr '25", arr: 1621000 },
  { month: "May '25", arr: 1698000 },
  { month: "Jun '25", arr: 1780200 },
]

const cohortData = [
  { cohort: "Jul '24", m1: 100, m2: 94, m3: 91, m4: 88, m5: 85, m6: 83, m7: 81, m8: 79, m9: 77, m10: 75, m11: 73, m12: 71 },
  { cohort: "Aug '24", m1: 100, m2: 95, m3: 92, m4: 89, m5: 87, m6: 84, m7: 82, m8: 80, m9: 78, m10: 76, m11: 74, m12: null },
  { cohort: "Sep '24", m1: 100, m2: 93, m3: 90, m4: 87, m5: 84, m6: 82, m7: 79, m8: 77, m9: 75, m10: 73, m11: null, m12: null },
  { cohort: "Oct '24", m1: 100, m2: 96, m3: 93, m4: 91, m5: 88, m6: 86, m7: 84, m8: 82, m9: 80, m10: null, m11: null, m12: null },
  { cohort: "Nov '24", m1: 100, m2: 94, m3: 91, m4: 89, m5: 86, m6: 84, m7: 82, m8: 80, m9: null, m10: null, m11: null, m12: null },
  { cohort: "Dec '24", m1: 100, m2: 97, m3: 94, m4: 92, m5: 90, m6: 88, m7: 86, m8: null, m9: null, m10: null, m11: null, m12: null },
  { cohort: "Jan '25", m1: 100, m2: 95, m3: 92, m4: 90, m5: 88, m6: 86, m7: null, m8: null, m9: null, m10: null, m11: null, m12: null },
  { cohort: "Feb '25", m1: 100, m2: 96, m3: 93, m4: 91, m5: 89, m6: null, m7: null, m8: null, m9: null, m10: null, m11: null, m12: null },
]

const revenueByPlan = [
  { plan: "Enterprise", customers: 28, mrr: 84000, momChange: 9.2, churn: 0.8 },
  { plan: "Scale", customers: 64, mrr: 38400, momChange: 7.1, churn: 1.4 },
  { plan: "Growth", customers: 142, mrr: 17040, momChange: 6.8, churn: 2.1 },
  { plan: "Starter", customers: 318, mrr: 8910, momChange: 4.3, churn: 3.2 },
]

const segmentData = [
  { name: "Enterprise", value: 84000, color: "#1a56db" },
  { name: "Scale", value: 38400, color: "#06b6d4" },
  { name: "Growth", value: 17040, color: "#8b5cf6" },
  { name: "Starter", value: 8910, color: "#f59e0b" },
]

const churnedCustomers = [
  { customer: "Nexus Logistics Ltd", plan: "Scale", churnedMRR: 600, reason: "Budget cuts" },
  { customer: "Brightfield Media", plan: "Growth", churnedMRR: 120, reason: "Moved to competitor" },
  { customer: "Oakwood Consulting", plan: "Starter", churnedMRR: 28, reason: "Business closure" },
  { customer: "Redline Automotive", plan: "Growth", churnedMRR: 120, reason: "Feature gaps" },
  { customer: "Summit Financial", plan: "Scale", churnedMRR: 600, reason: "Acquisition" },
]

function getRetentionColor(val: number | null): string {
  if (val === null) return "#f8fafc"
  if (val >= 95) return "#dcfce7"
  if (val >= 88) return "#bbf7d0"
  if (val >= 80) return "#86efac"
  if (val >= 70) return "#fef9c3"
  return "#fee2e2"
}

function getRetentionTextColor(val: number | null): string {
  if (val === null) return "transparent"
  if (val >= 80) return "#15803d"
  if (val >= 70) return "#92400e"
  return "#dc2626"
}

export default function MRRARRPage() {
  const [refreshing, setRefreshing] = useState(false)

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  return (
    <div className="p-6 space-y-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>MRR &amp; ARR Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Revenue intelligence — June 2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "MRR", value: "£148,350", icon: DollarSign, sub: "Monthly Recurring Revenue", up: true },
          { label: "ARR", value: "£1,780,200", icon: BarChart3, sub: "Annual Recurring Revenue", up: true },
          { label: "MoM Growth", value: "+8.2%", icon: TrendingUp, sub: "vs last month", up: true },
          { label: "Net Revenue Retention", value: "112%", icon: Activity, sub: "expansion-adjusted", up: true },
          { label: "Churn Rate", value: "1.8%", icon: TrendingDown, sub: "monthly logo churn", up: false },
        ].map((stat) => (
          <Card key={stat.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{stat.label}</span>
              </div>
              <div className="text-xl font-bold" style={{ color: stat.up ? "#16a34a" : "#dc2626" }}>{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>MRR Breakdown</CardTitle>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>New, Expansion, Contraction, Churned — 12 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mrrBreakdownData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(v: any) => `£${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any, name: any) => [`£${Math.abs(v).toLocaleString()}`, name]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="newMRR" name="New MRR" stackId="pos" fill="#1a56db" radius={[0, 0, 0, 0]} />
                <Bar dataKey="expansionMRR" name="Expansion MRR" stackId="pos" fill="#06b6d4" />
                <Bar dataKey="contractionMRR" name="Contraction MRR" stackId="neg" fill="#f59e0b" />
                <Bar dataKey="churnedMRR" name="Churned MRR" stackId="neg" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>ARR Growth</CardTitle>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Annual recurring revenue trajectory</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={arrGrowthData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a56db" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1a56db" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(v: any) => `£${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: any, name: any) => [`£${v.toLocaleString()}`, "ARR"]} />
                <Area type="monotone" dataKey="arr" stroke="#1a56db" strokeWidth={2} fill="url(#arrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Cohort Retention Heatmap</CardTitle>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Revenue retention % by cohort month</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ padding: "6px 10px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500 }}>Cohort</th>
                {["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"].map(m => (
                  <th key={m} style={{ padding: "6px 8px", textAlign: "center", color: "var(--muted-foreground)", fontWeight: 500 }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row) => (
                <tr key={row.cohort}>
                  <td style={{ padding: "5px 10px", color: "var(--foreground)", fontWeight: 500 }}>{row.cohort}</td>
                  {[row.m1, row.m2, row.m3, row.m4, row.m5, row.m6, row.m7, row.m8, row.m9, row.m10, row.m11, row.m12].map((val, i) => (
                    <td key={i} style={{
                      padding: "5px 8px",
                      textAlign: "center",
                      backgroundColor: getRetentionColor(val),
                      color: getRetentionTextColor(val),
                      fontWeight: val !== null ? 600 : 400,
                      borderRadius: 4,
                    }}>
                      {val !== null ? `${val}%` : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Plan","Customers","MRR","MoM Change","Churn Rate"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {revenueByPlan.map((row) => (
                    <tr key={row.plan} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 600 }}>{row.plan}</td>
                      <td style={{ padding: "10px 12px", color: "var(--foreground)" }}>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
                          {row.customers}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 600 }}>£{row.mrr.toLocaleString()}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ color: row.momChange >= 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                          {row.momChange >= 0 ? "+" : ""}{row.momChange}%
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ color: row.churn <= 1.5 ? "#16a34a" : row.churn <= 2.5 ? "#d97706" : "#dc2626" }}>
                          {row.churn}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>MRR by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {segmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any, name: any) => [`£${v.toLocaleString()}`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {segmentData.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: s.color }} />
                    <span style={{ color: "var(--foreground)" }}>{s.name}</span>
                  </div>
                  <span style={{ color: "var(--muted-foreground)" }}>£{s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Churned Customers — June 2025</CardTitle>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>5 customers churned this month · Total lost MRR: £1,468</p>
        </CardHeader>
        <CardContent>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Customer","Plan","Churned MRR","Churn Reason"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {churnedCustomers.map((row) => (
                <tr key={row.customer} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 500 }}>{row.customer}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: 9999, fontSize: 12, fontWeight: 500 }}>{row.plan}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#dc2626", fontWeight: 600 }}>-£{row.churnedMRR}</td>
                  <td style={{ padding: "10px 12px", color: "var(--muted-foreground)" }}>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
