"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft, Building2, MapPin, Users, Calendar, FileText,
  TrendingUp, TrendingDown, ArrowLeftRight, Settings2, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

const ENTITIES: Record<string, {
  name: string; type: string; companyNo: string; vatNo: string; status: string;
  currency: string; country: string; incorporated: string;
  address: string; city: string; postcode: string;
  directors: { name: string; role: string; appointed: string }[];
  nextFiling: string; lastFiling: string; sicCode: string;
  revenue: number; cogs: number; opex: number; ebit: number; tax: number;
  interEntity: { date: string; counterparty: string; type: string; description: string; amount: number; status: string }[];
}> = {
  "ent-01": {
    name: "Orbas Technologies Ltd", type: "Limited Company", companyNo: "13849201",
    vatNo: "GB 392 8471 22", status: "Active", currency: "GBP", country: "United Kingdom",
    incorporated: "12 Jan 2021",
    address: "14 Finsbury Square, 3rd Floor", city: "London", postcode: "EC2A 1HP",
    directors: [
      { name: "James A. Wilson", role: "CEO & Director", appointed: "12 Jan 2021" },
      { name: "Sarah M. Chen",   role: "CFO & Director",  appointed: "14 Mar 2021" },
      { name: "David K. Patel",  role: "CTO & Director",  appointed: "20 Jun 2022" },
    ],
    nextFiling: "31 Jan 2027", lastFiling: "31 Jan 2026", sicCode: "62012 – Business and domestic software development",
    revenue: 2840000, cogs: 820000, opex: 1100000, ebit: 920000, tax: 174800,
    interEntity: [
      { date: "31 Mar 2026", counterparty: "Orbas Consulting LLP",  type: "Management Fee",  description: "Q1 2026 group management charge",      amount: 45000,  status: "Settled" },
      { date: "28 Feb 2026", counterparty: "Orbas US Inc.",         type: "IP Royalty",      description: "Software licence royalty – Feb 2026",   amount: 18200,  status: "Settled" },
      { date: "31 Jan 2026", counterparty: "Orbas DACH GmbH",       type: "Service Charge",  description: "Shared services recharge – Jan 2026",   amount: 8400,   status: "Settled" },
      { date: "31 Dec 2025", counterparty: "Orbas Consulting LLP",  type: "Management Fee",  description: "Q4 2025 group management charge",      amount: 42000,  status: "Settled" },
      { date: "30 Nov 2025", counterparty: "Orbas US Inc.",         type: "IP Royalty",      description: "Software licence royalty – Nov 2025",   amount: 16900,  status: "Settled" },
    ],
  },
  "ent-02": {
    name: "Orbas Consulting LLP", type: "Partnership", companyNo: "OC418823",
    vatNo: "GB 407 2219 88", status: "Active", currency: "GBP", country: "United Kingdom",
    incorporated: "03 Sep 2019",
    address: "22 King Street, Suite 8", city: "Manchester", postcode: "M2 6AQ",
    directors: [
      { name: "James A. Wilson", role: "Designated Member", appointed: "03 Sep 2019" },
      { name: "Emma R. Brooks",  role: "Designated Member", appointed: "03 Sep 2019" },
    ],
    nextFiling: "03 Sep 2026", lastFiling: "03 Sep 2025", sicCode: "70229 – Management consultancy activities",
    revenue: 980000, cogs: 210000, opex: 430000, ebit: 340000, tax: 0,
    interEntity: [
      { date: "31 Mar 2026", counterparty: "Orbas Technologies Ltd", type: "Management Fee", description: "Q1 2026 management fee received", amount: -45000, status: "Settled" },
      { date: "31 Dec 2025", counterparty: "Orbas Technologies Ltd", type: "Management Fee", description: "Q4 2025 management fee received", amount: -42000, status: "Settled" },
      { date: "30 Sep 2025", counterparty: "Orbas Technologies Ltd", type: "Management Fee", description: "Q3 2025 management fee received", amount: -40000, status: "Settled" },
      { date: "30 Jun 2025", counterparty: "Orbas Technologies Ltd", type: "Management Fee", description: "Q2 2025 management fee received", amount: -38000, status: "Settled" },
      { date: "31 Mar 2025", counterparty: "Orbas Technologies Ltd", type: "Management Fee", description: "Q1 2025 management fee received", amount: -36000, status: "Settled" },
    ],
  },
}

const DEFAULT_ENTITY = ENTITIES["ent-01"]

