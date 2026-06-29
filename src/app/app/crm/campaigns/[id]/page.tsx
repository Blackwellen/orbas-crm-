"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Play, Pause, Copy, Archive, Trash2,
  Mail, Users, BarChart2, TrendingUp, Target, DollarSign,
  Plus, Eye, EyeOff, MousePointer, ArrowUpRight
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, FunnelChart, Funnel, LabelList
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, formatCurrency, formatDate, getInitials } from "@/lib/utils"

const CAMPAIGN = {
  id: "c1",
  name: "Q3 Enterprise Nurture Series",
  type: "Email",
  status: "Active",
  startDate: "2026-06-01",
  endDate: "2026-08-31",
  owner: "Alex Turner",
  description: "12-email nurture sequence targeting enterprise decision-makers in financial services and technology sectors. Goal: generate 150 qualified leads and £200K pipeline.",
  budget: 3000,
  spent: 2400,
  leadsGenerated: 142,
  leadsTarget: 150,
  conversionRate: 3.4,
  openRate: 41.2,
  clickRate: 8.7,
  unsubscribeRate: 0.4,
  revenue: 185000,
  revenueTarget: 200000,
  contacts: 4180,
  audience: "Enterprise financial services & tech companies (200+ employees, UK)",
}

const LEADS = [
  { id: "l1", name: "James Whitfield",    company: "Fintech Corp Ltd",    source: "Email Step 3", date: "2026-06-08", status: "Qualified" },
  { id: "l2", name: "Rachel Simmons",     company: "Barclays PLC",        source: "Email Step 1", date: "2026-06-05", status: "Contacted" },
  { id: "l3", name: "David Chen",         company: "HSBC Holdings",       source: "Email Step 4", date: "2026-06-10", status: "New" },
  { id: "l4", name: "Priya Patel",        company: "Lloyds Banking Group", source: "Email Step 2", date: "2026-06-07", status: "Qualified" },
  { id: "l5", name: "Oliver Thompson",    company: "Sky Group",           source: "Email Step 3", date: "2026-06-09", status: "New" },
  { id: "l6", name: "Emma Wilson",        company: "Vodafone UK",         source: "Email Step 1", date: "2026-06-03", status: "Contacted" },
]

const EMAILS = [
  { step: 1, subject: "Introducing Orbas CRM — Built for Enterprise",     sent: 4180, opens: 1726, clicks: 364, date: "2026-06-01" },
  { step: 2, subject: "How Fintech Leaders Cut Sales Cycles by 40%",      sent: 3840, opens: 1613, clicks: 321, date: "2026-06-05" },
  { step: 3, subject: "3 CRM Mistakes That Cost Sales Teams £50K/Year",   sent: 3520, opens: 1552, clicks: 298, date: "2026-06-09" },
  { step: 4, subject: "Case Study: Barclays 3x'd Pipeline in 6 Months",   sent: 3280, opens: 1361, clicks: 246, date: "2026-06-13" },
]

const FUNNEL_DATA = [
  { name: "Emails Sent", value: 4180, fill: "#1a56db" },
  { name: "Opened", value: 1726, fill: "#6366f1" },
  { name: "Clicked", value: 364, fill: "#06b6d4" },
  { name: "Landing Page", value: 218, fill: "#10b981" },
  { name: "Leads", value: 142, fill: "#f59e0b" },
]

const ENGAGEMENT_DATA = [
  { date: "Jun 1", opens: 412, clicks: 87 },
  { date: "Jun 3", opens: 298, clicks: 61 },
  { date: "Jun 5", opens: 384, clicks: 76 },
  { date: "Jun 7", opens: 267, clicks: 55 },
  { date: "Jun 9", opens: 421, clicks: 91 },
  { date: "Jun 11", opens: 195, clicks: 38 },
]

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-violet-100 text-violet-700",
  Converted: "bg-emerald-100 text-emerald-700",
}

