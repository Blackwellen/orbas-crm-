"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, LayoutList, LayoutGrid, Briefcase, Users, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = ["All Jobs", "Active", "Draft", "Closed"]
const PIPELINE_STAGES = ["Applied", "Screening", "Interview", "Assessment", "Offer", "Hired", "Rejected"]

const jobs = [
  { id: "JOB-001", title: "Senior Software Engineer",      dept: "Engineering", location: "London",     type: "Full-time",  apps: 42, stage: "Active",  posted: "15 May 2026",  status: "Active",  urgent: true },
  { id: "JOB-002", title: "Product Designer (Mid-level)",  dept: "Product",     location: "London",     type: "Full-time",  apps: 28, stage: "Active",  posted: "20 May 2026",  status: "Active",  urgent: false },
  { id: "JOB-003", title: "Account Executive",             dept: "Sales",       location: "Manchester", type: "Full-time",  apps: 65, stage: "Active",  posted: "10 May 2026",  status: "Active",  urgent: true },
  { id: "JOB-004", title: "Marketing Manager",             dept: "Marketing",   location: "Remote",     type: "Full-time",  apps: 34, stage: "Active",  posted: "18 May 2026",  status: "Active",  urgent: false },
  { id: "JOB-005", title: "Finance Analyst",               dept: "Finance",     location: "London",     type: "Full-time",  apps: 18, stage: "Active",  posted: "22 May 2026",  status: "Active",  urgent: false },
  { id: "JOB-006", title: "DevOps Engineer",               dept: "Engineering", location: "Remote",     type: "Full-time",  apps: 31, stage: "Active",  posted: "2 Jun 2026",   status: "Active",  urgent: true },
  { id: "JOB-007", title: "Customer Success Manager",      dept: "Customer Svc",location: "London",     type: "Full-time",  apps: 22, stage: "Active",  posted: "5 Jun 2026",   status: "Active",  urgent: false },
  { id: "JOB-008", title: "HR Advisor",                    dept: "HR",          location: "London",     type: "Full-time",  apps: 14, stage: "Active",  posted: "8 Jun 2026",   status: "Active",  urgent: false },
  { id: "JOB-009", title: "Data Engineer",                 dept: "Engineering", location: "Remote",     type: "Contract",   apps: 19, stage: "Active",  posted: "1 Jun 2026",   status: "Active",  urgent: true },
  { id: "JOB-010", title: "Legal Counsel",                 dept: "Legal",       location: "London",     type: "Full-time",  apps: 8,  stage: "Active",  posted: "29 May 2026",  status: "Active",  urgent: false },
  { id: "JOB-011", title: "Operations Coordinator",        dept: "Operations",  location: "Birmingham", type: "Part-time",  apps: 27, stage: "Active",  posted: "25 May 2026",  status: "Active",  urgent: false },
  { id: "JOB-012", title: "Frontend Developer",            dept: "Engineering", location: "London",     type: "Full-time",  apps: 51, stage: "Active",  posted: "12 May 2026",  status: "Active",  urgent: true },
  { id: "JOB-013", title: "Growth Marketing Lead",         dept: "Marketing",   location: "Remote",     type: "Full-time",  apps: 0,  stage: "Draft",   posted: "—",            status: "Draft",   urgent: false },
  { id: "JOB-014", title: "Enterprise Sales Director",     dept: "Sales",       location: "London",     type: "Full-time",  apps: 0,  stage: "Draft",   posted: "—",            status: "Draft",   urgent: false },
  { id: "JOB-015", title: "Backend Engineer (Go)",         dept: "Engineering", location: "Remote",     type: "Full-time",  apps: 38, stage: "Closed",  posted: "1 Apr 2026",   status: "Closed",  urgent: false },
  { id: "JOB-016", title: "Content Manager",               dept: "Marketing",   location: "London",     type: "Part-time",  apps: 24, stage: "Closed",  posted: "15 Mar 2026",  status: "Closed",  urgent: false },
  { id: "JOB-017", title: "Compliance Officer",            dept: "Legal",       location: "London",     type: "Full-time",  apps: 12, stage: "Active",  posted: "6 Jun 2026",   status: "Active",  urgent: false },
  { id: "JOB-018", title: "Cloud Infrastructure Engineer", dept: "Engineering", location: "Remote",     type: "Contract",   apps: 9,  stage: "Active",  posted: "9 Jun 2026",   status: "Active",  urgent: true },
]

