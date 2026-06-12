"use client"

import React from "react"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const volumeByChannel = [
  { channel: "Email",    volume: 312, response: 2.1, resolution: 85, csat: 4.6 },
  { channel: "Live Chat", volume: 198, response: 0.5, resolution: 91, csat: 4.8 },
  { channel: "Twitter",  volume: 87,  response: 1.2, resolution: 72, csat: 4.3 },
  { channel: "WhatsApp", volume: 143, response: 0.8, resolution: 88, csat: 4.7 },
  { channel: "Facebook", volume: 64,  response: 1.9, resolution: 78, csat: 4.4 },
  { channel: "SMS",      volume: 52,  response: 0.3, resolution: 94, csat: 4.9 },
]

const volumeChartData = [
  { channel: "Email",     volume: 312 },
  { channel: "Live Chat", volume: 198 },
  { channel: "WhatsApp",  volume: 143 },
  { channel: "Twitter",   volume: 87 },
  { channel: "Facebook",  volume: 64 },
  { channel: "SMS",       volume: 52 },
]

const responseTimeTrend = [
  { week: "W1 May", email: 2.8, chat: 0.6, social: 1.5 },
  { week: "W2 May", email: 2.5, chat: 0.5, social: 1.4 },
  { week: "W3 May", email: 2.3, chat: 0.6, social: 1.6 },
  { week: "W4 May", email: 2.0, chat: 0.4, social: 1.3 },
  { week: "W1 Jun", email: 2.2, chat: 0.5, social: 1.2 },
  { week: "W2 Jun", email: 2.1, chat: 0.5, social: 1.2 },
]

const csatByChannel = [
  { channel: "Email",     score: 4.6 },
  { channel: "Live Chat", score: 4.8 },
  { channel: "WhatsApp",  score: 4.7 },
  { channel: "Twitter",   score: 4.3 },
  { channel: "Facebook",  score: 4.4 },
  { channel: "SMS",       score: 4.9 },
]

const CHANNEL_COLORS: Record<string, string> = {
  Email: "#1a56db",
  "Live Chat": "#16a34a",
  WhatsApp: "#25d366",
  Twitter: "#1da1f2",
  Facebook: "#1877f2",
  SMS: "#06b6d4",
}

export default function ConnectReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Connect Reports</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Channel performance and messaging analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Messages",     value: "856",  change: "+14%", color: "#1a56db" },
          { label: "Avg Response Time",  value: "1.2h", change: "-18%", color: "#16a34a" },
          { label: "Resolution Rate",    value: "86%",  change: "+3%",  color: "#16a34a" },
          { label: "Avg CSAT Score",     value: "4.6",  change: "+0.2", color: "#d97706" },
        ].map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{k.value}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: k.change.startsWith("+") ? "#16a34a" : "#dc2626" }}>{k.change} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Volume by Channel */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Volume by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={volumeChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="channel" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="volume" radius={[4, 4, 0, 0]} fill="#1a56db" name="Messages" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trend */}
        <Card className="border border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Response Time Trend (hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={responseTimeTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="email" stroke="#1a56db" strokeWidth={2} dot={false} name="Email" />
                <Line type="monotone" dataKey="chat" stroke="#16a34a" strokeWidth={2} dot={false} name="Live Chat" />
                <Line type="monotone" dataKey="social" stroke="#d97706" strokeWidth={2} dot={false} name="Social" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance Table */}
      <Card className="border border-[var(--border)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Channel Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Channel</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Volume</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Avg Response</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">Resolution Rate</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--muted-foreground)]">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {volumeByChannel.map(ch => (
                <tr key={ch.channel} className="hover:bg-[var(--secondary)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: CHANNEL_COLORS[ch.channel] ?? "#6b7280" }} />
                      <span className="font-medium text-[var(--foreground)]">{ch.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-[var(--foreground)]">{ch.volume}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-[var(--foreground)]">{ch.response}h</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 rounded-full overflow-hidden" style={{ background: "var(--secondary)", height: 6 }}>
                        <div className="h-full rounded-full" style={{ width: `${ch.resolution}%`, background: ch.resolution >= 85 ? "#16a34a" : "#d97706" }} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--foreground)]">{ch.resolution}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold" style={{ color: "#d97706" }}>{ch.csat}</span>
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
