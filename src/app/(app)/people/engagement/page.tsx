"use client"

import React, { useState } from "react"
import { Plus, TrendingUp, TrendingDown, Heart, Star, MessageSquare } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Overview", "Surveys", "Recognition", "Feedback", "Analytics"]

const eNPSTrend = [
  { month: "Jan", score: 28 },
  { month: "Feb", score: 31 },
  { month: "Mar", score: 35 },
  { month: "Apr", score: 33 },
  { month: "May", score: 39 },
  { month: "Jun", score: 42 },
]

const surveys = [
  { id: "S001", name: "June 2026 Pulse Survey",      sent: 167, responses: 138, score: 4.1, date: "5 Jun 2026",   status: "Closed" },
  { id: "S002", name: "Q2 Engagement Deep Dive",     sent: 167, responses: 149, score: 3.9, date: "1 May 2026",   status: "Closed" },
  { id: "S003", name: "May 2026 Pulse Survey",       sent: 163, responses: 122, score: 3.8, date: "5 May 2026",   status: "Closed" },
  { id: "S004", name: "Onboarding Experience Survey",sent: 8,   responses: 7,   score: 4.4, date: "15 May 2026",  status: "Closed" },
  { id: "S005", name: "Benefits Satisfaction Survey",sent: 167, responses: 98,  score: 3.6, date: "10 Apr 2026",  status: "Closed" },
  { id: "S006", name: "July 2026 Pulse Survey",      sent: 0,   responses: 0,   score: null,date: "5 Jul 2026",   status: "Scheduled" },
  { id: "S007", name: "Annual eNPS 2026",            sent: 0,   responses: 0,   score: null,date: "1 Sep 2026",   status: "Scheduled" },
]

const recognitions = [
  { from: "James Park",        to: "Alex Thompson",    message: "Outstanding work on the API v2 launch — delivered ahead of schedule!", date: "9 Jun 2026", badge: "🏆" },
  { from: "Yasmin Okafor",     to: "Sophie Clarke",    message: "Brilliant execution on the summer campaign. Creative and on-brand.", date: "8 Jun 2026", badge: "⭐" },
  { from: "Marcus Williams",   to: "Noah Campbell",    message: "Closed the FinTech partnership deal single-handedly. Incredible persistence!", date: "7 Jun 2026", badge: "🚀" },
  { from: "Emma Thornton",     to: "Priya Sharma",     message: "The new L&D programme launch was flawless. So proud of this achievement.", date: "6 Jun 2026", badge: "💡" },
  { from: "Alex Thompson",     to: "Lena Cruz",        message: "Lena's design system work has transformed developer experience. Huge impact.", date: "5 Jun 2026", badge: "🎨" },
  { from: "Harriet Stone",     to: "Oliver Hughes",    message: "Completed the IFRS 16 compliance project well ahead of deadline.", date: "4 Jun 2026", badge: "✅" },
  { from: "Katherine Moss",    to: "Marcus Williams",  message: "Phenomenal Q2 results. The team is grateful for your leadership.", date: "3 Jun 2026", badge: "👑" },
  { from: "Grace Bennett",     to: "Niamh Kelly",      message: "Saved us 2 hours on month-end close with the new reconciliation template!", date: "2 Jun 2026", badge: "⚡" },
  { from: "Ryan Thompson",     to: "Katie Walsh",      message: "Katie's supplier portal initiative is already saving us 10% on procurement.", date: "1 Jun 2026", badge: "💪" },
  { from: "Ravi Patel",        to: "Fatima Al-Zahra", message: "The deployment pipeline changes have made our lives so much better. Thank you!", date: "31 May 2026", badge: "🙏" },
]

const feedback = [
  { theme: "Work-Life Balance",      sentiment: "Positive", count: 48, sample: "Flexible working arrangements are excellent" },
  { theme: "Management Support",     sentiment: "Positive", count: 35, sample: "Managers are approachable and supportive" },
  { theme: "Career Development",     sentiment: "Mixed",    count: 29, sample: "Would like more clear promotion pathways" },
  { theme: "Compensation",           sentiment: "Mixed",    count: 41, sample: "Salaries competitive but bonus targets unclear" },
  { theme: "Office Environment",     sentiment: "Positive", count: 22, sample: "New office space is fantastic" },
  { theme: "Communication",         sentiment: "Negative",  count: 18, sample: "All-hands updates could be more frequent" },
]

const sentimentColor: Record<string, string> = {
  Positive: "#10b981",
  Mixed:    "#f59e0b",
  Negative: "#ef4444",
}

