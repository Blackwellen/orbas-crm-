"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, Plus, Clock, Upload, Settings,
  Users, FileText, DollarSign, Kanban, ChevronRight,
  AlertCircle, CheckCircle2, Calendar, BarChart2
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"

const PROJECT = {
  id: "1",
  name: "Orbas Platform Rebuild",
  client: "Orbas Ltd",
  pm: "Sarah Kim",
  pmInitials: "SK",
  start: "2025-01-15",
  end: "2025-09-30",
  status: "Active",
  risk: "Medium",
  budget: 120000,
  spent: 84200,
  progress: 72,
  description: "Full rebuild of the Orbas CRM platform using Next.js 16 and Supabase, replacing the legacy monolith with a modular microservices architecture.",
  billingType: "Fixed Price",
}

const MILESTONES = [
  { id: "m1", name: "Design System Approved",   date: "2025-02-15", status: "Completed" },
  { id: "m2", name: "Backend API v1 Released",  date: "2025-04-30", status: "Completed" },
  { id: "m3", name: "Beta Launch",              date: "2025-07-15", status: "In Progress" },
  { id: "m4", name: "UAT Sign-off",             date: "2025-08-30", status: "Upcoming" },
  { id: "m5", name: "Go Live",                  date: "2025-09-30", status: "Upcoming" },
]

const ACTIVITY = [
  { id: 1, user: "SK", action: "Updated project timeline",        time: "2h ago" },
  { id: 2, user: "JR", action: "Merged PR #204 — Auth module",   time: "4h ago" },
  { id: 3, user: "LC", action: "Completed task: Design tokens",   time: "6h ago" },
  { id: 4, user: "AT", action: "Added comment on Budget section", time: "1d ago" },
  { id: 5, user: "SK", action: "Approved milestone: Backend API", time: "2d ago" },
]

type KanbanCol = "To Do" | "In Progress" | "In Review" | "Done"
const TASKS: { id: string; title: string; assignee: string; due: string; priority: "High" | "Medium" | "Low"; col: KanbanCol }[] = [
  { id: "t1",  title: "Setup CI/CD pipeline",         assignee: "AT", due: "2025-07-10", priority: "High",   col: "Done" },
  { id: "t2",  title: "Auth module unit tests",        assignee: "JR", due: "2025-07-12", priority: "Medium", col: "Done" },
  { id: "t3",  title: "API rate limiting",             assignee: "SK", due: "2025-07-15", priority: "High",   col: "In Review" },
  { id: "t4",  title: "Dashboard redesign",            assignee: "LC", due: "2025-07-20", priority: "Medium", col: "In Review" },
  { id: "t5",  title: "Mobile responsive layout",     assignee: "LC", due: "2025-07-22", priority: "Low",    col: "In Progress" },
  { id: "t6",  title: "Notification system",          assignee: "AT", due: "2025-07-25", priority: "Medium", col: "In Progress" },
  { id: "t7",  title: "Performance optimisation",     assignee: "JR", due: "2025-07-30", priority: "High",   col: "In Progress" },
  { id: "t8",  title: "Write API docs",               assignee: "SK", due: "2025-08-01", priority: "Low",    col: "To Do" },
  { id: "t9",  title: "Load testing",                 assignee: "AT", due: "2025-08-05", priority: "High",   col: "To Do" },
  { id: "t10", title: "Security audit",               assignee: "JR", due: "2025-08-10", priority: "High",   col: "To Do" },
]

const GANTT_TASKS = [
  { id: "g1", name: "Discovery & Planning",    phase: "Phase 1", start: 0,  end: 8  },
  { id: "g2", name: "Design System",           phase: "Phase 1", start: 4,  end: 14 },
  { id: "g3", name: "Backend API",             phase: "Phase 2", start: 10, end: 22 },
  { id: "g4", name: "Frontend Core",           phase: "Phase 2", start: 14, end: 26 },
  { id: "g5", name: "Auth & Permissions",      phase: "Phase 2", start: 18, end: 24 },
  { id: "g6", name: "Integration Tests",       phase: "Phase 3", start: 22, end: 28 },
  { id: "g7", name: "UAT & QA",                phase: "Phase 3", start: 26, end: 32 },
  { id: "g8", name: "Go-Live Preparation",     phase: "Phase 3", start: 30, end: 36 },
]

