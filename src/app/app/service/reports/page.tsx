"use client"

import React, { useState } from "react"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { TrendingUp, Clock, Star, BookOpen, Users, AlertTriangle, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ticketVolume = [
  { week: "W1 May", opened: 62, resolved: 58 },
  { week: "W2 May", opened: 74, resolved: 70 },
  { week: "W3 May", opened: 68, resolved: 65 },
  { week: "W4 May", opened: 81, resolved: 77 },
  { week: "W1 Jun", opened: 77, resolved: 72 },
  { week: "W2 Jun", opened: 84, resolved: 78 },
]

const firstResponseTime = [
  { day: "Mon", hours: 1.4 },
  { day: "Tue", hours: 1.7 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 1.9 },
  { day: "Fri", hours: 2.4 },
  { day: "Sat", hours: 3.1 },
  { day: "Sun", hours: 2.8 },
]

const slaCompliance = [
  { name: "Compliant", value: 94, color: "#16a34a" },
  { name: "Breached",  value: 6,  color: "#dc2626" },
]

const agentPerformance = [
  { name: "Priya Mehta",   resolved: 47, csat: 4.9, avgResolution: "3.2h", firstResponse: "0.8h" },
  { name: "James Hartley", resolved: 43, csat: 4.7, avgResolution: "4.1h", firstResponse: "1.1h" },
  { name: "Sara Collins",  resolved: 38, csat: 4.8, avgResolution: "3.7h", firstResponse: "0.9h" },
  { name: "Tom Okafor",    resolved: 35, csat: 4.6, avgResolution: "4.8h", firstResponse: "1.4h" },
  { name: "Ellie Brooks",  resolved: 29, csat: 4.5, avgResolution: "5.1h", firstResponse: "1.6h" },
]

const csatTrend = [
  { month: "Jan", score: 4.4 },
  { month: "Feb", score: 4.5 },
  { month: "Mar", score: 4.6 },
  { month: "Apr", score: 4.5 },
  { month: "May", score: 4.7 },
  { month: "Jun", score: 4.8 },
]

const kbArticlePerf = [
  { title: "Reset 2FA",            views: 4821, helpful: 94 },
  { title: "SAML SSO Setup",       views: 3104, helpful: 88 },
  { title: "Monthly Invoice",      views: 2874, helpful: 91 },
  { title: "Slack Integration",    views: 2211, helpful: 87 },
  { title: "Mobile App Guide",     views: 1998, helpful: 90 },
]

const KPIS = [
  { label: "Tickets This Month", value: "313", change: "+8%", color: "#1a56db", icon: TrendingUp },
  { label: "Avg First Response",  value: "1.8h", change: "-12%", color: "#16a34a", icon: Clock },
  { label: "Avg Resolution",      value: "5.4h", change: "-7%", color: "#d97706", icon: Clock },
  { label: "SLA Compliance",      value: "94%", change: "+2%", color: "#16a34a", icon: AlertTriangle },
  { label: "CSAT Score",          value: "4.8", change: "+0.1", color: "#d97706", icon: Star },
  { label: "KB Deflection Rate",  value: "31%", change: "+4%", color: "#06b6d4", icon: BookOpen },
]

const REPORT_TABS = ["Overview", "Tickets", "SLA", "Agents", "CSAT", "Knowledge Base"]

export default function ServiceReportsPage() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [dateRange, setDateRange] = useState("This Month")

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Service Reports</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Performance analytics across all service channels</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-1 overflow-x-auto">
          {REPORT_TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {KPIS.map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <k.icon className="h-4 w-4" style={{ color: k.color }} />
                <span className="text-xs font-medium" style={{ color: k.change.startsWith("+") ? "#16a34a" : "#dc2626" }}>{k.change}</span>
              </div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Ticket Volume */}
        <Card className="border border-[var(--border)] lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ticket Volume — Opened vs Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ticketVolume} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="opened" stroke="#1a56db" strokeWidth={2} dot={{ r: 3 }} name="Opened" />
                <Line type="monotone" dataKey="resolved" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SLA Compliance Donut */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={slaCompliance} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {slaCompliance.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {slaCompliance.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-[var(--muted-foreground)]">{d.name}</span>
                  <span className="text-sm font-bold text-[var(--foreground)] ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* First Response Time */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Avg First Response Time (hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={firstResponseTime} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="hours" fill="#1a56db" radius={[4, 4, 0, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CSAT Trend */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">CSAT Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={csatTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis domain={[4, 5]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="#d97706" strokeWidth={2} dot={{ r: 4, fill: "#d97706" }} name="CSAT" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Agent Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Agent</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Resolved</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">CSAT</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Avg Resolution</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">First Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {agentPerformance.map(a => (
                <tr key={a.name} className="hover:bg-[var(--secondary)]">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{a.name}</td>
                  <td className="px-4 py-3 text-right text-[var(--foreground)]">{a.resolved}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="flex items-center justify-end gap-1 font-semibold" style={{ color: "#d97706" }}>
                      <Star className="h-3 w-3 fill-current" /> {a.csat}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-[var(--foreground)]">{a.avgResolution}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-[var(--foreground)]">{a.firstResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* KB Article Performance */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Top KB Articles by Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Article</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Views</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Helpful %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {kbArticlePerf.map(a => (
                <tr key={a.title} className="hover:bg-[var(--secondary)]">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{a.title}</td>
                  <td className="px-4 py-3 text-right text-[var(--foreground)]">{a.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 rounded-full overflow-hidden" style={{ background: "var(--secondary)", height: 6 }}>
                        <div className="h-full rounded-full" style={{ width: `${a.helpful}%`, background: "#16a34a" }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "#16a34a" }}>{a.helpful}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