function StatusBadge({ status }: { status: string }) {
  if (status === "Active") return (
    <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>Active</span>
  )
  return (
    <span style={{ backgroundColor: "#f3f4f6", color: "#6b7280", padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>Inactive</span>
  )
}

export default function EntityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const entity = ENTITIES[id] ?? DEFAULT_ENTITY
  const [tab, setTab] = useState("overview")

  const gp = entity.revenue - entity.cogs
  const net = entity.ebit - entity.tax
  const gpPct = entity.revenue > 0 ? ((gp / entity.revenue) * 100).toFixed(1) : "0"
  const ebitPct = entity.revenue > 0 ? ((entity.ebit / entity.revenue) * 100).toFixed(1) : "0"

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 flex-wrap">
        <Link href="/app/accounting/entities">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> Entities
          </Button>
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "var(--primary)", color: "#fff" }}>
            {entity.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{entity.name}</h1>
          <StatusBadge status={entity.status} />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList style={{ background: "var(--muted)" }}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Building2 size={15} /> Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Entity Type",      value: entity.type },
                  { label: "Company Number",   value: entity.companyNo },
                  { label: "VAT Number",       value: entity.vatNo },
                  { label: "SIC Code",         value: entity.sicCode },
                  { label: "Incorporated",     value: entity.incorporated },
                  { label: "Country",          value: entity.country },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-start gap-4">
                    <span style={{ color: "var(--muted-foreground)" }}>{r.label}</span>
                    <span className="font-medium text-right">{r.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin size={15} /> Registered Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="font-medium">{entity.address}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{entity.city}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{entity.postcode}</p>
                <p style={{ color: "var(--muted-foreground)" }}>{entity.country}</p>
              </CardContent>
            </Card>

            <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users size={15} /> Directors / Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {entity.directors.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                      {d.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{d.role} · Appointed {d.appointed}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calendar size={15} /> Filing Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Last Annual Filing",     value: entity.lastFiling },
                  { label: "Next Annual Filing Due", value: entity.nextFiling },
                  { label: "Tax Reference Period",   value: "6 Apr – 5 Apr" },
                  { label: "Accounting Period End",  value: "31 March" },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>{r.label}</span>
                    <span className="font-medium">{r.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials" className="space-y-5 mt-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Revenue",   value: entity.revenue,        color: "#16a34a" },
              { label: "COGS",      value: entity.cogs,           color: "#dc2626" },
              { label: "Gross Profit", value: gp,                 color: gp >= 0 ? "#16a34a" : "#dc2626", sub: `${gpPct}% margin` },
              { label: "EBIT",      value: entity.ebit,           color: "#1a56db", sub: `${ebitPct}% margin` },
              { label: "Net Profit", value: net,                  color: net >= 0 ? "#16a34a" : "#dc2626" },
            ].map(s => (
              <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <CardContent className="p-4">
                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                  <p className="text-lg font-bold mt-1" style={{ color: s.color }}>{formatCurrency(s.value)}</p>
                  {s.sub && <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.sub}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Profit & Loss Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Revenue",            value: entity.revenue,      indent: 0, bold: false },
                    { label: "Cost of Sales",       value: -entity.cogs,       indent: 1, bold: false },
                    { label: "Gross Profit",        value: gp,                 indent: 0, bold: true  },
                    { label: "Operating Expenses",  value: -entity.opex,       indent: 1, bold: false },
                    { label: "EBIT",                value: entity.ebit,        indent: 0, bold: true  },
                    { label: "Corporation Tax",     value: -entity.tax,        indent: 1, bold: false },
                    { label: "Net Profit",          value: net,                indent: 0, bold: true  },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: r.bold ? "var(--muted)" : undefined }}>
                      <td className="px-4 py-2.5 text-sm" style={{ paddingLeft: r.indent ? 32 : 16, fontWeight: r.bold ? 600 : 400 }}>{r.label}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-semibold" style={{ color: r.value >= 0 ? "var(--foreground)" : "#dc2626" }}>
                        {formatCurrency(r.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-5 mt-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ArrowLeftRight size={15} /> Inter-Entity Transactions
                </CardTitle>
                <Button variant="outline" size="sm">Add Transaction</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                    {["Date", "Counterparty", "Type", "Description", "Amount", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {entity.interEntity.map((t, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="px-4 py-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{t.date}</td>
                      <td className="px-4 py-2.5 text-xs font-medium">{t.counterparty}</td>
                      <td className="px-4 py-2.5 text-xs">{t.type}</td>
                      <td className="px-4 py-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{t.description}</td>
                      <td className="px-4 py-2.5 text-xs font-bold" style={{ color: t.amount >= 0 ? "#16a34a" : "#dc2626" }}>
                        {formatCurrency(Math.abs(t.amount))}
                      </td>
                      <td className="px-4 py-2.5">
                        <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 500 }}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-5 mt-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Globe size={15} /> Currency &amp; Localisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Base Currency", value: entity.currency },
                  { label: "Country",       value: entity.country },
                  { label: "Tax Regime",    value: "UK Corporation Tax" },
                  { label: "VAT Scheme",    value: "Standard (Quarterly)" },
                  { label: "FY Start",      value: "1 April" },
                  { label: "FY End",        value: "31 March" },
                ].map(f => (
                  <div key={f.label} className="space-y-1">
                    <label className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{f.label}</label>
                    <Input
                      defaultValue={f.value}
                      disabled
                      className="text-sm"
                      style={{ background: "var(--muted)", border: "1px solid var(--border)", opacity: 0.8 }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Entity settings are managed by your accountant. Contact support to request changes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