export default function EngagementPage() {
  const [tab, setTab] = useState("Overview")
  const currenteNPS = eNPSTrend[eNPSTrend.length - 1].score
  const prevENPS = eNPSTrend[eNPSTrend.length - 2].score
  const eNPSUp = currenteNPS > prevENPS

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Engagement</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Employee engagement, surveys, recognition & feedback</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />Create Survey
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)]">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
            tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}>{t}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "Overview" && (
        <div className="space-y-5">
          {/* eNPS Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-xl border-2 border-[#10b981]/30 bg-[#10b981]/5 p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-1">eNPS Score</p>
              <p className="text-7xl font-black" style={{ color: "#10b981" }}>{currenteNPS}</p>
              <div className="flex items-center gap-1 mt-2">
                {eNPSUp ? <TrendingUp className="h-4 w-4" style={{ color: "#10b981" }} /> : <TrendingDown className="h-4 w-4" style={{ color: "#ef4444" }} />}
                <span className="text-sm font-medium" style={{ color: eNPSUp ? "#10b981" : "#ef4444" }}>
                  {eNPSUp ? "+" : ""}{currenteNPS - prevENPS} vs last month
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-2">Based on June 2026 pulse survey (83% response rate)</p>
            </div>

            <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">eNPS Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={eNPSTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Response Rate",      value: "83%",   icon: MessageSquare, color: "var(--primary)" },
              { label: "Recognitions Sent",  value: "148",   icon: Heart,         color: "#ec4899" },
              { label: "Open Surveys",       value: "0",     icon: Star,          color: "#f59e0b" },
              { label: "Scheduled Surveys",  value: "2",     icon: Star,          color: "#8b5cf6" },
            ].map(k => (
              <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-4">
                <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${k.color}18` }}>
                  <k.icon className="h-5 w-5" style={{ color: k.color }} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Recognitions Preview */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Recognitions</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {recognitions.slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className="text-xl mt-0.5">{r.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--foreground)]">
                      <strong>{r.from}</strong> <span className="text-[var(--muted-foreground)]">recognised</span> <strong>{r.to}</strong>
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5 truncate">{r.message}</p>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] whitespace-nowrap">{r.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Surveys Tab */}
      {tab === "Surveys" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Survey Name", "Sent", "Responses", "Response Rate", "Avg Score", "Date", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {surveys.map(s => (
                <tr key={s.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{s.name}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{s.sent}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{s.responses}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{s.sent > 0 ? `${Math.round((s.responses / s.sent) * 100)}%` : "—"}</td>
                  <td className="px-4 py-3">
                    {s.score ? <span className="text-sm font-bold" style={{ color: s.score >= 4 ? "#10b981" : s.score >= 3.5 ? "var(--primary)" : "#f59e0b" }}>{s.score}/5</span> : <span className="text-xs text-[var(--muted-foreground)]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{s.date}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      s.status === "Closed"     ? "bg-[var(--muted)] text-[var(--muted-foreground)]" :
                      s.status === "Scheduled"  ? "bg-[#f59e0b]/10 text-[#f59e0b]" :
                      "bg-[var(--primary)]/10 text-[var(--primary)]"
                    )}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recognition Feed */}
      {tab === "Recognition" && (
        <div className="space-y-3">
          {recognitions.map((r, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{r.badge}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(r.from)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{r.from}</span>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">recognised</span>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px]" style={{ background: "#10b981", color: "white" }}>{getInitials(r.to)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{r.to}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--foreground)] mt-1.5 leading-relaxed">{r.message}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Tab */}
      {tab === "Feedback" && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted-foreground)]">Anonymous feedback themes from latest survey · 138 respondents</p>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Theme", "Sentiment", "Mentions", "Sample Comment"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {feedback.map((f, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{f.theme}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${sentimentColor[f.sentiment]}18`, color: sentimentColor[f.sentiment] }}>{f.sentiment}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">{f.count}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] italic">"{f.sample}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "Analytics" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Current eNPS",        value: "42",   sub: "+3 vs last month" },
            { label: "Promoters",           value: "61%",  sub: "Score 9–10" },
            { label: "Passives",            value: "26%",  sub: "Score 7–8" },
            { label: "Detractors",          value: "13%",  sub: "Score 0–6" },
            { label: "Avg Survey Score",    value: "3.9/5",sub: "June 2026" },
            { label: "Recognitions (YTD)",  value: "842",  sub: "Average 5 per employee" },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{s.sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