const TIME_ENTRIES = [
  { id: "te1", date: "2025-07-01", member: "Sarah Kim",      task: "API rate limiting",        hours: 6.5, billable: true,  status: "Approved",  desc: "Implemented Redis-based rate limiter" },
  { id: "te2", date: "2025-07-01", member: "James Robertson",task: "Auth module tests",        hours: 7.0, billable: true,  status: "Approved",  desc: "Added 48 unit tests" },
  { id: "te3", date: "2025-07-02", member: "Lucy Chen",       task: "Dashboard redesign",      hours: 8.0, billable: true,  status: "Pending",   desc: "Wireframes and Figma prototype" },
  { id: "te4", date: "2025-07-02", member: "Alex Turner",     task: "CI/CD pipeline",          hours: 5.5, billable: false, status: "Approved",  desc: "GitHub Actions configuration" },
  { id: "te5", date: "2025-07-03", member: "Sarah Kim",      task: "Project management",       hours: 2.0, billable: false, status: "Approved",  desc: "Weekly status update" },
  { id: "te6", date: "2025-07-03", member: "James Robertson",task: "Performance optimisation", hours: 6.0, billable: true,  status: "Pending",   desc: "Query optimisation and caching" },
  { id: "te7", date: "2025-07-04", member: "Lucy Chen",       task: "Mobile layout",           hours: 7.5, billable: true,  status: "Pending",   desc: "Responsive breakpoints" },
  { id: "te8", date: "2025-07-05", member: "Alex Turner",     task: "Notification system",     hours: 6.0, billable: true,  status: "Approved",  desc: "WebSocket events" },
]

const BUDGET_BREAKDOWN = [
  { category: "Labour",      budgeted: 80000, actual: 58400, forecast: 78000 },
  { category: "Materials",   budgeted: 12000, actual: 9800,  forecast: 11500 },
  { category: "Expenses",    budgeted: 8000,  actual: 6200,  forecast: 8000  },
  { category: "Contingency", budgeted: 20000, actual: 9800,  forecast: 15000 },
]

const TEAM_MEMBERS = [
  { id: "tm1", name: "Sarah Kim",       role: "Project Manager",   allocation: 50, hoursLogged: 184, costRate: 120, totalCost: 22080 },
  { id: "tm2", name: "James Robertson", role: "Lead Developer",    allocation: 100, hoursLogged: 312, costRate: 95,  totalCost: 29640 },
  { id: "tm3", name: "Lucy Chen",       role: "UX Designer",       allocation: 80, hoursLogged: 248, costRate: 80,  totalCost: 19840 },
  { id: "tm4", name: "Alex Turner",     role: "DevOps Engineer",   allocation: 60, hoursLogged: 156, costRate: 90,  totalCost: 14040 },
  { id: "tm5", name: "Mike Davies",     role: "Backend Developer", allocation: 100, hoursLogged: 290, costRate: 85,  totalCost: 24650 },
  { id: "tm6", name: "Priya Sharma",    role: "QA Engineer",       allocation: 70, hoursLogged: 210, costRate: 70,  totalCost: 14700 },
]

const DOCS = [
  { id: "d1", name: "Project Charter.pdf",           type: "PDF",  uploadedBy: "Sarah Kim",    date: "2025-01-20", size: "1.2 MB" },
  { id: "d2", name: "Technical Spec v2.docx",        type: "Word", uploadedBy: "James Robertson",date: "2025-02-10", size: "3.4 MB" },
  { id: "d3", name: "Design System Figma Export.zip",type: "ZIP",  uploadedBy: "Lucy Chen",    date: "2025-03-05", size: "24 MB" },
  { id: "d4", name: "API Documentation.pdf",         type: "PDF",  uploadedBy: "James Robertson",date: "2025-04-15", size: "2.1 MB" },
  { id: "d5", name: "UAT Test Plan.xlsx",            type: "Excel",uploadedBy: "Mike Davies",  date: "2025-05-20", size: "0.8 MB" },
  { id: "d6", name: "Risk Register.xlsx",            type: "Excel",uploadedBy: "Sarah Kim",    date: "2025-06-01", size: "0.4 MB" },
]