export default function CampaignDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "overview"

  function setTab(tab: string) {
    router.push(`/app/crm/campaigns/${params.id}?tab=${tab}`, { scroll: false })
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "leads", label: "Leads" },
    { key: "emails", label: "Emails" },
    { key: "analytics", label: "Analytics" },
    { key: "settings", label: "Settings" },
  ]

  const budgetPct = Math.round((CAMPAIGN.spent / CAMPAIGN.budget) * 100)
  const leadPct = Math.round((CAMPAIGN.leadsGenerated / CAMPAIGN.leadsTarget) * 100)
  const revenuePct = Math.round((CAMPAIGN.revenue / CAMPAIGN.revenueTarget) * 100)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/campaigns"><ChevronLeft className="h-4 w-4 mr-1" />Back to Campaigns</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <Mail className="h-7 w-7 text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl font-bold text-[var(--foreground)]">{CAMPAIGN.name}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                  {CAMPAIGN.status}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  {CAMPAIGN.type}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Owned by {CAMPAIGN.owner} · {formatDate(CAMPAIGN.startDate)} → {formatDate(CAMPAIGN.endDate)}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{CAMPAIGN.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />Edit
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Pause className="h-3.5 w-3.5 mr-1.5" />Pause
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Copy className="h-3.5 w-3.5 mr-1.5" />Duplicate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6">
        <div className="max-w-[1400px] mx-auto flex gap-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === t.key
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-4">

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Leads Generated", value: `${CAMPAIGN.leadsGenerated} / ${CAMPAIGN.leadsTarget}`, pct: leadPct, icon: Users, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
                { label: "Open Rate", value: `${CAMPAIGN.openRate}%`, pct: null, icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Click Rate", value: `${CAMPAIGN.clickRate}%`, pct: null, icon: MousePointer, color: "text-violet-600", bg: "bg-violet-50" },
                { label: "Pipeline Generated", value: formatCurrency(CAMPAIGN.revenue), pct: revenuePct, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
              ].map(m => (
                <Card key={m.label} className="border border-[var(--border)]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn("p-2 rounded-lg", m.bg)}>
                        <m.icon className={cn("h-4 w-4", m.color)} />
                      </div>
                      {m.pct !== null && <span className="text-xs text-[var(--muted-foreground)]">{m.pct}%</span>}
                    </div>
                    <p className="text-lg font-bold text-[var(--foreground)]">{m.value}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{m.label}</p>
                    {m.pct !== null && <Progress value={m.pct} className="mt-2 h-1" />}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Budget & Spend</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1">
                      <span>Budget Used</span>
                      <span>{formatCurrency(CAMPAIGN.spent)} of {formatCurrency(CAMPAIGN.budget)}</span>
                    </div>
                    <Progress value={budgetPct} className="h-2" />
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{budgetPct}% of budget utilised</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Cost per Lead</p>
                      <p className="text-lg font-bold text-[var(--foreground)]">{formatCurrency(Math.round(CAMPAIGN.spent / CAMPAIGN.leadsGenerated))}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">ROI</p>
                      <p className="text-lg font-bold text-emerald-600">7,608%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Target Audience</p>
                      <p className="text-xs text-[var(--foreground)]">{CAMPAIGN.contacts.toLocaleString()} contacts</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">Conversion Rate</p>
                      <p className="text-lg font-bold text-[var(--foreground)]">{CAMPAIGN.conversionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Audience Segment</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-[var(--muted)] rounded-lg">
                    <p className="text-xs font-medium text-[var(--foreground)] mb-1">Target Definition</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{CAMPAIGN.audience}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Total Contacts", value: "4,180" },
                      { label: "Unsubscribed", value: `${CAMPAIGN.unsubscribeRate}%` },
                      { label: "Emails Sent", value: "16,820" },
                    ].map(f => (
                      <div key={f.label} className="text-center p-2 bg-[var(--muted)] rounded-md">
                        <p className="text-base font-bold text-[var(--foreground)]">{f.value}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{f.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Leads */}
        {activeTab === "leads" && (
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Leads Generated ({CAMPAIGN.leadsGenerated})</CardTitle>
              <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Lead</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Name", "Company", "Source", "Date", "Status"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {LEADS.map(l => (
                    <tr key={l.id} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(l.name)}</AvatarFallback>
                          </Avatar>
                          <Link href={`/app/crm/leads/${l.id}`} className="font-medium text-[var(--primary)] hover:underline">{l.name}</Link>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{l.company}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{l.source}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(l.date)}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[l.status])}>{l.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Emails */}
        {activeTab === "emails" && (
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Email Sequence Performance</CardTitle>
              <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Step</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Step", "Subject", "Sent Date", "Sent", "Opens", "Open Rate", "Clicks", "Click Rate"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {EMAILS.map(e => (
                    <tr key={e.step} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3">
                        <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold flex items-center justify-center">{e.step}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-sm max-w-xs truncate">{e.subject}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(e.date)}</td>
                      <td className="px-4 py-3 text-sm font-medium">{e.sent.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{e.opens.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold text-emerald-600">{((e.opens / e.sent) * 100).toFixed(1)}%</span>
                      </td>
                      <td className="px-4 py-3 text-sm">{e.clicks.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold text-[var(--accent)]">{((e.clicks / e.sent) * 100).toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            {/* Engagement Chart */}
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Daily Engagement</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={ENGAGEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="opens" stroke="var(--primary)" strokeWidth={2} dot={false} name="Opens" />
                    <Line type="monotone" dataKey="clicks" stroke="var(--accent)" strokeWidth={2} dot={false} name="Clicks" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Conversion Funnel</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {FUNNEL_DATA.map((step, i) => {
                    const pct = i === 0 ? 100 : Math.round((step.value / FUNNEL_DATA[0].value) * 100)
                    return (
                      <div key={step.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--foreground)] font-medium">{step.name}</span>
                          <span className="text-[var(--muted-foreground)]">{step.value.toLocaleString()} ({pct}%)</span>
                        </div>
                        <div className="bg-[var(--muted)] rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: step.fill }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Email Performance Bar Chart */}
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Email Step Performance</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={EMAILS} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="step" tick={{ fontSize: 11 }} tickFormatter={v => `Step ${v}`} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="opens" fill="var(--primary)" name="Opens" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicks" fill="var(--accent)" name="Clicks" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Campaign Settings</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Campaign Name", value: CAMPAIGN.name },
                  { label: "Type", value: CAMPAIGN.type },
                  { label: "Owner", value: CAMPAIGN.owner },
                  { label: "Start Date", value: CAMPAIGN.startDate },
                  { label: "End Date", value: CAMPAIGN.endDate },
                  { label: "Budget", value: formatCurrency(CAMPAIGN.budget) },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">{f.label}</p>
                    <p className="text-sm text-[var(--foreground)]">{f.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Danger Zone</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-xs h-9 text-amber-600 border-amber-200">
                  <Pause className="h-3.5 w-3.5 mr-2" />Pause Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-9">
                  <Copy className="h-3.5 w-3.5 mr-2" />Duplicate Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-9 text-red-600 border-red-200 hover:bg-red-50">
                  <Archive className="h-3.5 w-3.5 mr-2" />Archive Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-9 text-red-700 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5 mr-2" />Delete Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