const pipelineCandidates = [
  { name: "James Liu",       job: "Senior Software Engineer", stage: "Interview",  date: "5 Jun 2026" },
  { name: "Elena Marchetti", job: "Senior Software Engineer", stage: "Screening",  date: "8 Jun 2026" },
  { name: "Kwame Asante",    job: "Account Executive",        stage: "Offer",      date: "3 Jun 2026" },
  { name: "Natasha Petrov",  job: "Product Designer",         stage: "Assessment", date: "7 Jun 2026" },
  { name: "Dmitri Volkov",   job: "DevOps Engineer",          stage: "Applied",    date: "9 Jun 2026" },
  { name: "Camille Dubois",  job: "Marketing Manager",        stage: "Interview",  date: "6 Jun 2026" },
  { name: "Rodrigo Santos",  job: "Finance Analyst",          stage: "Hired",      date: "1 Jun 2026" },
  { name: "Amara Osei",      job: "Account Executive",        stage: "Screening",  date: "8 Jun 2026" },
  { name: "Sven Bergström",  job: "DevOps Engineer",          stage: "Interview",  date: "4 Jun 2026" },
  { name: "Priya Nair",      job: "HR Advisor",               stage: "Applied",    date: "9 Jun 2026" },
]

const stageColor: Record<string, string> = {
  Applied:    "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Screening:  "bg-[#06b6d4]/10 text-[#06b6d4]",
  Interview:  "bg-[var(--primary)]/10 text-[var(--primary)]",
  Assessment: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  Offer:      "bg-[#f59e0b]/10 text-[#f59e0b]",
  Hired:      "bg-[#10b981]/10 text-[#10b981]",
  Rejected:   "bg-[#ef4444]/10 text-[#ef4444]",
}

const statusBg: Record<string, string> = {
  Active: "bg-[#10b981]/10 text-[#10b981]",
  Draft:  "bg-[#f59e0b]/10 text-[#f59e0b]",
  Closed: "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

export default function HiringPage() {
  const [tab, setTab] = useState("All Jobs")
  const [view, setView] = useState<"list" | "kanban">("list")
  const [search, setSearch] = useState("")

  const totalApps     = jobs.filter(j => j.status === "Active").reduce((s, j) => s + j.apps, 0)
  const openPositions = jobs.filter(j => j.status === "Active").length
  const interviewsThisWeek = pipelineCandidates.filter(c => c.stage === "Interview").length

  const filtered = jobs.filter(j => {
    const matchTab    = tab === "All Jobs" || j.status === tab
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const stageGroups = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage] = pipelineCandidates.filter(c => c.stage === stage)
    return acc
  }, {} as Record<string, typeof pipelineCandidates>)

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Hiring (ATS)</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Applicant tracking & recruitment pipeline</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />Post New Job
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Open Positions",      value: openPositions,    icon: Briefcase,  color: "var(--primary)" },
          { label: "Total Applicants",    value: totalApps,        icon: Users,      color: "#8b5cf6" },
          { label: "Interviews This Week",value: interviewsThisWeek,icon: Clock,     color: "#f59e0b" },
          { label: "Avg Time to Hire",    value: "18 days",        icon: TrendingUp, color: "#10b981" },
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

      {/* Tabs + View Toggle */}
      <div className="flex items-center justify-between border-b border-[var(--border)]">
        <div className="flex items-center gap-1">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={cn(
              "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
              tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 pb-1">
          <button onClick={() => setView("list")} className={cn("p-1.5 rounded-md", view === "list" ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]")}>
            <LayoutList className="h-4 w-4" />
          </button>
          <button onClick={() => setView("kanban")} className={cn("p-1.5 rounded-md", view === "kanban" ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]")}>
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs…" className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Job Title", "Department", "Location", "Type", "Applications", "Stage", "Posted", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/app/people/hiring/${job.id}`} className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]">{job.title}</Link>
                      {job.urgent && <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#ef4444", color: "white" }}>URGENT</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{job.dept}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{job.location}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{job.type}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)] font-semibold">{job.apps}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{job.stage}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{job.posted}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", statusBg[job.status])}>{job.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Kanban Pipeline View */}
      {view === "kanban" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: PIPELINE_STAGES.length * 220 }}>
            {PIPELINE_STAGES.map(stage => (
              <div key={stage} className="flex-1 min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", stageColor[stage])}>{stage}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{stageGroups[stage]?.length || 0}</span>
                </div>
                <div className="space-y-2">
                  {(stageGroups[stage] || []).map((c, i) => (
                    <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 shadow-sm">
                      <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{c.job}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-1">{c.date}</p>
                    </div>
                  ))}
                  {(stageGroups[stage] || []).length === 0 && (
                    <div className="rounded-lg border-2 border-dashed border-[var(--border)] p-4 text-center">
                      <p className="text-xs text-[var(--muted-foreground)]">No candidates</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