const PRIORITY_STYLE: Record<string, { bg: string; color: string }> = {
  High:   { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
  Medium: { bg: "rgba(245,158,11,0.12)",  color: "#d97706" },
  Low:    { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
}

const MILESTONE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Completed:   { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  "In Progress":{ bg: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "rgba(59,130,246,0.3)"  },
  Upcoming:    { bg: "rgba(107,114,128,0.1)",  color: "#6b7280", border: "rgba(107,114,128,0.3)" },
}

const TABS = ["Overview","Tasks","Gantt","Timesheets","Budget","Team","Documents","Settings"] as const
type Tab = typeof TABS[number]

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [tab, setTab] = useState<Tab>("Overview")

  const TOTAL_WEEKS = 36
  const TODAY_WEEK = 24

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top bar */}
      <div className="border-b px-6 py-4 flex items-center gap-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/app/projects/projects">
          <Button size="sm" variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Projects
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        <h1 className="font-semibold truncate" style={{ color: "var(--foreground)" }}>{PROJECT.name}</h1>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Log Time</Button>
          <Button size="sm" variant="outline" className="gap-2"><Settings className="h-4 w-4" /> Settings</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b px-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2"
              style={{
                borderColor: tab === t ? "var(--primary)" : "transparent",
                color: tab === t ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* OVERVIEW TAB */}
        {tab === "Overview" && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>{PROJECT.name}</h2>
                      <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{PROJECT.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>Client</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{PROJECT.client}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>Project Manager</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{PROJECT.pm}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>Start Date</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{PROJECT.start}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>End Date</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{PROJECT.end}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>Billing Type</p>
                        <p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{PROJECT.billingType}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--muted-foreground)" }}>Risk Level</p>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border mt-0.5"
                          style={{ background: "rgba(245,158,11,0.12)", color: "#d97706", borderColor: "rgba(245,158,11,0.3)" }}
                        >
                          {PROJECT.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-xl p-4" style={{ background: "var(--muted)" }}>
                      <div className="flex justify-between items-end mb-2">
                        <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Budget Utilization</p>
                        <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                          £{PROJECT.spent.toLocaleString()} / £{PROJECT.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(PROJECT.spent / PROJECT.budget) * 100}%`, background: "var(--primary)" }}
                        />
                      </div>
                      <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                        {Math.round((PROJECT.spent / PROJECT.budget) * 100)}% of budget used · £{(PROJECT.budget - PROJECT.spent).toLocaleString()} remaining
                      </p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "var(--muted)" }}>
                      <div className="flex justify-between items-end mb-2">
                        <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Overall Progress</p>
                        <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{PROJECT.progress}%</p>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${PROJECT.progress}%`, background: "#22c55e" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Milestones */}
              <Card className="border" style={{ borderColor: "var(--border)" }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Next Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MILESTONES.filter(m => m.status !== "Completed").slice(0, 3).map(m => {
                    const s = MILESTONE_STYLE[m.status]
                    return (
                      <div key={m.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{m.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.date}</span>
                          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium border" style={{ background: s.bg, color: s.color, borderColor: s.border }}>{m.status}</span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border" style={{ borderColor: "var(--border)" }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ACTIVITY.map(a => (
                    <div key={a.id} className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                        {a.user}
                      </div>
                      <p className="flex-1 text-sm" style={{ color: "var(--foreground)" }}>{a.action}</p>
                      <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{a.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TASKS TAB — Kanban */}
        {tab === "Tasks" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Task Board</h2>
              <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
                <Plus className="h-4 w-4" /> Add Task
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {(["To Do","In Progress","In Review","Done"] as KanbanCol[]).map(col => {
                const colTasks = TASKS.filter(t => t.col === col)
                const colColors: Record<KanbanCol, string> = {
                  "To Do": "#6b7280",
                  "In Progress": "#3b82f6",
                  "In Review": "#f59e0b",
                  "Done": "#22c55e",
                }
                return (
                  <div key={col}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full" style={{ background: colColors[col] }} />
                      <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{col}</span>
                      <span className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                        {colTasks.length}
                      </span>
                    </div>
                    <div className="space-y-2 min-h-32">
                      {colTasks.map(t => {
                        const p = PRIORITY_STYLE[t.priority]
                        return (
                          <Card key={t.id} className="border cursor-pointer hover:shadow-sm transition-shadow" style={{ borderColor: "var(--border)" }}>
                            <CardContent className="p-3 space-y-2">
                              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{t.title}</p>
                              <div className="flex items-center justify-between">
                                <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: p.bg, color: p.color }}>
                                  {t.priority}
                                </span>
                                <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)" }}>
                                  {t.assignee}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                                <Calendar className="h-3 w-3" />
                                <span>{t.due}</span>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* GANTT TAB */}
        {tab === "Gantt" && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Project Gantt Chart</h2>
            <Card className="border overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div style={{ minWidth: 900 }}>
                    {/* Week headers */}
                    <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
                      <div className="w-56 shrink-0 px-4 py-2 text-xs font-medium border-r" style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}>Task</div>
                      <div className="flex-1 flex relative">
                        {Array.from({ length: TOTAL_WEEKS / 4 }, (_, i) => (
                          <div key={i} className="text-xs font-medium py-2 border-r text-center" style={{ width: `${100 / (TOTAL_WEEKS / 4)}%`, color: "var(--muted-foreground)", borderColor: "var(--border)" }}>
                            W{(i + 1) * 4}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Rows */}
                    {["Phase 1","Phase 2","Phase 3"].map(phase => (
                      <React.Fragment key={phase}>
                        <div className="flex border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                          <div className="w-56 shrink-0 px-4 py-1.5">
                            <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{phase}</span>
                          </div>
                          <div className="flex-1" />
                        </div>
                        {GANTT_TASKS.filter(t => t.phase === phase).map(t => (
                          <div key={t.id} className="flex border-b items-center" style={{ borderColor: "var(--border)", height: 36 }}>
                            <div className="w-56 shrink-0 px-4">
                              <span className="text-xs" style={{ color: "var(--foreground)" }}>{t.name}</span>
                            </div>
                            <div className="flex-1 relative h-full">
                              {/* Today marker */}
                              <div
                                className="absolute top-0 bottom-0 w-0.5 z-10"
                                style={{ left: `${(TODAY_WEEK / TOTAL_WEEKS) * 100}%`, background: "#ef4444", opacity: 0.5 }}
                              />
                              {/* Bar */}
                              <div
                                className="absolute top-1/2 -translate-y-1/2 h-5 rounded-full"
                                style={{
                                  left: `${(t.start / TOTAL_WEEKS) * 100}%`,
                                  width: `${((t.end - t.start) / TOTAL_WEEKS) * 100}%`,
                                  background: t.end <= TODAY_WEEK ? "#22c55e" : t.start <= TODAY_WEEK ? "var(--primary)" : "var(--accent)",
                                  opacity: 0.85,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
              <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded" style={{ background: "#22c55e" }} /> Completed</div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded" style={{ background: "var(--primary)" }} /> In Progress</div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded" style={{ background: "var(--accent)" }} /> Upcoming</div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-0.5" style={{ background: "#ef4444" }} /> Today</div>
            </div>
          </div>
        )}

        {/* TIMESHEETS TAB */}
        {tab === "Timesheets" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Time Entries</h2>
              <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
                <Plus className="h-4 w-4" /> Log Time
              </Button>
            </div>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Billable Hours", value: "321h", accent: "#22c55e" },
                { label: "Non-Billable", value: "47h", accent: "#f59e0b" },
                { label: "Estimated", value: "480h", accent: "var(--primary)" },
              ].map(s => (
                <Card key={s.label} className="border" style={{ borderColor: "var(--border)" }}>
                  <CardContent className="p-4">
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: s.accent }}>{s.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                        {["Date","Team Member","Task","Hours","Billable","Description","Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_ENTRIES.map(e => (
                        <tr key={e.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{e.date}</td>
                          <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{e.member}</td>
                          <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{e.task}</td>
                          <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{e.hours}h</td>
                          <td className="px-4 py-3">
                            <span style={{ color: e.billable ? "#22c55e" : "#f59e0b" }}>{e.billable ? "Yes" : "No"}</span>
                          </td>
                          <td className="px-4 py-3 text-xs max-w-48 truncate" style={{ color: "var(--muted-foreground)" }}>{e.desc}</td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                              style={e.status === "Approved"
                                ? { background: "rgba(34,197,94,0.12)", color: "#16a34a" }
                                : { background: "rgba(245,158,11,0.12)", color: "#d97706" }}
                            >
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* BUDGET TAB */}
        {tab === "Budget" && (
          <div className="space-y-6">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Budget Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border" style={{ borderColor: "var(--border)" }}>
                <CardHeader className="pb-3"><CardTitle className="text-base">Budget vs Actuals</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                        {["Category","Budgeted","Actual","Forecast","Variance"].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {BUDGET_BREAKDOWN.map(b => {
                        const variance = b.budgeted - b.actual
                        return (
                          <tr key={b.category} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                            <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{b.category}</td>
                            <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>£{b.budgeted.toLocaleString()}</td>
                            <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>£{b.actual.toLocaleString()}</td>
                            <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>£{b.forecast.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span style={{ color: variance >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
                                {variance >= 0 ? "+" : ""}£{variance.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <Card className="border" style={{ borderColor: "var(--border)" }}>
                <CardHeader className="pb-3"><CardTitle className="text-base">Budget Chart</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={BUDGET_BREAKDOWN} barSize={16}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="budgeted" name="Budget" fill="var(--primary)" radius={[3,3,0,0]} />
                      <Bar dataKey="actual" name="Actual" fill="#22c55e" radius={[3,3,0,0]} />
                      <Bar dataKey="forecast" name="Forecast" fill="#f59e0b" radius={[3,3,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {tab === "Team" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Project Team</h2>
              <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
                <Plus className="h-4 w-4" /> Add Member
              </Button>
            </div>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Name","Role","Allocation","Hours Logged","Cost Rate","Total Cost"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM_MEMBERS.map(m => (
                      <tr key={m.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                              {m.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="font-medium" style={{ color: "var(--foreground)" }}>{m.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{m.role}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                              <div className="h-full rounded-full" style={{ width: `${m.allocation}%`, background: m.allocation > 90 ? "#ef4444" : "var(--primary)" }} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{m.allocation}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{m.hoursLogged}h</td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>£{m.costRate}/h</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>£{m.totalCost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {tab === "Documents" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Project Documents</h2>
              <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
                <Upload className="h-4 w-4" /> Upload
              </Button>
            </div>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                      {["Name","Type","Uploaded By","Date","Size","Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DOCS.map(d => (
                      <tr key={d.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                            <span className="font-medium" style={{ color: "var(--foreground)" }}>{d.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded px-2 py-0.5 text-xs font-medium" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>{d.type}</span>
                        </td>
                        <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{d.uploadedBy}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{d.date}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{d.size}</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="ghost" className="text-xs h-7" style={{ color: "var(--primary)" }}>Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "Settings" && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Project Settings</h2>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-6 space-y-4">
                {[
                  { label: "Project Name", value: PROJECT.name, type: "text" },
                  { label: "Client", value: PROJECT.client, type: "text" },
                  { label: "Status", value: PROJECT.status, type: "select", options: ["Planning","Active","On Hold","Completed","Cancelled"] },
                  { label: "Start Date", value: PROJECT.start, type: "date" },
                  { label: "End Date", value: PROJECT.end, type: "date" },
                  { label: "Billing Type", value: PROJECT.billingType, type: "select", options: ["Fixed Price","Time & Materials","Retainer"] },
                ].map(f => (
                  <div key={f.label} className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{f.label}</label>
                    <div className="col-span-2">
                      <input
                        type={f.type === "select" ? "text" : f.type}
                        defaultValue={f.value}
                        readOnly={f.type === "select"}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Button size="sm" style={{ background: "var(--primary)", color: "#fff" }}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
