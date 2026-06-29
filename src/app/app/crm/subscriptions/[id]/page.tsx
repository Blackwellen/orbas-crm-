"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Calendar, Clock, DollarSign, Download, ArrowUpCircle, PauseCircle, XCircle, Tag } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const subData: Record<string, {
  customer: string; plan: string; status: string; mrr: number; totalRevenue: number;
  monthsActive: number; nextBilling: string; startDate: string; assignedCSM: string;
  features: string[]; billingEmail: string;
  invoices: { date: string; amount: number; status: string }[];
  usage: { label: string; used: number; limit: number; unit: string }[];
}> = {
  s1: {
    customer: "Apex Capital Group", plan: "Enterprise", status: "Active", mrr: 299,
    totalRevenue: 5085, monthsActive: 17, nextBilling: "2026-07-15",
    startDate: "2025-01-15", assignedCSM: "Sophie Turner",
    billingEmail: "billing@apexcapital.co.uk",
    features: ["Unlimited users", "Advanced analytics", "Custom integrations", "Dedicated support", "SLA 99.99%", "White-label options", "SSO/SAML", "Audit logs"],
    invoices: [
      { date: "2026-06-15", amount: 299, status: "Paid" },
      { date: "2026-05-15", amount: 299, status: "Paid" },
      { date: "2026-04-15", amount: 299, status: "Paid" },
      { date: "2026-03-15", amount: 299, status: "Paid" },
      { date: "2026-02-15", amount: 299, status: "Paid" },
      { date: "2026-01-15", amount: 299, status: "Paid" },
    ],
    usage: [
      { label: "API Calls", used: 840000, limit: 1000000, unit: "calls/mo" },
      { label: "Active Users", used: 48, limit: null as unknown as number, unit: "users" },
      { label: "Storage", used: 18.4, limit: 50, unit: "GB" },
      { label: "Automations", used: 124, limit: 500, unit: "runs/mo" },
    ],
  },
}

const fallback = subData.s1

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Active:   { bg: "#dcfce7", color: "#16a34a" },
    Trialing: { bg: "#dbeafe", color: "#1d4ed8" },
    "Past Due": { bg: "#fff7ed", color: "#c2410c" },
    Cancelled: { bg: "#f1f5f9", color: "#64748b" },
    Paused:   { bg: "#fef3c7", color: "#d97706" },
    Paid:     { bg: "#dcfce7", color: "#16a34a" },
    Failed:   { bg: "#fee2e2", color: "#dc2626" },
  }
  return map[s] ?? { bg: "#f1f5f9", color: "#64748b" }
}

export default function SubscriptionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState("overview")
  const sub = subData[id] ?? fallback
  const badge = statusBadge(sub.status)

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/crm/subscriptions">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{sub.customer}</h1>
            <span className="text-sm font-semibold px-2 py-0.5 rounded" style={{ background: "var(--secondary)" }}>{sub.plan}</span>
            <span style={{ backgroundColor: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{sub.status}</span>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Customer since {formatDate(sub.startDate)} · CSM: {sub.assignedCSM}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><ArrowUpCircle className="w-4 h-4" /> Upgrade Plan</Button>
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><Tag className="w-4 h-4" /> Apply Discount</Button>
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><PauseCircle className="w-4 h-4" /> Pause</Button>
          <Button variant="ghost" size="sm" className="gap-1"><XCircle className="w-4 h-4" style={{ color: "var(--destructive)" }} /> Cancel</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "MRR", value: formatCurrency(sub.mrr), icon: TrendingUp, color: "#16a34a" },
          { label: "Total Revenue", value: formatCurrency(sub.totalRevenue), icon: DollarSign, color: "#1d4ed8" },
          { label: "Months Active", value: String(sub.monthsActive), icon: Clock, color: "#7c3aed" },
          { label: "Next Billing", value: formatDate(sub.nextBilling), icon: Calendar, color: "#d97706" },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "1a" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                <p className="text-lg font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {[
          { key: "overview", label: "Overview" },
          { key: "billing", label: "Billing History" },
          { key: "usage", label: "Usage" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              borderBottom: tab === t.key ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-2 gap-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Plan Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Plan", value: sub.plan },
                  { label: "Status", value: sub.status },
                  { label: "MRR", value: formatCurrency(sub.mrr) },
                  { label: "Billing Email", value: sub.billingEmail },
                  { label: "Start Date", value: formatDate(sub.startDate) },
                  { label: "Next Billing", value: formatDate(sub.nextBilling) },
                  { label: "Assigned CSM", value: sub.assignedCSM },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{f.label}</p>
                    <p className="font-medium mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Included Features</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sub.features.map(f => (
                  <span key={f} className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>{f}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "billing" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Billing History</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                  {["Date", "Amount", "Status", "Invoice"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sub.invoices.map((inv, i) => {
                  const b = statusBadge(inv.status)
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="px-4 py-3">{formatDate(inv.date)}</td>
                      <td className="px-4 py-3 font-semibold">{formatCurrency(inv.amount)}</td>
                      <td className="px-4 py-3">
                        <span style={{ backgroundColor: b.bg, color: b.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{inv.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" style={{ color: "var(--primary)" }}>
                          <Download className="w-3.5 h-3.5" /> Download
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "usage" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Usage Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {sub.usage.map(u => {
              const pct = u.limit ? Math.round((u.used / u.limit) * 100) : null
              const barColor = pct !== null && pct > 90 ? "#dc2626" : pct !== null && pct > 70 ? "#d97706" : "#1d4ed8"
              return (
                <div key={u.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{u.label}</span>
                    <span style={{ color: "var(--muted-foreground)" }}>
                      {u.used.toLocaleString("en-GB")} {u.limit ? `/ ${u.limit.toLocaleString("en-GB")}` : ""} {u.unit}
                      {pct !== null && <span className="ml-2 font-semibold" style={{ color: barColor }}>{pct}%</span>}
                    </span>
                  </div>
                  {pct !== null && (
                    <div className="h-3 rounded-full" style={{ background: "var(--secondary)" }}>
                      <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                    </div>
                  )}
                  {pct === null && (
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Unlimited on {sub.plan} plan</p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
