"use client"

import React, { useState } from "react"
import {
  Plus, RefreshCw, Pencil, ToggleLeft, ToggleRight, Lock, TrendingUp, TrendingDown, Minus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"

const CURRENCIES = [
  { code: "USD", name: "US Dollar",           flag: "🇺🇸", rate: 1.2714, prev: 1.2698, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "EUR", name: "Euro",                flag: "🇪🇺", rate: 1.1843, prev: 1.1860, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "CAD", name: "Canadian Dollar",     flag: "🇨🇦", rate: 1.7491, prev: 1.7502, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "AUD", name: "Australian Dollar",   flag: "🇦🇺", rate: 1.9882, prev: 1.9910, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "CHF", name: "Swiss Franc",         flag: "🇨🇭", rate: 1.1120, prev: 1.1135, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "JPY", name: "Japanese Yen",        flag: "🇯🇵", rate: 197.42, prev: 196.88, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "SGD", name: "Singapore Dollar",    flag: "🇸🇬", rate: 1.7021, prev: 1.7015, source: "Manual", updated: "10 Jun 2026 14:22" },
  { code: "HKD", name: "Hong Kong Dollar",    flag: "🇭🇰", rate: 9.9320, prev: 9.9410, source: "Manual", updated: "10 Jun 2026 14:22" },
  { code: "NOK", name: "Norwegian Krone",     flag: "🇳🇴", rate: 13.421, prev: 13.388, source: "ECB", updated: "11 Jun 2026 09:01" },
  { code: "SEK", name: "Swedish Krona",       flag: "🇸🇪", rate: 13.812, prev: 13.795, source: "ECB", updated: "11 Jun 2026 09:01" },
]

const EUR_HISTORY = [
  { month: "Jul 25", rate: 1.1641 },
  { month: "Aug 25", rate: 1.1720 },
  { month: "Sep 25", rate: 1.1695 },
  { month: "Oct 25", rate: 1.1780 },
  { month: "Nov 25", rate: 1.1810 },
  { month: "Dec 25", rate: 1.1765 },
  { month: "Jan 26", rate: 1.1832 },
  { month: "Feb 26", rate: 1.1798 },
  { month: "Mar 26", rate: 1.1855 },
  { month: "Apr 26", rate: 1.1820 },
  { month: "May 26", rate: 1.1871 },
  { month: "Jun 26", rate: 1.1843 },
]

const USD_HISTORY = [
  { month: "Jul 25", rate: 1.2530 },
  { month: "Aug 25", rate: 1.2601 },
  { month: "Sep 25", rate: 1.2712 },
  { month: "Oct 25", rate: 1.2688 },
  { month: "Nov 25", rate: 1.2644 },
  { month: "Dec 25", rate: 1.2701 },
  { month: "Jan 26", rate: 1.2759 },
  { month: "Feb 26", rate: 1.2720 },
  { month: "Mar 26", rate: 1.2695 },
  { month: "Apr 26", rate: 1.2740 },
  { month: "May 26", rate: 1.2722 },
  { month: "Jun 26", rate: 1.2714 },
]

const CHART_DATA = EUR_HISTORY.map((e, i) => ({
  month: e.month,
  "GBP/EUR": e.rate,
  "GBP/USD": USD_HISTORY[i]?.rate ?? 0,
}))

function RateDelta({ current, prev }: { current: number; prev: number }) {
  const diff = current - prev
  const pct = ((Math.abs(diff) / prev) * 100).toFixed(3)
  if (Math.abs(diff) < 0.0001) return <span style={{ color: "var(--muted-foreground)", fontSize: 11 }}>—</span>
  if (diff > 0) return <span style={{ color: "#16a34a", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }}><TrendingUp size={11} /> +{pct}%</span>
  return <span style={{ color: "#dc2626", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }}><TrendingDown size={11} /> -{pct}%</span>
}

export default function CurrenciesPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [editCurrency, setEditCurrency] = useState<typeof CURRENCIES[0] | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [disabled, setDisabled] = useState<Set<string>>(new Set())

  function syncRates() {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1800)
  }

  function toggleCurrency(code: string) {
    setDisabled(prev => {
      const next = new Set(prev)
      next.has(code) ? next.delete(code) : next.add(code)
      return next
    })
  }

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Currencies</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Manage exchange rates for multi-currency transactions. Base currency is <strong>GBP</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={syncRates} disabled={syncing}>
            <RefreshCw size={14} className={`mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing…" : "Sync Rates from ECB"}
          </Button>
          <Button onClick={() => setAddOpen(true)} style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus size={14} className="mr-2" /> Add Currency
          </Button>
        </div>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Base Currency</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center gap-4 p-3 rounded-lg" style={{ background: "var(--muted)" }}>
            <span className="text-2xl">🇬🇧</span>
            <div>
              <p className="font-bold">GBP — British Pound Sterling</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>All amounts are recorded in GBP. This cannot be changed.</p>
            </div>
            <div className="ml-auto">
              <Lock size={16} style={{ color: "var(--muted-foreground)" }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Enabled Currencies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                  {["Currency", "Code", "Rate vs GBP", "24h Change", "Last Updated", "Source", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CURRENCIES.map(c => {
                  const isDisabled = disabled.has(c.code)
                  return (
                    <tr
                      key={c.code}
                      style={{ borderBottom: "1px solid var(--border)", opacity: isDisabled ? 0.5 : 1 }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.flag}</span>
                          <span className="text-sm font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--muted)" }}>{c.code}</span>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-sm">
                        {c.rate.toFixed(c.code === "JPY" ? 2 : 4)}
                      </td>
                      <td className="px-4 py-3">
                        <RateDelta current={c.rate} prev={c.prev} />
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{c.updated}</td>
                      <td className="px-4 py-3">
                        <span style={{
                          backgroundColor: c.source === "ECB" ? "#eff6ff" : "#fefce8",
                          color: c.source === "ECB" ? "#1d4ed8" : "#a16207",
                          padding: "2px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600
                        }}>
                          {c.source}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditCurrency(c)}
                            style={{ height: 28, padding: "0 8px", fontSize: 12 }}
                          >
                            <Pencil size={12} className="mr-1" /> Edit Rate
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCurrency(c.code)}
                            style={{ height: 28, padding: "0 8px", fontSize: 12 }}
                          >
                            {isDisabled
                              ? <><ToggleLeft size={14} className="mr-1" /> Enable</>
                              : <><ToggleRight size={14} className="mr-1" /> Disable</>
                            }
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Exchange Rate History — Last 12 Months</CardTitle>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>GBP base · ECB mid-market rates</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={CHART_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" as string }} />
              <YAxis
                yAxisId="eur"
                domain={[1.14, 1.22]}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" as string }}
                tickFormatter={(v: any) => v.toFixed(3)}
              />
              <YAxis
                yAxisId="usd"
                orientation="right"
                domain={[1.24, 1.29]}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" as string }}
                tickFormatter={(v: any) => v.toFixed(3)}
              />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                formatter={(v: any, name: any) => [Number(v).toFixed(4), name]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="eur" type="monotone" dataKey="GBP/EUR" stroke="#1a56db" strokeWidth={2} dot={false} />
              <Line yAxisId="usd" type="monotone" dataKey="GBP/USD" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 420 }}>
          <DialogHeader>
            <DialogTitle>Add Currency</DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              Enable a new currency for transactions. Rates will be synced from ECB or entered manually.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Currency</label>
              <Select>
                <SelectTrigger style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {["NZD – New Zealand Dollar", "DKK – Danish Krone", "MXN – Mexican Peso", "ZAR – South African Rand", "INR – Indian Rupee"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Rate vs GBP</label>
              <Input placeholder="e.g. 2.0491" style={{ background: "var(--muted)", border: "1px solid var(--border)" }} />
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Leave blank to auto-populate from ECB</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)} style={{ background: "var(--primary)", color: "#fff" }}>
              Add Currency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCurrency} onOpenChange={() => setEditCurrency(null)}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 380 }}>
          <DialogHeader>
            <DialogTitle>Edit Rate — {editCurrency?.flag} {editCurrency?.code}</DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              Update the exchange rate for {editCurrency?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Rate vs GBP</label>
              <Input
                defaultValue={editCurrency?.rate.toString()}
                style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Source</label>
              <Select defaultValue={editCurrency?.source ?? "Manual"}>
                <SelectTrigger style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ECB">ECB (auto-sync)</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCurrency(null)}>Cancel</Button>
            <Button onClick={() => setEditCurrency(null)} style={{ background: "var(--primary)", color: "#fff" }}>
              Save Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
